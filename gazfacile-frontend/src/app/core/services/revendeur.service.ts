import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Revendeur,
  RevendeurDTO,
  StockUpdateDTO,
  StockBroadcast
} from '../models/revendeur.model';
import { WebSocketService } from './websocket.service';

/**
 * Service central pour la gestion des revendeurs.
 * Maintient un signal réactif de la liste mise à jour en temps réel via WebSocket.
 */
@Injectable({ providedIn: 'root' })
export class RevendeurService {
  private readonly apiUrl = `${environment.apiUrl}/revendeurs`;
  private readonly http = inject(HttpClient);
  private readonly wsService = inject(WebSocketService);

  /** Liste réactive des revendeurs affichés. */
  readonly revendeurs = signal<Revendeur[]>([]);

  /** Indicateur de chargement. */
  readonly chargement = signal<boolean>(false);

  /** Message d'erreur courant. */
  readonly erreur = signal<string | null>(null);

  constructor() {
    // S'abonner aux mises à jour de stock en temps réel
    this.wsService.subscribe<StockBroadcast>('/topic/stock').subscribe({
      next: mise_a_jour => {
        this.revendeurs.update(liste =>
          liste.map(r =>
            r.id === mise_a_jour.id
              ? { ...r, stockStatus: mise_a_jour.stockStatus }
              : r
          )
        );
      },
      error: err => console.warn('Erreur WebSocket stock:', err)
    });
  }

  /** Charge tous les revendeurs actifs depuis l'API. */
  loadAll(): void {
    this.chargement.set(true);
    this.erreur.set(null);

    this.http.get<Revendeur[]>(this.apiUrl).pipe(
      catchError(err => {
        this.erreur.set('Impossible de charger les revendeurs. Vérifiez votre connexion.');
        this.chargement.set(false);
        return throwError(() => err);
      })
    ).subscribe(revendeurs => {
      this.revendeurs.set(revendeurs);
      this.chargement.set(false);
    });
  }

  /**
   * Charge les revendeurs proches d'une position géographique.
   *
   * @param lat    latitude
   * @param lng    longitude
   * @param radius rayon en mètres (défaut : 5000)
   */
  getNearby(lat: number, lng: number, radius = 5000): void {
    this.chargement.set(true);
    this.erreur.set(null);

    const params = new HttpParams()
      .set('lat', lat.toString())
      .set('lng', lng.toString())
      .set('radius', radius.toString());

    this.http.get<Revendeur[]>(`${this.apiUrl}/nearby`, { params }).pipe(
      catchError(err => {
        this.erreur.set('Erreur lors de la recherche de proximité.');
        this.chargement.set(false);
        return throwError(() => err);
      })
    ).subscribe(revendeurs => {
      this.revendeurs.set(revendeurs);
      this.chargement.set(false);
    });
  }

  /**
   * Charge les revendeurs proches avec du stock disponible.
   *
   * @param lat    latitude
   * @param lng    longitude
   * @param radius rayon en mètres (défaut : 5000)
   */
  getNearbyWithStock(lat: number, lng: number, radius = 5000): void {
    this.chargement.set(true);
    this.erreur.set(null);

    const params = new HttpParams()
      .set('lat', lat.toString())
      .set('lng', lng.toString())
      .set('radius', radius.toString());

    this.http.get<Revendeur[]>(`${this.apiUrl}/nearby/stock`, { params }).pipe(
      catchError(err => {
        this.erreur.set('Erreur lors de la recherche de stock disponible.');
        this.chargement.set(false);
        return throwError(() => err);
      })
    ).subscribe(revendeurs => {
      this.revendeurs.set(revendeurs);
      this.chargement.set(false);
    });
  }

  /** Récupère un revendeur par son identifiant. */
  getById(id: string): Observable<Revendeur> {
    return this.http.get<Revendeur>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        return throwError(() => new Error('Revendeur introuvable'));
      })
    );
  }

  /** Inscrit un nouveau revendeur. */
  inscrire(dto: RevendeurDTO): Observable<Revendeur> {
    return this.http.post<Revendeur>(this.apiUrl, dto).pipe(
      tap(revendeur => {
        this.revendeurs.update(liste => [...liste, revendeur]);
      }),
      catchError(err => {
        const message = err.error?.message || 'Erreur lors de l\'inscription du revendeur';
        return throwError(() => new Error(message));
      })
    );
  }

  /** Met à jour le statut de stock d'un revendeur. */
  updateStock(id: string, dto: StockUpdateDTO): Observable<Revendeur> {
    return this.http.patch<Revendeur>(`${this.apiUrl}/${id}/stock`, dto).pipe(
      tap(revendeur => {
        this.revendeurs.update(liste =>
          liste.map(r => r.id === id ? revendeur : r)
        );
      }),
      catchError(err => {
        return throwError(() => new Error('Erreur lors de la mise à jour du stock'));
      })
    );
  }
}
