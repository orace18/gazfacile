package bj.gazfacile.service;

import bj.gazfacile.dto.CommandeDTO;
import bj.gazfacile.exception.ResourceNotFoundException;
import bj.gazfacile.model.Commande;
import bj.gazfacile.model.ProduitRevendeur;
import bj.gazfacile.model.Revendeur;
import bj.gazfacile.model.Subscription;
import bj.gazfacile.model.User;
import bj.gazfacile.model.enums.FormatBouteille;
import bj.gazfacile.model.enums.MarqueGaz;
import bj.gazfacile.model.enums.ModePaiement;
import bj.gazfacile.model.enums.PlanType;
import bj.gazfacile.model.enums.StatutCommande;
import bj.gazfacile.model.enums.StatutPaiement;
import bj.gazfacile.repository.CommandeRepository;
import bj.gazfacile.repository.ProduitRevendeurRepository;
import bj.gazfacile.repository.RevendeurRepository;
import bj.gazfacile.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;

/**
 * Service métier pour la gestion des commandes de gaz.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class CommandeService {

    /** Rayon gratuit de livraison en km. */
    private static final double RAYON_GRATUIT_KM = 5.0;

    /** Surcoût par km au-delà du rayon gratuit (en FCFA). */
    private static final int SURCOUT_PAR_KM = 200;

    /** Rayon de la Terre en km (formule Haversine). */
    private static final double RAYON_TERRE_KM = 6371.0;

    private final CommandeRepository commandeRepository;
    private final RevendeurRepository revendeurRepository;
    private final ProduitRevendeurRepository produitRevendeurRepository;
    private final SubscriptionService subscriptionService;
    private final UserRepository userRepository;
    private final PhoneNumberService phoneNumberService;

    /**
     * Crée une nouvelle commande de gaz.
     * Calcule le prix total et initie le paiement Mobile Money si nécessaire.
     *
     * @param dto données de la commande
     * @return la commande créée
     */
    public Commande creer(CommandeDTO dto, String telephoneJwt) {
        // Vérifier que le revendeur existe
        Revendeur revendeur = revendeurRepository.findById(dto.revendeurId())
                .orElseThrow(() -> new ResourceNotFoundException("Revendeur", dto.revendeurId()));

        // Téléphone issu du JWT — le champ DTO est ignoré pour prévenir l'usurpation d'identité
        String clientTelephone = phoneNumberService.normaliserTelephoneLocal(telephoneJwt);
        MarqueGaz marque = parseMarque(dto.marque());
        FormatBouteille format = parseFormat(dto.taille());

        ProduitRevendeur produit = produitRevendeurRepository
                .findByRevendeurIdAndMarqueAndFormat(dto.revendeurId(), marque, format)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Le produit demandé n'existe pas dans le catalogue du revendeur"
                ));

        if (!produit.isDisponible() || produit.getQuantiteDisponible() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Le produit demandé n'est pas disponible actuellement");
        }

        if (dto.quantite() > produit.getQuantiteDisponible()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Quantité indisponible pour ce produit");
        }

        // Un abonnement livraison n'est pas obligatoire pour commander.
        // S'il existe et qu'il reste du quota, la commande consomme une livraison.
        User client = userRepository.findByTelephone(clientTelephone).orElse(null);
        Optional<Subscription> livraisonSubscription = Optional.empty();
        if (client != null) {
            livraisonSubscription = subscriptionService.getActiveSubscription(
                    client.getId(), PlanType.CLIENT_LIVRAISON);
        }

        // Calculer le prix unitaire selon le catalogue réel du revendeur
        double prixUnitaire = produit.getPrixUnitaire();
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
        long acompteRequis = calculerAcompteRequis(total, dto.modePaiement());
        double montantRestant = dto.modePaiement() == ModePaiement.ESPECES
                ? Math.max(0, total - acompteRequis)
                : 0;

        Commande commande = Commande.builder()
                .revendeurId(dto.revendeurId())
                .revendeurNom(revendeur.getNom())
                .clientTelephone(clientTelephone)
                .clientAdresseLivraison(dto.clientAdresseLivraison())
                .clientLocation(dto.clientLocation())
                .marque(marque.getLibelle())
                .taille(format.getLibelle())
                .quantite(dto.quantite())
                .prixUnitaire(prixUnitaire)
                .total(total)
                .acompteRequis(acompteRequis)
                .montantRestant(montantRestant)
                .distanceKm(distanceKm)
                .fraisSupplementaires(fraisSupplementaires)
                .modePaiement(dto.modePaiement())
                .statutPaiement(StatutPaiement.EN_ATTENTE)
                .statutCommande(StatutCommande.EN_ATTENTE)
                .createdAt(LocalDateTime.now())
                .build();

        commande = commandeRepository.save(commande);

        // Décrémenter le quota livraison uniquement si un abonnement actif avec quota existe.
        if (client != null && livraisonSubscription.map(sub -> sub.getQuotaRestant() > 0).orElse(false)) {
            subscriptionService.decrementQuota(client.getId(), PlanType.CLIENT_LIVRAISON);
        }

        log.info("Commande créée : {} pour {} FCFA (distance: {}km, frais: {} FCFA, abonnementLivraisonUtilise: {})",
                commande.getId(), total, String.format("%.1f", distanceKm), fraisSupplementaires,
                livraisonSubscription.map(sub -> sub.getQuotaRestant() > 0).orElse(false));
        return commande;
    }

    private long calculerAcompteRequis(double total, ModePaiement modePaiement) {
        if (modePaiement != ModePaiement.ESPECES) {
            return 0;
        }
        return (long) Math.ceil(total * 0.25);
    }

    private MarqueGaz parseMarque(String value) {
        for (MarqueGaz marque : MarqueGaz.values()) {
            if (marque.name().equalsIgnoreCase(value) || marque.getLibelle().equalsIgnoreCase(value)) {
                return marque;
            }
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Marque de gaz invalide");
    }

    private FormatBouteille parseFormat(String value) {
        String normalized = value == null ? "" : value.trim().toUpperCase(Locale.ROOT);

        return switch (normalized) {
            case "KG_3", "3KG", "3 KG" -> FormatBouteille.KG_3;
            case "KG_6", "6KG", "6 KG" -> FormatBouteille.KG_6;
            case "KG_12", "12KG", "12 KG" -> FormatBouteille.KG_12;
            case "KG_25", "25KG", "25 KG" -> FormatBouteille.KG_25;
            case "KG_38", "38KG", "38 KG" -> FormatBouteille.KG_38;
            default -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Format de bouteille invalide");
        };
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
     * Vérifie que l'appelant est bien le propriétaire du revendeur (sauf admin).
     */
    public List<Commande> getByRevendeur(String revendeurId, String telephoneAuthentifie, boolean isAdmin) {
        if (!isAdmin) {
            Revendeur revendeur = revendeurRepository.findById(revendeurId)
                    .orElseThrow(() -> new ResourceNotFoundException("Revendeur", revendeurId));
            if (!telephoneAuthentifie.equals(revendeur.getUserId())) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                        "Accès refusé : vous n'êtes pas le propriétaire de ce dépôt");
            }
        }
        return commandeRepository.findByRevendeurIdOrderByCreatedAtDesc(revendeurId);
    }

    /**
     * Retourne les commandes du client authentifié.
     */
    public List<Commande> getByClient(String telephoneAuthentifie) {
        String clientTelephone = phoneNumberService.normaliserTelephoneLocal(telephoneAuthentifie);
        return commandeRepository.findByClientTelephoneOrderByCreatedAtDesc(clientTelephone);
    }

    /**
     * Met à jour le statut d'une commande.
     * Vérifie que l'appelant est le revendeur propriétaire de la commande (sauf admin).
     */
    public Commande updateStatut(String id, StatutCommande nouveauStatut, String telephoneAuthentifie, boolean isAdmin) {
        Commande commande = commandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Commande", id));

        if (!isAdmin) {
            String revendeurId = commande.getRevendeurId();
            Revendeur revendeur = revendeurRepository.findById(revendeurId)
                    .orElseThrow(() -> new ResourceNotFoundException("Revendeur", revendeurId));
            if (!telephoneAuthentifie.equals(revendeur.getUserId())) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                        "Accès refusé : seul le revendeur peut modifier le statut de cette commande");
            }
        }

        commande.setStatutCommande(nouveauStatut);

        if (nouveauStatut == StatutCommande.LIVREE) {
            commande.setLivraisonAt(LocalDateTime.now());
            commande.setStatutPaiement(StatutPaiement.PAYE);
            commande.setMontantRestant(0);
        }

        commande = commandeRepository.save(commande);
        log.info("Statut commande {} mis à jour : {}", id, nouveauStatut);
        return commande;
    }
}
