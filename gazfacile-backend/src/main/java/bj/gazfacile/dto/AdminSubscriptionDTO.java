package bj.gazfacile.dto;

import bj.gazfacile.model.Subscription;
import bj.gazfacile.model.User;
import bj.gazfacile.model.enums.PlanType;
import bj.gazfacile.model.enums.SubscriptionStatus;

import java.time.LocalDateTime;

public record AdminSubscriptionDTO(
        String id,
        String userId,
        String userNom,
        String userTelephone,
        String planCode,
        PlanType planType,
        LocalDateTime createdAt,
        LocalDateTime dateDebut,
        LocalDateTime dateFin,
        int quotaRestant,
        SubscriptionStatus statut
) {
    public static AdminSubscriptionDTO from(Subscription subscription, User user) {
        return new AdminSubscriptionDTO(
                subscription.getId(),
                subscription.getUserId(),
                user != null ? user.getNom() : "Utilisateur inconnu",
                user != null ? user.getTelephone() : null,
                subscription.getPlanCode(),
                subscription.getPlanType(),
                subscription.getCreatedAt(),
                subscription.getDateDebut(),
                subscription.getDateFin(),
                subscription.getQuotaRestant(),
                subscription.getStatut()
        );
    }
}
