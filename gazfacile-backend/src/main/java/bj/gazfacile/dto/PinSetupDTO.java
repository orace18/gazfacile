package bj.gazfacile.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

/**
 * DTO pour configurer un PIN 6 chiffres (utilisateur authentifié requis).
 */
public record PinSetupDTO(

        @NotBlank(message = "Le PIN est obligatoire")
        @Pattern(regexp = "^\\d{6}$", message = "Le PIN doit comporter exactement 6 chiffres")
        String pin
) {}
