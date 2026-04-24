package bj.gazfacile.model;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;


/**
 * Avis laissé par un client sur un revendeur de gaz.
 * La note est entre 1 et 5 étoiles.
 */
@Document(collection = "avis")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Avis {

    @Id
    private String id;

    @Indexed
    private String revendeurId;

    private String auteurNom;

    private String auteurTelephone;

    @Min(1) @Max(5)
    private int note;

    private String commentaire;

    private LocalDateTime createdAt;
}
