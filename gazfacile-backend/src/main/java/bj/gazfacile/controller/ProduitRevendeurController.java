package bj.gazfacile.controller;

import bj.gazfacile.dto.ProduitRevendeurDTO;
import bj.gazfacile.dto.ProduitRevendeurResponseDTO;
import bj.gazfacile.service.ProduitRevendeurService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * API REST pour la gestion du catalogue de produits d'un revendeur.
 *
 * GET  /api/v1/revendeurs/{id}/produits          → public (lecture catalogue)
 * POST /api/v1/revendeurs/{id}/produits          → revendeur authentifié (ajout)
 * PUT  /api/v1/revendeurs/{id}/produits/{pid}    → revendeur authentifié (modification)
 * DELETE /api/v1/revendeurs/{id}/produits/{pid}  → revendeur authentifié (suppression)
 */
@RestController
@RequestMapping("/api/v1/revendeurs/{revendeurId}/produits")
@RequiredArgsConstructor
public class ProduitRevendeurController {

    private final ProduitRevendeurService produitService;

    /** Liste tout le catalogue d'un revendeur (accès public). */
    @GetMapping
    public ResponseEntity<List<ProduitRevendeurResponseDTO>> getCatalogue(
            @PathVariable String revendeurId) {
        return ResponseEntity.ok(produitService.getCatalogue(revendeurId));
    }

    /** Liste uniquement les produits disponibles (accès public). */
    @GetMapping("/disponibles")
    public ResponseEntity<List<ProduitRevendeurResponseDTO>> getCatalogueDisponible(
            @PathVariable String revendeurId) {
        return ResponseEntity.ok(produitService.getCatalogueDisponible(revendeurId));
    }

    /** Ajoute un produit au catalogue (revendeur propriétaire ou admin). */
    @PostMapping
    public ResponseEntity<ProduitRevendeurResponseDTO> ajouter(
            @PathVariable String revendeurId,
            @Valid @RequestBody ProduitRevendeurDTO dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        ProduitRevendeurResponseDTO response = produitService.ajouter(revendeurId, dto, userDetails.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /** Modifie un produit existant (revendeur propriétaire ou admin). */
    @PutMapping("/{produitId}")
    public ResponseEntity<ProduitRevendeurResponseDTO> modifier(
            @PathVariable String revendeurId,
            @PathVariable String produitId,
            @Valid @RequestBody ProduitRevendeurDTO dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        ProduitRevendeurResponseDTO response = produitService.modifier(revendeurId, produitId, dto, userDetails.getUsername());
        return ResponseEntity.ok(response);
    }

    /** Supprime un produit du catalogue (revendeur propriétaire ou admin). */
    @DeleteMapping("/{produitId}")
    public ResponseEntity<Void> supprimer(
            @PathVariable String revendeurId,
            @PathVariable String produitId,
            @AuthenticationPrincipal UserDetails userDetails) {
        produitService.supprimer(revendeurId, produitId, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }
}
