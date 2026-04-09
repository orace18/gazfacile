package bj.gazfacile.dto;

import bj.gazfacile.model.enums.Abonnement;
import jakarta.validation.constraints.NotNull;

/**
 * Corps de la requête POST /api/v1/abonnement/souscrire.
 */
public record AbonnementInitDTO(
    @NotNull Abonnement plan
) {}
