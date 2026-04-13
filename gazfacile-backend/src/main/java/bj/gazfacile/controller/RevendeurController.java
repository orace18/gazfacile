package bj.gazfacile.controller;

import bj.gazfacile.dto.RevendeurDTO;
import bj.gazfacile.dto.StockUpdateDTO;
import bj.gazfacile.model.Revendeur;
import bj.gazfacile.service.RevendeurService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Contrôleur REST pour la gestion des revendeurs de gaz.
 *
 * Routes publiques (GET) : consultation de la liste et recherche géospatiale.
 * Routes protégées (POST/PATCH) : inscription et modification requiert une authentification.
 */
@RestController
@RequestMapping("/api/v1/revendeurs")
@RequiredArgsConstructor
public class RevendeurController {

    private final RevendeurService revendeurService;

    /**
     * Liste tous les revendeurs actifs.
     * Route publique.
     */
    @GetMapping
    public ResponseEntity<List<Revendeur>> getAllActifs() {
        return ResponseEntity.ok(revendeurService.getAllActifs());
    }

    /**
     * Recherche géospatiale : revendeurs à proximité d'un point.
     *
     * @param lat    latitude de l'utilisateur
     * @param lng    longitude de l'utilisateur
     * @param radius rayon de recherche en mètres (défaut : 5000)
     */
    @GetMapping("/nearby")
    public ResponseEntity<List<Revendeur>> getNearby(
            @RequestParam double lat,
            @RequestParam double lng,
            @RequestParam(defaultValue = "5000") double radius
    ) {
        return ResponseEntity.ok(revendeurService.getNearby(lat, lng, radius));
    }

    /**
     * Recherche géospatiale : revendeurs proches avec stock disponible.
     *
     * @param lat    latitude de l'utilisateur
     * @param lng    longitude de l'utilisateur
     * @param radius rayon de recherche en mètres (défaut : 5000)
     */
    @GetMapping("/nearby/stock")
    public ResponseEntity<List<Revendeur>> getNearbyWithStock(
            @RequestParam double lat,
            @RequestParam double lng,
            @RequestParam(defaultValue = "5000") double radius
    ) {
        return ResponseEntity.ok(revendeurService.getNearbyWithStock(lat, lng, radius));
    }

    /**
     * Retourne le dépôt de l'utilisateur connecté.
     * Requiert une authentification.
     */
    @GetMapping("/mon-depot")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Revendeur> getMonDepot(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(revendeurService.getByUserId(userDetails.getUsername()));
    }

    /**
     * Retourne un revendeur par son identifiant.
     * Route publique.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Revendeur> getById(@PathVariable String id) {
        return ResponseEntity.ok(revendeurService.getById(id));
    }

    /**
     * Inscrit un nouveau revendeur de gaz.
     * Requiert une authentification (rôle REVENDEUR).
     *
     * @param dto         données du revendeur à créer
     * @param userDetails utilisateur authentifié (extrait du JWT)
     */
    @PostMapping
    @PreAuthorize("hasRole('REVENDEUR') or hasRole('ADMIN')")
    public ResponseEntity<Revendeur> inscrire(
            @Valid @RequestBody RevendeurDTO dto,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        String telephoneCompte = userDetails.getUsername();
        Revendeur revendeur = revendeurService.inscrire(dto, telephoneCompte);
        return ResponseEntity.status(HttpStatus.CREATED).body(revendeur);
    }

    /**
     * Met à jour le statut de stock d'un revendeur.
     * Déclenche un broadcast WebSocket sur /topic/stock.
     * Requiert une authentification.
     */
    @PatchMapping("/{id}/stock")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Revendeur> updateStock(
            @PathVariable String id,
            @Valid @RequestBody StockUpdateDTO dto
    ) {
        return ResponseEntity.ok(revendeurService.updateStock(id, dto));
    }

    /**
     * Active ou désactive un revendeur.
     * Réservé aux administrateurs.
     */
    @PatchMapping("/{id}/toggle")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Revendeur> toggleActif(@PathVariable String id) {
        return ResponseEntity.ok(revendeurService.toggleActif(id));
    }
}
