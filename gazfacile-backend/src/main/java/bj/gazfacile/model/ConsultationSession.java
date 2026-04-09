package bj.gazfacile.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * Suivi des consultations gratuites d'un client anonyme.
 * Identifié par son fingerprint (UUID stocké côté client) + son IP.
 * Limite : 3 consultations gratuites, ensuite inscription requise.
 */
@Document(collection = "consultation_sessions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@CompoundIndex(name = "fingerprint_ip", def = "{'fingerprint': 1, 'ipAddress': 1}", unique = true)
public class ConsultationSession {

    @Id
    private String id;

    /** UUID généré côté navigateur, stocké dans localStorage. */
    @Indexed
    private String fingerprint;

    /** Adresse IP du client (peut changer, utilisée en complément). */
    private String ipAddress;

    /** Nombre de consultations de détails revendeur effectuées. */
    @Builder.Default
    private int nombreConsultations = 0;

    /** Limite de consultations gratuites. */
    public static final int LIMITE_GRATUITE = 3;

    private LocalDateTime premiereConsultation;
    private LocalDateTime derniereConsultation;
}
