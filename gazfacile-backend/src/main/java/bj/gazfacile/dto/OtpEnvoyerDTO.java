package bj.gazfacile.dto;

import jakarta.validation.constraints.NotBlank;

public record OtpEnvoyerDTO(
    @NotBlank(message = "Le numéro de téléphone est obligatoire")
    String telephone
) {}
