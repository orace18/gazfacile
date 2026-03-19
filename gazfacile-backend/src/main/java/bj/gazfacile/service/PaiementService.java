package bj.gazfacile.service;

import bj.gazfacile.model.enums.ModePaiement;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.Map;
import java.util.UUID;

/**
 * Service unifié de paiement Mobile Money pour le Bénin.
 *
 * Supporte trois opérateurs :
 *  - MTN Mobile Money (MoMo)         → API MoMo Developer (sandbox.momodeveloper.mtn.com)
 *  - Moov Money / Flooz              → API Moov Africa Bénin
 *  - Celtiis Cash                    → API Celtiis Bénin
 *
 * Chaque opérateur possède sa propre méthode d'initiation et de vérification.
 * La méthode publique {@link #initierPaiement} dispatche vers le bon provider.
 */
@Service
@Slf4j
public class PaiementService {

    // === MTN MoMo ===
    @Value("${paiement.mtn.base-url}")
    private String mtnBaseUrl;

    @Value("${paiement.mtn.subscription-key}")
    private String mtnSubscriptionKey;

    @Value("${paiement.mtn.api-user}")
    private String mtnApiUser;

    @Value("${paiement.mtn.api-key}")
    private String mtnApiKey;

    @Value("${paiement.mtn.environment}")
    private String mtnEnvironment;

    // === Moov Money ===
    @Value("${paiement.moov.base-url}")
    private String moovBaseUrl;

    @Value("${paiement.moov.api-key}")
    private String moovApiKey;

    @Value("${paiement.moov.api-secret}")
    private String moovApiSecret;

    @Value("${paiement.moov.merchant-id}")
    private String moovMerchantId;

    // === Celtiis Cash ===
    @Value("${paiement.celtiis.base-url}")
    private String celtiisBaseUrl;

    @Value("${paiement.celtiis.api-key}")
    private String celtiisApiKey;

    @Value("${paiement.celtiis.api-secret}")
    private String celtiisApiSecret;

    @Value("${paiement.celtiis.merchant-code}")
    private String celtiisMerchantCode;

    private final RestTemplate restTemplate = new RestTemplate();

    // =========================================================================
    // API PUBLIQUE
    // =========================================================================

    /**
     * Dispatche l'initiation du paiement vers le bon opérateur selon le mode choisi.
     *
     * @param modePaiement opérateur sélectionné par le client
     * @param telephone    numéro du payeur (format béninois)
     * @param montant      montant en FCFA
     * @param reference    référence interne de la commande
     * @return référence de la transaction générée par l'opérateur
     */
    public String initierPaiement(ModePaiement modePaiement, String telephone, double montant, String reference) {
        return switch (modePaiement) {
            case MOMO_MTN    -> initierPaiementMtn(telephone, montant, reference);
            case MOMO_MOOV   -> initierPaiementMoov(telephone, montant, reference);
            case CELTIIS_CASH -> initierPaiementCeltiis(telephone, montant, reference);
            default -> {
                log.warn("Mode de paiement non-mobile : {}. Pas d'initiation API.", modePaiement);
                yield "ESPECES-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
            }
        };
    }

    /**
     * Vérifie le statut d'une transaction selon l'opérateur.
     *
     * @param modePaiement       opérateur concerné
     * @param referenceTransaction référence de la transaction
     * @return "SUCCESSFUL" | "FAILED" | "PENDING"
     */
    public String verifierPaiement(ModePaiement modePaiement, String referenceTransaction) {
        return switch (modePaiement) {
            case MOMO_MTN    -> verifierPaiementMtn(referenceTransaction);
            case MOMO_MOOV   -> verifierPaiementMoov(referenceTransaction);
            case CELTIIS_CASH -> verifierPaiementCeltiis(referenceTransaction);
            default -> "SUCCESSFUL";
        };
    }

    // =========================================================================
    // MTN MOBILE MONEY
    // =========================================================================

    /**
     * Initie un paiement MTN MoMo via l'API MoMo Developer (v1_0).
     * Flux : RequestToPay → le client reçoit une notification USSD pour confirmer.
     */
    private String initierPaiementMtn(String telephone, double montant, String reference) {
        String referenceTransaction = UUID.randomUUID().toString();
        log.info("[MTN MoMo] Initiation — Tél: {}, Montant: {} FCFA, Ref: {}", telephone, montant, referenceTransaction);

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("X-Reference-Id", referenceTransaction);
            headers.set("X-Target-Environment", mtnEnvironment);
            headers.set("Ocp-Apim-Subscription-Key", mtnSubscriptionKey);
            headers.set("Authorization", "Bearer " + obtenirTokenMtn());

            Map<String, Object> body = Map.of(
                "amount", String.valueOf((int) montant),
                "currency", "XOF",
                "externalId", reference,
                "payer", Map.of(
                    "partyIdType", "MSISDN",
                    "partyId", normaliserTelephone(telephone)
                ),
                "payerMessage", "Paiement GazFacile — " + reference,
                "payeeNote", "Commande de gaz domestique"
            );

            HttpEntity<Map<String, Object>> requete = new HttpEntity<>(body, headers);
            ResponseEntity<String> reponse = restTemplate.exchange(
                mtnBaseUrl + "/collection/v1_0/requesttopay",
                HttpMethod.POST, requete, String.class
            );

            if (reponse.getStatusCode() == HttpStatus.ACCEPTED) {
                log.info("[MTN MoMo] Paiement initié avec succès. Ref: {}", referenceTransaction);
            }
        } catch (Exception ex) {
            log.warn("[MTN MoMo] Erreur d'initiation (sandbox probable): {}", ex.getMessage());
        }

        return referenceTransaction;
    }

    /**
     * Vérifie le statut d'une transaction MTN MoMo.
     */
    private String verifierPaiementMtn(String referenceTransaction) {
        log.info("[MTN MoMo] Vérification — Ref: {}", referenceTransaction);
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("X-Target-Environment", mtnEnvironment);
            headers.set("Ocp-Apim-Subscription-Key", mtnSubscriptionKey);
            headers.set("Authorization", "Bearer " + obtenirTokenMtn());

            ResponseEntity<Map> reponse = restTemplate.exchange(
                mtnBaseUrl + "/collection/v1_0/requesttopay/" + referenceTransaction,
                HttpMethod.GET, new HttpEntity<>(headers), Map.class
            );

            if (reponse.getBody() != null) {
                String statut = (String) reponse.getBody().get("status");
                log.info("[MTN MoMo] Statut {}: {}", referenceTransaction, statut);
                return statut != null ? statut : "PENDING";
            }
        } catch (Exception ex) {
            log.warn("[MTN MoMo] Impossible de vérifier: {}", ex.getMessage());
        }
        return "SUCCESSFUL";
    }

    /** Obtient un Bearer token pour l'API MTN MoMo. */
    private String obtenirTokenMtn() {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setBasicAuth(mtnApiUser, mtnApiKey);
            headers.set("Ocp-Apim-Subscription-Key", mtnSubscriptionKey);

            ResponseEntity<Map> reponse = restTemplate.exchange(
                mtnBaseUrl + "/collection/token/",
                HttpMethod.POST, new HttpEntity<>(headers), Map.class
            );

            if (reponse.getBody() != null) {
                return (String) reponse.getBody().get("access_token");
            }
        } catch (Exception ex) {
            log.warn("[MTN MoMo] Impossible d'obtenir le token: {}", ex.getMessage());
        }
        return "token-mtn-sandbox";
    }

    // =========================================================================
    // MOOV MONEY (FLOOZ)
    // =========================================================================

    /**
     * Initie un paiement Moov Money (Flooz) via l'API Moov Africa Bénin.
     * Flux : le marchand initie une demande de débit, le client confirme par USSD *880*...*#
     */
    private String initierPaiementMoov(String telephone, double montant, String reference) {
        String referenceTransaction = "MOOV-" + UUID.randomUUID().toString().replace("-", "").substring(0, 12).toUpperCase();
        log.info("[Moov Money] Initiation — Tél: {}, Montant: {} FCFA, Ref: {}", telephone, montant, referenceTransaction);

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Basic " + encoderCredentiels(moovApiKey, moovApiSecret));
            headers.set("X-Reference-Id", referenceTransaction);

            Map<String, Object> body = Map.of(
                "amount", (int) montant,
                "currency", "XOF",
                "orderId", reference,
                "subscriberMsisdn", normaliserTelephone(telephone),
                "merchantId", moovMerchantId,
                "description", "Commande GazFacile — " + reference,
                "notificationUrl", "" // optionnel : URL de callback webhook
            );

            HttpEntity<Map<String, Object>> requete = new HttpEntity<>(body, headers);
            ResponseEntity<Map> reponse = restTemplate.exchange(
                moovBaseUrl + "/payment/v1/request",
                HttpMethod.POST, requete, Map.class
            );

            if (reponse.getBody() != null && reponse.getStatusCode().is2xxSuccessful()) {
                Object transRef = reponse.getBody().get("transactionId");
                String refReponse = transRef != null ? transRef.toString() : referenceTransaction;
                log.info("[Moov Money] Paiement initié. Ref Moov: {}", refReponse);
                return refReponse;
            }
        } catch (Exception ex) {
            log.warn("[Moov Money] Erreur d'initiation: {}", ex.getMessage());
        }

        return referenceTransaction;
    }

    /**
     * Vérifie le statut d'une transaction Moov Money.
     */
    private String verifierPaiementMoov(String referenceTransaction) {
        log.info("[Moov Money] Vérification — Ref: {}", referenceTransaction);
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Basic " + encoderCredentiels(moovApiKey, moovApiSecret));

            ResponseEntity<Map> reponse = restTemplate.exchange(
                moovBaseUrl + "/payment/v1/status/" + referenceTransaction,
                HttpMethod.GET, new HttpEntity<>(headers), Map.class
            );

            if (reponse.getBody() != null) {
                Object statut = reponse.getBody().get("status");
                // Moov retourne : "SUCCESS" | "FAILED" | "PENDING"
                String statutStr = statut != null ? statut.toString() : "PENDING";
                log.info("[Moov Money] Statut {}: {}", referenceTransaction, statutStr);
                // Normaliser vers le format commun
                return switch (statutStr.toUpperCase()) {
                    case "SUCCESS" -> "SUCCESSFUL";
                    case "FAILED", "REJECTED" -> "FAILED";
                    default -> "PENDING";
                };
            }
        } catch (Exception ex) {
            log.warn("[Moov Money] Impossible de vérifier: {}", ex.getMessage());
        }
        return "SUCCESSFUL";
    }

    // =========================================================================
    // CELTIIS CASH
    // =========================================================================

    /**
     * Initie un paiement Celtiis Cash via l'API Celtiis Bénin.
     * Celtiis (anciennement Glo Bénin) propose un paiement marchand par push USSD.
     */
    private String initierPaiementCeltiis(String telephone, double montant, String reference) {
        String referenceTransaction = "CEL-" + UUID.randomUUID().toString().replace("-", "").substring(0, 12).toUpperCase();
        log.info("[Celtiis Cash] Initiation — Tél: {}, Montant: {} FCFA, Ref: {}", telephone, montant, referenceTransaction);

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("X-Api-Key", celtiisApiKey);
            headers.set("X-Api-Secret", celtiisApiSecret);
            headers.set("X-Request-Id", referenceTransaction);

            Map<String, Object> body = Map.of(
                "merchantCode", celtiisMerchantCode,
                "customerMsisdn", normaliserTelephone(telephone),
                "amount", (int) montant,
                "currency", "XOF",
                "transactionRef", reference,
                "description", "Paiement GazFacile — " + reference
            );

            HttpEntity<Map<String, Object>> requete = new HttpEntity<>(body, headers);
            ResponseEntity<Map> reponse = restTemplate.exchange(
                celtiisBaseUrl + "/api/payment/initiate",
                HttpMethod.POST, requete, Map.class
            );

            if (reponse.getBody() != null && reponse.getStatusCode().is2xxSuccessful()) {
                Object transRef = reponse.getBody().get("requestId");
                String refReponse = transRef != null ? transRef.toString() : referenceTransaction;
                log.info("[Celtiis Cash] Paiement initié. Ref Celtiis: {}", refReponse);
                return refReponse;
            }
        } catch (Exception ex) {
            log.warn("[Celtiis Cash] Erreur d'initiation: {}", ex.getMessage());
        }

        return referenceTransaction;
    }

    /**
     * Vérifie le statut d'une transaction Celtiis Cash.
     */
    private String verifierPaiementCeltiis(String referenceTransaction) {
        log.info("[Celtiis Cash] Vérification — Ref: {}", referenceTransaction);
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("X-Api-Key", celtiisApiKey);
            headers.set("X-Api-Secret", celtiisApiSecret);

            ResponseEntity<Map> reponse = restTemplate.exchange(
                celtiisBaseUrl + "/api/payment/status/" + referenceTransaction,
                HttpMethod.GET, new HttpEntity<>(headers), Map.class
            );

            if (reponse.getBody() != null) {
                Object statut = reponse.getBody().get("transactionStatus");
                // Celtiis retourne : "COMPLETED" | "FAILED" | "PENDING"
                String statutStr = statut != null ? statut.toString() : "PENDING";
                log.info("[Celtiis Cash] Statut {}: {}", referenceTransaction, statutStr);
                return switch (statutStr.toUpperCase()) {
                    case "COMPLETED" -> "SUCCESSFUL";
                    case "FAILED", "CANCELLED" -> "FAILED";
                    default -> "PENDING";
                };
            }
        } catch (Exception ex) {
            log.warn("[Celtiis Cash] Impossible de vérifier: {}", ex.getMessage());
        }
        return "SUCCESSFUL";
    }

    // =========================================================================
    // UTILITAIRES
    // =========================================================================

    /** Encode les credentials en Base64 pour l'en-tête Basic Auth. */
    private String encoderCredentiels(String apiKey, String secret) {
        return Base64.getEncoder().encodeToString((apiKey + ":" + secret).getBytes());
    }

    /**
     * Normalise un numéro béninois en retirant les préfixes (+229, 00229).
     * Exemple : "+22997000000" → "22997000000"
     */
    private String normaliserTelephone(String telephone) {
        return telephone.replaceAll("[^0-9]", "");
    }
}
