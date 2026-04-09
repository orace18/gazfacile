package bj.gazfacile.dto;

import bj.gazfacile.model.Revendeur;
import bj.gazfacile.model.enums.Abonnement;

import java.time.LocalDateTime;

/**
 * Statut d'abonnement d'un revendeur, retourné par GET /api/v1/abonnement/statut.
 */
public record AbonnementStatutDTO(
    Abonnement plan,
    String planLibelle,
    long prixMensuel,
    String description,
    boolean actif,
    boolean expire,
    LocalDateTime expiry,
    int maxProduits,
    boolean prioriteClassement,
    boolean badgePremium
) {
    public static AbonnementStatutDTO from(Revendeur revendeur) {
        Abonnement plan = revendeur.getAbonnement() != null ? revendeur.getAbonnement() : Abonnement.GRATUIT;
        LocalDateTime expiry = revendeur.getAbonnementExpiry();

        boolean actif = plan == Abonnement.GRATUIT ||
                        (expiry != null && expiry.isAfter(LocalDateTime.now()));
        boolean expire = plan != Abonnement.GRATUIT &&
                         (expiry == null || expiry.isBefore(LocalDateTime.now()));

        return new AbonnementStatutDTO(
            plan,
            plan.getLibelle(),
            plan.getPrixMensuel(),
            plan.getDescription(),
            actif,
            expire,
            expiry,
            plan.getMaxProduits(),
            plan.isPrioriteClassement(),
            plan.isBadgePremium()
        );
    }
}
