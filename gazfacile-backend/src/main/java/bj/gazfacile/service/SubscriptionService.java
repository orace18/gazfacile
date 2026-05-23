package bj.gazfacile.service;

import bj.gazfacile.dto.AdminPlanRequest;
import bj.gazfacile.dto.AdminSubscriptionPlanDTO;
import bj.gazfacile.dto.PaiementInitDTO;
import bj.gazfacile.dto.SubscriptionDTO;
import bj.gazfacile.dto.SubscriptionPlanDTO;
import bj.gazfacile.model.Revendeur;
import bj.gazfacile.model.Subscription;
import bj.gazfacile.model.SubscriptionPlan;
import bj.gazfacile.model.User;
import bj.gazfacile.model.enums.Abonnement;
import bj.gazfacile.model.enums.PlanType;
import bj.gazfacile.model.enums.SubscriptionStatus;
import bj.gazfacile.model.enums.TypeTransaction;
import bj.gazfacile.repository.RevendeurRepository;
import bj.gazfacile.repository.SubscriptionPlanRepository;
import bj.gazfacile.repository.SubscriptionRepository;
import bj.gazfacile.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class SubscriptionService {

    private final SubscriptionPlanRepository planRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;
    private final RevendeurRepository revendeurRepository;

    /**
     * Liste les plans actifs par type.
     */
    public List<SubscriptionPlanDTO> getPlans(PlanType type) {
        List<SubscriptionPlan> plans = (type != null)
                ? planRepository.findByTypeAndActifTrueOrderByOrdreAsc(type)
                : planRepository.findByActifTrueOrderByTypeAscOrdreAsc();
        return plans.stream().map(SubscriptionPlanDTO::from).toList();
    }

    /**
     * Retourne le plan par son code.
     */
    public SubscriptionPlanDTO getPlanByCode(String code) {
        SubscriptionPlan plan = planRepository.findByCode(code)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Plan introuvable : " + code));
        return SubscriptionPlanDTO.from(plan);
    }

    /**
     * Retourne la subscription ACTIVE du user par son téléphone.
     */
    public Optional<SubscriptionDTO> getCurrentSubscription(String telephone) {
        User user = userRepository.findByTelephone(telephone).orElse(null);
        if (user == null) return Optional.empty();
        return subscriptionRepository.findByUserIdAndStatut(user.getId(), SubscriptionStatus.ACTIVE)
                .map(SubscriptionDTO::from);
    }

    /**
     * Crée une subscription PENDING et retourne le PaiementInitDTO prêt pour FedaPay.
     * @param telephonePaiement numéro mobile money pour FedaPay (peut différer du numéro de compte)
     */
    public PaiementInitDTO subscribe(String telephone, String planCode, String telephonePaiement) {
        User user = userRepository.findByTelephone(telephone)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Utilisateur introuvable"));

        SubscriptionPlan plan = planRepository.findByCode(planCode)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Plan introuvable : " + planCode));

        // Vérifier qu'il n'a pas déjà une subscription ACTIVE du même type
        Optional<Subscription> existante = subscriptionRepository
                .findByUserIdAndStatut(user.getId(), SubscriptionStatus.ACTIVE);
        if (existante.isPresent() && existante.get().getPlanType() == plan.getType()) {
            // Permettre le renouvellement/upgrade — on crée une nouvelle PENDING
            log.info("[Subscription] Renouvellement/upgrade pour user {}", user.getId());
        }

        // Vérifier qu'un client ne mélange pas CONSULT et LIVRAISON
        if (plan.getType() == PlanType.CLIENT_CONSULT || plan.getType() == PlanType.CLIENT_LIVRAISON) {
            if (existante.isPresent()) {
                PlanType existantType = existante.get().getPlanType();
                if ((existantType == PlanType.CLIENT_CONSULT || existantType == PlanType.CLIENT_LIVRAISON)
                        && existantType != plan.getType()) {
                    throw new ResponseStatusException(HttpStatus.CONFLICT,
                            "Vous avez déjà un abonnement actif de type " + existantType +
                            ". Vous ne pouvez avoir qu'un seul type d'abonnement client à la fois.");
                }
            }
        }

        Subscription subscription = Subscription.builder()
                .userId(user.getId())
                .planId(plan.getId())
                .planCode(plan.getCode())
                .planType(plan.getType())
                .quotaRestant(plan.getQuota())
                .statut(SubscriptionStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build();

        subscription = subscriptionRepository.save(subscription);
        log.info("[Subscription] PENDING créée — user: {}, plan: {}", user.getId(), planCode);

        PaiementInitDTO dto = new PaiementInitDTO();
        dto.setType(TypeTransaction.ABONNEMENT);
        dto.setMontant(plan.getPrix());
        dto.setDescription("Abonnement " + plan.getNom() + " — " + plan.getDescription());
        String telPaiement = user.getTelephone();
        if (telephonePaiement != null) {
            String telephonePaiementNettoye = telephonePaiement.trim();
            if (!telephonePaiementNettoye.isBlank()) {
                telPaiement = telephonePaiementNettoye;
            }
        }
        dto.setClientTelephone(telPaiement);
        dto.setClientEmail(user.getEmail());
        dto.setClientNom(user.getNom());
        dto.setSubscriptionId(subscription.getId());
        return dto;
    }

    /**
     * Supprime une subscription PENDING (rollback si l'initiation du paiement échoue).
     */
    public void cancelPendingSubscription(String subscriptionId) {
        if (subscriptionId == null) return;
        subscriptionRepository.findById(subscriptionId).ifPresent(sub -> {
            if (sub.getStatut() == SubscriptionStatus.PENDING) {
                subscriptionRepository.delete(sub);
                log.info("[Subscription] PENDING annulée — id: {}", subscriptionId);
            }
        });
    }

    /**
     * Active une subscription PENDING après paiement validé.
     */
    public void activateSubscription(String subscriptionId, String transactionId) {
        Subscription subscription = subscriptionRepository.findById(subscriptionId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Subscription introuvable : " + subscriptionId));

        if (subscription.getStatut() != SubscriptionStatus.PENDING) {
            log.warn("[Subscription] Tentative d'activation d'une subscription non-PENDING : {}", subscriptionId);
            return;
        }

        SubscriptionPlan plan = planRepository.findById(subscription.getPlanId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Plan introuvable pour subscription : " + subscriptionId));

        // Vérifier si une subscription ACTIVE existe pour prolonger
        LocalDateTime debut = LocalDateTime.now();
        Optional<Subscription> existante = subscriptionRepository
                .findByUserIdAndStatut(subscription.getUserId(), SubscriptionStatus.ACTIVE);
        if (existante.isPresent() && existante.get().getPlanType() == plan.getType()) {
            Subscription ancienne = existante.get();
            // Prolonger : la nouvelle commence à la fin de l'ancienne
            if (ancienne.getDateFin().isAfter(debut)) {
                debut = ancienne.getDateFin();
            }
            // Expirer l'ancienne
            ancienne.setStatut(SubscriptionStatus.EXPIRED);
            subscriptionRepository.save(ancienne);
            log.info("[Subscription] Ancienne subscription {} expirée pour renouvellement", ancienne.getId());
        }

        subscription.setDateDebut(debut);
        subscription.setDateFin(debut.plusDays(plan.getDureeJours()));
        subscription.setQuotaRestant(plan.getQuota());
        subscription.setStatut(SubscriptionStatus.ACTIVE);
        subscription.setTransactionId(transactionId);
        subscriptionRepository.save(subscription);
        syncLegacyRevendeurSubscription(subscription.getUserId(), plan, subscription.getDateFin());

        log.info("[Subscription] Activée — id: {}, plan: {}, fin: {}",
                subscriptionId, plan.getCode(), subscription.getDateFin());
    }

    /**
     * Décrémente le quota d'une subscription active (type quelconque).
     * @return true si quota disponible et décrémenté, false sinon.
     */
    public boolean decrementQuota(String userId) {
        Optional<Subscription> opt = subscriptionRepository
                .findByUserIdAndStatut(userId, SubscriptionStatus.ACTIVE);

        if (opt.isEmpty()) return false;

        Subscription sub = opt.get();
        if (sub.getQuotaRestant() <= 0) return false;

        sub.setQuotaRestant(sub.getQuotaRestant() - 1);
        subscriptionRepository.save(sub);
        return true;
    }

    /**
     * Décrémente le quota d'une subscription active d'un type spécifique.
     * @return true si quota disponible et décrémenté, false sinon.
     */
    public boolean decrementQuota(String userId, PlanType expectedType) {
        Optional<Subscription> opt = subscriptionRepository
                .findByUserIdAndStatutAndPlanType(userId, SubscriptionStatus.ACTIVE, expectedType);

        if (opt.isEmpty()) return false;

        Subscription sub = opt.get();
        if (sub.getQuotaRestant() <= 0) return false;

        sub.setQuotaRestant(sub.getQuotaRestant() - 1);
        subscriptionRepository.save(sub);
        return true;
    }

    /**
     * Retourne la subscription active d'un user pour un type donné.
     */
    public Optional<Subscription> getActiveSubscription(String userId, PlanType planType) {
        return subscriptionRepository.findByUserIdAndStatutAndPlanType(userId, SubscriptionStatus.ACTIVE, planType);
    }

    /**
     * Retourne les identifiants de compte d'un revendeur actif.
     * Compatibilité: inclut l'id Mongo user ET le téléphone utilisé comme username.
     */
    public Set<String> getActiveRevendeurUserIds() {
        Set<String> userIds = subscriptionRepository.findByStatutAndPlanType(SubscriptionStatus.ACTIVE, PlanType.REVENDEUR)
                .stream()
                .map(Subscription::getUserId)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());

        Set<String> accountIdentifiers = new HashSet<>(userIds);
        userRepository.findAllById(userIds).forEach(user -> accountIdentifiers.add(user.getTelephone()));
        return accountIdentifiers;
    }

    /**
     * Retourne les subscriptions ACTIVE expirant dans les N prochains jours.
     */
    public List<Subscription> getExpiringWithin(int jours) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime limit = now.plusDays(jours);
        return subscriptionRepository.findByStatutAndDateFinBetween(SubscriptionStatus.ACTIVE, now, limit);
    }

    /**
     * Vérifie et expire les subscriptions dont la date de fin est passée.
     */
    public void checkExpirations() {
        List<Subscription> expirees = subscriptionRepository
                .findByStatutAndDateFinBefore(SubscriptionStatus.ACTIVE, LocalDateTime.now());

        for (Subscription sub : expirees) {
            sub.setStatut(SubscriptionStatus.EXPIRED);
            subscriptionRepository.save(sub);
            log.info("[Subscription] Expirée — id: {}, user: {}", sub.getId(), sub.getUserId());
        }

        if (!expirees.isEmpty()) {
            log.info("[Subscription] {} abonnements expirés", expirees.size());
        }
    }

    /**
     * Vérifie si un user a une subscription active.
     */
    public boolean hasActiveSubscription(String userId) {
        return subscriptionRepository.findByUserIdAndStatut(userId, SubscriptionStatus.ACTIVE).isPresent();
    }

    public void syncLegacyRevendeurSubscriptionByTelephone(String telephone, Revendeur revendeur) {
        getCurrentSubscription(telephone)
                .filter(sub -> sub.planType() == PlanType.REVENDEUR)
                .ifPresent(sub -> {
                    revendeur.setAbonnement(mapLegacyAbonnement(sub.planCode(), sub.dateFin()));
                    revendeur.setAbonnementExpiry(sub.dateFin());
                    revendeurRepository.save(revendeur);
                });
    }

    // ── Admin : gestion des plans ────────────────────────────────────────────

    /**
     * Liste TOUS les plans (y compris inactifs), triés par type puis ordre.
     */
    public List<AdminSubscriptionPlanDTO> getAllPlansAdmin() {
        return planRepository.findAllByOrderByTypeAscOrdreAsc()
                .stream().map(AdminSubscriptionPlanDTO::from).toList();
    }

    /**
     * Crée un nouveau plan d'abonnement.
     */
    public AdminSubscriptionPlanDTO createPlan(AdminPlanRequest req) {
        if (planRepository.existsByCode(req.code())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Un plan avec le code '" + req.code() + "' existe déjà.");
        }

        SubscriptionPlan plan = SubscriptionPlan.builder()
                .type(req.type())
                .nom(req.nom())
                .code(req.code())
                .prix(req.prix())
                .dureeJours(req.dureeJours())
                .quota(req.quota())
                .description(req.description())
                .features(req.features() != null ? req.features() : List.of())
                .actif(true)
                .ordre(req.ordre())
                .build();

        plan = planRepository.save(plan);
        log.info("[Admin] Plan créé : {} ({})", plan.getNom(), plan.getCode());
        return AdminSubscriptionPlanDTO.from(plan);
    }

    /**
     * Met à jour un plan existant.
     */
    public AdminSubscriptionPlanDTO updatePlan(String id, AdminPlanRequest req) {
        SubscriptionPlan plan = planRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Plan introuvable : " + id));

        // Vérifier unicité du code si modifié
        if (!plan.getCode().equals(req.code()) && planRepository.existsByCode(req.code())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Un plan avec le code '" + req.code() + "' existe déjà.");
        }

        plan.setType(req.type());
        plan.setNom(req.nom());
        plan.setCode(req.code());
        plan.setPrix(req.prix());
        plan.setDureeJours(req.dureeJours());
        plan.setQuota(req.quota());
        plan.setDescription(req.description());
        plan.setFeatures(req.features() != null ? req.features() : List.of());
        plan.setOrdre(req.ordre());

        plan = planRepository.save(plan);
        log.info("[Admin] Plan mis à jour : {} ({})", plan.getNom(), plan.getCode());
        return AdminSubscriptionPlanDTO.from(plan);
    }

    private void syncLegacyRevendeurSubscription(String userId, SubscriptionPlan plan, LocalDateTime dateFin) {
        if (plan.getType() != PlanType.REVENDEUR) {
            return;
        }

        userRepository.findById(userId)
                .flatMap(user -> revendeurRepository.findByUserId(user.getTelephone()))
                .ifPresent(revendeur -> {
                    revendeur.setAbonnement(mapLegacyAbonnement(plan.getCode(), dateFin));
                    revendeur.setAbonnementExpiry(dateFin);
                    revendeurRepository.save(revendeur);
                });
    }

    private Abonnement mapLegacyAbonnement(String planCode, LocalDateTime dateFin) {
        if (planCode == null) {
            return Abonnement.GRATUIT;
        }

        String code = planCode.toUpperCase();
        if (code.contains("MAX") || code.contains("ANNUEL")) return Abonnement.ANNUEL;
        if (code.contains("PRO")) return Abonnement.ANNUEL;
        if (code.contains("DIAMOND") || code.contains("SEMESTRIEL")) return Abonnement.SEMESTRIEL;
        if (code.contains("GOLD") || code.contains("TRIMESTRIEL")) return Abonnement.TRIMESTRIEL;

        if (dateFin != null) {
            return Abonnement.MENSUEL;
        }

        return Abonnement.TEST;
    }

    /**
     * Bascule actif/inactif un plan.
     */
    public AdminSubscriptionPlanDTO togglePlanActif(String id) {
        SubscriptionPlan plan = planRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Plan introuvable : " + id));
        plan.setActif(!plan.isActif());
        plan = planRepository.save(plan);
        log.info("[Admin] Plan {} : actif = {}", plan.getCode(), plan.isActif());
        return AdminSubscriptionPlanDTO.from(plan);
    }

    // ── Admin : listing des subscriptions ────────────────────────────────────

    /**
     * Liste toutes les subscriptions (pour l'admin).
     */
    public List<SubscriptionDTO> getAllSubscriptions() {
        return subscriptionRepository.findAll().stream()
                .map(SubscriptionDTO::from).toList();
    }
}
