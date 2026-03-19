package bj.gazfacile.controller;

import bj.gazfacile.dto.AvisDTO;
import bj.gazfacile.model.Avis;
import bj.gazfacile.service.AvisService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Contrôleur REST pour les avis clients sur les revendeurs.
 */
@RestController
@RequestMapping("/api/v1/avis")
@RequiredArgsConstructor
public class AvisController {

    private final AvisService avisService;

    /**
     * Soumet un avis pour un revendeur.
     * Route publique : tout visiteur peut laisser un avis.
     */
    @PostMapping
    public ResponseEntity<Avis> soumettre(@Valid @RequestBody AvisDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(avisService.soumettre(dto));
    }

    /**
     * Retourne tous les avis d'un revendeur.
     * Route publique.
     */
    @GetMapping("/revendeur/{revendeurId}")
    public ResponseEntity<List<Avis>> getByRevendeur(@PathVariable String revendeurId) {
        return ResponseEntity.ok(avisService.getByRevendeur(revendeurId));
    }
}
