package bj.gazfacile.repository;

import bj.gazfacile.model.ConsultationSession;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ConsultationRepository extends MongoRepository<ConsultationSession, String> {

    Optional<ConsultationSession> findByFingerprint(String fingerprint);

    Optional<ConsultationSession> findByFingerprintAndIpAddress(String fingerprint, String ipAddress);

    Optional<ConsultationSession> findByIpAddress(String ipAddress);
}
