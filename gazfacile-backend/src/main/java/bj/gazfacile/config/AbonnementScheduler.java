package bj.gazfacile.config;

import bj.gazfacile.service.AbonnementService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * Tâche planifiée : vérifie quotidiennement les abonnements expirés
 * et rétrograde les revendeurs concernés vers le plan GRATUIT.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class AbonnementScheduler {

    private final AbonnementService abonnementService;

    /** Tous les jours à 02h00 UTC */
    @Scheduled(cron = "0 0 2 * * *")
    public void verifierExpirations() {
        log.info("[Scheduler] Vérification des abonnements expirés...");
        abonnementService.verifierExpirations();
    }
}
