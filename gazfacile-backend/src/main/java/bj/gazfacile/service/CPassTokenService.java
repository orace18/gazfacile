package bj.gazfacile.service;

import bj.gazfacile.config.CPassProperties;
import bj.gazfacile.exception.OtpProviderException;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
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
import java.time.Instant;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantLock;

@Service
@Slf4j
public class CPassTokenService {

    private static final String CACHE_KEY = "cpass-access-token";
    private static final long REFRESH_SKEW_SECONDS = 60L;

    private final CPassProperties properties;
    private final ObjectMapper objectMapper;
    private final RestClient restClient;
    private final ConcurrentHashMap<String, CachedToken> tokenCache = new ConcurrentHashMap<>();
    private final ReentrantLock tokenLock = new ReentrantLock();

    public CPassTokenService(CPassProperties properties, ObjectMapper objectMapper) {
        this.properties = properties;
        this.objectMapper = objectMapper;
        this.restClient = RestClient.builder()
                .baseUrl(normalizeBaseUrl(properties.getBaseUrl()))
                .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    public String getAccessToken() {
        ensureConfigured();

        CachedToken cached = tokenCache.get(CACHE_KEY);
        if (cached != null && !cached.shouldRefresh()) {
            return cached.accessToken();
        }

        tokenLock.lock();
        try {
            cached = tokenCache.get(CACHE_KEY);
            if (cached != null && !cached.shouldRefresh()) {
                return cached.accessToken();
            }

            CachedToken refreshed = tryRefresh(cached).orElseGet(this::requestToken);
            tokenCache.put(CACHE_KEY, refreshed);
            return refreshed.accessToken();
        } finally {
            tokenLock.unlock();
        }
    }

    public String refreshAccessToken() {
        ensureConfigured();

        tokenLock.lock();
        try {
            CachedToken refreshed = tryRefresh(tokenCache.get(CACHE_KEY)).orElseGet(this::requestToken);
            tokenCache.put(CACHE_KEY, refreshed);
            return refreshed.accessToken();
        } finally {
            tokenLock.unlock();
        }
    }

    private Optional<CachedToken> tryRefresh(CachedToken current) {
        if (current == null || current.accessToken() == null || current.accessToken().isBlank()) {
            return Optional.empty();
        }

        try {
            TokenResponse tokenResponse = restClient.post()
                    .uri("/auth/refresh")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + current.accessToken())
                    .contentType(MediaType.APPLICATION_JSON)
                    .exchange((request, clientResponse) -> readTokenResponse(
                            "/auth/refresh",
                            clientResponse.getStatusCode(),
                            readBody(clientResponse)
                    ));

            return Optional.of(toCachedToken(tokenResponse));
        } catch (UnauthorizedCpassException e) {
            log.info("[CPass] Refresh refusé, demande d'un nouveau token");
            return Optional.empty();
        } catch (OtpProviderException e) {
            log.warn("[CPass] Refresh impossible: {}", e.getMessage());
            return Optional.empty();
        }
    }

    private CachedToken requestToken() {
        TokenResponse tokenResponse = restClient.post()
                .uri("/auth/token")
                .contentType(MediaType.APPLICATION_JSON)
                .body(Map.of(
                        "client_id", properties.getClientId(),
                        "client_secret", properties.getClientSecret()
                ))
                .exchange((request, clientResponse) -> readTokenResponse(
                        "/auth/token",
                        clientResponse.getStatusCode(),
                        readBody(clientResponse)
                ));

        CachedToken cachedToken = toCachedToken(tokenResponse);
        log.debug("[CPass] Nouveau token obtenu, expiration à {}", cachedToken.expiresAt());
        return cachedToken;
    }

    private TokenResponse readTokenResponse(String path, HttpStatusCode statusCode, String body) {
        if (statusCode.is2xxSuccessful()) {
            try {
                TokenResponse response = objectMapper.readValue(body, TokenResponse.class);
                if (response.accessToken() == null || response.accessToken().isBlank()) {
                    throw new OtpProviderException("Réponse CPass invalide sur " + path);
                }
                return response;
            } catch (IOException e) {
                throw new OtpProviderException("Impossible de lire la réponse CPass sur " + path);
            }
        }

        if (statusCode.value() == 401) {
            throw new UnauthorizedCpassException();
        }

        throw new OtpProviderException("Échec d'authentification CPass (" + statusCode.value() + ")");
    }

    private CachedToken toCachedToken(TokenResponse response) {
        Instant now = Instant.now();
        long expiresIn = response.expiresIn() != null ? response.expiresIn() : 1800L;
        Instant expiresAt = now.plusSeconds(expiresIn);
        Instant refreshAt = now.plusSeconds(Math.max(1L, expiresIn - REFRESH_SKEW_SECONDS));
        return new CachedToken(response.accessToken(), refreshAt, expiresAt);
    }

    private String readBody(org.springframework.http.client.ClientHttpResponse response) {
        try {
            return StreamUtils.copyToString(response.getBody(), StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new OtpProviderException("Impossible de lire la réponse du fournisseur OTP");
        }
    }

    private void ensureConfigured() {
        if (!properties.isEnabled()) {
            throw new OtpProviderException("Le fournisseur OTP CPass est désactivé");
        }
        if (isBlank(properties.getBaseUrl()) || isBlank(properties.getClientId()) || isBlank(properties.getClientSecret())) {
            throw new OtpProviderException("La configuration CPass est incomplète");
        }
    }

    private static String normalizeBaseUrl(String baseUrl) {
        if (baseUrl == null) {
            return "";
        }
        return baseUrl.endsWith("/") ? baseUrl.substring(0, baseUrl.length() - 1) : baseUrl;
    }

    private static boolean isBlank(String value) {
        return value == null || value.isBlank();
    }

    private record CachedToken(String accessToken, Instant refreshAt, Instant expiresAt) {
        boolean shouldRefresh() {
            Instant now = Instant.now();
            return now.isAfter(refreshAt) || now.isAfter(expiresAt);
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    private record TokenResponse(
            @JsonProperty("access_token")
            String accessToken,
            @JsonProperty("expires_in")
            Long expiresIn
    ) {
    }

    private static final class UnauthorizedCpassException extends RuntimeException {
    }
}
