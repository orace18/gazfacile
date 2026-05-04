import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-free-consultation-dialog',
  standalone: true,
  imports: [CommonModule, RouterLink, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dialog-quota">
      <div class="icone">
        <mat-icon>visibility</mat-icon>
      </div>

      <h2>Consultations gratuites</h2>
      <p class="texte">
        Votre compte inclut <strong>{{ data.limite }} consultations gratuites</strong>
        pour trouver un revendeur et commencer une commande.
      </p>

      <div class="compteur">
        <span class="nombre">{{ data.restantes }}</span>
        <span class="label">
          consultation{{ data.restantes > 1 ? 's' : '' }} restante{{ data.restantes > 1 ? 's' : '' }}
        </span>
      </div>

      <p class="note">
        Une fois ce quota utilisé, vous devrez prendre un abonnement consultation pour continuer.
      </p>

      <div class="actions">
        <button mat-raised-button class="btn-principal" (click)="dialogRef.close()">
          <mat-icon>check</mat-icon>
          J'ai compris
        </button>
        <a mat-button routerLink="/abonnement/renouveler" (click)="dialogRef.close()">
          Voir les abonnements
        </a>
      </div>
    </div>
  `,
  styles: [`
    .dialog-quota {
      width: min(420px, 90vw);
      padding: 28px 24px 24px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
    }

    .icone {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: color-mix(in srgb, var(--color-accent) 28%, white);
      color: #6b4b00;
      display: flex;
      align-items: center;
      justify-content: center;

      mat-icon {
        width: 2rem;
        height: 2rem;
        font-size: 2rem;
      }
    }

    h2 {
      font-family: 'Montserrat', sans-serif;
      font-size: 1.35rem;
      color: var(--color-text);
      margin: 0;
    }

    .texte,
    .note {
      margin: 0;
      color: var(--color-text-muted);
      font-size: 0.9rem;
      line-height: 1.55;
    }

    .compteur {
      width: 100%;
      padding: 16px;
      border-radius: var(--radius-sm);
      background: var(--color-primary);
      color: white;
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: 8px;
    }

    .nombre {
      font-family: 'Montserrat', sans-serif;
      font-size: 2.4rem;
      font-weight: 800;
      color: var(--color-accent);
      line-height: 1;
    }

    .label {
      font-size: 0.9rem;
      font-weight: 700;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: center;
      margin-top: 4px;
    }

    .btn-principal {
      background: var(--color-primary) !important;
      color: white !important;
    }
  `]
})
export class FreeConsultationDialogComponent {
  readonly dialogRef = inject(MatDialogRef<FreeConsultationDialogComponent>);
  readonly data = inject<{ restantes: number; limite: number }>(MAT_DIALOG_DATA);
}
