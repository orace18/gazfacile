import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SubscriptionService } from '../../../core/services/subscription.service';
import { PaiementService } from '../../../core/services/paiement.service';
import { SubscriptionPlanDTO, SubscriptionDTO } from '../../../core/models/revendeur.model';

@Component({
  selector: 'app-abonnement',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <div class="page-abonnement">
      <div class="en-tete">
        <h1 class="titre-page">Mon abonnement</h1>
        <p class="sous-titre">Gérez votre visibilité sur GazFacile</p>
      </div>

      @if (chargement()) {
        <div class="chargement">
          <mat-spinner diameter="40"></mat-spinner>
        </div>
      } @else {

        <!-- Statut actuel -->
        @if (subscription()) {
          <div class="statut-actuel">
            <div class="badge-plan badge-actif">
              <mat-icon>workspace_premium</mat-icon>
              {{ subscription()!.planCode }}
            </div>
            @if (subscription()!.statut === 'ACTIVE') {
              <span class="chip-actif">
                <mat-icon>check_circle</mat-icon>
                Actif jusqu'au {{ subscription()!.dateFin | date:'dd/MM/yyyy' }}
              </span>
            } @else if (subscription()!.statut === 'PENDING') {
              <span class="chip-pending">
                <mat-icon>hourglass_top</mat-icon>
                Paiement en attente
              </span>
            } @else {
              <span class="chip-expire">
                <mat-icon>warning</mat-icon> Expiré
              </span>
            }
          </div>
        } @else {
          <div class="statut-actuel">
            <div class="badge-plan badge-inactif">
              <mat-icon>store</mat-icon>
              Aucun abonnement
            </div>
            <span class="chip-expire">
              <mat-icon>info</mat-icon>
              Souscrivez pour être visible sur GazFacile
            </span>
          </div>
        }

        <!-- Grille des plans -->
        @if (plans().length > 0) {
          <div class="grille-plans">
            @for (p of plans(); track p.id) {
              <div class="carte-plan"
                   [class.plan-actuel]="subscription()?.planCode === p.code && subscription()?.statut === 'ACTIVE'">

                <div class="plan-entete">
                  <mat-icon class="plan-icone">{{ iconePlan(p.code) }}</mat-icon>
                  <h2 class="plan-nom">{{ p.nom }}</h2>
                  <span class="plan-duree">{{ formatDuree(p.dureeJours) }}</span>
                  <p class="plan-desc">{{ p.description }}</p>
                  <div class="plan-prix">
                    <span class="prix-valeur">{{ p.prix | number:'1.0-0' }}</span>
                    <span class="prix-unite"> FCFA</span>
                  </div>
                </div>

                <ul class="liste-features">
                  @for (f of p.features; track f) {
                    <li>
                      <mat-icon class="icone-check">check</mat-icon>
                      {{ f }}
                    </li>
                  }
                </ul>

                <div class="plan-action">
                  @if (subscription()?.planCode === p.code && subscription()?.statut === 'ACTIVE') {
                    <button mat-stroked-button disabled class="btn-plan-actuel">
                      <mat-icon>check_circle</mat-icon> Plan actuel
                    </button>
                  } @else {
                    <button
                      mat-raised-button
                      class="btn-souscrire"
                      [disabled]="enCoursCode() === p.code"
                      (click)="souscrire(p.code)"
                    >
                      @if (enCoursCode() === p.code) {
                        <mat-spinner diameter="16"></mat-spinner>
                      } @else {
                        <mat-icon>open_in_new</mat-icon>
                      }
                      {{ subscription()?.statut === 'ACTIVE' ? 'Renouveler' : 'Souscrire' }}
                    </button>
                  }
                </div>
              </div>
            }
          </div>
        }

        @if (erreur()) {
          <div class="erreur">
            <mat-icon>error</mat-icon> {{ erreur() }}
          </div>
        }

        <!-- Numéro de paiement -->
        <div class="bloc-tel-paiement">
          <mat-form-field appearance="outline" class="champ-tel">
            <mat-label>Numéro Mobile Money pour le paiement</mat-label>
            <input matInput [(ngModel)]="telephonePaiement" type="tel"
              placeholder="Ex: 97000000">
            <div matPrefix class="prefixe-tel">+229</div>
            <mat-hint>Utilisez le numéro à débiter pour le paiement. Il peut être différent du numéro du compte.</mat-hint>
          </mat-form-field>
        </div>

        <!-- Note FedaPay -->
        <p class="note-paiement">
          <mat-icon>info</mat-icon>
          Le paiement est sécurisé via FedaPay — MTN MoMo, Moov Money et Celtiis Cash acceptés.
        </p>
      }
    </div>
  `,
  styles: [`
    .page-abonnement {
      max-width: 960px;
      margin: 0 auto;
      padding: 32px 16px;
    }

    .en-tete {
      margin-bottom: 32px;
    }

    .titre-page {
      font-family: 'Montserrat', sans-serif;
      font-size: 1.8rem;
      color: var(--color-primary);
      margin: 0 0 4px;
    }

    .sous-titre {
      color: var(--color-text-muted);
      margin: 0;
    }

    .chargement {
      display: flex;
      justify-content: center;
      padding: 60px 0;
    }

    .statut-actuel {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 32px;
      padding: 16px 20px;
      background: var(--color-surface);
      border-radius: var(--radius-md);
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    }

    .badge-plan {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border-radius: var(--radius-sm);
      font-weight: 700;
      font-size: 0.9rem;
      text-transform: uppercase;

      &.badge-actif {
        background: color-mix(in srgb, var(--color-primary) 15%, transparent);
        color: var(--color-primary);
      }
      &.badge-inactif {
        background: var(--color-surface-2);
        color: var(--color-text-muted);
      }
    }

    .chip-actif {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.82rem;
      color: var(--color-success, #2e7d32);

      mat-icon { font-size: 1rem; width: 1rem; height: 1rem; }
    }

    .chip-pending {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.82rem;
      color: var(--color-warning, #ed6c02);

      mat-icon { font-size: 1rem; width: 1rem; height: 1rem; }
    }

    .chip-expire {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.82rem;
      color: var(--color-danger);

      mat-icon { font-size: 1rem; width: 1rem; height: 1rem; }
    }

    .grille-plans {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 20px;
      margin-bottom: 24px;
    }

    .carte-plan {
      position: relative;
      background: var(--color-surface);
      border-radius: var(--radius-md);
      border: 2px solid var(--color-border, #e0e0e0);
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      transition: border-color 0.2s, box-shadow 0.2s;

      &.plan-actuel {
        border-color: var(--color-primary);
        box-shadow: 0 0 0 1px var(--color-primary);
      }
    }

    .plan-entete {
      text-align: center;
    }

    .plan-icone {
      font-size: 2.5rem;
      width: 2.5rem;
      height: 2.5rem;
      color: var(--color-primary);
      margin-bottom: 8px;
    }

    .plan-nom {
      font-family: 'Montserrat', sans-serif;
      font-size: 1.2rem;
      color: var(--color-text);
      margin: 0 0 4px;
    }

    .plan-desc {
      font-size: 0.82rem;
      color: var(--color-text-muted);
      margin: 0 0 12px;
    }

    .plan-prix {
      .prix-valeur {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.8rem;
        color: var(--color-primary);
      }
      .prix-unite {
        font-size: 0.8rem;
        color: var(--color-text-muted);
      }
    }

    .plan-duree {
      display: inline-block;
      background: color-mix(in srgb, var(--color-primary) 10%, transparent);
      color: var(--color-primary);
      font-size: 0.75rem;
      font-weight: 700;
      padding: 2px 10px;
      border-radius: 20px;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .liste-features {
      list-style: none;
      padding: 0;
      margin: 0;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;

      li {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.85rem;
        color: var(--color-text);
      }
    }

    .icone-check {
      font-size: 1rem;
      width: 1rem;
      height: 1rem;
      color: var(--color-success, #2e7d32);
      flex-shrink: 0;
    }

    .plan-action {
      margin-top: 8px;

      button {
        width: 100%;
        height: 40px;
      }
    }

    .btn-plan-actuel {
      color: var(--color-primary) !important;
      border-color: var(--color-primary) !important;
    }

    .btn-souscrire {
      background-color: var(--color-primary) !important;
      color: white !important;
    }

    .erreur {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      background: color-mix(in srgb, var(--color-danger) 10%, transparent);
      color: var(--color-danger);
      border-radius: var(--radius-sm);
      font-size: 0.85rem;
      margin-bottom: 16px;
    }

    .note-paiement {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.78rem;
      color: var(--color-text-muted);
      text-align: center;
      justify-content: center;

      mat-icon {
        font-size: 1rem;
        width: 1rem;
        height: 1rem;
      }
    }
  `]
})
export class AbonnementComponent implements OnInit {
  private readonly subscriptionService = inject(SubscriptionService);
  private readonly paiementService = inject(PaiementService);
  private readonly snackBar = inject(MatSnackBar);

  plans = signal<SubscriptionPlanDTO[]>([]);
  subscription = signal<SubscriptionDTO | null>(null);
  chargement = signal(true);
  enCoursCode = signal<string | null>(null);
  erreur = signal<string | null>(null);
  telephonePaiement = '';

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.chargement.set(true);

    // Charger les plans REVENDEUR
    this.subscriptionService.getPlans('REVENDEUR').subscribe({
      next: plans => {
        this.plans.set(plans);
        // Charger la subscription active
        this.subscriptionService.getCurrent().subscribe({
          next: sub => {
            this.subscription.set(sub);
            this.chargement.set(false);
          },
          error: () => {
            // Pas de subscription active — c'est OK
            this.subscription.set(null);
            this.chargement.set(false);
          }
        });
      },
      error: () => {
        this.chargement.set(false);
        this.erreur.set('Impossible de charger les plans d\'abonnement');
      }
    });
  }

  souscrire(planCode: string): void {
    const telephonePaiement = this.telephonePaiement.trim();
    if (telephonePaiement && !/^\d{8}$/.test(telephonePaiement)) {
      this.erreur.set('Le numéro de paiement doit comporter 8 chiffres.');
      return;
    }

    this.enCoursCode.set(planCode);
    this.erreur.set(null);
    this.subscriptionService.subscribe(planCode, telephonePaiement || undefined).subscribe({
      next: response => {
        this.enCoursCode.set(null);
        this.paiementService.redirectVersCheckout(response.checkoutUrl);
      },
      error: err => {
        this.enCoursCode.set(null);
        this.erreur.set(err.message);
      }
    });
  }

  iconePlan(code: string): string {
    const c = code.toUpperCase();
    if (c.includes('MAX') || c.includes('PRO') || c.includes('ANNUEL')) return 'workspace_premium';
    if (c.includes('DIAMOND') || c.includes('SEMESTRIEL')) return 'star';
    if (c.includes('GOLD') || c.includes('TRIMESTRIEL')) return 'verified';
    return 'calendar_month';
  }

  formatDuree(jours: number): string {
    if (jours >= 365) return `${Math.round(jours / 365)} an${jours >= 730 ? 's' : ''}`;
    if (jours >= 30) return `${Math.round(jours / 30)} mois`;
    return `${jours} jour${jours > 1 ? 's' : ''}`;
  }
}
