package bj.gazfacile.repository;

import bj.gazfacile.model.Transaction;
import bj.gazfacile.model.enums.StatutFedaPay;
import bj.gazfacile.model.enums.TypeTransaction;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface TransactionRepository extends MongoRepository<Transaction, String> {

    Optional<Transaction> findByReference(String reference);

    Optional<Transaction> findByFedaPayId(Long fedaPayId);

    List<Transaction> findByCommandeIdOrderByCreatedAtDesc(String commandeId);

    List<Transaction> findByRevendeurIdOrderByCreatedAtDesc(String revendeurId);

    List<Transaction> findByTypeOrderByCreatedAtDesc(TypeTransaction type);

    List<Transaction> findByStatutOrderByCreatedAtDesc(StatutFedaPay statut);

    List<Transaction> findAllByOrderByCreatedAtDesc();
}
