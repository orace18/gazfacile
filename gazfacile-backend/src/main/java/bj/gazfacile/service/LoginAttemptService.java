package bj.gazfacile.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;

/**
 * Protection anti-brute-force pour la connexion par PIN.
 * Bloque un numéro de téléphone après 3 tentatives échouées pendant 15 minutes.
 * Le déblocage est automatique après expiration du délai.
 */
@Service
@Slf4j
public class LoginAttemptService {

    private static final int MAX_TENTATIVES = 3;
    private static final long DUREE_BLOCAGE_MS = 15 * 60 * 1_000L;

    private final ConcurrentHashMap<String, InfoTentatives> compteurs = new ConcurrentHashMap<>();

    /**
     * Vérifie si le numéro est actuellement bloqué.
     * Déblocage automatique si le délai de 15 min est écoulé.
     */
    public boolean estBloque(String telephone) {
        InfoTentatives info = compteurs.get(telephone);
        if (info == null) return false;

        if (info.nombreTentatives() >= MAX_TENTATIVES) {
            long tempsSinceEchec = System.currentTimeMillis() - info.premierEchecMs();
            if (tempsSinceEchec < DUREE_BLOCAGE_MS) {
                long restantSec = (DUREE_BLOCAGE_MS - tempsSinceEchec) / 1000;
                log.debug("[AntiForce] {} bloqué, {} sec restantes", telephone, restantSec);
                return true;
            }
            // Délai écoulé — on réinitialise
            compteurs.remove(telephone);
        }
        return false;
    }

    /**
     * Enregistre un échec d'authentification.
     * Après MAX_TENTATIVES échecs, le numéro est bloqué.
     */
    public void enregistrerEchec(String telephone) {
        compteurs.compute(telephone, (tel, info) -> {
            if (info == null) {
                return new InfoTentatives(1, System.currentTimeMillis());
            }
            return new InfoTentatives(info.nombreTentatives() + 1, info.premierEchecMs());
        });

        InfoTentatives info = compteurs.get(telephone);
        log.debug("[AntiForce] {} — tentative {}/{}", telephone, info.nombreTentatives(), MAX_TENTATIVES);
    }

    /** Réinitialise le compteur après une authentification réussie. */
    public void reinitialiser(String telephone) {
        compteurs.remove(telephone);
    }

    /** Nettoie les entrées anciennes toutes les minutes pour éviter les fuites mémoire. */
    @Scheduled(fixedDelay = 60_000)
    public void nettoyerExpires() {
        long now = System.currentTimeMillis();
        compteurs.entrySet().removeIf(e ->
            now - e.getValue().premierEchecMs() > DUREE_BLOCAGE_MS * 2
        );
    }

    private record InfoTentatives(int nombreTentatives, long premierEchecMs) {}
}
