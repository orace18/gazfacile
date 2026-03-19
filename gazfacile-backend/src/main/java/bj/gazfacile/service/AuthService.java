package bj.gazfacile.service;

import bj.gazfacile.dto.AuthResponseDTO;
import bj.gazfacile.dto.LoginDTO;
import bj.gazfacile.dto.RegisterDTO;
import bj.gazfacile.model.User;
import bj.gazfacile.model.enums.Role;
import bj.gazfacile.repository.UserRepository;
import bj.gazfacile.security.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Set;

/**
 * Service gérant l'inscription et l'authentification des utilisateurs.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    /**
     * Inscrit un nouvel utilisateur et retourne ses tokens JWT.
     *
     * @param dto données d'inscription
     * @return réponse d'authentification avec tokens et infos utilisateur
     * @throws IllegalArgumentException si le numéro est déjà utilisé
     */
    public AuthResponseDTO register(RegisterDTO dto) {
        if (userRepository.existsByTelephone(dto.telephone())) {
            throw new IllegalArgumentException("Ce numéro de téléphone est déjà associé à un compte");
        }

        if (dto.email() != null && !dto.email().isBlank() && userRepository.existsByEmail(dto.email())) {
            throw new IllegalArgumentException("Cette adresse email est déjà associée à un compte");
        }

        // Déterminer le rôle : CLIENT par défaut
        Role role = (dto.role() != null) ? dto.role() : Role.CLIENT;
        // Empêcher l'auto-attribution du rôle ADMIN
        if (role == Role.ADMIN) {
            role = Role.CLIENT;
        }

        User utilisateur = User.builder()
                .telephone(dto.telephone())
                .email(dto.email())
                .password(passwordEncoder.encode(dto.password()))
                .nom(dto.nom())
                .roles(Set.of(role))
                .actif(true)
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(utilisateur);
        log.info("Nouvel utilisateur inscrit : {}", utilisateur.getTelephone());

        return construireReponse(utilisateur);
    }

    /**
     * Authentifie un utilisateur et retourne ses tokens JWT.
     *
     * @param dto identifiants de connexion
     * @return réponse d'authentification avec tokens et infos utilisateur
     */
    public AuthResponseDTO login(LoginDTO dto) {
        // Spring Security gère la vérification du mot de passe et lance une exception si invalide
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.telephone(), dto.password())
        );

        User utilisateur = userRepository.findByTelephone(dto.telephone())
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur introuvable"));

        log.info("Connexion réussie pour : {}", utilisateur.getTelephone());
        return construireReponse(utilisateur);
    }

    /** Construit la réponse d'authentification avec les tokens JWT. */
    private AuthResponseDTO construireReponse(User utilisateur) {
        String token = jwtService.generateToken(utilisateur);
        String refreshToken = jwtService.generateRefreshToken(utilisateur);

        return new AuthResponseDTO(
                token,
                refreshToken,
                utilisateur.getTelephone(),
                utilisateur.getNom(),
                utilisateur.getEmail(),
                utilisateur.getRoles()
        );
    }
}
