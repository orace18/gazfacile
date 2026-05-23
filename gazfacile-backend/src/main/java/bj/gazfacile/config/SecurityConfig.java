package bj.gazfacile.config;

import bj.gazfacile.security.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Configuration de la sécurité Spring Security avec JWT.
 * API REST stateless : pas de session, pas de CSRF.
 * L'authentification se fait par WebAuthn ou PIN — pas de DaoAuthenticationProvider.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final CorsConfig corsConfig;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(cors -> cors.configurationSource(corsConfig.corsConfigurationSource()))
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Page d'erreur Spring Boot (évite Access Denied en cascade)
                .requestMatchers("/error").permitAll()
                // Swagger / OpenAPI — restreint au rôle ADMIN en production
                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui.html").hasRole("ADMIN")
                // Routes publiques WebSocket
                .requestMatchers("/ws/**").permitAll()
                // Routes d'authentification
                .requestMatchers(HttpMethod.POST, "/api/v1/auth/logout-all").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/v1/auth/pin/setup").authenticated()
                // TOTP verify : accessible uniquement avec un token "2FA pending"
                .requestMatchers(HttpMethod.POST, "/api/v1/auth/totp/verify").hasRole("2FA_PENDING")
                // TOTP setup/confirm/disable : ADMIN uniquement
                .requestMatchers("/api/v1/auth/totp/**").hasRole("ADMIN")
                .requestMatchers("/api/v1/auth/**").permitAll()
                // Endpoints OTP (envoi/vérification SMS avant inscription — flux public)
                .requestMatchers("/api/v1/otp/**", "/api/otp/**").permitAll()
                // Webhook FedaPay : public (FedaPay appelle sans token JWT)
                .requestMatchers(HttpMethod.POST, "/api/v1/paiement/webhook").permitAll()
                // Confirmation FedaPay : publique, données minimales sans PII
                .requestMatchers(HttpMethod.GET, "/api/v1/paiement/confirmation/**").permitAll()
                // Consultation transaction par référence : authentifiée (contient des PII client)
                // Autres routes paiement : authentifiées
                .requestMatchers("/api/v1/paiement/**").authenticated()
                // Plans d'abonnement : publics (affichés avant inscription)
                .requestMatchers(HttpMethod.GET, "/api/v1/plans/**").permitAll()
                // Subscriptions : authentifiées
                .requestMatchers("/api/v1/subscriptions/**").authenticated()
                // Consultations authentifiées (quota abonnement)
                .requestMatchers(HttpMethod.POST, "/api/v1/consultations/consulter-auth").authenticated()
                .requestMatchers(HttpMethod.GET, "/api/v1/consultations/statut-auth").authenticated()
                // Consultations freemium : publiques (visiteurs anonymes)
                .requestMatchers("/api/v1/consultations/**").permitAll()
                // Lecture des revendeurs et des avis : publique
                .requestMatchers(HttpMethod.GET, "/api/v1/revendeurs/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/avis/revendeur/**").permitAll()
                // Soumission d'un avis : authentification requise (empêche les faux avis)
                .requestMatchers(HttpMethod.POST, "/api/v1/avis").authenticated()
                // Création et modification de revendeurs requiert une authentification
                .requestMatchers(HttpMethod.POST, "/api/v1/revendeurs/**").authenticated()
                .requestMatchers(HttpMethod.PATCH, "/api/v1/revendeurs/**").authenticated()
                .requestMatchers(HttpMethod.PUT, "/api/v1/revendeurs/**").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/api/v1/revendeurs/**").authenticated()
                // Commandes requiert une authentification
                .requestMatchers("/api/v1/commandes/**").authenticated()
                // Abonnements : revendeur ou admin
                .requestMatchers("/api/v1/abonnement/**").authenticated()
                // Notifications : authentifié
                .requestMatchers("/api/v1/notifications/**").authenticated()
                // Tableau de bord admin : rôle ADMIN uniquement
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                // Tout le reste est protégé
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
