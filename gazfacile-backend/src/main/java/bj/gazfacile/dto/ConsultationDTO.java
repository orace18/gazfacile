package bj.gazfacile.dto;

/**
 * Résultat d'une consultation — retourné après incrémentation.
 *
 * @param autorise        true si la consultation est autorisée (quota non atteint ou utilisateur connecté)
 * @param consultationsRestantes  nombre de consultations gratuites restantes (0 si bloqué)
 * @param limite          limite totale de consultations gratuites
 */
public record ConsultationDTO(
    boolean autorise,
    int consultationsRestantes,
    int limite
) {}
