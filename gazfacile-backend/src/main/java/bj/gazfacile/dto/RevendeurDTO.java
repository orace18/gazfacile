package bj.gazfacile.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

/**
 * DTO pour la création et la mise à jour d'un revendeur.
 */
public record RevendeurDTO(

        @NotBlank(message = "Le nom est obligatoire")
        String nom,

        @NotBlank(message = "Le quartier est obligatoire")
        String quartier,

        String adresse,

        @NotBlank(message = "Le numéro de téléphone est obligatoire")
        String telephone,

        String email,

        /**
         * Coordonnées [longitude, latitude] au format GeoJSON.
         * Exemple : [2.3912, 6.3703] pour Cotonou.
         */
        @NotNull(message = "La localisation est obligatoire")
        @Size(min = 2, max = 2, message = "La localisation doit contenir exactement [longitude, latitude]")
        double[] location,

        List<String> marques,

        boolean livraison
) {}
