package bj.gazfacile.dto;

import bj.gazfacile.model.SubscriptionPlan;
import bj.gazfacile.model.enums.PlanType;

import java.util.List;

public record SubscriptionPlanDTO(
        String id,
        PlanType type,
        String nom,
        String code,
        int prix,
        int dureeJours,
        int quota,
        String description,
        List<String> features
) {
    public static SubscriptionPlanDTO from(SubscriptionPlan plan) {
        return new SubscriptionPlanDTO(
                plan.getId(),
                plan.getType(),
                plan.getNom(),
                plan.getCode(),
                plan.getPrix(),
                plan.getDureeJours(),
                plan.getQuota(),
                plan.getDescription(),
                plan.getFeatures()
        );
    }
}
