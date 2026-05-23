package bj.gazfacile.dto;

import bj.gazfacile.model.ProduitRevendeur;
import bj.gazfacile.model.enums.FormatBouteille;
import bj.gazfacile.model.enums.MarqueGaz;

import java.time.LocalDateTime;

/**
 * DTO de réponse pour un produit du catalogue revendeur.
 */
public record ProduitRevendeurResponseDTO(
        String id,
        String revendeurId,
        MarqueGaz marque,
        String marqueLibelle,
        FormatBouteille format,
        String formatLibelle,
        double prixUnitaire,
        int quantiteDisponible,
        boolean disponible,
        LocalDateTime updatedAt
) {
    public static ProduitRevendeurResponseDTO from(ProduitRevendeur p) {
        return new ProduitRevendeurResponseDTO(
                p.getId(),
                p.getRevendeurId(),
                p.getMarque(),
                p.getMarque().getLibelle(),
                p.getFormat(),
                p.getFormat().getLibelle(),
                p.getPrixUnitaire(),
                p.getQuantiteDisponible(),
                p.isDisponible(),
                p.getUpdatedAt()
        );
    }
}
