package bj.gazfacile.model;

import bj.gazfacile.model.enums.ModePaiement;
import bj.gazfacile.model.enums.StatutCommande;
import bj.gazfacile.model.enums.StatutPaiement;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * Entité représentant une commande de gaz passée par un client.
 */
@Document(collection = "commandes")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Commande {

    @Id
    private String id;

    private String revendeurId;

    private String revendeurNom;

    private String clientTelephone;

    private String clientAdresseLivraison;

    /** Coordonnées du client [longitude, latitude] pour optimiser la livraison. */
    private double[] clientLocation;

    private String marque;

    /** Taille de la bouteille : "6kg" ou "12kg". */
    private String taille;

    private int quantite;

    private double prixUnitaire;

    private double total;

    /** Acompte requis avant prise en compte pour un paiement à la livraison. */
    private long acompteRequis;

    /** Solde à régler en espèces à la livraison après paiement de l'acompte. */
    private double montantRestant;

    private ModePaiement modePaiement;

    @Builder.Default
    private StatutPaiement statutPaiement = StatutPaiement.EN_ATTENTE;

    @Builder.Default
    private StatutCommande statutCommande = StatutCommande.EN_ATTENTE;

    /** Référence de la transaction Mobile Money. */
    private String referenceTransaction;

    private String livreurAssigne;

    private double distanceKm;

    private int fraisSupplementaires;

    private LocalDateTime createdAt;

    private LocalDateTime livraisonAt;
}
