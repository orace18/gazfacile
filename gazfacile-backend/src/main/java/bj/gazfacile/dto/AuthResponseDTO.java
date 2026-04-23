package bj.gazfacile.dto;

import bj.gazfacile.model.enums.Role;

import java.util.Set;

/**
 * DTO retourné après une authentification réussie.
 * Le refresh token n'est plus dans le body — il est transmis via cookie HttpOnly.
 */
public record AuthResponseDTO(
        String token,
        String telephone,
        String nom,
        String email,
        Set<Role> roles,
        /** Vrai si une vérification TOTP est requise avant d'obtenir l'accès complet. */
        boolean pending2fa
) {
    /** Constructeur de commodité pour les connexions sans 2FA (cas normal). */
    public AuthResponseDTO(String token, String telephone, String nom, String email, Set<Role> roles) {
        this(token, telephone, nom, email, roles, false);
    }
}
