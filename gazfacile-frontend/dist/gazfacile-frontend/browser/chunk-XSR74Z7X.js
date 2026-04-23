import {
  WebSocketService
} from "./chunk-COK4LN6Q.js";
import {
  environment
} from "./chunk-AH3PCQNR.js";
import {
  HttpClient,
  HttpParams,
  __spreadProps,
  __spreadValues,
  catchError,
  inject,
  signal,
  tap,
  throwError,
  ɵɵdefineInjectable
} from "./chunk-XDS62WGT.js";

// src/app/core/services/revendeur.service.ts
var RevendeurService = class _RevendeurService {
  constructor() {
    this.apiUrl = `${environment.apiUrl}/revendeurs`;
    this.http = inject(HttpClient);
    this.wsService = inject(WebSocketService);
    this.revendeurs = signal([]);
    this.chargement = signal(false);
    this.erreur = signal(null);
    this.wsService.subscribe("/topic/stock").subscribe({
      next: (mise_a_jour) => {
        this.revendeurs.update((liste) => liste.map((r) => r.id === mise_a_jour.id ? __spreadProps(__spreadValues({}, r), { stockStatus: mise_a_jour.stockStatus }) : r));
      },
      error: (err) => console.warn("Erreur WebSocket stock:", err)
    });
  }
  /** Charge tous les revendeurs actifs depuis l'API. */
  loadAll() {
    this.chargement.set(true);
    this.erreur.set(null);
    this.http.get(this.apiUrl).pipe(catchError((err) => {
      this.erreur.set("Impossible de charger les revendeurs. V\xE9rifiez votre connexion.");
      this.chargement.set(false);
      return throwError(() => err);
    })).subscribe((revendeurs) => {
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
  getNearby(lat, lng, radius = 5e3) {
    this.chargement.set(true);
    this.erreur.set(null);
    const params = new HttpParams().set("lat", lat.toString()).set("lng", lng.toString()).set("radius", radius.toString());
    this.http.get(`${this.apiUrl}/nearby`, { params }).pipe(catchError((err) => {
      this.erreur.set("Erreur lors de la recherche de proximit\xE9.");
      this.chargement.set(false);
      return throwError(() => err);
    })).subscribe((revendeurs) => {
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
  getNearbyWithStock(lat, lng, radius = 5e3) {
    this.chargement.set(true);
    this.erreur.set(null);
    const params = new HttpParams().set("lat", lat.toString()).set("lng", lng.toString()).set("radius", radius.toString());
    this.http.get(`${this.apiUrl}/nearby/stock`, { params }).pipe(catchError((err) => {
      this.erreur.set("Erreur lors de la recherche de stock disponible.");
      this.chargement.set(false);
      return throwError(() => err);
    })).subscribe((revendeurs) => {
      this.revendeurs.set(revendeurs);
      this.chargement.set(false);
    });
  }
  /** Récupère un revendeur par son identifiant. */
  getById(id) {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(catchError(() => throwError(() => new Error("Revendeur introuvable"))));
  }
  /** Récupère le dépôt associé à l'utilisateur connecté. */
  getRevendeurByUserId() {
    return this.http.get(`${this.apiUrl}/mon-depot`).pipe(catchError(() => throwError(() => new Error("Aucun d\xE9p\xF4t trouv\xE9 pour ce compte"))));
  }
  /** Inscrit un nouveau revendeur. */
  inscrire(dto) {
    return this.http.post(this.apiUrl, dto).pipe(tap((revendeur) => {
      this.revendeurs.update((liste) => [...liste, revendeur]);
    }), catchError((err) => {
      const message = err.error?.message || "Erreur lors de l'inscription du revendeur";
      return throwError(() => new Error(message));
    }));
  }
  /** Met à jour le statut de stock d'un revendeur. */
  updateStock(id, dto) {
    return this.http.patch(`${this.apiUrl}/${id}/stock`, dto).pipe(tap((revendeur) => {
      this.revendeurs.update((liste) => liste.map((r) => r.id === id ? revendeur : r));
    }), catchError((err) => {
      return throwError(() => new Error("Erreur lors de la mise \xE0 jour du stock"));
    }));
  }
  // ── Catalogue produits ─────────────────────────────────────────────────────
  /** Récupère le catalogue complet d'un revendeur. */
  getCatalogue(revendeurId) {
    return this.http.get(`${this.apiUrl}/${revendeurId}/produits`).pipe(catchError(() => throwError(() => new Error("Impossible de charger le catalogue"))));
  }
  /** Ajoute un produit au catalogue. */
  ajouterProduit(revendeurId, dto) {
    return this.http.post(`${this.apiUrl}/${revendeurId}/produits`, dto).pipe(catchError((err) => {
      const message = err.error?.message || "Erreur lors de l'ajout du produit";
      return throwError(() => new Error(message));
    }));
  }
  /** Modifie un produit existant. */
  modifierProduit(revendeurId, produitId, dto) {
    return this.http.put(`${this.apiUrl}/${revendeurId}/produits/${produitId}`, dto).pipe(catchError((err) => {
      const message = err.error?.message || "Erreur lors de la modification du produit";
      return throwError(() => new Error(message));
    }));
  }
  /** Supprime un produit du catalogue. */
  supprimerProduit(revendeurId, produitId) {
    return this.http.delete(`${this.apiUrl}/${revendeurId}/produits/${produitId}`).pipe(catchError(() => throwError(() => new Error("Erreur lors de la suppression du produit"))));
  }
  static {
    this.\u0275fac = function RevendeurService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _RevendeurService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RevendeurService, factory: _RevendeurService.\u0275fac, providedIn: "root" });
  }
};

export {
  RevendeurService
};
//# sourceMappingURL=chunk-XSR74Z7X.js.map
