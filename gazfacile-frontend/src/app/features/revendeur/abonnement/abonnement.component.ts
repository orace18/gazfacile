import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AbonnementService } from '../../../core/services/abonnement.service';
import { PaiementService } from '../../../core/services/paiement.service';
import {
  Abonnement,
  AbonnementStatut,
  ABONNEMENT_PLANS
} from '../../../core/models/revendeur.model';

@Component({
  selector: 'app-abonnement',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatSnackBarModule
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
      } @else if (statut()) {

        <!-- Statut actuel -->
        <div class="statut-actuel">
          <div class="badge-plan" [class]="'badge-' + statut()!.plan.toLowerCase()">
            <mat-icon>{{ iconePlan(statut()!.plan) }}</mat-icon>
            {{ statut()!.planLibelle }}
          </div>
          @if (statut()!.plan !== Abonnement.GRATUIT) {
            @if (statut()!.expire) {
              <span class="chip-expire">
                <mat-icon>warning</mat-icon> Expiré
              </span>
            } @else {
              <span class="chip-actif">
                <mat-icon>check_circle</mat-icon>
                Actif jusqu'au {{ statut()!.expiry | date:'dd/MM/yyyy' }}
              </span>
            }
          }
        </div>

        <!-- Grille des plans -->
        <div class="grille-plans">
          @for (p of plans; track p.plan) {
            <div class="carte-plan" [class.plan-actuel]="statut()!.plan === p.plan"
                 [class.plan-recommande]="p.plan === Abonnement.PREMIUM">

              @if (p.plan === Abonnement.PREMIUM) {
                <div class="badge-recommande">Recommandé</div>
              }

              <div class="plan-entete">
                <mat-icon class="plan-icone">{{ iconePlan(p.plan) }}</mat-icon>
                <h2 class="plan-nom">{{ p.libelle }}</h2>
                <p class="plan-desc">{{ p.description }}</p>
                <div class="plan-prix">
                  @if (p.prix === 0) {
                    <span class="prix-valeur">Gratuit</span>
                  } @else {
                    <span class="prix-valeur">{{ p.prix | number:'1.0-0' }}</span>
                    <span class="prix-unite"> FCFA / mois</span>
                  }
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
                @if (statut()!.plan === p.plan && !statut()!.expire) {
                  <button mat-stroked-button disabled class="btn-plan-actuel">
                    <mat-icon>check_circle</mat-icon> Plan actuel
                  </button>
                } @else if (p.plan === Abonnement.GRATUIT) {
                  <button mat-stroked-button disabled>
                    Plan de base
                  </button>
                } @else {
                  <button
                    mat-raised-button
                    class="btn-souscrire"
                    [class.btn-premium]="p.plan === Abonnement.PREMIUM"
                    [disabled]="enCoursId() === p.plan"
                    (click)="souscrire(p.plan)"
                  >
                    @if (enCoursId() === p.plan) {
                      <mat-spinner diameter="16"></mat-spinner>
                    } @else {
                      <mat-icon>open_in_new</mat-icon>
                    }
                    {{ statut()!.expire || statut()!.plan === Abonnement.GRATUIT ? 'Souscrire' : 'Renouveler' }}
                  </button>
                }
              </div>
            </div>
          }
        </div>

        @if (erreur()) {
          <div class="erreur">
            <mat-icon>error</mat-icon> {{ erreur() }}
          </div>
        }

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
      font-family: 'Archivo Black', sans-serif;
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

      &.badge-gratuit {
        background: var(--color-surface-2);
        color: var(--color-text-muted);
      }
      &.badge-standard {
        background: color-mix(in srgb, var(--color-primary) 15%, transparent);
        color: var(--color-primary);
      }
      &.badge-premium {
        background: color-mix(in srgb, var(--color-accent) 20%, transparent);
        color: #8a6200;
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

      &.plan-recommande {
        border-color: var(--color-accent);
      }
    }

    .badge-recommande {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--color-accent);
      color: #1a1a00;
      font-size: 0.72rem;
      font-weight: 700;
      padding: 2px 12px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
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
      font-family: 'Archivo Black', sans-serif;
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
        font-family: 'Archivo Black', sans-serif;
        font-size: 1.8rem;
        color: var(--color-primary);
      }
      .prix-unite {
        font-size: 0.8rem;
        color: var(--color-text-muted);
      }
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

      &.btn-premium {
        background-color: var(--color-accent) !important;
        color: #1a1a00 !important;
      }
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
  private readonly abonnementService = inject(AbonnementService);
  private readonly paiementService = inject(PaiementService);
  private readonly snackBar = inject(MatSnackBar);

  readonly Abonnement = Abonnement;
  readonly plans = ABONNEMENT_PLANS;

  statut = signal<AbonnementStatut | null>(null);
  chargement = signal(true);
  enCoursId = signal<Abonnement | null>(null);
  erreur = signal<string | null>(null);

  ngOnInit(): void {
    this.chargerStatut();
  }

  chargerStatut(): void {
    this.chargement.set(true);
    this.abonnementService.getStatut().subscribe({
      next: s => {
        this.statut.set(s);
        this.chargement.set(false);
      },
      error: () => {
        this.chargement.set(false);
        this.erreur.set('Impossible de charger le statut d\'abonnement');
      }
    });
  }

  souscrire(plan: Abonnement): void {
    this.enCoursId.set(plan);
    this.erreur.set(null);
    this.abonnementService.souscrire(plan).subscribe({
      next: response => {
        this.enCoursId.set(null);
        this.paiementService.redirectVersCheckout(response.checkoutUrl);
      },
      error: err => {
        this.enCoursId.set(null);
        this.erreur.set(err.message);
      }
    });
  }

  iconePlan(plan: Abonnement): string {
    switch (plan) {
      case Abonnement.PREMIUM:  return 'workspace_premium';
      case Abonnement.STANDARD: return 'verified';
      default:                  return 'store';
    }
  }
}
