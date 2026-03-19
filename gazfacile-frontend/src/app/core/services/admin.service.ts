import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DashboardStats } from '../models/notification.model';

/**
 * Service du tableau de bord administrateur.
 */
@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly apiUrl = `${environment.apiUrl}/admin`;
  private readonly http = inject(HttpClient);

  /** Récupère les statistiques globales de la plateforme. */
  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/stats`).pipe(
      catchError(() => throwError(() => new Error('Impossible de charger les statistiques')))
    );
  }
}
