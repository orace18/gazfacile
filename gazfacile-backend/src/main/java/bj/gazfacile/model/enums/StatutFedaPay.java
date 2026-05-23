package bj.gazfacile.model.enums;

public enum StatutFedaPay {
    /** Transaction créée, paiement non encore effectué. */
    PENDING,
    /** Paiement approuvé par l'opérateur. */
    APPROVED,
    /** Paiement refusé. */
    DECLINED,
    /** Transaction annulée par le client. */
    CANCELLED,
    /** Paiement remboursé. */
    REFUNDED,
    /** Fonds transférés au marchand. */
    TRANSFERRED
}
