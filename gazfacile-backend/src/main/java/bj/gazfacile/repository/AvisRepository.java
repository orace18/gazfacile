package bj.gazfacile.repository;

import bj.gazfacile.model.Avis;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository pour les avis clients.
 */
@Repository
public interface AvisRepository extends MongoRepository<Avis, String> {

    List<Avis> findByRevendeurIdOrderByCreatedAtDesc(String revendeurId);

    long countByRevendeurId(String revendeurId);

    /** Calcule la note moyenne d'un revendeur via agrégation MongoDB. */
    @Aggregation(pipeline = {
        "{ $match: { revendeurId: ?0 } }",
        "{ $group: { _id: null, moyenne: { $avg: '$note' } } }"
    })
    Double calculerNoteMoyenne(String revendeurId);

    boolean existsByRevendeurIdAndAuteurTelephone(String revendeurId, String telephone);
}
