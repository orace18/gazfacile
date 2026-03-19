package bj.gazfacile.dto;

import bj.gazfacile.model.enums.ModePaiement;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

/**
 * DTO pour la création d'une commande de gaz.
 */
public record CommandeDTO(

        @NotBlank(message = "L'identifiant du revendeur est obligatoire")
        String revendeurId,

        @NotBlank(message = "Le numéro de téléphone du client est obligatoire")
        @Pattern(regexp = "^(\\+229|00229)?[0-9]{8}$",
                message = "Le numéro de téléphone doit être un numéro béninois valide")
        String clientTelephone,

        @NotBlank(message = "L'adresse de livraison est obligatoire")
        String clientAdresseLivraison,

        /** Coordonnées optionnelles du client [longitude, latitude]. */
        double[] clientLocation,

        @NotBlank(message = "La marque est obligatoire")
        String marque,

        @NotBlank(message = "La taille est obligatoire (6kg ou 12kg)")
        @Pattern(regexp = "^(6kg|12kg)$", message = "La taille doit être 6kg ou 12kg")
        String taille,

        @Min(value = 1, message = "La quantité minimum est 1")
        int quantite,

        @NotNull(message = "Le mode de paiement est obligatoire")
        ModePaiement modePaiement
) {}
