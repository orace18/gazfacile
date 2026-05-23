import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommandeService } from '../../../core/services/commande.service';
import { PaiementService } from '../../../core/services/paiement.service';
import {
  Commande,
  ModePaiement,
  StatutCommande,
  StatutPaiement,
  TypeTransaction
} from '../../../core/models/revendeur.model';

@Component({
  selector: 'app-mes-commandes',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="page-commandes">
      <section class="entete-page">
        <div>
          <p class="eyebrow">Espace client</p>
          <h1>Mes commandes</h1>
        </div>
        <button mat-stroked-button type="button" (click)="chargerCommandes()" [disabled]="chargement()">
          <mat-icon>refresh</mat-icon>
          Actualiser
        </button>
      </section>

      @if (chargement()) {
        <div class="etat-centre">
          <mat-spinner diameter="44"></mat-spinner>
          <span>Chargement de vos commandes...</span>
        </div>
      } @else if (erreur()) {
        <div class="etat-erreur">
          <mat-icon>error_outline</mat-icon>
          <span>{{ erreur() }}</span>
          <button mat-button type="button" (click)="chargerCommandes()">Réessayer</button>
        </div>
      } @else if (commandes().length === 0) {
        <div class="etat-vide">
          <mat-icon>receipt_long</mat-icon>
          <h2>Aucune commande pour le moment</h2>
          <p>Quand vous passez une commande, elle apparaît ici avec son paiement et son statut de livraison.</p>
          <a mat-raised-button routerLink="/">
            <mat-icon>search</mat-icon>
            Trouver un revendeur
          </a>
        </div>
      } @else {
        <div class="liste-commandes">
          @for (commande of commandes(); track commande.id) {
            <article class="commande-card">
              <div class="commande-entete">
                <div>
                  <span class="reference">Commande {{ referenceCourte(commande) }}</span>
                  <h2>{{ commande.revendeurNom }}</h2>
                </div>
                <span class="badge statut" [ngClass]="'statut-' + commande.statutCommande.toLowerCase()">
                  {{ labelStatutCommande(commande.statutCommande) }}
                </span>
              </div>

              <div class="commande-meta">
                <span><mat-icon>event</mat-icon>{{ commande.createdAt | date:'dd/MM/yyyy HH:mm' }}</span>
                <span><mat-icon>payments</mat-icon>{{ labelModePaiement(commande.modePaiement) }}</span>
              </div>

              <div class="commande-detail">
                <div>
                  <span class="label">Produit</span>
                  <strong>{{ commande.marque }} {{ commande.taille }} × {{ commande.quantite }}</strong>
                </div>
                <div>
                  <span class="label">Adresse</span>
                  <strong>{{ commande.clientAdresseLivraison }}</strong>
                </div>
              </div>

              <div class="commande-montants">
                <div>
                  <span>Total</span>
                  <strong>{{ commande.total | number:'1.0-0' }} FCFA</strong>
                </div>
                @if (commande.modePaiement === ModePaiement.ESPECES) {
                  <div>
                    <span>Acompte</span>
                    <strong>{{ acompteCommande(commande) | number:'1.0-0' }} FCFA</strong>
                  </div>
                  <div>
                    <span>Solde livraison</span>
                    <strong>{{ soldeCommande(commande) | number:'1.0-0' }} FCFA</strong>
                  </div>
                }
              </div>

              <div class="commande-pied">
                <span class="badge paiement" [ngClass]="'paiement-' + commande.statutPaiement.toLowerCase()">
                  {{ labelStatutPaiement(commande.statutPaiement) }}
                </span>

                @if (peutPayer(commande)) {
                  <button
                    mat-raised-button
                    type="button"
                    class="btn-payer"
                    (click)="payerCommande(commande)"
                    [disabled]="paiementEnCours() === commande.id"
                  >
                    @if (paiementEnCours() === commande.id) {
                      <mat-spinner diameter="18"></mat-spinner>
                    } @else {
                      <mat-icon>open_in_new</mat-icon>
                    }
                    {{ commande.modePaiement === ModePaiement.ESPECES ? "Payer l'acompte" : 'Payer la commande' }}
                  </button>
                }
              </div>
            </article>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .page-commandes {
      width: min(1080px, calc(100% - 32px));
      margin: 0 auto;
      padding: 32px 0 48px;
    }

    .entete-page {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 24px;

      h1 {
        margin: 0;
        color: var(--color-text);
        font-family: 'Montserrat', sans-serif;
        font-size: 1.8rem;
      }
    }

    .eyebrow {
      margin: 0 0 4px;
      color: var(--color-primary);
      font-size: 0.76rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .etat-centre,
    .etat-erreur,
    .etat-vide {
      min-height: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      text-align: center;
      color: var(--color-text-muted);
    }

    .etat-erreur {
      color: var(--color-danger);
    }

    .etat-vide {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 8px;
      padding: 32px 20px;

      mat-icon {
        font-size: 42px;
        width: 42px;
        height: 42px;
        color: var(--color-primary);
      }

      h2 {
        margin: 0;
        color: var(--color-text);
        font-size: 1.2rem;
      }

      p {
        max-width: 420px;
        margin: 0;
        line-height: 1.5;
      }
    }

    .liste-commandes {
      display: grid;
      gap: 14px;
    }

    .commande-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 8px;
      padding: 18px;
      box-shadow: 0 8px 24px rgba(44, 71, 112, 0.08);
    }

    .commande-entete,
    .commande-pied {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }

    .reference {
      color: var(--color-text-muted);
      font-size: 0.76rem;
      font-weight: 700;
      text-transform: uppercase;
    }

    h2 {
      margin: 2px 0 0;
      font-size: 1.12rem;
      color: var(--color-text);
    }

    .commande-meta {
      display: flex;
      gap: 18px;
      flex-wrap: wrap;
      margin: 12px 0;
      color: var(--color-text-muted);
      font-size: 0.84rem;

      span {
        display: inline-flex;
        align-items: center;
        gap: 5px;
      }

      mat-icon {
        font-size: 1rem;
        width: 1rem;
        height: 1rem;
      }
    }

    .commande-detail,
    .commande-montants {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
      padding: 14px 0;
      border-top: 1px solid var(--color-border);

      div {
        min-width: 0;
      }

      strong {
        display: block;
        color: var(--color-text);
        overflow-wrap: anywhere;
      }
    }

    .commande-montants {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .label,
    .commande-montants span {
      display: block;
      margin-bottom: 3px;
      color: var(--color-text-muted);
      font-size: 0.76rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      min-height: 24px;
      padding: 2px 9px;
      border-radius: 999px;
      font-size: 0.72rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .statut-en_attente,
    .paiement-en_attente {
      background: rgba(245, 158, 11, 0.14);
      color: #92400e;
    }

    .statut-confirmee,
    .paiement-acompte_paye {
      background: rgba(59, 130, 246, 0.12);
      color: #2563eb;
    }

    .statut-en_livraison {
      background: color-mix(in srgb, var(--color-primary) 14%, transparent);
      color: var(--color-primary);
    }

    .statut-livree,
    .paiement-paye {
      background: rgba(46, 125, 50, 0.12);
      color: #2e7d32;
    }

    .statut-annulee,
    .paiement-echoue {
      background: color-mix(in srgb, var(--color-danger) 12%, transparent);
      color: var(--color-danger);
    }

    .paiement-rembourse {
      background: rgba(139, 92, 246, 0.12);
      color: #7c3aed;
    }

    .btn-payer {
      background: var(--color-primary) !important;
      color: white !important;
      font-weight: 700 !important;

      mat-spinner {
        margin-right: 6px;
      }
    }

    @media (max-width: 720px) {
      .page-commandes {
        width: min(100% - 20px, 1080px);
        padding-top: 20px;
      }

      .entete-page {
        align-items: flex-start;
        flex-direction: column;
      }

      .commande-detail,
      .commande-montants {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class MesCommandesComponent implements OnInit {
  private readonly commandeService = inject(CommandeService);
  private readonly paiementService = inject(PaiementService);

  readonly ModePaiement = ModePaiement;

  readonly commandes = signal<Commande[]>([]);
  readonly chargement = signal(true);
  readonly erreur = signal<string | null>(null);
  readonly paiementEnCours = signal<string | null>(null);

  ngOnInit(): void {
    this.chargerCommandes();
  }

  chargerCommandes(): void {
    this.chargement.set(true);
    this.erreur.set(null);

    this.commandeService.getMesCommandes().subscribe({
      next: commandes => {
        this.commandes.set(commandes);
        this.chargement.set(false);
      },
      error: err => {
        this.erreur.set(err.message || 'Impossible de charger vos commandes.');
        this.chargement.set(false);
      }
    });
  }

  peutPayer(commande: Commande): boolean {
    return commande.statutPaiement === StatutPaiement.EN_ATTENTE
      && commande.statutCommande !== StatutCommande.ANNULEE;
  }

  payerCommande(commande: Commande): void {
    this.paiementEnCours.set(commande.id);
    this.erreur.set(null);

    this.paiementService.initierPaiement({
      type: TypeTransaction.COMMANDE,
      montant: this.montantAPayer(commande),
      description: this.descriptionPaiement(commande),
      clientTelephone: commande.clientTelephone,
      commandeId: commande.id
    }).subscribe({
      next: response => this.paiementService.redirectVersCheckout(response.checkoutUrl),
      error: err => {
        this.paiementEnCours.set(null);
        this.erreur.set(err.message || 'Impossible d’initier le paiement.');
      }
    });
  }

  acompteCommande(commande: Commande): number {
    return commande.acompteRequis && commande.acompteRequis > 0
      ? commande.acompteRequis
      : Math.ceil(commande.total * 0.25);
  }

  soldeCommande(commande: Commande): number {
    if (typeof commande.montantRestant === 'number' && commande.montantRestant > 0) {
      return commande.montantRestant;
    }
    return Math.max(0, commande.total - this.acompteCommande(commande));
  }

  referenceCourte(commande: Commande): string {
    return commande.id ? `#${commande.id.slice(-6).toUpperCase()}` : '';
  }

  labelModePaiement(mode: ModePaiement): string {
    return mode === ModePaiement.ESPECES ? 'Acompte + livraison' : 'FedaPay';
  }

  labelStatutPaiement(statut: StatutPaiement): string {
    return ({
      EN_ATTENTE: 'Paiement attendu',
      ACOMPTE_PAYE: 'Acompte payé',
      PAYE: 'Payé',
      ECHOUE: 'Échoué',
      REMBOURSE: 'Remboursé'
    } as Record<StatutPaiement, string>)[statut] ?? statut;
  }

  labelStatutCommande(statut: StatutCommande): string {
    return ({
      EN_ATTENTE: 'En attente',
      CONFIRMEE: 'Confirmée',
      EN_LIVRAISON: 'En livraison',
      LIVREE: 'Livrée',
      ANNULEE: 'Annulée'
    } as Record<StatutCommande, string>)[statut] ?? statut;
  }

  private montantAPayer(commande: Commande): number {
    if (commande.modePaiement === ModePaiement.ESPECES) {
      return this.acompteCommande(commande);
    }
    return Math.round(commande.total);
  }

  private descriptionPaiement(commande: Commande): string {
    const detail = `${commande.marque} ${commande.taille} × ${commande.quantite} — ${commande.revendeurNom}`;
    return commande.modePaiement === ModePaiement.ESPECES
      ? `Acompte 25% commande gaz ${detail}`
      : `Commande gaz ${detail}`;
  }
}
