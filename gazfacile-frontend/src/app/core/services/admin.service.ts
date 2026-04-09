import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DashboardStats } from '../models/notification.model';
import { Revendeur, Abonnement, Transaction } from '../models/revendeur.model';

export interface AdminUser {
  id: string;
  telephone: string;
  nom: string;
  email?: string;
  roles: string[];
  actif: boolean;
  telephoneVerifie?: boolean;
  googleId?: string;
  createdAt: string;
}

export interface AdminCommande {
  id: string;
  revendeurId: string;
  revendeurNom: string;
  clientTelephone: string;
  clientAdresseLivraison: string;
  marque: string;
  taille: string;
  quantite: number;
  prixUnitaire: number;
  total: number;
  modePaiement: string;
  statutPaiement: string;
  statutCommande: string;
  referenceTransaction?: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly apiUrl = `${environment.apiUrl}/admin`;
  private readonly http = inject(HttpClient);

  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/stats`).pipe(
      catchError(() => throwError(() => new Error('Impossible de charger les statistiques')))
    );
  }

  getRevendeurs(): Observable<Revendeur[]> {
    return this.http.get<Revendeur[]>(`${this.apiUrl}/revendeurs`);
  }

  toggleActifRevendeur(id: string): Observable<Revendeur> {
    return this.http.patch<Revendeur>(`${this.apiUrl}/revendeurs/${id}/toggle-actif`, {});
  }

  setAbonnementRevendeur(id: string, plan: Abonnement, jours = 30): Observable<Revendeur> {
    return this.http.patch<Revendeur>(`${this.apiUrl}/revendeurs/${id}/abonnement`, { plan, jours: String(jours) });
  }

  getUtilisateurs(): Observable<AdminUser[]> {
    return this.http.get<AdminUser[]>(`${this.apiUrl}/utilisateurs`);
  }

  toggleActifUtilisateur(id: string): Observable<{ actif: boolean }> {
    return this.http.patch<{ actif: boolean }>(`${this.apiUrl}/utilisateurs/${id}/toggle-actif`, {});
  }

  getCommandes(): Observable<AdminCommande[]> {
    return this.http.get<AdminCommande[]>(`${this.apiUrl}/commandes`);
  }

  updateStatutCommande(id: string, statut: string): Observable<AdminCommande> {
    return this.http.patch<AdminCommande>(`${this.apiUrl}/commandes/${id}/statut`, { statut });
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions`);
  }
}
