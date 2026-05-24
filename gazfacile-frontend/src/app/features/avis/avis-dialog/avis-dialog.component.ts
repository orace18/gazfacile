import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject, OnInit, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { AvisService } from '../../../core/services/avis.service';
import { AuthService } from '../../../core/services/auth.service';
import { Avis } from '../../../core/models/notification.model';
import { Revendeur } from '../../../core/models/revendeur.model';
import { AvisFormComponent } from '../avis-form/avis-form.component';

export interface AvisDialogData {
  revendeur: Revendeur;
}

@Component({
  selector: 'app-avis-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    RouterLink,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    AvisFormComponent
  ],
  template: `
    <div class="dialog-avis">
      <header class="entete">
        <div>
          <p class="surtitre">Avis clients</p>
          <h2 mat-dialog-title>{{ data.revendeur.nom }}</h2>
          <p class="quartier">
            <mat-icon>place</mat-icon>
            {{ data.revendeur.quartier }}
          </p>
        </div>

        <button mat-icon-button type="button" aria-label="Fermer" (click)="fermer()">
          <mat-icon>close</mat-icon>
        </button>
      </header>

      <mat-dialog-content>
        <section class="resume">
          <div class="note-globale">
            <strong>{{ data.revendeur.noteMoyenne || 0 | number:'1.1-1' }}</strong>
            <span>/5</span>
          </div>
          <div class="etoiles" aria-hidden="true">
            @for (etoile of etoiles; track etoile) {
              <mat-icon [class.active]="etoile <= arrondirNote(data.revendeur.noteMoyenne)">
                star
              </mat-icon>
            }
          </div>
          <p>{{ data.revendeur.nombreAvis }} avis publié{{ data.revendeur.nombreAvis > 1 ? 's' : '' }}</p>
        </section>

        <section class="liste-avis">
          <div class="section-titre">
            <h3>Derniers avis</h3>
            @if (chargement()) {
              <mat-spinner diameter="20"></mat-spinner>
            }
          </div>

          @if (erreur()) {
            <div class="message erreur">
              <mat-icon>error_outline</mat-icon>
              {{ erreur() }}
            </div>
          } @else if (!chargement() && avis().length === 0) {
            <div class="message">
              <mat-icon>rate_review</mat-icon>
              Aucun avis pour le moment.
            </div>
          } @else {
            <div class="avis-items">
              @for (item of avis(); track item.id) {
                <article class="avis-item">
                  <div class="avis-haut">
                    <div>
                      <strong>{{ item.auteurNom }}</strong>
                      <span>{{ item.createdAt | date:'dd/MM/yyyy' }}</span>
                    </div>
                    <div class="mini-etoiles" [attr.aria-label]="'Note ' + item.note + ' sur 5'">
                      @for (etoile of etoiles; track etoile) {
                        <mat-icon [class.active]="etoile <= item.note">star</mat-icon>
                      }
                    </div>
                  </div>

                  @if (item.commentaire) {
                    <p>{{ item.commentaire }}</p>
                  }
                </article>
              }
            </div>
          }
        </section>

        <section class="form-section">
          @if (authService.estConnecte()) {
            <app-avis-form
              [revendeurId]="data.revendeur.id"
              (avisPublie)="onAvisPublie()"
            ></app-avis-form>
          } @else {
            <div class="message connexion">
              <mat-icon>lock</mat-icon>
              <span>Connectez-vous pour laisser un avis.</span>
              <a mat-stroked-button routerLink="/auth/login" (click)="fermer()">Connexion</a>
            </div>
          }
        </section>
      </mat-dialog-content>
    </div>
  `,
  styles: [`
    .dialog-avis {
      background: var(--color-bg);
      color: var(--color-text);
      min-width: min(720px, 92vw);
    }

    .entete {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      padding: 18px 20px 8px;
      border-bottom: 1px solid var(--color-border);
      background: var(--color-surface);

      h2 {
        margin: 0;
        padding: 0;
        font-family: 'Syne', sans-serif;
        font-size: 1.25rem;
      }
    }

    .surtitre {
      margin: 0 0 4px;
      color: var(--color-primary);
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .quartier {
      display: flex;
      align-items: center;
      gap: 4px;
      margin: 6px 0 0;
      color: var(--color-text-muted);
      font-size: 0.85rem;

      mat-icon {
        font-size: 1rem;
        width: 1rem;
        height: 1rem;
      }
    }

    mat-dialog-content {
      display: grid;
      gap: 16px;
      padding: 18px 20px 20px !important;
      max-height: min(76vh, 760px);
    }

    .resume {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      gap: 4px 12px;
      padding: 14px;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-surface);

      p {
        grid-column: 2;
        margin: 0;
        color: var(--color-text-muted);
        font-size: 0.85rem;
      }
    }

    .note-globale {
      grid-row: span 2;

      strong {
        font-size: 2rem;
        line-height: 1;
      }

      span {
        color: var(--color-text-muted);
        font-weight: 700;
      }
    }

    .etoiles,
    .mini-etoiles {
      display: flex;
      align-items: center;
      gap: 2px;

      mat-icon {
        color: var(--color-surface-3);
      }

      mat-icon.active {
        color: var(--color-accent);
      }
    }

    .section-titre {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;

      h3 {
        margin: 0;
        font-family: 'Syne', sans-serif;
        font-size: 1rem;
      }
    }

    .avis-items {
      display: grid;
      gap: 10px;
      max-height: 260px;
      overflow: auto;
      padding-right: 4px;
    }

    .avis-item {
      padding: 12px;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
      background: var(--color-surface);

      p {
        margin: 10px 0 0;
        color: var(--color-text);
        font-size: 0.9rem;
        line-height: 1.45;
      }
    }

    .avis-haut {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;

      div:first-child {
        display: grid;
        gap: 2px;
      }

      span {
        color: var(--color-text-muted);
        font-size: 0.78rem;
      }
    }

    .mini-etoiles mat-icon {
      font-size: 1rem;
      width: 1rem;
      height: 1rem;
    }

    .message {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
      background: var(--color-surface);
      color: var(--color-text-muted);
      font-size: 0.9rem;
    }

    .message.erreur {
      color: var(--color-danger);
      background: var(--color-danger-bg);
      border-color: color-mix(in srgb, var(--color-danger) 35%, transparent);
    }

    .connexion {
      justify-content: space-between;
      flex-wrap: wrap;

      a {
        border-color: var(--color-primary) !important;
        color: var(--color-primary) !important;
      }
    }

    @media (max-width: 560px) {
      .dialog-avis {
        min-width: 0;
      }

      .avis-haut {
        flex-direction: column;
      }
    }
  `]
})
export class AvisDialogComponent implements OnInit {
  private readonly avisService = inject(AvisService);
  private readonly dialogRef = inject(MatDialogRef<AvisDialogComponent, boolean>);

  readonly authService = inject(AuthService);
  readonly avis = signal<Avis[]>([]);
  readonly chargement = signal(false);
  readonly erreur = signal<string | null>(null);
  readonly etoiles = [1, 2, 3, 4, 5];

  private avisPublie = false;

  constructor(@Inject(MAT_DIALOG_DATA) readonly data: AvisDialogData) {}

  ngOnInit(): void {
    this.chargerAvis();
  }

  chargerAvis(): void {
    this.chargement.set(true);
    this.erreur.set(null);

    this.avisService.getByRevendeur(this.data.revendeur.id).subscribe({
      next: avis => {
        this.avis.set(avis);
        this.chargement.set(false);
      },
      error: err => {
        this.erreur.set(err.message);
        this.chargement.set(false);
      }
    });
  }

  onAvisPublie(): void {
    this.avisPublie = true;
    this.chargerAvis();
  }

  arrondirNote(note: number): number {
    return Math.round(note || 0);
  }

  fermer(): void {
    this.dialogRef.close(this.avisPublie);
  }
}
