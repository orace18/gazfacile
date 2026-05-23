package bj.gazfacile.model.enums;

public enum FormatBouteille {
    KG_3("3 kg"),
    KG_6("6 kg"),
    KG_12("12 kg"),
    KG_25("25 kg"),
    KG_38("38 kg");

    private final String libelle;

    FormatBouteille(String libelle) {
        this.libelle = libelle;
    }

    public String getLibelle() {
        return libelle;
    }
}
