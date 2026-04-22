package bj.gazfacile.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.concurrent.ConcurrentHashMap;

/**
 * Stockage temporaire en mémoire des challenges WebAuthn.
 * Chaque challenge est lié au numéro de téléphone de l'utilisateur et expire après 5 minutes.
 * Un scheduler nettoie automatiquement les challenges expirés.
 */
@Component
@Slf4j
public class ChallengeStore {

    /** Durée de validité d'un challenge : 5 minutes. */
    private static final long TTL_MS = 5 * 60 * 1_000L;

    private final ConcurrentHashMap<String, EntreeChallenge> store = new ConcurrentHashMap<>();

    /**
     * Sauvegarde un challenge pour un numéro de téléphone.
     * Remplace tout challenge existant pour ce numéro.
     */
    public void sauvegarder(String telephone, byte[] challenge) {
        store.put(telephone, new EntreeChallenge(challenge, System.currentTimeMillis()));
        log.debug("[WebAuthn] Challenge stocké pour {}", telephone);
    }

    /**
     * Récupère et supprime le challenge associé au numéro.
     * Retourne null si le challenge est expiré ou introuvable.
     */
    public byte[] recupererEtSupprimer(String telephone) {
        EntreeChallenge entree = store.remove(telephone);
        if (entree == null) {
            log.debug("[WebAuthn] Challenge introuvable pour {}", telephone);
            return null;
        }
        if (System.currentTimeMillis() - entree.timestamp() > TTL_MS) {
            log.debug("[WebAuthn] Challenge expiré pour {}", telephone);
            return null;
        }
        return entree.challenge();
    }

    /** Supprime toutes les entrées expirées (toutes les 60 secondes). */
    @Scheduled(fixedDelay = 60_000)
    public void nettoyerExpires() {
        long now = System.currentTimeMillis();
        int avant = store.size();
        store.entrySet().removeIf(e -> now - e.getValue().timestamp() > TTL_MS);
        int supprime = avant - store.size();
        if (supprime > 0) {
            log.debug("[WebAuthn] {} challenge(s) expiré(s) supprimé(s)", supprime);
        }
    }

    private record EntreeChallenge(byte[] challenge, long timestamp) {}
}
