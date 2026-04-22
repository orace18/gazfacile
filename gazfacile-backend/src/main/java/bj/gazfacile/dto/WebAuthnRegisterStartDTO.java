package bj.gazfacile.dto;

import bj.gazfacile.model.enums.Role;
import jakarta.validation.constraints.NotBlank;

/**
 * DTO pour démarrer l'inscription WebAuthn (Passkeys).
 * Retourne les options de création de credential à envoyer au navigateur.
 */
public record WebAuthnRegisterStartDTO(

        @NotBlank(message = "Le numéro de téléphone est obligatoire")
        String telephone,

        @NotBlank(message = "Le nom est obligatoire")
        String nom,

        /** Rôle souhaité : CLIENT ou REVENDEUR. Par défaut CLIENT. */
        Role role
) {}
