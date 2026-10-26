import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../models/revendeur.model';

/**
 * Guard qui autorise l'accès uniquement aux utilisateurs avec le rôle ADMIN.
 * Attend la restauration de session lancée au démarrage.
 */
export const adminGuard: CanActivateFn = async (_route, _state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  await authService.attendreSession();

  if (authService.isLoggedIn() && authService.hasRole(Role.ADMIN)) {
    return true;
  }

  return router.createUrlTree(['/admin/login']);
};
