package bj.gazfacile.service;

import bj.gazfacile.dto.AvisDTO;
import bj.gazfacile.exception.ResourceNotFoundException;
import bj.gazfacile.model.Avis;
import bj.gazfacile.model.Revendeur;
import bj.gazfacile.model.enums.TypeNotification;
import bj.gazfacile.repository.AvisRepository;
import bj.gazfacile.repository.RevendeurRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Service de gestion des avis clients sur les revendeurs.
 * Met à jour la note moyenne du revendeur après chaque avis.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AvisService {

    private final AvisRepository avisRepository;
    private final RevendeurRepository revendeurRepository;
    private final NotificationService notificationService;
    private final PhoneNumberService phoneNumberService;

    /**
     * Soumet un avis pour un revendeur.
     * Un client ne peut laisser qu'un seul avis par revendeur.
     *
     * @param dto données de l'avis
     * @return l'avis créé
     */
    public Avis soumettre(AvisDTO dto, String telephoneJwt) {
        // Le téléphone vient du JWT — le champ auteurTelephone du DTO est ignoré.
        String auteurTelephone = phoneNumberService.normaliserTelephoneLocal(telephoneJwt);

        Revendeur revendeur = revendeurRepository.findById(dto.revendeurId())
                .orElseThrow(() -> new ResourceNotFoundException("Revendeur", dto.revendeurId()));

        if (avisRepository.existsByRevendeurIdAndAuteurTelephone(dto.revendeurId(), auteurTelephone)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Vous avez déjà laissé un avis pour ce revendeur");
        }

        Avis avis = Avis.builder()
                .revendeurId(dto.revendeurId())
                .auteurNom(dto.auteurNom())
                .auteurTelephone(auteurTelephone)
                .note(dto.note())
                .commentaire(dto.commentaire())
                .createdAt(LocalDateTime.now())
                .build();

        avis = avisRepository.save(avis);
        log.info("Nouvel avis soumis pour {} : {}/5", revendeur.getNom(), dto.note());

        // Recalculer et mettre à jour la note moyenne du revendeur
        recalculerNoteMoyenne(revendeur);

        // Notifier le revendeur
        if (revendeur.getUserId() != null) {
            notificationService.creer(
                revendeur.getUserId(),
                TypeNotification.NOUVEL_AVIS,
                "Nouvel avis reçu",
                dto.auteurNom() + " vous a attribué " + dto.note() + "/5 étoiles.",
                revendeur.getId()
            );
        }

        return avis;
    }

    /** Retourne tous les avis d'un revendeur. */
    public List<Avis> getByRevendeur(String revendeurId) {
        return avisRepository.findByRevendeurIdOrderByCreatedAtDesc(revendeurId);
    }

    /** Recalcule la note moyenne et le nombre d'avis d'un revendeur, puis sauvegarde. */
    private void recalculerNoteMoyenne(Revendeur revendeur) {
        Double moyenne = avisRepository.calculerNoteMoyenne(revendeur.getId());
        long nombre = avisRepository.countByRevendeurId(revendeur.getId());

        revendeur.setNoteMoyenne(moyenne != null ? Math.round(moyenne * 10.0) / 10.0 : 0.0);
        revendeur.setNombreAvis((int) nombre);
        revendeur.setUpdatedAt(LocalDateTime.now());
        revendeurRepository.save(revendeur);

        log.info("Note moyenne {} mise à jour : {}/5 ({} avis)", revendeur.getNom(), revendeur.getNoteMoyenne(), nombre);
    }
}
