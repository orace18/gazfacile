import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthResponse, LoginDTO, RegisterDTO, Role } from '../models/revendeur.model';

const CLE_TOKEN = 'gf_token';
const CLE_USER = 'gf_user';

/**
 * Service d'authentification.
 * Gère la connexion, l'inscription, la déconnexion et la persistance du token JWT.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  /** Utilisateur courant sous forme de signal réactif. */
  readonly currentUser = signal<AuthResponse | null>(this.chargerUtilisateurLocal());

  /** Vrai si un utilisateur est connecté. */
  readonly estConnecte = computed(() => this.currentUser() !== null);

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  /**
   * Authentifie un utilisateur avec son téléphone et mot de passe.
   * Stocke le token en localStorage.
   */
  login(dto: LoginDTO): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, dto).pipe(
      tap(reponse => this.sauvegarderSession(reponse)),
      catchError(err => {
        const message = err.error?.message || 'Numéro de téléphone ou mot de passe incorrect';
        return throwError(() => new Error(message));
      })
    );
  }

  /**
   * Inscrit un nouvel utilisateur.
   * Stocke automatiquement la session après inscription réussie.
   */
  register(dto: RegisterDTO): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, dto).pipe(
      tap(reponse => this.sauvegarderSession(reponse)),
      catchError(err => {
        const message = err.error?.message || 'Erreur lors de l\'inscription';
        return throwError(() => new Error(message));
      })
    );
  }

  /** Déconnecte l'utilisateur et efface la session locale. */
  logout(): void {
    localStorage.removeItem(CLE_TOKEN);
    localStorage.removeItem(CLE_USER);
    this.currentUser.set(null);
    this.router.navigate(['/']);
  }

  /** Retourne le token JWT stocké en localStorage. */
  getToken(): string | null {
    return localStorage.getItem(CLE_TOKEN);
  }

  /** Vérifie si l'utilisateur est connecté. */
  isLoggedIn(): boolean {
    return this.estConnecte();
  }

  /** Vérifie si l'utilisateur possède un rôle spécifique. */
  hasRole(role: Role): boolean {
    return this.currentUser()?.roles?.includes(role) ?? false;
  }

  /** Sauvegarde la session en localStorage et met à jour le signal. */
  private sauvegarderSession(reponse: AuthResponse): void {
    localStorage.setItem(CLE_TOKEN, reponse.token);
    localStorage.setItem(CLE_USER, JSON.stringify(reponse));
    this.currentUser.set(reponse);
  }

  /** Charge les données utilisateur depuis le localStorage au démarrage. */
  private chargerUtilisateurLocal(): AuthResponse | null {
    try {
      const userData = localStorage.getItem(CLE_USER);
      return userData ? JSON.parse(userData) as AuthResponse : null;
    } catch {
      return null;
    }
  }
}
