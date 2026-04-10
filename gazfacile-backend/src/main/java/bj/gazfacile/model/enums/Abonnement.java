package bj.gazfacile.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Abonnement {

    GRATUIT(
        "Gratuit",
        0,
        "Profil basique — visibilité limitée",
        3,
        30
    ),

    TEST(
        "Test",
        100,
        "Plan de test — 1 jour",
        -1,
        1
    ),

    MENSUEL(
        "Mensuel",
        1_000,
        "1 mois de visibilité complète",
        -1,
        30
    ),

    TRIMESTRIEL(
        "Trimestriel",
        2_500,
        "3 mois de visibilité complète",
        -1,
        90
    ),

    SEMESTRIEL(
        "Semestriel",
        5_000,
        "6 mois de visibilité complète",
        -1,
        180
    ),

    ANNUEL(
        "Annuel",
        10_000,
        "12 mois de visibilité complète",
        -1,
        365
    );

    private final String libelle;
    private final long prix;
    private final String description;
    private final int maxProduits; // -1 = illimité
    private final int dureeJours;
}
