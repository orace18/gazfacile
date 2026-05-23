package bj.gazfacile.dto;

import bj.gazfacile.model.enums.TypeTransaction;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * DTO pour initier un paiement FedaPay.
 */
@Data
public class PaiementInitDTO {

    @NotNull(message = "Le type de transaction est obligatoire")
    private TypeTransaction type;

    @Min(value = 1, message = "Le montant doit être positif")
    private long montant;

    @NotBlank(message = "La description est obligatoire")
    private String description;

    @NotBlank(message = "Le téléphone est obligatoire")
    private String clientTelephone;

    private String clientEmail;

    private String clientNom;

    /** Identifiant de la commande (si type = COMMANDE). */
    private String commandeId;

    /** Identifiant du revendeur (si type = ABONNEMENT). */
    private String revendeurId;

    /** Identifiant de la subscription (si type = ABONNEMENT). */
    private String subscriptionId;
}
