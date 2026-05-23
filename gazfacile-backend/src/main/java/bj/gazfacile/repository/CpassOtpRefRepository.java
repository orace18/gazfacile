package bj.gazfacile.repository;

import bj.gazfacile.model.CpassOtpRef;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.Instant;
import java.util.Optional;

public interface CpassOtpRefRepository extends MongoRepository<CpassOtpRef, String> {

    Optional<CpassOtpRef> findTopByPhoneNumberAndUsedFalseOrderByCreatedAtDesc(String phoneNumber);

    void deleteAllByPhoneNumberAndUsedFalse(String phoneNumber);

    /** Vrai si un OTP non utilisé a été créé après {@code threshold} pour ce numéro (rate limiting). */
    boolean existsByPhoneNumberAndUsedFalseAndCreatedAtAfter(String phoneNumber, Instant threshold);
}
