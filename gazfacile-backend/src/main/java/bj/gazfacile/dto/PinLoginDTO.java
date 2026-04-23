package bj.gazfacile.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * DTO pour la connexion par PIN.
 * Le format détaillé est validé dans le service afin de rester compatible
 * avec les anciens codes admin générés avant l'uniformisation vers 6 chiffres.
 */
public record PinLoginDTO(

        @NotBlank(message = "Le numéro de téléphone est obligatoire")
        String telephone,

        @NotBlank(message = "Le PIN est obligatoire")
        String pin
) {}
