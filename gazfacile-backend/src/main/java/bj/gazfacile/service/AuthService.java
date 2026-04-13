package bj.gazfacile.service;

import bj.gazfacile.dto.AuthResponseDTO;
import bj.gazfacile.dto.GoogleLoginDTO;
import bj.gazfacile.dto.LoginDTO;
import bj.gazfacile.dto.OtpLoginDTO;
import bj.gazfacile.dto.RegisterDTO;
import bj.gazfacile.model.User;
import bj.gazfacile.model.enums.Role;
import bj.gazfacile.repository.UserRepository;
import bj.gazfacile.security.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final OtpService otpService;
    private final GoogleTokenService googleTokenService;
    private final FirebasePhoneTokenService firebasePhoneTokenService;
    private final PhoneNumberService phoneNumberService;

    // ── Inscription / Connexion classique ────────────────────────────────────

    public AuthResponseDTO register(RegisterDTO dto) {
        String telephone = phoneNumberService.normaliserTelephoneLocal(dto.telephone());

        if (userRepository.existsByTelephone(telephone)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Ce numéro de téléphone est déjà associé à un compte");
        }
        otpService.verifierOtp(telephone, dto.otpCode());

        Role role = (dto.role() != null) ? dto.role() : Role.CLIENT;
        if (role == Role.ADMIN) role = Role.CLIENT;

        User utilisateur = User.builder()
                .telephone(telephone)
                .password(passwordEncoder.encode(UUID.randomUUID().toString()))
                .nom(dto.nom())
                .roles(Set.of(role))
                .telephoneVerifie(true)
                .actif(true)
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(utilisateur);
        log.info("Nouvel utilisateur inscrit : {}", utilisateur.getTelephone());
        return construireReponse(utilisateur);
    }

    public AuthResponseDTO login(LoginDTO dto) {
        String telephone = phoneNumberService.normaliserTelephoneLocal(dto.telephone());

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(telephone, dto.password())
        );
        User utilisateur = userRepository.findByTelephone(telephone)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Utilisateur introuvable"));
        log.info("Connexion réussie : {}", utilisateur.getTelephone());
        return construireReponse(utilisateur);
    }

    public AuthResponseDTO loginParOtp(OtpLoginDTO dto) {
        String telephone = phoneNumberService.normaliserTelephoneLocal(dto.telephone());

        otpService.verifierOtp(telephone, dto.code());

        User utilisateur = userRepository.findByTelephone(telephone)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Aucun compte n'existe pour ce numéro"));

        if (!utilisateur.isTelephoneVerifie()) {
            utilisateur.setTelephoneVerifie(true);
            userRepository.save(utilisateur);
        }

        log.info("Connexion OTP réussie : {}", utilisateur.getTelephone());
        return construireReponse(utilisateur);
    }

    // ── OTP ──────────────────────────────────────────────────────────────────

    /**
     * Envoie un OTP au numéro donné.
     * Peut être appelé avant ou après l'inscription.
     */
    public void envoyerOtp(String telephone) {
        otpService.envoyerOtp(phoneNumberService.normaliserTelephoneLocal(telephone));
    }

    /**
     * Vérifie l'OTP et marque le téléphone comme vérifié.
     *
     * @throws ResponseStatusException 404 si l'utilisateur n'existe pas encore
     */
    public void verifierOtp(String telephone, String code) {
        String telephoneLocal = phoneNumberService.normaliserTelephoneLocal(telephone);

        otpService.verifierOtp(telephoneLocal, code);

        // Marquer le téléphone comme vérifié si l'utilisateur existe
        userRepository.findByTelephone(telephoneLocal).ifPresent(u -> {
            u.setTelephoneVerifie(true);
            userRepository.save(u);
            log.info("[OTP] Téléphone {} marqué vérifié", telephoneLocal);
        });
    }

    // ── Google OAuth2 ────────────────────────────────────────────────────────

    /**
     * Connexion / inscription via Google Identity Services.
     *
     * Flux :
     *  1. Valider l'ID token Google
     *  2. Chercher l'utilisateur par googleId puis par email
     *  3. Si trouvé : mettre à jour et connecter
     *  4. Si nouveau + telephone fourni : créer le compte
     *  5. Si nouveau sans telephone : retourner 202 ACCEPTED (frontend demande le téléphone)
     */
    public AuthResponseDTO loginAvecGoogle(GoogleLoginDTO dto) {
        GoogleTokenService.GoogleUserInfo info;
        try {
            info = googleTokenService.valider(dto.idToken());
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage());
        }

        Role role = (dto.role() != null) ? dto.role() : Role.CLIENT;
        if (role == Role.ADMIN) role = Role.CLIENT;

        // Chercher par googleId
        User utilisateur = userRepository.findByGoogleId(info.googleId())
                .orElseGet(() -> userRepository.findByEmail(info.email()).orElse(null));

        if (utilisateur != null) {
            // Lier le googleId si pas encore fait
            if (utilisateur.getGoogleId() == null) {
                utilisateur.setGoogleId(info.googleId());
                userRepository.save(utilisateur);
            }
            log.info("[Google] Connexion : {}", utilisateur.getTelephone());
            return construireReponse(utilisateur);
        }

        // Nouveau compte Google — le téléphone est obligatoire
        if (dto.telephone() == null || dto.telephone().isBlank()) {
            throw new ResponseStatusException(HttpStatus.PRECONDITION_REQUIRED,
                    "TELEPHONE_REQUIS");
        }

        FirebasePhoneTokenService.VerifiedPhoneIdentity phoneIdentity =
                firebasePhoneTokenService.verifierTelephone(dto.firebaseIdToken(), dto.telephone());

        if (userRepository.existsByTelephone(phoneIdentity.telephoneLocal())) {
            // Le téléphone existe déjà — lier les comptes
            utilisateur = userRepository.findByTelephone(phoneIdentity.telephoneLocal()).get();
            utilisateur.setGoogleId(info.googleId());
            utilisateur.setFirebaseUid(phoneIdentity.firebaseUid());
            utilisateur.setTelephoneVerifie(true);
            if (utilisateur.getEmail() == null || utilisateur.getEmail().isBlank()) {
                utilisateur.setEmail(info.email());
            }
            userRepository.save(utilisateur);
            log.info("[Google] Compte lié pour {}", utilisateur.getTelephone());
            return construireReponse(utilisateur);
        }

        // Créer un nouveau compte
        utilisateur = User.builder()
                .telephone(phoneIdentity.telephoneLocal())
                .email(info.email())
                .password(passwordEncoder.encode(UUID.randomUUID().toString()))
                .nom(info.nom())
                .googleId(info.googleId())
                .firebaseUid(phoneIdentity.firebaseUid())
                .roles(Set.of(role))
                .telephoneVerifie(true)
                .actif(true)
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(utilisateur);
        log.info("[Google] Nouveau compte créé : {} avec rôle {}", utilisateur.getTelephone(), role);
        return construireReponse(utilisateur);
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private AuthResponseDTO construireReponse(User utilisateur) {
        String token = jwtService.generateToken(utilisateur);
        String refreshToken = jwtService.generateRefreshToken(utilisateur);
        return new AuthResponseDTO(
                token, refreshToken,
                utilisateur.getTelephone(),
                utilisateur.getNom(),
                utilisateur.getEmail(),
                utilisateur.getRoles()
        );
    }
}
