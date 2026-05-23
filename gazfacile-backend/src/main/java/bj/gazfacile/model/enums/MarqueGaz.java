package bj.gazfacile.model.enums;

public enum MarqueGaz {
    BENIN_PETRO("Bénin Petro"),
    ORYX("Oryx"),
    PROGAZ("ProGaz"),
    JNP("JNP"),
    AUTRE("Autre");

    private final String libelle;

    MarqueGaz(String libelle) {
        this.libelle = libelle;
    }

    public String getLibelle() {
        return libelle;
    }
}
