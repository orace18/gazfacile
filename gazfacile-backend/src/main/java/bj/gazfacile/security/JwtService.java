package bj.gazfacile.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * Service de gestion des tokens JWT.
 * Utilise la bibliothèque jjwt 0.12.3 avec l'algorithme HMAC-SHA256.
 */
@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long expiration;

    @Value("${jwt.refresh-expiration}")
    private long refreshExpiration;

    private static final long PENDING_2FA_EXPIRATION_MS = 5 * 60 * 1000L; // 5 minutes
    private static final String CLAIM_SCOPE = "scope";
    private static final String SCOPE_2FA_PENDING = "2fa_pending";

    /** Génère un token JWT d'accès pour l'utilisateur donné. */
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails, expiration);
    }

    /** Génère un token de rafraîchissement avec une durée de vie plus longue. */
    public String generateRefreshToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails, refreshExpiration);
    }

    /**
     * Génère un token JWT à durée très courte (5 min) signalant que le 2FA est requis.
     * Ce token ne donne accès qu'à l'endpoint /auth/totp/verify.
     */
    public String generatePending2faToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put(CLAIM_SCOPE, SCOPE_2FA_PENDING);
        return generateToken(claims, userDetails, PENDING_2FA_EXPIRATION_MS);
    }

    /** Retourne true si le token est un token 2FA en attente (scope = 2fa_pending). */
    public boolean isPending2faToken(String token) {
        try {
            String scope = extractClaim(token, claims -> claims.get(CLAIM_SCOPE, String.class));
            return SCOPE_2FA_PENDING.equals(scope);
        } catch (Exception e) {
            return false;
        }
    }

    private String generateToken(Map<String, Object> extraClaims, UserDetails userDetails, long duree) {
        return Jwts.builder()
                .claims(extraClaims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + duree))
                .signWith(getSigningKey())
                .compact();
    }

    /** Extrait le nom d'utilisateur (téléphone) du token. */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /** Vérifie si le token est valide pour l'utilisateur donné. */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
