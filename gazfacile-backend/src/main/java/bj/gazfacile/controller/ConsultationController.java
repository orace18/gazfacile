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

    /**
     * Enregistre une consultation et retourne le quota restant.
     * Appelé quand un visiteur clique sur "Voir les détails" d'un revendeur.
     */
    @PostMapping("/consulter")
    public ResponseEntity<ConsultationDTO> consulter(
            @RequestParam String fingerprint,
            HttpServletRequest request) {
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

    /** Extrait l'IP réelle en tenant compte des proxys (Render, Netlify, etc.). */
    private String extractIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            return forwarded.split(",")[0].trim();
        }
        String realIp = request.getHeader("X-Real-IP");
        if (realIp != null && !realIp.isBlank()) {
            return realIp.trim();
        }
        return request.getRemoteAddr();
    }
}
