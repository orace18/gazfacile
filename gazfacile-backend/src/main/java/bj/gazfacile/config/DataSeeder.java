package bj.gazfacile.config;

import bj.gazfacile.model.SubscriptionPlan;
import bj.gazfacile.model.enums.PlanType;
import bj.gazfacile.repository.SubscriptionPlanRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder {

    private final SubscriptionPlanRepository planRepository;

    @PostConstruct
    public void seed() {
        seedPlans();
    }

    private void seedPlans() {
        List<SubscriptionPlan> plans = List.of(
                // ── Revendeur (5 plans) ──
                buildPlan(PlanType.REVENDEUR, "Standard", "STANDARD", 1000, 30, 0,
                        "Sans engagement", false, 1,
                        List.of("Visibilité complète", "Profil vérifié", "Catalogue illimité")),
                buildPlan(PlanType.REVENDEUR, "Gold", "GOLD", 2500, 90, 0,
                        "Économisez 17%", false, 2,
                        List.of("Visibilité complète", "Profil vérifié", "Catalogue illimité", "3 mois d'accès")),
                buildPlan(PlanType.REVENDEUR, "Diamond", "DIAMOND", 5000, 180, 0,
                        "Économisez 17%", true, 3,
                        List.of("Visibilité complète", "Profil vérifié", "Catalogue illimité", "6 mois d'accès")),
                buildPlan(PlanType.REVENDEUR, "Pro", "PRO", 7500, 270, 0,
                        "Pour les pros", false, 4,
                        List.of("Visibilité complète", "Profil vérifié", "Catalogue illimité", "9 mois d'accès")),
                buildPlan(PlanType.REVENDEUR, "Max", "MAX", 10000, 365, 0,
                        "Meilleur rapport qualité/prix", false, 5,
                        List.of("Visibilité complète", "Profil vérifié", "Catalogue illimité", "12 mois d'accès")),

                // ── Client Consultation (3 plans) ──
                buildPlan(PlanType.CLIENT_CONSULT, "Standard", "STD_CONSULT", 100, 30, 3,
                        "3 consultations par mois", false, 1,
                        List.of("Voir les revendeurs proches", "Comparer les prix", "3 consultations par mois")),
                buildPlan(PlanType.CLIENT_CONSULT, "Gold", "GOLD_CONSULT", 500, 30, 10,
                        "10 consultations par mois", true, 2,
                        List.of("Voir les revendeurs proches", "Comparer les prix", "10 consultations par mois")),
                buildPlan(PlanType.CLIENT_CONSULT, "Diamond", "DIAMOND_CONSULT", 1000, 30, 50,
                        "50 consultations par mois", false, 3,
                        List.of("Voir les revendeurs proches", "Comparer les prix", "50 consultations par mois", "Accès prioritaire")),

                // ── Client Livraison (3 plans) ──
                buildPlan(PlanType.CLIENT_LIVRAISON, "Standard", "STD_LIVRAISON", 2000, 30, 2,
                        "2 livraisons par mois", false, 1,
                        List.of("Livraison dans un rayon de 5km", "2 livraisons par mois", "Suivi de commande")),
                buildPlan(PlanType.CLIENT_LIVRAISON, "Gold", "GOLD_LIVRAISON", 4500, 30, 5,
                        "5 livraisons par mois", true, 2,
                        List.of("Livraison dans un rayon de 5km", "5 livraisons par mois", "Suivi de commande")),
                buildPlan(PlanType.CLIENT_LIVRAISON, "Diamond", "DIAMOND_LIVRAISON", 8000, 30, 10,
                        "10 livraisons par mois", false, 3,
                        List.of("Livraison dans un rayon de 5km", "10 livraisons par mois", "Suivi de commande", "Priorité de livraison"))
        );

        int inserted = 0;
        for (SubscriptionPlan plan : plans) {
            if (!planRepository.existsByCode(plan.getCode())) {
                planRepository.save(plan);
                inserted++;
            }
        }

        if (inserted > 0) {
            log.info("[DataSeeder] {} plans d'abonnement insérés", inserted);
        }
    }

    private SubscriptionPlan buildPlan(PlanType type, String nom, String code, int prix,
                                       int dureeJours, int quota, String description,
                                       boolean recommande, int ordre, List<String> features) {
        return SubscriptionPlan.builder()
                .type(type)
                .nom(nom)
                .code(code)
                .prix(prix)
                .dureeJours(dureeJours)
                .quota(quota)
                .description(description)
                .features(features)
                .actif(true)
                .recommande(recommande)
                .ordre(ordre)
                .build();
    }
}
