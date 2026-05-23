import { Injectable, OnDestroy } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

/**
 * Service WebSocket utilisant STOMP over SockJS.
 * Gère la connexion et permet de s'abonner aux topics temps réel.
 */
@Injectable({ providedIn: 'root' })
export class WebSocketService implements OnDestroy {
  private readonly client: Client;
  private readonly connecte$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS(environment.wsUrl) as WebSocket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('GazFacile WebSocket connecté');
        this.connecte$.next(true);
      },
      onDisconnect: () => {
        console.log('GazFacile WebSocket déconnecté');
        this.connecte$.next(false);
      },
      onStompError: frame => {
        console.error('Erreur STOMP:', frame.headers['message']);
      }
    });

    this.client.activate();
  }

  /**
   * S'abonne à un topic STOMP et retourne les messages comme Observable.
   * Attend automatiquement la connexion si elle n'est pas encore établie.
   *
   * @param destination chemin du topic (ex: /topic/stock)
   */
  subscribe<T>(destination: string): Observable<T> {
    return new Observable<T>(observer => {
      let stompSubscription: { unsubscribe: () => void } | null = null;

      const effectuerAbonnement = () => {
        stompSubscription = this.client.subscribe(destination, (message: IMessage) => {
          try {
            observer.next(JSON.parse(message.body) as T);
          } catch (e) {
            observer.error(new Error('Erreur de parsing du message WebSocket'));
          }
        });
      };

      if (this.connecte$.value) {
        effectuerAbonnement();
      } else {
        // Attendre la connexion avant de s'abonner
        const sub = this.connecte$.pipe(
          filter(connecte => connecte),
          take(1)
        ).subscribe(() => effectuerAbonnement());

        return () => {
          sub.unsubscribe();
          stompSubscription?.unsubscribe();
        };
      }

      return () => stompSubscription?.unsubscribe();
    });
  }

  ngOnDestroy(): void {
    this.client.deactivate();
  }
}
