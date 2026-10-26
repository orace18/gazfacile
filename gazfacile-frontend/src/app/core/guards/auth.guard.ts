import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard de route qui redirige vers la page de connexion
 * si l'utilisateur n'est pas authentifié.
 * Attend la restauration de session lancée au démarrage.
 */
export const authGuard: CanActivateFn = async (_route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  await authService.attendreSession();

  if (authService.isLoggedIn()) {
    return true;
  }

  // Sauvegarder l'URL demandée pour rediriger après connexion
  return router.createUrlTree(['/auth/login'], {
    queryParams: { returnUrl: state.url }
  });
};
