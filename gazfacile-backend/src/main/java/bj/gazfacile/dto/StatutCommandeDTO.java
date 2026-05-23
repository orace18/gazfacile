package bj.gazfacile.dto;

import bj.gazfacile.model.enums.StatutCommande;
import jakarta.validation.constraints.NotNull;

/**
 * DTO pour la mise à jour du statut d'une commande.
 */
public record StatutCommandeDTO(

        @NotNull(message = "Le statut de la commande est obligatoire")
        StatutCommande statutCommande
) {}
