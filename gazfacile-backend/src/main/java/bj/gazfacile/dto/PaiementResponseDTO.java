package bj.gazfacile.dto;

import bj.gazfacile.model.Transaction;
import bj.gazfacile.model.enums.StatutFedaPay;
import bj.gazfacile.model.enums.TypeTransaction;

/**
 * Réponse après initiation d'un paiement FedaPay.
 * Le frontend redirige l'utilisateur vers checkoutUrl pour compléter le paiement.
 */
public record PaiementResponseDTO(
        String transactionId,
        String reference,
        long montant,
        TypeTransaction type,
        StatutFedaPay statut,
        String checkoutUrl
) {
    public static PaiementResponseDTO from(Transaction t) {
        return new PaiementResponseDTO(
                t.getId(),
                t.getReference(),
                t.getMontant(),
                t.getType(),
                t.getStatut(),
                t.getCheckoutUrl()
        );
    }
}
