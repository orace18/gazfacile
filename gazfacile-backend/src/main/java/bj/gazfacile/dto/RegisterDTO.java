package bj.gazfacile.dto;

import bj.gazfacile.model.enums.Role;
import jakarta.validation.constraints.NotBlank;

/**
 * DTO pour l'inscription d'un nouvel utilisateur.
 */
public record RegisterDTO(

        @NotBlank(message = "Le numéro de téléphone est obligatoire")
        String telephone,

        @NotBlank(message = "Le nom est obligatoire")
        String nom,

        /** Rôle souhaité : CLIENT ou REVENDEUR. Par défaut CLIENT. */
        Role role,

        @NotBlank(message = "Le code OTP est obligatoire")
        String otpCode
) {}
