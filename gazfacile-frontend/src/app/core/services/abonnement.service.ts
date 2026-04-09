import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Abonnement,
  AbonnementStatut,
  PaiementResponseDTO
} from '../models/revendeur.model';

@Injectable({ providedIn: 'root' })
export class AbonnementService {

  private readonly apiUrl = `${environment.apiUrl}/abonnement`;
  private readonly http = inject(HttpClient);

  /** Statut d'abonnement du revendeur connecté. */
  getStatut(): Observable<AbonnementStatut> {
    return this.http.get<AbonnementStatut>(`${this.apiUrl}/statut`).pipe(
      catchError(() => throwError(() => new Error('Impossible de charger le statut d\'abonnement')))
    );
  }

  /**
   * Initie le paiement FedaPay pour souscrire à un plan.
   * Retourne l'URL de checkout FedaPay.
   */
  souscrire(plan: Abonnement): Observable<PaiementResponseDTO> {
    return this.http.post<PaiementResponseDTO>(`${this.apiUrl}/souscrire`, { plan }).pipe(
      catchError(err => {
        const message = err.error?.message || 'Impossible d\'initier le paiement d\'abonnement';
        return throwError(() => new Error(message));
      })
    );
  }
}
