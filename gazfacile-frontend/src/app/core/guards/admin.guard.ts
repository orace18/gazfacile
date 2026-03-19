import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../models/revendeur.model';

/**
 * Guard qui autorise l'accès uniquement aux utilisateurs avec le rôle ADMIN.
 */
export const adminGuard: CanActivateFn = (_route, _state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn() && authService.hasRole(Role.ADMIN)) {
    return true;
  }

  return router.createUrlTree(['/']);
};
