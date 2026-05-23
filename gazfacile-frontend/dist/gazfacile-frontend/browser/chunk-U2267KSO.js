import {
  PaiementService
} from "./chunk-QHRSHWYM.js";
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
  StatutFedaPay
} from "./chunk-NOBLHMTB.js";
import {
  ActivatedRoute,
  RouterLink,
  RouterModule
} from "./chunk-C43TOPVJ.js";
import {
  CommonModule,
  DecimalPipe,
  LowerCasePipe,
  MatIcon,
  MatIconModule,
  __spreadProps,
  __spreadValues,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-XDS62WGT.js";

// src/app/features/paiement/confirmation/paiement-confirmation.component.ts
function PaiementConfirmationComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 3);
    \u0275\u0275elementStart(1, "p", 4);
    \u0275\u0275text(2, "V\xE9rification du paiement en cours...");
    \u0275\u0275elementEnd();
  }
}
function PaiementConfirmationComponent_Conditional_3_Case_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "mat-icon");
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "h1");
    \u0275\u0275text(4, "Paiement r\xE9ussi !");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 7);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "number");
    \u0275\u0275element(8, "br");
    \u0275\u0275text(9, " R\xE9f\xE9rence : ");
    \u0275\u0275elementStart(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(7, 2, ctx_r0.transaction().montant, "1.0-0"), " FCFA pay\xE9s avec succ\xE8s.");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.transaction().reference);
  }
}
function PaiementConfirmationComponent_Conditional_3_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "mat-icon");
    \u0275\u0275text(2, "hourglass_top");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "h1");
    \u0275\u0275text(4, "Paiement en attente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 7);
    \u0275\u0275text(6, " Votre paiement est en cours de traitement.");
    \u0275\u0275element(7, "br");
    \u0275\u0275text(8, " R\xE9f\xE9rence : ");
    \u0275\u0275elementStart(9, "strong");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r0.transaction().reference);
  }
}
function PaiementConfirmationComponent_Conditional_3_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "mat-icon");
    \u0275\u0275text(2, "cancel");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "h1");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "lowercase");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 7);
    \u0275\u0275text(7, " Le paiement n'a pas pu \xEAtre finalis\xE9.");
    \u0275\u0275element(8, "br");
    \u0275\u0275text(9, " R\xE9f\xE9rence : ");
    \u0275\u0275elementStart(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Paiement ", \u0275\u0275pipeBind1(5, 2, ctx_r0.getStatutLabel(ctx_r0.transaction().statut)), "");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.transaction().reference);
  }
}
function PaiementConfirmationComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, PaiementConfirmationComponent_Conditional_3_Case_0_Template, 12, 5)(1, PaiementConfirmationComponent_Conditional_3_Case_1_Template, 11, 1)(2, PaiementConfirmationComponent_Conditional_3_Case_2_Template, 12, 4);
    \u0275\u0275elementStart(3, "div", 2)(4, "button", 5)(5, "mat-icon");
    \u0275\u0275text(6, "home");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " Retour \xE0 l'accueil ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_1_0 = ctx_r0.transaction().statut) === ctx_r0.StatutFedaPay.APPROVED ? 0 : tmp_1_0 === ctx_r0.StatutFedaPay.PENDING ? 1 : 2);
  }
}
function PaiementConfirmationComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "mat-icon");
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "h1");
    \u0275\u0275text(4, "Impossible de v\xE9rifier le paiement");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 7);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 2)(8, "button", 5)(9, "mat-icon");
    \u0275\u0275text(10, "home");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " Retour \xE0 l'accueil ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.erreur());
  }
}
var PaiementConfirmationComponent = class _PaiementConfirmationComponent {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.paiementService = inject(PaiementService);
    this.pollTimer = null;
    this.tentativeRafraichissement = 0;
    this.delaiRafraichissementMs = 2500;
    this.maxTentativesRafraichissement = 6;
    this.StatutFedaPay = StatutFedaPay;
    this.transaction = signal(null);
    this.chargement = signal(true);
    this.erreur = signal(null);
  }
  ngOnInit() {
    const reference = this.route.snapshot.queryParamMap.get("reference");
    const statutUrl = this.parseStatut(this.route.snapshot.queryParamMap.get("status"));
    if (!reference) {
      this.chargement.set(false);
      this.erreur.set("Aucune r\xE9f\xE9rence de transaction trouv\xE9e dans l'URL.");
      return;
    }
    this.chargerTransaction(reference, statutUrl);
  }
  ngOnDestroy() {
    this.arreterRafraichissement();
  }
  getStatutLabel(statut) {
    return this.paiementService.getStatutLabel(statut);
  }
  chargerTransaction(reference, statutUrl, depuisRafraichissement = false) {
    if (!depuisRafraichissement) {
      this.chargement.set(true);
      this.erreur.set(null);
      this.tentativeRafraichissement = 0;
    }
    this.paiementService.getTransaction(reference).subscribe({
      next: (t) => {
        const statutAffiche = this.resoudreStatutAffiche(t.statut, statutUrl);
        this.transaction.set(statutAffiche === t.statut ? t : __spreadProps(__spreadValues({}, t), { statut: statutAffiche }));
        this.chargement.set(false);
        if (t.statut === StatutFedaPay.PENDING && statutAffiche !== StatutFedaPay.PENDING) {
          this.planifierRafraichissement(reference, statutUrl);
          return;
        }
        this.arreterRafraichissement();
      },
      error: () => {
        this.chargement.set(false);
        if (!this.transaction()) {
          this.erreur.set("Impossible de retrouver la transaction. V\xE9rifiez votre historique.");
        }
      }
    });
  }
  planifierRafraichissement(reference, statutUrl) {
    if (this.pollTimer !== null || this.tentativeRafraichissement >= this.maxTentativesRafraichissement) {
      return;
    }
    this.tentativeRafraichissement += 1;
    this.pollTimer = window.setTimeout(() => {
      this.pollTimer = null;
      this.chargerTransaction(reference, statutUrl, true);
    }, this.delaiRafraichissementMs);
  }
  arreterRafraichissement() {
    if (this.pollTimer !== null) {
      window.clearTimeout(this.pollTimer);
      this.pollTimer = null;
    }
  }
  resoudreStatutAffiche(statutTransaction, statutUrl) {
    if (statutTransaction !== StatutFedaPay.PENDING) {
      return statutTransaction;
    }
    if (statutUrl && statutUrl !== StatutFedaPay.PENDING) {
      return statutUrl;
    }
    return statutTransaction;
  }
  parseStatut(statut) {
    if (!statut) {
      return null;
    }
    const statutNormalise = statut.trim().toUpperCase();
    if (statutNormalise === "CANCELED") {
      return StatutFedaPay.CANCELLED;
    }
    return StatutFedaPay[statutNormalise] ?? null;
  }
  static {
    this.\u0275fac = function PaiementConfirmationComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PaiementConfirmationComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PaiementConfirmationComponent, selectors: [["app-paiement-confirmation"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 5, vars: 1, consts: [[1, "page-confirmation"], [1, "carte-confirmation"], [1, "actions"], ["diameter", "56"], [1, "texte-attente"], ["mat-raised-button", "", "routerLink", "/", 1, "btn-accueil"], [1, "icone-statut", "succes"], [1, "detail"], [1, "icone-statut", "attente"], [1, "icone-statut", "echec"]], template: function PaiementConfirmationComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
        \u0275\u0275template(2, PaiementConfirmationComponent_Conditional_2_Template, 3, 0)(3, PaiementConfirmationComponent_Conditional_3_Template, 8, 1, "div", 2)(4, PaiementConfirmationComponent_Conditional_4_Template, 12, 1);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.chargement() ? 2 : ctx.transaction() ? 3 : ctx.erreur() ? 4 : -1);
      }
    }, dependencies: [CommonModule, LowerCasePipe, DecimalPipe, RouterModule, RouterLink, MatButtonModule, MatButton, MatIconModule, MatIcon, MatProgressSpinnerModule, MatProgressSpinner], styles: ['\n\n.page-confirmation[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background-image:\n    linear-gradient(\n      160deg,\n      var(--color-primary) 60%,\n      var(--color-primary-dark, #2c4770) 100%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n}\n.carte-confirmation[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: var(--radius-md);\n  padding: 48px 40px;\n  max-width: 460px;\n  width: 100%;\n  text-align: center;\n  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n}\n.icone-statut[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  mat-icon {\n    font-size: 3rem;\n    width: 3rem;\n    height: 3rem;\n  }\n  &.succes {\n    background: color-mix(in srgb, #2e7d32 15%, transparent);\n    color: #2e7d32;\n  }\n  &.attente {\n    background: color-mix(in srgb, var(--color-warning, #f59e0b) 15%, transparent);\n    color: var(--color-warning, #f59e0b);\n  }\n  &.echec {\n    background: color-mix(in srgb, var(--color-danger) 15%, transparent);\n    color: var(--color-danger);\n  }\n}\nh1[_ngcontent-%COMP%] {\n  font-family: "Montserrat", sans-serif;\n  font-size: 1.5rem;\n  color: var(--color-text);\n  margin: 0;\n}\n.detail[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: var(--color-text-muted);\n  line-height: 1.6;\n  margin: 0;\n}\n.texte-attente[_ngcontent-%COMP%] {\n  color: var(--color-text-muted);\n  font-size: 0.9rem;\n}\n.actions[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n.btn-accueil[_ngcontent-%COMP%] {\n  background-color: var(--color-primary) !important;\n  color: white !important;\n  height: 44px;\n  padding: 0 24px;\n}\n/*# sourceMappingURL=paiement-confirmation.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PaiementConfirmationComponent, { className: "PaiementConfirmationComponent", filePath: "src/app/features/paiement/confirmation/paiement-confirmation.component.ts", lineNumber: 173 });
})();
export {
  PaiementConfirmationComponent
};
//# sourceMappingURL=chunk-U2267KSO.js.map
