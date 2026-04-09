package bj.gazfacile.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * Code OTP à usage unique pour vérifier un numéro de téléphone.
 * Expire après 5 minutes. Invalidé après une utilisation réussie.
 */
@Document(collection = "otp_records")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OtpRecord {

    @Id
    private String id;

    @Indexed
    private String telephone;

    private String code;

    private LocalDateTime expiresAt;

    @Builder.Default
    private boolean utilise = false;

    /** Durée de validité en minutes. */
    public static final int EXPIRATION_MINUTES = 5;

    public boolean estExpire() {
        return LocalDateTime.now().isAfter(expiresAt);
    }

    public boolean estValide(String codeA) {
        return !utilise && !estExpire() && code.equals(codeA);
    }
}
