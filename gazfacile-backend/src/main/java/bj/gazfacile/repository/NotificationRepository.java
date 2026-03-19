package bj.gazfacile.repository;

import bj.gazfacile.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository pour les notifications utilisateurs.
 */
@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {

    @Query("{ 'destinataireId': ?0 }")
    List<Notification> findByDestinataire(String destinataireId);

    @Query("{ 'destinataireId': ?0, 'lue': false }")
    List<Notification> findNonLues(String destinataireId);

    @Query(value = "{ 'destinataireId': ?0, 'lue': false }", count = true)
    long countNonLues(String destinataireId);
}
