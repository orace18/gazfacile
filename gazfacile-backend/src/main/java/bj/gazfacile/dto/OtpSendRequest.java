package bj.gazfacile.dto;

import jakarta.validation.constraints.NotBlank;

public record OtpSendRequest(
        @NotBlank(message = "Le numéro de téléphone est obligatoire")
        String phoneNumber
) {
}
