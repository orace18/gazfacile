import {
  Component,
  ViewChild,
  inject,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RevendeurService } from '../../core/services/revendeur.service';
import { MapComponent } from '../map/map.component';
import { RevendeurListComponent } from '../revendeur/revendeur-list/revendeur-list.component';
import {
  CommandeFormComponent,
  DialogCommandeData
} from '../commande/commande-form/commande-form.component';
import { Revendeur } from '../../core/models/revendeur.model';

/**
 * Page principale de GazFacile.
 * Affiche la carte Leaflet et la liste des revendeurs en vue fractionnée.
 * Coordonne la communication entre la carte et la liste.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatSnackBarModule,
    MapComponent,
    RevendeurListComponent
  ],
  template: `
    <div class="page-accueil">
      <!-- Hero section bleue -->
      <section class="heros">
        <div class="heros-contenu">
          <p class="heros-surtitre">Gaz domestique · Bénin · Temps réel</p>
          <h1 class="heros-titre">
            Le gaz, <span class="accent">plus proche</span> de vous
          </h1>
          <p class="heros-desc">
            Trouvez un revendeur de gaz près de chez vous en quelques secondes.
          </p>
          <div class="marques-logos">
            <span class="marque-badge">Bénin Petro</span>
            <span class="marque-badge">Oryx</span>
            <span class="marque-badge">ProGaz</span>
            <span class="marque-badge">JNP</span>
          </div>
        </div>
      </section>

      <!-- Vue principale : carte + liste -->
      <div class="vue-principale">
        <!-- Panneau carte (gauche sur desktop) -->
        <div class="panneau-carte">
          <app-map
            #carteRef
            [revendeursSignal]="revendeurService.revendeurs"
            (commanderClique)="ouvrirDialogCommande($event)"
          ></app-map>
        </div>

        <!-- Panneau liste (droite sur desktop) -->
        <div class="panneau-liste">
          <app-revendeur-list
            (revendeurSelectionne)="onRevendeurSelectionne($event)"
            (commanderRevendeur)="ouvrirDialogCommande($event)"
          ></app-revendeur-list>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-accueil {
      display: flex;
      flex-direction: column;
      height: calc(100vh - 64px);
    }

    /* ── HERO ── */
    .heros {
      background-color: var(--color-primary);
      padding: 24px 32px 20px;
      flex-shrink: 0;
    }

    .heros-contenu {
      max-width: 1200px;
      margin: 0 auto;
    }

    .heros-surtitre {
      font-family: 'Montserrat', sans-serif;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.14em;
      color: rgba(255, 255, 255, 0.6);
      text-transform: uppercase;
      margin-bottom: 6px;
    }

    .heros-titre {
      font-family: 'Archivo Black', sans-serif;
      font-size: 2rem;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 1.15;
      margin-bottom: 8px;

      .accent {
        color: var(--color-accent);
      }
    }

    .heros-desc {
      font-family: 'Montserrat', sans-serif;
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 14px;
      line-height: 1.5;
    }

    .marques-logos {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      align-items: center;
    }

    .marque-badge {
      background-color: rgba(255, 255, 255, 0.12);
      color: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.25);
      padding: 4px 12px;
      font-family: 'Montserrat', sans-serif;
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      border-radius: var(--radius-sm);
    }

    /* ── SPLIT VIEW ── */
    .vue-principale {
      display: flex;
      flex: 1;
      overflow: hidden;
    }

    .panneau-carte {
      flex: 0 0 60%;
      max-width: 60%;
      height: 100%;
    }

    .panneau-liste {
      flex: 0 0 40%;
      max-width: 40%;
      height: 100%;
      overflow: hidden;
      border-left: 2px solid var(--color-border);
      display: flex;
      flex-direction: column;
      background-color: var(--color-surface);
    }

    @media (max-width: 900px) {
      .page-accueil {
        height: auto;
      }

      .vue-principale {
        flex-direction: column;
      }

      .panneau-carte {
        flex: 0 0 50vh;
        max-width: 100%;
        height: 50vh;
      }

      .panneau-liste {
        flex: 1;
        max-width: 100%;
        height: auto;
        min-height: 400px;
        border-left: none;
        border-top: 2px solid var(--color-border);
      }

      .heros-titre {
        font-size: 1.6rem;
      }
    }

    @media (max-width: 480px) {
      .heros {
        padding: 16px;
      }

      .heros-titre {
        font-size: 1.3rem;
      }

      .heros-desc {
        display: none;
      }

      .marques-logos {
        display: none;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  readonly revendeurService = inject(RevendeurService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  @ViewChild('carteRef') private carteRef!: MapComponent;

  ngOnInit(): void {
    // Charger tous les revendeurs actifs au démarrage
    this.revendeurService.loadAll();
  }

  /** Reçu depuis RevendeurListComponent : centrer la carte sur le revendeur sélectionné. */
  onRevendeurSelectionne(revendeurId: string): void {
    this.carteRef?.focusRevendeur(revendeurId);
  }

  /** Ouvre le dialog de commande pour un revendeur. */
  ouvrirDialogCommande(revendeur: Revendeur): void {
    const dialogRef = this.dialog.open<CommandeFormComponent, DialogCommandeData>(
      CommandeFormComponent,
      {
        data: { revendeur },
        width: '540px',
        maxWidth: '95vw',
        panelClass: 'dialog-gaz'
      }
    );

    dialogRef.afterClosed().subscribe(commande => {
      if (commande) {
        this.snackBar.open(
          `Commande confirmée ! Référence : ${commande.id?.substring(0, 8).toUpperCase()}`,
          'OK',
          { duration: 5000 }
        );
      }
    });
  }
}
