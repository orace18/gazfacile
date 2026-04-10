import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RevendeurService } from '../../../core/services/revendeur.service';
import { AuthService } from '../../../core/services/auth.service';
import {
  ProduitRevendeur,
  ProduitRevendeurDTO,
  MarqueGaz,
  FormatBouteille,
  MARQUES_LABELS,
  FORMATS_LABELS,
  Revendeur
} from '../../../core/models/revendeur.model';
import { StockBadgeComponent } from '../../../shared/components/stock-badge/stock-badge.component';

@Component({
  selector: 'app-gestion-catalogue',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    StockBadgeComponent
  ],
  template: `
    <div class="page-catalogue">

      <!-- En-tête page -->
      <div class="page-header">
        <div class="header-contenu">
          <div>
            <h1 class="page-titre">Mon Catalogue</h1>
            <p class="page-sous-titre">Gérez vos prix et stocks par marque et format</p>
          </div>
          @if (revendeur()) {
            <div class="header-info-depot">
              <span class="depot-nom">{{ revendeur()!.nom }}</span>
              <app-stock-badge [stockStatus]="revendeur()!.stockStatus"></app-stock-badge>
            </div>
          }
        </div>
      </div>

      <div class="page-body">

        <!-- État de chargement -->
        @if (chargement()) {
          <div class="etat-chargement">
            <mat-spinner diameter="40"></mat-spinner>
            <p>Chargement du catalogue...</p>
          </div>
        }

        <!-- Pas de dépôt enregistré -->
        @if (!chargement() && !revendeur()) {
          <div class="etat-vide">
            <mat-icon>store_mall_directory</mat-icon>
            <h2>Aucun dépôt enregistré</h2>
            <p>Vous devez d'abord inscrire votre dépôt avant de gérer votre catalogue.</p>
            <a mat-raised-button routerLink="/revendeur/inscription" class="btn-inscrire">
              Inscrire mon dépôt
            </a>
          </div>
        }

        @if (!chargement() && revendeur()) {

          <!-- Formulaire ajout / édition -->
          <div class="section-formulaire">
            <h2 class="section-titre">
              {{ produitEnEdition() ? 'Modifier le produit' : 'Ajouter un produit' }}
            </h2>

            <form [formGroup]="formulaire" (ngSubmit)="soumettre()" class="formulaire-produit">

              <mat-form-field appearance="outline" class="champ">
                <mat-label>Marque</mat-label>
                <mat-select formControlName="marque">
                  @for (marque of marquesOptions; track marque.value) {
                    <mat-option [value]="marque.value">{{ marque.label }}</mat-option>
                  }
                </mat-select>
                @if (formulaire.get('marque')?.invalid && formulaire.get('marque')?.touched) {
                  <mat-error>Marque obligatoire</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline" class="champ">
                <mat-label>Format</mat-label>
                <mat-select formControlName="format">
                  @for (format of formatsOptions; track format.value) {
                    <mat-option [value]="format.value">{{ format.label }}</mat-option>
                  }
                </mat-select>
                @if (formulaire.get('format')?.invalid && formulaire.get('format')?.touched) {
                  <mat-error>Format obligatoire</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline" class="champ">
                <mat-label>Prix unitaire (FCFA)</mat-label>
                <input matInput type="number" formControlName="prixUnitaire" min="0" placeholder="Ex: 5500">
                <span matSuffix>FCFA</span>
                @if (formulaire.get('prixUnitaire')?.invalid && formulaire.get('prixUnitaire')?.touched) {
                  <mat-error>Prix invalide</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline" class="champ">
                <mat-label>Quantité disponible</mat-label>
                <input matInput type="number" formControlName="quantiteDisponible" min="0" placeholder="Ex: 20">
                @if (formulaire.get('quantiteDisponible')?.invalid && formulaire.get('quantiteDisponible')?.touched) {
                  <mat-error>Quantité invalide</mat-error>
                }
              </mat-form-field>

              <div class="champ champ-toggle">
                <mat-slide-toggle formControlName="disponible" color="primary">
                  Disponible à la vente
                </mat-slide-toggle>
              </div>

              <div class="form-actions">
                <button mat-raised-button type="submit" class="btn-valider"
                        [disabled]="formulaire.invalid || envoi()">
                  @if (envoi()) {
                    <mat-spinner diameter="18"></mat-spinner>
                  } @else {
                    <mat-icon>{{ produitEnEdition() ? 'save' : 'add' }}</mat-icon>
                  }
                  {{ produitEnEdition() ? 'Enregistrer' : 'Ajouter au catalogue' }}
                </button>

                @if (produitEnEdition()) {
                  <button mat-stroked-button type="button" class="btn-annuler" (click)="annulerEdition()">
                    <mat-icon>close</mat-icon>
                    Annuler
                  </button>
                }
              </div>
            </form>
          </div>

          <!-- Table du catalogue -->
          <div class="section-table">
            <div class="table-header">
              <h2 class="section-titre">
                Catalogue ({{ produits().length }} produit{{ produits().length > 1 ? 's' : '' }})
              </h2>
              <p class="table-aide">
                Le stock global se met à jour automatiquement selon les quantités.
              </p>
            </div>

            @if (produits().length === 0) {
              <div class="table-vide">
                <mat-icon>inventory_2</mat-icon>
                <p>Aucun produit dans votre catalogue. Ajoutez-en un ci-dessus.</p>
              </div>
            } @else {
              <div class="table-wrapper">
                <table mat-table [dataSource]="produits()" class="table-catalogue">

                  <!-- Marque -->
                  <ng-container matColumnDef="marque">
                    <th mat-header-cell *matHeaderCellDef>Marque</th>
                    <td mat-cell *matCellDef="let p">
                      <span class="badge-marque">{{ p.marqueLibelle }}</span>
                    </td>
                  </ng-container>

                  <!-- Format -->
                  <ng-container matColumnDef="format">
                    <th mat-header-cell *matHeaderCellDef>Format</th>
                    <td mat-cell *matCellDef="let p">
                      <span class="badge-format">{{ p.formatLibelle }}</span>
                    </td>
                  </ng-container>

                  <!-- Prix -->
                  <ng-container matColumnDef="prix">
                    <th mat-header-cell *matHeaderCellDef>Prix</th>
                    <td mat-cell *matCellDef="let p">
                      <span class="prix-valeur">{{ p.prixUnitaire | number:'1.0-0' }} FCFA</span>
                    </td>
                  </ng-container>

                  <!-- Quantité -->
                  <ng-container matColumnDef="quantite">
                    <th mat-header-cell *matHeaderCellDef>Quantité</th>
                    <td mat-cell *matCellDef="let p">
                      <span class="quantite-badge"
                            [class.epuise]="p.quantiteDisponible === 0"
                            [class.faible]="p.quantiteDisponible > 0 && p.quantiteDisponible <= 3">
                        {{ p.quantiteDisponible }}
                      </span>
                    </td>
                  </ng-container>

                  <!-- Disponible -->
                  <ng-container matColumnDef="disponible">
                    <th mat-header-cell *matHeaderCellDef>Statut</th>
                    <td mat-cell *matCellDef="let p">
                      @if (p.disponible) {
                        <span class="statut-dispo">Disponible</span>
                      } @else {
                        <span class="statut-indispo">Masqué</span>
                      }
                    </td>
                  </ng-container>

                  <!-- Actions -->
                  <ng-container matColumnDef="actions">
                    <th mat-header-cell *matHeaderCellDef></th>
                    <td mat-cell *matCellDef="let p">
                      <div class="actions-cellule">
                        <button mat-icon-button class="btn-edit"
                                (click)="editer(p)"
                                matTooltip="Modifier">
                          <mat-icon>edit</mat-icon>
                        </button>
                        <button mat-icon-button class="btn-delete"
                                (click)="confirmerSuppression(p)"
                                matTooltip="Supprimer">
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </td>
                  </ng-container>

                  <tr mat-header-row *matHeaderRowDef="colonnes"></tr>
                  <tr mat-row *matRowDef="let row; columns: colonnes;"
                      [class.row-indispo]="!row.disponible"></tr>
                </table>
              </div>
            }
          </div>

        }
      </div>
    </div>
  `,
  styles: [`
    .page-catalogue {
      min-height: calc(100vh - 64px);
      background-color: var(--color-bg);
    }

    /* ── Header ── */
    .page-header {
      background-color: var(--color-primary);
      padding: 28px 32px;
    }

    .header-contenu {
      max-width: 1100px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }

    .page-titre {
      font-family: 'Montserrat', sans-serif;
      font-size: 1.7rem;
      color: #FFFFFF;
      margin-bottom: 4px;
    }

    .page-sous-titre {
      font-size: 0.85rem;
      color: rgba(255,255,255,0.7);
      font-family: 'Montserrat', sans-serif;
    }

    .header-info-depot {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .depot-nom {
      font-family: 'Montserrat', sans-serif;
      font-weight: 700;
      color: rgba(255,255,255,0.9);
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* ── Body ── */
    .page-body {
      max-width: 1100px;
      margin: 0 auto;
      padding: 28px 24px;
    }

    .etat-chargement, .etat-vide {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 64px 16px;
      text-align: center;
      color: var(--color-text-muted);

      mat-icon {
        font-size: 3.5rem;
        height: 3.5rem;
        width: 3.5rem;
        color: var(--color-surface-3);
      }

      h2 {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.2rem;
        color: var(--color-text);
      }

      p { font-size: 0.9rem; }
    }

    .btn-inscrire {
      background-color: var(--color-accent) !important;
      color: white !important;
      border-radius: var(--radius-sm) !important;
      font-weight: 700 !important;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* ── Sections ── */
    .section-titre {
      font-family: 'Montserrat', sans-serif;
      font-size: 1.1rem;
      color: var(--color-text);
      margin-bottom: 16px;
    }

    /* ── Formulaire ── */
    .section-formulaire {
      background-color: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: 24px;
      margin-bottom: 24px;
    }

    .formulaire-produit {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: flex-start;
    }

    .champ {
      flex: 1;
      min-width: 180px;

      ::ng-deep .mdc-notched-outline__leading,
      ::ng-deep .mdc-notched-outline__notch,
      ::ng-deep .mdc-notched-outline__trailing {
        
      }
    }

    .champ-toggle {
      display: flex;
      align-items: center;
      padding-top: 8px;
      min-width: 180px;

      ::ng-deep .mat-slide-toggle-label {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.88rem;
        color: var(--color-text);
      }
    }

    .form-actions {
      display: flex;
      gap: 8px;
      align-items: center;
      padding-top: 8px;
      flex-wrap: wrap;
    }

    .btn-valider {
      background-color: var(--color-accent) !important;
      color: white !important;
      border-radius: var(--radius-sm) !important;
      font-weight: 700 !important;
      font-family: 'Montserrat', sans-serif !important;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      height: 44px;

      &:disabled {
        background-color: var(--color-surface-3) !important;
        color: var(--color-text-muted) !important;
      }

      mat-spinner { margin-right: 6px; }
    }

    .btn-annuler {
      border-color: var(--color-border) !important;
      color: var(--color-text-muted) !important;
      border-radius: var(--radius-sm) !important;
      height: 44px;
    }

    /* ── Table ── */
    .section-table {
      background-color: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .table-header {
      padding: 20px 24px 0;
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
    }

    .table-aide {
      font-size: 0.78rem;
      color: var(--color-text-muted);
      font-family: 'Montserrat', sans-serif;
    }

    .table-vide {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 48px 16px;
      color: var(--color-text-muted);
      text-align: center;

      mat-icon {
        font-size: 3rem;
        height: 3rem;
        width: 3rem;
        color: var(--color-surface-3);
      }

      p { font-size: 0.88rem; }
    }

    .table-wrapper {
      overflow-x: auto;
    }

    .table-catalogue {
      width: 100%;
      font-family: 'Montserrat', sans-serif;

      ::ng-deep .mat-mdc-header-cell {
        font-family: 'Montserrat', sans-serif;
        font-weight: 700;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--color-text-muted);
        background-color: var(--color-surface-2);
        border-bottom: 2px solid var(--color-border);
      }

      ::ng-deep .mat-mdc-row {
        border-bottom: 1px solid var(--color-border);
        transition: background-color 0.15s;

        &:hover { background-color: var(--color-surface-2); }
      }

      ::ng-deep .mat-mdc-row.row-indispo {
        opacity: 0.55;
      }
    }

    .badge-marque {
      background-color: var(--color-primary-light);
      color: var(--color-primary);
      padding: 3px 10px;
      border-radius: var(--radius-sm);
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .badge-format {
      background-color: var(--color-surface-2);
      color: var(--color-text);
      padding: 3px 10px;
      border-radius: var(--radius-sm);
      font-size: 0.78rem;
      font-weight: 600;
    }

    .prix-valeur {
      font-weight: 700;
      color: var(--color-text);
      font-size: 0.9rem;
    }

    .quantite-badge {
      display: inline-block;
      padding: 2px 10px;
      border-radius: var(--radius-sm);
      font-weight: 700;
      font-size: 0.88rem;
      background-color: var(--color-success-bg);
      color: var(--color-success);

      &.epuise {
        background-color: var(--color-danger-bg);
        color: var(--color-danger);
      }

      &.faible {
        background-color: var(--color-warning-bg);
        color: var(--color-accent-dark);
      }
    }

    .statut-dispo {
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--color-success);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .statut-indispo {
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--color-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .actions-cellule {
      display: flex;
      gap: 2px;
    }

    .btn-edit { color: var(--color-primary) !important; }
    .btn-delete { color: var(--color-danger) !important; }

    @media (max-width: 768px) {
      .page-header { padding: 20px 16px; }
      .page-body { padding: 16px; }
      .formulaire-produit { flex-direction: column; }
      .champ { min-width: 100%; }
      .section-formulaire { padding: 16px; }
    }
  `]
})
export class GestionCatalogueComponent implements OnInit {

  private readonly revendeurService = inject(RevendeurService);
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);

  readonly revendeur = signal<Revendeur | null>(null);
  readonly produits = signal<ProduitRevendeur[]>([]);
  readonly chargement = signal(true);
  readonly envoi = signal(false);
  readonly produitEnEdition = signal<ProduitRevendeur | null>(null);

  readonly colonnes = ['marque', 'format', 'prix', 'quantite', 'disponible', 'actions'];

  readonly marquesOptions = Object.values(MarqueGaz).map(v => ({
    value: v,
    label: MARQUES_LABELS[v]
  }));

  readonly formatsOptions = Object.values(FormatBouteille).map(v => ({
    value: v,
    label: FORMATS_LABELS[v]
  }));

  readonly formulaire = this.fb.group({
    marque: [null as MarqueGaz | null, Validators.required],
    format: [null as FormatBouteille | null, Validators.required],
    prixUnitaire: [0, [Validators.required, Validators.min(0)]],
    quantiteDisponible: [0, [Validators.required, Validators.min(0)]],
    disponible: [true]
  });

  ngOnInit(): void {
    const user = this.authService.currentUser();
    if (!user) return;

    // Charger le dépôt de l'utilisateur connecté
    this.revendeurService.loadAll();
    this.revendeurService.getRevendeurByUserId().subscribe({
      next: r => {
        this.revendeur.set(r);
        this.chargerCatalogue(r.id);
      },
      error: () => {
        this.chargement.set(false);
      }
    });
  }

  private chargerCatalogue(revendeurId: string): void {
    this.revendeurService.getCatalogue(revendeurId).subscribe({
      next: produits => {
        this.produits.set(produits);
        this.chargement.set(false);
      },
      error: () => {
        this.snackBar.open('Erreur lors du chargement du catalogue', 'Fermer', { duration: 4000 });
        this.chargement.set(false);
      }
    });
  }

  soumettre(): void {
    if (this.formulaire.invalid || !this.revendeur()) return;

    this.envoi.set(true);
    const dto = this.formulaire.value as ProduitRevendeurDTO;
    const revendeurId = this.revendeur()!.id;
    const enEdition = this.produitEnEdition();

    const appel$ = enEdition
      ? this.revendeurService.modifierProduit(revendeurId, enEdition.id, dto)
      : this.revendeurService.ajouterProduit(revendeurId, dto);

    appel$.subscribe({
      next: produit => {
        if (enEdition) {
          this.produits.update(liste => liste.map(p => p.id === produit.id ? produit : p));
          this.snackBar.open('Produit modifié', 'OK', { duration: 3000 });
        } else {
          this.produits.update(liste => [...liste, produit]);
          this.snackBar.open('Produit ajouté au catalogue', 'OK', { duration: 3000 });
        }
        // Rafraîchir le stock du revendeur
        this.revendeurService.getById(revendeurId).subscribe(r => this.revendeur.set(r));
        this.resetFormulaire();
        this.envoi.set(false);
      },
      error: err => {
        this.snackBar.open(err.message, 'Fermer', { duration: 5000 });
        this.envoi.set(false);
      }
    });
  }

  editer(produit: ProduitRevendeur): void {
    this.produitEnEdition.set(produit);
    this.formulaire.patchValue({
      marque: produit.marque,
      format: produit.format,
      prixUnitaire: produit.prixUnitaire,
      quantiteDisponible: produit.quantiteDisponible,
      disponible: produit.disponible
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  annulerEdition(): void {
    this.produitEnEdition.set(null);
    this.resetFormulaire();
  }

  confirmerSuppression(produit: ProduitRevendeur): void {
    const confirmMsg = `Supprimer ${produit.marqueLibelle} ${produit.formatLibelle} ?`;
    if (!confirm(confirmMsg)) return;

    this.revendeurService.supprimerProduit(this.revendeur()!.id, produit.id).subscribe({
      next: () => {
        this.produits.update(liste => liste.filter(p => p.id !== produit.id));
        this.revendeurService.getById(this.revendeur()!.id).subscribe(r => this.revendeur.set(r));
        this.snackBar.open('Produit supprimé', 'OK', { duration: 3000 });
      },
      error: err => {
        this.snackBar.open(err.message, 'Fermer', { duration: 4000 });
      }
    });
  }

  private resetFormulaire(): void {
    this.formulaire.reset({ disponible: true, prixUnitaire: 0, quantiteDisponible: 0 });
    this.produitEnEdition.set(null);
  }
}
