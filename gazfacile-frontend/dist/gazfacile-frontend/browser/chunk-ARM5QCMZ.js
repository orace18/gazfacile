import {
  SubscriptionService
} from "./chunk-LQSNXUHW.js";
import {
  PaiementService
} from "./chunk-QHRSHWYM.js";
import {
  WebAuthnHelper
} from "./chunk-W2WXU2AI.js";
import {
  AuthService
} from "./chunk-E64KMFYK.js";
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
  MatButtonModule
} from "./chunk-UZFV4MWN.js";
import {
  InscriptionStateService
} from "./chunk-BRGDXGZJ.js";
import {
  Role
} from "./chunk-NOBLHMTB.js";
import {
  Router,
  RouterLink
} from "./chunk-C43TOPVJ.js";
import {
  CommonModule,
  MatIcon,
  MatIconModule,
  __async,
  firstValueFrom,
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
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-XDS62WGT.js";

// src/app/features/auth/register-form/register-form.component.ts
function RegisterFormComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "mat-icon");
    \u0275\u0275text(2, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "a", 12);
    \u0275\u0275listener("click", function RegisterFormComponent_Conditional_8_Template_a_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.inscriptionState.reset());
    });
    \u0275\u0275text(6, "Modifier");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.inscriptionState.resumeLabel());
  }
}
function RegisterFormComponent_Conditional_16_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Le nom est obligatoire");
    \u0275\u0275elementEnd();
  }
}
function RegisterFormComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 13);
    \u0275\u0275listener("ngSubmit", function RegisterFormComponent_Conditional_16_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.continuerVersNumero());
    });
    \u0275\u0275elementStart(1, "mat-form-field", 14)(2, "mat-label");
    \u0275\u0275text(3, "Nom complet");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 15);
    \u0275\u0275elementStart(5, "mat-icon", 16);
    \u0275\u0275text(6, "person");
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, RegisterFormComponent_Conditional_16_Conditional_7_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 17)(9, "span", 18)(10, "mat-icon");
    \u0275\u0275text(11, "arrow_forward");
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, " Suivant ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.nomForm);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(((tmp_2_0 = ctx_r1.nomForm.get("nom")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx_r1.nomForm.get("nom")) == null ? null : tmp_2_0.touched) ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.nomForm.invalid);
  }
}
function RegisterFormComponent_Conditional_17_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Le num\xE9ro de t\xE9l\xE9phone est obligatoire");
    \u0275\u0275elementEnd();
  }
}
function RegisterFormComponent_Conditional_17_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Format invalide. Exemple : 0197000000");
    \u0275\u0275elementEnd();
  }
}
function RegisterFormComponent_Conditional_17_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "mat-icon");
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
function RegisterFormComponent_Conditional_17_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 23);
  }
}
function RegisterFormComponent_Conditional_17_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "arrow_forward");
    \u0275\u0275elementEnd();
  }
}
function RegisterFormComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 8)(1, "mat-form-field", 14)(2, "mat-label");
    \u0275\u0275text(3, "Num\xE9ro de t\xE9l\xE9phone");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 19);
    \u0275\u0275elementStart(5, "div", 20);
    \u0275\u0275text(6, "+229");
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, RegisterFormComponent_Conditional_17_Conditional_7_Template, 2, 0, "mat-error")(8, RegisterFormComponent_Conditional_17_Conditional_8_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, RegisterFormComponent_Conditional_17_Conditional_9_Template, 4, 1, "div", 21);
    \u0275\u0275elementStart(10, "button", 22);
    \u0275\u0275listener("click", function RegisterFormComponent_Conditional_17_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.continuerVersAuthentification());
    });
    \u0275\u0275elementStart(11, "span", 18);
    \u0275\u0275template(12, RegisterFormComponent_Conditional_17_Conditional_12_Template, 1, 0, "mat-spinner", 23)(13, RegisterFormComponent_Conditional_17_Conditional_13_Template, 2, 0, "mat-icon");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "button", 24);
    \u0275\u0275listener("click", function RegisterFormComponent_Conditional_17_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.retourNom());
    });
    \u0275\u0275elementStart(16, "mat-icon");
    \u0275\u0275text(17, "arrow_back");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18, " Retour ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.telephoneForm);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(((tmp_2_0 = ctx_r1.telephoneForm.get("telephone")) == null ? null : tmp_2_0.hasError("required")) && ((tmp_2_0 = ctx_r1.telephoneForm.get("telephone")) == null ? null : tmp_2_0.touched) ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_3_0 = ctx_r1.telephoneForm.get("telephone")) == null ? null : tmp_3_0.hasError("pattern")) && ((tmp_3_0 = ctx_r1.telephoneForm.get("telephone")) == null ? null : tmp_3_0.touched) ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.erreur ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.telephoneForm.invalid || ctx_r1.envoi);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.envoi ? 12 : 13);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.envoi ? "V\xE9rification..." : "Suivant", " ");
  }
}
function RegisterFormComponent_Conditional_18_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "mat-icon");
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
function RegisterFormComponent_Conditional_18_Conditional_9_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 23);
  }
}
function RegisterFormComponent_Conditional_18_Conditional_9_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "fingerprint");
    \u0275\u0275elementEnd();
  }
}
function RegisterFormComponent_Conditional_18_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 29);
    \u0275\u0275listener("click", function RegisterFormComponent_Conditional_18_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.inscrireAvecBiometrie());
    });
    \u0275\u0275elementStart(1, "span", 18);
    \u0275\u0275template(2, RegisterFormComponent_Conditional_18_Conditional_9_Conditional_2_Template, 1, 0, "mat-spinner", 23)(3, RegisterFormComponent_Conditional_18_Conditional_9_Conditional_3_Template, 2, 0, "mat-icon");
    \u0275\u0275text(4, " Enregistrer mon empreinte / Face ID ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 30)(6, "span");
    \u0275\u0275text(7, "ou");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.envoi);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.envoi ? 2 : 3);
  }
}
function RegisterFormComponent_Conditional_18_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 27);
    \u0275\u0275listener("click", function RegisterFormComponent_Conditional_18_Conditional_15_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.inscrireSansBiometrie());
    });
    \u0275\u0275elementStart(1, "span", 18)(2, "mat-icon");
    \u0275\u0275text(3, "person_add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Continuer sans s\xE9curit\xE9 biom\xE9trique ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.envoi);
  }
}
function RegisterFormComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 25)(2, "mat-icon");
    \u0275\u0275text(3, "phone_android");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "p", 26);
    \u0275\u0275text(7, " Choisissez comment s\xE9curiser votre compte. ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, RegisterFormComponent_Conditional_18_Conditional_8_Template, 4, 1, "div", 21)(9, RegisterFormComponent_Conditional_18_Conditional_9_Template, 8, 2);
    \u0275\u0275elementStart(10, "button", 27);
    \u0275\u0275listener("click", function RegisterFormComponent_Conditional_18_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.afficherCreationPin());
    });
    \u0275\u0275elementStart(11, "span", 18)(12, "mat-icon");
    \u0275\u0275text(13, "pin");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14, " Cr\xE9er un PIN 6 chiffres ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(15, RegisterFormComponent_Conditional_18_Conditional_15_Template, 5, 1, "button", 28);
    \u0275\u0275elementStart(16, "button", 24);
    \u0275\u0275listener("click", function RegisterFormComponent_Conditional_18_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.retourNumero());
    });
    \u0275\u0275elementStart(17, "mat-icon");
    \u0275\u0275text(18, "arrow_back");
    \u0275\u0275elementEnd();
    \u0275\u0275text(19, " Retour ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("+229 ", ctx_r1.telephoneLocalAffiche, "");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.erreur ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.webAuthnSupporte() ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.envoi);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(!ctx_r1.webAuthnSupporte() ? 15 : -1);
  }
}
function RegisterFormComponent_Conditional_19_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Le PIN doit comporter 6 chiffres");
    \u0275\u0275elementEnd();
  }
}
function RegisterFormComponent_Conditional_19_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Le PIN doit comporter 6 chiffres");
    \u0275\u0275elementEnd();
  }
}
function RegisterFormComponent_Conditional_19_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Les PIN ne correspondent pas");
    \u0275\u0275elementEnd();
  }
}
function RegisterFormComponent_Conditional_19_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "mat-icon");
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
function RegisterFormComponent_Conditional_19_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 23);
  }
}
function RegisterFormComponent_Conditional_19_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function RegisterFormComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 25)(2, "mat-icon");
    \u0275\u0275text(3, "phone_android");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "mat-form-field", 14)(7, "mat-label");
    \u0275\u0275text(8, "PIN 6 chiffres");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "input", 31);
    \u0275\u0275elementStart(10, "mat-icon", 16);
    \u0275\u0275text(11, "lock");
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, RegisterFormComponent_Conditional_19_Conditional_12_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "mat-form-field", 14)(14, "mat-label");
    \u0275\u0275text(15, "Confirmer le PIN");
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "input", 31);
    \u0275\u0275elementStart(17, "mat-icon", 16);
    \u0275\u0275text(18, "lock_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275template(19, RegisterFormComponent_Conditional_19_Conditional_19_Template, 2, 0, "mat-error")(20, RegisterFormComponent_Conditional_19_Conditional_20_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275template(21, RegisterFormComponent_Conditional_19_Conditional_21_Template, 4, 1, "div", 21);
    \u0275\u0275elementStart(22, "button", 22);
    \u0275\u0275listener("click", function RegisterFormComponent_Conditional_19_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.inscrireAvecPin());
    });
    \u0275\u0275elementStart(23, "span", 18);
    \u0275\u0275template(24, RegisterFormComponent_Conditional_19_Conditional_24_Template, 1, 0, "mat-spinner", 23)(25, RegisterFormComponent_Conditional_19_Conditional_25_Template, 2, 0, "mat-icon");
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "button", 32);
    \u0275\u0275listener("click", function RegisterFormComponent_Conditional_19_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.retourAuthentification());
    });
    \u0275\u0275elementStart(28, "mat-icon");
    \u0275\u0275text(29, "arrow_back");
    \u0275\u0275elementEnd();
    \u0275\u0275text(30, " Retour ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("+229 ", ctx_r1.telephoneLocalAffiche, "");
    \u0275\u0275advance(4);
    \u0275\u0275property("formControl", ctx_r1.pinControl);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.pinControl.invalid && ctx_r1.pinControl.touched ? 12 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("formControl", ctx_r1.pinConfirmControl);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.pinConfirmControl.invalid && ctx_r1.pinConfirmControl.touched ? 19 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.pinConfirmControl.valid && ctx_r1.pinControl.valid && ctx_r1.pinControl.value !== ctx_r1.pinConfirmControl.value ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.erreur ? 21 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.pinControl.invalid || ctx_r1.pinConfirmControl.invalid || ctx_r1.pinControl.value !== ctx_r1.pinConfirmControl.value || ctx_r1.envoi);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.envoi ? 24 : 25);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.envoi ? "Inscription..." : "Cr\xE9er mon compte", " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.envoi);
  }
}
var RegisterFormComponent = class _RegisterFormComponent {
  constructor() {
    this.authService = inject(AuthService);
    this.subscriptionService = inject(SubscriptionService);
    this.paiementService = inject(PaiementService);
    this.router = inject(Router);
    this.fb = inject(FormBuilder);
    this.inscriptionState = inject(InscriptionStateService);
    this.etape = "nom";
    this.envoi = false;
    this.erreur = null;
    this.webAuthnSupporte = signal(false);
    this.nomForm = this.fb.group({
      nom: ["", Validators.required]
    });
    this.telephoneForm = this.fb.group({
      telephone: ["", [Validators.required, Validators.pattern(/^(\+229|00229)?\s*\d{10}$/)]]
    });
    this.pinControl = this.fb.control("", [
      Validators.required,
      Validators.pattern(/^\d{6}$/)
    ]);
    this.pinConfirmControl = this.fb.control("", [
      Validators.required,
      Validators.pattern(/^\d{6}$/)
    ]);
  }
  ngOnInit() {
    WebAuthnHelper.isBiometricAvailable().then((v) => this.webAuthnSupporte.set(v));
  }
  get role() {
    return this.inscriptionState.role() ?? Role.CLIENT;
  }
  get telephoneLocalAffiche() {
    return this.normaliserTelephoneLocal(this.telephoneForm.value.telephone || "");
  }
  get telephone() {
    return this.normaliserTelephoneLocal(this.telephoneForm.value.telephone);
  }
  get nom() {
    return this.nomForm.value.nom.trim();
  }
  // ── Navigation ────────────────────────────────────────────────────────────
  continuerVersNumero() {
    if (this.nomForm.invalid) {
      this.nomForm.markAllAsTouched();
      return;
    }
    this.erreur = null;
    this.etape = "telephone";
  }
  continuerVersAuthentification() {
    if (this.telephoneForm.invalid) {
      this.telephoneForm.markAllAsTouched();
      return;
    }
    this.erreur = null;
    this.etape = "authentification";
  }
  afficherCreationPin() {
    this.erreur = null;
    this.pinControl.reset();
    this.pinConfirmControl.reset();
    this.etape = "pin";
  }
  retourNom() {
    this.erreur = null;
    this.etape = "nom";
  }
  retourNumero() {
    this.erreur = null;
    this.etape = "telephone";
  }
  retourAuthentification() {
    this.erreur = null;
    this.etape = "authentification";
  }
  // ── Inscription WebAuthn ──────────────────────────────────────────────────
  inscrireAvecBiometrie() {
    return __async(this, null, function* () {
      this.envoi = true;
      this.erreur = null;
      try {
        const options = yield firstValueFrom(this.authService.startWebAuthnRegistration({
          telephone: this.telephone,
          nom: this.nom,
          role: this.role
        }));
        const credential = yield WebAuthnHelper.registerWithBiometric(options);
        yield firstValueFrom(this.authService.finishWebAuthnRegistration({
          telephone: this.telephone,
          credential
        }));
        this.inscriptionState.reset();
        yield this.lancerSouscription();
      } catch (err) {
        if (err?.name === "NotAllowedError") {
          this.erreur = "Enregistrement annul\xE9. R\xE9essayez ou choisissez le PIN.";
        } else {
          this.erreur = err?.message || "Enregistrement de l'empreinte \xE9chou\xE9. R\xE9essayez.";
        }
        this.envoi = false;
      }
    });
  }
  // ── Inscription avec PIN ───────────────────────────────────────────────────
  inscrireAvecPin() {
    return __async(this, null, function* () {
      if (this.pinControl.invalid || this.pinConfirmControl.invalid || this.pinControl.value !== this.pinConfirmControl.value) {
        return;
      }
      this.envoi = true;
      this.erreur = null;
      try {
        yield firstValueFrom(this.authService.inscrireSimple({
          telephone: this.telephone,
          nom: this.nom,
          role: this.role
        }));
        yield firstValueFrom(this.authService.setupPin({ pin: this.pinControl.value }));
        this.inscriptionState.reset();
        yield this.lancerSouscription();
      } catch (err) {
        this.erreur = err?.message || "Erreur lors de l'inscription";
        this.envoi = false;
      }
    });
  }
  // ── Inscription sans biométrie (fallback) ─────────────────────────────────
  inscrireSansBiometrie() {
    return __async(this, null, function* () {
      this.envoi = true;
      this.erreur = null;
      try {
        yield firstValueFrom(this.authService.inscrireSimple({
          telephone: this.telephone,
          nom: this.nom,
          role: this.role
        }));
        this.inscriptionState.reset();
        yield this.lancerSouscription();
      } catch (err) {
        this.erreur = err?.message || "Erreur lors de l'inscription";
        this.envoi = false;
      }
    });
  }
  // ── Souscription post-inscription ─────────────────────────────────────────
  lancerSouscription() {
    return __async(this, null, function* () {
      const plan = this.inscriptionState.selectedPlan();
      if (!plan) {
        this.envoi = false;
        this.router.navigate(["/"]);
        return;
      }
      try {
        const response = yield firstValueFrom(this.subscriptionService.subscribe(plan.id, this.telephone));
        this.paiementService.redirectVersCheckout(response.checkoutUrl);
      } catch (err) {
        this.envoi = false;
        this.erreur = err.message || "Compte cr\xE9\xE9, mais impossible d'initier le paiement.";
      }
    });
  }
  ngOnDestroy() {
  }
  normaliserTelephoneLocal(telephone) {
    return telephone.replace(/^\+229/, "").replace(/^00229/, "").replace(/\s/g, "").trim();
  }
  static {
    this.\u0275fac = function RegisterFormComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _RegisterFormComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegisterFormComponent, selectors: [["app-register-form"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 25, vars: 11, consts: [[1, "page-auth"], [1, "carte-auth"], [1, "entete-auth"], ["src", "assets/logo.svg", "alt", "GazFacile", 1, "logo-auth"], [1, "sous-titre"], [1, "resume-choix"], [1, "etapes-header"], [1, "etape-badge"], [1, "formulaire", 3, "formGroup"], [1, "formulaire"], [1, "lien-connexion"], ["routerLink", "/auth/login"], ["routerLink", "/auth/register", 1, "modifier-lien", 3, "click"], [1, "formulaire", 3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "champ-pleine-largeur"], ["matInput", "", "formControlName", "nom", "placeholder", "Ex : Koffi Djossou"], ["matPrefix", ""], ["mat-raised-button", "", "type", "submit", 1, "btn-principal", 3, "disabled"], [1, "btn-content"], ["matInput", "", "formControlName", "telephone", "placeholder", "0197000000", "type", "tel", "inputmode", "numeric", "autocomplete", "tel"], ["matPrefix", "", 1, "prefixe-tel"], [1, "erreur-globale"], ["mat-raised-button", "", "type", "button", 1, "btn-principal", 3, "click", "disabled"], ["diameter", "20"], ["mat-button", "", "type", "button", 1, "btn-secondaire", 3, "click"], [1, "info-telephone"], [1, "instruction"], ["mat-stroked-button", "", "type", "button", 1, "btn-pin", 3, "click", "disabled"], ["mat-stroked-button", "", "type", "button", 1, "btn-pin", 3, "disabled"], ["mat-raised-button", "", "type", "button", 1, "btn-biometrique", 3, "click", "disabled"], [1, "separateur"], ["matInput", "", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022", "type", "password", "inputmode", "numeric", "maxlength", "6", "autocomplete", "new-password", 3, "formControl"], ["mat-button", "", "type", "button", 1, "btn-secondaire", 3, "click", "disabled"]], template: function RegisterFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
        \u0275\u0275element(3, "img", 3);
        \u0275\u0275elementStart(4, "h1");
        \u0275\u0275text(5, "Cr\xE9er mon compte");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p", 4);
        \u0275\u0275text(7, "Inscription rapide avant le paiement.");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(8, RegisterFormComponent_Conditional_8_Template, 7, 1, "div", 5);
        \u0275\u0275elementStart(9, "div", 6)(10, "div", 7);
        \u0275\u0275text(11, "1. Nom");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "div", 7);
        \u0275\u0275text(13, "2. Num\xE9ro");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "div", 7);
        \u0275\u0275text(15, "3. S\xE9curit\xE9");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(16, RegisterFormComponent_Conditional_16_Template, 13, 3, "form", 8)(17, RegisterFormComponent_Conditional_17_Template, 19, 7, "form", 8)(18, RegisterFormComponent_Conditional_18_Template, 20, 5, "div", 9)(19, RegisterFormComponent_Conditional_19_Template, 31, 11, "div", 9);
        \u0275\u0275elementStart(20, "div", 10)(21, "p");
        \u0275\u0275text(22, "D\xE9j\xE0 un compte ? ");
        \u0275\u0275elementStart(23, "a", 11);
        \u0275\u0275text(24, "Se connecter");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275conditional(ctx.inscriptionState.resumeLabel() ? 8 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.etape === "nom");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.etape === "telephone");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.etape === "authentification" || ctx.etape === "pin");
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.etape === "nom" ? 16 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.etape === "telephone" ? 17 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.etape === "authentification" ? 18 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.etape === "pin" ? 19 : -1);
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
      MatIconModule,
      MatIcon,
      MatProgressSpinnerModule,
      MatProgressSpinner
    ], styles: ['\n\n.page-auth[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 64px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px 16px;\n  background-color: var(--color-primary);\n  background-image:\n    linear-gradient(\n      160deg,\n      var(--color-primary) 60%,\n      var(--color-primary-dark) 100%);\n}\n.carte-auth[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 460px;\n  background: var(--color-surface);\n  padding: 40px 36px;\n  border-radius: var(--radius-lg, 16px);\n  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25);\n}\n.entete-auth[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 28px;\n  .logo-auth {\n    height: 56px;\n    width: auto;\n    display: block;\n    margin: 0 auto 14px;\n  }\n  h1 {\n    font-family: "Montserrat", sans-serif;\n    font-size: 1.7rem;\n    font-weight: 700;\n    color: var(--color-text);\n    margin-bottom: 6px;\n  }\n  .sous-titre {\n    color: var(--color-text-muted);\n    font-size: 0.9rem;\n  }\n}\n.resume-choix[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: color-mix(in srgb, var(--color-primary) 8%, transparent);\n  border-left: 3px solid var(--color-primary);\n  padding: 12px 14px;\n  margin-bottom: 20px;\n  font-size: 0.88rem;\n  mat-icon {\n    color: var(--color-primary);\n    font-size: 18px;\n    width: 18px;\n    height: 18px;\n  }\n  .modifier-lien {\n    margin-left: auto;\n    color: var(--color-primary);\n    font-weight: 600;\n    text-decoration: none;\n  }\n}\n.etapes-header[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 8px;\n  margin-bottom: 22px;\n}\n.etape-badge[_ngcontent-%COMP%] {\n  border: 1px solid var(--color-border);\n  padding: 10px 8px;\n  text-align: center;\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  background: var(--color-bg);\n  &.active {\n    background: color-mix(in srgb, var(--color-primary) 10%, transparent);\n    color: var(--color-primary);\n    border-color: color-mix(in srgb, var(--color-primary) 35%, white);\n  }\n}\n.formulaire[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.champ-pleine-largeur[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.prefixe-tel[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  font-weight: 600;\n  color: var(--color-text);\n  margin-right: 8px;\n}\n.info-telephone[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 14px;\n  background: color-mix(in srgb, var(--color-primary) 8%, white);\n  border-radius: 8px;\n  mat-icon {\n    color: var(--color-primary);\n    font-size: 20px;\n    width: 20px;\n    height: 20px;\n  }\n  span {\n    font-weight: 600;\n    color: var(--color-text);\n    font-size: 0.95rem;\n  }\n}\n.instruction[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.9rem;\n  color: var(--color-text-muted);\n  text-align: center;\n}\n.btn-content[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  line-height: 1;\n}\n.btn-principal[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 48px;\n  background: var(--color-accent) !important;\n  color: #fff !important;\n  font-weight: 700;\n}\n.btn-biometrique[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 52px;\n  background: var(--color-primary) !important;\n  color: #fff !important;\n  font-weight: 700;\n  font-size: 1rem;\n  .btn-content mat-icon {\n    font-size: 24px;\n    width: 24px;\n    height: 24px;\n  }\n}\n.btn-pin[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 48px;\n  font-weight: 600;\n}\n.btn-secondaire[_ngcontent-%COMP%] {\n  align-self: center;\n  color: var(--color-primary) !important;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n}\n.separateur[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  color: var(--color-text-muted);\n  font-size: 0.82rem;\n  &::before,\n  &::after {\n    content: "";\n    flex: 1;\n    height: 1px;\n    background: var(--color-border);\n  }\n}\n.erreur-globale[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 14px;\n  background: rgba(244, 67, 54, 0.08);\n  border-radius: 8px;\n  color: #c62828;\n  font-size: 0.88rem;\n  mat-icon {\n    font-size: 18px;\n    width: 18px;\n    height: 18px;\n    flex-shrink: 0;\n  }\n}\n.lien-connexion[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 24px;\n  p {\n    margin: 0;\n    color: var(--color-text-muted);\n    font-size: 0.9rem;\n  }\n  a {\n    color: var(--color-primary);\n    font-weight: 600;\n    text-decoration: none;\n  }\n}\n@media (max-width: 640px) {\n  .carte-auth[_ngcontent-%COMP%] {\n    padding: 32px 22px;\n  }\n  .etapes-header[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n  }\n}\n/*# sourceMappingURL=register-form.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegisterFormComponent, { className: "RegisterFormComponent", filePath: "src/app/features/auth/register-form/register-form.component.ts", lineNumber: 509 });
})();
export {
  RegisterFormComponent
};
//# sourceMappingURL=chunk-ARM5QCMZ.js.map
