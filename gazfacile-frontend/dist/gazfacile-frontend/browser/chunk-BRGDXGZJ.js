import {
  Role
} from "./chunk-NOBLHMTB.js";
import {
  computed,
  signal,
  ɵɵdefineInjectable
} from "./chunk-XDS62WGT.js";

// src/app/core/services/inscription-state.service.ts
var InscriptionStateService = class _InscriptionStateService {
  constructor() {
    this.role = signal(null);
    this.clientNeed = signal(null);
    this.selectedPlan = signal(null);
    this.resumeLabel = computed(() => {
      const r = this.role();
      const plan = this.selectedPlan();
      if (!r || !plan)
        return "";
      const profil = r === Role.CLIENT ? "Client" : "Revendeur";
      return `${profil} \u2014 ${plan.nom} \u2014 ${plan.prix.toLocaleString("fr-FR")}F/${plan.duree}`;
    });
  }
  setRole(role) {
    this.role.set(role);
    this.clientNeed.set(null);
    this.selectedPlan.set(null);
  }
  setClientNeed(need) {
    this.clientNeed.set(need);
    this.selectedPlan.set(null);
  }
  selectPlan(plan) {
    this.selectedPlan.set(plan);
  }
  reset() {
    this.role.set(null);
    this.clientNeed.set(null);
    this.selectedPlan.set(null);
  }
  static {
    this.\u0275fac = function InscriptionStateService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _InscriptionStateService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _InscriptionStateService, factory: _InscriptionStateService.\u0275fac, providedIn: "root" });
  }
};

export {
  InscriptionStateService
};
//# sourceMappingURL=chunk-BRGDXGZJ.js.map
