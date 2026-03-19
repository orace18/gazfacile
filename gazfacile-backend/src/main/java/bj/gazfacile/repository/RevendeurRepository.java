package bj.gazfacile.repository;

import bj.gazfacile.model.Revendeur;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository MongoDB pour les revendeurs.
 * Fournit des requêtes géospatiales $near pour la recherche de proximité.
 */
@Repository
public interface RevendeurRepository extends MongoRepository<Revendeur, String> {

    /** Retourne tous les revendeurs actifs. */
    List<Revendeur> findByActifTrue();

    /**
     * Recherche géospatiale : revendeurs à moins de {@code rayon} mètres du point [lng, lat].
     * Requiert un index GEO_2DSPHERE sur le champ 'location'.
     */
    @Query("{ 'location': { $near: { $geometry: { type: 'Point', coordinates: [?0, ?1] }, $maxDistance: ?2 } }, 'actif': true }")
    List<Revendeur> findNearby(double longitude, double latitude, double rayon);

    /**
     * Recherche géospatiale : revendeurs actifs avec stock disponible à moins de {@code rayon} mètres.
     */
    @Query("{ 'location': { $near: { $geometry: { type: 'Point', coordinates: [?0, ?1] }, $maxDistance: ?2 } }, 'actif': true, 'stockStatus': { $ne: 'EPUISE' } }")
    List<Revendeur> findNearbyWithStock(double longitude, double latitude, double rayon);

    /** Trouve un revendeur par l'identifiant de son compte utilisateur. */
    Optional<Revendeur> findByUserId(String userId);

    /** Vérifie si un revendeur avec ce numéro de téléphone existe déjà. */
    boolean existsByTelephone(String telephone);
}
