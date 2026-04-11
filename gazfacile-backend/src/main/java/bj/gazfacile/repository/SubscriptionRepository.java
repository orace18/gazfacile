package bj.gazfacile.repository;

import bj.gazfacile.model.Subscription;
import bj.gazfacile.model.enums.PlanType;
import bj.gazfacile.model.enums.SubscriptionStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface SubscriptionRepository extends MongoRepository<Subscription, String> {

    Optional<Subscription> findByUserIdAndStatut(String userId, SubscriptionStatus statut);

    Optional<Subscription> findByUserIdAndStatutAndPlanType(String userId, SubscriptionStatus statut, PlanType planType);

    List<Subscription> findByUserIdOrderByCreatedAtDesc(String userId);

    List<Subscription> findByStatutAndDateFinBefore(SubscriptionStatus statut, LocalDateTime date);

    List<Subscription> findByStatutAndPlanType(SubscriptionStatus statut, PlanType planType);

    List<Subscription> findByStatutAndDateFinBetween(SubscriptionStatus statut, LocalDateTime from, LocalDateTime to);
}
