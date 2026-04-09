package bj.gazfacile.service;

import bj.gazfacile.dto.ConsultationDTO;
import bj.gazfacile.model.ConsultationSession;
import bj.gazfacile.repository.ConsultationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/**
 * Gère le quota de consultations gratuites pour les clients anonymes.
 *
 * Stratégie anti-contournement :
 *  1. Fingerprint UUID stocké dans le localStorage du navigateur (principal)
 *  2. IP en fallback : si l'IP a déjà atteint la limite, bloquer même avec un nouveau fingerprint
 *
 * Un utilisateur authentifié n'est jamais bloqué (vérification côté frontend via JWT).
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ConsultationService {

    private final ConsultationRepository consultationRepository;

    /**
     * Vérifie le quota et incrémente si la consultation est autorisée.
     *
     * @param fingerprint UUID navigateur
     * @param ip          adresse IP du client
     * @return résultat avec autorisation et consultations restantes
     */
    public ConsultationDTO verifierEtIncrementer(String fingerprint, String ip) {
        // Stratégie 1 : recherche par fingerprint
        ConsultationSession session = consultationRepository.findByFingerprint(fingerprint)
                .orElseGet(() -> creerSession(fingerprint, ip));

        // Stratégie 2 : si le fingerprint est nouveau mais l'IP a déjà la limite → bloquer
        if (session.getNombreConsultations() == 0 && ipAtteintLimite(ip, fingerprint)) {
            // Lier cette session à l'IP existante pour cohérence
            session.setNombreConsultations(ConsultationSession.LIMITE_GRATUITE);
            consultationRepository.save(session);
            log.debug("[Freemium] IP {} contournement détecté, bloqué", ip);
            return new ConsultationDTO(false, 0, ConsultationSession.LIMITE_GRATUITE);
        }

        if (session.getNombreConsultations() >= ConsultationSession.LIMITE_GRATUITE) {
            return new ConsultationDTO(false, 0, ConsultationSession.LIMITE_GRATUITE);
        }

        // Autoriser et incrémenter
        session.setNombreConsultations(session.getNombreConsultations() + 1);
        session.setDerniereConsultation(LocalDateTime.now());
        session.setIpAddress(ip); // mettre à jour l'IP si elle a changé
        consultationRepository.save(session);

        int restantes = ConsultationSession.LIMITE_GRATUITE - session.getNombreConsultations();
        log.debug("[Freemium] Fingerprint {} — consultation {}/{}", fingerprint,
                session.getNombreConsultations(), ConsultationSession.LIMITE_GRATUITE);

        return new ConsultationDTO(true, restantes, ConsultationSession.LIMITE_GRATUITE);
    }

    /**
     * Retourne le statut sans incrémenter (pour affichage initial).
     */
    public ConsultationDTO getStatut(String fingerprint, String ip) {
        return consultationRepository.findByFingerprint(fingerprint)
                .map(s -> {
                    boolean autorise = s.getNombreConsultations() < ConsultationSession.LIMITE_GRATUITE;
                    int restantes = Math.max(0, ConsultationSession.LIMITE_GRATUITE - s.getNombreConsultations());
                    return new ConsultationDTO(autorise, restantes, ConsultationSession.LIMITE_GRATUITE);
                })
                .orElseGet(() -> {
                    // Vérifier l'IP sans créer de session
                    if (ipAtteintLimite(ip, fingerprint)) {
                        return new ConsultationDTO(false, 0, ConsultationSession.LIMITE_GRATUITE);
                    }
                    return new ConsultationDTO(true, ConsultationSession.LIMITE_GRATUITE, ConsultationSession.LIMITE_GRATUITE);
                });
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private ConsultationSession creerSession(String fingerprint, String ip) {
        ConsultationSession session = ConsultationSession.builder()
                .fingerprint(fingerprint)
                .ipAddress(ip)
                .nombreConsultations(0)
                .premiereConsultation(LocalDateTime.now())
                .derniereConsultation(LocalDateTime.now())
                .build();
        return consultationRepository.save(session);
    }

    private boolean ipAtteintLimite(String ip, String fingerprintExclu) {
        return consultationRepository.findByIpAddress(ip)
                .map(s -> !s.getFingerprint().equals(fingerprintExclu)
                        && s.getNombreConsultations() >= ConsultationSession.LIMITE_GRATUITE)
                .orElse(false);
    }
}
