import {
  environment
} from "./chunk-AH3PCQNR.js";
import {
  Router
} from "./chunk-C43TOPVJ.js";
import {
  HttpClient,
  Subject,
  __async,
  __spreadValues,
  catchError,
  computed,
  finalize,
  firstValueFrom,
  map,
  shareReplay,
  signal,
  tap,
  throwError,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-XDS62WGT.js";

// src/app/core/services/auth.service.ts
var CLE_USER = "gf_user";
var AuthService = class _AuthService {
  constructor(http, router) {
    this.http = http;
    this.router = router;
    this.apiUrl = `${environment.apiUrl}/auth`;
    this._accessToken = null;
    this._pendingToken = null;
    this._refreshObs = null;
    this.currentUser = signal(this.chargerProfilLocal());
    this.estConnecte = computed(() => this.currentUser() !== null);
    this.inactivite$ = new Subject();
    this.DELAI_INACTIVITE = 30 * 60 * 1e3;
    this._timerInactivite = null;
  }
  // ── WebAuthn — Inscription ─────────────────────────────────────────────────
  /** Étape 1 : obtient les options de création de credential. */
  startWebAuthnRegistration(dto) {
    return this.http.post(`${this.apiUrl}/webauthn/register/start`, dto).pipe(catchError((err) => throwError(() => new Error(err.error?.message || "Impossible de d\xE9marrer l'enregistrement biom\xE9trique"))));
  }
  /** Étape 2 : envoie le credential créé et obtient le JWT. */
  finishWebAuthnRegistration(dto) {
    return this.http.post(`${this.apiUrl}/webauthn/register/finish`, dto).pipe(tap((res) => this.sauvegarderSession(res)), catchError((err) => throwError(() => new Error(err.error?.message || "Enregistrement de l'empreinte \xE9chou\xE9. R\xE9essayez."))));
  }
  // ── WebAuthn — Connexion ───────────────────────────────────────────────────
  /** Étape 1 : obtient les options d'authentification. */
  startWebAuthnLogin(dto) {
    return this.http.post(`${this.apiUrl}/webauthn/login/start`, dto).pipe(catchError((err) => throwError(() => new Error(err.error?.message || "Aucune empreinte enregistr\xE9e pour ce num\xE9ro"))));
  }
  /** Étape 2 : envoie l'assertion et obtient le JWT. */
  finishWebAuthnLogin(dto) {
    return this.http.post(`${this.apiUrl}/webauthn/login/finish`, dto).pipe(tap((res) => this.sauvegarderSession(res)), catchError((err) => throwError(() => new Error(err.error?.message || "Empreinte non reconnue"))));
  }
  // ── PIN ────────────────────────────────────────────────────────────────────
  /** Connexion par PIN 6 chiffres. */
  pinLogin(dto) {
    return this.http.post(`${this.apiUrl}/pin/login`, dto).pipe(tap((res) => {
      if (res.pending2fa) {
        this._pendingToken = res.token;
      } else {
        this.sauvegarderSession(res);
      }
    }), catchError((err) => throwError(() => new Error(err.error?.erreurs?.pin || err.error?.erreurs?.telephone || err.error?.message || "PIN incorrect"))));
  }
  // ── TOTP 2FA ───────────────────────────────────────────────────────────────
  /** Initie le setup TOTP : retourne l'URI otpauth:// et le secret brut. */
  totpSetup() {
    return this.http.post(`${this.apiUrl}/totp/setup`, {}).pipe(catchError((err) => throwError(() => new Error(err.error?.message || "Erreur setup 2FA"))));
  }
  /** Confirme le setup avec un premier code valide — active le 2FA. */
  totpConfirm(code) {
    return this.http.post(`${this.apiUrl}/totp/confirm`, { code }).pipe(catchError((err) => throwError(() => new Error(err.error?.message || "Code TOTP invalide"))));
  }
  /** Vérifie le code TOTP avec le token pending — retourne le JWT complet. */
  totpVerify(code) {
    const token = this._pendingToken;
    this._pendingToken = null;
    return this.http.post(`${this.apiUrl}/totp/verify`, { code }, { headers: { Authorization: `Bearer ${token}` } }).pipe(tap((res) => this.sauvegarderSession(res)), catchError((err) => throwError(() => new Error(err.error?.message || "Code TOTP invalide"))));
  }
  /** Désactive le 2FA après vérification d'un code valide. */
  totpDisable(code) {
    return this.http.post(`${this.apiUrl}/totp/disable`, { code }).pipe(catchError((err) => throwError(() => new Error(err.error?.message || "Code invalide"))));
  }
  /** Configure un PIN pour l'utilisateur connecté (access token requis). */
  setupPin(dto) {
    return this.http.post(`${this.apiUrl}/pin/setup`, dto).pipe(catchError((err) => throwError(() => new Error(err.error?.message || "Impossible de configurer le PIN"))));
  }
  // ── Inscription simplifiée ─────────────────────────────────────────────────
  /** Inscription sans vérification biométrique (fallback total). */
  inscrireSimple(dto) {
    return this.http.post(`${this.apiUrl}/register/simple`, dto).pipe(tap((res) => this.sauvegarderSession(res)), catchError((err) => throwError(() => new Error(err.error?.message || "Erreur lors de l'inscription"))));
  }
  // ── Détection WebAuthn ─────────────────────────────────────────────────────
  /** Vérifie si le navigateur supporte WebAuthn / Passkeys. */
  isWebAuthnSupported() {
    return typeof window !== "undefined" && !!navigator.credentials && !!window.PublicKeyCredential;
  }
  // ── Refresh silencieux ─────────────────────────────────────────────────────
  doRefresh() {
    if (this._refreshObs) {
      return this._refreshObs;
    }
    this._refreshObs = this.http.post(`${this.apiUrl}/refresh`, {}, { withCredentials: true }).pipe(tap((res) => this.sauvegarderSession(res)), map((res) => res.token), catchError((err) => {
      this.effacerSession();
      return throwError(() => err);
    }), finalize(() => {
      this._refreshObs = null;
    }), shareReplay(1));
    return this._refreshObs;
  }
  isCurrentlyRefreshing() {
    return this._refreshObs !== null;
  }
  tenterRestaurationSession() {
    return __async(this, null, function* () {
      if (!localStorage.getItem(CLE_USER)) {
        return;
      }
      try {
        const res = yield firstValueFrom(this.http.post(`${this.apiUrl}/refresh`, {}, { withCredentials: true }));
        this.sauvegarderSession(res);
      } catch {
        localStorage.removeItem(CLE_USER);
        this.currentUser.set(null);
      }
    });
  }
  // ── Déconnexion ────────────────────────────────────────────────────────────
  logout() {
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe({ error: () => {
    } });
    this.effacerSession();
    this.router.navigate(["/"]);
  }
  logoutAllDevices() {
    return this.http.post(`${this.apiUrl}/logout-all`, {}, { withCredentials: true }).pipe(tap(() => this.effacerSession()), map(() => void 0), catchError((err) => {
      this.effacerSession();
      return throwError(() => err);
    }));
  }
  // ── Getters ────────────────────────────────────────────────────────────────
  getToken() {
    return this._accessToken;
  }
  isLoggedIn() {
    return this.estConnecte();
  }
  hasRole(role) {
    return this.currentUser()?.roles?.includes(role) ?? false;
  }
  // ── Timer d'inactivité ─────────────────────────────────────────────────────
  resetActivityTimer() {
    if (!this.estConnecte())
      return;
    if (this._timerInactivite !== null) {
      clearTimeout(this._timerInactivite);
    }
    this._timerInactivite = setTimeout(() => this.inactivite$.next(), this.DELAI_INACTIVITE);
  }
  clearActivityTimer() {
    if (this._timerInactivite !== null) {
      clearTimeout(this._timerInactivite);
      this._timerInactivite = null;
    }
  }
  // ── Helpers privés ─────────────────────────────────────────────────────────
  sauvegarderSession(res) {
    this._accessToken = res.token;
    const profil = {
      telephone: res.telephone,
      nom: res.nom,
      email: res.email,
      roles: res.roles
    };
    localStorage.setItem(CLE_USER, JSON.stringify(profil));
    this.currentUser.set(res);
    this.resetActivityTimer();
  }
  effacerSession() {
    this._accessToken = null;
    localStorage.removeItem(CLE_USER);
    this.currentUser.set(null);
    this.clearActivityTimer();
  }
  chargerProfilLocal() {
    try {
      const data = localStorage.getItem(CLE_USER);
      if (!data)
        return null;
      const profil = JSON.parse(data);
      return __spreadValues({ token: "" }, profil);
    } catch {
      return null;
    }
  }
  static {
    this.\u0275fac = function AuthService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuthService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(Router));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
  }
};

export {
  AuthService
};
//# sourceMappingURL=chunk-EVRMIEST.js.map
