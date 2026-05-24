package bj.gazfacile.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * DTO pour soumettre un avis sur un revendeur.
 */
public record AvisDTO(

        @NotBlank(message = "L'identifiant du revendeur est obligatoire")
        String revendeurId,

        @NotBlank(message = "Votre nom est obligatoire")
        String auteurNom,

        // Ignoré à la création : le téléphone fiable vient du JWT côté service.
        String auteurTelephone,

        @NotNull(message = "La note est obligatoire")
        @Min(value = 1, message = "La note minimum est 1")
        @Max(value = 5, message = "La note maximum est 5")
        Integer note,

        String commentaire
) {}
