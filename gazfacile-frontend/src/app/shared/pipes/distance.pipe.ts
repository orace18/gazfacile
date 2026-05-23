import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe qui formate une distance en mètres en chaîne lisible.
 * Exemples : 850 → "850 m" | 1500 → "1.5 km"
 */
@Pipe({ name: 'distance', standalone: true })
export class DistancePipe implements PipeTransform {
  transform(metres: number | undefined | null): string {
    if (metres === undefined || metres === null) {
      return '';
    }
    if (metres < 1000) {
      return `${Math.round(metres)} m`;
    }
    return `${(metres / 1000).toFixed(1)} km`;
  }
}
