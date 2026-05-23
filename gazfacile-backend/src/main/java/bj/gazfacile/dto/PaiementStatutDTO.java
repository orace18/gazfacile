package bj.gazfacile.dto;

import bj.gazfacile.model.Transaction;
import bj.gazfacile.model.enums.StatutFedaPay;
import bj.gazfacile.model.enums.TypeTransaction;

public record PaiementStatutDTO(
        String reference,
        long montant,
        TypeTransaction type,
        StatutFedaPay statut
) {
    public static PaiementStatutDTO from(Transaction transaction) {
        return new PaiementStatutDTO(
                transaction.getReference(),
                transaction.getMontant(),
                transaction.getType(),
                transaction.getStatut()
        );
    }
}
