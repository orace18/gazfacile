import {
  SubscriptionService
} from "./chunk-LQSNXUHW.js";
import {
  PaiementService
} from "./chunk-QHRSHWYM.js";
import {
  AuthService
} from "./chunk-EVRMIEST.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-QXKXMS5C.js";
import "./chunk-AH3PCQNR.js";
import {
  MatButton,
  MatButtonModule
} from "./chunk-UZFV4MWN.js";
import {
  InscriptionStateService
} from "./chunk-BRGDXGZJ.js";
import {
  ClientNeed
} from "./chunk-NOBLHMTB.js";
import {
  Router,
  RouterLink
} from "./chunk-C43TOPVJ.js";
import {
  CommonModule,
  DecimalPipe,
  MatIcon,
  MatIconModule,
  computed,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-XDS62WGT.js";

// src/app/features/auth/client-plan/client-plan.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function ClientPlanComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "mat-spinner", 12);
    \u0275\u0275elementEnd();
  }
}
function ClientPlanComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "mat-icon");
    \u0275\u0275text(2, "error_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.erreur(), " ");
  }
}
function ClientPlanComponent_Conditional_10_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1, "Recommand\xE9");
    \u0275\u0275elementEnd();
  }
}
function ClientPlanComponent_Conditional_10_For_2_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "mat-icon", 27);
    \u0275\u0275text(2, "check");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r3 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", f_r3, " ");
  }
}
function ClientPlanComponent_Conditional_10_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275template(1, ClientPlanComponent_Conditional_10_For_2_Conditional_1_Template, 2, 0, "div", 15);
    \u0275\u0275elementStart(2, "div", 16)(3, "mat-icon", 17);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h2", 18);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 19);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 20);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 21)(12, "span", 22);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 23);
    \u0275\u0275text(16, " FCFA");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "ul", 24);
    \u0275\u0275repeaterCreate(18, ClientPlanComponent_Conditional_10_For_2_For_19_Template, 4, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 25)(21, "button", 26);
    \u0275\u0275listener("click", function ClientPlanComponent_Conditional_10_For_2_Template_button_click_21_listener() {
      const plan_r4 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.choisirPlan(plan_r4));
    });
    \u0275\u0275text(22, " Choisir ce plan ");
    \u0275\u0275elementStart(23, "mat-icon");
    \u0275\u0275text(24, "arrow_forward");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const plan_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("plan-recommande", plan_r4.recommande);
    \u0275\u0275advance();
    \u0275\u0275conditional(plan_r4.recommande ? 1 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.iconePlan(plan_r4));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(plan_r4.nom);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(plan_r4.duree);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(plan_r4.quotaLabel);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(14, 10, plan_r4.prix, "1.0-0"));
    \u0275\u0275advance(5);
    \u0275\u0275repeater(plan_r4.features);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("btn-recommande", plan_r4.recommande);
  }
}
function ClientPlanComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275repeaterCreate(1, ClientPlanComponent_Conditional_10_For_2_Template, 25, 13, "div", 13, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.plans());
  }
}
var ClientPlanComponent = class _ClientPlanComponent {
  constructor() {
    this.state = inject(InscriptionStateService);
    this.subscriptionService = inject(SubscriptionService);
    this.authService = inject(AuthService);
    this.paiementService = inject(PaiementService);
    this.router = inject(Router);
    this.plans = signal([]);
    this.chargement = signal(true);
    this.erreur = signal(null);
    this.titre = computed(() => {
      return this.state.clientNeed() === ClientNeed.LIVRAISON ? "Plans Livraison" : "Plans Consultation";
    });
    this.sousTitre = computed(() => {
      return this.state.clientNeed() === ClientNeed.LIVRAISON ? "Choisissez votre formule de livraison mensuelle" : "Choisissez votre formule de consultation mensuelle";
    });
  }
  ngOnInit() {
    const besoin = this.state.clientNeed() ?? ClientNeed.CONSULT;
    const type = besoin === ClientNeed.LIVRAISON ? "CLIENT_LIVRAISON" : "CLIENT_CONSULT";
    this.subscriptionService.getPlans(type).subscribe({
      next: (dtos) => {
        this.plans.set(dtos.map((d) => this.toPlanInscription(d)));
        this.chargement.set(false);
      },
      error: () => {
        this.erreur.set("Impossible de charger les formules. Veuillez r\xE9essayer.");
        this.chargement.set(false);
      }
    });
  }
  iconePlan(plan) {
    const id = plan.id.toUpperCase();
    if (id.includes("DIAMOND"))
      return "diamond";
    if (id.includes("GOLD"))
      return "star";
    return "verified";
  }
  choisirPlan(plan) {
    if (this.authService.estConnecte()) {
      this.chargement.set(true);
      const telephone = this.authService.currentUser()?.telephone ?? "";
      this.subscriptionService.subscribe(plan.id, telephone).subscribe({
        next: (response) => this.paiementService.redirectVersCheckout(response.checkoutUrl),
        error: (err) => {
          this.chargement.set(false);
          this.erreur.set(err.message || "Impossible d'initier le renouvellement.");
        }
      });
    } else {
      this.state.selectPlan(plan);
      this.router.navigate(["/auth/register/form"]);
    }
  }
  toPlanInscription(dto) {
    const quotaLabel = dto.quota > 0 ? `${dto.quota} ${dto.type === "CLIENT_LIVRAISON" ? "livraisons" : "consultations"}/mois` : "";
    return {
      id: dto.code,
      nom: dto.nom,
      type: dto.type,
      prix: dto.prix,
      duree: this.formatDuree(dto.dureeJours),
      quota: dto.quota,
      quotaLabel,
      features: dto.features,
      recommande: dto.recommande
    };
  }
  formatDuree(jours) {
    if (jours >= 365)
      return `${Math.round(jours / 365)} an${jours >= 730 ? "s" : ""}`;
    if (jours >= 30)
      return `${Math.round(jours / 30)} mois`;
    return `${jours} jour${jours > 1 ? "s" : ""}`;
  }
  static {
    this.\u0275fac = function ClientPlanComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ClientPlanComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ClientPlanComponent, selectors: [["app-client-plan"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 20, vars: 3, consts: [[1, "page-plans"], [1, "conteneur"], [1, "entete"], ["src", "assets/logo-white.svg", "alt", "GazFacile", 1, "logo"], [1, "sous-titre"], [1, "chargement"], [1, "erreur-msg"], [1, "grille-plans"], [1, "navigation-bas"], ["mat-button", "", "routerLink", "/auth/register/client", 1, "btn-retour"], [1, "lien-connexion"], ["routerLink", "/auth/login"], ["diameter", "40"], [1, "carte-plan", 3, "plan-recommande"], [1, "carte-plan"], [1, "badge-recommande"], [1, "plan-entete"], [1, "plan-icone"], [1, "plan-nom"], [1, "plan-duree"], [1, "plan-quota"], [1, "plan-prix"], [1, "prix-valeur"], [1, "prix-unite"], [1, "liste-features"], [1, "plan-action"], [1, "btn-choisir", 3, "click"], [1, "icone-check"]], template: function ClientPlanComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
        \u0275\u0275element(3, "img", 3);
        \u0275\u0275elementStart(4, "h1");
        \u0275\u0275text(5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p", 4);
        \u0275\u0275text(7);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(8, ClientPlanComponent_Conditional_8_Template, 2, 0, "div", 5)(9, ClientPlanComponent_Conditional_9_Template, 4, 1, "div", 6)(10, ClientPlanComponent_Conditional_10_Template, 3, 0, "div", 7);
        \u0275\u0275elementStart(11, "div", 8)(12, "button", 9)(13, "mat-icon");
        \u0275\u0275text(14, "arrow_back");
        \u0275\u0275elementEnd();
        \u0275\u0275text(15, " Retour ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "p", 10);
        \u0275\u0275text(17, " D\xE9j\xE0 un compte ? ");
        \u0275\u0275elementStart(18, "a", 11);
        \u0275\u0275text(19, "Se connecter");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.titre());
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.sousTitre());
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.chargement() ? 8 : ctx.erreur() ? 9 : 10);
      }
    }, dependencies: [CommonModule, DecimalPipe, RouterLink, MatIconModule, MatIcon, MatButtonModule, MatButton, MatProgressSpinnerModule, MatProgressSpinner], styles: ['\n\n.page-plans[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 64px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 32px 16px;\n  background-color: var(--color-primary);\n  background-image:\n    linear-gradient(\n      160deg,\n      var(--color-primary) 60%,\n      var(--color-primary-dark) 100%);\n}\n.conteneur[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 900px;\n}\n.entete[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 36px;\n  .logo {\n    height: 56px;\n    width: auto;\n    display: block;\n    margin: 0 auto 14px;\n  }\n  h1 {\n    font-family: "Montserrat", sans-serif;\n    font-size: 1.5rem;\n    font-weight: 700;\n    color: white;\n    margin: 0 0 6px;\n  }\n  .sous-titre {\n    color: rgba(255, 255, 255, 0.8);\n    font-size: 0.92rem;\n    margin: 0;\n  }\n}\n.chargement[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 60px 0;\n}\n.erreur-msg[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 16px;\n  background: rgba(255, 255, 255, 0.15);\n  color: white;\n  border-radius: 4px;\n  margin-bottom: 24px;\n}\n.grille-plans[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n  margin-bottom: 24px;\n}\n.carte-plan[_ngcontent-%COMP%] {\n  position: relative;\n  background: var(--color-surface);\n  border: 2px solid var(--color-border, #e0e0e0);\n  border-radius: var(--radius-lg, 16px);\n  padding: 28px 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  transition:\n    border-color 0.2s,\n    box-shadow 0.2s,\n    transform 0.15s;\n  &:hover {\n    transform: translateY(-4px);\n    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);\n  }\n  &.plan-recommande {\n    border-color: var(--color-accent);\n  }\n}\n.badge-recommande[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -12px;\n  left: 50%;\n  transform: translateX(-50%);\n  background: var(--color-accent);\n  color: #1a1a00;\n  font-size: 0.72rem;\n  font-weight: 700;\n  padding: 2px 12px;\n  border-radius: 20px;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n}\n.plan-entete[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.plan-icone[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  width: 2.5rem;\n  height: 2.5rem;\n  color: var(--color-accent);\n  margin-bottom: 8px;\n}\n.plan-nom[_ngcontent-%COMP%] {\n  font-family: "Montserrat", sans-serif;\n  font-size: 1.2rem;\n  color: var(--color-text);\n  margin: 0 0 4px;\n}\n.plan-duree[_ngcontent-%COMP%] {\n  display: inline-block;\n  background: color-mix(in srgb, var(--color-primary) 10%, transparent);\n  color: var(--color-primary);\n  font-size: 0.75rem;\n  font-weight: 700;\n  padding: 2px 10px;\n  border-radius: 20px;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.plan-quota[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--color-text-muted);\n  margin: 8px 0 4px;\n  font-weight: 600;\n}\n.plan-prix[_ngcontent-%COMP%] {\n  margin-top: 4px;\n  .prix-valeur {\n    font-family: "Montserrat", sans-serif;\n    font-size: 1.8rem;\n    color: var(--color-primary);\n  }\n  .prix-unite {\n    font-size: 0.8rem;\n    color: var(--color-text-muted);\n  }\n}\n.liste-features[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  li {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 0.85rem;\n    color: var(--color-text);\n  }\n}\n.icone-check[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  width: 1rem;\n  height: 1rem;\n  color: var(--color-success, #2e7d32);\n  flex-shrink: 0;\n}\n.plan-action[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n.btn-choisir[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  background: var(--color-primary);\n  color: white;\n  border: none;\n  font-family: inherit;\n  font-size: 0.9rem;\n  font-weight: 700;\n  cursor: pointer;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  transition: background 0.2s;\n  &:hover {\n    background: var(--color-primary-dark);\n  }\n  &.btn-recommande {\n    background: var(--color-accent);\n    color: #1a1a00;\n    &:hover {\n      filter: brightness(0.92);\n    }\n  }\n  mat-icon {\n    font-size: 1.1rem;\n    width: 1.1rem;\n    height: 1.1rem;\n  }\n}\n.navigation-bas[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: 28px;\n}\n.btn-retour[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.8) !important;\n  &:hover {\n    color: white !important;\n  }\n}\n.lien-connexion[_ngcontent-%COMP%] {\n  font-size: 0.88rem;\n  color: rgba(255, 255, 255, 0.7);\n  margin: 0;\n  a {\n    color: var(--color-accent);\n    font-weight: 700;\n    &:hover {\n      color: white;\n    }\n  }\n}\n/*# sourceMappingURL=client-plan.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ClientPlanComponent, { className: "ClientPlanComponent", filePath: "src/app/features/auth/client-plan/client-plan.component.ts", lineNumber: 335 });
})();
export {
  ClientPlanComponent
};
//# sourceMappingURL=chunk-IGAF2RTU.js.map
