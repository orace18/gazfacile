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
  MatIcon,
  MatIconModule,
  inject,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵtext
} from "./chunk-XDS62WGT.js";

// src/app/features/auth/client-need/client-need.component.ts
var ClientNeedComponent = class _ClientNeedComponent {
  constructor() {
    this.state = inject(InscriptionStateService);
    this.router = inject(Router);
  }
  choisir(need) {
    this.state.setClientNeed(ClientNeed[need]);
    this.router.navigate(["/auth/register/client/plans"]);
  }
  static {
    this.\u0275fac = function ClientNeedComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ClientNeedComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ClientNeedComponent, selectors: [["app-client-need"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 42, vars: 0, consts: [[1, "page-choix"], [1, "conteneur"], [1, "entete"], ["src", "assets/logo-white.svg", "alt", "GazFacile", 1, "logo"], [1, "sous-titre"], [1, "grille-besoins"], [1, "carte-besoin", 3, "click"], [1, "carte-icone"], [1, "carte-cta"], [1, "navigation-bas"], ["mat-button", "", "routerLink", "/auth/register", 1, "btn-retour"], [1, "lien-connexion"], ["routerLink", "/auth/login"]], template: function ClientNeedComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
        \u0275\u0275element(3, "img", 3);
        \u0275\u0275elementStart(4, "h1");
        \u0275\u0275text(5, "Que cherchez-vous ?");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p", 4);
        \u0275\u0275text(7, "Choisissez le service qui vous correspond");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 5)(9, "button", 6);
        \u0275\u0275listener("click", function ClientNeedComponent_Template_button_click_9_listener() {
          return ctx.choisir("CONSULT");
        });
        \u0275\u0275elementStart(10, "div", 7)(11, "mat-icon");
        \u0275\u0275text(12, "location_on");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "h2");
        \u0275\u0275text(14, "VOIR LES REVENDEURS PR\xC8S DE CHEZ MOI");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "p");
        \u0275\u0275text(16, "Consultez les revendeurs de gaz autour de vous, comparez les prix et trouvez le meilleur rapport qualit\xE9/prix");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "span", 8);
        \u0275\u0275text(18, " Choisir ");
        \u0275\u0275elementStart(19, "mat-icon");
        \u0275\u0275text(20, "arrow_forward");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(21, "button", 6);
        \u0275\u0275listener("click", function ClientNeedComponent_Template_button_click_21_listener() {
          return ctx.choisir("LIVRAISON");
        });
        \u0275\u0275elementStart(22, "div", 7)(23, "mat-icon");
        \u0275\u0275text(24, "local_shipping");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(25, "h2");
        \u0275\u0275text(26, "ME FAIRE LIVRER DU GAZ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "p");
        \u0275\u0275text(28, "Commandez du gaz et faites-vous livrer directement \xE0 domicile dans un rayon de 5 km");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "span", 8);
        \u0275\u0275text(30, " Choisir ");
        \u0275\u0275elementStart(31, "mat-icon");
        \u0275\u0275text(32, "arrow_forward");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(33, "div", 9)(34, "button", 10)(35, "mat-icon");
        \u0275\u0275text(36, "arrow_back");
        \u0275\u0275elementEnd();
        \u0275\u0275text(37, " Retour ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "p", 11);
        \u0275\u0275text(39, " D\xE9j\xE0 un compte ? ");
        \u0275\u0275elementStart(40, "a", 12);
        \u0275\u0275text(41, "Se connecter");
        \u0275\u0275elementEnd()()()()();
      }
    }, dependencies: [RouterLink, MatIconModule, MatIcon, MatButtonModule, MatButton], styles: ['\n\n.page-choix[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 64px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px 16px;\n  background-color: var(--color-primary);\n  background-image:\n    linear-gradient(\n      160deg,\n      var(--color-primary) 60%,\n      var(--color-primary-dark) 100%);\n}\n.conteneur[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 700px;\n}\n.entete[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 36px;\n  .logo {\n    height: 56px;\n    width: auto;\n    display: block;\n    margin: 0 auto 14px;\n  }\n  h1 {\n    font-family: "Montserrat", sans-serif;\n    font-size: 1.6rem;\n    font-weight: 700;\n    color: white;\n    margin: 0 0 6px;\n  }\n  .sous-titre {\n    color: rgba(255, 255, 255, 0.8);\n    font-size: 0.92rem;\n    margin: 0;\n  }\n}\n.grille-besoins[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n  @media (max-width: 560px) {\n    grid-template-columns: 1fr;\n  }\n}\n.carte-besoin[_ngcontent-%COMP%] {\n  background: var(--color-surface);\n  border: 2px solid transparent;\n  border-radius: var(--radius-lg, 16px);\n  padding: 36px 24px;\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: 12px;\n  transition:\n    border-color 0.2s,\n    box-shadow 0.2s,\n    transform 0.15s;\n  font-family: inherit;\n  &:hover {\n    border-color: var(--color-accent);\n    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);\n    transform: translateY(-4px);\n  }\n  .carte-icone {\n    width: 72px;\n    height: 72px;\n    border-radius: 50%;\n    background: color-mix(in srgb, var(--color-primary) 12%, transparent);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    mat-icon {\n      font-size: 2.2rem;\n      width: 2.2rem;\n      height: 2.2rem;\n      color: var(--color-primary);\n    }\n  }\n  h2 {\n    font-family: "Montserrat", sans-serif;\n    font-size: 1rem;\n    font-weight: 700;\n    color: var(--color-text);\n    margin: 0;\n    letter-spacing: 0.04em;\n  }\n  p {\n    font-size: 0.85rem;\n    color: var(--color-text-muted);\n    margin: 0;\n    line-height: 1.4;\n  }\n  .carte-cta {\n    display: flex;\n    align-items: center;\n    gap: 4px;\n    margin-top: 8px;\n    color: var(--color-primary);\n    font-weight: 700;\n    font-size: 0.88rem;\n    text-transform: uppercase;\n    letter-spacing: 0.06em;\n    mat-icon {\n      font-size: 1.1rem;\n      width: 1.1rem;\n      height: 1.1rem;\n    }\n  }\n}\n.navigation-bas[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: 28px;\n}\n.btn-retour[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.8) !important;\n  &:hover {\n    color: white !important;\n  }\n}\n.lien-connexion[_ngcontent-%COMP%] {\n  font-size: 0.88rem;\n  color: rgba(255, 255, 255, 0.7);\n  margin: 0;\n  a {\n    color: var(--color-accent);\n    font-weight: 700;\n    &:hover {\n      color: white;\n    }\n  }\n}\n/*# sourceMappingURL=client-need.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ClientNeedComponent, { className: "ClientNeedComponent", filePath: "src/app/features/auth/client-need/client-need.component.ts", lineNumber: 205 });
})();
export {
  ClientNeedComponent
};
//# sourceMappingURL=chunk-OHOCCMTM.js.map
