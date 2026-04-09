package bj.gazfacile.service;

import bj.gazfacile.model.OtpRecord;
import bj.gazfacile.repository.OtpRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.SecureRandom;
import java.time.LocalDateTime;

/**
 * Génère, stocke et vérifie les codes OTP pour la confirmation de numéro de téléphone.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class OtpService {

    private final OtpRepository otpRepository;
    private final SmsService smsService;

    private static final SecureRandom RANDOM = new SecureRandom();

    /**
     * Génère un OTP à 6 chiffres, l'enregistre et l'envoie par SMS.
     * Supprime les anciens OTP du même numéro pour éviter les doublons.
     */
    public void envoyerOtp(String telephone) {
        // Nettoyer les anciens OTP
        otpRepository.deleteAllByTelephone(telephone);

        String code = String.format("%06d", RANDOM.nextInt(1_000_000));

        OtpRecord record = OtpRecord.builder()
                .telephone(telephone)
                .code(code)
                .expiresAt(LocalDateTime.now().plusMinutes(OtpRecord.EXPIRATION_MINUTES))
                .utilise(false)
                .build();

        otpRepository.save(record);
        smsService.envoyerOtp(telephone, code);
        log.info("[OTP] Code généré pour {}", telephone);
    }

    /**
     * Vérifie le code OTP fourni par l'utilisateur.
     *
     * @throws ResponseStatusException 400 si le code est invalide ou expiré
     */
    public void verifierOtp(String telephone, String code) {
        OtpRecord record = otpRepository
                .findTopByTelephoneAndUtiliseFalseOrderByExpiresAtDesc(telephone)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "Aucun code OTP en attente pour ce numéro"));

        if (!record.estValide(code)) {
            if (record.estExpire()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Code OTP expiré — veuillez en demander un nouveau");
            }
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Code OTP incorrect");
        }

        record.setUtilise(true);
        otpRepository.save(record);
        log.info("[OTP] Numéro {} vérifié avec succès", telephone);
    }
}
