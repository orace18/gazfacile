import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { AdminService, AdminUser, AdminCommande } from '../../../core/services/admin.service';
import { DashboardStats } from '../../../core/models/notification.model';
import { Revendeur, Abonnement, Transaction, StatutFedaPay } from '../../../core/models/revendeur.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule, DecimalPipe, DatePipe, FormsModule,
    MatCardModule, MatIconModule, MatProgressSpinnerModule,
    MatTableModule, MatButtonModule, MatTabsModule,
    MatChipsModule, MatSelectModule, MatTooltipModule, MatSnackBarModule
  ],
  template: `
    <div class="dashboard-page">
      <div class="container">

        <!-- En-tête -->
        <div class="dashboard-entete">
          <div>
            <h1>Tableau de bord Admin</h1>
            <p class="sous-titre">Vue d'ensemble et gestion de la plateforme GazFacile</p>
          </div>
          <button mat-stroked-button class="btn-refresh" (click)="chargerTout()">
            <mat-icon>refresh</mat-icon> Actualiser
          </button>
        </div>

        <!-- Navigation par onglets -->
        <mat-tab-group class="tabs-admin" animationDuration="150ms">

          <!-- ── Onglet 1 : Stats ── -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon>bar_chart</mat-icon>&nbsp;Statistiques
            </ng-template>

            @if (chargementStats()) {
              <div class="chargement-centre"><mat-spinner diameter="48"></mat-spinner></div>
            } @else if (stats()) {

              <div class="kpi-grille">
                <div class="kpi-carte couleur-primary">
                  <mat-icon>store</mat-icon>
                  <div>
                    <span class="kpi-valeur">{{ stats()!.totalRevendeurs }}</span>
                    <span class="kpi-label">Revendeurs inscrits</span>
                  </div>
                </div>
                <div class="kpi-carte couleur-success">
                  <mat-icon>check_circle</mat-icon>
                  <div>
                    <span class="kpi-valeur">{{ stats()!.revendeursActifs }}</span>
                    <span class="kpi-label">Revendeurs actifs</span>
                  </div>
                </div>
                <div class="kpi-carte couleur-bleu">
                  <mat-icon>shopping_cart</mat-icon>
                  <div>
                    <span class="kpi-valeur">{{ stats()!.totalCommandes }}</span>
                    <span class="kpi-label">Commandes totales</span>
                  </div>
                </div>
                <div class="kpi-carte couleur-violet">
                  <mat-icon>people</mat-icon>
                  <div>
                    <span class="kpi-valeur">{{ stats()!.totalUtilisateurs }}</span>
                    <span class="kpi-label">Utilisateurs inscrits</span>
                  </div>
                </div>
                <div class="kpi-carte couleur-accent">
                  <mat-icon>payments</mat-icon>
                  <div>
                    <span class="kpi-valeur">{{ stats()!.chiffreAffaireMois | number:'1.0-0' }}</span>
                    <span class="kpi-label">CA ce mois (FCFA)</span>
                  </div>
                </div>
                <div class="kpi-carte couleur-gris">
                  <mat-icon>star</mat-icon>
                  <div>
                    <span class="kpi-valeur">{{ stats()!.noteMoyenneGlobale }}/5</span>
                    <span class="kpi-label">Note moyenne globale</span>
                  </div>
                </div>
              </div>

              <div class="section-grille">
                <!-- Stocks -->
                <mat-card class="section-carte">
                  <mat-card-header>
                    <mat-card-title><mat-icon>inventory_2</mat-icon> État des stocks</mat-card-title>
                  </mat-card-header>
                  <mat-card-content>
                    @for (e of objectEntries(stats()!.revendeurParStock); track e[0]) {
                      <div class="stat-ligne">
                        <span><span class="dot" [class]="e[0].toLowerCase()"></span>{{ libelleStock(e[0]) }}</span>
                        <span class="stat-val">{{ e[1] }}</span>
                      </div>
                      <div class="barre-bg">
                        <div class="barre-fill" [class]="e[0].toLowerCase()"
                          [style.width.%]="pourcentage(e[1], stats()!.revendeursActifs)"></div>
                      </div>
                    }
                  </mat-card-content>
                </mat-card>

                <!-- Abonnements -->
                <mat-card class="section-carte">
                  <mat-card-header>
                    <mat-card-title><mat-icon>workspace_premium</mat-icon> Abonnements</mat-card-title>
                  </mat-card-header>
                  <mat-card-content>
                    @for (e of objectEntries(stats()!.revendeurParAbonnement); track e[0]) {
                      <div class="stat-ligne">
                        <span class="abo-badge" [class]="'abo-' + e[0].toLowerCase()">{{ e[0] }}</span>
                        <span class="stat-val">{{ e[1] }}</span>
                      </div>
                      <div class="barre-bg">
                        <div class="barre-fill couleur-primary"
                          [style.width.%]="pourcentage(e[1], stats()!.totalRevendeurs)"></div>
                      </div>
                    }
                  </mat-card-content>
                </mat-card>

                <!-- Commandes par statut -->
                <mat-card class="section-carte">
                  <mat-card-header>
                    <mat-card-title><mat-icon>receipt_long</mat-icon> Commandes par statut</mat-card-title>
                  </mat-card-header>
                  <mat-card-content>
                    @for (e of objectEntries(stats()!.commandesParStatut); track e[0]) {
                      <div class="stat-ligne">
                        <span>{{ libelleStatut(e[0]) }}</span>
                        <span class="stat-val">{{ e[1] }}</span>
                      </div>
                    }
                  </mat-card-content>
                </mat-card>

                <!-- CA total -->
                <mat-card class="section-carte carte-ca">
                  <mat-card-content>
                    <p class="ca-label">Chiffre d'affaires total</p>
                    <p class="ca-valeur">{{ stats()!.chiffreAffaireTotal | number:'1.0-0' }} FCFA</p>
                    <div class="ca-stats">
                      <div class="ca-stat">
                        <span class="ca-nb">{{ stats()!.totalAvis }}</span>
                        <span class="ca-desc">avis publiés</span>
                      </div>
                      <div class="ca-stat">
                        <span class="ca-nb">{{ stats()!.totalClients }}</span>
                        <span class="ca-desc">clients</span>
                      </div>
                      <div class="ca-stat">
                        <span class="ca-nb">{{ stats()!.totalRevendeursInscrits }}</span>
                        <span class="ca-desc">revendeurs</span>
                      </div>
                    </div>
                  </mat-card-content>
                </mat-card>
              </div>
            }
          </mat-tab>

          <!-- ── Onglet 2 : Revendeurs ── -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon>store</mat-icon>&nbsp;Revendeurs
            </ng-template>

            @if (chargementRevendeurs()) {
              <div class="chargement-centre"><mat-spinner diameter="40"></mat-spinner></div>
            } @else {
              <div class="table-wrapper">
                <table mat-table [dataSource]="revendeurs()" class="table-admin">
                  <ng-container matColumnDef="nom">
                    <th mat-header-cell *matHeaderCellDef>Nom / Quartier</th>
                    <td mat-cell *matCellDef="let r">
                      <strong>{{ r.nom }}</strong>
                      <span class="sous-ligne">{{ r.quartier }}</span>
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="telephone">
                    <th mat-header-cell *matHeaderCellDef>Téléphone</th>
                    <td mat-cell *matCellDef="let r">{{ r.telephone }}</td>
                  </ng-container>
                  <ng-container matColumnDef="abonnement">
                    <th mat-header-cell *matHeaderCellDef>Abonnement</th>
                    <td mat-cell *matCellDef="let r">
                      <mat-select [(ngModel)]="r.abonnement"
                        class="select-abo"
                        (ngModelChange)="changerAbonnement(r, $event)">
                        <mat-option value="GRATUIT">Gratuit</mat-option>
                        <mat-option value="STANDARD">Standard</mat-option>
                        <mat-option value="PREMIUM">Premium</mat-option>
                      </mat-select>
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="stock">
                    <th mat-header-cell *matHeaderCellDef>Stock</th>
                    <td mat-cell *matCellDef="let r">
                      <span class="badge-stock" [class]="'stock-' + r.stockStatus.toLowerCase()">
                        {{ libelleStock(r.stockStatus) }}
                      </span>
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="actif">
                    <th mat-header-cell *matHeaderCellDef>Statut</th>
                    <td mat-cell *matCellDef="let r">
                      <button mat-stroked-button
                        [class]="r.actif ? 'btn-actif' : 'btn-inactif'"
                        (click)="toggleRevendeur(r)">
                        <mat-icon>{{ r.actif ? 'visibility' : 'visibility_off' }}</mat-icon>
                        {{ r.actif ? 'Actif' : 'Inactif' }}
                      </button>
                    </td>
                  </ng-container>
                  <tr mat-header-row *matHeaderRowDef="colonnesRevendeurs"></tr>
                  <tr mat-row *matRowDef="let row; columns: colonnesRevendeurs;"></tr>
                </table>
              </div>
            }
          </mat-tab>

          <!-- ── Onglet 3 : Utilisateurs ── -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon>people</mat-icon>&nbsp;Utilisateurs
            </ng-template>

            @if (chargementUsers()) {
              <div class="chargement-centre"><mat-spinner diameter="40"></mat-spinner></div>
            } @else {
              <div class="table-wrapper">
                <table mat-table [dataSource]="utilisateurs()" class="table-admin">
                  <ng-container matColumnDef="nom">
                    <th mat-header-cell *matHeaderCellDef>Nom</th>
                    <td mat-cell *matCellDef="let u">
                      <strong>{{ u.nom }}</strong>
                      @if (u.googleId) {
                        <mat-icon class="icone-google" matTooltip="Compte Google">language</mat-icon>
                      }
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="telephone">
                    <th mat-header-cell *matHeaderCellDef>Téléphone</th>
                    <td mat-cell *matCellDef="let u">
                      {{ u.telephone }}
                      @if (u.telephoneVerifie) {
                        <mat-icon class="icone-verifie" matTooltip="Vérifié">verified</mat-icon>
                      }
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="roles">
                    <th mat-header-cell *matHeaderCellDef>Rôles</th>
                    <td mat-cell *matCellDef="let u">
                      @for (role of u.roles; track role) {
                        <span class="badge-role" [class]="'role-' + role.toLowerCase()">{{ role }}</span>
                      }
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="inscription">
                    <th mat-header-cell *matHeaderCellDef>Inscription</th>
                    <td mat-cell *matCellDef="let u">{{ u.createdAt | date:'dd/MM/yyyy' }}</td>
                  </ng-container>
                  <ng-container matColumnDef="actif">
                    <th mat-header-cell *matHeaderCellDef>Statut</th>
                    <td mat-cell *matCellDef="let u">
                      <button mat-icon-button
                        [matTooltip]="u.actif ? 'Désactiver' : 'Réactiver'"
                        (click)="toggleUser(u)">
                        <mat-icon [style.color]="u.actif ? 'var(--color-success)' : 'var(--color-danger)'">
                          {{ u.actif ? 'check_circle' : 'cancel' }}
                        </mat-icon>
                      </button>
                    </td>
                  </ng-container>
                  <tr mat-header-row *matHeaderRowDef="colonnesUsers"></tr>
                  <tr mat-row *matRowDef="let row; columns: colonnesUsers;"></tr>
                </table>
              </div>
            }
          </mat-tab>

          <!-- ── Onglet 4 : Commandes ── -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon>receipt_long</mat-icon>&nbsp;Commandes
            </ng-template>

            @if (chargementCommandes()) {
              <div class="chargement-centre"><mat-spinner diameter="40"></mat-spinner></div>
            } @else {
              <div class="table-wrapper">
                <table mat-table [dataSource]="commandes()" class="table-admin">
                  <ng-container matColumnDef="date">
                    <th mat-header-cell *matHeaderCellDef>Date</th>
                    <td mat-cell *matCellDef="let c">{{ c.createdAt | date:'dd/MM/yy HH:mm' }}</td>
                  </ng-container>
                  <ng-container matColumnDef="client">
                    <th mat-header-cell *matHeaderCellDef>Client</th>
                    <td mat-cell *matCellDef="let c">{{ c.clientTelephone }}</td>
                  </ng-container>
                  <ng-container matColumnDef="revendeur">
                    <th mat-header-cell *matHeaderCellDef>Revendeur</th>
                    <td mat-cell *matCellDef="let c">{{ c.revendeurNom }}</td>
                  </ng-container>
                  <ng-container matColumnDef="total">
                    <th mat-header-cell *matHeaderCellDef>Total</th>
                    <td mat-cell *matCellDef="let c">{{ c.total | number:'1.0-0' }} FCFA</td>
                  </ng-container>
                  <ng-container matColumnDef="paiement">
                    <th mat-header-cell *matHeaderCellDef>Paiement</th>
                    <td mat-cell *matCellDef="let c">
                      <span class="badge-paiement" [class]="'pay-' + c.statutPaiement.toLowerCase()">
                        {{ c.statutPaiement }}
                      </span>
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="statut">
                    <th mat-header-cell *matHeaderCellDef>Statut commande</th>
                    <td mat-cell *matCellDef="let c">
                      <mat-select [(ngModel)]="c.statutCommande" class="select-statut"
                        (ngModelChange)="changerStatutCommande(c, $event)">
                        <mat-option value="EN_ATTENTE">En attente</mat-option>
                        <mat-option value="CONFIRMEE">Confirmée</mat-option>
                        <mat-option value="EN_LIVRAISON">En livraison</mat-option>
                        <mat-option value="LIVREE">Livrée</mat-option>
                        <mat-option value="ANNULEE">Annulée</mat-option>
                      </mat-select>
                    </td>
                  </ng-container>
                  <tr mat-header-row *matHeaderRowDef="colonnesCommandes"></tr>
                  <tr mat-row *matRowDef="let row; columns: colonnesCommandes;"></tr>
                </table>
              </div>
            }
          </mat-tab>

          <!-- ── Onglet 5 : Transactions FedaPay ── -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon>payment</mat-icon>&nbsp;Transactions
            </ng-template>

            @if (chargementTransactions()) {
              <div class="chargement-centre"><mat-spinner diameter="40"></mat-spinner></div>
            } @else {
              <div class="table-wrapper">
                <table mat-table [dataSource]="transactions()" class="table-admin">
                  <ng-container matColumnDef="date">
                    <th mat-header-cell *matHeaderCellDef>Date</th>
                    <td mat-cell *matCellDef="let t">{{ t.createdAt | date:'dd/MM/yy HH:mm' }}</td>
                  </ng-container>
                  <ng-container matColumnDef="reference">
                    <th mat-header-cell *matHeaderCellDef>Référence</th>
                    <td mat-cell *matCellDef="let t">
                      <code>{{ t.reference }}</code>
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="type">
                    <th mat-header-cell *matHeaderCellDef>Type</th>
                    <td mat-cell *matCellDef="let t">
                      <span class="badge-type" [class]="'type-' + t.type.toLowerCase()">{{ t.type }}</span>
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="montant">
                    <th mat-header-cell *matHeaderCellDef>Montant</th>
                    <td mat-cell *matCellDef="let t">{{ t.montant | number:'1.0-0' }} FCFA</td>
                  </ng-container>
                  <ng-container matColumnDef="client">
                    <th mat-header-cell *matHeaderCellDef>Client</th>
                    <td mat-cell *matCellDef="let t">{{ t.clientTelephone }}</td>
                  </ng-container>
                  <ng-container matColumnDef="statut">
                    <th mat-header-cell *matHeaderCellDef>Statut</th>
                    <td mat-cell *matCellDef="let t">
                      <span class="badge-fedapay" [class]="'feda-' + t.statut.toLowerCase()">
                        {{ libelleStatutFeda(t.statut) }}
                      </span>
                    </td>
                  </ng-container>
                  <tr mat-header-row *matHeaderRowDef="colonnesTransactions"></tr>
                  <tr mat-row *matRowDef="let row; columns: colonnesTransactions;"></tr>
                </table>
              </div>
            }
          </mat-tab>

        </mat-tab-group>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-page {
      min-height: calc(100vh - 64px);
      background: var(--color-bg);
      padding: 28px 16px;
    }

    .container { max-width: 1200px; margin: 0 auto; }

    .dashboard-entete {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 20px;

      h1 {
        font-family: 'Archivo Black', sans-serif;
        font-size: 1.6rem;
        color: var(--color-primary);
        margin-bottom: 4px;
      }

      .sous-titre { color: var(--color-text-muted); font-size: 0.88rem; }
    }

    .btn-refresh { color: var(--color-text-muted) !important; }

    .chargement-centre { display: flex; justify-content: center; padding: 60px; }

    /* ── Tabs ── */
    .tabs-admin {
      ::ng-deep .mat-mdc-tab-header { background: var(--color-surface); border-bottom: 1px solid var(--color-border); }
      ::ng-deep .mat-mdc-tab-body-content { padding: 24px 0; }
      ::ng-deep .mat-mdc-tab .mdc-tab__text-label {
        display: flex; align-items: center; gap: 4px;
      }
    }

    /* ── KPI Grid ── */
    .kpi-grille {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
      gap: 14px;
      margin-bottom: 20px;
    }

    .kpi-carte {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: 18px;
      display: flex;
      align-items: center;
      gap: 14px;
      transition: transform 0.15s;

      &:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.08); }

      mat-icon { font-size: 1.8rem; height: 1.8rem; width: 1.8rem; flex-shrink: 0; }

      &.couleur-primary mat-icon { color: var(--color-primary); }
      &.couleur-success mat-icon { color: var(--color-success, #2e7d32); }
      &.couleur-bleu    mat-icon { color: #3B82F6; }
      &.couleur-violet  mat-icon { color: #8B5CF6; }
      &.couleur-accent  mat-icon { color: var(--color-accent); }
      &.couleur-gris    mat-icon { color: var(--color-text-muted); }
    }

    .kpi-valeur {
      display: block;
      font-family: 'Archivo Black', sans-serif;
      font-size: 1.5rem;
      color: var(--color-text);
      line-height: 1.1;
    }

    .kpi-label { display: block; font-size: 0.75rem; color: var(--color-text-muted); margin-top: 2px; }

    /* ── Section cards ── */
    .section-grille {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    }

    .section-carte {
      background: var(--color-surface) !important;
      border: 1px solid var(--color-border) !important;
      border-radius: var(--radius-md) !important;

      ::ng-deep mat-card-title {
        display: flex; align-items: center; gap: 6px;
        font-family: 'Archivo Black', sans-serif;
        font-size: 0.88rem !important;
        color: var(--color-text) !important;
        font-weight: 400 !important;

        mat-icon { color: var(--color-primary); font-size: 1rem; height: 1rem; width: 1rem; }
      }
    }

    .stat-ligne {
      display: flex; justify-content: space-between;
      font-size: 0.82rem; color: var(--color-text-muted);
      margin-bottom: 4px; align-items: center;
    }

    .stat-val { font-weight: 700; color: var(--color-text); }

    .dot {
      display: inline-block; width: 8px; height: 8px; border-radius: 50%;
      margin-right: 6px;
      &.en_stock { background: var(--color-success, #2e7d32); }
      &.stock_faible { background: var(--color-warning, #f59e0b); }
      &.epuise { background: var(--color-danger); }
    }

    .barre-bg { height: 5px; background: var(--color-surface-2); border-radius: 3px; margin-bottom: 8px; overflow: hidden; }
    .barre-fill {
      height: 100%; border-radius: 3px; transition: width 0.4s ease;
      &.en_stock { background: var(--color-success, #2e7d32); }
      &.stock_faible { background: var(--color-warning, #f59e0b); }
      &.epuise { background: var(--color-danger); }
      &.couleur-primary { background: var(--color-primary); }
    }

    .abo-badge {
      font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 12px;
      &.abo-gratuit  { background: var(--color-surface-2); color: var(--color-text-muted); }
      &.abo-standard { background: rgba(59,130,246,0.15); color: #3B82F6; }
      &.abo-premium  { background: color-mix(in srgb, var(--color-accent) 20%, transparent); color: #8a6200; }
    }

    .carte-ca {
      background: color-mix(in srgb, var(--color-primary) 5%, var(--color-surface)) !important;
      border-color: var(--color-primary) !important;

      .ca-label { font-size: 0.82rem; color: var(--color-text-muted); margin-bottom: 4px; }
      .ca-valeur {
        font-family: 'Archivo Black', sans-serif; font-size: 1.8rem; color: var(--color-primary);
        margin-bottom: 12px;
      }
      .ca-stats { display: flex; gap: 20px; }
      .ca-stat { display: flex; flex-direction: column; align-items: center; }
      .ca-nb { font-family: 'Archivo Black', sans-serif; font-size: 1.2rem; color: var(--color-text); }
      .ca-desc { font-size: 0.72rem; color: var(--color-text-muted); }
    }

    /* ── Tables ── */
    .table-wrapper { overflow-x: auto; }

    .table-admin {
      width: 100%;
      background: var(--color-surface) !important;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);

      ::ng-deep th { background: var(--color-surface-2) !important; font-weight: 700; font-size: 0.8rem; color: var(--color-text-muted); }
      ::ng-deep td, ::ng-deep th { padding: 10px 16px !important; }
      ::ng-deep tr:hover td { background: var(--color-surface-2); }
    }

    .sous-ligne { display: block; font-size: 0.75rem; color: var(--color-text-muted); }

    .select-abo, .select-statut {
      font-size: 0.82rem !important;
      ::ng-deep .mat-mdc-select-trigger { min-height: 28px; }
    }

    /* Badges */
    .badge-stock {
      font-size: 0.72rem; font-weight: 700; padding: 2px 8px; border-radius: 12px;
      &.stock-en_stock { background: rgba(46,125,50,0.12); color: #2e7d32; }
      &.stock-stock_faible { background: rgba(245,158,11,0.15); color: #92400e; }
      &.stock-epuise { background: color-mix(in srgb, var(--color-danger) 12%, transparent); color: var(--color-danger); }
    }

    .badge-role {
      font-size: 0.68rem; font-weight: 700; padding: 2px 7px; border-radius: 10px; margin-right: 4px;
      &.role-client   { background: rgba(59,130,246,0.12); color: #3B82F6; }
      &.role-revendeur { background: color-mix(in srgb, var(--color-primary) 12%, transparent); color: var(--color-primary); }
      &.role-admin    { background: color-mix(in srgb, var(--color-danger) 12%, transparent); color: var(--color-danger); }
    }

    .badge-paiement {
      font-size: 0.7rem; font-weight: 700; padding: 2px 7px; border-radius: 10px;
      &.pay-paye    { background: rgba(46,125,50,0.12); color: #2e7d32; }
      &.pay-en_attente { background: rgba(245,158,11,0.12); color: #92400e; }
      &.pay-echoue  { background: color-mix(in srgb, var(--color-danger) 12%, transparent); color: var(--color-danger); }
      &.pay-rembourse { background: rgba(139,92,246,0.12); color: #7c3aed; }
    }

    .badge-type {
      font-size: 0.7rem; font-weight: 700; padding: 2px 7px; border-radius: 10px;
      &.type-commande   { background: rgba(59,130,246,0.12); color: #3B82F6; }
      &.type-abonnement { background: color-mix(in srgb, var(--color-accent) 15%, transparent); color: #8a6200; }
    }

    .badge-fedapay {
      font-size: 0.7rem; font-weight: 700; padding: 2px 7px; border-radius: 10px;
      &.feda-approved   { background: rgba(46,125,50,0.12); color: #2e7d32; }
      &.feda-pending    { background: rgba(245,158,11,0.12); color: #92400e; }
      &.feda-declined   { background: color-mix(in srgb, var(--color-danger) 12%, transparent); color: var(--color-danger); }
      &.feda-cancelled  { background: var(--color-surface-2); color: var(--color-text-muted); }
      &.feda-refunded   { background: rgba(139,92,246,0.12); color: #7c3aed; }
      &.feda-transferred { background: rgba(46,125,50,0.12); color: #2e7d32; }
    }

    .icone-google  { font-size: 0.9rem; height: 0.9rem; width: 0.9rem; color: #4285F4; margin-left: 4px; vertical-align: middle; }
    .icone-verifie { font-size: 0.9rem; height: 0.9rem; width: 0.9rem; color: var(--color-success, #2e7d32); margin-left: 4px; vertical-align: middle; }

    .btn-actif   { color: var(--color-success, #2e7d32) !important; border-color: var(--color-success, #2e7d32) !important; font-size: 0.78rem !important; }
    .btn-inactif { color: var(--color-danger) !important; border-color: var(--color-danger) !important; font-size: 0.78rem !important; }

    code { font-size: 0.78rem; background: var(--color-surface-2); padding: 2px 5px; border-radius: 3px; }

    @media (max-width: 600px) {
      .kpi-grille { grid-template-columns: repeat(2, 1fr); }
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  private readonly adminService = inject(AdminService);
  private readonly snackBar = inject(MatSnackBar);

  readonly stats           = signal<DashboardStats | null>(null);
  readonly revendeurs      = signal<Revendeur[]>([]);
  readonly utilisateurs    = signal<AdminUser[]>([]);
  readonly commandes       = signal<AdminCommande[]>([]);
  readonly transactions    = signal<Transaction[]>([]);

  readonly chargementStats        = signal(false);
  readonly chargementRevendeurs   = signal(false);
  readonly chargementUsers        = signal(false);
  readonly chargementCommandes    = signal(false);
  readonly chargementTransactions = signal(false);

  readonly colonnesRevendeurs   = ['nom', 'telephone', 'abonnement', 'stock', 'actif'];
  readonly colonnesUsers        = ['nom', 'telephone', 'roles', 'inscription', 'actif'];
  readonly colonnesCommandes    = ['date', 'client', 'revendeur', 'total', 'paiement', 'statut'];
  readonly colonnesTransactions = ['date', 'reference', 'type', 'montant', 'client', 'statut'];

  readonly objectEntries = Object.entries;

  ngOnInit(): void {
    this.chargerTout();
  }

  chargerTout(): void {
    this.chargerStats();
    this.chargerRevendeurs();
    this.chargerUsers();
    this.chargerCommandes();
    this.chargerTransactions();
  }

  chargerStats(): void {
    this.chargementStats.set(true);
    this.adminService.getStats().subscribe({
      next: s => { this.stats.set(s); this.chargementStats.set(false); },
      error: () => this.chargementStats.set(false)
    });
  }

  chargerRevendeurs(): void {
    this.chargementRevendeurs.set(true);
    this.adminService.getRevendeurs().subscribe({
      next: r => { this.revendeurs.set(r); this.chargementRevendeurs.set(false); },
      error: () => this.chargementRevendeurs.set(false)
    });
  }

  chargerUsers(): void {
    this.chargementUsers.set(true);
    this.adminService.getUtilisateurs().subscribe({
      next: u => { this.utilisateurs.set(u); this.chargementUsers.set(false); },
      error: () => this.chargementUsers.set(false)
    });
  }

  chargerCommandes(): void {
    this.chargementCommandes.set(true);
    this.adminService.getCommandes().subscribe({
      next: c => { this.commandes.set(c); this.chargementCommandes.set(false); },
      error: () => this.chargementCommandes.set(false)
    });
  }

  chargerTransactions(): void {
    this.chargementTransactions.set(true);
    this.adminService.getTransactions().subscribe({
      next: t => { this.transactions.set(t); this.chargementTransactions.set(false); },
      error: () => this.chargementTransactions.set(false)
    });
  }

  toggleRevendeur(r: Revendeur): void {
    this.adminService.toggleActifRevendeur(r.id).subscribe({
      next: updated => {
        this.revendeurs.update(list => list.map(x => x.id === r.id ? updated : x));
        this.snackBar.open(`${updated.nom} : ${updated.actif ? 'activé' : 'désactivé'}`, 'OK', { duration: 3000 });
      }
    });
  }

  changerAbonnement(r: Revendeur, plan: Abonnement): void {
    this.adminService.setAbonnementRevendeur(r.id, plan).subscribe({
      next: updated => {
        this.revendeurs.update(list => list.map(x => x.id === r.id ? updated : x));
        this.snackBar.open(`${r.nom} → plan ${plan}`, 'OK', { duration: 3000 });
      }
    });
  }

  toggleUser(u: AdminUser): void {
    this.adminService.toggleActifUtilisateur(u.id).subscribe({
      next: res => {
        u.actif = res.actif;
        this.snackBar.open(`${u.nom} : ${res.actif ? 'réactivé' : 'désactivé'}`, 'OK', { duration: 3000 });
      }
    });
  }

  changerStatutCommande(c: AdminCommande, statut: string): void {
    this.adminService.updateStatutCommande(c.id, statut).subscribe({
      next: updated => {
        this.commandes.update(list => list.map(x => x.id === c.id ? updated : x));
        this.snackBar.open(`Commande mise à jour : ${statut}`, 'OK', { duration: 3000 });
      }
    });
  }

  pourcentage(v: number, total: number): number {
    return total > 0 ? (v / total) * 100 : 0;
  }

  libelleStock(s: string): string {
    return ({ EN_STOCK: 'En stock', STOCK_FAIBLE: 'Stock faible', EPUISE: 'Épuisé' } as Record<string,string>)[s] ?? s;
  }

  libelleStatut(s: string): string {
    return ({ EN_ATTENTE: 'En attente', CONFIRMEE: 'Confirmée', EN_LIVRAISON: 'En livraison', LIVREE: 'Livrée', ANNULEE: 'Annulée' } as Record<string,string>)[s] ?? s;
  }

  libelleStatutFeda(s: string): string {
    return ({ PENDING: 'En attente', APPROVED: 'Approuvé', DECLINED: 'Refusé', CANCELLED: 'Annulé', REFUNDED: 'Remboursé', TRANSFERRED: 'Transféré' } as Record<string,string>)[s] ?? s;
  }
}
