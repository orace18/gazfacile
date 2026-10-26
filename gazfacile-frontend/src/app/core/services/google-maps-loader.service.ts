import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const CALLBACK = '__gazfacileMapsPret';

/**
 * Charge le SDK Google Maps à la demande (au lieu d'un <script> bloquant dans index.html).
 * Le script n'est injecté qu'une seule fois ; les appels suivants réutilisent la même promesse.
 */
@Injectable({ providedIn: 'root' })
export class GoogleMapsLoaderService {
  private chargement: Promise<void> | null = null;

  load(): Promise<void> {
    if (typeof google !== 'undefined' && google.maps?.Map) {
      return Promise.resolve();
    }

    if (!this.chargement) {
      this.chargement = new Promise<void>((resolve, reject) => {
        const w = window as unknown as Record<string, unknown>;
        w[CALLBACK] = () => {
          delete w[CALLBACK];
          resolve();
        };

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&callback=${CALLBACK}`;
        script.async = true;
        script.onerror = () => {
          // Permet une nouvelle tentative au prochain appel
          this.chargement = null;
          script.remove();
          reject(new Error('Impossible de charger Google Maps'));
        };
        document.head.appendChild(script);
      });
    }

    return this.chargement;
  }
}
