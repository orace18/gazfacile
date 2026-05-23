package bj.gazfacile.dto;

import bj.gazfacile.model.SubscriptionPlan;
import bj.gazfacile.model.enums.PlanType;

import java.util.List;

/**
 * DTO admin pour un plan d'abonnement (inclut actif et ordre).
 */
public record AdminSubscriptionPlanDTO(
        String id,
        PlanType type,
        String nom,
        String code,
        int prix,
        int dureeJours,
        int quota,
        String description,
        List<String> features,
        boolean actif,
        int ordre
) {
    public static AdminSubscriptionPlanDTO from(SubscriptionPlan plan) {
        return new AdminSubscriptionPlanDTO(
                plan.getId(),
                plan.getType(),
                plan.getNom(),
                plan.getCode(),
                plan.getPrix(),
                plan.getDureeJours(),
                plan.getQuota(),
                plan.getDescription(),
                plan.getFeatures(),
                plan.isActif(),
                plan.getOrdre()
        );
    }
}
