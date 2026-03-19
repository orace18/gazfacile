package bj.gazfacile.controller;

import bj.gazfacile.dto.AuthResponseDTO;
import bj.gazfacile.dto.LoginDTO;
import bj.gazfacile.dto.RegisterDTO;
import bj.gazfacile.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Contrôleur gérant l'inscription et la connexion des utilisateurs.
 * Routes publiques : aucune authentification requise.
 */
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * Inscrit un nouvel utilisateur (client ou revendeur).
     *
     * @param dto données d'inscription validées
     * @return 201 Created avec les tokens JWT
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@Valid @RequestBody RegisterDTO dto) {
        AuthResponseDTO reponse = authService.register(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(reponse);
    }

    /**
     * Authentifie un utilisateur existant.
     *
     * @param dto identifiants de connexion validés
     * @return 200 OK avec les tokens JWT
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginDTO dto) {
        AuthResponseDTO reponse = authService.login(dto);
        return ResponseEntity.ok(reponse);
    }
}
