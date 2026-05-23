package bj.gazfacile.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.Instant;

@JsonIgnoreProperties(ignoreUnknown = true)
public record SendOtpResponse(
        String referenceId,
        Instant expiresAt
) {
}
