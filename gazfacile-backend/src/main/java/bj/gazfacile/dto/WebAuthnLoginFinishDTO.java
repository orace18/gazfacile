package bj.gazfacile.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.Map;

/**
 * DTO pour finaliser la connexion WebAuthn.
 * Le champ assertion correspond à l'AuthenticationResponseJSON renvoyé par @simplewebauthn/browser.
 */
public record WebAuthnLoginFinishDTO(

        @NotBlank(message = "Le numéro de téléphone est obligatoire")
        String telephone,

        @NotNull(message = "L'assertion WebAuthn est obligatoire")
        Map<String, Object> assertion
) {}
