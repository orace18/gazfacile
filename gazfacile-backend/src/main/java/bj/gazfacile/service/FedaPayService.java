package bj.gazfacile.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HexFormat;
import java.util.Map;

/**
 * Client HTTP pour l'API FedaPay.
 *
 * Flux de paiement :
 *  1. creerTransaction()  → obtenir l'ID FedaPay
 *  2. obtenirToken()      → obtenir le token de paiement
 *  3. Construire l'URL checkout avec le token
 *  4. Le client complète le paiement sur FedaPay
 *  5. FedaPay envoie un webhook → verifierSignatureWebhook()
 */
@Service
@Slf4j
public class FedaPayService {

    @Value("${fedapay.api-key}")
    private String apiKey;

    @Value("${fedapay.base-url}")
    private String baseUrl;

    @Value("${fedapay.checkout-url}")
    private String checkoutBaseUrl;

    @Value("${fedapay.webhook-secret}")
    private String webhookSecret;

    @Value("${fedapay.callback-url}")
    private String callbackUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getCallbackUrl() {
        return callbackUrl;
    }

    // ── Création de transaction ───────────────────────────────────────────────

    /**
     * Crée une transaction FedaPay et retourne l'ID numérique.
     *
     * @param montant     montant en FCFA
     * @param description description affichée au client
     * @param telephone   numéro du client (+229...)
     * @param email       email du client (optionnel)
     * @param nom         nom du client (optionnel)
     * @param reference   référence interne GazFacile
     * @return ID numérique FedaPay de la transaction
     */
    @SuppressWarnings("unchecked")
    public long creerTransaction(long montant, String description, String telephone,
                                  String email, String nom, String reference, String fullCallbackUrl) {
        HttpHeaders headers = buildHeaders();

        String[] parties = nom != null ? nom.trim().split("\\s+", 2) : new String[]{"Client", ""};
        String prenom = parties[0];
        String nomFamille = parties.length > 1 ? parties[1] : "-";

        Map<String, Object> customer = Map.of(
                "email", email != null ? email : reference + "@gazfacile.bj",
                "firstname", prenom,
                "lastname", nomFamille,
                "phone_number", Map.of(
                        "number", normaliserTelephone(telephone),
                        "country", "BJ"
                )
        );

        Map<String, Object> body = Map.of(
                "description", description,
                "amount", montant,
                "currency", Map.of("iso", "XOF"),
                "callback_url", fullCallbackUrl,
                "customer", customer
        );

        ResponseEntity<Map> reponse = restTemplate.exchange(
                baseUrl + "/transactions",
                HttpMethod.POST,
                new HttpEntity<>(body, headers),
                Map.class
        );

        Map<String, Object> data = (Map<String, Object>) reponse.getBody();
        Map<String, Object> transaction = (Map<String, Object>) data.get("v1/transaction");
        Long fedaPayId = ((Number) transaction.get("id")).longValue();

        log.info("[FedaPay] Transaction créée — ID: {}, Ref: {}, Montant: {} FCFA", fedaPayId, reference, montant);
        return fedaPayId;
    }

    // ── Obtenir le token de paiement ──────────────────────────────────────────

    /**
     * Génère un token de paiement pour une transaction FedaPay existante.
     *
     * @param fedaPayId ID numérique FedaPay
     * @return token à inclure dans l'URL checkout
     */
    @SuppressWarnings("unchecked")
    public String obtenirToken(long fedaPayId) {
        HttpHeaders headers = buildHeaders();

        ResponseEntity<Map> reponse = restTemplate.exchange(
                baseUrl + "/transactions/" + fedaPayId + "/token",
                HttpMethod.POST,
                new HttpEntity<>(headers),
                Map.class
        );

        Map<String, Object> data = (Map<String, Object>) reponse.getBody();
        String token = (String) data.get("token");

        log.info("[FedaPay] Token obtenu pour transaction {}", fedaPayId);
        return token;
    }

    // ── URL checkout ──────────────────────────────────────────────────────────

    /**
     * Construit l'URL de paiement FedaPay à partir du token.
     */
    public String construireCheckoutUrl(String token) {
        return checkoutBaseUrl + "/" + token;
    }

    // ── Vérification de la signature webhook ──────────────────────────────────

    /**
     * Vérifie la signature HMAC-SHA256 envoyée par FedaPay dans l'en-tête
     * {@code x-fedapay-signature}.
     *
     * @param payload   corps brut de la requête webhook
     * @param signature valeur de l'en-tête x-fedapay-signature
     * @return true si la signature est valide
     */
    public boolean verifierSignatureWebhook(String payload, String signature) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(webhookSecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            byte[] hash = mac.doFinal(payload.getBytes(StandardCharsets.UTF_8));
            String calcule = HexFormat.of().formatHex(hash);
            return calcule.equals(signature);
        } catch (Exception ex) {
            log.error("[FedaPay] Erreur vérification signature webhook: {}", ex.getMessage());
            return false;
        }
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private HttpHeaders buildHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);
        return headers;
    }

    /** Normalise le numéro de téléphone béninois au format international. */
    private String normaliserTelephone(String telephone) {
        String chiffres = telephone.replaceAll("[^0-9]", "");
        if (!chiffres.startsWith("229")) {
            chiffres = "229" + chiffres;
        }
        return "+" + chiffres;
    }
}
