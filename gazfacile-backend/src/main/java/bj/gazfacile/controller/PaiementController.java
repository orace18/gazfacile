package bj.gazfacile.controller;

import bj.gazfacile.dto.PaiementInitDTO;
import bj.gazfacile.dto.PaiementResponseDTO;
import bj.gazfacile.dto.PaiementStatutDTO;
import bj.gazfacile.model.Transaction;
import bj.gazfacile.service.FedaPayService;
import bj.gazfacile.service.PaiementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Contrôleur REST pour les paiements FedaPay.
 *
 * POST /api/v1/paiement/initier           → initie un paiement (authentifié)
 * POST /api/v1/paiement/webhook           → reçoit les notifications FedaPay (public)
 * GET  /api/v1/paiement/historique        → historique admin (ADMIN)
 * GET  /api/v1/paiement/transaction/{ref} → détail d'une transaction (authentifié)
 */
@RestController
@RequestMapping("/api/v1/paiement")
@RequiredArgsConstructor
@Slf4j
public class PaiementController {

    private final PaiementService paiementService;
    private final FedaPayService fedaPayService;

    /**
     * Initie un paiement FedaPay.
     * Retourne l'URL checkout à afficher au client.
     */
    @PostMapping("/initier")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<PaiementResponseDTO> initier(
            @Valid @RequestBody PaiementInitDTO dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        PaiementResponseDTO response = paiementService.initierPaiement(dto, userDetails.getUsername(), isAdmin);
        return ResponseEntity.ok(response);
    }

    /**
     * Endpoint webhook FedaPay — reçoit les notifications de statut de paiement.
     * Route publique (FedaPay appelle ce endpoint directement).
     * La signature HMAC-SHA256 est vérifiée avant tout traitement.
     */
    @PostMapping("/webhook")
    public ResponseEntity<Void> webhook(
            @RequestHeader(value = "x-fedapay-signature", required = false) String signature,
            @RequestBody String payload) {

        log.info("[Webhook] Requête reçue — signature présente: {}", signature != null);

        // Vérifier la signature FedaPay
        if (signature == null || !fedaPayService.verifierSignatureWebhook(payload, signature)) {
            log.warn("[Webhook] Signature invalide ou absente — requête ignorée. Payload: {}", payload.substring(0, Math.min(200, payload.length())));
            return ResponseEntity.status(401).build();
        }

        try {
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            Map<?, ?> body = mapper.readValue(payload, Map.class);
            String eventName = (String) body.get("name");

            Map<?, ?> entity = (Map<?, ?>) body.get("entity");
            if (entity == null) {
                log.warn("[Webhook] Payload sans 'entity' — ignoré");
                return ResponseEntity.ok().build();
            }

            // payment_request.approved : l'entité est un payment_request, l'ID transaction est dans transaction_id
            // transaction.* : l'entité est directement la transaction
            long fedaPayId;
            if (eventName != null && eventName.startsWith("payment_request.")) {
                Object txId = entity.get("transaction_id");
                if (txId == null) {
                    log.warn("[Webhook] payment_request sans transaction_id — ignoré. Payload: {}", payload.substring(0, Math.min(300, payload.length())));
                    return ResponseEntity.ok().build();
                }
                fedaPayId = ((Number) txId).longValue();
            } else {
                fedaPayId = ((Number) entity.get("id")).longValue();
            }

            String statut = (String) entity.get("status");

            log.info("[Webhook] FedaPay event '{}' — Transaction {} → {}", eventName, fedaPayId, statut);
            paiementService.traiterWebhook(fedaPayId, statut);

        } catch (Exception ex) {
            log.error("[Webhook] Erreur traitement: {}", ex.getMessage());
        }

        // Toujours répondre 200 à FedaPay pour éviter les retransmissions
        return ResponseEntity.ok().build();
    }

    /**
     * Historique complet des transactions (admin uniquement).
     */
    @GetMapping("/historique")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Transaction>> getHistorique() {
        return ResponseEntity.ok(paiementService.getHistorique());
    }

    /**
     * Détail d'une transaction par sa référence interne.
     * Requiert une authentification. Seul le client ayant initié la transaction (ou un admin) peut y accéder.
     */
    @GetMapping("/transaction/{reference}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Transaction> getTransaction(
            @PathVariable String reference,
            @AuthenticationPrincipal UserDetails userDetails) {
        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        return ResponseEntity.ok(paiementService.getByReference(reference, userDetails.getUsername(), isAdmin));
    }

    /**
     * Statut public minimal pour la page de confirmation FedaPay.
     * Ne retourne ni téléphone, ni email, ni token checkout.
     */
    @GetMapping("/confirmation/{reference}")
    public ResponseEntity<PaiementStatutDTO> getStatutConfirmation(@PathVariable String reference) {
        return ResponseEntity.ok(paiementService.getStatutPublicByReference(reference));
    }
}
