package bj.gazfacile.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Map;

/**
 * Envoi de SMS via Africa's Talking (fournisseur SMS pour le Bénin).
 * En mode sandbox (clé = "sandbox"), les SMS sont loggés sans envoi réel.
 *
 * Variables d'environnement :
 *   SMS_API_KEY   — clé API Africa's Talking ("sandbox" pour dev)
 *   SMS_USERNAME  — nom d'utilisateur Africa's Talking ("sandbox" pour dev)
 *   SMS_SENDER    — expéditeur affiché ("GazFacile" ou numéro court)
 */
@Service
@Slf4j
public class SmsService {

    @Value("${sms.api-key:sandbox}")
    private String apiKey;

    @Value("${sms.username:sandbox}")
    private String username;

    @Value("${sms.sender:GazFacile}")
    private String sender;

    private static final String AT_BASE_URL = "https://api.africastalking.com/version1/messaging";

    /**
     * Envoie un SMS contenant le code OTP.
     *
     * @param telephone numéro au format international (+229XXXXXXXX)
     * @param code      code OTP à 6 chiffres
     */
    public void envoyerOtp(String telephone, String code) {
        String message = "Votre code de verification GazFacile : " + code
                + ". Valable " + bj.gazfacile.model.OtpRecord.EXPIRATION_MINUTES + " minutes.";

        if ("sandbox".equals(apiKey)) {
            // Mode développement : log uniquement
            log.info("[SMS-DEV] OTP {} → {} : {}", code, telephone, message);
            return;
        }

        try {
            RestClient client = RestClient.builder()
                    .baseUrl(AT_BASE_URL)
                    .defaultHeader("apiKey", apiKey)
                    .defaultHeader("Accept", "application/json")
                    .build();

            client.post()
                    .contentType(org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED)
                    .body("username=" + username
                            + "&to=" + telephone
                            + "&message=" + java.net.URLEncoder.encode(message, java.nio.charset.StandardCharsets.UTF_8)
                            + "&from=" + sender)
                    .retrieve()
                    .toBodilessEntity();

            log.info("[SMS] OTP envoyé à {}", telephone);
        } catch (Exception e) {
            log.error("[SMS] Échec d'envoi à {} : {}", telephone, e.getMessage());
            // Ne pas propager : l'OTP est quand même persisté, le client peut redemander
        }
    }
}
