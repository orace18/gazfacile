import {
  startRegistration,
  startAuthentication,
  browserSupportsWebAuthn,
  type RegistrationResponseJSON,
  type AuthenticationResponseJSON
} from '@simplewebauthn/browser';

/**
 * Wrapper autour de @simplewebauthn/browser.
 * Centralise les appels WebAuthn (Passkeys) et la détection de support.
 */
export class WebAuthnHelper {

  /**
   * Vérifie si le navigateur supporte WebAuthn / Passkeys.
   */
  static isSupported(): boolean {
    return typeof window !== 'undefined' && browserSupportsWebAuthn();
  }

  /**
   * Lance la création d'un credential biométrique (inscription).
   * @param options Options retournées par POST /auth/webauthn/register/start
   * @returns La réponse d'inscription à envoyer à POST /auth/webauthn/register/finish
   */
  static async registerWithBiometric(options: any): Promise<RegistrationResponseJSON> {
    return await startRegistration({ optionsJSON: options });
  }

  /**
   * Lance l'authentification biométrique (connexion).
   * @param options Options retournées par POST /auth/webauthn/login/start
   * @returns La réponse d'authentification à envoyer à POST /auth/webauthn/login/finish
   */
  static async loginWithBiometric(options: any): Promise<AuthenticationResponseJSON> {
    return await startAuthentication({ optionsJSON: options });
  }
}
