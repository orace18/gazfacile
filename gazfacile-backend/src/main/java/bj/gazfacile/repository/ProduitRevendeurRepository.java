package bj.gazfacile.repository;

import bj.gazfacile.model.ProduitRevendeur;
import bj.gazfacile.model.enums.FormatBouteille;
import bj.gazfacile.model.enums.MarqueGaz;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ProduitRevendeurRepository extends MongoRepository<ProduitRevendeur, String> {

    List<ProduitRevendeur> findByRevendeurId(String revendeurId);

    List<ProduitRevendeur> findByRevendeurIdAndDisponibleTrue(String revendeurId);

    Optional<ProduitRevendeur> findByRevendeurIdAndMarqueAndFormat(
            String revendeurId, MarqueGaz marque, FormatBouteille format);

    void deleteAllByRevendeurId(String revendeurId);

    long countByRevendeurIdAndDisponibleTrue(String revendeurId);
}
