import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { NotificationService } from '../../../core/services/notification.service';
import { TypeNotification, Notification } from '../../../core/models/notification.model';

/**
 * Cloche de notifications dans la navbar.
 * Affiche le badge de non-lues et un menu déroulant des dernières notifications.
 */
@Component({
  selector: 'app-notification-bell',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule
  ],
  template: `
    <button
      mat-icon-button
      [matMenuTriggerFor]="menuNotifs"
      class="btn-cloche"
      (menuOpened)="onOuverture()"
    >
      <mat-icon
        [matBadge]="service.nbNonLues() || null"
        matBadgeColor="warn"
        matBadgeSize="small"
      >notifications</mat-icon>
    </button>

    <mat-menu #menuNotifs="matMenu" class="menu-notifications" xPosition="before">
      <!-- En-tête du menu -->
      <div class="notif-entete" (click)="$event.stopPropagation()">
        <span class="notif-titre">Notifications</span>
        @if (service.nbNonLues() > 0) {
          <button class="btn-tout-lire" (click)="toutMarquerLu()">
            Tout marquer comme lu
          </button>
        }
      </div>

      <mat-divider></mat-divider>

      <!-- Liste des notifications -->
      <div class="notif-liste" (click)="$event.stopPropagation()">
        @for (notif of service.notifications().slice(0, 8); track notif.id) {
          <div
            class="notif-item"
            [class.non-lue]="!notif.lue"
            (click)="marquerLue(notif)"
          >
            <div class="notif-icone" [class]="classeIcone(notif.type)">
              <mat-icon>{{ icone(notif.type) }}</mat-icon>
            </div>
            <div class="notif-contenu">
              <p class="notif-titre-item">{{ notif.titre }}</p>
              <p class="notif-message">{{ notif.message }}</p>
              <span class="notif-date">{{ notif.createdAt | date:'d MMM, HH:mm' }}</span>
            </div>
          </div>
        } @empty {
          <div class="notif-vide">
            <mat-icon>notifications_none</mat-icon>
            <p>Aucune notification</p>
          </div>
        }
      </div>
    </mat-menu>
  `,
  styles: [`
    .btn-cloche {
      color: var(--color-text-muted) !important;

      &:hover {
        color: var(--color-text) !important;
      }

      ::ng-deep .mat-badge-content {
        font-size: 0.6rem;
        min-width: 16px;
        height: 16px;
        line-height: 16px;
      }
    }

    ::ng-deep .menu-notifications {
      .mat-mdc-menu-panel {
        max-width: 360px;
        width: 360px;
        background-color: var(--color-surface) !important;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md) !important;
      }
    }

    .notif-entete {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;

      .notif-titre {
        font-family: 'Syne', sans-serif;
        font-weight: 700;
        font-size: 0.95rem;
        color: var(--color-text);
      }

      .btn-tout-lire {
        background: none;
        border: none;
        color: var(--color-primary);
        font-size: 0.78rem;
        cursor: pointer;
        font-family: 'DM Sans', sans-serif;

        &:hover { text-decoration: underline; }
      }
    }

    .notif-liste {
      max-height: 380px;
      overflow-y: auto;
    }

    .notif-item {
      display: flex;
      gap: 12px;
      padding: 10px 16px;
      cursor: pointer;
      border-bottom: 1px solid var(--color-border);
      transition: background 0.15s;

      &:last-child { border-bottom: none; }

      &:hover { background: var(--color-surface-2); }

      &.non-lue {
        background: rgba(249, 115, 22, 0.05);
        border-left: 3px solid var(--color-primary);
      }
    }

    .notif-icone {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      mat-icon {
        font-size: 1.1rem;
        height: 1.1rem;
        width: 1.1rem;
      }

      &.commande   { background: rgba(249,115,22,0.15); color: var(--color-primary); }
      &.stock      { background: rgba(234,179,8,0.15);  color: var(--color-warning); }
      &.avis       { background: rgba(34,197,94,0.15);  color: var(--color-success); }
      &.info       { background: rgba(99,102,241,0.15); color: #6366F1; }
    }

    .notif-contenu {
      flex: 1;
      min-width: 0;
    }

    .notif-titre-item {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--color-text);
      margin-bottom: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .notif-message {
      font-size: 0.78rem;
      color: var(--color-text-muted);
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .notif-date {
      font-size: 0.72rem;
      color: var(--color-surface-3);
      display: block;
      margin-top: 3px;
    }

    .notif-vide {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 32px 16px;
      color: var(--color-text-muted);

      mat-icon {
        font-size: 2.5rem;
        height: 2.5rem;
        width: 2.5rem;
        color: var(--color-surface-3);
      }

      p { font-size: 0.88rem; }
    }
  `]
})
export class NotificationBellComponent {
  readonly service = inject(NotificationService);

  /** Appelé à l'ouverture du menu : recharge les notifications. */
  onOuverture(): void {
    this.service.charger();
  }

  marquerLue(notif: Notification): void {
    if (!notif.lue) {
      this.service.marquerLue(notif.id).subscribe();
      this.service.marquerLueLocalement(notif.id);
    }
  }

  toutMarquerLu(): void {
    this.service.marquerToutesLues().subscribe();
    this.service.toutMarquerLuLocalement();
  }

  icone(type: TypeNotification): string {
    const icones: Partial<Record<TypeNotification, string>> = {
      [TypeNotification.NOUVELLE_COMMANDE]:     'shopping_cart',
      [TypeNotification.COMMANDE_CONFIRMEE]:    'check_circle',
      [TypeNotification.COMMANDE_EN_LIVRAISON]: 'local_shipping',
      [TypeNotification.COMMANDE_LIVREE]:       'done_all',
      [TypeNotification.COMMANDE_ANNULEE]:      'cancel',
      [TypeNotification.STOCK_FAIBLE]:          'warning',
      [TypeNotification.STOCK_EPUISE]:          'remove_circle',
      [TypeNotification.NOUVEL_AVIS]:           'star',
      [TypeNotification.ABONNEMENT_EXPIRE]:     'card_membership',
      [TypeNotification.INFO_SYSTEME]:          'info',
    };
    return icones[type] ?? 'notifications';
  }

  classeIcone(type: TypeNotification): string {
    if ([TypeNotification.NOUVELLE_COMMANDE, TypeNotification.COMMANDE_CONFIRMEE,
         TypeNotification.COMMANDE_EN_LIVRAISON, TypeNotification.COMMANDE_LIVREE,
         TypeNotification.COMMANDE_ANNULEE].includes(type)) return 'commande';
    if ([TypeNotification.STOCK_FAIBLE, TypeNotification.STOCK_EPUISE].includes(type)) return 'stock';
    if (type === TypeNotification.NOUVEL_AVIS) return 'avis';
    return 'info';
  }
}
