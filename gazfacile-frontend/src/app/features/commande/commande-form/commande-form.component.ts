import { Component, inject, OnInit } from '@angular/core';
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
import {
  Revendeur,
  CommandeDTO,
  ModePaiement,
  TypeTransaction
} from '../../../core/models/revendeur.model';

export interface DialogCommandeData {
  revendeur: Revendeur;
}

/**
 * Formulaire de commande de gaz ouvert en dialog Angular Material.
 * Calcule le prix total dynamiquement selon la taille et la quantité.
 */
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
        <!-- Info revendeur -->
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

        <form [formGroup]="formulaire" class="formulaire">

          <!-- Marque -->
          <mat-form-field appearance="outline" class="champ-pleine-largeur">
            <mat-label>Marque de gaz</mat-label>
            <mat-select formControlName="marque">
              @for (marque of data.revendeur.marques; track marque) {
                <mat-option [value]="marque">{{ marque }}</mat-option>
              }
            </mat-select>
            @if (formulaire.get('marque')?.invalid && formulaire.get('marque')?.touched) {
              <mat-error>Veuillez sélectionner une marque</mat-error>
            }
          </mat-form-field>

          <!-- Taille -->
          <div class="groupe-taille">
            <label class="label-champ">Taille de la bouteille</label>
            <mat-radio-group formControlName="taille" class="radio-taille">
              <mat-radio-button value="6kg" class="radio-option">
                <div class="option-taille">
                  <span class="taille-label">6 kg</span>
                  <span class="taille-prix">5 500 FCFA</span>
                </div>
              </mat-radio-button>
              <mat-radio-button value="12kg" class="radio-option">
                <div class="option-taille">
                  <span class="taille-label">12 kg</span>
                  <span class="taille-prix">10 000 FCFA</span>
                </div>
              </mat-radio-button>
            </mat-radio-group>
          </div>

          <!-- Quantité -->
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

          <!-- Récapitulatif prix -->
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
              <span>{{ total | number:'1.0-0' }} FCFA</span>
            </div>
            <div class="ligne-prix frais">
              <span>Frais de service plateforme</span>
              <span>200 FCFA</span>
            </div>
            <div class="ligne-prix total">
              <span>Total à payer</span>
              <span class="montant-total">{{ total + 200 | number:'1.0-0' }} FCFA</span>
            </div>
          </div>

          <!-- Téléphone client -->
          <mat-form-field appearance="outline" class="champ-pleine-largeur">
            <mat-label>Votre numéro de téléphone</mat-label>
            <input matInput formControlName="clientTelephone" placeholder="+229 XX XX XX XX">
            <mat-icon matPrefix>phone</mat-icon>
            @if (formulaire.get('clientTelephone')?.hasError('required') && formulaire.get('clientTelephone')?.touched) {
              <mat-error>Le numéro de téléphone est obligatoire</mat-error>
            }
            @if (formulaire.get('clientTelephone')?.hasError('pattern')) {
              <mat-error>Format invalide (ex: 97000000)</mat-error>
            }
          </mat-form-field>

          <!-- Adresse livraison -->
          <mat-form-field appearance="outline" class="champ-pleine-largeur">
            <mat-label>Adresse de livraison</mat-label>
            <textarea matInput formControlName="clientAdresseLivraison" rows="2"
              placeholder="Quartier, rue, repère..."></textarea>
            <mat-icon matPrefix>home</mat-icon>
            @if (formulaire.get('clientAdresseLivraison')?.invalid && formulaire.get('clientAdresseLivraison')?.touched) {
              <mat-error>L'adresse de livraison est obligatoire</mat-error>
            }
          </mat-form-field>

          <!-- Mode de paiement -->
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
                Vous serez redirigé vers la page de paiement sécurisée FedaPay après confirmation.
              </div>
            }
          </div>

        </form>

        <!-- Message d'erreur -->
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
          [disabled]="formulaire.invalid || envoi"
        >
          @if (envoi) {
            <mat-spinner diameter="18"></mat-spinner>
          } @else {
            <mat-icon>check_circle</mat-icon>
          }
          Confirmer la commande
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .dialog-commande {
      max-width: 500px;
    }

    .titre-dialog {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: 'Syne', sans-serif;
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
      gap: 12px;
    }

    .radio-option {
      flex: 1;

      ::ng-deep .mdc-form-field {
        width: 100%;
      }
    }

    .option-taille {
      display: flex;
      flex-direction: column;
      padding: 8px 12px;
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

    .paiement-logo {
      width: 52px;
      height: 28px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.68rem;
      font-weight: 800;
      letter-spacing: 0.03em;
      flex-shrink: 0;

      &.mtn {
        background: #FFC403;
        color: #1a1a00;
      }

      &.moov {
        background: #0050A0;
        color: white;
      }

      &.celtiis {
        background: #E8000D;
        color: white;
      }

      &.especes {
        background: var(--color-surface-3);
        font-size: 1.1rem;
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
  private readonly fb = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);

  readonly ModePaiement = ModePaiement;

  formulaire!: FormGroup;
  envoi = false;
  erreur: string | null = null;

  /** Prix unitaire selon la taille sélectionnée. */
  get prixUnitaire(): number {
    return this.formulaire?.get('taille')?.value === '12kg' ? 10000 : 5500;
  }

  /** Total calculé dynamiquement. */
  get total(): number {
    const quantite = this.formulaire?.get('quantite')?.value ?? 1;
    return this.prixUnitaire * Math.max(1, quantite);
  }

  ngOnInit(): void {
    this.formulaire = this.fb.group({
      marque: [
        this.data.revendeur.marques?.[0] ?? '',
        Validators.required
      ],
      taille: ['6kg', Validators.required],
      quantite: [1, [Validators.required, Validators.min(1), Validators.max(20)]],
      clientTelephone: ['', [
        Validators.required,
        Validators.pattern(/^(\+229|00229)?[0-9]{8}$/)
      ]],
      clientAdresseLivraison: ['', Validators.required],
      modePaiement: [ModePaiement.ESPECES, Validators.required]
    });
  }

  /** Soumet la commande à l'API. */
  soumettre(): void {
    if (this.formulaire.invalid) {
      this.formulaire.markAllAsTouched();
      return;
    }

    this.envoi = true;
    this.erreur = null;

    const valeurs = this.formulaire.value;
    const dto: CommandeDTO = {
      revendeurId: this.data.revendeur.id,
      clientTelephone: valeurs.clientTelephone,
      clientAdresseLivraison: valeurs.clientAdresseLivraison,
      marque: valeurs.marque,
      taille: valeurs.taille,
      quantite: valeurs.quantite,
      modePaiement: valeurs.modePaiement
    };

    this.commandeService.creer(dto).subscribe({
      next: commande => {
        this.envoi = false;
        this.snackBar.open('Commande passée avec succès !', 'OK', { duration: 4000 });
        this.dialogRef.close(commande);
      },
      error: err => {
        this.envoi = false;
        this.erreur = err.message || 'Une erreur s\'est produite lors de la commande';
      }
    });
  }
}
