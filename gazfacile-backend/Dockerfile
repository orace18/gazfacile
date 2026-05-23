# ── Étape 1 : Build Maven ────────────────────────────────────────────────────
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Copier les fichiers Maven en premier pour profiter du cache Docker
COPY pom.xml .
COPY .mvn/ .mvn/
COPY mvnw .

# Télécharger les dépendances (couche cachée si pom.xml ne change pas)
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# Copier les sources et compiler
COPY src/ src/
RUN ./mvnw package -DskipTests -B

# ── Étape 2 : Image runtime légère ───────────────────────────────────────────
FROM eclipse-temurin:21-jre-alpine AS runtime
WORKDIR /app

# Ajouter les certificats SSL (nécessaire pour MongoDB Atlas)
RUN apk add --no-cache ca-certificates && update-ca-certificates

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -S gazfacile && adduser -S gazfacile -G gazfacile
USER gazfacile

# Copier le JAR compilé
COPY --from=build /app/target/*.jar app.jar

# Port exposé
EXPOSE 8080

# Démarrage avec options JVM optimisées pour containers
ENTRYPOINT ["java", \
  "-XX:+UseContainerSupport", \
  "-XX:MaxRAMPercentage=75.0", \
  "-Djava.security.egd=file:/dev/./urandom", \
  "-jar", "app.jar"]
