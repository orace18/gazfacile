import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * Intercepteur HTTP fonctionnel qui ajoute le token JWT Bearer
 * à l'en-tête Authorization de chaque requête sortante.
 */
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const requeteAvecToken = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(requeteAvecToken);
  }

  return next(req);
};
