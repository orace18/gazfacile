package bj.gazfacile.dto;

import bj.gazfacile.model.enums.FormatBouteille;
import bj.gazfacile.model.enums.MarqueGaz;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * DTO pour créer ou modifier un produit dans le catalogue d'un revendeur.
 */
@Data
public class ProduitRevendeurDTO {

    @NotNull(message = "La marque est obligatoire")
    private MarqueGaz marque;

    @NotNull(message = "Le format est obligatoire")
    private FormatBouteille format;

    @Min(value = 0, message = "Le prix ne peut pas être négatif")
    private double prixUnitaire;

    @Min(value = 0, message = "La quantité ne peut pas être négative")
    private int quantiteDisponible;

    private boolean disponible = true;
}
