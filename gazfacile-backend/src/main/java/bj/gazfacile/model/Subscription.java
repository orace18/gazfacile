package bj.gazfacile.model;

import bj.gazfacile.model.enums.PlanType;
import bj.gazfacile.model.enums.SubscriptionStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "subscriptions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Subscription {

    @Id
    private String id;

    @Indexed
    private String userId;

    private String planId;

    private String planCode;

    private PlanType planType;

    private LocalDateTime dateDebut;

    @Indexed
    private LocalDateTime dateFin;

    private int quotaRestant;

    @Builder.Default
    private SubscriptionStatus statut = SubscriptionStatus.PENDING;

    private String transactionId;

    private LocalDateTime createdAt;
}
