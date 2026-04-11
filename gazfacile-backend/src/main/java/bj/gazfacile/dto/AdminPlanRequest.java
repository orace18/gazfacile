package bj.gazfacile.dto;

import bj.gazfacile.model.enums.PlanType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

/**
 * DTO pour créer ou modifier un plan d'abonnement via l'admin.
 */
public record AdminPlanRequest(
        @NotNull PlanType type,
        @NotBlank String nom,
        @NotBlank String code,
        @Min(0) int prix,
        @Min(1) int dureeJours,
        @Min(0) int quota,
        String description,
        List<String> features,
        int ordre
) {}
