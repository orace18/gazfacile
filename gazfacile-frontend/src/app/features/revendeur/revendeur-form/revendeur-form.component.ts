import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RevendeurService } from '../../../core/services/revendeur.service';
import { GeolocationService } from '../../../core/services/geolocation.service';
import { Revendeur, RevendeurDTO } from '../../../core/models/revendeur.model';

/**
 * Formulaire d'inscription d'un nouveau revendeur de gaz.
 * Utilise un stepper Angular Material en 2 étapes.
 */
@Component({
  selector: 'app-revendeur-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="page-inscription">
      <div class="container">
        <div class="entete-page">
          <h1>Inscrire mon dépôt de gaz</h1>
          <p class="sous-titre">Rejoignez GazFacile et soyez visible par des milliers de clients au Bénin</p>
        </div>

        @if (chargementDepot()) {
          <div class="etat-depot">
            <mat-spinner diameter="40"></mat-spinner>
            <p>Vérification de votre dépôt...</p>
          </div>
        } @else if (depotExistant()) {
          <div class="etat-depot depot-existant">
            <mat-icon>storefront</mat-icon>
            <h2>Votre dépôt est déjà enregistré</h2>
            <p><strong>{{ depotExistant()!.nom }}</strong> à {{ depotExistant()!.quartier }}</p>
            <p>Vous pouvez maintenant gérer votre catalogue et vos stocks.</p>
            <div class="actions-etape">
              <a mat-raised-button routerLink="/revendeur/catalogue" class="btn-inscrire">
                <mat-icon>inventory_2</mat-icon>
                Gérer mon catalogue
              </a>
            </div>
          </div>
        } @else {
          <div class="formulaire-carte">
            <mat-stepper orientation="vertical" [linear]="true" #stepper>

            <!-- Étape 1 : Informations personnelles -->
            <mat-step [stepControl]="etape1">
              <form [formGroup]="etape1">
                <ng-template matStepLabel>Informations du dépôt</ng-template>

                <div class="etape-contenu">
                  <mat-form-field appearance="outline" class="champ-pleine-largeur">
                    <mat-label>Nom du dépôt / raison sociale</mat-label>
                    <input matInput formControlName="nom" placeholder="Ex: Dépôt de gaz Akpakpa">
                    <mat-icon matPrefix>store</mat-icon>
                    @if (etape1.get('nom')?.invalid && etape1.get('nom')?.touched) {
                      <mat-error>Le nom est obligatoire</mat-error>
                    }
                  </mat-form-field>

                  <div class="deux-colonnes">
                    <mat-form-field appearance="outline" class="champ-pleine-largeur">
                      <mat-label>Quartier</mat-label>
                      <input matInput formControlName="quartier" placeholder="Ex: Akpakpa">
                      <mat-icon matPrefix>location_city</mat-icon>
                      @if (etape1.get('quartier')?.invalid && etape1.get('quartier')?.touched) {
                        <mat-error>Le quartier est obligatoire</mat-error>
                      }
                    </mat-form-field>

                    <mat-form-field appearance="outline" class="champ-pleine-largeur">
                      <mat-label>Téléphone</mat-label>
                      <input matInput formControlName="telephone" placeholder="Ex: 97000000">
                      <mat-icon matPrefix>phone</mat-icon>
                      @if (etape1.get('telephone')?.invalid && etape1.get('telephone')?.touched) {
                        <mat-error>Le téléphone est obligatoire</mat-error>
                      }
                    </mat-form-field>
                  </div>

                  <mat-form-field appearance="outline" class="champ-pleine-largeur">
                    <mat-label>Adresse complète (optionnelle)</mat-label>
                    <input matInput formControlName="adresse" placeholder="Ex: En face du marché Godomey">
                    <mat-icon matPrefix>place</mat-icon>
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="champ-pleine-largeur">
                    <mat-label>Email (optionnel)</mat-label>
                    <input matInput type="email" formControlName="email" placeholder="depot@exemple.com">
                    <mat-icon matPrefix>email</mat-icon>
                    @if (etape1.get('email')?.hasError('email')) {
                      <mat-error>Format d'email invalide</mat-error>
                    }
                  </mat-form-field>

                  <!-- Marques de gaz -->
                  <div class="section-marques">
                    <label class="label-section">Marques de gaz distribuées</label>
                    <div class="ajout-marque">
                      <mat-form-field appearance="outline" class="champ-marque">
                        <mat-label>Ajouter une marque</mat-label>
                        <input matInput #champMarque placeholder="Ex: Sodigaz, SONACOP...">
                      </mat-form-field>
                      <button mat-icon-button type="button" (click)="ajouterMarque(champMarque.value); champMarque.value = ''">
                        <mat-icon>add_circle</mat-icon>
                      </button>
                    </div>
                    <div class="liste-marques">
                      @for (marque of marques; track $index) {
                        <mat-chip class="chip-marque" (removed)="supprimerMarque($index)">
                          {{ marque }}
                          <button matChipRemove>
                            <mat-icon>cancel</mat-icon>
                          </button>
                        </mat-chip>
                      }
                      @if (marques.length === 0) {
                        <p class="aide-marques">Ajoutez les marques de gaz que vous distribuez</p>
                      }
                    </div>
                  </div>

                  <!-- Livraison -->
                  <mat-checkbox formControlName="livraison" class="checkbox-livraison">
                    <span>Je propose la livraison à domicile</span>
                  </mat-checkbox>

                  <div class="actions-etape">
                    <button mat-raised-button matStepperNext type="button" class="btn-suivant"
                      [disabled]="etape1.invalid">
                      Suivant
                      <mat-icon>arrow_forward</mat-icon>
                    </button>
                  </div>
                </div>
              </form>
            </mat-step>

            <!-- Étape 2 : Localisation -->
            <mat-step [stepControl]="etape2" label="Localisation de votre dépôt">
              <form [formGroup]="etape2">
                <ng-template matStepLabel>Localisation de votre dépôt</ng-template>

                <div class="etape-contenu">
                  <p class="description-localisation">
                    Votre position GPS permet aux clients de vous trouver facilement. Cliquez sur le bouton ci-dessous
                    ou saisissez manuellement vos coordonnées.
                  </p>

                  <button
                    mat-stroked-button
                    type="button"
                    class="btn-localiser"
                    (click)="utiliserMaPosition()"
                    [disabled]="chargementGeo()"
                  >
                    @if (chargementGeo()) {
                      <mat-spinner diameter="18"></mat-spinner>
                    } @else {
                      <mat-icon>my_location</mat-icon>
                    }
                    Utiliser ma position actuelle
                  </button>

                  @if (positionObtenue()) {
                    <div class="position-succes">
                      <mat-icon>check_circle</mat-icon>
                      Position enregistrée avec succès
                    </div>
                  }

                  <div class="deux-colonnes">
                    <mat-form-field appearance="outline">
                      <mat-label>Longitude</mat-label>
                      <input matInput type="number" formControlName="longitude"
                        placeholder="Ex: 2.3912" step="0.0001">
                      @if (etape2.get('longitude')?.invalid && etape2.get('longitude')?.touched) {
                        <mat-error>La longitude est obligatoire</mat-error>
                      }
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Latitude</mat-label>
                      <input matInput type="number" formControlName="latitude"
                        placeholder="Ex: 6.3703" step="0.0001">
                      @if (etape2.get('latitude')?.invalid && etape2.get('latitude')?.touched) {
                        <mat-error>La latitude est obligatoire</mat-error>
                      }
                    </mat-form-field>
                  </div>

                  @if (erreur) {
                    <div class="erreur">
                      <mat-icon>error</mat-icon>
                      {{ erreur }}
                    </div>
                  }

                  @if (erreur) {
                    <div class="erreur">
                      <mat-icon>error</mat-icon>
                      {{ erreur }}
                    </div>
                  }

                  <div class="actions-etape">
                    <button mat-button matStepperPrevious type="button">
                      <mat-icon>arrow_back</mat-icon>
                      Précédent
                    </button>
                    <button
                      mat-raised-button
                      type="button"
                      class="btn-inscrire"
                      (click)="soumettre()"
                      [disabled]="etape2.invalid || envoi"
                    >
                      @if (envoi) {
                        <mat-spinner diameter="18"></mat-spinner>
                      } @else {
                        <mat-icon>store</mat-icon>
                      }
                      Inscrire mon dépôt
                    </button>
                  </div>
                </div>
              </form>
            </mat-step>

            </mat-stepper>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .page-inscription {
      min-height: calc(100vh - 64px);
      background-color: var(--color-bg);
      padding: 40px 16px;
    }

    .entete-page {
      text-align: center;
      margin-bottom: 32px;

      h1 {
        font-family: 'Syne', sans-serif;
        font-size: 2rem;
        color: var(--color-text);
        margin-bottom: 8px;
      }

      .sous-titre {
        color: var(--color-text-muted);
        font-size: 1rem;
      }
    }

    .formulaire-carte {
      max-width: 680px;
      margin: 0 auto;
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-border);
      padding: 32px;

      ::ng-deep .mat-stepper-vertical {
        background: transparent;
      }

      ::ng-deep .mat-step-header {
        padding: 16px 0;

        &:hover {
          background: transparent;
        }
      }

      ::ng-deep .mat-step-label {
        font-family: 'Syne', sans-serif;
        font-weight: 600;
        color: var(--color-text);
      }

      ::ng-deep .mat-step-icon {
        background-color: var(--color-primary) !important;
      }
    }

    .etat-depot {
      max-width: 680px;
      margin: 0 auto;
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-border);
      padding: 40px 32px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      color: var(--color-text-muted);

      mat-icon {
        font-size: 3rem;
        width: 3rem;
        height: 3rem;
        color: var(--color-primary);
      }

      h2 {
        margin: 0;
        font-family: 'Syne', sans-serif;
        font-size: 1.5rem;
        color: var(--color-text);
      }

      p {
        margin: 0;
      }
    }

    .etape-contenu {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 16px 0;
    }

    .champ-pleine-largeur {
      width: 100%;
    }

    .deux-colonnes {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;

      @media (max-width: 480px) {
        grid-template-columns: 1fr;
      }
    }

    .label-section {
      font-size: 0.85rem;
      color: var(--color-text-muted);
      margin-bottom: 8px;
      display: block;
    }

    .section-marques {
      background: var(--color-surface-2);
      border-radius: var(--radius-sm);
      padding: 14px;
    }

    .ajout-marque {
      display: flex;
      align-items: center;
      gap: 8px;

      .champ-marque {
        flex: 1;
      }

      button {
        color: var(--color-primary);
      }
    }

    .liste-marques {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
    }

    .chip-marque {
      background-color: var(--color-surface-3) !important;
      color: var(--color-text) !important;
    }

    .aide-marques {
      font-size: 0.82rem;
      color: var(--color-text-muted);
      font-style: italic;
    }

    .checkbox-livraison {
      color: var(--color-text);
    }

    .description-localisation {
      font-size: 0.88rem;
      color: var(--color-text-muted);
      line-height: 1.5;
    }

    .btn-localiser {
      border-color: var(--color-primary) !important;
      color: var(--color-primary) !important;
      gap: 8px;

      &:hover {
        background-color: var(--color-primary-light) !important;
      }

      mat-spinner {
        margin-right: 6px;
      }
    }

    .position-succes {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--color-success);
      font-size: 0.88rem;
      padding: 8px 12px;
      background: var(--color-success-bg);
      border-radius: var(--radius-sm);
    }

    .erreur {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--color-danger);
      font-size: 0.88rem;
      padding: 10px 14px;
      background: var(--color-danger-bg);
      border-radius: var(--radius-sm);
    }

    .actions-etape {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 8px;
    }

    .btn-suivant, .btn-inscrire {
      background-color: var(--color-primary) !important;
      color: white !important;

      &:disabled {
        background-color: var(--color-surface-3) !important;
        color: var(--color-text-muted) !important;
      }

      mat-spinner {
        margin-right: 6px;
      }
    }
  `]
})
export class RevendeurFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly revendeurService = inject(RevendeurService);
  private readonly geoService = inject(GeolocationService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  marques: string[] = [];
  envoi = false;
  erreur: string | null = null;
  readonly depotExistant = signal<Revendeur | null>(null);
  readonly chargementDepot = signal<boolean>(true);
  readonly chargementGeo = signal<boolean>(false);
  readonly positionObtenue = signal<boolean>(false);

  readonly etape1: FormGroup = this.fb.group({
    nom: ['', Validators.required],
    quartier: ['', Validators.required],
    telephone: ['', Validators.required],
    adresse: [''],
    email: ['', Validators.email],
    livraison: [false]
  });

  readonly etape2: FormGroup = this.fb.group({
    longitude: ['', Validators.required],
    latitude: ['', Validators.required]
  });

  ngOnInit(): void {
    this.revendeurService.getRevendeurByUserId().subscribe({
      next: revendeur => {
        this.depotExistant.set(revendeur);
        this.chargementDepot.set(false);
      },
      error: () => {
        this.chargementDepot.set(false);
      }
    });
  }

  ajouterMarque(marque: string): void {
    const marqueNettoyee = marque.trim();
    if (marqueNettoyee && !this.marques.includes(marqueNettoyee)) {
      this.marques = [...this.marques, marqueNettoyee];
    }
  }

  supprimerMarque(index: number): void {
    this.marques = this.marques.filter((_, i) => i !== index);
  }

  utiliserMaPosition(): void {
    this.chargementGeo.set(true);
    this.erreur = null;

    this.geoService.getCurrentPosition().subscribe({
      next: position => {
        this.etape2.patchValue({
          longitude: position.coords.longitude.toFixed(6),
          latitude: position.coords.latitude.toFixed(6)
        });
        this.chargementGeo.set(false);
        this.positionObtenue.set(true);
      },
      error: message => {
        this.chargementGeo.set(false);
        this.erreur = message;
      }
    });
  }

  soumettre(): void {
    if (this.etape1.invalid || this.etape2.invalid) {
      this.etape1.markAllAsTouched();
      this.etape2.markAllAsTouched();
      return;
    }

    this.envoi = true;
    this.erreur = null;

    const dto: RevendeurDTO = {
      nom: this.etape1.value.nom,
      quartier: this.etape1.value.quartier,
      telephone: this.etape1.value.telephone,
      adresse: this.etape1.value.adresse || '',
      email: this.etape1.value.email || undefined,
      livraison: this.etape1.value.livraison,
      marques: this.marques,
      location: [
        parseFloat(this.etape2.value.longitude),
        parseFloat(this.etape2.value.latitude)
      ]
    };

    this.revendeurService.inscrire(dto).subscribe({
      next: () => {
        this.envoi = false;
        this.snackBar.open('Votre dépôt a été inscrit avec succès !', 'OK', { duration: 5000 });
        this.router.navigate(['/revendeur/catalogue']);
      },
      error: err => {
        this.envoi = false;
        this.erreur = err.message || 'Une erreur s\'est produite lors de l\'inscription';
      }
    });
  }
}
