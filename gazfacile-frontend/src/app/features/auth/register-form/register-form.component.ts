import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { InscriptionStateService } from '../../../core/services/inscription-state.service';
import { SubscriptionService } from '../../../core/services/subscription.service';
import { PaiementService } from '../../../core/services/paiement.service';
import { WebAuthnHelper } from '../../../core/helpers/webauthn.helper';
import { Role } from '../../../core/models/revendeur.model';

/** Étapes du formulaire d'inscription. */
type Etape = 'nom' | 'telephone' | 'authentification' | 'pin';

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
          <p class="sous-titre">Inscription rapide avant le paiement.</p>
        </div>

        @if (inscriptionState.resumeLabel()) {
          <div class="resume-choix">
            <mat-icon>info</mat-icon>
            <span>{{ inscriptionState.resumeLabel() }}</span>
            <a routerLink="/auth/register" class="modifier-lien" (click)="inscriptionState.reset()">Modifier</a>
          </div>
        }

        <!-- Indicateur d'étape -->
        <div class="etapes-header">
          <div class="etape-badge" [class.active]="etape === 'nom'">1. Nom</div>
          <div class="etape-badge" [class.active]="etape === 'telephone'">2. Numéro</div>
          <div class="etape-badge" [class.active]="etape === 'authentification' || etape === 'pin'">3. Sécurité</div>
        </div>

        <!-- Étape 1 : Nom -->
        @if (etape === 'nom') {
          <form [formGroup]="nomForm" class="formulaire" (ngSubmit)="continuerVersNumero()">
            <mat-form-field appearance="outline" class="champ-pleine-largeur">
              <mat-label>Nom complet</mat-label>
              <input matInput formControlName="nom" placeholder="Ex : Koffi Djossou">
              <mat-icon matPrefix>person</mat-icon>
              @if (nomForm.get('nom')?.invalid && nomForm.get('nom')?.touched) {
                <mat-error>Le nom est obligatoire</mat-error>
              }
            </mat-form-field>

            <button mat-raised-button type="submit" class="btn-principal" [disabled]="nomForm.invalid">
              <span class="btn-content">
                <mat-icon>arrow_forward</mat-icon>
                Suivant
              </span>
            </button>
          </form>
        }

        <!-- Étape 2 : Numéro de téléphone -->
        @if (etape === 'telephone') {
          <form [formGroup]="telephoneForm" class="formulaire">
            <mat-form-field appearance="outline" class="champ-pleine-largeur">
              <mat-label>Numéro de téléphone</mat-label>
              <input
                matInput
                formControlName="telephone"
                placeholder="0197000000"
                type="tel"
                inputmode="numeric"
                autocomplete="tel"
              >
              <div matPrefix class="prefixe-tel">+229</div>
              @if (telephoneForm.get('telephone')?.hasError('required') && telephoneForm.get('telephone')?.touched) {
                <mat-error>Le numéro de téléphone est obligatoire</mat-error>
              }
              @if (telephoneForm.get('telephone')?.hasError('pattern') && telephoneForm.get('telephone')?.touched) {
                <mat-error>Format invalide. Exemple : 0197000000</mat-error>
              }
            </mat-form-field>

            @if (erreur) {
              <div class="erreur-globale">
                <mat-icon>error_outline</mat-icon> {{ erreur }}
              </div>
            }

            <button
              mat-raised-button
              type="button"
              class="btn-principal"
              [disabled]="telephoneForm.invalid || envoi"
              (click)="continuerVersAuthentification()"
            >
              <span class="btn-content">
                @if (envoi) { <mat-spinner diameter="20"></mat-spinner> }
                @else { <mat-icon>arrow_forward</mat-icon> }
                {{ envoi ? 'Vérification...' : 'Suivant' }}
              </span>
            </button>

            <button mat-button type="button" class="btn-secondaire" (click)="retourNom()">
              <mat-icon>arrow_back</mat-icon>
              Retour
            </button>
          </form>
        }

        <!-- Étape 3 : Sécurité (WebAuthn ou PIN) -->
        @if (etape === 'authentification') {
          <div class="formulaire">
            <div class="info-telephone">
              <mat-icon>phone_android</mat-icon>
              <span>+229 {{ telephoneLocalAffiche }}</span>
            </div>

            <p class="instruction">
              Choisissez comment sécuriser votre compte.
            </p>

            @if (erreur) {
              <div class="erreur-globale">
                <mat-icon>error_outline</mat-icon> {{ erreur }}
              </div>
            }

            @if (webAuthnSupporte()) {
              <button mat-raised-button type="button" class="btn-biometrique"
                [disabled]="envoi"
                (click)="inscrireAvecBiometrie()">
                <span class="btn-content">
                  @if (envoi) { <mat-spinner diameter="20"></mat-spinner> }
                  @else { <mat-icon>fingerprint</mat-icon> }
                  Enregistrer mon empreinte / Face ID
                </span>
              </button>

              <div class="separateur"><span>ou</span></div>
            }

            <button mat-stroked-button type="button" class="btn-pin"
              [disabled]="envoi"
              (click)="afficherCreationPin()">
              <span class="btn-content">
                <mat-icon>pin</mat-icon>
                Créer un PIN 6 chiffres
              </span>
            </button>

            @if (!webAuthnSupporte()) {
              <button mat-stroked-button type="button" class="btn-pin"
                [disabled]="envoi"
                (click)="inscrireSansBiometrie()">
                <span class="btn-content">
                  <mat-icon>person_add</mat-icon>
                  Continuer sans sécurité biométrique
                </span>
              </button>
            }

            <button mat-button type="button" class="btn-secondaire" (click)="retourNumero()">
              <mat-icon>arrow_back</mat-icon>
              Retour
            </button>
          </div>
        }

        <!-- Étape 3b : Création PIN -->
        @if (etape === 'pin') {
          <div class="formulaire">
            <div class="info-telephone">
              <mat-icon>phone_android</mat-icon>
              <span>+229 {{ telephoneLocalAffiche }}</span>
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
                autocomplete="new-password"
              >
              <mat-icon matPrefix>lock</mat-icon>
              @if (pinControl.invalid && pinControl.touched) {
                <mat-error>Le PIN doit comporter 6 chiffres</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="champ-pleine-largeur">
              <mat-label>Confirmer le PIN</mat-label>
              <input
                matInput
                [formControl]="pinConfirmControl"
                placeholder="••••••"
                type="password"
                inputmode="numeric"
                maxlength="6"
                autocomplete="new-password"
              >
              <mat-icon matPrefix>lock_outline</mat-icon>
              @if (pinConfirmControl.invalid && pinConfirmControl.touched) {
                <mat-error>Le PIN doit comporter 6 chiffres</mat-error>
              }
              @if (pinConfirmControl.valid && pinControl.valid && pinControl.value !== pinConfirmControl.value) {
                <mat-error>Les PIN ne correspondent pas</mat-error>
              }
            </mat-form-field>

            @if (erreur) {
              <div class="erreur-globale">
                <mat-icon>error_outline</mat-icon> {{ erreur }}
              </div>
            }

            <button mat-raised-button type="button" class="btn-principal"
              [disabled]="pinControl.invalid || pinConfirmControl.invalid || pinControl.value !== pinConfirmControl.value || envoi"
              (click)="inscrireAvecPin()">
              <span class="btn-content">
                @if (envoi) { <mat-spinner diameter="20"></mat-spinner> }
                @else { <mat-icon>check_circle</mat-icon> }
                {{ envoi ? 'Inscription...' : 'Créer mon compte' }}
              </span>
            </button>

            <button mat-button type="button" class="btn-secondaire"
              [disabled]="envoi"
              (click)="retourAuthentification()">
              <mat-icon>arrow_back</mat-icon>
              Retour
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
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
      margin-bottom: 22px;
    }

    .etape-badge {
      border: 1px solid var(--color-border);
      padding: 10px 8px;
      text-align: center;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--color-text-muted);
      background: var(--color-bg);

      &.active {
        background: color-mix(in srgb, var(--color-primary) 10%, transparent);
        color: var(--color-primary);
        border-color: color-mix(in srgb, var(--color-primary) 35%, white);
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
        font-weight: 600;
        color: var(--color-text);
        font-size: 0.95rem;
      }
    }

    .instruction {
      margin: 0;
      font-size: 0.9rem;
      color: var(--color-text-muted);
      text-align: center;
    }

    .btn-content {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      line-height: 1;
    }

    .btn-principal {
      width: 100%;
      height: 48px;
      background: var(--color-accent) !important;
      color: #fff !important;
      font-weight: 700;
    }

    .btn-biometrique {
      width: 100%;
      height: 52px;
      background: var(--color-primary) !important;
      color: #fff !important;
      font-weight: 700;
      font-size: 1rem;

      .btn-content mat-icon {
        font-size: 24px;
        width: 24px;
        height: 24px;
      }
    }

    .btn-pin {
      width: 100%;
      height: 48px;
      font-weight: 600;
    }

    .btn-secondaire {
      align-self: center;
      color: var(--color-primary) !important;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .separateur {
      display: flex;
      align-items: center;
      gap: 12px;
      color: var(--color-text-muted);
      font-size: 0.82rem;

      &::before, &::after {
        content: '';
        flex: 1;
        height: 1px;
        background: var(--color-border);
      }
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
        font-size: 0.75rem;
      }
    }
  `]
})
export class RegisterFormComponent implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly subscriptionService = inject(SubscriptionService);
  private readonly paiementService = inject(PaiementService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  readonly inscriptionState = inject(InscriptionStateService);

  etape: Etape = 'nom';
  envoi = false;
  erreur: string | null = null;

  readonly webAuthnSupporte = signal(false);

  ngOnInit(): void {
    WebAuthnHelper.isBiometricAvailable().then(v => this.webAuthnSupporte.set(v));
  }

  readonly nomForm = this.fb.group({
    nom: ['', Validators.required]
  });

  readonly telephoneForm = this.fb.group({
    telephone: ['', [Validators.required, Validators.pattern(/^(\+229|00229)?\s*\d{10}$/)]]
  });

  readonly pinControl = this.fb.control('', [
    Validators.required,
    Validators.pattern(/^\d{6}$/)
  ]);

  readonly pinConfirmControl = this.fb.control('', [
    Validators.required,
    Validators.pattern(/^\d{6}$/)
  ]);

  private get role(): Role {
    return this.inscriptionState.role() ?? Role.CLIENT;
  }

  get telephoneLocalAffiche(): string {
    return this.normaliserTelephoneLocal(this.telephoneForm.value.telephone || '');
  }

  private get telephone(): string {
    return this.normaliserTelephoneLocal(this.telephoneForm.value.telephone!);
  }

  private get nom(): string {
    return this.nomForm.value.nom!.trim();
  }

  // ── Navigation ────────────────────────────────────────────────────────────

  continuerVersNumero(): void {
    if (this.nomForm.invalid) {
      this.nomForm.markAllAsTouched();
      return;
    }
    this.erreur = null;
    this.etape = 'telephone';
  }

  continuerVersAuthentification(): void {
    if (this.telephoneForm.invalid) {
      this.telephoneForm.markAllAsTouched();
      return;
    }
    this.erreur = null;
    this.etape = 'authentification';
  }

  afficherCreationPin(): void {
    this.erreur = null;
    this.pinControl.reset();
    this.pinConfirmControl.reset();
    this.etape = 'pin';
  }

  retourNom(): void {
    this.erreur = null;
    this.etape = 'nom';
  }

  retourNumero(): void {
    this.erreur = null;
    this.etape = 'telephone';
  }

  retourAuthentification(): void {
    this.erreur = null;
    this.etape = 'authentification';
  }

  // ── Inscription WebAuthn ──────────────────────────────────────────────────

  async inscrireAvecBiometrie(): Promise<void> {
    this.envoi = true;
    this.erreur = null;

    try {
      // Étape 1 : créer l'utilisateur et obtenir les options WebAuthn
      const options = await firstValueFrom(
        this.authService.startWebAuthnRegistration({
          telephone: this.telephone,
          nom: this.nom,
          role: this.role
        })
      );

      // Étape 2 : invoquer l'authenticateur (empreinte, Face ID, clé de sécurité)
      const credential = await WebAuthnHelper.registerWithBiometric(options);

      // Étape 3 : envoyer le credential au backend pour validation
      await firstValueFrom(
        this.authService.finishWebAuthnRegistration({
          telephone: this.telephone,
          credential
        })
      );

      this.inscriptionState.reset();
      await this.lancerSouscription();
    } catch (err: any) {
      if (err?.name === 'NotAllowedError') {
        this.erreur = "Enregistrement annulé. Réessayez ou choisissez le PIN.";
      } else {
        this.erreur = err?.message || "Enregistrement de l'empreinte échoué. Réessayez.";
      }
      this.envoi = false;
    }
  }

  // ── Inscription avec PIN ───────────────────────────────────────────────────

  async inscrireAvecPin(): Promise<void> {
    if (this.pinControl.invalid || this.pinConfirmControl.invalid
        || this.pinControl.value !== this.pinConfirmControl.value) {
      return;
    }

    this.envoi = true;
    this.erreur = null;

    try {
      // Créer le compte (inscription simplifiée)
      await firstValueFrom(
        this.authService.inscrireSimple({
          telephone: this.telephone,
          nom: this.nom,
          role: this.role
        })
      );

      // Configurer le PIN (l'utilisateur est maintenant authentifié via le JWT en mémoire)
      await firstValueFrom(
        this.authService.setupPin({ pin: this.pinControl.value! })
      );

      this.inscriptionState.reset();
      await this.lancerSouscription();
    } catch (err: any) {
      this.erreur = err?.message || 'Erreur lors de l\'inscription';
      this.envoi = false;
    }
  }

  // ── Inscription sans biométrie (fallback) ─────────────────────────────────

  async inscrireSansBiometrie(): Promise<void> {
    this.envoi = true;
    this.erreur = null;

    try {
      await firstValueFrom(
        this.authService.inscrireSimple({
          telephone: this.telephone,
          nom: this.nom,
          role: this.role
        })
      );

      this.inscriptionState.reset();
      await this.lancerSouscription();
    } catch (err: any) {
      this.erreur = err?.message || 'Erreur lors de l\'inscription';
      this.envoi = false;
    }
  }

  // ── Souscription post-inscription ─────────────────────────────────────────

  private async lancerSouscription(): Promise<void> {
    const plan = this.inscriptionState.selectedPlan();
    if (!plan) {
      this.envoi = false;
      this.router.navigate(['/']);
      return;
    }

    try {
      const response = await firstValueFrom(
        this.subscriptionService.subscribe(plan.id, this.telephone)
      );
      this.paiementService.redirectVersCheckout(response.checkoutUrl);
    } catch (err: any) {
      this.envoi = false;
      this.erreur = err.message || 'Compte créé, mais impossible d\'initier le paiement.';
    }
  }

  ngOnDestroy(): void {
    // Nettoyage si le composant est détruit en cours de processus
  }

  private normaliserTelephoneLocal(telephone: string): string {
    return telephone.replace(/^\+229/, '').replace(/^00229/, '').replace(/\s/g, '').trim();
  }
}
