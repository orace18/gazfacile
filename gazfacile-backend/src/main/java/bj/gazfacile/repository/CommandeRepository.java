package bj.gazfacile.repository;

import bj.gazfacile.model.Commande;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository MongoDB pour les commandes.
 */
@Repository
public interface CommandeRepository extends MongoRepository<Commande, String> {

    /** Retourne les commandes d'un revendeur, triées par date décroissante. */
    List<Commande> findByRevendeurIdOrderByCreatedAtDesc(String revendeurId);

    /** Retourne les commandes d'un client, triées par date décroissante. */
    List<Commande> findByClientTelephoneOrderByCreatedAtDesc(String clientTelephone);
}
