package bj.gazfacile.config;

import bj.gazfacile.security.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Configuration de la sécurité Spring Security avec JWT.
 * API REST stateless : pas de session, pas de CSRF.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final UserDetailsService userDetailsService;
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
                // Swagger / OpenAPI
                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui.html").permitAll()
                // Routes publiques WebSocket
                .requestMatchers("/ws/**").permitAll()
                // Routes d'authentification publiques
                .requestMatchers("/api/v1/auth/**").permitAll()
                .requestMatchers("/api/otp/**", "/api/v1/otp/**").permitAll()
                // Setup initial admin (se bloque automatiquement si admin existe)
                .requestMatchers(HttpMethod.POST, "/api/v1/setup/admin").permitAll()
                // Webhook FedaPay : public (FedaPay appelle sans token JWT)
                .requestMatchers(HttpMethod.POST, "/api/v1/paiement/webhook").permitAll()
                // Consultation transaction par référence : publique (page confirmation post-paiement)
                .requestMatchers(HttpMethod.GET, "/api/v1/paiement/transaction/**").permitAll()
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
                // Soumission d'un avis : publique (un numéro de téléphone suffit)
                .requestMatchers(HttpMethod.POST, "/api/v1/avis").permitAll()
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
            .authenticationProvider(authenticationProvider())
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
