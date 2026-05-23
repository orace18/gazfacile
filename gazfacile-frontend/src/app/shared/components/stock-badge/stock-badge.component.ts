import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockStatus } from '../../../core/models/revendeur.model';

/**
 * Badge coloré indiquant le niveau de stock d'un revendeur.
 * Vert = EN_STOCK | Orange = STOCK_FAIBLE | Rouge = EPUISE
 */
@Component({
  selector: 'app-stock-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="badge-stock" [ngClass]="classBadge">
      <span class="indicateur"></span>
      {{ libelle }}
    </span>
  `,
  styles: [`
    .badge-stock {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 3px 10px;
      border-radius: 20px;
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .indicateur {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: currentColor;
      flex-shrink: 0;
    }

    .en-stock {
      background: rgba(34, 197, 94, 0.12);
      color: #22C55E;
      border: 1px solid rgba(34, 197, 94, 0.25);
    }

    .stock-faible {
      background: rgba(234, 179, 8, 0.12);
      color: #EAB308;
      border: 1px solid rgba(234, 179, 8, 0.25);
    }

    .epuise {
      background: rgba(239, 68, 68, 0.12);
      color: #EF4444;
      border: 1px solid rgba(239, 68, 68, 0.25);
    }
  `]
})
export class StockBadgeComponent {
  @Input({ required: true }) stockStatus!: StockStatus;

  get classBadge(): string {
    const classes: Record<StockStatus, string> = {
      [StockStatus.EN_STOCK]: 'en-stock',
      [StockStatus.STOCK_FAIBLE]: 'stock-faible',
      [StockStatus.EPUISE]: 'epuise'
    };
    return classes[this.stockStatus] ?? '';
  }

  get libelle(): string {
    const libelles: Record<StockStatus, string> = {
      [StockStatus.EN_STOCK]: 'En stock',
      [StockStatus.STOCK_FAIBLE]: 'Stock faible',
      [StockStatus.EPUISE]: 'Épuisé'
    };
    return libelles[this.stockStatus] ?? '';
  }
}
