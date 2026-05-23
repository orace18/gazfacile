package bj.gazfacile.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * Propriétés de configuration WebAuthn (Relying Party).
 * Lues depuis application.yml sous le préfixe "webauthn".
 */
@Configuration
@ConfigurationProperties(prefix = "webauthn")
@Data
public class WebAuthnProperties {

    private RpConfig rp = new RpConfig();

    @Data
    public static class RpConfig {
        /** Identifiant du domaine (ex: gazfacile.bj). */
        private String id = "localhost";
        /** Nom affiché dans les dialogues d'authentification. */
        private String name = "GazFacile";
        /** Origine complète autorisée (ex: https://gazfacile.bj). */
        private String origin = "http://localhost:4200";
    }
}
