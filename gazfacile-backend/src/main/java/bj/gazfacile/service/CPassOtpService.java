package bj.gazfacile.service;

import bj.gazfacile.config.CPassProperties;
import bj.gazfacile.dto.SendOtpResponse;
import bj.gazfacile.dto.VerifyOtpResponse;
import bj.gazfacile.exception.OtpExpiredException;
import bj.gazfacile.exception.OtpInvalidException;
import bj.gazfacile.exception.OtpProviderException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.springframework.web.client.RestClient;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Service
@Slf4j
public class CPassOtpService {

    private final CPassProperties properties;
    private final CPassTokenService tokenService;
    private final ObjectMapper objectMapper;
    private final RestClient restClient;

    public CPassOtpService(CPassProperties properties, CPassTokenService tokenService, ObjectMapper objectMapper) {
        this.properties = properties;
        this.tokenService = tokenService;
        this.objectMapper = objectMapper;
        this.restClient = RestClient.builder()
                .baseUrl(normalizeBaseUrl(properties.getBaseUrl()))
                .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    public SendOtpResponse sendOtp(String phoneNumber) {
        ensureEnabled();
        SendOtpResponse response = executeAuthorized("/otp/send", token -> post(
                "/otp/send",
                token,
                Map.of("to", phoneNumber),
                SendOtpResponse.class
        ));
        if (response.referenceId() == null || response.referenceId().isBlank()) {
            throw new OtpProviderException("Réponse CPass invalide sur /otp/send");
        }
        return response;
    }

    public VerifyOtpResponse verifyOtp(String referenceId, String otpCode) {
        ensureEnabled();
        VerifyOtpResponse response = executeAuthorized("/otp/verify", token -> post(
                "/otp/verify",
                token,
                Map.of(
                        "referenceId", referenceId,
                        "otpCode", otpCode
                ),
                VerifyOtpResponse.class
        ));

        if (!response.verified() && Integer.valueOf(0).equals(response.attemptsRemaining())) {
            throw new OtpInvalidException("Code OTP invalide");
        }

        return response;
    }

    private <T> T executeAuthorized(String path, AuthorizedCall<T> call) {
        String accessToken = tokenService.getAccessToken();
        try {
            return call.execute(accessToken);
        } catch (UnauthorizedCpassException e) {
            log.info("[CPass] 401 sur {}, refresh silencieux puis retry", path);
            String refreshedToken = tokenService.refreshAccessToken();
            try {
                return call.execute(refreshedToken);
            } catch (UnauthorizedCpassException retryError) {
                throw new OtpProviderException("Authentification CPass refusée");
            }
        }
    }

    private <T> T post(String uri, String accessToken, Object body, Class<T> responseType) {
        return restClient.post()
                .uri(uri)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .contentType(MediaType.APPLICATION_JSON)
                .body(body)
                .exchange((request, response) -> readResponse(uri, response.getStatusCode(), readBody(response), responseType));
    }

    private <T> T readResponse(String uri, HttpStatusCode statusCode, String body, Class<T> responseType) {
        if (statusCode.is2xxSuccessful()) {
            try {
                return objectMapper.readValue(body, responseType);
            } catch (IOException e) {
                throw new OtpProviderException("Réponse CPass invalide sur " + uri);
            }
        }

        handleError(statusCode, body, uri);
        throw new OtpProviderException("Réponse CPass inattendue sur " + uri);
    }

    private void handleError(HttpStatusCode statusCode, String body, String uri) {
        if (statusCode.value() == 401) {
            throw new UnauthorizedCpassException();
        }

        String providerCode = extractProviderValue(body, "code");
        String providerError = extractProviderValue(body, "error");
        String providerMessage = extractProviderValue(body, "message");
        String combined = (String.join(" ", providerCode, providerError, providerMessage) + " " + body).trim();

        if (combined.contains("OTP_EXPIRED")) {
            throw new OtpExpiredException(providerMessage.isBlank() ? "Le code OTP a expiré" : providerMessage);
        }

        if (combined.contains("OTP_PROVIDER_FAILED")) {
            throw new OtpProviderException(providerMessage.isBlank()
                    ? "Le fournisseur OTP a échoué"
                    : providerMessage);
        }

        throw new OtpProviderException("Erreur CPass sur " + uri + " (" + statusCode.value() + ")");
    }

    private String readBody(org.springframework.http.client.ClientHttpResponse response) {
        try {
            return StreamUtils.copyToString(response.getBody(), StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new OtpProviderException("Impossible de lire la réponse du fournisseur OTP");
        }
    }

    private String extractProviderValue(String body, String key) {
        if (body == null || body.isBlank()) {
            return "";
        }

        try {
            Map<String, Object> payload = objectMapper.readValue(body, new TypeReference<>() {
            });
            Object value = payload.get(key);
            return value != null ? value.toString() : "";
        } catch (IOException e) {
            return body;
        }
    }

    private void ensureEnabled() {
        if (!properties.isEnabled()) {
            throw new OtpProviderException("Le fournisseur OTP CPass est désactivé");
        }
    }

    private static String normalizeBaseUrl(String baseUrl) {
        if (baseUrl == null) {
            return "";
        }
        return baseUrl.endsWith("/") ? baseUrl.substring(0, baseUrl.length() - 1) : baseUrl;
    }

    @FunctionalInterface
    private interface AuthorizedCall<T> {
        T execute(String accessToken);
    }

    private static final class UnauthorizedCpassException extends RuntimeException {
    }
}
