package bj.gazfacile.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class PhoneNumberService {

    public String normaliserTelephoneLocal(String telephone) {
        if (telephone == null || telephone.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Le numéro de téléphone est obligatoire");
        }

        String telephoneLocal = telephone
                .replaceFirst("^\\+229", "")
                .replaceFirst("^00229", "")
                .replaceAll("\\s+", "")
                .trim();

        if (!telephoneLocal.matches("\\d{10}")) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Le numéro de téléphone doit comporter 10 chiffres"
            );
        }

        return telephoneLocal;
    }

    public String normaliserTelephoneInternational(String telephone) {
        return "+229" + normaliserTelephoneLocal(telephone);
    }
}
