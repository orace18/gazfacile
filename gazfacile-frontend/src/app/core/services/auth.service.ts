import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable, Subject, catchError, finalize, firstValueFrom,
  map, of, shareReplay, tap, throwError
} from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import {
  AuthResponse, RegisterDTO, Role,
  WebAuthnRegisterStartDTO, WebAuthnRegisterFinishDTO,
  WebAuthnLoginStartDTO, WebAuthnLoginFinishDTO,
  PinLoginDTO, PinSetupDTO
} from '../models/revendeur.model';

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
 * Service d'authentification GazFacile.
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
  /** Token temporaire 2FA en attente (valable 5 min, non persisté). */
  private _pendingToken: string | null = null;

  /** Observable partagé pendant un refresh en cours (évite les appels parallèles). */
  private _refreshObs: Observable<string> | null = null;

  /** Restauration de session au démarrage (résolue immédiatement si aucune). */
  private _sessionRestauree: Promise<void> = Promise.resolve();

  // ── État utilisateur ───────────────────────────────────────────────────────
  readonly currentUser = signal<AuthResponse | null>(this.chargerProfilLocal());
  readonly estConnecte = computed(() => this.currentUser() !== null);

  // ── Inactivité ─────────────────────────────────────────────────────────────
  readonly inactivite$ = new Subject<void>();

  private readonly DELAI_INACTIVITE = 30 * 60 * 1000;
  private _timerInactivite: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  // ── WebAuthn — Inscription ─────────────────────────────────────────────────

  /** Étape 1 : obtient les options de création de credential. */
  startWebAuthnRegistration(dto: WebAuthnRegisterStartDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/webauthn/register/start`, dto).pipe(
      catchError(err => throwError(() =>
        new Error(err.error?.message || "Impossible de démarrer l'enregistrement biométrique")
      ))
    );
  }

  /** Étape 2 : envoie le credential créé et obtient le JWT. */
  finishWebAuthnRegistration(dto: WebAuthnRegisterFinishDTO): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/webauthn/register/finish`, dto).pipe(
      tap(res => this.sauvegarderSession(res)),
      catchError(err => throwError(() =>
        new Error(err.error?.message || "Enregistrement de l'empreinte échoué. Réessayez.")
      ))
    );
  }

  // ── WebAuthn — Connexion ───────────────────────────────────────────────────

  /** Étape 1 : obtient les options d'authentification. */
  startWebAuthnLogin(dto: WebAuthnLoginStartDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/webauthn/login/start`, dto).pipe(
      catchError(err => throwError(() =>
        new Error(err.error?.message || 'Aucune empreinte enregistrée pour ce numéro')
      ))
    );
  }

  /** Étape 2 : envoie l'assertion et obtient le JWT. */
  finishWebAuthnLogin(dto: WebAuthnLoginFinishDTO): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/webauthn/login/finish`, dto).pipe(
      tap(res => this.sauvegarderSession(res)),
      catchError(err => throwError(() =>
        new Error(err.error?.message || 'Empreinte non reconnue')
      ))
    );
  }

  // ── PIN ────────────────────────────────────────────────────────────────────

  /** Connexion par PIN 6 chiffres. */
  pinLogin(dto: PinLoginDTO): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/pin/login`, dto).pipe(
      tap(res => {
        if (res.pending2fa) {
          // Stocker le token temporaire pour le step TOTP — ne pas créer de session
          this._pendingToken = res.token;
        } else {
          this.sauvegarderSession(res);
        }
      }),
      catchError(err => throwError(() =>
        new Error(
          err.error?.erreurs?.pin
          || err.error?.erreurs?.telephone
          || err.error?.message
          || 'PIN incorrect'
        )
      ))
    );
  }

  // ── TOTP 2FA ───────────────────────────────────────────────────────────────

  /** Initie le setup TOTP : retourne l'URI otpauth:// et le secret brut. */
  totpSetup(): Observable<{ otpauthUri: string; secret: string }> {
    return this.http.post<{ otpauthUri: string; secret: string }>(
      `${this.apiUrl}/totp/setup`, {}
    ).pipe(catchError(err => throwError(() => new Error(err.error?.message || 'Erreur setup 2FA'))));
  }

  /** Confirme le setup avec un premier code valide — active le 2FA. */
  totpConfirm(code: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/totp/confirm`, { code }).pipe(
      catchError(err => throwError(() => new Error(err.error?.message || 'Code TOTP invalide')))
    );
  }

  /** Vérifie le code TOTP avec le token pending — retourne le JWT complet. */
  totpVerify(code: string): Observable<AuthResponse> {
    const token = this._pendingToken;
    this._pendingToken = null;
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/totp/verify`, { code },
      { headers: { Authorization: `Bearer ${token}` } }
    ).pipe(
      tap(res => this.sauvegarderSession(res)),
      catchError(err => throwError(() => new Error(err.error?.message || 'Code TOTP invalide')))
    );
  }

  /** Désactive le 2FA après vérification d'un code valide. */
  totpDisable(code: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/totp/disable`, { code }).pipe(
      catchError(err => throwError(() => new Error(err.error?.message || 'Code invalide')))
    );
  }

  /** Configure un PIN pour l'utilisateur connecté (access token requis). */
  setupPin(dto: PinSetupDTO): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/pin/setup`, dto).pipe(
      catchError(err => throwError(() =>
        new Error(err.error?.message || 'Impossible de configurer le PIN')
      ))
    );
  }

  // ── Inscription simplifiée ─────────────────────────────────────────────────

  /** Inscription sans vérification biométrique (fallback total). */
  inscrireSimple(dto: RegisterDTO): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register/simple`, dto).pipe(
      tap(res => this.sauvegarderSession(res)),
      catchError(err => throwError(() =>
        new Error(err.error?.message || "Erreur lors de l'inscription")
      ))
    );
  }

  // ── Détection WebAuthn ─────────────────────────────────────────────────────

  /** Vérifie si le navigateur supporte WebAuthn / Passkeys. */
  isWebAuthnSupported(): boolean {
    return typeof window !== 'undefined'
      && !!navigator.credentials
      && !!window.PublicKeyCredential;
  }

  // ── Refresh silencieux ─────────────────────────────────────────────────────

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

  isCurrentlyRefreshing(): boolean {
    return this._refreshObs !== null;
  }

  /**
   * Restaure la session via le cookie HttpOnly. Passe par doRefresh() pour que
   * l'intercepteur puisse attendre ce refresh au lieu de bloquer le démarrage.
   */
  async tenterRestaurationSession(): Promise<void> {
    if (!localStorage.getItem(CLE_USER)) {
      return;
    }

    try {
      await firstValueFrom(this.doRefresh());
    } catch {
      // doRefresh() a déjà effacé la session
    }
  }

  /** Résout quand la restauration de session lancée au démarrage est terminée. */
  attendreSession(): Promise<void> {
    return this._sessionRestauree;
  }

  /** Lance la restauration sans bloquer l'affichage (appelé par APP_INITIALIZER). */
  demarrerRestaurationSession(): void {
    this._sessionRestauree = this.tenterRestaurationSession();
  }

  // ── Déconnexion ────────────────────────────────────────────────────────────

  logout(): void {
    this.http
      .post(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .subscribe({ error: () => {} });
    this.effacerSession();
    this.router.navigate(['/']);
  }

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

  sauvegarderSession(res: AuthResponse): void {
    this._accessToken = res.token;

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
      return { token: '', ...profil };
    } catch {
      return null;
    }
  }
}
