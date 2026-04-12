package bj.gazfacile.service;

import bj.gazfacile.model.Commande;
import bj.gazfacile.model.Transaction;
import bj.gazfacile.model.enums.StatutFedaPay;
import bj.gazfacile.model.enums.StatutPaiement;
import bj.gazfacile.model.enums.TypeTransaction;
import bj.gazfacile.repository.CommandeRepository;
import bj.gazfacile.repository.TransactionRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PaiementServiceTest {

    @Mock
    private FedaPayService fedaPayService;

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private CommandeRepository commandeRepository;

    @Mock
    private AbonnementService abonnementService;

    @Mock
    private SubscriptionService subscriptionService;

    @InjectMocks
    private PaiementService paiementService;

    @Test
    void getByReference_shouldSynchronizePendingTransactionFromFedaPay() {
        Transaction transaction = transaction(StatutFedaPay.PENDING, TypeTransaction.COMMANDE);
        transaction.setCommandeId("cmd-1");
        transaction.setFedaPayId(42L);

        Commande commande = Commande.builder()
                .id("cmd-1")
                .statutPaiement(StatutPaiement.EN_ATTENTE)
                .build();

        when(transactionRepository.findByReference("REF-123")).thenReturn(Optional.of(transaction));
        when(fedaPayService.recupererStatutTransaction(42L)).thenReturn("approved");
        when(transactionRepository.save(any(Transaction.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(commandeRepository.findById("cmd-1")).thenReturn(Optional.of(commande));
        when(commandeRepository.save(any(Commande.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Transaction resultat = paiementService.getByReference("REF-123");

        assertEquals(StatutFedaPay.APPROVED, resultat.getStatut());
        assertNotNull(resultat.getUpdatedAt());

        ArgumentCaptor<Transaction> transactionCaptor = ArgumentCaptor.forClass(Transaction.class);
        verify(transactionRepository).save(transactionCaptor.capture());
        assertEquals(StatutFedaPay.APPROVED, transactionCaptor.getValue().getStatut());

        ArgumentCaptor<Commande> commandeCaptor = ArgumentCaptor.forClass(Commande.class);
        verify(commandeRepository).save(commandeCaptor.capture());
        assertEquals(StatutPaiement.PAYE, commandeCaptor.getValue().getStatutPaiement());
        assertEquals("REF-123", commandeCaptor.getValue().getReferenceTransaction());
    }

    @Test
    void traiterWebhook_shouldIgnoreDuplicateApprovedStatus() {
        Transaction transaction = transaction(StatutFedaPay.APPROVED, TypeTransaction.ABONNEMENT);
        transaction.setRevendeurId("rev-1");
        transaction.setFedaPayId(55L);

        when(transactionRepository.findByFedaPayId(55L)).thenReturn(Optional.of(transaction));

        paiementService.traiterWebhook(55L, "approved");

        verify(transactionRepository, never()).save(any(Transaction.class));
        verifyNoInteractions(abonnementService, subscriptionService, commandeRepository);
    }

    @Test
    void traiterWebhook_shouldMapCanceledStatusToCancelled() {
        Transaction transaction = transaction(StatutFedaPay.PENDING, TypeTransaction.COMMANDE);
        transaction.setFedaPayId(77L);

        when(transactionRepository.findByFedaPayId(77L)).thenReturn(Optional.of(transaction));
        when(transactionRepository.save(any(Transaction.class))).thenAnswer(invocation -> invocation.getArgument(0));

        paiementService.traiterWebhook(77L, "canceled");

        ArgumentCaptor<Transaction> transactionCaptor = ArgumentCaptor.forClass(Transaction.class);
        verify(transactionRepository).save(transactionCaptor.capture());
        assertEquals(StatutFedaPay.CANCELLED, transactionCaptor.getValue().getStatut());
        verifyNoInteractions(abonnementService, subscriptionService);
    }

    private Transaction transaction(StatutFedaPay statut, TypeTransaction type) {
        return Transaction.builder()
                .id("tx-1")
                .reference("REF-123")
                .montant(1000)
                .clientTelephone("0199001122")
                .description("Paiement test")
                .type(type)
                .statut(statut)
                .createdAt(LocalDateTime.now().minusMinutes(1))
                .updatedAt(LocalDateTime.now().minusMinutes(1))
                .build();
    }
}
