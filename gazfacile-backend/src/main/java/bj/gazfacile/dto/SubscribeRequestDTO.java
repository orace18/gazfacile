package bj.gazfacile.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record SubscribeRequestDTO(
        @NotBlank(message = "Le code du plan est obligatoire")
        String planCode,

        @Pattern(
                regexp = "^$|^\\d{8}$",
                message = "Le numéro de paiement doit comporter 8 chiffres"
        )
        String telephonePaiement
) {}
