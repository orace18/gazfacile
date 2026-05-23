import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { WebAuthnHelper } from '../../../core/helpers/webauthn.helper';

/** Écrans possibles dans le composant de connexion. */
type EcranConnexion = 'telephone' | 'choix' | 'pin';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="page-auth">
      <div class="carte-auth">
        <div class="entete-auth">
          <img src="assets/logo.svg" alt="GazFacile" class="logo-auth">
          <h1>Connexion</h1>
          <p class="sous-titre">Connectez-vous à votre compte GazFacile</p>
        </div>

        <!-- Écran 1 : saisie du numéro de téléphone -->
        @if (ecran === 'telephone') {
          <div class="formulaire">
            <mat-form-field appearance="outline" class="champ-pleine-largeur">
              <mat-label>Numéro de téléphone</mat-label>
              <input
                matInput
                [formControl]="telephoneControl"
                placeholder="0197000000"
                type="tel"
                inputmode="numeric"
                autocomplete="tel"
              >
              <div matPrefix class="prefixe-tel">+229</div>
              @if (telephoneControl.invalid && telephoneControl.touched) {
                <mat-error>Entrez un numéro valide. Exemple : 0197000000</mat-error>
              }
            </mat-form-field>

            @if (erreur) {
              <div class="erreur-globale">
                <mat-icon>error_outline</mat-icon>
                {{ erreur }}
              </div>
            }

            <button mat-raised-button type="button" class="btn-principal"
              [disabled]="telephoneControl.invalid || envoi"
              (click)="continuerAvecTelephone()">
              @if (envoi) { <mat-spinner diameter="20"></mat-spinner> }
              @else { <mat-icon>arrow_forward</mat-icon> }
              Continuer
            </button>

          </div>
        }

        <!-- Écran 2 : choix de méthode (WebAuthn ou PIN) -->
        @if (ecran === 'choix') {
          <div class="formulaire">
            <div class="info-telephone">
              <mat-icon>phone_android</mat-icon>
              <span>+229 {{ telephoneLocalAffiche }}</span>
              <button mat-icon-button (click)="retourTelephone()" title="Modifier le numéro">
                <mat-icon>edit</mat-icon>
              </button>
            </div>

            @if (erreur) {
              <div class="erreur-globale">
                <mat-icon>error_outline</mat-icon>
                {{ erreur }}
              </div>
            }

            @if (webAuthnSupporte) {
              <button mat-raised-button type="button" class="btn-biometrique"
                [disabled]="envoi"
                (click)="connecterAvecBiometrie()">
                @if (envoi) { <mat-spinner diameter="20"></mat-spinner> }
                @else { <mat-icon>fingerprint</mat-icon> }
                Se connecter avec empreinte / Face ID
              </button>
            }

            <button mat-stroked-button type="button" class="btn-pin"
              [disabled]="envoi"
              (click)="afficherPin()">
              <mat-icon>pin</mat-icon>
              Utiliser mon PIN
            </button>
          </div>
        }

        <!-- Écran 3 : saisie du PIN -->
        @if (ecran === 'pin') {
          <div class="formulaire">
            <div class="info-telephone">
              <mat-icon>phone_android</mat-icon>
              <span>+229 {{ telephoneLocalAffiche }}</span>
              <button mat-icon-button (click)="retourChoix()" title="Retour">
                <mat-icon>arrow_back</mat-icon>
              </button>
            </div>

            <mat-form-field appearance="outline" class="champ-pleine-largeur">
              <mat-label>PIN 6 chiffres</mat-label>
              <input
                matInput
                [formControl]="pinControl"
                placeholder="••••••"
                type="password"
                inputmode="numeric"
                maxlength="6"
                autocomplete="current-password"
              >
              <mat-icon matPrefix>lock</mat-icon>
              @if (pinControl.invalid && pinControl.touched) {
                <mat-error>Le PIN doit comporter 6 chiffres</mat-error>
              }
            </mat-form-field>

            @if (erreur) {
              <div class="erreur-globale">
                <mat-icon>error_outline</mat-icon>
                {{ erreur }}
              </div>
            }

            <button mat-raised-button type="button" class="btn-principal"
              [disabled]="pinControl.invalid || envoi"
              (click)="connecterAvecPin()">
              @if (envoi) { <mat-spinner diameter="20"></mat-spinner> }
              @else { <mat-icon>login</mat-icon> }
              Se connecter
            </button>

            @if (webAuthnSupporte) {
              <button mat-button type="button" class="btn-secondaire" (click)="retourChoix()">
                <mat-icon>fingerprint</mat-icon>
                Utiliser mon empreinte
              </button>
            }
          </div>
        }

        <div class="lien-inscription">
          <p>Pas encore de compte ?
            <a routerLink="/auth/register">Créer un compte</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-auth {
      min-height: calc(100vh - 64px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px 16px;
      background-color: var(--color-primary);
      background-image: linear-gradient(160deg, var(--color-primary) 60%, var(--color-primary-dark) 100%);
    }

    .carte-auth {
      width: 100%;
      max-width: 420px;
      background: var(--color-surface);
      padding: 44px 40px;
      border-radius: var(--radius-lg, 16px);
      box-shadow: 0 16px 48px rgba(0,0,0,0.25);
    }

    .entete-auth {
      text-align: center;
      margin-bottom: 28px;

      .logo-auth {
        height: 56px;
        width: auto;
        display: block;
        margin: 0 auto 14px;
      }

      h1 {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.6rem;
        font-weight: 700;
        color: var(--color-text);
        margin-bottom: 6px;
      }

      .sous-titre {
        color: var(--color-text-muted);
        font-size: 0.88rem;
      }
    }

    .formulaire {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .champ-pleine-largeur {
      width: 100%;
    }

    .prefixe-tel {
      display: flex;
      align-items: center;
      font-weight: 600;
      color: var(--color-text);
      margin-right: 8px;
    }

    .info-telephone {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 14px;
      background: color-mix(in srgb, var(--color-primary) 8%, white);
      border-radius: 8px;

      mat-icon {
        color: var(--color-primary);
        font-size: 20px;
        width: 20px;
        height: 20px;
      }

      span {
        flex: 1;
        font-weight: 600;
        color: var(--color-text);
        font-size: 0.95rem;
      }
    }

    .btn-principal {
      width: 100%;
      height: 48px;
      background: var(--color-accent) !important;
      color: #fff !important;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .btn-biometrique {
      width: 100%;
      height: 52px;
      background: var(--color-primary) !important;
      color: #fff !important;
      font-weight: 700;
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;

      mat-icon {
        font-size: 24px;
        width: 24px;
        height: 24px;
      }
    }

    .btn-pin {
      width: 100%;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-weight: 600;
    }

    .btn-secondaire {
      align-self: center;
      color: var(--color-primary) !important;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .erreur-globale {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 14px;
      background: rgba(244, 67, 54, 0.08);
      border-radius: 8px;
      color: #c62828;
      font-size: 0.88rem;

      mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
        flex-shrink: 0;
      }
    }

    .lien-inscription {
      text-align: center;
      margin-top: 24px;

      p {
        margin: 0 0 8px;
        color: var(--color-text-muted);
        font-size: 0.88rem;
      }

      a {
        color: var(--color-primary);
        font-weight: 600;
        text-decoration: none;
      }
    }

    @media (max-width: 640px) {
      .carte-auth {
        padding: 34px 24px;
      }
    }
  `]
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);

  ecran: EcranConnexion = 'telephone';
  envoi = false;
  erreur: string | null = null;

  readonly webAuthnSupporte = WebAuthnHelper.isSupported();

  readonly telephoneControl = this.fb.control('', [
    Validators.required,
    Validators.pattern(/^(\+229|00229)?\s*\d{10}$/)
  ]);

  readonly pinControl = this.fb.control('', [
    Validators.required,
    Validators.pattern(/^\d{6}$/)
  ]);

  get telephoneLocalAffiche(): string {
    return this.normaliserTelephoneLocal(this.telephoneControl.value || '');
  }

  // ── Navigation entre écrans ───────────────────────────────────────────────

  continuerAvecTelephone(): void {
    if (this.telephoneControl.invalid) {
      this.telephoneControl.markAsTouched();
      return;
    }
    this.erreur = null;
    this.ecran = 'choix';
  }

  afficherPin(): void {
    this.erreur = null;
    this.pinControl.reset();
    this.ecran = 'pin';
  }

  retourTelephone(): void {
    this.erreur = null;
    this.ecran = 'telephone';
  }

  retourChoix(): void {
    this.erreur = null;
    this.ecran = 'choix';
  }

  // ── Connexion WebAuthn ────────────────────────────────────────────────────

  async connecterAvecBiometrie(): Promise<void> {
    this.envoi = true;
    this.erreur = null;

    try {
      const telephone = this.normaliserTelephoneLocal(this.telephoneControl.value!);

      // Étape 1 : obtenir les options d'authentification
      const options = await firstValueFrom(
        this.authService.startWebAuthnLogin({ telephone })
      );

      // Étape 2 : invoquer l'authenticateur (empreinte, Face ID, etc.)
      const assertion = await WebAuthnHelper.loginWithBiometric(options);

      // Étape 3 : valider l'assertion côté backend
      await firstValueFrom(
        this.authService.finishWebAuthnLogin({ telephone, assertion })
      );

      this.naviguerRetour();
    } catch (err: any) {
      if (err?.name === 'NotAllowedError') {
        this.erreur = "Authentification annulée. Réessayez.";
      } else {
        this.erreur = err?.message || 'Empreinte non reconnue';
      }
    } finally {
      this.envoi = false;
    }
  }

  // ── Connexion PIN ─────────────────────────────────────────────────────────

  connecterAvecPin(): void {
    if (this.pinControl.invalid) {
      this.pinControl.markAsTouched();
      return;
    }

    this.envoi = true;
    this.erreur = null;

    this.authService.pinLogin({
      telephone: this.normaliserTelephoneLocal(this.telephoneControl.value!),
      pin: this.pinControl.value!
    }).subscribe({
      next: () => {
        this.envoi = false;
        this.naviguerRetour();
      },
      error: err => {
        this.envoi = false;
        this.erreur = err.message || 'PIN incorrect';
      }
    });
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  private naviguerRetour(): void {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.router.navigate([returnUrl]);
  }

  private normaliserTelephoneLocal(telephone: string): string {
    return telephone.replace(/^\+229/, '').replace(/^00229/, '').replace(/\s/g, '').trim();
  }
}
