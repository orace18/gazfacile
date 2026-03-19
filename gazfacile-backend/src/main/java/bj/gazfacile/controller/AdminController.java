package bj.gazfacile.controller;

import bj.gazfacile.dto.DashboardStatsDTO;
import bj.gazfacile.model.Revendeur;
import bj.gazfacile.model.User;
import bj.gazfacile.repository.RevendeurRepository;
import bj.gazfacile.repository.UserRepository;
import bj.gazfacile.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Contrôleur du tableau de bord administrateur.
 * Toutes les routes sont réservées aux utilisateurs ayant le rôle ADMIN.
 */
@RestController
@RequestMapping("/api/v1/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final RevendeurRepository revendeurRepository;
    private final UserRepository userRepository;

    /** Retourne les statistiques globales de la plateforme. */
    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDTO> getStats() {
        return ResponseEntity.ok(adminService.getDashboardStats());
    }

    /** Liste tous les revendeurs (actifs et inactifs). */
    @GetMapping("/revendeurs")
    public ResponseEntity<List<Revendeur>> getTousRevendeurs() {
        return ResponseEntity.ok(revendeurRepository.findAll());
    }

    /** Liste tous les utilisateurs inscrits. */
    @GetMapping("/utilisateurs")
    public ResponseEntity<List<User>> getTousUtilisateurs() {
        return ResponseEntity.ok(userRepository.findAll());
    }
}
