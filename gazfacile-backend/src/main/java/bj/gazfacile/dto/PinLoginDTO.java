package bj.gazfacile.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

/**
 * DTO pour la connexion par PIN 6 chiffres.
 */
public record PinLoginDTO(

        @NotBlank(message = "Le numéro de téléphone est obligatoire")
        String telephone,

        @NotBlank(message = "Le PIN est obligatoire")
        @Pattern(regexp = "^\\d{6}$", message = "Le PIN doit comporter exactement 6 chiffres")
        String pin
) {}
