package bj.gazfacile.dto;

import jakarta.validation.constraints.NotBlank;

public record SubscribeRequestDTO(
        @NotBlank(message = "Le code du plan est obligatoire")
        String planCode
) {}
