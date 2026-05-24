package bj.gazfacile.config;

import bj.gazfacile.model.SubscriptionPlan;
import bj.gazfacile.model.User;
import bj.gazfacile.model.enums.PlanType;
import bj.gazfacile.model.enums.Role;
import bj.gazfacile.repository.SubscriptionPlanRepository;
import bj.gazfacile.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * Initialisation des données au démarrage :
 * - Plans d'abonnement (si absents)
 * - Compte administrateur (si absent), depuis les variables d'environnement ADMIN_PHONE et ADMIN_EMAIL
 *
 * Le PIN généré est affiché UNE SEULE FOIS dans les logs serveur (niveau WARN pour visibilité).
 * Il n'est JAMAIS transmis via HTTP.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder {

    private static final String CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%";
    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    private final SubscriptionPlanRepository planRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.telephone:}")
    private String adminTelephone;

    @Value("${admin.email:}")
    private String adminEmail;

    @Value("${admin.nom:Admin GazFacile}")
    private String adminNom;

    @Value("${admin.reset-pin:false}")
    private boolean adminResetPin;

    @PostConstruct
    public void seed() {
        seedAdmin();
        seedPlans();
    }

    /**
     * Crée le compte admin au démarrage si aucun n'existe.
     * Le téléphone et l'email viennent de ADMIN_PHONE / ADMIN_EMAIL (env vars).
     * Le PIN généré aléatoirement est affiché dans les logs serveur — jamais via HTTP.
     */
    private void seedAdmin() {
        if (userRepository.existsByRolesContaining(Role.ADMIN)) {
            if (adminResetPin) {
                resetAdminPin();
            }
            return;
        }

        if (adminTelephone == null || adminTelephone.isBlank()) {
            log.error("[Admin] Variable d'environnement ADMIN_PHONE non définie — compte admin non créé");
            return;
        }

        String pin = genererPin();
        User admin = User.builder()
                .telephone(adminTelephone)
                .email(adminEmail.isBlank() ? null : adminEmail)
                .pinHash(passwordEncoder.encode(pin))
                .nom(adminNom)
                .roles(Set.of(Role.ADMIN))
                .actif(true)
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(admin);

        // WARN pour s'assurer que le PIN est visible dans les logs agrégés
        log.warn("╔══════════════════════════════════════════════════════╗");
        log.warn("║  COMPTE ADMIN CRÉÉ — CONSERVEZ CE PIN EN LIEU SÛR  ║");
        log.warn("║  Téléphone : {}                              ║", adminTelephone);
        log.warn("║  PIN       : {}                                 ║", pin);
        log.warn("║  Ce message n'apparaîtra plus jamais               ║");
        log.warn("╚══════════════════════════════════════════════════════╝");
    }

    private void resetAdminPin() {
        Optional<User> adminOptional = adminTelephone == null || adminTelephone.isBlank()
                ? userRepository.findAll().stream()
                    .filter(user -> user.getRoles().contains(Role.ADMIN))
                    .findFirst()
                : userRepository.findByTelephone(adminTelephone)
                    .filter(user -> user.getRoles().contains(Role.ADMIN));

        if (adminOptional.isEmpty()) {
            log.error("[Admin] ADMIN_RESET_PIN=true mais aucun compte ADMIN correspondant n'a été trouvé");
            return;
        }

        String pin = genererPin();
        User admin = adminOptional.get();
        admin.setPinHash(passwordEncoder.encode(pin));
        userRepository.save(admin);

        log.warn("╔══════════════════════════════════════════════════════╗");
        log.warn("║  PIN ADMIN RÉINITIALISÉ — CONSERVEZ-LE EN LIEU SÛR ║");
        log.warn("║  Téléphone : {}                              ║", admin.getTelephone());
        log.warn("║  PIN       : {}                                 ║", pin);
        log.warn("║  Retirez ADMIN_RESET_PIN après connexion         ║");
        log.warn("╚══════════════════════════════════════════════════════╝");
    }

    private static String genererPin() {
        StringBuilder sb = new StringBuilder(12);
        for (int i = 0; i < 12; i++) {
            sb.append(CHARS.charAt(SECURE_RANDOM.nextInt(CHARS.length())));
        }
        return sb.toString();
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
