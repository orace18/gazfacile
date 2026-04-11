package bj.gazfacile.dto;

import bj.gazfacile.model.Subscription;
import bj.gazfacile.model.enums.PlanType;
import bj.gazfacile.model.enums.SubscriptionStatus;

import java.time.LocalDateTime;

public record SubscriptionDTO(
        String id,
        String planCode,
        PlanType planType,
        LocalDateTime dateDebut,
        LocalDateTime dateFin,
        int quotaRestant,
        SubscriptionStatus statut
) {
    public static SubscriptionDTO from(Subscription sub) {
        return new SubscriptionDTO(
                sub.getId(),
                sub.getPlanCode(),
                sub.getPlanType(),
                sub.getDateDebut(),
                sub.getDateFin(),
                sub.getQuotaRestant(),
                sub.getStatut()
        );
    }
}
