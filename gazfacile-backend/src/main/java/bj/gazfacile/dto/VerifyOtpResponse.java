package bj.gazfacile.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record VerifyOtpResponse(
        boolean verified,
        Integer attemptsRemaining
) {
}
