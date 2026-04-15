import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { InscriptionStateService } from '../../../core/services/inscription-state.service';
import { ClientNeed } from '../../../core/models/revendeur.model';

@Component({
  selector: 'app-client-need',
  standalone: true,
  imports: [RouterLink, MatIconModule, MatButtonModule],
  template: `
    <div class="page-choix">
      <div class="conteneur">
        <div class="entete">
          <img src="assets/logo.svg" alt="GazFacile" class="logo">
          <h1>Que cherchez-vous ?</h1>
          <p class="sous-titre">Choisissez le service qui vous correspond</p>
        </div>

        <div class="grille-besoins">
          <button class="carte-besoin" (click)="choisir('CONSULT')">
            <div class="carte-icone">
              <mat-icon>location_on</mat-icon>
            </div>
            <h2>VOIR LES REVENDEURS PRÈS DE CHEZ MOI</h2>
            <p>Consultez les revendeurs de gaz autour de vous, comparez les prix et trouvez le meilleur rapport qualité/prix</p>
            <span class="carte-cta">
              Choisir <mat-icon>arrow_forward</mat-icon>
            </span>
          </button>

          <button class="carte-besoin" (click)="choisir('LIVRAISON')">
            <div class="carte-icone">
              <mat-icon>local_shipping</mat-icon>
            </div>
            <h2>ME FAIRE LIVRER DU GAZ</h2>
            <p>Commandez du gaz et faites-vous livrer directement à domicile dans un rayon de 5 km</p>
            <span class="carte-cta">
              Choisir <mat-icon>arrow_forward</mat-icon>
            </span>
          </button>
        </div>

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
    .page-choix {
      min-height: calc(100vh - 64px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px 16px;
      background-color: var(--color-primary);
      background-image: linear-gradient(160deg, var(--color-primary) 60%, var(--color-primary-dark) 100%);
    }

    .conteneur {
      width: 100%;
      max-width: 700px;
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
        font-size: 1.6rem;
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

    .grille-besoins {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;

      @media (max-width: 560px) {
        grid-template-columns: 1fr;
      }
    }

    .carte-besoin {
      background: var(--color-surface);
      border: 2px solid transparent;
      border-radius: var(--radius-lg, 16px);
      padding: 36px 24px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 12px;
      transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
      font-family: inherit;

      &:hover {
        border-color: var(--color-accent);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
        transform: translateY(-4px);
      }

      .carte-icone {
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

      h2 {
        font-family: 'Montserrat', sans-serif;
        font-size: 1rem;
        font-weight: 700;
        color: var(--color-text);
        margin: 0;
        letter-spacing: 0.04em;
      }

      p {
        font-size: 0.85rem;
        color: var(--color-text-muted);
        margin: 0;
        line-height: 1.4;
      }

      .carte-cta {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-top: 8px;
        color: var(--color-primary);
        font-weight: 700;
        font-size: 0.88rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;

        mat-icon {
          font-size: 1.1rem;
          width: 1.1rem;
          height: 1.1rem;
        }
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
export class ClientNeedComponent {
  private readonly state = inject(InscriptionStateService);
  private readonly router = inject(Router);

  choisir(need: 'CONSULT' | 'LIVRAISON'): void {
    this.state.setClientNeed(ClientNeed[need]);
    this.router.navigate(['/auth/register/client/plans']);
  }
}
