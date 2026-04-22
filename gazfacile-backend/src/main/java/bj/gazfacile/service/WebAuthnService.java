package bj.gazfacile.service;

import bj.gazfacile.config.WebAuthnProperties;
import bj.gazfacile.model.User;
import bj.gazfacile.model.WebAuthnCredential;
import bj.gazfacile.repository.UserRepository;
import bj.gazfacile.repository.WebAuthnCredentialRepository;
import com.webauthn4j.WebAuthnManager;
import com.webauthn4j.authenticator.Authenticator;
import com.webauthn4j.authenticator.AuthenticatorImpl;
import com.webauthn4j.converter.util.ObjectConverter;
import com.webauthn4j.data.*;
import com.webauthn4j.data.attestation.authenticator.AttestedCredentialData;
import com.webauthn4j.data.attestation.authenticator.AAGUID;
import com.webauthn4j.data.attestation.authenticator.COSEKey;
import com.webauthn4j.data.client.Origin;
import com.webauthn4j.data.client.challenge.DefaultChallenge;
import com.webauthn4j.server.ServerProperty;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.*;

/**
 * Service WebAuthn — gère la génération des options d'inscription/connexion
 * et la vérification des réponses de l'authenticateur.
 *
 * Utilise la bibliothèque webauthn4j pour parser et valider les données CBOR/JSON
 * conformément à la spécification FIDO2/WebAuthn.
 */
@Service
@Slf4j
public class WebAuthnService {

    private final WebAuthnManager webAuthnManager;
    private final ObjectConverter objectConverter;
    private final WebAuthnCredentialRepository credentialRepository;
    private final UserRepository userRepository;
    private final ChallengeStore challengeStore;
    private final WebAuthnProperties properties;
    private final SecureRandom secureRandom = new SecureRandom();

    public WebAuthnService(WebAuthnCredentialRepository credentialRepository,
                           UserRepository userRepository,
                           ChallengeStore challengeStore,
                           WebAuthnProperties properties) {
        this.webAuthnManager = WebAuthnManager.createNonStrictWebAuthnManager();
        this.objectConverter = new ObjectConverter();
        this.credentialRepository = credentialRepository;
        this.userRepository = userRepository;
        this.challengeStore = challengeStore;
        this.properties = properties;
    }

    // ── Inscription (Registration) ────────────────────────────────────────────

    /**
     * Génère les options d'inscription WebAuthn à envoyer au navigateur.
     * Le challenge est stocké temporairement (TTL 5 min) indexé par le numéro de téléphone.
     *
     * @return Map correspondant au format PublicKeyCredentialCreationOptionsJSON
     *         attendu par @simplewebauthn/browser
     */
    public Map<String, Object> genererOptionsInscription(User utilisateur, String origin) {
        String rpId = rpIdDepuisOrigin(origin);

        byte[] challengeBytes = new byte[32];
        secureRandom.nextBytes(challengeBytes);
        String challengeB64 = Base64.getUrlEncoder().withoutPadding().encodeToString(challengeBytes);

        challengeStore.sauvegarder(utilisateur.getTelephone(), challengeBytes, origin);

        // Construire la liste des credentials déjà enregistrés (pour les exclure)
        List<Map<String, Object>> credentialsExclus = credentialRepository
                .findByUserId(utilisateur.getId())
                .stream()
                .map(c -> {
                    Map<String, Object> ec = new LinkedHashMap<>();
                    ec.put("id", Base64.getUrlEncoder().withoutPadding().encodeToString(c.getCredentialId()));
                    ec.put("type", "public-key");
                    ec.put("transports", c.getTransports() != null ? c.getTransports() : List.of());
                    return ec;
                })
                .toList();

        // Encoder l'ID utilisateur en base64url (requis par la spec WebAuthn)
        byte[] userIdBytes = utilisateur.getId().getBytes(StandardCharsets.UTF_8);

        Map<String, Object> options = new LinkedHashMap<>();
        options.put("rp", Map.of(
                "id", rpId,
                "name", properties.getRp().getName()
        ));
        options.put("user", Map.of(
                "id", Base64.getUrlEncoder().withoutPadding().encodeToString(userIdBytes),
                "name", utilisateur.getTelephone(),
                "displayName", utilisateur.getNom() != null ? utilisateur.getNom() : utilisateur.getTelephone()
        ));
        options.put("challenge", challengeB64);
        options.put("pubKeyCredParams", List.of(
                Map.of("type", "public-key", "alg", -7),    // ES256 (ECDSA P-256) — recommandé
                Map.of("type", "public-key", "alg", -257)   // RS256 (RSA-PKCS1-v1_5) — fallback
        ));
        options.put("timeout", 60000);
        options.put("excludeCredentials", credentialsExclus);
        options.put("authenticatorSelection", Map.of(
                "residentKey", "preferred",
                "requireResidentKey", false,
                "userVerification", "preferred"
        ));
        options.put("attestation", "none");

        log.info("[WebAuthn] Options d'inscription générées pour {}", utilisateur.getTelephone());
        return options;
    }

    /**
     * Vérifie la réponse d'inscription de l'authenticateur.
     * Sauvegarde le credential WebAuthn si la vérification réussit.
     *
     * @param telephone   numéro de téléphone de l'utilisateur
     * @param credentialJson  RegistrationResponseJSON depuis @simplewebauthn/browser
     * @return le credential sauvegardé
     */
    @SuppressWarnings("unchecked")
    public WebAuthnCredential verifierInscription(String telephone, Map<String, Object> credentialJson) {
        ChallengeStore.ChallengeData challengeData = challengeStore.recupererEtSupprimer(telephone);
        if (challengeData == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Challenge expiré ou introuvable. Recommencez l'inscription.");
        }
        byte[] challengeBytes = challengeData.challenge();
        String origin = challengeData.origin();

        User utilisateur = userRepository.findByTelephone(telephone)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable"));

        // Extraire les données de la réponse du navigateur
        Map<String, Object> response = (Map<String, Object>) credentialJson.get("response");
        String clientDataJSONB64 = (String) response.get("clientDataJSON");
        String attestationObjectB64 = (String) response.get("attestationObject");
        List<String> transports = response.containsKey("transports")
                ? (List<String>) response.get("transports")
                : List.of();

        byte[] clientDataJSONBytes = Base64.getUrlDecoder().decode(padBase64Url(clientDataJSONB64));
        byte[] attestationObjectBytes = Base64.getUrlDecoder().decode(padBase64Url(attestationObjectB64));

        // Construire la requête webauthn4j
        RegistrationRequest registrationRequest = new RegistrationRequest(
                attestationObjectBytes,
                clientDataJSONBytes,
                new HashSet<>(transports)
        );

        ServerProperty serverProperty = new ServerProperty(
                new Origin(origin),
                rpIdDepuisOrigin(origin),
                new DefaultChallenge(challengeBytes),
                null
        );

        RegistrationParameters registrationParams = new RegistrationParameters(
                serverProperty,
                true,  // userPresenceRequired
                false  // userVerificationRequired : "preferred" côté frontend
        );

        try {
            RegistrationData registrationData = webAuthnManager.parse(registrationRequest);
            webAuthnManager.validate(registrationData, registrationParams);

            // Extraire le credential de l'authData
            AttestedCredentialData attestedCredentialData =
                    registrationData.getAttestationObject().getAuthenticatorData().getAttestedCredentialData();

            byte[] credentialId = attestedCredentialData.getCredentialId();
            COSEKey coseKey = attestedCredentialData.getCOSEKey();
            long signCount = registrationData.getAttestationObject().getAuthenticatorData().getSignCount();

            // Sérialiser la clé COSE en CBOR pour stockage MongoDB
            byte[] coseKeyBytes = objectConverter.getCborConverter().writeValueAsBytes(coseKey);

            WebAuthnCredential credential = WebAuthnCredential.builder()
                    .userId(utilisateur.getId())
                    .credentialId(credentialId)
                    .cosePublicKey(coseKeyBytes)
                    .signCount(signCount)
                    .transports(new HashSet<>(transports))
                    .createdAt(LocalDateTime.now())
                    .lastUsedAt(LocalDateTime.now())
                    .build();

            credentialRepository.save(credential);

            // Marquer l'utilisateur comme ayant un Passkey enregistré
            utilisateur.setWebAuthnRegistered(true);
            userRepository.save(utilisateur);

            log.info("[WebAuthn] Credential enregistré pour {} (signCount={})", telephone, signCount);
            return credential;

        } catch (Exception e) {
            log.warn("[WebAuthn] Vérification d'inscription échouée pour {} : {}", telephone, e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Enregistrement de l'empreinte échoué. Réessayez.");
        }
    }

    // ── Connexion (Authentication) ────────────────────────────────────────────

    /**
     * Génère les options d'authentification WebAuthn.
     * Inclut les credentials autorisés pour ce numéro.
     *
     * @return Map correspondant au format PublicKeyCredentialRequestOptionsJSON
     */
    public Map<String, Object> genererOptionsAuthentification(String telephone, String origin) {
        String rpId = rpIdDepuisOrigin(origin);

        User utilisateur = userRepository.findByTelephone(telephone)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Aucun compte associé à ce numéro"));

        List<WebAuthnCredential> credentials = credentialRepository.findByUserId(utilisateur.getId());
        if (credentials.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Aucune empreinte enregistrée pour ce compte. Utilisez le PIN.");
        }

        byte[] challengeBytes = new byte[32];
        secureRandom.nextBytes(challengeBytes);
        String challengeB64 = Base64.getUrlEncoder().withoutPadding().encodeToString(challengeBytes);
        challengeStore.sauvegarder(telephone, challengeBytes, origin);

        List<Map<String, Object>> allowCredentials = credentials.stream()
                .map(c -> {
                    Map<String, Object> ac = new LinkedHashMap<>();
                    ac.put("id", Base64.getUrlEncoder().withoutPadding().encodeToString(c.getCredentialId()));
                    ac.put("type", "public-key");
                    ac.put("transports", c.getTransports() != null ? c.getTransports() : List.of());
                    return ac;
                })
                .toList();

        Map<String, Object> options = new LinkedHashMap<>();
        options.put("challenge", challengeB64);
        options.put("timeout", 60000);
        options.put("rpId", rpId);
        options.put("allowCredentials", allowCredentials);
        options.put("userVerification", "preferred");

        log.info("[WebAuthn] Options d'authentification générées pour {}", telephone);
        return options;
    }

    /**
     * Vérifie la réponse d'authentification de l'authenticateur.
     * Met à jour le compteur de signatures pour prévenir le rejeu.
     *
     * @param telephone    numéro de téléphone de l'utilisateur
     * @param assertionJson AuthenticationResponseJSON depuis @simplewebauthn/browser
     * @return l'utilisateur authentifié
     */
    @SuppressWarnings("unchecked")
    public User verifierAuthentification(String telephone, Map<String, Object> assertionJson) {
        ChallengeStore.ChallengeData challengeData = challengeStore.recupererEtSupprimer(telephone);
        if (challengeData == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Challenge expiré ou introuvable. Recommencez la connexion.");
        }
        byte[] challengeBytes = challengeData.challenge();
        String origin = challengeData.origin();

        User utilisateur = userRepository.findByTelephone(telephone)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Aucun compte associé à ce numéro"));

        // Extraire les données de l'assertion
        String credentialIdB64 = (String) assertionJson.get("id");
        Map<String, Object> response = (Map<String, Object>) assertionJson.get("response");
        String authenticatorDataB64 = (String) response.get("authenticatorData");
        String clientDataJSONB64 = (String) response.get("clientDataJSON");
        String signatureB64 = (String) response.get("signature");
        String userHandleB64 = (String) response.get("userHandle");

        byte[] credentialIdBytes = Base64.getUrlDecoder().decode(padBase64Url(credentialIdB64));
        byte[] authenticatorDataBytes = Base64.getUrlDecoder().decode(padBase64Url(authenticatorDataB64));
        byte[] clientDataJSONBytes = Base64.getUrlDecoder().decode(padBase64Url(clientDataJSONB64));
        byte[] signatureBytes = Base64.getUrlDecoder().decode(padBase64Url(signatureB64));
        byte[] userHandleBytes = (userHandleB64 != null && !userHandleB64.isEmpty())
                ? Base64.getUrlDecoder().decode(padBase64Url(userHandleB64))
                : null;

        // Trouver le credential stocké
        WebAuthnCredential storedCredential = credentialRepository.findByCredentialId(credentialIdBytes)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                        "Empreinte non reconnue"));

        // Vérifier que le credential appartient bien à cet utilisateur
        if (!storedCredential.getUserId().equals(utilisateur.getId())) {
            log.warn("[WebAuthn] Credential {} n'appartient pas à {}", credentialIdB64, telephone);
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Empreinte non reconnue");
        }

        // Reconstruire la clé publique COSE depuis les octets stockés
        COSEKey coseKey = objectConverter.getCborConverter().readValue(
                storedCredential.getCosePublicKey(), COSEKey.class);
        AttestedCredentialData attestedCredentialData = new AttestedCredentialData(
                new AAGUID(new byte[16]), // L'AAGUID n'est pas vérifié à l'authentification
                credentialIdBytes,
                coseKey
        );
        Authenticator authenticator = new AuthenticatorImpl(
                attestedCredentialData,
                null,
                storedCredential.getSignCount()
        );

        // Vérifier l'assertion via webauthn4j
        AuthenticationRequest authRequest = new AuthenticationRequest(
                credentialIdBytes,
                userHandleBytes,
                authenticatorDataBytes,
                clientDataJSONBytes,
                signatureBytes
        );

        ServerProperty serverProperty = new ServerProperty(
                new Origin(origin),
                rpIdDepuisOrigin(origin),
                new DefaultChallenge(challengeBytes),
                null
        );

        AuthenticationParameters authParams = new AuthenticationParameters(
                serverProperty,
                authenticator,
                true,  // userPresenceRequired
                false  // userVerificationRequired
        );

        try {
            AuthenticationData authData = webAuthnManager.parse(authRequest);
            webAuthnManager.validate(authData, authParams);

            // Mettre à jour le signCount (protection anti-rejeu)
            long newSignCount = authData.getAuthenticatorData().getSignCount();
            storedCredential.setSignCount(newSignCount);
            storedCredential.setLastUsedAt(LocalDateTime.now());
            credentialRepository.save(storedCredential);

            log.info("[WebAuthn] Authentification réussie pour {} (signCount={})", telephone, newSignCount);
            return utilisateur;

        } catch (Exception e) {
            log.warn("[WebAuthn] Vérification d'authentification échouée pour {} : {}", telephone, e.getMessage());
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Empreinte non reconnue");
        }
    }

    /**
     * Extrait le hostname depuis une URL d'origine.
     * Ex: "http://192.168.1.5:4200" → "192.168.1.5"
     *     "https://gazfacile.bj"    → "gazfacile.bj"
     * Retombe sur la valeur configurée si l'origine est invalide.
     */
    private String rpIdDepuisOrigin(String origin) {
        try {
            return new URI(origin).getHost();
        } catch (Exception e) {
            log.warn("[WebAuthn] Origine invalide '{}', fallback sur rpId configuré", origin);
            return properties.getRp().getId();
        }
    }

    /**
     * Ajoute le padding nécessaire pour décoder une chaîne base64url.
     * @simplewebauthn/browser renvoie du base64url sans padding.
     */
    private static String padBase64Url(String base64url) {
        if (base64url == null) return "";
        int padding = (4 - base64url.length() % 4) % 4;
        return base64url + "=".repeat(padding);
    }
}
