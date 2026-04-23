package bj.gazfacile.dto;

import bj.gazfacile.model.User;
import bj.gazfacile.model.enums.Role;

import java.time.LocalDateTime;
import java.util.Set;

/**
 * Vue admin d'un utilisateur — n'expose pas pinHash ni googleId.
 */
public record UserAdminDTO(
        String id,
        String telephone,
        String email,
        String nom,
        Set<Role> roles,
        boolean webAuthnRegistered,
        boolean actif,
        LocalDateTime createdAt
) {
    public static UserAdminDTO from(User user) {
        return new UserAdminDTO(
                user.getId(),
                user.getTelephone(),
                user.getEmail(),
                user.getNom(),
                user.getRoles(),
                user.isWebAuthnRegistered(),
                user.isActif(),
                user.getCreatedAt()
        );
    }
}
