package bj.gazfacile.service;

import bj.gazfacile.dto.DashboardStatsDTO;
import bj.gazfacile.model.Commande;
import bj.gazfacile.model.Revendeur;
import bj.gazfacile.model.enums.Abonnement;
import bj.gazfacile.model.enums.Role;
import bj.gazfacile.model.enums.StockStatus;
import bj.gazfacile.repository.AvisRepository;
import bj.gazfacile.repository.CommandeRepository;
import bj.gazfacile.repository.RevendeurRepository;
import bj.gazfacile.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Service du tableau de bord administrateur.
 * Agregation des statistiques globales de la plateforme GazFacile.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AdminService {

    private final RevendeurRepository revendeurRepository;
    private final CommandeRepository commandeRepository;
    private final UserRepository userRepository;
    private final AvisRepository avisRepository;

    /**
     * Calcule et retourne toutes les statistiques pour le dashboard admin.
     *
     * @return DTO contenant les metriques globales de la plateforme
     */
    public DashboardStatsDTO getDashboardStats() {
        List<Revendeur> tousRevendeurs = revendeurRepository.findAll();
        List<Commande> toutesCommandes = commandeRepository.findAll();

        // — Statistiques revendeurs —
        long totalRevendeurs  = tousRevendeurs.size();
        long revendeursActifs = tousRevendeurs.stream().filter(Revendeur::isActif).count();

        Map<String, Long> parAbonnement = Arrays.stream(Abonnement.values()).collect(
            Collectors.toMap(Enum::name, a -> tousRevendeurs.stream()
                .filter(r -> a == r.getAbonnement()).count())
        );

        Map<String, Long> parStock = Arrays.stream(StockStatus.values()).collect(
            Collectors.toMap(Enum::name, s -> tousRevendeurs.stream()
                .filter(r -> s == r.getStockStatus() && r.isActif()).count())
        );

        // — Statistiques commandes —
        long totalCommandes = toutesCommandes.size();

        Map<String, Long> parStatut = toutesCommandes.stream().collect(
            Collectors.groupingBy(c -> c.getStatutCommande().name(), Collectors.counting())
        );

        Map<String, Long> parPaiement = toutesCommandes.stream().collect(
            Collectors.groupingBy(c -> c.getModePaiement().name(), Collectors.counting())
        );

        double caTotal = toutesCommandes.stream()
            .mapToDouble(Commande::getTotal)
            .sum();

        LocalDateTime debutMois = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
        double caMois = toutesCommandes.stream()
            .filter(c -> c.getCreatedAt() != null && c.getCreatedAt().isAfter(debutMois))
            .mapToDouble(Commande::getTotal)
            .sum();

        // — Statistiques utilisateurs —
        long totalUsers   = userRepository.count();
        long nbClients    = userRepository.findAll().stream()
            .filter(u -> u.getRoles().contains(Role.CLIENT)).count();
        long nbRevendeurs = userRepository.findAll().stream()
            .filter(u -> u.getRoles().contains(Role.REVENDEUR)).count();

        // — Statistiques avis —
        long totalAvis = avisRepository.count();
        double noteMoyenneGlobale = avisRepository.findAll().stream()
            .mapToInt(a -> a.getNote())
            .average()
            .orElse(0.0);

        return new DashboardStatsDTO(
            totalRevendeurs,
            revendeursActifs,
            totalRevendeurs - revendeursActifs,
            parAbonnement,
            parStock,
            totalCommandes,
            parStatut,
            parPaiement,
            caTotal,
            caMois,
            totalUsers,
            nbClients,
            nbRevendeurs,
            totalAvis,
            Math.round(noteMoyenneGlobale * 10.0) / 10.0
        );
    }
}
