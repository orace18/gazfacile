import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Service de géolocalisation du navigateur.
 * Retourne la position de l'utilisateur sous forme d'Observable.
 */
@Injectable({ providedIn: 'root' })
export class GeolocationService {

  /**
   * Obtient la position géographique courante de l'utilisateur.
   * @returns Observable<GeolocationPosition> qui émet une fois puis se complète.
   */
  getCurrentPosition(): Observable<GeolocationPosition> {
    return new Observable<GeolocationPosition>(observer => {
      if (!navigator.geolocation) {
        observer.error('La géolocalisation n\'est pas supportée par ce navigateur');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        position => {
          observer.next(position);
          observer.complete();
        },
        error => {
          let message: string;
          switch (error.code) {
            case error.PERMISSION_DENIED:
              message = 'Accès à la géolocalisation refusé. Veuillez autoriser l\'accès dans les paramètres de votre navigateur.';
              break;
            case error.POSITION_UNAVAILABLE:
              message = 'Votre position géographique est indisponible.';
              break;
            case error.TIMEOUT:
              message = 'Délai de géolocalisation dépassé. Veuillez réessayer.';
              break;
            default:
              message = 'Impossible d\'obtenir votre position géographique.';
          }
          observer.error(message);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0
        }
      );
    });
  }
}
