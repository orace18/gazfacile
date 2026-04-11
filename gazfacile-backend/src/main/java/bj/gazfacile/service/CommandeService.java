package bj.gazfacile.service;

import bj.gazfacile.dto.CommandeDTO;
import bj.gazfacile.exception.ResourceNotFoundException;
import bj.gazfacile.model.Commande;
import bj.gazfacile.model.Revendeur;
import bj.gazfacile.model.Subscription;
import bj.gazfacile.model.User;
import bj.gazfacile.model.enums.PlanType;
import bj.gazfacile.model.enums.StatutCommande;
import bj.gazfacile.model.enums.StatutPaiement;
import bj.gazfacile.repository.CommandeRepository;
import bj.gazfacile.repository.RevendeurRepository;
import bj.gazfacile.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Service métier pour la gestion des commandes de gaz.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class CommandeService {

    /** Prix unitaire d'une bouteille de 6kg en FCFA. */
    private static final double PRIX_6KG = 5500.0;

    /** Prix unitaire d'une bouteille de 12kg en FCFA. */
    private static final double PRIX_12KG = 10000.0;

    /** Rayon gratuit de livraison en km. */
    private static final double RAYON_GRATUIT_KM = 5.0;

    /** Surcoût par km au-delà du rayon gratuit (en FCFA). */
    private static final int SURCOUT_PAR_KM = 200;

    /** Rayon de la Terre en km (formule Haversine). */
    private static final double RAYON_TERRE_KM = 6371.0;

    private final CommandeRepository commandeRepository;
    private final RevendeurRepository revendeurRepository;
    private final SubscriptionService subscriptionService;
    private final UserRepository userRepository;

    /**
     * Crée une nouvelle commande de gaz.
     * Calcule le prix total et initie le paiement Mobile Money si nécessaire.
     *
     * @param dto données de la commande
     * @return la commande créée
     */
    public Commande creer(CommandeDTO dto) {
        // Vérifier que le revendeur existe
        Revendeur revendeur = revendeurRepository.findById(dto.revendeurId())
                .orElseThrow(() -> new ResourceNotFoundException("Revendeur", dto.revendeurId()));

        // Vérifier que le client a un abonnement LIVRAISON actif avec quota restant
        User client = userRepository.findByTelephone(dto.clientTelephone()).orElse(null);
        if (client != null) {
            Optional<Subscription> subOpt = subscriptionService.getActiveSubscription(
                    client.getId(), PlanType.CLIENT_LIVRAISON);

            if (subOpt.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.CONFLICT,
                        "Abonnement livraison requis pour passer une commande.");
            }
            if (subOpt.get().getQuotaRestant() <= 0) {
                throw new ResponseStatusException(HttpStatus.CONFLICT,
                        "Quota de livraisons épuisé. Renouvelez votre abonnement.");
            }
        }

        // Calculer le prix unitaire selon la taille
        double prixUnitaire = "6kg".equals(dto.taille()) ? PRIX_6KG : PRIX_12KG;
        double total = prixUnitaire * dto.quantite();

        // Calculer la distance et le surcoût éventuel
        double distanceKm = 0;
        int fraisSupplementaires = 0;
        if (dto.clientLocation() != null && revendeur.getLocation() != null) {
            distanceKm = calculerDistanceKm(dto.clientLocation(), revendeur.getLocation());
            if (distanceKm > RAYON_GRATUIT_KM) {
                fraisSupplementaires = (int) Math.ceil((distanceKm - RAYON_GRATUIT_KM) * SURCOUT_PAR_KM);
                total += fraisSupplementaires;
                log.info("Surcoût distance : {}km → +{} FCFA", String.format("%.1f", distanceKm), fraisSupplementaires);
            }
        }

        // Générer une référence unique pour la commande
        String referenceCommande = "GF-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        Commande commande = Commande.builder()
                .revendeurId(dto.revendeurId())
                .revendeurNom(revendeur.getNom())
                .clientTelephone(dto.clientTelephone())
                .clientAdresseLivraison(dto.clientAdresseLivraison())
                .clientLocation(dto.clientLocation())
                .marque(dto.marque())
                .taille(dto.taille())
                .quantite(dto.quantite())
                .prixUnitaire(prixUnitaire)
                .total(total)
                .distanceKm(distanceKm)
                .fraisSupplementaires(fraisSupplementaires)
                .modePaiement(dto.modePaiement())
                .statutPaiement(StatutPaiement.EN_ATTENTE)
                .statutCommande(StatutCommande.EN_ATTENTE)
                .createdAt(LocalDateTime.now())
                .build();

        commande = commandeRepository.save(commande);

        // Décrémenter le quota livraison après sauvegarde
        if (client != null) {
            subscriptionService.decrementQuota(client.getId(), PlanType.CLIENT_LIVRAISON);
        }

        log.info("Commande créée : {} pour {} FCFA (distance: {}km, frais: {} FCFA)",
                commande.getId(), total, String.format("%.1f", distanceKm), fraisSupplementaires);
        return commande;
    }

    /**
     * Calcule la distance entre deux points [longitude, latitude] en km (Haversine).
     */
    private double calculerDistanceKm(double[] point1, double[] point2) {
        double lat1 = Math.toRadians(point1[1]);
        double lat2 = Math.toRadians(point2[1]);
        double dLat = Math.toRadians(point2[1] - point1[1]);
        double dLon = Math.toRadians(point2[0] - point1[0]);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(lat1) * Math.cos(lat2)
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return RAYON_TERRE_KM * c;
    }

    /**
     * Retourne toutes les commandes d'un revendeur.
     *
     * @param revendeurId identifiant du revendeur
     */
    public List<Commande> getByRevendeur(String revendeurId) {
        return commandeRepository.findByRevendeurIdOrderByCreatedAtDesc(revendeurId);
    }

    /**
     * Met à jour le statut d'une commande.
     *
     * @param id            identifiant de la commande
     * @param nouveauStatut nouveau statut
     * @return la commande mise à jour
     */
    public Commande updateStatut(String id, StatutCommande nouveauStatut) {
        Commande commande = commandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Commande", id));

        commande.setStatutCommande(nouveauStatut);

        // Enregistrer la date de livraison si la commande est livrée
        if (nouveauStatut == StatutCommande.LIVREE) {
            commande.setLivraisonAt(LocalDateTime.now());
            commande.setStatutPaiement(StatutPaiement.PAYE);
        }

        commande = commandeRepository.save(commande);
        log.info("Statut commande {} mis à jour : {}", id, nouveauStatut);
        return commande;
    }
}
