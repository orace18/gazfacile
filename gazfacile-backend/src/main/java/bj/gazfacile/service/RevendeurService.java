package bj.gazfacile.service;

import bj.gazfacile.dto.RevendeurDTO;
import bj.gazfacile.dto.StockUpdateDTO;
import bj.gazfacile.exception.ResourceNotFoundException;
import bj.gazfacile.model.Revendeur;
import bj.gazfacile.model.enums.StockStatus;
import bj.gazfacile.repository.RevendeurRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

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

    /** Retourne tous les revendeurs actifs. */
    public List<Revendeur> getAllActifs() {
        return revendeurRepository.findByActifTrue();
    }

    /**
     * Recherche les revendeurs à proximité d'un point géographique.
     *
     * @param latitude  latitude du point de recherche
     * @param longitude longitude du point de recherche
     * @param rayon     rayon de recherche en mètres
     */
    public List<Revendeur> getNearby(double latitude, double longitude, double rayon) {
        log.debug("Recherche géospatiale : lat={}, lng={}, rayon={}m", latitude, longitude, rayon);
        return revendeurRepository.findNearby(longitude, latitude, rayon);
    }

    /**
     * Recherche les revendeurs à proximité ayant du stock disponible.
     *
     * @param latitude  latitude du point de recherche
     * @param longitude longitude du point de recherche
     * @param rayon     rayon de recherche en mètres
     */
    public List<Revendeur> getNearbyWithStock(double latitude, double longitude, double rayon) {
        return revendeurRepository.findNearbyWithStock(longitude, latitude, rayon);
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
     * @param dto    données du revendeur
     * @param userId identifiant de l'utilisateur créateur
     * @return le revendeur créé
     */
    public Revendeur inscrire(RevendeurDTO dto, String userId) {
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
                .userId(userId)
                .actif(true)
                .createdAt(maintenant)
                .updatedAt(maintenant)
                .build();

        revendeur = revendeurRepository.save(revendeur);
        log.info("Nouveau revendeur inscrit : {} ({})", revendeur.getNom(), revendeur.getId());
        return revendeur;
    }

    /**
     * Met à jour le statut de stock d'un revendeur et diffuse la mise à jour via WebSocket.
     *
     * @param id  identifiant du revendeur
     * @param dto nouveau statut de stock
     * @return le revendeur mis à jour
     */
    public Revendeur updateStock(String id, StockUpdateDTO dto) {
        Revendeur revendeur = getById(id);
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
