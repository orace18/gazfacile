import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface InactivityDialogData {
  countdown: number;
}

/**
 * Modale d'inactivité affichée après 30 minutes sans interaction.
 * Compte à rebours de 60 secondes avant déconnexion automatique.
 * Retourne true si l'utilisateur confirme sa présence, false sinon.
 */
@Component({
  selector: 'app-inactivity-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="modal-container">
      <mat-icon class="icone-avertissement">access_time</mat-icon>

      <h2 mat-dialog-title>Êtes-vous toujours là ?</h2>

      <mat-dialog-content>
        <p>Vous semblez inactif depuis un moment.</p>
        <p class="message-deconnexion">
          Déconnexion automatique dans
          <strong class="compte-a-rebours" [class.urgent]="countdown <= 10">
            {{ countdown }}s
          </strong>
        </p>
      </mat-dialog-content>

      <mat-dialog-actions>
        <button mat-button class="btn-deconnecter" (click)="deconnecter()">
          <mat-icon>logout</mat-icon>
          Me déconnecter
        </button>
        <button mat-raised-button color="primary" (click)="rester()">
          <mat-icon>check_circle</mat-icon>
          Je suis là
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .modal-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 8px 16px 0;
      min-width: 320px;
    }

    .icone-avertissement {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: var(--color-accent, #f59e0b);
      margin-bottom: 8px;
    }

    h2 {
      text-align: center;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-primary, #1e3a5f);
    }

    mat-dialog-content {
      text-align: center;
      color: var(--color-text, #374151);
    }

    .message-deconnexion {
      margin-top: 8px;
    }

    .compte-a-rebours {
      font-size: 1.1em;
      color: var(--color-primary, #1e3a5f);
      transition: color 0.3s;

      &.urgent {
        color: #dc2626;
      }
    }

    mat-dialog-actions {
      display: flex;
      justify-content: center;
      gap: 12px;
      padding: 16px 0;
    }

    .btn-deconnecter {
      color: #6b7280;
    }
  `]
})
export class InactivityModalComponent implements OnInit, OnDestroy {
  countdown: number;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor(
    private readonly dialogRef: MatDialogRef<InactivityModalComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) data: InactivityDialogData
  ) {
    this.countdown = data.countdown;
  }

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        this.deconnecter();
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }
  }

  rester(): void {
    this.dialogRef.close(true);
  }

  deconnecter(): void {
    this.dialogRef.close(false);
  }
}
