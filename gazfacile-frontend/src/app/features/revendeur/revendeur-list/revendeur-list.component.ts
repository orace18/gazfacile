import {
  Component,
  Output,
  EventEmitter,
  inject,
  signal,
  computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RevendeurService } from '../../../core/services/revendeur.service';
import { GeolocationService } from '../../../core/services/geolocation.service';
import { Revendeur, StockStatus } from '../../../core/models/revendeur.model';
import { RevendeurCardComponent } from '../revendeur-card/revendeur-card.component';

/**
 * Liste filtrée des revendeurs avec barre de recherche et filtres.
 * Émet des événements vers le parent pour centrer la carte ou ouvrir une commande.
 */
@Component({
  selector: 'app-revendeur-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    RevendeurCardComponent
  ],
  template: `
    <div class="liste-container">
      <!-- Barre de recherche -->
      <div class="barre-recherche">
        <mat-form-field appearance="outline" class="champ-recherche">
          <mat-icon matPrefix>search</mat-icon>
          <input
            matInput
            placeholder="Rechercher par nom, quartier..."
            [ngModel]="texteRecherche()"
            (ngModelChange)="texteRecherche.set($event)"
          >
          @if (texteRecherche()) {
            <button matSuffix mat-icon-button (click)="texteRecherche.set('')">
              <mat-icon>close</mat-icon>
            </button>
          }
        </mat-form-field>

        <button
          mat-raised-button
          class="btn-pres-de-moi"
          (click)="rechercherPresDeChezMoi()"
          [disabled]="chargementGeo()"
        >
          @if (chargementGeo()) {
            <mat-spinner diameter="18"></mat-spinner>
          } @else {
            <mat-icon>near_me</mat-icon>
          }
          Près de moi
        </button>
      </div>

      <!-- Filtres stock -->
      <div class="filtres">
        <mat-button-toggle-group
          [value]="filtreStock()"
          (change)="filtreStock.set($event.value)"
          class="toggle-stock"
        >
          <mat-button-toggle [value]="null">Tous</mat-button-toggle>
          <mat-button-toggle [value]="StockStatus.EN_STOCK">En stock</mat-button-toggle>
          <mat-button-toggle [value]="StockStatus.STOCK_FAIBLE">Stock faible</mat-button-toggle>
          <mat-button-toggle [value]="StockStatus.EPUISE">Épuisé</mat-button-toggle>
        </mat-button-toggle-group>
      </div>

      <!-- Indicateur de chargement -->
      @if (revendeurService.chargement()) {
        <div class="chargement">
          <mat-spinner diameter="36"></mat-spinner>
          <p>Chargement des revendeurs...</p>
        </div>
      }

      <!-- Message d'erreur -->
      @if (revendeurService.erreur()) {
        <div class="erreur-message">
          <mat-icon>error_outline</mat-icon>
          {{ revendeurService.erreur() }}
        </div>
      }

      <!-- Compteur de résultats -->
      @if (!revendeurService.chargement() && revendeursFiltres().length > 0) {
        <p class="compteur">
          {{ revendeursFiltres().length }} revendeur{{ revendeursFiltres().length > 1 ? 's' : '' }} trouvé{{ revendeursFiltres().length > 1 ? 's' : '' }}
        </p>
      }

      <!-- Liste des cartes -->
      <div class="liste-cartes">
        @for (revendeur of revendeursFiltres(); track revendeur.id) {
          <app-revendeur-card
            [revendeur]="revendeur"
            (selectionne)="revendeurSelectionne.emit($event)"
            (commander)="commanderRevendeur.emit($event)"
          ></app-revendeur-card>
        } @empty {
          @if (!revendeurService.chargement()) {
            <div class="aucun-resultat">
              <mat-icon>search_off</mat-icon>
              <p>Aucun revendeur trouvé avec ces critères.</p>
              <button mat-stroked-button (click)="reinitialiserFiltres()">
                Réinitialiser les filtres
              </button>
            </div>
          }
        }
      </div>
    </div>
  `,
  styles: [`
    .liste-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background-color: var(--color-surface);
    }

    .barre-recherche {
      display: flex;
      gap: 8px;
      align-items: center;
      padding: 12px 12px 0;
      background-color: var(--color-surface);
      border-bottom: 1px solid var(--color-border);
    }

    .champ-recherche {
      flex: 1;
      /* Supprimer l'espace réservé aux messages d'erreur sous le champ */
      ::ng-deep .mat-mdc-form-field-subscript-wrapper {
        display: none;
      }

      ::ng-deep .mat-mdc-form-field-infix {
        min-height: 44px;
        padding-top: 10px !important;
        padding-bottom: 10px !important;
      }

      ::ng-deep .mdc-notched-outline__leading,
      ::ng-deep .mdc-notched-outline__notch,
      ::ng-deep .mdc-notched-outline__trailing {
        border-color: var(--color-border);
      }

      ::ng-deep input {
        color: var(--color-text);
        font-family: 'Montserrat', sans-serif;
        font-size: 0.875rem;
      }

      ::ng-deep .mat-mdc-form-field-label {
        color: var(--color-text-muted);
      }
    }

    .btn-pres-de-moi {
      background-color: var(--color-primary) !important;
      color: white !important;
      border: none !important;
      border-radius: var(--radius-sm) !important;
      white-space: nowrap;
      /* Même hauteur que le champ sans le subscript */
      height: 44px;
      min-width: fit-content;
      gap: 4px;
      font-family: 'Montserrat', sans-serif !important;
      font-weight: 600 !important;
      font-size: 0.8rem !important;
      /* Aligner avec le bas du champ — compenser le label flottant */
      margin-bottom: 12px;

      &:hover {
        background-color: var(--color-primary-dark) !important;
      }

      mat-spinner {
        margin-right: 4px;
      }
    }

    .filtres {
      padding: 8px 12px;
      overflow-x: auto;
      border-bottom: 1px solid var(--color-border);
    }

    .toggle-stock {
      border-radius: 0 !important;

      ::ng-deep .mat-button-toggle {
        background-color: var(--color-surface) !important;
        color: var(--color-text-muted) !important;
        border-color: var(--color-border) !important;
        font-size: 0.78rem;
        border-radius: 0 !important;
      }

      ::ng-deep .mat-button-toggle-checked {
        background-color: var(--color-primary) !important;
        color: white !important;
      }
    }

    .chargement {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 40px 0;
      color: var(--color-text-muted);
    }

    .erreur-message {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      background-color: var(--color-danger-bg);
      color: var(--color-danger);
      border-radius: 0;
      margin: 8px 12px;
      font-size: 0.85rem;
      border-left: 3px solid var(--color-danger);
    }

    .compteur {
      font-size: 0.78rem;
      color: var(--color-text-muted);
      padding: 6px 16px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      background-color: var(--color-surface-2);
      border-bottom: 1px solid var(--color-border);
    }

    .liste-cartes {
      flex: 1;
      overflow-y: auto;
      padding: 12px;
      background-color: var(--color-bg);
    }

    .aucun-resultat {
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

      button {
        border-color: var(--color-primary) !important;
        color: var(--color-primary) !important;
        border-radius: 0 !important;
      }
    }
  `]
})
export class RevendeurListComponent {
  @Output() revendeurSelectionne = new EventEmitter<string>();
  @Output() commanderRevendeur = new EventEmitter<Revendeur>();

  readonly revendeurService = inject(RevendeurService);
  private readonly geoService = inject(GeolocationService);
  private readonly snackBar = inject(MatSnackBar);

  readonly texteRecherche = signal<string>('');
  readonly filtreStock = signal<StockStatus | null>(null);
  readonly chargementGeo = signal<boolean>(false);

  readonly StockStatus = StockStatus;

  /** Liste filtrée basée sur la recherche et le filtre de stock. */
  readonly revendeursFiltres = computed<Revendeur[]>(() => {
    const revendeurs = this.revendeurService.revendeurs();
    const recherche = this.texteRecherche().toLowerCase().trim();
    const filtre = this.filtreStock();

    return revendeurs.filter(r => {
      const correspondRecherche = !recherche || (
        r.nom.toLowerCase().includes(recherche) ||
        r.quartier.toLowerCase().includes(recherche) ||
        (r.adresse?.toLowerCase().includes(recherche) ?? false) ||
        r.marques.some(m => m.toLowerCase().includes(recherche))
      );

      const correspondStock = !filtre || r.stockStatus === filtre;

      return correspondRecherche && correspondStock;
    });
  });

  /** Lance une recherche géolocalisée. */
  rechercherPresDeChezMoi(): void {
    this.chargementGeo.set(true);

    this.geoService.getCurrentPosition().subscribe({
      next: position => {
        const { latitude, longitude } = position.coords;
        this.revendeurService.getNearby(latitude, longitude, 5000);
        this.chargementGeo.set(false);
        this.snackBar.open('Revendeurs proches trouvés', 'OK', { duration: 3000 });
      },
      error: message => {
        this.chargementGeo.set(false);
        this.snackBar.open(message, 'Fermer', {
          duration: 5000,
          panelClass: ['snack-error']
        });
      }
    });
  }

  /** Réinitialise tous les filtres. */
  reinitialiserFiltres(): void {
    this.texteRecherche.set('');
    this.filtreStock.set(null);
  }
}
