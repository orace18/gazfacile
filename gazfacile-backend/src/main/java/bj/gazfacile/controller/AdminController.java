package bj.gazfacile.controller;

import bj.gazfacile.dto.AdminCatalogueItemDTO;
import bj.gazfacile.dto.AdminPlanRequest;
import bj.gazfacile.dto.AdminSubscriptionDTO;
import bj.gazfacile.dto.AdminSubscriptionPlanDTO;
import bj.gazfacile.dto.DashboardStatsDTO;
import bj.gazfacile.dto.UserAdminDTO;
import bj.gazfacile.model.Commande;
import bj.gazfacile.model.Revendeur;
import bj.gazfacile.model.Transaction;
import bj.gazfacile.model.User;
import bj.gazfacile.model.enums.Abonnement;
import bj.gazfacile.model.enums.StatutCommande;
import bj.gazfacile.model.enums.StatutPaiement;
import bj.gazfacile.repository.CommandeRepository;
import bj.gazfacile.repository.RevendeurRepository;
import bj.gazfacile.repository.TransactionRepository;
import bj.gazfacile.repository.UserRepository;
import bj.gazfacile.service.AdminService;
import bj.gazfacile.service.RevendeurService;
import bj.gazfacile.service.SubscriptionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final RevendeurService revendeurService;
    private final SubscriptionService subscriptionService;
    private final RevendeurRepository revendeurRepository;
    private final UserRepository userRepository;
    private final CommandeRepository commandeRepository;
    private final TransactionRepository transactionRepository;

    // ── Stats ─────────────────────────────────────────────────────────────────

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDTO> getStats() {
        return ResponseEntity.ok(adminService.getDashboardStats());
    }

    // ── Revendeurs ────────────────────────────────────────────────────────────

    @GetMapping("/revendeurs")
    public ResponseEntity<List<Revendeur>> getTousRevendeurs() {
        return ResponseEntity.ok(revendeurRepository.findAll());
    }

    /** Bascule actif/inactif d'un revendeur. */
    @PatchMapping("/revendeurs/{id}/toggle-actif")
    public ResponseEntity<Revendeur> toggleActif(@PathVariable String id) {
        return ResponseEntity.ok(revendeurService.toggleActif(id));
    }

    /** Modifie manuellement le plan d'abonnement d'un revendeur. */
    @PatchMapping("/revendeurs/{id}/abonnement")
    public ResponseEntity<Revendeur> setAbonnement(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {

        String planStr = body.get("plan");
        if (planStr == null || planStr.isBlank()) {
            throw new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.BAD_REQUEST, "Champ 'plan' obligatoire");
        }
        Abonnement plan;
        try {
            plan = Abonnement.valueOf(planStr.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.BAD_REQUEST, "Valeur 'plan' invalide");
        }

        int jours = 30;
        if (body.containsKey("jours")) {
            try {
                jours = Integer.parseInt(body.get("jours"));
            } catch (NumberFormatException e) {
                throw new org.springframework.web.server.ResponseStatusException(
                        org.springframework.http.HttpStatus.BAD_REQUEST, "Valeur 'jours' invalide");
            }
            if (jours < 1 || jours > 3650) {
                throw new org.springframework.web.server.ResponseStatusException(
                        org.springframework.http.HttpStatus.BAD_REQUEST, "'jours' doit être entre 1 et 3650");
            }
        }

        Revendeur revendeur = revendeurService.getById(id);
        revendeur.setAbonnement(plan);
        revendeur.setAbonnementExpiry(plan != Abonnement.GRATUIT
                ? LocalDateTime.now().plusDays(jours) : null);
        revendeur.setUpdatedAt(LocalDateTime.now());
        return ResponseEntity.ok(revendeurRepository.save(revendeur));
    }

    // ── Utilisateurs ──────────────────────────────────────────────────────────

    @GetMapping("/utilisateurs")
    public ResponseEntity<List<UserAdminDTO>> getTousUtilisateurs() {
        return ResponseEntity.ok(
                userRepository.findAll().stream().map(UserAdminDTO::from).toList()
        );
    }

    /** Désactive un utilisateur (soft delete). */
    @PatchMapping("/utilisateurs/{id}/toggle-actif")
    public ResponseEntity<Map<String, Object>> toggleActifUtilisateur(@PathVariable String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(
                        org.springframework.http.HttpStatus.NOT_FOUND, "Utilisateur introuvable"));
        user.setActif(!user.isActif());
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("actif", user.isActif()));
    }

    // ── Commandes ─────────────────────────────────────────────────────────────

    @GetMapping("/commandes")
    public ResponseEntity<List<Commande>> getToutesCommandes() {
        return ResponseEntity.ok(commandeRepository.findAll());
    }

    /** Met à jour le statut d'une commande. */
    @PatchMapping("/commandes/{id}/statut")
    public ResponseEntity<Commande> updateStatutCommande(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {
        Commande commande = commandeRepository.findById(id)
                .orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(
                        org.springframework.http.HttpStatus.NOT_FOUND, "Commande introuvable"));
        StatutCommande statut = StatutCommande.valueOf(body.get("statut"));
        commande.setStatutCommande(statut);
        if (statut == StatutCommande.LIVREE) {
            commande.setStatutPaiement(StatutPaiement.PAYE);
            commande.setMontantRestant(0);
            commande.setLivraisonAt(LocalDateTime.now());
        }
        return ResponseEntity.ok(commandeRepository.save(commande));
    }

    // ── Transactions FedaPay ──────────────────────────────────────────────────

    @GetMapping("/transactions")
    public ResponseEntity<List<Transaction>> getToutesTransactions() {
        return ResponseEntity.ok(transactionRepository.findAllByOrderByCreatedAtDesc());
    }

    // ── Catalogue global ──────────────────────────────────────────────────────

    @GetMapping("/catalogue")
    public ResponseEntity<List<AdminCatalogueItemDTO>> getCatalogueGlobal() {
        return ResponseEntity.ok(adminService.getCatalogueGlobal());
    }

    // ── Plans d'abonnement ───────────────────────────────────────────────────

    /** Liste tous les plans (y compris inactifs). */
    @GetMapping("/plans")
    public ResponseEntity<List<AdminSubscriptionPlanDTO>> getTousPlans() {
        return ResponseEntity.ok(subscriptionService.getAllPlansAdmin());
    }

    /** Crée un nouveau plan. */
    @PostMapping("/plans")
    public ResponseEntity<AdminSubscriptionPlanDTO> creerPlan(
            @Valid @RequestBody AdminPlanRequest request) {
        return ResponseEntity.ok(subscriptionService.createPlan(request));
    }

    /** Met à jour un plan existant. */
    @PutMapping("/plans/{id}")
    public ResponseEntity<AdminSubscriptionPlanDTO> modifierPlan(
            @PathVariable String id,
            @Valid @RequestBody AdminPlanRequest request) {
        return ResponseEntity.ok(subscriptionService.updatePlan(id, request));
    }

    /** Bascule actif/inactif un plan. */
    @PatchMapping("/plans/{id}/toggle-actif")
    public ResponseEntity<AdminSubscriptionPlanDTO> toggleActifPlan(@PathVariable String id) {
        return ResponseEntity.ok(subscriptionService.togglePlanActif(id));
    }

    // ── Subscriptions ────────────────────────────────────────────────────────

    /** Liste toutes les subscriptions. */
    @GetMapping("/subscriptions")
    public ResponseEntity<List<AdminSubscriptionDTO>> getToutesSubscriptions() {
        return ResponseEntity.ok(adminService.getSubscriptionsAdmin());
    }

    /** Force l'activation d'une subscription PENDING (correction manuelle après webhook manquant). */
    @PostMapping("/subscriptions/{id}/activer")
    public ResponseEntity<Void> activerSubscription(@PathVariable String id) {
        subscriptionService.activateSubscription(id, null);
        return ResponseEntity.ok().build();
    }
}
