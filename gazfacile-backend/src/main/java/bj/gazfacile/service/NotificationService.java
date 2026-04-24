package bj.gazfacile.service;

import bj.gazfacile.model.Notification;
import bj.gazfacile.model.enums.TypeNotification;
import bj.gazfacile.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * Service de gestion des notifications in-app.
 * Les notifications sont persistees en base et diffusees en temps reel via WebSocket.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final SimpMessagingTemplate messagingTemplate;

    /**
     * Cree une notification, la persiste et la pousse via WebSocket au destinataire.
     *
     * @param destinataireId identifiant du destinataire (userId ou revendeurId)
     * @param type           type de la notification
     * @param titre          titre court
     * @param message        message descriptif
     * @param referenceId    identifiant de la ressource liee (optionnel)
     * @return la notification creee
     */
    public Notification creer(String destinataireId, TypeNotification type,
                               String titre, String message, String referenceId) {

        Notification notif = Notification.builder()
                .destinataireId(destinataireId)
                .type(type)
                .titre(titre)
                .message(message)
                .referenceId(referenceId)
                .lue(false)
                .createdAt(LocalDateTime.now())
                .build();

        notif = notificationRepository.save(notif);

        // File PRIVÉE par utilisateur — seul le client authentifié reçoit ses notifs.
        // convertAndSendToUser → /user/{destinataireId}/queue/notifications
        messagingTemplate.convertAndSendToUser(
            destinataireId,
            "/queue/notifications",
            Map.of(
                "id",          notif.getId(),
                "type",        type.name(),
                "titre",       titre,
                "message",     message,
                "referenceId", Objects.requireNonNullElse(referenceId, ""),
                "lue",         false,
                "createdAt",   notif.getCreatedAt().toString()
            )
        );

        log.info("Notification [{}] envoyee a {} : {}", type, destinataireId, titre);
        return notif;
    }

    /** Toutes les notifications d'un utilisateur (plus recentes en premier). */
    public List<Notification> getByDestinataire(String destinataireId) {
        return notificationRepository.findByDestinataire(destinataireId);
    }

    /** Notifications non lues d'un utilisateur. */
    public List<Notification> getNonLues(String destinataireId) {
        return notificationRepository.findNonLues(destinataireId);
    }

    /** Nombre de notifications non lues. */
    public long countNonLues(String destinataireId) {
        return notificationRepository.countNonLues(destinataireId);
    }

    /**
     * Marque une notification specifique comme lue.
     * Verifie que le destinataire correspond avant modification.
     */
    public void marquerLue(String notifId, String destinataireId) {
        // Recherche parmi les notifs du destinataire pour garantir l'appartenance
        notificationRepository.findByDestinataire(destinataireId).stream()
            .filter(n -> notifId.equals(n.getId()))
            .findFirst()
            .ifPresent(notif -> {
                notif.setLue(true);
                notificationRepository.save(notif);
            });
    }

    /** Marque toutes les notifications d'un utilisateur comme lues. */
    public void marquerToutesLues(String destinataireId) {
        List<Notification> nonLues = notificationRepository.findNonLues(destinataireId);
        nonLues.forEach(n -> n.setLue(true));
        notificationRepository.saveAll(nonLues);
        log.info("{} notification(s) marquee(s) lue(s) pour {}", nonLues.size(), destinataireId);
    }
}
