package bj.gazfacile.service;

import bj.gazfacile.dto.CommandeDTO;
import bj.gazfacile.exception.ResourceNotFoundException;
import bj.gazfacile.model.Commande;
import bj.gazfacile.model.Revendeur;
import bj.gazfacile.model.enums.ModePaiement;
import bj.gazfacile.model.enums.StatutCommande;
import bj.gazfacile.model.enums.StatutPaiement;
import bj.gazfacile.repository.CommandeRepository;
import bj.gazfacile.repository.RevendeurRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
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

    private final CommandeRepository commandeRepository;
    private final RevendeurRepository revendeurRepository;
    private final PaiementService paiementService;

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

        // Calculer le prix unitaire selon la taille
        double prixUnitaire = "6kg".equals(dto.taille()) ? PRIX_6KG : PRIX_12KG;
        double total = prixUnitaire * dto.quantite();

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
                .modePaiement(dto.modePaiement())
                .statutPaiement(StatutPaiement.EN_ATTENTE)
                .statutCommande(StatutCommande.EN_ATTENTE)
                .createdAt(LocalDateTime.now())
                .build();

        // Initier le paiement Mobile Money si applicable (MTN, Moov ou Celtiis)
        if (dto.modePaiement() != ModePaiement.ESPECES) {
            try {
                String referenceTransaction = paiementService.initierPaiement(
                        dto.modePaiement(), dto.clientTelephone(), total, referenceCommande
                );
                commande.setReferenceTransaction(referenceTransaction);
                log.info("Paiement {} initié : {}", dto.modePaiement(), referenceTransaction);
            } catch (Exception ex) {
                log.warn("Impossible d'initier le paiement {} : {}", dto.modePaiement(), ex.getMessage());
            }
        }

        commande = commandeRepository.save(commande);
        log.info("Commande créée : {} pour {} FCFA", commande.getId(), total);
        return commande;
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
