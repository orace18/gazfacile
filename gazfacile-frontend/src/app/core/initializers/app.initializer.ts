import { AuthService } from '../services/auth.service';

/**
 * Factory pour APP_INITIALIZER.
 *
 * Au démarrage de l'application, lance la restauration de la session utilisateur
 * via un refresh silencieux (cookie HttpOnly) SANS attendre la réponse :
 * le backend (Render) peut mettre plusieurs dizaines de secondes à se réveiller,
 * l'interface s'affiche donc immédiatement avec le profil localStorage.
 *
 * - Les requêtes HTTP émises pendant le refresh attendent le token (jwtInterceptor)
 * - Les routes protégées attendent la fin du refresh (guards)
 * - Cookie expiré / absent → profil localStorage effacé, utilisateur déconnecté
 */
export function sessionInitializer(authService: AuthService): () => void {
  return () => authService.demarrerRestaurationSession();
}
