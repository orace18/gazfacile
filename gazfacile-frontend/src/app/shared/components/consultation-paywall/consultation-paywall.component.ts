import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Dialog affiché quand un visiteur anonyme a épuisé ses 3 consultations gratuites.
 */
@Component({
  selector: 'app-consultation-paywall',
  standalone: true,
  imports: [RouterModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="paywall">
      <div class="icone-verrou">
        <mat-icon>lock</mat-icon>
      </div>

      @if (data.estConnecte) {
        <h2 class="titre">Quota épuisé</h2>
        <p class="description">
          Vous avez utilisé toutes vos consultations disponibles.
          Renouvelez votre abonnement pour continuer.
        </p>

        @if (data.consultationsRestantes !== undefined || data.dateExpiration) {
          <div class="quota-details">
            @if (data.consultationsRestantes !== undefined) {
              <div class="quota-ligne">
                <mat-icon>visibility_off</mat-icon>
                <span>{{ data.consultationsRestantes }} consultation{{ data.consultationsRestantes > 1 ? 's' : '' }} restante{{ data.consultationsRestantes > 1 ? 's' : '' }}</span>
              </div>
            }
            @if (data.dateExpiration) {
              <div class="quota-ligne">
                <mat-icon>calendar_today</mat-icon>
                <span>Expire le {{ formatDate(data.dateExpiration) }}</span>
              </div>
            }
          </div>
        }

        <div class="avantages">
          <div class="avantage">
            <mat-icon>check_circle</mat-icon>
            Accès illimité aux revendeurs
          </div>
          <div class="avantage">
            <mat-icon>check_circle</mat-icon>
            Suivi de vos commandes
          </div>
          <div class="avantage">
            <mat-icon>check_circle</mat-icon>
            Notifications de stock en temps réel
          </div>
        </div>
        <div class="actions">
          <button
            mat-raised-button
            class="btn-inscription"
            routerLink="/abonnement/renouveler"
            (click)="dialogRef.close()"
          >
            <mat-icon>refresh</mat-icon>
            Renouveler mon abonnement
          </button>
        </div>
      } @else {
        <h2 class="titre">Quota gratuit atteint</h2>
        <p class="description">
          Vous avez consulté les détails de <strong>3 revendeurs</strong> gratuitement.
          Créez un compte pour continuer à trouver du gaz près de chez vous.
        </p>
        <div class="avantages">
          <div class="avantage">
            <mat-icon>check_circle</mat-icon>
            Consultations illimitées
          </div>
          <div class="avantage">
            <mat-icon>check_circle</mat-icon>
            Suivi de vos commandes
          </div>
          <div class="avantage">
            <mat-icon>check_circle</mat-icon>
            Notifications de stock en temps réel
          </div>
        </div>
        <div class="actions">
          <button
            mat-raised-button
            class="btn-inscription"
            routerLink="/auth/register"
            (click)="dialogRef.close()"
          >
            <mat-icon>person_add</mat-icon>
            Créer un compte gratuit
          </button>
          <button
            mat-button
            class="btn-connexion"
            routerLink="/auth/login"
            (click)="dialogRef.close()"
          >
            J'ai déjà un compte
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .paywall {
      padding: 32px 24px;
      max-width: 400px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }

    .icone-verrou {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: color-mix(in srgb, var(--color-primary) 12%, transparent);
      display: flex;
      align-items: center;
      justify-content: center;

      mat-icon {
        font-size: 2.2rem;
        width: 2.2rem;
        height: 2.2rem;
        color: var(--color-primary);
      }
    }

    .titre {
      font-family: 'Montserrat', sans-serif;
      font-size: 1.3rem;
      color: var(--color-text);
      margin: 0;
    }

    .description {
      font-size: 0.88rem;
      color: var(--color-text-muted);
      line-height: 1.6;
      margin: 0;
    }

    .avantages {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
      background: var(--color-surface-2, #f5f7fa);
      border-radius: var(--radius-sm);
      padding: 14px 16px;
    }

    .avantage {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
      color: var(--color-text);

      mat-icon {
        font-size: 1.1rem;
        width: 1.1rem;
        height: 1.1rem;
        color: var(--color-success, #2e7d32);
        flex-shrink: 0;
      }
    }

    .actions {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
    }

    .btn-inscription {
      background-color: var(--color-accent) !important;
      color: #1a1a00 !important;
      height: 44px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .quota-details {
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 100%;
      padding: 10px 14px;
      background: var(--color-surface-2, #f5f7fa);
      border-radius: var(--radius-sm);
      border-left: 3px solid var(--color-warning);
    }

    .quota-ligne {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.83rem;
      color: var(--color-text);

      mat-icon {
        font-size: 1rem;
        width: 1rem;
        height: 1rem;
        color: var(--color-warning);
        flex-shrink: 0;
      }
    }

    .btn-connexion {
      color: var(--color-primary) !important;
    }
  `]
})
export class ConsultationPaywallComponent {
  readonly dialogRef = inject(MatDialogRef<ConsultationPaywallComponent>);
  readonly data: { estConnecte?: boolean; consultationsRestantes?: number; dateExpiration?: string } =
    inject<{ estConnecte?: boolean; consultationsRestantes?: number; dateExpiration?: string }>(
      MAT_DIALOG_DATA, { optional: true }
    ) ?? {};

  formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }
}
