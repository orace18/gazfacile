import { Component, inject, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../core/services/auth.service';
import { GoogleAuthService } from '../../../core/services/google-auth.service';

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
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  template: `
    <div class="page-auth">
      <div class="carte-auth">
        <div class="entete-auth">
          <span class="logo-flamme">🔥</span>
          <h1>Connexion</h1>
          <p class="sous-titre">Accédez à votre espace GazFacile</p>
        </div>

        <!-- Bouton Google -->
        <div class="bloc-google">
          <div #googleBtn class="google-btn-container"></div>
          @if (googleErreur) {
            <p class="erreur-google">{{ googleErreur }}</p>
          }
        </div>

        <mat-divider class="separateur">
          <span class="separateur-texte">ou</span>
        </mat-divider>

        <!-- Formulaire classique -->
        <form [formGroup]="formulaire" (ngSubmit)="soumettre()" class="formulaire">

          <mat-form-field appearance="outline" class="champ-pleine-largeur">
            <mat-label>Numéro de téléphone</mat-label>
            <input matInput formControlName="telephone" placeholder="Ex: 97000000" type="tel">
            <div matPrefix class="prefixe-tel">+229</div>
            @if (formulaire.get('telephone')?.invalid && formulaire.get('telephone')?.touched) {
              <mat-error>Le numéro de téléphone est obligatoire</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" class="champ-pleine-largeur">
            <mat-label>Mot de passe</mat-label>
            <input matInput formControlName="password"
              [type]="mdpVisible ? 'text' : 'password'"
              placeholder="Votre mot de passe">
            <button matSuffix mat-icon-button type="button" (click)="mdpVisible = !mdpVisible">
              <mat-icon>{{ mdpVisible ? 'visibility_off' : 'visibility' }}</mat-icon>
            </button>
            @if (formulaire.get('password')?.invalid && formulaire.get('password')?.touched) {
              <mat-error>Le mot de passe est obligatoire</mat-error>
            }
          </mat-form-field>

          @if (erreur) {
            <div class="erreur-globale">
              <mat-icon>error_outline</mat-icon>
              {{ erreur }}
            </div>
          }

          <button mat-raised-button type="submit" class="btn-connexion"
            [disabled]="formulaire.invalid || envoi">
            @if (envoi) { <mat-spinner diameter="20"></mat-spinner> }
            @else { <mat-icon>login</mat-icon> }
            Se connecter
          </button>
        </form>

        <div class="lien-inscription">
          <p>Pas encore de compte ?
            <a routerLink="/auth/register">Créer un compte</a>
          </p>
          <p class="lien-revendeur">
            Vous êtes revendeur ? Inscrivez votre dépôt après connexion.
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
      border-radius: 0;
      padding: 44px 40px;
      box-shadow: 0 16px 48px rgba(0,0,0,0.25);
    }

    .entete-auth {
      text-align: center;
      margin-bottom: 28px;

      .logo-flamme { font-size: 2rem; display: block; margin-bottom: 10px; }

      h1 {
        font-family: 'Archivo Black', sans-serif;
        font-size: 1.6rem;
        font-weight: 400;
        color: var(--color-text);
        margin-bottom: 6px;
      }

      .sous-titre { color: var(--color-text-muted); font-size: 0.88rem; }
    }

    .bloc-google {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      margin-bottom: 16px;
    }

    .google-btn-container {
      width: 100%;
      display: flex;
      justify-content: center;

      ::ng-deep iframe { width: 100% !important; }
    }

    .erreur-google {
      font-size: 0.8rem;
      color: var(--color-danger);
      margin: 0;
    }

    .separateur {
      margin: 16px 0 !important;
      position: relative;

      &::ng-deep .mat-divider {
        border-top-color: var(--color-border);
      }
    }

    .separateur-texte {
      display: block;
      text-align: center;
      background: var(--color-surface);
      padding: 0 12px;
      font-size: 0.8rem;
      color: var(--color-text-muted);
      position: relative;
      top: -10px;
    }

    .formulaire {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .champ-pleine-largeur {
      width: 100%;

      ::ng-deep .mdc-notched-outline__leading,
      ::ng-deep .mdc-notched-outline__notch,
      ::ng-deep .mdc-notched-outline__trailing {
        border-radius: 0 !important;
      }
    }

    .prefixe-tel {
      font-size: 0.85rem;
      color: var(--color-primary);
      margin-right: 8px;
      font-weight: 700;
    }

    .erreur-globale {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      background: var(--color-danger-bg);
      color: var(--color-danger);
      border-left: 3px solid var(--color-danger);
      font-size: 0.88rem;
    }

    .btn-connexion {
      background-color: var(--color-accent) !important;
      color: #1a1a00 !important;
      height: 50px;
      font-size: 1rem !important;
      font-weight: 700 !important;
      margin-top: 8px;
      border-radius: 0 !important;
      text-transform: uppercase;
      letter-spacing: 0.08em;

      &:disabled {
        background-color: var(--color-surface-3) !important;
        color: var(--color-text-muted) !important;
      }

      mat-spinner { margin-right: 8px; }
    }

    .lien-inscription {
      text-align: center;
      margin-top: 24px;
      border-top: 1px solid var(--color-border);
      padding-top: 20px;

      p {
        font-size: 0.88rem;
        color: var(--color-text-muted);
        margin-bottom: 6px;
      }

      .lien-revendeur { font-size: 0.8rem; font-style: italic; }

      a {
        color: var(--color-primary);
        font-weight: 700;
        &:hover { color: var(--color-accent); }
      }
    }
  `]
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleBtn') googleBtnRef!: ElementRef<HTMLDivElement>;

  private readonly authService = inject(AuthService);
  private readonly googleAuthService = inject(GoogleAuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);

  mdpVisible = false;
  envoi = false;
  erreur: string | null = null;
  googleErreur: string | null = null;

  readonly formulaire = this.fb.group({
    telephone: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngAfterViewInit(): void {
    // Initialiser le bouton Google après le rendu
    setTimeout(() => {
      this.googleAuthService.initialiser(this.googleBtnRef.nativeElement, (idToken) => {
        this.onGoogleToken(idToken);
      });
    }, 300);
  }

  private onGoogleToken(idToken: string): void {
    this.googleErreur = null;
    this.googleAuthService.loginAvecGoogle(idToken).subscribe({
      next: (auth) => {
        this.authService.sauvegarderSession(auth);
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigate([returnUrl]);
      },
      error: (err) => {
        if (err?.telephoneRequis) {
          // Rediriger vers l'inscription avec le token en queryParam
          this.router.navigate(['/auth/register'], {
            queryParams: { googleToken: idToken }
          });
        } else {
          this.googleErreur = err.message || 'Connexion Google échouée';
        }
      }
    });
  }

  soumettre(): void {
    if (this.formulaire.invalid) {
      this.formulaire.markAllAsTouched();
      return;
    }

    this.envoi = true;
    this.erreur = null;

    const telephone = this.formulaire.value.telephone!
      .replace(/^\+229/, '').replace(/^00229/, '').replace(/\s/g, '').trim();

    this.authService.login({ telephone, password: this.formulaire.value.password! }).subscribe({
      next: () => {
        this.envoi = false;
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigate([returnUrl]);
      },
      error: err => {
        this.envoi = false;
        this.erreur = err.message || 'Identifiants incorrects';
      }
    });
  }
}
