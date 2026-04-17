import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../core/services/auth.service';
import { OtpService } from '../../../core/services/otp.service';
import { InscriptionStateService } from '../../../core/services/inscription-state.service';
import { SubscriptionService } from '../../../core/services/subscription.service';
import { PaiementService } from '../../../core/services/paiement.service';
import { Role } from '../../../core/models/revendeur.model';

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
          <h1>Créer mon compte</h1>
          <p class="sous-titre">Inscription rapide en deux étapes avant le paiement.</p>
        </div>

        @if (inscriptionState.resumeLabel()) {
          <div class="resume-choix">
            <mat-icon>info</mat-icon>
            <span>{{ inscriptionState.resumeLabel() }}</span>
            <a routerLink="/auth/register" class="modifier-lien" (click)="inscriptionState.reset()">Modifier</a>
          </div>
        }

        <div class="etapes-header">
          <div class="etape-badge" [class.active]="etape === 1">1. Nom</div>
          <div class="etape-badge" [class.active]="etape === 2">2. Téléphone</div>
        </div>

        @if (etape === 1) {
          <form [formGroup]="nomForm" class="formulaire" (ngSubmit)="continuerVersTelephone()">
            <mat-form-field appearance="outline" class="champ-pleine-largeur">
              <mat-label>Nom complet</mat-label>
              <input matInput formControlName="nom" placeholder="Ex: Koffi Djossou">
              <mat-icon matPrefix>person</mat-icon>
              @if (nomForm.get('nom')?.invalid && nomForm.get('nom')?.touched) {
                <mat-error>Le nom est obligatoire</mat-error>
              }
            </mat-form-field>

            <button mat-raised-button type="submit" class="btn-principal" [disabled]="nomForm.invalid">
              <span class="btn-inner">
                <mat-icon>arrow_forward</mat-icon>
                Suivant
              </span>
            </button>
          </form>
        }

        @if (etape === 2) {
          <div class="bloc-verification">
            <p class="instruction">
              Saisissez votre numéro, recevez un code SMS, puis confirmez votre inscription.
            </p>

            <form [formGroup]="telephoneForm" class="formulaire">
              <mat-form-field appearance="outline" class="champ-pleine-largeur">
                <mat-label>Numéro de téléphone</mat-label>
                <input
                  matInput
                  formControlName="telephone"
                  placeholder="0197000000"
                  type="tel"
                  [readonly]="otpEnvoye"
                >
                <div matPrefix class="prefixe-tel">+229</div>
                @if (telephoneForm.get('telephone')?.hasError('required') && telephoneForm.get('telephone')?.touched) {
                  <mat-error>Le numéro de téléphone est obligatoire</mat-error>
                }
                @if (telephoneForm.get('telephone')?.hasError('pattern') && telephoneForm.get('telephone')?.touched) {
                  <mat-error>Format invalide. Exemple: 0197000000</mat-error>
                }
              </mat-form-field>

              @if (otpEnvoye) {
                <div class="otp-info">
                  <mat-icon>phone_android</mat-icon>
                  <p>Code envoyé au <strong>+229 {{ telephoneLocalAffiche }}</strong></p>
                </div>

                <mat-form-field appearance="outline" class="champ-pleine-largeur">
                  <mat-label>Code de vérification</mat-label>
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
                  <mat-icon>error_outline</mat-icon> {{ erreur }}
                </div>
              }

              @if (!otpEnvoye) {
                <button
                  mat-raised-button
                  type="button"
                  class="btn-principal"
                  [disabled]="telephoneForm.invalid || envoiOtp"
                  (click)="demanderOtp()"
                >
                  <span class="btn-inner">
                    @if (envoiOtp) {
                      <mat-spinner diameter="20"></mat-spinner>
                    } @else {
                      <mat-icon>sms</mat-icon>
                    }
                    {{ envoiOtp ? 'Envoi...' : 'Envoyer le code' }}
                  </span>
                </button>
              }

              @if (otpEnvoye) {
                <button
                  mat-raised-button
                  type="button"
                  class="btn-principal"
                  [disabled]="otpControl.invalid || envoi"
                  (click)="verifierEtInscrire()"
                >
                  <span class="btn-inner">
                    @if (envoi) {
                      <mat-spinner diameter="20"></mat-spinner>
                    } @else {
                      <mat-icon>check_circle</mat-icon>
                    }
                    {{ envoi ? 'Vérification...' : 'Vérifier et continuer' }}
                  </span>
                </button>

                <button mat-button type="button" class="btn-secondaire" [disabled]="envoiOtp" (click)="demanderOtp()">
                  <span class="btn-inner">
                    @if (envoiOtp) { <mat-spinner diameter="14"></mat-spinner> }
                    {{ envoiOtp ? 'Envoi...' : 'Renvoyer le code' }}
                  </span>
                </button>

                <button mat-button type="button" class="btn-secondaire" (click)="modifierNumero()">
                  <mat-icon>edit</mat-icon>
                  Modifier le numéro
                </button>
              }

              <button mat-button type="button" class="btn-secondaire" (click)="retourEtape1()">
                <mat-icon>arrow_back</mat-icon>
                Retour
              </button>
            </form>
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
        font-size: 1.7rem;
        font-weight: 700;
        color: var(--color-text);
        margin-bottom: 6px;
      }

      .sous-titre {
        color: var(--color-text-muted);
        font-size: 0.9rem;
      }
    }

    .resume-choix {
      display: flex;
      align-items: center;
      gap: 10px;
      background: color-mix(in srgb, var(--color-primary) 8%, transparent);
      border-left: 3px solid var(--color-primary);
      padding: 12px 14px;
      margin-bottom: 20px;
      font-size: 0.88rem;

      mat-icon {
        color: var(--color-primary);
        font-size: 18px;
        width: 18px;
        height: 18px;
      }

      .modifier-lien {
        margin-left: auto;
        color: var(--color-primary);
        font-weight: 600;
        text-decoration: none;
      }
    }

    .etapes-header {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 22px;
    }

    .etape-badge {
      border: 1px solid var(--color-border);
      padding: 10px 12px;
      text-align: center;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--color-text-muted);
      background: var(--color-bg);

      &.active {
        background: color-mix(in srgb, var(--color-primary) 10%, transparent);
        color: var(--color-primary);
        border-color: color-mix(in srgb, var(--color-primary) 35%, white);
      }
    }

    .formulaire, .bloc-verification {
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

    .instruction {
      margin: 0;
      font-size: 0.9rem;
      color: var(--color-text-muted);
    }

    .otp-info {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 14px;
      background: color-mix(in srgb, var(--color-primary) 8%, white);
      color: var(--color-text);

      mat-icon {
        color: var(--color-primary);
      }

      p {
        margin: 0;
        font-size: 0.9rem;
      }
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

    .btn-secondaire {
      align-self: center;
      color: var(--color-primary) !important;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .lien-connexion {
      text-align: center;
      margin-top: 24px;

      p {
        margin: 0;
        color: var(--color-text-muted);
        font-size: 0.9rem;
      }

      a {
        color: var(--color-primary);
        font-weight: 600;
        text-decoration: none;
      }
    }

    @media (max-width: 640px) {
      .carte-auth {
        padding: 32px 22px;
      }

      .etapes-header {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class RegisterFormComponent implements OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly otpService = inject(OtpService);
  private readonly subscriptionService = inject(SubscriptionService);
  private readonly paiementService = inject(PaiementService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  readonly inscriptionState = inject(InscriptionStateService);

  etape: 1 | 2 = 1;
  envoi = false;
  envoiOtp = false;
  otpEnvoye = false;
  erreur: string | null = null;

  readonly nomForm = this.fb.group({
    nom: ['', Validators.required]
  });

  readonly telephoneForm = this.fb.group({
    telephone: ['', [Validators.required, Validators.pattern(/^(\+229|00229)?\s*\d{10}$/)]]
  });

  readonly otpControl = this.fb.control('', [
    Validators.required,
    Validators.pattern(/^\d{6}$/)
  ]);

  private get role(): Role {
    return this.inscriptionState.role() ?? Role.CLIENT;
  }

  get telephoneLocalAffiche(): string {
    return this.normaliserTelephoneLocal(this.telephoneForm.value.telephone || '');
  }

  continuerVersTelephone(): void {
    if (this.nomForm.invalid) {
      this.nomForm.markAllAsTouched();
      return;
    }

    this.etape = 2;
    this.erreur = null;
  }

  demanderOtp(): void {
    if (this.telephoneForm.invalid) {
      this.telephoneForm.markAllAsTouched();
      return;
    }

    this.envoiOtp = true;
    this.erreur = null;

    this.otpService.envoyer(this.normaliserTelephoneLocal(this.telephoneForm.value.telephone!)).subscribe({
      next: () => {
        this.envoiOtp = false;
        this.otpEnvoye = true;
        this.otpControl.reset();
      },
      error: err => {
        this.envoiOtp = false;
        this.erreur = err.message;
      }
    });
  }

  verifierEtInscrire(): void {
    if (this.otpControl.invalid) {
      this.otpControl.markAsTouched();
      return;
    }

    this.envoi = true;
    this.erreur = null;

    this.authService.register({
      nom: this.nomForm.value.nom!.trim(),
      telephone: this.normaliserTelephoneLocal(this.telephoneForm.value.telephone!),
      role: this.role,
      accountType: this.inscriptionState.role() ?? undefined,
      clientNeed: this.inscriptionState.clientNeed() ?? undefined,
      otpCode: this.otpControl.value!
    }).subscribe({
      next: () => this.lancerSouscription(),
      error: err => {
        this.envoi = false;
        this.erreur = err.message || 'Erreur lors de l’inscription';
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

    const telephonePaiement = this.normaliserTelephoneLocal(this.telephoneForm.value.telephone!);

    this.subscriptionService.subscribe(plan.id, telephonePaiement).subscribe({
      next: (response) => {
        this.inscriptionState.reset();
        this.paiementService.redirectVersCheckout(response.checkoutUrl);
      },
      error: err => {
        this.envoi = false;
        this.erreur = err.message || 'Compte créé, mais impossible d’initier le paiement.';
      }
    });
  }

  retourEtape1(): void {
    this.etape = 1;
    this.erreur = null;
    this.reinitialiserOtp();
  }

  modifierNumero(): void {
    this.erreur = null;
    this.reinitialiserOtp();
    this.telephoneForm.get('telephone')?.markAsUntouched();
  }

  ngOnDestroy(): void {
    this.reinitialiserOtp();
  }

  private reinitialiserOtp(): void {
    this.otpEnvoye = false;
    this.otpControl.reset();
  }

  private normaliserTelephoneLocal(telephone: string): string {
    return telephone.replace(/^\+229/, '').replace(/^00229/, '').replace(/\s/g, '').trim();
  }
}
