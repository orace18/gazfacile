import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { AdminService } from '../../../core/services/admin.service';
import { DashboardStats } from '../../../core/models/notification.model';

/**
 * Tableau de bord administrateur GazFacile.
 * Affiche les KPIs, statistiques revendeurs, commandes et avis.
 */
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DecimalPipe,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatChipsModule,
    MatButtonModule
  ],
  template: `
    <div class="dashboard-page">
      <div class="container">

        <!-- En-tête -->
        <div class="dashboard-entete">
          <div>
            <h1>Tableau de bord</h1>
            <p class="sous-titre">Vue d'ensemble de la plateforme GazFacile</p>
          </div>
          <button mat-stroked-button class="btn-refresh" (click)="charger()">
            <mat-icon>refresh</mat-icon>
            Actualiser
          </button>
        </div>

        @if (chargement()) {
          <div class="chargement-centré">
            <mat-spinner diameter="48"></mat-spinner>
          </div>
        } @else if (stats()) {
          <!-- KPIs principaux -->
          <div class="kpi-grille">
            <div class="kpi-carte orange">
              <mat-icon>store</mat-icon>
              <div>
                <span class="kpi-valeur">{{ stats()!.totalRevendeurs }}</span>
                <span class="kpi-label">Revendeurs inscrits</span>
              </div>
            </div>
            <div class="kpi-carte vert">
              <mat-icon>check_circle</mat-icon>
              <div>
                <span class="kpi-valeur">{{ stats()!.revendeursActifs }}</span>
                <span class="kpi-label">Revendeurs actifs</span>
              </div>
            </div>
            <div class="kpi-carte bleu">
              <mat-icon>shopping_cart</mat-icon>
              <div>
                <span class="kpi-valeur">{{ stats()!.totalCommandes }}</span>
                <span class="kpi-label">Commandes totales</span>
              </div>
            </div>
            <div class="kpi-carte violet">
              <mat-icon>people</mat-icon>
              <div>
                <span class="kpi-valeur">{{ stats()!.totalUtilisateurs }}</span>
                <span class="kpi-label">Utilisateurs inscrits</span>
              </div>
            </div>
            <div class="kpi-carte jaune">
              <mat-icon>payments</mat-icon>
              <div>
                <span class="kpi-valeur">{{ stats()!.chiffreAffaireMois | number:'1.0-0' }}</span>
                <span class="kpi-label">CA ce mois (FCFA)</span>
              </div>
            </div>
            <div class="kpi-carte gris">
              <mat-icon>star</mat-icon>
              <div>
                <span class="kpi-valeur">{{ stats()!.noteMoyenneGlobale }}/5</span>
                <span class="kpi-label">Note moyenne globale</span>
              </div>
            </div>
          </div>

          <!-- Ligne 2 : Répartitions -->
          <div class="section-grille">

            <!-- Revendeurs par stock -->
            <mat-card class="section-carte">
              <mat-card-header>
                <mat-card-title>
                  <mat-icon>inventory_2</mat-icon>
                  État des stocks
                </mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="barre-stats">
                  @for (entry of objectEntries(stats()!.revendeurParStock); track entry[0]) {
                    <div class="stat-ligne">
                      <span class="stat-libelle">
                        <span class="dot" [class]="classeStock(entry[0])"></span>
                        {{ libelleStock(entry[0]) }}
                      </span>
                      <span class="stat-valeur">{{ entry[1] }}</span>
                    </div>
                    <div class="barre-progress">
                      <div
                        class="barre-remplissage"
                        [class]="classeStock(entry[0])"
                        [style.width.%]="pourcentage(entry[1], stats()!.revendeursActifs)"
                      ></div>
                    </div>
                  }
                </div>
              </mat-card-content>
            </mat-card>

            <!-- Revendeurs par abonnement -->
            <mat-card class="section-carte">
              <mat-card-header>
                <mat-card-title>
                  <mat-icon>card_membership</mat-icon>
                  Abonnements
                </mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="abonnements">
                  @for (entry of objectEntries(stats()!.revendeurParAbonnement); track entry[0]) {
                    <div class="abonnement-item">
                      <div class="abonnement-info">
                        <span class="abonnement-badge" [class]="'abo-' + entry[0].toLowerCase()">
                          {{ entry[0] }}
                        </span>
                        <span class="abonnement-nb">{{ entry[1] }} revendeur(s)</span>
                      </div>
                      <div class="abonnement-barre">
                        <div
                          class="barre-remplissage orange"
                          [style.width.%]="pourcentage(entry[1], stats()!.totalRevendeurs)"
                        ></div>
                      </div>
                    </div>
                  }
                </div>
              </mat-card-content>
            </mat-card>

            <!-- Commandes par statut -->
            <mat-card class="section-carte">
              <mat-card-header>
                <mat-card-title>
                  <mat-icon>receipt_long</mat-icon>
                  Commandes par statut
                </mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="barre-stats">
                  @for (entry of objectEntries(stats()!.commandesParStatut); track entry[0]) {
                    <div class="stat-ligne">
                      <span class="stat-libelle">{{ libelleStatut(entry[0]) }}</span>
                      <span class="stat-valeur">{{ entry[1] }}</span>
                    </div>
                  }
                </div>
              </mat-card-content>
            </mat-card>

            <!-- Commandes par mode de paiement -->
            <mat-card class="section-carte">
              <mat-card-header>
                <mat-card-title>
                  <mat-icon>payments</mat-icon>
                  Modes de paiement
                </mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="paiements">
                  @for (entry of objectEntries(stats()!.commandesParPaiement); track entry[0]) {
                    <div class="paiement-stat">
                      <span class="paiement-badge" [class]="'pay-' + entry[0].toLowerCase()">
                        {{ libellePaiement(entry[0]) }}
                      </span>
                      <span class="paiement-nb">{{ entry[1] }}</span>
                      <span class="paiement-pct">
                        ({{ pourcentage(entry[1], stats()!.totalCommandes) | number:'1.0-0' }}%)
                      </span>
                    </div>
                  }
                </div>
              </mat-card-content>
            </mat-card>

          </div>

          <!-- CA total -->
          <mat-card class="carte-ca">
            <mat-card-content>
              <div class="ca-contenu">
                <div>
                  <p class="ca-label">Chiffre d'affaires total de la plateforme</p>
                  <p class="ca-valeur">{{ stats()!.chiffreAffaireTotal | number:'1.0-0' }} FCFA</p>
                </div>
                <div class="ca-stats">
                  <div class="ca-stat">
                    <span class="ca-stat-nb">{{ stats()!.totalAvis }}</span>
                    <span class="ca-stat-label">avis publiés</span>
                  </div>
                  <div class="ca-stat">
                    <span class="ca-stat-nb">{{ stats()!.totalClients }}</span>
                    <span class="ca-stat-label">clients</span>
                  </div>
                  <div class="ca-stat">
                    <span class="ca-stat-nb">{{ stats()!.totalRevendeursInscrits }}</span>
                    <span class="ca-stat-label">revendeurs</span>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

        }

      </div>
    </div>
  `,
  styles: [`
    .dashboard-page {
      min-height: calc(100vh - 64px);
      background: var(--color-bg);
      padding: 32px 16px;
    }

    .dashboard-entete {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 28px;

      h1 {
        font-family: 'Syne', sans-serif;
        font-size: 1.8rem;
        color: var(--color-text);
        margin-bottom: 4px;
      }

      .sous-titre {
        color: var(--color-text-muted);
        font-size: 0.9rem;
      }
    }

    .btn-refresh {
      border-color: var(--color-border) !important;
      color: var(--color-text-muted) !important;
    }

    .chargement-centré {
      display: flex;
      justify-content: center;
      padding: 80px;
    }

    /* KPIs */
    .kpi-grille {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .kpi-carte {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      transition: transform 0.15s;

      &:hover { transform: translateY(-2px); }

      mat-icon {
        font-size: 2rem;
        height: 2rem;
        width: 2rem;
        opacity: 0.9;
        flex-shrink: 0;
      }

      &.orange mat-icon { color: var(--color-primary); }
      &.vert   mat-icon { color: var(--color-success); }
      &.bleu   mat-icon { color: #3B82F6; }
      &.violet mat-icon { color: #8B5CF6; }
      &.jaune  mat-icon { color: var(--color-warning); }
      &.gris   mat-icon { color: var(--color-text-muted); }
    }

    .kpi-valeur {
      display: block;
      font-family: 'Syne', sans-serif;
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--color-text);
      line-height: 1.1;
    }

    .kpi-label {
      display: block;
      font-size: 0.78rem;
      color: var(--color-text-muted);
      margin-top: 2px;
    }

    /* Sections */
    .section-grille {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
      margin-bottom: 20px;
    }

    .section-carte {
      background: var(--color-surface) !important;
      border: 1px solid var(--color-border) !important;

      ::ng-deep mat-card-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-family: 'Syne', sans-serif;
        font-size: 0.95rem !important;
        color: var(--color-text) !important;

        mat-icon { color: var(--color-primary); font-size: 1.1rem; height: 1.1rem; width: 1.1rem; }
      }
    }

    /* Barres de progression */
    .barre-stats { display: flex; flex-direction: column; gap: 8px; }

    .stat-ligne {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.85rem;
      color: var(--color-text-muted);
    }

    .stat-libelle {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .stat-valeur {
      font-weight: 600;
      color: var(--color-text);
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;

      &.en_stock   { background: var(--color-success); }
      &.stock_faible { background: var(--color-warning); }
      &.epuise     { background: var(--color-danger); }
    }

    .barre-progress {
      height: 6px;
      background: var(--color-surface-2);
      border-radius: 3px;
      overflow: hidden;
    }

    .barre-remplissage {
      height: 100%;
      border-radius: 3px;
      transition: width 0.5s ease;

      &.en_stock    { background: var(--color-success); }
      &.stock_faible { background: var(--color-warning); }
      &.epuise      { background: var(--color-danger); }
      &.orange      { background: var(--color-primary); }
    }

    /* Abonnements */
    .abonnements { display: flex; flex-direction: column; gap: 12px; }

    .abonnement-item { display: flex; flex-direction: column; gap: 4px; }

    .abonnement-info { display: flex; justify-content: space-between; align-items: center; }

    .abonnement-badge {
      font-size: 0.72rem;
      font-weight: 700;
      padding: 2px 10px;
      border-radius: 12px;
      letter-spacing: 0.05em;

      &.abo-gratuit  { background: var(--color-surface-3); color: var(--color-text-muted); }
      &.abo-standard { background: rgba(59,130,246,0.15); color: #3B82F6; }
      &.abo-premium  { background: rgba(249,115,22,0.15); color: var(--color-primary); }
    }

    .abonnement-nb { font-size: 0.82rem; color: var(--color-text-muted); }

    /* Paiements */
    .paiements { display: flex; flex-direction: column; gap: 8px; }

    .paiement-stat {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
    }

    .paiement-badge {
      font-size: 0.7rem;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 4px;
      min-width: 80px;
      text-align: center;

      &.pay-momo_mtn  { background: #FFC403; color: #000; }
      &.pay-momo_moov { background: #0050A0; color: white; }
      &.pay-celtiis_cash { background: #E8000D; color: white; }
      &.pay-especes   { background: var(--color-surface-2); color: var(--color-text-muted); }
    }

    .paiement-nb  { font-weight: 600; color: var(--color-text); }
    .paiement-pct { color: var(--color-text-muted); font-size: 0.78rem; }

    /* CA total */
    .carte-ca {
      background: linear-gradient(135deg, var(--color-surface), rgba(249,115,22,0.05)) !important;
      border: 1px solid var(--color-primary) !important;
      border-radius: var(--radius-md) !important;
    }

    .ca-contenu {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 24px;
      flex-wrap: wrap;
    }

    .ca-label {
      font-size: 0.9rem;
      color: var(--color-text-muted);
      margin-bottom: 4px;
    }

    .ca-valeur {
      font-family: 'Syne', sans-serif;
      font-size: 2rem;
      font-weight: 800;
      color: var(--color-primary);
    }

    .ca-stats {
      display: flex;
      gap: 24px;
    }

    .ca-stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }

    .ca-stat-nb {
      font-family: 'Syne', sans-serif;
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--color-text);
    }

    .ca-stat-label {
      font-size: 0.78rem;
      color: var(--color-text-muted);
    }

    @media (max-width: 600px) {
      .kpi-grille { grid-template-columns: repeat(2, 1fr); }
      .ca-contenu { flex-direction: column; }
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  private readonly adminService = inject(AdminService);

  readonly stats = signal<DashboardStats | null>(null);
  readonly chargement = signal<boolean>(false);

  readonly objectEntries = Object.entries;

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.chargement.set(true);
    this.adminService.getStats().subscribe({
      next: s => {
        this.stats.set(s);
        this.chargement.set(false);
      },
      error: () => this.chargement.set(false)
    });
  }

  pourcentage(valeur: number, total: number): number {
    return total > 0 ? (valeur / total) * 100 : 0;
  }

  libelleStock(statut: string): string {
    const m: Record<string, string> = {
      EN_STOCK: 'En stock', STOCK_FAIBLE: 'Stock faible', EPUISE: 'Épuisé'
    };
    return m[statut] ?? statut;
  }

  classeStock(statut: string): string {
    return statut.toLowerCase();
  }

  libelleStatut(statut: string): string {
    const m: Record<string, string> = {
      EN_ATTENTE: 'En attente', CONFIRMEE: 'Confirmée',
      EN_LIVRAISON: 'En livraison', LIVREE: 'Livrée', ANNULEE: 'Annulée'
    };
    return m[statut] ?? statut;
  }

  libellePaiement(mode: string): string {
    const m: Record<string, string> = {
      MOMO_MTN: 'MTN MoMo', MOMO_MOOV: 'Moov Money',
      CELTIIS_CASH: 'Celtiis Cash', ESPECES: 'Espèces'
    };
    return m[mode] ?? mode;
  }
}
