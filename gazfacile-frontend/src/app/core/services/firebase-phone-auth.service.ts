import { Injectable } from '@angular/core';
import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  Auth,
  ConfirmationResult,
  RecaptchaVerifier,
  getAuth,
  inMemoryPersistence,
  setPersistence,
  signInWithPhoneNumber,
  signOut
} from 'firebase/auth';
import { Observable, catchError, from, map, switchMap, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

interface FirebaseWebConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  appId: string;
  messagingSenderId?: string;
}

export interface FirebasePhoneVerification {
  firebaseIdToken: string;
  telephone: string;
  uid: string;
}

@Injectable({ providedIn: 'root' })
export class FirebasePhoneAuthService {
  private readonly firebaseConfig = ((environment as { firebase?: Partial<FirebaseWebConfig> }).firebase ?? {}) as Partial<FirebaseWebConfig>;
  private readonly auth: Auth | null;

  private recaptchaVerifier: RecaptchaVerifier | null = null;
  private recaptchaContainerId: string | null = null;
  private confirmationResult: ConfirmationResult | null = null;

  constructor() {
    if (!this.configEstValide()) {
      this.auth = null;
      return;
    }

    const app = getApps().length ? getApp() : initializeApp(this.firebaseConfig as FirebaseWebConfig);
    this.auth = getAuth(app);
    this.auth.languageCode = 'fr';
    void setPersistence(this.auth, inMemoryPersistence).catch(() => undefined);
  }

  estConfigure(): boolean {
    return this.auth !== null;
  }

  envoyerCode(telephone: string, recaptchaContainerId: string): Observable<void> {
    if (!this.auth) {
      return throwError(() => new Error('La vérification SMS Firebase n’est pas configurée.'));
    }

    const telephoneInternational = this.normaliserTelephone(telephone);
    // TODO: retirer ce log après debug MTN
    console.log('[FirebaseOTP] Envoi vers :', telephoneInternational);
    const verifier = this.obtenirRecaptchaVerifier(recaptchaContainerId);

    return from(signInWithPhoneNumber(this.auth, telephoneInternational, verifier)).pipe(
      tap((confirmationResult) => {
        this.confirmationResult = confirmationResult;
      }),
      map(() => void 0),
      catchError((error: unknown) => {
        const code = typeof error === 'object' && error && 'code' in error ? String((error as { code: string }).code) : '';
        // TODO: retirer ce log après debug MTN
        console.error('[FirebaseOTP] Erreur code:', code, 'Message:', error);
        this.reinitialiserRecaptcha();
        return throwError(() => new Error(this.mapperErreurFirebase(error)));
      })
    );
  }

  verifierCode(code: string): Observable<FirebasePhoneVerification> {
    if (!this.confirmationResult) {
      return throwError(() => new Error('Veuillez demander un code SMS avant de continuer.'));
    }

    return from(this.confirmationResult.confirm(code)).pipe(
      switchMap((credential) => from(credential.user.getIdToken()).pipe(
        map((firebaseIdToken) => ({
          firebaseIdToken,
          telephone: credential.user.phoneNumber ?? '',
          uid: credential.user.uid
        }))
      )),
      tap(() => {
        this.confirmationResult = null;
      }),
      catchError((error: unknown) => {
        return throwError(() => new Error(this.mapperErreurFirebase(error)));
      })
    );
  }

  reinitialiser(): void {
    this.confirmationResult = null;
    this.reinitialiserRecaptcha();

    if (this.auth?.currentUser) {
      void signOut(this.auth).catch(() => undefined);
    }
  }

  private configEstValide(): boolean {
    return Boolean(
      this.firebaseConfig.apiKey &&
      this.firebaseConfig.authDomain &&
      this.firebaseConfig.projectId &&
      this.firebaseConfig.appId
    );
  }

  private obtenirRecaptchaVerifier(containerId: string): RecaptchaVerifier {
    if (this.recaptchaVerifier && this.recaptchaContainerId === containerId) {
      return this.recaptchaVerifier;
    }

    this.reinitialiserRecaptcha();

    if (!this.auth) {
      throw new Error('La vérification SMS Firebase n’est pas configurée.');
    }

    this.recaptchaContainerId = containerId;
    this.recaptchaVerifier = new RecaptchaVerifier(this.auth, containerId, {
      size: 'normal',
      callback: () => undefined,
      'expired-callback': () => {
        this.reinitialiserRecaptcha();
      }
    });

    return this.recaptchaVerifier;
  }

  private reinitialiserRecaptcha(): void {
    this.recaptchaVerifier?.clear();
    this.recaptchaVerifier = null;
    this.recaptchaContainerId = null;
  }

  private normaliserTelephone(telephone: string): string {
    const local = telephone.replace(/^\+229/, '').replace(/^00229/, '').replace(/\s/g, '').trim();
    return `+229${local}`;
  }

  private mapperErreurFirebase(error: unknown): string {
    const code = typeof error === 'object' && error && 'code' in error
      ? String(error.code)
      : '';
    const host = typeof window !== 'undefined' ? window.location.hostname : '';

    switch (code) {
      case 'auth/invalid-phone-number':
        return 'Le numéro de téléphone est invalide.';
      case 'auth/missing-phone-number':
        return 'Le numéro de téléphone est obligatoire.';
      case 'auth/operation-not-allowed':
        return 'L’authentification par téléphone n’est pas activée dans Firebase.';
      case 'auth/unauthorized-domain':
      case 'auth/app-not-authorized':
        return host
          ? `Le domaine ${host} n’est pas autorisé dans Firebase Authentication.`
          : 'Le domaine courant n’est pas autorisé dans Firebase Authentication.';
      case 'auth/invalid-app-credential':
      case 'auth/missing-app-credential':
        return 'Le reCAPTCHA Firebase est invalide ou expiré. Rechargez la page puis réessayez.';
      case 'auth/too-many-requests':
        return 'Trop de tentatives. Réessayez dans quelques minutes.';
      case 'auth/quota-exceeded':
        return 'Le quota SMS Firebase est atteint. Vérifiez votre configuration.';
      case 'auth/invalid-verification-code':
        return 'Le code OTP est incorrect.';
      case 'auth/code-expired':
        return 'Le code OTP a expiré. Demandez-en un nouveau.';
      case 'auth/captcha-check-failed':
        return 'La vérification reCAPTCHA a échoué. Réessayez.';
      case 'auth/network-request-failed':
        return 'Connexion réseau impossible. Réessayez.';
      default:
        return code
          ? `La vérification SMS a échoué (${code}). Vérifiez la configuration Firebase.`
          : 'La vérification SMS a échoué. Vérifiez la configuration Firebase.';
    }
  }
}
