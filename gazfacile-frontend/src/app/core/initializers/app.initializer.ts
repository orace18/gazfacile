import { AuthService } from '../services/auth.service';

/**
 * Factory pour APP_INITIALIZER.
 *
 * Au démarrage de l'application, tente de restaurer la session utilisateur
 * via un refresh silencieux (cookie HttpOnly).
 *
 * - Cookie valide → access token en mémoire, utilisateur connecté
 * - Cookie expiré / absent → profil localStorage effacé, utilisateur déconnecté
 *
 * Cela permet à l'utilisateur de rester connecté 30 jours sans se reconnecter
 * manuellement, même après fermeture du navigateur.
 */
export function sessionInitializer(authService: AuthService): () => Promise<void> {
  return () => authService.tenterRestaurationSession();
}
