package bj.gazfacile.controller;

import bj.gazfacile.dto.*;
import bj.gazfacile.model.User;
import bj.gazfacile.service.AuthService;
import bj.gazfacile.service.GoogleTokenService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

/**
 * Authentification : inscription, connexion, OTP SMS, Google OAuth2,
 * refresh token et logout.
 */
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final GoogleTokenService googleTokenService;

    // ── Inscription / Connexion ───────────────────────────────────────────────

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(
            @Valid @RequestBody RegisterDTO dto,
            HttpServletResponse response) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(dto, response));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(
            @Valid @RequestBody LoginDTO dto,
            HttpServletResponse response) {
        return ResponseEntity.ok(authService.login(dto, response));
    }

    @PostMapping("/login/otp")
    public ResponseEntity<AuthResponseDTO> loginParOtp(
            @Valid @RequestBody OtpLoginDTO dto,
            HttpServletResponse response) {
        return ResponseEntity.ok(authService.loginParOtp(dto, response));
    }

    // ── OTP ──────────────────────────────────────────────────────────────────

    @PostMapping("/otp/envoyer")
    public ResponseEntity<Map<String, String>> envoyerOtp(@Valid @RequestBody OtpEnvoyerDTO dto) {
        authService.envoyerOtp(dto.telephone());
        return ResponseEntity.ok(Map.of("message", "Code OTP envoyé au " + dto.telephone()));
    }

    @PostMapping("/otp/verifier")
    public ResponseEntity<Map<String, String>> verifierOtp(@Valid @RequestBody OtpVerifierDTO dto) {
        authService.verifierOtp(dto.telephone(), dto.code());
        return ResponseEntity.ok(Map.of("message", "Numéro de téléphone vérifié"));
    }

    // ── Google OAuth2 ─────────────────────────────────────────────────────────

    @PostMapping("/google")
    public ResponseEntity<AuthResponseDTO> loginGoogle(
            @Valid @RequestBody GoogleLoginDTO dto,
            HttpServletResponse response) {
        return ResponseEntity.ok(authService.loginAvecGoogle(dto, response));
    }

    @GetMapping("/google/config")
    public ResponseEntity<Map<String, Object>> googleConfig() {
        return ResponseEntity.ok(Map.of(
                "clientId", googleTokenService.getClientId(),
                "configured", googleTokenService.isConfigured()
        ));
    }

    // ── Refresh / Logout ──────────────────────────────────────────────────────

    /**
     * Échange le refresh token (cookie HttpOnly) contre un nouveau token d'accès.
     * Effectue la rotation : l'ancien refresh token est révoqué, un nouveau est émis.
     */
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponseDTO> refresh(
            @CookieValue(name = AuthService.COOKIE_REFRESH, required = false) String refreshToken,
            HttpServletResponse response) {
        if (refreshToken == null || refreshToken.isBlank()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(authService.rafraichirToken(refreshToken, response));
    }

    /**
     * Révoque le refresh token courant et efface le cookie.
     */
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            @CookieValue(name = AuthService.COOKIE_REFRESH, required = false) String refreshToken,
            HttpServletResponse response) {
        authService.deconnecter(refreshToken, response);
        return ResponseEntity.noContent().build();
    }

    /**
     * Révoque TOUS les refresh tokens de l'utilisateur connecté (tous les appareils).
     * Requiert un access token valide dans le header Authorization.
     */
    @PostMapping("/logout-all")
    public ResponseEntity<Void> logoutAll(HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()
                || !(auth.getPrincipal() instanceof User user)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        authService.deconnecterTousLesAppareils(user.getId(), response);
        return ResponseEntity.noContent().build();
    }
}
