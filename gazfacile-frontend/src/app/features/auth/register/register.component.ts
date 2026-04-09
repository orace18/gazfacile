import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { AuthService } from '../../../core/services/auth.service';
import { Role } from '../../../core/models/revendeur.model';

/** Validateur personnalisé pour vérifier que les mots de passe correspondent. */
function confirmerMotDePasse(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirm = control.get('confirmPassword');
  if (password && confirm && password.value !== confirm.value) {
    confirm.setErrors({ mismatch: true });
    return { mismatch: true };
  }
  return null;
}

/**
 * Page d'inscription d'un nouvel utilisateur GazFacile.
 * Permet de créer un compte CLIENT ou REVENDEUR.
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatRadioModule
  ],
  template: `
    <div class="page-auth">
      <div class="carte-auth">
        <!-- En-tête -->
        <div class="entete-auth">
          <span class="logo-flamme">🔥</span>
          <h1>Créer un compte</h1>
          <p class="sous-titre">Rejoignez la communauté GazFacile au Bénin</p>
        </div>

        <!-- Formulaire -->
        <form [formGroup]="formulaire" (ngSubmit)="soumettre()" class="formulaire">

          <mat-form-field appearance="outline" class="champ-pleine-largeur">
            <mat-label>Nom complet</mat-label>
            <input matInput formControlName="nom" placeholder="Ex: Koffi Djossou">
            <mat-icon matPrefix>person</mat-icon>
            @if (formulaire.get('nom')?.invalid && formulaire.get('nom')?.touched) {
              <mat-error>Le nom est obligatoire</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" class="champ-pleine-largeur">
            <mat-label>Numéro de téléphone</mat-label>
            <input matInput formControlName="telephone" placeholder="97000000" type="tel">
            <div matPrefix class="prefixe-tel">+229</div>
            @if (formulaire.get('telephone')?.invalid && formulaire.get('telephone')?.touched) {
              <mat-error>Le numéro de téléphone est obligatoire</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" class="champ-pleine-largeur">
            <mat-label>Email (optionnel)</mat-label>
            <input matInput type="email" formControlName="email" placeholder="vous@exemple.com">
            <mat-icon matPrefix>email</mat-icon>
            @if (formulaire.get('email')?.hasError('email')) {
              <mat-error>Format d'email invalide</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" class="champ-pleine-largeur">
            <mat-label>Mot de passe</mat-label>
            <input
              matInput
              formControlName="password"
              [type]="mdpVisible ? 'text' : 'password'"
              placeholder="Minimum 8 caractères"
            >
            <button matSuffix mat-icon-button type="button" (click)="mdpVisible = !mdpVisible">
              <mat-icon>{{ mdpVisible ? 'visibility_off' : 'visibility' }}</mat-icon>
            </button>
            @if (formulaire.get('password')?.hasError('minlength') && formulaire.get('password')?.touched) {
              <mat-error>Le mot de passe doit contenir au moins 8 caractères</mat-error>
            }
            @if (formulaire.get('password')?.hasError('required') && formulaire.get('password')?.touched) {
              <mat-error>Le mot de passe est obligatoire</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" class="champ-pleine-largeur">
            <mat-label>Confirmer le mot de passe</mat-label>
            <input
              matInput
              formControlName="confirmPassword"
              [type]="mdpVisible ? 'text' : 'password'"
              placeholder="Répétez votre mot de passe"
            >
            @if (formulaire.get('confirmPassword')?.hasError('mismatch')) {
              <mat-error>Les mots de passe ne correspondent pas</mat-error>
            }
          </mat-form-field>

          <!-- Choix du rôle -->
          <div class="groupe-role">
            <label class="label-role">Je suis :</label>
            <mat-radio-group formControlName="role" class="radio-role">
              <mat-radio-button [value]="Role.CLIENT" class="radio-option">
                <div class="option-role">
                  <mat-icon>person</mat-icon>
                  <div>
                    <span class="role-titre">Client</span>
                    <span class="role-desc">Je cherche du gaz près de moi</span>
                  </div>
                </div>
              </mat-radio-button>
              <mat-radio-button [value]="Role.REVENDEUR" class="radio-option">
                <div class="option-role">
                  <mat-icon>store</mat-icon>
                  <div>
                    <span class="role-titre">Revendeur</span>
                    <span class="role-desc">Je vends du gaz et veux être visible</span>
                  </div>
                </div>
              </mat-radio-button>
            </mat-radio-group>
          </div>

          <!-- Erreur globale -->
          @if (erreur) {
            <div class="erreur-globale">
              <mat-icon>error_outline</mat-icon>
              {{ erreur }}
            </div>
          }

          <button
            mat-raised-button
            type="submit"
            class="btn-inscription"
            [disabled]="formulaire.invalid || envoi"
          >
            @if (envoi) {
              <mat-spinner diameter="20"></mat-spinner>
            } @else {
              <mat-icon>person_add</mat-icon>
            }
            Créer mon compte
          </button>
        </form>

        <!-- Lien vers connexion -->
        <div class="lien-connexion">
          <p>Déjà un compte ?
            <a routerLink="/auth/login">Se connecter</a>
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
      max-width: 460px;
      background: var(--color-surface);
      border: none;
      border-radius: 0;
      padding: 40px 36px;
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25);
    }

    .entete-auth {
      text-align: center;
      margin-bottom: 28px;

      .logo-flamme {
        font-size: 2rem;
        display: block;
        margin-bottom: 10px;
      }

      h1 {
        font-family: 'Syne', sans-serif;
        font-size: 1.6rem;
        color: var(--color-text);
        margin-bottom: 6px;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }

      .sous-titre {
        color: var(--color-text-muted);
        font-size: 0.88rem;
      }
    }

    .formulaire {
      display: flex;
      flex-direction: column;
      gap: 6px;
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

    .groupe-role {
      margin: 4px 0;
    }

    .label-role {
      font-size: 0.85rem;
      color: var(--color-text-muted);
      display: block;
      margin-bottom: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .radio-role {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .radio-option {
      width: 100%;

      ::ng-deep .mdc-form-field {
        width: 100%;
      }
    }

    .option-role {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      background: var(--color-surface-2);
      border-radius: 0;
      border: 1px solid var(--color-border);
      cursor: pointer;
      transition: border-color 0.2s, background-color 0.2s;

      &:hover {
        border-color: var(--color-primary);
        background-color: var(--color-primary-light);
      }

      mat-icon {
        color: var(--color-primary);
      }

      .role-titre {
        display: block;
        font-weight: 700;
        color: var(--color-text);
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.03em;
      }

      .role-desc {
        display: block;
        font-size: 0.78rem;
        color: var(--color-text-muted);
      }
    }

    .erreur-globale {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      background: var(--color-danger-bg);
      color: var(--color-danger);
      border-radius: 0;
      border-left: 3px solid var(--color-danger);
      font-size: 0.88rem;
    }

    .btn-inscription {
      background-color: var(--color-accent) !important;
      color: white !important;
      height: 50px;
      font-size: 1rem !important;
      font-weight: 700 !important;
      margin-top: 8px;
      border-radius: 0 !important;
      text-transform: uppercase;
      letter-spacing: 0.08em;

      &:hover:not(:disabled) {
        background-color: var(--color-accent-dark) !important;
      }

      &:disabled {
        background-color: var(--color-surface-3) !important;
        color: var(--color-text-muted) !important;
      }

      mat-spinner {
        margin-right: 8px;
      }
    }

    .lien-connexion {
      text-align: center;
      margin-top: 20px;
      border-top: 1px solid var(--color-border);
      padding-top: 16px;

      p {
        font-size: 0.88rem;
        color: var(--color-text-muted);
      }

      a {
        color: var(--color-primary);
        font-weight: 700;

        &:hover {
          color: var(--color-accent);
        }
      }
    }
  `]
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  readonly Role = Role;
  mdpVisible = false;
  envoi = false;
  erreur: string | null = null;

  readonly formulaire = this.fb.group({
    nom: ['', Validators.required],
    telephone: ['', Validators.required],
    email: ['', Validators.email],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
    role: [Role.CLIENT, Validators.required]
  }, { validators: confirmerMotDePasse });

  soumettre(): void {
    if (this.formulaire.invalid) {
      this.formulaire.markAllAsTouched();
      return;
    }

    this.envoi = true;
    this.erreur = null;

    this.authService.register({
      nom: this.formulaire.value.nom!,
      telephone: this.formulaire.value.telephone!,
      email: this.formulaire.value.email || undefined,
      password: this.formulaire.value.password!,
      role: this.formulaire.value.role ?? Role.CLIENT
    }).subscribe({
      next: () => {
        this.envoi = false;
        this.router.navigate(['/']);
      },
      error: err => {
        this.envoi = false;
        this.erreur = err.message || 'Une erreur s\'est produite lors de l\'inscription';
      }
    });
  }
}
