package bj.gazfacile.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "cpass_otp_refs")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CpassOtpRef {

    @Id
    private String id;

    @Indexed
    private String phoneNumber;

    @Indexed
    private String referenceId;

    private Instant expiresAt;

    @Builder.Default
    private boolean used = false;

    private Instant createdAt;
}
