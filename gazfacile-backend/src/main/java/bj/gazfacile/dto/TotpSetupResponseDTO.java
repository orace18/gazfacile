package bj.gazfacile.dto;

/**
 * Réponse de la phase de setup TOTP.
 * otpauthUri : à encoder en QR code côté frontend (bibliothèque qrcode.js).
 * Le secret brut est retourné pour la saisie manuelle dans l'app d'authentification.
 */
public record TotpSetupResponseDTO(
        String otpauthUri,
        String secret
) {}
