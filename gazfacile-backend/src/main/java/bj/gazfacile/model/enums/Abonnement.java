package bj.gazfacile.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * Niveaux d'abonnement des revendeurs avec tarification et limites.
 */
@Getter
@RequiredArgsConstructor
public enum Abonnement {

    /** Essai gratuit – visibilité limitée, sans garantie de positionnement. */
    GRATUIT(
        "Gratuit",
        0,
        "Profil basique — visibilité limitée dans les résultats",
        3,          // max produits dans le catalogue
        false,      // pas de priorité de classement
        false       // pas de badge premium
    ),

    /** Plan Standard – visibilité normale + catalogue complet. */
    STANDARD(
        "Standard",
        2_000,
        "Visibilité normale + catalogue illimité + badge vérifié",
        -1,         // illimité
        false,
        false
    ),

    /** Plan Premium – priorité de classement + badge + analytics. */
    PREMIUM(
        "Premium",
        5_000,
        "Priorité dans les résultats + badge Premium + analytics de vues",
        -1,
        true,
        true
    );

    private final String libelle;
    private final long prixMensuel;
    private final String description;
    private final int maxProduits;       // -1 = illimité
    private final boolean prioriteClassement;
    private final boolean badgePremium;

    /** Durée d'abonnement en jours (30 jours = 1 mois). */
    public static final int DUREE_JOURS = 30;
}
