import {
  MatCardModule
} from "./chunk-F6R477Z4.js";
import {
  MatChipsModule
} from "./chunk-U6JHCC4C.js";
import {
  SubscriptionService
} from "./chunk-LQSNXUHW.js";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-OX2RSX6O.js";
import {
  PaiementService
} from "./chunk-QHRSHWYM.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatHint,
  MatInput,
  MatInputModule,
  MatLabel,
  MatPrefix,
  NgControlStatus,
  NgModel
} from "./chunk-74R6PC7A.js";
import "./chunk-RNMXRL3Z.js";
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
  CommonModule,
  DatePipe,
  DecimalPipe,
  MatIcon,
  MatIconModule,
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
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-XDS62WGT.js";

// src/app/features/revendeur/abonnement/abonnement.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function AbonnementComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275element(1, "mat-spinner", 5);
    \u0275\u0275elementEnd();
  }
}
function AbonnementComponent_Conditional_7_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 15)(1, "mat-icon");
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" Actif jusqu'au ", \u0275\u0275pipeBind2(4, 1, ctx_r1.subscription().dateFin, "dd/MM/yyyy"), " ");
  }
}
function AbonnementComponent_Conditional_7_Conditional_0_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 16)(1, "mat-icon");
    \u0275\u0275text(2, "hourglass_top");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Paiement en attente ");
    \u0275\u0275elementEnd();
  }
}
function AbonnementComponent_Conditional_7_Conditional_0_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17)(1, "mat-icon");
    \u0275\u0275text(2, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Expir\xE9 ");
    \u0275\u0275elementEnd();
  }
}
function AbonnementComponent_Conditional_7_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 14)(2, "mat-icon");
    \u0275\u0275text(3, "workspace_premium");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, AbonnementComponent_Conditional_7_Conditional_0_Conditional_5_Template, 5, 4, "span", 15)(6, AbonnementComponent_Conditional_7_Conditional_0_Conditional_6_Template, 4, 0, "span", 16)(7, AbonnementComponent_Conditional_7_Conditional_0_Conditional_7_Template, 4, 0, "span", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.subscription().planCode, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.subscription().statut === "ACTIVE" ? 5 : ctx_r1.subscription().statut === "PENDING" ? 6 : 7);
  }
}
function AbonnementComponent_Conditional_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 18)(2, "mat-icon");
    \u0275\u0275text(3, "store");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Aucun abonnement ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 17)(6, "mat-icon");
    \u0275\u0275text(7, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " Souscrivez pour \xEAtre visible sur GazFacile ");
    \u0275\u0275elementEnd()();
  }
}
function AbonnementComponent_Conditional_7_Conditional_2_For_2_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "mat-icon", 33);
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
function AbonnementComponent_Conditional_7_Conditional_2_For_2_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 31)(1, "mat-icon");
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Plan actuel ");
    \u0275\u0275elementEnd();
  }
}
function AbonnementComponent_Conditional_7_Conditional_2_For_2_Conditional_21_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 35);
  }
}
function AbonnementComponent_Conditional_7_Conditional_2_For_2_Conditional_21_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "open_in_new");
    \u0275\u0275elementEnd();
  }
}
function AbonnementComponent_Conditional_7_Conditional_2_For_2_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 34);
    \u0275\u0275listener("click", function AbonnementComponent_Conditional_7_Conditional_2_For_2_Conditional_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const p_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.souscrire(p_r5.code));
    });
    \u0275\u0275template(1, AbonnementComponent_Conditional_7_Conditional_2_For_2_Conditional_21_Conditional_1_Template, 1, 0, "mat-spinner", 35)(2, AbonnementComponent_Conditional_7_Conditional_2_For_2_Conditional_21_Conditional_2_Template, 2, 0, "mat-icon");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_15_0;
    const p_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r1.enCoursCode() === p_r5.code);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.enCoursCode() === p_r5.code ? 1 : 2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ((tmp_15_0 = ctx_r1.subscription()) == null ? null : tmp_15_0.statut) === "ACTIVE" ? "Renouveler" : "Souscrire", " ");
  }
}
function AbonnementComponent_Conditional_7_Conditional_2_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "div", 21)(2, "mat-icon", 22);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 23);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 24);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 25);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 26)(11, "span", 27);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 28);
    \u0275\u0275text(15, " FCFA");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "ul", 29);
    \u0275\u0275repeaterCreate(17, AbonnementComponent_Conditional_7_Conditional_2_For_2_For_18_Template, 4, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 30);
    \u0275\u0275template(20, AbonnementComponent_Conditional_7_Conditional_2_For_2_Conditional_20_Template, 4, 0, "button", 31)(21, AbonnementComponent_Conditional_7_Conditional_2_For_2_Conditional_21_Template, 4, 3, "button", 32);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_12_0;
    let tmp_19_0;
    const p_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("plan-actuel", ((tmp_12_0 = ctx_r1.subscription()) == null ? null : tmp_12_0.planCode) === p_r5.code && ((tmp_12_0 = ctx_r1.subscription()) == null ? null : tmp_12_0.statut) === "ACTIVE");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.iconePlan(p_r5.code));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r5.nom);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatDuree(p_r5.dureeJours));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r5.description);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(13, 8, p_r5.prix, "1.0-0"));
    \u0275\u0275advance(5);
    \u0275\u0275repeater(p_r5.features);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(((tmp_19_0 = ctx_r1.subscription()) == null ? null : tmp_19_0.planCode) === p_r5.code && ((tmp_19_0 = ctx_r1.subscription()) == null ? null : tmp_19_0.statut) === "ACTIVE" ? 20 : 21);
  }
}
function AbonnementComponent_Conditional_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275repeaterCreate(1, AbonnementComponent_Conditional_7_Conditional_2_For_2_Template, 22, 11, "div", 19, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.plans());
  }
}
function AbonnementComponent_Conditional_7_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "mat-icon");
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.erreur(), " ");
  }
}
function AbonnementComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275template(0, AbonnementComponent_Conditional_7_Conditional_0_Template, 8, 2, "div", 6)(1, AbonnementComponent_Conditional_7_Conditional_1_Template, 9, 0, "div", 6)(2, AbonnementComponent_Conditional_7_Conditional_2_Template, 3, 0, "div", 7)(3, AbonnementComponent_Conditional_7_Conditional_3_Template, 4, 1, "div", 8);
    \u0275\u0275elementStart(4, "div", 9)(5, "mat-form-field", 10)(6, "mat-label");
    \u0275\u0275text(7, "Num\xE9ro Mobile Money pour le paiement");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 11);
    \u0275\u0275twoWayListener("ngModelChange", function AbonnementComponent_Conditional_7_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.telephonePaiement, $event) || (ctx_r1.telephonePaiement = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 12);
    \u0275\u0275text(10, "+229");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "mat-hint");
    \u0275\u0275text(12, "Utilisez le num\xE9ro \xE0 d\xE9biter pour le paiement. Il peut \xEAtre diff\xE9rent du num\xE9ro du compte.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "p", 13)(14, "mat-icon");
    \u0275\u0275text(15, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16, " Le paiement est s\xE9curis\xE9 via FedaPay \u2014 MTN MoMo, Moov Money et Celtiis Cash accept\xE9s. ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.subscription() ? 0 : 1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.plans().length > 0 ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.erreur() ? 3 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.telephonePaiement);
  }
}
var AbonnementComponent = class _AbonnementComponent {
  constructor() {
    this.subscriptionService = inject(SubscriptionService);
    this.paiementService = inject(PaiementService);
    this.snackBar = inject(MatSnackBar);
    this.plans = signal([]);
    this.subscription = signal(null);
    this.chargement = signal(true);
    this.enCoursCode = signal(null);
    this.erreur = signal(null);
    this.telephonePaiement = "";
  }
  ngOnInit() {
    this.charger();
  }
  charger() {
    this.chargement.set(true);
    this.subscriptionService.getPlans("REVENDEUR").subscribe({
      next: (plans) => {
        this.plans.set(plans);
        this.subscriptionService.getCurrent().subscribe({
          next: (sub) => {
            this.subscription.set(sub);
            this.chargement.set(false);
          },
          error: () => {
            this.subscription.set(null);
            this.chargement.set(false);
          }
        });
      },
      error: () => {
        this.chargement.set(false);
        this.erreur.set("Impossible de charger les plans d'abonnement");
      }
    });
  }
  souscrire(planCode) {
    const telephonePaiement = this.telephonePaiement.trim();
    if (telephonePaiement && !/^\d{10}$/.test(telephonePaiement)) {
      this.erreur.set("Le num\xE9ro de paiement doit comporter 10 chiffres.");
      return;
    }
    this.enCoursCode.set(planCode);
    this.erreur.set(null);
    this.subscriptionService.subscribe(planCode, telephonePaiement || void 0).subscribe({
      next: (response) => {
        this.enCoursCode.set(null);
        this.paiementService.redirectVersCheckout(response.checkoutUrl);
      },
      error: (err) => {
        this.enCoursCode.set(null);
        this.erreur.set(err.message);
      }
    });
  }
  iconePlan(code) {
    const c = code.toUpperCase();
    if (c.includes("MAX") || c.includes("PRO") || c.includes("ANNUEL"))
      return "workspace_premium";
    if (c.includes("DIAMOND") || c.includes("SEMESTRIEL"))
      return "star";
    if (c.includes("GOLD") || c.includes("TRIMESTRIEL"))
      return "verified";
    return "calendar_month";
  }
  formatDuree(jours) {
    if (jours >= 365)
      return `${Math.round(jours / 365)} an${jours >= 730 ? "s" : ""}`;
    if (jours >= 30)
      return `${Math.round(jours / 30)} mois`;
    return `${jours} jour${jours > 1 ? "s" : ""}`;
  }
  static {
    this.\u0275fac = function AbonnementComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AbonnementComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AbonnementComponent, selectors: [["app-abonnement"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 8, vars: 1, consts: [[1, "page-abonnement"], [1, "en-tete"], [1, "titre-page"], [1, "sous-titre"], [1, "chargement"], ["diameter", "40"], [1, "statut-actuel"], [1, "grille-plans"], [1, "erreur"], [1, "bloc-tel-paiement"], ["appearance", "outline", 1, "champ-tel"], ["matInput", "", "type", "tel", "placeholder", "Ex: 0197000000", 3, "ngModelChange", "ngModel"], ["matPrefix", "", 1, "prefixe-tel"], [1, "note-paiement"], [1, "badge-plan", "badge-actif"], [1, "chip-actif"], [1, "chip-pending"], [1, "chip-expire"], [1, "badge-plan", "badge-inactif"], [1, "carte-plan", 3, "plan-actuel"], [1, "carte-plan"], [1, "plan-entete"], [1, "plan-icone"], [1, "plan-nom"], [1, "plan-duree"], [1, "plan-desc"], [1, "plan-prix"], [1, "prix-valeur"], [1, "prix-unite"], [1, "liste-features"], [1, "plan-action"], ["mat-stroked-button", "", "disabled", "", 1, "btn-plan-actuel"], ["mat-raised-button", "", 1, "btn-souscrire", 3, "disabled"], [1, "icone-check"], ["mat-raised-button", "", 1, "btn-souscrire", 3, "click", "disabled"], ["diameter", "16"]], template: function AbonnementComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        \u0275\u0275text(3, "Mon abonnement");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "p", 3);
        \u0275\u0275text(5, "G\xE9rez votre visibilit\xE9 sur GazFacile");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(6, AbonnementComponent_Conditional_6_Template, 2, 0, "div", 4)(7, AbonnementComponent_Conditional_7_Template, 17, 4);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275conditional(ctx.chargement() ? 6 : 7);
      }
    }, dependencies: [
      CommonModule,
      DecimalPipe,
      DatePipe,
      FormsModule,
      DefaultValueAccessor,
      NgControlStatus,
      NgModel,
      MatCardModule,
      MatButtonModule,
      MatButton,
      MatIconModule,
      MatIcon,
      MatProgressSpinnerModule,
      MatProgressSpinner,
      MatChipsModule,
      MatSnackBarModule,
      MatFormFieldModule,
      MatFormField,
      MatLabel,
      MatHint,
      MatPrefix,
      MatInputModule,
      MatInput
    ], styles: ['\n\n.page-abonnement[_ngcontent-%COMP%] {\n  max-width: 960px;\n  margin: 0 auto;\n  padding: 32px 16px;\n}\n.en-tete[_ngcontent-%COMP%] {\n  margin-bottom: 32px;\n}\n.titre-page[_ngcontent-%COMP%] {\n  font-family: "Montserrat", sans-serif;\n  font-size: 1.8rem;\n  color: var(--color-primary);\n  margin: 0 0 4px;\n}\n.sous-titre[_ngcontent-%COMP%] {\n  color: var(--color-text-muted);\n  margin: 0;\n}\n.chargement[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 60px 0;\n}\n.statut-actuel[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 32px;\n  padding: 16px 20px;\n  background: var(--color-surface);\n  border-radius: var(--radius-md);\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);\n}\n.badge-plan[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 14px;\n  border-radius: var(--radius-sm);\n  font-weight: 700;\n  font-size: 0.9rem;\n  text-transform: uppercase;\n  &.badge-actif {\n    background: color-mix(in srgb, var(--color-primary) 15%, transparent);\n    color: var(--color-primary);\n  }\n  &.badge-inactif {\n    background: var(--color-surface-2);\n    color: var(--color-text-muted);\n  }\n}\n.chip-actif[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 0.82rem;\n  color: var(--color-success, #2e7d32);\n  mat-icon {\n    font-size: 1rem;\n    width: 1rem;\n    height: 1rem;\n  }\n}\n.chip-pending[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 0.82rem;\n  color: var(--color-warning, #ed6c02);\n  mat-icon {\n    font-size: 1rem;\n    width: 1rem;\n    height: 1rem;\n  }\n}\n.chip-expire[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 0.82rem;\n  color: var(--color-danger);\n  mat-icon {\n    font-size: 1rem;\n    width: 1rem;\n    height: 1rem;\n  }\n}\n.grille-plans[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  gap: 20px;\n  margin-bottom: 24px;\n}\n.carte-plan[_ngcontent-%COMP%] {\n  position: relative;\n  background: var(--color-surface);\n  border-radius: var(--radius-md);\n  border: 2px solid var(--color-border, #e0e0e0);\n  padding: 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  transition: border-color 0.2s, box-shadow 0.2s;\n  &.plan-actuel {\n    border-color: var(--color-primary);\n    box-shadow: 0 0 0 1px var(--color-primary);\n  }\n}\n.plan-entete[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.plan-icone[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  width: 2.5rem;\n  height: 2.5rem;\n  color: var(--color-primary);\n  margin-bottom: 8px;\n}\n.plan-nom[_ngcontent-%COMP%] {\n  font-family: "Montserrat", sans-serif;\n  font-size: 1.2rem;\n  color: var(--color-text);\n  margin: 0 0 4px;\n}\n.plan-desc[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: var(--color-text-muted);\n  margin: 0 0 12px;\n}\n.plan-prix[_ngcontent-%COMP%] {\n  .prix-valeur {\n    font-family: "Montserrat", sans-serif;\n    font-size: 1.8rem;\n    color: var(--color-primary);\n  }\n  .prix-unite {\n    font-size: 0.8rem;\n    color: var(--color-text-muted);\n  }\n}\n.plan-duree[_ngcontent-%COMP%] {\n  display: inline-block;\n  background: color-mix(in srgb, var(--color-primary) 10%, transparent);\n  color: var(--color-primary);\n  font-size: 0.75rem;\n  font-weight: 700;\n  padding: 2px 10px;\n  border-radius: 20px;\n  margin-bottom: 6px;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.liste-features[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  li {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 0.85rem;\n    color: var(--color-text);\n  }\n}\n.icone-check[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  width: 1rem;\n  height: 1rem;\n  color: var(--color-success, #2e7d32);\n  flex-shrink: 0;\n}\n.plan-action[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  button {\n    width: 100%;\n    height: 40px;\n  }\n}\n.btn-plan-actuel[_ngcontent-%COMP%] {\n  color: var(--color-primary) !important;\n  border-color: var(--color-primary) !important;\n}\n.btn-souscrire[_ngcontent-%COMP%] {\n  background-color: var(--color-primary) !important;\n  color: white !important;\n}\n.erreur[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 16px;\n  background: color-mix(in srgb, var(--color-danger) 10%, transparent);\n  color: var(--color-danger);\n  border-radius: var(--radius-sm);\n  font-size: 0.85rem;\n  margin-bottom: 16px;\n}\n.note-paiement[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 0.78rem;\n  color: var(--color-text-muted);\n  text-align: center;\n  justify-content: center;\n  mat-icon {\n    font-size: 1rem;\n    width: 1rem;\n    height: 1rem;\n  }\n}\n/*# sourceMappingURL=abonnement.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AbonnementComponent, { className: "AbonnementComponent", filePath: "src/app/features/revendeur/abonnement/abonnement.component.ts", lineNumber: 396 });
})();
export {
  AbonnementComponent
};
//# sourceMappingURL=chunk-BGXJCPKV.js.map
