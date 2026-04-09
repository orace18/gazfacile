package bj.gazfacile.service;

import bj.gazfacile.dto.PaiementInitDTO;
import bj.gazfacile.dto.PaiementResponseDTO;
import bj.gazfacile.exception.ResourceNotFoundException;
import bj.gazfacile.model.Transaction;
import bj.gazfacile.model.enums.StatutFedaPay;
import bj.gazfacile.repository.CommandeRepository;
import bj.gazfacile.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * Service de paiement GazFacile via FedaPay.
 * Remplace les intégrations MTN/Moov/Celtiis directes.
 * FedaPay agrège MTN MoMo, Moov Money et Celtiis Cash pour le Bénin.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class PaiementService {

    private final FedaPayService fedaPayService;
    private final TransactionRepository transactionRepository;
    private final CommandeRepository commandeRepository;

    /**
     * Initie un paiement FedaPay pour une commande ou un abonnement.
     * Retourne l'URL de paiement à afficher au client.
     */
    public PaiementResponseDTO initierPaiement(PaiementInitDTO dto) {
        String reference = genererReference(dto.getType().name());

        // 1. Créer la transaction FedaPay
        long fedaPayId = fedaPayService.creerTransaction(
                dto.getMontant(),
                dto.getDescription(),
                dto.getClientTelephone(),
                dto.getClientEmail(),
                dto.getClientNom(),
                reference
        );

        // 2. Obtenir le token de paiement
        String token = fedaPayService.obtenirToken(fedaPayId);

        // 3. Construire l'URL checkout
        String checkoutUrl = fedaPayService.construireCheckoutUrl(token);

        // 4. Persister la transaction
        Transaction transaction = Transaction.builder()
                .fedaPayId(fedaPayId)
                .reference(reference)
                .montant(dto.getMontant())
                .description(dto.getDescription())
                .clientTelephone(dto.getClientTelephone())
                .clientEmail(dto.getClientEmail())
                .clientNom(dto.getClientNom())
                .type(dto.getType())
                .statut(StatutFedaPay.PENDING)
                .commandeId(dto.getCommandeId())
                .revendeurId(dto.getRevendeurId())
                .checkoutUrl(checkoutUrl)
                .token(token)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        transaction = transactionRepository.save(transaction);
        log.info("[Paiement] Transaction initiée — Ref: {}, Montant: {} FCFA", reference, dto.getMontant());

        return PaiementResponseDTO.from(transaction);
    }

    /**
     * Traite le webhook FedaPay et met à jour la transaction en base.
     * Appelé depuis PaiementController après vérification de la signature.
     *
     * @param fedaPayId  ID numérique FedaPay de la transaction
     * @param nouveauStatut  statut reçu ("approved", "declined", "cancelled", "refunded", "transferred")
     */
    public void traiterWebhook(long fedaPayId, String nouveauStatut) {
        Transaction transaction = transactionRepository.findByFedaPayId(fedaPayId)
                .orElseGet(() -> {
                    log.warn("[Webhook] Transaction FedaPay {} introuvable — ignoré", fedaPayId);
                    return null;
                });

        if (transaction == null) return;

        StatutFedaPay statut = parseStatut(nouveauStatut);
        transaction.setStatut(statut);
        transaction.setUpdatedAt(LocalDateTime.now());
        transactionRepository.save(transaction);

        log.info("[Webhook] Transaction {} → {}", transaction.getReference(), statut);

        // Si approuvée et liée à une commande → mettre à jour le statut de paiement
        if (statut == StatutFedaPay.APPROVED && transaction.getCommandeId() != null) {
            commandeRepository.findById(transaction.getCommandeId()).ifPresent(commande -> {
                commande.setStatutPaiement(bj.gazfacile.model.enums.StatutPaiement.PAYE);
                commande.setReferenceTransaction(transaction.getReference());
                commandeRepository.save(commande);
                log.info("[Webhook] Commande {} marquée PAYÉE", commande.getId());
            });
        }
    }

    /**
     * Retourne l'historique de toutes les transactions (pour le dashboard admin).
     */
    public List<Transaction> getHistorique() {
        return transactionRepository.findAllByOrderByCreatedAtDesc();
    }

    /**
     * Retourne les transactions liées à un revendeur.
     */
    public List<Transaction> getByRevendeur(String revendeurId) {
        return transactionRepository.findByRevendeurIdOrderByCreatedAtDesc(revendeurId);
    }

    /**
     * Retourne une transaction par sa référence interne.
     */
    public Transaction getByReference(String reference) {
        return transactionRepository.findByReference(reference)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction introuvable : " + reference));
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private String genererReference(String prefixe) {
        return prefixe.substring(0, 3).toUpperCase() + "-" +
               UUID.randomUUID().toString().replace("-", "").substring(0, 10).toUpperCase();
    }

    private StatutFedaPay parseStatut(String statut) {
        return switch (statut.toLowerCase()) {
            case "approved"    -> StatutFedaPay.APPROVED;
            case "declined"    -> StatutFedaPay.DECLINED;
            case "cancelled"   -> StatutFedaPay.CANCELLED;
            case "refunded"    -> StatutFedaPay.REFUNDED;
            case "transferred" -> StatutFedaPay.TRANSFERRED;
            default            -> StatutFedaPay.PENDING;
        };
    }
}
