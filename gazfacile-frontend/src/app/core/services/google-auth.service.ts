import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
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

@Injectable({ providedIn: 'root' })
export class GoogleAuthService {

  private readonly apiUrl = `${environment.apiUrl}/auth/google`;
  private readonly http = inject(HttpClient);

  /** Client ID Google — à configurer dans environment.ts */
  private readonly clientId = (environment as any).googleClientId ?? '';

  /**
   * Initialise Google Identity Services et rend le bouton dans l'élément fourni.
   * @param element  conteneur DOM pour le bouton Google
   * @param callback appelé avec l'idToken après le sign-in
   */
  initialiser(element: HTMLElement, callback: (idToken: string) => void): void {
    if (typeof google === 'undefined') {
      console.warn('[Google] Script GSI non chargé');
      return;
    }
    google.accounts.id.initialize({
      client_id: this.clientId,
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
      locale: 'fr'
    });
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
}
