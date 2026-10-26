import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, defer, of, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * Intercepteur JWT fonctionnel (Angular 18).
 *
 * Comportements :
 * 1. Ajoute le Bearer token à chaque requête sortante (si disponible)
 * 2. Sur 401 : tente un refresh silencieux via le cookie HttpOnly
 *    - Si plusieurs requêtes échouent en même temps → un seul appel refresh (shareReplay)
 *    - Refresh OK → relance la requête originale avec le nouveau token
 *    - Refresh KO → efface la session et redirige vers /auth/login
 * 3. Affiche un toast lors de la reconnexion silencieuse
 * 4. Si un refresh est déjà en cours (restauration au démarrage), attend son
 *    résultat avant d'envoyer la requête, pour qu'elle parte avec le token
 */
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  // Ne pas intercepter les endpoints d'auth (évite les boucles infinies)
  if (req.url.includes('/api/v1/auth/refresh')) {
    return next(req);
  }

  const envoyer = defer(() => {
    const token = authService.getToken();
    return next(token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req);
  });

  const requete = authService.isCurrentlyRefreshing()
    ? authService.doRefresh().pipe(
        catchError(() => of(null)),
        switchMap(() => envoyer)
      )
    : envoyer;

  return requete.pipe(
    catchError(err => {
      if (!(err instanceof HttpErrorResponse) || err.status !== 401) {
        return throwError(() => err);
      }

      if (!authService.estConnecte()) {
        return throwError(() => err);
      }

      // Toast "reconnexion en cours" — uniquement pour le premier appel (pas les requêtes en attente)
      if (!authService.isCurrentlyRefreshing()) {
        snackBar.open('Votre session a expiré, reconnexion en cours...', undefined, {
          duration: 3500,
          panelClass: 'snack-info'
        });
      }

      return authService.doRefresh().pipe(
        switchMap(newToken =>
          next(req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } }))
        ),
        catchError(refreshErr => {
          router.navigate(['/auth/login']);
          return throwError(() => refreshErr);
        })
      );
    })
  );
};
