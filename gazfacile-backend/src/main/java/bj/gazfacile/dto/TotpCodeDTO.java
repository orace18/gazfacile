package bj.gazfacile.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

/** DTO pour soumettre un code TOTP à 6 chiffres. */
public record TotpCodeDTO(
        @NotBlank(message = "Le code TOTP est obligatoire")
        @Pattern(regexp = "^\\d{6}$", message = "Le code TOTP doit comporter exactement 6 chiffres")
        String code
) {}
