package bj.gazfacile.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * Credential WebAuthn (Passkey) enregistré pour un utilisateur.
 * Stocke l'identifiant et la clé publique de l'authenticateur.
 */
@Document(collection = "webauthn_credentials")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WebAuthnCredential {

    @Id
    private String id;

    /** Référence vers l'utilisateur propriétaire. */
    @Indexed
    private String userId;

    /** Identifiant unique du credential côté authenticateur (bytes bruts). */
    @Indexed(unique = true)
    private byte[] credentialId;

    /** Clé publique COSE sérialisée en CBOR — utilisée pour vérifier les assertions. */
    private byte[] cosePublicKey;

    /** Compteur de signatures — protège contre les attaques par rejeu. */
    @Builder.Default
    private long signCount = 0;

    /** Transports supportés par l'authenticateur (usb, nfc, ble, internal, hybrid). */
    @Builder.Default
    private Set<String> transports = new HashSet<>();

    private LocalDateTime createdAt;
    private LocalDateTime lastUsedAt;
}
