import { AfterViewInit, Component, ElementRef, ViewChild, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../core/services/auth.service';
import { OtpService } from '../../../core/services/otp.service';
import { GoogleAuthService } from '../../../core/services/google-auth.service';
import { InscriptionStateService } from '../../../core/services/inscription-state.service';
import { SubscriptionService } from '../../../core/services/subscription.service';
import { PaiementService } from '../../../core/services/paiement.service';
import { Role } from '../../../core/models/revendeur.model';

function confirmerMotDePasse(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirm = control.get('confirmPassword');
  if (password && confirm && password.value !== confirm.value) {
    confirm.setErrors({ mismatch: true });
    return { mismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-register-form',
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
          <h1>{{ titrePage }}</h1>
          <p class="sous-titre">{{ sousTitrePage }}</p>
        </div>

        <!-- Résumé du choix -->
        @if (inscriptionState.resumeLabel()) {
          <div class="resume-choix">
            <mat-icon>info</mat-icon>
            <span>{{ inscriptionState.resumeLabel() }}</span>
            <a routerLink="/auth/register" class="modifier-lien" (click)="inscriptionState.reset()">Modifier</a>
          </div>
        }

        <!-- ÉTAPE 1 : Formulaire -->
        @if (etape === 1) {
          @if (!modeGoogle) {
            <div class="bloc-google">
              <div #googleBtn class="google-btn-container"></div>
              @if (googleErreur) {
                <p class="erreur-google">{{ googleErreur }}</p>
              }
            </div>

            <div class="separateur">
              <span class="separateur-texte">ou</span>
            </div>
          }

          <form [formGroup]="formulaire" (ngSubmit)="demanderOtp()" class="formulaire">

            @if (!modeGoogle) {
              <mat-form-field appearance="outline" class="champ-pleine-largeur">
                <mat-label>Nom complet</mat-label>
                <input matInput formControlName="nom" placeholder="Ex: Koffi Djossou">
                <mat-icon matPrefix>person</mat-icon>
                @if (formulaire.get('nom')?.invalid && formulaire.get('nom')?.touched) {
                  <mat-error>Le nom est obligatoire</mat-error>
                }
              </mat-form-field>
            }

            <mat-form-field appearance="outline" class="champ-pleine-largeur">
              <mat-label>Numéro de téléphone</mat-label>
              <input matInput formControlName="telephone" placeholder="97000000" type="tel">
              <div matPrefix class="prefixe-tel">+229</div>
              @if (formulaire.get('telephone')?.invalid && formulaire.get('telephone')?.touched) {
                <mat-error>Le numéro de téléphone est obligatoire</mat-error>
              }
            </mat-form-field>

            @if (!modeGoogle) {
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
                <input matInput formControlName="password"
                  [type]="mdpVisible ? 'text' : 'password'"
                  placeholder="Minimum 8 caractères">
                <button matSuffix mat-icon-button type="button" (click)="mdpVisible = !mdpVisible">
                  <mat-icon>{{ mdpVisible ? 'visibility_off' : 'visibility' }}</mat-icon>
                </button>
                @if (formulaire.get('password')?.hasError('minlength') && formulaire.get('password')?.touched) {
                  <mat-error>Minimum 8 caractères</mat-error>
                }
                @if (formulaire.get('password')?.hasError('required') && formulaire.get('password')?.touched) {
                  <mat-error>Le mot de passe est obligatoire</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline" class="champ-pleine-largeur">
                <mat-label>Confirmer le mot de passe</mat-label>
                <input matInput formControlName="confirmPassword"
                  [type]="mdpVisible ? 'text' : 'password'"
                  placeholder="Répétez votre mot de passe">
                @if (formulaire.get('confirmPassword')?.hasError('mismatch')) {
                  <mat-error>Les mots de passe ne correspondent pas</mat-error>
                }
              </mat-form-field>
            }

            @if (erreur) {
              <div class="erreur-globale">
                <mat-icon>error_outline</mat-icon> {{ erreur }}
              </div>
            }

            <button mat-raised-button type="submit" class="btn-inscription"
              [disabled]="envoiOtp || formulaire.get('telephone')?.invalid">
              @if (envoiOtp) { <mat-spinner diameter="20"></mat-spinner> }
              @else { <mat-icon>sms</mat-icon> }
              Recevoir le code SMS
            </button>
          </form>
        }

        <!-- ÉTAPE 2 : Vérification OTP -->
        @if (etape === 2) {
          <div class="bloc-otp">
            <div class="otp-info">
              <mat-icon>phone_android</mat-icon>
              <p>Code envoyé au <strong>+229 {{ formulaire.get('telephone')?.value }}</strong></p>
            </div>

            <mat-form-field appearance="outline" class="champ-pleine-largeur">
              <mat-label>Code de vérification (6 chiffres)</mat-label>
              <input matInput [formControl]="otpControl"
                placeholder="123456" maxlength="6" type="tel"
                inputmode="numeric" autocomplete="one-time-code">
              <mat-icon matPrefix>lock</mat-icon>
              @if (otpControl.hasError('pattern') && otpControl.touched) {
                <mat-error>Le code doit comporter 6 chiffres</mat-error>
              }
            </mat-form-field>

            @if (erreur) {
              <div class="erreur-globale">
                <mat-icon>error_outline</mat-icon> {{ erreur }}
              </div>
            }

            <button mat-raised-button class="btn-inscription"
              [disabled]="otpControl.invalid || envoi"
              (click)="verifierEtInscrire()">
              @if (envoi) { <mat-spinner diameter="20"></mat-spinner> }
              @else { <mat-icon>check_circle</mat-icon> }
              {{ modeGoogle ? 'Lier mon compte' : 'Créer mon compte' }}
            </button>

            <button mat-button class="btn-renvoyer" [disabled]="envoiOtp"
              (click)="demanderOtp()">
              @if (envoiOtp) { <mat-spinner diameter="14"></mat-spinner> }
              Renvoyer le code
            </button>

            <button mat-button (click)="etape = 1; erreur = null">
              <mat-icon>arrow_back</mat-icon> Modifier le numéro
            </button>
          </div>
        }

        <div class="lien-connexion">
          <p>Déjà un compte ? <a routerLink="/auth/login">Se connecter</a></p>
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
      padding: 40px 36px;
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
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--color-text);
        margin-bottom: 6px;
      }

      .sous-titre { color: var(--color-text-muted); font-size: 0.88rem; }
    }

    .resume-choix {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      background: color-mix(in srgb, var(--color-primary) 8%, transparent);
      border-left: 3px solid var(--color-primary);
      margin-bottom: 20px;
      font-size: 0.85rem;
      color: var(--color-text);

      mat-icon {
        color: var(--color-primary);
        font-size: 1.1rem;
        width: 1.1rem;
        height: 1.1rem;
        flex-shrink: 0;
      }

      span { flex: 1; }

      .modifier-lien {
        color: var(--color-primary);
        font-weight: 700;
        font-size: 0.78rem;
        text-transform: uppercase;
        white-space: nowrap;
      }
    }

    .formulaire, .bloc-otp {
      display: flex;
      flex-direction: column;
      gap: 8px;
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
      min-height: 44px;
      display: flex;
      justify-content: center;

      ::ng-deep > div,
      ::ng-deep iframe {
        max-width: 100% !important;
      }
    }

    .erreur-google {
      font-size: 0.8rem;
      color: var(--color-danger);
      margin: 0;
      text-align: center;
    }

    .separateur {
      position: relative;
      margin: 16px 0 20px;
      border-top: 1px solid var(--color-border);
    }

    .separateur-texte {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--color-surface);
      padding: 0 12px;
      font-size: 0.8rem;
      color: var(--color-text-muted);
    }

    .champ-pleine-largeur {
      width: 100%;
    }

    .prefixe-tel {
      font-size: 0.85rem;
      color: var(--color-primary);
      margin-right: 8px;
      font-weight: 700;
    }

    .otp-info {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
      background: color-mix(in srgb, var(--color-primary) 8%, transparent);
      border-left: 3px solid var(--color-primary);
      margin-bottom: 4px;

      mat-icon { color: var(--color-primary); }

      p { margin: 0; font-size: 0.88rem; color: var(--color-text); }
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

    .btn-inscription {
      background-color: var(--color-accent) !important;
      color: #1a1a00 !important;
      height: 50px;
      font-size: 1rem !important;
      font-weight: 700 !important;
      margin-top: 8px;
      text-transform: uppercase;
      letter-spacing: 0.08em;

      &:disabled {
        background-color: var(--color-surface-3) !important;
        color: var(--color-text-muted) !important;
      }

      mat-spinner { margin-right: 8px; }
    }

    .btn-renvoyer {
      color: var(--color-primary) !important;
      font-size: 0.82rem !important;
    }

    .lien-connexion {
      text-align: center;
      margin-top: 20px;
      border-top: 1px solid var(--color-border);
      padding-top: 16px;

      p { font-size: 0.88rem; color: var(--color-text-muted); }

      a {
        color: var(--color-primary);
        font-weight: 700;
        &:hover { color: var(--color-accent); }
      }
    }
  `]
})
export class RegisterFormComponent implements OnInit, AfterViewInit {
  @ViewChild('googleBtn') googleBtnRef?: ElementRef<HTMLDivElement>;

  private readonly authService = inject(AuthService);
  private readonly googleAuthService = inject(GoogleAuthService);
  private readonly otpService = inject(OtpService);
  private readonly subscriptionService = inject(SubscriptionService);
  private readonly paiementService = inject(PaiementService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  readonly inscriptionState = inject(InscriptionStateService);

  etape: 1 | 2 = 1;
  modeGoogle = false;
  googleToken = '';

  mdpVisible = false;
  envoi = false;
  envoiOtp = false;
  erreur: string | null = null;
  googleErreur: string | null = null;
  googleBtnRendu = false;

  readonly formulaire = this.fb.group({
    nom: ['', Validators.required],
    telephone: ['', Validators.required],
    email: ['', Validators.email],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required]
  }, { validators: confirmerMotDePasse });

  readonly otpControl = this.fb.control('', [
    Validators.required,
    Validators.pattern(/^\d{6}$/)
  ]);

  private get role(): Role {
    return this.inscriptionState.role() ?? Role.CLIENT;
  }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('googleToken');
    if (token) {
      this.activerModeGoogle(token);
    }
  }

  ngAfterViewInit(): void {
    if (!this.modeGoogle) {
      this.initialiserBoutonGoogle();
    }
  }

  get titrePage(): string {
    return this.modeGoogle ? "Finaliser l'inscription" : 'Créer mon compte';
  }

  get sousTitrePage(): string {
    return this.modeGoogle
      ? 'Liez un numéro de téléphone à votre compte Google'
      : 'Remplissez vos informations pour rejoindre GazFacile';
  }

  demanderOtp(): void {
    const telephone = this.formulaire.get('telephone')?.value?.trim();
    if (!telephone) return;

    this.envoiOtp = true;
    this.erreur = null;

    this.otpService.envoyer(telephone).subscribe({
      next: () => {
        this.envoiOtp = false;
        this.etape = 2;
        this.otpControl.reset();
      },
      error: err => {
        this.envoiOtp = false;
        this.erreur = err.message;
      }
    });
  }

  verifierEtInscrire(): void {
    if (this.otpControl.invalid) return;

    this.envoi = true;
    this.erreur = null;

    const telephone = this.formulaire.get('telephone')!.value!.trim();
    const code = this.otpControl.value!;

    this.otpService.verifier(telephone, code).subscribe({
      next: () => {
        if (this.modeGoogle) {
          this.lierGoogle(telephone);
        } else {
          this.inscrire();
        }
      },
      error: err => {
        this.envoi = false;
        this.erreur = err.message;
      }
    });
  }

  private inscrire(): void {
    if (this.formulaire.invalid) {
      this.envoi = false;
      return;
    }

    const state = this.inscriptionState;
    this.authService.register({
      nom: this.formulaire.value.nom!,
      telephone: this.formulaire.value.telephone!,
      email: this.formulaire.value.email || undefined,
      password: this.formulaire.value.password!,
      role: this.role,
      accountType: state.role() ?? undefined,
      clientNeed: state.clientNeed() ?? undefined
    }).subscribe({
      next: () => {
        this.lancerSouscription();
      },
      error: err => {
        this.envoi = false;
        this.erreur = err.message || 'Erreur lors de l\'inscription';
      }
    });
  }

  private lancerSouscription(): void {
    const plan = this.inscriptionState.selectedPlan();
    if (!plan) {
      this.envoi = false;
      this.inscriptionState.reset();
      this.router.navigate(['/']);
      return;
    }

    this.subscriptionService.subscribe(plan.id).subscribe({
      next: (response) => {
        this.inscriptionState.reset();
        this.paiementService.redirectVersCheckout(response.checkoutUrl);
      },
      error: err => {
        this.envoi = false;
        this.erreur = err.message || 'Inscription réussie mais erreur lors du paiement. Vous pouvez souscrire depuis votre profil.';
      }
    });
  }

  private lierGoogle(telephone: string): void {
    this.googleAuthService.loginAvecGoogle(this.googleToken, telephone).subscribe({
      next: (auth) => {
        this.authService.sauvegarderSession(auth);
        this.lancerSouscription();
      },
      error: err => {
        this.envoi = false;
        this.erreur = err.message || 'Impossible de lier le compte Google';
      }
    });
  }

  private initialiserBoutonGoogle(): void {
    if (!this.googleBtnRef) {
      this.googleBtnRendu = false;
      this.googleErreur = 'Connexion Google indisponible pour le moment.';
      return;
    }

    this.googleErreur = null;
    this.googleAuthService.initialiser(this.googleBtnRef.nativeElement, (idToken) => {
      this.onGoogleToken(idToken);
    }).subscribe({
      next: (rendu) => {
        this.googleBtnRendu = rendu;
        if (!rendu) {
          this.googleErreur = 'Connexion Google indisponible pour le moment.';
        }
      },
      error: () => {
        this.googleBtnRendu = false;
        this.googleErreur = 'Connexion Google indisponible pour le moment.';
      }
    });
  }

  private onGoogleToken(idToken: string): void {
    this.googleErreur = null;
    this.googleAuthService.loginAvecGoogle(idToken).subscribe({
      next: (auth) => {
        this.authService.sauvegarderSession(auth);
        this.lancerSouscription();
      },
      error: (err) => {
        if (err?.telephoneRequis) {
          this.activerModeGoogle(idToken);
          this.etape = 1;
          this.erreur = null;
        } else {
          this.googleErreur = err.message || 'Connexion Google échouée';
        }
      }
    });
  }

  private activerModeGoogle(token: string): void {
    this.modeGoogle = true;
    this.googleToken = token;
    this.googleErreur = null;
    this.formulaire.get('nom')?.clearValidators();
    this.formulaire.get('password')?.clearValidators();
    this.formulaire.get('confirmPassword')?.clearValidators();
    this.formulaire.updateValueAndValidity();
  }
}
