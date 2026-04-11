package bj.gazfacile.repository;

import bj.gazfacile.model.SubscriptionPlan;
import bj.gazfacile.model.enums.PlanType;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface SubscriptionPlanRepository extends MongoRepository<SubscriptionPlan, String> {

    Optional<SubscriptionPlan> findByCode(String code);

    boolean existsByCode(String code);

    List<SubscriptionPlan> findByTypeAndActifTrueOrderByOrdreAsc(PlanType type);

    List<SubscriptionPlan> findByActifTrueOrderByTypeAscOrdreAsc();
}
