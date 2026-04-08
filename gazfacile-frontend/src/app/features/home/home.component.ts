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
      <!-- En-tête héros -->
      <div class="heros">
        <div class="heros-contenu">
          <h1 class="heros-titre">
            Trouvez du gaz 🔥<br>
            <span class="highlight">près de chez vous</span>
          </h1>
          <p class="heros-desc">
            Localisez les revendeurs de gaz domestique au Bénin en temps réel.
            Stock mis à jour instantanément.
          </p>
        </div>
      </div>

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

    .heros {
      background: linear-gradient(135deg, var(--color-surface) 0%, rgba(255, 107, 53, 0.12) 60%, rgba(255, 107, 53, 0.04) 100%);
      border-bottom: 1px solid var(--color-border);
      padding: 20px 24px;
      flex-shrink: 0;
    }

    .heros-contenu {
      max-width: 1200px;
      margin: 0 auto;
    }

    .heros-titre {
      font-family: 'Syne', sans-serif;
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--color-text);
      margin-bottom: 6px;
      line-height: 1.25;

      .highlight {
        color: var(--color-primary);
      }
    }

    .heros-desc {
      font-size: 0.9rem;
      color: var(--color-text-muted);
      max-width: 500px;
    }

    .vue-principale {
      display: flex;
      flex: 1;
      overflow: hidden;
    }

    .panneau-carte {
      flex: 0 0 60%;
      max-width: 60%;
      height: 100%;
      padding: 12px;
    }

    .panneau-liste {
      flex: 0 0 40%;
      max-width: 40%;
      height: 100%;
      overflow: hidden;
      border-left: 1px solid var(--color-border);
      display: flex;
      flex-direction: column;
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
        border-top: 1px solid var(--color-border);
      }

      .heros-titre {
        font-size: 1.3rem;
      }
    }

    @media (max-width: 480px) {
      .heros {
        padding: 14px 16px;
      }

      .heros-titre {
        font-size: 1.1rem;
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
