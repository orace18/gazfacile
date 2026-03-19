package bj.gazfacile.model;

import bj.gazfacile.model.enums.Abonnement;
import bj.gazfacile.model.enums.StockStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Entité représentant un revendeur de gaz domestique au Bénin.
 * La propriété location stocke [longitude, latitude] pour les requêtes géospatiales MongoDB.
 */
@Document(collection = "revendeurs")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Revendeur {

    @Id
    private String id;

    @NotBlank(message = "Le nom est obligatoire")
    private String nom;

    @NotBlank(message = "Le quartier est obligatoire")
    private String quartier;

    private String adresse;

    @NotBlank(message = "Le numéro de téléphone est obligatoire")
    private String telephone;

    private String email;

    /**
     * Coordonnées géographiques au format GeoJSON : [longitude, latitude].
     * Indexé GEO_2DSPHERE pour les requêtes $near.
     */
    @GeoSpatialIndexed(type = GeoSpatialIndexType.GEO_2DSPHERE)
    private double[] location;

    @Builder.Default
    private List<String> marques = new ArrayList<>();

    @Builder.Default
    private StockStatus stockStatus = StockStatus.EN_STOCK;

    @Builder.Default
    private boolean livraison = false;

    @Builder.Default
    private boolean actif = true;

    private String userId;

    @Builder.Default
    private double noteMoyenne = 0.0;

    @Builder.Default
    private int nombreAvis = 0;

    @Builder.Default
    private Abonnement abonnement = Abonnement.GRATUIT;

    private LocalDateTime abonnementExpiry;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
