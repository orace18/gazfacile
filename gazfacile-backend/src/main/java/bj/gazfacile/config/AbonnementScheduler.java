package bj.gazfacile.config;

import bj.gazfacile.model.Subscription;
import bj.gazfacile.model.enums.TypeNotification;
import bj.gazfacile.service.AbonnementService;
import bj.gazfacile.service.NotificationService;
import bj.gazfacile.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

/**
 * Tâche planifiée : vérifie quotidiennement les abonnements expirés
 * et notifie les abonnements proches de l'expiration.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class AbonnementScheduler {

    private final AbonnementService abonnementService;
    private final SubscriptionService subscriptionService;
    private final NotificationService notificationService;

    /** Tous les jours à 02h00 UTC — expiration des abonnements */
    @Scheduled(cron = "0 0 2 * * *")
    public void verifierExpirations() {
        log.info("[Scheduler] Vérification des abonnements expirés...");
        abonnementService.verifierExpirations();
        subscriptionService.checkExpirations();
    }

    /** Tous les jours à 09h00 UTC — notification d'expiration proche (7 jours) */
    @Scheduled(cron = "0 0 9 * * *")
    public void notifierExpirationProche() {
        log.info("[Scheduler] Vérification des abonnements expirant dans 7 jours...");
        List<Subscription> expirants = subscriptionService.getExpiringWithin(7);

        for (Subscription sub : expirants) {
            long joursRestants = ChronoUnit.DAYS.between(LocalDateTime.now(), sub.getDateFin());
            String message = String.format(
                    "Votre abonnement %s expire dans %d jour(s). Renouvelez-le pour maintenir votre accès.",
                    sub.getPlanCode(), joursRestants);

            notificationService.creer(
                    sub.getUserId(),
                    TypeNotification.ABONNEMENT_EXPIRATION_PROCHE,
                    "Abonnement bientôt expiré",
                    message,
                    sub.getId());
        }

        if (!expirants.isEmpty()) {
            log.info("[Scheduler] {} notification(s) d'expiration proche envoyée(s)", expirants.size());
        }
    }
}
