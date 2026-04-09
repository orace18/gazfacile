package bj.gazfacile.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Map;

/**
 * Valide un ID token Google en appelant l'endpoint tokeninfo de Google.
 * Pour la production, remplacer par la bibliothèque google-api-client pour une
 * validation locale plus performante (pas de latence réseau).
 */
@Service
@Slf4j
public class GoogleTokenService {

    @Value("${google.client-id:}")
    private String clientId;

    private final RestClient restClient = RestClient.builder()
            .baseUrl("https://oauth2.googleapis.com")
            .build();

    /**
     * Valide l'ID token et retourne les informations de l'utilisateur Google.
     *
     * @param idToken token JWT fourni par Google Identity Services côté frontend
     * @return informations utilisateur extraites du token
     * @throws IllegalArgumentException si le token est invalide ou l'audience ne correspond pas
     */
    @SuppressWarnings("unchecked")
    public GoogleUserInfo valider(String idToken) {
        try {
            Map<String, Object> claims = restClient.get()
                    .uri("/tokeninfo?id_token={token}", idToken)
                    .retrieve()
                    .body(Map.class);

            if (claims == null) {
                throw new IllegalArgumentException("Token Google invalide");
            }

            // Vérifier que le token est bien destiné à notre application
            String audience = (String) claims.get("aud");
            if (clientId != null && !clientId.isBlank() && !clientId.equals(audience)) {
                log.warn("[Google] Audience invalide : attendu={}, reçu={}", clientId, audience);
                throw new IllegalArgumentException("Token Google invalide (audience incorrecte)");
            }

            String sub   = (String) claims.get("sub");
            String email = (String) claims.get("email");
            String name  = (String) claims.get("name");

            if (sub == null || email == null) {
                throw new IllegalArgumentException("Token Google invalide (champs manquants)");
            }

            return new GoogleUserInfo(sub, email, name != null ? name : email);

        } catch (IllegalArgumentException e) {
            throw e;
        } catch (Exception e) {
            log.error("[Google] Échec de validation du token : {}", e.getMessage());
            throw new IllegalArgumentException("Impossible de valider le token Google");
        }
    }

    public record GoogleUserInfo(String googleId, String email, String nom) {}
}
