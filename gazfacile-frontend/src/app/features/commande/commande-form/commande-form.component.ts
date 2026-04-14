import { Component, inject, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommandeService } from '../../../core/services/commande.service';
import { PaiementService } from '../../../core/services/paiement.service';
import { RevendeurService } from '../../../core/services/revendeur.service';
import { GeolocationService } from '../../../core/services/geolocation.service';
import { AuthService } from '../../../core/services/auth.service';
import {
  Revendeur,
  CommandeDTO,
  ModePaiement,
  TypeTransaction,
  ProduitRevendeur
} from '../../../core/models/revendeur.model';

export interface DialogCommandeData {
  revendeur: Revendeur;
}

@Component({
  selector: 'app-commande-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="dialog-commande">
      <h2 mat-dialog-title class="titre-dialog">
        <mat-icon>local_fire_department</mat-icon>
        Commander chez {{ data.revendeur.nom }}
      </h2>

      <mat-dialog-content class="contenu-dialog">
        <div class="info-revendeur">
          <p>
            <mat-icon class="icone-sm">place</mat-icon>
            {{ data.revendeur.quartier }}{{ data.revendeur.adresse ? ' — ' + data.revendeur.adresse : '' }}
          </p>
          <p>
            <mat-icon class="icone-sm">phone</mat-icon>
            {{ data.revendeur.telephone }}
          </p>
        </div>

        @if (chargementCatalogue) {
          <div class="chargement-centre">
            <mat-spinner diameter="36"></mat-spinner>
            <span>Chargement du catalogue du revendeur...</span>
          </div>
        } @else {
          <form [formGroup]="formulaire" class="formulaire">

            <mat-form-field appearance="outline" class="champ-pleine-largeur">
              <mat-label>Marque de gaz</mat-label>
              <mat-select formControlName="marque">
                @for (marque of marquesDisponibles; track marque) {
                  <mat-option [value]="marque">{{ getMarqueLabel(marque) }}</mat-option>
                }
              </mat-select>
              @if (formulaire.get('marque')?.invalid && formulaire.get('marque')?.touched) {
                <mat-error>Veuillez sélectionner une marque</mat-error>
              }
            </mat-form-field>

            <div class="groupe-taille">
              <label class="label-champ">Format disponible</label>
              <mat-radio-group formControlName="taille" class="radio-taille">
                @for (produit of produitsPourMarque; track produit.id) {
                  <mat-radio-button [value]="produit.format" class="radio-option">
                    <div class="option-taille">
                      <span class="taille-label">{{ produit.formatLibelle }}</span>
                      <span class="taille-prix">{{ produit.prixUnitaire | number:'1.0-0' }} FCFA</span>
                      <span class="taille-stock">{{ produit.quantiteDisponible }} disponible(s)</span>
                    </div>
                  </mat-radio-button>
                }
              </mat-radio-group>
            </div>

            <mat-form-field appearance="outline" class="champ-pleine-largeur">
              <mat-label>Quantité</mat-label>
              <input matInput type="number" formControlName="quantite" min="1" max="20">
              <mat-icon matSuffix>propane_tank</mat-icon>
              @if (formulaire.get('quantite')?.hasError('min')) {
                <mat-error>La quantité minimum est 1</mat-error>
              }
              @if (formulaire.get('quantite')?.hasError('max')) {
                <mat-error>La quantité maximum est 20</mat-error>
              }
            </mat-form-field>

            <div class="recapitulatif">
              <div class="ligne-prix">
                <span>Prix unitaire</span>
                <span>{{ prixUnitaire | number:'1.0-0' }} FCFA</span>
              </div>
              <div class="ligne-prix">
                <span>Quantité</span>
                <span>× {{ formulaire.get('quantite')?.value || 1 }}</span>
              </div>
              <div class="ligne-prix">
                <span>Sous-total gaz</span>
                <span>{{ sousTotal | number:'1.0-0' }} FCFA</span>
              </div>
              <div class="ligne-prix frais">
                <span>Frais de distance</span>
                <span>{{ fraisDistanceEstimes | number:'1.0-0' }} FCFA</span>
              </div>
              <div class="ligne-prix total">
                <span>Total estimé</span>
                <span class="montant-total">{{ totalEstime | number:'1.0-0' }} FCFA</span>
              </div>
              <div class="recap-note">
                Livraison gratuite jusqu'à 5 km, puis 200 FCFA par km entamé.
              </div>
            </div>

            <mat-form-field appearance="outline" class="champ-pleine-largeur">
              <mat-label>Votre numéro de téléphone</mat-label>
              <input matInput formControlName="clientTelephone" placeholder="0197000000">
              <mat-icon matPrefix>phone</mat-icon>
              @if (formulaire.get('clientTelephone')?.hasError('required') && formulaire.get('clientTelephone')?.touched) {
                <mat-error>Le numéro de téléphone est obligatoire</mat-error>
              }
              @if (formulaire.get('clientTelephone')?.hasError('pattern')) {
                <mat-error>Format invalide. Exemple: 0197000000</mat-error>
              }
            </mat-form-field>

            <div class="gps-actions">
              <button
                mat-stroked-button
                type="button"
                class="btn-gps"
                (click)="utiliserPositionGps()"
                [disabled]="geolocalisationEnCours"
              >
                @if (geolocalisationEnCours) {
                  <mat-spinner diameter="18"></mat-spinner>
                } @else {
                  <mat-icon>my_location</mat-icon>
                }
                Utiliser ma position GPS
              </button>
              @if (clientLocation) {
                <span class="gps-ok">
                  <mat-icon>verified</mat-icon>
                  Position GPS capturée
                </span>
              }
            </div>

            <mat-form-field appearance="outline" class="champ-pleine-largeur">
              <mat-label>Adresse de livraison</mat-label>
              <textarea matInput formControlName="clientAdresseLivraison" rows="2"
                placeholder="Votre adresse GPS sera préremplie. Ajoutez un repère si besoin."></textarea>
              <mat-icon matPrefix>home</mat-icon>
              @if (formulaire.get('clientAdresseLivraison')?.invalid && formulaire.get('clientAdresseLivraison')?.touched) {
                <mat-error>L'adresse de livraison est obligatoire</mat-error>
              }
            </mat-form-field>

            <div class="groupe-paiement">
              <label class="label-champ">Mode de paiement</label>
              <mat-radio-group formControlName="modePaiement" class="radio-paiement">
                <mat-radio-button [value]="ModePaiement.MOMO_MTN" class="radio-option paiement-option">
                  <div class="option-paiement">
                    <div class="paiement-logo-fedapay">
                      <mat-icon>payment</mat-icon>
                    </div>
                    <div class="paiement-info">
                      <span class="paiement-nom">Payer via FedaPay</span>
                      <span class="paiement-desc">MTN MoMo · Moov Money · Celtiis Cash</span>
                    </div>
                  </div>
                </mat-radio-button>

                <mat-radio-button [value]="ModePaiement.ESPECES" class="radio-option paiement-option">
                  <div class="option-paiement">
                    <div class="paiement-logo-especes">
                      <mat-icon>payments</mat-icon>
                    </div>
                    <div class="paiement-info">
                      <span class="paiement-nom">Espèces à la livraison</span>
                      <span class="paiement-desc">Paiement en cash au moment de la livraison</span>
                    </div>
                  </div>
                </mat-radio-button>
              </mat-radio-group>

              @if (formulaire.get('modePaiement')?.value !== ModePaiement.ESPECES) {
                <div class="info-fedapay">
                  <mat-icon>info</mat-icon>
                  Le montant final payé sera celui calculé côté serveur selon le catalogue et votre position GPS.
                </div>
              }
            </div>
          </form>
        }

        @if (erreur) {
          <div class="erreur">
            <mat-icon>error</mat-icon>
            {{ erreur }}
          </div>
        }
      </mat-dialog-content>

      <mat-dialog-actions class="actions-dialog">
        <button mat-button (click)="dialogRef.close()" [disabled]="envoi">
          Annuler
        </button>
        <button
          mat-raised-button
          class="btn-confirmer"
          (click)="soumettre()"
          [disabled]="formulaire.invalid || envoi || chargementCatalogue"
        >
          @if (envoi) {
            <mat-spinner diameter="18"></mat-spinner>
          } @else {
            <mat-icon>{{ formulaire.get('modePaiement')?.value === ModePaiement.ESPECES ? 'check_circle' : 'open_in_new' }}</mat-icon>
          }
          {{ formulaire.get('modePaiement')?.value === ModePaiement.ESPECES ? 'Confirmer la commande' : 'Confirmer et payer' }}
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .dialog-commande {
      max-width: 540px;
    }

    .titre-dialog {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: 'Montserrat', sans-serif;
      color: var(--color-primary) !important;
      padding: 16px 24px 0;

      mat-icon {
        color: var(--color-primary);
      }
    }

    .contenu-dialog {
      padding: 16px 24px !important;
      max-height: 70vh;
    }

    .info-revendeur {
      background: var(--color-surface-2);
      border-radius: var(--radius-sm);
      padding: 10px 14px;
      margin-bottom: 16px;

      p {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.85rem;
        color: var(--color-text-muted);
        margin: 3px 0;
      }
    }

    .chargement-centre {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      padding: 28px 0;
      color: var(--color-text-muted);
      font-size: 0.9rem;
    }

    .formulaire {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .champ-pleine-largeur {
      width: 100%;
    }

    .label-champ {
      font-size: 0.85rem;
      color: var(--color-text-muted);
      margin-bottom: 8px;
      display: block;
    }

    .groupe-taille, .groupe-paiement {
      margin-bottom: 4px;
    }

    .radio-taille {
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

    .option-taille {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 10px 12px;
      background: var(--color-surface-2);
      border-radius: var(--radius-sm);
      border: 1px solid var(--color-border);
      cursor: pointer;
      transition: border-color 0.2s;

      .taille-label {
        font-weight: 600;
        color: var(--color-text);
      }

      .taille-prix {
        font-size: 0.8rem;
        color: var(--color-primary);
      }

      .taille-stock {
        font-size: 0.74rem;
        color: var(--color-text-muted);
      }
    }

    .recapitulatif {
      background: var(--color-surface-2);
      border-radius: var(--radius-sm);
      padding: 12px 16px;
      border: 1px solid var(--color-border);
    }

    .ligne-prix {
      display: flex;
      justify-content: space-between;
      font-size: 0.85rem;
      color: var(--color-text-muted);
      margin-bottom: 6px;

      &.frais {
        color: var(--color-warning);
        font-size: 0.78rem;
      }

      &.total {
        border-top: 1px solid var(--color-border);
        padding-top: 8px;
        margin-top: 4px;
        font-weight: 600;
        color: var(--color-text);
      }
    }

    .montant-total {
      color: var(--color-primary);
      font-size: 1rem;
      font-weight: 700;
    }

    .recap-note {
      font-size: 0.74rem;
      color: var(--color-text-muted);
      margin-top: 6px;
    }

    .gps-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 2px;
      flex-wrap: wrap;
    }

    .btn-gps {
      color: var(--color-primary) !important;
      border-color: var(--color-primary) !important;
    }

    .gps-ok {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.78rem;
      color: var(--color-success, #2e7d32);

      mat-icon {
        font-size: 0.95rem;
        width: 0.95rem;
        height: 0.95rem;
      }
    }

    .radio-paiement {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .paiement-option {
      width: 100%;
    }

    .option-paiement {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 12px;
      background: var(--color-surface-2);
      border-radius: var(--radius-sm);
      cursor: pointer;
    }

    .paiement-info {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }

    .paiement-nom {
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--color-text);
    }

    .paiement-desc {
      font-size: 0.75rem;
      color: var(--color-text-muted);
    }

    .paiement-logo-fedapay {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-sm);
      background: var(--color-primary);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .paiement-logo-especes {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-sm);
      background: var(--color-success, #2e7d32);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .info-fedapay {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 8px;
      padding: 8px 12px;
      background: color-mix(in srgb, var(--color-primary) 10%, transparent);
      border-left: 3px solid var(--color-primary);
      border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
      font-size: 0.78rem;
      color: var(--color-primary);

      mat-icon {
        font-size: 1rem;
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
      }
    }

    .erreur {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      background: var(--color-danger-bg);
      color: var(--color-danger);
      border-radius: var(--radius-sm);
      font-size: 0.85rem;
      margin-top: 8px;
    }

    .actions-dialog {
      padding: 8px 24px 16px !important;
      gap: 8px;
      justify-content: flex-end;
    }

    .btn-confirmer {
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

    .icone-sm {
      font-size: 1rem !important;
      height: 1rem !important;
      width: 1rem !important;
    }
  `]
})
export class CommandeFormComponent implements OnInit {
  readonly data = inject<DialogCommandeData>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<CommandeFormComponent>);
  private readonly commandeService = inject(CommandeService);
  private readonly paiementService = inject(PaiementService);
  private readonly revendeurService = inject(RevendeurService);
  private readonly geolocationService = inject(GeolocationService);
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);
  private readonly ngZone = inject(NgZone);

  readonly ModePaiement = ModePaiement;

  formulaire!: FormGroup;
  catalogue: ProduitRevendeur[] = [];
  chargementCatalogue = true;
  geolocalisationEnCours = false;
  envoi = false;
  erreur: string | null = null;
  clientLocation: [number, number] | null = null;

  get marquesDisponibles(): string[] {
    return [...new Set(this.catalogue.map(produit => produit.marque))];
  }

  get produitsPourMarque(): ProduitRevendeur[] {
    const marque = this.formulaire?.get('marque')?.value;
    if (!marque) {
      return [];
    }

    return this.catalogue
      .filter(produit => produit.marque === marque)
      .sort((a, b) => this.getFormatOrder(a.format) - this.getFormatOrder(b.format));
  }

  get produitSelectionne(): ProduitRevendeur | undefined {
    const marque = this.formulaire?.get('marque')?.value;
    const taille = this.formulaire?.get('taille')?.value;
    return this.catalogue.find(produit => produit.marque === marque && produit.format === taille);
  }

  get prixUnitaire(): number {
    return this.produitSelectionne?.prixUnitaire ?? 0;
  }

  get sousTotal(): number {
    const quantite = Math.max(1, this.formulaire?.get('quantite')?.value ?? 1);
    return this.prixUnitaire * quantite;
  }

  get distanceKmEstimee(): number {
    if (!this.clientLocation || !this.data.revendeur.location) {
      return 0;
    }

    return this.calculerDistanceKm(this.clientLocation, this.data.revendeur.location);
  }

  get fraisDistanceEstimes(): number {
    if (this.distanceKmEstimee <= 5) {
      return 0;
    }

    return Math.ceil((this.distanceKmEstimee - 5) * 200);
  }

  get totalEstime(): number {
    return this.sousTotal + this.fraisDistanceEstimes;
  }

  ngOnInit(): void {
    this.formulaire = this.fb.group({
      marque: ['', Validators.required],
      taille: ['', Validators.required],
      quantite: [1, [Validators.required, Validators.min(1), Validators.max(20)]],
      clientTelephone: [
        this.authService.currentUser()?.telephone ?? '',
        [Validators.required, Validators.pattern(/^(\+229|00229)?\s*\d{10}$/)]
      ],
      clientAdresseLivraison: ['', Validators.required],
      modePaiement: [ModePaiement.MOMO_MTN, Validators.required]
    });

    this.formulaire.get('marque')?.valueChanges.subscribe(() => this.synchroniserFormatSelection());

    this.chargerCatalogue();
    this.utiliserPositionGps();
  }

  chargerCatalogue(): void {
    this.chargementCatalogue = true;
    this.erreur = null;

    this.revendeurService.getCatalogue(this.data.revendeur.id).subscribe({
      next: produits => {
        this.catalogue = produits.filter(produit => produit.disponible && produit.quantiteDisponible > 0);
        this.chargementCatalogue = false;

        if (this.catalogue.length === 0) {
          this.erreur = 'Aucun produit disponible dans le catalogue de ce revendeur.';
          return;
        }

        const premierProduit = this.catalogue[0];
        this.formulaire.patchValue({
          marque: premierProduit.marque,
          taille: premierProduit.format
        });
      },
      error: err => {
        this.chargementCatalogue = false;
        this.erreur = err.message || 'Impossible de charger le catalogue du revendeur.';
      }
    });
  }

  synchroniserFormatSelection(): void {
    const produits = this.produitsPourMarque;
    const controleTaille = this.formulaire.get('taille');

    if (!controleTaille) {
      return;
    }

    const valeurCourante = controleTaille.value;
    if (!produits.some(produit => produit.format === valeurCourante)) {
      controleTaille.setValue(produits[0]?.format ?? '');
    }
  }

  utiliserPositionGps(): void {
    this.geolocalisationEnCours = true;
    this.erreur = null;

    this.geolocationService.getCurrentPosition().subscribe({
      next: async position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.clientLocation = [longitude, latitude];

        const adresse = await this.reverseGeocode(latitude, longitude);
        this.formulaire.patchValue({
          clientAdresseLivraison: adresse
        });

        this.geolocalisationEnCours = false;
      },
      error: message => {
        this.geolocalisationEnCours = false;
        this.erreur = String(message);
      }
    });
  }

  soumettre(): void {
    if (this.formulaire.invalid) {
      this.formulaire.markAllAsTouched();
      return;
    }

    if (!this.clientLocation) {
      this.erreur = 'Activez la localisation GPS pour calculer la distance et confirmer la livraison.';
      return;
    }

    const produit = this.produitSelectionne;
    if (!produit) {
      this.erreur = 'Le produit sélectionné est introuvable dans le catalogue.';
      return;
    }

    this.envoi = true;
    this.erreur = null;

    const valeurs = this.formulaire.value;
    const dto: CommandeDTO = {
      revendeurId: this.data.revendeur.id,
      clientTelephone: valeurs.clientTelephone,
      clientAdresseLivraison: valeurs.clientAdresseLivraison,
      clientLocation: this.clientLocation,
      marque: produit.marque,
      taille: produit.format,
      quantite: valeurs.quantite,
      modePaiement: valeurs.modePaiement
    };

    this.commandeService.creer(dto).subscribe({
      next: commande => {
        if (valeurs.modePaiement === ModePaiement.ESPECES) {
          this.envoi = false;
          this.snackBar.open('Commande passée. Paiement prévu à la livraison.', 'OK', { duration: 5000 });
          this.dialogRef.close(commande);
          return;
        }

        this.paiementService.initierPaiement({
          type: TypeTransaction.COMMANDE,
          montant: Math.round(commande.total),
          description: `Commande gaz ${produit.marqueLibelle} ${produit.formatLibelle} × ${valeurs.quantite} — ${this.data.revendeur.nom}`,
          clientTelephone: valeurs.clientTelephone,
          commandeId: commande.id
        }).subscribe({
          next: response => {
            this.dialogRef.close(commande);
            this.paiementService.redirectVersCheckout(response.checkoutUrl);
          },
          error: err => {
            this.envoi = false;
            this.erreur = err.message || 'Commande créée mais paiement impossible à initier.';
          }
        });
      },
      error: err => {
        this.envoi = false;
        this.erreur = err.message || 'Une erreur s\'est produite lors de la commande.';
      }
    });
  }

  getMarqueLabel(marque: string): string {
    return this.catalogue.find(produit => produit.marque === marque)?.marqueLibelle ?? marque;
  }

  private getFormatOrder(format: string): number {
    return ({
      KG_3: 3,
      KG_6: 6,
      KG_12: 12,
      KG_25: 25,
      KG_38: 38
    } as Record<string, number>)[format] ?? 999;
  }

  private reverseGeocode(latitude: number, longitude: number): Promise<string> {
    return new Promise(resolve => {
      if (typeof google === 'undefined' || !google.maps?.Geocoder) {
        resolve(this.formatAdresseGps(latitude, longitude));
        return;
      }

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        { location: { lat: latitude, lng: longitude } },
        (results, status) => {
          this.ngZone.run(() => {
            if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
              resolve(results[0].formatted_address);
            } else {
              resolve(this.formatAdresseGps(latitude, longitude));
            }
          });
        }
      );
    });
  }

  private formatAdresseGps(latitude: number, longitude: number): string {
    return `Position GPS: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
  }

  private calculerDistanceKm(point1: [number, number], point2: [number, number]): number {
    const lat1 = this.toRadians(point1[1]);
    const lat2 = this.toRadians(point2[1]);
    const deltaLat = this.toRadians(point2[1] - point1[1]);
    const deltaLng = this.toRadians(point2[0] - point1[0]);

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2)
      + Math.cos(lat1) * Math.cos(lat2)
      * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return 6371 * c;
  }

  private toRadians(value: number): number {
    return value * Math.PI / 180;
  }
}
