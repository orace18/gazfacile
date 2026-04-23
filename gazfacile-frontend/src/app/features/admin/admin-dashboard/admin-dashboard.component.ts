import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {
  AdminService,
  AdminUser,
  AdminCommande,
  AdminPlan,
  AdminPlanRequest,
  AdminCatalogueItem,
  AdminSubscription
} from '../../../core/services/admin.service';
import { AuthService } from '../../../core/services/auth.service';
import { QRCodeComponent } from 'angularx-qrcode';
import { DashboardStats } from '../../../core/models/notification.model';
import { Revendeur, Abonnement, Transaction, StatutFedaPay, PlanType } from '../../../core/models/revendeur.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule, DecimalPipe, DatePipe, FormsModule, ReactiveFormsModule,
    MatCardModule, MatIconModule, MatProgressSpinnerModule,
    MatTableModule, MatButtonModule, MatTabsModule,
    MatChipsModule, MatSelectModule, MatTooltipModule, MatSnackBarModule,
    MatFormFieldModule, MatInputModule, QRCodeComponent
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
                        <span class="abo-badge" [class]="'abo-' + e[0].toLowerCase()">{{ libelleAbonnement(e[0]) }}</span>
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
                        <mat-option value="TEST">Test</mat-option>
                        <mat-option value="MENSUEL">Mensuel</mat-option>
                        <mat-option value="TRIMESTRIEL">Trimestriel</mat-option>
                        <mat-option value="SEMESTRIEL">Semestriel</mat-option>
                        <mat-option value="ANNUEL">Annuel</mat-option>
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

          <!-- ── Onglet 3 : Catalogue ── -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon>inventory_2</mat-icon>&nbsp;Catalogue
            </ng-template>

            @if (chargementCatalogue()) {
              <div class="chargement-centre"><mat-spinner diameter="40"></mat-spinner></div>
            } @else {
              <div class="table-wrapper">
                <table mat-table [dataSource]="catalogue()" class="table-admin">
                  <ng-container matColumnDef="revendeur">
                    <th mat-header-cell *matHeaderCellDef>Revendeur</th>
                    <td mat-cell *matCellDef="let item">
                      <strong>{{ item.revendeurNom }}</strong>
                      <span class="sous-ligne">{{ item.quartier || '—' }} · {{ item.revendeurTelephone || '—' }}</span>
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="produit">
                    <th mat-header-cell *matHeaderCellDef>Produit</th>
                    <td mat-cell *matCellDef="let item">
                      <strong>{{ item.marqueLibelle }}</strong>
                      <span class="sous-ligne">{{ item.formatLibelle }}</span>
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="prix">
                    <th mat-header-cell *matHeaderCellDef>Prix</th>
                    <td mat-cell *matCellDef="let item">{{ item.prixUnitaire | number:'1.0-0' }} FCFA</td>
                  </ng-container>
                  <ng-container matColumnDef="stock">
                    <th mat-header-cell *matHeaderCellDef>Disponibilité</th>
                    <td mat-cell *matCellDef="let item">
                      <strong>{{ item.quantiteDisponible }}</strong>
                      <span class="sous-ligne">{{ item.disponible ? 'Disponible' : 'Masqué' }}</span>
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="maj">
                    <th mat-header-cell *matHeaderCellDef>Dernière mise à jour</th>
                    <td mat-cell *matCellDef="let item">{{ item.updatedAt | date:'dd/MM/yy HH:mm' }}</td>
                  </ng-container>
                  <tr mat-header-row *matHeaderRowDef="colonnesCatalogue"></tr>
                  <tr mat-row *matRowDef="let row; columns: colonnesCatalogue;"></tr>
                </table>
              </div>
            }
          </mat-tab>

          <!-- ── Onglet 4 : Utilisateurs ── -->
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

          <!-- ── Onglet 6 : Plans d'abonnement ── -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon>workspace_premium</mat-icon>&nbsp;Plans
            </ng-template>

            @if (chargementPlans()) {
              <div class="chargement-centre"><mat-spinner diameter="40"></mat-spinner></div>
            } @else {

              <!-- Formulaire création/édition -->
              <mat-card class="form-plan-carte">
                <mat-card-header>
                  <mat-card-title>
                    <mat-icon>{{ planEnEdition() ? 'edit' : 'add_circle' }}</mat-icon>
                    {{ planEnEdition() ? 'Modifier le plan' : 'Créer un plan' }}
                  </mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <form [formGroup]="formulairePlan" (ngSubmit)="soumettreFormPlan()" class="form-plan">
                    <div class="form-plan-grille">
                      <mat-form-field appearance="outline">
                        <mat-label>Type</mat-label>
                        <mat-select formControlName="type">
                          <mat-option value="REVENDEUR">Revendeur</mat-option>
                          <mat-option value="CLIENT_CONSULT">Client Consultation</mat-option>
                          <mat-option value="CLIENT_LIVRAISON">Client Livraison</mat-option>
                        </mat-select>
                      </mat-form-field>

                      <mat-form-field appearance="outline">
                        <mat-label>Nom</mat-label>
                        <input matInput formControlName="nom" placeholder="Ex: Standard">
                      </mat-form-field>

                      <mat-form-field appearance="outline">
                        <mat-label>Code unique</mat-label>
                        <input matInput formControlName="code" placeholder="Ex: STANDARD">
                      </mat-form-field>

                      <mat-form-field appearance="outline">
                        <mat-label>Prix (FCFA)</mat-label>
                        <input matInput type="number" formControlName="prix">
                      </mat-form-field>

                      <mat-form-field appearance="outline">
                        <mat-label>Durée (jours)</mat-label>
                        <input matInput type="number" formControlName="dureeJours">
                      </mat-form-field>

                      <mat-form-field appearance="outline">
                        <mat-label>Quota</mat-label>
                        <input matInput type="number" formControlName="quota">
                      </mat-form-field>

                      <mat-form-field appearance="outline">
                        <mat-label>Ordre d'affichage</mat-label>
                        <input matInput type="number" formControlName="ordre">
                      </mat-form-field>

                      <mat-form-field appearance="outline" class="champ-large">
                        <mat-label>Description</mat-label>
                        <input matInput formControlName="description" placeholder="Description courte">
                      </mat-form-field>

                      <mat-form-field appearance="outline" class="champ-large">
                        <mat-label>Features (séparées par des virgules)</mat-label>
                        <input matInput formControlName="featuresStr" placeholder="Ex: Visibilité, Catalogue illimité">
                      </mat-form-field>
                    </div>

                    <div class="form-plan-actions">
                      <button mat-raised-button type="submit" class="btn-plan-submit"
                        [disabled]="formulairePlan.invalid">
                        <mat-icon>{{ planEnEdition() ? 'save' : 'add' }}</mat-icon>
                        {{ planEnEdition() ? 'Enregistrer' : 'Créer le plan' }}
                      </button>
                      @if (planEnEdition()) {
                        <button mat-stroked-button type="button" (click)="annulerEditionPlan()">
                          <mat-icon>close</mat-icon> Annuler
                        </button>
                      }
                    </div>
                  </form>
                </mat-card-content>
              </mat-card>

              <!-- Tableau des plans -->
              <div class="table-wrapper">
                <table mat-table [dataSource]="plans()" class="table-admin">
                  <ng-container matColumnDef="type">
                    <th mat-header-cell *matHeaderCellDef>Type</th>
                    <td mat-cell *matCellDef="let p">
                      <span class="badge-plan-type" [class]="'plan-' + p.type.toLowerCase()">
                        {{ libellePlanType(p.type) }}
                      </span>
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="nom">
                    <th mat-header-cell *matHeaderCellDef>Nom / Code</th>
                    <td mat-cell *matCellDef="let p">
                      <strong>{{ p.nom }}</strong>
                      <span class="sous-ligne"><code>{{ p.code }}</code></span>
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="prix">
                    <th mat-header-cell *matHeaderCellDef>Prix</th>
                    <td mat-cell *matCellDef="let p">{{ p.prix | number:'1.0-0' }} FCFA</td>
                  </ng-container>
                  <ng-container matColumnDef="duree">
                    <th mat-header-cell *matHeaderCellDef>Durée</th>
                    <td mat-cell *matCellDef="let p">{{ p.dureeJours }} jours</td>
                  </ng-container>
                  <ng-container matColumnDef="quota">
                    <th mat-header-cell *matHeaderCellDef>Quota</th>
                    <td mat-cell *matCellDef="let p">{{ p.quota || '—' }}</td>
                  </ng-container>
                  <ng-container matColumnDef="actif">
                    <th mat-header-cell *matHeaderCellDef>Statut</th>
                    <td mat-cell *matCellDef="let p">
                      <button mat-stroked-button
                        [class]="p.actif ? 'btn-actif' : 'btn-inactif'"
                        (click)="togglePlan(p)">
                        <mat-icon>{{ p.actif ? 'visibility' : 'visibility_off' }}</mat-icon>
                        {{ p.actif ? 'Actif' : 'Inactif' }}
                      </button>
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="actions">
                    <th mat-header-cell *matHeaderCellDef></th>
                    <td mat-cell *matCellDef="let p">
                      <button mat-icon-button matTooltip="Modifier" (click)="editerPlan(p)">
                        <mat-icon>edit</mat-icon>
                      </button>
                    </td>
                  </ng-container>
                  <tr mat-header-row *matHeaderRowDef="colonnesPlans"></tr>
                  <tr mat-row *matRowDef="let row; columns: colonnesPlans;"
                    [class.row-inactif]="!row.actif"></tr>
                </table>
              </div>
            }
          </mat-tab>

          <!-- ── Onglet 8 : Subscriptions ── -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon>card_membership</mat-icon>&nbsp;Abonnements
            </ng-template>

            @if (chargementSubscriptions()) {
              <div class="chargement-centre"><mat-spinner diameter="40"></mat-spinner></div>
            } @else {
              <div class="table-wrapper">
                <table mat-table [dataSource]="subscriptions()" class="table-admin">
                  <ng-container matColumnDef="abonne">
                    <th mat-header-cell *matHeaderCellDef>Abonné</th>
                    <td mat-cell *matCellDef="let s">
                      <strong>{{ s.userNom }}</strong>
                      <span class="sous-ligne">{{ s.userTelephone || '—' }}</span>
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="planCode">
                    <th mat-header-cell *matHeaderCellDef>Plan</th>
                    <td mat-cell *matCellDef="let s">
                      <strong>{{ s.planCode }}</strong>
                      <span class="sous-ligne">{{ s.planType }}</span>
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="createdAt">
                    <th mat-header-cell *matHeaderCellDef>Souscrit le</th>
                    <td mat-cell *matCellDef="let s">{{ s.createdAt | date:'dd/MM/yy HH:mm' }}</td>
                  </ng-container>
                  <ng-container matColumnDef="dateDebut">
                    <th mat-header-cell *matHeaderCellDef>Activé le</th>
                    <td mat-cell *matCellDef="let s">{{ s.dateDebut | date:'dd/MM/yy HH:mm' }}</td>
                  </ng-container>
                  <ng-container matColumnDef="dateFin">
                    <th mat-header-cell *matHeaderCellDef>Expire le</th>
                    <td mat-cell *matCellDef="let s">{{ s.dateFin | date:'dd/MM/yy HH:mm' }}</td>
                  </ng-container>
                  <ng-container matColumnDef="quota">
                    <th mat-header-cell *matHeaderCellDef>Quota restant</th>
                    <td mat-cell *matCellDef="let s">{{ s.quotaRestant }}</td>
                  </ng-container>
                  <ng-container matColumnDef="statut">
                    <th mat-header-cell *matHeaderCellDef>Statut</th>
                    <td mat-cell *matCellDef="let s">
                      <span class="badge-sub-statut" [class]="'sub-' + s.statut.toLowerCase()">
                        {{ libelleStatutSub(s.statut) }}
                      </span>
                    </td>
                  </ng-container>
                  <tr mat-header-row *matHeaderRowDef="colonnesSubscriptions"></tr>
                  <tr mat-row *matRowDef="let row; columns: colonnesSubscriptions;"></tr>
                </table>
              </div>
            }
          </mat-tab>

          <!-- ── Onglet 9 : Sécurité (2FA TOTP) ── -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon>security</mat-icon>&nbsp;Sécurité
            </ng-template>

            <div class="section-securite">

              <!-- Statut 2FA -->
              <div class="carte-statut-2fa" [class.actif]="totp2faActif()">
                <div class="statut-icone">
                  <mat-icon>{{ totp2faActif() ? 'verified_user' : 'gpp_maybe' }}</mat-icon>
                </div>
                <div class="statut-texte">
                  <h3>Authentification à deux facteurs (2FA)</h3>
                  <p>{{ totpStatutMessage() }}</p>
                </div>
                <span class="badge-statut" [class.badge-actif]="totp2faActif()">
                  {{ totp2faActif() ? 'Actif' : 'Inactif' }}
                </span>
              </div>

              <!-- Setup 2FA (si non actif) -->
              @if (!totp2faActif()) {
                <div class="carte-action">
                  <h4><mat-icon>qr_code_2</mat-icon> Configurer le 2FA</h4>

                  @if (!totpUri()) {
                    <p class="aide">Cliquez pour générer vos codes de configuration Google Authenticator.</p>
                    <button mat-raised-button class="btn-activer" (click)="lancerSetupTotp()"
                      [disabled]="totpEnvoi()">
                      @if (totpEnvoi()) { <mat-spinner diameter="18"></mat-spinner> }
                      @else { <mat-icon>add_moderator</mat-icon> }
                      Activer le 2FA
                    </button>
                  }

                  @if (totpUri()) {
                    <div class="setup-totp">

                      <!-- Étape 1 : QR code -->
                      <div class="etape">
                        <span class="numero-etape">1</span>
                        <div>
                          <strong>Scannez ce QR code</strong> avec Google Authenticator, Authy ou toute autre application TOTP.
                        </div>
                      </div>

                      <div class="qr-bloc">
                        <qrcode
                          [qrdata]="totpUri()!"
                          [width]="200"
                          [errorCorrectionLevel]="'M'"
                          [colorDark]="'#1a1a2e'"
                          [colorLight]="'#ffffff'">
                        </qrcode>
                        <p class="qr-note">Impossible de scanner ?</p>
                        <div class="secret-block">
                          <label>Clé secrète (saisie manuelle)</label>
                          <div class="secret-row">
                            <code>{{ totpSecret() }}</code>
                            <button mat-icon-button (click)="copierSecret()" matTooltip="Copier la clé">
                              <mat-icon>content_copy</mat-icon>
                            </button>
                          </div>
                        </div>
                      </div>

                      <!-- Étape 2 : Confirmation -->
                      <div class="etape">
                        <span class="numero-etape">2</span>
                        <div>
                          <strong>Entrez le code à 6 chiffres</strong> affiché par l'application pour confirmer la configuration.
                        </div>
                      </div>

                      <mat-form-field appearance="outline" class="champ-code">
                        <mat-label>Code de confirmation</mat-label>
                        <input matInput [(ngModel)]="totpCodeConfirm"
                          placeholder="123456"
                          type="text"
                          inputmode="numeric"
                          maxlength="6"
                          autocomplete="one-time-code">
                        <mat-icon matPrefix>pin</mat-icon>
                      </mat-form-field>

                      @if (totpErreur()) {
                        <div class="erreur-totp">
                          <mat-icon>error_outline</mat-icon> {{ totpErreur() }}
                        </div>
                      }

                      <div class="actions-setup">
                        <button mat-raised-button class="btn-activer"
                          [disabled]="totpCodeConfirm.length !== 6 || totpEnvoi()"
                          (click)="confirmerSetupTotp()">
                          @if (totpEnvoi()) { <mat-spinner diameter="18"></mat-spinner> }
                          @else { <mat-icon>check_circle</mat-icon> }
                          Confirmer et activer
                        </button>
                        <button mat-stroked-button (click)="annulerSetup()">Annuler</button>
                      </div>
                    </div>
                  }
                </div>
              }

              <!-- Désactiver 2FA (si actif) -->
              @if (totp2faActif()) {
                <div class="carte-action carte-danger">
                  <h4><mat-icon>no_encryption</mat-icon> Désactiver le 2FA</h4>
                  <p class="aide">Entrez votre code TOTP actuel pour confirmer la désactivation.</p>

                  <mat-form-field appearance="outline" class="champ-code">
                    <mat-label>Code TOTP actuel</mat-label>
                    <input matInput [(ngModel)]="totpCodeDesactiver"
                      placeholder="123456"
                      type="text"
                      inputmode="numeric"
                      maxlength="6">
                    <mat-icon matPrefix>pin</mat-icon>
                  </mat-form-field>

                  @if (totpErreur()) {
                    <div class="erreur-totp">
                      <mat-icon>error_outline</mat-icon> {{ totpErreur() }}
                    </div>
                  }

                  <button mat-raised-button class="btn-desactiver"
                    [disabled]="totpCodeDesactiver.length !== 6 || totpEnvoi()"
                    (click)="desactiverTotp()">
                    @if (totpEnvoi()) { <mat-spinner diameter="18"></mat-spinner> }
                    @else { <mat-icon>lock_open</mat-icon> }
                    Désactiver le 2FA
                  </button>
                </div>
              }
            </div>
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
        font-family: 'Montserrat', sans-serif;
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
      font-family: 'Montserrat', sans-serif;
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
        font-family: 'Montserrat', sans-serif;
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
      &.abo-test { background: rgba(245,158,11,0.15); color: #92400e; }
      &.abo-mensuel { background: rgba(59,130,246,0.15); color: #3B82F6; }
      &.abo-trimestriel { background: rgba(16,185,129,0.15); color: #047857; }
      &.abo-semestriel { background: rgba(139,92,246,0.15); color: #7c3aed; }
      &.abo-annuel  { background: color-mix(in srgb, var(--color-accent) 20%, transparent); color: #8a6200; }
    }

    .carte-ca {
      background: color-mix(in srgb, var(--color-primary) 5%, var(--color-surface)) !important;
      border-color: var(--color-primary) !important;

      .ca-label { font-size: 0.82rem; color: var(--color-text-muted); margin-bottom: 4px; }
      .ca-valeur {
        font-family: 'Montserrat', sans-serif; font-size: 1.8rem; color: var(--color-primary);
        margin-bottom: 12px;
      }
      .ca-stats { display: flex; gap: 20px; }
      .ca-stat { display: flex; flex-direction: column; align-items: center; }
      .ca-nb { font-family: 'Montserrat', sans-serif; font-size: 1.2rem; color: var(--color-text); }
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

    /* ── Plan form ── */
    .form-plan-carte {
      background: var(--color-surface) !important;
      border: 1px solid var(--color-border) !important;
      border-radius: var(--radius-md) !important;
      margin-bottom: 20px;

      ::ng-deep mat-card-title {
        display: flex; align-items: center; gap: 6px;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.92rem !important;
        color: var(--color-primary) !important;
        font-weight: 600 !important;

        mat-icon { font-size: 1.1rem; height: 1.1rem; width: 1.1rem; }
      }
    }

    .form-plan-grille {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 8px 16px;

      .champ-large { grid-column: span 2; }
    }

    .form-plan-actions {
      display: flex; gap: 12px; margin-top: 8px;
    }

    .btn-plan-submit {
      background-color: var(--color-primary) !important;
      color: white !important;
    }

    /* ── Plan type badges ── */
    .badge-plan-type {
      font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 12px;
      &.plan-revendeur         { background: color-mix(in srgb, var(--color-primary) 12%, transparent); color: var(--color-primary); }
      &.plan-client_consult    { background: rgba(59,130,246,0.12); color: #3B82F6; }
      &.plan-client_livraison  { background: rgba(139,92,246,0.12); color: #7c3aed; }
    }

    .row-inactif { opacity: 0.5; }

    /* ── Subscription status badges ── */
    .badge-sub-statut {
      font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 12px;
      &.sub-active   { background: rgba(46,125,50,0.12); color: #2e7d32; }
      &.sub-pending   { background: rgba(245,158,11,0.12); color: #92400e; }
      &.sub-expired   { background: var(--color-surface-2); color: var(--color-text-muted); }
    }

    @media (max-width: 600px) {
      .kpi-grille { grid-template-columns: repeat(2, 1fr); }
      .form-plan-grille { grid-template-columns: 1fr; .champ-large { grid-column: span 1; } }
    }

    /* ── Sécurité / 2FA ── */
    .section-securite {
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-width: 700px;
    }

    .carte-statut-2fa {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px 24px;
      background: #fff8e1;
      border-radius: 12px;
      border: 2px solid #f9a825;

      &.actif {
        background: #e8f5e9;
        border-color: #43a047;
      }

      .statut-icone mat-icon {
        font-size: 36px;
        width: 36px;
        height: 36px;
        color: #f9a825;
      }

      &.actif .statut-icone mat-icon { color: #43a047; }

      .statut-texte {
        flex: 1;
        h3 { margin: 0 0 4px; font-size: 1rem; font-weight: 700; color: #1a1a2e; }
        p  { margin: 0; font-size: 0.85rem; color: #555; }
      }

      .badge-statut {
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.78rem;
        font-weight: 700;
        background: #f9a825;
        color: white;

        &.badge-actif { background: #43a047; }
      }
    }

    .carte-action {
      padding: 24px;
      background: var(--color-surface);
      border-radius: 12px;
      border: 1px solid var(--color-border);

      h4 {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0 0 12px;
        font-size: 1rem;
        color: var(--color-primary);

        mat-icon { font-size: 20px; width: 20px; height: 20px; }
      }

      .aide { margin: 0 0 16px; font-size: 0.88rem; color: var(--color-text-muted); }

      &.carte-danger {
        border-color: #ef9a9a;
        h4 { color: #c62828; }
      }
    }

    .setup-totp {
      display: flex;
      flex-direction: column;
      gap: 16px;

      .etape {
        display: flex;
        gap: 12px;
        align-items: flex-start;
        font-size: 0.9rem;
        color: var(--color-text);

        .numero-etape {
          flex-shrink: 0;
          width: 26px;
          height: 26px;
          background: var(--color-primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.82rem;
        }
      }
    }

    .qr-bloc {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 20px;
      background: #fafafa;
      border: 2px dashed var(--color-border);
      border-radius: 12px;

      qrcode { display: block; }

      .qr-note {
        margin: 0;
        font-size: 0.78rem;
        color: var(--color-text-muted);
      }
    }

    .secret-block {
      padding: 16px;
      background: #f5f5f5;
      border-radius: 8px;
      width: 100%;

      label { font-size: 0.78rem; color: #666; display: block; margin-bottom: 8px; }

      .secret-row {
        display: flex;
        align-items: center;
        gap: 8px;

        code {
          flex: 1;
          font-family: 'Courier New', monospace;
          font-size: 1.1rem;
          font-weight: 700;
          color: #1a1a2e;
          letter-spacing: 0.15em;
          word-break: break-all;
        }
      }
    }

    .champ-code { width: 100%; max-width: 220px; }

    .erreur-totp {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      background: #fff0f0;
      border-left: 3px solid #d32f2f;
      color: #d32f2f;
      font-size: 0.85rem;
      border-radius: 4px;

      mat-icon { font-size: 16px; width: 16px; height: 16px; }
    }

    .actions-setup {
      display: flex;
      gap: 12px;
      align-items: center;
      flex-wrap: wrap;
    }

    .btn-activer {
      background: var(--color-primary) !important;
      color: white !important;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .btn-desactiver {
      background: #c62828 !important;
      color: white !important;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  private readonly adminService = inject(AdminService);
  private readonly authService = inject(AuthService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly fb = inject(FormBuilder);

  readonly stats           = signal<DashboardStats | null>(null);
  readonly revendeurs      = signal<Revendeur[]>([]);
  readonly catalogue       = signal<AdminCatalogueItem[]>([]);
  readonly utilisateurs    = signal<AdminUser[]>([]);
  readonly commandes       = signal<AdminCommande[]>([]);
  readonly transactions    = signal<Transaction[]>([]);
  readonly plans           = signal<AdminPlan[]>([]);
  readonly subscriptions   = signal<AdminSubscription[]>([]);

  readonly chargementStats        = signal(false);
  readonly chargementRevendeurs   = signal(false);
  readonly chargementCatalogue    = signal(false);
  readonly chargementUsers        = signal(false);
  readonly chargementCommandes    = signal(false);
  readonly chargementTransactions = signal(false);
  readonly chargementPlans        = signal(false);
  readonly chargementSubscriptions = signal(false);

  readonly planEnEdition   = signal<AdminPlan | null>(null);

  // ── TOTP 2FA ──────────────────────────────────────────────────────────────
  readonly totp2faActif    = signal(false);
  readonly totpStatutMessage = computed(() => this.totp2faActif()
    ? "Le 2FA est actif. Votre compte est protégé par Google Authenticator."
    : "Le 2FA n'est pas activé. Activez-le pour sécuriser votre compte admin."
  );
  readonly totpUri         = signal<string | null>(null);
  readonly totpSecret      = signal<string | null>(null);
  readonly totpEnvoi       = signal(false);
  readonly totpErreur      = signal<string | null>(null);
  totpCodeConfirm    = '';
  totpCodeDesactiver = '';

  readonly colonnesRevendeurs   = ['nom', 'telephone', 'abonnement', 'stock', 'actif'];
  readonly colonnesCatalogue    = ['revendeur', 'produit', 'prix', 'stock', 'maj'];
  readonly colonnesUsers        = ['nom', 'telephone', 'roles', 'inscription', 'actif'];
  readonly colonnesCommandes    = ['date', 'client', 'revendeur', 'total', 'paiement', 'statut'];
  readonly colonnesTransactions = ['date', 'reference', 'type', 'montant', 'client', 'statut'];
  readonly colonnesPlans        = ['type', 'nom', 'prix', 'duree', 'quota', 'actif', 'actions'];
  readonly colonnesSubscriptions = ['abonne', 'planCode', 'createdAt', 'dateDebut', 'dateFin', 'quota', 'statut'];

  readonly objectEntries = Object.entries;

  readonly formulairePlan = this.fb.group({
    type: ['REVENDEUR' as string, Validators.required],
    nom: ['', Validators.required],
    code: ['', Validators.required],
    prix: [0, [Validators.required, Validators.min(0)]],
    dureeJours: [30, [Validators.required, Validators.min(1)]],
    quota: [0, Validators.min(0)],
    description: [''],
    featuresStr: [''],
    ordre: [0]
  });

  ngOnInit(): void {
    this.chargerTout();
  }

  chargerTout(): void {
    this.chargerStats();
    this.chargerRevendeurs();
    this.chargerCatalogue();
    this.chargerUsers();
    this.chargerCommandes();
    this.chargerTransactions();
    this.chargerPlans();
    this.chargerSubscriptions();
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

  chargerCatalogue(): void {
    this.chargementCatalogue.set(true);
    this.adminService.getCatalogue().subscribe({
      next: items => {
        this.catalogue.set(items);
        this.chargementCatalogue.set(false);
      },
      error: () => this.chargementCatalogue.set(false)
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

  libelleAbonnement(a: string): string {
    return ({
      GRATUIT: 'Gratuit',
      TEST: 'Test',
      MENSUEL: 'Mensuel',
      TRIMESTRIEL: 'Trimestriel',
      SEMESTRIEL: 'Semestriel',
      ANNUEL: 'Annuel'
    } as Record<string, string>)[a] ?? a;
  }

  // ── Plans d'abonnement ───────────────────────────────────────────────────

  chargerPlans(): void {
    this.chargementPlans.set(true);
    this.adminService.getPlans().subscribe({
      next: p => { this.plans.set(p); this.chargementPlans.set(false); },
      error: () => this.chargementPlans.set(false)
    });
  }

  togglePlan(p: AdminPlan): void {
    this.adminService.toggleActifPlan(p.id).subscribe({
      next: updated => {
        this.plans.update(list => list.map(x => x.id === p.id ? updated : x));
        this.snackBar.open(`${p.nom} : ${updated.actif ? 'activé' : 'désactivé'}`, 'OK', { duration: 3000 });
      }
    });
  }

  editerPlan(p: AdminPlan): void {
    this.planEnEdition.set(p);
    this.formulairePlan.patchValue({
      type: p.type,
      nom: p.nom,
      code: p.code,
      prix: p.prix,
      dureeJours: p.dureeJours,
      quota: p.quota,
      description: p.description || '',
      featuresStr: p.features?.join(', ') || '',
      ordre: p.ordre
    });
  }

  annulerEditionPlan(): void {
    this.planEnEdition.set(null);
    this.formulairePlan.reset({ type: 'REVENDEUR', prix: 0, dureeJours: 30, quota: 0, ordre: 0 });
  }

  soumettreFormPlan(): void {
    if (this.formulairePlan.invalid) return;

    const v = this.formulairePlan.value;
    const request: AdminPlanRequest = {
      type: v.type as PlanType,
      nom: v.nom!,
      code: v.code!,
      prix: v.prix!,
      dureeJours: v.dureeJours!,
      quota: v.quota || 0,
      description: v.description || '',
      features: v.featuresStr ? v.featuresStr.split(',').map(f => f.trim()).filter(f => f) : [],
      ordre: v.ordre || 0
    };

    const edition = this.planEnEdition();
    if (edition) {
      this.adminService.updatePlan(edition.id, request).subscribe({
        next: updated => {
          this.plans.update(list => list.map(x => x.id === edition.id ? updated : x));
          this.annulerEditionPlan();
          this.snackBar.open(`Plan "${updated.nom}" mis à jour`, 'OK', { duration: 3000 });
        },
        error: err => this.snackBar.open(err.error?.message || 'Erreur', 'OK', { duration: 5000 })
      });
    } else {
      this.adminService.createPlan(request).subscribe({
        next: created => {
          this.plans.update(list => [...list, created]);
          this.annulerEditionPlan();
          this.snackBar.open(`Plan "${created.nom}" créé`, 'OK', { duration: 3000 });
        },
        error: err => this.snackBar.open(err.error?.message || 'Erreur', 'OK', { duration: 5000 })
      });
    }
  }

  libellePlanType(t: string): string {
    return ({ REVENDEUR: 'Revendeur', CLIENT_CONSULT: 'Consultation', CLIENT_LIVRAISON: 'Livraison' } as Record<string,string>)[t] ?? t;
  }

  // ── Subscriptions ────────────────────────────────────────────────────────

  chargerSubscriptions(): void {
    this.chargementSubscriptions.set(true);
    this.adminService.getSubscriptions().subscribe({
      next: s => { this.subscriptions.set(s); this.chargementSubscriptions.set(false); },
      error: () => this.chargementSubscriptions.set(false)
    });
  }

  libelleStatutSub(s: string): string {
    return ({ ACTIVE: 'Actif', PENDING: 'En attente', EXPIRED: 'Expiré' } as Record<string,string>)[s] ?? s;
  }

  // ── TOTP 2FA ──────────────────────────────────────────────────────────────

  lancerSetupTotp(): void {
    this.totpEnvoi.set(true);
    this.totpErreur.set(null);
    this.authService.totpSetup().subscribe({
      next: res => {
        this.totpUri.set(res.otpauthUri);
        this.totpSecret.set(res.secret);
        this.totpEnvoi.set(false);
      },
      error: err => {
        this.totpErreur.set(err.message);
        this.totpEnvoi.set(false);
      }
    });
  }

  confirmerSetupTotp(): void {
    this.totpEnvoi.set(true);
    this.totpErreur.set(null);
    this.authService.totpConfirm(this.totpCodeConfirm).subscribe({
      next: () => {
        this.totp2faActif.set(true);
        this.totpUri.set(null);
        this.totpSecret.set(null);
        this.totpCodeConfirm = '';
        this.totpEnvoi.set(false);
        this.snackBar.open('2FA activé avec succès ✓', 'OK', { duration: 4000 });
      },
      error: err => {
        this.totpErreur.set(err.message || 'Code invalide');
        this.totpCodeConfirm = '';
        this.totpEnvoi.set(false);
      }
    });
  }

  desactiverTotp(): void {
    this.totpEnvoi.set(true);
    this.totpErreur.set(null);
    this.authService.totpDisable(this.totpCodeDesactiver).subscribe({
      next: () => {
        this.totp2faActif.set(false);
        this.totpCodeDesactiver = '';
        this.totpEnvoi.set(false);
        this.snackBar.open('2FA désactivé', 'OK', { duration: 3000 });
      },
      error: err => {
        this.totpErreur.set(err.message || 'Code invalide');
        this.totpCodeDesactiver = '';
        this.totpEnvoi.set(false);
      }
    });
  }

  annulerSetup(): void {
    this.totpUri.set(null);
    this.totpSecret.set(null);
    this.totpCodeConfirm = '';
    this.totpErreur.set(null);
  }

  copierSecret(): void {
    if (this.totpSecret()) {
      navigator.clipboard.writeText(this.totpSecret()!).then(() =>
        this.snackBar.open('Clé copiée', '', { duration: 2000 })
      );
    }
  }
}
