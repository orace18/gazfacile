package bj.gazfacile.dto;

import bj.gazfacile.model.enums.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * DTO pour l'inscription d'un nouvel utilisateur.
 */
public record RegisterDTO(

        @NotBlank(message = "Le numéro de téléphone est obligatoire")
        String telephone,

        String email,

        @NotBlank(message = "Le mot de passe est obligatoire")
        @Size(min = 8, message = "Le mot de passe doit contenir au moins 8 caractères")
        String password,

        @NotBlank(message = "Le nom est obligatoire")
        String nom,

        /** Rôle souhaité : CLIENT ou REVENDEUR. Par défaut CLIENT. */
        Role role
) {}
