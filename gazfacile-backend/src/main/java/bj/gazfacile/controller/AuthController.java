package bj.gazfacile.controller;

import bj.gazfacile.dto.*;
import bj.gazfacile.service.AuthService;
import bj.gazfacile.service.GoogleTokenService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Authentification : inscription, connexion, OTP SMS, Google OAuth2.
 * Toutes les routes sont publiques.
 */
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final GoogleTokenService googleTokenService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@Valid @RequestBody RegisterDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(dto));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginDTO dto) {
        return ResponseEntity.ok(authService.login(dto));
    }

    // ── OTP ──────────────────────────────────────────────────────────────────

    /** Envoie un code OTP par SMS au numéro donné. */
    @PostMapping("/otp/envoyer")
    public ResponseEntity<Map<String, String>> envoyerOtp(@Valid @RequestBody OtpEnvoyerDTO dto) {
        authService.envoyerOtp(dto.telephone());
        return ResponseEntity.ok(Map.of("message",
                "Code OTP envoyé au " + dto.telephone()));
    }

    /**
     * Vérifie le code OTP.
     * Retourne 200 si valide — le frontend peut ensuite appeler /login ou /google.
     */
    @PostMapping("/otp/verifier")
    public ResponseEntity<Map<String, String>> verifierOtp(@Valid @RequestBody OtpVerifierDTO dto) {
        authService.verifierOtp(dto.telephone(), dto.code());
        return ResponseEntity.ok(Map.of("message", "Numéro de téléphone vérifié"));
    }

    // ── Google OAuth2 ────────────────────────────────────────────────────────

    /**
     * Connexion / inscription via Google Identity Services.
     * Retourne 428 PRECONDITION_REQUIRED si le téléphone est manquant pour un nouveau compte.
     */
    @PostMapping("/google")
    public ResponseEntity<AuthResponseDTO> loginGoogle(@Valid @RequestBody GoogleLoginDTO dto) {
        return ResponseEntity.ok(authService.loginAvecGoogle(dto));
    }

    @GetMapping("/google/config")
    public ResponseEntity<Map<String, Object>> googleConfig() {
        return ResponseEntity.ok(Map.of(
                "clientId", googleTokenService.getClientId(),
                "configured", googleTokenService.isConfigured()
        ));
    }
}
