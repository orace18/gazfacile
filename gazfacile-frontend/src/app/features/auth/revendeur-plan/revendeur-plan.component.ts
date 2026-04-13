import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InscriptionStateService } from '../../../core/services/inscription-state.service';
import { SubscriptionService } from '../../../core/services/subscription.service';
import { PlanInscription, PlanType, SubscriptionPlanDTO } from '../../../core/models/revendeur.model';

@Component({
  selector: 'app-revendeur-plan',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  template: `
    <div class="page-plans">
      <div class="conteneur">
        <div class="entete">
          <img src="assets/logo.svg" alt="GazFacile" class="logo">
          <h1>Formules Revendeur</h1>
          <p class="sous-titre">Choisissez la formule qui vous convient pour être visible sur GazFacile</p>
        </div>

        @if (chargement()) {
          <div class="chargement">
            <mat-spinner diameter="40"></mat-spinner>
          </div>
        } @else if (erreur()) {
          <div class="erreur-msg">
            <mat-icon>error_outline</mat-icon> {{ erreur() }}
          </div>
        } @else {
          <div class="grille-plans">
            @for (plan of plans(); track plan.id) {
              <div class="carte-plan" [class.plan-recommande]="plan.recommande">
                @if (plan.recommande) {
                  <div class="badge-recommande">Recommandé</div>
                }

                <div class="plan-entete">
                  <mat-icon class="plan-icone">{{ iconePlan(plan) }}</mat-icon>
                  <h2 class="plan-nom">{{ plan.nom }}</h2>
                  <span class="plan-duree">{{ plan.duree }}</span>
                  <div class="plan-prix">
                    <span class="prix-valeur">{{ plan.prix | number:'1.0-0' }}</span>
                    <span class="prix-unite"> FCFA</span>
                  </div>
                </div>

                <ul class="liste-features">
                  @for (f of plan.features; track f) {
                    <li>
                      <mat-icon class="icone-check">check</mat-icon>
                      {{ f }}
                    </li>
                  }
                </ul>

                <div class="plan-action">
                  <button class="btn-choisir" [class.btn-recommande]="plan.recommande"
                    (click)="choisirPlan(plan)">
                    Choisir ce plan <mat-icon>arrow_forward</mat-icon>
                  </button>
                </div>
              </div>
            }
          </div>
        }

        <div class="navigation-bas">
          <button mat-button class="btn-retour" routerLink="/auth/register">
            <mat-icon>arrow_back</mat-icon> Retour
          </button>
          <p class="lien-connexion">
            Déjà un compte ? <a routerLink="/auth/login">Se connecter</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-plans {
      min-height: calc(100vh - 64px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 32px 16px;
      background-color: var(--color-primary);
      background-image: linear-gradient(160deg, var(--color-primary) 60%, var(--color-primary-dark) 100%);
    }

    .conteneur {
      width: 100%;
      max-width: 1100px;
    }

    .entete {
      text-align: center;
      margin-bottom: 36px;

      .logo {
        height: 56px;
        width: auto;
        display: block;
        margin: 0 auto 14px;
      }

      h1 {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.5rem;
        font-weight: 700;
        color: white;
        margin: 0 0 6px;
      }

      .sous-titre {
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.92rem;
        margin: 0;
      }
    }

    .chargement {
      display: flex;
      justify-content: center;
      padding: 60px 0;
    }

    .erreur-msg {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 16px;
      background: rgba(255,255,255,0.15);
      color: white;
      border-radius: 4px;
      margin-bottom: 24px;
    }

    .grille-plans {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .carte-plan {
      position: relative;
      background: var(--color-surface);
      border: 2px solid var(--color-border, #e0e0e0);
      padding: 24px 18px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
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
      white-space: nowrap;
    }

    .plan-entete {
      text-align: center;
    }

    .plan-icone {
      font-size: 2.2rem;
      width: 2.2rem;
      height: 2.2rem;
      color: var(--color-primary);
      margin-bottom: 6px;
    }

    .plan-nom {
      font-family: 'Montserrat', sans-serif;
      font-size: 1.1rem;
      color: var(--color-text);
      margin: 0 0 4px;
    }

    .plan-duree {
      display: inline-block;
      background: color-mix(in srgb, var(--color-primary) 10%, transparent);
      color: var(--color-primary);
      font-size: 0.72rem;
      font-weight: 700;
      padding: 2px 10px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .plan-prix {
      margin-top: 8px;

      .prix-valeur {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.6rem;
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
      gap: 6px;

      li {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.82rem;
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
      margin-top: 6px;
    }

    .btn-choisir {
      width: 100%;
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      background: var(--color-primary);
      color: white;
      border: none;
      font-family: inherit;
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      transition: background 0.2s;

      &:hover {
        background: var(--color-primary-dark);
      }

      &.btn-recommande {
        background: var(--color-accent);
        color: #1a1a00;

        &:hover { filter: brightness(0.92); }
      }

      mat-icon {
        font-size: 1rem;
        width: 1rem;
        height: 1rem;
      }
    }

    .navigation-bas {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 28px;
    }

    .btn-retour {
      color: rgba(255, 255, 255, 0.8) !important;
      &:hover { color: white !important; }
    }

    .lien-connexion {
      font-size: 0.88rem;
      color: rgba(255, 255, 255, 0.7);
      margin: 0;

      a {
        color: var(--color-accent);
        font-weight: 700;
        &:hover { color: white; }
      }
    }
  `]
})
export class RevendeurPlanComponent implements OnInit {
  private readonly state = inject(InscriptionStateService);
  private readonly subscriptionService = inject(SubscriptionService);
  private readonly router = inject(Router);

  plans = signal<PlanInscription[]>([]);
  chargement = signal(true);
  erreur = signal<string | null>(null);

  ngOnInit(): void {
    this.subscriptionService.getPlans('REVENDEUR').subscribe({
      next: dtos => {
        this.plans.set(dtos.map(d => this.toPlanInscription(d)));
        this.chargement.set(false);
      },
      error: () => {
        this.erreur.set('Impossible de charger les formules. Veuillez réessayer.');
        this.chargement.set(false);
      }
    });
  }

  iconePlan(plan: PlanInscription): string {
    const id = plan.id.toUpperCase();
    if (id.includes('MAX') || id.includes('PRO')) return 'workspace_premium';
    if (id.includes('DIAMOND')) return 'diamond';
    if (id.includes('GOLD')) return 'star';
    return 'verified';
  }

  choisirPlan(plan: PlanInscription): void {
    this.state.selectPlan(plan);
    this.router.navigate(['/auth/register/form']);
  }

  private toPlanInscription(dto: SubscriptionPlanDTO): PlanInscription {
    return {
      id: dto.code,
      nom: dto.nom,
      type: dto.type as unknown as PlanType,
      prix: dto.prix,
      duree: this.formatDuree(dto.dureeJours),
      quota: dto.quota,
      quotaLabel: dto.quota > 0 ? `${dto.quota} par mois` : '',
      features: dto.features,
      recommande: dto.recommande,
    };
  }

  private formatDuree(jours: number): string {
    if (jours >= 365) return `${Math.round(jours / 365)} an${jours >= 730 ? 's' : ''}`;
    if (jours >= 30) return `${Math.round(jours / 30)} mois`;
    return `${jours} jour${jours > 1 ? 's' : ''}`;
  }
}
