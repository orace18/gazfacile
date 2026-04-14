package bj.gazfacile.dto;

import bj.gazfacile.model.ProduitRevendeur;
import bj.gazfacile.model.Revendeur;
import bj.gazfacile.model.enums.FormatBouteille;
import bj.gazfacile.model.enums.MarqueGaz;

import java.time.LocalDateTime;

public record AdminCatalogueItemDTO(
        String id,
        String revendeurId,
        String revendeurNom,
        String revendeurTelephone,
        String quartier,
        MarqueGaz marque,
        String marqueLibelle,
        FormatBouteille format,
        String formatLibelle,
        double prixUnitaire,
        int quantiteDisponible,
        boolean disponible,
        LocalDateTime updatedAt
) {
    public static AdminCatalogueItemDTO from(ProduitRevendeur produit, Revendeur revendeur) {
        return new AdminCatalogueItemDTO(
                produit.getId(),
                produit.getRevendeurId(),
                revendeur != null ? revendeur.getNom() : "Revendeur inconnu",
                revendeur != null ? revendeur.getTelephone() : null,
                revendeur != null ? revendeur.getQuartier() : null,
                produit.getMarque(),
                produit.getMarque().getLibelle(),
                produit.getFormat(),
                produit.getFormat().getLibelle(),
                produit.getPrixUnitaire(),
                produit.getQuantiteDisponible(),
                produit.isDisponible(),
                produit.getUpdatedAt()
        );
    }
}
