package bj.gazfacile.repository;

import bj.gazfacile.model.RefreshToken;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public interface RefreshTokenRepository extends MongoRepository<RefreshToken, String> {

    Optional<RefreshToken> findByTokenHash(String tokenHash);

    /** Sessions actives, triées de la plus récente à la plus ancienne. */
    List<RefreshToken> findByUserIdAndRevokedFalseOrderByDateCreationDesc(String userId);

    /** Tous les tokens de l'utilisateur (actifs + révoqués). */
    List<RefreshToken> findByUserIdOrderByDateCreationDesc(String userId);

    /** Supprime les documents dont la date d'expiration est antérieure au seuil donné. */
    void deleteByDateExpirationBefore(Instant seuil);
}
