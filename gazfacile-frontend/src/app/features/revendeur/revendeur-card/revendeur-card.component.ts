import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { Revendeur, StockStatus } from '../../../core/models/revendeur.model';
import { StockBadgeComponent } from '../../../shared/components/stock-badge/stock-badge.component';
import { DistancePipe } from '../../../shared/pipes/distance.pipe';
import { ConsultationService } from '../../../core/services/consultation.service';
import { AuthService } from '../../../core/services/auth.service';
import { ConsultationPaywallComponent } from '../../../shared/components/consultation-paywall/consultation-paywall.component';

@Component({
  selector: 'app-revendeur-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    StockBadgeComponent,
    DistancePipe
  ],
  template: `
    <mat-card class="carte-revendeur" (click)="selectionne.emit(revendeur.id)">
      <mat-card-content>
        <div class="entete">
          <div class="info-principale">
            <h3 class="nom">
              {{ revendeur.nom }}
              @if (revendeur.abonnement === 'PREMIUM') {
                <mat-icon class="icone-premium" matTooltip="Revendeur Premium">workspace_premium</mat-icon>
              }
            </h3>
            <p class="quartier">
              <mat-icon class="icone-sm">place</mat-icon>
              {{ revendeur.quartier }}
              @if (revendeur.adresse) {
                — {{ revendeur.adresse }}
              }
            </p>
          </div>
          <app-stock-badge [stockStatus]="revendeur.stockStatus"></app-stock-badge>
        </div>

        <div class="details">
          <!-- Téléphone : flou si quota épuisé et non connecté -->
          <p class="detail-item" [class.detail-verrouille]="estVerrouille()">
            <mat-icon class="icone-sm">phone</mat-icon>
            @if (estVerrouille()) {
              <span class="tel-masque">+229 •• •• •• ••</span>
              <mat-icon class="icone-verrou" matTooltip="Créez un compte pour voir le numéro">lock</mat-icon>
            } @else {
              {{ revendeur.telephone }}
            }
          </p>

          @if (revendeur.livraison) {
            <p class="detail-item livraison-dispo">
              <mat-icon class="icone-sm">local_shipping</mat-icon>
              Livraison disponible
            </p>
          }

          @if (revendeur.distance !== undefined) {
            <p class="detail-item">
              <mat-icon class="icone-sm">near_me</mat-icon>
              {{ revendeur.distance | distance }}
            </p>
          }
        </div>

        @if (revendeur.marques && revendeur.marques.length > 0) {
          <div class="marques">
            @for (marque of revendeur.marques.slice(0, 4); track marque) {
              <mat-chip class="chip-marque">{{ marque }}</mat-chip>
            }
            @if (revendeur.marques.length > 4) {
              <mat-chip class="chip-marque">+{{ revendeur.marques.length - 4 }}</mat-chip>
            }
          </div>
        }

        @if (revendeur.nombreAvis > 0) {
          <div class="note">
            @for (etoile of etoiles; track $index) {
              <mat-icon class="etoile" [class.active]="$index < Math.round(revendeur.noteMoyenne)">
                star
              </mat-icon>
            }
            <span class="nb-avis">({{ revendeur.nombreAvis }} avis)</span>
          </div>
        }

        <!-- Compteur consultations restantes (visiteurs anonymes) -->
        @if (!authService.estConnecte() && consultationService.statut().consultationsRestantes < consultationService.statut().limite) {
          <div class="compteur-quota">
            <mat-icon>visibility</mat-icon>
            @if (consultationService.statut().consultationsRestantes > 0) {
              {{ consultationService.statut().consultationsRestantes }} consultation(s) gratuite(s) restante(s)
            } @else {
              Quota épuisé — <a routerLink="/auth/register" (click)="$event.stopPropagation()">Créer un compte</a>
            }
          </div>
        }
      </mat-card-content>

      <mat-card-actions class="actions" (click)="$event.stopPropagation()">
        <button mat-stroked-button class="btn-carte" (click)="selectionne.emit(revendeur.id)">
          <mat-icon>map</mat-icon>
          Voir sur la carte
        </button>
        <button
          mat-raised-button
          class="btn-commander"
          [disabled]="revendeur.stockStatus === StockStatus.EPUISE"
          [matTooltip]="revendeur.stockStatus === StockStatus.EPUISE ? 'Stock épuisé' : ''"
          (click)="onCommander()"
        >
          @if (estVerrouille()) {
            <mat-icon>lock</mat-icon>
            S'inscrire
          } @else {
            <mat-icon>shopping_cart</mat-icon>
            Commander
          }
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .carte-revendeur {
      background-color: var(--color-surface) !important;
      border: 1px solid var(--color-border) !important;
      border-radius: 0 !important;
      cursor: pointer;
      transition: border-color 0.2s, box-shadow 0.2s;
      margin-bottom: 10px;

      &:hover {
        border-color: var(--color-primary) !important;
        box-shadow: 0 4px 16px rgba(74, 111, 165, 0.15) !important;
      }
    }

    .entete {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 8px;
      margin-bottom: 10px;
    }

    .info-principale {
      flex: 1;
    }

    .nom {
      font-family: 'Montserrat', sans-serif;
      font-size: 0.95rem;
      font-weight: 400;
      color: var(--color-text);
      margin-bottom: 2px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .icone-premium {
      font-size: 1rem;
      width: 1rem;
      height: 1rem;
      color: var(--color-accent);
    }

    .quartier {
      font-size: 0.82rem;
      color: var(--color-text-muted);
      display: flex;
      align-items: center;
      gap: 2px;
    }

    .details {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 10px;
    }

    .detail-item {
      font-size: 0.83rem;
      color: var(--color-text-muted);
      display: flex;
      align-items: center;
      gap: 4px;

      &.livraison-dispo {
        color: var(--color-success);
        font-weight: 600;
      }

      &.detail-verrouille {
        opacity: 0.7;
      }
    }

    .tel-masque {
      letter-spacing: 0.1em;
      color: var(--color-text-muted);
    }

    .icone-verrou {
      font-size: 0.85rem;
      width: 0.85rem;
      height: 0.85rem;
      color: var(--color-text-muted);
      margin-left: 2px;
    }

    .icone-sm {
      font-size: 1rem !important;
      height: 1rem !important;
      width: 1rem !important;
    }

    .marques {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-bottom: 8px;
    }

    .chip-marque {
      background-color: var(--color-primary-light) !important;
      color: var(--color-primary) !important;
      font-size: 0.72rem !important;
      font-weight: 600 !important;
      height: 22px !important;
      border-radius: 0 !important;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .note {
      display: flex;
      align-items: center;
      gap: 2px;
      margin-bottom: 4px;
    }

    .etoile {
      font-size: 0.9rem !important;
      height: 0.9rem !important;
      width: 0.9rem !important;
      color: var(--color-surface-3);

      &.active {
        color: var(--color-accent);
      }
    }

    .nb-avis {
      font-size: 0.78rem;
      color: var(--color-text-muted);
      margin-left: 4px;
    }

    .compteur-quota {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.75rem;
      color: var(--color-text-muted);
      margin-top: 6px;
      padding: 4px 8px;
      background: var(--color-surface-2, #f5f7fa);
      border-radius: var(--radius-sm);

      mat-icon {
        font-size: 0.85rem;
        width: 0.85rem;
        height: 0.85rem;
      }

      a {
        color: var(--color-primary);
        font-weight: 600;
        text-decoration: none;

        &:hover { text-decoration: underline; }
      }
    }

    .actions {
      display: flex;
      gap: 8px;
      padding: 8px 16px 12px !important;
      border-top: 1px solid var(--color-border);
    }

    .btn-carte {
      flex: 1;
      border-color: var(--color-primary) !important;
      color: var(--color-primary) !important;
      font-size: 0.82rem !important;
      border-radius: 0 !important;
      font-weight: 600 !important;
    }

    .btn-commander {
      flex: 1;
      background-color: var(--color-accent) !important;
      color: #1a1a00 !important;
      font-size: 0.82rem !important;
      border-radius: 0 !important;
      font-weight: 700 !important;
      text-transform: uppercase;
      letter-spacing: 0.04em;

      &:hover:not(:disabled) {
        background-color: var(--color-accent-dark) !important;
      }

      &:disabled {
        background-color: var(--color-surface-3) !important;
        color: var(--color-text-muted) !important;
      }
    }
  `]
})
export class RevendeurCardComponent {
  @Input({ required: true }) revendeur!: Revendeur;
  @Output() selectionne = new EventEmitter<string>();
  @Output() commander = new EventEmitter<Revendeur>();

  readonly consultationService = inject(ConsultationService);
  readonly authService = inject(AuthService);
  private readonly dialog = inject(MatDialog);

  readonly StockStatus = StockStatus;
  readonly Math = Math;
  readonly etoiles = [1, 2, 3, 4, 5];

  /** Vrai si l'utilisateur n'est pas connecté ET a épuisé son quota. */
  estVerrouille(): boolean {
    return !this.authService.estConnecte()
        && !this.consultationService.statut().autorise;
  }

  /** Clic sur "Commander" : vérifier le quota avant d'émettre. */
  onCommander(): void {
    if (this.authService.estConnecte()) {
      this.commander.emit(this.revendeur);
      return;
    }

    // Visiteur anonyme : consommer une consultation
    this.consultationService.consulter().subscribe(statut => {
      if (statut.autorise) {
        this.commander.emit(this.revendeur);
      } else {
        this.dialog.open(ConsultationPaywallComponent, {
          maxWidth: '440px',
          width: '100%'
        });
      }
    });
  }
}
