package bj.gazfacile.model;

import bj.gazfacile.model.enums.StatutFedaPay;
import bj.gazfacile.model.enums.TypeTransaction;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * Historique de toutes les transactions FedaPay de la plateforme.
 * Couvre les paiements de commandes et d'abonnements revendeurs.
 */
@Document(collection = "transactions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    private String id;

    /** Identifiant numérique de la transaction côté FedaPay. */
    @Indexed
    private Long fedaPayId;

    /** Référence interne GazFacile (ex: GF-XXXXXXXX). */
    @Indexed(unique = true)
    private String reference;

    /** Montant en FCFA. */
    private long montant;

    private String description;

    private String clientTelephone;

    private String clientEmail;

    private String clientNom;

    private TypeTransaction type;

    @Builder.Default
    private StatutFedaPay statut = StatutFedaPay.PENDING;

    /** Identifiant de la commande liée (si type = COMMANDE). */
    private String commandeId;

    /** Identifiant du revendeur lié (si type = ABONNEMENT). */
    private String revendeurId;

    /** URL de paiement FedaPay à afficher au client. */
    private String checkoutUrl;

    /** Token FedaPay pour construire l'URL checkout. */
    private String token;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
