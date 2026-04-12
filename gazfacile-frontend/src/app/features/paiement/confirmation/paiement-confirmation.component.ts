import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PaiementService } from '../../../core/services/paiement.service';
import { StatutFedaPay, Transaction } from '../../../core/models/revendeur.model';

/**
 * Page de confirmation de paiement.
 * FedaPay redirige vers cette page après le checkout avec ?reference=XXX&status=approved.
 * Le statut dans l'URL sert de fallback visuel si le webhook n'a pas encore mis la base à jour.
 */
@Component({
  selector: 'app-paiement-confirmation',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="page-confirmation">
      <div class="carte-confirmation">

        @if (chargement()) {
          <mat-spinner diameter="56"></mat-spinner>
          <p class="texte-attente">Vérification du paiement en cours...</p>

        } @else if (transaction()) {
          <!-- Résultat selon le statut -->
          @switch (transaction()!.statut) {
            @case (StatutFedaPay.APPROVED) {
              <div class="icone-statut succes">
                <mat-icon>check_circle</mat-icon>
              </div>
              <h1>Paiement réussi !</h1>
              <p class="detail">
                {{ transaction()!.montant | number:'1.0-0' }} FCFA payés avec succès.<br>
                Référence : <strong>{{ transaction()!.reference }}</strong>
              </p>
            }
            @case (StatutFedaPay.PENDING) {
              <div class="icone-statut attente">
                <mat-icon>hourglass_top</mat-icon>
              </div>
              <h1>Paiement en attente</h1>
              <p class="detail">
                Votre paiement est en cours de traitement.<br>
                Référence : <strong>{{ transaction()!.reference }}</strong>
              </p>
            }
            @default {
              <div class="icone-statut echec">
                <mat-icon>cancel</mat-icon>
              </div>
              <h1>Paiement {{ getStatutLabel(transaction()!.statut) | lowercase }}</h1>
              <p class="detail">
                Le paiement n'a pas pu être finalisé.<br>
                Référence : <strong>{{ transaction()!.reference }}</strong>
              </p>
            }
          }

          <div class="actions">
            <button mat-raised-button class="btn-accueil" routerLink="/">
              <mat-icon>home</mat-icon> Retour à l'accueil
            </button>
          </div>

        } @else if (erreur()) {
          <div class="icone-statut echec">
            <mat-icon>error</mat-icon>
          </div>
          <h1>Impossible de vérifier le paiement</h1>
          <p class="detail">{{ erreur() }}</p>
          <div class="actions">
            <button mat-raised-button class="btn-accueil" routerLink="/">
              <mat-icon>home</mat-icon> Retour à l'accueil
            </button>
          </div>
        }

      </div>
    </div>
  `,
  styles: [`
    .page-confirmation {
      min-height: 100vh;
      background-image: linear-gradient(160deg, var(--color-primary) 60%, var(--color-primary-dark, #2c4770) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }

    .carte-confirmation {
      background: white;
      border-radius: var(--radius-md);
      padding: 48px 40px;
      max-width: 460px;
      width: 100%;
      text-align: center;
      box-shadow: 0 16px 48px rgba(0,0,0,0.25);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }

    .icone-statut {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      mat-icon {
        font-size: 3rem;
        width: 3rem;
        height: 3rem;
      }

      &.succes {
        background: color-mix(in srgb, #2e7d32 15%, transparent);
        color: #2e7d32;
      }
      &.attente {
        background: color-mix(in srgb, var(--color-warning, #f59e0b) 15%, transparent);
        color: var(--color-warning, #f59e0b);
      }
      &.echec {
        background: color-mix(in srgb, var(--color-danger) 15%, transparent);
        color: var(--color-danger);
      }
    }

    h1 {
      font-family: 'Montserrat', sans-serif;
      font-size: 1.5rem;
      color: var(--color-text);
      margin: 0;
    }

    .detail {
      font-size: 0.9rem;
      color: var(--color-text-muted);
      line-height: 1.6;
      margin: 0;
    }

    .texte-attente {
      color: var(--color-text-muted);
      font-size: 0.9rem;
    }

    .actions {
      margin-top: 8px;
    }

    .btn-accueil {
      background-color: var(--color-primary) !important;
      color: white !important;
      height: 44px;
      padding: 0 24px;
    }
  `]
})
export class PaiementConfirmationComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly paiementService = inject(PaiementService);
  private pollTimer: number | null = null;
  private tentativeRafraichissement = 0;
  private readonly delaiRafraichissementMs = 2500;
  private readonly maxTentativesRafraichissement = 6;

  readonly StatutFedaPay = StatutFedaPay;

  transaction = signal<Transaction | null>(null);
  chargement = signal(true);
  erreur = signal<string | null>(null);

  ngOnInit(): void {
    const reference = this.route.snapshot.queryParamMap.get('reference');
    const statutUrl = this.parseStatut(this.route.snapshot.queryParamMap.get('status'));

    if (!reference) {
      this.chargement.set(false);
      this.erreur.set('Aucune référence de transaction trouvée dans l\'URL.');
      return;
    }

    this.chargerTransaction(reference, statutUrl);
  }

  ngOnDestroy(): void {
    this.arreterRafraichissement();
  }

  getStatutLabel(statut: StatutFedaPay): string {
    return this.paiementService.getStatutLabel(statut);
  }

  private chargerTransaction(reference: string, statutUrl: StatutFedaPay | null, depuisRafraichissement = false): void {
    if (!depuisRafraichissement) {
      this.chargement.set(true);
      this.erreur.set(null);
      this.tentativeRafraichissement = 0;
    }

    this.paiementService.getTransaction(reference).subscribe({
      next: t => {
        const statutAffiche = this.resoudreStatutAffiche(t.statut, statutUrl);
        this.transaction.set(
          statutAffiche === t.statut
            ? t
            : { ...t, statut: statutAffiche }
        );
        this.chargement.set(false);

        if (t.statut === StatutFedaPay.PENDING && statutAffiche !== StatutFedaPay.PENDING) {
          this.planifierRafraichissement(reference, statutUrl);
          return;
        }

        this.arreterRafraichissement();
      },
      error: () => {
        this.chargement.set(false);
        if (!this.transaction()) {
          this.erreur.set('Impossible de retrouver la transaction. Vérifiez votre historique.');
        }
      }
    });
  }

  private planifierRafraichissement(reference: string, statutUrl: StatutFedaPay | null): void {
    if (this.pollTimer !== null || this.tentativeRafraichissement >= this.maxTentativesRafraichissement) {
      return;
    }

    this.tentativeRafraichissement += 1;
    this.pollTimer = window.setTimeout(() => {
      this.pollTimer = null;
      this.chargerTransaction(reference, statutUrl, true);
    }, this.delaiRafraichissementMs);
  }

  private arreterRafraichissement(): void {
    if (this.pollTimer !== null) {
      window.clearTimeout(this.pollTimer);
      this.pollTimer = null;
    }
  }

  private resoudreStatutAffiche(statutTransaction: StatutFedaPay, statutUrl: StatutFedaPay | null): StatutFedaPay {
    if (statutTransaction !== StatutFedaPay.PENDING) {
      return statutTransaction;
    }

    if (statutUrl && statutUrl !== StatutFedaPay.PENDING) {
      return statutUrl;
    }

    return statutTransaction;
  }

  private parseStatut(statut: string | null): StatutFedaPay | null {
    if (!statut) {
      return null;
    }

    return StatutFedaPay[statut.trim().toUpperCase() as keyof typeof StatutFedaPay] ?? null;
  }
}
