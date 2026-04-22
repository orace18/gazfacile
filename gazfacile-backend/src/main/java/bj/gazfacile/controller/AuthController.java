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
 * Authentification : WebAuthn (Passkeys), PIN 6 chiffres, Google OAuth2,
 * inscription simplifiée, refresh token et logout.
 */
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final GoogleTokenService googleTokenService;

    // ── WebAuthn (Passkeys) — Inscription ─────────────────────────────────────

    /**
     * Étape 1 d'inscription WebAuthn.
     * Crée ou retrouve l'utilisateur et retourne les options de création de credential.
     */
    @PostMapping("/webauthn/register/start")
    public ResponseEntity<Map<String, Object>> webAuthnInscriptionDebut(
            @Valid @RequestBody WebAuthnRegisterStartDTO dto) {
        return ResponseEntity.ok(authService.demarrerInscriptionWebAuthn(dto));
    }

    /**
     * Étape 2 d'inscription WebAuthn.
     * Vérifie le credential et retourne le JWT d'accès.
     */
    @PostMapping("/webauthn/register/finish")
    public ResponseEntity<AuthResponseDTO> webAuthnInscriptionFin(
            @Valid @RequestBody WebAuthnRegisterFinishDTO dto,
            HttpServletResponse response) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(authService.terminerInscriptionWebAuthn(dto, response));
    }

    // ── WebAuthn (Passkeys) — Connexion ───────────────────────────────────────

    /**
     * Étape 1 de connexion WebAuthn.
     * Retourne les options d'authentification avec les credentials autorisés.
     */
    @PostMapping("/webauthn/login/start")
    public ResponseEntity<Map<String, Object>> webAuthnConnexionDebut(
            @Valid @RequestBody WebAuthnLoginStartDTO dto) {
        return ResponseEntity.ok(authService.demarrerConnexionWebAuthn(dto));
    }

    /**
     * Étape 2 de connexion WebAuthn.
     * Vérifie l'assertion et retourne le JWT d'accès.
     */
    @PostMapping("/webauthn/login/finish")
    public ResponseEntity<AuthResponseDTO> webAuthnConnexionFin(
            @Valid @RequestBody WebAuthnLoginFinishDTO dto,
            HttpServletResponse response) {
        return ResponseEntity.ok(authService.terminerConnexionWebAuthn(dto, response));
    }

    // ── PIN ───────────────────────────────────────────────────────────────────

    /**
     * Configure un PIN 6 chiffres pour l'utilisateur connecté.
     * Requiert un access token valide.
     */
    @PostMapping("/pin/setup")
    public ResponseEntity<Map<String, String>> configurerPin(
            @Valid @RequestBody PinSetupDTO dto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()
                || !(auth.getPrincipal() instanceof User utilisateur)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        authService.configurerPin(utilisateur.getTelephone(), dto);
        return ResponseEntity.ok(Map.of("message", "PIN configuré avec succès"));
    }

    /**
     * Connexion par PIN 6 chiffres.
     * Bloqué après 3 échecs pendant 15 minutes.
     */
    @PostMapping("/pin/login")
    public ResponseEntity<AuthResponseDTO> connexionParPin(
            @Valid @RequestBody PinLoginDTO dto,
            HttpServletResponse response) {
        return ResponseEntity.ok(authService.connexionParPin(dto, response));
    }

    // ── Inscription simplifiée ────────────────────────────────────────────────

    /**
     * Inscription sans vérification biométrique (fallback total).
     */
    @PostMapping("/register/simple")
    public ResponseEntity<AuthResponseDTO> inscrireSimple(
            @Valid @RequestBody RegisterDTO dto,
            HttpServletResponse response) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(authService.inscrireSimple(dto, response));
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
