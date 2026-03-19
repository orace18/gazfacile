package bj.gazfacile.dto;

import bj.gazfacile.model.enums.Role;

import java.util.Set;

/**
 * DTO retourné après une authentification réussie.
 * Contient les tokens JWT et les informations de base de l'utilisateur.
 */
public record AuthResponseDTO(
        String token,
        String refreshToken,
        String telephone,
        String nom,
        String email,
        Set<Role> roles
) {}
