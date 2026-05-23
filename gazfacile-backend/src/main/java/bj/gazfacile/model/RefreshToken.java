package bj.gazfacile.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

/**
 * Document MongoDB représentant un refresh token.
 * Le token en clair n'est jamais persisté — seul son hash SHA-256 est stocké.
 */
@Document(collection = "refresh_tokens")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken {

    @Id
    private String id;

    /** Identifiant MongoDB de l'utilisateur propriétaire du token. */
    @Indexed
    private String userId;

    /** Hash SHA-256 du token brut. Jamais le token en clair. */
    private String tokenHash;

    private Instant dateCreation;

    /** Date après laquelle le token ne peut plus être utilisé. */
    private Instant dateExpiration;

    /** Vrai si le token a été explicitement révoqué (logout, rotation, vol détecté). */
    @Builder.Default
    private boolean revoked = false;
}
