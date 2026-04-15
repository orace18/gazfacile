import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
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
import { FirebasePhoneAuthService } from '../../../core/services/firebase-phone-auth.service';
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
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  template: `
    <div class="page-auth">
      <div class="carte-auth">
        <div class="entete-auth">
          <img src="assets/logo.svg" alt="GazFacile" class="logo-auth">
          <h1>Connexion</h1>
          <p class="sous-titre">Connectez-vous avec votre numéro de téléphone</p>
        </div>

        @if (modeGoogle && etapeGoogle === 1) {
          <div class="bloc-completion-google">
            <div class="info-google">
              <mat-icon>account_circle</mat-icon>
              <p>Dernière étape. Vérifiez votre numéro pour finaliser votre compte Google.</p>
            </div>

            <mat-form-field appearance="outline" class="champ-pleine-largeur">
              <mat-label>Numéro de téléphone</mat-label>
              <input matInput [formControl]="telephoneGoogleControl" placeholder="0197000000" type="tel">
              <div matPrefix class="prefixe-tel">+229</div>
              @if (telephoneGoogleControl.hasError('required') && telephoneGoogleControl.touched) {
                <mat-error>Le numéro de téléphone est obligatoire</mat-error>
              }
              @if (telephoneGoogleControl.hasError('pattern') && telephoneGoogleControl.touched) {
                <mat-error>Format invalide. Exemple: 0197000000</mat-error>
              }
            </mat-form-field>

            @if (googleErreur) {
              <div class="erreur-globale">
                <mat-icon>error_outline</mat-icon> {{ googleErreur }}
              </div>
            }

            <button mat-raised-button class="btn-connexion"
              [disabled]="telephoneGoogleControl.invalid || envoiOtp || !firebasePhoneConfigured"
              (click)="demanderOtpGoogle()">
              @if (envoiOtp) { <mat-spinner diameter="20"></mat-spinner> }
              @else { <mat-icon>sms</mat-icon> }
              Recevoir le code SMS
            </button>

            <button mat-button class="btn-secondaire" (click)="annulerModeGoogle()">
              <mat-icon>arrow_back</mat-icon> Retour
            </button>
          </div>
        }

        @if (modeGoogle && etapeGoogle === 2) {
          <div class="bloc-completion-google">
            <div class="info-google">
              <mat-icon>phone_android</mat-icon>
              <p>Code envoyé au <strong>+229 {{ telephoneGoogleControl.value }}</strong></p>
            </div>

            <mat-form-field appearance="outline" class="champ-pleine-largeur">
              <mat-label>Code de vérification</mat-label>
              <input
                matInput
                [formControl]="otpGoogleControl"
                placeholder="123456"
                maxlength="6"
                type="tel"
                inputmode="numeric"
                autocomplete="one-time-code"
              >
              <mat-icon matPrefix>lock</mat-icon>
              @if (otpGoogleControl.invalid && otpGoogleControl.touched) {
                <mat-error>Le code doit comporter 6 chiffres</mat-error>
              }
            </mat-form-field>

            @if (googleErreur) {
              <div class="erreur-globale">
                <mat-icon>error_outline</mat-icon> {{ googleErreur }}
              </div>
            }

            <button mat-raised-button class="btn-connexion"
              [disabled]="otpGoogleControl.invalid || envoi"
              (click)="verifierEtLierGoogle()">
              @if (envoi) { <mat-spinner diameter="20"></mat-spinner> }
              @else { <mat-icon>check_circle</mat-icon> }
              Confirmer et se connecter
            </button>

            <button mat-button class="btn-secondaire" [disabled]="envoiOtp" (click)="demanderOtpGoogle()">
              @if (envoiOtp) { <mat-spinner diameter="14"></mat-spinner> }
              Renvoyer le code
            </button>

            <button mat-button class="btn-secondaire" (click)="revenirEtapeGoogle()">
              <mat-icon>arrow_back</mat-icon> Modifier le numéro
            </button>
          </div>
        }

        @if (modeGoogle && !firebasePhoneConfigured) {
          <div class="erreur-globale">
            <mat-icon>error_outline</mat-icon> La vérification SMS Firebase n’est pas configurée.
          </div>
        }

        @if (modeGoogle && firebasePhoneConfigured) {
          <div class="recaptcha-bloc">
            <div [attr.id]="recaptchaContainerId" class="recaptcha-container"></div>
          </div>
        }

        @if (!modeGoogle) {
          <div class="bloc-google">
            <div #googleBtn class="google-btn-container"></div>
            @if (googleErreur) {
              <p class="erreur-google">{{ googleErreur }}</p>
            }
          </div>

          <mat-divider class="separateur">
            <span class="separateur-texte">ou</span>
          </mat-divider>

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
        }
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

    .bloc-google, .bloc-otp, .bloc-completion-google {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .google-btn-container {
      display: flex;
      justify-content: center;
      min-height: 42px;
    }

    .erreur-google {
      margin: 0;
      text-align: center;
      font-size: 0.85rem;
      color: #c62828;
    }

    .separateur {
      margin: 24px 0 20px;
      color: var(--color-text-muted);
    }

    .separateur-texte {
      padding: 0 10px;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
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

    .info-google, .otp-info {
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

    .recaptcha-bloc {
      margin-top: 18px;
      display: flex;
      justify-content: center;
    }

    .recaptcha-container {
      min-height: 78px;
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
export class LoginComponent implements AfterViewInit, OnDestroy {
  @ViewChild('googleBtn') googleBtnRef?: ElementRef<HTMLDivElement>;

  private readonly authService = inject(AuthService);
  private readonly googleAuthService = inject(GoogleAuthService);
  readonly phoneAuthService = inject(FirebasePhoneAuthService);
  private readonly otpService = inject(OtpService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);

  envoi = false;
  envoiOtp = false;
  otpEnvoye = false;
  erreur: string | null = null;
  googleErreur: string | null = null;
  googleBtnRendu = false;

  modeGoogle = false;
  etapeGoogle: 1 | 2 = 1;
  private googleIdToken = '';
  readonly recaptchaContainerId = 'login-google-phone-recaptcha';

  readonly telephoneControl = this.fb.control('', [
    Validators.required,
    Validators.pattern(/^(\+229|00229)?\s*\d{10}$/)
  ]);

  readonly otpControl = this.fb.control('', [
    Validators.required,
    Validators.pattern(/^\d{6}$/)
  ]);

  readonly telephoneGoogleControl = this.fb.control('', [
    Validators.required,
    Validators.pattern(/^(\+229|00229)?\s*\d{10}$/)
  ]);
  readonly otpGoogleControl = this.fb.control('', [
    Validators.required,
    Validators.pattern(/^\d{6}$/)
  ]);

  get firebasePhoneConfigured(): boolean {
    return this.phoneAuthService.estConfigure();
  }

  get telephoneLocalAffiche(): string {
    return this.normaliserTelephoneLocal(this.telephoneControl.value || '');
  }

  ngAfterViewInit(): void {
    this.initialiserBoutonGoogle();
  }

  private onGoogleToken(idToken: string): void {
    this.googleErreur = null;
    this.googleAuthService.loginAvecGoogle(idToken).subscribe({
      next: (auth) => {
        this.authService.sauvegarderSession(auth);
        this.naviguerRetour();
      },
      error: (err) => {
        if (err?.telephoneRequis) {
          this.phoneAuthService.reinitialiser();
          this.googleIdToken = idToken;
          this.modeGoogle = true;
          this.etapeGoogle = 1;
          this.telephoneGoogleControl.reset();
          this.otpGoogleControl.reset();
        } else {
          this.googleErreur = err.message || 'Connexion Google échouée';
        }
      }
    });
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
        this.erreur = err.message || 'Impossible d’envoyer le code OTP';
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

  demanderOtpGoogle(): void {
    const telephone = this.telephoneGoogleControl.value?.trim();
    if (!telephone) return;
    if (!this.firebasePhoneConfigured) {
      this.googleErreur = 'La vérification SMS Firebase n’est pas configurée.';
      return;
    }

    this.envoiOtp = true;
    this.googleErreur = null;

    this.phoneAuthService.envoyerCode(telephone, this.recaptchaContainerId).subscribe({
      next: () => {
        this.envoiOtp = false;
        this.etapeGoogle = 2;
        this.otpGoogleControl.reset();
      },
      error: err => {
        this.envoiOtp = false;
        this.googleErreur = err.message || 'Impossible d’envoyer le code SMS';
      }
    });
  }

  verifierEtLierGoogle(): void {
    if (this.otpGoogleControl.invalid) return;

    this.envoi = true;
    this.googleErreur = null;

    const telephone = this.telephoneGoogleControl.value!.trim();
    this.phoneAuthService.verifierCode(this.otpGoogleControl.value!).subscribe({
      next: (verification) => {
        this.googleAuthService.loginAvecGoogle(this.googleIdToken, telephone, undefined, verification.firebaseIdToken).subscribe({
          next: (auth) => {
            this.envoi = false;
            this.phoneAuthService.reinitialiser();
            this.authService.sauvegarderSession(auth);
            this.naviguerRetour();
          },
          error: err => {
            this.envoi = false;
            this.googleErreur = err.message || 'Impossible de finaliser l’inscription';
          }
        });
      },
      error: err => {
        this.envoi = false;
        this.googleErreur = err.message || 'Code incorrect';
      }
    });
  }

  annulerModeGoogle(): void {
    this.modeGoogle = false;
    this.etapeGoogle = 1;
    this.googleIdToken = '';
    this.googleErreur = null;
    this.telephoneGoogleControl.reset();
    this.otpGoogleControl.reset();
    this.phoneAuthService.reinitialiser();
  }

  revenirEtapeGoogle(): void {
    this.etapeGoogle = 1;
    this.googleErreur = null;
    this.otpGoogleControl.reset();
    this.phoneAuthService.reinitialiser();
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

  ngOnDestroy(): void {
    this.phoneAuthService.reinitialiser();
  }

  private naviguerRetour(): void {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.router.navigate([returnUrl]);
  }

  private normaliserTelephoneLocal(telephone: string): string {
    return telephone.replace(/^\+229/, '').replace(/^00229/, '').replace(/\s/g, '').trim();
  }
}
