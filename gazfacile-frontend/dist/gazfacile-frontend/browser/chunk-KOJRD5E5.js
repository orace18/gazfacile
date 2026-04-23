import {
  ConsultationService,
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from "./chunk-63NJ4UGD.js";
import {
  GeolocationService
} from "./chunk-GHUJAIHG.js";
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
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardModule
} from "./chunk-F6R477Z4.js";
import {
  MatChip,
  MatChipsModule
} from "./chunk-U6JHCC4C.js";
import {
  SubscriptionService
} from "./chunk-LQSNXUHW.js";
import {
  MatSnackBar,
  MatSnackBarModule,
  SelectionModel,
  UniqueSelectionDispatcher
} from "./chunk-OX2RSX6O.js";
import {
  PaiementService
} from "./chunk-QHRSHWYM.js";
import {
  AuthService
} from "./chunk-E64KMFYK.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatInput,
  MatInputModule,
  MatLabel,
  MatPrefix,
  MatSuffix,
  MaxValidator,
  MinValidator,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
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
import {
  environment
} from "./chunk-AH3PCQNR.js";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-UZFV4MWN.js";
import {
  InscriptionStateService
} from "./chunk-BRGDXGZJ.js";
import {
  ClientNeed,
  ModePaiement,
  Role,
  StockStatus,
  TypeTransaction
} from "./chunk-NOBLHMTB.js";
import {
  Router,
  RouterLink,
  RouterModule
} from "./chunk-C43TOPVJ.js";
import {
  ANIMATION_MODULE_TYPE,
  Attribute,
  BehaviorSubject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  CommonModule,
  Component,
  ContentChildren,
  DOWN_ARROW,
  DatePipe,
  DecimalPipe,
  Directionality,
  Directive,
  ENTER,
  ElementRef,
  EventEmitter,
  FocusMonitor,
  HttpClient,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  LEFT_ARROW,
  MatCommonModule,
  MatIcon,
  MatIconModule,
  MatOption,
  MatPseudoCheckbox,
  MatRipple,
  MatRippleModule,
  NgModule,
  NgZone,
  Observable,
  Optional,
  Output,
  PLATFORM_ID,
  RIGHT_ARROW,
  SPACE,
  Subject,
  UP_ARROW,
  ViewChild,
  ViewEncapsulation$1,
  _MatInternalFormField,
  __async,
  __spreadProps,
  __spreadValues,
  afterNextRender,
  booleanAttribute,
  catchError,
  combineLatest,
  computed,
  effect,
  forwardRef,
  inject,
  isPlatformBrowser,
  map,
  numberAttribute,
  setClassMetadata,
  signal,
  switchMap,
  take,
  takeUntil,
  throwError,
  ɵsetClassDebugInfo,
  ɵɵInputTransformsFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵinjectAttribute,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵviewQuery
} from "./chunk-XDS62WGT.js";

// node_modules/@angular/google-maps/fesm2022/google-maps.mjs
var _c0 = ["*"];
var MapEventManager = class {
  /** Clears all currently-registered event listeners. */
  _clearListeners() {
    for (const listener of this._listeners) {
      listener.remove();
    }
    this._listeners = [];
  }
  constructor(_ngZone) {
    this._ngZone = _ngZone;
    this._pending = [];
    this._listeners = [];
    this._targetStream = new BehaviorSubject(void 0);
  }
  /** Gets an observable that adds an event listener to the map when a consumer subscribes to it. */
  getLazyEmitter(name) {
    return this._targetStream.pipe(switchMap((target) => {
      const observable = new Observable((observer) => {
        if (!target) {
          this._pending.push({
            observable,
            observer
          });
          return void 0;
        }
        const listener = target.addListener(name, (event) => {
          this._ngZone.run(() => observer.next(event));
        });
        if (!listener) {
          observer.complete();
          return void 0;
        }
        this._listeners.push(listener);
        return () => listener.remove();
      });
      return observable;
    }));
  }
  /** Sets the current target that the manager should bind events to. */
  setTarget(target) {
    const currentTarget = this._targetStream.value;
    if (target === currentTarget) {
      return;
    }
    if (currentTarget) {
      this._clearListeners();
      this._pending = [];
    }
    this._targetStream.next(target);
    this._pending.forEach((subscriber) => subscriber.observable.subscribe(subscriber.observer));
    this._pending = [];
  }
  /** Destroys the manager and clears the event listeners. */
  destroy() {
    this._clearListeners();
    this._pending = [];
    this._targetStream.complete();
  }
};
var DEFAULT_OPTIONS = {
  center: {
    lat: 37.421995,
    lng: -122.084092
  },
  zoom: 17,
  // Note: the type conversion here isn't necessary for our CI, but it resolves a g3 failure.
  mapTypeId: "roadmap"
};
var DEFAULT_HEIGHT = "500px";
var DEFAULT_WIDTH = "500px";
var GoogleMap = class _GoogleMap {
  set center(center) {
    this._center = center;
  }
  set zoom(zoom) {
    this._zoom = zoom;
  }
  set options(options) {
    this._options = options || DEFAULT_OPTIONS;
  }
  constructor(_elementRef, _ngZone, platformId) {
    this._elementRef = _elementRef;
    this._ngZone = _ngZone;
    this._eventManager = new MapEventManager(inject(NgZone));
    this.height = DEFAULT_HEIGHT;
    this.width = DEFAULT_WIDTH;
    this._options = DEFAULT_OPTIONS;
    this.mapInitialized = new EventEmitter();
    this.authFailure = new EventEmitter();
    this.boundsChanged = this._eventManager.getLazyEmitter("bounds_changed");
    this.centerChanged = this._eventManager.getLazyEmitter("center_changed");
    this.mapClick = this._eventManager.getLazyEmitter("click");
    this.mapDblclick = this._eventManager.getLazyEmitter("dblclick");
    this.mapDrag = this._eventManager.getLazyEmitter("drag");
    this.mapDragend = this._eventManager.getLazyEmitter("dragend");
    this.mapDragstart = this._eventManager.getLazyEmitter("dragstart");
    this.headingChanged = this._eventManager.getLazyEmitter("heading_changed");
    this.idle = this._eventManager.getLazyEmitter("idle");
    this.maptypeidChanged = this._eventManager.getLazyEmitter("maptypeid_changed");
    this.mapMousemove = this._eventManager.getLazyEmitter("mousemove");
    this.mapMouseout = this._eventManager.getLazyEmitter("mouseout");
    this.mapMouseover = this._eventManager.getLazyEmitter("mouseover");
    this.projectionChanged = this._eventManager.getLazyEmitter("projection_changed");
    this.mapRightclick = this._eventManager.getLazyEmitter("rightclick");
    this.tilesloaded = this._eventManager.getLazyEmitter("tilesloaded");
    this.tiltChanged = this._eventManager.getLazyEmitter("tilt_changed");
    this.zoomChanged = this._eventManager.getLazyEmitter("zoom_changed");
    this._isBrowser = isPlatformBrowser(platformId);
    if (this._isBrowser) {
      const googleMapsWindow = window;
      if (!googleMapsWindow.google && (typeof ngDevMode === "undefined" || ngDevMode)) {
        throw Error("Namespace google not found, cannot construct embedded google map. Please install the Google Maps JavaScript API: https://developers.google.com/maps/documentation/javascript/tutorial#Loading_the_Maps_API");
      }
      this._existingAuthFailureCallback = googleMapsWindow.gm_authFailure;
      googleMapsWindow.gm_authFailure = () => {
        if (this._existingAuthFailureCallback) {
          this._existingAuthFailureCallback();
        }
        this.authFailure.emit();
      };
    }
  }
  ngOnChanges(changes) {
    if (changes["height"] || changes["width"]) {
      this._setSize();
    }
    const googleMap = this.googleMap;
    if (googleMap) {
      if (changes["options"]) {
        googleMap.setOptions(this._combineOptions());
      }
      if (changes["center"] && this._center) {
        googleMap.setCenter(this._center);
      }
      if (changes["zoom"] && this._zoom != null) {
        googleMap.setZoom(this._zoom);
      }
      if (changes["mapTypeId"] && this.mapTypeId) {
        googleMap.setMapTypeId(this.mapTypeId);
      }
    }
  }
  ngOnInit() {
    if (this._isBrowser) {
      this._mapEl = this._elementRef.nativeElement.querySelector(".map-container");
      this._setSize();
      if (google.maps.Map) {
        this._initialize(google.maps.Map);
      } else {
        this._ngZone.runOutsideAngular(() => {
          google.maps.importLibrary("maps").then((lib) => this._initialize(lib.Map));
        });
      }
    }
  }
  _initialize(mapConstructor) {
    this._ngZone.runOutsideAngular(() => {
      this.googleMap = new mapConstructor(this._mapEl, this._combineOptions());
      this._eventManager.setTarget(this.googleMap);
      this.mapInitialized.emit(this.googleMap);
    });
  }
  ngOnDestroy() {
    this.mapInitialized.complete();
    this._eventManager.destroy();
    if (this._isBrowser) {
      const googleMapsWindow = window;
      googleMapsWindow.gm_authFailure = this._existingAuthFailureCallback;
    }
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.fitBounds
   */
  fitBounds(bounds, padding) {
    this._assertInitialized();
    this.googleMap.fitBounds(bounds, padding);
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.panBy
   */
  panBy(x, y) {
    this._assertInitialized();
    this.googleMap.panBy(x, y);
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.panTo
   */
  panTo(latLng) {
    this._assertInitialized();
    this.googleMap.panTo(latLng);
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.panToBounds
   */
  panToBounds(latLngBounds, padding) {
    this._assertInitialized();
    this.googleMap.panToBounds(latLngBounds, padding);
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.getBounds
   */
  getBounds() {
    this._assertInitialized();
    return this.googleMap.getBounds() || null;
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.getCenter
   */
  getCenter() {
    this._assertInitialized();
    return this.googleMap.getCenter();
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.getClickableIcons
   */
  getClickableIcons() {
    this._assertInitialized();
    return this.googleMap.getClickableIcons();
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.getHeading
   */
  getHeading() {
    this._assertInitialized();
    return this.googleMap.getHeading();
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.getMapTypeId
   */
  getMapTypeId() {
    this._assertInitialized();
    return this.googleMap.getMapTypeId();
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.getProjection
   */
  getProjection() {
    this._assertInitialized();
    return this.googleMap.getProjection() || null;
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.getStreetView
   */
  getStreetView() {
    this._assertInitialized();
    return this.googleMap.getStreetView();
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.getTilt
   */
  getTilt() {
    this._assertInitialized();
    return this.googleMap.getTilt();
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.getZoom
   */
  getZoom() {
    this._assertInitialized();
    return this.googleMap.getZoom();
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.controls
   */
  get controls() {
    this._assertInitialized();
    return this.googleMap.controls;
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.data
   */
  get data() {
    this._assertInitialized();
    return this.googleMap.data;
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.mapTypes
   */
  get mapTypes() {
    this._assertInitialized();
    return this.googleMap.mapTypes;
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.overlayMapTypes
   */
  get overlayMapTypes() {
    this._assertInitialized();
    return this.googleMap.overlayMapTypes;
  }
  /** Returns a promise that resolves when the map has been initialized. */
  _resolveMap() {
    return this.googleMap ? Promise.resolve(this.googleMap) : this.mapInitialized.pipe(take(1)).toPromise();
  }
  _setSize() {
    if (this._mapEl) {
      const styles = this._mapEl.style;
      styles.height = this.height === null ? "" : coerceCssPixelValue(this.height) || DEFAULT_HEIGHT;
      styles.width = this.width === null ? "" : coerceCssPixelValue(this.width) || DEFAULT_WIDTH;
    }
  }
  /** Combines the center and zoom and the other map options into a single object */
  _combineOptions() {
    const options = this._options || {};
    return __spreadProps(__spreadValues({}, options), {
      // It's important that we set **some** kind of `center` and `zoom`, otherwise
      // Google Maps will render a blank rectangle which looks broken.
      center: this._center || options.center || DEFAULT_OPTIONS.center,
      zoom: this._zoom ?? options.zoom ?? DEFAULT_OPTIONS.zoom,
      // Passing in an undefined `mapTypeId` seems to break tile loading
      // so make sure that we have some kind of default (see #22082).
      mapTypeId: this.mapTypeId || options.mapTypeId || DEFAULT_OPTIONS.mapTypeId,
      mapId: this.mapId || options.mapId
    });
  }
  /** Asserts that the map has been initialized. */
  _assertInitialized() {
    if (!this.googleMap && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error("Cannot access Google Map information before the API has been initialized. Please wait for the API to load before trying to interact with it.");
    }
  }
  static {
    this.\u0275fac = function GoogleMap_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _GoogleMap)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(PLATFORM_ID));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _GoogleMap,
      selectors: [["google-map"]],
      inputs: {
        height: "height",
        width: "width",
        mapId: "mapId",
        mapTypeId: "mapTypeId",
        center: "center",
        zoom: "zoom",
        options: "options"
      },
      outputs: {
        mapInitialized: "mapInitialized",
        authFailure: "authFailure",
        boundsChanged: "boundsChanged",
        centerChanged: "centerChanged",
        mapClick: "mapClick",
        mapDblclick: "mapDblclick",
        mapDrag: "mapDrag",
        mapDragend: "mapDragend",
        mapDragstart: "mapDragstart",
        headingChanged: "headingChanged",
        idle: "idle",
        maptypeidChanged: "maptypeidChanged",
        mapMousemove: "mapMousemove",
        mapMouseout: "mapMouseout",
        mapMouseover: "mapMouseover",
        projectionChanged: "projectionChanged",
        mapRightclick: "mapRightclick",
        tilesloaded: "tilesloaded",
        tiltChanged: "tiltChanged",
        zoomChanged: "zoomChanged"
      },
      exportAs: ["googleMap"],
      standalone: true,
      features: [\u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature],
      ngContentSelectors: _c0,
      decls: 2,
      vars: 0,
      consts: [[1, "map-container"]],
      template: function GoogleMap_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef();
          \u0275\u0275element(0, "div", 0);
          \u0275\u0275projection(1);
        }
      },
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GoogleMap, [{
    type: Component,
    args: [{
      selector: "google-map",
      exportAs: "googleMap",
      standalone: true,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: '<div class="map-container"></div><ng-content />',
      encapsulation: ViewEncapsulation$1.None
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: NgZone
  }, {
    type: Object,
    decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }]
  }], {
    height: [{
      type: Input
    }],
    width: [{
      type: Input
    }],
    mapId: [{
      type: Input
    }],
    mapTypeId: [{
      type: Input
    }],
    center: [{
      type: Input
    }],
    zoom: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    mapInitialized: [{
      type: Output
    }],
    authFailure: [{
      type: Output
    }],
    boundsChanged: [{
      type: Output
    }],
    centerChanged: [{
      type: Output
    }],
    mapClick: [{
      type: Output
    }],
    mapDblclick: [{
      type: Output
    }],
    mapDrag: [{
      type: Output
    }],
    mapDragend: [{
      type: Output
    }],
    mapDragstart: [{
      type: Output
    }],
    headingChanged: [{
      type: Output
    }],
    idle: [{
      type: Output
    }],
    maptypeidChanged: [{
      type: Output
    }],
    mapMousemove: [{
      type: Output
    }],
    mapMouseout: [{
      type: Output
    }],
    mapMouseover: [{
      type: Output
    }],
    projectionChanged: [{
      type: Output
    }],
    mapRightclick: [{
      type: Output
    }],
    tilesloaded: [{
      type: Output
    }],
    tiltChanged: [{
      type: Output
    }],
    zoomChanged: [{
      type: Output
    }]
  });
})();
var cssUnitsPattern = /([A-Za-z%]+)$/;
function coerceCssPixelValue(value) {
  if (value == null) {
    return "";
  }
  return cssUnitsPattern.test(value) ? value : `${value}px`;
}
var MapBaseLayer = class _MapBaseLayer {
  constructor(_map, _ngZone) {
    this._map = _map;
    this._ngZone = _ngZone;
  }
  ngOnInit() {
    if (this._map._isBrowser) {
      this._ngZone.runOutsideAngular(() => {
        this._initializeObject();
      });
      this._assertInitialized();
      this._setMap();
    }
  }
  ngOnDestroy() {
    this._unsetMap();
  }
  _assertInitialized() {
    if (!this._map.googleMap) {
      throw Error("Cannot access Google Map information before the API has been initialized. Please wait for the API to load before trying to interact with it.");
    }
  }
  _initializeObject() {
  }
  _setMap() {
  }
  _unsetMap() {
  }
  static {
    this.\u0275fac = function MapBaseLayer_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MapBaseLayer)(\u0275\u0275directiveInject(GoogleMap), \u0275\u0275directiveInject(NgZone));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MapBaseLayer,
      selectors: [["map-base-layer"]],
      exportAs: ["mapBaseLayer"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapBaseLayer, [{
    type: Directive,
    args: [{
      selector: "map-base-layer",
      exportAs: "mapBaseLayer",
      standalone: true
    }]
  }], () => [{
    type: GoogleMap
  }, {
    type: NgZone
  }], null);
})();
var MapBicyclingLayer = class _MapBicyclingLayer {
  constructor() {
    this._map = inject(GoogleMap);
    this._zone = inject(NgZone);
    this.bicyclingLayerInitialized = new EventEmitter();
  }
  ngOnInit() {
    if (this._map._isBrowser) {
      if (google.maps.BicyclingLayer && this._map.googleMap) {
        this._initialize(this._map.googleMap, google.maps.BicyclingLayer);
      } else {
        this._zone.runOutsideAngular(() => {
          Promise.all([this._map._resolveMap(), google.maps.importLibrary("maps")]).then(([map2, lib]) => {
            this._initialize(map2, lib.BicyclingLayer);
          });
        });
      }
    }
  }
  _initialize(map2, layerConstructor) {
    this._zone.runOutsideAngular(() => {
      this.bicyclingLayer = new layerConstructor();
      this.bicyclingLayerInitialized.emit(this.bicyclingLayer);
      this._assertLayerInitialized();
      this.bicyclingLayer.setMap(map2);
    });
  }
  ngOnDestroy() {
    this.bicyclingLayer?.setMap(null);
  }
  _assertLayerInitialized() {
    if (!this.bicyclingLayer) {
      throw Error("Cannot interact with a Google Map Bicycling Layer before it has been initialized. Please wait for the Transit Layer to load before trying to interact with it.");
    }
  }
  static {
    this.\u0275fac = function MapBicyclingLayer_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MapBicyclingLayer)();
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MapBicyclingLayer,
      selectors: [["map-bicycling-layer"]],
      outputs: {
        bicyclingLayerInitialized: "bicyclingLayerInitialized"
      },
      exportAs: ["mapBicyclingLayer"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapBicyclingLayer, [{
    type: Directive,
    args: [{
      selector: "map-bicycling-layer",
      exportAs: "mapBicyclingLayer",
      standalone: true
    }]
  }], null, {
    bicyclingLayerInitialized: [{
      type: Output
    }]
  });
})();
var MapCircle = class _MapCircle {
  set options(options) {
    this._options.next(options || {});
  }
  set center(center) {
    this._center.next(center);
  }
  set radius(radius) {
    this._radius.next(radius);
  }
  constructor(_map, _ngZone) {
    this._map = _map;
    this._ngZone = _ngZone;
    this._eventManager = new MapEventManager(inject(NgZone));
    this._options = new BehaviorSubject({});
    this._center = new BehaviorSubject(void 0);
    this._radius = new BehaviorSubject(void 0);
    this._destroyed = new Subject();
    this.centerChanged = this._eventManager.getLazyEmitter("center_changed");
    this.circleClick = this._eventManager.getLazyEmitter("click");
    this.circleDblclick = this._eventManager.getLazyEmitter("dblclick");
    this.circleDrag = this._eventManager.getLazyEmitter("drag");
    this.circleDragend = this._eventManager.getLazyEmitter("dragend");
    this.circleDragstart = this._eventManager.getLazyEmitter("dragstart");
    this.circleMousedown = this._eventManager.getLazyEmitter("mousedown");
    this.circleMousemove = this._eventManager.getLazyEmitter("mousemove");
    this.circleMouseout = this._eventManager.getLazyEmitter("mouseout");
    this.circleMouseover = this._eventManager.getLazyEmitter("mouseover");
    this.circleMouseup = this._eventManager.getLazyEmitter("mouseup");
    this.radiusChanged = this._eventManager.getLazyEmitter("radius_changed");
    this.circleRightclick = this._eventManager.getLazyEmitter("rightclick");
    this.circleInitialized = new EventEmitter();
  }
  ngOnInit() {
    if (!this._map._isBrowser) {
      return;
    }
    this._combineOptions().pipe(take(1)).subscribe((options) => {
      if (google.maps.Circle && this._map.googleMap) {
        this._initialize(this._map.googleMap, google.maps.Circle, options);
      } else {
        this._ngZone.runOutsideAngular(() => {
          Promise.all([this._map._resolveMap(), google.maps.importLibrary("maps")]).then(([map2, lib]) => {
            this._initialize(map2, lib.Circle, options);
          });
        });
      }
    });
  }
  _initialize(map2, circleConstructor, options) {
    this._ngZone.runOutsideAngular(() => {
      this.circle = new circleConstructor(options);
      this._assertInitialized();
      this.circle.setMap(map2);
      this._eventManager.setTarget(this.circle);
      this.circleInitialized.emit(this.circle);
      this._watchForOptionsChanges();
      this._watchForCenterChanges();
      this._watchForRadiusChanges();
    });
  }
  ngOnDestroy() {
    this._eventManager.destroy();
    this._destroyed.next();
    this._destroyed.complete();
    this.circle?.setMap(null);
  }
  /**
   * @see
   * developers.google.com/maps/documentation/javascript/reference/polygon#Circle.getBounds
   */
  getBounds() {
    this._assertInitialized();
    return this.circle.getBounds();
  }
  /**
   * @see
   * developers.google.com/maps/documentation/javascript/reference/polygon#Circle.getCenter
   */
  getCenter() {
    this._assertInitialized();
    return this.circle.getCenter();
  }
  /**
   * @see
   * developers.google.com/maps/documentation/javascript/reference/polygon#Circle.getDraggable
   */
  getDraggable() {
    this._assertInitialized();
    return this.circle.getDraggable();
  }
  /**
   * @see
   * developers.google.com/maps/documentation/javascript/reference/polygon#Circle.getEditable
   */
  getEditable() {
    this._assertInitialized();
    return this.circle.getEditable();
  }
  /**
   * @see
   * developers.google.com/maps/documentation/javascript/reference/polygon#Circle.getRadius
   */
  getRadius() {
    this._assertInitialized();
    return this.circle.getRadius();
  }
  /**
   * @see
   * developers.google.com/maps/documentation/javascript/reference/polygon#Circle.getVisible
   */
  getVisible() {
    this._assertInitialized();
    return this.circle.getVisible();
  }
  _combineOptions() {
    return combineLatest([this._options, this._center, this._radius]).pipe(map(([options, center, radius]) => {
      const combinedOptions = __spreadProps(__spreadValues({}, options), {
        center: center || options.center,
        radius: radius !== void 0 ? radius : options.radius
      });
      return combinedOptions;
    }));
  }
  _watchForOptionsChanges() {
    this._options.pipe(takeUntil(this._destroyed)).subscribe((options) => {
      this._assertInitialized();
      this.circle.setOptions(options);
    });
  }
  _watchForCenterChanges() {
    this._center.pipe(takeUntil(this._destroyed)).subscribe((center) => {
      if (center) {
        this._assertInitialized();
        this.circle.setCenter(center);
      }
    });
  }
  _watchForRadiusChanges() {
    this._radius.pipe(takeUntil(this._destroyed)).subscribe((radius) => {
      if (radius !== void 0) {
        this._assertInitialized();
        this.circle.setRadius(radius);
      }
    });
  }
  _assertInitialized() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this.circle) {
        throw Error("Cannot interact with a Google Map Circle before it has been initialized. Please wait for the Circle to load before trying to interact with it.");
      }
    }
  }
  static {
    this.\u0275fac = function MapCircle_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MapCircle)(\u0275\u0275directiveInject(GoogleMap), \u0275\u0275directiveInject(NgZone));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MapCircle,
      selectors: [["map-circle"]],
      inputs: {
        options: "options",
        center: "center",
        radius: "radius"
      },
      outputs: {
        centerChanged: "centerChanged",
        circleClick: "circleClick",
        circleDblclick: "circleDblclick",
        circleDrag: "circleDrag",
        circleDragend: "circleDragend",
        circleDragstart: "circleDragstart",
        circleMousedown: "circleMousedown",
        circleMousemove: "circleMousemove",
        circleMouseout: "circleMouseout",
        circleMouseover: "circleMouseover",
        circleMouseup: "circleMouseup",
        radiusChanged: "radiusChanged",
        circleRightclick: "circleRightclick",
        circleInitialized: "circleInitialized"
      },
      exportAs: ["mapCircle"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapCircle, [{
    type: Directive,
    args: [{
      selector: "map-circle",
      exportAs: "mapCircle",
      standalone: true
    }]
  }], () => [{
    type: GoogleMap
  }, {
    type: NgZone
  }], {
    options: [{
      type: Input
    }],
    center: [{
      type: Input
    }],
    radius: [{
      type: Input
    }],
    centerChanged: [{
      type: Output
    }],
    circleClick: [{
      type: Output
    }],
    circleDblclick: [{
      type: Output
    }],
    circleDrag: [{
      type: Output
    }],
    circleDragend: [{
      type: Output
    }],
    circleDragstart: [{
      type: Output
    }],
    circleMousedown: [{
      type: Output
    }],
    circleMousemove: [{
      type: Output
    }],
    circleMouseout: [{
      type: Output
    }],
    circleMouseover: [{
      type: Output
    }],
    circleMouseup: [{
      type: Output
    }],
    radiusChanged: [{
      type: Output
    }],
    circleRightclick: [{
      type: Output
    }],
    circleInitialized: [{
      type: Output
    }]
  });
})();
var MapDirectionsRenderer = class _MapDirectionsRenderer {
  /**
   * See developers.google.com/maps/documentation/javascript/reference/directions
   * #DirectionsRendererOptions.directions
   */
  set directions(directions) {
    this._directions = directions;
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/directions
   * #DirectionsRendererOptions
   */
  set options(options) {
    this._options = options;
  }
  constructor(_googleMap, _ngZone) {
    this._googleMap = _googleMap;
    this._ngZone = _ngZone;
    this._eventManager = new MapEventManager(inject(NgZone));
    this.directionsChanged = this._eventManager.getLazyEmitter("directions_changed");
    this.directionsRendererInitialized = new EventEmitter();
  }
  ngOnInit() {
    if (this._googleMap._isBrowser) {
      if (google.maps.DirectionsRenderer && this._googleMap.googleMap) {
        this._initialize(this._googleMap.googleMap, google.maps.DirectionsRenderer);
      } else {
        this._ngZone.runOutsideAngular(() => {
          Promise.all([this._googleMap._resolveMap(), google.maps.importLibrary("routes")]).then(([map2, lib]) => {
            this._initialize(map2, lib.DirectionsRenderer);
          });
        });
      }
    }
  }
  _initialize(map2, rendererConstructor) {
    this._ngZone.runOutsideAngular(() => {
      this.directionsRenderer = new rendererConstructor(this._combineOptions());
      this._assertInitialized();
      this.directionsRenderer.setMap(map2);
      this._eventManager.setTarget(this.directionsRenderer);
      this.directionsRendererInitialized.emit(this.directionsRenderer);
    });
  }
  ngOnChanges(changes) {
    if (this.directionsRenderer) {
      if (changes["options"]) {
        this.directionsRenderer.setOptions(this._combineOptions());
      }
      if (changes["directions"] && this._directions !== void 0) {
        this.directionsRenderer.setDirections(this._directions);
      }
    }
  }
  ngOnDestroy() {
    this._eventManager.destroy();
    this.directionsRenderer?.setMap(null);
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/directions
   * #DirectionsRenderer.getDirections
   */
  getDirections() {
    this._assertInitialized();
    return this.directionsRenderer.getDirections();
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/directions
   * #DirectionsRenderer.getPanel
   */
  getPanel() {
    this._assertInitialized();
    return this.directionsRenderer.getPanel();
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/directions
   * #DirectionsRenderer.getRouteIndex
   */
  getRouteIndex() {
    this._assertInitialized();
    return this.directionsRenderer.getRouteIndex();
  }
  _combineOptions() {
    const options = this._options || {};
    return __spreadProps(__spreadValues({}, options), {
      directions: this._directions || options.directions,
      map: this._googleMap.googleMap
    });
  }
  _assertInitialized() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this.directionsRenderer) {
        throw Error("Cannot interact with a Google Map Directions Renderer before it has been initialized. Please wait for the Directions Renderer to load before trying to interact with it.");
      }
    }
  }
  static {
    this.\u0275fac = function MapDirectionsRenderer_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MapDirectionsRenderer)(\u0275\u0275directiveInject(GoogleMap), \u0275\u0275directiveInject(NgZone));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MapDirectionsRenderer,
      selectors: [["map-directions-renderer"]],
      inputs: {
        directions: "directions",
        options: "options"
      },
      outputs: {
        directionsChanged: "directionsChanged",
        directionsRendererInitialized: "directionsRendererInitialized"
      },
      exportAs: ["mapDirectionsRenderer"],
      standalone: true,
      features: [\u0275\u0275NgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapDirectionsRenderer, [{
    type: Directive,
    args: [{
      selector: "map-directions-renderer",
      exportAs: "mapDirectionsRenderer",
      standalone: true
    }]
  }], () => [{
    type: GoogleMap
  }, {
    type: NgZone
  }], {
    directions: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    directionsChanged: [{
      type: Output
    }],
    directionsRendererInitialized: [{
      type: Output
    }]
  });
})();
var MapGroundOverlay = class _MapGroundOverlay {
  /** URL of the image that will be shown in the overlay. */
  set url(url) {
    this._url.next(url);
  }
  /** Bounds for the overlay. */
  get bounds() {
    return this._bounds.value;
  }
  set bounds(bounds) {
    this._bounds.next(bounds);
  }
  /** Opacity of the overlay. */
  set opacity(opacity) {
    this._opacity.next(opacity);
  }
  constructor(_map, _ngZone) {
    this._map = _map;
    this._ngZone = _ngZone;
    this._eventManager = new MapEventManager(inject(NgZone));
    this._opacity = new BehaviorSubject(1);
    this._url = new BehaviorSubject("");
    this._bounds = new BehaviorSubject(void 0);
    this._destroyed = new Subject();
    this.clickable = false;
    this.mapClick = this._eventManager.getLazyEmitter("click");
    this.mapDblclick = this._eventManager.getLazyEmitter("dblclick");
    this.groundOverlayInitialized = new EventEmitter();
  }
  ngOnInit() {
    if (this._map._isBrowser) {
      this._bounds.pipe(takeUntil(this._destroyed)).subscribe((bounds) => {
        if (this.groundOverlay) {
          this.groundOverlay.setMap(null);
          this.groundOverlay = void 0;
        }
        if (!bounds) {
          return;
        }
        if (google.maps.GroundOverlay && this._map.googleMap) {
          this._initialize(this._map.googleMap, google.maps.GroundOverlay, bounds);
        } else {
          this._ngZone.runOutsideAngular(() => {
            Promise.all([this._map._resolveMap(), google.maps.importLibrary("maps")]).then(([map2, lib]) => {
              this._initialize(map2, lib.GroundOverlay, bounds);
            });
          });
        }
      });
    }
  }
  _initialize(map2, overlayConstructor, bounds) {
    this._ngZone.runOutsideAngular(() => {
      this.groundOverlay = new overlayConstructor(this._url.getValue(), bounds, {
        clickable: this.clickable,
        opacity: this._opacity.value
      });
      this._assertInitialized();
      this.groundOverlay.setMap(map2);
      this._eventManager.setTarget(this.groundOverlay);
      this.groundOverlayInitialized.emit(this.groundOverlay);
      if (!this._hasWatchers) {
        this._hasWatchers = true;
        this._watchForOpacityChanges();
        this._watchForUrlChanges();
      }
    });
  }
  ngOnDestroy() {
    this._eventManager.destroy();
    this._destroyed.next();
    this._destroyed.complete();
    this.groundOverlay?.setMap(null);
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/image-overlay
   * #GroundOverlay.getBounds
   */
  getBounds() {
    this._assertInitialized();
    return this.groundOverlay.getBounds();
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/image-overlay
   * #GroundOverlay.getOpacity
   */
  getOpacity() {
    this._assertInitialized();
    return this.groundOverlay.getOpacity();
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/image-overlay
   * #GroundOverlay.getUrl
   */
  getUrl() {
    this._assertInitialized();
    return this.groundOverlay.getUrl();
  }
  _watchForOpacityChanges() {
    this._opacity.pipe(takeUntil(this._destroyed)).subscribe((opacity) => {
      if (opacity != null) {
        this.groundOverlay?.setOpacity(opacity);
      }
    });
  }
  _watchForUrlChanges() {
    this._url.pipe(takeUntil(this._destroyed)).subscribe((url) => {
      const overlay = this.groundOverlay;
      if (overlay) {
        overlay.set("url", url);
        overlay.setMap(null);
        overlay.setMap(this._map.googleMap);
      }
    });
  }
  _assertInitialized() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this.groundOverlay) {
        throw Error("Cannot interact with a Google Map GroundOverlay before it has been initialized. Please wait for the GroundOverlay to load before trying to interact with it.");
      }
    }
  }
  static {
    this.\u0275fac = function MapGroundOverlay_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MapGroundOverlay)(\u0275\u0275directiveInject(GoogleMap), \u0275\u0275directiveInject(NgZone));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MapGroundOverlay,
      selectors: [["map-ground-overlay"]],
      inputs: {
        url: "url",
        bounds: "bounds",
        clickable: "clickable",
        opacity: "opacity"
      },
      outputs: {
        mapClick: "mapClick",
        mapDblclick: "mapDblclick",
        groundOverlayInitialized: "groundOverlayInitialized"
      },
      exportAs: ["mapGroundOverlay"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapGroundOverlay, [{
    type: Directive,
    args: [{
      selector: "map-ground-overlay",
      exportAs: "mapGroundOverlay",
      standalone: true
    }]
  }], () => [{
    type: GoogleMap
  }, {
    type: NgZone
  }], {
    url: [{
      type: Input
    }],
    bounds: [{
      type: Input
    }],
    clickable: [{
      type: Input
    }],
    opacity: [{
      type: Input
    }],
    mapClick: [{
      type: Output
    }],
    mapDblclick: [{
      type: Output
    }],
    groundOverlayInitialized: [{
      type: Output
    }]
  });
})();
var MapInfoWindow = class _MapInfoWindow {
  set options(options) {
    this._options.next(options || {});
  }
  set position(position) {
    this._position.next(position);
  }
  constructor(_googleMap, _elementRef, _ngZone) {
    this._googleMap = _googleMap;
    this._elementRef = _elementRef;
    this._ngZone = _ngZone;
    this._eventManager = new MapEventManager(inject(NgZone));
    this._options = new BehaviorSubject({});
    this._position = new BehaviorSubject(void 0);
    this._destroy = new Subject();
    this.closeclick = this._eventManager.getLazyEmitter("closeclick");
    this.contentChanged = this._eventManager.getLazyEmitter("content_changed");
    this.domready = this._eventManager.getLazyEmitter("domready");
    this.positionChanged = this._eventManager.getLazyEmitter("position_changed");
    this.zindexChanged = this._eventManager.getLazyEmitter("zindex_changed");
    this.infoWindowInitialized = new EventEmitter();
  }
  ngOnInit() {
    if (this._googleMap._isBrowser) {
      this._combineOptions().pipe(take(1)).subscribe((options) => {
        if (google.maps.InfoWindow) {
          this._initialize(google.maps.InfoWindow, options);
        } else {
          this._ngZone.runOutsideAngular(() => {
            google.maps.importLibrary("maps").then((lib) => {
              this._initialize(lib.InfoWindow, options);
            });
          });
        }
      });
    }
  }
  _initialize(infoWindowConstructor, options) {
    this._ngZone.runOutsideAngular(() => {
      this.infoWindow = new infoWindowConstructor(options);
      this._eventManager.setTarget(this.infoWindow);
      this.infoWindowInitialized.emit(this.infoWindow);
      this._watchForOptionsChanges();
      this._watchForPositionChanges();
    });
  }
  ngOnDestroy() {
    this._eventManager.destroy();
    this._destroy.next();
    this._destroy.complete();
    if (this.infoWindow) {
      this.close();
    }
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindow.close
   */
  close() {
    this._assertInitialized();
    this.infoWindow.close();
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindow.getContent
   */
  getContent() {
    this._assertInitialized();
    return this.infoWindow.getContent() || null;
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/info-window
   * #InfoWindow.getPosition
   */
  getPosition() {
    this._assertInitialized();
    return this.infoWindow.getPosition() || null;
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindow.getZIndex
   */
  getZIndex() {
    this._assertInitialized();
    return this.infoWindow.getZIndex();
  }
  /**
   * Opens the MapInfoWindow using the provided AdvancedMarkerElement.
   * @deprecated Use the `open` method instead.
   * @breaking-change 20.0.0
   */
  openAdvancedMarkerElement(advancedMarkerElement, content) {
    this.open({
      getAnchor: () => advancedMarkerElement
    }, void 0, content);
  }
  /**
   * Opens the MapInfoWindow using the provided anchor. If the anchor is not set,
   * then the position property of the options input is used instead.
   */
  open(anchor, shouldFocus, content) {
    this._assertInitialized();
    if ((typeof ngDevMode === "undefined" || ngDevMode) && anchor && !anchor.getAnchor) {
      throw new Error("Specified anchor does not implement the `getAnchor` method. It cannot be used to open an info window.");
    }
    const anchorObject = anchor ? anchor.getAnchor() : void 0;
    if (this.infoWindow.get("anchor") !== anchorObject || !anchorObject) {
      this._elementRef.nativeElement.style.display = "";
      if (content) {
        this.infoWindow.setContent(content);
      }
      this.infoWindow.open({
        map: this._googleMap.googleMap,
        anchor: anchorObject,
        shouldFocus
      });
    }
  }
  _combineOptions() {
    return combineLatest([this._options, this._position]).pipe(map(([options, position]) => {
      const combinedOptions = __spreadProps(__spreadValues({}, options), {
        position: position || options.position,
        content: this._elementRef.nativeElement
      });
      return combinedOptions;
    }));
  }
  _watchForOptionsChanges() {
    this._options.pipe(takeUntil(this._destroy)).subscribe((options) => {
      this._assertInitialized();
      this.infoWindow.setOptions(options);
    });
  }
  _watchForPositionChanges() {
    this._position.pipe(takeUntil(this._destroy)).subscribe((position) => {
      if (position) {
        this._assertInitialized();
        this.infoWindow.setPosition(position);
      }
    });
  }
  _assertInitialized() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this.infoWindow) {
        throw Error("Cannot interact with a Google Map Info Window before it has been initialized. Please wait for the Info Window to load before trying to interact with it.");
      }
    }
  }
  static {
    this.\u0275fac = function MapInfoWindow_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MapInfoWindow)(\u0275\u0275directiveInject(GoogleMap), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(NgZone));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MapInfoWindow,
      selectors: [["map-info-window"]],
      hostAttrs: [2, "display", "none"],
      inputs: {
        options: "options",
        position: "position"
      },
      outputs: {
        closeclick: "closeclick",
        contentChanged: "contentChanged",
        domready: "domready",
        positionChanged: "positionChanged",
        zindexChanged: "zindexChanged",
        infoWindowInitialized: "infoWindowInitialized"
      },
      exportAs: ["mapInfoWindow"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapInfoWindow, [{
    type: Directive,
    args: [{
      selector: "map-info-window",
      exportAs: "mapInfoWindow",
      standalone: true,
      host: {
        "style": "display: none"
      }
    }]
  }], () => [{
    type: GoogleMap
  }, {
    type: ElementRef
  }, {
    type: NgZone
  }], {
    options: [{
      type: Input
    }],
    position: [{
      type: Input
    }],
    closeclick: [{
      type: Output
    }],
    contentChanged: [{
      type: Output
    }],
    domready: [{
      type: Output
    }],
    positionChanged: [{
      type: Output
    }],
    zindexChanged: [{
      type: Output
    }],
    infoWindowInitialized: [{
      type: Output
    }]
  });
})();
var MapKmlLayer = class _MapKmlLayer {
  set options(options) {
    this._options.next(options || {});
  }
  set url(url) {
    this._url.next(url);
  }
  constructor(_map, _ngZone) {
    this._map = _map;
    this._ngZone = _ngZone;
    this._eventManager = new MapEventManager(inject(NgZone));
    this._options = new BehaviorSubject({});
    this._url = new BehaviorSubject("");
    this._destroyed = new Subject();
    this.kmlClick = this._eventManager.getLazyEmitter("click");
    this.defaultviewportChanged = this._eventManager.getLazyEmitter("defaultviewport_changed");
    this.statusChanged = this._eventManager.getLazyEmitter("status_changed");
    this.kmlLayerInitialized = new EventEmitter();
  }
  ngOnInit() {
    if (this._map._isBrowser) {
      this._combineOptions().pipe(take(1)).subscribe((options) => {
        if (google.maps.KmlLayer && this._map.googleMap) {
          this._initialize(this._map.googleMap, google.maps.KmlLayer, options);
        } else {
          this._ngZone.runOutsideAngular(() => {
            Promise.all([this._map._resolveMap(), google.maps.importLibrary("maps")]).then(([map2, lib]) => {
              this._initialize(map2, lib.KmlLayer, options);
            });
          });
        }
      });
    }
  }
  _initialize(map2, layerConstructor, options) {
    this._ngZone.runOutsideAngular(() => {
      this.kmlLayer = new layerConstructor(options);
      this._assertInitialized();
      this.kmlLayer.setMap(map2);
      this._eventManager.setTarget(this.kmlLayer);
      this.kmlLayerInitialized.emit(this.kmlLayer);
      this._watchForOptionsChanges();
      this._watchForUrlChanges();
    });
  }
  ngOnDestroy() {
    this._eventManager.destroy();
    this._destroyed.next();
    this._destroyed.complete();
    this.kmlLayer?.setMap(null);
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/kml#KmlLayer.getDefaultViewport
   */
  getDefaultViewport() {
    this._assertInitialized();
    return this.kmlLayer.getDefaultViewport();
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/kml#KmlLayer.getMetadata
   */
  getMetadata() {
    this._assertInitialized();
    return this.kmlLayer.getMetadata();
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/kml#KmlLayer.getStatus
   */
  getStatus() {
    this._assertInitialized();
    return this.kmlLayer.getStatus();
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/kml#KmlLayer.getUrl
   */
  getUrl() {
    this._assertInitialized();
    return this.kmlLayer.getUrl();
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/kml#KmlLayer.getZIndex
   */
  getZIndex() {
    this._assertInitialized();
    return this.kmlLayer.getZIndex();
  }
  _combineOptions() {
    return combineLatest([this._options, this._url]).pipe(map(([options, url]) => {
      const combinedOptions = __spreadProps(__spreadValues({}, options), {
        url: url || options.url
      });
      return combinedOptions;
    }));
  }
  _watchForOptionsChanges() {
    this._options.pipe(takeUntil(this._destroyed)).subscribe((options) => {
      if (this.kmlLayer) {
        this._assertInitialized();
        this.kmlLayer.setOptions(options);
      }
    });
  }
  _watchForUrlChanges() {
    this._url.pipe(takeUntil(this._destroyed)).subscribe((url) => {
      if (url && this.kmlLayer) {
        this._assertInitialized();
        this.kmlLayer.setUrl(url);
      }
    });
  }
  _assertInitialized() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this.kmlLayer) {
        throw Error("Cannot interact with a Google Map KmlLayer before it has been initialized. Please wait for the KmlLayer to load before trying to interact with it.");
      }
    }
  }
  static {
    this.\u0275fac = function MapKmlLayer_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MapKmlLayer)(\u0275\u0275directiveInject(GoogleMap), \u0275\u0275directiveInject(NgZone));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MapKmlLayer,
      selectors: [["map-kml-layer"]],
      inputs: {
        options: "options",
        url: "url"
      },
      outputs: {
        kmlClick: "kmlClick",
        defaultviewportChanged: "defaultviewportChanged",
        statusChanged: "statusChanged",
        kmlLayerInitialized: "kmlLayerInitialized"
      },
      exportAs: ["mapKmlLayer"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapKmlLayer, [{
    type: Directive,
    args: [{
      selector: "map-kml-layer",
      exportAs: "mapKmlLayer",
      standalone: true
    }]
  }], () => [{
    type: GoogleMap
  }, {
    type: NgZone
  }], {
    options: [{
      type: Input
    }],
    url: [{
      type: Input
    }],
    kmlClick: [{
      type: Output
    }],
    defaultviewportChanged: [{
      type: Output
    }],
    statusChanged: [{
      type: Output
    }],
    kmlLayerInitialized: [{
      type: Output
    }]
  });
})();
var DEFAULT_MARKER_OPTIONS$1 = {
  position: {
    lat: 37.421995,
    lng: -122.084092
  }
};
var MapMarker = class _MapMarker {
  /**
   * Title of the marker.
   * See: developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions.title
   */
  set title(title) {
    this._title = title;
  }
  /**
   * Position of the marker. See:
   * developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions.position
   */
  set position(position) {
    this._position = position;
  }
  /**
   * Label for the marker.
   * See: developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions.label
   */
  set label(label) {
    this._label = label;
  }
  /**
   * Whether the marker is clickable. See:
   * developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions.clickable
   */
  set clickable(clickable) {
    this._clickable = clickable;
  }
  /**
   * Options used to configure the marker.
   * See: developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions
   */
  set options(options) {
    this._options = options;
  }
  /**
   * Icon to be used for the marker.
   * See: https://developers.google.com/maps/documentation/javascript/reference/marker#Icon
   */
  set icon(icon) {
    this._icon = icon;
  }
  /**
   * Whether the marker is visible.
   * See: developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions.visible
   */
  set visible(value) {
    this._visible = value;
  }
  constructor(_googleMap, _ngZone) {
    this._googleMap = _googleMap;
    this._ngZone = _ngZone;
    this._eventManager = new MapEventManager(inject(NgZone));
    this.animationChanged = this._eventManager.getLazyEmitter("animation_changed");
    this.mapClick = this._eventManager.getLazyEmitter("click");
    this.clickableChanged = this._eventManager.getLazyEmitter("clickable_changed");
    this.cursorChanged = this._eventManager.getLazyEmitter("cursor_changed");
    this.mapDblclick = this._eventManager.getLazyEmitter("dblclick");
    this.mapDrag = this._eventManager.getLazyEmitter("drag");
    this.mapDragend = this._eventManager.getLazyEmitter("dragend");
    this.draggableChanged = this._eventManager.getLazyEmitter("draggable_changed");
    this.mapDragstart = this._eventManager.getLazyEmitter("dragstart");
    this.flatChanged = this._eventManager.getLazyEmitter("flat_changed");
    this.iconChanged = this._eventManager.getLazyEmitter("icon_changed");
    this.mapMousedown = this._eventManager.getLazyEmitter("mousedown");
    this.mapMouseout = this._eventManager.getLazyEmitter("mouseout");
    this.mapMouseover = this._eventManager.getLazyEmitter("mouseover");
    this.mapMouseup = this._eventManager.getLazyEmitter("mouseup");
    this.positionChanged = this._eventManager.getLazyEmitter("position_changed");
    this.mapRightclick = this._eventManager.getLazyEmitter("rightclick");
    this.shapeChanged = this._eventManager.getLazyEmitter("shape_changed");
    this.titleChanged = this._eventManager.getLazyEmitter("title_changed");
    this.visibleChanged = this._eventManager.getLazyEmitter("visible_changed");
    this.zindexChanged = this._eventManager.getLazyEmitter("zindex_changed");
    this.markerInitialized = new EventEmitter();
  }
  ngOnInit() {
    if (!this._googleMap._isBrowser) {
      return;
    }
    if (google.maps.Marker && this._googleMap.googleMap) {
      this._initialize(this._googleMap.googleMap, google.maps.Marker);
    } else {
      this._ngZone.runOutsideAngular(() => {
        Promise.all([this._googleMap._resolveMap(), google.maps.importLibrary("marker")]).then(([map2, lib]) => {
          this._initialize(map2, lib.Marker);
        });
      });
    }
  }
  _initialize(map2, markerConstructor) {
    this._ngZone.runOutsideAngular(() => {
      this.marker = new markerConstructor(this._combineOptions());
      this._assertInitialized();
      this.marker.setMap(map2);
      this._eventManager.setTarget(this.marker);
      this.markerInitialized.next(this.marker);
    });
  }
  ngOnChanges(changes) {
    const {
      marker,
      _title,
      _position,
      _label,
      _clickable,
      _icon,
      _visible
    } = this;
    if (marker) {
      if (changes["options"]) {
        marker.setOptions(this._combineOptions());
      }
      if (changes["title"] && _title !== void 0) {
        marker.setTitle(_title);
      }
      if (changes["position"] && _position) {
        marker.setPosition(_position);
      }
      if (changes["label"] && _label !== void 0) {
        marker.setLabel(_label);
      }
      if (changes["clickable"] && _clickable !== void 0) {
        marker.setClickable(_clickable);
      }
      if (changes["icon"] && _icon) {
        marker.setIcon(_icon);
      }
      if (changes["visible"] && _visible !== void 0) {
        marker.setVisible(_visible);
      }
    }
  }
  ngOnDestroy() {
    this.markerInitialized.complete();
    this._eventManager.destroy();
    this.marker?.setMap(null);
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.getAnimation
   */
  getAnimation() {
    this._assertInitialized();
    return this.marker.getAnimation() || null;
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.getClickable
   */
  getClickable() {
    this._assertInitialized();
    return this.marker.getClickable();
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.getCursor
   */
  getCursor() {
    this._assertInitialized();
    return this.marker.getCursor() || null;
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.getDraggable
   */
  getDraggable() {
    this._assertInitialized();
    return !!this.marker.getDraggable();
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.getIcon
   */
  getIcon() {
    this._assertInitialized();
    return this.marker.getIcon() || null;
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.getLabel
   */
  getLabel() {
    this._assertInitialized();
    return this.marker.getLabel() || null;
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.getOpacity
   */
  getOpacity() {
    this._assertInitialized();
    return this.marker.getOpacity() || null;
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.getPosition
   */
  getPosition() {
    this._assertInitialized();
    return this.marker.getPosition() || null;
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.getShape
   */
  getShape() {
    this._assertInitialized();
    return this.marker.getShape() || null;
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.getTitle
   */
  getTitle() {
    this._assertInitialized();
    return this.marker.getTitle() || null;
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.getVisible
   */
  getVisible() {
    this._assertInitialized();
    return this.marker.getVisible();
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.getZIndex
   */
  getZIndex() {
    this._assertInitialized();
    return this.marker.getZIndex() || null;
  }
  /** Gets the anchor point that can be used to attach other Google Maps objects. */
  getAnchor() {
    this._assertInitialized();
    return this.marker;
  }
  /** Returns a promise that resolves when the marker has been initialized. */
  _resolveMarker() {
    return this.marker ? Promise.resolve(this.marker) : this.markerInitialized.pipe(take(1)).toPromise();
  }
  /** Creates a combined options object using the passed-in options and the individual inputs. */
  _combineOptions() {
    const options = this._options || DEFAULT_MARKER_OPTIONS$1;
    return __spreadProps(__spreadValues({}, options), {
      title: this._title || options.title,
      position: this._position || options.position,
      label: this._label || options.label,
      clickable: this._clickable ?? options.clickable,
      map: this._googleMap.googleMap,
      icon: this._icon || options.icon,
      visible: this._visible ?? options.visible
    });
  }
  _assertInitialized() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this.marker) {
        throw Error("Cannot interact with a Google Map Marker before it has been initialized. Please wait for the Marker to load before trying to interact with it.");
      }
    }
  }
  static {
    this.\u0275fac = function MapMarker_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MapMarker)(\u0275\u0275directiveInject(GoogleMap), \u0275\u0275directiveInject(NgZone));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MapMarker,
      selectors: [["map-marker"]],
      inputs: {
        title: "title",
        position: "position",
        label: "label",
        clickable: "clickable",
        options: "options",
        icon: "icon",
        visible: "visible"
      },
      outputs: {
        animationChanged: "animationChanged",
        mapClick: "mapClick",
        clickableChanged: "clickableChanged",
        cursorChanged: "cursorChanged",
        mapDblclick: "mapDblclick",
        mapDrag: "mapDrag",
        mapDragend: "mapDragend",
        draggableChanged: "draggableChanged",
        mapDragstart: "mapDragstart",
        flatChanged: "flatChanged",
        iconChanged: "iconChanged",
        mapMousedown: "mapMousedown",
        mapMouseout: "mapMouseout",
        mapMouseover: "mapMouseover",
        mapMouseup: "mapMouseup",
        positionChanged: "positionChanged",
        mapRightclick: "mapRightclick",
        shapeChanged: "shapeChanged",
        titleChanged: "titleChanged",
        visibleChanged: "visibleChanged",
        zindexChanged: "zindexChanged",
        markerInitialized: "markerInitialized"
      },
      exportAs: ["mapMarker"],
      standalone: true,
      features: [\u0275\u0275NgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapMarker, [{
    type: Directive,
    args: [{
      selector: "map-marker",
      exportAs: "mapMarker",
      standalone: true
    }]
  }], () => [{
    type: GoogleMap
  }, {
    type: NgZone
  }], {
    title: [{
      type: Input
    }],
    position: [{
      type: Input
    }],
    label: [{
      type: Input
    }],
    clickable: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    icon: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    animationChanged: [{
      type: Output
    }],
    mapClick: [{
      type: Output
    }],
    clickableChanged: [{
      type: Output
    }],
    cursorChanged: [{
      type: Output
    }],
    mapDblclick: [{
      type: Output
    }],
    mapDrag: [{
      type: Output
    }],
    mapDragend: [{
      type: Output
    }],
    draggableChanged: [{
      type: Output
    }],
    mapDragstart: [{
      type: Output
    }],
    flatChanged: [{
      type: Output
    }],
    iconChanged: [{
      type: Output
    }],
    mapMousedown: [{
      type: Output
    }],
    mapMouseout: [{
      type: Output
    }],
    mapMouseover: [{
      type: Output
    }],
    mapMouseup: [{
      type: Output
    }],
    positionChanged: [{
      type: Output
    }],
    mapRightclick: [{
      type: Output
    }],
    shapeChanged: [{
      type: Output
    }],
    titleChanged: [{
      type: Output
    }],
    visibleChanged: [{
      type: Output
    }],
    zindexChanged: [{
      type: Output
    }],
    markerInitialized: [{
      type: Output
    }]
  });
})();
var DEFAULT_CLUSTERER_OPTIONS = {};
var MapMarkerClusterer = class _MapMarkerClusterer {
  set averageCenter(averageCenter) {
    this._averageCenter = averageCenter;
  }
  set batchSizeIE(batchSizeIE) {
    this._batchSizeIE = batchSizeIE;
  }
  set calculator(calculator) {
    this._calculator = calculator;
  }
  set clusterClass(clusterClass) {
    this._clusterClass = clusterClass;
  }
  set enableRetinaIcons(enableRetinaIcons) {
    this._enableRetinaIcons = enableRetinaIcons;
  }
  set gridSize(gridSize) {
    this._gridSize = gridSize;
  }
  set ignoreHidden(ignoreHidden) {
    this._ignoreHidden = ignoreHidden;
  }
  set imageExtension(imageExtension) {
    this._imageExtension = imageExtension;
  }
  set imagePath(imagePath) {
    this._imagePath = imagePath;
  }
  set imageSizes(imageSizes) {
    this._imageSizes = imageSizes;
  }
  set maxZoom(maxZoom) {
    this._maxZoom = maxZoom;
  }
  set minimumClusterSize(minimumClusterSize) {
    this._minimumClusterSize = minimumClusterSize;
  }
  set styles(styles) {
    this._styles = styles;
  }
  set title(title) {
    this._title = title;
  }
  set zIndex(zIndex) {
    this._zIndex = zIndex;
  }
  set zoomOnClick(zoomOnClick) {
    this._zoomOnClick = zoomOnClick;
  }
  set options(options) {
    this._options = options;
  }
  constructor(_googleMap, _ngZone) {
    this._googleMap = _googleMap;
    this._ngZone = _ngZone;
    this._currentMarkers = /* @__PURE__ */ new Set();
    this._eventManager = new MapEventManager(inject(NgZone));
    this._destroy = new Subject();
    this.ariaLabelFn = () => "";
    this.clusteringbegin = this._eventManager.getLazyEmitter("clusteringbegin");
    this.clusteringend = this._eventManager.getLazyEmitter("clusteringend");
    this.clusterClick = this._eventManager.getLazyEmitter("click");
    this.markerClustererInitialized = new EventEmitter();
    this._canInitialize = _googleMap._isBrowser;
  }
  ngOnInit() {
    if (this._canInitialize) {
      this._ngZone.runOutsideAngular(() => {
        this._googleMap._resolveMap().then((map2) => {
          if (typeof MarkerClusterer !== "function" && (typeof ngDevMode === "undefined" || ngDevMode)) {
            throw Error("MarkerClusterer class not found, cannot construct a marker cluster. Please install the MarkerClustererPlus library: https://github.com/googlemaps/js-markerclustererplus");
          }
          this.markerClusterer = this._ngZone.runOutsideAngular(() => {
            return new MarkerClusterer(map2, [], this._combineOptions());
          });
          this._assertInitialized();
          this._eventManager.setTarget(this.markerClusterer);
          this.markerClustererInitialized.emit(this.markerClusterer);
        });
      });
    }
  }
  ngAfterContentInit() {
    if (this._canInitialize) {
      if (this.markerClusterer) {
        this._watchForMarkerChanges();
      } else {
        this.markerClustererInitialized.pipe(take(1), takeUntil(this._destroy)).subscribe(() => this._watchForMarkerChanges());
      }
    }
  }
  ngOnChanges(changes) {
    const {
      markerClusterer: clusterer,
      ariaLabelFn,
      _averageCenter,
      _batchSizeIE,
      _calculator,
      _styles,
      _clusterClass,
      _enableRetinaIcons,
      _gridSize,
      _ignoreHidden,
      _imageExtension,
      _imagePath,
      _imageSizes,
      _maxZoom,
      _minimumClusterSize,
      _title,
      _zIndex,
      _zoomOnClick
    } = this;
    if (clusterer) {
      if (changes["options"]) {
        clusterer.setOptions(this._combineOptions());
      }
      if (changes["ariaLabelFn"]) {
        clusterer.ariaLabelFn = ariaLabelFn;
      }
      if (changes["averageCenter"] && _averageCenter !== void 0) {
        clusterer.setAverageCenter(_averageCenter);
      }
      if (changes["batchSizeIE"] && _batchSizeIE !== void 0) {
        clusterer.setBatchSizeIE(_batchSizeIE);
      }
      if (changes["calculator"] && !!_calculator) {
        clusterer.setCalculator(_calculator);
      }
      if (changes["clusterClass"] && _clusterClass !== void 0) {
        clusterer.setClusterClass(_clusterClass);
      }
      if (changes["enableRetinaIcons"] && _enableRetinaIcons !== void 0) {
        clusterer.setEnableRetinaIcons(_enableRetinaIcons);
      }
      if (changes["gridSize"] && _gridSize !== void 0) {
        clusterer.setGridSize(_gridSize);
      }
      if (changes["ignoreHidden"] && _ignoreHidden !== void 0) {
        clusterer.setIgnoreHidden(_ignoreHidden);
      }
      if (changes["imageExtension"] && _imageExtension !== void 0) {
        clusterer.setImageExtension(_imageExtension);
      }
      if (changes["imagePath"] && _imagePath !== void 0) {
        clusterer.setImagePath(_imagePath);
      }
      if (changes["imageSizes"] && _imageSizes) {
        clusterer.setImageSizes(_imageSizes);
      }
      if (changes["maxZoom"] && _maxZoom !== void 0) {
        clusterer.setMaxZoom(_maxZoom);
      }
      if (changes["minimumClusterSize"] && _minimumClusterSize !== void 0) {
        clusterer.setMinimumClusterSize(_minimumClusterSize);
      }
      if (changes["styles"] && _styles) {
        clusterer.setStyles(_styles);
      }
      if (changes["title"] && _title !== void 0) {
        clusterer.setTitle(_title);
      }
      if (changes["zIndex"] && _zIndex !== void 0) {
        clusterer.setZIndex(_zIndex);
      }
      if (changes["zoomOnClick"] && _zoomOnClick !== void 0) {
        clusterer.setZoomOnClick(_zoomOnClick);
      }
    }
  }
  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
    this._eventManager.destroy();
    this.markerClusterer?.setMap(null);
  }
  fitMapToMarkers(padding) {
    this._assertInitialized();
    this.markerClusterer.fitMapToMarkers(padding);
  }
  getAverageCenter() {
    this._assertInitialized();
    return this.markerClusterer.getAverageCenter();
  }
  getBatchSizeIE() {
    this._assertInitialized();
    return this.markerClusterer.getBatchSizeIE();
  }
  getCalculator() {
    this._assertInitialized();
    return this.markerClusterer.getCalculator();
  }
  getClusterClass() {
    this._assertInitialized();
    return this.markerClusterer.getClusterClass();
  }
  getClusters() {
    this._assertInitialized();
    return this.markerClusterer.getClusters();
  }
  getEnableRetinaIcons() {
    this._assertInitialized();
    return this.markerClusterer.getEnableRetinaIcons();
  }
  getGridSize() {
    this._assertInitialized();
    return this.markerClusterer.getGridSize();
  }
  getIgnoreHidden() {
    this._assertInitialized();
    return this.markerClusterer.getIgnoreHidden();
  }
  getImageExtension() {
    this._assertInitialized();
    return this.markerClusterer.getImageExtension();
  }
  getImagePath() {
    this._assertInitialized();
    return this.markerClusterer.getImagePath();
  }
  getImageSizes() {
    this._assertInitialized();
    return this.markerClusterer.getImageSizes();
  }
  getMaxZoom() {
    this._assertInitialized();
    return this.markerClusterer.getMaxZoom();
  }
  getMinimumClusterSize() {
    this._assertInitialized();
    return this.markerClusterer.getMinimumClusterSize();
  }
  getStyles() {
    this._assertInitialized();
    return this.markerClusterer.getStyles();
  }
  getTitle() {
    this._assertInitialized();
    return this.markerClusterer.getTitle();
  }
  getTotalClusters() {
    this._assertInitialized();
    return this.markerClusterer.getTotalClusters();
  }
  getTotalMarkers() {
    this._assertInitialized();
    return this.markerClusterer.getTotalMarkers();
  }
  getZIndex() {
    this._assertInitialized();
    return this.markerClusterer.getZIndex();
  }
  getZoomOnClick() {
    this._assertInitialized();
    return this.markerClusterer.getZoomOnClick();
  }
  _combineOptions() {
    const options = this._options || DEFAULT_CLUSTERER_OPTIONS;
    return __spreadProps(__spreadValues({}, options), {
      ariaLabelFn: this.ariaLabelFn ?? options.ariaLabelFn,
      averageCenter: this._averageCenter ?? options.averageCenter,
      batchSize: this.batchSize ?? options.batchSize,
      batchSizeIE: this._batchSizeIE ?? options.batchSizeIE,
      calculator: this._calculator ?? options.calculator,
      clusterClass: this._clusterClass ?? options.clusterClass,
      enableRetinaIcons: this._enableRetinaIcons ?? options.enableRetinaIcons,
      gridSize: this._gridSize ?? options.gridSize,
      ignoreHidden: this._ignoreHidden ?? options.ignoreHidden,
      imageExtension: this._imageExtension ?? options.imageExtension,
      imagePath: this._imagePath ?? options.imagePath,
      imageSizes: this._imageSizes ?? options.imageSizes,
      maxZoom: this._maxZoom ?? options.maxZoom,
      minimumClusterSize: this._minimumClusterSize ?? options.minimumClusterSize,
      styles: this._styles ?? options.styles,
      title: this._title ?? options.title,
      zIndex: this._zIndex ?? options.zIndex,
      zoomOnClick: this._zoomOnClick ?? options.zoomOnClick
    });
  }
  _watchForMarkerChanges() {
    this._assertInitialized();
    this._ngZone.runOutsideAngular(() => {
      this._getInternalMarkers(this._markers).then((markers) => {
        const initialMarkers = [];
        for (const marker of markers) {
          this._currentMarkers.add(marker);
          initialMarkers.push(marker);
        }
        this.markerClusterer.addMarkers(initialMarkers);
      });
    });
    this._markers.changes.pipe(takeUntil(this._destroy)).subscribe((markerComponents) => {
      this._assertInitialized();
      this._ngZone.runOutsideAngular(() => {
        this._getInternalMarkers(markerComponents).then((markers) => {
          const newMarkers = new Set(markers);
          const markersToAdd = [];
          const markersToRemove = [];
          for (const marker of Array.from(newMarkers)) {
            if (!this._currentMarkers.has(marker)) {
              this._currentMarkers.add(marker);
              markersToAdd.push(marker);
            }
          }
          for (const marker of Array.from(this._currentMarkers)) {
            if (!newMarkers.has(marker)) {
              markersToRemove.push(marker);
            }
          }
          this.markerClusterer.addMarkers(markersToAdd, true);
          this.markerClusterer.removeMarkers(markersToRemove, true);
          this.markerClusterer.repaint();
          for (const marker of markersToRemove) {
            this._currentMarkers.delete(marker);
          }
        });
      });
    });
  }
  _getInternalMarkers(markers) {
    return Promise.all(markers.map((markerComponent) => markerComponent._resolveMarker()));
  }
  _assertInitialized() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this.markerClusterer) {
        throw Error("Cannot interact with a MarkerClusterer before it has been initialized. Please wait for the MarkerClusterer to load before trying to interact with it.");
      }
    }
  }
  static {
    this.\u0275fac = function MapMarkerClusterer_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MapMarkerClusterer)(\u0275\u0275directiveInject(GoogleMap), \u0275\u0275directiveInject(NgZone));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MapMarkerClusterer,
      selectors: [["map-marker-clusterer"]],
      contentQueries: function MapMarkerClusterer_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuery(dirIndex, MapMarker, 5);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._markers = _t);
        }
      },
      inputs: {
        ariaLabelFn: "ariaLabelFn",
        averageCenter: "averageCenter",
        batchSize: "batchSize",
        batchSizeIE: "batchSizeIE",
        calculator: "calculator",
        clusterClass: "clusterClass",
        enableRetinaIcons: "enableRetinaIcons",
        gridSize: "gridSize",
        ignoreHidden: "ignoreHidden",
        imageExtension: "imageExtension",
        imagePath: "imagePath",
        imageSizes: "imageSizes",
        maxZoom: "maxZoom",
        minimumClusterSize: "minimumClusterSize",
        styles: "styles",
        title: "title",
        zIndex: "zIndex",
        zoomOnClick: "zoomOnClick",
        options: "options"
      },
      outputs: {
        clusteringbegin: "clusteringbegin",
        clusteringend: "clusteringend",
        clusterClick: "clusterClick",
        markerClustererInitialized: "markerClustererInitialized"
      },
      exportAs: ["mapMarkerClusterer"],
      standalone: true,
      features: [\u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function MapMarkerClusterer_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef();
          \u0275\u0275projection(0);
        }
      },
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapMarkerClusterer, [{
    type: Component,
    args: [{
      selector: "map-marker-clusterer",
      exportAs: "mapMarkerClusterer",
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      template: "<ng-content />",
      encapsulation: ViewEncapsulation$1.None
    }]
  }], () => [{
    type: GoogleMap
  }, {
    type: NgZone
  }], {
    ariaLabelFn: [{
      type: Input
    }],
    averageCenter: [{
      type: Input
    }],
    batchSize: [{
      type: Input
    }],
    batchSizeIE: [{
      type: Input
    }],
    calculator: [{
      type: Input
    }],
    clusterClass: [{
      type: Input
    }],
    enableRetinaIcons: [{
      type: Input
    }],
    gridSize: [{
      type: Input
    }],
    ignoreHidden: [{
      type: Input
    }],
    imageExtension: [{
      type: Input
    }],
    imagePath: [{
      type: Input
    }],
    imageSizes: [{
      type: Input
    }],
    maxZoom: [{
      type: Input
    }],
    minimumClusterSize: [{
      type: Input
    }],
    styles: [{
      type: Input
    }],
    title: [{
      type: Input
    }],
    zIndex: [{
      type: Input
    }],
    zoomOnClick: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    clusteringbegin: [{
      type: Output
    }],
    clusteringend: [{
      type: Output
    }],
    clusterClick: [{
      type: Output
    }],
    _markers: [{
      type: ContentChildren,
      args: [MapMarker, {
        descendants: true
      }]
    }],
    markerClustererInitialized: [{
      type: Output
    }]
  });
})();
var MapPolygon = class _MapPolygon {
  set options(options) {
    this._options.next(options || {});
  }
  set paths(paths) {
    this._paths.next(paths);
  }
  constructor(_map, _ngZone) {
    this._map = _map;
    this._ngZone = _ngZone;
    this._eventManager = new MapEventManager(inject(NgZone));
    this._options = new BehaviorSubject({});
    this._paths = new BehaviorSubject(void 0);
    this._destroyed = new Subject();
    this.polygonClick = this._eventManager.getLazyEmitter("click");
    this.polygonDblclick = this._eventManager.getLazyEmitter("dblclick");
    this.polygonDrag = this._eventManager.getLazyEmitter("drag");
    this.polygonDragend = this._eventManager.getLazyEmitter("dragend");
    this.polygonDragstart = this._eventManager.getLazyEmitter("dragstart");
    this.polygonMousedown = this._eventManager.getLazyEmitter("mousedown");
    this.polygonMousemove = this._eventManager.getLazyEmitter("mousemove");
    this.polygonMouseout = this._eventManager.getLazyEmitter("mouseout");
    this.polygonMouseover = this._eventManager.getLazyEmitter("mouseover");
    this.polygonMouseup = this._eventManager.getLazyEmitter("mouseup");
    this.polygonRightclick = this._eventManager.getLazyEmitter("rightclick");
    this.polygonInitialized = new EventEmitter();
  }
  ngOnInit() {
    if (this._map._isBrowser) {
      this._combineOptions().pipe(take(1)).subscribe((options) => {
        if (google.maps.Polygon && this._map.googleMap) {
          this._initialize(this._map.googleMap, google.maps.Polygon, options);
        } else {
          this._ngZone.runOutsideAngular(() => {
            Promise.all([this._map._resolveMap(), google.maps.importLibrary("maps")]).then(([map2, lib]) => {
              this._initialize(map2, lib.Polygon, options);
            });
          });
        }
      });
    }
  }
  _initialize(map2, polygonConstructor, options) {
    this._ngZone.runOutsideAngular(() => {
      this.polygon = new polygonConstructor(options);
      this._assertInitialized();
      this.polygon.setMap(map2);
      this._eventManager.setTarget(this.polygon);
      this.polygonInitialized.emit(this.polygon);
      this._watchForOptionsChanges();
      this._watchForPathChanges();
    });
  }
  ngOnDestroy() {
    this._eventManager.destroy();
    this._destroyed.next();
    this._destroyed.complete();
    this.polygon?.setMap(null);
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/polygon#Polygon.getDraggable
   */
  getDraggable() {
    this._assertInitialized();
    return this.polygon.getDraggable();
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polygon.getEditable
   */
  getEditable() {
    this._assertInitialized();
    return this.polygon.getEditable();
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polygon.getPath
   */
  getPath() {
    this._assertInitialized();
    return this.polygon.getPath();
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polygon.getPaths
   */
  getPaths() {
    this._assertInitialized();
    return this.polygon.getPaths();
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polygon.getVisible
   */
  getVisible() {
    this._assertInitialized();
    return this.polygon.getVisible();
  }
  _combineOptions() {
    return combineLatest([this._options, this._paths]).pipe(map(([options, paths]) => {
      const combinedOptions = __spreadProps(__spreadValues({}, options), {
        paths: paths || options.paths
      });
      return combinedOptions;
    }));
  }
  _watchForOptionsChanges() {
    this._options.pipe(takeUntil(this._destroyed)).subscribe((options) => {
      this._assertInitialized();
      this.polygon.setOptions(options);
    });
  }
  _watchForPathChanges() {
    this._paths.pipe(takeUntil(this._destroyed)).subscribe((paths) => {
      if (paths) {
        this._assertInitialized();
        this.polygon.setPaths(paths);
      }
    });
  }
  _assertInitialized() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this.polygon) {
        throw Error("Cannot interact with a Google Map Polygon before it has been initialized. Please wait for the Polygon to load before trying to interact with it.");
      }
    }
  }
  static {
    this.\u0275fac = function MapPolygon_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MapPolygon)(\u0275\u0275directiveInject(GoogleMap), \u0275\u0275directiveInject(NgZone));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MapPolygon,
      selectors: [["map-polygon"]],
      inputs: {
        options: "options",
        paths: "paths"
      },
      outputs: {
        polygonClick: "polygonClick",
        polygonDblclick: "polygonDblclick",
        polygonDrag: "polygonDrag",
        polygonDragend: "polygonDragend",
        polygonDragstart: "polygonDragstart",
        polygonMousedown: "polygonMousedown",
        polygonMousemove: "polygonMousemove",
        polygonMouseout: "polygonMouseout",
        polygonMouseover: "polygonMouseover",
        polygonMouseup: "polygonMouseup",
        polygonRightclick: "polygonRightclick",
        polygonInitialized: "polygonInitialized"
      },
      exportAs: ["mapPolygon"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapPolygon, [{
    type: Directive,
    args: [{
      selector: "map-polygon",
      exportAs: "mapPolygon",
      standalone: true
    }]
  }], () => [{
    type: GoogleMap
  }, {
    type: NgZone
  }], {
    options: [{
      type: Input
    }],
    paths: [{
      type: Input
    }],
    polygonClick: [{
      type: Output
    }],
    polygonDblclick: [{
      type: Output
    }],
    polygonDrag: [{
      type: Output
    }],
    polygonDragend: [{
      type: Output
    }],
    polygonDragstart: [{
      type: Output
    }],
    polygonMousedown: [{
      type: Output
    }],
    polygonMousemove: [{
      type: Output
    }],
    polygonMouseout: [{
      type: Output
    }],
    polygonMouseover: [{
      type: Output
    }],
    polygonMouseup: [{
      type: Output
    }],
    polygonRightclick: [{
      type: Output
    }],
    polygonInitialized: [{
      type: Output
    }]
  });
})();
var MapPolyline = class _MapPolyline {
  set options(options) {
    this._options.next(options || {});
  }
  set path(path) {
    this._path.next(path);
  }
  constructor(_map, _ngZone) {
    this._map = _map;
    this._ngZone = _ngZone;
    this._eventManager = new MapEventManager(inject(NgZone));
    this._options = new BehaviorSubject({});
    this._path = new BehaviorSubject(void 0);
    this._destroyed = new Subject();
    this.polylineClick = this._eventManager.getLazyEmitter("click");
    this.polylineDblclick = this._eventManager.getLazyEmitter("dblclick");
    this.polylineDrag = this._eventManager.getLazyEmitter("drag");
    this.polylineDragend = this._eventManager.getLazyEmitter("dragend");
    this.polylineDragstart = this._eventManager.getLazyEmitter("dragstart");
    this.polylineMousedown = this._eventManager.getLazyEmitter("mousedown");
    this.polylineMousemove = this._eventManager.getLazyEmitter("mousemove");
    this.polylineMouseout = this._eventManager.getLazyEmitter("mouseout");
    this.polylineMouseover = this._eventManager.getLazyEmitter("mouseover");
    this.polylineMouseup = this._eventManager.getLazyEmitter("mouseup");
    this.polylineRightclick = this._eventManager.getLazyEmitter("rightclick");
    this.polylineInitialized = new EventEmitter();
  }
  ngOnInit() {
    if (this._map._isBrowser) {
      this._combineOptions().pipe(take(1)).subscribe((options) => {
        if (google.maps.Polyline && this._map.googleMap) {
          this._initialize(this._map.googleMap, google.maps.Polyline, options);
        } else {
          this._ngZone.runOutsideAngular(() => {
            Promise.all([this._map._resolveMap(), google.maps.importLibrary("maps")]).then(([map2, lib]) => {
              this._initialize(map2, lib.Polyline, options);
            });
          });
        }
      });
    }
  }
  _initialize(map2, polylineConstructor, options) {
    this._ngZone.runOutsideAngular(() => {
      this.polyline = new polylineConstructor(options);
      this._assertInitialized();
      this.polyline.setMap(map2);
      this._eventManager.setTarget(this.polyline);
      this.polylineInitialized.emit(this.polyline);
      this._watchForOptionsChanges();
      this._watchForPathChanges();
    });
  }
  ngOnDestroy() {
    this._eventManager.destroy();
    this._destroyed.next();
    this._destroyed.complete();
    this.polyline?.setMap(null);
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/polygon#Polyline.getDraggable
   */
  getDraggable() {
    this._assertInitialized();
    return this.polyline.getDraggable();
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polyline.getEditable
   */
  getEditable() {
    this._assertInitialized();
    return this.polyline.getEditable();
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polyline.getPath
   */
  getPath() {
    this._assertInitialized();
    return this.polyline.getPath();
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polyline.getVisible
   */
  getVisible() {
    this._assertInitialized();
    return this.polyline.getVisible();
  }
  _combineOptions() {
    return combineLatest([this._options, this._path]).pipe(map(([options, path]) => {
      const combinedOptions = __spreadProps(__spreadValues({}, options), {
        path: path || options.path
      });
      return combinedOptions;
    }));
  }
  _watchForOptionsChanges() {
    this._options.pipe(takeUntil(this._destroyed)).subscribe((options) => {
      this._assertInitialized();
      this.polyline.setOptions(options);
    });
  }
  _watchForPathChanges() {
    this._path.pipe(takeUntil(this._destroyed)).subscribe((path) => {
      if (path) {
        this._assertInitialized();
        this.polyline.setPath(path);
      }
    });
  }
  _assertInitialized() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this.polyline) {
        throw Error("Cannot interact with a Google Map Polyline before it has been initialized. Please wait for the Polyline to load before trying to interact with it.");
      }
    }
  }
  static {
    this.\u0275fac = function MapPolyline_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MapPolyline)(\u0275\u0275directiveInject(GoogleMap), \u0275\u0275directiveInject(NgZone));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MapPolyline,
      selectors: [["map-polyline"]],
      inputs: {
        options: "options",
        path: "path"
      },
      outputs: {
        polylineClick: "polylineClick",
        polylineDblclick: "polylineDblclick",
        polylineDrag: "polylineDrag",
        polylineDragend: "polylineDragend",
        polylineDragstart: "polylineDragstart",
        polylineMousedown: "polylineMousedown",
        polylineMousemove: "polylineMousemove",
        polylineMouseout: "polylineMouseout",
        polylineMouseover: "polylineMouseover",
        polylineMouseup: "polylineMouseup",
        polylineRightclick: "polylineRightclick",
        polylineInitialized: "polylineInitialized"
      },
      exportAs: ["mapPolyline"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapPolyline, [{
    type: Directive,
    args: [{
      selector: "map-polyline",
      exportAs: "mapPolyline",
      standalone: true
    }]
  }], () => [{
    type: GoogleMap
  }, {
    type: NgZone
  }], {
    options: [{
      type: Input
    }],
    path: [{
      type: Input
    }],
    polylineClick: [{
      type: Output
    }],
    polylineDblclick: [{
      type: Output
    }],
    polylineDrag: [{
      type: Output
    }],
    polylineDragend: [{
      type: Output
    }],
    polylineDragstart: [{
      type: Output
    }],
    polylineMousedown: [{
      type: Output
    }],
    polylineMousemove: [{
      type: Output
    }],
    polylineMouseout: [{
      type: Output
    }],
    polylineMouseover: [{
      type: Output
    }],
    polylineMouseup: [{
      type: Output
    }],
    polylineRightclick: [{
      type: Output
    }],
    polylineInitialized: [{
      type: Output
    }]
  });
})();
var MapRectangle = class _MapRectangle {
  set options(options) {
    this._options.next(options || {});
  }
  set bounds(bounds) {
    this._bounds.next(bounds);
  }
  constructor(_map, _ngZone) {
    this._map = _map;
    this._ngZone = _ngZone;
    this._eventManager = new MapEventManager(inject(NgZone));
    this._options = new BehaviorSubject({});
    this._bounds = new BehaviorSubject(void 0);
    this._destroyed = new Subject();
    this.boundsChanged = this._eventManager.getLazyEmitter("bounds_changed");
    this.rectangleClick = this._eventManager.getLazyEmitter("click");
    this.rectangleDblclick = this._eventManager.getLazyEmitter("dblclick");
    this.rectangleDrag = this._eventManager.getLazyEmitter("drag");
    this.rectangleDragend = this._eventManager.getLazyEmitter("dragend");
    this.rectangleDragstart = this._eventManager.getLazyEmitter("dragstart");
    this.rectangleMousedown = this._eventManager.getLazyEmitter("mousedown");
    this.rectangleMousemove = this._eventManager.getLazyEmitter("mousemove");
    this.rectangleMouseout = this._eventManager.getLazyEmitter("mouseout");
    this.rectangleMouseover = this._eventManager.getLazyEmitter("mouseover");
    this.rectangleMouseup = this._eventManager.getLazyEmitter("mouseup");
    this.rectangleRightclick = this._eventManager.getLazyEmitter("rightclick");
    this.rectangleInitialized = new EventEmitter();
  }
  ngOnInit() {
    if (this._map._isBrowser) {
      this._combineOptions().pipe(take(1)).subscribe((options) => {
        if (google.maps.Rectangle && this._map.googleMap) {
          this._initialize(this._map.googleMap, google.maps.Rectangle, options);
        } else {
          this._ngZone.runOutsideAngular(() => {
            Promise.all([this._map._resolveMap(), google.maps.importLibrary("maps")]).then(([map2, lib]) => {
              this._initialize(map2, lib.Rectangle, options);
            });
          });
        }
      });
    }
  }
  _initialize(map2, rectangleConstructor, options) {
    this._ngZone.runOutsideAngular(() => {
      this.rectangle = new rectangleConstructor(options);
      this._assertInitialized();
      this.rectangle.setMap(map2);
      this._eventManager.setTarget(this.rectangle);
      this.rectangleInitialized.emit(this.rectangle);
      this._watchForOptionsChanges();
      this._watchForBoundsChanges();
    });
  }
  ngOnDestroy() {
    this._eventManager.destroy();
    this._destroyed.next();
    this._destroyed.complete();
    this.rectangle?.setMap(null);
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle.getBounds
   */
  getBounds() {
    this._assertInitialized();
    return this.rectangle.getBounds();
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle.getDraggable
   */
  getDraggable() {
    this._assertInitialized();
    return this.rectangle.getDraggable();
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle.getEditable
   */
  getEditable() {
    this._assertInitialized();
    return this.rectangle.getEditable();
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle.getVisible
   */
  getVisible() {
    this._assertInitialized();
    return this.rectangle.getVisible();
  }
  _combineOptions() {
    return combineLatest([this._options, this._bounds]).pipe(map(([options, bounds]) => {
      const combinedOptions = __spreadProps(__spreadValues({}, options), {
        bounds: bounds || options.bounds
      });
      return combinedOptions;
    }));
  }
  _watchForOptionsChanges() {
    this._options.pipe(takeUntil(this._destroyed)).subscribe((options) => {
      this._assertInitialized();
      this.rectangle.setOptions(options);
    });
  }
  _watchForBoundsChanges() {
    this._bounds.pipe(takeUntil(this._destroyed)).subscribe((bounds) => {
      if (bounds) {
        this._assertInitialized();
        this.rectangle.setBounds(bounds);
      }
    });
  }
  _assertInitialized() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this.rectangle) {
        throw Error("Cannot interact with a Google Map Rectangle before it has been initialized. Please wait for the Rectangle to load before trying to interact with it.");
      }
    }
  }
  static {
    this.\u0275fac = function MapRectangle_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MapRectangle)(\u0275\u0275directiveInject(GoogleMap), \u0275\u0275directiveInject(NgZone));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MapRectangle,
      selectors: [["map-rectangle"]],
      inputs: {
        options: "options",
        bounds: "bounds"
      },
      outputs: {
        boundsChanged: "boundsChanged",
        rectangleClick: "rectangleClick",
        rectangleDblclick: "rectangleDblclick",
        rectangleDrag: "rectangleDrag",
        rectangleDragend: "rectangleDragend",
        rectangleDragstart: "rectangleDragstart",
        rectangleMousedown: "rectangleMousedown",
        rectangleMousemove: "rectangleMousemove",
        rectangleMouseout: "rectangleMouseout",
        rectangleMouseover: "rectangleMouseover",
        rectangleMouseup: "rectangleMouseup",
        rectangleRightclick: "rectangleRightclick",
        rectangleInitialized: "rectangleInitialized"
      },
      exportAs: ["mapRectangle"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapRectangle, [{
    type: Directive,
    args: [{
      selector: "map-rectangle",
      exportAs: "mapRectangle",
      standalone: true
    }]
  }], () => [{
    type: GoogleMap
  }, {
    type: NgZone
  }], {
    options: [{
      type: Input
    }],
    bounds: [{
      type: Input
    }],
    boundsChanged: [{
      type: Output
    }],
    rectangleClick: [{
      type: Output
    }],
    rectangleDblclick: [{
      type: Output
    }],
    rectangleDrag: [{
      type: Output
    }],
    rectangleDragend: [{
      type: Output
    }],
    rectangleDragstart: [{
      type: Output
    }],
    rectangleMousedown: [{
      type: Output
    }],
    rectangleMousemove: [{
      type: Output
    }],
    rectangleMouseout: [{
      type: Output
    }],
    rectangleMouseover: [{
      type: Output
    }],
    rectangleMouseup: [{
      type: Output
    }],
    rectangleRightclick: [{
      type: Output
    }],
    rectangleInitialized: [{
      type: Output
    }]
  });
})();
var MapTrafficLayer = class _MapTrafficLayer {
  /**
   * Whether the traffic layer refreshes with updated information automatically.
   */
  set autoRefresh(autoRefresh) {
    this._autoRefresh.next(autoRefresh);
  }
  constructor(_map, _ngZone) {
    this._map = _map;
    this._ngZone = _ngZone;
    this._autoRefresh = new BehaviorSubject(true);
    this._destroyed = new Subject();
    this.trafficLayerInitialized = new EventEmitter();
  }
  ngOnInit() {
    if (this._map._isBrowser) {
      this._combineOptions().pipe(take(1)).subscribe((options) => {
        if (google.maps.TrafficLayer && this._map.googleMap) {
          this._initialize(this._map.googleMap, google.maps.TrafficLayer, options);
        } else {
          this._ngZone.runOutsideAngular(() => {
            Promise.all([this._map._resolveMap(), google.maps.importLibrary("maps")]).then(([map2, lib]) => {
              this._initialize(map2, lib.TrafficLayer, options);
            });
          });
        }
      });
    }
  }
  _initialize(map2, layerConstructor, options) {
    this._ngZone.runOutsideAngular(() => {
      this.trafficLayer = new layerConstructor(options);
      this._assertInitialized();
      this.trafficLayer.setMap(map2);
      this.trafficLayerInitialized.emit(this.trafficLayer);
      this._watchForAutoRefreshChanges();
    });
  }
  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
    this.trafficLayer?.setMap(null);
  }
  _combineOptions() {
    return this._autoRefresh.pipe(map((autoRefresh) => {
      const combinedOptions = {
        autoRefresh
      };
      return combinedOptions;
    }));
  }
  _watchForAutoRefreshChanges() {
    this._combineOptions().pipe(takeUntil(this._destroyed)).subscribe((options) => {
      this._assertInitialized();
      this.trafficLayer.setOptions(options);
    });
  }
  _assertInitialized() {
    if (!this.trafficLayer) {
      throw Error("Cannot interact with a Google Map Traffic Layer before it has been initialized. Please wait for the Traffic Layer to load before trying to interact with it.");
    }
  }
  static {
    this.\u0275fac = function MapTrafficLayer_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MapTrafficLayer)(\u0275\u0275directiveInject(GoogleMap), \u0275\u0275directiveInject(NgZone));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MapTrafficLayer,
      selectors: [["map-traffic-layer"]],
      inputs: {
        autoRefresh: "autoRefresh"
      },
      outputs: {
        trafficLayerInitialized: "trafficLayerInitialized"
      },
      exportAs: ["mapTrafficLayer"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapTrafficLayer, [{
    type: Directive,
    args: [{
      selector: "map-traffic-layer",
      exportAs: "mapTrafficLayer",
      standalone: true
    }]
  }], () => [{
    type: GoogleMap
  }, {
    type: NgZone
  }], {
    autoRefresh: [{
      type: Input
    }],
    trafficLayerInitialized: [{
      type: Output
    }]
  });
})();
var MapTransitLayer = class _MapTransitLayer {
  constructor() {
    this._map = inject(GoogleMap);
    this._zone = inject(NgZone);
    this.transitLayerInitialized = new EventEmitter();
  }
  ngOnInit() {
    if (this._map._isBrowser) {
      if (google.maps.TransitLayer && this._map.googleMap) {
        this._initialize(this._map.googleMap, google.maps.TransitLayer);
      } else {
        this._zone.runOutsideAngular(() => {
          Promise.all([this._map._resolveMap(), google.maps.importLibrary("maps")]).then(([map2, lib]) => {
            this._initialize(map2, lib.TransitLayer);
          });
        });
      }
    }
  }
  _initialize(map2, layerConstructor) {
    this._zone.runOutsideAngular(() => {
      this.transitLayer = new layerConstructor();
      this.transitLayerInitialized.emit(this.transitLayer);
      this._assertLayerInitialized();
      this.transitLayer.setMap(map2);
    });
  }
  ngOnDestroy() {
    this.transitLayer?.setMap(null);
  }
  _assertLayerInitialized() {
    if (!this.transitLayer) {
      throw Error("Cannot interact with a Google Map Transit Layer before it has been initialized. Please wait for the Transit Layer to load before trying to interact with it.");
    }
  }
  static {
    this.\u0275fac = function MapTransitLayer_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MapTransitLayer)();
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MapTransitLayer,
      selectors: [["map-transit-layer"]],
      outputs: {
        transitLayerInitialized: "transitLayerInitialized"
      },
      exportAs: ["mapTransitLayer"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapTransitLayer, [{
    type: Directive,
    args: [{
      selector: "map-transit-layer",
      exportAs: "mapTransitLayer",
      standalone: true
    }]
  }], null, {
    transitLayerInitialized: [{
      type: Output
    }]
  });
})();
var MapHeatmapLayer = class _MapHeatmapLayer {
  /**
   * Data shown on the heatmap.
   * See: https://developers.google.com/maps/documentation/javascript/reference/visualization
   */
  set data(data) {
    this._data = data;
  }
  /**
   * Options used to configure the heatmap. See:
   * developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayerOptions
   */
  set options(options) {
    this._options = options;
  }
  constructor(_googleMap, _ngZone) {
    this._googleMap = _googleMap;
    this._ngZone = _ngZone;
    this.heatmapInitialized = new EventEmitter();
  }
  ngOnInit() {
    if (this._googleMap._isBrowser) {
      if (!window.google?.maps?.visualization && !window.google?.maps.importLibrary && (typeof ngDevMode === "undefined" || ngDevMode)) {
        throw Error('Namespace `google.maps.visualization` not found, cannot construct heatmap. Please install the Google Maps JavaScript API with the "visualization" library: https://developers.google.com/maps/documentation/javascript/visualization');
      }
      if (google.maps.visualization?.HeatmapLayer && this._googleMap.googleMap) {
        this._initialize(this._googleMap.googleMap, google.maps.visualization.HeatmapLayer);
      } else {
        this._ngZone.runOutsideAngular(() => {
          Promise.all([this._googleMap._resolveMap(), google.maps.importLibrary("visualization")]).then(([map2, lib]) => {
            this._initialize(map2, lib.HeatmapLayer);
          });
        });
      }
    }
  }
  _initialize(map2, heatmapConstructor) {
    this._ngZone.runOutsideAngular(() => {
      this.heatmap = new heatmapConstructor(this._combineOptions());
      this._assertInitialized();
      this.heatmap.setMap(map2);
      this.heatmapInitialized.emit(this.heatmap);
    });
  }
  ngOnChanges(changes) {
    const {
      _data,
      heatmap
    } = this;
    if (heatmap) {
      if (changes["options"]) {
        heatmap.setOptions(this._combineOptions());
      }
      if (changes["data"] && _data !== void 0) {
        heatmap.setData(this._normalizeData(_data));
      }
    }
  }
  ngOnDestroy() {
    this.heatmap?.setMap(null);
  }
  /**
   * Gets the data that is currently shown on the heatmap.
   * See: developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayer
   */
  getData() {
    this._assertInitialized();
    return this.heatmap.getData();
  }
  /** Creates a combined options object using the passed-in options and the individual inputs. */
  _combineOptions() {
    const options = this._options || {};
    return __spreadProps(__spreadValues({}, options), {
      data: this._normalizeData(this._data || options.data || []),
      map: this._googleMap.googleMap
    });
  }
  /**
   * Most Google Maps APIs support both `LatLng` objects and `LatLngLiteral`. The latter is more
   * convenient to write out, because the Google Maps API doesn't have to have been loaded in order
   * to construct them. The `HeatmapLayer` appears to be an exception that only allows a `LatLng`
   * object, or it throws a runtime error. Since it's more convenient and we expect that Angular
   * users will load the API asynchronously, we allow them to pass in a `LatLngLiteral` and we
   * convert it to a `LatLng` object before passing it off to Google Maps.
   */
  _normalizeData(data) {
    const result = [];
    data.forEach((item) => {
      result.push(isLatLngLiteral(item) ? new google.maps.LatLng(item.lat, item.lng) : item);
    });
    return result;
  }
  /** Asserts that the heatmap object has been initialized. */
  _assertInitialized() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this.heatmap) {
        throw Error("Cannot interact with a Google Map HeatmapLayer before it has been initialized. Please wait for the heatmap to load before trying to interact with it.");
      }
    }
  }
  static {
    this.\u0275fac = function MapHeatmapLayer_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MapHeatmapLayer)(\u0275\u0275directiveInject(GoogleMap), \u0275\u0275directiveInject(NgZone));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MapHeatmapLayer,
      selectors: [["map-heatmap-layer"]],
      inputs: {
        data: "data",
        options: "options"
      },
      outputs: {
        heatmapInitialized: "heatmapInitialized"
      },
      exportAs: ["mapHeatmapLayer"],
      standalone: true,
      features: [\u0275\u0275NgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapHeatmapLayer, [{
    type: Directive,
    args: [{
      selector: "map-heatmap-layer",
      exportAs: "mapHeatmapLayer",
      standalone: true
    }]
  }], () => [{
    type: GoogleMap
  }, {
    type: NgZone
  }], {
    data: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    heatmapInitialized: [{
      type: Output
    }]
  });
})();
function isLatLngLiteral(value) {
  return value && typeof value.lat === "number" && typeof value.lng === "number";
}
var DEFAULT_MARKER_OPTIONS = {
  position: {
    lat: 37.221995,
    lng: -122.184092
  }
};
var MapAdvancedMarker = class _MapAdvancedMarker {
  /**
   * Rollover text. If provided, an accessibility text (e.g. for use with screen readers) will be added to the AdvancedMarkerElement with the provided value.
   * See: https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElementOptions.title
   */
  set title(title) {
    this._title = title;
  }
  /**
   * Sets the AdvancedMarkerElement's position. An AdvancedMarkerElement may be constructed without a position, but will not be displayed until its position is provided - for example, by a user's actions or choices. An AdvancedMarkerElement's position can be provided by setting AdvancedMarkerElement.position if not provided at the construction.
   * Note: AdvancedMarkerElement with altitude is only supported on vector maps.
   * https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElementOptions.position
   */
  set position(position) {
    this._position = position;
  }
  /**
   * The DOM Element backing the visual of an AdvancedMarkerElement.
   * Note: AdvancedMarkerElement does not clone the passed-in DOM element. Once the DOM element is passed to an AdvancedMarkerElement, passing the same DOM element to another AdvancedMarkerElement will move the DOM element and cause the previous AdvancedMarkerElement to look empty.
   * See: https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElementOptions.content
   */
  set content(content) {
    this._content = content;
  }
  /**
   * If true, the AdvancedMarkerElement can be dragged.
   * Note: AdvancedMarkerElement with altitude is not draggable.
   * https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElementOptions.gmpDraggable
   */
  set gmpDraggable(draggable) {
    this._draggable = draggable;
  }
  /**
   * Options for constructing an AdvancedMarkerElement.
   * https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElementOptions
   */
  set options(options) {
    this._options = options;
  }
  /**
   * AdvancedMarkerElements on the map are prioritized by zIndex, with higher values indicating higher display.
   * https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElementOptions.zIndex
   */
  set zIndex(zIndex) {
    this._zIndex = zIndex;
  }
  constructor(_googleMap, _ngZone) {
    this._googleMap = _googleMap;
    this._ngZone = _ngZone;
    this._eventManager = new MapEventManager(inject(NgZone));
    this.mapClick = this._eventManager.getLazyEmitter("click");
    this.mapDrag = this._eventManager.getLazyEmitter("drag");
    this.mapDragend = this._eventManager.getLazyEmitter("dragend");
    this.mapDragstart = this._eventManager.getLazyEmitter("dragstart");
    this.markerInitialized = new EventEmitter();
  }
  ngOnInit() {
    if (!this._googleMap._isBrowser) {
      return;
    }
    if (google.maps.marker?.AdvancedMarkerElement && this._googleMap.googleMap) {
      this._initialize(this._googleMap.googleMap, google.maps.marker.AdvancedMarkerElement);
    } else {
      this._ngZone.runOutsideAngular(() => {
        Promise.all([this._googleMap._resolveMap(), google.maps.importLibrary("marker")]).then(([map2, lib]) => {
          this._initialize(map2, lib.AdvancedMarkerElement);
        });
      });
    }
  }
  _initialize(map2, advancedMarkerConstructor) {
    this._ngZone.runOutsideAngular(() => {
      this.advancedMarker = new advancedMarkerConstructor(this._combineOptions());
      this._assertInitialized();
      this.advancedMarker.map = map2;
      this._eventManager.setTarget(this.advancedMarker);
      this.markerInitialized.next(this.advancedMarker);
    });
  }
  ngOnChanges(changes) {
    const {
      advancedMarker,
      _content,
      _position,
      _title,
      _draggable,
      _zIndex
    } = this;
    if (advancedMarker) {
      if (changes["title"]) {
        advancedMarker.title = _title;
      }
      if (changes["gmpDraggable"]) {
        advancedMarker.gmpDraggable = _draggable;
      }
      if (changes["content"]) {
        advancedMarker.content = _content;
      }
      if (changes["position"]) {
        advancedMarker.position = _position;
      }
      if (changes["zIndex"]) {
        advancedMarker.zIndex = _zIndex;
      }
    }
  }
  ngOnDestroy() {
    this.markerInitialized.complete();
    this._eventManager.destroy();
    if (this.advancedMarker) {
      this.advancedMarker.map = null;
    }
  }
  getAnchor() {
    this._assertInitialized();
    return this.advancedMarker;
  }
  /** Creates a combined options object using the passed-in options and the individual inputs. */
  _combineOptions() {
    const options = this._options || DEFAULT_MARKER_OPTIONS;
    return __spreadProps(__spreadValues({}, options), {
      title: this._title || options.title,
      position: this._position || options.position,
      content: this._content || options.content,
      zIndex: this._zIndex ?? options.zIndex,
      gmpDraggable: this._draggable ?? options.gmpDraggable,
      map: this._googleMap.googleMap
    });
  }
  /** Asserts that the map has been initialized. */
  _assertInitialized() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this.advancedMarker) {
        throw Error("Cannot interact with a Google Map Marker before it has been initialized. Please wait for the Marker to load before trying to interact with it.");
      }
    }
  }
  static {
    this.\u0275fac = function MapAdvancedMarker_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MapAdvancedMarker)(\u0275\u0275directiveInject(GoogleMap), \u0275\u0275directiveInject(NgZone));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MapAdvancedMarker,
      selectors: [["map-advanced-marker"]],
      inputs: {
        title: "title",
        position: "position",
        content: "content",
        gmpDraggable: "gmpDraggable",
        options: "options",
        zIndex: "zIndex"
      },
      outputs: {
        mapClick: "mapClick",
        mapDrag: "mapDrag",
        mapDragend: "mapDragend",
        mapDragstart: "mapDragstart",
        markerInitialized: "markerInitialized"
      },
      exportAs: ["mapAdvancedMarker"],
      standalone: true,
      features: [\u0275\u0275NgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapAdvancedMarker, [{
    type: Directive,
    args: [{
      selector: "map-advanced-marker",
      exportAs: "mapAdvancedMarker",
      standalone: true
    }]
  }], () => [{
    type: GoogleMap
  }, {
    type: NgZone
  }], {
    title: [{
      type: Input
    }],
    position: [{
      type: Input
    }],
    content: [{
      type: Input
    }],
    gmpDraggable: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    zIndex: [{
      type: Input
    }],
    mapClick: [{
      type: Output
    }],
    mapDrag: [{
      type: Output
    }],
    mapDragend: [{
      type: Output
    }],
    mapDragstart: [{
      type: Output
    }],
    markerInitialized: [{
      type: Output
    }]
  });
})();
var COMPONENTS = [GoogleMap, MapBaseLayer, MapBicyclingLayer, MapCircle, MapDirectionsRenderer, MapGroundOverlay, MapHeatmapLayer, MapInfoWindow, MapKmlLayer, MapMarker, MapAdvancedMarker, MapMarkerClusterer, MapPolygon, MapPolyline, MapRectangle, MapTrafficLayer, MapTransitLayer];
var GoogleMapsModule = class _GoogleMapsModule {
  static {
    this.\u0275fac = function GoogleMapsModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _GoogleMapsModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _GoogleMapsModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GoogleMapsModule, [{
    type: NgModule,
    args: [{
      imports: COMPONENTS,
      exports: COMPONENTS
    }]
  }], null, null);
})();
var MapDirectionsService = class _MapDirectionsService {
  constructor(_ngZone) {
    this._ngZone = _ngZone;
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/directions
   * #DirectionsService.route
   */
  route(request) {
    return new Observable((observer) => {
      this._getService().then((service) => {
        service.route(request, (result, status) => {
          this._ngZone.run(() => {
            observer.next({
              result: result || void 0,
              status
            });
            observer.complete();
          });
        });
      });
    });
  }
  _getService() {
    if (!this._directionsService) {
      if (google.maps.DirectionsService) {
        this._directionsService = new google.maps.DirectionsService();
      } else {
        return google.maps.importLibrary("routes").then((lib) => {
          this._directionsService = new lib.DirectionsService();
          return this._directionsService;
        });
      }
    }
    return Promise.resolve(this._directionsService);
  }
  static {
    this.\u0275fac = function MapDirectionsService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MapDirectionsService)(\u0275\u0275inject(NgZone));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
      token: _MapDirectionsService,
      factory: _MapDirectionsService.\u0275fac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapDirectionsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: NgZone
  }], null);
})();
var MapGeocoder = class _MapGeocoder {
  constructor(_ngZone) {
    this._ngZone = _ngZone;
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/geocoder#Geocoder.geocode
   */
  geocode(request) {
    return new Observable((observer) => {
      this._getGeocoder().then((geocoder) => {
        geocoder.geocode(request, (results, status) => {
          this._ngZone.run(() => {
            observer.next({
              results: results || [],
              status
            });
            observer.complete();
          });
        });
      });
    });
  }
  _getGeocoder() {
    if (!this._geocoder) {
      if (google.maps.Geocoder) {
        this._geocoder = new google.maps.Geocoder();
      } else {
        return google.maps.importLibrary("geocoding").then((lib) => {
          this._geocoder = new lib.Geocoder();
          return this._geocoder;
        });
      }
    }
    return Promise.resolve(this._geocoder);
  }
  static {
    this.\u0275fac = function MapGeocoder_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MapGeocoder)(\u0275\u0275inject(NgZone));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
      token: _MapGeocoder,
      factory: _MapGeocoder.\u0275fac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapGeocoder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: NgZone
  }], null);
})();

// src/app/features/map/map.component.ts
var _forTrack0 = ($index, $item) => $item.revendeurId;
function MapComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "map-marker", 4);
    \u0275\u0275listener("mapClick", function MapComponent_For_2_Template_map_marker_mapClick_0_listener() {
      const marqueur_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.ouvrirInfo(marqueur_r2));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const marqueur_r2 = ctx.$implicit;
    \u0275\u0275property("position", marqueur_r2.position)("options", marqueur_r2.options);
  }
}
function MapComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "map-marker", 1);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("position", ctx_r2.positionUtilisateur)("options", ctx_r2.optionsMarqueurUtilisateur);
  }
}
var MapComponent = class _MapComponent {
  get optionsMarqueurUtilisateur() {
    return {
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 9,
        fillColor: "#3B82F6",
        fillOpacity: 1,
        strokeColor: "#ffffff",
        strokeWeight: 3
      },
      title: "Votre position",
      zIndex: 999
    };
  }
  constructor(ngZone) {
    this.ngZone = ngZone;
    this.commanderClique = new EventEmitter();
    this.centre = { lat: 6.3703, lng: 2.3912 };
    this.zoom = 13;
    this.optionsCarte = {
      mapId: "gazfacile-map",
      disableDefaultUI: false,
      zoomControl: true,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
        { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
        { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
        { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#746855" }] },
        { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#f3d19c" }] },
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
        { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
        { featureType: "poi", stylers: [{ visibility: "off" }] },
        { featureType: "transit", stylers: [{ visibility: "off" }] }
      ]
    };
    this.marqueurs = [];
    this.positionUtilisateur = null;
    this.contenuInfo = "";
    this.infoWindowOptions = {};
    this.revendeursSnapshot = [];
    effect(() => {
      const revendeurs = this.revendeursSignal();
      this.revendeursSnapshot = revendeurs;
      this.mettreAJourMarqueurs(revendeurs);
    });
  }
  ngAfterViewInit() {
  }
  mettreAJourMarqueurs(revendeurs) {
    this.marqueurs = revendeurs.filter((r) => r.location && r.location.length >= 2).map((r) => {
      const [lng, lat] = r.location;
      return {
        revendeurId: r.id,
        position: { lat, lng },
        options: this.creerOptionsMarqueur(r.stockStatus),
        revendeur: r
      };
    });
  }
  creerOptionsMarqueur(stockStatus) {
    const couleurs = {
      [StockStatus.EN_STOCK]: "#22C55E",
      [StockStatus.STOCK_FAIBLE]: "#EAB308",
      [StockStatus.EPUISE]: "#EF4444"
    };
    const couleur = couleurs[stockStatus] ?? "#A8A29E";
    const svg = this.creerSvgBouteille(couleur);
    return {
      icon: {
        url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg),
        scaledSize: new google.maps.Size(32, 44),
        anchor: new google.maps.Point(16, 44)
      }
    };
  }
  creerSvgBouteille(couleur) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 44" width="32" height="44">
      <rect x="12" y="0" width="8" height="3" rx="1.5" fill="${couleur}" stroke="white" stroke-width="0.8"/>
      <rect x="13" y="3" width="6" height="5" rx="1" fill="${couleur}"/>
      <rect x="4" y="8" width="24" height="28" rx="10" fill="${couleur}"/>
      <rect x="7" y="12" width="5" height="14" rx="2.5" fill="rgba(255,255,255,0.22)"/>
      <text x="16" y="27" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" font-weight="800" fill="white" letter-spacing="0.5">GAZ</text>
      <rect x="7" y="35" width="18" height="5" rx="2.5" fill="${couleur}" opacity="0.75"/>
      <polygon points="16,44 11,38 21,38" fill="${couleur}"/>
      <circle cx="16" cy="44" r="1.5" fill="rgba(0,0,0,0.3)"/>
    </svg>`;
  }
  ouvrirInfo(marqueurData) {
    this.contenuInfo = this.creerContenuPopup(marqueurData.revendeur);
    this.infoWindowOptions = { position: marqueurData.position };
    this.infoWindow.open();
    setTimeout(() => {
      const btn = document.getElementById(`btn-commander-${marqueurData.revendeur.id}`);
      if (btn) {
        btn.addEventListener("click", () => {
          this.ngZone.run(() => this.commanderClique.emit(marqueurData.revendeur));
        });
      }
    }, 100);
  }
  creerContenuPopup(revendeur) {
    const libelleStock = {
      [StockStatus.EN_STOCK]: '<span style="color:#22C55E">\u25CF En stock</span>',
      [StockStatus.STOCK_FAIBLE]: '<span style="color:#EAB308">\u25CF Stock faible</span>',
      [StockStatus.EPUISE]: '<span style="color:#EF4444">\u25CF \xC9puis\xE9</span>'
    };
    const marquesList = revendeur.marques?.length ? revendeur.marques.slice(0, 3).join(", ") : "Non sp\xE9cifi\xE9";
    const livraisonTexte = revendeur.livraison ? '<span style="color:#22C55E">\u2713 Livraison disponible</span>' : '<span style="color:#A8A29E">\u2717 Pas de livraison</span>';
    const btnDisabled = revendeur.stockStatus === StockStatus.EPUISE ? "disabled" : "";
    return `
      <div style="font-family:'DM Sans',sans-serif;min-width:210px;padding:14px 16px;color:#F5F5F4;background:#292524;border-radius:10px;">
        <h4 style="font-family:'Syne',sans-serif;font-size:1rem;font-weight:700;margin:0 0 8px;color:#F5F5F4;">
          ${revendeur.nom}
        </h4>
        <p style="font-size:0.8rem;color:#A8A29E;margin:3px 0;">
          \u{1F4CD} ${revendeur.quartier}${revendeur.adresse ? " \u2014 " + revendeur.adresse : ""}
        </p>
        <p style="font-size:0.8rem;color:#A8A29E;margin:3px 0;">
          \u{1F4DE} ${revendeur.telephone}
        </p>
        <p style="font-size:0.8rem;color:#D4CFC9;margin:5px 0;">\u{1F6E2}\uFE0F ${marquesList}</p>
        <p style="font-size:0.8rem;margin:3px 0;">${libelleStock[revendeur.stockStatus]}</p>
        <p style="font-size:0.8rem;margin:3px 0;">${livraisonTexte}</p>
        <button
          id="btn-commander-${revendeur.id}"
          ${btnDisabled}
          style="
            margin-top:12px;width:100%;padding:9px;
            background:${revendeur.stockStatus === StockStatus.EPUISE ? "#3C3835" : "#F97316"};
            color:${revendeur.stockStatus === StockStatus.EPUISE ? "#57534E" : "white"};
            border:none;border-radius:6px;
            font-family:'DM Sans',sans-serif;font-weight:600;font-size:0.85rem;
            cursor:${revendeur.stockStatus === StockStatus.EPUISE ? "not-allowed" : "pointer"};
            transition:background 0.2s;
          ">
          \u{1F6D2} Commander
        </button>
      </div>
    `;
  }
  focusRevendeur(id) {
    const marqueur = this.marqueurs.find((m) => m.revendeurId === id);
    const map2 = this.googleMapRef?.googleMap;
    if (marqueur && map2) {
      map2.panTo(marqueur.position);
      map2.setZoom(16);
    }
  }
  setUserLocation(lat, lng) {
    this.positionUtilisateur = { lat, lng };
    const map2 = this.googleMapRef?.googleMap;
    if (map2) {
      map2.panTo({ lat, lng });
      map2.setZoom(14);
    }
  }
  ngOnDestroy() {
  }
  static {
    this.\u0275fac = function MapComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MapComponent)(\u0275\u0275directiveInject(NgZone));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MapComponent, selectors: [["app-map"]], viewQuery: function MapComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(GoogleMap, 5);
        \u0275\u0275viewQuery(MapInfoWindow, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.googleMapRef = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.infoWindow = _t.first);
      }
    }, inputs: { revendeursSignal: "revendeursSignal" }, outputs: { commanderClique: "commanderClique" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 6, vars: 6, consts: [["width", "100%", "height", "100%", 1, "carte", 3, "center", "zoom", "options"], [3, "position", "options"], [3, "options"], [3, "innerHTML"], [3, "mapClick", "position", "options"]], template: function MapComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "google-map", 0);
        \u0275\u0275repeaterCreate(1, MapComponent_For_2_Template, 1, 2, "map-marker", 1, _forTrack0);
        \u0275\u0275template(3, MapComponent_Conditional_3_Template, 1, 2, "map-marker", 1);
        \u0275\u0275elementStart(4, "map-info-window", 2);
        \u0275\u0275element(5, "div", 3);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275property("center", ctx.centre)("zoom", ctx.zoom)("options", ctx.optionsCarte);
        \u0275\u0275advance();
        \u0275\u0275repeater(ctx.marqueurs);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.positionUtilisateur ? 3 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("options", ctx.infoWindowOptions);
        \u0275\u0275advance();
        \u0275\u0275property("innerHTML", ctx.contenuInfo, \u0275\u0275sanitizeHtml);
      }
    }, dependencies: [CommonModule, GoogleMap, MapMarker, MapInfoWindow], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n  width: 100%;\n  min-height: 400px;\n  border-radius: var(--radius-md);\n  overflow: hidden;\n}\ngoogle-map[_ngcontent-%COMP%] {\n  display: block;\n  height: 100%;\n  border-radius: var(--radius-md);\n  overflow: hidden;\n}\n/*# sourceMappingURL=map.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MapComponent, { className: "MapComponent", filePath: "src/app/features/map/map.component.ts", lineNumber: 72 });
})();

// node_modules/@angular/material/fesm2022/button-toggle.mjs
var _c02 = ["button"];
var _c1 = ["*"];
function MatButtonToggle_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-pseudo-checkbox", 3);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.disabled);
  }
}
function MatButtonToggle_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-pseudo-checkbox", 3);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.disabled);
  }
}
var MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS = new InjectionToken("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS", {
  providedIn: "root",
  factory: MAT_BUTTON_TOGGLE_GROUP_DEFAULT_OPTIONS_FACTORY
});
function MAT_BUTTON_TOGGLE_GROUP_DEFAULT_OPTIONS_FACTORY() {
  return {
    hideSingleSelectionIndicator: false,
    hideMultipleSelectionIndicator: false,
    disabledInteractive: false
  };
}
var MAT_BUTTON_TOGGLE_GROUP = new InjectionToken("MatButtonToggleGroup");
var MAT_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MatButtonToggleGroup),
  multi: true
};
var uniqueIdCounter = 0;
var MatButtonToggleChange = class {
  constructor(source, value) {
    this.source = source;
    this.value = value;
  }
};
var MatButtonToggleGroup = class _MatButtonToggleGroup {
  /** `name` attribute for the underlying `input` element. */
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
    this._markButtonsForCheck();
  }
  /** Value of the toggle group. */
  get value() {
    const selected = this._selectionModel ? this._selectionModel.selected : [];
    if (this.multiple) {
      return selected.map((toggle) => toggle.value);
    }
    return selected[0] ? selected[0].value : void 0;
  }
  set value(newValue) {
    this._setSelectionByValue(newValue);
    this.valueChange.emit(this.value);
  }
  /** Selected button toggles in the group. */
  get selected() {
    const selected = this._selectionModel ? this._selectionModel.selected : [];
    return this.multiple ? selected : selected[0] || null;
  }
  /** Whether multiple button toggles can be selected. */
  get multiple() {
    return this._multiple;
  }
  set multiple(value) {
    this._multiple = value;
    this._markButtonsForCheck();
  }
  /** Whether multiple button toggle group is disabled. */
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = value;
    this._markButtonsForCheck();
  }
  /** Whether buttons in the group should be interactive while they're disabled. */
  get disabledInteractive() {
    return this._disabledInteractive;
  }
  set disabledInteractive(value) {
    this._disabledInteractive = value;
    this._markButtonsForCheck();
  }
  /** The layout direction of the toggle button group. */
  get dir() {
    return this._dir && this._dir.value === "rtl" ? "rtl" : "ltr";
  }
  /** Whether checkmark indicator for single-selection button toggle groups is hidden. */
  get hideSingleSelectionIndicator() {
    return this._hideSingleSelectionIndicator;
  }
  set hideSingleSelectionIndicator(value) {
    this._hideSingleSelectionIndicator = value;
    this._markButtonsForCheck();
  }
  /** Whether checkmark indicator for multiple-selection button toggle groups is hidden. */
  get hideMultipleSelectionIndicator() {
    return this._hideMultipleSelectionIndicator;
  }
  set hideMultipleSelectionIndicator(value) {
    this._hideMultipleSelectionIndicator = value;
    this._markButtonsForCheck();
  }
  constructor(_changeDetector, defaultOptions, _dir) {
    this._changeDetector = _changeDetector;
    this._dir = _dir;
    this._multiple = false;
    this._disabled = false;
    this._disabledInteractive = false;
    this._controlValueAccessorChangeFn = () => {
    };
    this._onTouched = () => {
    };
    this._name = `mat-button-toggle-group-${uniqueIdCounter++}`;
    this.valueChange = new EventEmitter();
    this.change = new EventEmitter();
    this.appearance = defaultOptions && defaultOptions.appearance ? defaultOptions.appearance : "standard";
    this.hideSingleSelectionIndicator = defaultOptions?.hideSingleSelectionIndicator ?? false;
    this.hideMultipleSelectionIndicator = defaultOptions?.hideMultipleSelectionIndicator ?? false;
  }
  ngOnInit() {
    this._selectionModel = new SelectionModel(this.multiple, void 0, false);
  }
  ngAfterContentInit() {
    this._selectionModel.select(...this._buttonToggles.filter((toggle) => toggle.checked));
    if (!this.multiple) {
      this._initializeTabIndex();
    }
  }
  /**
   * Sets the model value. Implemented as part of ControlValueAccessor.
   * @param value Value to be set to the model.
   */
  writeValue(value) {
    this.value = value;
    this._changeDetector.markForCheck();
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
  /** Handle keydown event calling to single-select button toggle. */
  _keydown(event) {
    if (this.multiple || this.disabled) {
      return;
    }
    const target = event.target;
    const buttonId = target.id;
    const index = this._buttonToggles.toArray().findIndex((toggle) => {
      return toggle.buttonId === buttonId;
    });
    let nextButton = null;
    switch (event.keyCode) {
      case SPACE:
      case ENTER:
        nextButton = this._buttonToggles.get(index) || null;
        break;
      case UP_ARROW:
        nextButton = this._getNextButton(index, -1);
        break;
      case LEFT_ARROW:
        nextButton = this._getNextButton(index, this.dir === "ltr" ? -1 : 1);
        break;
      case DOWN_ARROW:
        nextButton = this._getNextButton(index, 1);
        break;
      case RIGHT_ARROW:
        nextButton = this._getNextButton(index, this.dir === "ltr" ? 1 : -1);
        break;
      default:
        return;
    }
    if (nextButton) {
      event.preventDefault();
      nextButton._onButtonClick();
      nextButton.focus();
    }
  }
  /** Dispatch change event with current selection and group value. */
  _emitChangeEvent(toggle) {
    const event = new MatButtonToggleChange(toggle, this.value);
    this._rawValue = event.value;
    this._controlValueAccessorChangeFn(event.value);
    this.change.emit(event);
  }
  /**
   * Syncs a button toggle's selected state with the model value.
   * @param toggle Toggle to be synced.
   * @param select Whether the toggle should be selected.
   * @param isUserInput Whether the change was a result of a user interaction.
   * @param deferEvents Whether to defer emitting the change events.
   */
  _syncButtonToggle(toggle, select, isUserInput = false, deferEvents = false) {
    if (!this.multiple && this.selected && !toggle.checked) {
      this.selected.checked = false;
    }
    if (this._selectionModel) {
      if (select) {
        this._selectionModel.select(toggle);
      } else {
        this._selectionModel.deselect(toggle);
      }
    } else {
      deferEvents = true;
    }
    if (deferEvents) {
      Promise.resolve().then(() => this._updateModelValue(toggle, isUserInput));
    } else {
      this._updateModelValue(toggle, isUserInput);
    }
  }
  /** Checks whether a button toggle is selected. */
  _isSelected(toggle) {
    return this._selectionModel && this._selectionModel.isSelected(toggle);
  }
  /** Determines whether a button toggle should be checked on init. */
  _isPrechecked(toggle) {
    if (typeof this._rawValue === "undefined") {
      return false;
    }
    if (this.multiple && Array.isArray(this._rawValue)) {
      return this._rawValue.some((value) => toggle.value != null && value === toggle.value);
    }
    return toggle.value === this._rawValue;
  }
  /** Initializes the tabindex attribute using the radio pattern. */
  _initializeTabIndex() {
    this._buttonToggles.forEach((toggle) => {
      toggle.tabIndex = -1;
    });
    if (this.selected) {
      this.selected.tabIndex = 0;
    } else {
      for (let i = 0; i < this._buttonToggles.length; i++) {
        const toggle = this._buttonToggles.get(i);
        if (!toggle.disabled) {
          toggle.tabIndex = 0;
          break;
        }
      }
    }
    this._markButtonsForCheck();
  }
  /** Obtain the subsequent toggle to which the focus shifts. */
  _getNextButton(startIndex, offset) {
    const items = this._buttonToggles;
    for (let i = 1; i <= items.length; i++) {
      const index = (startIndex + offset * i + items.length) % items.length;
      const item = items.get(index);
      if (item && !item.disabled) {
        return item;
      }
    }
    return null;
  }
  /** Updates the selection state of the toggles in the group based on a value. */
  _setSelectionByValue(value) {
    this._rawValue = value;
    if (!this._buttonToggles) {
      return;
    }
    if (this.multiple && value) {
      if (!Array.isArray(value) && (typeof ngDevMode === "undefined" || ngDevMode)) {
        throw Error("Value must be an array in multiple-selection mode.");
      }
      this._clearSelection();
      value.forEach((currentValue) => this._selectValue(currentValue));
    } else {
      this._clearSelection();
      this._selectValue(value);
    }
  }
  /** Clears the selected toggles. */
  _clearSelection() {
    this._selectionModel.clear();
    this._buttonToggles.forEach((toggle) => {
      toggle.checked = false;
      if (!this.multiple) {
        toggle.tabIndex = -1;
      }
    });
  }
  /** Selects a value if there's a toggle that corresponds to it. */
  _selectValue(value) {
    const correspondingOption = this._buttonToggles.find((toggle) => {
      return toggle.value != null && toggle.value === value;
    });
    if (correspondingOption) {
      correspondingOption.checked = true;
      this._selectionModel.select(correspondingOption);
      if (!this.multiple) {
        correspondingOption.tabIndex = 0;
      }
    }
  }
  /** Syncs up the group's value with the model and emits the change event. */
  _updateModelValue(toggle, isUserInput) {
    if (isUserInput) {
      this._emitChangeEvent(toggle);
    }
    this.valueChange.emit(this.value);
  }
  /** Marks all of the child button toggles to be checked. */
  _markButtonsForCheck() {
    this._buttonToggles?.forEach((toggle) => toggle._markForCheck());
  }
  static {
    this.\u0275fac = function MatButtonToggleGroup_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatButtonToggleGroup)(\u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS, 8), \u0275\u0275directiveInject(Directionality, 8));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatButtonToggleGroup,
      selectors: [["mat-button-toggle-group"]],
      contentQueries: function MatButtonToggleGroup_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuery(dirIndex, MatButtonToggle, 5);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._buttonToggles = _t);
        }
      },
      hostAttrs: [1, "mat-button-toggle-group"],
      hostVars: 6,
      hostBindings: function MatButtonToggleGroup_HostBindings(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275listener("keydown", function MatButtonToggleGroup_keydown_HostBindingHandler($event) {
            return ctx._keydown($event);
          });
        }
        if (rf & 2) {
          \u0275\u0275attribute("role", ctx.multiple ? "group" : "radiogroup")("aria-disabled", ctx.disabled);
          \u0275\u0275classProp("mat-button-toggle-vertical", ctx.vertical)("mat-button-toggle-group-appearance-standard", ctx.appearance === "standard");
        }
      },
      inputs: {
        appearance: "appearance",
        name: "name",
        vertical: [2, "vertical", "vertical", booleanAttribute],
        value: "value",
        multiple: [2, "multiple", "multiple", booleanAttribute],
        disabled: [2, "disabled", "disabled", booleanAttribute],
        disabledInteractive: [2, "disabledInteractive", "disabledInteractive", booleanAttribute],
        hideSingleSelectionIndicator: [2, "hideSingleSelectionIndicator", "hideSingleSelectionIndicator", booleanAttribute],
        hideMultipleSelectionIndicator: [2, "hideMultipleSelectionIndicator", "hideMultipleSelectionIndicator", booleanAttribute]
      },
      outputs: {
        valueChange: "valueChange",
        change: "change"
      },
      exportAs: ["matButtonToggleGroup"],
      standalone: true,
      features: [\u0275\u0275ProvidersFeature([MAT_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR, {
        provide: MAT_BUTTON_TOGGLE_GROUP,
        useExisting: _MatButtonToggleGroup
      }]), \u0275\u0275InputTransformsFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatButtonToggleGroup, [{
    type: Directive,
    args: [{
      selector: "mat-button-toggle-group",
      providers: [MAT_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR, {
        provide: MAT_BUTTON_TOGGLE_GROUP,
        useExisting: MatButtonToggleGroup
      }],
      host: {
        "class": "mat-button-toggle-group",
        "(keydown)": "_keydown($event)",
        "[attr.role]": "multiple ? 'group' : 'radiogroup'",
        "[attr.aria-disabled]": "disabled",
        "[class.mat-button-toggle-vertical]": "vertical",
        "[class.mat-button-toggle-group-appearance-standard]": 'appearance === "standard"'
      },
      exportAs: "matButtonToggleGroup",
      standalone: true
    }]
  }], () => [{
    type: ChangeDetectorRef
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS]
    }]
  }, {
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }], {
    _buttonToggles: [{
      type: ContentChildren,
      args: [forwardRef(() => MatButtonToggle), {
        // Note that this would technically pick up toggles
        // from nested groups, but that's not a case that we support.
        descendants: true
      }]
    }],
    appearance: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    vertical: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    value: [{
      type: Input
    }],
    valueChange: [{
      type: Output
    }],
    multiple: [{
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
    disabledInteractive: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    change: [{
      type: Output
    }],
    hideSingleSelectionIndicator: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    hideMultipleSelectionIndicator: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var MatButtonToggle = class _MatButtonToggle {
  /** Unique ID for the underlying `button` element. */
  get buttonId() {
    return `${this.id}-button`;
  }
  /** Tabindex of the toggle. */
  get tabIndex() {
    return this._tabIndex;
  }
  set tabIndex(value) {
    this._tabIndex = value;
    this._markForCheck();
  }
  /** The appearance style of the button. */
  get appearance() {
    return this.buttonToggleGroup ? this.buttonToggleGroup.appearance : this._appearance;
  }
  set appearance(value) {
    this._appearance = value;
  }
  /** Whether the button is checked. */
  get checked() {
    return this.buttonToggleGroup ? this.buttonToggleGroup._isSelected(this) : this._checked;
  }
  set checked(value) {
    if (value !== this._checked) {
      this._checked = value;
      if (this.buttonToggleGroup) {
        this.buttonToggleGroup._syncButtonToggle(this, this._checked);
      }
      this._changeDetectorRef.markForCheck();
    }
  }
  /** Whether the button is disabled. */
  get disabled() {
    return this._disabled || this.buttonToggleGroup && this.buttonToggleGroup.disabled;
  }
  set disabled(value) {
    this._disabled = value;
  }
  /** Whether the button should remain interactive when it is disabled. */
  get disabledInteractive() {
    return this._disabledInteractive || this.buttonToggleGroup !== null && this.buttonToggleGroup.disabledInteractive;
  }
  set disabledInteractive(value) {
    this._disabledInteractive = value;
  }
  constructor(toggleGroup, _changeDetectorRef, _elementRef, _focusMonitor, defaultTabIndex, defaultOptions) {
    this._changeDetectorRef = _changeDetectorRef;
    this._elementRef = _elementRef;
    this._focusMonitor = _focusMonitor;
    this._checked = false;
    this.ariaLabelledby = null;
    this._disabled = false;
    this.change = new EventEmitter();
    const parsedTabIndex = Number(defaultTabIndex);
    this.tabIndex = parsedTabIndex || parsedTabIndex === 0 ? parsedTabIndex : null;
    this.buttonToggleGroup = toggleGroup;
    this.appearance = defaultOptions && defaultOptions.appearance ? defaultOptions.appearance : "standard";
    this.disabledInteractive = defaultOptions?.disabledInteractive ?? false;
  }
  ngOnInit() {
    const group = this.buttonToggleGroup;
    this.id = this.id || `mat-button-toggle-${uniqueIdCounter++}`;
    if (group) {
      if (group._isPrechecked(this)) {
        this.checked = true;
      } else if (group._isSelected(this) !== this._checked) {
        group._syncButtonToggle(this, this._checked);
      }
    }
  }
  ngAfterViewInit() {
    this._focusMonitor.monitor(this._elementRef, true);
  }
  ngOnDestroy() {
    const group = this.buttonToggleGroup;
    this._focusMonitor.stopMonitoring(this._elementRef);
    if (group && group._isSelected(this)) {
      group._syncButtonToggle(this, false, false, true);
    }
  }
  /** Focuses the button. */
  focus(options) {
    this._buttonElement.nativeElement.focus(options);
  }
  /** Checks the button toggle due to an interaction with the underlying native button. */
  _onButtonClick() {
    if (this.disabled) {
      return;
    }
    const newChecked = this.isSingleSelector() ? true : !this._checked;
    if (newChecked !== this._checked) {
      this._checked = newChecked;
      if (this.buttonToggleGroup) {
        this.buttonToggleGroup._syncButtonToggle(this, this._checked, true);
        this.buttonToggleGroup._onTouched();
      }
    }
    if (this.isSingleSelector()) {
      const focusable = this.buttonToggleGroup._buttonToggles.find((toggle) => {
        return toggle.tabIndex === 0;
      });
      if (focusable) {
        focusable.tabIndex = -1;
      }
      this.tabIndex = 0;
    }
    this.change.emit(new MatButtonToggleChange(this, this.value));
  }
  /**
   * Marks the button toggle as needing checking for change detection.
   * This method is exposed because the parent button toggle group will directly
   * update bound properties of the radio button.
   */
  _markForCheck() {
    this._changeDetectorRef.markForCheck();
  }
  /** Gets the name that should be assigned to the inner DOM node. */
  _getButtonName() {
    if (this.isSingleSelector()) {
      return this.buttonToggleGroup.name;
    }
    return this.name || null;
  }
  /** Whether the toggle is in single selection mode. */
  isSingleSelector() {
    return this.buttonToggleGroup && !this.buttonToggleGroup.multiple;
  }
  static {
    this.\u0275fac = function MatButtonToggle_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatButtonToggle)(\u0275\u0275directiveInject(MAT_BUTTON_TOGGLE_GROUP, 8), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(FocusMonitor), \u0275\u0275injectAttribute("tabindex"), \u0275\u0275directiveInject(MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS, 8));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatButtonToggle,
      selectors: [["mat-button-toggle"]],
      viewQuery: function MatButtonToggle_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuery(_c02, 5);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._buttonElement = _t.first);
        }
      },
      hostAttrs: ["role", "presentation", 1, "mat-button-toggle"],
      hostVars: 14,
      hostBindings: function MatButtonToggle_HostBindings(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275listener("focus", function MatButtonToggle_focus_HostBindingHandler() {
            return ctx.focus();
          });
        }
        if (rf & 2) {
          \u0275\u0275attribute("aria-label", null)("aria-labelledby", null)("id", ctx.id)("name", null);
          \u0275\u0275classProp("mat-button-toggle-standalone", !ctx.buttonToggleGroup)("mat-button-toggle-checked", ctx.checked)("mat-button-toggle-disabled", ctx.disabled)("mat-button-toggle-disabled-interactive", ctx.disabledInteractive)("mat-button-toggle-appearance-standard", ctx.appearance === "standard");
        }
      },
      inputs: {
        ariaLabel: [0, "aria-label", "ariaLabel"],
        ariaLabelledby: [0, "aria-labelledby", "ariaLabelledby"],
        id: "id",
        name: "name",
        value: "value",
        tabIndex: "tabIndex",
        disableRipple: [2, "disableRipple", "disableRipple", booleanAttribute],
        appearance: "appearance",
        checked: [2, "checked", "checked", booleanAttribute],
        disabled: [2, "disabled", "disabled", booleanAttribute],
        disabledInteractive: [2, "disabledInteractive", "disabledInteractive", booleanAttribute]
      },
      outputs: {
        change: "change"
      },
      exportAs: ["matButtonToggle"],
      standalone: true,
      features: [\u0275\u0275InputTransformsFeature, \u0275\u0275StandaloneFeature],
      ngContentSelectors: _c1,
      decls: 8,
      vars: 14,
      consts: [["button", ""], ["type", "button", 1, "mat-button-toggle-button", "mat-focus-indicator", 3, "click", "id", "disabled"], [1, "mat-button-toggle-label-content"], ["state", "checked", "aria-hidden", "true", "appearance", "minimal", 1, "mat-mdc-option-pseudo-checkbox", 3, "disabled"], [1, "mat-button-toggle-focus-overlay"], ["matRipple", "", 1, "mat-button-toggle-ripple", 3, "matRippleTrigger", "matRippleDisabled"]],
      template: function MatButtonToggle_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = \u0275\u0275getCurrentView();
          \u0275\u0275projectionDef();
          \u0275\u0275elementStart(0, "button", 1, 0);
          \u0275\u0275listener("click", function MatButtonToggle_Template_button_click_0_listener() {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._onButtonClick());
          });
          \u0275\u0275elementStart(2, "span", 2);
          \u0275\u0275template(3, MatButtonToggle_Conditional_3_Template, 1, 1, "mat-pseudo-checkbox", 3)(4, MatButtonToggle_Conditional_4_Template, 1, 1, "mat-pseudo-checkbox", 3);
          \u0275\u0275projection(5);
          \u0275\u0275elementEnd()();
          \u0275\u0275element(6, "span", 4)(7, "span", 5);
        }
        if (rf & 2) {
          const button_r3 = \u0275\u0275reference(1);
          \u0275\u0275property("id", ctx.buttonId)("disabled", ctx.disabled && !ctx.disabledInteractive || null);
          \u0275\u0275attribute("role", ctx.isSingleSelector() ? "radio" : "button")("tabindex", ctx.disabled && !ctx.disabledInteractive ? -1 : ctx.tabIndex)("aria-pressed", !ctx.isSingleSelector() ? ctx.checked : null)("aria-checked", ctx.isSingleSelector() ? ctx.checked : null)("name", ctx._getButtonName())("aria-label", ctx.ariaLabel)("aria-labelledby", ctx.ariaLabelledby)("aria-disabled", ctx.disabled && ctx.disabledInteractive ? "true" : null);
          \u0275\u0275advance(3);
          \u0275\u0275conditional(ctx.buttonToggleGroup && ctx.checked && !ctx.buttonToggleGroup.multiple && !ctx.buttonToggleGroup.hideSingleSelectionIndicator ? 3 : -1);
          \u0275\u0275advance();
          \u0275\u0275conditional(ctx.buttonToggleGroup && ctx.checked && ctx.buttonToggleGroup.multiple && !ctx.buttonToggleGroup.hideMultipleSelectionIndicator ? 4 : -1);
          \u0275\u0275advance(3);
          \u0275\u0275property("matRippleTrigger", button_r3)("matRippleDisabled", ctx.disableRipple || ctx.disabled);
        }
      },
      dependencies: [MatRipple, MatPseudoCheckbox],
      styles: [".mat-button-toggle-standalone,.mat-button-toggle-group{position:relative;display:inline-flex;flex-direction:row;white-space:nowrap;overflow:hidden;-webkit-tap-highlight-color:rgba(0,0,0,0);transform:translateZ(0);border-radius:var(--mat-legacy-button-toggle-shape)}.mat-button-toggle-standalone:not([class*=mat-elevation-z]),.mat-button-toggle-group:not([class*=mat-elevation-z]){box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)}.cdk-high-contrast-active .mat-button-toggle-standalone,.cdk-high-contrast-active .mat-button-toggle-group{outline:solid 1px}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard,.mat-button-toggle-group-appearance-standard{border-radius:var(--mat-standard-button-toggle-shape, var(--mat-app-corner-full));border:solid 1px var(--mat-standard-button-toggle-divider-color, var(--mat-app-outline))}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard .mat-pseudo-checkbox,.mat-button-toggle-group-appearance-standard .mat-pseudo-checkbox{--mat-minimal-pseudo-checkbox-selected-checkmark-color: var(--mat-standard-button-toggle-selected-state-text-color, var(--mat-app-on-secondary-container))}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard:not([class*=mat-elevation-z]),.mat-button-toggle-group-appearance-standard:not([class*=mat-elevation-z]){box-shadow:none}.cdk-high-contrast-active .mat-button-toggle-standalone.mat-button-toggle-appearance-standard,.cdk-high-contrast-active .mat-button-toggle-group-appearance-standard{outline:0}.mat-button-toggle-vertical{flex-direction:column}.mat-button-toggle-vertical .mat-button-toggle-label-content{display:block}.mat-button-toggle{white-space:nowrap;position:relative;color:var(--mat-legacy-button-toggle-text-color);font-family:var(--mat-legacy-button-toggle-label-text-font);font-size:var(--mat-legacy-button-toggle-label-text-size);line-height:var(--mat-legacy-button-toggle-label-text-line-height);font-weight:var(--mat-legacy-button-toggle-label-text-weight);letter-spacing:var(--mat-legacy-button-toggle-label-text-tracking);--mat-minimal-pseudo-checkbox-selected-checkmark-color: var(--mat-legacy-button-toggle-selected-state-text-color)}.mat-button-toggle.cdk-keyboard-focused .mat-button-toggle-focus-overlay{opacity:var(--mat-legacy-button-toggle-focus-state-layer-opacity)}.mat-button-toggle .mat-icon svg{vertical-align:top}.mat-button-toggle .mat-pseudo-checkbox{margin-right:12px}[dir=rtl] .mat-button-toggle .mat-pseudo-checkbox{margin-right:0;margin-left:12px}.mat-button-toggle-checked{color:var(--mat-legacy-button-toggle-selected-state-text-color);background-color:var(--mat-legacy-button-toggle-selected-state-background-color)}.mat-button-toggle-disabled{pointer-events:none;color:var(--mat-legacy-button-toggle-disabled-state-text-color);background-color:var(--mat-legacy-button-toggle-disabled-state-background-color);--mat-minimal-pseudo-checkbox-disabled-selected-checkmark-color: var(--mat-legacy-button-toggle-disabled-state-text-color)}.mat-button-toggle-disabled.mat-button-toggle-checked{background-color:var(--mat-legacy-button-toggle-disabled-selected-state-background-color)}.mat-button-toggle-disabled-interactive{pointer-events:auto}.mat-button-toggle-appearance-standard{color:var(--mat-standard-button-toggle-text-color, var(--mat-app-on-surface));background-color:var(--mat-standard-button-toggle-background-color);font-family:var(--mat-standard-button-toggle-label-text-font, var(--mat-app-label-large-font));font-size:var(--mat-standard-button-toggle-label-text-size, var(--mat-app-label-large-size));line-height:var(--mat-standard-button-toggle-label-text-line-height, var(--mat-app-label-large-line-height));font-weight:var(--mat-standard-button-toggle-label-text-weight, var(--mat-app-label-large-weight));letter-spacing:var(--mat-standard-button-toggle-label-text-tracking, var(--mat-app-label-large-tracking))}.mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard+.mat-button-toggle-appearance-standard{border-left:solid 1px var(--mat-standard-button-toggle-divider-color, var(--mat-app-outline))}[dir=rtl] .mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard+.mat-button-toggle-appearance-standard{border-left:none;border-right:solid 1px var(--mat-standard-button-toggle-divider-color, var(--mat-app-outline))}.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle-appearance-standard+.mat-button-toggle-appearance-standard{border-left:none;border-right:none;border-top:solid 1px var(--mat-standard-button-toggle-divider-color, var(--mat-app-outline))}.mat-button-toggle-appearance-standard.mat-button-toggle-checked{color:var(--mat-standard-button-toggle-selected-state-text-color, var(--mat-app-on-secondary-container));background-color:var(--mat-standard-button-toggle-selected-state-background-color, var(--mat-app-secondary-container))}.mat-button-toggle-appearance-standard.mat-button-toggle-disabled{color:var(--mat-standard-button-toggle-disabled-state-text-color);background-color:var(--mat-standard-button-toggle-disabled-state-background-color)}.mat-button-toggle-appearance-standard.mat-button-toggle-disabled .mat-pseudo-checkbox{--mat-minimal-pseudo-checkbox-disabled-selected-checkmark-color: var(--mat-standard-button-toggle-disabled-selected-state-text-color)}.mat-button-toggle-appearance-standard.mat-button-toggle-disabled.mat-button-toggle-checked{color:var(--mat-standard-button-toggle-disabled-selected-state-text-color);background-color:var(--mat-standard-button-toggle-disabled-selected-state-background-color)}.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay{background-color:var(--mat-standard-button-toggle-state-layer-color, var(--mat-app-on-surface))}.mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay{opacity:var(--mat-standard-button-toggle-hover-state-layer-opacity, var(--mat-app-hover-state-layer-opacity))}.mat-button-toggle-appearance-standard.cdk-keyboard-focused .mat-button-toggle-focus-overlay{opacity:var(--mat-standard-button-toggle-focus-state-layer-opacity, var(--mat-app-focus-state-layer-opacity))}@media(hover: none){.mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay{display:none}}.mat-button-toggle-label-content{-webkit-user-select:none;user-select:none;display:inline-block;padding:0 16px;line-height:var(--mat-legacy-button-toggle-height);position:relative}.mat-button-toggle-appearance-standard .mat-button-toggle-label-content{padding:0 12px;line-height:var(--mat-standard-button-toggle-height)}.mat-button-toggle-label-content>*{vertical-align:middle}.mat-button-toggle-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:inherit;pointer-events:none;opacity:0;background-color:var(--mat-legacy-button-toggle-state-layer-color)}.cdk-high-contrast-active .mat-button-toggle-checked .mat-button-toggle-focus-overlay{border-bottom:solid 500px;opacity:.5;height:0}.cdk-high-contrast-active .mat-button-toggle-checked:hover .mat-button-toggle-focus-overlay{opacity:.6}.cdk-high-contrast-active .mat-button-toggle-checked.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay{border-bottom:solid 500px}.mat-button-toggle .mat-button-toggle-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-button-toggle-button{border:0;background:none;color:inherit;padding:0;margin:0;font:inherit;outline:none;width:100%;cursor:pointer}.mat-button-toggle-disabled .mat-button-toggle-button{cursor:default}.mat-button-toggle-button::-moz-focus-inner{border:0}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard{--mat-focus-indicator-border-radius:var(--mat-standard-button-toggle-shape, var(--mat-app-corner-full))}.mat-button-toggle-group-appearance-standard .mat-button-toggle:last-of-type .mat-button-toggle-button::before{border-top-right-radius:var(--mat-standard-button-toggle-shape, var(--mat-app-corner-full));border-bottom-right-radius:var(--mat-standard-button-toggle-shape, var(--mat-app-corner-full))}.mat-button-toggle-group-appearance-standard .mat-button-toggle:first-of-type .mat-button-toggle-button::before{border-top-left-radius:var(--mat-standard-button-toggle-shape, var(--mat-app-corner-full));border-bottom-left-radius:var(--mat-standard-button-toggle-shape, var(--mat-app-corner-full))}"],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatButtonToggle, [{
    type: Component,
    args: [{
      selector: "mat-button-toggle",
      encapsulation: ViewEncapsulation$1.None,
      exportAs: "matButtonToggle",
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "[class.mat-button-toggle-standalone]": "!buttonToggleGroup",
        "[class.mat-button-toggle-checked]": "checked",
        "[class.mat-button-toggle-disabled]": "disabled",
        "[class.mat-button-toggle-disabled-interactive]": "disabledInteractive",
        "[class.mat-button-toggle-appearance-standard]": 'appearance === "standard"',
        "class": "mat-button-toggle",
        "[attr.aria-label]": "null",
        "[attr.aria-labelledby]": "null",
        "[attr.id]": "id",
        "[attr.name]": "null",
        "(focus)": "focus()",
        "role": "presentation"
      },
      standalone: true,
      imports: [MatRipple, MatPseudoCheckbox],
      template: `<button #button class="mat-button-toggle-button mat-focus-indicator"
        type="button"
        [id]="buttonId"
        [attr.role]="isSingleSelector() ? 'radio' : 'button'"
        [attr.tabindex]="disabled && !disabledInteractive ? -1 : tabIndex"
        [attr.aria-pressed]="!isSingleSelector() ? checked : null"
        [attr.aria-checked]="isSingleSelector() ? checked : null"
        [disabled]="(disabled && !disabledInteractive) || null"
        [attr.name]="_getButtonName()"
        [attr.aria-label]="ariaLabel"
        [attr.aria-labelledby]="ariaLabelledby"
        [attr.aria-disabled]="disabled && disabledInteractive ? 'true' : null"
        (click)="_onButtonClick()">
  <span class="mat-button-toggle-label-content">
    <!-- Render checkmark at the beginning for single-selection. -->
    @if (buttonToggleGroup && checked && !buttonToggleGroup.multiple && !buttonToggleGroup.hideSingleSelectionIndicator) {
      <mat-pseudo-checkbox
          class="mat-mdc-option-pseudo-checkbox"
          [disabled]="disabled"
          state="checked"
          aria-hidden="true"
          appearance="minimal"></mat-pseudo-checkbox>
    }
    <!-- Render checkmark at the beginning for multiple-selection. -->
    @if (buttonToggleGroup && checked && buttonToggleGroup.multiple && !buttonToggleGroup.hideMultipleSelectionIndicator) {
      <mat-pseudo-checkbox
          class="mat-mdc-option-pseudo-checkbox"
          [disabled]="disabled"
          state="checked"
          aria-hidden="true"
          appearance="minimal"></mat-pseudo-checkbox>
    }
    <ng-content></ng-content>
  </span>
</button>

<span class="mat-button-toggle-focus-overlay"></span>
<span class="mat-button-toggle-ripple" matRipple
     [matRippleTrigger]="button"
     [matRippleDisabled]="this.disableRipple || this.disabled">
</span>
`,
      styles: [".mat-button-toggle-standalone,.mat-button-toggle-group{position:relative;display:inline-flex;flex-direction:row;white-space:nowrap;overflow:hidden;-webkit-tap-highlight-color:rgba(0,0,0,0);transform:translateZ(0);border-radius:var(--mat-legacy-button-toggle-shape)}.mat-button-toggle-standalone:not([class*=mat-elevation-z]),.mat-button-toggle-group:not([class*=mat-elevation-z]){box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)}.cdk-high-contrast-active .mat-button-toggle-standalone,.cdk-high-contrast-active .mat-button-toggle-group{outline:solid 1px}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard,.mat-button-toggle-group-appearance-standard{border-radius:var(--mat-standard-button-toggle-shape, var(--mat-app-corner-full));border:solid 1px var(--mat-standard-button-toggle-divider-color, var(--mat-app-outline))}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard .mat-pseudo-checkbox,.mat-button-toggle-group-appearance-standard .mat-pseudo-checkbox{--mat-minimal-pseudo-checkbox-selected-checkmark-color: var(--mat-standard-button-toggle-selected-state-text-color, var(--mat-app-on-secondary-container))}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard:not([class*=mat-elevation-z]),.mat-button-toggle-group-appearance-standard:not([class*=mat-elevation-z]){box-shadow:none}.cdk-high-contrast-active .mat-button-toggle-standalone.mat-button-toggle-appearance-standard,.cdk-high-contrast-active .mat-button-toggle-group-appearance-standard{outline:0}.mat-button-toggle-vertical{flex-direction:column}.mat-button-toggle-vertical .mat-button-toggle-label-content{display:block}.mat-button-toggle{white-space:nowrap;position:relative;color:var(--mat-legacy-button-toggle-text-color);font-family:var(--mat-legacy-button-toggle-label-text-font);font-size:var(--mat-legacy-button-toggle-label-text-size);line-height:var(--mat-legacy-button-toggle-label-text-line-height);font-weight:var(--mat-legacy-button-toggle-label-text-weight);letter-spacing:var(--mat-legacy-button-toggle-label-text-tracking);--mat-minimal-pseudo-checkbox-selected-checkmark-color: var(--mat-legacy-button-toggle-selected-state-text-color)}.mat-button-toggle.cdk-keyboard-focused .mat-button-toggle-focus-overlay{opacity:var(--mat-legacy-button-toggle-focus-state-layer-opacity)}.mat-button-toggle .mat-icon svg{vertical-align:top}.mat-button-toggle .mat-pseudo-checkbox{margin-right:12px}[dir=rtl] .mat-button-toggle .mat-pseudo-checkbox{margin-right:0;margin-left:12px}.mat-button-toggle-checked{color:var(--mat-legacy-button-toggle-selected-state-text-color);background-color:var(--mat-legacy-button-toggle-selected-state-background-color)}.mat-button-toggle-disabled{pointer-events:none;color:var(--mat-legacy-button-toggle-disabled-state-text-color);background-color:var(--mat-legacy-button-toggle-disabled-state-background-color);--mat-minimal-pseudo-checkbox-disabled-selected-checkmark-color: var(--mat-legacy-button-toggle-disabled-state-text-color)}.mat-button-toggle-disabled.mat-button-toggle-checked{background-color:var(--mat-legacy-button-toggle-disabled-selected-state-background-color)}.mat-button-toggle-disabled-interactive{pointer-events:auto}.mat-button-toggle-appearance-standard{color:var(--mat-standard-button-toggle-text-color, var(--mat-app-on-surface));background-color:var(--mat-standard-button-toggle-background-color);font-family:var(--mat-standard-button-toggle-label-text-font, var(--mat-app-label-large-font));font-size:var(--mat-standard-button-toggle-label-text-size, var(--mat-app-label-large-size));line-height:var(--mat-standard-button-toggle-label-text-line-height, var(--mat-app-label-large-line-height));font-weight:var(--mat-standard-button-toggle-label-text-weight, var(--mat-app-label-large-weight));letter-spacing:var(--mat-standard-button-toggle-label-text-tracking, var(--mat-app-label-large-tracking))}.mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard+.mat-button-toggle-appearance-standard{border-left:solid 1px var(--mat-standard-button-toggle-divider-color, var(--mat-app-outline))}[dir=rtl] .mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard+.mat-button-toggle-appearance-standard{border-left:none;border-right:solid 1px var(--mat-standard-button-toggle-divider-color, var(--mat-app-outline))}.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle-appearance-standard+.mat-button-toggle-appearance-standard{border-left:none;border-right:none;border-top:solid 1px var(--mat-standard-button-toggle-divider-color, var(--mat-app-outline))}.mat-button-toggle-appearance-standard.mat-button-toggle-checked{color:var(--mat-standard-button-toggle-selected-state-text-color, var(--mat-app-on-secondary-container));background-color:var(--mat-standard-button-toggle-selected-state-background-color, var(--mat-app-secondary-container))}.mat-button-toggle-appearance-standard.mat-button-toggle-disabled{color:var(--mat-standard-button-toggle-disabled-state-text-color);background-color:var(--mat-standard-button-toggle-disabled-state-background-color)}.mat-button-toggle-appearance-standard.mat-button-toggle-disabled .mat-pseudo-checkbox{--mat-minimal-pseudo-checkbox-disabled-selected-checkmark-color: var(--mat-standard-button-toggle-disabled-selected-state-text-color)}.mat-button-toggle-appearance-standard.mat-button-toggle-disabled.mat-button-toggle-checked{color:var(--mat-standard-button-toggle-disabled-selected-state-text-color);background-color:var(--mat-standard-button-toggle-disabled-selected-state-background-color)}.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay{background-color:var(--mat-standard-button-toggle-state-layer-color, var(--mat-app-on-surface))}.mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay{opacity:var(--mat-standard-button-toggle-hover-state-layer-opacity, var(--mat-app-hover-state-layer-opacity))}.mat-button-toggle-appearance-standard.cdk-keyboard-focused .mat-button-toggle-focus-overlay{opacity:var(--mat-standard-button-toggle-focus-state-layer-opacity, var(--mat-app-focus-state-layer-opacity))}@media(hover: none){.mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay{display:none}}.mat-button-toggle-label-content{-webkit-user-select:none;user-select:none;display:inline-block;padding:0 16px;line-height:var(--mat-legacy-button-toggle-height);position:relative}.mat-button-toggle-appearance-standard .mat-button-toggle-label-content{padding:0 12px;line-height:var(--mat-standard-button-toggle-height)}.mat-button-toggle-label-content>*{vertical-align:middle}.mat-button-toggle-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:inherit;pointer-events:none;opacity:0;background-color:var(--mat-legacy-button-toggle-state-layer-color)}.cdk-high-contrast-active .mat-button-toggle-checked .mat-button-toggle-focus-overlay{border-bottom:solid 500px;opacity:.5;height:0}.cdk-high-contrast-active .mat-button-toggle-checked:hover .mat-button-toggle-focus-overlay{opacity:.6}.cdk-high-contrast-active .mat-button-toggle-checked.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay{border-bottom:solid 500px}.mat-button-toggle .mat-button-toggle-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-button-toggle-button{border:0;background:none;color:inherit;padding:0;margin:0;font:inherit;outline:none;width:100%;cursor:pointer}.mat-button-toggle-disabled .mat-button-toggle-button{cursor:default}.mat-button-toggle-button::-moz-focus-inner{border:0}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard{--mat-focus-indicator-border-radius:var(--mat-standard-button-toggle-shape, var(--mat-app-corner-full))}.mat-button-toggle-group-appearance-standard .mat-button-toggle:last-of-type .mat-button-toggle-button::before{border-top-right-radius:var(--mat-standard-button-toggle-shape, var(--mat-app-corner-full));border-bottom-right-radius:var(--mat-standard-button-toggle-shape, var(--mat-app-corner-full))}.mat-button-toggle-group-appearance-standard .mat-button-toggle:first-of-type .mat-button-toggle-button::before{border-top-left-radius:var(--mat-standard-button-toggle-shape, var(--mat-app-corner-full));border-bottom-left-radius:var(--mat-standard-button-toggle-shape, var(--mat-app-corner-full))}"]
    }]
  }], () => [{
    type: MatButtonToggleGroup,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [MAT_BUTTON_TOGGLE_GROUP]
    }]
  }, {
    type: ChangeDetectorRef
  }, {
    type: ElementRef
  }, {
    type: FocusMonitor
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
      args: [MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS]
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
    _buttonElement: [{
      type: ViewChild,
      args: ["button"]
    }],
    id: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    tabIndex: [{
      type: Input
    }],
    disableRipple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    appearance: [{
      type: Input
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
    disabledInteractive: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    change: [{
      type: Output
    }]
  });
})();
var MatButtonToggleModule = class _MatButtonToggleModule {
  static {
    this.\u0275fac = function MatButtonToggleModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatButtonToggleModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _MatButtonToggleModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
      imports: [MatCommonModule, MatRippleModule, MatButtonToggle, MatCommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatButtonToggleModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, MatRippleModule, MatButtonToggleGroup, MatButtonToggle],
      exports: [MatCommonModule, MatButtonToggleGroup, MatButtonToggle]
    }]
  }], null, null);
})();

// src/app/shared/pipes/distance.pipe.ts
var DistancePipe = class _DistancePipe {
  transform(metres) {
    if (metres === void 0 || metres === null) {
      return "";
    }
    if (metres < 1e3) {
      return `${Math.round(metres)} m`;
    }
    return `${(metres / 1e3).toFixed(1)} km`;
  }
  static {
    this.\u0275fac = function DistancePipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DistancePipe)();
    };
  }
  static {
    this.\u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "distance", type: _DistancePipe, pure: true, standalone: true });
  }
};

// src/app/shared/components/consultation-paywall/consultation-paywall.component.ts
function ConsultationPaywallComponent_Conditional_4_Conditional_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "mat-icon");
    \u0275\u0275text(2, "visibility_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate3("", ctx_r1.data.consultationsRestantes, " consultation", ctx_r1.data.consultationsRestantes > 1 ? "s" : "", " restante", ctx_r1.data.consultationsRestantes > 1 ? "s" : "", "");
  }
}
function ConsultationPaywallComponent_Conditional_4_Conditional_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "mat-icon");
    \u0275\u0275text(2, "calendar_today");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Expire le ", ctx_r1.formatDate(ctx_r1.data.dateExpiration), "");
  }
}
function ConsultationPaywallComponent_Conditional_4_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275template(1, ConsultationPaywallComponent_Conditional_4_Conditional_4_Conditional_1_Template, 5, 3, "div", 9)(2, ConsultationPaywallComponent_Conditional_4_Conditional_4_Conditional_2_Template, 5, 1, "div", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.data.consultationsRestantes !== void 0 ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.data.dateExpiration ? 2 : -1);
  }
}
function ConsultationPaywallComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2", 2);
    \u0275\u0275text(1, "Quota \xE9puis\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 3);
    \u0275\u0275text(3, " Vous avez utilis\xE9 toutes vos consultations disponibles. Renouvelez votre abonnement pour continuer. ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, ConsultationPaywallComponent_Conditional_4_Conditional_4_Template, 3, 2, "div", 4);
    \u0275\u0275elementStart(5, "div", 5)(6, "div", 6)(7, "mat-icon");
    \u0275\u0275text(8, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9, " Acc\xE8s illimit\xE9 aux revendeurs ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 6)(11, "mat-icon");
    \u0275\u0275text(12, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13, " Suivi de vos commandes ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 6)(15, "mat-icon");
    \u0275\u0275text(16, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(17, " Notifications de stock en temps r\xE9el ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 7)(19, "button", 8);
    \u0275\u0275listener("click", function ConsultationPaywallComponent_Conditional_4_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.dialogRef.close());
    });
    \u0275\u0275elementStart(20, "mat-icon");
    \u0275\u0275text(21, "refresh");
    \u0275\u0275elementEnd();
    \u0275\u0275text(22, " Renouveler mon abonnement ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.data.consultationsRestantes !== void 0 || ctx_r1.data.dateExpiration ? 4 : -1);
  }
}
function ConsultationPaywallComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2", 2);
    \u0275\u0275text(1, "Quota gratuit atteint");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 3);
    \u0275\u0275text(3, " Vous avez consult\xE9 les d\xE9tails de ");
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5, "3 revendeurs");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " gratuitement. Cr\xE9ez un compte pour continuer \xE0 trouver du gaz pr\xE8s de chez vous. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 5)(8, "div", 6)(9, "mat-icon");
    \u0275\u0275text(10, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " Consultations illimit\xE9es ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 6)(13, "mat-icon");
    \u0275\u0275text(14, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15, " Suivi de vos commandes ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 6)(17, "mat-icon");
    \u0275\u0275text(18, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(19, " Notifications de stock en temps r\xE9el ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 7)(21, "button", 10);
    \u0275\u0275listener("click", function ConsultationPaywallComponent_Conditional_5_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.dialogRef.close());
    });
    \u0275\u0275elementStart(22, "mat-icon");
    \u0275\u0275text(23, "person_add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(24, " Cr\xE9er un compte gratuit ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 11);
    \u0275\u0275listener("click", function ConsultationPaywallComponent_Conditional_5_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.dialogRef.close());
    });
    \u0275\u0275text(26, " J'ai d\xE9j\xE0 un compte ");
    \u0275\u0275elementEnd()();
  }
}
var ConsultationPaywallComponent = class _ConsultationPaywallComponent {
  constructor() {
    this.dialogRef = inject(MatDialogRef);
    this.data = inject(MAT_DIALOG_DATA, { optional: true }) ?? {};
  }
  formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
  }
  static {
    this.\u0275fac = function ConsultationPaywallComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ConsultationPaywallComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ConsultationPaywallComponent, selectors: [["app-consultation-paywall"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 6, vars: 1, consts: [[1, "paywall"], [1, "icone-verrou"], [1, "titre"], [1, "description"], [1, "quota-details"], [1, "avantages"], [1, "avantage"], [1, "actions"], ["mat-raised-button", "", "routerLink", "/abonnement/renouveler", 1, "btn-inscription", 3, "click"], [1, "quota-ligne"], ["mat-raised-button", "", "routerLink", "/auth/register", 1, "btn-inscription", 3, "click"], ["mat-button", "", "routerLink", "/auth/login", 1, "btn-connexion", 3, "click"]], template: function ConsultationPaywallComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "mat-icon");
        \u0275\u0275text(3, "lock");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(4, ConsultationPaywallComponent_Conditional_4_Template, 23, 1)(5, ConsultationPaywallComponent_Conditional_5_Template, 27, 0);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275conditional(ctx.data.estConnecte ? 4 : 5);
      }
    }, dependencies: [RouterModule, RouterLink, MatDialogModule, MatButtonModule, MatButton, MatIconModule, MatIcon], styles: ['\n\n.paywall[_ngcontent-%COMP%] {\n  padding: 32px 24px;\n  max-width: 400px;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n}\n.icone-verrou[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n  border-radius: 50%;\n  background: color-mix(in srgb, var(--color-primary) 12%, transparent);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  mat-icon {\n    font-size: 2.2rem;\n    width: 2.2rem;\n    height: 2.2rem;\n    color: var(--color-primary);\n  }\n}\n.titre[_ngcontent-%COMP%] {\n  font-family: "Montserrat", sans-serif;\n  font-size: 1.3rem;\n  color: var(--color-text);\n  margin: 0;\n}\n.description[_ngcontent-%COMP%] {\n  font-size: 0.88rem;\n  color: var(--color-text-muted);\n  line-height: 1.6;\n  margin: 0;\n}\n.avantages[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  width: 100%;\n  background: var(--color-surface-2, #f5f7fa);\n  border-radius: var(--radius-sm);\n  padding: 14px 16px;\n}\n.avantage[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 0.85rem;\n  color: var(--color-text);\n  mat-icon {\n    font-size: 1.1rem;\n    width: 1.1rem;\n    height: 1.1rem;\n    color: var(--color-success, #2e7d32);\n    flex-shrink: 0;\n  }\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  width: 100%;\n}\n.btn-inscription[_ngcontent-%COMP%] {\n  background-color: var(--color-accent) !important;\n  color: #1a1a00 !important;\n  height: 44px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n.quota-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  width: 100%;\n  padding: 10px 14px;\n  background: var(--color-surface-2, #f5f7fa);\n  border-radius: var(--radius-sm);\n  border-left: 3px solid var(--color-warning);\n}\n.quota-ligne[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 0.83rem;\n  color: var(--color-text);\n  mat-icon {\n    font-size: 1rem;\n    width: 1rem;\n    height: 1rem;\n    color: var(--color-warning);\n    flex-shrink: 0;\n  }\n}\n.btn-connexion[_ngcontent-%COMP%] {\n  color: var(--color-primary) !important;\n}\n/*# sourceMappingURL=consultation-paywall.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ConsultationPaywallComponent, { className: "ConsultationPaywallComponent", filePath: "src/app/shared/components/consultation-paywall/consultation-paywall.component.ts", lineNumber: 227 });
})();

// src/app/features/revendeur/revendeur-card/revendeur-card.component.ts
function RevendeurCardComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 4);
    \u0275\u0275text(1, "workspace_premium");
    \u0275\u0275elementEnd();
  }
}
function RevendeurCardComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" \u2014 ", ctx_r0.revendeur.adresse, " ");
  }
}
function RevendeurCardComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1, "+229 \u2022\u2022 \u2022\u2022 \u2022\u2022 \u2022\u2022");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "mat-icon", 18);
    \u0275\u0275text(3, "lock");
    \u0275\u0275elementEnd();
  }
}
function RevendeurCardComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r0.revendeur.telephone, " ");
  }
}
function RevendeurCardComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 10)(1, "mat-icon", 6);
    \u0275\u0275text(2, "local_shipping");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Livraison disponible ");
    \u0275\u0275elementEnd();
  }
}
function RevendeurCardComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 9)(1, "mat-icon", 6);
    \u0275\u0275text(2, "near_me");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "distance");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 1, ctx_r0.revendeur.distance), " ");
  }
}
function RevendeurCardComponent_Conditional_21_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const marque_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(marque_r2);
  }
}
function RevendeurCardComponent_Conditional_21_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("+", ctx_r0.revendeur.marques.length - 4, "");
  }
}
function RevendeurCardComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275repeaterCreate(1, RevendeurCardComponent_Conditional_21_For_2_Template, 2, 1, "mat-chip", 19, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275template(3, RevendeurCardComponent_Conditional_21_Conditional_3_Template, 2, 1, "mat-chip", 19);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.revendeur.marques.slice(0, 4));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.revendeur.marques.length > 4 ? 3 : -1);
  }
}
function RevendeurCardComponent_Conditional_22_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 22);
    \u0275\u0275text(1, " star ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const $index_r3 = ctx.$index;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", $index_r3 < ctx_r0.Math.round(ctx_r0.revendeur.noteMoyenne));
  }
}
function RevendeurCardComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275repeaterCreate(1, RevendeurCardComponent_Conditional_22_For_2_Template, 2, 2, "mat-icon", 20, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementStart(3, "span", 21);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.etoiles);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("(", ctx_r0.revendeur.nombreAvis, " avis)");
  }
}
function RevendeurCardComponent_Conditional_23_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.consultationService.statut().consultationsRestantes, " consultation(s) gratuite(s) restante(s) ");
  }
}
function RevendeurCardComponent_Conditional_23_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275text(0, " Quota \xE9puis\xE9 \u2014 ");
    \u0275\u0275elementStart(1, "a", 24);
    \u0275\u0275listener("click", function RevendeurCardComponent_Conditional_23_Conditional_4_Template_a_click_1_listener($event) {
      \u0275\u0275restoreView(_r4);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(2, "Cr\xE9er un compte");
    \u0275\u0275elementEnd();
  }
}
function RevendeurCardComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "mat-icon");
    \u0275\u0275text(2, "visibility");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, RevendeurCardComponent_Conditional_23_Conditional_3_Template, 1, 1)(4, RevendeurCardComponent_Conditional_23_Conditional_4_Template, 3, 0, "a", 23);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.consultationService.statut().consultationsRestantes > 0 ? 3 : 4);
  }
}
function RevendeurCardComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "lock");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " S'inscrire ");
  }
}
function RevendeurCardComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "shopping_cart");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Commander ");
  }
}
var RevendeurCardComponent = class _RevendeurCardComponent {
  constructor() {
    this.selectionne = new EventEmitter();
    this.commander = new EventEmitter();
    this.consultationService = inject(ConsultationService);
    this.authService = inject(AuthService);
    this.dialog = inject(MatDialog);
    this.StockStatus = StockStatus;
    this.Math = Math;
    this.etoiles = [1, 2, 3, 4, 5];
  }
  /** Vrai si l'utilisateur n'est pas connecté ET a épuisé son quota. */
  estVerrouille() {
    return !this.authService.estConnecte() && !this.consultationService.statut().autorise;
  }
  /** Clic sur "Commander" : vérifier le quota avant d'émettre (connecté ou anonyme). */
  onCommander() {
    this.consultationService.consulter().subscribe((statut) => {
      if (statut.autorise) {
        this.commander.emit(this.revendeur);
      } else {
        this.dialog.open(ConsultationPaywallComponent, {
          maxWidth: "440px",
          width: "100%",
          data: {
            estConnecte: this.authService.estConnecte(),
            consultationsRestantes: this.consultationService.statut().consultationsRestantes,
            dateExpiration: this.consultationService.statut().dateExpiration
          }
        });
      }
    });
  }
  static {
    this.\u0275fac = function RevendeurCardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _RevendeurCardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RevendeurCardComponent, selectors: [["app-revendeur-card"]], inputs: { revendeur: "revendeur" }, outputs: { selectionne: "selectionne", commander: "commander" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 32, vars: 16, consts: [[1, "carte-revendeur", 3, "click"], [1, "entete"], [1, "info-principale"], [1, "nom"], ["matTooltip", "Revendeur Premium", 1, "icone-premium"], [1, "quartier"], [1, "icone-sm"], [3, "stockStatus"], [1, "details"], [1, "detail-item"], [1, "detail-item", "livraison-dispo"], [1, "marques"], [1, "note"], [1, "compteur-quota"], [1, "actions", 3, "click"], ["mat-stroked-button", "", 1, "btn-carte", 3, "click"], ["mat-raised-button", "", 1, "btn-commander", 3, "click", "disabled", "matTooltip"], [1, "tel-masque"], ["matTooltip", "Cr\xE9ez un compte pour voir le num\xE9ro", 1, "icone-verrou"], [1, "chip-marque"], [1, "etoile", 3, "active"], [1, "nb-avis"], [1, "etoile"], ["routerLink", "/auth/register"], ["routerLink", "/auth/register", 3, "click"]], template: function RevendeurCardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "mat-card", 0);
        \u0275\u0275listener("click", function RevendeurCardComponent_Template_mat_card_click_0_listener() {
          return ctx.selectionne.emit(ctx.revendeur.id);
        });
        \u0275\u0275elementStart(1, "mat-card-content")(2, "div", 1)(3, "div", 2)(4, "h3", 3);
        \u0275\u0275text(5);
        \u0275\u0275template(6, RevendeurCardComponent_Conditional_6_Template, 2, 0, "mat-icon", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "p", 5)(8, "mat-icon", 6);
        \u0275\u0275text(9, "place");
        \u0275\u0275elementEnd();
        \u0275\u0275text(10);
        \u0275\u0275template(11, RevendeurCardComponent_Conditional_11_Template, 1, 1);
        \u0275\u0275elementEnd()();
        \u0275\u0275element(12, "app-stock-badge", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "div", 8)(14, "p", 9)(15, "mat-icon", 6);
        \u0275\u0275text(16, "phone");
        \u0275\u0275elementEnd();
        \u0275\u0275template(17, RevendeurCardComponent_Conditional_17_Template, 4, 0)(18, RevendeurCardComponent_Conditional_18_Template, 1, 1);
        \u0275\u0275elementEnd();
        \u0275\u0275template(19, RevendeurCardComponent_Conditional_19_Template, 4, 0, "p", 10)(20, RevendeurCardComponent_Conditional_20_Template, 5, 3, "p", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275template(21, RevendeurCardComponent_Conditional_21_Template, 4, 1, "div", 11)(22, RevendeurCardComponent_Conditional_22_Template, 5, 1, "div", 12)(23, RevendeurCardComponent_Conditional_23_Template, 5, 1, "div", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "mat-card-actions", 14);
        \u0275\u0275listener("click", function RevendeurCardComponent_Template_mat_card_actions_click_24_listener($event) {
          return $event.stopPropagation();
        });
        \u0275\u0275elementStart(25, "button", 15);
        \u0275\u0275listener("click", function RevendeurCardComponent_Template_button_click_25_listener() {
          return ctx.selectionne.emit(ctx.revendeur.id);
        });
        \u0275\u0275elementStart(26, "mat-icon");
        \u0275\u0275text(27, "map");
        \u0275\u0275elementEnd();
        \u0275\u0275text(28, " Voir sur la carte ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "button", 16);
        \u0275\u0275listener("click", function RevendeurCardComponent_Template_button_click_29_listener() {
          return ctx.onCommander();
        });
        \u0275\u0275template(30, RevendeurCardComponent_Conditional_30_Template, 3, 0)(31, RevendeurCardComponent_Conditional_31_Template, 3, 0);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate1(" ", ctx.revendeur.nom, " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.revendeur.abonnement !== "GRATUIT" ? 6 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1(" ", ctx.revendeur.quartier, " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.revendeur.adresse ? 11 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("stockStatus", ctx.revendeur.stockStatus);
        \u0275\u0275advance(2);
        \u0275\u0275classProp("detail-verrouille", ctx.estVerrouille());
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.estVerrouille() ? 17 : 18);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.revendeur.livraison ? 19 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.revendeur.distance !== void 0 ? 20 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.revendeur.marques && ctx.revendeur.marques.length > 0 ? 21 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.revendeur.nombreAvis > 0 ? 22 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.authService.estConnecte() && ctx.consultationService.statut().consultationsRestantes < ctx.consultationService.statut().limite ? 23 : -1);
        \u0275\u0275advance(6);
        \u0275\u0275property("disabled", ctx.revendeur.stockStatus === ctx.StockStatus.EPUISE)("matTooltip", ctx.revendeur.stockStatus === ctx.StockStatus.EPUISE ? "Stock \xE9puis\xE9" : "");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.estVerrouille() ? 30 : 31);
      }
    }, dependencies: [
      CommonModule,
      RouterModule,
      RouterLink,
      MatCardModule,
      MatCard,
      MatCardActions,
      MatCardContent,
      MatButtonModule,
      MatButton,
      MatIconModule,
      MatIcon,
      MatChipsModule,
      MatChip,
      MatTooltipModule,
      MatTooltip,
      StockBadgeComponent,
      DistancePipe
    ], styles: ['\n\n.carte-revendeur[_ngcontent-%COMP%] {\n  background-color: var(--color-surface) !important;\n  border: 1px solid var(--color-border) !important;\n  cursor: pointer;\n  transition: border-color 0.2s, box-shadow 0.2s;\n  margin-bottom: 10px;\n  &:hover {\n    border-color: var(--color-primary) !important;\n    box-shadow: 0 4px 16px rgba(74, 111, 165, 0.15) !important;\n  }\n}\n.entete[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 8px;\n  margin-bottom: 10px;\n}\n.info-principale[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.nom[_ngcontent-%COMP%] {\n  font-family: "Montserrat", sans-serif;\n  font-size: 0.95rem;\n  font-weight: 400;\n  color: var(--color-text);\n  margin-bottom: 2px;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.icone-premium[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  width: 1rem;\n  height: 1rem;\n  color: var(--color-accent);\n}\n.quartier[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: var(--color-text-muted);\n  display: flex;\n  align-items: center;\n  gap: 2px;\n}\n.details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  margin-bottom: 10px;\n}\n.detail-item[_ngcontent-%COMP%] {\n  font-size: 0.83rem;\n  color: var(--color-text-muted);\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  &.livraison-dispo {\n    color: var(--color-success);\n    font-weight: 600;\n  }\n  &.detail-verrouille {\n    opacity: 0.7;\n  }\n}\n.tel-masque[_ngcontent-%COMP%] {\n  letter-spacing: 0.1em;\n  color: var(--color-text-muted);\n}\n.icone-verrou[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  width: 0.85rem;\n  height: 0.85rem;\n  color: var(--color-text-muted);\n  margin-left: 2px;\n}\n.icone-sm[_ngcontent-%COMP%] {\n  font-size: 1rem !important;\n  height: 1rem !important;\n  width: 1rem !important;\n}\n.marques[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 4px;\n  margin-bottom: 8px;\n}\n.chip-marque[_ngcontent-%COMP%] {\n  background-color: var(--color-primary-light) !important;\n  color: var(--color-primary) !important;\n  font-size: 0.72rem !important;\n  font-weight: 600 !important;\n  height: 22px !important;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n.note[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  margin-bottom: 4px;\n}\n.etoile[_ngcontent-%COMP%] {\n  font-size: 0.9rem !important;\n  height: 0.9rem !important;\n  width: 0.9rem !important;\n  color: var(--color-surface-3);\n  &.active {\n    color: var(--color-accent);\n  }\n}\n.nb-avis[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: var(--color-text-muted);\n  margin-left: 4px;\n}\n.compteur-quota[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 0.75rem;\n  color: var(--color-text-muted);\n  margin-top: 6px;\n  padding: 4px 8px;\n  background: var(--color-surface-2, #f5f7fa);\n  border-radius: var(--radius-sm);\n  mat-icon {\n    font-size: 0.85rem;\n    width: 0.85rem;\n    height: 0.85rem;\n  }\n  a {\n    color: var(--color-primary);\n    font-weight: 600;\n    text-decoration: none;\n    &:hover {\n      text-decoration: underline;\n    }\n  }\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  padding: 8px 16px 12px !important;\n  border-top: 1px solid var(--color-border);\n}\n.btn-carte[_ngcontent-%COMP%] {\n  flex: 1;\n  border-color: var(--color-primary) !important;\n  color: var(--color-primary) !important;\n  font-size: 0.82rem !important;\n  font-weight: 600 !important;\n}\n.btn-commander[_ngcontent-%COMP%] {\n  flex: 1;\n  background-color: var(--color-accent) !important;\n  color: #1a1a00 !important;\n  font-size: 0.82rem !important;\n  font-weight: 700 !important;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  &:hover:not(:disabled) {\n    background-color: var(--color-accent-dark) !important;\n  }\n  &:disabled {\n    background-color: var(--color-surface-3) !important;\n    color: var(--color-text-muted) !important;\n  }\n}\n/*# sourceMappingURL=revendeur-card.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RevendeurCardComponent, { className: "RevendeurCardComponent", filePath: "src/app/features/revendeur/revendeur-card/revendeur-card.component.ts", lineNumber: 339 });
})();

// src/app/features/revendeur/revendeur-list/revendeur-list.component.ts
var _forTrack02 = ($index, $item) => $item.id;
function RevendeurListComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function RevendeurListComponent_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.texteRecherche.set(""));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "close");
    \u0275\u0275elementEnd()();
  }
}
function RevendeurListComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 8);
  }
}
function RevendeurListComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "near_me");
    \u0275\u0275elementEnd();
  }
}
function RevendeurListComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275element(1, "mat-spinner", 19);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Chargement des revendeurs...");
    \u0275\u0275elementEnd()();
  }
}
function RevendeurListComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "mat-icon");
    \u0275\u0275text(2, "error_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.revendeurService.erreur(), " ");
  }
}
function RevendeurListComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(" ", ctx_r1.revendeursFiltres().length, " revendeur", ctx_r1.revendeursFiltres().length > 1 ? "s" : "", " trouv\xE9", ctx_r1.revendeursFiltres().length > 1 ? "s" : "", " ");
  }
}
function RevendeurListComponent_For_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-revendeur-card", 20);
    \u0275\u0275listener("selectionne", function RevendeurListComponent_For_32_Template_app_revendeur_card_selectionne_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.revendeurSelectionne.emit($event));
    })("commander", function RevendeurListComponent_For_32_Template_app_revendeur_card_commander_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.commanderRevendeur.emit($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const revendeur_r5 = ctx.$implicit;
    \u0275\u0275property("revendeur", revendeur_r5);
  }
}
function RevendeurListComponent_ForEmpty_33_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "mat-icon");
    \u0275\u0275text(2, "search_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Aucun revendeur trouv\xE9 avec ces crit\xE8res.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 22);
    \u0275\u0275listener("click", function RevendeurListComponent_ForEmpty_33_Conditional_0_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.reinitialiserFiltres());
    });
    \u0275\u0275text(6, " R\xE9initialiser les filtres ");
    \u0275\u0275elementEnd()();
  }
}
function RevendeurListComponent_ForEmpty_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, RevendeurListComponent_ForEmpty_33_Conditional_0_Template, 7, 0, "div", 21);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(!ctx_r1.revendeurService.chargement() ? 0 : -1);
  }
}
var RevendeurListComponent = class _RevendeurListComponent {
  constructor() {
    this.carteVisible = false;
    this.toggleCarte = new EventEmitter();
    this.revendeurSelectionne = new EventEmitter();
    this.commanderRevendeur = new EventEmitter();
    this.revendeurService = inject(RevendeurService);
    this.geoService = inject(GeolocationService);
    this.snackBar = inject(MatSnackBar);
    this.texteRecherche = signal("");
    this.filtreStock = signal(null);
    this.chargementGeo = signal(false);
    this.StockStatus = StockStatus;
    this.revendeursFiltres = computed(() => {
      const revendeurs = this.revendeurService.revendeurs();
      const recherche = this.texteRecherche().toLowerCase().trim();
      const filtre = this.filtreStock();
      return revendeurs.filter((r) => {
        const correspondRecherche = !recherche || (r.nom.toLowerCase().includes(recherche) || r.quartier.toLowerCase().includes(recherche) || (r.adresse?.toLowerCase().includes(recherche) ?? false) || r.marques.some((m) => m.toLowerCase().includes(recherche)));
        const correspondStock = !filtre || r.stockStatus === filtre;
        return correspondRecherche && correspondStock;
      });
    });
  }
  /** Lance une recherche géolocalisée. */
  rechercherPresDeChezMoi() {
    this.chargementGeo.set(true);
    this.geoService.getCurrentPosition().subscribe({
      next: (position) => {
        const { latitude, longitude } = position.coords;
        this.revendeurService.getNearby(latitude, longitude, 5e3);
        this.chargementGeo.set(false);
        this.snackBar.open("Revendeurs proches trouv\xE9s", "OK", { duration: 3e3 });
      },
      error: (message) => {
        this.chargementGeo.set(false);
        this.snackBar.open(message, "Fermer", {
          duration: 5e3,
          panelClass: ["snack-error"]
        });
      }
    });
  }
  /** Réinitialise tous les filtres. */
  reinitialiserFiltres() {
    this.texteRecherche.set("");
    this.filtreStock.set(null);
  }
  static {
    this.\u0275fac = function RevendeurListComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _RevendeurListComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RevendeurListComponent, selectors: [["app-revendeur-list"]], inputs: { carteVisible: "carteVisible" }, outputs: { toggleCarte: "toggleCarte", revendeurSelectionne: "revendeurSelectionne", commanderRevendeur: "commanderRevendeur" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 34, vars: 15, consts: [[1, "liste-container"], [1, "barre-recherche"], ["appearance", "outline", 1, "champ-recherche"], ["matPrefix", ""], ["matInput", "", "placeholder", "Rechercher par nom, quartier...", 3, "ngModelChange", "ngModel"], ["matSuffix", "", "mat-icon-button", ""], ["mat-raised-button", "", 1, "btn-pres-de-moi", 3, "click", "disabled"], [1, "btn-inner"], ["diameter", "18"], ["mat-stroked-button", "", 1, "btn-toggle-carte", 3, "click"], [1, "filtres"], [1, "toggle-stock", 3, "change", "value"], [3, "value"], [1, "chargement"], [1, "erreur-message"], [1, "compteur"], [1, "liste-cartes"], [3, "revendeur"], ["matSuffix", "", "mat-icon-button", "", 3, "click"], ["diameter", "36"], [3, "selectionne", "commander", "revendeur"], [1, "aucun-resultat"], ["mat-stroked-button", "", 3, "click"]], template: function RevendeurListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "mat-form-field", 2)(3, "mat-icon", 3);
        \u0275\u0275text(4, "search");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "input", 4);
        \u0275\u0275listener("ngModelChange", function RevendeurListComponent_Template_input_ngModelChange_5_listener($event) {
          return ctx.texteRecherche.set($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(6, RevendeurListComponent_Conditional_6_Template, 3, 0, "button", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "button", 6);
        \u0275\u0275listener("click", function RevendeurListComponent_Template_button_click_7_listener() {
          return ctx.rechercherPresDeChezMoi();
        });
        \u0275\u0275elementStart(8, "span", 7);
        \u0275\u0275template(9, RevendeurListComponent_Conditional_9_Template, 1, 0, "mat-spinner", 8)(10, RevendeurListComponent_Conditional_10_Template, 2, 0, "mat-icon");
        \u0275\u0275text(11, " Pr\xE8s de moi ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(12, "button", 9);
        \u0275\u0275listener("click", function RevendeurListComponent_Template_button_click_12_listener() {
          return ctx.toggleCarte.emit();
        });
        \u0275\u0275elementStart(13, "span", 7)(14, "mat-icon");
        \u0275\u0275text(15);
        \u0275\u0275elementEnd();
        \u0275\u0275text(16);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(17, "div", 10)(18, "mat-button-toggle-group", 11);
        \u0275\u0275listener("change", function RevendeurListComponent_Template_mat_button_toggle_group_change_18_listener($event) {
          return ctx.filtreStock.set($event.value);
        });
        \u0275\u0275elementStart(19, "mat-button-toggle", 12);
        \u0275\u0275text(20, "Tous");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "mat-button-toggle", 12);
        \u0275\u0275text(22, "En stock");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "mat-button-toggle", 12);
        \u0275\u0275text(24, "Stock faible");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "mat-button-toggle", 12);
        \u0275\u0275text(26, "\xC9puis\xE9");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(27, RevendeurListComponent_Conditional_27_Template, 4, 0, "div", 13)(28, RevendeurListComponent_Conditional_28_Template, 4, 1, "div", 14)(29, RevendeurListComponent_Conditional_29_Template, 2, 3, "p", 15);
        \u0275\u0275elementStart(30, "div", 16);
        \u0275\u0275repeaterCreate(31, RevendeurListComponent_For_32_Template, 1, 1, "app-revendeur-card", 17, _forTrack02, false, RevendeurListComponent_ForEmpty_33_Template, 1, 1);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275property("ngModel", ctx.texteRecherche());
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.texteRecherche() ? 6 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.chargementGeo());
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.chargementGeo() ? 9 : 10);
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate(ctx.carteVisible ? "close" : "map");
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.carteVisible ? "Fermer" : "Carte", " ");
        \u0275\u0275advance(2);
        \u0275\u0275property("value", ctx.filtreStock());
        \u0275\u0275advance();
        \u0275\u0275property("value", null);
        \u0275\u0275advance(2);
        \u0275\u0275property("value", ctx.StockStatus.EN_STOCK);
        \u0275\u0275advance(2);
        \u0275\u0275property("value", ctx.StockStatus.STOCK_FAIBLE);
        \u0275\u0275advance(2);
        \u0275\u0275property("value", ctx.StockStatus.EPUISE);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.revendeurService.chargement() ? 27 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.revendeurService.erreur() ? 28 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.revendeurService.chargement() && ctx.revendeursFiltres().length > 0 ? 29 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.revendeursFiltres());
      }
    }, dependencies: [
      CommonModule,
      FormsModule,
      DefaultValueAccessor,
      NgControlStatus,
      NgModel,
      MatFormFieldModule,
      MatFormField,
      MatPrefix,
      MatSuffix,
      MatInputModule,
      MatInput,
      MatIconModule,
      MatIcon,
      MatButtonModule,
      MatButton,
      MatIconButton,
      MatProgressSpinnerModule,
      MatProgressSpinner,
      MatButtonToggleModule,
      MatButtonToggleGroup,
      MatButtonToggle,
      MatSnackBarModule,
      RevendeurCardComponent
    ], styles: ['\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  min-height: 0;\n  overflow: hidden;\n}\n.liste-container[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  background-color: var(--color-surface);\n}\n.barre-recherche[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  padding: 12px 12px 0;\n  background-color: var(--color-surface);\n  border-bottom: 1px solid var(--color-border);\n}\n.champ-recherche[_ngcontent-%COMP%] {\n  flex: 1;\n  ::ng-deep .mat-mdc-form-field-subscript-wrapper {\n    display: none;\n  }\n  ::ng-deep .mat-mdc-form-field-infix {\n    min-height: 44px;\n    padding-top: 10px !important;\n    padding-bottom: 10px !important;\n  }\n  ::ng-deep .mdc-notched-outline__leading,\n  ::ng-deep .mdc-notched-outline__notch,\n  ::ng-deep .mdc-notched-outline__trailing {\n    border-color: var(--color-border);\n  }\n  ::ng-deep input {\n    color: var(--color-text);\n    font-family: "Montserrat", sans-serif;\n    font-size: 0.875rem;\n  }\n  ::ng-deep .mat-mdc-form-field-label {\n    color: var(--color-text-muted);\n  }\n}\n.btn-pres-de-moi[_ngcontent-%COMP%] {\n  background-color: var(--color-primary) !important;\n  color: white !important;\n  border: none !important;\n  border-radius: var(--radius-sm) !important;\n  white-space: nowrap;\n  height: 44px;\n  min-width: fit-content;\n  font-family: "Montserrat", sans-serif !important;\n  font-weight: 600 !important;\n  font-size: 0.8rem !important;\n  margin-bottom: 12px;\n  &:hover {\n    background-color: var(--color-primary-dark) !important;\n  }\n}\n.btn-toggle-carte[_ngcontent-%COMP%] {\n  border-color: var(--color-primary) !important;\n  color: var(--color-primary) !important;\n  border-radius: var(--radius-sm) !important;\n  white-space: nowrap;\n  height: 44px;\n  min-width: fit-content;\n  font-family: "Montserrat", sans-serif !important;\n  font-weight: 600 !important;\n  font-size: 0.8rem !important;\n  margin-bottom: 12px;\n  &:hover {\n    background-color: var(--color-primary-light) !important;\n  }\n}\n.filtres[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  overflow-x: auto;\n  border-bottom: 1px solid var(--color-border);\n}\n.toggle-stock[_ngcontent-%COMP%] {\n  ::ng-deep .mat-button-toggle {\n    background-color: var(--color-surface) !important;\n    color: var(--color-text-muted) !important;\n    border-color: var(--color-border) !important;\n    font-size: 0.78rem;\n  }\n  ::ng-deep .mat-button-toggle-checked {\n    background-color: var(--color-primary) !important;\n    color: white !important;\n  }\n}\n.chargement[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  padding: 40px 0;\n  color: var(--color-text-muted);\n}\n.erreur-message[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 16px;\n  background-color: var(--color-danger-bg);\n  color: var(--color-danger);\n  margin: 8px 12px;\n  font-size: 0.85rem;\n  border-left: 3px solid var(--color-danger);\n}\n.compteur[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: var(--color-text-muted);\n  padding: 6px 16px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  background-color: var(--color-surface-2);\n  border-bottom: 1px solid var(--color-border);\n}\n.liste-cartes[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 12px;\n  background-color: var(--color-bg);\n}\n.aucun-resultat[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  padding: 48px 16px;\n  color: var(--color-text-muted);\n  text-align: center;\n  mat-icon {\n    font-size: 3rem;\n    height: 3rem;\n    width: 3rem;\n    color: var(--color-surface-3);\n  }\n  button {\n    border-color: var(--color-primary) !important;\n    color: var(--color-primary) !important;\n  }\n}\n/*# sourceMappingURL=revendeur-list.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RevendeurListComponent, { className: "RevendeurListComponent", filePath: "src/app/features/revendeur/revendeur-list/revendeur-list.component.ts", lineNumber: 327 });
})();

// node_modules/@angular/material/fesm2022/radio.mjs
var _c03 = ["input"];
var _c12 = ["formField"];
var _c2 = ["*"];
var nextUniqueId = 0;
var MatRadioChange = class {
  constructor(source, value) {
    this.source = source;
    this.value = value;
  }
};
var MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MatRadioGroup),
  multi: true
};
var MAT_RADIO_GROUP = new InjectionToken("MatRadioGroup");
var MAT_RADIO_DEFAULT_OPTIONS = new InjectionToken("mat-radio-default-options", {
  providedIn: "root",
  factory: MAT_RADIO_DEFAULT_OPTIONS_FACTORY
});
function MAT_RADIO_DEFAULT_OPTIONS_FACTORY() {
  return {
    color: "accent",
    disabledInteractive: false
  };
}
var MatRadioGroup = class _MatRadioGroup {
  /** Name of the radio button group. All radio buttons inside this group will use this name. */
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
    this._updateRadioButtonNames();
  }
  /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
  get labelPosition() {
    return this._labelPosition;
  }
  set labelPosition(v) {
    this._labelPosition = v === "before" ? "before" : "after";
    this._markRadiosForCheck();
  }
  /**
   * Value for the radio-group. Should equal the value of the selected radio button if there is
   * a corresponding radio button with a matching value. If there is not such a corresponding
   * radio button, this value persists to be applied in case a new radio button is added with a
   * matching value.
   */
  get value() {
    return this._value;
  }
  set value(newValue) {
    if (this._value !== newValue) {
      this._value = newValue;
      this._updateSelectedRadioFromValue();
      this._checkSelectedRadioButton();
    }
  }
  _checkSelectedRadioButton() {
    if (this._selected && !this._selected.checked) {
      this._selected.checked = true;
    }
  }
  /**
   * The currently selected radio button. If set to a new radio button, the radio group value
   * will be updated to match the new selected button.
   */
  get selected() {
    return this._selected;
  }
  set selected(selected) {
    this._selected = selected;
    this.value = selected ? selected.value : null;
    this._checkSelectedRadioButton();
  }
  /** Whether the radio group is disabled */
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = value;
    this._markRadiosForCheck();
  }
  /** Whether the radio group is required */
  get required() {
    return this._required;
  }
  set required(value) {
    this._required = value;
    this._markRadiosForCheck();
  }
  /** Whether buttons in the group should be interactive while they're disabled. */
  get disabledInteractive() {
    return this._disabledInteractive;
  }
  set disabledInteractive(value) {
    this._disabledInteractive = value;
    this._markRadiosForCheck();
  }
  constructor(_changeDetector) {
    this._changeDetector = _changeDetector;
    this._value = null;
    this._name = `mat-radio-group-${nextUniqueId++}`;
    this._selected = null;
    this._isInitialized = false;
    this._labelPosition = "after";
    this._disabled = false;
    this._required = false;
    this._controlValueAccessorChangeFn = () => {
    };
    this.onTouched = () => {
    };
    this.change = new EventEmitter();
    this._disabledInteractive = false;
  }
  /**
   * Initialize properties once content children are available.
   * This allows us to propagate relevant attributes to associated buttons.
   */
  ngAfterContentInit() {
    this._isInitialized = true;
    this._buttonChanges = this._radios.changes.subscribe(() => {
      if (this.selected && !this._radios.find((radio) => radio === this.selected)) {
        this._selected = null;
      }
    });
  }
  ngOnDestroy() {
    this._buttonChanges?.unsubscribe();
  }
  /**
   * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
   * radio buttons upon their blur.
   */
  _touch() {
    if (this.onTouched) {
      this.onTouched();
    }
  }
  _updateRadioButtonNames() {
    if (this._radios) {
      this._radios.forEach((radio) => {
        radio.name = this.name;
        radio._markForCheck();
      });
    }
  }
  /** Updates the `selected` radio button from the internal _value state. */
  _updateSelectedRadioFromValue() {
    const isAlreadySelected = this._selected !== null && this._selected.value === this._value;
    if (this._radios && !isAlreadySelected) {
      this._selected = null;
      this._radios.forEach((radio) => {
        radio.checked = this.value === radio.value;
        if (radio.checked) {
          this._selected = radio;
        }
      });
    }
  }
  /** Dispatch change event with current selection and group value. */
  _emitChangeEvent() {
    if (this._isInitialized) {
      this.change.emit(new MatRadioChange(this._selected, this._value));
    }
  }
  _markRadiosForCheck() {
    if (this._radios) {
      this._radios.forEach((radio) => radio._markForCheck());
    }
  }
  /**
   * Sets the model value. Implemented as part of ControlValueAccessor.
   * @param value
   */
  writeValue(value) {
    this.value = value;
    this._changeDetector.markForCheck();
  }
  /**
   * Registers a callback to be triggered when the model value changes.
   * Implemented as part of ControlValueAccessor.
   * @param fn Callback to be registered.
   */
  registerOnChange(fn) {
    this._controlValueAccessorChangeFn = fn;
  }
  /**
   * Registers a callback to be triggered when the control is touched.
   * Implemented as part of ControlValueAccessor.
   * @param fn Callback to be registered.
   */
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  /**
   * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
   * @param isDisabled Whether the control should be disabled.
   */
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
    this._changeDetector.markForCheck();
  }
  static {
    this.\u0275fac = function MatRadioGroup_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatRadioGroup)(\u0275\u0275directiveInject(ChangeDetectorRef));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatRadioGroup,
      selectors: [["mat-radio-group"]],
      contentQueries: function MatRadioGroup_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuery(dirIndex, MatRadioButton, 5);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._radios = _t);
        }
      },
      hostAttrs: ["role", "radiogroup", 1, "mat-mdc-radio-group"],
      inputs: {
        color: "color",
        name: "name",
        labelPosition: "labelPosition",
        value: "value",
        selected: "selected",
        disabled: [2, "disabled", "disabled", booleanAttribute],
        required: [2, "required", "required", booleanAttribute],
        disabledInteractive: [2, "disabledInteractive", "disabledInteractive", booleanAttribute]
      },
      outputs: {
        change: "change"
      },
      exportAs: ["matRadioGroup"],
      standalone: true,
      features: [\u0275\u0275ProvidersFeature([MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR, {
        provide: MAT_RADIO_GROUP,
        useExisting: _MatRadioGroup
      }]), \u0275\u0275InputTransformsFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatRadioGroup, [{
    type: Directive,
    args: [{
      selector: "mat-radio-group",
      exportAs: "matRadioGroup",
      providers: [MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR, {
        provide: MAT_RADIO_GROUP,
        useExisting: MatRadioGroup
      }],
      host: {
        "role": "radiogroup",
        "class": "mat-mdc-radio-group"
      },
      standalone: true
    }]
  }], () => [{
    type: ChangeDetectorRef
  }], {
    change: [{
      type: Output
    }],
    _radios: [{
      type: ContentChildren,
      args: [forwardRef(() => MatRadioButton), {
        descendants: true
      }]
    }],
    color: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    labelPosition: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    selected: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    required: [{
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
    }]
  });
})();
var MatRadioButton = class _MatRadioButton {
  /** Whether this radio button is checked. */
  get checked() {
    return this._checked;
  }
  set checked(value) {
    if (this._checked !== value) {
      this._checked = value;
      if (value && this.radioGroup && this.radioGroup.value !== this.value) {
        this.radioGroup.selected = this;
      } else if (!value && this.radioGroup && this.radioGroup.value === this.value) {
        this.radioGroup.selected = null;
      }
      if (value) {
        this._radioDispatcher.notify(this.id, this.name);
      }
      this._changeDetector.markForCheck();
    }
  }
  /** The value of this radio button. */
  get value() {
    return this._value;
  }
  set value(value) {
    if (this._value !== value) {
      this._value = value;
      if (this.radioGroup !== null) {
        if (!this.checked) {
          this.checked = this.radioGroup.value === value;
        }
        if (this.checked) {
          this.radioGroup.selected = this;
        }
      }
    }
  }
  /** Whether the label should appear after or before the radio button. Defaults to 'after' */
  get labelPosition() {
    return this._labelPosition || this.radioGroup && this.radioGroup.labelPosition || "after";
  }
  set labelPosition(value) {
    this._labelPosition = value;
  }
  /** Whether the radio button is disabled. */
  get disabled() {
    return this._disabled || this.radioGroup !== null && this.radioGroup.disabled;
  }
  set disabled(value) {
    this._setDisabled(value);
  }
  /** Whether the radio button is required. */
  get required() {
    return this._required || this.radioGroup && this.radioGroup.required;
  }
  set required(value) {
    this._required = value;
  }
  /**
   * Theme color of the radio button. This API is supported in M2 themes only, it
   * has no effect in M3 themes.
   *
   * For information on applying color variants in M3, see
   * https://material.angular.io/guide/theming#using-component-color-variants.
   */
  get color() {
    return this._color || this.radioGroup && this.radioGroup.color || this._defaultOptions && this._defaultOptions.color || "accent";
  }
  set color(newValue) {
    this._color = newValue;
  }
  /** Whether the radio button should remain interactive when it is disabled. */
  get disabledInteractive() {
    return this._disabledInteractive || this.radioGroup !== null && this.radioGroup.disabledInteractive;
  }
  set disabledInteractive(value) {
    this._disabledInteractive = value;
  }
  /** ID of the native input element inside `<mat-radio-button>` */
  get inputId() {
    return `${this.id || this._uniqueId}-input`;
  }
  constructor(radioGroup, _elementRef, _changeDetector, _focusMonitor, _radioDispatcher, animationMode, _defaultOptions, tabIndex) {
    this._elementRef = _elementRef;
    this._changeDetector = _changeDetector;
    this._focusMonitor = _focusMonitor;
    this._radioDispatcher = _radioDispatcher;
    this._defaultOptions = _defaultOptions;
    this._ngZone = inject(NgZone);
    this._uniqueId = `mat-radio-${++nextUniqueId}`;
    this.id = this._uniqueId;
    this.disableRipple = false;
    this.tabIndex = 0;
    this.change = new EventEmitter();
    this._checked = false;
    this._value = null;
    this._removeUniqueSelectionListener = () => {
    };
    this._injector = inject(Injector);
    this._onInputClick = (event) => {
      if (this.disabled && this.disabledInteractive) {
        event.preventDefault();
      }
    };
    this.radioGroup = radioGroup;
    this._noopAnimations = animationMode === "NoopAnimations";
    this._disabledInteractive = _defaultOptions?.disabledInteractive ?? false;
    if (tabIndex) {
      this.tabIndex = numberAttribute(tabIndex, 0);
    }
  }
  /** Focuses the radio button. */
  focus(options, origin) {
    if (origin) {
      this._focusMonitor.focusVia(this._inputElement, origin, options);
    } else {
      this._inputElement.nativeElement.focus(options);
    }
  }
  /**
   * Marks the radio button as needing checking for change detection.
   * This method is exposed because the parent radio group will directly
   * update bound properties of the radio button.
   */
  _markForCheck() {
    this._changeDetector.markForCheck();
  }
  ngOnInit() {
    if (this.radioGroup) {
      this.checked = this.radioGroup.value === this._value;
      if (this.checked) {
        this.radioGroup.selected = this;
      }
      this.name = this.radioGroup.name;
    }
    this._removeUniqueSelectionListener = this._radioDispatcher.listen((id, name) => {
      if (id !== this.id && name === this.name) {
        this.checked = false;
      }
    });
  }
  ngDoCheck() {
    this._updateTabIndex();
  }
  ngAfterViewInit() {
    this._updateTabIndex();
    this._focusMonitor.monitor(this._elementRef, true).subscribe((focusOrigin) => {
      if (!focusOrigin && this.radioGroup) {
        this.radioGroup._touch();
      }
    });
    this._ngZone.runOutsideAngular(() => {
      this._inputElement.nativeElement.addEventListener("click", this._onInputClick);
    });
  }
  ngOnDestroy() {
    this._inputElement?.nativeElement.removeEventListener("click", this._onInputClick);
    this._focusMonitor.stopMonitoring(this._elementRef);
    this._removeUniqueSelectionListener();
  }
  /** Dispatch change event with current value. */
  _emitChangeEvent() {
    this.change.emit(new MatRadioChange(this, this._value));
  }
  _isRippleDisabled() {
    return this.disableRipple || this.disabled;
  }
  /** Triggered when the radio button receives an interaction from the user. */
  _onInputInteraction(event) {
    event.stopPropagation();
    if (!this.checked && !this.disabled) {
      const groupValueChanged = this.radioGroup && this.value !== this.radioGroup.value;
      this.checked = true;
      this._emitChangeEvent();
      if (this.radioGroup) {
        this.radioGroup._controlValueAccessorChangeFn(this.value);
        if (groupValueChanged) {
          this.radioGroup._emitChangeEvent();
        }
      }
    }
  }
  /** Triggered when the user clicks on the touch target. */
  _onTouchTargetClick(event) {
    this._onInputInteraction(event);
    if (!this.disabled || this.disabledInteractive) {
      this._inputElement?.nativeElement.focus();
    }
  }
  /** Sets the disabled state and marks for check if a change occurred. */
  _setDisabled(value) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._changeDetector.markForCheck();
    }
  }
  /** Gets the tabindex for the underlying input element. */
  _updateTabIndex() {
    const group = this.radioGroup;
    let value;
    if (!group || !group.selected || this.disabled) {
      value = this.tabIndex;
    } else {
      value = group.selected === this ? this.tabIndex : -1;
    }
    if (value !== this._previousTabIndex) {
      const input = this._inputElement?.nativeElement;
      if (input) {
        input.setAttribute("tabindex", value + "");
        this._previousTabIndex = value;
        afterNextRender(() => {
          queueMicrotask(() => {
            if (group && group.selected && group.selected !== this && document.activeElement === input) {
              group.selected?._inputElement.nativeElement.focus();
              if (document.activeElement === input) {
                this._inputElement.nativeElement.blur();
              }
            }
          });
        }, {
          injector: this._injector
        });
      }
    }
  }
  static {
    this.\u0275fac = function MatRadioButton_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatRadioButton)(\u0275\u0275directiveInject(MAT_RADIO_GROUP, 8), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(FocusMonitor), \u0275\u0275directiveInject(UniqueSelectionDispatcher), \u0275\u0275directiveInject(ANIMATION_MODULE_TYPE, 8), \u0275\u0275directiveInject(MAT_RADIO_DEFAULT_OPTIONS, 8), \u0275\u0275injectAttribute("tabindex"));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatRadioButton,
      selectors: [["mat-radio-button"]],
      viewQuery: function MatRadioButton_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuery(_c03, 5);
          \u0275\u0275viewQuery(_c12, 7, ElementRef);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._inputElement = _t.first);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._rippleTrigger = _t.first);
        }
      },
      hostAttrs: [1, "mat-mdc-radio-button"],
      hostVars: 19,
      hostBindings: function MatRadioButton_HostBindings(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275listener("focus", function MatRadioButton_focus_HostBindingHandler() {
            return ctx._inputElement.nativeElement.focus();
          });
        }
        if (rf & 2) {
          \u0275\u0275attribute("id", ctx.id)("tabindex", null)("aria-label", null)("aria-labelledby", null)("aria-describedby", null);
          \u0275\u0275classProp("mat-primary", ctx.color === "primary")("mat-accent", ctx.color === "accent")("mat-warn", ctx.color === "warn")("mat-mdc-radio-checked", ctx.checked)("mat-mdc-radio-disabled", ctx.disabled)("mat-mdc-radio-disabled-interactive", ctx.disabledInteractive)("_mat-animation-noopable", ctx._noopAnimations);
        }
      },
      inputs: {
        id: "id",
        name: "name",
        ariaLabel: [0, "aria-label", "ariaLabel"],
        ariaLabelledby: [0, "aria-labelledby", "ariaLabelledby"],
        ariaDescribedby: [0, "aria-describedby", "ariaDescribedby"],
        disableRipple: [2, "disableRipple", "disableRipple", booleanAttribute],
        tabIndex: [2, "tabIndex", "tabIndex", (value) => value == null ? 0 : numberAttribute(value)],
        checked: [2, "checked", "checked", booleanAttribute],
        value: "value",
        labelPosition: "labelPosition",
        disabled: [2, "disabled", "disabled", booleanAttribute],
        required: [2, "required", "required", booleanAttribute],
        color: "color",
        disabledInteractive: [2, "disabledInteractive", "disabledInteractive", booleanAttribute]
      },
      outputs: {
        change: "change"
      },
      exportAs: ["matRadioButton"],
      standalone: true,
      features: [\u0275\u0275InputTransformsFeature, \u0275\u0275StandaloneFeature],
      ngContentSelectors: _c2,
      decls: 13,
      vars: 17,
      consts: [["formField", ""], ["input", ""], ["mat-internal-form-field", "", 3, "labelPosition"], [1, "mdc-radio"], [1, "mat-mdc-radio-touch-target", 3, "click"], ["type", "radio", 1, "mdc-radio__native-control", 3, "change", "id", "checked", "disabled", "required"], [1, "mdc-radio__background"], [1, "mdc-radio__outer-circle"], [1, "mdc-radio__inner-circle"], ["mat-ripple", "", 1, "mat-radio-ripple", "mat-mdc-focus-indicator", 3, "matRippleTrigger", "matRippleDisabled", "matRippleCentered"], [1, "mat-ripple-element", "mat-radio-persistent-ripple"], [1, "mdc-label", 3, "for"]],
      template: function MatRadioButton_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = \u0275\u0275getCurrentView();
          \u0275\u0275projectionDef();
          \u0275\u0275elementStart(0, "div", 2, 0)(2, "div", 3)(3, "div", 4);
          \u0275\u0275listener("click", function MatRadioButton_Template_div_click_3_listener($event) {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._onTouchTargetClick($event));
          });
          \u0275\u0275elementEnd();
          \u0275\u0275elementStart(4, "input", 5, 1);
          \u0275\u0275listener("change", function MatRadioButton_Template_input_change_4_listener($event) {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._onInputInteraction($event));
          });
          \u0275\u0275elementEnd();
          \u0275\u0275elementStart(6, "div", 6);
          \u0275\u0275element(7, "div", 7)(8, "div", 8);
          \u0275\u0275elementEnd();
          \u0275\u0275elementStart(9, "div", 9);
          \u0275\u0275element(10, "div", 10);
          \u0275\u0275elementEnd()();
          \u0275\u0275elementStart(11, "label", 11);
          \u0275\u0275projection(12);
          \u0275\u0275elementEnd()();
        }
        if (rf & 2) {
          \u0275\u0275property("labelPosition", ctx.labelPosition);
          \u0275\u0275advance(2);
          \u0275\u0275classProp("mdc-radio--disabled", ctx.disabled);
          \u0275\u0275advance(2);
          \u0275\u0275property("id", ctx.inputId)("checked", ctx.checked)("disabled", ctx.disabled && !ctx.disabledInteractive)("required", ctx.required);
          \u0275\u0275attribute("name", ctx.name)("value", ctx.value)("aria-label", ctx.ariaLabel)("aria-labelledby", ctx.ariaLabelledby)("aria-describedby", ctx.ariaDescribedby)("aria-disabled", ctx.disabled && ctx.disabledInteractive ? "true" : null);
          \u0275\u0275advance(5);
          \u0275\u0275property("matRippleTrigger", ctx._rippleTrigger.nativeElement)("matRippleDisabled", ctx._isRippleDisabled())("matRippleCentered", true);
          \u0275\u0275advance(2);
          \u0275\u0275property("for", ctx.inputId);
        }
      },
      dependencies: [MatRipple, _MatInternalFormField],
      styles: ['.mat-mdc-radio-button{-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-radio-button .mdc-radio{display:inline-block;position:relative;flex:0 0 auto;box-sizing:content-box;width:20px;height:20px;cursor:pointer;will-change:opacity,transform,border-color,color;padding:calc((var(--mdc-radio-state-layer-size) - 20px)/2)}.mat-mdc-radio-button .mdc-radio:hover .mdc-radio__native-control:not([disabled]):not(:focus)~.mdc-radio__background::before{opacity:.04;transform:scale(1)}.mat-mdc-radio-button .mdc-radio:hover .mdc-radio__native-control:not([disabled])~.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-unselected-hover-icon-color, var(--mat-app-on-surface))}.mat-mdc-radio-button .mdc-radio:hover .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio:hover .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-selected-hover-icon-color, var(--mat-app-primary))}.mat-mdc-radio-button .mdc-radio:active .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-unselected-pressed-icon-color, var(--mat-app-on-surface))}.mat-mdc-radio-button .mdc-radio:active .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio:active .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-selected-pressed-icon-color, var(--mat-app-primary))}.mat-mdc-radio-button .mdc-radio__background{display:inline-block;position:relative;box-sizing:border-box;width:20px;height:20px}.mat-mdc-radio-button .mdc-radio__background::before{position:absolute;transform:scale(0, 0);border-radius:50%;opacity:0;pointer-events:none;content:"";transition:opacity 90ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms cubic-bezier(0.4, 0, 0.6, 1);width:var(--mdc-radio-state-layer-size);height:var(--mdc-radio-state-layer-size);top:calc(-1*(var(--mdc-radio-state-layer-size) - 20px)/2);left:calc(-1*(var(--mdc-radio-state-layer-size) - 20px)/2)}.mat-mdc-radio-button .mdc-radio__outer-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;border-width:2px;border-style:solid;border-radius:50%;transition:border-color 90ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-radio-button .mdc-radio__inner-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;transform:scale(0, 0);border-width:10px;border-style:solid;border-radius:50%;transition:transform 90ms cubic-bezier(0.4, 0, 0.6, 1),border-color 90ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-radio-button .mdc-radio__native-control{position:absolute;margin:0;padding:0;opacity:0;top:0;right:0;left:0;cursor:inherit;z-index:1;width:var(--mdc-radio-state-layer-size);height:var(--mdc-radio-state-layer-size)}.mat-mdc-radio-button .mdc-radio__native-control:checked+.mdc-radio__background,.mat-mdc-radio-button .mdc-radio__native-control:disabled+.mdc-radio__background{transition:opacity 90ms cubic-bezier(0, 0, 0.2, 1),transform 90ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-radio-button .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__outer-circle{transition:border-color 90ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-radio-button .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-radio-button .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{transition:transform 90ms cubic-bezier(0, 0, 0.2, 1),border-color 90ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-radio-button .mdc-radio__native-control:focus+.mdc-radio__background::before{transform:scale(1);opacity:.12;transition:opacity 90ms cubic-bezier(0, 0, 0.2, 1),transform 90ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-radio-button .mdc-radio__native-control:disabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-disabled-unselected-icon-color, var(--mat-app-on-surface));opacity:var(--mdc-radio-disabled-unselected-icon-opacity)}.mat-mdc-radio-button .mdc-radio__native-control:disabled+.mdc-radio__background{cursor:default}.mat-mdc-radio-button .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-radio-button .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-disabled-selected-icon-color, var(--mat-app-on-surface));opacity:var(--mdc-radio-disabled-selected-icon-opacity)}.mat-mdc-radio-button .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-unselected-icon-color, var(--mat-app-on-surface-variant))}.mat-mdc-radio-button .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-selected-icon-color, var(--mat-app-primary))}.mat-mdc-radio-button .mdc-radio__native-control:enabled:focus:checked+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-radio-button .mdc-radio__native-control:enabled:focus:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-selected-focus-icon-color, var(--mat-app-primary))}.mat-mdc-radio-button .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle{transform:scale(0.5);transition:transform 90ms cubic-bezier(0, 0, 0.2, 1),border-color 90ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled{pointer-events:auto}.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__native-control:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-disabled-unselected-icon-color, var(--mat-app-on-surface));opacity:var(--mdc-radio-disabled-unselected-icon-opacity)}.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled:hover .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled:hover .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__native-control:checked:focus+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__native-control:checked:focus+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__native-control+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__native-control+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-disabled-selected-icon-color, var(--mat-app-on-surface));opacity:var(--mdc-radio-disabled-selected-icon-opacity)}.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__background::before,.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__outer-circle,.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__inner-circle{transition:none !important}.mat-mdc-radio-button .mdc-radio__background::before{background-color:var(--mat-radio-ripple-color, var(--mat-app-on-surface))}.mat-mdc-radio-button.mat-mdc-radio-checked .mat-ripple-element,.mat-mdc-radio-button.mat-mdc-radio-checked .mdc-radio__background::before{background-color:var(--mat-radio-checked-ripple-color, var(--mat-app-primary))}.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mat-ripple-element,.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__background::before{background-color:var(--mat-radio-ripple-color, var(--mat-app-on-surface))}.mat-mdc-radio-button .mat-internal-form-field{color:var(--mat-radio-label-text-color, var(--mat-app-on-surface));font-family:var(--mat-radio-label-text-font, var(--mat-app-body-medium-font));line-height:var(--mat-radio-label-text-line-height, var(--mat-app-body-medium-line-height));font-size:var(--mat-radio-label-text-size, var(--mat-app-body-medium-size));letter-spacing:var(--mat-radio-label-text-tracking, var(--mat-app-body-medium-tracking));font-weight:var(--mat-radio-label-text-weight, var(--mat-app-body-medium-weight))}.mat-mdc-radio-button .mdc-radio--disabled+label{color:var(--mat-radio-disabled-label-color)}.mat-mdc-radio-button .mat-radio-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:50%}.mat-mdc-radio-button .mat-radio-ripple .mat-ripple-element{opacity:.14}.mat-mdc-radio-button .mat-radio-ripple::before{border-radius:50%}.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:focus:enabled:not(:checked)~.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-unselected-focus-icon-color, var(--mat-app-on-surface))}.mat-mdc-radio-button.cdk-focused .mat-mdc-focus-indicator::before{content:""}.mat-mdc-radio-disabled{cursor:default;pointer-events:none}.mat-mdc-radio-disabled.mat-mdc-radio-disabled-interactive{pointer-events:auto}.mat-mdc-radio-touch-target{position:absolute;top:50%;left:50%;height:48px;width:48px;transform:translate(-50%, -50%);display:var(--mat-radio-touch-target-display)}[dir=rtl] .mat-mdc-radio-touch-target{left:auto;right:50%;transform:translate(50%, -50%)}'],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatRadioButton, [{
    type: Component,
    args: [{
      selector: "mat-radio-button",
      host: {
        "class": "mat-mdc-radio-button",
        "[attr.id]": "id",
        "[class.mat-primary]": 'color === "primary"',
        "[class.mat-accent]": 'color === "accent"',
        "[class.mat-warn]": 'color === "warn"',
        "[class.mat-mdc-radio-checked]": "checked",
        "[class.mat-mdc-radio-disabled]": "disabled",
        "[class.mat-mdc-radio-disabled-interactive]": "disabledInteractive",
        "[class._mat-animation-noopable]": "_noopAnimations",
        // Needs to be removed since it causes some a11y issues (see #21266).
        "[attr.tabindex]": "null",
        "[attr.aria-label]": "null",
        "[attr.aria-labelledby]": "null",
        "[attr.aria-describedby]": "null",
        // Note: under normal conditions focus shouldn't land on this element, however it may be
        // programmatically set, for example inside of a focus trap, in this case we want to forward
        // the focus to the native element.
        "(focus)": "_inputElement.nativeElement.focus()"
      },
      exportAs: "matRadioButton",
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [MatRipple, _MatInternalFormField],
      template: `<div mat-internal-form-field [labelPosition]="labelPosition" #formField>
  <div class="mdc-radio" [class.mdc-radio--disabled]="disabled">
    <!-- Render this element first so the input is on top. -->
    <div class="mat-mdc-radio-touch-target" (click)="_onTouchTargetClick($event)"></div>
    <input #input class="mdc-radio__native-control" type="radio"
           [id]="inputId"
           [checked]="checked"
           [disabled]="disabled && !disabledInteractive"
           [attr.name]="name"
           [attr.value]="value"
           [required]="required"
           [attr.aria-label]="ariaLabel"
           [attr.aria-labelledby]="ariaLabelledby"
           [attr.aria-describedby]="ariaDescribedby"
           [attr.aria-disabled]="disabled && disabledInteractive ? 'true' : null"
           (change)="_onInputInteraction($event)">
    <div class="mdc-radio__background">
      <div class="mdc-radio__outer-circle"></div>
      <div class="mdc-radio__inner-circle"></div>
    </div>
    <div mat-ripple class="mat-radio-ripple mat-mdc-focus-indicator"
         [matRippleTrigger]="_rippleTrigger.nativeElement"
         [matRippleDisabled]="_isRippleDisabled()"
         [matRippleCentered]="true">
      <div class="mat-ripple-element mat-radio-persistent-ripple"></div>
    </div>
  </div>
  <label class="mdc-label" [for]="inputId">
    <ng-content></ng-content>
  </label>
</div>
`,
      styles: ['.mat-mdc-radio-button{-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-radio-button .mdc-radio{display:inline-block;position:relative;flex:0 0 auto;box-sizing:content-box;width:20px;height:20px;cursor:pointer;will-change:opacity,transform,border-color,color;padding:calc((var(--mdc-radio-state-layer-size) - 20px)/2)}.mat-mdc-radio-button .mdc-radio:hover .mdc-radio__native-control:not([disabled]):not(:focus)~.mdc-radio__background::before{opacity:.04;transform:scale(1)}.mat-mdc-radio-button .mdc-radio:hover .mdc-radio__native-control:not([disabled])~.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-unselected-hover-icon-color, var(--mat-app-on-surface))}.mat-mdc-radio-button .mdc-radio:hover .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio:hover .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-selected-hover-icon-color, var(--mat-app-primary))}.mat-mdc-radio-button .mdc-radio:active .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-unselected-pressed-icon-color, var(--mat-app-on-surface))}.mat-mdc-radio-button .mdc-radio:active .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio:active .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-selected-pressed-icon-color, var(--mat-app-primary))}.mat-mdc-radio-button .mdc-radio__background{display:inline-block;position:relative;box-sizing:border-box;width:20px;height:20px}.mat-mdc-radio-button .mdc-radio__background::before{position:absolute;transform:scale(0, 0);border-radius:50%;opacity:0;pointer-events:none;content:"";transition:opacity 90ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms cubic-bezier(0.4, 0, 0.6, 1);width:var(--mdc-radio-state-layer-size);height:var(--mdc-radio-state-layer-size);top:calc(-1*(var(--mdc-radio-state-layer-size) - 20px)/2);left:calc(-1*(var(--mdc-radio-state-layer-size) - 20px)/2)}.mat-mdc-radio-button .mdc-radio__outer-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;border-width:2px;border-style:solid;border-radius:50%;transition:border-color 90ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-radio-button .mdc-radio__inner-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;transform:scale(0, 0);border-width:10px;border-style:solid;border-radius:50%;transition:transform 90ms cubic-bezier(0.4, 0, 0.6, 1),border-color 90ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-radio-button .mdc-radio__native-control{position:absolute;margin:0;padding:0;opacity:0;top:0;right:0;left:0;cursor:inherit;z-index:1;width:var(--mdc-radio-state-layer-size);height:var(--mdc-radio-state-layer-size)}.mat-mdc-radio-button .mdc-radio__native-control:checked+.mdc-radio__background,.mat-mdc-radio-button .mdc-radio__native-control:disabled+.mdc-radio__background{transition:opacity 90ms cubic-bezier(0, 0, 0.2, 1),transform 90ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-radio-button .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__outer-circle{transition:border-color 90ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-radio-button .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-radio-button .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{transition:transform 90ms cubic-bezier(0, 0, 0.2, 1),border-color 90ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-radio-button .mdc-radio__native-control:focus+.mdc-radio__background::before{transform:scale(1);opacity:.12;transition:opacity 90ms cubic-bezier(0, 0, 0.2, 1),transform 90ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-radio-button .mdc-radio__native-control:disabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-disabled-unselected-icon-color, var(--mat-app-on-surface));opacity:var(--mdc-radio-disabled-unselected-icon-opacity)}.mat-mdc-radio-button .mdc-radio__native-control:disabled+.mdc-radio__background{cursor:default}.mat-mdc-radio-button .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-radio-button .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-disabled-selected-icon-color, var(--mat-app-on-surface));opacity:var(--mdc-radio-disabled-selected-icon-opacity)}.mat-mdc-radio-button .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-unselected-icon-color, var(--mat-app-on-surface-variant))}.mat-mdc-radio-button .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-selected-icon-color, var(--mat-app-primary))}.mat-mdc-radio-button .mdc-radio__native-control:enabled:focus:checked+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-radio-button .mdc-radio__native-control:enabled:focus:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-selected-focus-icon-color, var(--mat-app-primary))}.mat-mdc-radio-button .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle{transform:scale(0.5);transition:transform 90ms cubic-bezier(0, 0, 0.2, 1),border-color 90ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled{pointer-events:auto}.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__native-control:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-disabled-unselected-icon-color, var(--mat-app-on-surface));opacity:var(--mdc-radio-disabled-unselected-icon-opacity)}.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled:hover .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled:hover .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__native-control:checked:focus+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__native-control:checked:focus+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__native-control+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__native-control+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-disabled-selected-icon-color, var(--mat-app-on-surface));opacity:var(--mdc-radio-disabled-selected-icon-opacity)}.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__background::before,.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__outer-circle,.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__inner-circle{transition:none !important}.mat-mdc-radio-button .mdc-radio__background::before{background-color:var(--mat-radio-ripple-color, var(--mat-app-on-surface))}.mat-mdc-radio-button.mat-mdc-radio-checked .mat-ripple-element,.mat-mdc-radio-button.mat-mdc-radio-checked .mdc-radio__background::before{background-color:var(--mat-radio-checked-ripple-color, var(--mat-app-primary))}.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mat-ripple-element,.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__background::before{background-color:var(--mat-radio-ripple-color, var(--mat-app-on-surface))}.mat-mdc-radio-button .mat-internal-form-field{color:var(--mat-radio-label-text-color, var(--mat-app-on-surface));font-family:var(--mat-radio-label-text-font, var(--mat-app-body-medium-font));line-height:var(--mat-radio-label-text-line-height, var(--mat-app-body-medium-line-height));font-size:var(--mat-radio-label-text-size, var(--mat-app-body-medium-size));letter-spacing:var(--mat-radio-label-text-tracking, var(--mat-app-body-medium-tracking));font-weight:var(--mat-radio-label-text-weight, var(--mat-app-body-medium-weight))}.mat-mdc-radio-button .mdc-radio--disabled+label{color:var(--mat-radio-disabled-label-color)}.mat-mdc-radio-button .mat-radio-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:50%}.mat-mdc-radio-button .mat-radio-ripple .mat-ripple-element{opacity:.14}.mat-mdc-radio-button .mat-radio-ripple::before{border-radius:50%}.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:focus:enabled:not(:checked)~.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-unselected-focus-icon-color, var(--mat-app-on-surface))}.mat-mdc-radio-button.cdk-focused .mat-mdc-focus-indicator::before{content:""}.mat-mdc-radio-disabled{cursor:default;pointer-events:none}.mat-mdc-radio-disabled.mat-mdc-radio-disabled-interactive{pointer-events:auto}.mat-mdc-radio-touch-target{position:absolute;top:50%;left:50%;height:48px;width:48px;transform:translate(-50%, -50%);display:var(--mat-radio-touch-target-display)}[dir=rtl] .mat-mdc-radio-touch-target{left:auto;right:50%;transform:translate(50%, -50%)}']
    }]
  }], () => [{
    type: MatRadioGroup,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [MAT_RADIO_GROUP]
    }]
  }, {
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }, {
    type: FocusMonitor
  }, {
    type: UniqueSelectionDispatcher
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
      args: [MAT_RADIO_DEFAULT_OPTIONS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Attribute,
      args: ["tabindex"]
    }]
  }], {
    id: [{
      type: Input
    }],
    name: [{
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
    value: [{
      type: Input
    }],
    labelPosition: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
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
    disabledInteractive: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    change: [{
      type: Output
    }],
    _inputElement: [{
      type: ViewChild,
      args: ["input"]
    }],
    _rippleTrigger: [{
      type: ViewChild,
      args: ["formField", {
        read: ElementRef,
        static: true
      }]
    }]
  });
})();
var MatRadioModule = class _MatRadioModule {
  static {
    this.\u0275fac = function MatRadioModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatRadioModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _MatRadioModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
      imports: [MatCommonModule, CommonModule, MatRippleModule, MatRadioButton, MatCommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatRadioModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, CommonModule, MatRippleModule, MatRadioGroup, MatRadioButton],
      exports: [MatCommonModule, MatRadioGroup, MatRadioButton]
    }]
  }], null, null);
})();

// src/app/core/services/commande.service.ts
var CommandeService = class _CommandeService {
  constructor() {
    this.apiUrl = `${environment.apiUrl}/commandes`;
    this.http = inject(HttpClient);
  }
  /** Crée une nouvelle commande. */
  creer(dto) {
    return this.http.post(this.apiUrl, dto).pipe(catchError((err) => {
      const message = err.error?.message || "Erreur lors de la cr\xE9ation de la commande";
      return throwError(() => new Error(message));
    }));
  }
  /** Récupère les commandes d'un revendeur. */
  getByRevendeur(revendeurId) {
    return this.http.get(`${this.apiUrl}/revendeur/${revendeurId}`).pipe(catchError((err) => {
      return throwError(() => new Error("Impossible de charger les commandes"));
    }));
  }
  /** Met à jour le statut d'une commande. */
  updateStatut(id, statut) {
    return this.http.patch(`${this.apiUrl}/${id}/statut`, { statutCommande: statut }).pipe(catchError((err) => {
      return throwError(() => new Error("Erreur lors de la mise \xE0 jour du statut"));
    }));
  }
  static {
    this.\u0275fac = function CommandeService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CommandeService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CommandeService, factory: _CommandeService.\u0275fac, providedIn: "root" });
  }
};

// src/app/features/commande/commande-form/commande-form.component.ts
var _forTrack03 = ($index, $item) => $item.id;
function CommandeFormComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "mat-spinner", 13);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "V\xE9rification de votre abonnement livraison...");
    \u0275\u0275elementEnd()();
  }
}
function CommandeFormComponent_Conditional_16_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "mat-icon");
    \u0275\u0275text(2, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Votre abonnement livraison est actif, mais son quota est \xE9puis\xE9. Vous pouvez le renouveler ou continuer sans abonnement. ");
    \u0275\u0275elementEnd();
  }
}
function CommandeFormComponent_Conditional_16_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "mat-icon");
    \u0275\u0275text(2, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Votre compte a d\xE9j\xE0 un abonnement consultation actif. Le syst\xE8me actuel ne permet pas d'ajouter un abonnement livraison tant qu'il est actif. ");
    \u0275\u0275elementEnd();
  }
}
function CommandeFormComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 14)(2, "span", 15);
    \u0275\u0275text(3, "Avant de commander");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h3");
    \u0275\u0275text(5, "Voulez-vous prendre un abonnement livraison ?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, " Si vous prenez un abonnement, vous passez par le parcours d'abonnement livraison. Sinon, vous continuez directement vers le paiement de la commande. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, CommandeFormComponent_Conditional_16_Conditional_8_Template, 4, 0, "div", 16)(9, CommandeFormComponent_Conditional_16_Conditional_9_Template, 4, 0, "div", 17);
    \u0275\u0275elementStart(10, "div", 18)(11, "button", 19);
    \u0275\u0275listener("click", function CommandeFormComponent_Conditional_16_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.choisirAvecAbonnement());
    });
    \u0275\u0275elementStart(12, "mat-icon");
    \u0275\u0275text(13, "workspace_premium");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14, " Oui, prendre un abonnement ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 20);
    \u0275\u0275listener("click", function CommandeFormComponent_Conditional_16_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.continuerSansAbonnement());
    });
    \u0275\u0275elementStart(16, "mat-icon");
    \u0275\u0275text(17, "payment");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18, " Non, passer au paiement ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275conditional((ctx_r1.subscriptionCourante == null ? null : ctx_r1.subscriptionCourante.planType) === "CLIENT_LIVRAISON" && (ctx_r1.subscriptionCourante == null ? null : ctx_r1.subscriptionCourante.statut) === "ACTIVE" && ((tmp_1_0 = ctx_r1.subscriptionCourante == null ? null : ctx_r1.subscriptionCourante.quotaRestant) !== null && tmp_1_0 !== void 0 ? tmp_1_0 : 0) === 0 ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r1.subscriptionCourante == null ? null : ctx_r1.subscriptionCourante.planType) === "CLIENT_CONSULT" && (ctx_r1.subscriptionCourante == null ? null : ctx_r1.subscriptionCourante.statut) === "ACTIVE" ? 9 : -1);
  }
}
function CommandeFormComponent_Conditional_17_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "mat-spinner", 13);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Chargement des plans de livraison...");
    \u0275\u0275elementEnd()();
  }
}
function CommandeFormComponent_Conditional_17_Conditional_9_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1, "Recommand\xE9");
    \u0275\u0275elementEnd();
  }
}
function CommandeFormComponent_Conditional_17_Conditional_9_For_2_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const plan_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", plan_r4.quota, " livraison(s) incluse(s)");
  }
}
function CommandeFormComponent_Conditional_17_Conditional_9_For_2_Conditional_13_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "mat-icon");
    \u0275\u0275text(2, "check");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const feature_r5 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", feature_r5, " ");
  }
}
function CommandeFormComponent_Conditional_17_Conditional_9_For_2_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 29);
    \u0275\u0275repeaterCreate(1, CommandeFormComponent_Conditional_17_Conditional_9_For_2_Conditional_13_For_2_Template, 4, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const plan_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(plan_r4.features);
  }
}
function CommandeFormComponent_Conditional_17_Conditional_9_For_2_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 31);
  }
}
function CommandeFormComponent_Conditional_17_Conditional_9_For_2_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "open_in_new");
    \u0275\u0275elementEnd();
  }
}
function CommandeFormComponent_Conditional_17_Conditional_9_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275template(1, CommandeFormComponent_Conditional_17_Conditional_9_For_2_Conditional_1_Template, 2, 0, "span", 24);
    \u0275\u0275elementStart(2, "div", 25)(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 26);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 27);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementStart(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(12, CommandeFormComponent_Conditional_17_Conditional_9_For_2_Conditional_12_Template, 2, 1, "p", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, CommandeFormComponent_Conditional_17_Conditional_9_For_2_Conditional_13_Template, 3, 0, "ul", 29);
    \u0275\u0275elementStart(14, "button", 30);
    \u0275\u0275listener("click", function CommandeFormComponent_Conditional_17_Conditional_9_For_2_Template_button_click_14_listener() {
      const plan_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.souscrirePlan(plan_r4));
    });
    \u0275\u0275template(15, CommandeFormComponent_Conditional_17_Conditional_9_For_2_Conditional_15_Template, 1, 0, "mat-spinner", 31)(16, CommandeFormComponent_Conditional_17_Conditional_9_For_2_Conditional_16_Template, 2, 0, "mat-icon");
    \u0275\u0275text(17, " Souscrire ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const plan_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("plan-recommande", plan_r4.recommande);
    \u0275\u0275advance();
    \u0275\u0275conditional(plan_r4.recommande ? 1 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(plan_r4.nom);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(plan_r4.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(9, 11, plan_r4.prix, "1.0-0"), " FCFA ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("/ ", ctx_r1.formatDureePlan(plan_r4.dureeJours), "");
    \u0275\u0275advance();
    \u0275\u0275conditional(plan_r4.quota > 0 ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(plan_r4.features.length > 0 ? 13 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.envoi);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.envoi ? 15 : 16);
  }
}
function CommandeFormComponent_Conditional_17_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275repeaterCreate(1, CommandeFormComponent_Conditional_17_Conditional_9_For_2_Template, 18, 14, "div", 22, _forTrack03);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.plansLivraison);
  }
}
function CommandeFormComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 14)(2, "span", 15);
    \u0275\u0275text(3, "Abonnement livraison");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h3");
    \u0275\u0275text(5, "Choisissez une formule");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "S\xE9lectionnez un plan, puis nous lancerons le paiement de l'abonnement.");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, CommandeFormComponent_Conditional_17_Conditional_8_Template, 4, 0, "div", 5)(9, CommandeFormComponent_Conditional_17_Conditional_9_Template, 3, 0, "div", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275conditional(ctx_r1.chargementPlans ? 8 : 9);
  }
}
function CommandeFormComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "mat-spinner", 13);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Chargement du catalogue du revendeur...");
    \u0275\u0275elementEnd()();
  }
}
function CommandeFormComponent_Conditional_19_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "mat-icon");
    \u0275\u0275text(2, "verified");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" Abonnement livraison actif : ", ctx_r1.subscriptionCourante == null ? null : ctx_r1.subscriptionCourante.quotaRestant, " livraison(s) restante(s). ");
  }
}
function CommandeFormComponent_Conditional_19_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const marque_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", marque_r7);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getMarqueLabel(marque_r7));
  }
}
function CommandeFormComponent_Conditional_19_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Veuillez s\xE9lectionner une marque");
    \u0275\u0275elementEnd();
  }
}
function CommandeFormComponent_Conditional_19_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-radio-button", 39)(1, "div", 64)(2, "span", 65);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 66);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 67);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const produit_r8 = ctx.$implicit;
    \u0275\u0275property("value", produit_r8.format);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(produit_r8.formatLibelle);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(6, 4, produit_r8.prixUnitaire, "1.0-0"), " FCFA");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", produit_r8.quantiteDisponible, " disponible(s)");
  }
}
function CommandeFormComponent_Conditional_19_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "La quantit\xE9 minimum est 1");
    \u0275\u0275elementEnd();
  }
}
function CommandeFormComponent_Conditional_19_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "La quantit\xE9 maximum est 20");
    \u0275\u0275elementEnd();
  }
}
function CommandeFormComponent_Conditional_19_Conditional_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Le num\xE9ro de t\xE9l\xE9phone est obligatoire");
    \u0275\u0275elementEnd();
  }
}
function CommandeFormComponent_Conditional_19_Conditional_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Format invalide. Exemple: 0197000000");
    \u0275\u0275elementEnd();
  }
}
function CommandeFormComponent_Conditional_19_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 31);
  }
}
function CommandeFormComponent_Conditional_19_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "my_location");
    \u0275\u0275elementEnd();
  }
}
function CommandeFormComponent_Conditional_19_Conditional_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 52)(1, "mat-icon");
    \u0275\u0275text(2, "verified");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Position GPS captur\xE9e ");
    \u0275\u0275elementEnd();
  }
}
function CommandeFormComponent_Conditional_19_Conditional_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "L'adresse de livraison est obligatoire");
    \u0275\u0275elementEnd();
  }
}
function CommandeFormComponent_Conditional_19_Conditional_100_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 63)(1, "mat-icon");
    \u0275\u0275text(2, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Le montant final pay\xE9 sera celui calcul\xE9 c\xF4t\xE9 serveur selon le catalogue et votre position GPS. ");
    \u0275\u0275elementEnd();
  }
}
function CommandeFormComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 7);
    \u0275\u0275template(1, CommandeFormComponent_Conditional_19_Conditional_1_Template, 4, 1, "div", 32);
    \u0275\u0275elementStart(2, "mat-form-field", 33)(3, "mat-label");
    \u0275\u0275text(4, "Marque de gaz");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "mat-select", 34);
    \u0275\u0275repeaterCreate(6, CommandeFormComponent_Conditional_19_For_7_Template, 2, 2, "mat-option", 35, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, CommandeFormComponent_Conditional_19_Conditional_8_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 36)(10, "label", 37);
    \u0275\u0275text(11, "Format disponible");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "mat-radio-group", 38);
    \u0275\u0275repeaterCreate(13, CommandeFormComponent_Conditional_19_For_14_Template, 9, 7, "mat-radio-button", 39, _forTrack03);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "mat-form-field", 33)(16, "mat-label");
    \u0275\u0275text(17, "Quantit\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275element(18, "input", 40);
    \u0275\u0275elementStart(19, "mat-icon", 41);
    \u0275\u0275text(20, "propane_tank");
    \u0275\u0275elementEnd();
    \u0275\u0275template(21, CommandeFormComponent_Conditional_19_Conditional_21_Template, 2, 0, "mat-error")(22, CommandeFormComponent_Conditional_19_Conditional_22_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 42)(24, "div", 43)(25, "span");
    \u0275\u0275text(26, "Prix unitaire");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span");
    \u0275\u0275text(28);
    \u0275\u0275pipe(29, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 43)(31, "span");
    \u0275\u0275text(32, "Quantit\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "span");
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 43)(36, "span");
    \u0275\u0275text(37, "Sous-total gaz");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "span");
    \u0275\u0275text(39);
    \u0275\u0275pipe(40, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 44)(42, "span");
    \u0275\u0275text(43, "Frais de distance");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "span");
    \u0275\u0275text(45);
    \u0275\u0275pipe(46, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "div", 45)(48, "span");
    \u0275\u0275text(49, "Total estim\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "span", 46);
    \u0275\u0275text(51);
    \u0275\u0275pipe(52, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "div", 47);
    \u0275\u0275text(54, " Livraison gratuite jusqu'\xE0 5 km, puis 200 FCFA par km entam\xE9. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "mat-form-field", 33)(56, "mat-label");
    \u0275\u0275text(57, "Votre num\xE9ro de t\xE9l\xE9phone");
    \u0275\u0275elementEnd();
    \u0275\u0275element(58, "input", 48);
    \u0275\u0275elementStart(59, "mat-icon", 49);
    \u0275\u0275text(60, "phone");
    \u0275\u0275elementEnd();
    \u0275\u0275template(61, CommandeFormComponent_Conditional_19_Conditional_61_Template, 2, 0, "mat-error")(62, CommandeFormComponent_Conditional_19_Conditional_62_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "div", 50)(64, "button", 51);
    \u0275\u0275listener("click", function CommandeFormComponent_Conditional_19_Template_button_click_64_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.utiliserPositionGps());
    });
    \u0275\u0275template(65, CommandeFormComponent_Conditional_19_Conditional_65_Template, 1, 0, "mat-spinner", 31)(66, CommandeFormComponent_Conditional_19_Conditional_66_Template, 2, 0, "mat-icon");
    \u0275\u0275text(67, " Utiliser ma position GPS ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(68, CommandeFormComponent_Conditional_19_Conditional_68_Template, 4, 0, "span", 52);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "mat-form-field", 33)(70, "mat-label");
    \u0275\u0275text(71, "Adresse de livraison");
    \u0275\u0275elementEnd();
    \u0275\u0275element(72, "textarea", 53);
    \u0275\u0275elementStart(73, "mat-icon", 49);
    \u0275\u0275text(74, "home");
    \u0275\u0275elementEnd();
    \u0275\u0275template(75, CommandeFormComponent_Conditional_19_Conditional_75_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(76, "div", 54)(77, "label", 37);
    \u0275\u0275text(78, "Mode de paiement");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "mat-radio-group", 55)(80, "mat-radio-button", 56)(81, "div", 57)(82, "div", 58)(83, "mat-icon");
    \u0275\u0275text(84, "payment");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(85, "div", 59)(86, "span", 60);
    \u0275\u0275text(87, "Payer via FedaPay");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(88, "span", 61);
    \u0275\u0275text(89, "MTN MoMo \xB7 Moov Money \xB7 Celtiis Cash");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(90, "mat-radio-button", 56)(91, "div", 57)(92, "div", 62)(93, "mat-icon");
    \u0275\u0275text(94, "payments");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(95, "div", 59)(96, "span", 60);
    \u0275\u0275text(97, "Esp\xE8ces \xE0 la livraison");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(98, "span", 61);
    \u0275\u0275text(99, "Paiement en cash au moment de la livraison");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275template(100, CommandeFormComponent_Conditional_19_Conditional_100_Template, 4, 0, "div", 63);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_4_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_9_0;
    let tmp_13_0;
    let tmp_14_0;
    let tmp_18_0;
    let tmp_21_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.formulaire);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r1.subscriptionCourante == null ? null : ctx_r1.subscriptionCourante.planType) === "CLIENT_LIVRAISON" && (ctx_r1.subscriptionCourante == null ? null : ctx_r1.subscriptionCourante.statut) === "ACTIVE" && ((tmp_2_0 = ctx_r1.subscriptionCourante == null ? null : ctx_r1.subscriptionCourante.quotaRestant) !== null && tmp_2_0 !== void 0 ? tmp_2_0 : 0) > 0 ? 1 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.marquesDisponibles);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_4_0 = ctx_r1.formulaire.get("marque")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx_r1.formulaire.get("marque")) == null ? null : tmp_4_0.touched) ? 8 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.produitsPourMarque);
    \u0275\u0275advance(8);
    \u0275\u0275conditional(((tmp_6_0 = ctx_r1.formulaire.get("quantite")) == null ? null : tmp_6_0.hasError("min")) ? 21 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_7_0 = ctx_r1.formulaire.get("quantite")) == null ? null : tmp_7_0.hasError("max")) ? 22 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(29, 19, ctx_r1.prixUnitaire, "1.0-0"), " FCFA");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("\xD7 ", ((tmp_9_0 = ctx_r1.formulaire.get("quantite")) == null ? null : tmp_9_0.value) || 1, "");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(40, 22, ctx_r1.sousTotal, "1.0-0"), " FCFA");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(46, 25, ctx_r1.fraisDistanceEstimes, "1.0-0"), " FCFA");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(52, 28, ctx_r1.totalEstime, "1.0-0"), " FCFA");
    \u0275\u0275advance(10);
    \u0275\u0275conditional(((tmp_13_0 = ctx_r1.formulaire.get("clientTelephone")) == null ? null : tmp_13_0.hasError("required")) && ((tmp_13_0 = ctx_r1.formulaire.get("clientTelephone")) == null ? null : tmp_13_0.touched) ? 61 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_14_0 = ctx_r1.formulaire.get("clientTelephone")) == null ? null : tmp_14_0.hasError("pattern")) ? 62 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.geolocalisationEnCours);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.geolocalisationEnCours ? 65 : 66);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.clientLocation ? 68 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(((tmp_18_0 = ctx_r1.formulaire.get("clientAdresseLivraison")) == null ? null : tmp_18_0.invalid) && ((tmp_18_0 = ctx_r1.formulaire.get("clientAdresseLivraison")) == null ? null : tmp_18_0.touched) ? 75 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ctx_r1.ModePaiement.MOMO_MTN);
    \u0275\u0275advance(10);
    \u0275\u0275property("value", ctx_r1.ModePaiement.ESPECES);
    \u0275\u0275advance(10);
    \u0275\u0275conditional(((tmp_21_0 = ctx_r1.formulaire.get("modePaiement")) == null ? null : tmp_21_0.value) !== ctx_r1.ModePaiement.ESPECES ? 100 : -1);
  }
}
function CommandeFormComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "mat-icon");
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.erreur, " ");
  }
}
function CommandeFormComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 68);
    \u0275\u0275listener("click", function CommandeFormComponent_Conditional_22_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.retourAuChoixAbonnement());
    });
    \u0275\u0275text(1, " Retour ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.envoi);
  }
}
function CommandeFormComponent_Conditional_25_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 31);
  }
}
function CommandeFormComponent_Conditional_25_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(((tmp_2_0 = ctx_r1.formulaire.get("modePaiement")) == null ? null : tmp_2_0.value) === ctx_r1.ModePaiement.ESPECES ? "check_circle" : "open_in_new");
  }
}
function CommandeFormComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 69);
    \u0275\u0275listener("click", function CommandeFormComponent_Conditional_25_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.soumettre());
    });
    \u0275\u0275template(1, CommandeFormComponent_Conditional_25_Conditional_1_Template, 1, 0, "mat-spinner", 31)(2, CommandeFormComponent_Conditional_25_Conditional_2_Template, 2, 1, "mat-icon");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.formulaire.invalid || ctx_r1.envoi || ctx_r1.chargementCatalogue);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.envoi ? 1 : 2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ((tmp_3_0 = ctx_r1.formulaire.get("modePaiement")) == null ? null : tmp_3_0.value) === ctx_r1.ModePaiement.ESPECES ? "Confirmer la commande" : "Confirmer et payer", " ");
  }
}
var CommandeFormComponent = class _CommandeFormComponent {
  constructor() {
    this.data = inject(MAT_DIALOG_DATA);
    this.dialogRef = inject(MatDialogRef);
    this.commandeService = inject(CommandeService);
    this.paiementService = inject(PaiementService);
    this.revendeurService = inject(RevendeurService);
    this.geolocationService = inject(GeolocationService);
    this.authService = inject(AuthService);
    this.subscriptionService = inject(SubscriptionService);
    this.inscriptionState = inject(InscriptionStateService);
    this.router = inject(Router);
    this.fb = inject(FormBuilder);
    this.snackBar = inject(MatSnackBar);
    this.ngZone = inject(NgZone);
    this.ModePaiement = ModePaiement;
    this.catalogue = [];
    this.plansLivraison = [];
    this.etape = "choix-abonnement";
    this.chargementCatalogue = true;
    this.chargementAbonnement = false;
    this.chargementPlans = false;
    this.geolocalisationEnCours = false;
    this.envoi = false;
    this.erreur = null;
    this.clientLocation = null;
    this.subscriptionCourante = null;
  }
  get marquesDisponibles() {
    return [...new Set(this.catalogue.map((produit) => produit.marque))];
  }
  get produitsPourMarque() {
    const marque = this.formulaire?.get("marque")?.value;
    if (!marque) {
      return [];
    }
    return this.catalogue.filter((produit) => produit.marque === marque).sort((a, b) => this.getFormatOrder(a.format) - this.getFormatOrder(b.format));
  }
  get produitSelectionne() {
    const marque = this.formulaire?.get("marque")?.value;
    const taille = this.formulaire?.get("taille")?.value;
    return this.catalogue.find((produit) => produit.marque === marque && produit.format === taille);
  }
  get prixUnitaire() {
    return this.produitSelectionne?.prixUnitaire ?? 0;
  }
  get sousTotal() {
    const quantite = Math.max(1, this.formulaire?.get("quantite")?.value ?? 1);
    return this.prixUnitaire * quantite;
  }
  get distanceKmEstimee() {
    if (!this.clientLocation || !this.data.revendeur.location) {
      return 0;
    }
    return this.calculerDistanceKm(this.clientLocation, this.data.revendeur.location);
  }
  get fraisDistanceEstimes() {
    if (this.distanceKmEstimee <= 5) {
      return 0;
    }
    return Math.ceil((this.distanceKmEstimee - 5) * 200);
  }
  get totalEstime() {
    return this.sousTotal + this.fraisDistanceEstimes;
  }
  ngOnInit() {
    this.formulaire = this.fb.group({
      marque: ["", Validators.required],
      taille: ["", Validators.required],
      quantite: [1, [Validators.required, Validators.min(1), Validators.max(20)]],
      clientTelephone: [
        this.authService.currentUser()?.telephone ?? "",
        [Validators.required, Validators.pattern(/^(\+229|00229)?\s*\d{10}$/)]
      ],
      clientAdresseLivraison: ["", Validators.required],
      modePaiement: [ModePaiement.MOMO_MTN, Validators.required]
    });
    this.formulaire.get("marque")?.valueChanges.subscribe(() => this.synchroniserFormatSelection());
    this.chargerCatalogue();
    this.utiliserPositionGps();
    this.initialiserEtape();
  }
  chargerCatalogue() {
    this.chargementCatalogue = true;
    this.erreur = null;
    this.revendeurService.getCatalogue(this.data.revendeur.id).subscribe({
      next: (produits) => {
        this.catalogue = produits.filter((produit) => produit.disponible && produit.quantiteDisponible > 0);
        this.chargementCatalogue = false;
        if (this.catalogue.length === 0) {
          this.erreur = "Aucun produit disponible dans le catalogue de ce revendeur.";
          return;
        }
        const premierProduit = this.catalogue[0];
        this.formulaire.patchValue({
          marque: premierProduit.marque,
          taille: premierProduit.format
        });
      },
      error: (err) => {
        this.chargementCatalogue = false;
        this.erreur = err.message || "Impossible de charger le catalogue du revendeur.";
      }
    });
  }
  synchroniserFormatSelection() {
    const produits = this.produitsPourMarque;
    const controleTaille = this.formulaire.get("taille");
    if (!controleTaille) {
      return;
    }
    const valeurCourante = controleTaille.value;
    if (!produits.some((produit) => produit.format === valeurCourante)) {
      controleTaille.setValue(produits[0]?.format ?? "");
    }
  }
  utiliserPositionGps() {
    this.geolocalisationEnCours = true;
    this.erreur = null;
    this.geolocationService.getCurrentPosition().subscribe({
      next: (position) => __async(this, null, function* () {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.clientLocation = [longitude, latitude];
        const adresse = yield this.reverseGeocode(latitude, longitude);
        this.formulaire.patchValue({
          clientAdresseLivraison: adresse
        });
        this.geolocalisationEnCours = false;
      }),
      error: (message) => {
        this.geolocalisationEnCours = false;
        this.erreur = String(message);
      }
    });
  }
  soumettre() {
    if (this.formulaire.invalid) {
      this.formulaire.markAllAsTouched();
      return;
    }
    if (!this.clientLocation) {
      this.erreur = "Activez la localisation GPS pour calculer la distance et confirmer la livraison.";
      return;
    }
    const produit = this.produitSelectionne;
    if (!produit) {
      this.erreur = "Le produit s\xE9lectionn\xE9 est introuvable dans le catalogue.";
      return;
    }
    this.envoi = true;
    this.erreur = null;
    const valeurs = this.formulaire.value;
    const dto = {
      revendeurId: this.data.revendeur.id,
      clientTelephone: valeurs.clientTelephone,
      clientAdresseLivraison: valeurs.clientAdresseLivraison,
      clientLocation: this.clientLocation,
      marque: produit.marque,
      taille: produit.format,
      quantite: valeurs.quantite,
      modePaiement: valeurs.modePaiement
    };
    this.commandeService.creer(dto).subscribe({
      next: (commande) => {
        if (valeurs.modePaiement === ModePaiement.ESPECES) {
          this.envoi = false;
          this.snackBar.open("Commande pass\xE9e. Paiement pr\xE9vu \xE0 la livraison.", "OK", { duration: 5e3 });
          this.dialogRef.close(commande);
          return;
        }
        this.paiementService.initierPaiement({
          type: TypeTransaction.COMMANDE,
          montant: Math.round(commande.total),
          description: `Commande gaz ${produit.marqueLibelle} ${produit.formatLibelle} \xD7 ${valeurs.quantite} \u2014 ${this.data.revendeur.nom}`,
          clientTelephone: valeurs.clientTelephone,
          commandeId: commande.id
        }).subscribe({
          next: (response) => {
            this.dialogRef.close(commande);
            this.paiementService.redirectVersCheckout(response.checkoutUrl);
          },
          error: (err) => {
            this.envoi = false;
            this.erreur = err.message || "Commande cr\xE9\xE9e mais paiement impossible \xE0 initier.";
          }
        });
      },
      error: (err) => {
        this.envoi = false;
        this.erreur = err.message || "Une erreur s'est produite lors de la commande.";
      }
    });
  }
  getMarqueLabel(marque) {
    return this.catalogue.find((produit) => produit.marque === marque)?.marqueLibelle ?? marque;
  }
  continuerSansAbonnement() {
    this.erreur = null;
    this.etape = "formulaire";
  }
  choisirAvecAbonnement() {
    this.erreur = null;
    if (!this.authService.estConnecte()) {
      this.inscriptionState.setRole(Role.CLIENT);
      this.inscriptionState.setClientNeed(ClientNeed.LIVRAISON);
      this.dialogRef.close();
      this.router.navigate(["/auth/register/client/plans"]);
      return;
    }
    if (this.subscriptionCourante?.planType === "CLIENT_CONSULT" && this.subscriptionCourante?.statut === "ACTIVE") {
      this.erreur = "Un abonnement consultation est d\xE9j\xE0 actif sur ce compte. Continuez sans abonnement ou attendez son expiration.";
      return;
    }
    this.chargerPlansLivraison();
  }
  retourAuChoixAbonnement() {
    this.erreur = null;
    this.envoi = false;
    this.etape = "choix-abonnement";
  }
  souscrirePlan(plan) {
    this.envoi = true;
    this.erreur = null;
    this.subscriptionService.subscribe(plan.code).subscribe({
      next: (response) => {
        this.dialogRef.close();
        this.paiementService.redirectVersCheckout(response.checkoutUrl);
      },
      error: (err) => {
        this.envoi = false;
        this.erreur = err.message || "Impossible d\u2019initier le paiement de l\u2019abonnement.";
      }
    });
  }
  formatDureePlan(jours) {
    if (jours >= 365) {
      return `${Math.round(jours / 365)} an${jours >= 730 ? "s" : ""}`;
    }
    if (jours >= 30) {
      return `${Math.round(jours / 30)} mois`;
    }
    return `${jours} jour${jours > 1 ? "s" : ""}`;
  }
  getFormatOrder(format) {
    return {
      KG_3: 3,
      KG_6: 6,
      KG_12: 12,
      KG_25: 25,
      KG_38: 38
    }[format] ?? 999;
  }
  reverseGeocode(latitude, longitude) {
    return new Promise((resolve) => {
      if (typeof google === "undefined" || !google.maps?.Geocoder) {
        resolve(this.formatAdresseGps(latitude, longitude));
        return;
      }
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
        this.ngZone.run(() => {
          if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
            resolve(results[0].formatted_address);
          } else {
            resolve(this.formatAdresseGps(latitude, longitude));
          }
        });
      });
    });
  }
  formatAdresseGps(latitude, longitude) {
    return `Position GPS: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
  }
  initialiserEtape() {
    if (!this.authService.estConnecte()) {
      this.etape = "choix-abonnement";
      return;
    }
    this.chargementAbonnement = true;
    this.subscriptionService.getCurrent().subscribe({
      next: (subscription) => {
        this.subscriptionCourante = subscription ?? null;
        this.etape = this.aAbonnementLivraisonDisponible(subscription ?? null) ? "formulaire" : "choix-abonnement";
        this.chargementAbonnement = false;
      },
      error: () => {
        this.subscriptionCourante = null;
        this.etape = "choix-abonnement";
        this.chargementAbonnement = false;
      }
    });
  }
  chargerPlansLivraison() {
    if (this.plansLivraison.length > 0) {
      this.etape = "plans-abonnement";
      return;
    }
    this.chargementPlans = true;
    this.subscriptionService.getPlans("CLIENT_LIVRAISON").subscribe({
      next: (plans) => {
        this.plansLivraison = plans;
        this.chargementPlans = false;
        this.etape = "plans-abonnement";
      },
      error: (err) => {
        this.chargementPlans = false;
        this.erreur = err.message || "Impossible de charger les plans de livraison.";
      }
    });
  }
  aAbonnementLivraisonDisponible(subscription) {
    return Boolean(subscription && subscription.planType === "CLIENT_LIVRAISON" && subscription.statut === "ACTIVE" && subscription.quotaRestant > 0);
  }
  calculerDistanceKm(point1, point2) {
    const lat1 = this.toRadians(point1[1]);
    const lat2 = this.toRadians(point2[1]);
    const deltaLat = this.toRadians(point2[1] - point1[1]);
    const deltaLng = this.toRadians(point2[0] - point1[0]);
    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return 6371 * c;
  }
  toRadians(value) {
    return value * Math.PI / 180;
  }
  static {
    this.\u0275fac = function CommandeFormComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CommandeFormComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CommandeFormComponent, selectors: [["app-commande-form"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 26, vars: 9, consts: [[1, "dialog-commande"], ["mat-dialog-title", "", 1, "titre-dialog"], [1, "contenu-dialog"], [1, "info-revendeur"], [1, "icone-sm"], [1, "chargement-centre"], [1, "bloc-etape"], [1, "formulaire", 3, "formGroup"], [1, "erreur"], [1, "actions-dialog"], ["mat-button", "", "type", "button", 3, "disabled"], ["mat-button", "", 3, "click", "disabled"], ["mat-raised-button", "", 1, "btn-confirmer", 3, "disabled"], ["diameter", "36"], [1, "bloc-question"], [1, "badge-etape"], [1, "info-abonnement", "info-abonnement-warning"], [1, "info-abonnement"], [1, "actions-choix"], ["mat-raised-button", "", "type", "button", 1, "btn-abonnement", 3, "click"], ["mat-stroked-button", "", "type", "button", 1, "btn-sans-abonnement", 3, "click"], [1, "grille-plans"], [1, "carte-plan", 3, "plan-recommande"], [1, "carte-plan"], [1, "badge-recommande"], [1, "plan-entete"], [1, "plan-description"], [1, "plan-prix"], [1, "plan-quota"], [1, "plan-features"], ["mat-raised-button", "", "type", "button", 1, "btn-plan", 3, "click", "disabled"], ["diameter", "18"], [1, "info-abonnement", "info-abonnement-success"], ["appearance", "outline", 1, "champ-pleine-largeur"], ["formControlName", "marque"], [3, "value"], [1, "groupe-taille"], [1, "label-champ"], ["formControlName", "taille", 1, "radio-taille"], [1, "radio-option", 3, "value"], ["matInput", "", "type", "number", "formControlName", "quantite", "min", "1", "max", "20"], ["matSuffix", ""], [1, "recapitulatif"], [1, "ligne-prix"], [1, "ligne-prix", "frais"], [1, "ligne-prix", "total"], [1, "montant-total"], [1, "recap-note"], ["matInput", "", "formControlName", "clientTelephone", "placeholder", "0197000000"], ["matPrefix", ""], [1, "gps-actions"], ["mat-stroked-button", "", "type", "button", 1, "btn-gps", 3, "click", "disabled"], [1, "gps-ok"], ["matInput", "", "formControlName", "clientAdresseLivraison", "rows", "2", "placeholder", "Votre adresse GPS sera pr\xE9remplie. Ajoutez un rep\xE8re si besoin."], [1, "groupe-paiement"], ["formControlName", "modePaiement", 1, "radio-paiement"], [1, "radio-option", "paiement-option", 3, "value"], [1, "option-paiement"], [1, "paiement-logo-fedapay"], [1, "paiement-info"], [1, "paiement-nom"], [1, "paiement-desc"], [1, "paiement-logo-especes"], [1, "info-fedapay"], [1, "option-taille"], [1, "taille-label"], [1, "taille-prix"], [1, "taille-stock"], ["mat-button", "", "type", "button", 3, "click", "disabled"], ["mat-raised-button", "", 1, "btn-confirmer", 3, "click", "disabled"]], template: function CommandeFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h2", 1)(2, "mat-icon");
        \u0275\u0275text(3, "local_fire_department");
        \u0275\u0275elementEnd();
        \u0275\u0275text(4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "mat-dialog-content", 2)(6, "div", 3)(7, "p")(8, "mat-icon", 4);
        \u0275\u0275text(9, "place");
        \u0275\u0275elementEnd();
        \u0275\u0275text(10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "p")(12, "mat-icon", 4);
        \u0275\u0275text(13, "phone");
        \u0275\u0275elementEnd();
        \u0275\u0275text(14);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(15, CommandeFormComponent_Conditional_15_Template, 4, 0, "div", 5)(16, CommandeFormComponent_Conditional_16_Template, 19, 2, "div", 6)(17, CommandeFormComponent_Conditional_17_Template, 10, 1, "div", 6)(18, CommandeFormComponent_Conditional_18_Template, 4, 0, "div", 5)(19, CommandeFormComponent_Conditional_19_Template, 101, 31, "form", 7)(20, CommandeFormComponent_Conditional_20_Template, 4, 1, "div", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "mat-dialog-actions", 9);
        \u0275\u0275template(22, CommandeFormComponent_Conditional_22_Template, 2, 1, "button", 10);
        \u0275\u0275elementStart(23, "button", 11);
        \u0275\u0275listener("click", function CommandeFormComponent_Template_button_click_23_listener() {
          return ctx.dialogRef.close();
        });
        \u0275\u0275text(24, " Annuler ");
        \u0275\u0275elementEnd();
        \u0275\u0275template(25, CommandeFormComponent_Conditional_25_Template, 4, 3, "button", 12);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1(" Commander chez ", ctx.data.revendeur.nom, " ");
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate2(" ", ctx.data.revendeur.quartier, "", ctx.data.revendeur.adresse ? " \u2014 " + ctx.data.revendeur.adresse : "", " ");
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1(" ", ctx.data.revendeur.telephone, " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.chargementAbonnement ? 15 : ctx.etape === "choix-abonnement" ? 16 : ctx.etape === "plans-abonnement" ? 17 : ctx.chargementCatalogue ? 18 : 19);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(ctx.erreur ? 20 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.etape === "plans-abonnement" ? 22 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.envoi);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.etape === "formulaire" ? 25 : -1);
      }
    }, dependencies: [CommonModule, DecimalPipe, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, MaxValidator, FormGroupDirective, FormControlName, MatDialogModule, MatDialogTitle, MatDialogActions, MatDialogContent, MatFormFieldModule, MatFormField, MatLabel, MatError, MatPrefix, MatSuffix, MatInputModule, MatInput, MatSelectModule, MatSelect, MatOption, MatRadioModule, MatRadioGroup, MatRadioButton, MatButtonModule, MatButton, MatIconModule, MatIcon, MatProgressSpinnerModule, MatProgressSpinner, MatSnackBarModule], styles: ['\n\n.dialog-commande[_ngcontent-%COMP%] {\n  max-width: 540px;\n}\n.titre-dialog[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-family: "Montserrat", sans-serif;\n  color: var(--color-primary) !important;\n  padding: 16px 24px 0;\n  mat-icon {\n    color: var(--color-primary);\n  }\n}\n.contenu-dialog[_ngcontent-%COMP%] {\n  padding: 16px 24px !important;\n  max-height: 70vh;\n}\n.info-revendeur[_ngcontent-%COMP%] {\n  background: var(--color-surface-2);\n  border-radius: var(--radius-sm);\n  padding: 10px 14px;\n  margin-bottom: 16px;\n  p {\n    display: flex;\n    align-items: center;\n    gap: 6px;\n    font-size: 0.85rem;\n    color: var(--color-text-muted);\n    margin: 3px 0;\n  }\n}\n.chargement-centre[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n  padding: 28px 0;\n  color: var(--color-text-muted);\n  font-size: 0.9rem;\n}\n.bloc-etape[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.bloc-question[_ngcontent-%COMP%] {\n  background: var(--color-surface-2);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-sm);\n  padding: 16px;\n  h3 {\n    margin: 8px 0 6px;\n    font-size: 1.05rem;\n    color: var(--color-text);\n  }\n  p {\n    margin: 0;\n    font-size: 0.85rem;\n    line-height: 1.5;\n    color: var(--color-text-muted);\n  }\n}\n.badge-etape[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  min-height: 24px;\n  padding: 0 10px;\n  border-radius: 999px;\n  background: color-mix(in srgb, var(--color-primary) 12%, transparent);\n  color: var(--color-primary);\n  font-size: 0.72rem;\n  font-weight: 700;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n}\n.actions-choix[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 12px;\n  @media (max-width: 560px) {\n    grid-template-columns: 1fr;\n  }\n}\n.btn-abonnement[_ngcontent-%COMP%], \n.btn-sans-abonnement[_ngcontent-%COMP%] {\n  min-height: 48px;\n  font-weight: 700 !important;\n}\n.btn-abonnement[_ngcontent-%COMP%] {\n  background: var(--color-accent) !important;\n  color: #1a1a00 !important;\n}\n.btn-sans-abonnement[_ngcontent-%COMP%] {\n  border-color: var(--color-primary) !important;\n  color: var(--color-primary) !important;\n}\n.info-abonnement[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 8px;\n  padding: 12px 14px;\n  border-radius: var(--radius-sm);\n  background: color-mix(in srgb, var(--color-primary) 10%, transparent);\n  color: var(--color-primary);\n  font-size: 0.82rem;\n  line-height: 1.45;\n  mat-icon {\n    font-size: 1rem;\n    width: 1rem;\n    height: 1rem;\n    margin-top: 1px;\n  }\n}\n.info-abonnement-warning[_ngcontent-%COMP%] {\n  background: color-mix(in srgb, #f59e0b 14%, transparent);\n  color: #9a6500;\n}\n.info-abonnement-success[_ngcontent-%COMP%] {\n  background: color-mix(in srgb, #16a34a 12%, transparent);\n  color: #1f7a37;\n  margin-bottom: 4px;\n}\n.grille-plans[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 14px;\n}\n.carte-plan[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  padding: 18px 16px;\n  border-radius: var(--radius-sm);\n  background: var(--color-surface-2);\n  border: 1px solid var(--color-border);\n  &.plan-recommande {\n    border-color: var(--color-accent);\n  }\n}\n.badge-recommande[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n  padding: 2px 8px;\n  border-radius: 999px;\n  background: var(--color-accent);\n  color: #1a1a00;\n  font-size: 0.68rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n.plan-entete[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  h3 {\n    margin: 0;\n    font-size: 1rem;\n    color: var(--color-text);\n  }\n}\n.plan-description[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.8rem;\n  color: var(--color-text-muted);\n}\n.plan-prix[_ngcontent-%COMP%] {\n  font-size: 1.15rem;\n  font-weight: 700;\n  color: var(--color-primary);\n  span {\n    font-size: 0.8rem;\n    font-weight: 600;\n    color: var(--color-text-muted);\n  }\n}\n.plan-quota[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.8rem;\n  color: var(--color-text);\n  font-weight: 600;\n}\n.plan-features[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  li {\n    display: flex;\n    align-items: flex-start;\n    gap: 6px;\n    font-size: 0.8rem;\n    color: var(--color-text-muted);\n  }\n  mat-icon {\n    color: var(--color-success, #16a34a);\n    font-size: 1rem;\n    width: 1rem;\n    height: 1rem;\n  }\n}\n.btn-plan[_ngcontent-%COMP%] {\n  background: var(--color-primary) !important;\n  color: white !important;\n  align-self: flex-start;\n  mat-spinner {\n    margin-right: 6px;\n  }\n}\n.formulaire[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.champ-pleine-largeur[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.label-champ[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--color-text-muted);\n  margin-bottom: 8px;\n  display: block;\n}\n.groupe-taille[_ngcontent-%COMP%], \n.groupe-paiement[_ngcontent-%COMP%] {\n  margin-bottom: 4px;\n}\n.radio-taille[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.radio-option[_ngcontent-%COMP%] {\n  width: 100%;\n  ::ng-deep .mdc-form-field {\n    width: 100%;\n  }\n}\n.option-taille[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  padding: 10px 12px;\n  background: var(--color-surface-2);\n  border-radius: var(--radius-sm);\n  border: 1px solid var(--color-border);\n  cursor: pointer;\n  transition: border-color 0.2s;\n  .taille-label {\n    font-weight: 600;\n    color: var(--color-text);\n  }\n  .taille-prix {\n    font-size: 0.8rem;\n    color: var(--color-primary);\n  }\n  .taille-stock {\n    font-size: 0.74rem;\n    color: var(--color-text-muted);\n  }\n}\n.recapitulatif[_ngcontent-%COMP%] {\n  background: var(--color-surface-2);\n  border-radius: var(--radius-sm);\n  padding: 12px 16px;\n  border: 1px solid var(--color-border);\n}\n.ligne-prix[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-size: 0.85rem;\n  color: var(--color-text-muted);\n  margin-bottom: 6px;\n  &.frais {\n    color: var(--color-warning);\n    font-size: 0.78rem;\n  }\n  &.total {\n    border-top: 1px solid var(--color-border);\n    padding-top: 8px;\n    margin-top: 4px;\n    font-weight: 600;\n    color: var(--color-text);\n  }\n}\n.montant-total[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  font-size: 1rem;\n  font-weight: 700;\n}\n.recap-note[_ngcontent-%COMP%] {\n  font-size: 0.74rem;\n  color: var(--color-text-muted);\n  margin-top: 6px;\n}\n.gps-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  margin-bottom: 2px;\n  flex-wrap: wrap;\n}\n.btn-gps[_ngcontent-%COMP%] {\n  color: var(--color-primary) !important;\n  border-color: var(--color-primary) !important;\n}\n.gps-ok[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 0.78rem;\n  color: var(--color-success, #2e7d32);\n  mat-icon {\n    font-size: 0.95rem;\n    width: 0.95rem;\n    height: 0.95rem;\n  }\n}\n.radio-paiement[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.paiement-option[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.option-paiement[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 8px 12px;\n  background: var(--color-surface-2);\n  border-radius: var(--radius-sm);\n  cursor: pointer;\n}\n.paiement-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n}\n.paiement-nom[_ngcontent-%COMP%] {\n  font-size: 0.88rem;\n  font-weight: 600;\n  color: var(--color-text);\n}\n.paiement-desc[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--color-text-muted);\n}\n.paiement-logo-fedapay[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: var(--radius-sm);\n  background: var(--color-primary);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.paiement-logo-especes[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: var(--radius-sm);\n  background: var(--color-success, #2e7d32);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.info-fedapay[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  margin-top: 8px;\n  padding: 8px 12px;\n  background: color-mix(in srgb, var(--color-primary) 10%, transparent);\n  border-left: 3px solid var(--color-primary);\n  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;\n  font-size: 0.78rem;\n  color: var(--color-primary);\n  mat-icon {\n    font-size: 1rem;\n    width: 1rem;\n    height: 1rem;\n    flex-shrink: 0;\n  }\n}\n.erreur[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 14px;\n  background: var(--color-danger-bg);\n  color: var(--color-danger);\n  border-radius: var(--radius-sm);\n  font-size: 0.85rem;\n  margin-top: 8px;\n}\n.actions-dialog[_ngcontent-%COMP%] {\n  padding: 8px 24px 16px !important;\n  gap: 8px;\n  justify-content: flex-end;\n}\n.btn-confirmer[_ngcontent-%COMP%] {\n  background-color: var(--color-primary) !important;\n  color: white !important;\n  &:disabled {\n    background-color: var(--color-surface-3) !important;\n    color: var(--color-text-muted) !important;\n  }\n  mat-spinner {\n    margin-right: 6px;\n  }\n}\n.icone-sm[_ngcontent-%COMP%] {\n  font-size: 1rem !important;\n  height: 1rem !important;\n  width: 1rem !important;\n}\n/*# sourceMappingURL=commande-form.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CommandeFormComponent, { className: "CommandeFormComponent", filePath: "src/app/features/commande/commande-form/commande-form.component.ts", lineNumber: 887 });
})();

// src/app/features/home/home.component.ts
var _c04 = ["carteRef"];
function HomeComponent_Conditional_0_Conditional_21_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "date");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate1(" \xA0\xB7\xA0Expire le ", \u0275\u0275pipeBind2(1, 1, ctx_r1.consultationService.statut().dateExpiration, "dd/MM/yyyy"), " ");
  }
}
function HomeComponent_Conditional_0_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "mat-icon");
    \u0275\u0275text(2, "visibility");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275template(5, HomeComponent_Conditional_0_Conditional_21_Conditional_5_Template, 2, 4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate3(" ", ctx_r1.consultationService.statut().consultationsRestantes, " consultation", ctx_r1.consultationService.statut().consultationsRestantes > 1 ? "s" : "", " restante", ctx_r1.consultationService.statut().consultationsRestantes > 1 ? "s" : "", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.consultationService.statut().dateExpiration ? 5 : -1);
  }
}
function HomeComponent_Conditional_0_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "app-map", 16, 0);
    \u0275\u0275listener("commanderClique", function HomeComponent_Conditional_0_Conditional_23_Template_app_map_commanderClique_1_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.ouvrirDialogCommande($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("revendeursSignal", ctx_r1.revendeurService.revendeurs);
  }
}
function HomeComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "section", 3)(2, "div", 4)(3, "p", 5);
    \u0275\u0275text(4, "Gaz domestique \xB7 B\xE9nin \xB7 Temps r\xE9el");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h1", 6);
    \u0275\u0275text(6, " Le gaz, ");
    \u0275\u0275elementStart(7, "span", 7);
    \u0275\u0275text(8, "plus proche");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9, " de vous ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 8);
    \u0275\u0275text(11, " Trouvez un revendeur de gaz pr\xE8s de chez vous en quelques secondes. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 9)(13, "span", 10);
    \u0275\u0275text(14, "B\xE9nin Petro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 10);
    \u0275\u0275text(16, "Oryx");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 10);
    \u0275\u0275text(18, "ProGaz");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 10);
    \u0275\u0275text(20, "JNP");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(21, HomeComponent_Conditional_0_Conditional_21_Template, 6, 4, "div", 11);
    \u0275\u0275elementStart(22, "div", 12);
    \u0275\u0275template(23, HomeComponent_Conditional_0_Conditional_23_Template, 3, 1, "div", 13);
    \u0275\u0275elementStart(24, "div", 14)(25, "app-revendeur-list", 15);
    \u0275\u0275listener("toggleCarte", function HomeComponent_Conditional_0_Template_app_revendeur_list_toggleCarte_25_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.togglerCarte());
    })("revendeurSelectionne", function HomeComponent_Conditional_0_Template_app_revendeur_list_revendeurSelectionne_25_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onRevendeurSelectionne($event));
    })("commanderRevendeur", function HomeComponent_Conditional_0_Template_app_revendeur_list_commanderRevendeur_25_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.ouvrirDialogCommande($event));
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(21);
    \u0275\u0275conditional(ctx_r1.consultationService.statut().limite > 0 ? 21 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.carteVisible() ? 23 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("avec-carte", ctx_r1.carteVisible());
    \u0275\u0275advance();
    \u0275\u0275property("carteVisible", ctx_r1.carteVisible());
  }
}
function HomeComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "section", 17)(2, "div", 18)(3, "p", 19);
    \u0275\u0275text(4, "La plateforme n\xB01 du gaz domestique au B\xE9nin");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h1", 20);
    \u0275\u0275text(6, " Trouvez du ");
    \u0275\u0275elementStart(7, "span", 7);
    \u0275\u0275text(8, "gaz");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9, " pr\xE8s de chez vous,");
    \u0275\u0275element(10, "br");
    \u0275\u0275text(11, " en quelques secondes ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 21);
    \u0275\u0275text(13, " GazFacile connecte les clients aux revendeurs de gaz les plus proches. Consultez les stocks en temps r\xE9el, comparez les prix et commandez en ligne. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 22)(15, "a", 23);
    \u0275\u0275text(16, " Cr\xE9er mon compte gratuitement ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "a", 24);
    \u0275\u0275text(18, " J'ai d\xE9j\xE0 un compte ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "p", 25);
    \u0275\u0275text(20, "Inscription gratuite \u2014 pas de carte bancaire requise");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 26)(22, "div", 27)(23, "div", 28);
    \u0275\u0275element(24, "div", 29)(25, "div", 30)(26, "div", 31)(27, "div", 32)(28, "div", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 34)(30, "mat-icon", 35);
    \u0275\u0275text(31, "lock");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "p");
    \u0275\u0275text(33, "Connectez-vous pour voir la carte interactive");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(34, "section", 36)(35, "div", 37)(36, "h2", 38);
    \u0275\u0275text(37, "Comment \xE7a marche ?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "p", 39);
    \u0275\u0275text(39, "3 \xE9tapes simples pour ne plus jamais manquer de gaz");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div", 40)(41, "div", 41)(42, "div", 42);
    \u0275\u0275text(43, "1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "div", 43)(45, "mat-icon");
    \u0275\u0275text(46, "person_add");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "h3");
    \u0275\u0275text(48, "Inscrivez-vous");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "p");
    \u0275\u0275text(50, "Cr\xE9ez votre compte en moins d'une minute avec votre num\xE9ro de t\xE9l\xE9phone.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "div", 44)(52, "mat-icon");
    \u0275\u0275text(53, "arrow_forward");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(54, "div", 41)(55, "div", 42);
    \u0275\u0275text(56, "2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "div", 43)(58, "mat-icon");
    \u0275\u0275text(59, "search");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(60, "h3");
    \u0275\u0275text(61, "Trouvez un revendeur");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "p");
    \u0275\u0275text(63, "Localisez les d\xE9p\xF4ts de gaz les plus proches avec les stocks en temps r\xE9el.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(64, "div", 44)(65, "mat-icon");
    \u0275\u0275text(66, "arrow_forward");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(67, "div", 41)(68, "div", 42);
    \u0275\u0275text(69, "3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "div", 43)(71, "mat-icon");
    \u0275\u0275text(72, "shopping_cart");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(73, "h3");
    \u0275\u0275text(74, "Commandez");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "p");
    \u0275\u0275text(76, "Passez commande en ligne ou rendez-vous directement chez le revendeur.");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(77, "section", 45)(78, "div", 37)(79, "h2", 38);
    \u0275\u0275text(80, "Pourquoi GazFacile ?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "div", 46)(82, "div", 47)(83, "mat-icon");
    \u0275\u0275text(84, "my_location");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(85, "h3");
    \u0275\u0275text(86, "G\xE9olocalisation pr\xE9cise");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(87, "p");
    \u0275\u0275text(88, "Trouvez le revendeur le plus proche gr\xE2ce \xE0 la carte interactive GPS.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(89, "div", 47)(90, "mat-icon");
    \u0275\u0275text(91, "update");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(92, "h3");
    \u0275\u0275text(93, "Stocks en temps r\xE9el");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(94, "p");
    \u0275\u0275text(95, "V\xE9rifiez la disponibilit\xE9 avant de vous d\xE9placer. Fini les trajets inutiles.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(96, "div", 47)(97, "mat-icon");
    \u0275\u0275text(98, "compare_arrows");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(99, "h3");
    \u0275\u0275text(100, "Comparez les prix");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(101, "p");
    \u0275\u0275text(102, "Consultez les catalogues des revendeurs et trouvez le meilleur prix.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(103, "div", 47)(104, "mat-icon");
    \u0275\u0275text(105, "local_shipping");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(106, "h3");
    \u0275\u0275text(107, "Livraison \xE0 domicile");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(108, "p");
    \u0275\u0275text(109, "Commandez en ligne et faites-vous livrer directement chez vous.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(110, "div", 47)(111, "mat-icon");
    \u0275\u0275text(112, "verified");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(113, "h3");
    \u0275\u0275text(114, "Revendeurs v\xE9rifi\xE9s");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(115, "p");
    \u0275\u0275text(116, "Tous les revendeurs sont identifi\xE9s avec leur profil et leurs avis.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(117, "div", 47)(118, "mat-icon");
    \u0275\u0275text(119, "phone_android");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(120, "h3");
    \u0275\u0275text(121, "Paiement Mobile Money");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(122, "p");
    \u0275\u0275text(123, "Payez facilement via MTN MoMo, Moov Money ou Celtiis Cash.");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(124, "section", 48)(125, "div", 37)(126, "div", 49)(127, "div", 50)(128, "span", 51);
    \u0275\u0275text(129, "100+");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(130, "span", 52);
    \u0275\u0275text(131, "Revendeurs inscrits");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(132, "div", 50)(133, "span", 51);
    \u0275\u0275text(134, "12");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(135, "span", 52);
    \u0275\u0275text(136, "Villes couvertes");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(137, "div", 50)(138, "span", 51);
    \u0275\u0275text(139, "24/7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(140, "span", 52);
    \u0275\u0275text(141, "Disponibilit\xE9");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(142, "div", 50)(143, "span", 51);
    \u0275\u0275text(144, "100%");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(145, "span", 52);
    \u0275\u0275text(146, "S\xE9curis\xE9");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(147, "section", 53)(148, "div", 37)(149, "h2", 38);
    \u0275\u0275text(150, "Les marques disponibles");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(151, "div", 54)(152, "div", 55)(153, "span", 56);
    \u0275\u0275text(154, "B\xE9nin Petro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(155, "span", 57);
    \u0275\u0275text(156, "6kg \xB7 12kg \xB7 25kg \xB7 38kg");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(157, "div", 55)(158, "span", 56);
    \u0275\u0275text(159, "Oryx");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(160, "span", 57);
    \u0275\u0275text(161, "6kg \xB7 12kg \xB7 25kg");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(162, "div", 55)(163, "span", 56);
    \u0275\u0275text(164, "ProGaz");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(165, "span", 57);
    \u0275\u0275text(166, "3kg \xB7 6kg \xB7 12kg");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(167, "div", 55)(168, "span", 56);
    \u0275\u0275text(169, "JNP");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(170, "span", 57);
    \u0275\u0275text(171, "6kg \xB7 12kg");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(172, "section", 58)(173, "div", 37)(174, "div", 59)(175, "div", 60)(176, "h2");
    \u0275\u0275text(177, "Vous \xEAtes revendeur de gaz ?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(178, "p");
    \u0275\u0275text(179, "Rejoignez GazFacile et rendez votre d\xE9p\xF4t visible par des milliers de clients au B\xE9nin. G\xE9rez votre catalogue, recevez des commandes en ligne et d\xE9veloppez votre activit\xE9.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(180, "ul", 61)(181, "li")(182, "mat-icon");
    \u0275\u0275text(183, "visibility");
    \u0275\u0275elementEnd();
    \u0275\u0275text(184, " Visibilit\xE9 sur la carte interactive");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(185, "li")(186, "mat-icon");
    \u0275\u0275text(187, "shopping_bag");
    \u0275\u0275elementEnd();
    \u0275\u0275text(188, " Commandes en ligne");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(189, "li")(190, "mat-icon");
    \u0275\u0275text(191, "notifications_active");
    \u0275\u0275elementEnd();
    \u0275\u0275text(192, " Notifications en temps r\xE9el");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(193, "li")(194, "mat-icon");
    \u0275\u0275text(195, "trending_up");
    \u0275\u0275elementEnd();
    \u0275\u0275text(196, " D\xE9veloppez votre client\xE8le");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(197, "a", 23);
    \u0275\u0275text(198, " Inscrire mon d\xE9p\xF4t ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(199, "div", 62)(200, "div", 63)(201, "div", 64);
    \u0275\u0275element(202, "span", 65)(203, "span", 65)(204, "span", 65);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(205, "div", 66)(206, "div", 67)(207, "mat-icon");
    \u0275\u0275text(208, "store");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(209, "span");
    \u0275\u0275text(210, "Mon d\xE9p\xF4t");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(211, "div", 67)(212, "mat-icon");
    \u0275\u0275text(213, "inventory_2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(214, "span");
    \u0275\u0275text(215, "Catalogue");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(216, "div", 67)(217, "mat-icon");
    \u0275\u0275text(218, "receipt_long");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(219, "span");
    \u0275\u0275text(220, "Commandes");
    \u0275\u0275elementEnd()()()()()()()();
    \u0275\u0275elementStart(221, "section", 68)(222, "div", 37)(223, "h2");
    \u0275\u0275text(224, "Pr\xEAt \xE0 trouver du gaz facilement ?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(225, "p");
    \u0275\u0275text(226, "Rejoignez la communaut\xE9 GazFacile d\xE8s maintenant.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(227, "div", 22)(228, "a", 23);
    \u0275\u0275text(229, " S'inscrire maintenant ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(230, "a", 24);
    \u0275\u0275text(231, " Se connecter ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(232, "footer", 69)(233, "div", 37)(234, "div", 70)(235, "div", 71);
    \u0275\u0275element(236, "img", 72);
    \u0275\u0275elementStart(237, "p");
    \u0275\u0275text(238, "La plateforme de r\xE9f\xE9rence pour le gaz domestique au B\xE9nin.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(239, "div", 71)(240, "h4");
    \u0275\u0275text(241, "Liens utiles");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(242, "a", 73);
    \u0275\u0275text(243, "Inscription");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(244, "a", 74);
    \u0275\u0275text(245, "Connexion");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(246, "div", 71)(247, "h4");
    \u0275\u0275text(248, "Contact");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(249, "p");
    \u0275\u0275text(250, "Cotonou, B\xE9nin");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(251, "a", 75);
    \u0275\u0275text(252, "+229 016 349 2848");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(253, "a", 76);
    \u0275\u0275text(254, "facile.gaz@gmail.com");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(255, "div", 77)(256, "p");
    \u0275\u0275text(257, "\xA9 2026 GazFacile. Tous droits r\xE9serv\xE9s.");
    \u0275\u0275elementEnd()()()()();
  }
}
var HomeComponent = class _HomeComponent {
  constructor() {
    this.revendeurService = inject(RevendeurService);
    this.authService = inject(AuthService);
    this.consultationService = inject(ConsultationService);
    this.dialog = inject(MatDialog);
    this.snackBar = inject(MatSnackBar);
    this.carteVisible = signal(false);
  }
  ngOnInit() {
    if (this.authService.estConnecte()) {
      this.revendeurService.loadAll();
    }
  }
  togglerCarte() {
    this.carteVisible.set(!this.carteVisible());
  }
  onRevendeurSelectionne(revendeurId) {
    if (!this.carteVisible()) {
      this.carteVisible.set(true);
      setTimeout(() => this.carteRef?.focusRevendeur(revendeurId), 300);
    } else {
      this.carteRef?.focusRevendeur(revendeurId);
    }
  }
  ouvrirDialogCommande(revendeur) {
    const dialogRef = this.dialog.open(CommandeFormComponent, {
      data: { revendeur },
      width: "540px",
      maxWidth: "95vw",
      panelClass: "dialog-gaz"
    });
    dialogRef.afterClosed().subscribe((commande) => {
      if (commande) {
        this.snackBar.open(`Commande confirm\xE9e ! R\xE9f\xE9rence : ${commande.id?.substring(0, 8).toUpperCase()}`, "OK", { duration: 5e3 });
      }
    });
  }
  static {
    this.\u0275fac = function HomeComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _HomeComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeComponent, selectors: [["app-home"]], viewQuery: function HomeComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c04, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.carteRef = _t.first);
      }
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 2, vars: 1, consts: [["carteRef", ""], [1, "page-accueil"], [1, "landing"], [1, "heros"], [1, "heros-contenu"], [1, "heros-surtitre"], [1, "heros-titre"], [1, "accent"], [1, "heros-desc"], [1, "marques-logos"], [1, "marque-badge"], [1, "quota-bande"], [1, "vue-principale"], [1, "panneau-carte"], [1, "panneau-liste"], [3, "toggleCarte", "revendeurSelectionne", "commanderRevendeur", "carteVisible"], [3, "commanderClique", "revendeursSignal"], [1, "landing-hero"], [1, "hero-inner"], [1, "hero-label"], [1, "hero-titre"], [1, "hero-desc"], [1, "hero-actions"], ["routerLink", "/auth/register", 1, "btn-hero", "btn-primary"], ["routerLink", "/auth/login", 1, "btn-hero", "btn-secondary"], [1, "hero-note"], [1, "hero-visual"], [1, "visual-blur"], [1, "fake-map"], [1, "fake-pin", 2, "top", "30%", "left", "40%"], [1, "fake-pin", 2, "top", "50%", "left", "60%"], [1, "fake-pin", 2, "top", "35%", "left", "72%"], [1, "fake-pin", 2, "top", "65%", "left", "35%"], [1, "fake-pin", 2, "top", "45%", "left", "50%"], [1, "visual-overlay"], [1, "lock-icon"], [1, "section-comment"], [1, "section-inner"], [1, "section-titre"], [1, "section-sous-titre"], [1, "etapes"], [1, "etape"], [1, "etape-numero"], [1, "etape-icone"], [1, "etape-fleche"], [1, "section-avantages"], [1, "grille-avantages"], [1, "avantage"], [1, "section-confiance"], [1, "confiance-grille"], [1, "confiance-item"], [1, "confiance-chiffre"], [1, "confiance-label"], [1, "section-marques"], [1, "marques-grille"], [1, "marque-card"], [1, "marque-nom"], [1, "marque-info"], [1, "section-revendeur"], [1, "revendeur-bloc"], [1, "revendeur-texte"], [1, "revendeur-avantages"], [1, "revendeur-visual"], [1, "phone-mockup"], [1, "phone-header"], [1, "phone-dot"], [1, "phone-body"], [1, "mock-card"], [1, "section-cta"], [1, "landing-footer"], [1, "footer-grille"], [1, "footer-col"], ["src", "assets/logo.svg", "alt", "GazFacile", 1, "footer-logo"], ["routerLink", "/auth/register"], ["routerLink", "/auth/login"], ["href", "tel:+2290163492848"], ["href", "mailto:facile.gaz@gmail.com"], [1, "footer-bottom"]], template: function HomeComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, HomeComponent_Conditional_0_Template, 26, 5, "div", 1)(1, HomeComponent_Conditional_1_Template, 258, 0, "div", 2);
      }
      if (rf & 2) {
        \u0275\u0275conditional(ctx.authService.estConnecte() ? 0 : 1);
      }
    }, dependencies: [
      CommonModule,
      DatePipe,
      RouterLink,
      MatDialogModule,
      MatSnackBarModule,
      MatButtonModule,
      MatIconModule,
      MatIcon,
      MapComponent,
      RevendeurListComponent
    ], styles: ['\n\n.page-accueil[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: calc(100vh - 64px);\n}\n.heros[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n  padding: 24px 32px 20px;\n  flex-shrink: 0;\n}\n.heros-contenu[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.heros-surtitre[_ngcontent-%COMP%] {\n  font-family: "Montserrat", sans-serif;\n  font-size: 0.7rem;\n  font-weight: 600;\n  letter-spacing: 0.14em;\n  color: rgba(255, 255, 255, 0.6);\n  text-transform: uppercase;\n  margin-bottom: 6px;\n}\n.heros-titre[_ngcontent-%COMP%] {\n  font-family: "Montserrat", sans-serif;\n  font-size: 2rem;\n  font-weight: 400;\n  color: #FFFFFF;\n  line-height: 1.15;\n  margin-bottom: 8px;\n  .accent {\n    color: var(--color-accent);\n  }\n}\n.heros-desc[_ngcontent-%COMP%] {\n  font-family: "Montserrat", sans-serif;\n  font-size: 0.85rem;\n  color: rgba(255, 255, 255, 0.7);\n  margin-bottom: 14px;\n  line-height: 1.5;\n}\n.marques-logos[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n}\n.marque-badge[_ngcontent-%COMP%] {\n  background-color: rgba(255, 255, 255, 0.12);\n  color: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(255, 255, 255, 0.25);\n  padding: 4px 12px;\n  font-family: "Montserrat", sans-serif;\n  font-size: 0.72rem;\n  font-weight: 600;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  border-radius: var(--radius-sm);\n}\n.vue-principale[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1;\n  overflow: hidden;\n}\n.quota-bande[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 32px;\n  background: color-mix(in srgb, var(--color-accent) 20%, var(--color-primary));\n  color: rgba(255, 255, 255, 0.95);\n  font-family: "Montserrat", sans-serif;\n  font-size: 0.78rem;\n  font-weight: 600;\n  flex-shrink: 0;\n  mat-icon {\n    font-size: 1rem;\n    width: 1rem;\n    height: 1rem;\n    flex-shrink: 0;\n  }\n}\n.panneau-carte[_ngcontent-%COMP%] {\n  flex: 0 0 60%;\n  max-width: 60%;\n  height: 100%;\n}\n.panneau-liste[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  height: 100%;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  background-color: var(--color-surface);\n  &.avec-carte {\n    border-left: 2px solid var(--color-border);\n  }\n}\n@media (max-width: 900px) {\n  .page-accueil[_ngcontent-%COMP%] {\n    height: auto;\n  }\n  .vue-principale[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .panneau-carte[_ngcontent-%COMP%] {\n    flex: 0 0 50vh;\n    max-width: 100%;\n    height: 50vh;\n  }\n  .panneau-liste[_ngcontent-%COMP%] {\n    flex: 1;\n    max-width: 100%;\n    height: auto;\n    min-height: 400px;\n  }\n  .panneau-liste.avec-carte[_ngcontent-%COMP%] {\n    border-top: 2px solid var(--color-border);\n  }\n  .heros-titre[_ngcontent-%COMP%] {\n    font-size: 1.6rem;\n  }\n}\n@media (max-width: 480px) {\n  .heros[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .heros-titre[_ngcontent-%COMP%] {\n    font-size: 1.3rem;\n  }\n  .heros-desc[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .marques-logos[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.landing[_ngcontent-%COMP%] {\n  background: var(--color-bg);\n}\n.landing-hero[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      160deg,\n      var(--color-primary) 0%,\n      var(--color-primary-dark, #1a365d) 100%);\n  padding: 80px 24px 60px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 60px;\n  flex-wrap: wrap;\n}\n.hero-inner[_ngcontent-%COMP%] {\n  max-width: 520px;\n}\n.hero-label[_ngcontent-%COMP%] {\n  font-family: "Montserrat", sans-serif;\n  font-size: 0.75rem;\n  font-weight: 700;\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n  color: var(--color-accent);\n  margin-bottom: 16px;\n}\n.hero-titre[_ngcontent-%COMP%] {\n  font-family: "Montserrat", sans-serif;\n  font-size: 2.6rem;\n  font-weight: 800;\n  color: #fff;\n  line-height: 1.15;\n  margin-bottom: 20px;\n  .accent {\n    color: var(--color-accent);\n  }\n}\n.hero-desc[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n  color: rgba(255, 255, 255, 0.8);\n  line-height: 1.7;\n  margin-bottom: 32px;\n}\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 14px;\n  flex-wrap: wrap;\n}\n.btn-hero[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 14px 32px;\n  border-radius: 8px;\n  font-family: "Montserrat", sans-serif;\n  font-size: 0.95rem;\n  font-weight: 700;\n  text-decoration: none;\n  transition: all 0.2s;\n  cursor: pointer;\n  border: none;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: var(--color-accent);\n  color: #1a1a00;\n  &:hover {\n    background: #e6a817;\n    transform: translateY(-2px);\n    box-shadow: 0 8px 24px rgba(249, 196, 3, 0.3);\n  }\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.12);\n  color: #fff;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  &:hover {\n    background: rgba(255, 255, 255, 0.2);\n    border-color: rgba(255, 255, 255, 0.5);\n  }\n}\n.hero-note[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: rgba(255, 255, 255, 0.5);\n  margin-top: 16px;\n}\n.hero-visual[_ngcontent-%COMP%] {\n  width: 400px;\n  max-width: 100%;\n}\n.visual-blur[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  aspect-ratio: 4/3;\n  border-radius: 16px;\n  overflow: hidden;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n}\n.fake-map[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      135deg,\n      #e8f4e8 0%,\n      #d4e8d4 30%,\n      #c8dcc8 60%,\n      #b8d0b8 100%);\n  filter: blur(3px);\n}\n.fake-pin[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 14px;\n  height: 14px;\n  background: var(--color-primary);\n  border: 3px solid #fff;\n  border-radius: 50%;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);\n  &::after {\n    content: "";\n    position: absolute;\n    bottom: -6px;\n    left: 50%;\n    transform: translateX(-50%);\n    border-left: 5px solid transparent;\n    border-right: 5px solid transparent;\n    border-top: 6px solid var(--color-primary);\n  }\n}\n.visual-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  backdrop-filter: blur(4px);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  color: #fff;\n  p {\n    font-size: 0.9rem;\n    font-weight: 600;\n    text-align: center;\n  }\n}\n.lock-icon[_ngcontent-%COMP%] {\n  font-size: 3rem !important;\n  width: 3rem !important;\n  height: 3rem !important;\n  color: rgba(255, 255, 255, 0.8);\n}\n.section-inner[_ngcontent-%COMP%] {\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 0 24px;\n}\n.section-titre[_ngcontent-%COMP%] {\n  font-family: "Montserrat", sans-serif;\n  font-size: 1.8rem;\n  font-weight: 800;\n  color: var(--color-text);\n  text-align: center;\n  margin-bottom: 8px;\n}\n.section-sous-titre[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--color-text-muted);\n  font-size: 0.95rem;\n  margin-bottom: 48px;\n}\n.section-comment[_ngcontent-%COMP%] {\n  padding: 80px 24px;\n  background: var(--color-surface);\n}\n.etapes[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.etape[_ngcontent-%COMP%] {\n  text-align: center;\n  max-width: 260px;\n  position: relative;\n}\n.etape-numero[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -12px;\n  right: -8px;\n  width: 28px;\n  height: 28px;\n  background: var(--color-accent);\n  color: #1a1a00;\n  font-family: "Montserrat", sans-serif;\n  font-weight: 800;\n  font-size: 0.8rem;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1;\n}\n.etape-icone[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n  border-radius: 50%;\n  background: color-mix(in srgb, var(--color-primary) 10%, transparent);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto 16px;\n  mat-icon {\n    font-size: 2rem;\n    width: 2rem;\n    height: 2rem;\n    color: var(--color-primary);\n  }\n}\n.etape[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-family: "Montserrat", sans-serif;\n  font-size: 1rem;\n  font-weight: 700;\n  color: var(--color-text);\n  margin-bottom: 8px;\n}\n.etape[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--color-text-muted);\n  line-height: 1.5;\n}\n.etape-fleche[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding-top: 30px;\n  color: var(--color-primary);\n  opacity: 0.3;\n  mat-icon {\n    font-size: 2rem;\n    width: 2rem;\n    height: 2rem;\n  }\n}\n.section-avantages[_ngcontent-%COMP%] {\n  padding: 80px 24px;\n  background: var(--color-bg);\n}\n.grille-avantages[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 32px;\n}\n.avantage[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 32px 24px;\n  border-radius: 12px;\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  transition: transform 0.2s, box-shadow 0.2s;\n  &:hover {\n    transform: translateY(-4px);\n    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);\n  }\n  mat-icon {\n    font-size: 2.5rem;\n    width: 2.5rem;\n    height: 2.5rem;\n    color: var(--color-primary);\n    margin-bottom: 16px;\n  }\n  h3 {\n    font-family: "Montserrat", sans-serif;\n    font-size: 1rem;\n    font-weight: 700;\n    color: var(--color-text);\n    margin-bottom: 8px;\n  }\n  p {\n    font-size: 0.85rem;\n    color: var(--color-text-muted);\n    line-height: 1.5;\n  }\n}\n.section-confiance[_ngcontent-%COMP%] {\n  padding: 60px 24px;\n  background: var(--color-primary);\n}\n.confiance-grille[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 60px;\n  flex-wrap: wrap;\n}\n.confiance-item[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.confiance-chiffre[_ngcontent-%COMP%] {\n  display: block;\n  font-family: "Montserrat", sans-serif;\n  font-size: 2.5rem;\n  font-weight: 800;\n  color: var(--color-accent);\n}\n.confiance-label[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: rgba(255, 255, 255, 0.8);\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  font-weight: 600;\n}\n.section-marques[_ngcontent-%COMP%] {\n  padding: 80px 24px;\n  background: var(--color-surface);\n}\n.marques-grille[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 20px;\n  margin-top: 40px;\n}\n.marque-card[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 28px 16px;\n  border: 2px solid var(--color-border);\n  border-radius: 12px;\n  transition: border-color 0.2s;\n  &:hover {\n    border-color: var(--color-primary);\n  }\n}\n.marque-nom[_ngcontent-%COMP%] {\n  display: block;\n  font-family: "Montserrat", sans-serif;\n  font-size: 1.1rem;\n  font-weight: 800;\n  color: var(--color-text);\n  margin-bottom: 8px;\n}\n.marque-info[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--color-text-muted);\n}\n.section-revendeur[_ngcontent-%COMP%] {\n  padding: 80px 24px;\n  background: var(--color-bg);\n}\n.revendeur-bloc[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 60px;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n.revendeur-texte[_ngcontent-%COMP%] {\n  max-width: 480px;\n  h2 {\n    font-family: "Montserrat", sans-serif;\n    font-size: 1.6rem;\n    font-weight: 800;\n    color: var(--color-text);\n    margin-bottom: 16px;\n  }\n  > p {\n    font-size: 0.95rem;\n    color: var(--color-text-muted);\n    line-height: 1.7;\n    margin-bottom: 24px;\n  }\n}\n.revendeur-avantages[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0 0 32px;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  li {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    font-size: 0.9rem;\n    color: var(--color-text);\n    mat-icon {\n      color: var(--color-primary);\n      font-size: 1.2rem;\n      width: 1.2rem;\n      height: 1.2rem;\n    }\n  }\n}\n.phone-mockup[_ngcontent-%COMP%] {\n  width: 260px;\n  background: var(--color-surface);\n  border-radius: 24px;\n  border: 3px solid var(--color-border);\n  overflow: hidden;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);\n}\n.phone-header[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  padding: 12px 16px;\n  display: flex;\n  gap: 6px;\n}\n.phone-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.3);\n}\n.phone-body[_ngcontent-%COMP%] {\n  padding: 20px 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.mock-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 14px 16px;\n  background: color-mix(in srgb, var(--color-primary) 6%, transparent);\n  border-radius: 10px;\n  border: 1px solid var(--color-border);\n  mat-icon {\n    color: var(--color-primary);\n  }\n  span {\n    font-family: "Montserrat", sans-serif;\n    font-weight: 600;\n    font-size: 0.88rem;\n    color: var(--color-text);\n  }\n}\n.section-cta[_ngcontent-%COMP%] {\n  padding: 80px 24px;\n  background:\n    linear-gradient(\n      160deg,\n      var(--color-primary) 0%,\n      var(--color-primary-dark, #1a365d) 100%);\n  text-align: center;\n  h2 {\n    font-family: "Montserrat", sans-serif;\n    font-size: 2rem;\n    font-weight: 800;\n    color: #fff;\n    margin-bottom: 12px;\n  }\n  p {\n    font-size: 1rem;\n    color: rgba(255, 255, 255, 0.7);\n    margin-bottom: 32px;\n  }\n  .hero-actions {\n    justify-content: center;\n  }\n}\n.landing-footer[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: rgba(255, 255, 255, 0.7);\n  padding: 48px 24px 24px;\n}\n.footer-grille[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 2fr 1fr 1fr;\n  gap: 40px;\n  margin-bottom: 32px;\n}\n.footer-logo[_ngcontent-%COMP%] {\n  height: 32px;\n  margin-bottom: 12px;\n  filter: brightness(0) invert(1);\n}\n.footer-col[_ngcontent-%COMP%] {\n  p {\n    font-size: 0.85rem;\n    line-height: 1.6;\n    margin: 0 0 6px;\n  }\n  h4 {\n    font-family: "Montserrat", sans-serif;\n    font-size: 0.85rem;\n    font-weight: 700;\n    color: #fff;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    margin-bottom: 16px;\n  }\n  a {\n    display: block;\n    color: rgba(255, 255, 255, 0.6);\n    font-size: 0.85rem;\n    margin-bottom: 8px;\n    text-decoration: none;\n    transition: color 0.2s;\n    &:hover {\n      color: var(--color-accent);\n    }\n  }\n}\n.footer-bottom[_ngcontent-%COMP%] {\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n  padding-top: 20px;\n  text-align: center;\n  p {\n    font-size: 0.78rem;\n    color: rgba(255, 255, 255, 0.4);\n    margin: 0;\n  }\n}\n@media (max-width: 900px) {\n  .hero-titre[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n  .hero-visual[_ngcontent-%COMP%] {\n    width: 340px;\n  }\n  .grille-avantages[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .marques-grille[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .footer-grille[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .etape-fleche[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media (max-width: 600px) {\n  .landing-hero[_ngcontent-%COMP%] {\n    padding: 48px 16px 40px;\n  }\n  .hero-titre[_ngcontent-%COMP%] {\n    font-size: 1.6rem;\n  }\n  .hero-desc[_ngcontent-%COMP%] {\n    font-size: 0.9rem;\n  }\n  .hero-visual[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .btn-hero[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: center;\n    padding: 14px 20px;\n  }\n  .grille-avantages[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .marques-grille[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .confiance-grille[_ngcontent-%COMP%] {\n    gap: 30px;\n  }\n  .confiance-chiffre[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n  .section-titre[_ngcontent-%COMP%] {\n    font-size: 1.4rem;\n  }\n  .section-cta[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .revendeur-bloc[_ngcontent-%COMP%] {\n    gap: 32px;\n  }\n  .phone-mockup[_ngcontent-%COMP%] {\n    width: 220px;\n  }\n}\n/*# sourceMappingURL=home.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomeComponent, { className: "HomeComponent", filePath: "src/app/features/home/home.component.ts", lineNumber: 1100 });
})();
export {
  HomeComponent
};
//# sourceMappingURL=chunk-KOJRD5E5.js.map
