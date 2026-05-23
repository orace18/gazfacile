package bj.gazfacile.dto;

import bj.gazfacile.model.Revendeur;
import bj.gazfacile.model.enums.Abonnement;

import java.time.LocalDateTime;

public record AbonnementStatutDTO(
    Abonnement plan,
    String planLibelle,
    long prix,
    String description,
    boolean actif,
    boolean expire,
    LocalDateTime expiry,
    int maxProduits
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
            plan.getPrix(),
            plan.getDescription(),
            actif,
            expire,
            expiry,
            plan.getMaxProduits()
        );
    }
}
