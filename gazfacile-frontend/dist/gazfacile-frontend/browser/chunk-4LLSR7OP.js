import {
  GeolocationService
} from "./chunk-GHUJAIHG.js";
import {
  RevendeurService
} from "./chunk-XSR74Z7X.js";
import "./chunk-COK4LN6Q.js";
import {
  MatChipsModule
} from "./chunk-U6JHCC4C.js";
import {
  CdkPortalOutlet,
  MatSnackBar,
  MatSnackBarModule,
  PortalModule,
  TemplatePortal
} from "./chunk-OX2RSX6O.js";
import {
  CheckboxRequiredValidator,
  ControlContainer,
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
  MatPrefix,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgControlStatusGroup,
  NumberValueAccessor,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-74R6PC7A.js";
import {
  animate,
  animateChild,
  group,
  query,
  state,
  style,
  transition,
  trigger
} from "./chunk-RNMXRL3Z.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-QXKXMS5C.js";
import "./chunk-AH3PCQNR.js";
import {
  MatAnchor,
  MatButton,
  MatButtonModule
} from "./chunk-UZFV4MWN.js";
import {
  Router,
  RouterLink
} from "./chunk-C43TOPVJ.js";
import {
  ANIMATION_MODULE_TYPE,
  Attribute,
  BidiModule,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  CommonModule,
  Component,
  ContentChild,
  ContentChildren,
  Directionality,
  Directive,
  ENTER,
  ElementRef,
  ErrorStateMatcher,
  EventEmitter,
  FocusKeyManager,
  FocusMonitor,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  MatCommonModule,
  MatIcon,
  MatIconModule,
  MatRipple,
  MatRippleModule,
  NgModule,
  NgTemplateOutlet,
  NgZone,
  Optional,
  Output,
  Platform,
  QueryList,
  SPACE,
  SkipSelf,
  Subject,
  Subscription,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
  ViewEncapsulation$1,
  _MatInternalFormField,
  _getFocusedElementPierceShadowDom,
  booleanAttribute,
  forwardRef,
  hasModifierKey,
  inject,
  map,
  numberAttribute,
  of,
  setClassMetadata,
  signal,
  startWith,
  switchMap,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵInputTransformsFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassMapInterpolate1,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵhostProperty,
  ɵɵinjectAttribute,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-XDS62WGT.js";

// node_modules/@angular/cdk/fesm2022/stepper.mjs
var _c0 = ["*"];
function CdkStep_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
var CdkStepHeader = class _CdkStepHeader {
  constructor(_elementRef) {
    this._elementRef = _elementRef;
  }
  /** Focuses the step header. */
  focus() {
    this._elementRef.nativeElement.focus();
  }
  static {
    this.\u0275fac = function CdkStepHeader_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CdkStepHeader)(\u0275\u0275directiveInject(ElementRef));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _CdkStepHeader,
      selectors: [["", "cdkStepHeader", ""]],
      hostAttrs: ["role", "tab"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkStepHeader, [{
    type: Directive,
    args: [{
      selector: "[cdkStepHeader]",
      host: {
        "role": "tab"
      },
      standalone: true
    }]
  }], () => [{
    type: ElementRef
  }], null);
})();
var CdkStepLabel = class _CdkStepLabel {
  constructor(template) {
    this.template = template;
  }
  static {
    this.\u0275fac = function CdkStepLabel_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CdkStepLabel)(\u0275\u0275directiveInject(TemplateRef));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _CdkStepLabel,
      selectors: [["", "cdkStepLabel", ""]],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkStepLabel, [{
    type: Directive,
    args: [{
      selector: "[cdkStepLabel]",
      standalone: true
    }]
  }], () => [{
    type: TemplateRef
  }], null);
})();
var nextId = 0;
var STEP_STATE = {
  NUMBER: "number",
  EDIT: "edit",
  DONE: "done",
  ERROR: "error"
};
var STEPPER_GLOBAL_OPTIONS = new InjectionToken("STEPPER_GLOBAL_OPTIONS");
var CdkStep = class _CdkStep {
  /** Whether step is marked as completed. */
  get completed() {
    return this._completedOverride == null ? this._getDefaultCompleted() : this._completedOverride;
  }
  set completed(value) {
    this._completedOverride = value;
  }
  _getDefaultCompleted() {
    return this.stepControl ? this.stepControl.valid && this.interacted : this.interacted;
  }
  /** Whether step has an error. */
  get hasError() {
    return this._customError == null ? this._getDefaultError() : this._customError;
  }
  set hasError(value) {
    this._customError = value;
  }
  _getDefaultError() {
    return this.stepControl && this.stepControl.invalid && this.interacted;
  }
  constructor(_stepper, stepperOptions) {
    this._stepper = _stepper;
    this.interacted = false;
    this.interactedStream = new EventEmitter();
    this.editable = true;
    this.optional = false;
    this._completedOverride = null;
    this._customError = null;
    this._stepperOptions = stepperOptions ? stepperOptions : {};
    this._displayDefaultIndicatorType = this._stepperOptions.displayDefaultIndicatorType !== false;
  }
  /** Selects this step component. */
  select() {
    this._stepper.selected = this;
  }
  /** Resets the step to its initial state. Note that this includes resetting form data. */
  reset() {
    this.interacted = false;
    if (this._completedOverride != null) {
      this._completedOverride = false;
    }
    if (this._customError != null) {
      this._customError = false;
    }
    if (this.stepControl) {
      this._childForms?.forEach((form) => form.resetForm?.());
      this.stepControl.reset();
    }
  }
  ngOnChanges() {
    this._stepper._stateChanged();
  }
  _markAsInteracted() {
    if (!this.interacted) {
      this.interacted = true;
      this.interactedStream.emit(this);
    }
  }
  /** Determines whether the error state can be shown. */
  _showError() {
    return this._stepperOptions.showError ?? this._customError != null;
  }
  static {
    this.\u0275fac = function CdkStep_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CdkStep)(\u0275\u0275directiveInject(forwardRef(() => CdkStepper)), \u0275\u0275directiveInject(STEPPER_GLOBAL_OPTIONS, 8));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _CdkStep,
      selectors: [["cdk-step"]],
      contentQueries: function CdkStep_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuery(dirIndex, CdkStepLabel, 5);
          \u0275\u0275contentQuery(
            dirIndex,
            // Note: we look for `ControlContainer` here, because both `NgForm` and `FormGroupDirective`
            // provides themselves as such, but we don't want to have a concrete reference to both of
            // the directives. The type is marked as `Partial` in case we run into a class that provides
            // itself as `ControlContainer` but doesn't have the same interface as the directives.
            ControlContainer,
            5
          );
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.stepLabel = _t.first);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._childForms = _t);
        }
      },
      viewQuery: function CdkStep_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuery(TemplateRef, 7);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.content = _t.first);
        }
      },
      inputs: {
        stepControl: "stepControl",
        label: "label",
        errorMessage: "errorMessage",
        ariaLabel: [0, "aria-label", "ariaLabel"],
        ariaLabelledby: [0, "aria-labelledby", "ariaLabelledby"],
        state: "state",
        editable: [2, "editable", "editable", booleanAttribute],
        optional: [2, "optional", "optional", booleanAttribute],
        completed: [2, "completed", "completed", booleanAttribute],
        hasError: [2, "hasError", "hasError", booleanAttribute]
      },
      outputs: {
        interactedStream: "interacted"
      },
      exportAs: ["cdkStep"],
      standalone: true,
      features: [\u0275\u0275InputTransformsFeature, \u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function CdkStep_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef();
          \u0275\u0275template(0, CdkStep_ng_template_0_Template, 1, 0, "ng-template");
        }
      },
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkStep, [{
    type: Component,
    args: [{
      selector: "cdk-step",
      exportAs: "cdkStep",
      template: "<ng-template><ng-content/></ng-template>",
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true
    }]
  }], () => [{
    type: CdkStepper,
    decorators: [{
      type: Inject,
      args: [forwardRef(() => CdkStepper)]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [STEPPER_GLOBAL_OPTIONS]
    }]
  }], {
    stepLabel: [{
      type: ContentChild,
      args: [CdkStepLabel]
    }],
    _childForms: [{
      type: ContentChildren,
      args: [
        // Note: we look for `ControlContainer` here, because both `NgForm` and `FormGroupDirective`
        // provides themselves as such, but we don't want to have a concrete reference to both of
        // the directives. The type is marked as `Partial` in case we run into a class that provides
        // itself as `ControlContainer` but doesn't have the same interface as the directives.
        ControlContainer,
        {
          descendants: true
        }
      ]
    }],
    content: [{
      type: ViewChild,
      args: [TemplateRef, {
        static: true
      }]
    }],
    stepControl: [{
      type: Input
    }],
    interactedStream: [{
      type: Output,
      args: ["interacted"]
    }],
    label: [{
      type: Input
    }],
    errorMessage: [{
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
    state: [{
      type: Input
    }],
    editable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    optional: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    completed: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    hasError: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var CdkStepper = class _CdkStepper {
  /** The index of the selected step. */
  get selectedIndex() {
    return this._selectedIndex;
  }
  set selectedIndex(index) {
    if (this.steps && this._steps) {
      if (!this._isValidIndex(index) && (typeof ngDevMode === "undefined" || ngDevMode)) {
        throw Error("cdkStepper: Cannot assign out-of-bounds value to `selectedIndex`.");
      }
      this.selected?._markAsInteracted();
      if (this._selectedIndex !== index && !this._anyControlsInvalidOrPending(index) && (index >= this._selectedIndex || this.steps.toArray()[index].editable)) {
        this._updateSelectedItemIndex(index);
      }
    } else {
      this._selectedIndex = index;
    }
  }
  /** The step that is selected. */
  get selected() {
    return this.steps ? this.steps.toArray()[this.selectedIndex] : void 0;
  }
  set selected(step) {
    this.selectedIndex = step && this.steps ? this.steps.toArray().indexOf(step) : -1;
  }
  /** Orientation of the stepper. */
  get orientation() {
    return this._orientation;
  }
  set orientation(value) {
    this._orientation = value;
    if (this._keyManager) {
      this._keyManager.withVerticalOrientation(value === "vertical");
    }
  }
  constructor(_dir, _changeDetectorRef, _elementRef) {
    this._dir = _dir;
    this._changeDetectorRef = _changeDetectorRef;
    this._elementRef = _elementRef;
    this._destroyed = new Subject();
    this.steps = new QueryList();
    this._sortedHeaders = new QueryList();
    this.linear = false;
    this._selectedIndex = 0;
    this.selectionChange = new EventEmitter();
    this.selectedIndexChange = new EventEmitter();
    this._orientation = "horizontal";
    this._groupId = nextId++;
  }
  ngAfterContentInit() {
    this._steps.changes.pipe(startWith(this._steps), takeUntil(this._destroyed)).subscribe((steps) => {
      this.steps.reset(steps.filter((step) => step._stepper === this));
      this.steps.notifyOnChanges();
    });
  }
  ngAfterViewInit() {
    this._stepHeader.changes.pipe(startWith(this._stepHeader), takeUntil(this._destroyed)).subscribe((headers) => {
      this._sortedHeaders.reset(headers.toArray().sort((a, b) => {
        const documentPosition = a._elementRef.nativeElement.compareDocumentPosition(b._elementRef.nativeElement);
        return documentPosition & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
      }));
      this._sortedHeaders.notifyOnChanges();
    });
    this._keyManager = new FocusKeyManager(this._sortedHeaders).withWrap().withHomeAndEnd().withVerticalOrientation(this._orientation === "vertical");
    (this._dir ? this._dir.change : of()).pipe(startWith(this._layoutDirection()), takeUntil(this._destroyed)).subscribe((direction) => this._keyManager.withHorizontalOrientation(direction));
    this._keyManager.updateActiveItem(this._selectedIndex);
    this.steps.changes.subscribe(() => {
      if (!this.selected) {
        this._selectedIndex = Math.max(this._selectedIndex - 1, 0);
      }
    });
    if (!this._isValidIndex(this._selectedIndex)) {
      this._selectedIndex = 0;
    }
  }
  ngOnDestroy() {
    this._keyManager?.destroy();
    this.steps.destroy();
    this._sortedHeaders.destroy();
    this._destroyed.next();
    this._destroyed.complete();
  }
  /** Selects and focuses the next step in list. */
  next() {
    this.selectedIndex = Math.min(this._selectedIndex + 1, this.steps.length - 1);
  }
  /** Selects and focuses the previous step in list. */
  previous() {
    this.selectedIndex = Math.max(this._selectedIndex - 1, 0);
  }
  /** Resets the stepper to its initial state. Note that this includes clearing form data. */
  reset() {
    this._updateSelectedItemIndex(0);
    this.steps.forEach((step) => step.reset());
    this._stateChanged();
  }
  /** Returns a unique id for each step label element. */
  _getStepLabelId(i) {
    return `cdk-step-label-${this._groupId}-${i}`;
  }
  /** Returns unique id for each step content element. */
  _getStepContentId(i) {
    return `cdk-step-content-${this._groupId}-${i}`;
  }
  /** Marks the component to be change detected. */
  _stateChanged() {
    this._changeDetectorRef.markForCheck();
  }
  /** Returns position state of the step with the given index. */
  _getAnimationDirection(index) {
    const position = index - this._selectedIndex;
    if (position < 0) {
      return this._layoutDirection() === "rtl" ? "next" : "previous";
    } else if (position > 0) {
      return this._layoutDirection() === "rtl" ? "previous" : "next";
    }
    return "current";
  }
  /** Returns the type of icon to be displayed. */
  _getIndicatorType(index, state2 = STEP_STATE.NUMBER) {
    const step = this.steps.toArray()[index];
    const isCurrentStep = this._isCurrentStep(index);
    return step._displayDefaultIndicatorType ? this._getDefaultIndicatorLogic(step, isCurrentStep) : this._getGuidelineLogic(step, isCurrentStep, state2);
  }
  _getDefaultIndicatorLogic(step, isCurrentStep) {
    if (step._showError() && step.hasError && !isCurrentStep) {
      return STEP_STATE.ERROR;
    } else if (!step.completed || isCurrentStep) {
      return STEP_STATE.NUMBER;
    } else {
      return step.editable ? STEP_STATE.EDIT : STEP_STATE.DONE;
    }
  }
  _getGuidelineLogic(step, isCurrentStep, state2 = STEP_STATE.NUMBER) {
    if (step._showError() && step.hasError && !isCurrentStep) {
      return STEP_STATE.ERROR;
    } else if (step.completed && !isCurrentStep) {
      return STEP_STATE.DONE;
    } else if (step.completed && isCurrentStep) {
      return state2;
    } else if (step.editable && isCurrentStep) {
      return STEP_STATE.EDIT;
    } else {
      return state2;
    }
  }
  _isCurrentStep(index) {
    return this._selectedIndex === index;
  }
  /** Returns the index of the currently-focused step header. */
  _getFocusIndex() {
    return this._keyManager ? this._keyManager.activeItemIndex : this._selectedIndex;
  }
  _updateSelectedItemIndex(newIndex) {
    const stepsArray = this.steps.toArray();
    this.selectionChange.emit({
      selectedIndex: newIndex,
      previouslySelectedIndex: this._selectedIndex,
      selectedStep: stepsArray[newIndex],
      previouslySelectedStep: stepsArray[this._selectedIndex]
    });
    this._containsFocus() ? this._keyManager.setActiveItem(newIndex) : this._keyManager.updateActiveItem(newIndex);
    this._selectedIndex = newIndex;
    this.selectedIndexChange.emit(this._selectedIndex);
    this._stateChanged();
  }
  _onKeydown(event) {
    const hasModifier = hasModifierKey(event);
    const keyCode = event.keyCode;
    const manager = this._keyManager;
    if (manager.activeItemIndex != null && !hasModifier && (keyCode === SPACE || keyCode === ENTER)) {
      this.selectedIndex = manager.activeItemIndex;
      event.preventDefault();
    } else {
      manager.setFocusOrigin("keyboard").onKeydown(event);
    }
  }
  _anyControlsInvalidOrPending(index) {
    if (this.linear && index >= 0) {
      return this.steps.toArray().slice(0, index).some((step) => {
        const control = step.stepControl;
        const isIncomplete = control ? control.invalid || control.pending || !step.interacted : !step.completed;
        return isIncomplete && !step.optional && !step._completedOverride;
      });
    }
    return false;
  }
  _layoutDirection() {
    return this._dir && this._dir.value === "rtl" ? "rtl" : "ltr";
  }
  /** Checks whether the stepper contains the focused element. */
  _containsFocus() {
    const stepperElement = this._elementRef.nativeElement;
    const focusedElement = _getFocusedElementPierceShadowDom();
    return stepperElement === focusedElement || stepperElement.contains(focusedElement);
  }
  /** Checks whether the passed-in index is a valid step index. */
  _isValidIndex(index) {
    return index > -1 && (!this.steps || index < this.steps.length);
  }
  static {
    this.\u0275fac = function CdkStepper_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CdkStepper)(\u0275\u0275directiveInject(Directionality, 8), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(ElementRef));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _CdkStepper,
      selectors: [["", "cdkStepper", ""]],
      contentQueries: function CdkStepper_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuery(dirIndex, CdkStep, 5);
          \u0275\u0275contentQuery(dirIndex, CdkStepHeader, 5);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._steps = _t);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._stepHeader = _t);
        }
      },
      inputs: {
        linear: [2, "linear", "linear", booleanAttribute],
        selectedIndex: [2, "selectedIndex", "selectedIndex", numberAttribute],
        selected: "selected",
        orientation: "orientation"
      },
      outputs: {
        selectionChange: "selectionChange",
        selectedIndexChange: "selectedIndexChange"
      },
      exportAs: ["cdkStepper"],
      standalone: true,
      features: [\u0275\u0275InputTransformsFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkStepper, [{
    type: Directive,
    args: [{
      selector: "[cdkStepper]",
      exportAs: "cdkStepper",
      standalone: true
    }]
  }], () => [{
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }, {
    type: ChangeDetectorRef
  }, {
    type: ElementRef
  }], {
    _steps: [{
      type: ContentChildren,
      args: [CdkStep, {
        descendants: true
      }]
    }],
    _stepHeader: [{
      type: ContentChildren,
      args: [CdkStepHeader, {
        descendants: true
      }]
    }],
    linear: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    selectedIndex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    selected: [{
      type: Input
    }],
    selectionChange: [{
      type: Output
    }],
    selectedIndexChange: [{
      type: Output
    }],
    orientation: [{
      type: Input
    }]
  });
})();
var CdkStepperNext = class _CdkStepperNext {
  constructor(_stepper) {
    this._stepper = _stepper;
    this.type = "submit";
  }
  static {
    this.\u0275fac = function CdkStepperNext_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CdkStepperNext)(\u0275\u0275directiveInject(CdkStepper));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _CdkStepperNext,
      selectors: [["button", "cdkStepperNext", ""]],
      hostVars: 1,
      hostBindings: function CdkStepperNext_HostBindings(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275listener("click", function CdkStepperNext_click_HostBindingHandler() {
            return ctx._stepper.next();
          });
        }
        if (rf & 2) {
          \u0275\u0275hostProperty("type", ctx.type);
        }
      },
      inputs: {
        type: "type"
      },
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkStepperNext, [{
    type: Directive,
    args: [{
      selector: "button[cdkStepperNext]",
      host: {
        "[type]": "type",
        "(click)": "_stepper.next()"
      },
      standalone: true
    }]
  }], () => [{
    type: CdkStepper
  }], {
    type: [{
      type: Input
    }]
  });
})();
var CdkStepperPrevious = class _CdkStepperPrevious {
  constructor(_stepper) {
    this._stepper = _stepper;
    this.type = "button";
  }
  static {
    this.\u0275fac = function CdkStepperPrevious_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CdkStepperPrevious)(\u0275\u0275directiveInject(CdkStepper));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _CdkStepperPrevious,
      selectors: [["button", "cdkStepperPrevious", ""]],
      hostVars: 1,
      hostBindings: function CdkStepperPrevious_HostBindings(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275listener("click", function CdkStepperPrevious_click_HostBindingHandler() {
            return ctx._stepper.previous();
          });
        }
        if (rf & 2) {
          \u0275\u0275hostProperty("type", ctx.type);
        }
      },
      inputs: {
        type: "type"
      },
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkStepperPrevious, [{
    type: Directive,
    args: [{
      selector: "button[cdkStepperPrevious]",
      host: {
        "[type]": "type",
        "(click)": "_stepper.previous()"
      },
      standalone: true
    }]
  }], () => [{
    type: CdkStepper
  }], {
    type: [{
      type: Input
    }]
  });
})();
var CdkStepperModule = class _CdkStepperModule {
  static {
    this.\u0275fac = function CdkStepperModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CdkStepperModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _CdkStepperModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
      imports: [BidiModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkStepperModule, [{
    type: NgModule,
    args: [{
      imports: [BidiModule, CdkStep, CdkStepper, CdkStepHeader, CdkStepLabel, CdkStepperNext, CdkStepperPrevious],
      exports: [CdkStep, CdkStepper, CdkStepHeader, CdkStepLabel, CdkStepperNext, CdkStepperPrevious]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/stepper.mjs
function MatStepHeader_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, 2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.iconOverrides[ctx_r0.state])("ngTemplateOutletContext", ctx_r0._getIconContext());
  }
}
function MatStepHeader_Conditional_4_Case_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0._getDefaultTextForState(ctx_r0.state));
  }
}
function MatStepHeader_Conditional_4_Case_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0._intl.completedLabel);
  }
}
function MatStepHeader_Conditional_4_Case_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0._intl.editableLabel);
  }
}
function MatStepHeader_Conditional_4_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MatStepHeader_Conditional_4_Case_1_Conditional_0_Template, 2, 1, "span", 8)(1, MatStepHeader_Conditional_4_Case_1_Conditional_1_Template, 2, 1, "span", 8);
    \u0275\u0275elementStart(2, "mat-icon", 7);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r0.state === "done" ? 0 : ctx_r0.state === "edit" ? 1 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0._getDefaultTextForState(ctx_r0.state));
  }
}
function MatStepHeader_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MatStepHeader_Conditional_4_Case_0_Template, 2, 1, "span", 7)(1, MatStepHeader_Conditional_4_Case_1_Template, 4, 2, "mat-icon", 7);
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_1_0 = ctx_r0.state) === "number" ? 0 : 1);
  }
}
function MatStepHeader_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275elementContainer(1, 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx.template);
  }
}
function MatStepHeader_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.label);
  }
}
function MatStepHeader_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0._intl.optionalLabel);
  }
}
function MatStepHeader_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errorMessage);
  }
}
var _c02 = ["*"];
function MatStep_ng_template_0_ng_template_1_Template(rf, ctx) {
}
function MatStep_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
    \u0275\u0275template(1, MatStep_ng_template_0_ng_template_1_Template, 0, 0, "ng-template", 0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("cdkPortalOutlet", ctx_r0._portal);
  }
}
var _c1 = (a0, a1) => ({
  step: a0,
  i: a1
});
var _c2 = (a0) => ({
  "animationDuration": a0
});
var _c3 = (a0, a1) => ({
  "value": a0,
  "params": a1
});
function MatStepper_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
function MatStepper_Case_1_For_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 6);
  }
}
function MatStepper_Case_1_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, 5);
    \u0275\u0275template(1, MatStepper_Case_1_For_3_Conditional_1_Template, 1, 0, "div", 6);
  }
  if (rf & 2) {
    const step_r1 = ctx.$implicit;
    const \u0275$index_8_r2 = ctx.$index;
    const \u0275$count_8_r3 = ctx.$count;
    \u0275\u0275nextContext(2);
    const stepTemplate_r4 = \u0275\u0275reference(4);
    \u0275\u0275property("ngTemplateOutlet", stepTemplate_r4)("ngTemplateOutletContext", \u0275\u0275pureFunction2(3, _c1, step_r1, \u0275$index_8_r2));
    \u0275\u0275advance();
    \u0275\u0275conditional(!(\u0275$index_8_r2 === \u0275$count_8_r3 - 1) ? 1 : -1);
  }
}
function MatStepper_Case_1_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275listener("@horizontalStepTransition.done", function MatStepper_Case_1_For_6_Template_div_animation_horizontalStepTransition_done_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r5 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r5._animationDone.next($event));
    });
    \u0275\u0275elementContainer(1, 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r7 = ctx.$implicit;
    const \u0275$index_16_r8 = ctx.$index;
    const ctx_r5 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("mat-horizontal-stepper-content-inactive", ctx_r5.selectedIndex !== \u0275$index_16_r8);
    \u0275\u0275property("@horizontalStepTransition", \u0275\u0275pureFunction2(8, _c3, ctx_r5._getAnimationDirection(\u0275$index_16_r8), \u0275\u0275pureFunction1(6, _c2, ctx_r5._getAnimationDuration())))("id", ctx_r5._getStepContentId(\u0275$index_16_r8));
    \u0275\u0275attribute("aria-labelledby", ctx_r5._getStepLabelId(\u0275$index_16_r8));
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", step_r7.content);
  }
}
function MatStepper_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2);
    \u0275\u0275repeaterCreate(2, MatStepper_Case_1_For_3_Template, 2, 6, null, null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 3);
    \u0275\u0275repeaterCreate(5, MatStepper_Case_1_For_6_Template, 2, 11, "div", 4, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r5.steps);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r5.steps);
  }
}
function MatStepper_Case_2_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275elementContainer(1, 5);
    \u0275\u0275elementStart(2, "div", 10)(3, "div", 11);
    \u0275\u0275listener("@verticalStepTransition.done", function MatStepper_Case_2_For_1_Template_div_animation_verticalStepTransition_done_3_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r5 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r5._animationDone.next($event));
    });
    \u0275\u0275elementStart(4, "div", 12);
    \u0275\u0275elementContainer(5, 8);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const step_r10 = ctx.$implicit;
    const \u0275$index_22_r11 = ctx.$index;
    const \u0275$count_22_r12 = ctx.$count;
    const ctx_r5 = \u0275\u0275nextContext(2);
    const stepTemplate_r4 = \u0275\u0275reference(4);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", stepTemplate_r4)("ngTemplateOutletContext", \u0275\u0275pureFunction2(10, _c1, step_r10, \u0275$index_22_r11));
    \u0275\u0275advance();
    \u0275\u0275classProp("mat-stepper-vertical-line", !(\u0275$index_22_r11 === \u0275$count_22_r12 - 1));
    \u0275\u0275advance();
    \u0275\u0275classProp("mat-vertical-stepper-content-inactive", ctx_r5.selectedIndex !== \u0275$index_22_r11);
    \u0275\u0275property("@verticalStepTransition", \u0275\u0275pureFunction2(15, _c3, ctx_r5._getAnimationDirection(\u0275$index_22_r11), \u0275\u0275pureFunction1(13, _c2, ctx_r5._getAnimationDuration())))("id", ctx_r5._getStepContentId(\u0275$index_22_r11));
    \u0275\u0275attribute("aria-labelledby", ctx_r5._getStepLabelId(\u0275$index_22_r11));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngTemplateOutlet", step_r10.content);
  }
}
function MatStepper_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, MatStepper_Case_2_For_1_Template, 6, 18, "div", 9, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r5.steps);
  }
}
function MatStepper_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-step-header", 13);
    \u0275\u0275listener("click", function MatStepper_ng_template_3_Template_mat_step_header_click_0_listener() {
      const step_r14 = \u0275\u0275restoreView(_r13).step;
      return \u0275\u0275resetView(step_r14.select());
    })("keydown", function MatStepper_ng_template_3_Template_mat_step_header_keydown_0_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5._onKeydown($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r14 = ctx.step;
    const i_r15 = ctx.i;
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275classProp("mat-horizontal-stepper-header", ctx_r5.orientation === "horizontal")("mat-vertical-stepper-header", ctx_r5.orientation === "vertical");
    \u0275\u0275property("tabIndex", ctx_r5._getFocusIndex() === i_r15 ? 0 : -1)("id", ctx_r5._getStepLabelId(i_r15))("index", i_r15)("state", ctx_r5._getIndicatorType(i_r15, step_r14.state))("label", step_r14.stepLabel || step_r14.label)("selected", ctx_r5.selectedIndex === i_r15)("active", ctx_r5._stepIsNavigable(i_r15, step_r14))("optional", step_r14.optional)("errorMessage", step_r14.errorMessage)("iconOverrides", ctx_r5._iconOverrides)("disableRipple", ctx_r5.disableRipple || !ctx_r5._stepIsNavigable(i_r15, step_r14))("color", step_r14.color || ctx_r5.color);
    \u0275\u0275attribute("aria-posinset", i_r15 + 1)("aria-setsize", ctx_r5.steps.length)("aria-controls", ctx_r5._getStepContentId(i_r15))("aria-selected", ctx_r5.selectedIndex == i_r15)("aria-label", step_r14.ariaLabel || null)("aria-labelledby", !step_r14.ariaLabel && step_r14.ariaLabelledby ? step_r14.ariaLabelledby : null)("aria-disabled", ctx_r5._stepIsNavigable(i_r15, step_r14) ? null : true);
  }
}
var MatStepLabel = class _MatStepLabel extends CdkStepLabel {
  static {
    this.\u0275fac = /* @__PURE__ */ (() => {
      let \u0275MatStepLabel_BaseFactory;
      return function MatStepLabel_Factory(__ngFactoryType__) {
        return (\u0275MatStepLabel_BaseFactory || (\u0275MatStepLabel_BaseFactory = \u0275\u0275getInheritedFactory(_MatStepLabel)))(__ngFactoryType__ || _MatStepLabel);
      };
    })();
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatStepLabel,
      selectors: [["", "matStepLabel", ""]],
      standalone: true,
      features: [\u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStepLabel, [{
    type: Directive,
    args: [{
      selector: "[matStepLabel]",
      standalone: true
    }]
  }], null, null);
})();
var MatStepperIntl = class _MatStepperIntl {
  constructor() {
    this.changes = new Subject();
    this.optionalLabel = "Optional";
    this.completedLabel = "Completed";
    this.editableLabel = "Editable";
  }
  static {
    this.\u0275fac = function MatStepperIntl_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatStepperIntl)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
      token: _MatStepperIntl,
      factory: _MatStepperIntl.\u0275fac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStepperIntl, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function MAT_STEPPER_INTL_PROVIDER_FACTORY(parentIntl) {
  return parentIntl || new MatStepperIntl();
}
var MAT_STEPPER_INTL_PROVIDER = {
  provide: MatStepperIntl,
  deps: [[new Optional(), new SkipSelf(), MatStepperIntl]],
  useFactory: MAT_STEPPER_INTL_PROVIDER_FACTORY
};
var MatStepHeader = class _MatStepHeader extends CdkStepHeader {
  constructor(_intl, _focusMonitor, _elementRef, changeDetectorRef) {
    super(_elementRef);
    this._intl = _intl;
    this._focusMonitor = _focusMonitor;
    this._intlSubscription = _intl.changes.subscribe(() => changeDetectorRef.markForCheck());
  }
  ngAfterViewInit() {
    this._focusMonitor.monitor(this._elementRef, true);
  }
  ngOnDestroy() {
    this._intlSubscription.unsubscribe();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }
  /** Focuses the step header. */
  focus(origin, options) {
    if (origin) {
      this._focusMonitor.focusVia(this._elementRef, origin, options);
    } else {
      this._elementRef.nativeElement.focus(options);
    }
  }
  /** Returns string label of given step if it is a text label. */
  _stringLabel() {
    return this.label instanceof MatStepLabel ? null : this.label;
  }
  /** Returns MatStepLabel if the label of given step is a template label. */
  _templateLabel() {
    return this.label instanceof MatStepLabel ? this.label : null;
  }
  /** Returns the host HTML element. */
  _getHostElement() {
    return this._elementRef.nativeElement;
  }
  /** Template context variables that are exposed to the `matStepperIcon` instances. */
  _getIconContext() {
    return {
      index: this.index,
      active: this.active,
      optional: this.optional
    };
  }
  _getDefaultTextForState(state2) {
    if (state2 == "number") {
      return `${this.index + 1}`;
    }
    if (state2 == "edit") {
      return "create";
    }
    if (state2 == "error") {
      return "warning";
    }
    return state2;
  }
  static {
    this.\u0275fac = function MatStepHeader_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatStepHeader)(\u0275\u0275directiveInject(MatStepperIntl), \u0275\u0275directiveInject(FocusMonitor), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(ChangeDetectorRef));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatStepHeader,
      selectors: [["mat-step-header"]],
      hostAttrs: ["role", "tab", 1, "mat-step-header"],
      hostVars: 2,
      hostBindings: function MatStepHeader_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275classMap("mat-" + (ctx.color || "primary"));
        }
      },
      inputs: {
        state: "state",
        label: "label",
        errorMessage: "errorMessage",
        iconOverrides: "iconOverrides",
        index: "index",
        selected: "selected",
        active: "active",
        optional: "optional",
        disableRipple: "disableRipple",
        color: "color"
      },
      standalone: true,
      features: [\u0275\u0275InheritDefinitionFeature, \u0275\u0275StandaloneFeature],
      decls: 10,
      vars: 17,
      consts: [["matRipple", "", 1, "mat-step-header-ripple", "mat-focus-indicator", 3, "matRippleTrigger", "matRippleDisabled"], [1, "mat-step-icon-content"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "mat-step-label"], [1, "mat-step-text-label"], [1, "mat-step-optional"], [1, "mat-step-sub-label-error"], ["aria-hidden", "true"], [1, "cdk-visually-hidden"], [3, "ngTemplateOutlet"]],
      template: function MatStepHeader_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275element(0, "div", 0);
          \u0275\u0275elementStart(1, "div")(2, "div", 1);
          \u0275\u0275template(3, MatStepHeader_Conditional_3_Template, 1, 2, "ng-container", 2)(4, MatStepHeader_Conditional_4_Template, 2, 1);
          \u0275\u0275elementEnd()();
          \u0275\u0275elementStart(5, "div", 3);
          \u0275\u0275template(6, MatStepHeader_Conditional_6_Template, 2, 1, "div", 4)(7, MatStepHeader_Conditional_7_Template, 2, 1, "div", 4)(8, MatStepHeader_Conditional_8_Template, 2, 1, "div", 5)(9, MatStepHeader_Conditional_9_Template, 2, 1, "div", 6);
          \u0275\u0275elementEnd();
        }
        if (rf & 2) {
          let tmp_8_0;
          \u0275\u0275property("matRippleTrigger", ctx._getHostElement())("matRippleDisabled", ctx.disableRipple);
          \u0275\u0275advance();
          \u0275\u0275classMapInterpolate1("mat-step-icon-state-", ctx.state, " mat-step-icon");
          \u0275\u0275classProp("mat-step-icon-selected", ctx.selected);
          \u0275\u0275advance(2);
          \u0275\u0275conditional(ctx.iconOverrides && ctx.iconOverrides[ctx.state] ? 3 : 4);
          \u0275\u0275advance(2);
          \u0275\u0275classProp("mat-step-label-active", ctx.active)("mat-step-label-selected", ctx.selected)("mat-step-label-error", ctx.state == "error");
          \u0275\u0275advance();
          \u0275\u0275conditional((tmp_8_0 = ctx._templateLabel()) ? 6 : ctx._stringLabel() ? 7 : -1, tmp_8_0);
          \u0275\u0275advance(2);
          \u0275\u0275conditional(ctx.optional && ctx.state != "error" ? 8 : -1);
          \u0275\u0275advance();
          \u0275\u0275conditional(ctx.state === "error" ? 9 : -1);
        }
      },
      dependencies: [MatRipple, NgTemplateOutlet, MatIcon],
      styles: ['.mat-step-header{overflow:hidden;outline:none;cursor:pointer;position:relative;box-sizing:content-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-step-header:focus .mat-focus-indicator::before{content:""}.mat-step-header:hover[aria-disabled=true]{cursor:default}.mat-step-header:hover:not([aria-disabled]),.mat-step-header:hover[aria-disabled=false]{background-color:var(--mat-stepper-header-hover-state-layer-color);border-radius:var(--mat-stepper-header-hover-state-layer-shape, var(--mat-app-corner-medium))}.mat-step-header.cdk-keyboard-focused,.mat-step-header.cdk-program-focused{background-color:var(--mat-stepper-header-focus-state-layer-color);border-radius:var(--mat-stepper-header-focus-state-layer-shape, var(--mat-app-corner-medium))}@media(hover: none){.mat-step-header:hover{background:none}}.cdk-high-contrast-active .mat-step-header{outline:solid 1px}.cdk-high-contrast-active .mat-step-header[aria-selected=true] .mat-step-label{text-decoration:underline}.cdk-high-contrast-active .mat-step-header[aria-disabled=true]{outline-color:GrayText}.cdk-high-contrast-active .mat-step-header[aria-disabled=true] .mat-step-label,.cdk-high-contrast-active .mat-step-header[aria-disabled=true] .mat-step-icon,.cdk-high-contrast-active .mat-step-header[aria-disabled=true] .mat-step-optional{color:GrayText}.mat-step-optional{font-size:12px;color:var(--mat-stepper-header-optional-label-text-color, var(--mat-app-on-surface-variant))}.mat-step-sub-label-error{font-size:12px;font-weight:normal}.mat-step-icon{border-radius:50%;height:24px;width:24px;flex-shrink:0;position:relative;color:var(--mat-stepper-header-icon-foreground-color, var(--mat-app-surface));background-color:var(--mat-stepper-header-icon-background-color, var(--mat-app-on-surface-variant))}.mat-step-icon-content{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);display:flex}.mat-step-icon .mat-icon{font-size:16px;height:16px;width:16px}.mat-step-icon-state-error{background-color:var(--mat-stepper-header-error-state-icon-background-color);color:var(--mat-stepper-header-error-state-icon-foreground-color, var(--mat-app-error))}.mat-step-icon-state-error .mat-icon{font-size:24px;height:24px;width:24px}.mat-step-label{display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:50px;vertical-align:middle;font-family:var(--mat-stepper-header-label-text-font, var(--mat-app-title-small-font));font-size:var(--mat-stepper-header-label-text-size, var(--mat-app-title-small-size));font-weight:var(--mat-stepper-header-label-text-weight, var(--mat-app-title-small-weight));color:var(--mat-stepper-header-label-text-color, var(--mat-app-on-surface-variant))}.mat-step-label.mat-step-label-active{color:var(--mat-stepper-header-selected-state-label-text-color, var(--mat-app-on-surface-variant))}.mat-step-label.mat-step-label-error{color:var(--mat-stepper-header-error-state-label-text-color, var(--mat-app-error));font-size:var(--mat-stepper-header-error-state-label-text-size, var(--mat-app-title-small-size))}.mat-step-label.mat-step-label-selected{font-size:var(--mat-stepper-header-selected-state-label-text-size, var(--mat-app-title-small-size));font-weight:var(--mat-stepper-header-selected-state-label-text-weight, var(--mat-app-title-small-weight))}.mat-step-text-label{text-overflow:ellipsis;overflow:hidden}.mat-step-header .mat-step-header-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-step-icon-selected{background-color:var(--mat-stepper-header-selected-state-icon-background-color, var(--mat-app-primary));color:var(--mat-stepper-header-selected-state-icon-foreground-color, var(--mat-app-on-primary))}.mat-step-icon-state-done{background-color:var(--mat-stepper-header-done-state-icon-background-color);color:var(--mat-stepper-header-done-state-icon-foreground-color)}.mat-step-icon-state-edit{background-color:var(--mat-stepper-header-edit-state-icon-background-color, var(--mat-app-primary));color:var(--mat-stepper-header-edit-state-icon-foreground-color, var(--mat-app-on-primary))}'],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStepHeader, [{
    type: Component,
    args: [{
      selector: "mat-step-header",
      host: {
        "class": "mat-step-header",
        "[class]": '"mat-" + (color || "primary")',
        "role": "tab"
      },
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [MatRipple, NgTemplateOutlet, MatIcon],
      template: `<div class="mat-step-header-ripple mat-focus-indicator" matRipple
     [matRippleTrigger]="_getHostElement()"
     [matRippleDisabled]="disableRipple"></div>

<div class="mat-step-icon-state-{{state}} mat-step-icon" [class.mat-step-icon-selected]="selected">
  <div class="mat-step-icon-content">
    @if (iconOverrides && iconOverrides[state]) {
      <ng-container
        [ngTemplateOutlet]="iconOverrides[state]"
        [ngTemplateOutletContext]="_getIconContext()"></ng-container>
    } @else {
      @switch (state) {
        @case ('number') {
          <span aria-hidden="true">{{_getDefaultTextForState(state)}}</span>
        }

        @default {
          @if (state === 'done') {
            <span class="cdk-visually-hidden">{{_intl.completedLabel}}</span>
          } @else if (state === 'edit') {
            <span class="cdk-visually-hidden">{{_intl.editableLabel}}</span>
          }

          <mat-icon aria-hidden="true">{{_getDefaultTextForState(state)}}</mat-icon>
        }
      }
    }
  </div>
</div>
<div class="mat-step-label"
     [class.mat-step-label-active]="active"
     [class.mat-step-label-selected]="selected"
     [class.mat-step-label-error]="state == 'error'">
  @if (_templateLabel(); as templateLabel) {
    <!-- If there is a label template, use it. -->
    <div class="mat-step-text-label">
      <ng-container [ngTemplateOutlet]="templateLabel.template"></ng-container>
    </div>
  } @else if (_stringLabel()) {
    <!-- If there is no label template, fall back to the text label. -->
    <div class="mat-step-text-label">{{label}}</div>
  }

  @if (optional && state != 'error') {
    <div class="mat-step-optional">{{_intl.optionalLabel}}</div>
  }

  @if (state === 'error') {
    <div class="mat-step-sub-label-error">{{errorMessage}}</div>
  }
</div>

`,
      styles: ['.mat-step-header{overflow:hidden;outline:none;cursor:pointer;position:relative;box-sizing:content-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-step-header:focus .mat-focus-indicator::before{content:""}.mat-step-header:hover[aria-disabled=true]{cursor:default}.mat-step-header:hover:not([aria-disabled]),.mat-step-header:hover[aria-disabled=false]{background-color:var(--mat-stepper-header-hover-state-layer-color);border-radius:var(--mat-stepper-header-hover-state-layer-shape, var(--mat-app-corner-medium))}.mat-step-header.cdk-keyboard-focused,.mat-step-header.cdk-program-focused{background-color:var(--mat-stepper-header-focus-state-layer-color);border-radius:var(--mat-stepper-header-focus-state-layer-shape, var(--mat-app-corner-medium))}@media(hover: none){.mat-step-header:hover{background:none}}.cdk-high-contrast-active .mat-step-header{outline:solid 1px}.cdk-high-contrast-active .mat-step-header[aria-selected=true] .mat-step-label{text-decoration:underline}.cdk-high-contrast-active .mat-step-header[aria-disabled=true]{outline-color:GrayText}.cdk-high-contrast-active .mat-step-header[aria-disabled=true] .mat-step-label,.cdk-high-contrast-active .mat-step-header[aria-disabled=true] .mat-step-icon,.cdk-high-contrast-active .mat-step-header[aria-disabled=true] .mat-step-optional{color:GrayText}.mat-step-optional{font-size:12px;color:var(--mat-stepper-header-optional-label-text-color, var(--mat-app-on-surface-variant))}.mat-step-sub-label-error{font-size:12px;font-weight:normal}.mat-step-icon{border-radius:50%;height:24px;width:24px;flex-shrink:0;position:relative;color:var(--mat-stepper-header-icon-foreground-color, var(--mat-app-surface));background-color:var(--mat-stepper-header-icon-background-color, var(--mat-app-on-surface-variant))}.mat-step-icon-content{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);display:flex}.mat-step-icon .mat-icon{font-size:16px;height:16px;width:16px}.mat-step-icon-state-error{background-color:var(--mat-stepper-header-error-state-icon-background-color);color:var(--mat-stepper-header-error-state-icon-foreground-color, var(--mat-app-error))}.mat-step-icon-state-error .mat-icon{font-size:24px;height:24px;width:24px}.mat-step-label{display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:50px;vertical-align:middle;font-family:var(--mat-stepper-header-label-text-font, var(--mat-app-title-small-font));font-size:var(--mat-stepper-header-label-text-size, var(--mat-app-title-small-size));font-weight:var(--mat-stepper-header-label-text-weight, var(--mat-app-title-small-weight));color:var(--mat-stepper-header-label-text-color, var(--mat-app-on-surface-variant))}.mat-step-label.mat-step-label-active{color:var(--mat-stepper-header-selected-state-label-text-color, var(--mat-app-on-surface-variant))}.mat-step-label.mat-step-label-error{color:var(--mat-stepper-header-error-state-label-text-color, var(--mat-app-error));font-size:var(--mat-stepper-header-error-state-label-text-size, var(--mat-app-title-small-size))}.mat-step-label.mat-step-label-selected{font-size:var(--mat-stepper-header-selected-state-label-text-size, var(--mat-app-title-small-size));font-weight:var(--mat-stepper-header-selected-state-label-text-weight, var(--mat-app-title-small-weight))}.mat-step-text-label{text-overflow:ellipsis;overflow:hidden}.mat-step-header .mat-step-header-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-step-icon-selected{background-color:var(--mat-stepper-header-selected-state-icon-background-color, var(--mat-app-primary));color:var(--mat-stepper-header-selected-state-icon-foreground-color, var(--mat-app-on-primary))}.mat-step-icon-state-done{background-color:var(--mat-stepper-header-done-state-icon-background-color);color:var(--mat-stepper-header-done-state-icon-foreground-color)}.mat-step-icon-state-edit{background-color:var(--mat-stepper-header-edit-state-icon-background-color, var(--mat-app-primary));color:var(--mat-stepper-header-edit-state-icon-foreground-color, var(--mat-app-on-primary))}']
    }]
  }], () => [{
    type: MatStepperIntl
  }, {
    type: FocusMonitor
  }, {
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }], {
    state: [{
      type: Input
    }],
    label: [{
      type: Input
    }],
    errorMessage: [{
      type: Input
    }],
    iconOverrides: [{
      type: Input
    }],
    index: [{
      type: Input
    }],
    selected: [{
      type: Input
    }],
    active: [{
      type: Input
    }],
    optional: [{
      type: Input
    }],
    disableRipple: [{
      type: Input
    }],
    color: [{
      type: Input
    }]
  });
})();
var DEFAULT_HORIZONTAL_ANIMATION_DURATION = "500ms";
var DEFAULT_VERTICAL_ANIMATION_DURATION = "225ms";
var matStepperAnimations = {
  /** Animation that transitions the step along the X axis in a horizontal stepper. */
  horizontalStepTransition: trigger("horizontalStepTransition", [
    state("previous", style({
      transform: "translate3d(-100%, 0, 0)",
      visibility: "hidden"
    })),
    // Transition to `inherit`, rather than `visible`,
    // because visibility on a child element the one from the parent,
    // making this element focusable inside of a `hidden` element.
    state("current", style({
      transform: "none",
      visibility: "inherit"
    })),
    state("next", style({
      transform: "translate3d(100%, 0, 0)",
      visibility: "hidden"
    })),
    transition("* => *", group([animate("{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)"), query("@*", animateChild(), {
      optional: true
    })]), {
      params: {
        "animationDuration": DEFAULT_HORIZONTAL_ANIMATION_DURATION
      }
    })
  ]),
  /** Animation that transitions the step along the Y axis in a vertical stepper. */
  verticalStepTransition: trigger("verticalStepTransition", [
    state("previous", style({
      height: "0px",
      visibility: "hidden"
    })),
    state("next", style({
      height: "0px",
      visibility: "hidden"
    })),
    // Transition to `inherit`, rather than `visible`,
    // because visibility on a child element the one from the parent,
    // making this element focusable inside of a `hidden` element.
    state("current", style({
      height: "*",
      visibility: "inherit"
    })),
    transition("* <=> current", group([animate("{{animationDuration}} cubic-bezier(0.4, 0.0, 0.2, 1)"), query("@*", animateChild(), {
      optional: true
    })]), {
      params: {
        "animationDuration": DEFAULT_VERTICAL_ANIMATION_DURATION
      }
    })
  ])
};
var MatStepperIcon = class _MatStepperIcon {
  constructor(templateRef) {
    this.templateRef = templateRef;
  }
  static {
    this.\u0275fac = function MatStepperIcon_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatStepperIcon)(\u0275\u0275directiveInject(TemplateRef));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatStepperIcon,
      selectors: [["ng-template", "matStepperIcon", ""]],
      inputs: {
        name: [0, "matStepperIcon", "name"]
      },
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStepperIcon, [{
    type: Directive,
    args: [{
      selector: "ng-template[matStepperIcon]",
      standalone: true
    }]
  }], () => [{
    type: TemplateRef
  }], {
    name: [{
      type: Input,
      args: ["matStepperIcon"]
    }]
  });
})();
var MatStepContent = class _MatStepContent {
  constructor(_template) {
    this._template = _template;
  }
  static {
    this.\u0275fac = function MatStepContent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatStepContent)(\u0275\u0275directiveInject(TemplateRef));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatStepContent,
      selectors: [["ng-template", "matStepContent", ""]],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStepContent, [{
    type: Directive,
    args: [{
      selector: "ng-template[matStepContent]",
      standalone: true
    }]
  }], () => [{
    type: TemplateRef
  }], null);
})();
var MatStep = class _MatStep extends CdkStep {
  constructor(stepper, _errorStateMatcher, _viewContainerRef, stepperOptions) {
    super(stepper, stepperOptions);
    this._errorStateMatcher = _errorStateMatcher;
    this._viewContainerRef = _viewContainerRef;
    this._isSelected = Subscription.EMPTY;
    this.stepLabel = void 0;
  }
  ngAfterContentInit() {
    this._isSelected = this._stepper.steps.changes.pipe(switchMap(() => {
      return this._stepper.selectionChange.pipe(map((event) => event.selectedStep === this), startWith(this._stepper.selected === this));
    })).subscribe((isSelected) => {
      if (isSelected && this._lazyContent && !this._portal) {
        this._portal = new TemplatePortal(this._lazyContent._template, this._viewContainerRef);
      }
    });
  }
  ngOnDestroy() {
    this._isSelected.unsubscribe();
  }
  /** Custom error state matcher that additionally checks for validity of interacted form. */
  isErrorState(control, form) {
    const originalErrorState = this._errorStateMatcher.isErrorState(control, form);
    const customErrorState = !!(control && control.invalid && this.interacted);
    return originalErrorState || customErrorState;
  }
  static {
    this.\u0275fac = function MatStep_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatStep)(\u0275\u0275directiveInject(forwardRef(() => MatStepper)), \u0275\u0275directiveInject(ErrorStateMatcher, 4), \u0275\u0275directiveInject(ViewContainerRef), \u0275\u0275directiveInject(STEPPER_GLOBAL_OPTIONS, 8));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatStep,
      selectors: [["mat-step"]],
      contentQueries: function MatStep_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuery(dirIndex, MatStepLabel, 5);
          \u0275\u0275contentQuery(dirIndex, MatStepContent, 5);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.stepLabel = _t.first);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._lazyContent = _t.first);
        }
      },
      hostAttrs: ["hidden", ""],
      inputs: {
        color: "color"
      },
      exportAs: ["matStep"],
      standalone: true,
      features: [\u0275\u0275ProvidersFeature([{
        provide: ErrorStateMatcher,
        useExisting: _MatStep
      }, {
        provide: CdkStep,
        useExisting: _MatStep
      }]), \u0275\u0275InheritDefinitionFeature, \u0275\u0275StandaloneFeature],
      ngContentSelectors: _c02,
      decls: 1,
      vars: 0,
      consts: [[3, "cdkPortalOutlet"]],
      template: function MatStep_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef();
          \u0275\u0275template(0, MatStep_ng_template_0_Template, 2, 1, "ng-template");
        }
      },
      dependencies: [CdkPortalOutlet],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStep, [{
    type: Component,
    args: [{
      selector: "mat-step",
      providers: [{
        provide: ErrorStateMatcher,
        useExisting: MatStep
      }, {
        provide: CdkStep,
        useExisting: MatStep
      }],
      encapsulation: ViewEncapsulation$1.None,
      exportAs: "matStep",
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [CdkPortalOutlet],
      host: {
        "hidden": ""
        // Hide the steps so they don't affect the layout.
      },
      template: '<ng-template>\n  <ng-content></ng-content>\n  <ng-template [cdkPortalOutlet]="_portal"></ng-template>\n</ng-template>\n'
    }]
  }], () => [{
    type: MatStepper,
    decorators: [{
      type: Inject,
      args: [forwardRef(() => MatStepper)]
    }]
  }, {
    type: ErrorStateMatcher,
    decorators: [{
      type: SkipSelf
    }]
  }, {
    type: ViewContainerRef
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [STEPPER_GLOBAL_OPTIONS]
    }]
  }], {
    stepLabel: [{
      type: ContentChild,
      args: [MatStepLabel]
    }],
    color: [{
      type: Input
    }],
    _lazyContent: [{
      type: ContentChild,
      args: [MatStepContent, {
        static: false
      }]
    }]
  });
})();
var MatStepper = class _MatStepper extends CdkStepper {
  /** Duration for the animation. Will be normalized to milliseconds if no units are set. */
  get animationDuration() {
    return this._animationDuration;
  }
  set animationDuration(value) {
    this._animationDuration = /^\d+$/.test(value) ? value + "ms" : value;
  }
  constructor(dir, changeDetectorRef, elementRef) {
    super(dir, changeDetectorRef, elementRef);
    this._stepHeader = void 0;
    this._steps = void 0;
    this.steps = new QueryList();
    this.animationDone = new EventEmitter();
    this.labelPosition = "end";
    this.headerPosition = "top";
    this._iconOverrides = {};
    this._animationDone = new Subject();
    this._animationDuration = "";
    this._isServer = !inject(Platform).isBrowser;
    const nodeName = elementRef.nativeElement.nodeName.toLowerCase();
    this.orientation = nodeName === "mat-vertical-stepper" ? "vertical" : "horizontal";
  }
  ngAfterContentInit() {
    super.ngAfterContentInit();
    this._icons.forEach(({
      name,
      templateRef
    }) => this._iconOverrides[name] = templateRef);
    this.steps.changes.pipe(takeUntil(this._destroyed)).subscribe(() => {
      this._stateChanged();
    });
    this._animationDone.pipe(takeUntil(this._destroyed)).subscribe((event) => {
      if (event.toState === "current") {
        this.animationDone.emit();
      }
    });
  }
  _stepIsNavigable(index, step) {
    return step.completed || this.selectedIndex === index || !this.linear;
  }
  _getAnimationDuration() {
    if (this.animationDuration) {
      return this.animationDuration;
    }
    return this.orientation === "horizontal" ? DEFAULT_HORIZONTAL_ANIMATION_DURATION : DEFAULT_VERTICAL_ANIMATION_DURATION;
  }
  static {
    this.\u0275fac = function MatStepper_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatStepper)(\u0275\u0275directiveInject(Directionality, 8), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(ElementRef));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatStepper,
      selectors: [["mat-stepper"], ["mat-vertical-stepper"], ["mat-horizontal-stepper"], ["", "matStepper", ""]],
      contentQueries: function MatStepper_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuery(dirIndex, MatStep, 5);
          \u0275\u0275contentQuery(dirIndex, MatStepperIcon, 5);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._steps = _t);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._icons = _t);
        }
      },
      viewQuery: function MatStepper_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuery(MatStepHeader, 5);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._stepHeader = _t);
        }
      },
      hostAttrs: ["role", "tablist"],
      hostVars: 11,
      hostBindings: function MatStepper_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275attribute("aria-orientation", ctx.orientation);
          \u0275\u0275classProp("mat-stepper-horizontal", ctx.orientation === "horizontal")("mat-stepper-vertical", ctx.orientation === "vertical")("mat-stepper-label-position-end", ctx.orientation === "horizontal" && ctx.labelPosition == "end")("mat-stepper-label-position-bottom", ctx.orientation === "horizontal" && ctx.labelPosition == "bottom")("mat-stepper-header-position-bottom", ctx.headerPosition === "bottom");
        }
      },
      inputs: {
        disableRipple: "disableRipple",
        color: "color",
        labelPosition: "labelPosition",
        headerPosition: "headerPosition",
        animationDuration: "animationDuration"
      },
      outputs: {
        animationDone: "animationDone"
      },
      exportAs: ["matStepper", "matVerticalStepper", "matHorizontalStepper"],
      standalone: true,
      features: [\u0275\u0275ProvidersFeature([{
        provide: CdkStepper,
        useExisting: _MatStepper
      }]), \u0275\u0275InheritDefinitionFeature, \u0275\u0275StandaloneFeature],
      ngContentSelectors: _c02,
      decls: 5,
      vars: 2,
      consts: [["stepTemplate", ""], [1, "mat-horizontal-stepper-wrapper"], [1, "mat-horizontal-stepper-header-container"], [1, "mat-horizontal-content-container"], ["role", "tabpanel", 1, "mat-horizontal-stepper-content", 3, "id", "mat-horizontal-stepper-content-inactive"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "mat-stepper-horizontal-line"], ["role", "tabpanel", 1, "mat-horizontal-stepper-content", 3, "id"], [3, "ngTemplateOutlet"], [1, "mat-step"], [1, "mat-vertical-content-container"], ["role", "tabpanel", 1, "mat-vertical-stepper-content", 3, "id"], [1, "mat-vertical-content"], [3, "click", "keydown", "tabIndex", "id", "index", "state", "label", "selected", "active", "optional", "errorMessage", "iconOverrides", "disableRipple", "color"]],
      template: function MatStepper_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef();
          \u0275\u0275template(0, MatStepper_Conditional_0_Template, 1, 0)(1, MatStepper_Case_1_Template, 7, 0, "div", 1)(2, MatStepper_Case_2_Template, 2, 0)(3, MatStepper_ng_template_3_Template, 1, 23, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
        }
        if (rf & 2) {
          let tmp_2_0;
          \u0275\u0275conditional(ctx._isServer ? 0 : -1);
          \u0275\u0275advance();
          \u0275\u0275conditional((tmp_2_0 = ctx.orientation) === "horizontal" ? 1 : tmp_2_0 === "vertical" ? 2 : -1);
        }
      },
      dependencies: [NgTemplateOutlet, MatStepHeader],
      styles: ['.mat-stepper-vertical,.mat-stepper-horizontal{display:block;font-family:var(--mat-stepper-container-text-font, var(--mat-app-body-medium-font));background:var(--mat-stepper-container-color, var(--mat-app-surface))}.mat-horizontal-stepper-header-container{white-space:nowrap;display:flex;align-items:center}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header-container{align-items:flex-start}.mat-stepper-header-position-bottom .mat-horizontal-stepper-header-container{order:1}.mat-stepper-horizontal-line{border-top-width:1px;border-top-style:solid;flex:auto;height:0;margin:0 -16px;min-width:32px;border-top-color:var(--mat-stepper-line-color, var(--mat-app-outline))}.mat-stepper-label-position-bottom .mat-stepper-horizontal-line{margin:0;min-width:0;position:relative;top:calc(calc((var(--mat-stepper-header-height) - 24px) / 2) + 12px)}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::before,.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::after{border-top-width:1px;border-top-style:solid;content:"";display:inline-block;height:0;position:absolute;width:calc(50% - 20px)}.mat-horizontal-stepper-header{display:flex;height:72px;overflow:hidden;align-items:center;padding:0 24px;height:var(--mat-stepper-header-height)}.mat-horizontal-stepper-header .mat-step-icon{margin-right:8px;flex:none}[dir=rtl] .mat-horizontal-stepper-header .mat-step-icon{margin-right:0;margin-left:8px}.mat-horizontal-stepper-header::before,.mat-horizontal-stepper-header::after{border-top-color:var(--mat-stepper-line-color, var(--mat-app-outline))}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header{padding:calc((var(--mat-stepper-header-height) - 24px) / 2) 24px}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header::before,.mat-stepper-label-position-bottom .mat-horizontal-stepper-header::after{top:calc(calc((var(--mat-stepper-header-height) - 24px) / 2) + 12px)}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header{box-sizing:border-box;flex-direction:column;height:auto}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::after{right:0}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::before{left:0}[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:last-child::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:first-child::after{display:none}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-icon{margin-right:0;margin-left:0}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-label{padding:16px 0 0 0;text-align:center;width:100%}.mat-vertical-stepper-header{display:flex;align-items:center;height:24px;padding:calc((var(--mat-stepper-header-height) - 24px) / 2) 24px}.mat-vertical-stepper-header .mat-step-icon{margin-right:12px}[dir=rtl] .mat-vertical-stepper-header .mat-step-icon{margin-right:0;margin-left:12px}.mat-horizontal-stepper-wrapper{display:flex;flex-direction:column}.mat-horizontal-stepper-content{outline:0}.mat-horizontal-stepper-content.mat-horizontal-stepper-content-inactive{height:0;overflow:hidden}.mat-horizontal-stepper-content:not(.mat-horizontal-stepper-content-inactive){visibility:inherit !important}.mat-horizontal-content-container{overflow:hidden;padding:0 24px 24px 24px}.cdk-high-contrast-active .mat-horizontal-content-container{outline:solid 1px}.mat-stepper-header-position-bottom .mat-horizontal-content-container{padding:24px 24px 0 24px}.mat-vertical-content-container{margin-left:36px;border:0;position:relative}.cdk-high-contrast-active .mat-vertical-content-container{outline:solid 1px}[dir=rtl] .mat-vertical-content-container{margin-left:0;margin-right:36px}.mat-stepper-vertical-line::before{content:"";position:absolute;left:0;border-left-width:1px;border-left-style:solid;border-left-color:var(--mat-stepper-line-color, var(--mat-app-outline));top:calc(8px - calc((var(--mat-stepper-header-height) - 24px) / 2));bottom:calc(8px - calc((var(--mat-stepper-header-height) - 24px) / 2))}[dir=rtl] .mat-stepper-vertical-line::before{left:auto;right:0}.mat-vertical-stepper-content{overflow:hidden;outline:0}.mat-vertical-stepper-content:not(.mat-vertical-stepper-content-inactive){visibility:inherit !important}.mat-vertical-content{padding:0 24px 24px 24px}.mat-step:last-child .mat-vertical-content-container{border:none}'],
      encapsulation: 2,
      data: {
        animation: [matStepperAnimations.horizontalStepTransition, matStepperAnimations.verticalStepTransition]
      },
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStepper, [{
    type: Component,
    args: [{
      selector: "mat-stepper, mat-vertical-stepper, mat-horizontal-stepper, [matStepper]",
      exportAs: "matStepper, matVerticalStepper, matHorizontalStepper",
      host: {
        "[class.mat-stepper-horizontal]": 'orientation === "horizontal"',
        "[class.mat-stepper-vertical]": 'orientation === "vertical"',
        "[class.mat-stepper-label-position-end]": 'orientation === "horizontal" && labelPosition == "end"',
        "[class.mat-stepper-label-position-bottom]": 'orientation === "horizontal" && labelPosition == "bottom"',
        "[class.mat-stepper-header-position-bottom]": 'headerPosition === "bottom"',
        "[attr.aria-orientation]": "orientation",
        "role": "tablist"
      },
      animations: [matStepperAnimations.horizontalStepTransition, matStepperAnimations.verticalStepTransition],
      providers: [{
        provide: CdkStepper,
        useExisting: MatStepper
      }],
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [NgTemplateOutlet, MatStepHeader],
      template: `<!--
  We need to project the content somewhere to avoid hydration errors. Some observations:
  1. This is only necessary on the server.
  2. We get a hydration error if there aren't any nodes after the \`ng-content\`.
  3. We get a hydration error if \`ng-content\` is wrapped in another element.
-->
@if (_isServer) {
  <ng-content/>
}

@switch (orientation) {
  @case ('horizontal') {
    <div class="mat-horizontal-stepper-wrapper">
      <div class="mat-horizontal-stepper-header-container">
        @for (step of steps; track step; let i = $index, isLast = $last) {
          <ng-container
            [ngTemplateOutlet]="stepTemplate"
            [ngTemplateOutletContext]="{step: step, i: i}"></ng-container>
          @if (!isLast) {
            <div class="mat-stepper-horizontal-line"></div>
          }
        }
      </div>

      <div class="mat-horizontal-content-container">
        @for (step of steps; track step; let i = $index) {
          <div class="mat-horizontal-stepper-content" role="tabpanel"
               [@horizontalStepTransition]="{
                  'value': _getAnimationDirection(i),
                  'params': {'animationDuration': _getAnimationDuration()}
                }"
               (@horizontalStepTransition.done)="_animationDone.next($event)"
               [id]="_getStepContentId(i)"
               [attr.aria-labelledby]="_getStepLabelId(i)"
               [class.mat-horizontal-stepper-content-inactive]="selectedIndex !== i">
            <ng-container [ngTemplateOutlet]="step.content"></ng-container>
          </div>
        }
      </div>
    </div>
  }

  @case ('vertical') {
    @for (step of steps; track step; let i = $index, isLast = $last) {
      <div class="mat-step">
        <ng-container
          [ngTemplateOutlet]="stepTemplate"
          [ngTemplateOutletContext]="{step: step, i: i}"></ng-container>
        <div class="mat-vertical-content-container" [class.mat-stepper-vertical-line]="!isLast">
          <div class="mat-vertical-stepper-content" role="tabpanel"
               [@verticalStepTransition]="{
                  'value': _getAnimationDirection(i),
                  'params': {'animationDuration': _getAnimationDuration()}
                }"
               (@verticalStepTransition.done)="_animationDone.next($event)"
               [id]="_getStepContentId(i)"
               [attr.aria-labelledby]="_getStepLabelId(i)"
               [class.mat-vertical-stepper-content-inactive]="selectedIndex !== i">
            <div class="mat-vertical-content">
              <ng-container [ngTemplateOutlet]="step.content"></ng-container>
            </div>
          </div>
        </div>
      </div>
    }
  }
}

<!-- Common step templating -->
<ng-template let-step="step" let-i="i" #stepTemplate>
  <mat-step-header
    [class.mat-horizontal-stepper-header]="orientation === 'horizontal'"
    [class.mat-vertical-stepper-header]="orientation === 'vertical'"
    (click)="step.select()"
    (keydown)="_onKeydown($event)"
    [tabIndex]="_getFocusIndex() === i ? 0 : -1"
    [id]="_getStepLabelId(i)"
    [attr.aria-posinset]="i + 1"
    [attr.aria-setsize]="steps.length"
    [attr.aria-controls]="_getStepContentId(i)"
    [attr.aria-selected]="selectedIndex == i"
    [attr.aria-label]="step.ariaLabel || null"
    [attr.aria-labelledby]="(!step.ariaLabel && step.ariaLabelledby) ? step.ariaLabelledby : null"
    [attr.aria-disabled]="_stepIsNavigable(i, step) ? null : true"
    [index]="i"
    [state]="_getIndicatorType(i, step.state)"
    [label]="step.stepLabel || step.label"
    [selected]="selectedIndex === i"
    [active]="_stepIsNavigable(i, step)"
    [optional]="step.optional"
    [errorMessage]="step.errorMessage"
    [iconOverrides]="_iconOverrides"
    [disableRipple]="disableRipple || !_stepIsNavigable(i, step)"
    [color]="step.color || color"></mat-step-header>
</ng-template>
`,
      styles: ['.mat-stepper-vertical,.mat-stepper-horizontal{display:block;font-family:var(--mat-stepper-container-text-font, var(--mat-app-body-medium-font));background:var(--mat-stepper-container-color, var(--mat-app-surface))}.mat-horizontal-stepper-header-container{white-space:nowrap;display:flex;align-items:center}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header-container{align-items:flex-start}.mat-stepper-header-position-bottom .mat-horizontal-stepper-header-container{order:1}.mat-stepper-horizontal-line{border-top-width:1px;border-top-style:solid;flex:auto;height:0;margin:0 -16px;min-width:32px;border-top-color:var(--mat-stepper-line-color, var(--mat-app-outline))}.mat-stepper-label-position-bottom .mat-stepper-horizontal-line{margin:0;min-width:0;position:relative;top:calc(calc((var(--mat-stepper-header-height) - 24px) / 2) + 12px)}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::before,.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::after{border-top-width:1px;border-top-style:solid;content:"";display:inline-block;height:0;position:absolute;width:calc(50% - 20px)}.mat-horizontal-stepper-header{display:flex;height:72px;overflow:hidden;align-items:center;padding:0 24px;height:var(--mat-stepper-header-height)}.mat-horizontal-stepper-header .mat-step-icon{margin-right:8px;flex:none}[dir=rtl] .mat-horizontal-stepper-header .mat-step-icon{margin-right:0;margin-left:8px}.mat-horizontal-stepper-header::before,.mat-horizontal-stepper-header::after{border-top-color:var(--mat-stepper-line-color, var(--mat-app-outline))}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header{padding:calc((var(--mat-stepper-header-height) - 24px) / 2) 24px}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header::before,.mat-stepper-label-position-bottom .mat-horizontal-stepper-header::after{top:calc(calc((var(--mat-stepper-header-height) - 24px) / 2) + 12px)}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header{box-sizing:border-box;flex-direction:column;height:auto}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::after{right:0}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::before{left:0}[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:last-child::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:first-child::after{display:none}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-icon{margin-right:0;margin-left:0}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-label{padding:16px 0 0 0;text-align:center;width:100%}.mat-vertical-stepper-header{display:flex;align-items:center;height:24px;padding:calc((var(--mat-stepper-header-height) - 24px) / 2) 24px}.mat-vertical-stepper-header .mat-step-icon{margin-right:12px}[dir=rtl] .mat-vertical-stepper-header .mat-step-icon{margin-right:0;margin-left:12px}.mat-horizontal-stepper-wrapper{display:flex;flex-direction:column}.mat-horizontal-stepper-content{outline:0}.mat-horizontal-stepper-content.mat-horizontal-stepper-content-inactive{height:0;overflow:hidden}.mat-horizontal-stepper-content:not(.mat-horizontal-stepper-content-inactive){visibility:inherit !important}.mat-horizontal-content-container{overflow:hidden;padding:0 24px 24px 24px}.cdk-high-contrast-active .mat-horizontal-content-container{outline:solid 1px}.mat-stepper-header-position-bottom .mat-horizontal-content-container{padding:24px 24px 0 24px}.mat-vertical-content-container{margin-left:36px;border:0;position:relative}.cdk-high-contrast-active .mat-vertical-content-container{outline:solid 1px}[dir=rtl] .mat-vertical-content-container{margin-left:0;margin-right:36px}.mat-stepper-vertical-line::before{content:"";position:absolute;left:0;border-left-width:1px;border-left-style:solid;border-left-color:var(--mat-stepper-line-color, var(--mat-app-outline));top:calc(8px - calc((var(--mat-stepper-header-height) - 24px) / 2));bottom:calc(8px - calc((var(--mat-stepper-header-height) - 24px) / 2))}[dir=rtl] .mat-stepper-vertical-line::before{left:auto;right:0}.mat-vertical-stepper-content{overflow:hidden;outline:0}.mat-vertical-stepper-content:not(.mat-vertical-stepper-content-inactive){visibility:inherit !important}.mat-vertical-content{padding:0 24px 24px 24px}.mat-step:last-child .mat-vertical-content-container{border:none}']
    }]
  }], () => [{
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }, {
    type: ChangeDetectorRef
  }, {
    type: ElementRef
  }], {
    _stepHeader: [{
      type: ViewChildren,
      args: [MatStepHeader]
    }],
    _steps: [{
      type: ContentChildren,
      args: [MatStep, {
        descendants: true
      }]
    }],
    _icons: [{
      type: ContentChildren,
      args: [MatStepperIcon, {
        descendants: true
      }]
    }],
    animationDone: [{
      type: Output
    }],
    disableRipple: [{
      type: Input
    }],
    color: [{
      type: Input
    }],
    labelPosition: [{
      type: Input
    }],
    headerPosition: [{
      type: Input
    }],
    animationDuration: [{
      type: Input
    }]
  });
})();
var MatStepperNext = class _MatStepperNext extends CdkStepperNext {
  static {
    this.\u0275fac = /* @__PURE__ */ (() => {
      let \u0275MatStepperNext_BaseFactory;
      return function MatStepperNext_Factory(__ngFactoryType__) {
        return (\u0275MatStepperNext_BaseFactory || (\u0275MatStepperNext_BaseFactory = \u0275\u0275getInheritedFactory(_MatStepperNext)))(__ngFactoryType__ || _MatStepperNext);
      };
    })();
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatStepperNext,
      selectors: [["button", "matStepperNext", ""]],
      hostAttrs: [1, "mat-stepper-next"],
      hostVars: 1,
      hostBindings: function MatStepperNext_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275hostProperty("type", ctx.type);
        }
      },
      standalone: true,
      features: [\u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStepperNext, [{
    type: Directive,
    args: [{
      selector: "button[matStepperNext]",
      host: {
        "class": "mat-stepper-next",
        "[type]": "type"
      },
      standalone: true
    }]
  }], null, null);
})();
var MatStepperPrevious = class _MatStepperPrevious extends CdkStepperPrevious {
  static {
    this.\u0275fac = /* @__PURE__ */ (() => {
      let \u0275MatStepperPrevious_BaseFactory;
      return function MatStepperPrevious_Factory(__ngFactoryType__) {
        return (\u0275MatStepperPrevious_BaseFactory || (\u0275MatStepperPrevious_BaseFactory = \u0275\u0275getInheritedFactory(_MatStepperPrevious)))(__ngFactoryType__ || _MatStepperPrevious);
      };
    })();
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatStepperPrevious,
      selectors: [["button", "matStepperPrevious", ""]],
      hostAttrs: [1, "mat-stepper-previous"],
      hostVars: 1,
      hostBindings: function MatStepperPrevious_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275hostProperty("type", ctx.type);
        }
      },
      standalone: true,
      features: [\u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStepperPrevious, [{
    type: Directive,
    args: [{
      selector: "button[matStepperPrevious]",
      host: {
        "class": "mat-stepper-previous",
        "[type]": "type"
      },
      standalone: true
    }]
  }], null, null);
})();
var MatStepperModule = class _MatStepperModule {
  static {
    this.\u0275fac = function MatStepperModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatStepperModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _MatStepperModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
      providers: [MAT_STEPPER_INTL_PROVIDER, ErrorStateMatcher],
      imports: [MatCommonModule, CommonModule, PortalModule, CdkStepperModule, MatIconModule, MatRippleModule, MatStepper, MatStepHeader, MatCommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStepperModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, CommonModule, PortalModule, CdkStepperModule, MatIconModule, MatRippleModule, MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious, MatStepHeader, MatStepperIcon, MatStepContent],
      exports: [MatCommonModule, MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious, MatStepHeader, MatStepperIcon, MatStepContent],
      providers: [MAT_STEPPER_INTL_PROVIDER, ErrorStateMatcher]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/checkbox.mjs
var _c03 = ["input"];
var _c12 = ["label"];
var _c22 = ["*"];
var MAT_CHECKBOX_DEFAULT_OPTIONS = new InjectionToken("mat-checkbox-default-options", {
  providedIn: "root",
  factory: MAT_CHECKBOX_DEFAULT_OPTIONS_FACTORY
});
function MAT_CHECKBOX_DEFAULT_OPTIONS_FACTORY() {
  return {
    color: "accent",
    clickAction: "check-indeterminate",
    disabledInteractive: false
  };
}
var TransitionCheckState;
(function(TransitionCheckState2) {
  TransitionCheckState2[TransitionCheckState2["Init"] = 0] = "Init";
  TransitionCheckState2[TransitionCheckState2["Checked"] = 1] = "Checked";
  TransitionCheckState2[TransitionCheckState2["Unchecked"] = 2] = "Unchecked";
  TransitionCheckState2[TransitionCheckState2["Indeterminate"] = 3] = "Indeterminate";
})(TransitionCheckState || (TransitionCheckState = {}));
var MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MatCheckbox),
  multi: true
};
var MatCheckboxChange = class {
};
var nextUniqueId = 0;
var defaults = MAT_CHECKBOX_DEFAULT_OPTIONS_FACTORY();
var MatCheckbox = class _MatCheckbox {
  /** Focuses the checkbox. */
  focus() {
    this._inputElement.nativeElement.focus();
  }
  /** Creates the change event that will be emitted by the checkbox. */
  _createChangeEvent(isChecked) {
    const event = new MatCheckboxChange();
    event.source = this;
    event.checked = isChecked;
    return event;
  }
  /** Gets the element on which to add the animation CSS classes. */
  _getAnimationTargetElement() {
    return this._inputElement?.nativeElement;
  }
  /** Returns the unique id for the visual hidden input. */
  get inputId() {
    return `${this.id || this._uniqueId}-input`;
  }
  constructor(_elementRef, _changeDetectorRef, _ngZone, tabIndex, _animationMode, _options) {
    this._elementRef = _elementRef;
    this._changeDetectorRef = _changeDetectorRef;
    this._ngZone = _ngZone;
    this._animationMode = _animationMode;
    this._options = _options;
    this._animationClasses = {
      uncheckedToChecked: "mdc-checkbox--anim-unchecked-checked",
      uncheckedToIndeterminate: "mdc-checkbox--anim-unchecked-indeterminate",
      checkedToUnchecked: "mdc-checkbox--anim-checked-unchecked",
      checkedToIndeterminate: "mdc-checkbox--anim-checked-indeterminate",
      indeterminateToChecked: "mdc-checkbox--anim-indeterminate-checked",
      indeterminateToUnchecked: "mdc-checkbox--anim-indeterminate-unchecked"
    };
    this.ariaLabel = "";
    this.ariaLabelledby = null;
    this.labelPosition = "after";
    this.name = null;
    this.change = new EventEmitter();
    this.indeterminateChange = new EventEmitter();
    this._onTouched = () => {
    };
    this._currentAnimationClass = "";
    this._currentCheckState = TransitionCheckState.Init;
    this._controlValueAccessorChangeFn = () => {
    };
    this._validatorChangeFn = () => {
    };
    this._checked = false;
    this._disabled = false;
    this._indeterminate = false;
    this._options = this._options || defaults;
    this.color = this._options.color || defaults.color;
    this.tabIndex = parseInt(tabIndex) || 0;
    this.id = this._uniqueId = `mat-mdc-checkbox-${++nextUniqueId}`;
    this.disabledInteractive = _options?.disabledInteractive ?? false;
  }
  ngOnChanges(changes) {
    if (changes["required"]) {
      this._validatorChangeFn();
    }
  }
  ngAfterViewInit() {
    this._syncIndeterminate(this._indeterminate);
  }
  /** Whether the checkbox is checked. */
  get checked() {
    return this._checked;
  }
  set checked(value) {
    if (value != this.checked) {
      this._checked = value;
      this._changeDetectorRef.markForCheck();
    }
  }
  /** Whether the checkbox is disabled. */
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    if (value !== this.disabled) {
      this._disabled = value;
      this._changeDetectorRef.markForCheck();
    }
  }
  /**
   * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
   * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
   * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
   * set to false.
   */
  get indeterminate() {
    return this._indeterminate;
  }
  set indeterminate(value) {
    const changed = value != this._indeterminate;
    this._indeterminate = value;
    if (changed) {
      if (this._indeterminate) {
        this._transitionCheckState(TransitionCheckState.Indeterminate);
      } else {
        this._transitionCheckState(this.checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);
      }
      this.indeterminateChange.emit(this._indeterminate);
    }
    this._syncIndeterminate(this._indeterminate);
  }
  _isRippleDisabled() {
    return this.disableRipple || this.disabled;
  }
  /** Method being called whenever the label text changes. */
  _onLabelTextChange() {
    this._changeDetectorRef.detectChanges();
  }
  // Implemented as part of ControlValueAccessor.
  writeValue(value) {
    this.checked = !!value;
  }
  // Implemented as part of ControlValueAccessor.
  registerOnChange(fn) {
    this._controlValueAccessorChangeFn = fn;
  }
  // Implemented as part of ControlValueAccessor.
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  // Implemented as part of ControlValueAccessor.
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  // Implemented as a part of Validator.
  validate(control) {
    return this.required && control.value !== true ? {
      "required": true
    } : null;
  }
  // Implemented as a part of Validator.
  registerOnValidatorChange(fn) {
    this._validatorChangeFn = fn;
  }
  _transitionCheckState(newState) {
    let oldState = this._currentCheckState;
    let element = this._getAnimationTargetElement();
    if (oldState === newState || !element) {
      return;
    }
    if (this._currentAnimationClass) {
      element.classList.remove(this._currentAnimationClass);
    }
    this._currentAnimationClass = this._getAnimationClassForCheckStateTransition(oldState, newState);
    this._currentCheckState = newState;
    if (this._currentAnimationClass.length > 0) {
      element.classList.add(this._currentAnimationClass);
      const animationClass = this._currentAnimationClass;
      this._ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          element.classList.remove(animationClass);
        }, 1e3);
      });
    }
  }
  _emitChangeEvent() {
    this._controlValueAccessorChangeFn(this.checked);
    this.change.emit(this._createChangeEvent(this.checked));
    if (this._inputElement) {
      this._inputElement.nativeElement.checked = this.checked;
    }
  }
  /** Toggles the `checked` state of the checkbox. */
  toggle() {
    this.checked = !this.checked;
    this._controlValueAccessorChangeFn(this.checked);
  }
  _handleInputClick() {
    const clickAction = this._options?.clickAction;
    if (!this.disabled && clickAction !== "noop") {
      if (this.indeterminate && clickAction !== "check") {
        Promise.resolve().then(() => {
          this._indeterminate = false;
          this.indeterminateChange.emit(this._indeterminate);
        });
      }
      this._checked = !this._checked;
      this._transitionCheckState(this._checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);
      this._emitChangeEvent();
    } else if (this.disabled && this.disabledInteractive || !this.disabled && clickAction === "noop") {
      this._inputElement.nativeElement.checked = this.checked;
      this._inputElement.nativeElement.indeterminate = this.indeterminate;
    }
  }
  _onInteractionEvent(event) {
    event.stopPropagation();
  }
  _onBlur() {
    Promise.resolve().then(() => {
      this._onTouched();
      this._changeDetectorRef.markForCheck();
    });
  }
  _getAnimationClassForCheckStateTransition(oldState, newState) {
    if (this._animationMode === "NoopAnimations") {
      return "";
    }
    switch (oldState) {
      case TransitionCheckState.Init:
        if (newState === TransitionCheckState.Checked) {
          return this._animationClasses.uncheckedToChecked;
        } else if (newState == TransitionCheckState.Indeterminate) {
          return this._checked ? this._animationClasses.checkedToIndeterminate : this._animationClasses.uncheckedToIndeterminate;
        }
        break;
      case TransitionCheckState.Unchecked:
        return newState === TransitionCheckState.Checked ? this._animationClasses.uncheckedToChecked : this._animationClasses.uncheckedToIndeterminate;
      case TransitionCheckState.Checked:
        return newState === TransitionCheckState.Unchecked ? this._animationClasses.checkedToUnchecked : this._animationClasses.checkedToIndeterminate;
      case TransitionCheckState.Indeterminate:
        return newState === TransitionCheckState.Checked ? this._animationClasses.indeterminateToChecked : this._animationClasses.indeterminateToUnchecked;
    }
    return "";
  }
  /**
   * Syncs the indeterminate value with the checkbox DOM node.
   *
   * We sync `indeterminate` directly on the DOM node, because in Ivy the check for whether a
   * property is supported on an element boils down to `if (propName in element)`. Domino's
   * HTMLInputElement doesn't have an `indeterminate` property so Ivy will warn during
   * server-side rendering.
   */
  _syncIndeterminate(value) {
    const nativeCheckbox = this._inputElement;
    if (nativeCheckbox) {
      nativeCheckbox.nativeElement.indeterminate = value;
    }
  }
  _onInputClick() {
    this._handleInputClick();
  }
  _onTouchTargetClick() {
    this._handleInputClick();
    if (!this.disabled) {
      this._inputElement.nativeElement.focus();
    }
  }
  /**
   *  Prevent click events that come from the `<label/>` element from bubbling. This prevents the
   *  click handler on the host from triggering twice when clicking on the `<label/>` element. After
   *  the click event on the `<label/>` propagates, the browsers dispatches click on the associated
   *  `<input/>`. By preventing clicks on the label by bubbling, we ensure only one click event
   *  bubbles when the label is clicked.
   */
  _preventBubblingFromLabel(event) {
    if (!!event.target && this._labelElement.nativeElement.contains(event.target)) {
      event.stopPropagation();
    }
  }
  static {
    this.\u0275fac = function MatCheckbox_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatCheckbox)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(NgZone), \u0275\u0275injectAttribute("tabindex"), \u0275\u0275directiveInject(ANIMATION_MODULE_TYPE, 8), \u0275\u0275directiveInject(MAT_CHECKBOX_DEFAULT_OPTIONS, 8));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatCheckbox,
      selectors: [["mat-checkbox"]],
      viewQuery: function MatCheckbox_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuery(_c03, 5);
          \u0275\u0275viewQuery(_c12, 5);
          \u0275\u0275viewQuery(MatRipple, 5);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._inputElement = _t.first);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._labelElement = _t.first);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.ripple = _t.first);
        }
      },
      hostAttrs: [1, "mat-mdc-checkbox"],
      hostVars: 16,
      hostBindings: function MatCheckbox_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275hostProperty("id", ctx.id);
          \u0275\u0275attribute("tabindex", null)("aria-label", null)("aria-labelledby", null);
          \u0275\u0275classMap(ctx.color ? "mat-" + ctx.color : "mat-accent");
          \u0275\u0275classProp("_mat-animation-noopable", ctx._animationMode === "NoopAnimations")("mdc-checkbox--disabled", ctx.disabled)("mat-mdc-checkbox-disabled", ctx.disabled)("mat-mdc-checkbox-checked", ctx.checked)("mat-mdc-checkbox-disabled-interactive", ctx.disabledInteractive);
        }
      },
      inputs: {
        ariaLabel: [0, "aria-label", "ariaLabel"],
        ariaLabelledby: [0, "aria-labelledby", "ariaLabelledby"],
        ariaDescribedby: [0, "aria-describedby", "ariaDescribedby"],
        id: "id",
        required: [2, "required", "required", booleanAttribute],
        labelPosition: "labelPosition",
        name: "name",
        value: "value",
        disableRipple: [2, "disableRipple", "disableRipple", booleanAttribute],
        tabIndex: [2, "tabIndex", "tabIndex", (value) => value == null ? void 0 : numberAttribute(value)],
        color: "color",
        disabledInteractive: [2, "disabledInteractive", "disabledInteractive", booleanAttribute],
        checked: [2, "checked", "checked", booleanAttribute],
        disabled: [2, "disabled", "disabled", booleanAttribute],
        indeterminate: [2, "indeterminate", "indeterminate", booleanAttribute]
      },
      outputs: {
        change: "change",
        indeterminateChange: "indeterminateChange"
      },
      exportAs: ["matCheckbox"],
      standalone: true,
      features: [\u0275\u0275ProvidersFeature([MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR, {
        provide: NG_VALIDATORS,
        useExisting: _MatCheckbox,
        multi: true
      }]), \u0275\u0275InputTransformsFeature, \u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature],
      ngContentSelectors: _c22,
      decls: 15,
      vars: 20,
      consts: [["checkbox", ""], ["input", ""], ["label", ""], ["mat-internal-form-field", "", 3, "click", "labelPosition"], [1, "mdc-checkbox"], [1, "mat-mdc-checkbox-touch-target", 3, "click"], ["type", "checkbox", 1, "mdc-checkbox__native-control", 3, "blur", "click", "change", "checked", "indeterminate", "disabled", "id", "required", "tabIndex"], [1, "mdc-checkbox__ripple"], [1, "mdc-checkbox__background"], ["focusable", "false", "viewBox", "0 0 24 24", "aria-hidden", "true", 1, "mdc-checkbox__checkmark"], ["fill", "none", "d", "M1.73,12.91 8.1,19.28 22.79,4.59", 1, "mdc-checkbox__checkmark-path"], [1, "mdc-checkbox__mixedmark"], ["mat-ripple", "", 1, "mat-mdc-checkbox-ripple", "mat-mdc-focus-indicator", 3, "matRippleTrigger", "matRippleDisabled", "matRippleCentered"], [1, "mdc-label", 3, "for"]],
      template: function MatCheckbox_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = \u0275\u0275getCurrentView();
          \u0275\u0275projectionDef();
          \u0275\u0275elementStart(0, "div", 3);
          \u0275\u0275listener("click", function MatCheckbox_Template_div_click_0_listener($event) {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._preventBubblingFromLabel($event));
          });
          \u0275\u0275elementStart(1, "div", 4, 0)(3, "div", 5);
          \u0275\u0275listener("click", function MatCheckbox_Template_div_click_3_listener() {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._onTouchTargetClick());
          });
          \u0275\u0275elementEnd();
          \u0275\u0275elementStart(4, "input", 6, 1);
          \u0275\u0275listener("blur", function MatCheckbox_Template_input_blur_4_listener() {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._onBlur());
          })("click", function MatCheckbox_Template_input_click_4_listener() {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._onInputClick());
          })("change", function MatCheckbox_Template_input_change_4_listener($event) {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._onInteractionEvent($event));
          });
          \u0275\u0275elementEnd();
          \u0275\u0275element(6, "div", 7);
          \u0275\u0275elementStart(7, "div", 8);
          \u0275\u0275namespaceSVG();
          \u0275\u0275elementStart(8, "svg", 9);
          \u0275\u0275element(9, "path", 10);
          \u0275\u0275elementEnd();
          \u0275\u0275namespaceHTML();
          \u0275\u0275element(10, "div", 11);
          \u0275\u0275elementEnd();
          \u0275\u0275element(11, "div", 12);
          \u0275\u0275elementEnd();
          \u0275\u0275elementStart(12, "label", 13, 2);
          \u0275\u0275projection(14);
          \u0275\u0275elementEnd()();
        }
        if (rf & 2) {
          const checkbox_r2 = \u0275\u0275reference(2);
          \u0275\u0275property("labelPosition", ctx.labelPosition);
          \u0275\u0275advance(4);
          \u0275\u0275classProp("mdc-checkbox--selected", ctx.checked);
          \u0275\u0275property("checked", ctx.checked)("indeterminate", ctx.indeterminate)("disabled", ctx.disabled && !ctx.disabledInteractive)("id", ctx.inputId)("required", ctx.required)("tabIndex", ctx.disabled && !ctx.disabledInteractive ? -1 : ctx.tabIndex);
          \u0275\u0275attribute("aria-label", ctx.ariaLabel || null)("aria-labelledby", ctx.ariaLabelledby)("aria-describedby", ctx.ariaDescribedby)("aria-checked", ctx.indeterminate ? "mixed" : null)("aria-disabled", ctx.disabled && ctx.disabledInteractive ? true : null)("name", ctx.name)("value", ctx.value);
          \u0275\u0275advance(7);
          \u0275\u0275property("matRippleTrigger", checkbox_r2)("matRippleDisabled", ctx.disableRipple || ctx.disabled)("matRippleCentered", true);
          \u0275\u0275advance();
          \u0275\u0275property("for", ctx.inputId);
        }
      },
      dependencies: [MatRipple, _MatInternalFormField],
      styles: ['.mdc-checkbox{display:inline-block;position:relative;flex:0 0 18px;box-sizing:content-box;width:18px;height:18px;line-height:0;white-space:nowrap;cursor:pointer;vertical-align:bottom;padding:calc((var(--mdc-checkbox-state-layer-size, 40px) - 18px)/2);margin:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px))/2)}.mdc-checkbox:hover .mdc-checkbox__ripple{opacity:var(--mdc-checkbox-unselected-hover-state-layer-opacity, var(--mat-app-hover-state-layer-opacity));background-color:var(--mdc-checkbox-unselected-hover-state-layer-color, var(--mat-app-on-surface))}.mdc-checkbox:hover .mat-mdc-checkbox-ripple .mat-ripple-element{background-color:var(--mdc-checkbox-unselected-hover-state-layer-color, var(--mat-app-on-surface))}.mdc-checkbox .mdc-checkbox__native-control:focus~.mdc-checkbox__ripple{opacity:var(--mdc-checkbox-unselected-focus-state-layer-opacity, var(--mat-app-focus-state-layer-opacity));background-color:var(--mdc-checkbox-unselected-focus-state-layer-color, var(--mat-app-on-surface))}.mdc-checkbox .mdc-checkbox__native-control:focus~.mat-mdc-checkbox-ripple .mat-ripple-element{background-color:var(--mdc-checkbox-unselected-focus-state-layer-color, var(--mat-app-on-surface))}.mdc-checkbox:active .mdc-checkbox__native-control~.mdc-checkbox__ripple{opacity:var(--mdc-checkbox-unselected-pressed-state-layer-opacity, var(--mat-app-pressed-state-layer-opacity));background-color:var(--mdc-checkbox-unselected-pressed-state-layer-color, var(--mat-app-primary))}.mdc-checkbox:active .mdc-checkbox__native-control~.mat-mdc-checkbox-ripple .mat-ripple-element{background-color:var(--mdc-checkbox-unselected-pressed-state-layer-color, var(--mat-app-primary))}.mdc-checkbox:hover .mdc-checkbox__native-control:checked~.mdc-checkbox__ripple{opacity:var(--mdc-checkbox-selected-hover-state-layer-opacity, var(--mat-app-hover-state-layer-opacity));background-color:var(--mdc-checkbox-selected-hover-state-layer-color, var(--mat-app-primary))}.mdc-checkbox:hover .mdc-checkbox__native-control:checked~.mat-mdc-checkbox-ripple .mat-ripple-element{background-color:var(--mdc-checkbox-selected-hover-state-layer-color, var(--mat-app-primary))}.mdc-checkbox .mdc-checkbox__native-control:focus:checked~.mdc-checkbox__ripple{opacity:var(--mdc-checkbox-selected-focus-state-layer-opacity, var(--mat-app-focus-state-layer-opacity));background-color:var(--mdc-checkbox-selected-focus-state-layer-color, var(--mat-app-primary))}.mdc-checkbox .mdc-checkbox__native-control:focus:checked~.mat-mdc-checkbox-ripple .mat-ripple-element{background-color:var(--mdc-checkbox-selected-focus-state-layer-color, var(--mat-app-primary))}.mdc-checkbox:active .mdc-checkbox__native-control:checked~.mdc-checkbox__ripple{opacity:var(--mdc-checkbox-selected-pressed-state-layer-opacity, var(--mat-app-pressed-state-layer-opacity));background-color:var(--mdc-checkbox-selected-pressed-state-layer-color, var(--mat-app-on-surface))}.mdc-checkbox:active .mdc-checkbox__native-control:checked~.mat-mdc-checkbox-ripple .mat-ripple-element{background-color:var(--mdc-checkbox-selected-pressed-state-layer-color, var(--mat-app-on-surface))}.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control~.mat-mdc-checkbox-ripple .mat-ripple-element,.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control~.mdc-checkbox__ripple{background-color:var(--mdc-checkbox-unselected-hover-state-layer-color, var(--mat-app-on-surface))}.mdc-checkbox .mdc-checkbox__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit;width:var(--mdc-checkbox-state-layer-size, 40px);height:var(--mdc-checkbox-state-layer-size, 40px);top:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px))/2);right:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px))/2);left:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px))/2)}.mdc-checkbox--disabled{cursor:default;pointer-events:none}.cdk-high-contrast-active .mdc-checkbox--disabled{opacity:.5}.mdc-checkbox__background{display:inline-flex;position:absolute;align-items:center;justify-content:center;box-sizing:border-box;width:18px;height:18px;border:2px solid currentColor;border-radius:2px;background-color:rgba(0,0,0,0);pointer-events:none;will-change:background-color,border-color;transition:background-color 90ms cubic-bezier(0.4, 0, 0.6, 1),border-color 90ms cubic-bezier(0.4, 0, 0.6, 1);-webkit-print-color-adjust:exact;color-adjust:exact;border-color:var(--mdc-checkbox-unselected-icon-color, var(--mat-app-on-surface-variant));top:calc((var(--mdc-checkbox-state-layer-size, 40px) - 18px)/2);left:calc((var(--mdc-checkbox-state-layer-size, 40px) - 18px)/2)}.mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background{border-color:var(--mdc-checkbox-selected-icon-color, var(--mat-app-primary));background-color:var(--mdc-checkbox-selected-icon-color, var(--mat-app-primary))}.mdc-checkbox--disabled .mdc-checkbox__background{border-color:var(--mdc-checkbox-disabled-unselected-icon-color)}.mdc-checkbox__native-control:disabled:checked~.mdc-checkbox__background,.mdc-checkbox__native-control:disabled:indeterminate~.mdc-checkbox__background{background-color:var(--mdc-checkbox-disabled-selected-icon-color);border-color:rgba(0,0,0,0)}.mdc-checkbox:hover .mdc-checkbox__native-control:not(:checked)~.mdc-checkbox__background,.mdc-checkbox:hover .mdc-checkbox__native-control:not(:indeterminate)~.mdc-checkbox__background{border-color:var(--mdc-checkbox-unselected-hover-icon-color, var(--mat-app-on-surface));background-color:rgba(0,0,0,0)}.mdc-checkbox:hover .mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mdc-checkbox:hover .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background{border-color:var(--mdc-checkbox-selected-hover-icon-color, var(--mat-app-primary));background-color:var(--mdc-checkbox-selected-hover-icon-color, var(--mat-app-primary))}.mdc-checkbox__native-control:focus:focus:not(:checked)~.mdc-checkbox__background,.mdc-checkbox__native-control:focus:focus:not(:indeterminate)~.mdc-checkbox__background{border-color:var(--mdc-checkbox-unselected-focus-icon-color, var(--mat-app-on-surface))}.mdc-checkbox__native-control:focus:focus:checked~.mdc-checkbox__background,.mdc-checkbox__native-control:focus:focus:indeterminate~.mdc-checkbox__background{border-color:var(--mdc-checkbox-selected-focus-icon-color, var(--mat-app-primary));background-color:var(--mdc-checkbox-selected-focus-icon-color, var(--mat-app-primary))}.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover .mdc-checkbox__native-control~.mdc-checkbox__background,.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus~.mdc-checkbox__background,.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background{border-color:var(--mdc-checkbox-disabled-unselected-icon-color)}.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background{background-color:var(--mdc-checkbox-disabled-selected-icon-color);border-color:rgba(0,0,0,0)}.mdc-checkbox__checkmark{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;opacity:0;transition:opacity 180ms cubic-bezier(0.4, 0, 0.6, 1);color:var(--mdc-checkbox-selected-checkmark-color, var(--mat-app-on-primary))}.cdk-high-contrast-active .mdc-checkbox__checkmark{color:CanvasText}.mdc-checkbox--disabled .mdc-checkbox__checkmark,.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark{color:var(--mdc-checkbox-disabled-selected-checkmark-color, var(--mat-app-surface))}.cdk-high-contrast-active .mdc-checkbox--disabled .mdc-checkbox__checkmark,.cdk-high-contrast-active .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark{color:CanvasText}.mdc-checkbox__checkmark-path{transition:stroke-dashoffset 180ms cubic-bezier(0.4, 0, 0.6, 1);stroke:currentColor;stroke-width:3.12px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-checkbox__mixedmark{width:100%;height:0;transform:scaleX(0) rotate(0deg);border-width:1px;border-style:solid;opacity:0;transition:opacity 90ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms cubic-bezier(0.4, 0, 0.6, 1);border-color:var(--mdc-checkbox-selected-checkmark-color, var(--mat-app-on-primary))}.cdk-high-contrast-active .mdc-checkbox__mixedmark{margin:0 1px}.mdc-checkbox--disabled .mdc-checkbox__mixedmark,.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark{border-color:var(--mdc-checkbox-disabled-selected-checkmark-color, var(--mat-app-surface))}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background{animation-duration:180ms;animation-timing-function:linear}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-unchecked-checked-checkmark-path 180ms linear;transition:none}.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear;transition:none}.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-checked-unchecked-checkmark-path 90ms linear;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark{animation:mdc-checkbox-checked-indeterminate-checkmark 90ms linear;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-checked-indeterminate-mixedmark 90ms linear;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark{animation:mdc-checkbox-indeterminate-checked-checkmark 500ms linear;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-checked-mixedmark 500ms linear;transition:none}.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear;transition:none}.mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background{transition:border-color 90ms cubic-bezier(0, 0, 0.2, 1),background-color 90ms cubic-bezier(0, 0, 0.2, 1)}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark-path{stroke-dashoffset:0}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity 180ms cubic-bezier(0, 0, 0.2, 1),transform 180ms cubic-bezier(0, 0, 0.2, 1);opacity:1}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(-45deg)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark{transform:rotate(45deg);opacity:0;transition:opacity 90ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(0deg);opacity:1}@keyframes mdc-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:29.7833385}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 1)}100%{stroke-dashoffset:0}}@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes mdc-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);opacity:1;stroke-dashoffset:0}to{opacity:0;stroke-dashoffset:-29.7833385}}@keyframes mdc-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(45deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(45deg);opacity:0}to{transform:rotate(360deg);opacity:1}}@keyframes mdc-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 1);transform:rotate(-45deg);opacity:0}to{transform:rotate(0deg);opacity:1}}@keyframes mdc-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(315deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;transform:scaleX(1);opacity:1}32.8%,100%{transform:scaleX(0);opacity:0}}.mat-mdc-checkbox{display:inline-block;position:relative;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-checkbox._mat-animation-noopable .mdc-checkbox *,.mat-mdc-checkbox._mat-animation-noopable .mdc-checkbox *::before{transition:none !important;animation:none !important}.mat-mdc-checkbox label{cursor:pointer}.mat-mdc-checkbox .mat-internal-form-field{color:var(--mat-checkbox-label-text-color, var(--mat-app-on-surface));font-family:var(--mat-checkbox-label-text-font, var(--mat-app-body-medium-font));line-height:var(--mat-checkbox-label-text-line-height, var(--mat-app-body-medium-line-height));font-size:var(--mat-checkbox-label-text-size, var(--mat-app-body-medium-size));letter-spacing:var(--mat-checkbox-label-text-tracking, var(--mat-app-body-medium-tracking));font-weight:var(--mat-checkbox-label-text-weight, var(--mat-app-body-medium-weight))}.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive{pointer-events:auto}.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive input{cursor:default}.mat-mdc-checkbox.mat-mdc-checkbox-disabled label{cursor:default;color:var(--mat-checkbox-disabled-label-color)}.mat-mdc-checkbox label:empty{display:none}.mat-mdc-checkbox .mdc-checkbox__ripple{opacity:0}.mat-mdc-checkbox-ripple,.mdc-checkbox__ripple{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:50%;pointer-events:none}.mat-mdc-checkbox-ripple:not(:empty),.mdc-checkbox__ripple:not(:empty){transform:translateZ(0)}.mat-mdc-checkbox-ripple .mat-ripple-element{opacity:.1}.mat-mdc-checkbox-touch-target{position:absolute;top:50%;left:50%;height:48px;width:48px;transform:translate(-50%, -50%);display:var(--mat-checkbox-touch-target-display)}.mat-mdc-checkbox-ripple::before{border-radius:50%}.mdc-checkbox__native-control:focus~.mat-mdc-focus-indicator::before{content:""}'],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCheckbox, [{
    type: Component,
    args: [{
      selector: "mat-checkbox",
      host: {
        "class": "mat-mdc-checkbox",
        "[attr.tabindex]": "null",
        "[attr.aria-label]": "null",
        "[attr.aria-labelledby]": "null",
        "[class._mat-animation-noopable]": `_animationMode === 'NoopAnimations'`,
        "[class.mdc-checkbox--disabled]": "disabled",
        "[id]": "id",
        // Add classes that users can use to more easily target disabled or checked checkboxes.
        "[class.mat-mdc-checkbox-disabled]": "disabled",
        "[class.mat-mdc-checkbox-checked]": "checked",
        "[class.mat-mdc-checkbox-disabled-interactive]": "disabledInteractive",
        "[class]": 'color ? "mat-" + color : "mat-accent"'
      },
      providers: [MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR, {
        provide: NG_VALIDATORS,
        useExisting: MatCheckbox,
        multi: true
      }],
      exportAs: "matCheckbox",
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [MatRipple, _MatInternalFormField],
      template: `<div mat-internal-form-field [labelPosition]="labelPosition" (click)="_preventBubblingFromLabel($event)">
  <div #checkbox class="mdc-checkbox">
    <!-- Render this element first so the input is on top. -->
    <div class="mat-mdc-checkbox-touch-target" (click)="_onTouchTargetClick()"></div>
    <input #input
           type="checkbox"
           class="mdc-checkbox__native-control"
           [class.mdc-checkbox--selected]="checked"
           [attr.aria-label]="ariaLabel || null"
           [attr.aria-labelledby]="ariaLabelledby"
           [attr.aria-describedby]="ariaDescribedby"
           [attr.aria-checked]="indeterminate ? 'mixed' : null"
           [attr.aria-disabled]="disabled && disabledInteractive ? true : null"
           [attr.name]="name"
           [attr.value]="value"
           [checked]="checked"
           [indeterminate]="indeterminate"
           [disabled]="disabled && !disabledInteractive"
           [id]="inputId"
           [required]="required"
           [tabIndex]="disabled && !disabledInteractive ? -1 : tabIndex"
           (blur)="_onBlur()"
           (click)="_onInputClick()"
           (change)="_onInteractionEvent($event)"/>
    <div class="mdc-checkbox__ripple"></div>
    <div class="mdc-checkbox__background">
      <svg class="mdc-checkbox__checkmark"
           focusable="false"
           viewBox="0 0 24 24"
           aria-hidden="true">
        <path class="mdc-checkbox__checkmark-path"
              fill="none"
              d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
      </svg>
      <div class="mdc-checkbox__mixedmark"></div>
    </div>
    <div class="mat-mdc-checkbox-ripple mat-mdc-focus-indicator" mat-ripple
      [matRippleTrigger]="checkbox"
      [matRippleDisabled]="disableRipple || disabled"
      [matRippleCentered]="true"></div>
  </div>
  <!--
    Avoid putting a click handler on the <label/> to fix duplicate navigation stop on Talk Back
    (#14385). Putting a click handler on the <label/> caused this bug because the browser produced
    an unnecessary accessibility tree node.
  -->
  <label class="mdc-label" #label [for]="inputId">
    <ng-content></ng-content>
  </label>
</div>
`,
      styles: ['.mdc-checkbox{display:inline-block;position:relative;flex:0 0 18px;box-sizing:content-box;width:18px;height:18px;line-height:0;white-space:nowrap;cursor:pointer;vertical-align:bottom;padding:calc((var(--mdc-checkbox-state-layer-size, 40px) - 18px)/2);margin:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px))/2)}.mdc-checkbox:hover .mdc-checkbox__ripple{opacity:var(--mdc-checkbox-unselected-hover-state-layer-opacity, var(--mat-app-hover-state-layer-opacity));background-color:var(--mdc-checkbox-unselected-hover-state-layer-color, var(--mat-app-on-surface))}.mdc-checkbox:hover .mat-mdc-checkbox-ripple .mat-ripple-element{background-color:var(--mdc-checkbox-unselected-hover-state-layer-color, var(--mat-app-on-surface))}.mdc-checkbox .mdc-checkbox__native-control:focus~.mdc-checkbox__ripple{opacity:var(--mdc-checkbox-unselected-focus-state-layer-opacity, var(--mat-app-focus-state-layer-opacity));background-color:var(--mdc-checkbox-unselected-focus-state-layer-color, var(--mat-app-on-surface))}.mdc-checkbox .mdc-checkbox__native-control:focus~.mat-mdc-checkbox-ripple .mat-ripple-element{background-color:var(--mdc-checkbox-unselected-focus-state-layer-color, var(--mat-app-on-surface))}.mdc-checkbox:active .mdc-checkbox__native-control~.mdc-checkbox__ripple{opacity:var(--mdc-checkbox-unselected-pressed-state-layer-opacity, var(--mat-app-pressed-state-layer-opacity));background-color:var(--mdc-checkbox-unselected-pressed-state-layer-color, var(--mat-app-primary))}.mdc-checkbox:active .mdc-checkbox__native-control~.mat-mdc-checkbox-ripple .mat-ripple-element{background-color:var(--mdc-checkbox-unselected-pressed-state-layer-color, var(--mat-app-primary))}.mdc-checkbox:hover .mdc-checkbox__native-control:checked~.mdc-checkbox__ripple{opacity:var(--mdc-checkbox-selected-hover-state-layer-opacity, var(--mat-app-hover-state-layer-opacity));background-color:var(--mdc-checkbox-selected-hover-state-layer-color, var(--mat-app-primary))}.mdc-checkbox:hover .mdc-checkbox__native-control:checked~.mat-mdc-checkbox-ripple .mat-ripple-element{background-color:var(--mdc-checkbox-selected-hover-state-layer-color, var(--mat-app-primary))}.mdc-checkbox .mdc-checkbox__native-control:focus:checked~.mdc-checkbox__ripple{opacity:var(--mdc-checkbox-selected-focus-state-layer-opacity, var(--mat-app-focus-state-layer-opacity));background-color:var(--mdc-checkbox-selected-focus-state-layer-color, var(--mat-app-primary))}.mdc-checkbox .mdc-checkbox__native-control:focus:checked~.mat-mdc-checkbox-ripple .mat-ripple-element{background-color:var(--mdc-checkbox-selected-focus-state-layer-color, var(--mat-app-primary))}.mdc-checkbox:active .mdc-checkbox__native-control:checked~.mdc-checkbox__ripple{opacity:var(--mdc-checkbox-selected-pressed-state-layer-opacity, var(--mat-app-pressed-state-layer-opacity));background-color:var(--mdc-checkbox-selected-pressed-state-layer-color, var(--mat-app-on-surface))}.mdc-checkbox:active .mdc-checkbox__native-control:checked~.mat-mdc-checkbox-ripple .mat-ripple-element{background-color:var(--mdc-checkbox-selected-pressed-state-layer-color, var(--mat-app-on-surface))}.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control~.mat-mdc-checkbox-ripple .mat-ripple-element,.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control~.mdc-checkbox__ripple{background-color:var(--mdc-checkbox-unselected-hover-state-layer-color, var(--mat-app-on-surface))}.mdc-checkbox .mdc-checkbox__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit;width:var(--mdc-checkbox-state-layer-size, 40px);height:var(--mdc-checkbox-state-layer-size, 40px);top:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px))/2);right:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px))/2);left:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px))/2)}.mdc-checkbox--disabled{cursor:default;pointer-events:none}.cdk-high-contrast-active .mdc-checkbox--disabled{opacity:.5}.mdc-checkbox__background{display:inline-flex;position:absolute;align-items:center;justify-content:center;box-sizing:border-box;width:18px;height:18px;border:2px solid currentColor;border-radius:2px;background-color:rgba(0,0,0,0);pointer-events:none;will-change:background-color,border-color;transition:background-color 90ms cubic-bezier(0.4, 0, 0.6, 1),border-color 90ms cubic-bezier(0.4, 0, 0.6, 1);-webkit-print-color-adjust:exact;color-adjust:exact;border-color:var(--mdc-checkbox-unselected-icon-color, var(--mat-app-on-surface-variant));top:calc((var(--mdc-checkbox-state-layer-size, 40px) - 18px)/2);left:calc((var(--mdc-checkbox-state-layer-size, 40px) - 18px)/2)}.mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background{border-color:var(--mdc-checkbox-selected-icon-color, var(--mat-app-primary));background-color:var(--mdc-checkbox-selected-icon-color, var(--mat-app-primary))}.mdc-checkbox--disabled .mdc-checkbox__background{border-color:var(--mdc-checkbox-disabled-unselected-icon-color)}.mdc-checkbox__native-control:disabled:checked~.mdc-checkbox__background,.mdc-checkbox__native-control:disabled:indeterminate~.mdc-checkbox__background{background-color:var(--mdc-checkbox-disabled-selected-icon-color);border-color:rgba(0,0,0,0)}.mdc-checkbox:hover .mdc-checkbox__native-control:not(:checked)~.mdc-checkbox__background,.mdc-checkbox:hover .mdc-checkbox__native-control:not(:indeterminate)~.mdc-checkbox__background{border-color:var(--mdc-checkbox-unselected-hover-icon-color, var(--mat-app-on-surface));background-color:rgba(0,0,0,0)}.mdc-checkbox:hover .mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mdc-checkbox:hover .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background{border-color:var(--mdc-checkbox-selected-hover-icon-color, var(--mat-app-primary));background-color:var(--mdc-checkbox-selected-hover-icon-color, var(--mat-app-primary))}.mdc-checkbox__native-control:focus:focus:not(:checked)~.mdc-checkbox__background,.mdc-checkbox__native-control:focus:focus:not(:indeterminate)~.mdc-checkbox__background{border-color:var(--mdc-checkbox-unselected-focus-icon-color, var(--mat-app-on-surface))}.mdc-checkbox__native-control:focus:focus:checked~.mdc-checkbox__background,.mdc-checkbox__native-control:focus:focus:indeterminate~.mdc-checkbox__background{border-color:var(--mdc-checkbox-selected-focus-icon-color, var(--mat-app-primary));background-color:var(--mdc-checkbox-selected-focus-icon-color, var(--mat-app-primary))}.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover .mdc-checkbox__native-control~.mdc-checkbox__background,.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus~.mdc-checkbox__background,.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background{border-color:var(--mdc-checkbox-disabled-unselected-icon-color)}.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background{background-color:var(--mdc-checkbox-disabled-selected-icon-color);border-color:rgba(0,0,0,0)}.mdc-checkbox__checkmark{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;opacity:0;transition:opacity 180ms cubic-bezier(0.4, 0, 0.6, 1);color:var(--mdc-checkbox-selected-checkmark-color, var(--mat-app-on-primary))}.cdk-high-contrast-active .mdc-checkbox__checkmark{color:CanvasText}.mdc-checkbox--disabled .mdc-checkbox__checkmark,.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark{color:var(--mdc-checkbox-disabled-selected-checkmark-color, var(--mat-app-surface))}.cdk-high-contrast-active .mdc-checkbox--disabled .mdc-checkbox__checkmark,.cdk-high-contrast-active .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark{color:CanvasText}.mdc-checkbox__checkmark-path{transition:stroke-dashoffset 180ms cubic-bezier(0.4, 0, 0.6, 1);stroke:currentColor;stroke-width:3.12px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-checkbox__mixedmark{width:100%;height:0;transform:scaleX(0) rotate(0deg);border-width:1px;border-style:solid;opacity:0;transition:opacity 90ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms cubic-bezier(0.4, 0, 0.6, 1);border-color:var(--mdc-checkbox-selected-checkmark-color, var(--mat-app-on-primary))}.cdk-high-contrast-active .mdc-checkbox__mixedmark{margin:0 1px}.mdc-checkbox--disabled .mdc-checkbox__mixedmark,.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark{border-color:var(--mdc-checkbox-disabled-selected-checkmark-color, var(--mat-app-surface))}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background{animation-duration:180ms;animation-timing-function:linear}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-unchecked-checked-checkmark-path 180ms linear;transition:none}.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear;transition:none}.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-checked-unchecked-checkmark-path 90ms linear;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark{animation:mdc-checkbox-checked-indeterminate-checkmark 90ms linear;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-checked-indeterminate-mixedmark 90ms linear;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark{animation:mdc-checkbox-indeterminate-checked-checkmark 500ms linear;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-checked-mixedmark 500ms linear;transition:none}.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear;transition:none}.mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background{transition:border-color 90ms cubic-bezier(0, 0, 0.2, 1),background-color 90ms cubic-bezier(0, 0, 0.2, 1)}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark-path{stroke-dashoffset:0}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity 180ms cubic-bezier(0, 0, 0.2, 1),transform 180ms cubic-bezier(0, 0, 0.2, 1);opacity:1}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(-45deg)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark{transform:rotate(45deg);opacity:0;transition:opacity 90ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(0deg);opacity:1}@keyframes mdc-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:29.7833385}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 1)}100%{stroke-dashoffset:0}}@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes mdc-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);opacity:1;stroke-dashoffset:0}to{opacity:0;stroke-dashoffset:-29.7833385}}@keyframes mdc-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(45deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(45deg);opacity:0}to{transform:rotate(360deg);opacity:1}}@keyframes mdc-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 1);transform:rotate(-45deg);opacity:0}to{transform:rotate(0deg);opacity:1}}@keyframes mdc-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(315deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;transform:scaleX(1);opacity:1}32.8%,100%{transform:scaleX(0);opacity:0}}.mat-mdc-checkbox{display:inline-block;position:relative;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-checkbox._mat-animation-noopable .mdc-checkbox *,.mat-mdc-checkbox._mat-animation-noopable .mdc-checkbox *::before{transition:none !important;animation:none !important}.mat-mdc-checkbox label{cursor:pointer}.mat-mdc-checkbox .mat-internal-form-field{color:var(--mat-checkbox-label-text-color, var(--mat-app-on-surface));font-family:var(--mat-checkbox-label-text-font, var(--mat-app-body-medium-font));line-height:var(--mat-checkbox-label-text-line-height, var(--mat-app-body-medium-line-height));font-size:var(--mat-checkbox-label-text-size, var(--mat-app-body-medium-size));letter-spacing:var(--mat-checkbox-label-text-tracking, var(--mat-app-body-medium-tracking));font-weight:var(--mat-checkbox-label-text-weight, var(--mat-app-body-medium-weight))}.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive{pointer-events:auto}.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive input{cursor:default}.mat-mdc-checkbox.mat-mdc-checkbox-disabled label{cursor:default;color:var(--mat-checkbox-disabled-label-color)}.mat-mdc-checkbox label:empty{display:none}.mat-mdc-checkbox .mdc-checkbox__ripple{opacity:0}.mat-mdc-checkbox-ripple,.mdc-checkbox__ripple{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:50%;pointer-events:none}.mat-mdc-checkbox-ripple:not(:empty),.mdc-checkbox__ripple:not(:empty){transform:translateZ(0)}.mat-mdc-checkbox-ripple .mat-ripple-element{opacity:.1}.mat-mdc-checkbox-touch-target{position:absolute;top:50%;left:50%;height:48px;width:48px;transform:translate(-50%, -50%);display:var(--mat-checkbox-touch-target-display)}.mat-mdc-checkbox-ripple::before{border-radius:50%}.mdc-checkbox__native-control:focus~.mat-mdc-focus-indicator::before{content:""}']
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }, {
    type: NgZone
  }, {
    type: void 0,
    decorators: [{
      type: Attribute,
      args: ["tabindex"]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [ANIMATION_MODULE_TYPE]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [MAT_CHECKBOX_DEFAULT_OPTIONS]
    }]
  }], {
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
    id: [{
      type: Input
    }],
    required: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    labelPosition: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    change: [{
      type: Output
    }],
    indeterminateChange: [{
      type: Output
    }],
    value: [{
      type: Input
    }],
    disableRipple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    _inputElement: [{
      type: ViewChild,
      args: ["input"]
    }],
    _labelElement: [{
      type: ViewChild,
      args: ["label"]
    }],
    tabIndex: [{
      type: Input,
      args: [{
        transform: (value) => value == null ? void 0 : numberAttribute(value)
      }]
    }],
    color: [{
      type: Input
    }],
    disabledInteractive: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    ripple: [{
      type: ViewChild,
      args: [MatRipple]
    }],
    checked: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    indeterminate: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var MAT_CHECKBOX_REQUIRED_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MatCheckboxRequiredValidator),
  multi: true
};
var MatCheckboxRequiredValidator = class _MatCheckboxRequiredValidator extends CheckboxRequiredValidator {
  static {
    this.\u0275fac = /* @__PURE__ */ (() => {
      let \u0275MatCheckboxRequiredValidator_BaseFactory;
      return function MatCheckboxRequiredValidator_Factory(__ngFactoryType__) {
        return (\u0275MatCheckboxRequiredValidator_BaseFactory || (\u0275MatCheckboxRequiredValidator_BaseFactory = \u0275\u0275getInheritedFactory(_MatCheckboxRequiredValidator)))(__ngFactoryType__ || _MatCheckboxRequiredValidator);
      };
    })();
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatCheckboxRequiredValidator,
      selectors: [["mat-checkbox", "required", "", "formControlName", ""], ["mat-checkbox", "required", "", "formControl", ""], ["mat-checkbox", "required", "", "ngModel", ""]],
      standalone: true,
      features: [\u0275\u0275ProvidersFeature([MAT_CHECKBOX_REQUIRED_VALIDATOR]), \u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCheckboxRequiredValidator, [{
    type: Directive,
    args: [{
      selector: `mat-checkbox[required][formControlName],
             mat-checkbox[required][formControl], mat-checkbox[required][ngModel]`,
      providers: [MAT_CHECKBOX_REQUIRED_VALIDATOR],
      standalone: true
    }]
  }], null, null);
})();
var _MatCheckboxRequiredValidatorModule = class __MatCheckboxRequiredValidatorModule {
  static {
    this.\u0275fac = function _MatCheckboxRequiredValidatorModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || __MatCheckboxRequiredValidatorModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: __MatCheckboxRequiredValidatorModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_MatCheckboxRequiredValidatorModule, [{
    type: NgModule,
    args: [{
      imports: [MatCheckboxRequiredValidator],
      exports: [MatCheckboxRequiredValidator]
    }]
  }], null, null);
})();
var MatCheckboxModule = class _MatCheckboxModule {
  static {
    this.\u0275fac = function MatCheckboxModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatCheckboxModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _MatCheckboxModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
      imports: [MatCheckbox, MatCommonModule, MatCommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCheckboxModule, [{
    type: NgModule,
    args: [{
      imports: [MatCheckbox, MatCommonModule],
      exports: [MatCheckbox, MatCommonModule]
    }]
  }], null, null);
})();

// src/app/features/revendeur/revendeur-form/revendeur-form.component.ts
function RevendeurFormComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "mat-spinner", 8);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "V\xE9rification de votre d\xE9p\xF4t...");
    \u0275\u0275elementEnd()();
  }
}
function RevendeurFormComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "mat-icon");
    \u0275\u0275text(2, "storefront");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "Votre d\xE9p\xF4t est d\xE9j\xE0 enregistr\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p")(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p");
    \u0275\u0275text(10, "Vous pouvez maintenant g\xE9rer votre catalogue et vos stocks.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 9)(12, "a", 10)(13, "mat-icon");
    \u0275\u0275text(14, "inventory_2");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15, " G\xE9rer mon catalogue ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.depotExistant().nom);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \xE0 ", ctx_r0.depotExistant().quartier, "");
  }
}
function RevendeurFormComponent_Conditional_9_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, "Informations du d\xE9p\xF4t");
  }
}
function RevendeurFormComponent_Conditional_9_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Le nom est obligatoire");
    \u0275\u0275elementEnd();
  }
}
function RevendeurFormComponent_Conditional_9_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Le quartier est obligatoire");
    \u0275\u0275elementEnd();
  }
}
function RevendeurFormComponent_Conditional_9_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Le t\xE9l\xE9phone est obligatoire");
    \u0275\u0275elementEnd();
  }
}
function RevendeurFormComponent_Conditional_9_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Format d'email invalide");
    \u0275\u0275elementEnd();
  }
}
function RevendeurFormComponent_Conditional_9_ng_template_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, "Localisation de votre d\xE9p\xF4t");
  }
}
function RevendeurFormComponent_Conditional_9_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 29);
  }
}
function RevendeurFormComponent_Conditional_9_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "my_location");
    \u0275\u0275elementEnd();
  }
}
function RevendeurFormComponent_Conditional_9_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "mat-icon");
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Position enregistr\xE9e avec succ\xE8s ");
    \u0275\u0275elementEnd();
  }
}
function RevendeurFormComponent_Conditional_9_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "La longitude est obligatoire");
    \u0275\u0275elementEnd();
  }
}
function RevendeurFormComponent_Conditional_9_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "La latitude est obligatoire");
    \u0275\u0275elementEnd();
  }
}
function RevendeurFormComponent_Conditional_9_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "mat-icon");
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.erreur, " ");
  }
}
function RevendeurFormComponent_Conditional_9_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "mat-icon");
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.erreur, " ");
  }
}
function RevendeurFormComponent_Conditional_9_Conditional_80_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 29);
  }
}
function RevendeurFormComponent_Conditional_9_Conditional_81_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "store");
    \u0275\u0275elementEnd();
  }
}
function RevendeurFormComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "mat-stepper", 11, 0)(3, "mat-step", 12)(4, "form", 13);
    \u0275\u0275template(5, RevendeurFormComponent_Conditional_9_ng_template_5_Template, 1, 0, "ng-template", 14);
    \u0275\u0275elementStart(6, "div", 15)(7, "mat-form-field", 16)(8, "mat-label");
    \u0275\u0275text(9, "Nom du d\xE9p\xF4t / raison sociale");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "input", 17);
    \u0275\u0275elementStart(11, "mat-icon", 18);
    \u0275\u0275text(12, "store");
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, RevendeurFormComponent_Conditional_9_Conditional_13_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 19)(15, "mat-form-field", 16)(16, "mat-label");
    \u0275\u0275text(17, "Quartier");
    \u0275\u0275elementEnd();
    \u0275\u0275element(18, "input", 20);
    \u0275\u0275elementStart(19, "mat-icon", 18);
    \u0275\u0275text(20, "location_city");
    \u0275\u0275elementEnd();
    \u0275\u0275template(21, RevendeurFormComponent_Conditional_9_Conditional_21_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "mat-form-field", 16)(23, "mat-label");
    \u0275\u0275text(24, "T\xE9l\xE9phone");
    \u0275\u0275elementEnd();
    \u0275\u0275element(25, "input", 21);
    \u0275\u0275elementStart(26, "mat-icon", 18);
    \u0275\u0275text(27, "phone");
    \u0275\u0275elementEnd();
    \u0275\u0275template(28, RevendeurFormComponent_Conditional_9_Conditional_28_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "mat-form-field", 16)(30, "mat-label");
    \u0275\u0275text(31, "Adresse compl\xE8te (optionnelle)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(32, "input", 22);
    \u0275\u0275elementStart(33, "mat-icon", 18);
    \u0275\u0275text(34, "place");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "mat-form-field", 16)(36, "mat-label");
    \u0275\u0275text(37, "Email (optionnel)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(38, "input", 23);
    \u0275\u0275elementStart(39, "mat-icon", 18);
    \u0275\u0275text(40, "email");
    \u0275\u0275elementEnd();
    \u0275\u0275template(41, RevendeurFormComponent_Conditional_9_Conditional_41_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "mat-checkbox", 24)(43, "span");
    \u0275\u0275text(44, "Je propose la livraison \xE0 domicile");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 9)(46, "button", 25);
    \u0275\u0275text(47, " Suivant ");
    \u0275\u0275elementStart(48, "mat-icon");
    \u0275\u0275text(49, "arrow_forward");
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(50, "mat-step", 26)(51, "form", 13);
    \u0275\u0275template(52, RevendeurFormComponent_Conditional_9_ng_template_52_Template, 1, 0, "ng-template", 14);
    \u0275\u0275elementStart(53, "div", 15)(54, "p", 27);
    \u0275\u0275text(55, " Votre position GPS permet aux clients de vous trouver facilement. Cliquez sur le bouton ci-dessous ou saisissez manuellement vos coordonn\xE9es. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "button", 28);
    \u0275\u0275listener("click", function RevendeurFormComponent_Conditional_9_Template_button_click_56_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.utiliserMaPosition());
    });
    \u0275\u0275template(57, RevendeurFormComponent_Conditional_9_Conditional_57_Template, 1, 0, "mat-spinner", 29)(58, RevendeurFormComponent_Conditional_9_Conditional_58_Template, 2, 0, "mat-icon");
    \u0275\u0275text(59, " Utiliser ma position actuelle ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(60, RevendeurFormComponent_Conditional_9_Conditional_60_Template, 4, 0, "div", 30);
    \u0275\u0275elementStart(61, "div", 19)(62, "mat-form-field", 31)(63, "mat-label");
    \u0275\u0275text(64, "Longitude");
    \u0275\u0275elementEnd();
    \u0275\u0275element(65, "input", 32);
    \u0275\u0275template(66, RevendeurFormComponent_Conditional_9_Conditional_66_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "mat-form-field", 31)(68, "mat-label");
    \u0275\u0275text(69, "Latitude");
    \u0275\u0275elementEnd();
    \u0275\u0275element(70, "input", 33);
    \u0275\u0275template(71, RevendeurFormComponent_Conditional_9_Conditional_71_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(72, RevendeurFormComponent_Conditional_9_Conditional_72_Template, 4, 1, "div", 34)(73, RevendeurFormComponent_Conditional_9_Conditional_73_Template, 4, 1, "div", 34);
    \u0275\u0275elementStart(74, "div", 9)(75, "button", 35)(76, "mat-icon");
    \u0275\u0275text(77, "arrow_back");
    \u0275\u0275elementEnd();
    \u0275\u0275text(78, " Pr\xE9c\xE9dent ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "button", 36);
    \u0275\u0275listener("click", function RevendeurFormComponent_Conditional_9_Template_button_click_79_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.soumettre());
    });
    \u0275\u0275template(80, RevendeurFormComponent_Conditional_9_Conditional_80_Template, 1, 0, "mat-spinner", 29)(81, RevendeurFormComponent_Conditional_9_Conditional_81_Template, 2, 0, "mat-icon");
    \u0275\u0275text(82, " Inscrire mon d\xE9p\xF4t ");
    \u0275\u0275elementEnd()()()()()()();
  }
  if (rf & 2) {
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    let tmp_15_0;
    let tmp_16_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("linear", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("stepControl", ctx_r0.etape1);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r0.etape1);
    \u0275\u0275advance(9);
    \u0275\u0275conditional(((tmp_5_0 = ctx_r0.etape1.get("nom")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx_r0.etape1.get("nom")) == null ? null : tmp_5_0.touched) ? 13 : -1);
    \u0275\u0275advance(8);
    \u0275\u0275conditional(((tmp_6_0 = ctx_r0.etape1.get("quartier")) == null ? null : tmp_6_0.invalid) && ((tmp_6_0 = ctx_r0.etape1.get("quartier")) == null ? null : tmp_6_0.touched) ? 21 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(((tmp_7_0 = ctx_r0.etape1.get("telephone")) == null ? null : tmp_7_0.invalid) && ((tmp_7_0 = ctx_r0.etape1.get("telephone")) == null ? null : tmp_7_0.touched) ? 28 : -1);
    \u0275\u0275advance(13);
    \u0275\u0275conditional(((tmp_8_0 = ctx_r0.etape1.get("email")) == null ? null : tmp_8_0.hasError("email")) ? 41 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r0.etape1.invalid);
    \u0275\u0275advance(4);
    \u0275\u0275property("stepControl", ctx_r0.etape2);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r0.etape2);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r0.chargementGeo());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.chargementGeo() ? 57 : 58);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.positionObtenue() ? 60 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(((tmp_15_0 = ctx_r0.etape2.get("longitude")) == null ? null : tmp_15_0.invalid) && ((tmp_15_0 = ctx_r0.etape2.get("longitude")) == null ? null : tmp_15_0.touched) ? 66 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(((tmp_16_0 = ctx_r0.etape2.get("latitude")) == null ? null : tmp_16_0.invalid) && ((tmp_16_0 = ctx_r0.etape2.get("latitude")) == null ? null : tmp_16_0.touched) ? 71 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.erreur ? 72 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.erreur ? 73 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", ctx_r0.etape2.invalid || ctx_r0.envoi);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.envoi ? 80 : 81);
  }
}
var RevendeurFormComponent = class _RevendeurFormComponent {
  constructor() {
    this.fb = inject(FormBuilder);
    this.revendeurService = inject(RevendeurService);
    this.geoService = inject(GeolocationService);
    this.router = inject(Router);
    this.snackBar = inject(MatSnackBar);
    this.marques = [];
    this.envoi = false;
    this.erreur = null;
    this.depotExistant = signal(null);
    this.chargementDepot = signal(true);
    this.chargementGeo = signal(false);
    this.positionObtenue = signal(false);
    this.etape1 = this.fb.group({
      nom: ["", Validators.required],
      quartier: ["", Validators.required],
      telephone: ["", Validators.required],
      adresse: [""],
      email: ["", Validators.email],
      livraison: [false]
    });
    this.etape2 = this.fb.group({
      longitude: ["", Validators.required],
      latitude: ["", Validators.required]
    });
  }
  ngOnInit() {
    this.revendeurService.getRevendeurByUserId().subscribe({
      next: (revendeur) => {
        this.depotExistant.set(revendeur);
        this.chargementDepot.set(false);
      },
      error: () => {
        this.chargementDepot.set(false);
      }
    });
  }
  ajouterMarque(marque) {
    const marqueNettoyee = marque.trim();
    if (marqueNettoyee && !this.marques.includes(marqueNettoyee)) {
      this.marques = [...this.marques, marqueNettoyee];
    }
  }
  supprimerMarque(index) {
    this.marques = this.marques.filter((_, i) => i !== index);
  }
  utiliserMaPosition() {
    this.chargementGeo.set(true);
    this.erreur = null;
    this.geoService.getCurrentPosition().subscribe({
      next: (position) => {
        this.etape2.patchValue({
          longitude: position.coords.longitude.toFixed(6),
          latitude: position.coords.latitude.toFixed(6)
        });
        this.chargementGeo.set(false);
        this.positionObtenue.set(true);
      },
      error: (message) => {
        this.chargementGeo.set(false);
        this.erreur = message;
      }
    });
  }
  soumettre() {
    if (this.etape1.invalid || this.etape2.invalid) {
      this.etape1.markAllAsTouched();
      this.etape2.markAllAsTouched();
      return;
    }
    this.envoi = true;
    this.erreur = null;
    const dto = {
      nom: this.etape1.value.nom,
      quartier: this.etape1.value.quartier,
      telephone: this.etape1.value.telephone,
      adresse: this.etape1.value.adresse || "",
      email: this.etape1.value.email || void 0,
      livraison: this.etape1.value.livraison,
      marques: this.marques,
      location: [
        parseFloat(this.etape2.value.longitude),
        parseFloat(this.etape2.value.latitude)
      ]
    };
    this.revendeurService.inscrire(dto).subscribe({
      next: () => {
        this.envoi = false;
        this.snackBar.open("Votre d\xE9p\xF4t a \xE9t\xE9 inscrit avec succ\xE8s !", "OK", { duration: 5e3 });
        this.router.navigate(["/revendeur/catalogue"]);
      },
      error: (err) => {
        this.envoi = false;
        this.erreur = err.message || "Une erreur s'est produite lors de l'inscription";
      }
    });
  }
  static {
    this.\u0275fac = function RevendeurFormComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _RevendeurFormComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RevendeurFormComponent, selectors: [["app-revendeur-form"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 10, vars: 1, consts: [["stepper", ""], [1, "page-inscription"], [1, "container"], [1, "entete-page"], [1, "sous-titre"], [1, "etat-depot"], [1, "etat-depot", "depot-existant"], [1, "formulaire-carte"], ["diameter", "40"], [1, "actions-etape"], ["mat-raised-button", "", "routerLink", "/revendeur/catalogue", 1, "btn-inscrire"], ["orientation", "vertical", 3, "linear"], [3, "stepControl"], [3, "formGroup"], ["matStepLabel", ""], [1, "etape-contenu"], ["appearance", "outline", 1, "champ-pleine-largeur"], ["matInput", "", "formControlName", "nom", "placeholder", "Ex: D\xE9p\xF4t de gaz Akpakpa"], ["matPrefix", ""], [1, "deux-colonnes"], ["matInput", "", "formControlName", "quartier", "placeholder", "Ex: Akpakpa"], ["matInput", "", "formControlName", "telephone", "placeholder", "Ex: 97000000"], ["matInput", "", "formControlName", "adresse", "placeholder", "Ex: En face du march\xE9 Godomey"], ["matInput", "", "type", "email", "formControlName", "email", "placeholder", "depot@exemple.com"], ["formControlName", "livraison", 1, "checkbox-livraison"], ["mat-raised-button", "", "matStepperNext", "", "type", "button", 1, "btn-suivant", 3, "disabled"], ["label", "Localisation de votre d\xE9p\xF4t", 3, "stepControl"], [1, "description-localisation"], ["mat-stroked-button", "", "type", "button", 1, "btn-localiser", 3, "click", "disabled"], ["diameter", "18"], [1, "position-succes"], ["appearance", "outline"], ["matInput", "", "type", "number", "formControlName", "longitude", "placeholder", "Ex: 2.3912", "step", "0.0001"], ["matInput", "", "type", "number", "formControlName", "latitude", "placeholder", "Ex: 6.3703", "step", "0.0001"], [1, "erreur"], ["mat-button", "", "matStepperPrevious", "", "type", "button"], ["mat-raised-button", "", "type", "button", 1, "btn-inscrire", 3, "click", "disabled"]], template: function RevendeurFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "h1");
        \u0275\u0275text(4, "Inscrire mon d\xE9p\xF4t de gaz");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 4);
        \u0275\u0275text(6, "Rejoignez GazFacile et soyez visible par des milliers de clients au B\xE9nin");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(7, RevendeurFormComponent_Conditional_7_Template, 4, 0, "div", 5)(8, RevendeurFormComponent_Conditional_8_Template, 16, 2, "div", 6)(9, RevendeurFormComponent_Conditional_9_Template, 83, 19, "div", 7);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275conditional(ctx.chargementDepot() ? 7 : ctx.depotExistant() ? 8 : 9);
      }
    }, dependencies: [
      CommonModule,
      ReactiveFormsModule,
      \u0275NgNoValidate,
      DefaultValueAccessor,
      NumberValueAccessor,
      NgControlStatus,
      NgControlStatusGroup,
      FormGroupDirective,
      FormControlName,
      RouterLink,
      MatStepperModule,
      MatStep,
      MatStepLabel,
      MatStepper,
      MatStepperNext,
      MatStepperPrevious,
      MatFormFieldModule,
      MatFormField,
      MatLabel,
      MatError,
      MatPrefix,
      MatInputModule,
      MatInput,
      MatButtonModule,
      MatAnchor,
      MatButton,
      MatIconModule,
      MatIcon,
      MatCheckboxModule,
      MatCheckbox,
      MatChipsModule,
      MatProgressSpinnerModule,
      MatProgressSpinner,
      MatSnackBarModule
    ], styles: ['\n\n.page-inscription[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 64px);\n  background-color: var(--color-bg);\n  padding: 40px 16px;\n}\n.entete-page[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 32px;\n  h1 {\n    font-family: "Syne", sans-serif;\n    font-size: 2rem;\n    color: var(--color-text);\n    margin-bottom: 8px;\n  }\n  .sous-titre {\n    color: var(--color-text-muted);\n    font-size: 1rem;\n  }\n}\n.formulaire-carte[_ngcontent-%COMP%] {\n  max-width: 680px;\n  margin: 0 auto;\n  background: var(--color-surface);\n  border-radius: var(--radius-lg);\n  border: 1px solid var(--color-border);\n  padding: 32px;\n  ::ng-deep .mat-stepper-vertical {\n    background: transparent;\n  }\n  ::ng-deep .mat-step-header {\n    padding: 16px 0;\n    &:hover {\n      background: transparent;\n    }\n  }\n  ::ng-deep .mat-step-label {\n    font-family: "Syne", sans-serif;\n    font-weight: 600;\n    color: var(--color-text);\n  }\n  ::ng-deep .mat-step-icon {\n    background-color: var(--color-primary) !important;\n  }\n}\n.etat-depot[_ngcontent-%COMP%] {\n  max-width: 680px;\n  margin: 0 auto;\n  background: var(--color-surface);\n  border-radius: var(--radius-lg);\n  border: 1px solid var(--color-border);\n  padding: 40px 32px;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  color: var(--color-text-muted);\n  mat-icon {\n    font-size: 3rem;\n    width: 3rem;\n    height: 3rem;\n    color: var(--color-primary);\n  }\n  h2 {\n    margin: 0;\n    font-family: "Syne", sans-serif;\n    font-size: 1.5rem;\n    color: var(--color-text);\n  }\n  p {\n    margin: 0;\n  }\n}\n.etape-contenu[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  padding: 16px 0;\n}\n.champ-pleine-largeur[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.deux-colonnes[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n  @media (max-width: 480px) {\n    grid-template-columns: 1fr;\n  }\n}\n.label-section[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--color-text-muted);\n  margin-bottom: 8px;\n  display: block;\n}\n.section-marques[_ngcontent-%COMP%] {\n  background: var(--color-surface-2);\n  border-radius: var(--radius-sm);\n  padding: 14px;\n}\n.ajout-marque[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  .champ-marque {\n    flex: 1;\n  }\n  button {\n    color: var(--color-primary);\n  }\n}\n.liste-marques[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin-top: 8px;\n}\n.chip-marque[_ngcontent-%COMP%] {\n  background-color: var(--color-surface-3) !important;\n  color: var(--color-text) !important;\n}\n.aide-marques[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: var(--color-text-muted);\n  font-style: italic;\n}\n.checkbox-livraison[_ngcontent-%COMP%] {\n  color: var(--color-text);\n}\n.description-localisation[_ngcontent-%COMP%] {\n  font-size: 0.88rem;\n  color: var(--color-text-muted);\n  line-height: 1.5;\n}\n.btn-localiser[_ngcontent-%COMP%] {\n  border-color: var(--color-primary) !important;\n  color: var(--color-primary) !important;\n  gap: 8px;\n  &:hover {\n    background-color: var(--color-primary-light) !important;\n  }\n  mat-spinner {\n    margin-right: 6px;\n  }\n}\n.position-succes[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: var(--color-success);\n  font-size: 0.88rem;\n  padding: 8px 12px;\n  background: var(--color-success-bg);\n  border-radius: var(--radius-sm);\n}\n.erreur[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: var(--color-danger);\n  font-size: 0.88rem;\n  padding: 10px 14px;\n  background: var(--color-danger-bg);\n  border-radius: var(--radius-sm);\n}\n.actions-etape[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  margin-top: 8px;\n}\n.btn-suivant[_ngcontent-%COMP%], \n.btn-inscrire[_ngcontent-%COMP%] {\n  background-color: var(--color-primary) !important;\n  color: white !important;\n  &:disabled {\n    background-color: var(--color-surface-3) !important;\n    color: var(--color-text-muted) !important;\n  }\n  mat-spinner {\n    margin-right: 6px;\n  }\n}\n/*# sourceMappingURL=revendeur-form.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RevendeurFormComponent, { className: "RevendeurFormComponent", filePath: "src/app/features/revendeur/revendeur-form/revendeur-form.component.ts", lineNumber: 454 });
})();
export {
  RevendeurFormComponent
};
//# sourceMappingURL=chunk-4LLSR7OP.js.map
