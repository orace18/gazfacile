import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RevendeurService } from '../../../core/services/revendeur.service';
import { StockStatus } from '../../../core/models/revendeur.model';

/**
 * Formulaire de mise à jour du stock d'un revendeur.
 * Peut être intégré dans la page de gestion du dépôt.
 */
@Component({
  selector: 'app-stock-update',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="stock-update-card">
      <h3 class="titre">
        <mat-icon>inventory_2</mat-icon>
        Mettre à jour le stock
      </h3>

      <form [formGroup]="formulaire" (ngSubmit)="soumettre()" class="formulaire">
        <mat-form-field appearance="outline" class="champ-pleine-largeur">
          <mat-label>Statut du stock</mat-label>
          <mat-select formControlName="stockStatus">
            <mat-option [value]="StockStatus.EN_STOCK">
              <span class="option-stock en-stock">● En stock</span>
            </mat-option>
            <mat-option [value]="StockStatus.STOCK_FAIBLE">
              <span class="option-stock stock-faible">● Stock faible</span>
            </mat-option>
            <mat-option [value]="StockStatus.EPUISE">
              <span class="option-stock epuise">● Épuisé</span>
            </mat-option>
          </mat-select>
        </mat-form-field>

        <button
          mat-raised-button
          type="submit"
          class="btn-mettre-a-jour"
          [disabled]="formulaire.invalid || envoi"
        >
          @if (envoi) {
            <mat-spinner diameter="18"></mat-spinner>
          } @else {
            <mat-icon>sync</mat-icon>
          }
          Mettre à jour
        </button>
      </form>

      <p class="info-ws">
        <mat-icon>wifi</mat-icon>
        La mise à jour est diffusée en temps réel à tous les clients connectés.
      </p>
    </div>
  `,
  styles: [`
    .stock-update-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: 20px;
    }

    .titre {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: 'Syne', sans-serif;
      font-size: 1rem;
      color: var(--color-text);
      margin-bottom: 16px;

      mat-icon {
        color: var(--color-primary);
      }
    }

    .formulaire {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .champ-pleine-largeur {
      width: 100%;
    }

    .option-stock {
      font-weight: 600;

      &.en-stock { color: var(--color-success); }
      &.stock-faible { color: var(--color-warning); }
      &.epuise { color: var(--color-danger); }
    }

    .btn-mettre-a-jour {
      background-color: var(--color-primary) !important;
      color: white !important;
      align-self: flex-start;

      &:disabled {
        background-color: var(--color-surface-3) !important;
        color: var(--color-text-muted) !important;
      }

      mat-spinner {
        margin-right: 6px;
      }
    }

    .info-ws {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.78rem;
      color: var(--color-text-muted);
      margin-top: 12px;

      mat-icon {
        font-size: 0.9rem;
        height: 0.9rem;
        width: 0.9rem;
        color: var(--color-success);
      }
    }
  `]
})
export class StockUpdateComponent {
  @Input({ required: true }) revendeurId!: string;

  private readonly revendeurService = inject(RevendeurService);
  private readonly fb = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);

  readonly StockStatus = StockStatus;
  envoi = false;

  readonly formulaire = this.fb.group({
    stockStatus: [StockStatus.EN_STOCK, Validators.required]
  });

  soumettre(): void {
    if (this.formulaire.invalid || !this.revendeurId) return;

    this.envoi = true;

    this.revendeurService.updateStock(this.revendeurId, {
      stockStatus: this.formulaire.value.stockStatus!
    }).subscribe({
      next: () => {
        this.envoi = false;
        this.snackBar.open('Stock mis à jour et diffusé en temps réel', 'OK', { duration: 3000 });
      },
      error: err => {
        this.envoi = false;
        this.snackBar.open(err.message || 'Erreur lors de la mise à jour', 'Fermer', { duration: 4000 });
      }
    });
  }
}
