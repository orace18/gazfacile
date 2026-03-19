import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Commande, CommandeDTO, StatutCommande } from '../models/revendeur.model';

/**
 * Service pour la gestion des commandes de gaz.
 */
@Injectable({ providedIn: 'root' })
export class CommandeService {
  private readonly apiUrl = `${environment.apiUrl}/commandes`;
  private readonly http = inject(HttpClient);

  /** Crée une nouvelle commande. */
  creer(dto: CommandeDTO): Observable<Commande> {
    return this.http.post<Commande>(this.apiUrl, dto).pipe(
      catchError(err => {
        const message = err.error?.message || 'Erreur lors de la création de la commande';
        return throwError(() => new Error(message));
      })
    );
  }

  /** Récupère les commandes d'un revendeur. */
  getByRevendeur(revendeurId: string): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.apiUrl}/revendeur/${revendeurId}`).pipe(
      catchError(err => {
        return throwError(() => new Error('Impossible de charger les commandes'));
      })
    );
  }

  /** Met à jour le statut d'une commande. */
  updateStatut(id: string, statut: StatutCommande): Observable<Commande> {
    return this.http.patch<Commande>(`${this.apiUrl}/${id}/statut`, { statutCommande: statut }).pipe(
      catchError(err => {
        return throwError(() => new Error('Erreur lors de la mise à jour du statut'));
      })
    );
  }
}
