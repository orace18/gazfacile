import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  catchError,
  filter,
  map,
  of,
  shareReplay,
  switchMap,
  take,
  throwError,
  timeout,
  timer
} from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../models/revendeur.model';

// Déclaration de l'objet global Google Identity Services
declare const google: {
  accounts: {
    id: {
      initialize(config: {
        client_id: string;
        callback: (response: { credential: string }) => void;
        auto_select?: boolean;
        cancel_on_tap_outside?: boolean;
      }): void;
      renderButton(element: HTMLElement, options: object): void;
      prompt(): void;
      cancel(): void;
    };
  };
};

interface GoogleConfig {
  clientId: string;
  configured: boolean;
}

@Injectable({ providedIn: 'root' })
export class GoogleAuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth/google`;
  private readonly configUrl = `${this.apiUrl}/config`;
  private readonly http = inject(HttpClient);
  private readonly fallbackClientId = ((environment as { googleClientId?: string }).googleClientId ?? '').trim();
  private config$?: Observable<GoogleConfig>;

  chargerConfiguration(): Observable<GoogleConfig> {
    if (this.fallbackClientId) {
      return of({ clientId: this.fallbackClientId, configured: true });
    }

    if (!this.config$) {
      this.config$ = this.http.get<Partial<GoogleConfig>>(this.configUrl).pipe(
        map((config) => {
          const clientId = (config.clientId ?? '').trim();
          return {
            clientId,
            configured: Boolean(clientId && (config.configured ?? true))
          };
        }),
        catchError(() => of({ clientId: '', configured: false })),
        shareReplay(1)
      );
    }

    return this.config$;
  }

  /**
   * Initialise Google Identity Services et rend le bouton dans l'élément fourni.
   * @param element  conteneur DOM pour le bouton Google
   * @param callback appelé avec l'idToken après le sign-in
   */
  initialiser(element: HTMLElement, callback: (idToken: string) => void): Observable<boolean> {
    return this.chargerConfiguration().pipe(
      switchMap((config) => {
        if (!config.configured || !config.clientId) {
          console.warn('[Google] Client ID non configuré');
          return of(false);
        }

        return this.attendreBibliothequeGoogle().pipe(
          map((scriptCharge) => {
            if (!scriptCharge) {
              console.warn('[Google] Script GSI non chargé');
              return false;
            }

            element.replaceChildren();
            google.accounts.id.initialize({
              client_id: config.clientId,
              callback: (response) => callback(response.credential),
              auto_select: false,
              cancel_on_tap_outside: true
            });
            google.accounts.id.renderButton(element, {
              type: 'standard',
              shape: 'rectangular',
              theme: 'outline',
              size: 'large',
              text: 'continue_with',
              locale: 'fr',
              width: 320
            });

            return true;
          })
        );
      })
    );
  }

  /**
   * Envoie l'ID token au backend pour validation et authentification.
   * Si le compte est nouveau, `telephone` est requis.
   */
  loginAvecGoogle(idToken: string, telephone?: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl, { idToken, telephone }).pipe(
      catchError(err => {
        if (err.status === 428) {
          // Backend indique que le téléphone est requis
          return throwError(() => ({ telephoneRequis: true }));
        }
        const message = err.error?.message || 'Connexion Google échouée';
        return throwError(() => new Error(message));
      })
    );
  }

  private attendreBibliothequeGoogle(): Observable<boolean> {
    if (typeof google !== 'undefined') {
      return of(true);
    }

    return timer(0, 250).pipe(
      map(() => typeof google !== 'undefined'),
      filter(Boolean),
      take(1),
      timeout({ first: 5000 }),
      map(() => true),
      catchError(() => of(false))
    );
  }
}
