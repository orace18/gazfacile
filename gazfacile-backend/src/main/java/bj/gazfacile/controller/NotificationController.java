package bj.gazfacile.controller;

import bj.gazfacile.model.Notification;
import bj.gazfacile.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Contrôleur REST pour la gestion des notifications utilisateurs.
 * Toutes les routes requièrent une authentification.
 */
@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    /** Retourne toutes les notifications de l'utilisateur connecté. */
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Notification>> getMesNotifications(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(notificationService.getByDestinataire(userDetails.getUsername()));
    }

    /** Retourne uniquement les notifications non lues. */
    @GetMapping("/non-lues")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Notification>> getNonLues(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(notificationService.getNonLues(userDetails.getUsername()));
    }

    /** Retourne le nombre de notifications non lues (pour le badge). */
    @GetMapping("/count")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Long>> countNonLues(
            @AuthenticationPrincipal UserDetails userDetails) {
        long count = notificationService.countNonLues(userDetails.getUsername());
        return ResponseEntity.ok(Map.of("nonLues", count));
    }

    /** Marque une notification spécifique comme lue. */
    @PatchMapping("/{id}/lue")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> marquerLue(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetails userDetails) {
        notificationService.marquerLue(id, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }

    /** Marque toutes les notifications comme lues. */
    @PatchMapping("/tout-lire")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> marquerToutesLues(
            @AuthenticationPrincipal UserDetails userDetails) {
        notificationService.marquerToutesLues(userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }
}
