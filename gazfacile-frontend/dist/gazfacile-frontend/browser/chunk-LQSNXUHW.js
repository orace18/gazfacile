import {
  environment
} from "./chunk-AH3PCQNR.js";
import {
  HttpClient,
  HttpParams,
  catchError,
  inject,
  throwError,
  ɵɵdefineInjectable
} from "./chunk-XDS62WGT.js";

// src/app/core/services/subscription.service.ts
var SubscriptionService = class _SubscriptionService {
  constructor() {
    this.http = inject(HttpClient);
    this.plansUrl = `${environment.apiUrl}/plans`;
    this.subscriptionsUrl = `${environment.apiUrl}/subscriptions`;
  }
  /** Liste les plans actifs, filtrable par type (REVENDEUR, CLIENT_CONSULT, CLIENT_LIVRAISON). */
  getPlans(type) {
    let params = new HttpParams();
    if (type)
      params = params.set("type", type);
    return this.http.get(this.plansUrl, { params }).pipe(catchError(() => throwError(() => new Error("Impossible de charger les plans"))));
  }
  /** Retourne la subscription active du user connecté. */
  getCurrent() {
    return this.http.get(`${this.subscriptionsUrl}/current`).pipe(catchError(() => throwError(() => new Error("Impossible de charger la subscription"))));
  }
  /** Souscrit à un plan. Retourne le PaiementResponseDTO avec l'URL checkout FedaPay. */
  subscribe(planCode, telephonePaiement) {
    return this.http.post(`${this.subscriptionsUrl}/subscribe`, { planCode, telephonePaiement }).pipe(catchError((err) => {
      const message = err.error?.message || "Impossible d'initier l'abonnement";
      return throwError(() => new Error(message));
    }));
  }
  static {
    this.\u0275fac = function SubscriptionService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SubscriptionService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SubscriptionService, factory: _SubscriptionService.\u0275fac, providedIn: "root" });
  }
};

export {
  SubscriptionService
};
//# sourceMappingURL=chunk-LQSNXUHW.js.map
