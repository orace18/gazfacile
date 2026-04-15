package bj.gazfacile.service;

import bj.gazfacile.dto.PaiementInitDTO;
import bj.gazfacile.dto.PaiementResponseDTO;
import bj.gazfacile.exception.ResourceNotFoundException;
import bj.gazfacile.model.Transaction;
import bj.gazfacile.model.enums.StatutFedaPay;
import bj.gazfacile.model.enums.TypeTransaction;
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
    private final AbonnementService abonnementService;
    private final SubscriptionService subscriptionService;

    /**
     * Initie un paiement FedaPay pour une commande ou un abonnement.
     * Retourne l'URL de paiement à afficher au client.
     */
    public PaiementResponseDTO initierPaiement(PaiementInitDTO dto) {
        String reference = genererReference(dto.getType().name());

        // 1. Créer la transaction FedaPay (callback URL avec la référence pour la page de confirmation)
        String callbackUrl = fedaPayService.getCallbackUrl() + "?reference=" + reference;
        long fedaPayId = fedaPayService.creerTransaction(
                dto.getMontant(),
                dto.getDescription(),
                dto.getClientTelephone(),
                dto.getClientEmail(),
                dto.getClientNom(),
                reference,
                callbackUrl
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
                .subscriptionId(dto.getSubscriptionId())
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

        appliquerStatut(transaction, parseStatut(nouveauStatut), "webhook");
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
        Transaction transaction = transactionRepository.findByReference(reference)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction introuvable : " + reference));

        return synchroniserTransactionSiNecessaire(transaction);
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private Transaction synchroniserTransactionSiNecessaire(Transaction transaction) {
        if (transaction.getFedaPayId() == null || transaction.getStatut() != StatutFedaPay.PENDING) {
            return transaction;
        }

        try {
            String statutFedaPay = fedaPayService.recupererStatutTransaction(transaction.getFedaPayId());
            return appliquerStatut(transaction, parseStatut(statutFedaPay), "api");
        } catch (Exception ex) {
            log.warn("[Paiement] Synchronisation FedaPay impossible pour {} (id {}): {}",
                    transaction.getReference(), transaction.getFedaPayId(), ex.getMessage());
            return transaction;
        }
    }

    private Transaction appliquerStatut(Transaction transaction, StatutFedaPay nouveauStatut, String source) {
        StatutFedaPay ancienStatut = transaction.getStatut();
        if (ancienStatut == nouveauStatut) {
            log.debug("[Paiement] Webhook idempotent ignoré — Transaction {} déjà en statut {}",
                    transaction.getReference(), ancienStatut);
            return transaction;
        }

        transaction.setStatut(nouveauStatut);
        transaction.setUpdatedAt(LocalDateTime.now());
        transaction = transactionRepository.save(transaction);

        log.info("[Paiement] Transaction {} synchronisée via {} : {} → {}",
                transaction.getReference(), source, ancienStatut, nouveauStatut);

        if (ancienStatut != StatutFedaPay.APPROVED && nouveauStatut == StatutFedaPay.APPROVED) {
            appliquerEffetsMetierPaiementApprouve(transaction);
        }

        return transaction;
    }

    private void appliquerEffetsMetierPaiementApprouve(Transaction transaction) {
        // Paiement commande → mettre à jour le statut de paiement
        if (transaction.getType() == TypeTransaction.COMMANDE && transaction.getCommandeId() != null) {
            commandeRepository.findById(transaction.getCommandeId()).ifPresent(commande -> {
                commande.setStatutPaiement(bj.gazfacile.model.enums.StatutPaiement.PAYE);
                commande.setReferenceTransaction(transaction.getReference());
                commandeRepository.save(commande);
                log.info("[Paiement] Commande {} marquée PAYÉE", commande.getId());
            });
        }

        // Paiement abonnement (nouveau système Subscription)
        if (transaction.getType() == TypeTransaction.ABONNEMENT && transaction.getSubscriptionId() != null) {
            subscriptionService.activateSubscription(transaction.getSubscriptionId(), transaction.getId());
            log.info("[Paiement] Subscription {} activée", transaction.getSubscriptionId());
            return;
        }

        // Paiement abonnement (ancien système Revendeur.abonnement — fallback)
        if (transaction.getType() == TypeTransaction.ABONNEMENT && transaction.getRevendeurId() != null) {
            abonnementService.activerAbonnement(transaction.getRevendeurId(), transaction.getMontant());
        }
    }

    private String genererReference(String prefixe) {
        return prefixe.substring(0, 3).toUpperCase() + "-" +
               UUID.randomUUID().toString().replace("-", "").substring(0, 10).toUpperCase();
    }

    private StatutFedaPay parseStatut(String statut) {
        if (statut == null || statut.isBlank()) {
            return StatutFedaPay.PENDING;
        }

        return switch (statut.toLowerCase()) {
            case "pending"     -> StatutFedaPay.PENDING;
            case "approved"    -> StatutFedaPay.APPROVED;
            case "declined"    -> StatutFedaPay.DECLINED;
            case "canceled", "cancelled" -> StatutFedaPay.CANCELLED;
            case "refunded"    -> StatutFedaPay.REFUNDED;
            case "transferred" -> StatutFedaPay.TRANSFERRED;
            default            -> StatutFedaPay.PENDING;
        };
    }
}
