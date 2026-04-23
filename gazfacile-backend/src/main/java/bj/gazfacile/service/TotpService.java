package bj.gazfacile.service;

import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.time.Instant;

/**
 * Service TOTP (RFC 6238) — implémentation sans dépendance externe.
 * Algorithme : HMAC-SHA1, 6 chiffres, fenêtre de 30 secondes.
 * Compatible Google Authenticator, Authy, et tout client TOTP standard.
 */
@Service
public class TotpService {

    private static final int DIGITS = 6;
    private static final int PERIOD = 30;
    // Fenêtre de tolérance : ±1 période pour compenser le décalage d'horloge
    private static final int WINDOW = 1;
    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    // Alphabet Base32 standard (RFC 4648)
    private static final String BASE32_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

    /** Génère un secret aléatoire de 160 bits encodé en Base32. */
    public String genererSecret() {
        byte[] secret = new byte[20];
        SECURE_RANDOM.nextBytes(secret);
        return base32Encode(secret);
    }

    /**
     * Construit l'URI otpauth:// à encoder en QR code.
     * Compatible avec tous les clients TOTP (Google Authenticator, Authy, etc.)
     */
    public String genererOtpauthUri(String secret, String telephone) {
        String issuer = "GazFacile";
        String label = URLEncoder.encode(issuer + ":" + telephone, StandardCharsets.UTF_8);
        String issuerEnc = URLEncoder.encode(issuer, StandardCharsets.UTF_8);
        return String.format(
            "otpauth://totp/%s?secret=%s&issuer=%s&digits=%d&period=%d",
            label, secret, issuerEnc, DIGITS, PERIOD
        );
    }

    /**
     * Vérifie un code TOTP soumis par l'utilisateur.
     * Utilise une comparaison en temps constant pour éviter les attaques temporelles.
     *
     * @param secret secret Base32 de l'utilisateur
     * @param code   code à 6 chiffres soumis
     * @return true si le code est valide dans la fenêtre de tolérance
     */
    public boolean verifier(String secret, String code) {
        if (code == null || code.length() != DIGITS) return false;
        long timeStep = Instant.now().getEpochSecond() / PERIOD;
        for (long i = timeStep - WINDOW; i <= timeStep + WINDOW; i++) {
            String attendu = genererCode(secret, i);
            // Comparaison en temps constant — protection contre les attaques temporelles
            if (MessageDigest.isEqual(
                    attendu.getBytes(StandardCharsets.UTF_8),
                    code.getBytes(StandardCharsets.UTF_8))) {
                return true;
            }
        }
        return false;
    }

    // ── Implémentation TOTP (RFC 6238) ────────────────────────────────────────

    private String genererCode(String secret, long timeStep) {
        try {
            byte[] key = base32Decode(secret.toUpperCase().replaceAll("=", ""));
            byte[] message = ByteBuffer.allocate(8).putLong(timeStep).array();

            Mac mac = Mac.getInstance("HmacSHA1");
            mac.init(new SecretKeySpec(key, "HmacSHA1"));
            byte[] hash = mac.doFinal(message);

            // Troncature dynamique (RFC 4226 §5.4)
            int offset = hash[hash.length - 1] & 0x0f;
            int binary = ((hash[offset]     & 0x7f) << 24)
                       | ((hash[offset + 1] & 0xff) << 16)
                       | ((hash[offset + 2] & 0xff) << 8)
                       |  (hash[offset + 3] & 0xff);

            return String.format("%0" + DIGITS + "d", binary % 1_000_000);
        } catch (Exception e) {
            throw new IllegalStateException("Erreur de génération TOTP", e);
        }
    }

    // ── Base32 (RFC 4648) sans dépendance externe ─────────────────────────────

    private static String base32Encode(byte[] data) {
        StringBuilder sb = new StringBuilder();
        int buffer = 0, bitsLeft = 0;
        for (byte b : data) {
            buffer = (buffer << 8) | (b & 0xff);
            bitsLeft += 8;
            while (bitsLeft >= 5) {
                bitsLeft -= 5;
                sb.append(BASE32_CHARS.charAt((buffer >> bitsLeft) & 0x1f));
            }
        }
        if (bitsLeft > 0) {
            sb.append(BASE32_CHARS.charAt((buffer << (5 - bitsLeft)) & 0x1f));
        }
        return sb.toString();
    }

    private static byte[] base32Decode(String input) {
        byte[] output = new byte[input.length() * 5 / 8];
        int buffer = 0, bitsLeft = 0, idx = 0;
        for (char c : input.toCharArray()) {
            int val = BASE32_CHARS.indexOf(c);
            if (val < 0) continue;
            buffer = (buffer << 5) | val;
            bitsLeft += 5;
            if (bitsLeft >= 8) {
                bitsLeft -= 8;
                output[idx++] = (byte) ((buffer >> bitsLeft) & 0xff);
            }
        }
        return output;
    }
}
