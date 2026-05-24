import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AvisService } from '../../../core/services/avis.service';
import { AuthService } from '../../../core/services/auth.service';
import { Avis, AvisDTO } from '../../../core/models/notification.model';

/**
 * Formulaire de notation d'un revendeur (1 à 5 étoiles + commentaire).
 * Peut être intégré directement dans la fiche revendeur ou en dialog.
 */
@Component({
  selector: 'app-avis-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="avis-form-container">
      <h3 class="titre">
        <mat-icon>rate_review</mat-icon>
        Laisser un avis
      </h3>

      <!-- Sélecteur d'étoiles -->
      <div class="selecteur-etoiles">
        <label class="label-etoiles">Votre note</label>
        <div class="etoiles">
          @for (etoile of [1,2,3,4,5]; track etoile) {
            <mat-icon
              class="etoile"
              [class.active]="etoile <= noteSelectionnee"
              [class.survol]="etoile <= noteSurvol"
              (mouseenter)="noteSurvol = etoile"
              (mouseleave)="noteSurvol = 0"
              (click)="selectionnerNote(etoile)"
            >star</mat-icon>
          }
        </div>
        @if (noteSelectionnee > 0) {
          <span class="libelle-note">{{ libelleNote(noteSelectionnee) }}</span>
        }
      </div>

      <form [formGroup]="formulaire" (ngSubmit)="soumettre()" class="formulaire">

        <mat-form-field appearance="outline" class="champ-pleine-largeur">
          <mat-label>Votre nom</mat-label>
          <input matInput formControlName="auteurNom" placeholder="Ex: Koffi D.">
          @if (formulaire.get('auteurNom')?.invalid && formulaire.get('auteurNom')?.touched) {
            <mat-error>Le nom est obligatoire</mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline" class="champ-pleine-largeur">
          <mat-label>Commentaire (optionnel)</mat-label>
          <textarea
            matInput
            formControlName="commentaire"
            rows="3"
            placeholder="Décrivez votre expérience avec ce revendeur..."
            maxlength="500"
          ></textarea>
          <mat-hint align="end">
            {{ formulaire.get('commentaire')?.value?.length || 0 }}/500
          </mat-hint>
        </mat-form-field>

        @if (erreur) {
          <div class="erreur">
            <mat-icon>error</mat-icon>
            {{ erreur }}
          </div>
        }

        <button
          mat-raised-button
          type="submit"
          class="btn-soumettre"
          [disabled]="formulaire.invalid || noteSelectionnee === 0 || envoi"
        >
          @if (envoi) {
            <mat-spinner diameter="18"></mat-spinner>
          } @else {
            <mat-icon>send</mat-icon>
          }
          Publier l'avis
        </button>
      </form>
    </div>
  `,
  styles: [`
    .avis-form-container {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: 20px;
    }

    .titre {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: 'Syne', sans-serif;
      font-size: 1rem;
      color: var(--color-text);
      margin-bottom: 16px;

      mat-icon { color: var(--color-primary); }
    }

    .selecteur-etoiles {
      margin-bottom: 16px;
    }

    .label-etoiles {
      font-size: 0.85rem;
      color: var(--color-text-muted);
      display: block;
      margin-bottom: 8px;
    }

    .etoiles {
      display: flex;
      gap: 4px;
      margin-bottom: 6px;
    }

    .etoile {
      font-size: 2rem;
      height: 2rem;
      width: 2rem;
      color: var(--color-surface-3);
      cursor: pointer;
      transition: color 0.15s, transform 0.1s;

      &.active, &.survol {
        color: var(--color-warning);
      }

      &:hover {
        transform: scale(1.2);
      }
    }

    .libelle-note {
      font-size: 0.85rem;
      color: var(--color-warning);
      font-weight: 600;
    }

    .formulaire {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .champ-pleine-largeur {
      width: 100%;
    }

    .erreur {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--color-danger);
      font-size: 0.85rem;
      padding: 10px 14px;
      background: var(--color-danger-bg);
      border-radius: var(--radius-sm);
    }

    .btn-soumettre {
      background-color: var(--color-primary) !important;
      color: white !important;
      align-self: flex-start;

      &:disabled {
        background-color: var(--color-surface-3) !important;
        color: var(--color-text-muted) !important;
      }

    }
  `]
})
export class AvisFormComponent implements OnInit {
  @Input({ required: true }) revendeurId!: string;
  @Output() avisPublie = new EventEmitter<Avis>();

  private readonly avisService = inject(AvisService);
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);

  noteSelectionnee = 0;
  noteSurvol = 0;
  envoi = false;
  erreur: string | null = null;

  formulaire = this.fb.group({
    auteurNom: ['', Validators.required],
    commentaire: ['', Validators.maxLength(500)]
  });

  ngOnInit(): void {
    const nom = this.authService.currentUser()?.nom;
    if (nom) {
      this.formulaire.patchValue({ auteurNom: nom });
    }
  }

  selectionnerNote(note: number): void {
    this.noteSelectionnee = note;
  }

  libelleNote(note: number): string {
    const libelles = ['', 'Très mauvais', 'Mauvais', 'Moyen', 'Bien', 'Excellent'];
    return libelles[note] ?? '';
  }

  soumettre(): void {
    if (this.formulaire.invalid || this.noteSelectionnee === 0) {
      this.formulaire.markAllAsTouched();
      return;
    }

    this.envoi = true;
    this.erreur = null;

    const dto: AvisDTO = {
      revendeurId: this.revendeurId,
      auteurNom: this.formulaire.value.auteurNom!,
      auteurTelephone: this.authService.currentUser()?.telephone ?? '',
      note: this.noteSelectionnee,
      commentaire: this.formulaire.value.commentaire || undefined
    };

    this.avisService.soumettre(dto).subscribe({
      next: avis => {
        this.envoi = false;
        this.snackBar.open('Merci pour votre avis !', 'OK', { duration: 4000 });
        this.avisPublie.emit(avis);
        this.formulaire.reset();
        this.noteSelectionnee = 0;
      },
      error: err => {
        this.envoi = false;
        this.erreur = err.message;
      }
    });
  }
}
