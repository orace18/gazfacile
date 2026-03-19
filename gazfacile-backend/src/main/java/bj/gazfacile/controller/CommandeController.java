package bj.gazfacile.controller;

import bj.gazfacile.dto.CommandeDTO;
import bj.gazfacile.dto.StatutCommandeDTO;
import bj.gazfacile.model.Commande;
import bj.gazfacile.service.CommandeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Contrôleur REST pour la gestion des commandes de gaz.
 * Toutes les routes requièrent une authentification.
 */
@RestController
@RequestMapping("/api/v1/commandes")
@RequiredArgsConstructor
public class CommandeController {

    private final CommandeService commandeService;

    /**
     * Crée une nouvelle commande de gaz.
     * Requiert une authentification.
     *
     * @param dto données de la commande validées
     * @return 201 Created avec la commande créée
     */
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Commande> creer(@Valid @RequestBody CommandeDTO dto) {
        Commande commande = commandeService.creer(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(commande);
    }

    /**
     * Retourne toutes les commandes d'un revendeur.
     * Requiert une authentification (le revendeur accède à ses propres commandes).
     *
     * @param id identifiant du revendeur
     */
    @GetMapping("/revendeur/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Commande>> getByRevendeur(@PathVariable String id) {
        return ResponseEntity.ok(commandeService.getByRevendeur(id));
    }

    /**
     * Met à jour le statut d'une commande.
     * Requiert une authentification.
     *
     * @param id  identifiant de la commande
     * @param dto nouveau statut validé
     */
    @PatchMapping("/{id}/statut")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Commande> updateStatut(
            @PathVariable String id,
            @Valid @RequestBody StatutCommandeDTO dto
    ) {
        return ResponseEntity.ok(commandeService.updateStatut(id, dto.statutCommande()));
    }
}
