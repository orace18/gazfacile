package bj.gazfacile.controller;

import bj.gazfacile.dto.ConsultationDTO;
import bj.gazfacile.service.ConsultationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

/**
 * Endpoints du système freemium clients.
 *
 * POST /api/v1/consultations/consulter?fingerprint=XXX  → vérifie + incrémente
 * GET  /api/v1/consultations/statut?fingerprint=XXX     → statut sans incrémenter
 *
 * Ces endpoints sont publics (utilisés par les visiteurs non connectés).
 * Les utilisateurs authentifiés ne passent pas par ces endpoints (géré côté frontend).
 */
@RestController
@RequestMapping("/api/v1/consultations")
@RequiredArgsConstructor
public class ConsultationController {

    private final ConsultationService consultationService;

    /** Format UUID strict pour le fingerprint. */
    private static final java.util.regex.Pattern UUID_PATTERN =
        java.util.regex.Pattern.compile(
            "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");

    /**
     * Enregistre une consultation et retourne le quota restant.
     * Appelé quand un visiteur clique sur "Voir les détails" d'un revendeur.
     */
    @PostMapping("/consulter")
    public ResponseEntity<ConsultationDTO> consulter(
            @RequestParam String fingerprint,
            HttpServletRequest request) {
        validerFingerprint(fingerprint);
        String ip = extractIp(request);
        return ResponseEntity.ok(consultationService.verifierEtIncrementer(fingerprint, ip));
    }

    /**
     * Retourne le statut de consultation sans incrémenter.
     * Appelé au chargement de la page pour afficher le compteur.
     */
    @GetMapping("/statut")
    public ResponseEntity<ConsultationDTO> statut(
            @RequestParam String fingerprint,
            HttpServletRequest request) {
        validerFingerprint(fingerprint);
        String ip = extractIp(request);
        return ResponseEntity.ok(consultationService.getStatut(fingerprint, ip));
    }

    /**
     * Consultation pour un utilisateur connecté (quota abonnement CLIENT_CONSULT).
     */
    @PostMapping("/consulter-auth")
    public ResponseEntity<ConsultationDTO> consulterAuth(Authentication authentication) {
        String telephone = authentication.getName();
        return ResponseEntity.ok(consultationService.consulterAuth(telephone));
    }

    /**
     * Statut de consultation d'un utilisateur connecté (sans incrémenter).
     */
    @GetMapping("/statut-auth")
    public ResponseEntity<ConsultationDTO> statutAuth(Authentication authentication) {
        String telephone = authentication.getName();
        return ResponseEntity.ok(consultationService.getStatutAuth(telephone));
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    /**
     * Valide que le fingerprint est un UUID v4 strict.
     * Empêche l'injection de chaînes arbitraires longues ou malformées.
     */
    private void validerFingerprint(String fingerprint) {
        if (fingerprint == null || !UUID_PATTERN.matcher(fingerprint).matches()) {
            throw new org.springframework.web.server.ResponseStatusException(
                org.springframework.http.HttpStatus.BAD_REQUEST,
                "Fingerprint invalide : format UUID attendu");
        }
    }

    /**
     * Extrait l'IP réelle.
     * On prend la DERNIÈRE IP de X-Forwarded-For (ajoutée par le proxy de confiance),
     * pas la première (qui peut être forgée par le client).
     */
    private String extractIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            String[] parts = forwarded.split(",");
            // Dernière entrée = ajoutée par le proxy le plus proche (trusté)
            return parts[parts.length - 1].trim();
        }
        return request.getRemoteAddr();
    }
}
