import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable, Subject, catchError, finalize, firstValueFrom,
  map, of, shareReplay, tap, throwError
} from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthResponse, LoginDTO, OtpLoginDTO, RegisterDTO, Role } from '../models/revendeur.model';

/** Clé localStorage — profil utilisateur SANS le token (pas de XSS sur le token). */
const CLE_USER = 'gf_user';

/** Profil utilisateur persisté (données d'affichage uniquement). */
interface UserProfil {
  telephone: string;
  nom: string;
  email?: string;
  roles: Role[];
}

/**
 * Service d'authentification.
 *
 * Sécurité :
 * - Access token stocké en mémoire uniquement (jamais localStorage/sessionStorage)
 * - Refresh token géré exclusivement via cookie HttpOnly (le browser le gère)
 * - Inactivité > 30 min → émission sur inactivite$ pour déclencher la modale
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  // ── Token en mémoire ───────────────────────────────────────────────────────
  private _accessToken: string | null = null;

  /** Observable partagé pendant un refresh en cours (évite les appels parallèles). */
  private _refreshObs: Observable<string> | null = null;

  // ── État utilisateur ───────────────────────────────────────────────────────
  /** Utilisateur courant (chargé depuis localStorage au démarrage, token non inclus). */
  readonly currentUser = signal<AuthResponse | null>(this.chargerProfilLocal());

  /** Vrai si un utilisateur est considéré connecté. */
  readonly estConnecte = computed(() => this.currentUser() !== null);

  // ── Inactivité ─────────────────────────────────────────────────────────────
  /** Émet quand l'utilisateur est inactif depuis 30 minutes. */
  readonly inactivite$ = new Subject<void>();

  private readonly DELAI_INACTIVITE = 30 * 60 * 1000; // 30 min
  private _timerInactivite: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  // ── Authentification ───────────────────────────────────────────────────────

  login(dto: LoginDTO): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, dto).pipe(
      tap(res => this.sauvegarderSession(res)),
      catchError(err => throwError(() =>
        new Error(err.error?.message || 'Numéro de téléphone ou mot de passe incorrect')
      ))
    );
  }

  loginAvecOtp(dto: OtpLoginDTO): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login/otp`, dto).pipe(
      tap(res => this.sauvegarderSession(res)),
      catchError(err => throwError(() =>
        new Error(err.error?.message || 'Numéro de téléphone ou code OTP incorrect')
      ))
    );
  }

  register(dto: RegisterDTO): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, dto).pipe(
      tap(res => this.sauvegarderSession(res)),
      catchError(err => throwError(() =>
        new Error(err.error?.message || "Erreur lors de l'inscription")
      ))
    );
  }

  // ── Refresh silencieux ─────────────────────────────────────────────────────

  /**
   * Déclenche un refresh silencieux.
   * Plusieurs appels simultanés partagent le même Observable (pas d'appels parallèles).
   *
   * @returns Observable du nouveau token d'accès
   */
  doRefresh(): Observable<string> {
    if (this._refreshObs) {
      return this._refreshObs;
    }

    this._refreshObs = this.http
      .post<AuthResponse>(`${this.apiUrl}/refresh`, {}, { withCredentials: true })
      .pipe(
        tap(res => this.sauvegarderSession(res)),
        map(res => res.token),
        catchError(err => {
          this.effacerSession();
          return throwError(() => err);
        }),
        finalize(() => { this._refreshObs = null; }),
        shareReplay(1)
      );

    return this._refreshObs;
  }

  /** Vrai si un refresh est déjà en cours (pour éviter le toast dupliqué). */
  isCurrentlyRefreshing(): boolean {
    return this._refreshObs !== null;
  }

  /**
   * Tentative de restauration de session au démarrage de l'app (AppInitializer).
   * Si le cookie refresh est valide → token en mémoire restauré.
   * Sinon → profil localStorage effacé.
   */
  async tenterRestaurationSession(): Promise<void> {
    if (!localStorage.getItem(CLE_USER)) {
      return; // Pas d'utilisateur connu → rien à restaurer
    }

    try {
      const res = await firstValueFrom(
        this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, {}, { withCredentials: true })
      );
      this.sauvegarderSession(res);
    } catch {
      // Cookie expiré ou invalide → on efface le profil local
      localStorage.removeItem(CLE_USER);
      this.currentUser.set(null);
    }
  }

  // ── Déconnexion ────────────────────────────────────────────────────────────

  /** Révoque le refresh token et efface la session locale. */
  logout(): void {
    this.http
      .post(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .subscribe({ error: () => {} }); // Erreur ignorée — on efface quand même
    this.effacerSession();
    this.router.navigate(['/']);
  }

  /** Révoque TOUS les refresh tokens de l'utilisateur (tous les appareils). */
  logoutAllDevices(): Observable<void> {
    return this.http
      .post<void>(`${this.apiUrl}/logout-all`, {}, { withCredentials: true })
      .pipe(
        tap(() => this.effacerSession()),
        map(() => void 0),
        catchError(err => {
          this.effacerSession();
          return throwError(() => err);
        })
      );
  }

  // ── Getters ────────────────────────────────────────────────────────────────

  /** Retourne le token d'accès en mémoire (jamais depuis localStorage). */
  getToken(): string | null {
    return this._accessToken;
  }

  isLoggedIn(): boolean {
    return this.estConnecte();
  }

  hasRole(role: Role): boolean {
    return this.currentUser()?.roles?.includes(role) ?? false;
  }

  // ── Timer d'inactivité ─────────────────────────────────────────────────────

  /** Réinitialise le timer d'inactivité. À appeler sur chaque interaction utilisateur. */
  resetActivityTimer(): void {
    if (!this.estConnecte()) return;

    if (this._timerInactivite !== null) {
      clearTimeout(this._timerInactivite);
    }
    this._timerInactivite = setTimeout(
      () => this.inactivite$.next(),
      this.DELAI_INACTIVITE
    );
  }

  clearActivityTimer(): void {
    if (this._timerInactivite !== null) {
      clearTimeout(this._timerInactivite);
      this._timerInactivite = null;
    }
  }

  // ── Helpers privés ─────────────────────────────────────────────────────────

  private sauvegarderSession(res: AuthResponse): void {
    this._accessToken = res.token;

    // Persister uniquement les données d'affichage (pas le token)
    const profil: UserProfil = {
      telephone: res.telephone,
      nom: res.nom,
      email: res.email,
      roles: res.roles
    };
    localStorage.setItem(CLE_USER, JSON.stringify(profil));
    this.currentUser.set(res);
    this.resetActivityTimer();
  }

  effacerSession(): void {
    this._accessToken = null;
    localStorage.removeItem(CLE_USER);
    this.currentUser.set(null);
    this.clearActivityTimer();
  }

  private chargerProfilLocal(): AuthResponse | null {
    try {
      const data = localStorage.getItem(CLE_USER);
      if (!data) return null;
      const profil = JSON.parse(data) as UserProfil;
      // Token vide — sera restauré par AppInitializer via le cookie refresh
      return { token: '', ...profil };
    } catch {
      return null;
    }
  }
}
