package bj.gazfacile.service;

import bj.gazfacile.dto.AbonnementInitDTO;
import bj.gazfacile.dto.AbonnementStatutDTO;
import bj.gazfacile.dto.PaiementInitDTO;
import bj.gazfacile.model.Revendeur;
import bj.gazfacile.model.enums.Abonnement;
import bj.gazfacile.model.enums.TypeTransaction;
import bj.gazfacile.repository.RevendeurRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

/**
 * Gère les abonnements des revendeurs (STANDARD / PREMIUM).
 * Le paiement est délégué au contrôleur → PaiementService → FedaPay.
 * L'activation de l'abonnement se produit dans PaiementService.traiterWebhook()
 * quand la transaction ABONNEMENT passe à APPROVED.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AbonnementService {

    private final RevendeurService revendeurService;
    private final RevendeurRepository revendeurRepository;

    /**
     * Retourne le statut d'abonnement du revendeur connecté.
     */
    public AbonnementStatutDTO getStatut(String telephone) {
        Revendeur revendeur = revendeurService.getByUserId(telephone);
        return AbonnementStatutDTO.from(revendeur);
    }

    /**
     * Prépare le DTO de paiement FedaPay pour souscrire à un plan STANDARD ou PREMIUM.
     * L'appel effectif à PaiementService est fait par le contrôleur pour éviter
     * la dépendance circulaire AbonnementService ↔ PaiementService.
     *
     * @param telephone téléphone de l'utilisateur connecté
     * @param dto       plan souhaité
     * @return PaiementInitDTO prêt à être passé à PaiementService.initierPaiement()
     */
    public PaiementInitDTO preparerSouscription(String telephone, AbonnementInitDTO dto) {
        if (dto.plan() == Abonnement.GRATUIT) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Impossible de souscrire au plan Gratuit via paiement");
        }

        Revendeur revendeur = revendeurService.getByUserId(telephone);

        PaiementInitDTO paiementDto = new PaiementInitDTO();
        paiementDto.setType(TypeTransaction.ABONNEMENT);
        paiementDto.setMontant(dto.plan().getPrix());
        paiementDto.setDescription(
                "Abonnement " + dto.plan().getLibelle() + " — GazFacile (30 jours)"
        );
        paiementDto.setClientTelephone(revendeur.getTelephone());
        paiementDto.setClientEmail(revendeur.getEmail());
        paiementDto.setClientNom(revendeur.getNom());
        paiementDto.setRevendeurId(revendeur.getId());

        log.info("[Abonnement] DTO paiement préparé — plan {} pour revendeur {}", dto.plan(), revendeur.getId());
        return paiementDto;
    }

    /**
     * Active l'abonnement après confirmation du paiement FedaPay.
     * Appelé par PaiementService.traiterWebhook() quand statut = APPROVED + type = ABONNEMENT.
     *
     * @param revendeurId  ID MongoDB du revendeur
     * @param montantPaye  montant payé (utilisé pour déterminer le plan)
     */
    public void activerAbonnement(String revendeurId, long montantPaye) {
        Revendeur revendeur = revendeurService.getById(revendeurId);

        Abonnement nouveauPlan = trouverPlanParMontant(montantPaye);

        LocalDateTime maintenant = LocalDateTime.now();

        // Prolonger si déjà abonné et non expiré, sinon démarrer maintenant
        LocalDateTime baseExpiry = (revendeur.getAbonnementExpiry() != null
                && revendeur.getAbonnementExpiry().isAfter(maintenant))
                ? revendeur.getAbonnementExpiry()
                : maintenant;

        revendeur.setAbonnement(nouveauPlan);
        revendeur.setAbonnementExpiry(baseExpiry.plusDays(nouveauPlan.getDureeJours()));
        revendeur.setUpdatedAt(maintenant);
        revendeurRepository.save(revendeur);

        log.info("[Abonnement] Revendeur {} activé en plan {} jusqu'au {}",
                revendeurId, nouveauPlan, revendeur.getAbonnementExpiry());
    }

    private Abonnement trouverPlanParMontant(long montant) {
        if (montant >= Abonnement.ANNUEL.getPrix()) return Abonnement.ANNUEL;
        if (montant >= Abonnement.SEMESTRIEL.getPrix()) return Abonnement.SEMESTRIEL;
        if (montant >= Abonnement.TRIMESTRIEL.getPrix()) return Abonnement.TRIMESTRIEL;
        if (montant >= Abonnement.MENSUEL.getPrix()) return Abonnement.MENSUEL;
        return Abonnement.TEST;
    }

    /**
     * Vérifie et rétrograde les abonnements expirés vers GRATUIT.
     * Destiné à être appelé périodiquement (ex. @Scheduled).
     */
    public void verifierExpirations() {
        revendeurRepository.findAll().stream()
                .filter(r -> r.getAbonnement() != Abonnement.GRATUIT
                        && r.getAbonnementExpiry() != null
                        && r.getAbonnementExpiry().isBefore(LocalDateTime.now()))
                .forEach(r -> {
                    r.setAbonnement(Abonnement.GRATUIT);
                    r.setUpdatedAt(LocalDateTime.now());
                    revendeurRepository.save(r);
                    log.info("[Abonnement] Revendeur {} rétrogradé en GRATUIT (abonnement expiré)", r.getId());
                });
    }
}
