package bj.gazfacile;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * Point d'entrée principal de l'application GazFacile.
 * Plateforme de localisation de revendeurs de gaz domestique au Bénin.
 */
@SpringBootApplication
@EnableMongoRepositories(basePackages = "bj.gazfacile.repository")
@EnableScheduling
public class GazFacileApplication {

    public static void main(String[] args) {
        SpringApplication.run(GazFacileApplication.class, args);
    }
}