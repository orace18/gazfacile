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
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    public static final String COOKIE_REFRESH = "refresh_token";

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final OtpService otpService;
    private final GoogleTokenService googleTokenService;
    private final FirebasePhoneTokenService firebasePhoneTokenService;
    private final PhoneNumberService phoneNumberService;
    private final RefreshTokenService refreshTokenService;

    @Value("${jwt.refresh-expiration}")
    private long refreshExpirationMs;

    // ── Inscription / Connexion classique ────────────────────────────────────

    public AuthResponseDTO register(RegisterDTO dto, HttpServletResponse response) {
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
        return construireReponse(utilisateur, response);
    }

    public AuthResponseDTO login(LoginDTO dto, HttpServletResponse response) {
        String telephone = phoneNumberService.normaliserTelephoneLocal(dto.telephone());

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(telephone, dto.password())
        );
        User utilisateur = userRepository.findByTelephone(telephone)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Utilisateur introuvable"));
        log.info("Connexion réussie : {}", utilisateur.getTelephone());
        return construireReponse(utilisateur, response);
    }

    public AuthResponseDTO loginParOtp(OtpLoginDTO dto, HttpServletResponse response) {
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
        return construireReponse(utilisateur, response);
    }

    // ── OTP ──────────────────────────────────────────────────────────────────

    public void envoyerOtp(String telephone) {
        otpService.envoyerOtp(phoneNumberService.normaliserTelephoneLocal(telephone));
    }

    public void verifierOtp(String telephone, String code) {
        String telephoneLocal = phoneNumberService.normaliserTelephoneLocal(telephone);

        otpService.verifierOtp(telephoneLocal, code);

        userRepository.findByTelephone(telephoneLocal).ifPresent(u -> {
            u.setTelephoneVerifie(true);
            userRepository.save(u);
            log.info("[OTP] Téléphone {} marqué vérifié", telephoneLocal);
        });
    }

    // ── Google OAuth2 ────────────────────────────────────────────────────────

    public AuthResponseDTO loginAvecGoogle(GoogleLoginDTO dto, HttpServletResponse response) {
        GoogleTokenService.GoogleUserInfo info;
        try {
            info = googleTokenService.valider(dto.idToken());
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage());
        }

        Role role = (dto.role() != null) ? dto.role() : Role.CLIENT;
        if (role == Role.ADMIN) role = Role.CLIENT;

        User utilisateur = userRepository.findByGoogleId(info.googleId())
                .orElseGet(() -> userRepository.findByEmail(info.email()).orElse(null));

        if (utilisateur != null) {
            if (utilisateur.getGoogleId() == null) {
                utilisateur.setGoogleId(info.googleId());
                userRepository.save(utilisateur);
            }
            log.info("[Google] Connexion : {}", utilisateur.getTelephone());
            return construireReponse(utilisateur, response);
        }

        if (dto.telephone() == null || dto.telephone().isBlank()) {
            throw new ResponseStatusException(HttpStatus.PRECONDITION_REQUIRED, "TELEPHONE_REQUIS");
        }

        FirebasePhoneTokenService.VerifiedPhoneIdentity phoneIdentity =
                firebasePhoneTokenService.verifierTelephone(dto.firebaseIdToken(), dto.telephone());

        if (userRepository.existsByTelephone(phoneIdentity.telephoneLocal())) {
            utilisateur = userRepository.findByTelephone(phoneIdentity.telephoneLocal()).get();
            utilisateur.setGoogleId(info.googleId());
            utilisateur.setFirebaseUid(phoneIdentity.firebaseUid());
            utilisateur.setTelephoneVerifie(true);
            if (utilisateur.getEmail() == null || utilisateur.getEmail().isBlank()) {
                utilisateur.setEmail(info.email());
            }
            userRepository.save(utilisateur);
            log.info("[Google] Compte lié pour {}", utilisateur.getTelephone());
            return construireReponse(utilisateur, response);
        }

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
        return construireReponse(utilisateur, response);
    }

    // ── Refresh / Logout ──────────────────────────────────────────────────────

    /**
     * Valide le refresh token (cookie), effectue la rotation, et retourne un nouveau token d'accès.
     * Si le token est révoqué ou introuvable, lève une 401.
     */
    public AuthResponseDTO rafraichirToken(String rawRefreshToken, HttpServletResponse response) {
        String userId = refreshTokenService.validerEtRoter(rawRefreshToken);

        User utilisateur = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                        "Utilisateur introuvable"));

        if (!utilisateur.isActif()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Compte désactivé");
        }

        log.info("[Refresh] Token renouvelé pour userId={}", userId);
        return construireReponse(utilisateur, response);
    }

    /**
     * Révoque le refresh token en base et efface le cookie côté client.
     */
    public void deconnecter(String rawRefreshToken, HttpServletResponse response) {
        if (rawRefreshToken != null && !rawRefreshToken.isBlank()) {
            refreshTokenService.revoquer(rawRefreshToken);
        }
        effacerCookie(response);
    }

    /**
     * Révoque TOUS les refresh tokens de l'utilisateur et efface le cookie courant.
     */
    public void deconnecterTousLesAppareils(String userId, HttpServletResponse response) {
        refreshTokenService.revoquerTous(userId);
        effacerCookie(response);
        log.info("[Auth] Déconnexion de tous les appareils pour userId={}", userId);
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private AuthResponseDTO construireReponse(User utilisateur, HttpServletResponse response) {
        String accessToken = jwtService.generateToken(utilisateur);
        String rawRefreshToken = refreshTokenService.creerToken(utilisateur.getId());

        // Cookie HttpOnly — le browser le gère, Angular n'y accède pas
        ResponseCookie cookie = ResponseCookie.from(COOKIE_REFRESH, rawRefreshToken)
                .httpOnly(true)
                .secure(true)
                .sameSite("Strict")
                .path("/api/v1/auth")
                .maxAge(Duration.ofMillis(refreshExpirationMs))
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return new AuthResponseDTO(
                accessToken,
                utilisateur.getTelephone(),
                utilisateur.getNom(),
                utilisateur.getEmail(),
                utilisateur.getRoles()
        );
    }

    private void effacerCookie(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from(COOKIE_REFRESH, "")
                .httpOnly(true)
                .secure(true)
                .sameSite("Strict")
                .path("/api/v1/auth")
                .maxAge(0)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }
}
