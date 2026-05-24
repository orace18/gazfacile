import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../core/services/auth.service';
import { Role } from '../../../core/models/revendeur.model';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="page-admin">
      <div class="carte-admin">
        <div class="entete">
          <img src="assets/logo.svg" alt="GazFacile" class="logo">
          <h1>Espace Administrateur</h1>
          <p class="sous-titre">Accès réservé</p>
        </div>

        <!-- Écran 1 : Téléphone + PIN -->
        @if (!ecranTotp) {
          <form [formGroup]="formulaire" (ngSubmit)="soumettre()" class="formulaire">

            <mat-form-field appearance="outline" class="champ">
              <mat-label>Numéro de téléphone</mat-label>
              <input matInput formControlName="telephone" placeholder="Ex: 97000000" type="tel">
              <mat-icon matPrefix>phone</mat-icon>
              @if (formulaire.get('telephone')?.invalid && formulaire.get('telephone')?.touched) {
                <mat-error>Le numéro de téléphone est obligatoire</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="champ">
              <mat-label>PIN administrateur</mat-label>
              <input matInput formControlName="pin"
                [type]="mdpVisible ? 'text' : 'password'"
                placeholder="••••••"
                inputmode="numeric"
                maxlength="20"
                autocomplete="current-password">
              <button matSuffix mat-icon-button type="button" (click)="mdpVisible = !mdpVisible">
                <mat-icon>{{ mdpVisible ? 'visibility_off' : 'visibility' }}</mat-icon>
              </button>
              @if (formulaire.get('pin')?.invalid && formulaire.get('pin')?.touched) {
                <mat-error>Le PIN est obligatoire</mat-error>
              }
            </mat-form-field>

            @if (erreur) {
              <div class="erreur">
                <mat-icon>error_outline</mat-icon>
                {{ erreur }}
              </div>
            }

            <button mat-raised-button type="submit" class="btn-connexion"
              [disabled]="formulaire.invalid || envoi">
              @if (envoi) { <mat-spinner diameter="20"></mat-spinner> }
              @else { <mat-icon>lock_open</mat-icon> }
              Se connecter
            </button>
          </form>
        }

        <!-- Écran 2 : Code TOTP (2FA) -->
        @if (ecranTotp) {
          <div class="formulaire">
            <div class="info-2fa">
              <mat-icon class="icone-shield">security</mat-icon>
              <div>
                <strong>Vérification en deux étapes</strong>
                <p>Ouvrez Google Authenticator et saisissez le code à 6 chiffres.</p>
              </div>
            </div>

            <mat-form-field appearance="outline" class="champ">
              <mat-label>Code à 6 chiffres</mat-label>
              <input matInput [formControl]="totpControl"
                placeholder="123456"
                type="text"
                inputmode="numeric"
                maxlength="6"
                autocomplete="one-time-code">
              <mat-icon matPrefix>pin</mat-icon>
              @if (totpControl.invalid && totpControl.touched) {
                <mat-error>Entrez le code à 6 chiffres</mat-error>
              }
            </mat-form-field>

            @if (erreur) {
              <div class="erreur">
                <mat-icon>error_outline</mat-icon>
                {{ erreur }}
              </div>
            }

            <button mat-raised-button class="btn-connexion"
              [disabled]="totpControl.invalid || envoi"
              (click)="verifierTotp()">
              @if (envoi) { <mat-spinner diameter="20"></mat-spinner> }
              @else { <mat-icon>verified_user</mat-icon> }
              Vérifier
            </button>

            <button mat-button class="btn-retour" (click)="retourPin()">
              <mat-icon>arrow_back</mat-icon> Retour
            </button>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .page-admin {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #1a1a2e;
      background-image: linear-gradient(160deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%);
    }

    .carte-admin {
      width: 100%;
      max-width: 400px;
      background: white;
      padding: 44px 40px;
      border-radius: 4px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
    }

    .entete {
      text-align: center;
      margin-bottom: 32px;

      .logo {
        height: 48px;
        width: auto;
        display: block;
        margin: 0 auto 16px;
      }

      h1 {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.4rem;
        font-weight: 700;
        color: #1a1a2e;
        margin-bottom: 4px;
      }

      .sous-titre {
        font-size: 0.82rem;
        color: #999;
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }
    }

    .formulaire {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .champ { width: 100%; }

    .erreur {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      background: #fff0f0;
      color: #d32f2f;
      border-left: 3px solid #d32f2f;
      font-size: 0.88rem;
    }

    .btn-connexion {
      background-color: #0f3460 !important;
      color: white !important;
      height: 50px;
      font-size: 1rem !important;
      font-weight: 700 !important;
      margin-top: 8px;
      text-transform: uppercase;
      letter-spacing: 0.08em;

      &:disabled {
        background-color: #ccc !important;
        color: #999 !important;
      }

    }

    .info-2fa {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      padding: 16px;
      background: #e8f0fe;
      border-radius: 8px;
      border-left: 4px solid #1a73e8;

      .icone-shield {
        color: #1a73e8;
        font-size: 28px;
        width: 28px;
        height: 28px;
        flex-shrink: 0;
        margin-top: 2px;
      }

      strong { display: block; color: #1a1a2e; margin-bottom: 4px; }

      p { margin: 0; font-size: 0.85rem; color: #444; }
    }

    .btn-retour {
      align-self: center;
      color: #666 !important;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
  `]
})
export class AdminLoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  mdpVisible = false;
  envoi = false;
  erreur: string | null = null;
  ecranTotp = false;

  readonly formulaire = this.fb.group({
    telephone: ['', Validators.required],
    pin: ['', Validators.required]
  });

  readonly totpControl = this.fb.control('', [
    Validators.required,
    Validators.pattern(/^\d{6}$/)
  ]);

  soumettre(): void {
    if (this.formulaire.invalid) {
      this.formulaire.markAllAsTouched();
      return;
    }
    this.envoi = true;
    this.erreur = null;
    const { telephone, pin } = this.formulaire.value;

    this.authService.pinLogin({ telephone: telephone!, pin: pin! }).subscribe({
      next: (res) => {
        this.envoi = false;
        if (res.pending2fa) {
          // Le backend demande le code TOTP → afficher l'écran 2FA
          this.ecranTotp = true;
        } else if (this.authService.hasRole(Role.ADMIN)) {
          this.router.navigate(['/admin']);
        } else {
          this.authService.logout();
          this.erreur = 'Accès refusé : vous n\'êtes pas administrateur';
        }
      },
      error: (err: any) => {
        this.envoi = false;
        this.erreur = err.message || 'Identifiants incorrects';
      }
    });
  }

  verifierTotp(): void {
    if (this.totpControl.invalid) {
      this.totpControl.markAsTouched();
      return;
    }
    this.envoi = true;
    this.erreur = null;

    this.authService.totpVerify(this.totpControl.value!).subscribe({
      next: () => {
        this.envoi = false;
        this.router.navigate(['/admin']);
      },
      error: (err: any) => {
        this.envoi = false;
        this.erreur = err.message || 'Code TOTP invalide';
        this.totpControl.reset();
      }
    });
  }

  retourPin(): void {
    this.ecranTotp = false;
    this.erreur = null;
    this.totpControl.reset();
    this.formulaire.get('pin')?.reset();
  }
}
