package bj.gazfacile.dto;

import bj.gazfacile.model.enums.StockStatus;
import jakarta.validation.constraints.NotNull;

/**
 * DTO pour la mise à jour du statut de stock d'un revendeur.
 */
public record StockUpdateDTO(

        @NotNull(message = "Le statut de stock est obligatoire")
        StockStatus stockStatus
) {}
