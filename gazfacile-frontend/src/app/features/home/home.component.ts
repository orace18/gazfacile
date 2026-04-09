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
          <div class="heros-texte">
            <p class="heros-surtitre">PLATEFORME DE GAZ DOMESTIQUE — BÉNIN</p>
            <h1 class="heros-titre">
              LE GAZ,<br>
              <span class="accent">PLUS PROCHE</span><br>
              DE VOUS
            </h1>
            <p class="heros-desc">
              Localisez les revendeurs de gaz domestique au Bénin en temps réel.
              Bénin Petro · Oryx · ProGaz · JNP
            </p>
          </div>
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
      padding: 28px 32px 24px;
      flex-shrink: 0;
    }

    .heros-contenu {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 24px;
      flex-wrap: wrap;
    }

    .heros-surtitre {
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      color: var(--color-accent);
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    .heros-titre {
      font-family: 'Syne', sans-serif;
      font-size: 2.4rem;
      font-weight: 800;
      color: #FFFFFF;
      line-height: 1.1;
      text-transform: uppercase;
      margin-bottom: 12px;

      .accent {
        color: var(--color-accent);
      }
    }

    .heros-desc {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.75);
      max-width: 420px;
      line-height: 1.5;
    }

    .marques-logos {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      align-items: center;
    }

    .marque-badge {
      background-color: rgba(255, 255, 255, 0.15);
      color: #FFFFFF;
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 6px 14px;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
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
        font-size: 1.7rem;
      }

      .marques-logos {
        display: none;
      }
    }

    @media (max-width: 480px) {
      .heros {
        padding: 20px 16px;
      }

      .heros-titre {
        font-size: 1.4rem;
      }

      .heros-desc {
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
