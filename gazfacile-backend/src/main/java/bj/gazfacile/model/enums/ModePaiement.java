package bj.gazfacile.model.enums;

/**
 * Modes de paiement acceptés.
 * Couvre les trois opérateurs Mobile Money actifs au Bénin.
 */
public enum ModePaiement {
    /** MTN Mobile Money (MoMo) */
    MOMO_MTN,
    /** Moov Money (Flooz) — Moov Africa Bénin */
    MOMO_MOOV,
    /** Celtiis Cash — Celtiis Bénin */
    CELTIIS_CASH,
    /** Paiement en espèces à la livraison */
    ESPECES
}