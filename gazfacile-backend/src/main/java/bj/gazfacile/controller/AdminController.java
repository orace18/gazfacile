package bj.gazfacile.controller;

import bj.gazfacile.dto.DashboardStatsDTO;
import bj.gazfacile.model.Commande;
import bj.gazfacile.model.Revendeur;
import bj.gazfacile.model.Transaction;
import bj.gazfacile.model.User;
import bj.gazfacile.model.enums.Abonnement;
import bj.gazfacile.model.enums.StatutCommande;
import bj.gazfacile.repository.CommandeRepository;
import bj.gazfacile.repository.RevendeurRepository;
import bj.gazfacile.repository.TransactionRepository;
import bj.gazfacile.repository.UserRepository;
import bj.gazfacile.service.AdminService;
import bj.gazfacile.service.RevendeurService;
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
        Revendeur revendeur = revendeurService.getById(id);
        Abonnement plan = Abonnement.valueOf(body.get("plan"));
        revendeur.setAbonnement(plan);
        if (plan != Abonnement.GRATUIT) {
            int jours = body.containsKey("jours") ? Integer.parseInt(body.get("jours")) : 30;
            revendeur.setAbonnementExpiry(LocalDateTime.now().plusDays(jours));
        } else {
            revendeur.setAbonnementExpiry(null);
        }
        revendeur.setUpdatedAt(LocalDateTime.now());
        return ResponseEntity.ok(revendeurRepository.save(revendeur));
    }

    // ── Utilisateurs ──────────────────────────────────────────────────────────

    @GetMapping("/utilisateurs")
    public ResponseEntity<List<User>> getTousUtilisateurs() {
        return ResponseEntity.ok(userRepository.findAll());
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
        commande.setStatutCommande(StatutCommande.valueOf(body.get("statut")));
        return ResponseEntity.ok(commandeRepository.save(commande));
    }

    // ── Transactions FedaPay ──────────────────────────────────────────────────

    @GetMapping("/transactions")
    public ResponseEntity<List<Transaction>> getToutesTransactions() {
        return ResponseEntity.ok(transactionRepository.findAllByOrderByCreatedAtDesc());
    }
}
