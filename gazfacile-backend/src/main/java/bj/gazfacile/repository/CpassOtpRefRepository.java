package bj.gazfacile.repository;

import bj.gazfacile.model.CpassOtpRef;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CpassOtpRefRepository extends MongoRepository<CpassOtpRef, String> {

    Optional<CpassOtpRef> findTopByPhoneNumberAndUsedFalseOrderByCreatedAtDesc(String phoneNumber);

    void deleteAllByPhoneNumberAndUsedFalse(String phoneNumber);
}
