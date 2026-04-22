package bj.gazfacile.repository;

import bj.gazfacile.model.WebAuthnCredential;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

/**
 * Repository pour les credentials WebAuthn (Passkeys).
 */
public interface WebAuthnCredentialRepository extends MongoRepository<WebAuthnCredential, String> {

    /** Récupère tous les credentials d'un utilisateur. */
    List<WebAuthnCredential> findByUserId(String userId);

    /** Cherche un credential par son identifiant binaire. */
    Optional<WebAuthnCredential> findByCredentialId(byte[] credentialId);

    /** Supprime tous les credentials d'un utilisateur. */
    void deleteByUserId(String userId);
}
