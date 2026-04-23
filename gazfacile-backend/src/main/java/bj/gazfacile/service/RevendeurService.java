package bj.gazfacile.service;

import bj.gazfacile.dto.RevendeurDTO;
import bj.gazfacile.dto.StockUpdateDTO;
import bj.gazfacile.exception.ResourceNotFoundException;
import bj.gazfacile.model.Revendeur;
import bj.gazfacile.model.enums.StockStatus;
import bj.gazfacile.repository.RevendeurRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Service métier pour la gestion des revendeurs de gaz.
 * Gère la persistance, la géolocalisation et les broadcasts WebSocket.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class RevendeurService {

    private final RevendeurRepository revendeurRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final SubscriptionService subscriptionService;

    /** Retourne tous les revendeurs actifs ayant une subscription REVENDEUR active. */
    public List<Revendeur> getAllActifs() {
        Set<String> activeUserIds = subscriptionService.getActiveRevendeurUserIds();
        return revendeurRepository.findByActifTrue().stream()
                .filter(r -> r.getUserId() != null && activeUserIds.contains(r.getUserId()))
                .toList();
    }

    /**
     * Recherche les revendeurs à proximité ayant une subscription REVENDEUR active.
     */
    public List<Revendeur> getNearby(double latitude, double longitude, double rayon) {
        log.debug("Recherche géospatiale : lat={}, lng={}, rayon={}m", latitude, longitude, rayon);
        Set<String> activeUserIds = subscriptionService.getActiveRevendeurUserIds();
        return revendeurRepository.findNearby(longitude, latitude, rayon).stream()
                .filter(r -> r.getUserId() != null && activeUserIds.contains(r.getUserId()))
                .toList();
    }

    /**
     * Recherche les revendeurs à proximité ayant du stock et une subscription active.
     */
    public List<Revendeur> getNearbyWithStock(double latitude, double longitude, double rayon) {
        Set<String> activeUserIds = subscriptionService.getActiveRevendeurUserIds();
        return revendeurRepository.findNearbyWithStock(longitude, latitude, rayon).stream()
                .filter(r -> r.getUserId() != null && activeUserIds.contains(r.getUserId()))
                .toList();
    }

    /**
     * Retourne un revendeur par son identifiant.
     *
     * @throws ResourceNotFoundException si aucun revendeur trouvé
     */
    public Revendeur getById(String id) {
        return revendeurRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Revendeur", id));
    }

    /**
     * Retourne le dépôt associé à l'utilisateur connecté (par son username/téléphone).
     *
     * @throws ResourceNotFoundException si l'utilisateur n'a pas encore de dépôt
     */
    public Revendeur getByUserId(String telephone) {
        return revendeurRepository.findByUserId(telephone)
                .orElseThrow(() -> new ResourceNotFoundException("Aucun dépôt trouvé pour ce compte"));
    }

    /**
     * Inscrit un nouveau revendeur de gaz.
     *
     * @param dto               données du revendeur
     * @param telephoneCompte   téléphone/username du compte créateur
     * @return le revendeur créé
     */
    public Revendeur inscrire(RevendeurDTO dto, String telephoneCompte) {
        LocalDateTime maintenant = LocalDateTime.now();

        Revendeur revendeur = Revendeur.builder()
                .nom(dto.nom())
                .quartier(dto.quartier())
                .adresse(dto.adresse())
                .telephone(dto.telephone())
                .email(dto.email())
                .location(dto.location())
                .marques(dto.marques())
                .livraison(dto.livraison())
                .userId(telephoneCompte)
                .actif(true)
                .createdAt(maintenant)
                .updatedAt(maintenant)
                .build();

        revendeur = revendeurRepository.save(revendeur);
        subscriptionService.syncLegacyRevendeurSubscriptionByTelephone(telephoneCompte, revendeur);
        log.info("Nouveau revendeur inscrit : {} ({})", revendeur.getNom(), revendeur.getId());
        return revendeurRepository.findById(revendeur.getId()).orElse(revendeur);
    }

    /**
     * Met à jour le statut de stock d'un revendeur et diffuse la mise à jour via WebSocket.
     *
     * @param id  identifiant du revendeur
     * @param dto nouveau statut de stock
     * @return le revendeur mis à jour
     */
    public Revendeur updateStock(String id, StockUpdateDTO dto, String telephoneAuthentifie, boolean isAdmin) {
        Revendeur revendeur = getById(id);
        if (!isAdmin && !telephoneAuthentifie.equals(revendeur.getUserId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Accès refusé : vous n'êtes pas le propriétaire de ce dépôt");
        }
        StockStatus ancienStatut = revendeur.getStockStatus();
        revendeur.setStockStatus(dto.stockStatus());
        revendeur.setUpdatedAt(LocalDateTime.now());
        revendeur = revendeurRepository.save(revendeur);

        log.info("Stock mis à jour pour {} : {} → {}", revendeur.getNom(), ancienStatut, dto.stockStatus());

        // Diffuser la mise à jour en temps réel à tous les clients connectés
        Map<String, Object> broadcast = Map.of(
                "id", id,
                "stockStatus", dto.stockStatus().name()
        );
        messagingTemplate.convertAndSend("/topic/stock", broadcast);

        return revendeur;
    }

    /**
     * Bascule le statut actif/inactif d'un revendeur (réservé aux administrateurs).
     *
     * @param id identifiant du revendeur
     * @return le revendeur mis à jour
     */
    public Revendeur toggleActif(String id) {
        Revendeur revendeur = getById(id);
        revendeur.setActif(!revendeur.isActif());
        revendeur.setUpdatedAt(LocalDateTime.now());
        revendeur = revendeurRepository.save(revendeur);
        log.info("Revendeur {} : statut actif = {}", revendeur.getNom(), revendeur.isActif());
        return revendeur;
    }
}
