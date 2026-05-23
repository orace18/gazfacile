package bj.gazfacile.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.servlet.resource.NoResourceFoundException;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Gestionnaire global des exceptions.
 * Retourne des réponses d'erreur standardisées en JSON.
 */
@RestControllerAdvice
@RequiredArgsConstructor
@Slf4j
public class GlobalExceptionHandler {

    private final ObjectMapper objectMapper;

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

        return json(HttpStatus.BAD_REQUEST, reponse);
    }

    /** Ressource non trouvée en base de données. */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErreurResponse> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return json(HttpStatus.NOT_FOUND,
                new ErreurResponse(ex.getMessage(), 404, "Ressource introuvable", LocalDateTime.now())
        );
    }

    /** Ressource statique introuvable (ex. fichier .js demandé au backend). */
    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ErreurResponse> handleNoResourceFoundException(NoResourceFoundException ex, HttpServletRequest request) {
        log.warn("[Exception] Ressource introuvable sur {} {}", request.getMethod(), request.getRequestURI());
        return json(HttpStatus.NOT_FOUND,
                new ErreurResponse("Ressource introuvable : " + ex.getResourcePath(), 404, "Ressource introuvable", LocalDateTime.now())
        );
    }

    /** Accès refusé (autorisation insuffisante). */
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErreurResponse> handleAccessDeniedException(AccessDeniedException ex) {
        return json(HttpStatus.FORBIDDEN,
                new ErreurResponse("Accès refusé : permissions insuffisantes", 403, "Accès interdit", LocalDateTime.now())
        );
    }

    /** Identifiants de connexion incorrects. */
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErreurResponse> handleBadCredentialsException(BadCredentialsException ex) {
        return json(HttpStatus.UNAUTHORIZED,
                new ErreurResponse("Numéro de téléphone ou mot de passe incorrect", 401, "Non autorisé", LocalDateTime.now())
        );
    }

    /** Erreurs métier (ex : téléphone déjà utilisé). */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErreurResponse> handleIllegalArgumentException(IllegalArgumentException ex) {
        return json(HttpStatus.BAD_REQUEST,
                new ErreurResponse(ex.getMessage(), 400, "Requête invalide", LocalDateTime.now())
        );
    }

    @ExceptionHandler(RateLimitOtpException.class)
    public ResponseEntity<ErreurResponse> handleRateLimitOtpException(RateLimitOtpException ex) {
        return json(HttpStatus.TOO_MANY_REQUESTS,
                new ErreurResponse(ex.getMessage(), 429, "Trop de requêtes", LocalDateTime.now())
        );
    }

    @ExceptionHandler(OtpExpiredException.class)
    public ResponseEntity<ErreurResponse> handleOtpExpiredException(OtpExpiredException ex) {
        return json(HttpStatus.BAD_REQUEST,
                new ErreurResponse(ex.getMessage(), 400, "OTP expiré", LocalDateTime.now())
        );
    }

    @ExceptionHandler(OtpInvalidException.class)
    public ResponseEntity<ErreurResponse> handleOtpInvalidException(OtpInvalidException ex) {
        return json(HttpStatus.BAD_REQUEST,
                new ErreurResponse(ex.getMessage(), 400, "OTP invalide", LocalDateTime.now())
        );
    }

    @ExceptionHandler(OtpProviderException.class)
    public ResponseEntity<ErreurResponse> handleOtpProviderException(OtpProviderException ex) {
        return json(HttpStatus.BAD_GATEWAY,
                new ErreurResponse(ex.getMessage(), 502, "Erreur fournisseur OTP", LocalDateTime.now())
        );
    }

    /** Erreurs métier avec statut HTTP explicite (ex : UNAUTHORIZED, PRECONDITION_REQUIRED). */
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ErreurResponse> handleResponseStatusException(ResponseStatusException ex) {
        return json(HttpStatus.valueOf(ex.getStatusCode().value()),
                new ErreurResponse(ex.getReason(), ex.getStatusCode().value(), "Erreur", LocalDateTime.now())
        );
    }

    /** Erreur renvoyée par un service externe (ex : FedaPay rate-limit). */
    @ExceptionHandler(HttpClientErrorException.class)
    public ResponseEntity<ErreurResponse> handleHttpClientErrorException(HttpClientErrorException ex, HttpServletRequest request) {
        log.error("[Exception] Erreur HTTP externe sur {} {}: {}", request.getMethod(), request.getRequestURI(), ex.getResponseBodyAsString());

        String message = "Erreur du service de paiement";
        try {
            Map<?, ?> body = objectMapper.readValue(ex.getResponseBodyAsString(), Map.class);
            if (body.get("message") instanceof String msg && !msg.isBlank()) {
                message = msg.trim();
            }
        } catch (Exception ignored) {}

        return json(HttpStatus.BAD_GATEWAY,
                new ErreurResponse(message, 502, "Erreur service de paiement", LocalDateTime.now())
        );
    }

    /** Erreur serveur inattendue. */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErreurResponse> handleGenericException(Exception ex, HttpServletRequest request) {
        log.error("[Exception] Erreur inattendue sur {} {}", request.getMethod(), request.getRequestURI(), ex);
        return json(HttpStatus.INTERNAL_SERVER_ERROR,
                new ErreurResponse("Une erreur interne s'est produite", 500, "Erreur serveur", LocalDateTime.now())
        );
    }

    private <T> ResponseEntity<T> json(HttpStatus status, T body) {
        return ResponseEntity.status(status)
                .contentType(MediaType.APPLICATION_JSON)
                .body(body);
    }
}
