package bj.gazfacile.service;

import bj.gazfacile.model.RefreshToken;
import bj.gazfacile.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.Base64;
import java.util.HexFormat;
import java.util.List;

/**
 * Gestion des refresh tokens persistés en MongoDB.
 *
 * <p>Sécurité :
 * <ul>
 *   <li>Token brut = 64 octets aléatoires (SecureRandom) encodés en Base64-URL</li>
 *   <li>Seul le hash SHA-256 est persisté</li>
 *   <li>Rotation systématique à chaque utilisation</li>
 *   <li>Réutilisation d'un token révoqué → révocation totale (détection de vol)</li>
 *   <li>Limite de {@value MAX_SESSIONS} sessions simultanées par utilisateur</li>
 * </ul>
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class RefreshTokenService {

    private static final int MAX_SESSIONS = 5;
    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    @Value("${jwt.refresh-expiration}")
    private long refreshExpirationMs;

    private final RefreshTokenRepository refreshTokenRepository;

    // ── Création ─────────────────────────────────────────────────────────────

    /**
     * Génère un nouveau refresh token et le persiste (hashé).
     * Si l'utilisateur dépasse {@value MAX_SESSIONS} sessions actives,
     * les plus anciennes sont révoquées.
     *
     * @return le token brut à placer dans le cookie HttpOnly
     */
    public String creerToken(String userId) {
        String rawToken = genererTokenAleatoire();

        limiterSessions(userId);

        RefreshToken doc = RefreshToken.builder()
                .userId(userId)
                .tokenHash(hasher(rawToken))
                .dateCreation(Instant.now())
                .dateExpiration(Instant.now().plusMillis(refreshExpirationMs))
                .build();

        refreshTokenRepository.save(doc);
        log.debug("[RefreshToken] Nouveau token créé pour userId={}", userId);
        return rawToken;
    }

    // ── Validation & rotation ─────────────────────────────────────────────────

    /**
     * Valide le token reçu, le révoque, et signale l'userId pour créer le suivant.
     * En cas de réutilisation d'un token révoqué, TOUS les tokens de l'utilisateur
     * sont révoqués (signal de compromission).
     *
     * @param rawToken le token brut extrait du cookie
     * @return l'userId associé au token valide
     * @throws ResponseStatusException 401 si invalide, expiré ou réutilisé
     */
    public String validerEtRoter(String rawToken) {
        String hash = hasher(rawToken);

        RefreshToken doc = refreshTokenRepository.findByTokenHash(hash)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED, "Refresh token invalide"));

        if (doc.isRevoked()) {
            log.warn("[SÉCURITÉ] Réutilisation d'un refresh token révoqué — userId={} → révocation totale",
                    doc.getUserId());
            revoquerTous(doc.getUserId());
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "Session compromise — reconnexion requise");
        }

        if (doc.getDateExpiration().isBefore(Instant.now())) {
            doc.setRevoked(true);
            refreshTokenRepository.save(doc);
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Refresh token expiré");
        }

        // Rotation : l'ancien token devient inutilisable
        doc.setRevoked(true);
        refreshTokenRepository.save(doc);

        return doc.getUserId();
    }

    // ── Révocation ────────────────────────────────────────────────────────────

    /** Révoque un token spécifique (logout d'un seul appareil). */
    public void revoquer(String rawToken) {
        String hash = hasher(rawToken);
        refreshTokenRepository.findByTokenHash(hash).ifPresent(doc -> {
            doc.setRevoked(true);
            refreshTokenRepository.save(doc);
            log.debug("[RefreshToken] Token révoqué pour userId={}", doc.getUserId());
        });
    }

    /** Révoque tous les tokens d'un utilisateur (logout de tous les appareils). */
    public void revoquerTous(String userId) {
        List<RefreshToken> tous = refreshTokenRepository
                .findByUserIdOrderByDateCreationDesc(userId);
        tous.forEach(doc -> doc.setRevoked(true));
        refreshTokenRepository.saveAll(tous);
        log.info("[RefreshToken] Tous les tokens révoqués pour userId={} ({} token(s))",
                userId, tous.size());
    }

    // ── Nettoyage planifié ────────────────────────────────────────────────────

    /** Supprime les tokens expirés toutes les 24 heures. */
    @Scheduled(fixedRate = 24 * 60 * 60 * 1000L)
    public void supprimerTokensExpires() {
        refreshTokenRepository.deleteByDateExpirationBefore(Instant.now());
        log.info("[RefreshToken] Nettoyage des tokens expirés effectué");
    }

    // ── Utilitaires privés ────────────────────────────────────────────────────

    private void limiterSessions(String userId) {
        List<RefreshToken> actifs = refreshTokenRepository
                .findByUserIdAndRevokedFalseOrderByDateCreationDesc(userId);

        if (actifs.size() >= MAX_SESSIONS) {
            int surplus = actifs.size() - MAX_SESSIONS + 1;
            List<RefreshToken> aRevoquer = actifs.subList(MAX_SESSIONS - 1, actifs.size());
            aRevoquer.forEach(doc -> doc.setRevoked(true));
            refreshTokenRepository.saveAll(aRevoquer);
            log.info("[RefreshToken] Limite de sessions atteinte pour userId={} — {} révoqué(s)",
                    userId, surplus);
        }
    }

    private String genererTokenAleatoire() {
        byte[] octets = new byte[64];
        SECURE_RANDOM.nextBytes(octets);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(octets);
    }

    private String hasher(String token) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(token.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 non disponible", e);
        }
    }
}
