package bj.gazfacile.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * DTO pour l'authentification d'un utilisateur.
 */
public record LoginDTO(

        @NotBlank(message = "Le numéro de téléphone est obligatoire")
        String telephone,

        @NotBlank(message = "Le mot de passe est obligatoire")
        String password
) {}
