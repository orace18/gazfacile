import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  PaiementResponseDTO,
  SubscriptionDTO,
  SubscriptionPlanDTO
} from '../models/revendeur.model';

@Injectable({ providedIn: 'root' })
export class SubscriptionService {

  private readonly http = inject(HttpClient);
  private readonly plansUrl = `${environment.apiUrl}/plans`;
  private readonly subscriptionsUrl = `${environment.apiUrl}/subscriptions`;

  /** Liste les plans actifs, filtrable par type (REVENDEUR, CLIENT_CONSULT, CLIENT_LIVRAISON). */
  getPlans(type?: string): Observable<SubscriptionPlanDTO[]> {
    let params = new HttpParams();
    if (type) params = params.set('type', type);
    return this.http.get<SubscriptionPlanDTO[]>(this.plansUrl, { params }).pipe(
      catchError(() => throwError(() => new Error('Impossible de charger les plans')))
    );
  }

  /** Retourne la subscription active du user connecté. */
  getCurrent(): Observable<SubscriptionDTO> {
    return this.http.get<SubscriptionDTO>(`${this.subscriptionsUrl}/current`).pipe(
      catchError(() => throwError(() => new Error('Impossible de charger la subscription')))
    );
  }

  /** Souscrit à un plan. Retourne le PaiementResponseDTO avec l'URL checkout FedaPay. */
  subscribe(planCode: string, telephonePaiement?: string): Observable<PaiementResponseDTO> {
    return this.http.post<PaiementResponseDTO>(`${this.subscriptionsUrl}/subscribe`, { planCode, telephonePaiement }).pipe(
      catchError(err => {
        const message = err.error?.message || 'Impossible d\'initier l\'abonnement';
        return throwError(() => new Error(message));
      })
    );
  }
}
