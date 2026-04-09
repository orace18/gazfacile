package bj.gazfacile.service;

import bj.gazfacile.dto.ProduitRevendeurDTO;
import bj.gazfacile.dto.ProduitRevendeurResponseDTO;
import bj.gazfacile.exception.ResourceNotFoundException;
import bj.gazfacile.model.ProduitRevendeur;
import bj.gazfacile.model.Revendeur;
import bj.gazfacile.model.enums.StockStatus;
import bj.gazfacile.repository.ProduitRevendeurRepository;
import bj.gazfacile.repository.RevendeurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Service de gestion du catalogue de produits d'un revendeur.
 * Chaque revendeur peut définir ses prix par marque et format de bouteille.
 */
@Service
@RequiredArgsConstructor
public class ProduitRevendeurService {

    private final ProduitRevendeurRepository produitRepository;
    private final RevendeurRepository revendeurRepository;

    /** Récupère tout le catalogue d'un revendeur (public). */
    public List<ProduitRevendeurResponseDTO> getCatalogue(String revendeurId) {
        verifierRevendeurExiste(revendeurId);
        return produitRepository.findByRevendeurId(revendeurId)
                .stream()
                .map(ProduitRevendeurResponseDTO::from)
                .toList();
    }

    /** Récupère uniquement les produits disponibles d'un revendeur (public). */
    public List<ProduitRevendeurResponseDTO> getCatalogueDisponible(String revendeurId) {
        verifierRevendeurExiste(revendeurId);
        return produitRepository.findByRevendeurIdAndDisponibleTrue(revendeurId)
                .stream()
                .map(ProduitRevendeurResponseDTO::from)
                .toList();
    }

    /** Ajoute un produit au catalogue du revendeur connecté. */
    public ProduitRevendeurResponseDTO ajouter(String revendeurId, ProduitRevendeurDTO dto, String telephoneConnecte) {
        Revendeur revendeur = verifierProprietaire(revendeurId, telephoneConnecte);

        // Vérifier l'unicité marque + format pour ce revendeur
        produitRepository.findByRevendeurIdAndMarqueAndFormat(revendeurId, dto.getMarque(), dto.getFormat())
                .ifPresent(existing -> {
                    throw new ResponseStatusException(HttpStatus.CONFLICT,
                            "Ce format de " + dto.getMarque().getLibelle() + " est déjà dans votre catalogue. Modifiez-le plutôt.");
                });

        ProduitRevendeur produit = ProduitRevendeur.builder()
                .revendeurId(revendeurId)
                .marque(dto.getMarque())
                .format(dto.getFormat())
                .prixUnitaire(dto.getPrixUnitaire())
                .quantiteDisponible(dto.getQuantiteDisponible())
                .disponible(dto.isDisponible())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        produit = produitRepository.save(produit);
        syncStockStatus(revendeur);
        return ProduitRevendeurResponseDTO.from(produit);
    }

    /** Modifie un produit existant du catalogue. */
    public ProduitRevendeurResponseDTO modifier(String revendeurId, String produitId, ProduitRevendeurDTO dto, String telephoneConnecte) {
        Revendeur revendeur = verifierProprietaire(revendeurId, telephoneConnecte);

        ProduitRevendeur produit = produitRepository.findById(produitId)
                .filter(p -> p.getRevendeurId().equals(revendeurId))
                .orElseThrow(() -> new ResourceNotFoundException("Produit introuvable dans ce catalogue"));

        // Si la combinaison marque+format change, vérifier l'unicité
        boolean combinaisonChange = !produit.getMarque().equals(dto.getMarque()) || !produit.getFormat().equals(dto.getFormat());
        if (combinaisonChange) {
            produitRepository.findByRevendeurIdAndMarqueAndFormat(revendeurId, dto.getMarque(), dto.getFormat())
                    .ifPresent(existing -> {
                        throw new ResponseStatusException(HttpStatus.CONFLICT,
                                "Ce format de " + dto.getMarque().getLibelle() + " existe déjà dans votre catalogue.");
                    });
        }

        produit.setMarque(dto.getMarque());
        produit.setFormat(dto.getFormat());
        produit.setPrixUnitaire(dto.getPrixUnitaire());
        produit.setQuantiteDisponible(dto.getQuantiteDisponible());
        produit.setDisponible(dto.isDisponible());
        produit.setUpdatedAt(LocalDateTime.now());

        produit = produitRepository.save(produit);
        syncStockStatus(revendeur);
        return ProduitRevendeurResponseDTO.from(produit);
    }

    /** Supprime un produit du catalogue. */
    public void supprimer(String revendeurId, String produitId, String telephoneConnecte) {
        Revendeur revendeur = verifierProprietaire(revendeurId, telephoneConnecte);

        ProduitRevendeur produit = produitRepository.findById(produitId)
                .filter(p -> p.getRevendeurId().equals(revendeurId))
                .orElseThrow(() -> new ResourceNotFoundException("Produit introuvable dans ce catalogue"));

        produitRepository.delete(produit);
        syncStockStatus(revendeur);
    }

    // ── Helpers privés ──────────────────────────────────────────────────────────

    private Revendeur verifierRevendeurExiste(String revendeurId) {
        return revendeurRepository.findById(revendeurId)
                .orElseThrow(() -> new ResourceNotFoundException("Revendeur introuvable"));
    }

    /**
     * Vérifie que l'utilisateur connecté (identifié par son téléphone/username)
     * est bien le propriétaire du revendeur.
     * Le champ userId dans Revendeur stocke le username (téléphone) de son créateur.
     */
    private Revendeur verifierProprietaire(String revendeurId, String telephoneConnecte) {
        Revendeur revendeur = verifierRevendeurExiste(revendeurId);

        if (!revendeur.getUserId().equals(telephoneConnecte)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Vous n'êtes pas le propriétaire de ce dépôt");
        }

        return revendeur;
    }

    /**
     * Synchronise le stockStatus global du revendeur selon les quantités du catalogue.
     * - Tout épuisé → EPUISE
     * - Au moins un produit avec quantité ≤ 3 → STOCK_FAIBLE
     * - Sinon → EN_STOCK
     */
    private void syncStockStatus(Revendeur revendeur) {
        List<ProduitRevendeur> produits = produitRepository.findByRevendeurId(revendeur.getId());

        StockStatus nouveauStatut;
        if (produits.isEmpty() || produits.stream().allMatch(p -> p.getQuantiteDisponible() == 0)) {
            nouveauStatut = StockStatus.EPUISE;
        } else if (produits.stream().anyMatch(p -> p.getQuantiteDisponible() > 0 && p.getQuantiteDisponible() <= 3)) {
            nouveauStatut = StockStatus.STOCK_FAIBLE;
        } else {
            nouveauStatut = StockStatus.EN_STOCK;
        }

        revendeur.setStockStatus(nouveauStatut);
        revendeur.setUpdatedAt(LocalDateTime.now());
        revendeurRepository.save(revendeur);
    }
}
