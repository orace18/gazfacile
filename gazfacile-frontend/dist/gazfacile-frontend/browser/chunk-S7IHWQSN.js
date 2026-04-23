import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableModule
} from "./chunk-KIJZUJXY.js";
import {
  StockBadgeComponent
} from "./chunk-HLPEEPAR.js";
import {
  MatSelect,
  MatSelectModule,
  MatTooltip,
  MatTooltipModule
} from "./chunk-LA4LZMVU.js";
import {
  RevendeurService
} from "./chunk-XSR74Z7X.js";
import "./chunk-COK4LN6Q.js";
import {
  SubscriptionService
} from "./chunk-LQSNXUHW.js";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-OX2RSX6O.js";
import {
  AuthService
} from "./chunk-E64KMFYK.js";
import {
  CheckboxRequiredValidator,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatInput,
  MatInputModule,
  MatLabel,
  MatSuffix,
  MinValidator,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgControlStatusGroup,
  NumberValueAccessor,
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
  MatAnchor,
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-UZFV4MWN.js";
import {
  FORMATS_LABELS,
  FormatBouteille,
  MARQUES_LABELS,
  MarqueGaz
} from "./chunk-NOBLHMTB.js";
import {
  RouterLink
} from "./chunk-C43TOPVJ.js";
import {
  ANIMATION_MODULE_TYPE,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  CommonModule,
  Component,
  DecimalPipe,
  Directive,
  ElementRef,
  EventEmitter,
  FocusMonitor,
  Inject,
  InjectionToken,
  Input,
  MatCommonModule,
  MatIcon,
  MatIconModule,
  MatOption,
  MatRipple,
  NgModule,
  Optional,
  Output,
  ViewChild,
  ViewEncapsulation$1,
  _MatInternalFormField,
  booleanAttribute,
  forwardRef,
  inject,
  numberAttribute,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵInputTransformsFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵhostProperty,
  ɵɵinjectAttribute,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-XDS62WGT.js";

// node_modules/@angular/material/fesm2022/slide-toggle.mjs
var _c0 = ["switch"];
var _c1 = ["*"];
function MatSlideToggle_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 10);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 12);
    \u0275\u0275element(2, "path", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "svg", 14);
    \u0275\u0275element(4, "path", 15);
    \u0275\u0275elementEnd()();
  }
}
var MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS = new InjectionToken("mat-slide-toggle-default-options", {
  providedIn: "root",
  factory: () => ({
    disableToggleValue: false,
    hideIcon: false,
    disabledInteractive: false
  })
});
var MAT_SLIDE_TOGGLE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MatSlideToggle),
  multi: true
};
var MatSlideToggleChange = class {
  constructor(source, checked) {
    this.source = source;
    this.checked = checked;
  }
};
var nextUniqueId = 0;
var MatSlideToggle = class _MatSlideToggle {
  _createChangeEvent(isChecked) {
    return new MatSlideToggleChange(this, isChecked);
  }
  /** Returns the unique id for the visual hidden button. */
  get buttonId() {
    return `${this.id || this._uniqueId}-button`;
  }
  /** Focuses the slide-toggle. */
  focus() {
    this._switchElement.nativeElement.focus();
  }
  /** Whether the slide-toggle element is checked or not. */
  get checked() {
    return this._checked;
  }
  set checked(value) {
    this._checked = value;
    this._changeDetectorRef.markForCheck();
  }
  /** Returns the unique id for the visual hidden input. */
  get inputId() {
    return `${this.id || this._uniqueId}-input`;
  }
  constructor(_elementRef, _focusMonitor, _changeDetectorRef, tabIndex, defaults, animationMode) {
    this._elementRef = _elementRef;
    this._focusMonitor = _focusMonitor;
    this._changeDetectorRef = _changeDetectorRef;
    this.defaults = defaults;
    this._onChange = (_) => {
    };
    this._onTouched = () => {
    };
    this._validatorOnChange = () => {
    };
    this._checked = false;
    this.name = null;
    this.labelPosition = "after";
    this.ariaLabel = null;
    this.ariaLabelledby = null;
    this.disabled = false;
    this.disableRipple = false;
    this.tabIndex = 0;
    this.change = new EventEmitter();
    this.toggleChange = new EventEmitter();
    this.tabIndex = parseInt(tabIndex) || 0;
    this.color = defaults.color || "accent";
    this._noopAnimations = animationMode === "NoopAnimations";
    this.id = this._uniqueId = `mat-mdc-slide-toggle-${++nextUniqueId}`;
    this.hideIcon = defaults.hideIcon ?? false;
    this.disabledInteractive = defaults.disabledInteractive ?? false;
    this._labelId = this._uniqueId + "-label";
  }
  ngAfterContentInit() {
    this._focusMonitor.monitor(this._elementRef, true).subscribe((focusOrigin) => {
      if (focusOrigin === "keyboard" || focusOrigin === "program") {
        this._focused = true;
        this._changeDetectorRef.markForCheck();
      } else if (!focusOrigin) {
        Promise.resolve().then(() => {
          this._focused = false;
          this._onTouched();
          this._changeDetectorRef.markForCheck();
        });
      }
    });
  }
  ngOnChanges(changes) {
    if (changes["required"]) {
      this._validatorOnChange();
    }
  }
  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }
  /** Implemented as part of ControlValueAccessor. */
  writeValue(value) {
    this.checked = !!value;
  }
  /** Implemented as part of ControlValueAccessor. */
  registerOnChange(fn) {
    this._onChange = fn;
  }
  /** Implemented as part of ControlValueAccessor. */
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  /** Implemented as a part of Validator. */
  validate(control) {
    return this.required && control.value !== true ? {
      "required": true
    } : null;
  }
  /** Implemented as a part of Validator. */
  registerOnValidatorChange(fn) {
    this._validatorOnChange = fn;
  }
  /** Implemented as a part of ControlValueAccessor. */
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
    this._changeDetectorRef.markForCheck();
  }
  /** Toggles the checked state of the slide-toggle. */
  toggle() {
    this.checked = !this.checked;
    this._onChange(this.checked);
  }
  /**
   * Emits a change event on the `change` output. Also notifies the FormControl about the change.
   */
  _emitChangeEvent() {
    this._onChange(this.checked);
    this.change.emit(this._createChangeEvent(this.checked));
  }
  /** Method being called whenever the underlying button is clicked. */
  _handleClick() {
    if (!this.disabled) {
      this.toggleChange.emit();
      if (!this.defaults.disableToggleValue) {
        this.checked = !this.checked;
        this._onChange(this.checked);
        this.change.emit(new MatSlideToggleChange(this, this.checked));
      }
    }
  }
  _getAriaLabelledBy() {
    if (this.ariaLabelledby) {
      return this.ariaLabelledby;
    }
    return this.ariaLabel ? null : this._labelId;
  }
  static {
    this.\u0275fac = function MatSlideToggle_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatSlideToggle)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(FocusMonitor), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275injectAttribute("tabindex"), \u0275\u0275directiveInject(MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS), \u0275\u0275directiveInject(ANIMATION_MODULE_TYPE, 8));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatSlideToggle,
      selectors: [["mat-slide-toggle"]],
      viewQuery: function MatSlideToggle_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuery(_c0, 5);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._switchElement = _t.first);
        }
      },
      hostAttrs: [1, "mat-mdc-slide-toggle"],
      hostVars: 13,
      hostBindings: function MatSlideToggle_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275hostProperty("id", ctx.id);
          \u0275\u0275attribute("tabindex", null)("aria-label", null)("name", null)("aria-labelledby", null);
          \u0275\u0275classMap(ctx.color ? "mat-" + ctx.color : "");
          \u0275\u0275classProp("mat-mdc-slide-toggle-focused", ctx._focused)("mat-mdc-slide-toggle-checked", ctx.checked)("_mat-animation-noopable", ctx._noopAnimations);
        }
      },
      inputs: {
        name: "name",
        id: "id",
        labelPosition: "labelPosition",
        ariaLabel: [0, "aria-label", "ariaLabel"],
        ariaLabelledby: [0, "aria-labelledby", "ariaLabelledby"],
        ariaDescribedby: [0, "aria-describedby", "ariaDescribedby"],
        required: [2, "required", "required", booleanAttribute],
        color: "color",
        disabled: [2, "disabled", "disabled", booleanAttribute],
        disableRipple: [2, "disableRipple", "disableRipple", booleanAttribute],
        tabIndex: [2, "tabIndex", "tabIndex", (value) => value == null ? 0 : numberAttribute(value)],
        checked: [2, "checked", "checked", booleanAttribute],
        hideIcon: [2, "hideIcon", "hideIcon", booleanAttribute],
        disabledInteractive: [2, "disabledInteractive", "disabledInteractive", booleanAttribute]
      },
      outputs: {
        change: "change",
        toggleChange: "toggleChange"
      },
      exportAs: ["matSlideToggle"],
      standalone: true,
      features: [\u0275\u0275ProvidersFeature([MAT_SLIDE_TOGGLE_VALUE_ACCESSOR, {
        provide: NG_VALIDATORS,
        useExisting: _MatSlideToggle,
        multi: true
      }]), \u0275\u0275InputTransformsFeature, \u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature],
      ngContentSelectors: _c1,
      decls: 13,
      vars: 27,
      consts: [["switch", ""], ["mat-internal-form-field", "", 3, "labelPosition"], ["role", "switch", "type", "button", 1, "mdc-switch", 3, "click", "tabIndex", "disabled"], [1, "mdc-switch__track"], [1, "mdc-switch__handle-track"], [1, "mdc-switch__handle"], [1, "mdc-switch__shadow"], [1, "mdc-elevation-overlay"], [1, "mdc-switch__ripple"], ["mat-ripple", "", 1, "mat-mdc-slide-toggle-ripple", "mat-mdc-focus-indicator", 3, "matRippleTrigger", "matRippleDisabled", "matRippleCentered"], [1, "mdc-switch__icons"], [1, "mdc-label", 3, "click", "for"], ["viewBox", "0 0 24 24", "aria-hidden", "true", 1, "mdc-switch__icon", "mdc-switch__icon--on"], ["d", "M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"], ["viewBox", "0 0 24 24", "aria-hidden", "true", 1, "mdc-switch__icon", "mdc-switch__icon--off"], ["d", "M20 13H4v-2h16v2z"]],
      template: function MatSlideToggle_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = \u0275\u0275getCurrentView();
          \u0275\u0275projectionDef();
          \u0275\u0275elementStart(0, "div", 1)(1, "button", 2, 0);
          \u0275\u0275listener("click", function MatSlideToggle_Template_button_click_1_listener() {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._handleClick());
          });
          \u0275\u0275element(3, "span", 3);
          \u0275\u0275elementStart(4, "span", 4)(5, "span", 5)(6, "span", 6);
          \u0275\u0275element(7, "span", 7);
          \u0275\u0275elementEnd();
          \u0275\u0275elementStart(8, "span", 8);
          \u0275\u0275element(9, "span", 9);
          \u0275\u0275elementEnd();
          \u0275\u0275template(10, MatSlideToggle_Conditional_10_Template, 5, 0, "span", 10);
          \u0275\u0275elementEnd()()();
          \u0275\u0275elementStart(11, "label", 11);
          \u0275\u0275listener("click", function MatSlideToggle_Template_label_click_11_listener($event) {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView($event.stopPropagation());
          });
          \u0275\u0275projection(12);
          \u0275\u0275elementEnd()();
        }
        if (rf & 2) {
          const switch_r2 = \u0275\u0275reference(2);
          \u0275\u0275property("labelPosition", ctx.labelPosition);
          \u0275\u0275advance();
          \u0275\u0275classProp("mdc-switch--selected", ctx.checked)("mdc-switch--unselected", !ctx.checked)("mdc-switch--checked", ctx.checked)("mdc-switch--disabled", ctx.disabled)("mat-mdc-slide-toggle-disabled-interactive", ctx.disabledInteractive);
          \u0275\u0275property("tabIndex", ctx.disabled && !ctx.disabledInteractive ? -1 : ctx.tabIndex)("disabled", ctx.disabled && !ctx.disabledInteractive);
          \u0275\u0275attribute("id", ctx.buttonId)("name", ctx.name)("aria-label", ctx.ariaLabel)("aria-labelledby", ctx._getAriaLabelledBy())("aria-describedby", ctx.ariaDescribedby)("aria-required", ctx.required || null)("aria-checked", ctx.checked)("aria-disabled", ctx.disabled && ctx.disabledInteractive ? "true" : null);
          \u0275\u0275advance(8);
          \u0275\u0275property("matRippleTrigger", switch_r2)("matRippleDisabled", ctx.disableRipple || ctx.disabled)("matRippleCentered", true);
          \u0275\u0275advance();
          \u0275\u0275conditional(!ctx.hideIcon ? 10 : -1);
          \u0275\u0275advance();
          \u0275\u0275property("for", ctx.buttonId);
          \u0275\u0275attribute("id", ctx._labelId);
        }
      },
      dependencies: [MatRipple, _MatInternalFormField],
      styles: ['.mdc-switch{align-items:center;background:none;border:none;cursor:pointer;display:inline-flex;flex-shrink:0;margin:0;outline:none;overflow:visible;padding:0;position:relative;width:var(--mdc-switch-track-width)}.mdc-switch.mdc-switch--disabled{cursor:default;pointer-events:none}.mdc-switch.mat-mdc-slide-toggle-disabled-interactive{pointer-events:auto}.mdc-switch__track{overflow:hidden;position:relative;width:100%;height:var(--mdc-switch-track-height);border-radius:var(--mdc-switch-track-shape, var(--mat-app-corner-full))}.mdc-switch--disabled.mdc-switch .mdc-switch__track{opacity:var(--mdc-switch-disabled-track-opacity)}.mdc-switch__track::before,.mdc-switch__track::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";height:100%;left:0;position:absolute;width:100%;border-width:var(--mat-switch-track-outline-width);border-color:var(--mat-switch-track-outline-color, var(--mat-app-outline))}.cdk-high-contrast-active .mdc-switch__track::before,.cdk-high-contrast-active .mdc-switch__track::after{border-color:currentColor}.mdc-switch--selected .mdc-switch__track::before,.mdc-switch--selected .mdc-switch__track::after{border-width:var(--mat-switch-selected-track-outline-width);border-color:var(--mat-switch-selected-track-outline-color)}.mdc-switch--disabled .mdc-switch__track::before,.mdc-switch--disabled .mdc-switch__track::after{border-width:var(--mat-switch-disabled-unselected-track-outline-width);border-color:var(--mat-switch-disabled-unselected-track-outline-color, var(--mat-app-on-surface))}.mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:translateX(0);background:var(--mdc-switch-unselected-track-color, var(--mat-app-surface-variant))}.mdc-switch--selected .mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch--selected .mdc-switch__track::before{transform:translateX(-100%)}.mdc-switch--selected .mdc-switch__track::before{opacity:var(--mat-switch-hidden-track-opacity);transition:var(--mat-switch-hidden-track-transition)}.mdc-switch--unselected .mdc-switch__track::before{opacity:var(--mat-switch-visible-track-opacity);transition:var(--mat-switch-visible-track-transition)}.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before{background:var(--mdc-switch-unselected-hover-track-color, var(--mat-app-surface-variant))}.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before{background:var(--mdc-switch-unselected-focus-track-color, var(--mat-app-surface-variant))}.mdc-switch:enabled:active .mdc-switch__track::before{background:var(--mdc-switch-unselected-pressed-track-color, var(--mat-app-surface-variant))}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::before,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::before,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::before,.mdc-switch.mdc-switch--disabled .mdc-switch__track::before{background:var(--mdc-switch-disabled-unselected-track-color, var(--mat-app-surface-variant))}.mdc-switch__track::after{transform:translateX(-100%);background:var(--mdc-switch-selected-track-color, var(--mat-app-primary))}[dir=rtl] .mdc-switch__track::after{transform:translateX(100%)}.mdc-switch--selected .mdc-switch__track::after{transform:translateX(0)}.mdc-switch--selected .mdc-switch__track::after{opacity:var(--mat-switch-visible-track-opacity);transition:var(--mat-switch-visible-track-transition)}.mdc-switch--unselected .mdc-switch__track::after{opacity:var(--mat-switch-hidden-track-opacity);transition:var(--mat-switch-hidden-track-transition)}.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after{background:var(--mdc-switch-selected-hover-track-color, var(--mat-app-primary))}.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after{background:var(--mdc-switch-selected-focus-track-color, var(--mat-app-primary))}.mdc-switch:enabled:active .mdc-switch__track::after{background:var(--mdc-switch-selected-pressed-track-color, var(--mat-app-primary))}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::after,.mdc-switch.mdc-switch--disabled .mdc-switch__track::after{background:var(--mdc-switch-disabled-selected-track-color, var(--mat-app-on-surface))}.mdc-switch__handle-track{height:100%;pointer-events:none;position:absolute;top:0;transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);left:0;right:auto;transform:translateX(0);width:calc(100% - var(--mdc-switch-handle-width))}[dir=rtl] .mdc-switch__handle-track{left:auto;right:0}.mdc-switch--selected .mdc-switch__handle-track{transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track{transform:translateX(-100%)}.mdc-switch__handle{display:flex;pointer-events:auto;position:absolute;top:50%;transform:translateY(-50%);left:0;right:auto;transition:width 75ms cubic-bezier(0.4, 0, 0.2, 1),height 75ms cubic-bezier(0.4, 0, 0.2, 1),margin 75ms cubic-bezier(0.4, 0, 0.2, 1);width:var(--mdc-switch-handle-width);height:var(--mdc-switch-handle-height);border-radius:var(--mdc-switch-handle-shape, var(--mat-app-corner-full))}[dir=rtl] .mdc-switch__handle{left:auto;right:0}.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle{width:var(--mat-switch-unselected-handle-size);height:var(--mat-switch-unselected-handle-size);margin:var(--mat-switch-unselected-handle-horizontal-margin)}.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle:has(.mdc-switch__icons){margin:var(--mat-switch-unselected-with-icon-handle-horizontal-margin)}.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle{width:var(--mat-switch-selected-handle-size);height:var(--mat-switch-selected-handle-size);margin:var(--mat-switch-selected-handle-horizontal-margin)}.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle:has(.mdc-switch__icons){margin:var(--mat-switch-selected-with-icon-handle-horizontal-margin)}.mat-mdc-slide-toggle .mdc-switch__handle:has(.mdc-switch__icons){width:var(--mat-switch-with-icon-handle-size);height:var(--mat-switch-with-icon-handle-size)}.mat-mdc-slide-toggle .mdc-switch:active:not(.mdc-switch--disabled) .mdc-switch__handle{width:var(--mat-switch-pressed-handle-size);height:var(--mat-switch-pressed-handle-size)}.mat-mdc-slide-toggle .mdc-switch--selected:active:not(.mdc-switch--disabled) .mdc-switch__handle{margin:var(--mat-switch-selected-pressed-handle-horizontal-margin)}.mat-mdc-slide-toggle .mdc-switch--unselected:active:not(.mdc-switch--disabled) .mdc-switch__handle{margin:var(--mat-switch-unselected-pressed-handle-horizontal-margin)}.mdc-switch--disabled.mdc-switch--selected .mdc-switch__handle::after{opacity:var(--mat-switch-disabled-selected-handle-opacity)}.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__handle::after{opacity:var(--mat-switch-disabled-unselected-handle-opacity)}.mdc-switch__handle::before,.mdc-switch__handle::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";width:100%;height:100%;left:0;position:absolute;top:0;transition:background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1),border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);z-index:-1}.cdk-high-contrast-active .mdc-switch__handle::before,.cdk-high-contrast-active .mdc-switch__handle::after{border-color:currentColor}.mdc-switch--selected:enabled .mdc-switch__handle::after{background:var(--mdc-switch-selected-handle-color, var(--mat-app-on-primary))}.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-selected-hover-handle-color, var(--mat-app-primary-container))}.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-selected-focus-handle-color, var(--mat-app-primary-container))}.mdc-switch--selected:enabled:active .mdc-switch__handle::after{background:var(--mdc-switch-selected-pressed-handle-color, var(--mat-app-primary-container))}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:hover:not(:focus):not(:active) .mdc-switch__handle::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:focus:not(:active) .mdc-switch__handle::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:active .mdc-switch__handle::after,.mdc-switch--selected.mdc-switch--disabled .mdc-switch__handle::after{background:var(--mdc-switch-disabled-selected-handle-color, var(--mat-app-surface))}.mdc-switch--unselected:enabled .mdc-switch__handle::after{background:var(--mdc-switch-unselected-handle-color, var(--mat-app-outline))}.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-unselected-hover-handle-color, var(--mat-app-on-surface-variant))}.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-unselected-focus-handle-color, var(--mat-app-on-surface-variant))}.mdc-switch--unselected:enabled:active .mdc-switch__handle::after{background:var(--mdc-switch-unselected-pressed-handle-color, var(--mat-app-on-surface-variant))}.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__handle::after{background:var(--mdc-switch-disabled-unselected-handle-color, var(--mat-app-on-surface))}.mdc-switch__handle::before{background:var(--mdc-switch-handle-surface-color)}.mdc-switch__shadow{border-radius:inherit;bottom:0;left:0;position:absolute;right:0;top:0}.mdc-switch:enabled .mdc-switch__shadow{box-shadow:var(--mdc-switch-handle-elevation-shadow)}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__shadow,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__shadow,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__shadow,.mdc-switch.mdc-switch--disabled .mdc-switch__shadow{box-shadow:var(--mdc-switch-disabled-handle-elevation-shadow)}.mdc-switch__ripple{left:50%;position:absolute;top:50%;transform:translate(-50%, -50%);z-index:-1;width:var(--mdc-switch-state-layer-size);height:var(--mdc-switch-state-layer-size)}.mdc-switch__ripple::after{content:"";opacity:0}.mdc-switch--disabled .mdc-switch__ripple::after{display:none}.mat-mdc-slide-toggle-disabled-interactive .mdc-switch__ripple::after{display:block}.mdc-switch:hover .mdc-switch__ripple::after{opacity:.04;transition:75ms opacity cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mdc-switch .mdc-switch__ripple::after{opacity:.12}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:focus .mdc-switch__ripple::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:active .mdc-switch__ripple::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:hover:not(:focus) .mdc-switch__ripple::after,.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background:var(--mdc-switch-unselected-hover-state-layer-color, var(--mat-app-on-surface))}.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after{background:var(--mdc-switch-unselected-focus-state-layer-color, var(--mat-app-on-surface))}.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after{background:var(--mdc-switch-unselected-pressed-state-layer-color, var(--mat-app-on-surface));opacity:var(--mdc-switch-unselected-pressed-state-layer-opacity, var(--mat-app-pressed-state-layer-opacity));transition:opacity 75ms linear}.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background:var(--mdc-switch-selected-hover-state-layer-color, var(--mat-app-primary))}.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after{background:var(--mdc-switch-selected-focus-state-layer-color, var(--mat-app-primary))}.mdc-switch--selected:enabled:active .mdc-switch__ripple::after{background:var(--mdc-switch-selected-pressed-state-layer-color, var(--mat-app-primary));opacity:var(--mdc-switch-selected-pressed-state-layer-opacity, var(--mat-app-pressed-state-layer-opacity));transition:opacity 75ms linear}.mdc-switch__icons{position:relative;height:100%;width:100%;z-index:1}.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__icons{opacity:var(--mdc-switch-disabled-unselected-icon-opacity)}.mdc-switch--disabled.mdc-switch--selected .mdc-switch__icons{opacity:var(--mdc-switch-disabled-selected-icon-opacity)}.mdc-switch__icon{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0;opacity:0;transition:opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-switch--unselected .mdc-switch__icon{width:var(--mdc-switch-unselected-icon-size);height:var(--mdc-switch-unselected-icon-size);fill:var(--mdc-switch-unselected-icon-color, var(--mat-app-surface-variant))}.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__icon{fill:var(--mdc-switch-disabled-unselected-icon-color, var(--mat-app-surface-variant))}.mdc-switch--selected .mdc-switch__icon{width:var(--mdc-switch-selected-icon-size);height:var(--mdc-switch-selected-icon-size);fill:var(--mdc-switch-selected-icon-color, var(--mat-app-on-primary-container))}.mdc-switch--selected.mdc-switch--disabled .mdc-switch__icon{fill:var(--mdc-switch-disabled-selected-icon-color, var(--mat-app-on-surface))}.mdc-switch--selected .mdc-switch__icon--on,.mdc-switch--unselected .mdc-switch__icon--off{opacity:1;transition:opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle{-webkit-user-select:none;user-select:none;display:inline-block;-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,.mat-mdc-slide-toggle .mdc-switch__ripple::after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:50%;pointer-events:none}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty){transform:translateZ(0)}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-mdc-focus-indicator::before{content:""}.mat-mdc-slide-toggle .mat-internal-form-field{color:var(--mat-switch-label-text-color, var(--mat-app-on-surface));font-family:var(--mat-switch-label-text-font, var(--mat-app-body-medium-font));line-height:var(--mat-switch-label-text-line-height, var(--mat-app-body-medium-line-height));font-size:var(--mat-switch-label-text-size, var(--mat-app-body-medium-size));letter-spacing:var(--mat-switch-label-text-tracking, var(--mat-app-body-medium-tracking));font-weight:var(--mat-switch-label-text-weight, var(--mat-app-body-medium-weight))}.mat-mdc-slide-toggle .mat-ripple-element{opacity:.12}.mat-mdc-slide-toggle .mat-mdc-focus-indicator::before{border-radius:50%}.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after{transition:none}.mat-mdc-slide-toggle .mdc-switch:enabled+.mdc-label{cursor:pointer}.mat-mdc-slide-toggle .mdc-switch--disabled+label{color:var(--mdc-switch-disabled-label-text-color)}'],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSlideToggle, [{
    type: Component,
    args: [{
      selector: "mat-slide-toggle",
      host: {
        "class": "mat-mdc-slide-toggle",
        "[id]": "id",
        // Needs to be removed since it causes some a11y issues (see #21266).
        "[attr.tabindex]": "null",
        "[attr.aria-label]": "null",
        "[attr.name]": "null",
        "[attr.aria-labelledby]": "null",
        "[class.mat-mdc-slide-toggle-focused]": "_focused",
        "[class.mat-mdc-slide-toggle-checked]": "checked",
        "[class._mat-animation-noopable]": "_noopAnimations",
        "[class]": 'color ? "mat-" + color : ""'
      },
      exportAs: "matSlideToggle",
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [MAT_SLIDE_TOGGLE_VALUE_ACCESSOR, {
        provide: NG_VALIDATORS,
        useExisting: MatSlideToggle,
        multi: true
      }],
      standalone: true,
      imports: [MatRipple, _MatInternalFormField],
      template: `<div mat-internal-form-field [labelPosition]="labelPosition">
  <button
    class="mdc-switch"
    role="switch"
    type="button"
    [class.mdc-switch--selected]="checked"
    [class.mdc-switch--unselected]="!checked"
    [class.mdc-switch--checked]="checked"
    [class.mdc-switch--disabled]="disabled"
    [class.mat-mdc-slide-toggle-disabled-interactive]="disabledInteractive"
    [tabIndex]="disabled && !disabledInteractive ? -1 : tabIndex"
    [disabled]="disabled && !disabledInteractive"
    [attr.id]="buttonId"
    [attr.name]="name"
    [attr.aria-label]="ariaLabel"
    [attr.aria-labelledby]="_getAriaLabelledBy()"
    [attr.aria-describedby]="ariaDescribedby"
    [attr.aria-required]="required || null"
    [attr.aria-checked]="checked"
    [attr.aria-disabled]="disabled && disabledInteractive ? 'true' : null"
    (click)="_handleClick()"
    #switch>
    <span class="mdc-switch__track"></span>
    <span class="mdc-switch__handle-track">
      <span class="mdc-switch__handle">
        <span class="mdc-switch__shadow">
          <span class="mdc-elevation-overlay"></span>
        </span>
        <span class="mdc-switch__ripple">
          <span class="mat-mdc-slide-toggle-ripple mat-mdc-focus-indicator" mat-ripple
            [matRippleTrigger]="switch"
            [matRippleDisabled]="disableRipple || disabled"
            [matRippleCentered]="true"></span>
        </span>
        @if (!hideIcon) {
          <span class="mdc-switch__icons">
            <svg
              class="mdc-switch__icon mdc-switch__icon--on"
              viewBox="0 0 24 24"
              aria-hidden="true">
              <path d="M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z" />
            </svg>
            <svg
              class="mdc-switch__icon mdc-switch__icon--off"
              viewBox="0 0 24 24"
              aria-hidden="true">
              <path d="M20 13H4v-2h16v2z" />
            </svg>
          </span>
        }
      </span>
    </span>
  </button>

  <!--
    Clicking on the label will trigger another click event from the button.
    Stop propagation here so other listeners further up in the DOM don't execute twice.
  -->
  <label class="mdc-label" [for]="buttonId" [attr.id]="_labelId" (click)="$event.stopPropagation()">
    <ng-content></ng-content>
  </label>
</div>
`,
      styles: ['.mdc-switch{align-items:center;background:none;border:none;cursor:pointer;display:inline-flex;flex-shrink:0;margin:0;outline:none;overflow:visible;padding:0;position:relative;width:var(--mdc-switch-track-width)}.mdc-switch.mdc-switch--disabled{cursor:default;pointer-events:none}.mdc-switch.mat-mdc-slide-toggle-disabled-interactive{pointer-events:auto}.mdc-switch__track{overflow:hidden;position:relative;width:100%;height:var(--mdc-switch-track-height);border-radius:var(--mdc-switch-track-shape, var(--mat-app-corner-full))}.mdc-switch--disabled.mdc-switch .mdc-switch__track{opacity:var(--mdc-switch-disabled-track-opacity)}.mdc-switch__track::before,.mdc-switch__track::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";height:100%;left:0;position:absolute;width:100%;border-width:var(--mat-switch-track-outline-width);border-color:var(--mat-switch-track-outline-color, var(--mat-app-outline))}.cdk-high-contrast-active .mdc-switch__track::before,.cdk-high-contrast-active .mdc-switch__track::after{border-color:currentColor}.mdc-switch--selected .mdc-switch__track::before,.mdc-switch--selected .mdc-switch__track::after{border-width:var(--mat-switch-selected-track-outline-width);border-color:var(--mat-switch-selected-track-outline-color)}.mdc-switch--disabled .mdc-switch__track::before,.mdc-switch--disabled .mdc-switch__track::after{border-width:var(--mat-switch-disabled-unselected-track-outline-width);border-color:var(--mat-switch-disabled-unselected-track-outline-color, var(--mat-app-on-surface))}.mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:translateX(0);background:var(--mdc-switch-unselected-track-color, var(--mat-app-surface-variant))}.mdc-switch--selected .mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch--selected .mdc-switch__track::before{transform:translateX(-100%)}.mdc-switch--selected .mdc-switch__track::before{opacity:var(--mat-switch-hidden-track-opacity);transition:var(--mat-switch-hidden-track-transition)}.mdc-switch--unselected .mdc-switch__track::before{opacity:var(--mat-switch-visible-track-opacity);transition:var(--mat-switch-visible-track-transition)}.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before{background:var(--mdc-switch-unselected-hover-track-color, var(--mat-app-surface-variant))}.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before{background:var(--mdc-switch-unselected-focus-track-color, var(--mat-app-surface-variant))}.mdc-switch:enabled:active .mdc-switch__track::before{background:var(--mdc-switch-unselected-pressed-track-color, var(--mat-app-surface-variant))}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::before,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::before,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::before,.mdc-switch.mdc-switch--disabled .mdc-switch__track::before{background:var(--mdc-switch-disabled-unselected-track-color, var(--mat-app-surface-variant))}.mdc-switch__track::after{transform:translateX(-100%);background:var(--mdc-switch-selected-track-color, var(--mat-app-primary))}[dir=rtl] .mdc-switch__track::after{transform:translateX(100%)}.mdc-switch--selected .mdc-switch__track::after{transform:translateX(0)}.mdc-switch--selected .mdc-switch__track::after{opacity:var(--mat-switch-visible-track-opacity);transition:var(--mat-switch-visible-track-transition)}.mdc-switch--unselected .mdc-switch__track::after{opacity:var(--mat-switch-hidden-track-opacity);transition:var(--mat-switch-hidden-track-transition)}.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after{background:var(--mdc-switch-selected-hover-track-color, var(--mat-app-primary))}.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after{background:var(--mdc-switch-selected-focus-track-color, var(--mat-app-primary))}.mdc-switch:enabled:active .mdc-switch__track::after{background:var(--mdc-switch-selected-pressed-track-color, var(--mat-app-primary))}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::after,.mdc-switch.mdc-switch--disabled .mdc-switch__track::after{background:var(--mdc-switch-disabled-selected-track-color, var(--mat-app-on-surface))}.mdc-switch__handle-track{height:100%;pointer-events:none;position:absolute;top:0;transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);left:0;right:auto;transform:translateX(0);width:calc(100% - var(--mdc-switch-handle-width))}[dir=rtl] .mdc-switch__handle-track{left:auto;right:0}.mdc-switch--selected .mdc-switch__handle-track{transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track{transform:translateX(-100%)}.mdc-switch__handle{display:flex;pointer-events:auto;position:absolute;top:50%;transform:translateY(-50%);left:0;right:auto;transition:width 75ms cubic-bezier(0.4, 0, 0.2, 1),height 75ms cubic-bezier(0.4, 0, 0.2, 1),margin 75ms cubic-bezier(0.4, 0, 0.2, 1);width:var(--mdc-switch-handle-width);height:var(--mdc-switch-handle-height);border-radius:var(--mdc-switch-handle-shape, var(--mat-app-corner-full))}[dir=rtl] .mdc-switch__handle{left:auto;right:0}.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle{width:var(--mat-switch-unselected-handle-size);height:var(--mat-switch-unselected-handle-size);margin:var(--mat-switch-unselected-handle-horizontal-margin)}.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle:has(.mdc-switch__icons){margin:var(--mat-switch-unselected-with-icon-handle-horizontal-margin)}.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle{width:var(--mat-switch-selected-handle-size);height:var(--mat-switch-selected-handle-size);margin:var(--mat-switch-selected-handle-horizontal-margin)}.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle:has(.mdc-switch__icons){margin:var(--mat-switch-selected-with-icon-handle-horizontal-margin)}.mat-mdc-slide-toggle .mdc-switch__handle:has(.mdc-switch__icons){width:var(--mat-switch-with-icon-handle-size);height:var(--mat-switch-with-icon-handle-size)}.mat-mdc-slide-toggle .mdc-switch:active:not(.mdc-switch--disabled) .mdc-switch__handle{width:var(--mat-switch-pressed-handle-size);height:var(--mat-switch-pressed-handle-size)}.mat-mdc-slide-toggle .mdc-switch--selected:active:not(.mdc-switch--disabled) .mdc-switch__handle{margin:var(--mat-switch-selected-pressed-handle-horizontal-margin)}.mat-mdc-slide-toggle .mdc-switch--unselected:active:not(.mdc-switch--disabled) .mdc-switch__handle{margin:var(--mat-switch-unselected-pressed-handle-horizontal-margin)}.mdc-switch--disabled.mdc-switch--selected .mdc-switch__handle::after{opacity:var(--mat-switch-disabled-selected-handle-opacity)}.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__handle::after{opacity:var(--mat-switch-disabled-unselected-handle-opacity)}.mdc-switch__handle::before,.mdc-switch__handle::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";width:100%;height:100%;left:0;position:absolute;top:0;transition:background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1),border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);z-index:-1}.cdk-high-contrast-active .mdc-switch__handle::before,.cdk-high-contrast-active .mdc-switch__handle::after{border-color:currentColor}.mdc-switch--selected:enabled .mdc-switch__handle::after{background:var(--mdc-switch-selected-handle-color, var(--mat-app-on-primary))}.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-selected-hover-handle-color, var(--mat-app-primary-container))}.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-selected-focus-handle-color, var(--mat-app-primary-container))}.mdc-switch--selected:enabled:active .mdc-switch__handle::after{background:var(--mdc-switch-selected-pressed-handle-color, var(--mat-app-primary-container))}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:hover:not(:focus):not(:active) .mdc-switch__handle::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:focus:not(:active) .mdc-switch__handle::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:active .mdc-switch__handle::after,.mdc-switch--selected.mdc-switch--disabled .mdc-switch__handle::after{background:var(--mdc-switch-disabled-selected-handle-color, var(--mat-app-surface))}.mdc-switch--unselected:enabled .mdc-switch__handle::after{background:var(--mdc-switch-unselected-handle-color, var(--mat-app-outline))}.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-unselected-hover-handle-color, var(--mat-app-on-surface-variant))}.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-unselected-focus-handle-color, var(--mat-app-on-surface-variant))}.mdc-switch--unselected:enabled:active .mdc-switch__handle::after{background:var(--mdc-switch-unselected-pressed-handle-color, var(--mat-app-on-surface-variant))}.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__handle::after{background:var(--mdc-switch-disabled-unselected-handle-color, var(--mat-app-on-surface))}.mdc-switch__handle::before{background:var(--mdc-switch-handle-surface-color)}.mdc-switch__shadow{border-radius:inherit;bottom:0;left:0;position:absolute;right:0;top:0}.mdc-switch:enabled .mdc-switch__shadow{box-shadow:var(--mdc-switch-handle-elevation-shadow)}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__shadow,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__shadow,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__shadow,.mdc-switch.mdc-switch--disabled .mdc-switch__shadow{box-shadow:var(--mdc-switch-disabled-handle-elevation-shadow)}.mdc-switch__ripple{left:50%;position:absolute;top:50%;transform:translate(-50%, -50%);z-index:-1;width:var(--mdc-switch-state-layer-size);height:var(--mdc-switch-state-layer-size)}.mdc-switch__ripple::after{content:"";opacity:0}.mdc-switch--disabled .mdc-switch__ripple::after{display:none}.mat-mdc-slide-toggle-disabled-interactive .mdc-switch__ripple::after{display:block}.mdc-switch:hover .mdc-switch__ripple::after{opacity:.04;transition:75ms opacity cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mdc-switch .mdc-switch__ripple::after{opacity:.12}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:focus .mdc-switch__ripple::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:active .mdc-switch__ripple::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:hover:not(:focus) .mdc-switch__ripple::after,.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background:var(--mdc-switch-unselected-hover-state-layer-color, var(--mat-app-on-surface))}.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after{background:var(--mdc-switch-unselected-focus-state-layer-color, var(--mat-app-on-surface))}.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after{background:var(--mdc-switch-unselected-pressed-state-layer-color, var(--mat-app-on-surface));opacity:var(--mdc-switch-unselected-pressed-state-layer-opacity, var(--mat-app-pressed-state-layer-opacity));transition:opacity 75ms linear}.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background:var(--mdc-switch-selected-hover-state-layer-color, var(--mat-app-primary))}.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after{background:var(--mdc-switch-selected-focus-state-layer-color, var(--mat-app-primary))}.mdc-switch--selected:enabled:active .mdc-switch__ripple::after{background:var(--mdc-switch-selected-pressed-state-layer-color, var(--mat-app-primary));opacity:var(--mdc-switch-selected-pressed-state-layer-opacity, var(--mat-app-pressed-state-layer-opacity));transition:opacity 75ms linear}.mdc-switch__icons{position:relative;height:100%;width:100%;z-index:1}.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__icons{opacity:var(--mdc-switch-disabled-unselected-icon-opacity)}.mdc-switch--disabled.mdc-switch--selected .mdc-switch__icons{opacity:var(--mdc-switch-disabled-selected-icon-opacity)}.mdc-switch__icon{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0;opacity:0;transition:opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-switch--unselected .mdc-switch__icon{width:var(--mdc-switch-unselected-icon-size);height:var(--mdc-switch-unselected-icon-size);fill:var(--mdc-switch-unselected-icon-color, var(--mat-app-surface-variant))}.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__icon{fill:var(--mdc-switch-disabled-unselected-icon-color, var(--mat-app-surface-variant))}.mdc-switch--selected .mdc-switch__icon{width:var(--mdc-switch-selected-icon-size);height:var(--mdc-switch-selected-icon-size);fill:var(--mdc-switch-selected-icon-color, var(--mat-app-on-primary-container))}.mdc-switch--selected.mdc-switch--disabled .mdc-switch__icon{fill:var(--mdc-switch-disabled-selected-icon-color, var(--mat-app-on-surface))}.mdc-switch--selected .mdc-switch__icon--on,.mdc-switch--unselected .mdc-switch__icon--off{opacity:1;transition:opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle{-webkit-user-select:none;user-select:none;display:inline-block;-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,.mat-mdc-slide-toggle .mdc-switch__ripple::after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:50%;pointer-events:none}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty){transform:translateZ(0)}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-mdc-focus-indicator::before{content:""}.mat-mdc-slide-toggle .mat-internal-form-field{color:var(--mat-switch-label-text-color, var(--mat-app-on-surface));font-family:var(--mat-switch-label-text-font, var(--mat-app-body-medium-font));line-height:var(--mat-switch-label-text-line-height, var(--mat-app-body-medium-line-height));font-size:var(--mat-switch-label-text-size, var(--mat-app-body-medium-size));letter-spacing:var(--mat-switch-label-text-tracking, var(--mat-app-body-medium-tracking));font-weight:var(--mat-switch-label-text-weight, var(--mat-app-body-medium-weight))}.mat-mdc-slide-toggle .mat-ripple-element{opacity:.12}.mat-mdc-slide-toggle .mat-mdc-focus-indicator::before{border-radius:50%}.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after{transition:none}.mat-mdc-slide-toggle .mdc-switch:enabled+.mdc-label{cursor:pointer}.mat-mdc-slide-toggle .mdc-switch--disabled+label{color:var(--mdc-switch-disabled-label-text-color)}']
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: FocusMonitor
  }, {
    type: ChangeDetectorRef
  }, {
    type: void 0,
    decorators: [{
      type: Attribute,
      args: ["tabindex"]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [ANIMATION_MODULE_TYPE]
    }]
  }], {
    _switchElement: [{
      type: ViewChild,
      args: ["switch"]
    }],
    name: [{
      type: Input
    }],
    id: [{
      type: Input
    }],
    labelPosition: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input,
      args: ["aria-label"]
    }],
    ariaLabelledby: [{
      type: Input,
      args: ["aria-labelledby"]
    }],
    ariaDescribedby: [{
      type: Input,
      args: ["aria-describedby"]
    }],
    required: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    color: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disableRipple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    tabIndex: [{
      type: Input,
      args: [{
        transform: (value) => value == null ? 0 : numberAttribute(value)
      }]
    }],
    checked: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    hideIcon: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disabledInteractive: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    change: [{
      type: Output
    }],
    toggleChange: [{
      type: Output
    }]
  });
})();
var MAT_SLIDE_TOGGLE_REQUIRED_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MatSlideToggleRequiredValidator),
  multi: true
};
var MatSlideToggleRequiredValidator = class _MatSlideToggleRequiredValidator extends CheckboxRequiredValidator {
  static {
    this.\u0275fac = /* @__PURE__ */ (() => {
      let \u0275MatSlideToggleRequiredValidator_BaseFactory;
      return function MatSlideToggleRequiredValidator_Factory(__ngFactoryType__) {
        return (\u0275MatSlideToggleRequiredValidator_BaseFactory || (\u0275MatSlideToggleRequiredValidator_BaseFactory = \u0275\u0275getInheritedFactory(_MatSlideToggleRequiredValidator)))(__ngFactoryType__ || _MatSlideToggleRequiredValidator);
      };
    })();
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatSlideToggleRequiredValidator,
      selectors: [["mat-slide-toggle", "required", "", "formControlName", ""], ["mat-slide-toggle", "required", "", "formControl", ""], ["mat-slide-toggle", "required", "", "ngModel", ""]],
      standalone: true,
      features: [\u0275\u0275ProvidersFeature([MAT_SLIDE_TOGGLE_REQUIRED_VALIDATOR]), \u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSlideToggleRequiredValidator, [{
    type: Directive,
    args: [{
      selector: `mat-slide-toggle[required][formControlName],
             mat-slide-toggle[required][formControl], mat-slide-toggle[required][ngModel]`,
      providers: [MAT_SLIDE_TOGGLE_REQUIRED_VALIDATOR],
      standalone: true
    }]
  }], null, null);
})();
var _MatSlideToggleRequiredValidatorModule = class __MatSlideToggleRequiredValidatorModule {
  static {
    this.\u0275fac = function _MatSlideToggleRequiredValidatorModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || __MatSlideToggleRequiredValidatorModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: __MatSlideToggleRequiredValidatorModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_MatSlideToggleRequiredValidatorModule, [{
    type: NgModule,
    args: [{
      imports: [MatSlideToggleRequiredValidator],
      exports: [MatSlideToggleRequiredValidator]
    }]
  }], null, null);
})();
var MatSlideToggleModule = class _MatSlideToggleModule {
  static {
    this.\u0275fac = function MatSlideToggleModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatSlideToggleModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _MatSlideToggleModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
      imports: [MatSlideToggle, MatCommonModule, MatCommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSlideToggleModule, [{
    type: NgModule,
    args: [{
      imports: [MatSlideToggle, MatCommonModule],
      exports: [MatSlideToggle, MatCommonModule]
    }]
  }], null, null);
})();

// src/app/features/revendeur/gestion-catalogue/gestion-catalogue.component.ts
var _forTrack0 = ($index, $item) => $item.value;
function GestionCatalogueComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "span", 9);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "app-stock-badge", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.revendeur().nom);
    \u0275\u0275advance();
    \u0275\u0275property("stockStatus", ctx_r0.revendeur().stockStatus);
  }
}
function GestionCatalogueComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "mat-spinner", 11);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Chargement du catalogue...");
    \u0275\u0275elementEnd()();
  }
}
function GestionCatalogueComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "mat-icon");
    \u0275\u0275text(2, "store_mall_directory");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "Aucun d\xE9p\xF4t enregistr\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Vous devez d'abord inscrire votre d\xE9p\xF4t avant de g\xE9rer votre catalogue.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 12);
    \u0275\u0275text(8, " Inscrire mon d\xE9p\xF4t ");
    \u0275\u0275elementEnd()();
  }
}
function GestionCatalogueComponent_Conditional_12_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "mat-icon");
    \u0275\u0275text(2, "workspace_premium");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "strong");
    \u0275\u0275text(5, "Abonnement requis pour publier votre catalogue");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Souscrivez \xE0 un plan Standard ou Premium pour rendre vos produits visibles aux clients.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "a", 35);
    \u0275\u0275text(9, " Voir les offres ");
    \u0275\u0275elementEnd()();
  }
}
function GestionCatalogueComponent_Conditional_12_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const marque_r3 = ctx.$implicit;
    \u0275\u0275property("value", marque_r3.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(marque_r3.label);
  }
}
function GestionCatalogueComponent_Conditional_12_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Marque obligatoire");
    \u0275\u0275elementEnd();
  }
}
function GestionCatalogueComponent_Conditional_12_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const format_r4 = ctx.$implicit;
    \u0275\u0275property("value", format_r4.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(format_r4.label);
  }
}
function GestionCatalogueComponent_Conditional_12_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Format obligatoire");
    \u0275\u0275elementEnd();
  }
}
function GestionCatalogueComponent_Conditional_12_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Prix invalide");
    \u0275\u0275elementEnd();
  }
}
function GestionCatalogueComponent_Conditional_12_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Quantit\xE9 invalide");
    \u0275\u0275elementEnd();
  }
}
function GestionCatalogueComponent_Conditional_12_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 28);
  }
}
function GestionCatalogueComponent_Conditional_12_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.produitEnEdition() ? "save" : "add");
  }
}
function GestionCatalogueComponent_Conditional_12_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 36);
    \u0275\u0275listener("click", function GestionCatalogueComponent_Conditional_12_Conditional_39_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.annulerEdition());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "close");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Annuler ");
    \u0275\u0275elementEnd();
  }
}
function GestionCatalogueComponent_Conditional_12_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "mat-icon");
    \u0275\u0275text(2, "inventory_2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Aucun produit dans votre catalogue. Ajoutez-en un ci-dessus.");
    \u0275\u0275elementEnd()();
  }
}
function GestionCatalogueComponent_Conditional_12_Conditional_47_th_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 48);
    \u0275\u0275text(1, "Marque");
    \u0275\u0275elementEnd();
  }
}
function GestionCatalogueComponent_Conditional_12_Conditional_47_td_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 49)(1, "span", 50);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r6.marqueLibelle);
  }
}
function GestionCatalogueComponent_Conditional_12_Conditional_47_th_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 48);
    \u0275\u0275text(1, "Format");
    \u0275\u0275elementEnd();
  }
}
function GestionCatalogueComponent_Conditional_12_Conditional_47_td_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 49)(1, "span", 51);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r7 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r7.formatLibelle);
  }
}
function GestionCatalogueComponent_Conditional_12_Conditional_47_th_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 48);
    \u0275\u0275text(1, "Prix");
    \u0275\u0275elementEnd();
  }
}
function GestionCatalogueComponent_Conditional_12_Conditional_47_td_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 49)(1, "span", 52);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r8 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(3, 1, p_r8.prixUnitaire, "1.0-0"), " FCFA");
  }
}
function GestionCatalogueComponent_Conditional_12_Conditional_47_th_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 48);
    \u0275\u0275text(1, "Quantit\xE9");
    \u0275\u0275elementEnd();
  }
}
function GestionCatalogueComponent_Conditional_12_Conditional_47_td_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 49)(1, "span", 53);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classProp("epuise", p_r9.quantiteDisponible === 0)("faible", p_r9.quantiteDisponible > 0 && p_r9.quantiteDisponible <= 3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r9.quantiteDisponible, " ");
  }
}
function GestionCatalogueComponent_Conditional_12_Conditional_47_th_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 48);
    \u0275\u0275text(1, "Statut");
    \u0275\u0275elementEnd();
  }
}
function GestionCatalogueComponent_Conditional_12_Conditional_47_td_16_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 54);
    \u0275\u0275text(1, "Disponible");
    \u0275\u0275elementEnd();
  }
}
function GestionCatalogueComponent_Conditional_12_Conditional_47_td_16_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 55);
    \u0275\u0275text(1, "Masqu\xE9");
    \u0275\u0275elementEnd();
  }
}
function GestionCatalogueComponent_Conditional_12_Conditional_47_td_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 49);
    \u0275\u0275template(1, GestionCatalogueComponent_Conditional_12_Conditional_47_td_16_Conditional_1_Template, 2, 0, "span", 54)(2, GestionCatalogueComponent_Conditional_12_Conditional_47_td_16_Conditional_2_Template, 2, 0, "span", 55);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r10 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(p_r10.disponible ? 1 : 2);
  }
}
function GestionCatalogueComponent_Conditional_12_Conditional_47_th_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "th", 48);
  }
}
function GestionCatalogueComponent_Conditional_12_Conditional_47_td_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 49)(1, "div", 56)(2, "button", 57);
    \u0275\u0275listener("click", function GestionCatalogueComponent_Conditional_12_Conditional_47_td_19_Template_button_click_2_listener() {
      const p_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.editer(p_r12));
    });
    \u0275\u0275elementStart(3, "mat-icon");
    \u0275\u0275text(4, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 58);
    \u0275\u0275listener("click", function GestionCatalogueComponent_Conditional_12_Conditional_47_td_19_Template_button_click_5_listener() {
      const p_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.confirmerSuppression(p_r12));
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "delete");
    \u0275\u0275elementEnd()()()();
  }
}
function GestionCatalogueComponent_Conditional_12_Conditional_47_tr_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 59);
  }
}
function GestionCatalogueComponent_Conditional_12_Conditional_47_tr_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 60);
  }
  if (rf & 2) {
    const row_r13 = ctx.$implicit;
    \u0275\u0275classProp("row-indispo", !row_r13.disponible);
  }
}
function GestionCatalogueComponent_Conditional_12_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "table", 37);
    \u0275\u0275elementContainerStart(2, 38);
    \u0275\u0275template(3, GestionCatalogueComponent_Conditional_12_Conditional_47_th_3_Template, 2, 0, "th", 39)(4, GestionCatalogueComponent_Conditional_12_Conditional_47_td_4_Template, 3, 1, "td", 40);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(5, 41);
    \u0275\u0275template(6, GestionCatalogueComponent_Conditional_12_Conditional_47_th_6_Template, 2, 0, "th", 39)(7, GestionCatalogueComponent_Conditional_12_Conditional_47_td_7_Template, 3, 1, "td", 40);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(8, 42);
    \u0275\u0275template(9, GestionCatalogueComponent_Conditional_12_Conditional_47_th_9_Template, 2, 0, "th", 39)(10, GestionCatalogueComponent_Conditional_12_Conditional_47_td_10_Template, 4, 4, "td", 40);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(11, 43);
    \u0275\u0275template(12, GestionCatalogueComponent_Conditional_12_Conditional_47_th_12_Template, 2, 0, "th", 39)(13, GestionCatalogueComponent_Conditional_12_Conditional_47_td_13_Template, 3, 5, "td", 40);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(14, 44);
    \u0275\u0275template(15, GestionCatalogueComponent_Conditional_12_Conditional_47_th_15_Template, 2, 0, "th", 39)(16, GestionCatalogueComponent_Conditional_12_Conditional_47_td_16_Template, 3, 1, "td", 40);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(17, 45);
    \u0275\u0275template(18, GestionCatalogueComponent_Conditional_12_Conditional_47_th_18_Template, 1, 0, "th", 39)(19, GestionCatalogueComponent_Conditional_12_Conditional_47_td_19_Template, 8, 0, "td", 40);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(20, GestionCatalogueComponent_Conditional_12_Conditional_47_tr_20_Template, 1, 0, "tr", 46)(21, GestionCatalogueComponent_Conditional_12_Conditional_47_tr_21_Template, 1, 2, "tr", 47);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("dataSource", ctx_r0.produits());
    \u0275\u0275advance(19);
    \u0275\u0275property("matHeaderRowDef", ctx_r0.colonnes);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r0.colonnes);
  }
}
function GestionCatalogueComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275template(0, GestionCatalogueComponent_Conditional_12_Conditional_0_Template, 10, 0, "div", 13);
    \u0275\u0275elementStart(1, "div", 14)(2, "h2", 15);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "form", 16);
    \u0275\u0275listener("ngSubmit", function GestionCatalogueComponent_Conditional_12_Template_form_ngSubmit_4_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.soumettre());
    });
    \u0275\u0275elementStart(5, "mat-form-field", 17)(6, "mat-label");
    \u0275\u0275text(7, "Marque");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "mat-select", 18);
    \u0275\u0275repeaterCreate(9, GestionCatalogueComponent_Conditional_12_For_10_Template, 2, 2, "mat-option", 19, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, GestionCatalogueComponent_Conditional_12_Conditional_11_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "mat-form-field", 17)(13, "mat-label");
    \u0275\u0275text(14, "Format");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "mat-select", 20);
    \u0275\u0275repeaterCreate(16, GestionCatalogueComponent_Conditional_12_For_17_Template, 2, 2, "mat-option", 19, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275template(18, GestionCatalogueComponent_Conditional_12_Conditional_18_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "mat-form-field", 17)(20, "mat-label");
    \u0275\u0275text(21, "Prix unitaire (FCFA)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(22, "input", 21);
    \u0275\u0275elementStart(23, "span", 22);
    \u0275\u0275text(24, "FCFA");
    \u0275\u0275elementEnd();
    \u0275\u0275template(25, GestionCatalogueComponent_Conditional_12_Conditional_25_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "mat-form-field", 17)(27, "mat-label");
    \u0275\u0275text(28, "Quantit\xE9 disponible");
    \u0275\u0275elementEnd();
    \u0275\u0275element(29, "input", 23);
    \u0275\u0275template(30, GestionCatalogueComponent_Conditional_12_Conditional_30_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 24)(32, "mat-slide-toggle", 25);
    \u0275\u0275text(33, " Disponible \xE0 la vente ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 26)(35, "button", 27);
    \u0275\u0275template(36, GestionCatalogueComponent_Conditional_12_Conditional_36_Template, 1, 0, "mat-spinner", 28)(37, GestionCatalogueComponent_Conditional_12_Conditional_37_Template, 2, 1, "mat-icon");
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275template(39, GestionCatalogueComponent_Conditional_12_Conditional_39_Template, 4, 0, "button", 29);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(40, "div", 30)(41, "div", 31)(42, "h2", 15);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "p", 32);
    \u0275\u0275text(45, " Le stock global se met \xE0 jour automatiquement selon les quantit\xE9s. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(46, GestionCatalogueComponent_Conditional_12_Conditional_46_Template, 5, 0, "div", 33)(47, GestionCatalogueComponent_Conditional_12_Conditional_47_Template, 22, 3, "div", 34);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_5_0;
    let tmp_7_0;
    let tmp_8_0;
    let tmp_9_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(!ctx_r0.abonnementActif() ? 0 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.produitEnEdition() ? "Modifier le produit" : "Ajouter un produit", " ");
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r0.formulaire);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r0.marquesOptions);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_5_0 = ctx_r0.formulaire.get("marque")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx_r0.formulaire.get("marque")) == null ? null : tmp_5_0.touched) ? 11 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r0.formatsOptions);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_7_0 = ctx_r0.formulaire.get("format")) == null ? null : tmp_7_0.invalid) && ((tmp_7_0 = ctx_r0.formulaire.get("format")) == null ? null : tmp_7_0.touched) ? 18 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(((tmp_8_0 = ctx_r0.formulaire.get("prixUnitaire")) == null ? null : tmp_8_0.invalid) && ((tmp_8_0 = ctx_r0.formulaire.get("prixUnitaire")) == null ? null : tmp_8_0.touched) ? 25 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(((tmp_9_0 = ctx_r0.formulaire.get("quantiteDisponible")) == null ? null : tmp_9_0.invalid) && ((tmp_9_0 = ctx_r0.formulaire.get("quantiteDisponible")) == null ? null : tmp_9_0.touched) ? 30 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r0.formulaire.invalid || ctx_r0.envoi() || !ctx_r0.abonnementActif());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.envoi() ? 36 : 37);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.produitEnEdition() ? "Enregistrer" : "Ajouter au catalogue", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.produitEnEdition() ? 39 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" Catalogue (", ctx_r0.produits().length, " produit", ctx_r0.produits().length > 1 ? "s" : "", ") ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.produits().length === 0 ? 46 : 47);
  }
}
var GestionCatalogueComponent = class _GestionCatalogueComponent {
  constructor() {
    this.revendeurService = inject(RevendeurService);
    this.authService = inject(AuthService);
    this.subscriptionService = inject(SubscriptionService);
    this.fb = inject(FormBuilder);
    this.snackBar = inject(MatSnackBar);
    this.revendeur = signal(null);
    this.produits = signal([]);
    this.chargement = signal(true);
    this.envoi = signal(false);
    this.produitEnEdition = signal(null);
    this.abonnementActif = signal(false);
    this.colonnes = ["marque", "format", "prix", "quantite", "disponible", "actions"];
    this.marquesOptions = Object.values(MarqueGaz).map((v) => ({
      value: v,
      label: MARQUES_LABELS[v]
    }));
    this.formatsOptions = Object.values(FormatBouteille).map((v) => ({
      value: v,
      label: FORMATS_LABELS[v]
    }));
    this.formulaire = this.fb.group({
      marque: [null, Validators.required],
      format: [null, Validators.required],
      prixUnitaire: [0, [Validators.required, Validators.min(0)]],
      quantiteDisponible: [0, [Validators.required, Validators.min(0)]],
      disponible: [true]
    });
  }
  ngOnInit() {
    const user = this.authService.currentUser();
    if (!user)
      return;
    this.revendeurService.loadAll();
    this.revendeurService.getRevendeurByUserId().subscribe({
      next: (r) => {
        this.revendeur.set(r);
        this.chargerAbonnement();
        this.chargerCatalogue(r.id);
      },
      error: () => {
        this.chargement.set(false);
      }
    });
  }
  chargerCatalogue(revendeurId) {
    this.revendeurService.getCatalogue(revendeurId).subscribe({
      next: (produits) => {
        this.produits.set(produits);
        this.chargement.set(false);
      },
      error: () => {
        this.snackBar.open("Erreur lors du chargement du catalogue", "Fermer", { duration: 4e3 });
        this.chargement.set(false);
      }
    });
  }
  chargerAbonnement() {
    this.subscriptionService.getCurrent().subscribe({
      next: (sub) => {
        this.abonnementActif.set(Boolean(sub && sub.planType === "REVENDEUR" && sub.statut === "ACTIVE"));
      },
      error: () => {
        this.abonnementActif.set(false);
      }
    });
  }
  soumettre() {
    if (this.formulaire.invalid || !this.revendeur())
      return;
    this.envoi.set(true);
    const dto = this.formulaire.value;
    const revendeurId = this.revendeur().id;
    const enEdition = this.produitEnEdition();
    const appel$ = enEdition ? this.revendeurService.modifierProduit(revendeurId, enEdition.id, dto) : this.revendeurService.ajouterProduit(revendeurId, dto);
    appel$.subscribe({
      next: (produit) => {
        if (enEdition) {
          this.produits.update((liste) => liste.map((p) => p.id === produit.id ? produit : p));
          this.snackBar.open("Produit modifi\xE9", "OK", { duration: 3e3 });
        } else {
          this.produits.update((liste) => [...liste, produit]);
          this.snackBar.open("Produit ajout\xE9 au catalogue", "OK", { duration: 3e3 });
        }
        this.revendeurService.getById(revendeurId).subscribe((r) => this.revendeur.set(r));
        this.resetFormulaire();
        this.envoi.set(false);
      },
      error: (err) => {
        this.snackBar.open(err.message, "Fermer", { duration: 5e3 });
        this.envoi.set(false);
      }
    });
  }
  editer(produit) {
    this.produitEnEdition.set(produit);
    this.formulaire.patchValue({
      marque: produit.marque,
      format: produit.format,
      prixUnitaire: produit.prixUnitaire,
      quantiteDisponible: produit.quantiteDisponible,
      disponible: produit.disponible
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  annulerEdition() {
    this.produitEnEdition.set(null);
    this.resetFormulaire();
  }
  confirmerSuppression(produit) {
    const confirmMsg = `Supprimer ${produit.marqueLibelle} ${produit.formatLibelle} ?`;
    if (!confirm(confirmMsg))
      return;
    this.revendeurService.supprimerProduit(this.revendeur().id, produit.id).subscribe({
      next: () => {
        this.produits.update((liste) => liste.filter((p) => p.id !== produit.id));
        this.revendeurService.getById(this.revendeur().id).subscribe((r) => this.revendeur.set(r));
        this.snackBar.open("Produit supprim\xE9", "OK", { duration: 3e3 });
      },
      error: (err) => {
        this.snackBar.open(err.message, "Fermer", { duration: 4e3 });
      }
    });
  }
  resetFormulaire() {
    this.formulaire.reset({ disponible: true, prixUnitaire: 0, quantiteDisponible: 0 });
    this.produitEnEdition.set(null);
  }
  static {
    this.\u0275fac = function GestionCatalogueComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _GestionCatalogueComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GestionCatalogueComponent, selectors: [["app-gestion-catalogue"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 13, vars: 4, consts: [[1, "page-catalogue"], [1, "page-header"], [1, "header-contenu"], [1, "page-titre"], [1, "page-sous-titre"], [1, "header-info-depot"], [1, "page-body"], [1, "etat-chargement"], [1, "etat-vide"], [1, "depot-nom"], [3, "stockStatus"], ["diameter", "40"], ["mat-raised-button", "", "routerLink", "/revendeur/inscription", 1, "btn-inscrire"], [1, "banniere-abonnement"], [1, "section-formulaire"], [1, "section-titre"], [1, "formulaire-produit", 3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "champ"], ["formControlName", "marque"], [3, "value"], ["formControlName", "format"], ["matInput", "", "type", "number", "formControlName", "prixUnitaire", "min", "0", "placeholder", "Ex: 5500"], ["matSuffix", ""], ["matInput", "", "type", "number", "formControlName", "quantiteDisponible", "min", "0", "placeholder", "Ex: 20"], [1, "champ", "champ-toggle"], ["formControlName", "disponible", "color", "primary"], [1, "form-actions"], ["mat-raised-button", "", "type", "submit", 1, "btn-valider", 3, "disabled"], ["diameter", "18"], ["mat-stroked-button", "", "type", "button", 1, "btn-annuler"], [1, "section-table"], [1, "table-header"], [1, "table-aide"], [1, "table-vide"], [1, "table-wrapper"], ["mat-raised-button", "", "routerLink", "/revendeur/abonnement", 1, "btn-souscrire"], ["mat-stroked-button", "", "type", "button", 1, "btn-annuler", 3, "click"], ["mat-table", "", 1, "table-catalogue", 3, "dataSource"], ["matColumnDef", "marque"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "format"], ["matColumnDef", "prix"], ["matColumnDef", "quantite"], ["matColumnDef", "disponible"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 3, "row-indispo", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], [1, "badge-marque"], [1, "badge-format"], [1, "prix-valeur"], [1, "quantite-badge"], [1, "statut-dispo"], [1, "statut-indispo"], [1, "actions-cellule"], ["mat-icon-button", "", "matTooltip", "Modifier", 1, "btn-edit", 3, "click"], ["mat-icon-button", "", "matTooltip", "Supprimer", 1, "btn-delete", 3, "click"], ["mat-header-row", ""], ["mat-row", ""]], template: function GestionCatalogueComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div")(4, "h1", 3);
        \u0275\u0275text(5, "Mon Catalogue");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p", 4);
        \u0275\u0275text(7, "G\xE9rez vos prix et stocks par marque et format");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(8, GestionCatalogueComponent_Conditional_8_Template, 4, 2, "div", 5);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "div", 6);
        \u0275\u0275template(10, GestionCatalogueComponent_Conditional_10_Template, 4, 0, "div", 7)(11, GestionCatalogueComponent_Conditional_11_Template, 9, 0, "div", 8)(12, GestionCatalogueComponent_Conditional_12_Template, 48, 14);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275conditional(ctx.revendeur() ? 8 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.chargement() ? 10 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.chargement() && !ctx.revendeur() ? 11 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.chargement() && ctx.revendeur() ? 12 : -1);
      }
    }, dependencies: [
      CommonModule,
      DecimalPipe,
      ReactiveFormsModule,
      \u0275NgNoValidate,
      DefaultValueAccessor,
      NumberValueAccessor,
      NgControlStatus,
      NgControlStatusGroup,
      MinValidator,
      FormGroupDirective,
      FormControlName,
      MatTableModule,
      MatTable,
      MatHeaderCellDef,
      MatHeaderRowDef,
      MatColumnDef,
      MatCellDef,
      MatRowDef,
      MatHeaderCell,
      MatCell,
      MatHeaderRow,
      MatRow,
      MatButtonModule,
      MatAnchor,
      MatButton,
      MatIconButton,
      MatIconModule,
      MatIcon,
      MatFormFieldModule,
      MatFormField,
      MatLabel,
      MatError,
      MatSuffix,
      MatInputModule,
      MatInput,
      MatSelectModule,
      MatSelect,
      MatOption,
      MatSlideToggleModule,
      MatSlideToggle,
      MatSnackBarModule,
      MatProgressSpinnerModule,
      MatProgressSpinner,
      MatTooltipModule,
      MatTooltip,
      StockBadgeComponent,
      RouterLink
    ], styles: ['\n\n.page-catalogue[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 64px);\n  background-color: var(--color-bg);\n}\n.page-header[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n  padding: 28px 32px;\n}\n.header-contenu[_ngcontent-%COMP%] {\n  max-width: 1100px;\n  margin: 0 auto;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.page-titre[_ngcontent-%COMP%] {\n  font-family: "Montserrat", sans-serif;\n  font-size: 1.7rem;\n  color: #FFFFFF;\n  margin-bottom: 4px;\n}\n.page-sous-titre[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: rgba(255, 255, 255, 0.7);\n  font-family: "Montserrat", sans-serif;\n}\n.header-info-depot[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.depot-nom[_ngcontent-%COMP%] {\n  font-family: "Montserrat", sans-serif;\n  font-weight: 700;\n  color: rgba(255, 255, 255, 0.9);\n  font-size: 0.9rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.page-body[_ngcontent-%COMP%] {\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 28px 24px;\n}\n.etat-chargement[_ngcontent-%COMP%], \n.etat-vide[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n  padding: 64px 16px;\n  text-align: center;\n  color: var(--color-text-muted);\n  mat-icon {\n    font-size: 3.5rem;\n    height: 3.5rem;\n    width: 3.5rem;\n    color: var(--color-surface-3);\n  }\n  h2 {\n    font-family: "Montserrat", sans-serif;\n    font-size: 1.2rem;\n    color: var(--color-text);\n  }\n  p {\n    font-size: 0.9rem;\n  }\n}\n.btn-inscrire[_ngcontent-%COMP%] {\n  background-color: var(--color-accent) !important;\n  color: white !important;\n  border-radius: var(--radius-sm) !important;\n  font-weight: 700 !important;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.section-titre[_ngcontent-%COMP%] {\n  font-family: "Montserrat", sans-serif;\n  font-size: 1.1rem;\n  color: var(--color-text);\n  margin-bottom: 16px;\n}\n.section-formulaire[_ngcontent-%COMP%] {\n  background-color: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  padding: 24px;\n  margin-bottom: 24px;\n}\n.formulaire-produit[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  align-items: flex-start;\n}\n.champ[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 180px;\n  ::ng-deep .mdc-notched-outline__leading,\n  ::ng-deep .mdc-notched-outline__notch,\n  ::ng-deep .mdc-notched-outline__trailing {\n  }\n}\n.champ-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding-top: 8px;\n  min-width: 180px;\n  ::ng-deep .mat-slide-toggle-label {\n    font-family: "Montserrat", sans-serif;\n    font-size: 0.88rem;\n    color: var(--color-text);\n  }\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  padding-top: 8px;\n  flex-wrap: wrap;\n}\n.btn-valider[_ngcontent-%COMP%] {\n  background-color: var(--color-accent) !important;\n  color: white !important;\n  border-radius: var(--radius-sm) !important;\n  font-weight: 700 !important;\n  font-family: "Montserrat", sans-serif !important;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  height: 44px;\n  &:disabled {\n    background-color: var(--color-surface-3) !important;\n    color: var(--color-text-muted) !important;\n  }\n  mat-spinner {\n    margin-right: 6px;\n  }\n}\n.btn-annuler[_ngcontent-%COMP%] {\n  border-color: var(--color-border) !important;\n  color: var(--color-text-muted) !important;\n  border-radius: var(--radius-sm) !important;\n  height: 44px;\n}\n.section-table[_ngcontent-%COMP%] {\n  background-color: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  overflow: hidden;\n}\n.table-header[_ngcontent-%COMP%] {\n  padding: 20px 24px 0;\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.banniere-abonnement[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 16px 20px;\n  background: color-mix(in srgb, var(--color-accent) 10%, transparent);\n  border: 1px solid var(--color-accent);\n  border-radius: var(--radius-sm);\n  margin-bottom: 24px;\n  flex-wrap: wrap;\n  mat-icon {\n    color: var(--color-accent-dark);\n    font-size: 2rem;\n    height: 2rem;\n    width: 2rem;\n    flex-shrink: 0;\n  }\n  div {\n    flex: 1;\n    strong {\n      display: block;\n      color: var(--color-text);\n      font-size: 0.95rem;\n    }\n    p {\n      margin: 4px 0 0;\n      font-size: 0.82rem;\n      color: var(--color-text-muted);\n    }\n  }\n  .btn-souscrire {\n    background-color: var(--color-accent) !important;\n    color: #1a1a00 !important;\n    font-weight: 700 !important;\n    white-space: nowrap;\n  }\n}\n.table-aide[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: var(--color-text-muted);\n  font-family: "Montserrat", sans-serif;\n}\n.table-vide[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  padding: 48px 16px;\n  color: var(--color-text-muted);\n  text-align: center;\n  mat-icon {\n    font-size: 3rem;\n    height: 3rem;\n    width: 3rem;\n    color: var(--color-surface-3);\n  }\n  p {\n    font-size: 0.88rem;\n  }\n}\n.table-wrapper[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.table-catalogue[_ngcontent-%COMP%] {\n  width: 100%;\n  font-family: "Montserrat", sans-serif;\n  ::ng-deep .mat-mdc-header-cell {\n    font-family: "Montserrat", sans-serif;\n    font-weight: 700;\n    font-size: 0.75rem;\n    text-transform: uppercase;\n    letter-spacing: 0.06em;\n    color: var(--color-text-muted);\n    background-color: var(--color-surface-2);\n    border-bottom: 2px solid var(--color-border);\n  }\n  ::ng-deep .mat-mdc-row {\n    border-bottom: 1px solid var(--color-border);\n    transition: background-color 0.15s;\n    &:hover {\n      background-color: var(--color-surface-2);\n    }\n  }\n  ::ng-deep .mat-mdc-row.row-indispo {\n    opacity: 0.55;\n  }\n}\n.badge-marque[_ngcontent-%COMP%] {\n  background-color: var(--color-primary-light);\n  color: var(--color-primary);\n  padding: 3px 10px;\n  border-radius: var(--radius-sm);\n  font-size: 0.78rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n.badge-format[_ngcontent-%COMP%] {\n  background-color: var(--color-surface-2);\n  color: var(--color-text);\n  padding: 3px 10px;\n  border-radius: var(--radius-sm);\n  font-size: 0.78rem;\n  font-weight: 600;\n}\n.prix-valeur[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--color-text);\n  font-size: 0.9rem;\n}\n.quantite-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px 10px;\n  border-radius: var(--radius-sm);\n  font-weight: 700;\n  font-size: 0.88rem;\n  background-color: var(--color-success-bg);\n  color: var(--color-success);\n  &.epuise {\n    background-color: var(--color-danger-bg);\n    color: var(--color-danger);\n  }\n  &.faible {\n    background-color: var(--color-warning-bg);\n    color: var(--color-accent-dark);\n  }\n}\n.statut-dispo[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: var(--color-success);\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n.statut-indispo[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n.actions-cellule[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 2px;\n}\n.btn-edit[_ngcontent-%COMP%] {\n  color: var(--color-primary) !important;\n}\n.btn-delete[_ngcontent-%COMP%] {\n  color: var(--color-danger) !important;\n}\n@media (max-width: 768px) {\n  .page-header[_ngcontent-%COMP%] {\n    padding: 20px 16px;\n  }\n  .page-body[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .formulaire-produit[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .champ[_ngcontent-%COMP%] {\n    min-width: 100%;\n  }\n  .section-formulaire[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n/*# sourceMappingURL=gestion-catalogue.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GestionCatalogueComponent, { className: "GestionCatalogueComponent", filePath: "src/app/features/revendeur/gestion-catalogue/gestion-catalogue.component.ts", lineNumber: 637 });
})();
export {
  GestionCatalogueComponent
};
//# sourceMappingURL=chunk-S7IHWQSN.js.map
