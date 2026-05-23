import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Avis, AvisDTO } from '../models/notification.model';

/**
 * Service pour la soumission et la lecture des avis clients.
 */
@Injectable({ providedIn: 'root' })
export class AvisService {
  private readonly apiUrl = `${environment.apiUrl}/avis`;
  private readonly http = inject(HttpClient);

  /** Retourne les avis d'un revendeur. */
  getByRevendeur(revendeurId: string): Observable<Avis[]> {
    return this.http.get<Avis[]>(`${this.apiUrl}/revendeur/${revendeurId}`).pipe(
      catchError(() => throwError(() => new Error('Impossible de charger les avis')))
    );
  }

  /** Soumet un avis pour un revendeur. */
  soumettre(dto: AvisDTO): Observable<Avis> {
    return this.http.post<Avis>(this.apiUrl, dto).pipe(
      catchError(err => {
        const msg = err.error?.message || 'Erreur lors de la soumission de l\'avis';
        return throwError(() => new Error(msg));
      })
    );
  }
}
