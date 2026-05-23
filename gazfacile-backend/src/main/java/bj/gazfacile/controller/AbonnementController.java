package bj.gazfacile.controller;

import bj.gazfacile.dto.AbonnementInitDTO;
import bj.gazfacile.dto.AbonnementStatutDTO;
import bj.gazfacile.dto.PaiementInitDTO;
import bj.gazfacile.dto.PaiementResponseDTO;
import bj.gazfacile.service.AbonnementService;
import bj.gazfacile.service.PaiementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

/**
 * Endpoints de gestion des abonnements revendeurs.
 *
 * GET  /api/v1/abonnement/statut       → statut de l'abonnement actuel
 * POST /api/v1/abonnement/souscrire    → initier le paiement FedaPay pour un plan
 */
@RestController
@RequestMapping("/api/v1/abonnement")
@RequiredArgsConstructor
public class AbonnementController {

    private final AbonnementService abonnementService;
    private final PaiementService paiementService;

    /** Statut d'abonnement du revendeur connecté. */
    @GetMapping("/statut")
    @PreAuthorize("hasAnyRole('REVENDEUR', 'ADMIN')")
    public ResponseEntity<AbonnementStatutDTO> getStatut(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(abonnementService.getStatut(userDetails.getUsername()));
    }

    /**
     * Initie le paiement FedaPay pour souscrire au plan demandé.
     * Retourne l'URL de checkout vers laquelle rediriger le client.
     */
    @PostMapping("/souscrire")
    @PreAuthorize("hasAnyRole('REVENDEUR', 'ADMIN')")
    public ResponseEntity<PaiementResponseDTO> souscrire(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody AbonnementInitDTO dto) {
        PaiementInitDTO paiementDto = abonnementService.preparerSouscription(
                userDetails.getUsername(), dto);
        PaiementResponseDTO response = paiementService.initierPaiement(paiementDto);
        return ResponseEntity.ok(response);
    }
}
