import {
  AuthService
} from "./chunk-EVRMIEST.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatInput,
  MatInputModule,
  MatLabel,
  MatPrefix,
  MatSuffix,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-74R6PC7A.js";
import "./chunk-RNMXRL3Z.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-QXKXMS5C.js";
import "./chunk-AH3PCQNR.js";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-UZFV4MWN.js";
import {
  Role
} from "./chunk-NOBLHMTB.js";
import {
  Router
} from "./chunk-C43TOPVJ.js";
import {
  CommonModule,
  MatIcon,
  MatIconModule,
  inject,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-XDS62WGT.js";

// src/app/features/admin/admin-login/admin-login.component.ts
function AdminLoginComponent_Conditional_8_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Le num\xE9ro de t\xE9l\xE9phone est obligatoire");
    \u0275\u0275elementEnd();
  }
}
function AdminLoginComponent_Conditional_8_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Le PIN est obligatoire");
    \u0275\u0275elementEnd();
  }
}
function AdminLoginComponent_Conditional_8_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "mat-icon");
    \u0275\u0275text(2, "error_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.erreur, " ");
  }
}
function AdminLoginComponent_Conditional_8_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 15);
  }
}
function AdminLoginComponent_Conditional_8_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "lock_open");
    \u0275\u0275elementEnd();
  }
}
function AdminLoginComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 7);
    \u0275\u0275listener("ngSubmit", function AdminLoginComponent_Conditional_8_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.soumettre());
    });
    \u0275\u0275elementStart(1, "mat-form-field", 8)(2, "mat-label");
    \u0275\u0275text(3, "Num\xE9ro de t\xE9l\xE9phone");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 9);
    \u0275\u0275elementStart(5, "mat-icon", 10);
    \u0275\u0275text(6, "phone");
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, AdminLoginComponent_Conditional_8_Conditional_7_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "mat-form-field", 8)(9, "mat-label");
    \u0275\u0275text(10, "PIN administrateur");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "input", 11);
    \u0275\u0275elementStart(12, "button", 12);
    \u0275\u0275listener("click", function AdminLoginComponent_Conditional_8_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.mdpVisible = !ctx_r1.mdpVisible);
    });
    \u0275\u0275elementStart(13, "mat-icon");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(15, AdminLoginComponent_Conditional_8_Conditional_15_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, AdminLoginComponent_Conditional_8_Conditional_16_Template, 4, 1, "div", 13);
    \u0275\u0275elementStart(17, "button", 14);
    \u0275\u0275template(18, AdminLoginComponent_Conditional_8_Conditional_18_Template, 1, 0, "mat-spinner", 15)(19, AdminLoginComponent_Conditional_8_Conditional_19_Template, 2, 0, "mat-icon");
    \u0275\u0275text(20, " Se connecter ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_5_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.formulaire);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(((tmp_2_0 = ctx_r1.formulaire.get("telephone")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx_r1.formulaire.get("telephone")) == null ? null : tmp_2_0.touched) ? 7 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("type", ctx_r1.mdpVisible ? "text" : "password");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.mdpVisible ? "visibility_off" : "visibility");
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_5_0 = ctx_r1.formulaire.get("pin")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx_r1.formulaire.get("pin")) == null ? null : tmp_5_0.touched) ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.erreur ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.formulaire.invalid || ctx_r1.envoi);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.envoi ? 18 : 19);
  }
}
function AdminLoginComponent_Conditional_9_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Entrez le code \xE0 6 chiffres");
    \u0275\u0275elementEnd();
  }
}
function AdminLoginComponent_Conditional_9_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "mat-icon");
    \u0275\u0275text(2, "error_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.erreur, " ");
  }
}
function AdminLoginComponent_Conditional_9_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 15);
  }
}
function AdminLoginComponent_Conditional_9_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "verified_user");
    \u0275\u0275elementEnd();
  }
}
function AdminLoginComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 16)(2, "mat-icon", 17);
    \u0275\u0275text(3, "security");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "strong");
    \u0275\u0275text(6, "V\xE9rification en deux \xE9tapes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8, "Ouvrez Google Authenticator et saisissez le code \xE0 6 chiffres.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "mat-form-field", 8)(10, "mat-label");
    \u0275\u0275text(11, "Code \xE0 6 chiffres");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "input", 18);
    \u0275\u0275elementStart(13, "mat-icon", 10);
    \u0275\u0275text(14, "pin");
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, AdminLoginComponent_Conditional_9_Conditional_15_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, AdminLoginComponent_Conditional_9_Conditional_16_Template, 4, 1, "div", 13);
    \u0275\u0275elementStart(17, "button", 19);
    \u0275\u0275listener("click", function AdminLoginComponent_Conditional_9_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.verifierTotp());
    });
    \u0275\u0275template(18, AdminLoginComponent_Conditional_9_Conditional_18_Template, 1, 0, "mat-spinner", 15)(19, AdminLoginComponent_Conditional_9_Conditional_19_Template, 2, 0, "mat-icon");
    \u0275\u0275text(20, " V\xE9rifier ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 20);
    \u0275\u0275listener("click", function AdminLoginComponent_Conditional_9_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.retourPin());
    });
    \u0275\u0275elementStart(22, "mat-icon");
    \u0275\u0275text(23, "arrow_back");
    \u0275\u0275elementEnd();
    \u0275\u0275text(24, " Retour ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275property("formControl", ctx_r1.totpControl);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.totpControl.invalid && ctx_r1.totpControl.touched ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.erreur ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.totpControl.invalid || ctx_r1.envoi);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.envoi ? 18 : 19);
  }
}
var AdminLoginComponent = class _AdminLoginComponent {
  constructor() {
    this.authService = inject(AuthService);
    this.router = inject(Router);
    this.fb = inject(FormBuilder);
    this.mdpVisible = false;
    this.envoi = false;
    this.erreur = null;
    this.ecranTotp = false;
    this.formulaire = this.fb.group({
      telephone: ["", Validators.required],
      pin: ["", Validators.required]
    });
    this.totpControl = this.fb.control("", [
      Validators.required,
      Validators.pattern(/^\d{6}$/)
    ]);
  }
  soumettre() {
    if (this.formulaire.invalid) {
      this.formulaire.markAllAsTouched();
      return;
    }
    this.envoi = true;
    this.erreur = null;
    const { telephone, pin } = this.formulaire.value;
    this.authService.pinLogin({ telephone, pin }).subscribe({
      next: (res) => {
        this.envoi = false;
        if (res.pending2fa) {
          this.ecranTotp = true;
        } else if (this.authService.hasRole(Role.ADMIN)) {
          this.router.navigate(["/admin"]);
        } else {
          this.authService.logout();
          this.erreur = "Acc\xE8s refus\xE9 : vous n'\xEAtes pas administrateur";
        }
      },
      error: (err) => {
        this.envoi = false;
        this.erreur = err.message || "Identifiants incorrects";
      }
    });
  }
  verifierTotp() {
    if (this.totpControl.invalid) {
      this.totpControl.markAsTouched();
      return;
    }
    this.envoi = true;
    this.erreur = null;
    this.authService.totpVerify(this.totpControl.value).subscribe({
      next: () => {
        this.envoi = false;
        this.router.navigate(["/admin"]);
      },
      error: (err) => {
        this.envoi = false;
        this.erreur = err.message || "Code TOTP invalide";
        this.totpControl.reset();
      }
    });
  }
  retourPin() {
    this.ecranTotp = false;
    this.erreur = null;
    this.totpControl.reset();
    this.formulaire.get("pin")?.reset();
  }
  static {
    this.\u0275fac = function AdminLoginComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AdminLoginComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminLoginComponent, selectors: [["app-admin-login"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 10, vars: 2, consts: [[1, "page-admin"], [1, "carte-admin"], [1, "entete"], ["src", "assets/logo.svg", "alt", "GazFacile", 1, "logo"], [1, "sous-titre"], [1, "formulaire", 3, "formGroup"], [1, "formulaire"], [1, "formulaire", 3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "champ"], ["matInput", "", "formControlName", "telephone", "placeholder", "Ex: 97000000", "type", "tel"], ["matPrefix", ""], ["matInput", "", "formControlName", "pin", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022", "inputmode", "numeric", "maxlength", "20", "autocomplete", "current-password", 3, "type"], ["matSuffix", "", "mat-icon-button", "", "type", "button", 3, "click"], [1, "erreur"], ["mat-raised-button", "", "type", "submit", 1, "btn-connexion", 3, "disabled"], ["diameter", "20"], [1, "info-2fa"], [1, "icone-shield"], ["matInput", "", "placeholder", "123456", "type", "text", "inputmode", "numeric", "maxlength", "6", "autocomplete", "one-time-code", 3, "formControl"], ["mat-raised-button", "", 1, "btn-connexion", 3, "click", "disabled"], ["mat-button", "", 1, "btn-retour", 3, "click"]], template: function AdminLoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
        \u0275\u0275element(3, "img", 3);
        \u0275\u0275elementStart(4, "h1");
        \u0275\u0275text(5, "Espace Administrateur");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p", 4);
        \u0275\u0275text(7, "Acc\xE8s r\xE9serv\xE9");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(8, AdminLoginComponent_Conditional_8_Template, 21, 8, "form", 5)(9, AdminLoginComponent_Conditional_9_Template, 25, 5, "div", 6);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275conditional(!ctx.ecranTotp ? 8 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.ecranTotp ? 9 : -1);
      }
    }, dependencies: [
      CommonModule,
      ReactiveFormsModule,
      \u0275NgNoValidate,
      DefaultValueAccessor,
      NgControlStatus,
      NgControlStatusGroup,
      MaxLengthValidator,
      FormControlDirective,
      FormGroupDirective,
      FormControlName,
      MatFormFieldModule,
      MatFormField,
      MatLabel,
      MatError,
      MatPrefix,
      MatSuffix,
      MatInputModule,
      MatInput,
      MatButtonModule,
      MatButton,
      MatIconButton,
      MatIconModule,
      MatIcon,
      MatProgressSpinnerModule,
      MatProgressSpinner
    ], styles: ['\n\n.page-admin[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #1a1a2e;\n  background-image:\n    linear-gradient(\n      160deg,\n      #1a1a2e 0%,\n      #16213e 60%,\n      #0f3460 100%);\n}\n.carte-admin[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 400px;\n  background: white;\n  padding: 44px 40px;\n  border-radius: 4px;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);\n}\n.entete[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 32px;\n  .logo {\n    height: 48px;\n    width: auto;\n    display: block;\n    margin: 0 auto 16px;\n  }\n  h1 {\n    font-family: "Montserrat", sans-serif;\n    font-size: 1.4rem;\n    font-weight: 700;\n    color: #1a1a2e;\n    margin-bottom: 4px;\n  }\n  .sous-titre {\n    font-size: 0.82rem;\n    color: #999;\n    text-transform: uppercase;\n    letter-spacing: 0.1em;\n  }\n}\n.formulaire[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.champ[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.erreur[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 14px;\n  background: #fff0f0;\n  color: #d32f2f;\n  border-left: 3px solid #d32f2f;\n  font-size: 0.88rem;\n}\n.btn-connexion[_ngcontent-%COMP%] {\n  background-color: #0f3460 !important;\n  color: white !important;\n  height: 50px;\n  font-size: 1rem !important;\n  font-weight: 700 !important;\n  margin-top: 8px;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  &:disabled {\n    background-color: #ccc !important;\n    color: #999 !important;\n  }\n  mat-spinner {\n    margin-right: 8px;\n  }\n}\n.info-2fa[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 14px;\n  padding: 16px;\n  background: #e8f0fe;\n  border-radius: 8px;\n  border-left: 4px solid #1a73e8;\n  .icone-shield {\n    color: #1a73e8;\n    font-size: 28px;\n    width: 28px;\n    height: 28px;\n    flex-shrink: 0;\n    margin-top: 2px;\n  }\n  strong {\n    display: block;\n    color: #1a1a2e;\n    margin-bottom: 4px;\n  }\n  p {\n    margin: 0;\n    font-size: 0.85rem;\n    color: #444;\n  }\n}\n.btn-retour[_ngcontent-%COMP%] {\n  align-self: center;\n  color: #666 !important;\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n}\n/*# sourceMappingURL=admin-login.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminLoginComponent, { className: "AdminLoginComponent", filePath: "src/app/features/admin/admin-login/admin-login.component.ts", lineNumber: 242 });
})();
export {
  AdminLoginComponent
};
//# sourceMappingURL=chunk-AF7BDVGY.js.map
