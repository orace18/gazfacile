package bj.gazfacile.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.Map;

/**
 * DTO pour finaliser l'inscription WebAuthn.
 * Le champ credential correspond au RegistrationResponseJSON renvoyé par @simplewebauthn/browser.
 */
public record WebAuthnRegisterFinishDTO(

        @NotBlank(message = "Le numéro de téléphone est obligatoire")
        String telephone,

        @NotNull(message = "Le credential WebAuthn est obligatoire")
        Map<String, Object> credential
) {}
