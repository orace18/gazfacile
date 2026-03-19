package bj.gazfacile.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Gestionnaire global des exceptions.
 * Retourne des réponses d'erreur standardisées en JSON.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /** Structure de réponse d'erreur standardisée. */
    private record ErreurResponse(
            String message,
            int statut,
            String erreur,
            LocalDateTime timestamp
    ) {}

    /** Erreurs de validation des champs (@Valid). */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, String> erreursChamps = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String champ = ((FieldError) error).getField();
            String message = error.getDefaultMessage();
            erreursChamps.put(champ, message);
        });

        Map<String, Object> reponse = new HashMap<>();
        reponse.put("message", "Erreur de validation des données");
        reponse.put("statut", HttpStatus.BAD_REQUEST.value());
        reponse.put("erreurs", erreursChamps);
        reponse.put("timestamp", LocalDateTime.now());

        return ResponseEntity.badRequest().body(reponse);
    }

    /** Ressource non trouvée en base de données. */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErreurResponse> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ErreurResponse(ex.getMessage(), 404, "Ressource introuvable", LocalDateTime.now())
        );
    }

    /** Accès refusé (autorisation insuffisante). */
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErreurResponse> handleAccessDeniedException(AccessDeniedException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                new ErreurResponse("Accès refusé : permissions insuffisantes", 403, "Accès interdit", LocalDateTime.now())
        );
    }

    /** Identifiants de connexion incorrects. */
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErreurResponse> handleBadCredentialsException(BadCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                new ErreurResponse("Numéro de téléphone ou mot de passe incorrect", 401, "Non autorisé", LocalDateTime.now())
        );
    }

    /** Erreurs métier (ex : téléphone déjà utilisé). */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErreurResponse> handleIllegalArgumentException(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ErreurResponse(ex.getMessage(), 400, "Requête invalide", LocalDateTime.now())
        );
    }

    /** Erreur serveur inattendue. */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErreurResponse> handleGenericException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ErreurResponse("Une erreur interne s'est produite", 500, "Erreur serveur", LocalDateTime.now())
        );
    }
}
