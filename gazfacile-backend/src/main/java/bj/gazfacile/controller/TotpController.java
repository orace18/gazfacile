package bj.gazfacile.controller;

import bj.gazfacile.dto.AuthResponseDTO;
import bj.gazfacile.dto.TotpCodeDTO;
import bj.gazfacile.dto.TotpSetupResponseDTO;
import bj.gazfacile.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Endpoints de gestion du 2FA TOTP (Google Authenticator / Authy).
 *
 * Flow de setup (1 seule fois) :
 *   POST /api/v1/auth/totp/setup    → retourne QR code + secret (ADMIN requis)
 *   POST /api/v1/auth/totp/confirm  → valide le 1er code et active le 2FA (ADMIN requis)
 *
 * Flow de connexion quotidien :
 *   POST /api/v1/auth/pin/login     → PIN correct + 2FA actif → token pending (pending2fa=true)
 *   POST /api/v1/auth/totp/verify   → soumettre le code TOTP → JWT complet (ROLE_2FA_PENDING requis)
 *
 * Désactivation :
 *   POST /api/v1/auth/totp/disable  → désactive le 2FA (ADMIN + code valide requis)
 */
@RestController
@RequestMapping("/api/v1/auth/totp")
@RequiredArgsConstructor
public class TotpController {

    private final AuthService authService;

    /**
     * Initie le setup TOTP : génère un secret et retourne l'URI otpauth://.
     * Le frontend encode cet URI en QR code (bibliothèque qrcode.js).
     * Requiert un JWT ADMIN valide.
     */
    @PostMapping("/setup")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TotpSetupResponseDTO> setup(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(authService.initierSetupTotp(userDetails.getUsername()));
    }

    /**
     * Confirme le setup : valide le premier code TOTP et active le 2FA.
     * Doit être appelé immédiatement après /setup.
     * Requiert un JWT ADMIN valide.
     */
    @PostMapping("/confirm")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> confirm(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody TotpCodeDTO dto) {
        authService.confirmerSetupTotp(userDetails.getUsername(), dto.code());
        return ResponseEntity.ok(Map.of("message", "2FA activé avec succès"));
    }

    /**
     * Vérification TOTP lors de la connexion.
     * Accessible uniquement avec un token "pending 2FA" (ROLE_2FA_PENDING).
     * Retourne un JWT complet après vérification du code.
     */
    @PostMapping("/verify")
    @PreAuthorize("hasRole('2FA_PENDING')")
    public ResponseEntity<AuthResponseDTO> verify(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody TotpCodeDTO dto,
            HttpServletResponse response) {
        return ResponseEntity.ok(
                authService.verifierTotp(userDetails.getUsername(), dto.code(), response));
    }

    /**
     * Désactive le 2FA après vérification d'un code valide.
     * Un code correct est requis pour éviter toute désactivation malveillante.
     * Requiert un JWT ADMIN valide.
     */
    @PostMapping("/disable")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> disable(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody TotpCodeDTO dto) {
        authService.desactiverTotp(userDetails.getUsername(), dto.code());
        return ResponseEntity.ok(Map.of("message", "2FA désactivé"));
    }
}
