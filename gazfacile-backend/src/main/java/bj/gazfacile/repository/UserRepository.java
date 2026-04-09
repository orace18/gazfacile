package bj.gazfacile.repository;

import bj.gazfacile.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository MongoDB pour les utilisateurs.
 */
@Repository
public interface UserRepository extends MongoRepository<User, String> {

    /** Recherche un utilisateur par son numéro de téléphone (identifiant de connexion). */
    Optional<User> findByTelephone(String telephone);

    /** Vérifie si un utilisateur avec ce numéro de téléphone existe déjà. */
    boolean existsByTelephone(String telephone);

    /** Vérifie si un utilisateur avec cet email existe déjà. */
    boolean existsByEmail(String email);

    /** Recherche par email (pour la connexion Google). */
    Optional<User> findByEmail(String email);

    /** Recherche par Google ID (sub). */
    Optional<User> findByGoogleId(String googleId);
}
