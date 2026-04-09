package bj.gazfacile.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * ID token Google envoyé depuis le frontend après le sign-in Google Identity Services.
 */
public record GoogleLoginDTO(
    @NotBlank(message = "Le token Google est obligatoire")
    String idToken,
    /** Numéro de téléphone optionnel — requis si c'est la première connexion Google. */
    String telephone
) {}
