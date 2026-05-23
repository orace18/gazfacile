package bj.gazfacile.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record OtpVerifierDTO(
    @NotBlank String telephone,
    @NotBlank @Pattern(regexp = "\\d{6}", message = "Le code OTP doit comporter 6 chiffres")
    String code
) {}
