package bj.gazfacile.controller;

import bj.gazfacile.model.User;
import bj.gazfacile.model.enums.Role;
import bj.gazfacile.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Set;

/**
 * Endpoint unique pour initialiser le compte administrateur.
 * Se désactive automatiquement dès qu'un admin existe.
 * L'admin utilise un PIN pour se connecter.
 */
@RestController
@RequestMapping("/api/v1/setup")
@RequiredArgsConstructor
@Slf4j
public class SetupController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    @PostMapping("/admin")
    public ResponseEntity<Map<String, String>> creerAdmin() {
        if (userRepository.existsByRolesContaining(Role.ADMIN)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Un compte administrateur existe déjà"));
        }

        String pinGenere = genererPin();

        User admin = User.builder()
                .telephone("0147946910")
                .email("facile.gaz@gmail.com")
                .pinHash(passwordEncoder.encode(pinGenere))
                .nom("Admin GazFacile")
                .roles(Set.of(Role.ADMIN))
                .actif(true)
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(admin);
        log.info("[Setup] Compte administrateur créé : {}", admin.getTelephone());

        return ResponseEntity.ok(Map.of(
                "message", "Compte administrateur créé avec succès",
                "pin", pinGenere,
                "warning", "Notez ce PIN immédiatement — il ne sera plus affiché"
        ));
    }

    private static String genererPin() {
        return String.format("%06d", SECURE_RANDOM.nextInt(1_000_000));
    }
}
