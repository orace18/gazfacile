import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  PaiementInitDTO,
  PaiementResponseDTO,
  PaiementStatutDTO,
  Transaction,
  TypeTransaction
} from '../models/revendeur.model';

/**
 * Service Angular pour les paiements via FedaPay.
 *
 * Flux :
 *  1. initierPaiement()   → obtenir l'URL checkout FedaPay
 *  2. Rediriger le client vers checkoutUrl (window.location.href)
 *  3. FedaPay redirige vers callback_url après paiement
 *  4. getTransaction()    → vérifier le statut final
 */
@Injectable({ providedIn: 'root' })
export class PaiementService {

  private readonly apiUrl = `${environment.apiUrl}/paiement`;
  private readonly http = inject(HttpClient);

  /**
   * Initie un paiement FedaPay.
   * Retourne l'URL de paiement à afficher au client.
   */
  initierPaiement(dto: PaiementInitDTO): Observable<PaiementResponseDTO> {
    return this.http.post<PaiementResponseDTO>(`${this.apiUrl}/initier`, dto).pipe(
      catchError(err => {
        const message = err.error?.message || 'Impossible d\'initier le paiement';
        return throwError(() => new Error(message));
      })
    );
  }

  /**
   * Redirige le client vers la page de paiement FedaPay.
   * Ouvre dans le même onglet pour permettre le retour.
   */
  redirectVersCheckout(checkoutUrl: string): void {
    window.location.href = checkoutUrl;
  }

  /**
   * Récupère le détail d'une transaction par sa référence.
   */
  getTransaction(reference: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/transaction/${reference}`).pipe(
      catchError(() => throwError(() => new Error('Transaction introuvable')))
    );
  }

  /**
   * Récupère un statut public minimal pour la page de confirmation FedaPay.
   */
  getStatutConfirmation(reference: string): Observable<PaiementStatutDTO> {
    return this.http.get<PaiementStatutDTO>(`${this.apiUrl}/confirmation/${reference}`).pipe(
      catchError(() => throwError(() => new Error('Transaction introuvable')))
    );
  }

  /**
   * Retourne l'historique complet des transactions (admin).
   */
  getHistorique(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/historique`).pipe(
      catchError(() => throwError(() => new Error('Impossible de charger l\'historique')))
    );
  }

  /** Libellé lisible du statut FedaPay. */
  getStatutLabel(statut: string): string {
    const labels: Record<string, string> = {
      PENDING:     'En attente',
      APPROVED:    'Payé',
      DECLINED:    'Refusé',
      CANCELLED:   'Annulé',
      REFUNDED:    'Remboursé',
      TRANSFERRED: 'Transféré'
    };
    return labels[statut] ?? statut;
  }

  /** Couleur CSS associée au statut. */
  getStatutColor(statut: string): string {
    const colors: Record<string, string> = {
      PENDING:     'var(--color-warning)',
      APPROVED:    'var(--color-success)',
      DECLINED:    'var(--color-danger)',
      CANCELLED:   'var(--color-text-muted)',
      REFUNDED:    'var(--color-primary)',
      TRANSFERRED: 'var(--color-success)'
    };
    return colors[statut] ?? 'var(--color-text-muted)';
  }
}
