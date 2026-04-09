package bj.gazfacile.model;

import bj.gazfacile.model.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Entité utilisateur de l'application GazFacile.
 * Implémente UserDetails pour l'intégration avec Spring Security.
 */
@Document(collection = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {

    @Id
    private String id;

    @Indexed(unique = true)
    @NotBlank(message = "Le numéro de téléphone est obligatoire")
    private String telephone;

    private String email;

    @NotBlank(message = "Le mot de passe est obligatoire")
    private String password;

    private String nom;

    @Builder.Default
    private Set<Role> roles = new HashSet<>();

    /** Identifiant Google (sub) — non null si le compte est lié à Google. */
    @Indexed(sparse = true)
    private String googleId;

    /** Vrai si le numéro de téléphone a été vérifié par OTP. */
    @Builder.Default
    private boolean telephoneVerifie = false;

    @Builder.Default
    private boolean actif = true;

    private LocalDateTime createdAt;

    /** Retourne les autorités Spring Security basées sur les rôles. */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.name()))
                .collect(Collectors.toSet());
    }

    /** Le numéro de téléphone sert d'identifiant unique. */
    @Override
    public String getUsername() {
        return telephone;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return actif;
    }
}
