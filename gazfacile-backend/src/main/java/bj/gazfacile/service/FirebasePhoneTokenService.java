package bj.gazfacile.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.ByteArrayInputStream;
import java.nio.charset.StandardCharsets;

@Service
@Slf4j
@RequiredArgsConstructor
public class FirebasePhoneTokenService {

    private static final String FIREBASE_APP_NAME = "gazfacile-phone-auth";

    private final PhoneNumberService phoneNumberService;

    @Value("${firebase.service-account-json:}")
    private String serviceAccountJson;

    private FirebaseApp firebaseApp;

    @PostConstruct
    void initialiser() {
        if (serviceAccountJson == null || serviceAccountJson.isBlank()) {
            log.warn("[Firebase] Service account absent. Vérification téléphone désactivée.");
            return;
        }

        this.firebaseApp = FirebaseApp.getApps().stream()
                .filter(app -> FIREBASE_APP_NAME.equals(app.getName()))
                .findFirst()
                .orElseGet(() -> {
                    try {
                        FirebaseOptions options = FirebaseOptions.builder()
                                .setCredentials(GoogleCredentials.fromStream(
                                        new ByteArrayInputStream(serviceAccountJson.getBytes(StandardCharsets.UTF_8))))
                                .build();
                        return FirebaseApp.initializeApp(options, FIREBASE_APP_NAME);
                    } catch (Exception e) {
                        throw new IllegalStateException("Impossible d'initialiser Firebase Admin", e);
                    }
                });

        log.info("[Firebase] Admin SDK initialisé pour la vérification téléphone");
    }

    public VerifiedPhoneIdentity verifierTelephone(String firebaseIdToken, String telephoneAttendu) {
        if (firebaseIdToken == null || firebaseIdToken.isBlank()) {
            throw new ResponseStatusException(HttpStatus.PRECONDITION_REQUIRED,
                    "La vérification du numéro via Firebase est obligatoire");
        }

        if (firebaseApp == null) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE,
                    "La vérification SMS Firebase n'est pas configurée sur le serveur");
        }

        String telephoneInternationalAttendu = normaliserTelephoneInternational(telephoneAttendu);

        try {
            FirebaseAuth firebaseAuth = FirebaseAuth.getInstance(firebaseApp);
            FirebaseToken token = firebaseAuth.verifyIdToken(firebaseIdToken);
            UserRecord userRecord = firebaseAuth.getUser(token.getUid());

            if (userRecord.getPhoneNumber() == null || userRecord.getPhoneNumber().isBlank()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Le token Firebase ne contient aucun numéro de téléphone");
            }

            String telephoneInternationalVerifie = normaliserTelephoneInternational(userRecord.getPhoneNumber());
            if (!telephoneInternationalAttendu.equals(telephoneInternationalVerifie)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Le numéro vérifié ne correspond pas au numéro saisi");
            }

            return new VerifiedPhoneIdentity(
                    token.getUid(),
                    telephoneInternationalVerifie,
                    normaliserTelephoneLocal(userRecord.getPhoneNumber())
            );
        } catch (FirebaseAuthException e) {
            log.warn("[Firebase] Vérification téléphone refusée: {}", e.getMessage());
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "La vérification Firebase du téléphone a échoué");
        }
    }

    public String normaliserTelephoneLocal(String telephone) {
        return phoneNumberService.normaliserTelephoneLocal(telephone);
    }

    public String normaliserTelephoneInternational(String telephone) {
        return phoneNumberService.normaliserTelephoneInternational(telephone);
    }

    public record VerifiedPhoneIdentity(
            String firebaseUid,
            String telephoneInternational,
            String telephoneLocal
    ) {}
}
