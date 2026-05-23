package bj.gazfacile.model;

import bj.gazfacile.model.enums.FormatBouteille;
import bj.gazfacile.model.enums.MarqueGaz;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * Produit (bouteille de gaz) proposé par un revendeur avec son prix et sa quantité.
 * Chaque combinaison (revendeurId + marque + format) doit être unique.
 */
@Document(collection = "produits_revendeur")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProduitRevendeur {

    @Id
    private String id;

    @Indexed
    private String revendeurId;

    private MarqueGaz marque;

    private FormatBouteille format;

    /** Prix en FCFA. */
    private double prixUnitaire;

    /** Nombre de bouteilles disponibles. */
    @Builder.Default
    private int quantiteDisponible = 0;

    @Builder.Default
    private boolean disponible = true;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
