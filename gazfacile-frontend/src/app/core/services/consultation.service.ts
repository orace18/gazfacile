import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConsultationStatut } from '../models/revendeur.model';
import { AuthService } from './auth.service';

const FINGERPRINT_KEY = 'gf_fp';
const QUOTA_CACHE_KEY = 'gf_quota';
const LIMITE = 3;

/**
 * Service de gestion du quota freemium pour les visiteurs anonymes.
 *
 * Flux :
 *  1. Génère un UUID fingerprint stocké en localStorage (persistant)
 *  2. Avant chaque consultation, vérifie le quota côté backend
 *  3. Le backend croise fingerprint + IP pour détecter les contournements
 *  4. Les utilisateurs connectés sont toujours autorisés (bypass complet)
 */
@Injectable({ providedIn: 'root' })
export class ConsultationService {

  private readonly apiUrl = `${environment.apiUrl}/consultations`;
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  /** Statut réactif — mis à jour après chaque consultation. */
  readonly statut = signal<ConsultationStatut>({
    autorise: true,
    consultationsRestantes: LIMITE,
    limite: LIMITE
  });

  constructor() {
    // Charger le statut depuis le cache local immédiatement (évite le flash)
    const cached = localStorage.getItem(QUOTA_CACHE_KEY);
    if (cached) {
      try { this.statut.set(JSON.parse(cached)); } catch { /* ignore */ }
    }
  }

  /** Retourne le fingerprint, en en créant un si nécessaire. */
  getFingerprint(): string {
    let fp = localStorage.getItem(FINGERPRINT_KEY);
    if (!fp) {
      fp = crypto.randomUUID();
      localStorage.setItem(FINGERPRINT_KEY, fp);
    }
    return fp;
  }

  /**
   * Enregistre une consultation et met à jour le quota.
   * Retourne `true` si autorisé, `false` si quota épuisé.
   * Les utilisateurs connectés sont toujours autorisés sans appel réseau.
   */
  consulter(): Observable<ConsultationStatut> {
    if (this.authService.estConnecte()) {
      const libre: ConsultationStatut = { autorise: true, consultationsRestantes: LIMITE, limite: LIMITE };
      return of(libre);
    }

    const fp = this.getFingerprint();
    return this.http.post<ConsultationStatut>(
      `${this.apiUrl}/consulter`,
      null,
      { params: { fingerprint: fp } }
    ).pipe(
      tap(s => this.mettreAJourCache(s)),
      catchError(() => {
        // En cas d'erreur réseau, autoriser (fail-open) mais décrémenter le cache local
        const actuel = this.statut();
        const fallback: ConsultationStatut = {
          autorise: actuel.consultationsRestantes > 0,
          consultationsRestantes: Math.max(0, actuel.consultationsRestantes - 1),
          limite: LIMITE
        };
        this.mettreAJourCache(fallback);
        return of(fallback);
      })
    );
  }

  /**
   * Charge le statut depuis le backend sans incrémenter.
   * Appelé au démarrage pour synchroniser le compteur.
   */
  chargerStatut(): void {
    if (this.authService.estConnecte()) return;

    const fp = this.getFingerprint();
    this.http.get<ConsultationStatut>(
      `${this.apiUrl}/statut`,
      { params: { fingerprint: fp } }
    ).pipe(
      catchError(() => of(null))
    ).subscribe(s => {
      if (s) this.mettreAJourCache(s);
    });
  }

  private mettreAJourCache(s: ConsultationStatut): void {
    this.statut.set(s);
    localStorage.setItem(QUOTA_CACHE_KEY, JSON.stringify(s));
  }
}
