import { Injectable, effect, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Notification } from '../models/notification.model';
import { WebSocketService } from './websocket.service';
import { AuthService } from './auth.service';

/**
 * Service de gestion des notifications in-app.
 * S'abonne automatiquement au canal WebSocket personnel de l'utilisateur
 * et maintient un signal réactif du nombre de non-lues.
 */
@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly apiUrl = `${environment.apiUrl}/notifications`;
  private readonly http = inject(HttpClient);
  private readonly wsService = inject(WebSocketService);
  private readonly authService = inject(AuthService);

  /** Liste des notifications en mémoire. */
  readonly notifications = signal<Notification[]>([]);

  /** Nombre de notifications non lues (pour le badge). */
  readonly nbNonLues = signal<number>(0);

  private abonnementTempsReel?: Subscription;

  constructor() {
    effect(() => {
      const user = this.authService.currentUser();
      this.abonnementTempsReel?.unsubscribe();
      this.abonnementTempsReel = undefined;

      if (!user) {
        this.notifications.set([]);
        this.nbNonLues.set(0);
        return;
      }

      this.abonnementTempsReel = this.wsService
        .subscribe<Notification>('/user/queue/notifications')
        .subscribe({
          next: notif => {
            this.notifications.update(liste => [notif, ...liste]);
            this.nbNonLues.update(n => n + 1);
          },
          error: err => console.warn('Erreur WebSocket notifications:', err)
        });

      this.charger();
    });
  }

  /** Charge les notifications depuis l'API. */
  charger(): void {
    this.http.get<Notification[]>(this.apiUrl).pipe(
      catchError(() => throwError(() => new Error('Impossible de charger les notifications')))
    ).subscribe(notifs => {
      this.notifications.set(notifs);
      this.nbNonLues.set(notifs.filter(n => !n.lue).length);
    });
  }

  /** Marque une notification comme lue. */
  marquerLue(id: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/lue`, {}).pipe(
      catchError(() => throwError(() => new Error('Erreur lors de la mise à jour')))
    );
  }

  /** Marque toutes les notifications comme lues. */
  marquerToutesLues(): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/tout-lire`, {}).pipe(
      catchError(() => throwError(() => new Error('Erreur')))
    );
  }

  /** Met à jour le signal local après marquage lu. */
  marquerLueLocalement(id: string): void {
    this.notifications.update(liste =>
      liste.map(n => n.id === id ? { ...n, lue: true } : n)
    );
    this.nbNonLues.update(n => Math.max(0, n - 1));
  }

  /** Vide le badge localement (toutes lues). */
  toutMarquerLuLocalement(): void {
    this.notifications.update(liste => liste.map(n => ({ ...n, lue: true })));
    this.nbNonLues.set(0);
  }
}
