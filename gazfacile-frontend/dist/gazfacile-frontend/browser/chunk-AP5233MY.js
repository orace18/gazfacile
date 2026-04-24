import {
  WebAuthnHelper
} from "./chunk-W2WXU2AI.js";
import {
  AuthService
} from "./chunk-EVRMIEST.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlDirective,
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatInput,
  MatInputModule,
  MatLabel,
  MatPrefix,
  MaxLengthValidator,
  NgControlStatus,
  ReactiveFormsModule,
  Validators
} from "./chunk-74R6PC7A.js";
import "./chunk-RNMXRL3Z.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-QXKXMS5C.js";
import {
  environment
} from "./chunk-AH3PCQNR.js";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-UZFV4MWN.js";
import {
  Role
} from "./chunk-NOBLHMTB.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-C43TOPVJ.js";
import {
  CommonModule,
  HttpClient,
  MatIcon,
  MatIconModule,
  __async,
  catchError,
  filter,
  firstValueFrom,
  inject,
  map,
  of,
  shareReplay,
  switchMap,
  take,
  throwError,
  timeout,
  timer,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-XDS62WGT.js";

// src/app/core/services/google-auth.service.ts
var GoogleAuthService = class _GoogleAuthService {
  constructor() {
    this.apiUrl = `${environment.apiUrl}/auth/google`;
    this.configUrl = `${this.apiUrl}/config`;
    this.http = inject(HttpClient);
    this.fallbackClientId = (environment.googleClientId ?? "").trim();
  }
  chargerConfiguration() {
    if (this.fallbackClientId) {
      return of({ clientId: this.fallbackClientId, configured: true });
    }
    if (!this.config$) {
      this.config$ = this.http.get(this.configUrl).pipe(map((config) => {
        const clientId = (config.clientId ?? "").trim();
        return {
          clientId,
          configured: Boolean(clientId && (config.configured ?? true))
        };
      }), catchError(() => of({ clientId: "", configured: false })), shareReplay(1));
    }
    return this.config$;
  }
  /**
   * Initialise Google Identity Services et rend le bouton dans l'élément fourni.
   * @param element  conteneur DOM pour le bouton Google
   * @param callback appelé avec l'idToken après le sign-in
   */
  initialiser(element, callback) {
    return this.chargerConfiguration().pipe(switchMap((config) => {
      if (!config.configured || !config.clientId) {
        console.warn("[Google] Client ID non configur\xE9");
        return of(false);
      }
      return this.attendreBibliothequeGoogle().pipe(map((scriptCharge) => {
        if (!scriptCharge) {
          console.warn("[Google] Script GSI non charg\xE9");
          return false;
        }
        element.replaceChildren();
        google.accounts.id.initialize({
          client_id: config.clientId,
          callback: (response) => callback(response.credential),
          auto_select: false,
          cancel_on_tap_outside: true
        });
        google.accounts.id.renderButton(element, {
          type: "standard",
          shape: "rectangular",
          theme: "outline",
          size: "large",
          text: "continue_with",
          locale: "fr",
          width: 320
        });
        return true;
      }));
    }));
  }
  /**
   * Envoie l'ID token au backend pour validation et authentification.
   * Si le compte est nouveau, `telephone` est requis.
   */
  loginAvecGoogle(idToken, telephone, role) {
    return this.http.post(this.apiUrl, { idToken, telephone, role }).pipe(catchError((err) => {
      if (err.status === 428) {
        return throwError(() => ({ telephoneRequis: true }));
      }
      const message = err.error?.message || "Connexion Google \xE9chou\xE9e";
      return throwError(() => new Error(message));
    }));
  }
  attendreBibliothequeGoogle() {
    if (typeof google !== "undefined") {
      return of(true);
    }
    return timer(0, 250).pipe(map(() => typeof google !== "undefined"), filter(Boolean), take(1), timeout({ first: 5e3 }), map(() => true), catchError(() => of(false)));
  }
  static {
    this.\u0275fac = function GoogleAuthService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _GoogleAuthService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _GoogleAuthService, factory: _GoogleAuthService.\u0275fac, providedIn: "root" });
  }
};

// src/app/features/auth/login/login.component.ts
var _c0 = ["googleBtnContainer"];
function LoginComponent_Conditional_8_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Entrez un num\xE9ro valide. Exemple : 0197000000");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_8_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "mat-icon");
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
function LoginComponent_Conditional_8_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 14);
  }
}
function LoginComponent_Conditional_8_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "arrow_forward");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "mat-form-field", 9)(2, "mat-label");
    \u0275\u0275text(3, "Num\xE9ro de t\xE9l\xE9phone");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 10);
    \u0275\u0275elementStart(5, "div", 11);
    \u0275\u0275text(6, "+229");
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, LoginComponent_Conditional_8_Conditional_7_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, LoginComponent_Conditional_8_Conditional_8_Template, 4, 1, "div", 12);
    \u0275\u0275elementStart(9, "button", 13);
    \u0275\u0275listener("click", function LoginComponent_Conditional_8_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.continuerAvecTelephone());
    });
    \u0275\u0275template(10, LoginComponent_Conditional_8_Conditional_10_Template, 1, 0, "mat-spinner", 14)(11, LoginComponent_Conditional_8_Conditional_11_Template, 2, 0, "mat-icon");
    \u0275\u0275text(12, " Continuer ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 15)(14, "span");
    \u0275\u0275text(15, "ou");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(16, "div", 16, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("formControl", ctx_r1.telephoneControl);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.telephoneControl.invalid && ctx_r1.telephoneControl.touched ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.erreur ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.telephoneControl.invalid || ctx_r1.envoi);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.envoi ? 10 : 11);
  }
}
function LoginComponent_Conditional_9_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "mat-icon");
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
function LoginComponent_Conditional_9_Conditional_10_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 14);
  }
}
function LoginComponent_Conditional_9_Conditional_10_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "fingerprint");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_9_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function LoginComponent_Conditional_9_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.connecterAvecBiometrie());
    });
    \u0275\u0275template(1, LoginComponent_Conditional_9_Conditional_10_Conditional_1_Template, 1, 0, "mat-spinner", 14)(2, LoginComponent_Conditional_9_Conditional_10_Conditional_2_Template, 2, 0, "mat-icon");
    \u0275\u0275text(3, " Se connecter avec empreinte / Face ID ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.envoi);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.envoi ? 1 : 2);
  }
}
function LoginComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 17)(2, "mat-icon");
    \u0275\u0275text(3, "phone_android");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 18);
    \u0275\u0275listener("click", function LoginComponent_Conditional_9_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.retourTelephone());
    });
    \u0275\u0275elementStart(7, "mat-icon");
    \u0275\u0275text(8, "edit");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(9, LoginComponent_Conditional_9_Conditional_9_Template, 4, 1, "div", 12)(10, LoginComponent_Conditional_9_Conditional_10_Template, 4, 2, "button", 19);
    \u0275\u0275elementStart(11, "button", 20);
    \u0275\u0275listener("click", function LoginComponent_Conditional_9_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.afficherPin());
    });
    \u0275\u0275elementStart(12, "mat-icon");
    \u0275\u0275text(13, "pin");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14, " Utiliser mon PIN ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("+229 ", ctx_r1.telephoneLocalAffiche, "");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.erreur ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.webAuthnSupporte ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.envoi);
  }
}
function LoginComponent_Conditional_10_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Le PIN doit comporter 6 chiffres");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_10_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "mat-icon");
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
function LoginComponent_Conditional_10_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 14);
  }
}
function LoginComponent_Conditional_10_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "login");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_10_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 26);
    \u0275\u0275listener("click", function LoginComponent_Conditional_10_Conditional_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.retourChoix());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "fingerprint");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Utiliser mon empreinte ");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 17)(2, "mat-icon");
    \u0275\u0275text(3, "phone_android");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 22);
    \u0275\u0275listener("click", function LoginComponent_Conditional_10_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.retourChoix());
    });
    \u0275\u0275elementStart(7, "mat-icon");
    \u0275\u0275text(8, "arrow_back");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "mat-form-field", 9)(10, "mat-label");
    \u0275\u0275text(11, "PIN 6 chiffres");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "input", 23);
    \u0275\u0275elementStart(13, "mat-icon", 24);
    \u0275\u0275text(14, "lock");
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, LoginComponent_Conditional_10_Conditional_15_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, LoginComponent_Conditional_10_Conditional_16_Template, 4, 1, "div", 12);
    \u0275\u0275elementStart(17, "button", 13);
    \u0275\u0275listener("click", function LoginComponent_Conditional_10_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.connecterAvecPin());
    });
    \u0275\u0275template(18, LoginComponent_Conditional_10_Conditional_18_Template, 1, 0, "mat-spinner", 14)(19, LoginComponent_Conditional_10_Conditional_19_Template, 2, 0, "mat-icon");
    \u0275\u0275text(20, " Se connecter ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(21, LoginComponent_Conditional_10_Conditional_21_Template, 4, 0, "button", 25);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("+229 ", ctx_r1.telephoneLocalAffiche, "");
    \u0275\u0275advance(7);
    \u0275\u0275property("formControl", ctx_r1.pinControl);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.pinControl.invalid && ctx_r1.pinControl.touched ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.erreur ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.pinControl.invalid || ctx_r1.envoi);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.envoi ? 18 : 19);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.webAuthnSupporte ? 21 : -1);
  }
}
function LoginComponent_Conditional_11_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Entrez un num\xE9ro valide. Exemple : 0197000000");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_11_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "mat-icon");
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
function LoginComponent_Conditional_11_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 14);
  }
}
function LoginComponent_Conditional_11_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "person_add");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 27)(2, "mat-icon");
    \u0275\u0275text(3, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Votre compte Google n'est pas encore li\xE9. Entrez votre num\xE9ro de t\xE9l\xE9phone pour cr\xE9er votre compte GazFacile.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "mat-form-field", 9)(7, "mat-label");
    \u0275\u0275text(8, "Num\xE9ro de t\xE9l\xE9phone");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "input", 10);
    \u0275\u0275elementStart(10, "div", 11);
    \u0275\u0275text(11, "+229");
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, LoginComponent_Conditional_11_Conditional_12_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, LoginComponent_Conditional_11_Conditional_13_Template, 4, 1, "div", 12);
    \u0275\u0275elementStart(14, "button", 13);
    \u0275\u0275listener("click", function LoginComponent_Conditional_11_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.finaliserCompteGoogle());
    });
    \u0275\u0275template(15, LoginComponent_Conditional_11_Conditional_15_Template, 1, 0, "mat-spinner", 14)(16, LoginComponent_Conditional_11_Conditional_16_Template, 2, 0, "mat-icon");
    \u0275\u0275text(17, " Cr\xE9er mon compte ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 26);
    \u0275\u0275listener("click", function LoginComponent_Conditional_11_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.retourTelephone());
    });
    \u0275\u0275elementStart(19, "mat-icon");
    \u0275\u0275text(20, "arrow_back");
    \u0275\u0275elementEnd();
    \u0275\u0275text(21, " Annuler ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275property("formControl", ctx_r1.telephoneControl);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.telephoneControl.invalid && ctx_r1.telephoneControl.touched ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.erreur ? 13 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.telephoneControl.invalid || ctx_r1.envoi);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.envoi ? 15 : 16);
  }
}
var LoginComponent = class _LoginComponent {
  constructor() {
    this.authService = inject(AuthService);
    this.googleAuthService = inject(GoogleAuthService);
    this.router = inject(Router);
    this.route = inject(ActivatedRoute);
    this.fb = inject(FormBuilder);
    this.ecran = "telephone";
    this.envoi = false;
    this.erreur = null;
    this.googleIdToken = null;
    this.webAuthnSupporte = WebAuthnHelper.isSupported();
    this.telephoneControl = this.fb.control("", [
      Validators.required,
      Validators.pattern(/^(\+229|00229)?\s*\d{10}$/)
    ]);
    this.pinControl = this.fb.control("", [
      Validators.required,
      Validators.pattern(/^\d{6}$/)
    ]);
  }
  get telephoneLocalAffiche() {
    return this.normaliserTelephoneLocal(this.telephoneControl.value || "");
  }
  // ── Cycle de vie ──────────────────────────────────────────────────────────
  ngAfterViewInit() {
    this.initialiserBoutonGoogle();
  }
  initialiserBoutonGoogle() {
    if (!this.googleBtnContainer)
      return;
    this.googleAuthService.initialiser(this.googleBtnContainer.nativeElement, (idToken) => this.gererRetourGoogle(idToken)).subscribe();
  }
  // ── Navigation entre écrans ───────────────────────────────────────────────
  continuerAvecTelephone() {
    if (this.telephoneControl.invalid) {
      this.telephoneControl.markAsTouched();
      return;
    }
    this.erreur = null;
    this.ecran = "choix";
  }
  afficherPin() {
    this.erreur = null;
    this.pinControl.reset();
    this.ecran = "pin";
  }
  retourTelephone() {
    this.erreur = null;
    this.googleIdToken = null;
    this.ecran = "telephone";
    setTimeout(() => this.initialiserBoutonGoogle(), 0);
  }
  retourChoix() {
    this.erreur = null;
    this.ecran = "choix";
  }
  // ── Connexion WebAuthn ────────────────────────────────────────────────────
  connecterAvecBiometrie() {
    return __async(this, null, function* () {
      this.envoi = true;
      this.erreur = null;
      try {
        const telephone = this.normaliserTelephoneLocal(this.telephoneControl.value);
        const options = yield firstValueFrom(this.authService.startWebAuthnLogin({ telephone }));
        const assertion = yield WebAuthnHelper.loginWithBiometric(options);
        yield firstValueFrom(this.authService.finishWebAuthnLogin({ telephone, assertion }));
        this.naviguerRetour();
      } catch (err) {
        if (err?.name === "NotAllowedError") {
          this.erreur = "Authentification annul\xE9e. R\xE9essayez.";
        } else {
          this.erreur = err?.message || "Empreinte non reconnue";
        }
      } finally {
        this.envoi = false;
      }
    });
  }
  // ── Connexion PIN ─────────────────────────────────────────────────────────
  connecterAvecPin() {
    if (this.pinControl.invalid) {
      this.pinControl.markAsTouched();
      return;
    }
    this.envoi = true;
    this.erreur = null;
    this.authService.pinLogin({
      telephone: this.normaliserTelephoneLocal(this.telephoneControl.value),
      pin: this.pinControl.value
    }).subscribe({
      next: () => {
        this.envoi = false;
        this.naviguerRetour();
      },
      error: (err) => {
        this.envoi = false;
        this.erreur = err.message || "PIN incorrect";
      }
    });
  }
  // ── Connexion Google ──────────────────────────────────────────────────────
  gererRetourGoogle(idToken) {
    this.envoi = true;
    this.erreur = null;
    this.googleAuthService.loginAvecGoogle(idToken).subscribe({
      next: (res) => {
        this.envoi = false;
        this.authService.sauvegarderSession(res);
        this.naviguerRetour();
      },
      error: (err) => {
        this.envoi = false;
        if (err?.telephoneRequis) {
          this.googleIdToken = idToken;
          this.telephoneControl.reset();
          this.ecran = "google-telephone";
        } else {
          this.erreur = err?.message || "Connexion Google \xE9chou\xE9e";
        }
      }
    });
  }
  finaliserCompteGoogle() {
    if (this.telephoneControl.invalid || !this.googleIdToken) {
      this.telephoneControl.markAsTouched();
      return;
    }
    this.envoi = true;
    this.erreur = null;
    const telephone = this.normaliserTelephoneLocal(this.telephoneControl.value);
    this.googleAuthService.loginAvecGoogle(this.googleIdToken, telephone, Role.CLIENT).subscribe({
      next: (res) => {
        this.envoi = false;
        this.googleIdToken = null;
        this.authService.sauvegarderSession(res);
        this.naviguerRetour();
      },
      error: (err) => {
        this.envoi = false;
        this.erreur = err?.message || "Connexion Google \xE9chou\xE9e";
      }
    });
  }
  // ── Helpers ───────────────────────────────────────────────────────────────
  naviguerRetour() {
    const returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    this.router.navigate([returnUrl]);
  }
  normaliserTelephoneLocal(telephone) {
    return telephone.replace(/^\+229/, "").replace(/^00229/, "").replace(/\s/g, "").trim();
  }
  static {
    this.\u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LoginComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], viewQuery: function LoginComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.googleBtnContainer = _t.first);
      }
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 17, vars: 4, consts: [["googleBtnContainer", ""], [1, "page-auth"], [1, "carte-auth"], [1, "entete-auth"], ["src", "assets/logo.svg", "alt", "GazFacile", 1, "logo-auth"], [1, "sous-titre"], [1, "formulaire"], [1, "lien-inscription"], ["routerLink", "/auth/register"], ["appearance", "outline", 1, "champ-pleine-largeur"], ["matInput", "", "placeholder", "0197000000", "type", "tel", "inputmode", "numeric", "autocomplete", "tel", 3, "formControl"], ["matPrefix", "", 1, "prefixe-tel"], [1, "erreur-globale"], ["mat-raised-button", "", "type", "button", 1, "btn-principal", 3, "click", "disabled"], ["diameter", "20"], [1, "separateur"], [1, "google-btn-container"], [1, "info-telephone"], ["mat-icon-button", "", "title", "Modifier le num\xE9ro", 3, "click"], ["mat-raised-button", "", "type", "button", 1, "btn-biometrique", 3, "disabled"], ["mat-stroked-button", "", "type", "button", 1, "btn-pin", 3, "click", "disabled"], ["mat-raised-button", "", "type", "button", 1, "btn-biometrique", 3, "click", "disabled"], ["mat-icon-button", "", "title", "Retour", 3, "click"], ["matInput", "", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022", "type", "password", "inputmode", "numeric", "maxlength", "6", "autocomplete", "current-password", 3, "formControl"], ["matPrefix", ""], ["mat-button", "", "type", "button", 1, "btn-secondaire"], ["mat-button", "", "type", "button", 1, "btn-secondaire", 3, "click"], [1, "info-google"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3);
        \u0275\u0275element(3, "img", 4);
        \u0275\u0275elementStart(4, "h1");
        \u0275\u0275text(5, "Connexion");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p", 5);
        \u0275\u0275text(7, "Connectez-vous \xE0 votre compte GazFacile");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(8, LoginComponent_Conditional_8_Template, 18, 5, "div", 6)(9, LoginComponent_Conditional_9_Template, 15, 4, "div", 6)(10, LoginComponent_Conditional_10_Template, 22, 7, "div", 6)(11, LoginComponent_Conditional_11_Template, 22, 5, "div", 6);
        \u0275\u0275elementStart(12, "div", 7)(13, "p");
        \u0275\u0275text(14, "Pas encore de compte ? ");
        \u0275\u0275elementStart(15, "a", 8);
        \u0275\u0275text(16, "Cr\xE9er un compte");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275conditional(ctx.ecran === "telephone" ? 8 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.ecran === "choix" ? 9 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.ecran === "pin" ? 10 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.ecran === "google-telephone" ? 11 : -1);
      }
    }, dependencies: [
      CommonModule,
      ReactiveFormsModule,
      DefaultValueAccessor,
      NgControlStatus,
      MaxLengthValidator,
      FormControlDirective,
      RouterLink,
      MatFormFieldModule,
      MatFormField,
      MatLabel,
      MatError,
      MatPrefix,
      MatInputModule,
      MatInput,
      MatButtonModule,
      MatButton,
      MatIconButton,
      MatIconModule,
      MatIcon,
      MatProgressSpinnerModule,
      MatProgressSpinner
    ], styles: ['\n\n.page-auth[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 64px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px 16px;\n  background-color: var(--color-primary);\n  background-image:\n    linear-gradient(\n      160deg,\n      var(--color-primary) 60%,\n      var(--color-primary-dark) 100%);\n}\n.carte-auth[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 420px;\n  background: var(--color-surface);\n  padding: 44px 40px;\n  border-radius: var(--radius-lg, 16px);\n  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25);\n}\n.entete-auth[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 28px;\n  .logo-auth {\n    height: 56px;\n    width: auto;\n    display: block;\n    margin: 0 auto 14px;\n  }\n  h1 {\n    font-family: "Montserrat", sans-serif;\n    font-size: 1.6rem;\n    font-weight: 700;\n    color: var(--color-text);\n    margin-bottom: 6px;\n  }\n  .sous-titre {\n    color: var(--color-text-muted);\n    font-size: 0.88rem;\n  }\n}\n.formulaire[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.champ-pleine-largeur[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.prefixe-tel[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  font-weight: 600;\n  color: var(--color-text);\n  margin-right: 8px;\n}\n.info-telephone[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 14px;\n  background: color-mix(in srgb, var(--color-primary) 8%, white);\n  border-radius: 8px;\n  mat-icon {\n    color: var(--color-primary);\n    font-size: 20px;\n    width: 20px;\n    height: 20px;\n  }\n  span {\n    flex: 1;\n    font-weight: 600;\n    color: var(--color-text);\n    font-size: 0.95rem;\n  }\n}\n.info-google[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  padding: 12px 14px;\n  background: color-mix(in srgb, var(--color-accent) 8%, white);\n  border-radius: 8px;\n  border-left: 3px solid var(--color-accent);\n  mat-icon {\n    color: var(--color-accent);\n    font-size: 20px;\n    width: 20px;\n    height: 20px;\n    flex-shrink: 0;\n    margin-top: 2px;\n  }\n  p {\n    margin: 0;\n    font-size: 0.88rem;\n    color: var(--color-text);\n    line-height: 1.4;\n  }\n}\n.btn-principal[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 48px;\n  background: var(--color-accent) !important;\n  color: #fff !important;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n.btn-biometrique[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 52px;\n  background: var(--color-primary) !important;\n  color: #fff !important;\n  font-weight: 700;\n  font-size: 1rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  mat-icon {\n    font-size: 24px;\n    width: 24px;\n    height: 24px;\n  }\n}\n.btn-pin[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  font-weight: 600;\n}\n.btn-secondaire[_ngcontent-%COMP%] {\n  align-self: center;\n  color: var(--color-primary) !important;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n}\n.separateur[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  color: var(--color-text-muted);\n  font-size: 0.82rem;\n  &::before,\n  &::after {\n    content: "";\n    flex: 1;\n    height: 1px;\n    background: var(--color-border);\n  }\n}\n.google-btn-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  min-height: 44px;\n}\n.erreur-globale[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 14px;\n  background: rgba(244, 67, 54, 0.08);\n  border-radius: 8px;\n  color: #c62828;\n  font-size: 0.88rem;\n  mat-icon {\n    font-size: 18px;\n    width: 18px;\n    height: 18px;\n    flex-shrink: 0;\n  }\n}\n.lien-inscription[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 24px;\n  p {\n    margin: 0 0 8px;\n    color: var(--color-text-muted);\n    font-size: 0.88rem;\n  }\n  a {\n    color: var(--color-primary);\n    font-weight: 600;\n    text-decoration: none;\n  }\n}\n@media (max-width: 640px) {\n  .carte-auth[_ngcontent-%COMP%] {\n    padding: 34px 24px;\n  }\n}\n/*# sourceMappingURL=login.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/features/auth/login/login.component.ts", lineNumber: 449 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-AP5233MY.js.map
