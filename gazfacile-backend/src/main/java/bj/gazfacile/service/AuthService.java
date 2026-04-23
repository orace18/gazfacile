package bj.gazfacile.service;

import bj.gazfacile.dto.*;
import org.springframework.http.HttpStatus;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Set;

/**
 * Service d'authentification GazFacile.
 *
 * Méthodes d'authentification supportées :
 *  - WebAuthn / Passkeys (empreinte, Face ID)
 *  - PIN 6 chiffres (fallback)
 *  - Google OAuth2 (inchangé)
 *
 * Sécurité :
 *  - Access token JWT en mémoire côté frontend
 *  - Refresh token dans cookie HttpOnly avec rotation
 *  - Protection anti-brute-force sur le PIN (3 essais → blocage 15 min)
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    public static final String COOKIE_REFRESH = "refresh_token";

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final WebAuthnService webAuthnService;
    private final LoginAttemptService loginAttemptService;
    private final GoogleTokenService googleTokenService;
    private final PhoneNumberService phoneNumberService;
    private final RefreshTokenService refreshTokenService;
    private final TotpService totpService;

    @Value("${jwt.refresh-expiration}")
    private long refreshExpirationMs;

    // ── Inscription WebAuthn ──────────────────────────────────────────────────

    /**
     * Étape 1 : génère les options de création de credential WebAuthn.
     * Crée l'utilisateur s'il n'existe pas encore.
     */
    public Map<String, Object> demarrerInscriptionWebAuthn(WebAuthnRegisterStartDTO dto, String origin) {
        String telephone = phoneNumberService.normaliserTelephoneLocal(dto.telephone());

        User utilisateur = userRepository.findByTelephone(telephone).orElseGet(() -> {
            Role role = (dto.role() != null && dto.role() != Role.ADMIN) ? dto.role() : Role.CLIENT;
            User nouveau = User.builder()
                    .telephone(telephone)
                    .nom(dto.nom())
                    .roles(Set.of(role))
                    .actif(true)
                    .createdAt(LocalDateTime.now())
                    .build();
            return userRepository.save(nouveau);
        });

        // Mettre à jour le nom si l'utilisateur existe déjà sans nom
        if (utilisateur.getNom() == null || utilisateur.getNom().isBlank()) {
            utilisateur.setNom(dto.nom());
            userRepository.save(utilisateur);
        }

        log.info("[WebAuthn] Début d'inscription pour {}", telephone);
        return webAuthnService.genererOptionsInscription(utilisateur, origin);
    }

    /**
     * Étape 2 : vérifie la réponse de l'authenticateur et finalise l'inscription.
     * Retourne un JWT si la vérification réussit.
     */
    public AuthResponseDTO terminerInscriptionWebAuthn(WebAuthnRegisterFinishDTO dto, HttpServletResponse response) {
        String telephone = phoneNumberService.normaliserTelephoneLocal(dto.telephone());
        webAuthnService.verifierInscription(telephone, dto.credential());

        User utilisateur = userRepository.findByTelephone(telephone)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable"));

        log.info("[WebAuthn] Inscription terminée pour {}", telephone);
        return construireReponse(utilisateur, response);
    }

    // ── Connexion WebAuthn ────────────────────────────────────────────────────

    /**
     * Étape 1 : génère les options d'authentification WebAuthn.
     */
    public Map<String, Object> demarrerConnexionWebAuthn(WebAuthnLoginStartDTO dto, String origin) {
        String telephone = phoneNumberService.normaliserTelephoneLocal(dto.telephone());
        log.info("[WebAuthn] Début de connexion pour {}", telephone);
        return webAuthnService.genererOptionsAuthentification(telephone, origin);
    }

    /**
     * Étape 2 : vérifie l'assertion et retourne un JWT.
     */
    public AuthResponseDTO terminerConnexionWebAuthn(WebAuthnLoginFinishDTO dto, HttpServletResponse response) {
        String telephone = phoneNumberService.normaliserTelephoneLocal(dto.telephone());
        User utilisateur = webAuthnService.verifierAuthentification(telephone, dto.assertion());

        if (!utilisateur.isActif()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Compte désactivé");
        }

        log.info("[WebAuthn] Connexion réussie pour {}", telephone);
        return construireReponse(utilisateur, response);
    }

    // ── PIN ───────────────────────────────────────────────────────────────────

    /**
     * Configure le PIN 6 chiffres d'un utilisateur déjà authentifié.
     * Le PIN est hashé avec BCrypt avant stockage.
     */
    public void configurerPin(String telephone, PinSetupDTO dto) {
        User utilisateur = userRepository.findByTelephone(telephone)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable"));

        utilisateur.setPinHash(passwordEncoder.encode(dto.pin()));
        userRepository.save(utilisateur);
        log.info("[PIN] PIN configuré pour {}", telephone);
    }

    /**
     * Connexion par PIN 6 chiffres.
     * Bloque le compte après 3 tentatives échouées pendant 15 minutes.
     */
    public AuthResponseDTO connexionParPin(PinLoginDTO dto, HttpServletResponse response) {
        String telephone = phoneNumberService.normaliserTelephoneLocal(dto.telephone());

        if (loginAttemptService.estBloque(telephone)) {
            throw new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS,
                    "Compte bloqué, réessayez dans 15 minutes");
        }

        User utilisateur = userRepository.findByTelephone(telephone)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Aucun compte associé à ce numéro"));

        if (utilisateur.getPinHash() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Aucun PIN configuré pour ce compte. Utilisez votre empreinte ou créez un PIN.");
        }

        if (!passwordEncoder.matches(dto.pin(), utilisateur.getPinHash())) {
            loginAttemptService.enregistrerEchec(telephone);
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "PIN incorrect");
        }

        if (!utilisateur.isActif()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Compte désactivé");
        }

        loginAttemptService.reinitialiser(telephone);

        // Si l'admin a activé le 2FA → retourner un token temporaire en attente de TOTP
        if (utilisateur.isTotpEnabled()) {
            String pendingToken = jwtService.generatePending2faToken(utilisateur);
            log.info("[PIN] 2FA requis pour {}", telephone);
            return new AuthResponseDTO(pendingToken, telephone,
                    utilisateur.getNom(), utilisateur.getEmail(),
                    utilisateur.getRoles(), true);
        }

        log.info("[PIN] Connexion réussie pour {}", telephone);
        return construireReponse(utilisateur, response);
    }

    // ── TOTP 2FA ──────────────────────────────────────────────────────────────

    /**
     * Étape 1 du setup 2FA : génère un secret et retourne l'URI otpauth://.
     * Le secret est sauvegardé temporairement mais le 2FA n'est PAS encore actif.
     * L'utilisateur doit confirmer avec un code valide via confirmerSetupTotp().
     */
    public bj.gazfacile.dto.TotpSetupResponseDTO initierSetupTotp(String telephone) {
        User utilisateur = userRepository.findByTelephone(telephone)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        String secret = totpService.genererSecret();
        utilisateur.setTotpSecret(secret);
        utilisateur.setTotpEnabled(false); // pas encore actif avant confirmation
        userRepository.save(utilisateur);
        String uri = totpService.genererOtpauthUri(secret, telephone);
        log.info("[TOTP] Setup initié pour {}", telephone);
        return new bj.gazfacile.dto.TotpSetupResponseDTO(uri, secret);
    }

    /**
     * Étape 2 du setup 2FA : vérifie que le premier code TOTP est valide,
     * puis active le 2FA. Protège contre les configurations incorrectes.
     */
    public void confirmerSetupTotp(String telephone, String code) {
        User utilisateur = userRepository.findByTelephone(telephone)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (utilisateur.getTotpSecret() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Setup TOTP non initié");
        }
        if (!totpService.verifier(utilisateur.getTotpSecret(), code)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Code TOTP invalide");
        }
        utilisateur.setTotpEnabled(true);
        userRepository.save(utilisateur);
        log.info("[TOTP] 2FA activé pour {}", telephone);
    }

    /**
     * Vérification TOTP post-PIN : valide le code, puis retourne le JWT complet.
     * Appelé uniquement avec un token 2FA en attente (ROLE_2FA_PENDING).
     */
    public AuthResponseDTO verifierTotp(String telephone, String code, jakarta.servlet.http.HttpServletResponse response) {
        User utilisateur = userRepository.findByTelephone(telephone)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (!utilisateur.isTotpEnabled() || utilisateur.getTotpSecret() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "2FA non configuré");
        }
        if (!totpService.verifier(utilisateur.getTotpSecret(), code)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Code TOTP invalide");
        }
        log.info("[TOTP] Vérification réussie pour {}", telephone);
        return construireReponse(utilisateur, response);
    }

    /**
     * Désactive le 2FA après vérification d'un code TOTP valide.
     * Exige un code correct pour éviter le désactivation accidentelle ou malveillante.
     */
    public void desactiverTotp(String telephone, String code) {
        User utilisateur = userRepository.findByTelephone(telephone)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (!totpService.verifier(utilisateur.getTotpSecret(), code)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Code TOTP invalide");
        }
        utilisateur.setTotpEnabled(false);
        utilisateur.setTotpSecret(null);
        userRepository.save(utilisateur);
        log.info("[TOTP] 2FA désactivé pour {}", telephone);
    }

    // ── Inscription simplifiée (fallback total) ───────────────────────────────

    /**
     * Inscription sans vérification biométrique ni OTP.
     * Fallback pour les appareils qui ne supportent ni WebAuthn ni PIN.
     */
    public AuthResponseDTO inscrireSimple(RegisterDTO dto, HttpServletResponse response) {
        String telephone = phoneNumberService.normaliserTelephoneLocal(dto.telephone());

        if (userRepository.existsByTelephone(telephone)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Ce numéro de téléphone est déjà associé à un compte");
        }

        // Le rôle REVENDEUR nécessite un flux vérifié (WebAuthn/Google + paiement).
        // L'inscription simplifiée crée uniquement des comptes CLIENT.
        User utilisateur = User.builder()
                .telephone(telephone)
                .nom(dto.nom())
                .roles(Set.of(Role.CLIENT))
                .actif(true)
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(utilisateur);
        log.info("[Auth] Inscription simplifiée (CLIENT) : {}", telephone);
        return construireReponse(utilisateur, response);
    }

    // ── Google OAuth2 ─────────────────────────────────────────────────────────

    /**
     * Connexion / inscription via Google OAuth2.
     * Pour un nouveau compte Google, un numéro de téléphone est requis.
     */
    public AuthResponseDTO loginAvecGoogle(GoogleLoginDTO dto, HttpServletResponse response) {
        GoogleTokenService.GoogleUserInfo info;
        try {
            info = googleTokenService.valider(dto.idToken());
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage());
        }

        Role role = (dto.role() != null && dto.role() != Role.ADMIN) ? dto.role() : Role.CLIENT;

        // Chercher par googleId puis par email
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

        // Nouveau compte Google — numéro de téléphone requis
        if (dto.telephone() == null || dto.telephone().isBlank()) {
            throw new ResponseStatusException(HttpStatus.PRECONDITION_REQUIRED, "TELEPHONE_REQUIS");
        }

        String telephone = phoneNumberService.normaliserTelephoneLocal(dto.telephone());

        // Si un compte existe déjà avec ce numéro → lier le compte Google
        if (userRepository.existsByTelephone(telephone)) {
            utilisateur = userRepository.findByTelephone(telephone).get();
            utilisateur.setGoogleId(info.googleId());
            if (utilisateur.getEmail() == null || utilisateur.getEmail().isBlank()) {
                utilisateur.setEmail(info.email());
            }
            userRepository.save(utilisateur);
            log.info("[Google] Compte lié pour {}", telephone);
            return construireReponse(utilisateur, response);
        }

        // Créer un nouveau compte Google
        utilisateur = User.builder()
                .telephone(telephone)
                .email(info.email())
                .nom(info.nom())
                .googleId(info.googleId())
                .roles(Set.of(role))
                .actif(true)
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(utilisateur);
        log.info("[Google] Nouveau compte créé : {} avec rôle {}", telephone, role);
        return construireReponse(utilisateur, response);
    }

    // ── Refresh / Logout ──────────────────────────────────────────────────────

    /**
     * Valide le refresh token (cookie), effectue la rotation, et retourne un nouveau token d'accès.
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
