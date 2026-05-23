package bj.gazfacile.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record OtpLoginDTO(
        @NotBlank(message = "Le numéro de téléphone est obligatoire")
        String telephone,

        @NotBlank(message = "Le code OTP est obligatoire")
        @Pattern(regexp = "\\d{6}", message = "Le code OTP doit comporter 6 chiffres")
        String code
) {}
