import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../core/services/auth.service';
import { OtpService } from '../../../core/services/otp.service';

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
          <p class="sous-titre">Connectez-vous avec votre numéro de téléphone</p>
        </div>

        <div class="bloc-otp">
          <mat-form-field appearance="outline" class="champ-pleine-largeur">
            <mat-label>Numéro de téléphone</mat-label>
            <input
              matInput
              [formControl]="telephoneControl"
              placeholder="0197000000"
              type="tel"
              [readonly]="otpEnvoye"
            >
            <div matPrefix class="prefixe-tel">+229</div>
            @if (telephoneControl.invalid && telephoneControl.touched) {
              <mat-error>Entrez un numéro valide. Exemple: 0197000000</mat-error>
            }
          </mat-form-field>

          @if (otpEnvoye) {
            <div class="otp-info">
              <mat-icon>phone_android</mat-icon>
              <p>Code envoyé au <strong>+229 {{ telephoneLocalAffiche }}</strong></p>
            </div>

            <mat-form-field appearance="outline" class="champ-pleine-largeur">
              <mat-label>Code OTP</mat-label>
              <input
                matInput
                [formControl]="otpControl"
                placeholder="123456"
                maxlength="6"
                type="tel"
                inputmode="numeric"
                autocomplete="one-time-code"
              >
              <mat-icon matPrefix>lock</mat-icon>
              @if (otpControl.invalid && otpControl.touched) {
                <mat-error>Le code doit comporter 6 chiffres</mat-error>
              }
            </mat-form-field>
          }

          @if (erreur) {
            <div class="erreur-globale">
              <mat-icon>error_outline</mat-icon>
              {{ erreur }}
            </div>
          }

          @if (!otpEnvoye) {
            <button mat-raised-button type="button" class="btn-connexion"
              [disabled]="telephoneControl.invalid || envoiOtp"
              (click)="demanderOtpConnexion()">
              @if (envoiOtp) { <mat-spinner diameter="20"></mat-spinner> }
              @else { <mat-icon>sms</mat-icon> }
              Recevoir le code SMS
            </button>
          }

          @if (otpEnvoye) {
            <button mat-raised-button type="button" class="btn-connexion"
              [disabled]="otpControl.invalid || envoi"
              (click)="connecterAvecOtp()">
              @if (envoi) { <mat-spinner diameter="20"></mat-spinner> }
              @else { <mat-icon>login</mat-icon> }
              Se connecter
            </button>

            <button mat-button type="button" class="btn-secondaire" [disabled]="envoiOtp" (click)="demanderOtpConnexion()">
              @if (envoiOtp) { <mat-spinner diameter="14"></mat-spinner> }
              Renvoyer le code
            </button>

            <button mat-button type="button" class="btn-secondaire" (click)="modifierNumeroConnexion()">
              <mat-icon>edit</mat-icon>
              Modifier le numéro
            </button>
          }
        </div>

        <div class="lien-inscription">
          <p>Pas encore de compte ?
            <a routerLink="/auth/register">Créer un compte</a>
          </p>
          <p class="lien-revendeur">
            Vous êtes administrateur ? Utilisez la page <a routerLink="/admin/login">admin</a>.
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

    .bloc-otp {
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

    .otp-info {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 14px;
      background: color-mix(in srgb, var(--color-primary) 8%, white);

      mat-icon {
        color: var(--color-primary);
      }

      p {
        margin: 0;
        color: var(--color-text);
        font-size: 0.9rem;
      }
    }

    .btn-connexion {
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
      color: #c62828;
      font-size: 0.88rem;

      mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
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
  private readonly otpService = inject(OtpService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);

  envoi = false;
  envoiOtp = false;
  otpEnvoye = false;
  erreur: string | null = null;

  readonly telephoneControl = this.fb.control('', [
    Validators.required,
    Validators.pattern(/^(\+229|00229)?\s*\d{10}$/)
  ]);

  readonly otpControl = this.fb.control('', [
    Validators.required,
    Validators.pattern(/^\d{6}$/)
  ]);

  get telephoneLocalAffiche(): string {
    return this.normaliserTelephoneLocal(this.telephoneControl.value || '');
  }

  demanderOtpConnexion(): void {
    if (this.telephoneControl.invalid) {
      this.telephoneControl.markAsTouched();
      return;
    }

    this.envoiOtp = true;
    this.erreur = null;

    this.otpService.envoyer(this.normaliserTelephoneLocal(this.telephoneControl.value!)).subscribe({
      next: () => {
        this.envoiOtp = false;
        this.otpEnvoye = true;
        this.otpControl.reset();
      },
      error: err => {
        this.envoiOtp = false;
        this.erreur = err.message || 'Impossible d\'envoyer le code OTP';
      }
    });
  }

  connecterAvecOtp(): void {
    if (this.otpControl.invalid) {
      this.otpControl.markAsTouched();
      return;
    }

    this.envoi = true;
    this.erreur = null;

    this.authService.loginAvecOtp({
      telephone: this.normaliserTelephoneLocal(this.telephoneControl.value!),
      code: this.otpControl.value!
    }).subscribe({
      next: () => {
        this.envoi = false;
        this.naviguerRetour();
      },
      error: err => {
        this.envoi = false;
        this.erreur = err.message || 'Connexion impossible';
      }
    });
  }

  modifierNumeroConnexion(): void {
    this.otpEnvoye = false;
    this.erreur = null;
    this.otpControl.reset();
  }

  private naviguerRetour(): void {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.router.navigate([returnUrl]);
  }

  private normaliserTelephoneLocal(telephone: string): string {
    return telephone.replace(/^\+229/, '').replace(/^00229/, '').replace(/\s/g, '').trim();
  }
}
