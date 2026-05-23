package bj.gazfacile.config;

import bj.gazfacile.model.enums.Abonnement;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.ReadingConverter;

/**
 * Converter MongoDB pour gérer la migration des anciens plans (STANDARD → MENSUEL, PREMIUM → SEMESTRIEL).
 */
@ReadingConverter
public class AbonnementReadConverter implements Converter<String, Abonnement> {

    @Override
    public Abonnement convert(String source) {
        return switch (source) {
            case "STANDARD"    -> Abonnement.MENSUEL;
            case "PREMIUM"     -> Abonnement.SEMESTRIEL;
            default -> {
                try {
                    yield Abonnement.valueOf(source);
                } catch (IllegalArgumentException e) {
                    yield Abonnement.GRATUIT;
                }
            }
        };
    }
}
