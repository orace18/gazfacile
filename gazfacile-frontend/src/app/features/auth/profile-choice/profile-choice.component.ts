import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { InscriptionStateService } from '../../../core/services/inscription-state.service';
import { Role } from '../../../core/models/revendeur.model';

@Component({
  selector: 'app-profile-choice',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  template: `
    <div class="page-choix">
      <div class="conteneur">
        <div class="entete">
          <img src="assets/logo.svg" alt="GazFacile" class="logo">
          <h1>Créer un compte</h1>
          <p class="sous-titre">Choisissez votre profil pour commencer</p>
        </div>

        <div class="grille-profils">
          <button class="carte-profil" (click)="choisir('CLIENT')">
            <div class="carte-icone">
              <mat-icon>person</mat-icon>
            </div>
            <h2>JE SUIS CLIENT</h2>
            <p>Je cherche du gaz près de chez moi ou je veux me faire livrer</p>
            <span class="carte-cta">
              Continuer <mat-icon>arrow_forward</mat-icon>
            </span>
          </button>

          <button class="carte-profil" (click)="choisir('REVENDEUR')">
            <div class="carte-icone">
              <mat-icon>store</mat-icon>
            </div>
            <h2>JE SUIS REVENDEUR</h2>
            <p>Je vends du gaz et je veux être visible sur GazFacile</p>
            <span class="carte-cta">
              Continuer <mat-icon>arrow_forward</mat-icon>
            </span>
          </button>
        </div>

        <div class="lien-connexion">
          <p>Déjà un compte ? <a routerLink="/auth/login">Se connecter</a></p>
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

    .grille-profils {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;

      @media (max-width: 560px) {
        grid-template-columns: 1fr;
      }
    }

    .carte-profil {
      background: var(--color-surface);
      border: 2px solid transparent;
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
        font-size: 1.1rem;
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

    .lien-connexion {
      text-align: center;
      margin-top: 28px;

      p {
        font-size: 0.88rem;
        color: rgba(255, 255, 255, 0.7);
      }

      a {
        color: var(--color-accent);
        font-weight: 700;
        &:hover { color: white; }
      }
    }
  `]
})
export class ProfileChoiceComponent {
  private readonly state = inject(InscriptionStateService);
  private readonly router = inject(Router);

  choisir(role: 'CLIENT' | 'REVENDEUR'): void {
    this.state.setRole(Role[role]);
    if (role === 'CLIENT') {
      this.router.navigate(['/auth/register/client']);
    } else {
      this.router.navigate(['/auth/register/revendeur']);
    }
  }
}
