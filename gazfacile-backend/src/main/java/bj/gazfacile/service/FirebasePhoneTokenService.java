package bj.gazfacile.service;

import org.springframework.stereotype.Service;

/**
 * Service Firebase Phone Auth — désactivé.
 * L'authentification par téléphone se fait désormais via WebAuthn (Passkeys) ou PIN.
 *
 * @deprecated Remplacé par WebAuthn/PIN. Conservé pour compatibilité de compilation.
 */
@Service
@Deprecated
public class FirebasePhoneTokenService {

    /** Résultat de vérification (plus utilisé — conservé pour compatibilité). */
    public record VerifiedPhoneIdentity(String telephoneLocal, String firebaseUid) {}
}
