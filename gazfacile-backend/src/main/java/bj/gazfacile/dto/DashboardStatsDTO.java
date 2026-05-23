package bj.gazfacile.dto;

import java.util.Map;

/**
 * DTO contenant les statistiques globales pour le tableau de bord administrateur.
 */
public record DashboardStatsDTO(

        // Revendeurs
        long totalRevendeurs,
        long revendeursActifs,
        long revendeursInactifs,
        Map<String, Long> revendeurParAbonnement,
        Map<String, Long> revendeurParStock,

        // Commandes
        long totalCommandes,
        Map<String, Long> commandesParStatut,
        Map<String, Long> commandesParPaiement,
        double chiffreAffaireTotal,
        double chiffreAffaireMois,

        // Utilisateurs
        long totalUtilisateurs,
        long totalClients,
        long totalRevendeursInscrits,

        // Avis
        long totalAvis,
        double noteMoyenneGlobale
) {}
