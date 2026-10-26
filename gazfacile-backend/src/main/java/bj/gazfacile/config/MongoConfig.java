package bj.gazfacile.config;

import bj.gazfacile.model.Revendeur;
import com.mongodb.ConnectionString;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.mongo.MongoConnectionDetails;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeospatialIndex;

import java.util.List;

@Configuration
public class MongoConfig {

    /**
     * URI nettoyée des espaces / retours à la ligne collés par erreur dans la variable
     * d'environnement (sinon "w=majority\n" fait échouer toutes les écritures).
     */
    @Bean
    public MongoConnectionDetails mongoConnectionDetails(@Value("${spring.data.mongodb.uri}") String uri) {
        ConnectionString connectionString = new ConnectionString(uri.strip());
        return () -> connectionString;
    }

    @Bean
    public MongoCustomConversions mongoCustomConversions() {
        return new MongoCustomConversions(List.of(new AbonnementReadConverter()));
    }

    @Bean
    public ApplicationRunner ensureMongoIndexes(MongoTemplate mongoTemplate) {
        return args -> mongoTemplate.indexOps(Revendeur.class)
                .ensureIndex(new GeospatialIndex("location").typed(GeoSpatialIndexType.GEO_2DSPHERE));
    }
}
