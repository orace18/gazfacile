import {
  environment
} from "./chunk-AH3PCQNR.js";
import {
  HttpClient,
  catchError,
  inject,
  throwError,
  ɵɵdefineInjectable
} from "./chunk-XDS62WGT.js";

// src/app/core/services/paiement.service.ts
var PaiementService = class _PaiementService {
  constructor() {
    this.apiUrl = `${environment.apiUrl}/paiement`;
    this.http = inject(HttpClient);
  }
  /**
   * Initie un paiement FedaPay.
   * Retourne l'URL de paiement à afficher au client.
   */
  initierPaiement(dto) {
    return this.http.post(`${this.apiUrl}/initier`, dto).pipe(catchError((err) => {
      const message = err.error?.message || "Impossible d'initier le paiement";
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Redirige le client vers la page de paiement FedaPay.
   * Ouvre dans le même onglet pour permettre le retour.
   */
  redirectVersCheckout(checkoutUrl) {
    window.location.href = checkoutUrl;
  }
  /**
   * Récupère le détail d'une transaction par sa référence.
   */
  getTransaction(reference) {
    return this.http.get(`${this.apiUrl}/transaction/${reference}`).pipe(catchError(() => throwError(() => new Error("Transaction introuvable"))));
  }
  /**
   * Retourne l'historique complet des transactions (admin).
   */
  getHistorique() {
    return this.http.get(`${this.apiUrl}/historique`).pipe(catchError(() => throwError(() => new Error("Impossible de charger l'historique"))));
  }
  /** Libellé lisible du statut FedaPay. */
  getStatutLabel(statut) {
    const labels = {
      PENDING: "En attente",
      APPROVED: "Pay\xE9",
      DECLINED: "Refus\xE9",
      CANCELLED: "Annul\xE9",
      REFUNDED: "Rembours\xE9",
      TRANSFERRED: "Transf\xE9r\xE9"
    };
    return labels[statut] ?? statut;
  }
  /** Couleur CSS associée au statut. */
  getStatutColor(statut) {
    const colors = {
      PENDING: "var(--color-warning)",
      APPROVED: "var(--color-success)",
      DECLINED: "var(--color-danger)",
      CANCELLED: "var(--color-text-muted)",
      REFUNDED: "var(--color-primary)",
      TRANSFERRED: "var(--color-success)"
    };
    return colors[statut] ?? "var(--color-text-muted)";
  }
  static {
    this.\u0275fac = function PaiementService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PaiementService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PaiementService, factory: _PaiementService.\u0275fac, providedIn: "root" });
  }
};

export {
  PaiementService
};
//# sourceMappingURL=chunk-QHRSHWYM.js.map
