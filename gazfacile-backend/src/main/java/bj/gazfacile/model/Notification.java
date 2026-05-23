package bj.gazfacile.model;

import bj.gazfacile.model.enums.TypeNotification;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * Notification persistée destinée à un utilisateur ou à un revendeur.
 */
@Document(collection = "notifications")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notification {

    @Id
    private String id;

    /** Identifiant du destinataire (userId ou revendeurId). */
    @Indexed
    private String destinataireId;

    private TypeNotification type;

    private String titre;

    private String message;

    /** Référence optionnelle vers la ressource concernée (commandeId, revendeurId…). */
    private String referenceId;

    @Builder.Default
    private boolean lue = false;

    private LocalDateTime createdAt;
}
