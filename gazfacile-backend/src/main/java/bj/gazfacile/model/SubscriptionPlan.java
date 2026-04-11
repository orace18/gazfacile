package bj.gazfacile.model;

import bj.gazfacile.model.enums.PlanType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "subscription_plans")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionPlan {

    @Id
    private String id;

    private PlanType type;

    private String nom;

    @Indexed(unique = true)
    private String code;

    private int prix;

    private int dureeJours;

    private int quota;

    private String description;

    @Builder.Default
    private List<String> features = new ArrayList<>();

    @Builder.Default
    private boolean actif = true;

    @Builder.Default
    private int ordre = 0;
}
