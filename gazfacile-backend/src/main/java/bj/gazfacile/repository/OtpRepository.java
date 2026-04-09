package bj.gazfacile.repository;

import bj.gazfacile.model.OtpRecord;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface OtpRepository extends MongoRepository<OtpRecord, String> {

    /** Dernier OTP non utilisé et non expiré pour ce numéro. */
    Optional<OtpRecord> findTopByTelephoneAndUtiliseFalseOrderByExpiresAtDesc(String telephone);

    /** Supprimer tous les anciens OTP d'un numéro avant d'en créer un nouveau. */
    void deleteAllByTelephone(String telephone);
}
