package bj.gazfacile.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;
import java.util.HexFormat;
import java.util.HashMap;
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

    private static final long WEBHOOK_SIGNATURE_TOLERANCE_SECONDS = 600;

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

        String emailEffectif = email != null ? email : reference + "@gazfacile.bj";
        Map<String, Object> customer = Map.of(
                "email", emailEffectif,
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

        String url = baseUrl + "/transactions";
        log.info("[FedaPay] → POST {} | token: {} | body: description={}, montant={} FCFA, ref={}, telephone={}, email={}, nom={}, callback_url={}",
                url, masquerCle(apiKey), description, montant, reference, telephone, emailEffectif, nom, fullCallbackUrl);

        ResponseEntity<Map> reponse = restTemplate.exchange(
                url,
                HttpMethod.POST,
                new HttpEntity<>(body, headers),
                Map.class
        );

        log.info("[FedaPay] ← POST {} | statut: {} | réponse: {}", url, reponse.getStatusCode(), reponse.getBody());

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

        String url = baseUrl + "/transactions/" + fedaPayId + "/token";
        log.info("[FedaPay] → POST {} | token: {} | transactionId: {}", url, masquerCle(apiKey), fedaPayId);

        ResponseEntity<Map> reponse = restTemplate.exchange(
                url,
                HttpMethod.POST,
                new HttpEntity<>(headers),
                Map.class
        );

        log.info("[FedaPay] ← POST {} | statut: {} | réponse: {}", url, reponse.getStatusCode(), reponse.getBody());

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

    /**
     * Récupère le statut réel d'une transaction depuis l'API FedaPay.
     * Utilisé en complément du webhook quand l'utilisateur revient
     * sur la page de confirmation avant la synchronisation locale.
     */
    @SuppressWarnings("unchecked")
    public String recupererStatutTransaction(long fedaPayId) {
        HttpHeaders headers = buildHeaders();

        String url = baseUrl + "/transactions/" + fedaPayId;
        log.info("[FedaPay] → GET {} | token: {} | transactionId: {}", url, masquerCle(apiKey), fedaPayId);

        ResponseEntity<Map> reponse = restTemplate.exchange(
                url,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                Map.class
        );

        log.info("[FedaPay] ← GET {} | statut: {} | réponse: {}", url, reponse.getStatusCode(), reponse.getBody());

        Map<String, Object> transaction = extraireTransaction((Map<String, Object>) reponse.getBody());
        Object statut = transaction.get("status");
        if (!(statut instanceof String statutTexte) || statutTexte.isBlank()) {
            throw new IllegalStateException("Statut FedaPay absent pour la transaction " + fedaPayId);
        }

        log.info("[FedaPay] Statut récupéré pour transaction {} → {}", fedaPayId, statutTexte);
        return statutTexte;
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
            WebhookSignatureDetails details = extraireSignatureWebhook(signature);
            if (details == null) {
                return false;
            }

            long ageSeconds = Math.abs((System.currentTimeMillis() / 1000) - details.timestamp());
            if (ageSeconds > WEBHOOK_SIGNATURE_TOLERANCE_SECONDS) {
                log.warn("[FedaPay] Signature webhook expirée: âge {}s", ageSeconds);
                return false;
            }

            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(webhookSecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            byte[] hash = mac.doFinal((details.timestamp() + "." + payload).getBytes(StandardCharsets.UTF_8));
            String calcule = HexFormat.of().formatHex(hash);
            return MessageDigest.isEqual(
                    calcule.getBytes(StandardCharsets.UTF_8),
                    details.signature().getBytes(StandardCharsets.UTF_8)
            );
        } catch (Exception ex) {
            log.error("[FedaPay] Erreur vérification signature webhook: {}", ex.getMessage());
            return false;
        }
    }

    private WebhookSignatureDetails extraireSignatureWebhook(String header) {
        if (header == null || header.isBlank()) {
            return null;
        }

        long timestamp = -1;
        String signature = null;
        for (String partie : header.split(",")) {
            String[] cleValeur = partie.trim().split("=", 2);
            if (cleValeur.length != 2) {
                continue;
            }
            if ("t".equals(cleValeur[0])) {
                timestamp = Long.parseLong(cleValeur[1]);
            } else if ("s".equals(cleValeur[0])) {
                signature = cleValeur[1];
            }
        }

        if (timestamp < 0 || signature == null || signature.isBlank()) {
            log.warn("[FedaPay] Header signature webhook mal formé");
            return null;
        }

        return new WebhookSignatureDetails(timestamp, signature);
    }

    private record WebhookSignatureDetails(long timestamp, String signature) {}

    // ── Helpers ───────────────────────────────────────────────────────────────

    private HttpHeaders buildHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);
        return headers;
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> extraireTransaction(Map<String, Object> body) {
        if (body == null || body.isEmpty()) {
            throw new IllegalStateException("Réponse FedaPay vide");
        }

        Object transaction = body.get("v1/transaction");
        if (transaction instanceof Map<?, ?> map) {
            return (Map<String, Object>) map;
        }

        transaction = body.get("transaction");
        if (transaction instanceof Map<?, ?> map) {
            return (Map<String, Object>) map;
        }

        return new HashMap<>(body);
    }

    /** Masque une clé API en ne laissant apparaître que les 8 premiers caractères. */
    private String masquerCle(String cle) {
        if (cle == null || cle.length() <= 8) return "****";
        return cle.substring(0, 8) + "****";
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
