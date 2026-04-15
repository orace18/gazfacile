package bj.gazfacile.service;

import bj.gazfacile.dto.ConsultationDTO;
import bj.gazfacile.model.ConsultationSession;
import bj.gazfacile.repository.ConsultationRepository;
import bj.gazfacile.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ConsultationServiceTest {

    @Mock private ConsultationRepository consultationRepository;
    @Mock private SubscriptionService subscriptionService;
    @Mock private UserRepository userRepository;

    @InjectMocks private ConsultationService consultationService;

    // ── BUG #1 : ipAtteintLimite exhaustif ──────────────────────────────────

    @Test
    void verifierEtIncrementer_shouldBlock_whenAnySessionForSameIpHasReachedLimit() {
        String ip = "41.200.1.1";
        String newFingerprint = "fp-new";

        // Nouveau fingerprint → session créée à 0
        ConsultationSession newSession = session(newFingerprint, ip, 0);
        // Autre session pour la même IP, déjà à la limite
        ConsultationSession existingSession = session("fp-old", ip, ConsultationSession.LIMITE_GRATUITE);

        when(consultationRepository.findByFingerprint(newFingerprint)).thenReturn(Optional.empty());
        when(consultationRepository.save(any())).thenReturn(newSession);
        // findAllByIpAddress retourne les DEUX sessions
        when(consultationRepository.findAllByIpAddress(ip)).thenReturn(List.of(existingSession));

        ConsultationDTO result = consultationService.verifierEtIncrementer(newFingerprint, ip);

        assertFalse(result.autorise());
        assertEquals(0, result.consultationsRestantes());
        // La nouvelle session doit être marquée à la limite pour cohérence
        ArgumentCaptor<ConsultationSession> captor = ArgumentCaptor.forClass(ConsultationSession.class);
        verify(consultationRepository, times(2)).save(captor.capture());
        assertEquals(ConsultationSession.LIMITE_GRATUITE,
                captor.getAllValues().get(1).getNombreConsultations());
    }

    @Test
    void verifierEtIncrementer_shouldAllow_whenNoOtherSessionForIpHasReachedLimit() {
        String ip = "41.200.1.2";
        String fingerprint = "fp-new-2";

        ConsultationSession newSession = session(fingerprint, ip, 0);

        when(consultationRepository.findByFingerprint(fingerprint)).thenReturn(Optional.empty());
        when(consultationRepository.save(any())).thenReturn(newSession);
        // Aucune autre session avec limite atteinte pour cette IP
        when(consultationRepository.findAllByIpAddress(ip)).thenReturn(List.of());

        // Simuler la sauvegarde incrémentée
        when(consultationRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        ConsultationDTO result = consultationService.verifierEtIncrementer(fingerprint, ip);

        assertTrue(result.autorise());
    }

    @Test
    void verifierEtIncrementer_shouldNotBlock_whenOnlySessionBelongsToSameFingerprint() {
        String ip = "41.200.1.3";
        String fingerprint = "fp-same";

        // Session existante appartient au même fingerprint (propre requête de l'utilisateur)
        ConsultationSession ownSession = session(fingerprint, ip, ConsultationSession.LIMITE_GRATUITE - 1);

        when(consultationRepository.findByFingerprint(fingerprint)).thenReturn(Optional.of(ownSession));

        when(consultationRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        ConsultationDTO result = consultationService.verifierEtIncrementer(fingerprint, ip);

        assertTrue(result.autorise());
        assertEquals(0, result.consultationsRestantes());
    }

    @Test
    void verifierEtIncrementer_shouldBlock_whenExistingSessionHasReachedLimit() {
        String ip = "41.200.1.4";
        String fingerprint = "fp-exhausted";

        ConsultationSession exhaustedSession = session(fingerprint, ip, ConsultationSession.LIMITE_GRATUITE);

        when(consultationRepository.findByFingerprint(fingerprint)).thenReturn(Optional.of(exhaustedSession));

        ConsultationDTO result = consultationService.verifierEtIncrementer(fingerprint, ip);

        assertFalse(result.autorise());
        assertEquals(0, result.consultationsRestantes());
        verify(consultationRepository, never()).save(any());
    }

    // ── Helpers ──────────────────────────────────────────────────────────────

    private ConsultationSession session(String fingerprint, String ip, int count) {
        return ConsultationSession.builder()
                .id("id-" + fingerprint)
                .fingerprint(fingerprint)
                .ipAddress(ip)
                .nombreConsultations(count)
                .premiereConsultation(LocalDateTime.now().minusMinutes(5))
                .derniereConsultation(LocalDateTime.now().minusMinutes(1))
                .build();
    }
}
