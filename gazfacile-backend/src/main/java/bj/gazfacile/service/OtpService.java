package bj.gazfacile.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

/**
 * Adaptateur pour conserver les flux d'authentification existants avec le nouveau provider CPass.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class OtpService {

    private final OtpFacade otpFacade;
    private final PhoneNumberService phoneNumberService;

    /**
     * Initialise une session OTP via CPass.
     */
    public void envoyerOtp(String telephone) {
        String telephoneLocal = phoneNumberService.normaliserTelephoneLocal(telephone);
        otpFacade.initOtp(telephoneLocal);
        log.info("[OTP] Session OTP initialisée pour {}", telephoneLocal);
    }

    /**
     * Vérifie le code OTP fourni par l'utilisateur.
     *
     * @throws ResponseStatusException 400 si le code est invalide ou expiré
     */
    public void verifierOtp(String telephone, String code) {
        String telephoneLocal = phoneNumberService.normaliserTelephoneLocal(telephone);

        boolean verified = otpFacade.confirmOtp(telephoneLocal, code);
        if (!verified) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Code OTP incorrect");
        }

        log.info("[OTP] Numéro {} vérifié avec succès", telephoneLocal);
    }
}
