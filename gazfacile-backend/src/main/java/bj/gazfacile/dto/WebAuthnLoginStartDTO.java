package bj.gazfacile.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * DTO pour démarrer la connexion WebAuthn.
 * Retourne les options d'authentification à envoyer au navigateur.
 */
public record WebAuthnLoginStartDTO(

        @NotBlank(message = "Le numéro de téléphone est obligatoire")
        String telephone
) {}
