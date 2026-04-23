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
  MatSelect,
  MatSelectModule,
  MatTooltip,
  MatTooltipModule
} from "./chunk-LA4LZMVU.js";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
} from "./chunk-F6R477Z4.js";
import {
  MatChipsModule
} from "./chunk-U6JHCC4C.js";
import {
  CdkPortal,
  CdkPortalOutlet,
  CdkScrollable,
  MatSnackBar,
  MatSnackBarModule,
  TemplatePortal,
  ViewportRuler
} from "./chunk-OX2RSX6O.js";
import {
  AuthService
} from "./chunk-E64KMFYK.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatInput,
  MatInputModule,
  MatLabel,
  MatPrefix,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NumberValueAccessor,
  ReactiveFormsModule,
  SharedResizeObserver,
  Validators,
  ɵNgNoValidate
} from "./chunk-74R6PC7A.js";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "./chunk-RNMXRL3Z.js";
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
import "./chunk-C43TOPVJ.js";
import {
  ANIMATION_MODULE_TYPE,
  Attribute,
  BehaviorSubject,
  CdkMonitorFocus,
  CdkObserveContent,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  CommonModule,
  Component,
  ComponentFactoryResolver$1,
  ContentChild,
  ContentChildren,
  DOCUMENT,
  DatePipe,
  DecimalPipe,
  Directionality,
  Directive,
  DomSanitizer,
  EMPTY,
  ENTER,
  ElementRef,
  EventEmitter,
  FocusKeyManager,
  FocusMonitor,
  HttpClient,
  Inject,
  InjectionToken,
  Injector,
  Input,
  MAT_RIPPLE_GLOBAL_OPTIONS,
  MatCommonModule,
  MatIcon,
  MatIconModule,
  MatOption,
  MatRipple,
  NgModule,
  NgZone,
  Observable,
  Optional,
  Output,
  Platform,
  QueryList,
  Renderer2,
  SPACE,
  Subject,
  Subscription,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation$1,
  __async,
  __commonJS,
  __toESM,
  afterNextRender,
  booleanAttribute,
  catchError,
  debounceTime,
  filter,
  forwardRef,
  fromEvent,
  hasModifierKey,
  inject,
  merge,
  normalizePassiveListenerOptions,
  numberAttribute,
  of,
  setClassMetadata,
  signal,
  skip,
  startWith,
  switchMap,
  takeUntil,
  throwError,
  timer,
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
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinjectAttribute,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
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
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-XDS62WGT.js";

// node_modules/qrcode/lib/can-promise.js
var require_can_promise = __commonJS({
  "node_modules/qrcode/lib/can-promise.js"(exports, module) {
    "use strict";
    module.exports = function() {
      return typeof Promise === "function" && Promise.prototype && Promise.prototype.then;
    };
  }
});

// node_modules/qrcode/lib/core/utils.js
var require_utils = __commonJS({
  "node_modules/qrcode/lib/core/utils.js"(exports) {
    "use strict";
    var toSJISFunction;
    var CODEWORDS_COUNT = [
      0,
      // Not used
      26,
      44,
      70,
      100,
      134,
      172,
      196,
      242,
      292,
      346,
      404,
      466,
      532,
      581,
      655,
      733,
      815,
      901,
      991,
      1085,
      1156,
      1258,
      1364,
      1474,
      1588,
      1706,
      1828,
      1921,
      2051,
      2185,
      2323,
      2465,
      2611,
      2761,
      2876,
      3034,
      3196,
      3362,
      3532,
      3706
    ];
    exports.getSymbolSize = function getSymbolSize(version) {
      if (!version) throw new Error('"version" cannot be null or undefined');
      if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40');
      return version * 4 + 17;
    };
    exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
      return CODEWORDS_COUNT[version];
    };
    exports.getBCHDigit = function(data) {
      let digit = 0;
      while (data !== 0) {
        digit++;
        data >>>= 1;
      }
      return digit;
    };
    exports.setToSJISFunction = function setToSJISFunction(f) {
      if (typeof f !== "function") {
        throw new Error('"toSJISFunc" is not a valid function.');
      }
      toSJISFunction = f;
    };
    exports.isKanjiModeEnabled = function() {
      return typeof toSJISFunction !== "undefined";
    };
    exports.toSJIS = function toSJIS(kanji) {
      return toSJISFunction(kanji);
    };
  }
});

// node_modules/qrcode/lib/core/error-correction-level.js
var require_error_correction_level = __commonJS({
  "node_modules/qrcode/lib/core/error-correction-level.js"(exports) {
    "use strict";
    exports.L = {
      bit: 1
    };
    exports.M = {
      bit: 0
    };
    exports.Q = {
      bit: 3
    };
    exports.H = {
      bit: 2
    };
    function fromString(string) {
      if (typeof string !== "string") {
        throw new Error("Param is not a string");
      }
      const lcStr = string.toLowerCase();
      switch (lcStr) {
        case "l":
        case "low":
          return exports.L;
        case "m":
        case "medium":
          return exports.M;
        case "q":
        case "quartile":
          return exports.Q;
        case "h":
        case "high":
          return exports.H;
        default:
          throw new Error("Unknown EC Level: " + string);
      }
    }
    exports.isValid = function isValid(level) {
      return level && typeof level.bit !== "undefined" && level.bit >= 0 && level.bit < 4;
    };
    exports.from = function from(value, defaultValue) {
      if (exports.isValid(value)) {
        return value;
      }
      try {
        return fromString(value);
      } catch (e) {
        return defaultValue;
      }
    };
  }
});

// node_modules/qrcode/lib/core/bit-buffer.js
var require_bit_buffer = __commonJS({
  "node_modules/qrcode/lib/core/bit-buffer.js"(exports, module) {
    "use strict";
    function BitBuffer() {
      this.buffer = [];
      this.length = 0;
    }
    BitBuffer.prototype = {
      get: function(index) {
        const bufIndex = Math.floor(index / 8);
        return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
      },
      put: function(num, length) {
        for (let i = 0; i < length; i++) {
          this.putBit((num >>> length - i - 1 & 1) === 1);
        }
      },
      getLengthInBits: function() {
        return this.length;
      },
      putBit: function(bit) {
        const bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) {
          this.buffer.push(0);
        }
        if (bit) {
          this.buffer[bufIndex] |= 128 >>> this.length % 8;
        }
        this.length++;
      }
    };
    module.exports = BitBuffer;
  }
});

// node_modules/qrcode/lib/core/bit-matrix.js
var require_bit_matrix = __commonJS({
  "node_modules/qrcode/lib/core/bit-matrix.js"(exports, module) {
    "use strict";
    function BitMatrix(size) {
      if (!size || size < 1) {
        throw new Error("BitMatrix size must be defined and greater than 0");
      }
      this.size = size;
      this.data = new Uint8Array(size * size);
      this.reservedBit = new Uint8Array(size * size);
    }
    BitMatrix.prototype.set = function(row, col, value, reserved) {
      const index = row * this.size + col;
      this.data[index] = value;
      if (reserved) this.reservedBit[index] = true;
    };
    BitMatrix.prototype.get = function(row, col) {
      return this.data[row * this.size + col];
    };
    BitMatrix.prototype.xor = function(row, col, value) {
      this.data[row * this.size + col] ^= value;
    };
    BitMatrix.prototype.isReserved = function(row, col) {
      return this.reservedBit[row * this.size + col];
    };
    module.exports = BitMatrix;
  }
});

// node_modules/qrcode/lib/core/alignment-pattern.js
var require_alignment_pattern = __commonJS({
  "node_modules/qrcode/lib/core/alignment-pattern.js"(exports) {
    "use strict";
    var getSymbolSize = require_utils().getSymbolSize;
    exports.getRowColCoords = function getRowColCoords(version) {
      if (version === 1) return [];
      const posCount = Math.floor(version / 7) + 2;
      const size = getSymbolSize(version);
      const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
      const positions = [size - 7];
      for (let i = 1; i < posCount - 1; i++) {
        positions[i] = positions[i - 1] - intervals;
      }
      positions.push(6);
      return positions.reverse();
    };
    exports.getPositions = function getPositions(version) {
      const coords = [];
      const pos = exports.getRowColCoords(version);
      const posLength = pos.length;
      for (let i = 0; i < posLength; i++) {
        for (let j = 0; j < posLength; j++) {
          if (i === 0 && j === 0 || // top-left
          i === 0 && j === posLength - 1 || // bottom-left
          i === posLength - 1 && j === 0) {
            continue;
          }
          coords.push([pos[i], pos[j]]);
        }
      }
      return coords;
    };
  }
});

// node_modules/qrcode/lib/core/finder-pattern.js
var require_finder_pattern = __commonJS({
  "node_modules/qrcode/lib/core/finder-pattern.js"(exports) {
    "use strict";
    var getSymbolSize = require_utils().getSymbolSize;
    var FINDER_PATTERN_SIZE = 7;
    exports.getPositions = function getPositions(version) {
      const size = getSymbolSize(version);
      return [
        // top-left
        [0, 0],
        // top-right
        [size - FINDER_PATTERN_SIZE, 0],
        // bottom-left
        [0, size - FINDER_PATTERN_SIZE]
      ];
    };
  }
});

// node_modules/qrcode/lib/core/mask-pattern.js
var require_mask_pattern = __commonJS({
  "node_modules/qrcode/lib/core/mask-pattern.js"(exports) {
    "use strict";
    exports.Patterns = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7
    };
    var PenaltyScores = {
      N1: 3,
      N2: 3,
      N3: 40,
      N4: 10
    };
    exports.isValid = function isValid(mask) {
      return mask != null && mask !== "" && !isNaN(mask) && mask >= 0 && mask <= 7;
    };
    exports.from = function from(value) {
      return exports.isValid(value) ? parseInt(value, 10) : void 0;
    };
    exports.getPenaltyN1 = function getPenaltyN1(data) {
      const size = data.size;
      let points = 0;
      let sameCountCol = 0;
      let sameCountRow = 0;
      let lastCol = null;
      let lastRow = null;
      for (let row = 0; row < size; row++) {
        sameCountCol = sameCountRow = 0;
        lastCol = lastRow = null;
        for (let col = 0; col < size; col++) {
          let module2 = data.get(row, col);
          if (module2 === lastCol) {
            sameCountCol++;
          } else {
            if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
            lastCol = module2;
            sameCountCol = 1;
          }
          module2 = data.get(col, row);
          if (module2 === lastRow) {
            sameCountRow++;
          } else {
            if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
            lastRow = module2;
            sameCountRow = 1;
          }
        }
        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
      }
      return points;
    };
    exports.getPenaltyN2 = function getPenaltyN2(data) {
      const size = data.size;
      let points = 0;
      for (let row = 0; row < size - 1; row++) {
        for (let col = 0; col < size - 1; col++) {
          const last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
          if (last === 4 || last === 0) points++;
        }
      }
      return points * PenaltyScores.N2;
    };
    exports.getPenaltyN3 = function getPenaltyN3(data) {
      const size = data.size;
      let points = 0;
      let bitsCol = 0;
      let bitsRow = 0;
      for (let row = 0; row < size; row++) {
        bitsCol = bitsRow = 0;
        for (let col = 0; col < size; col++) {
          bitsCol = bitsCol << 1 & 2047 | data.get(row, col);
          if (col >= 10 && (bitsCol === 1488 || bitsCol === 93)) points++;
          bitsRow = bitsRow << 1 & 2047 | data.get(col, row);
          if (col >= 10 && (bitsRow === 1488 || bitsRow === 93)) points++;
        }
      }
      return points * PenaltyScores.N3;
    };
    exports.getPenaltyN4 = function getPenaltyN4(data) {
      let darkCount = 0;
      const modulesCount = data.data.length;
      for (let i = 0; i < modulesCount; i++) darkCount += data.data[i];
      const k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
      return k * PenaltyScores.N4;
    };
    function getMaskAt(maskPattern, i, j) {
      switch (maskPattern) {
        case exports.Patterns.PATTERN000:
          return (i + j) % 2 === 0;
        case exports.Patterns.PATTERN001:
          return i % 2 === 0;
        case exports.Patterns.PATTERN010:
          return j % 3 === 0;
        case exports.Patterns.PATTERN011:
          return (i + j) % 3 === 0;
        case exports.Patterns.PATTERN100:
          return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
        case exports.Patterns.PATTERN101:
          return i * j % 2 + i * j % 3 === 0;
        case exports.Patterns.PATTERN110:
          return (i * j % 2 + i * j % 3) % 2 === 0;
        case exports.Patterns.PATTERN111:
          return (i * j % 3 + (i + j) % 2) % 2 === 0;
        default:
          throw new Error("bad maskPattern:" + maskPattern);
      }
    }
    exports.applyMask = function applyMask(pattern, data) {
      const size = data.size;
      for (let col = 0; col < size; col++) {
        for (let row = 0; row < size; row++) {
          if (data.isReserved(row, col)) continue;
          data.xor(row, col, getMaskAt(pattern, row, col));
        }
      }
    };
    exports.getBestMask = function getBestMask(data, setupFormatFunc) {
      const numPatterns = Object.keys(exports.Patterns).length;
      let bestPattern = 0;
      let lowerPenalty = Infinity;
      for (let p = 0; p < numPatterns; p++) {
        setupFormatFunc(p);
        exports.applyMask(p, data);
        const penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);
        exports.applyMask(p, data);
        if (penalty < lowerPenalty) {
          lowerPenalty = penalty;
          bestPattern = p;
        }
      }
      return bestPattern;
    };
  }
});

// node_modules/qrcode/lib/core/error-correction-code.js
var require_error_correction_code = __commonJS({
  "node_modules/qrcode/lib/core/error-correction-code.js"(exports) {
    "use strict";
    var ECLevel = require_error_correction_level();
    var EC_BLOCKS_TABLE = [
      // L  M  Q  H
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      2,
      2,
      1,
      2,
      2,
      4,
      1,
      2,
      4,
      4,
      2,
      4,
      4,
      4,
      2,
      4,
      6,
      5,
      2,
      4,
      6,
      6,
      2,
      5,
      8,
      8,
      4,
      5,
      8,
      8,
      4,
      5,
      8,
      11,
      4,
      8,
      10,
      11,
      4,
      9,
      12,
      16,
      4,
      9,
      16,
      16,
      6,
      10,
      12,
      18,
      6,
      10,
      17,
      16,
      6,
      11,
      16,
      19,
      6,
      13,
      18,
      21,
      7,
      14,
      21,
      25,
      8,
      16,
      20,
      25,
      8,
      17,
      23,
      25,
      9,
      17,
      23,
      34,
      9,
      18,
      25,
      30,
      10,
      20,
      27,
      32,
      12,
      21,
      29,
      35,
      12,
      23,
      34,
      37,
      12,
      25,
      34,
      40,
      13,
      26,
      35,
      42,
      14,
      28,
      38,
      45,
      15,
      29,
      40,
      48,
      16,
      31,
      43,
      51,
      17,
      33,
      45,
      54,
      18,
      35,
      48,
      57,
      19,
      37,
      51,
      60,
      19,
      38,
      53,
      63,
      20,
      40,
      56,
      66,
      21,
      43,
      59,
      70,
      22,
      45,
      62,
      74,
      24,
      47,
      65,
      77,
      25,
      49,
      68,
      81
    ];
    var EC_CODEWORDS_TABLE = [
      // L  M  Q  H
      7,
      10,
      13,
      17,
      10,
      16,
      22,
      28,
      15,
      26,
      36,
      44,
      20,
      36,
      52,
      64,
      26,
      48,
      72,
      88,
      36,
      64,
      96,
      112,
      40,
      72,
      108,
      130,
      48,
      88,
      132,
      156,
      60,
      110,
      160,
      192,
      72,
      130,
      192,
      224,
      80,
      150,
      224,
      264,
      96,
      176,
      260,
      308,
      104,
      198,
      288,
      352,
      120,
      216,
      320,
      384,
      132,
      240,
      360,
      432,
      144,
      280,
      408,
      480,
      168,
      308,
      448,
      532,
      180,
      338,
      504,
      588,
      196,
      364,
      546,
      650,
      224,
      416,
      600,
      700,
      224,
      442,
      644,
      750,
      252,
      476,
      690,
      816,
      270,
      504,
      750,
      900,
      300,
      560,
      810,
      960,
      312,
      588,
      870,
      1050,
      336,
      644,
      952,
      1110,
      360,
      700,
      1020,
      1200,
      390,
      728,
      1050,
      1260,
      420,
      784,
      1140,
      1350,
      450,
      812,
      1200,
      1440,
      480,
      868,
      1290,
      1530,
      510,
      924,
      1350,
      1620,
      540,
      980,
      1440,
      1710,
      570,
      1036,
      1530,
      1800,
      570,
      1064,
      1590,
      1890,
      600,
      1120,
      1680,
      1980,
      630,
      1204,
      1770,
      2100,
      660,
      1260,
      1860,
      2220,
      720,
      1316,
      1950,
      2310,
      750,
      1372,
      2040,
      2430
    ];
    exports.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
    exports.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
  }
});

// node_modules/qrcode/lib/core/galois-field.js
var require_galois_field = __commonJS({
  "node_modules/qrcode/lib/core/galois-field.js"(exports) {
    "use strict";
    var EXP_TABLE = new Uint8Array(512);
    var LOG_TABLE = new Uint8Array(256);
    (function initTables() {
      let x = 1;
      for (let i = 0; i < 255; i++) {
        EXP_TABLE[i] = x;
        LOG_TABLE[x] = i;
        x <<= 1;
        if (x & 256) {
          x ^= 285;
        }
      }
      for (let i = 255; i < 512; i++) {
        EXP_TABLE[i] = EXP_TABLE[i - 255];
      }
    })();
    exports.log = function log(n) {
      if (n < 1) throw new Error("log(" + n + ")");
      return LOG_TABLE[n];
    };
    exports.exp = function exp(n) {
      return EXP_TABLE[n];
    };
    exports.mul = function mul(x, y) {
      if (x === 0 || y === 0) return 0;
      return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
    };
  }
});

// node_modules/qrcode/lib/core/polynomial.js
var require_polynomial = __commonJS({
  "node_modules/qrcode/lib/core/polynomial.js"(exports) {
    "use strict";
    var GF = require_galois_field();
    exports.mul = function mul(p1, p2) {
      const coeff = new Uint8Array(p1.length + p2.length - 1);
      for (let i = 0; i < p1.length; i++) {
        for (let j = 0; j < p2.length; j++) {
          coeff[i + j] ^= GF.mul(p1[i], p2[j]);
        }
      }
      return coeff;
    };
    exports.mod = function mod(divident, divisor) {
      let result = new Uint8Array(divident);
      while (result.length - divisor.length >= 0) {
        const coeff = result[0];
        for (let i = 0; i < divisor.length; i++) {
          result[i] ^= GF.mul(divisor[i], coeff);
        }
        let offset = 0;
        while (offset < result.length && result[offset] === 0) offset++;
        result = result.slice(offset);
      }
      return result;
    };
    exports.generateECPolynomial = function generateECPolynomial(degree) {
      let poly = new Uint8Array([1]);
      for (let i = 0; i < degree; i++) {
        poly = exports.mul(poly, new Uint8Array([1, GF.exp(i)]));
      }
      return poly;
    };
  }
});

// node_modules/qrcode/lib/core/reed-solomon-encoder.js
var require_reed_solomon_encoder = __commonJS({
  "node_modules/qrcode/lib/core/reed-solomon-encoder.js"(exports, module) {
    "use strict";
    var Polynomial = require_polynomial();
    function ReedSolomonEncoder(degree) {
      this.genPoly = void 0;
      this.degree = degree;
      if (this.degree) this.initialize(this.degree);
    }
    ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
      this.degree = degree;
      this.genPoly = Polynomial.generateECPolynomial(this.degree);
    };
    ReedSolomonEncoder.prototype.encode = function encode(data) {
      if (!this.genPoly) {
        throw new Error("Encoder not initialized");
      }
      const paddedData = new Uint8Array(data.length + this.degree);
      paddedData.set(data);
      const remainder = Polynomial.mod(paddedData, this.genPoly);
      const start = this.degree - remainder.length;
      if (start > 0) {
        const buff = new Uint8Array(this.degree);
        buff.set(remainder, start);
        return buff;
      }
      return remainder;
    };
    module.exports = ReedSolomonEncoder;
  }
});

// node_modules/qrcode/lib/core/version-check.js
var require_version_check = __commonJS({
  "node_modules/qrcode/lib/core/version-check.js"(exports) {
    "use strict";
    exports.isValid = function isValid(version) {
      return !isNaN(version) && version >= 1 && version <= 40;
    };
  }
});

// node_modules/qrcode/lib/core/regex.js
var require_regex = __commonJS({
  "node_modules/qrcode/lib/core/regex.js"(exports) {
    "use strict";
    var numeric = "[0-9]+";
    var alphanumeric = "[A-Z $%*+\\-./:]+";
    var kanji = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
    kanji = kanji.replace(/u/g, "\\u");
    var byte = "(?:(?![A-Z0-9 $%*+\\-./:]|" + kanji + ")(?:.|[\r\n]))+";
    exports.KANJI = new RegExp(kanji, "g");
    exports.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
    exports.BYTE = new RegExp(byte, "g");
    exports.NUMERIC = new RegExp(numeric, "g");
    exports.ALPHANUMERIC = new RegExp(alphanumeric, "g");
    var TEST_KANJI = new RegExp("^" + kanji + "$");
    var TEST_NUMERIC = new RegExp("^" + numeric + "$");
    var TEST_ALPHANUMERIC = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
    exports.testKanji = function testKanji(str) {
      return TEST_KANJI.test(str);
    };
    exports.testNumeric = function testNumeric(str) {
      return TEST_NUMERIC.test(str);
    };
    exports.testAlphanumeric = function testAlphanumeric(str) {
      return TEST_ALPHANUMERIC.test(str);
    };
  }
});

// node_modules/qrcode/lib/core/mode.js
var require_mode = __commonJS({
  "node_modules/qrcode/lib/core/mode.js"(exports) {
    "use strict";
    var VersionCheck = require_version_check();
    var Regex = require_regex();
    exports.NUMERIC = {
      id: "Numeric",
      bit: 1 << 0,
      ccBits: [10, 12, 14]
    };
    exports.ALPHANUMERIC = {
      id: "Alphanumeric",
      bit: 1 << 1,
      ccBits: [9, 11, 13]
    };
    exports.BYTE = {
      id: "Byte",
      bit: 1 << 2,
      ccBits: [8, 16, 16]
    };
    exports.KANJI = {
      id: "Kanji",
      bit: 1 << 3,
      ccBits: [8, 10, 12]
    };
    exports.MIXED = {
      bit: -1
    };
    exports.getCharCountIndicator = function getCharCountIndicator(mode, version) {
      if (!mode.ccBits) throw new Error("Invalid mode: " + mode);
      if (!VersionCheck.isValid(version)) {
        throw new Error("Invalid version: " + version);
      }
      if (version >= 1 && version < 10) return mode.ccBits[0];
      else if (version < 27) return mode.ccBits[1];
      return mode.ccBits[2];
    };
    exports.getBestModeForData = function getBestModeForData(dataStr) {
      if (Regex.testNumeric(dataStr)) return exports.NUMERIC;
      else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC;
      else if (Regex.testKanji(dataStr)) return exports.KANJI;
      else return exports.BYTE;
    };
    exports.toString = function toString2(mode) {
      if (mode && mode.id) return mode.id;
      throw new Error("Invalid mode");
    };
    exports.isValid = function isValid(mode) {
      return mode && mode.bit && mode.ccBits;
    };
    function fromString(string) {
      if (typeof string !== "string") {
        throw new Error("Param is not a string");
      }
      const lcStr = string.toLowerCase();
      switch (lcStr) {
        case "numeric":
          return exports.NUMERIC;
        case "alphanumeric":
          return exports.ALPHANUMERIC;
        case "kanji":
          return exports.KANJI;
        case "byte":
          return exports.BYTE;
        default:
          throw new Error("Unknown mode: " + string);
      }
    }
    exports.from = function from(value, defaultValue) {
      if (exports.isValid(value)) {
        return value;
      }
      try {
        return fromString(value);
      } catch (e) {
        return defaultValue;
      }
    };
  }
});

// node_modules/qrcode/lib/core/version.js
var require_version = __commonJS({
  "node_modules/qrcode/lib/core/version.js"(exports) {
    "use strict";
    var Utils = require_utils();
    var ECCode = require_error_correction_code();
    var ECLevel = require_error_correction_level();
    var Mode = require_mode();
    var VersionCheck = require_version_check();
    var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
    var G18_BCH = Utils.getBCHDigit(G18);
    function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
      for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
          return currentVersion;
        }
      }
      return void 0;
    }
    function getReservedBitsCount(mode, version) {
      return Mode.getCharCountIndicator(mode, version) + 4;
    }
    function getTotalBitsFromDataArray(segments, version) {
      let totalBits = 0;
      segments.forEach(function(data) {
        const reservedBits = getReservedBitsCount(data.mode, version);
        totalBits += reservedBits + data.getBitsLength();
      });
      return totalBits;
    }
    function getBestVersionForMixedData(segments, errorCorrectionLevel) {
      for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
        const length = getTotalBitsFromDataArray(segments, currentVersion);
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
          return currentVersion;
        }
      }
      return void 0;
    }
    exports.from = function from(value, defaultValue) {
      if (VersionCheck.isValid(value)) {
        return parseInt(value, 10);
      }
      return defaultValue;
    };
    exports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {
      if (!VersionCheck.isValid(version)) {
        throw new Error("Invalid QR Code version");
      }
      if (typeof mode === "undefined") mode = Mode.BYTE;
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (mode === Mode.MIXED) return dataTotalCodewordsBits;
      const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);
      switch (mode) {
        case Mode.NUMERIC:
          return Math.floor(usableBits / 10 * 3);
        case Mode.ALPHANUMERIC:
          return Math.floor(usableBits / 11 * 2);
        case Mode.KANJI:
          return Math.floor(usableBits / 13);
        case Mode.BYTE:
        default:
          return Math.floor(usableBits / 8);
      }
    };
    exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
      let seg;
      const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);
      if (Array.isArray(data)) {
        if (data.length > 1) {
          return getBestVersionForMixedData(data, ecl);
        }
        if (data.length === 0) {
          return 1;
        }
        seg = data[0];
      } else {
        seg = data;
      }
      return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
    };
    exports.getEncodedBits = function getEncodedBits(version) {
      if (!VersionCheck.isValid(version) || version < 7) {
        throw new Error("Invalid QR Code version");
      }
      let d = version << 12;
      while (Utils.getBCHDigit(d) - G18_BCH >= 0) {
        d ^= G18 << Utils.getBCHDigit(d) - G18_BCH;
      }
      return version << 12 | d;
    };
  }
});

// node_modules/qrcode/lib/core/format-info.js
var require_format_info = __commonJS({
  "node_modules/qrcode/lib/core/format-info.js"(exports) {
    "use strict";
    var Utils = require_utils();
    var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
    var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
    var G15_BCH = Utils.getBCHDigit(G15);
    exports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
      const data = errorCorrectionLevel.bit << 3 | mask;
      let d = data << 10;
      while (Utils.getBCHDigit(d) - G15_BCH >= 0) {
        d ^= G15 << Utils.getBCHDigit(d) - G15_BCH;
      }
      return (data << 10 | d) ^ G15_MASK;
    };
  }
});

// node_modules/qrcode/lib/core/numeric-data.js
var require_numeric_data = __commonJS({
  "node_modules/qrcode/lib/core/numeric-data.js"(exports, module) {
    "use strict";
    var Mode = require_mode();
    function NumericData(data) {
      this.mode = Mode.NUMERIC;
      this.data = data.toString();
    }
    NumericData.getBitsLength = function getBitsLength(length) {
      return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
    };
    NumericData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    NumericData.prototype.getBitsLength = function getBitsLength() {
      return NumericData.getBitsLength(this.data.length);
    };
    NumericData.prototype.write = function write(bitBuffer) {
      let i, group, value;
      for (i = 0; i + 3 <= this.data.length; i += 3) {
        group = this.data.substr(i, 3);
        value = parseInt(group, 10);
        bitBuffer.put(value, 10);
      }
      const remainingNum = this.data.length - i;
      if (remainingNum > 0) {
        group = this.data.substr(i);
        value = parseInt(group, 10);
        bitBuffer.put(value, remainingNum * 3 + 1);
      }
    };
    module.exports = NumericData;
  }
});

// node_modules/qrcode/lib/core/alphanumeric-data.js
var require_alphanumeric_data = __commonJS({
  "node_modules/qrcode/lib/core/alphanumeric-data.js"(exports, module) {
    "use strict";
    var Mode = require_mode();
    var ALPHA_NUM_CHARS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ", "$", "%", "*", "+", "-", ".", "/", ":"];
    function AlphanumericData(data) {
      this.mode = Mode.ALPHANUMERIC;
      this.data = data;
    }
    AlphanumericData.getBitsLength = function getBitsLength(length) {
      return 11 * Math.floor(length / 2) + 6 * (length % 2);
    };
    AlphanumericData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    AlphanumericData.prototype.getBitsLength = function getBitsLength() {
      return AlphanumericData.getBitsLength(this.data.length);
    };
    AlphanumericData.prototype.write = function write(bitBuffer) {
      let i;
      for (i = 0; i + 2 <= this.data.length; i += 2) {
        let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;
        value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);
        bitBuffer.put(value, 11);
      }
      if (this.data.length % 2) {
        bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
      }
    };
    module.exports = AlphanumericData;
  }
});

// node_modules/qrcode/lib/core/byte-data.js
var require_byte_data = __commonJS({
  "node_modules/qrcode/lib/core/byte-data.js"(exports, module) {
    "use strict";
    var Mode = require_mode();
    function ByteData(data) {
      this.mode = Mode.BYTE;
      if (typeof data === "string") {
        this.data = new TextEncoder().encode(data);
      } else {
        this.data = new Uint8Array(data);
      }
    }
    ByteData.getBitsLength = function getBitsLength(length) {
      return length * 8;
    };
    ByteData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    ByteData.prototype.getBitsLength = function getBitsLength() {
      return ByteData.getBitsLength(this.data.length);
    };
    ByteData.prototype.write = function(bitBuffer) {
      for (let i = 0, l = this.data.length; i < l; i++) {
        bitBuffer.put(this.data[i], 8);
      }
    };
    module.exports = ByteData;
  }
});

// node_modules/qrcode/lib/core/kanji-data.js
var require_kanji_data = __commonJS({
  "node_modules/qrcode/lib/core/kanji-data.js"(exports, module) {
    "use strict";
    var Mode = require_mode();
    var Utils = require_utils();
    function KanjiData(data) {
      this.mode = Mode.KANJI;
      this.data = data;
    }
    KanjiData.getBitsLength = function getBitsLength(length) {
      return length * 13;
    };
    KanjiData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    KanjiData.prototype.getBitsLength = function getBitsLength() {
      return KanjiData.getBitsLength(this.data.length);
    };
    KanjiData.prototype.write = function(bitBuffer) {
      let i;
      for (i = 0; i < this.data.length; i++) {
        let value = Utils.toSJIS(this.data[i]);
        if (value >= 33088 && value <= 40956) {
          value -= 33088;
        } else if (value >= 57408 && value <= 60351) {
          value -= 49472;
        } else {
          throw new Error("Invalid SJIS character: " + this.data[i] + "\nMake sure your charset is UTF-8");
        }
        value = (value >>> 8 & 255) * 192 + (value & 255);
        bitBuffer.put(value, 13);
      }
    };
    module.exports = KanjiData;
  }
});

// node_modules/dijkstrajs/dijkstra.js
var require_dijkstra = __commonJS({
  "node_modules/dijkstrajs/dijkstra.js"(exports, module) {
    "use strict";
    var dijkstra = {
      single_source_shortest_paths: function(graph, s, d) {
        var predecessors = {};
        var costs = {};
        costs[s] = 0;
        var open = dijkstra.PriorityQueue.make();
        open.push(s, 0);
        var closest, u, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
        while (!open.empty()) {
          closest = open.pop();
          u = closest.value;
          cost_of_s_to_u = closest.cost;
          adjacent_nodes = graph[u] || {};
          for (v in adjacent_nodes) {
            if (adjacent_nodes.hasOwnProperty(v)) {
              cost_of_e = adjacent_nodes[v];
              cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
              cost_of_s_to_v = costs[v];
              first_visit = typeof costs[v] === "undefined";
              if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
                costs[v] = cost_of_s_to_u_plus_cost_of_e;
                open.push(v, cost_of_s_to_u_plus_cost_of_e);
                predecessors[v] = u;
              }
            }
          }
        }
        if (typeof d !== "undefined" && typeof costs[d] === "undefined") {
          var msg = ["Could not find a path from ", s, " to ", d, "."].join("");
          throw new Error(msg);
        }
        return predecessors;
      },
      extract_shortest_path_from_predecessor_list: function(predecessors, d) {
        var nodes = [];
        var u = d;
        var predecessor;
        while (u) {
          nodes.push(u);
          predecessor = predecessors[u];
          u = predecessors[u];
        }
        nodes.reverse();
        return nodes;
      },
      find_path: function(graph, s, d) {
        var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
        return dijkstra.extract_shortest_path_from_predecessor_list(predecessors, d);
      },
      /**
       * A very naive priority queue implementation.
       */
      PriorityQueue: {
        make: function(opts) {
          var T = dijkstra.PriorityQueue, t = {}, key;
          opts = opts || {};
          for (key in T) {
            if (T.hasOwnProperty(key)) {
              t[key] = T[key];
            }
          }
          t.queue = [];
          t.sorter = opts.sorter || T.default_sorter;
          return t;
        },
        default_sorter: function(a, b) {
          return a.cost - b.cost;
        },
        /**
         * Add a new item to the queue and ensure the highest priority element
         * is at the front of the queue.
         */
        push: function(value, cost) {
          var item = {
            value,
            cost
          };
          this.queue.push(item);
          this.queue.sort(this.sorter);
        },
        /**
         * Return the highest priority element in the queue.
         */
        pop: function() {
          return this.queue.shift();
        },
        empty: function() {
          return this.queue.length === 0;
        }
      }
    };
    if (typeof module !== "undefined") {
      module.exports = dijkstra;
    }
  }
});

// node_modules/qrcode/lib/core/segments.js
var require_segments = __commonJS({
  "node_modules/qrcode/lib/core/segments.js"(exports) {
    "use strict";
    var Mode = require_mode();
    var NumericData = require_numeric_data();
    var AlphanumericData = require_alphanumeric_data();
    var ByteData = require_byte_data();
    var KanjiData = require_kanji_data();
    var Regex = require_regex();
    var Utils = require_utils();
    var dijkstra = require_dijkstra();
    function getStringByteLength(str) {
      return unescape(encodeURIComponent(str)).length;
    }
    function getSegments(regex, mode, str) {
      const segments = [];
      let result;
      while ((result = regex.exec(str)) !== null) {
        segments.push({
          data: result[0],
          index: result.index,
          mode,
          length: result[0].length
        });
      }
      return segments;
    }
    function getSegmentsFromString(dataStr) {
      const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
      const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
      let byteSegs;
      let kanjiSegs;
      if (Utils.isKanjiModeEnabled()) {
        byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
        kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
      } else {
        byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
        kanjiSegs = [];
      }
      const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
      return segs.sort(function(s1, s2) {
        return s1.index - s2.index;
      }).map(function(obj) {
        return {
          data: obj.data,
          mode: obj.mode,
          length: obj.length
        };
      });
    }
    function getSegmentBitsLength(length, mode) {
      switch (mode) {
        case Mode.NUMERIC:
          return NumericData.getBitsLength(length);
        case Mode.ALPHANUMERIC:
          return AlphanumericData.getBitsLength(length);
        case Mode.KANJI:
          return KanjiData.getBitsLength(length);
        case Mode.BYTE:
          return ByteData.getBitsLength(length);
      }
    }
    function mergeSegments(segs) {
      return segs.reduce(function(acc, curr) {
        const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
        if (prevSeg && prevSeg.mode === curr.mode) {
          acc[acc.length - 1].data += curr.data;
          return acc;
        }
        acc.push(curr);
        return acc;
      }, []);
    }
    function buildNodes(segs) {
      const nodes = [];
      for (let i = 0; i < segs.length; i++) {
        const seg = segs[i];
        switch (seg.mode) {
          case Mode.NUMERIC:
            nodes.push([seg, {
              data: seg.data,
              mode: Mode.ALPHANUMERIC,
              length: seg.length
            }, {
              data: seg.data,
              mode: Mode.BYTE,
              length: seg.length
            }]);
            break;
          case Mode.ALPHANUMERIC:
            nodes.push([seg, {
              data: seg.data,
              mode: Mode.BYTE,
              length: seg.length
            }]);
            break;
          case Mode.KANJI:
            nodes.push([seg, {
              data: seg.data,
              mode: Mode.BYTE,
              length: getStringByteLength(seg.data)
            }]);
            break;
          case Mode.BYTE:
            nodes.push([{
              data: seg.data,
              mode: Mode.BYTE,
              length: getStringByteLength(seg.data)
            }]);
        }
      }
      return nodes;
    }
    function buildGraph(nodes, version) {
      const table = {};
      const graph = {
        start: {}
      };
      let prevNodeIds = ["start"];
      for (let i = 0; i < nodes.length; i++) {
        const nodeGroup = nodes[i];
        const currentNodeIds = [];
        for (let j = 0; j < nodeGroup.length; j++) {
          const node = nodeGroup[j];
          const key = "" + i + j;
          currentNodeIds.push(key);
          table[key] = {
            node,
            lastCount: 0
          };
          graph[key] = {};
          for (let n = 0; n < prevNodeIds.length; n++) {
            const prevNodeId = prevNodeIds[n];
            if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
              graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
              table[prevNodeId].lastCount += node.length;
            } else {
              if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;
              graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version);
            }
          }
        }
        prevNodeIds = currentNodeIds;
      }
      for (let n = 0; n < prevNodeIds.length; n++) {
        graph[prevNodeIds[n]].end = 0;
      }
      return {
        map: graph,
        table
      };
    }
    function buildSingleSegment(data, modesHint) {
      let mode;
      const bestMode = Mode.getBestModeForData(data);
      mode = Mode.from(modesHint, bestMode);
      if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
        throw new Error('"' + data + '" cannot be encoded with mode ' + Mode.toString(mode) + ".\n Suggested mode is: " + Mode.toString(bestMode));
      }
      if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
        mode = Mode.BYTE;
      }
      switch (mode) {
        case Mode.NUMERIC:
          return new NumericData(data);
        case Mode.ALPHANUMERIC:
          return new AlphanumericData(data);
        case Mode.KANJI:
          return new KanjiData(data);
        case Mode.BYTE:
          return new ByteData(data);
      }
    }
    exports.fromArray = function fromArray(array) {
      return array.reduce(function(acc, seg) {
        if (typeof seg === "string") {
          acc.push(buildSingleSegment(seg, null));
        } else if (seg.data) {
          acc.push(buildSingleSegment(seg.data, seg.mode));
        }
        return acc;
      }, []);
    };
    exports.fromString = function fromString(data, version) {
      const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
      const nodes = buildNodes(segs);
      const graph = buildGraph(nodes, version);
      const path = dijkstra.find_path(graph.map, "start", "end");
      const optimizedSegs = [];
      for (let i = 1; i < path.length - 1; i++) {
        optimizedSegs.push(graph.table[path[i]].node);
      }
      return exports.fromArray(mergeSegments(optimizedSegs));
    };
    exports.rawSplit = function rawSplit(data) {
      return exports.fromArray(getSegmentsFromString(data, Utils.isKanjiModeEnabled()));
    };
  }
});

// node_modules/qrcode/lib/core/qrcode.js
var require_qrcode = __commonJS({
  "node_modules/qrcode/lib/core/qrcode.js"(exports) {
    "use strict";
    var Utils = require_utils();
    var ECLevel = require_error_correction_level();
    var BitBuffer = require_bit_buffer();
    var BitMatrix = require_bit_matrix();
    var AlignmentPattern = require_alignment_pattern();
    var FinderPattern = require_finder_pattern();
    var MaskPattern = require_mask_pattern();
    var ECCode = require_error_correction_code();
    var ReedSolomonEncoder = require_reed_solomon_encoder();
    var Version = require_version();
    var FormatInfo = require_format_info();
    var Mode = require_mode();
    var Segments = require_segments();
    function setupFinderPattern(matrix, version) {
      const size = matrix.size;
      const pos = FinderPattern.getPositions(version);
      for (let i = 0; i < pos.length; i++) {
        const row = pos[i][0];
        const col = pos[i][1];
        for (let r = -1; r <= 7; r++) {
          if (row + r <= -1 || size <= row + r) continue;
          for (let c = -1; c <= 7; c++) {
            if (col + c <= -1 || size <= col + c) continue;
            if (r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4) {
              matrix.set(row + r, col + c, true, true);
            } else {
              matrix.set(row + r, col + c, false, true);
            }
          }
        }
      }
    }
    function setupTimingPattern(matrix) {
      const size = matrix.size;
      for (let r = 8; r < size - 8; r++) {
        const value = r % 2 === 0;
        matrix.set(r, 6, value, true);
        matrix.set(6, r, value, true);
      }
    }
    function setupAlignmentPattern(matrix, version) {
      const pos = AlignmentPattern.getPositions(version);
      for (let i = 0; i < pos.length; i++) {
        const row = pos[i][0];
        const col = pos[i][1];
        for (let r = -2; r <= 2; r++) {
          for (let c = -2; c <= 2; c++) {
            if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) {
              matrix.set(row + r, col + c, true, true);
            } else {
              matrix.set(row + r, col + c, false, true);
            }
          }
        }
      }
    }
    function setupVersionInfo(matrix, version) {
      const size = matrix.size;
      const bits = Version.getEncodedBits(version);
      let row, col, mod;
      for (let i = 0; i < 18; i++) {
        row = Math.floor(i / 3);
        col = i % 3 + size - 8 - 3;
        mod = (bits >> i & 1) === 1;
        matrix.set(row, col, mod, true);
        matrix.set(col, row, mod, true);
      }
    }
    function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
      const size = matrix.size;
      const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
      let i, mod;
      for (i = 0; i < 15; i++) {
        mod = (bits >> i & 1) === 1;
        if (i < 6) {
          matrix.set(i, 8, mod, true);
        } else if (i < 8) {
          matrix.set(i + 1, 8, mod, true);
        } else {
          matrix.set(size - 15 + i, 8, mod, true);
        }
        if (i < 8) {
          matrix.set(8, size - i - 1, mod, true);
        } else if (i < 9) {
          matrix.set(8, 15 - i - 1 + 1, mod, true);
        } else {
          matrix.set(8, 15 - i - 1, mod, true);
        }
      }
      matrix.set(size - 8, 8, 1, true);
    }
    function setupData(matrix, data) {
      const size = matrix.size;
      let inc = -1;
      let row = size - 1;
      let bitIndex = 7;
      let byteIndex = 0;
      for (let col = size - 1; col > 0; col -= 2) {
        if (col === 6) col--;
        while (true) {
          for (let c = 0; c < 2; c++) {
            if (!matrix.isReserved(row, col - c)) {
              let dark = false;
              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) === 1;
              }
              matrix.set(row, col - c, dark);
              bitIndex--;
              if (bitIndex === -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }
          row += inc;
          if (row < 0 || size <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    }
    function createData(version, errorCorrectionLevel, segments) {
      const buffer = new BitBuffer();
      segments.forEach(function(data) {
        buffer.put(data.mode.bit, 4);
        buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version));
        data.write(buffer);
      });
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
        buffer.put(0, 4);
      }
      while (buffer.getLengthInBits() % 8 !== 0) {
        buffer.putBit(0);
      }
      const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
      for (let i = 0; i < remainingByte; i++) {
        buffer.put(i % 2 ? 17 : 236, 8);
      }
      return createCodewords(buffer, version, errorCorrectionLevel);
    }
    function createCodewords(bitBuffer, version, errorCorrectionLevel) {
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewords = totalCodewords - ecTotalCodewords;
      const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);
      const blocksInGroup2 = totalCodewords % ecTotalBlocks;
      const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
      const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
      const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
      const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;
      const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;
      const rs = new ReedSolomonEncoder(ecCount);
      let offset = 0;
      const dcData = new Array(ecTotalBlocks);
      const ecData = new Array(ecTotalBlocks);
      let maxDataSize = 0;
      const buffer = new Uint8Array(bitBuffer.buffer);
      for (let b = 0; b < ecTotalBlocks; b++) {
        const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
        dcData[b] = buffer.slice(offset, offset + dataSize);
        ecData[b] = rs.encode(dcData[b]);
        offset += dataSize;
        maxDataSize = Math.max(maxDataSize, dataSize);
      }
      const data = new Uint8Array(totalCodewords);
      let index = 0;
      let i, r;
      for (i = 0; i < maxDataSize; i++) {
        for (r = 0; r < ecTotalBlocks; r++) {
          if (i < dcData[r].length) {
            data[index++] = dcData[r][i];
          }
        }
      }
      for (i = 0; i < ecCount; i++) {
        for (r = 0; r < ecTotalBlocks; r++) {
          data[index++] = ecData[r][i];
        }
      }
      return data;
    }
    function createSymbol(data, version, errorCorrectionLevel, maskPattern) {
      let segments;
      if (Array.isArray(data)) {
        segments = Segments.fromArray(data);
      } else if (typeof data === "string") {
        let estimatedVersion = version;
        if (!estimatedVersion) {
          const rawSegments = Segments.rawSplit(data);
          estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
        }
        segments = Segments.fromString(data, estimatedVersion || 40);
      } else {
        throw new Error("Invalid data");
      }
      const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);
      if (!bestVersion) {
        throw new Error("The amount of data is too big to be stored in a QR Code");
      }
      if (!version) {
        version = bestVersion;
      } else if (version < bestVersion) {
        throw new Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + bestVersion + ".\n");
      }
      const dataBits = createData(version, errorCorrectionLevel, segments);
      const moduleCount = Utils.getSymbolSize(version);
      const modules = new BitMatrix(moduleCount);
      setupFinderPattern(modules, version);
      setupTimingPattern(modules);
      setupAlignmentPattern(modules, version);
      setupFormatInfo(modules, errorCorrectionLevel, 0);
      if (version >= 7) {
        setupVersionInfo(modules, version);
      }
      setupData(modules, dataBits);
      if (isNaN(maskPattern)) {
        maskPattern = MaskPattern.getBestMask(modules, setupFormatInfo.bind(null, modules, errorCorrectionLevel));
      }
      MaskPattern.applyMask(maskPattern, modules);
      setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
      return {
        modules,
        version,
        errorCorrectionLevel,
        maskPattern,
        segments
      };
    }
    exports.create = function create(data, options) {
      if (typeof data === "undefined" || data === "") {
        throw new Error("No input text");
      }
      let errorCorrectionLevel = ECLevel.M;
      let version;
      let mask;
      if (typeof options !== "undefined") {
        errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
        version = Version.from(options.version);
        mask = MaskPattern.from(options.maskPattern);
        if (options.toSJISFunc) {
          Utils.setToSJISFunction(options.toSJISFunc);
        }
      }
      return createSymbol(data, version, errorCorrectionLevel, mask);
    };
  }
});

// node_modules/qrcode/lib/renderer/utils.js
var require_utils2 = __commonJS({
  "node_modules/qrcode/lib/renderer/utils.js"(exports) {
    "use strict";
    function hex2rgba(hex) {
      if (typeof hex === "number") {
        hex = hex.toString();
      }
      if (typeof hex !== "string") {
        throw new Error("Color should be defined as hex string");
      }
      let hexCode = hex.slice().replace("#", "").split("");
      if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
        throw new Error("Invalid hex color: " + hex);
      }
      if (hexCode.length === 3 || hexCode.length === 4) {
        hexCode = Array.prototype.concat.apply([], hexCode.map(function(c) {
          return [c, c];
        }));
      }
      if (hexCode.length === 6) hexCode.push("F", "F");
      const hexValue = parseInt(hexCode.join(""), 16);
      return {
        r: hexValue >> 24 & 255,
        g: hexValue >> 16 & 255,
        b: hexValue >> 8 & 255,
        a: hexValue & 255,
        hex: "#" + hexCode.slice(0, 6).join("")
      };
    }
    exports.getOptions = function getOptions(options) {
      if (!options) options = {};
      if (!options.color) options.color = {};
      const margin = typeof options.margin === "undefined" || options.margin === null || options.margin < 0 ? 4 : options.margin;
      const width = options.width && options.width >= 21 ? options.width : void 0;
      const scale = options.scale || 4;
      return {
        width,
        scale: width ? 4 : scale,
        margin,
        color: {
          dark: hex2rgba(options.color.dark || "#000000ff"),
          light: hex2rgba(options.color.light || "#ffffffff")
        },
        type: options.type,
        rendererOpts: options.rendererOpts || {}
      };
    };
    exports.getScale = function getScale(qrSize, opts) {
      return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
    };
    exports.getImageWidth = function getImageWidth(qrSize, opts) {
      const scale = exports.getScale(qrSize, opts);
      return Math.floor((qrSize + opts.margin * 2) * scale);
    };
    exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
      const size = qr.modules.size;
      const data = qr.modules.data;
      const scale = exports.getScale(size, opts);
      const symbolSize = Math.floor((size + opts.margin * 2) * scale);
      const scaledMargin = opts.margin * scale;
      const palette = [opts.color.light, opts.color.dark];
      for (let i = 0; i < symbolSize; i++) {
        for (let j = 0; j < symbolSize; j++) {
          let posDst = (i * symbolSize + j) * 4;
          let pxColor = opts.color.light;
          if (i >= scaledMargin && j >= scaledMargin && i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
            const iSrc = Math.floor((i - scaledMargin) / scale);
            const jSrc = Math.floor((j - scaledMargin) / scale);
            pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
          }
          imgData[posDst++] = pxColor.r;
          imgData[posDst++] = pxColor.g;
          imgData[posDst++] = pxColor.b;
          imgData[posDst] = pxColor.a;
        }
      }
    };
  }
});

// node_modules/qrcode/lib/renderer/canvas.js
var require_canvas = __commonJS({
  "node_modules/qrcode/lib/renderer/canvas.js"(exports) {
    "use strict";
    var Utils = require_utils2();
    function clearCanvas(ctx, canvas, size) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!canvas.style) canvas.style = {};
      canvas.height = size;
      canvas.width = size;
      canvas.style.height = size + "px";
      canvas.style.width = size + "px";
    }
    function getCanvasElement() {
      try {
        return document.createElement("canvas");
      } catch (e) {
        throw new Error("You need to specify a canvas element");
      }
    }
    exports.render = function render(qrData, canvas, options) {
      let opts = options;
      let canvasEl = canvas;
      if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = void 0;
      }
      if (!canvas) {
        canvasEl = getCanvasElement();
      }
      opts = Utils.getOptions(opts);
      const size = Utils.getImageWidth(qrData.modules.size, opts);
      const ctx = canvasEl.getContext("2d");
      const image = ctx.createImageData(size, size);
      Utils.qrToImageData(image.data, qrData, opts);
      clearCanvas(ctx, canvasEl, size);
      ctx.putImageData(image, 0, 0);
      return canvasEl;
    };
    exports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
      let opts = options;
      if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = void 0;
      }
      if (!opts) opts = {};
      const canvasEl = exports.render(qrData, canvas, opts);
      const type = opts.type || "image/png";
      const rendererOpts = opts.rendererOpts || {};
      return canvasEl.toDataURL(type, rendererOpts.quality);
    };
  }
});

// node_modules/qrcode/lib/renderer/svg-tag.js
var require_svg_tag = __commonJS({
  "node_modules/qrcode/lib/renderer/svg-tag.js"(exports) {
    "use strict";
    var Utils = require_utils2();
    function getColorAttrib(color, attrib) {
      const alpha = color.a / 255;
      const str = attrib + '="' + color.hex + '"';
      return alpha < 1 ? str + " " + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
    }
    function svgCmd(cmd, x, y) {
      let str = cmd + x;
      if (typeof y !== "undefined") str += " " + y;
      return str;
    }
    function qrToPath(data, size, margin) {
      let path = "";
      let moveBy = 0;
      let newRow = false;
      let lineLength = 0;
      for (let i = 0; i < data.length; i++) {
        const col = Math.floor(i % size);
        const row = Math.floor(i / size);
        if (!col && !newRow) newRow = true;
        if (data[i]) {
          lineLength++;
          if (!(i > 0 && col > 0 && data[i - 1])) {
            path += newRow ? svgCmd("M", col + margin, 0.5 + row + margin) : svgCmd("m", moveBy, 0);
            moveBy = 0;
            newRow = false;
          }
          if (!(col + 1 < size && data[i + 1])) {
            path += svgCmd("h", lineLength);
            lineLength = 0;
          }
        } else {
          moveBy++;
        }
      }
      return path;
    }
    exports.render = function render(qrData, options, cb) {
      const opts = Utils.getOptions(options);
      const size = qrData.modules.size;
      const data = qrData.modules.data;
      const qrcodesize = size + opts.margin * 2;
      const bg = !opts.color.light.a ? "" : "<path " + getColorAttrib(opts.color.light, "fill") + ' d="M0 0h' + qrcodesize + "v" + qrcodesize + 'H0z"/>';
      const path = "<path " + getColorAttrib(opts.color.dark, "stroke") + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
      const viewBox = 'viewBox="0 0 ' + qrcodesize + " " + qrcodesize + '"';
      const width = !opts.width ? "" : 'width="' + opts.width + '" height="' + opts.width + '" ';
      const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + "</svg>\n";
      if (typeof cb === "function") {
        cb(null, svgTag);
      }
      return svgTag;
    };
  }
});

// node_modules/qrcode/lib/browser.js
var require_browser = __commonJS({
  "node_modules/qrcode/lib/browser.js"(exports) {
    "use strict";
    var canPromise = require_can_promise();
    var QRCode = require_qrcode();
    var CanvasRenderer = require_canvas();
    var SvgRenderer = require_svg_tag();
    function renderCanvas(renderFunc, canvas, text, opts, cb) {
      const args = [].slice.call(arguments, 1);
      const argsNum = args.length;
      const isLastArgCb = typeof args[argsNum - 1] === "function";
      if (!isLastArgCb && !canPromise()) {
        throw new Error("Callback required as last argument");
      }
      if (isLastArgCb) {
        if (argsNum < 2) {
          throw new Error("Too few arguments provided");
        }
        if (argsNum === 2) {
          cb = text;
          text = canvas;
          canvas = opts = void 0;
        } else if (argsNum === 3) {
          if (canvas.getContext && typeof cb === "undefined") {
            cb = opts;
            opts = void 0;
          } else {
            cb = opts;
            opts = text;
            text = canvas;
            canvas = void 0;
          }
        }
      } else {
        if (argsNum < 1) {
          throw new Error("Too few arguments provided");
        }
        if (argsNum === 1) {
          text = canvas;
          canvas = opts = void 0;
        } else if (argsNum === 2 && !canvas.getContext) {
          opts = text;
          text = canvas;
          canvas = void 0;
        }
        return new Promise(function(resolve, reject) {
          try {
            const data = QRCode.create(text, opts);
            resolve(renderFunc(data, canvas, opts));
          } catch (e) {
            reject(e);
          }
        });
      }
      try {
        const data = QRCode.create(text, opts);
        cb(null, renderFunc(data, canvas, opts));
      } catch (e) {
        cb(e);
      }
    }
    exports.create = QRCode.create;
    exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
    exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);
    exports.toString = renderCanvas.bind(null, function(data, _, opts) {
      return SvgRenderer.render(data, opts);
    });
  }
});

// node_modules/@angular/material/fesm2022/tabs.mjs
var _c0 = ["*"];
function MatTab_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
var _c1 = ["tabListContainer"];
var _c2 = ["tabList"];
var _c3 = ["tabListInner"];
var _c4 = ["nextPaginator"];
var _c5 = ["previousPaginator"];
var _c6 = (a0) => ({
  animationDuration: a0
});
var _c7 = (a0, a1) => ({
  value: a0,
  params: a1
});
function MatTabBody_ng_template_2_Template(rf, ctx) {
}
var _c8 = ["tabBodyWrapper"];
var _c9 = ["tabHeader"];
function MatTabGroup_For_3_Conditional_6_ng_template_0_Template(rf, ctx) {
}
function MatTabGroup_For_3_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MatTabGroup_For_3_Conditional_6_ng_template_0_Template, 0, 0, "ng-template", 12);
  }
  if (rf & 2) {
    const tab_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("cdkPortalOutlet", tab_r4.templateLabel);
  }
}
function MatTabGroup_For_3_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const tab_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate(tab_r4.textLabel);
  }
}
function MatTabGroup_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7, 2);
    \u0275\u0275listener("click", function MatTabGroup_For_3_Template_div_click_0_listener() {
      const ctx_r2 = \u0275\u0275restoreView(_r2);
      const tab_r4 = ctx_r2.$implicit;
      const \u0275$index_3_r5 = ctx_r2.$index;
      const ctx_r5 = \u0275\u0275nextContext();
      const tabHeader_r7 = \u0275\u0275reference(1);
      return \u0275\u0275resetView(ctx_r5._handleClick(tab_r4, tabHeader_r7, \u0275$index_3_r5));
    })("cdkFocusChange", function MatTabGroup_For_3_Template_div_cdkFocusChange_0_listener($event) {
      const \u0275$index_3_r5 = \u0275\u0275restoreView(_r2).$index;
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5._tabFocusChanged($event, \u0275$index_3_r5));
    });
    \u0275\u0275element(2, "span", 8)(3, "div", 9);
    \u0275\u0275elementStart(4, "span", 10)(5, "span", 11);
    \u0275\u0275template(6, MatTabGroup_For_3_Conditional_6_Template, 1, 1, null, 12)(7, MatTabGroup_For_3_Conditional_7_Template, 1, 1);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const tab_r4 = ctx.$implicit;
    const \u0275$index_3_r5 = ctx.$index;
    const tabNode_r8 = \u0275\u0275reference(1);
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275classMap(tab_r4.labelClass);
    \u0275\u0275classProp("mdc-tab--active", ctx_r5.selectedIndex === \u0275$index_3_r5);
    \u0275\u0275property("id", ctx_r5._getTabLabelId(\u0275$index_3_r5))("disabled", tab_r4.disabled)("fitInkBarToContent", ctx_r5.fitInkBarToContent);
    \u0275\u0275attribute("tabIndex", ctx_r5._getTabIndex(\u0275$index_3_r5))("aria-posinset", \u0275$index_3_r5 + 1)("aria-setsize", ctx_r5._tabs.length)("aria-controls", ctx_r5._getTabContentId(\u0275$index_3_r5))("aria-selected", ctx_r5.selectedIndex === \u0275$index_3_r5)("aria-label", tab_r4.ariaLabel || null)("aria-labelledby", !tab_r4.ariaLabel && tab_r4.ariaLabelledby ? tab_r4.ariaLabelledby : null);
    \u0275\u0275advance(3);
    \u0275\u0275property("matRippleTrigger", tabNode_r8)("matRippleDisabled", tab_r4.disabled || ctx_r5.disableRipple);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(tab_r4.templateLabel ? 6 : 7);
  }
}
function MatTabGroup_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
function MatTabGroup_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-tab-body", 13);
    \u0275\u0275listener("_onCentered", function MatTabGroup_For_8_Template_mat_tab_body__onCentered_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5._removeTabBodyWrapperHeight());
    })("_onCentering", function MatTabGroup_For_8_Template_mat_tab_body__onCentering_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5._setTabBodyWrapperHeight($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r10 = ctx.$implicit;
    const \u0275$index_23_r11 = ctx.$index;
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275classMap(tab_r10.bodyClass);
    \u0275\u0275classProp("mat-mdc-tab-body-active", ctx_r5.selectedIndex === \u0275$index_23_r11);
    \u0275\u0275property("id", ctx_r5._getTabContentId(\u0275$index_23_r11))("content", tab_r10.content)("position", tab_r10.position)("origin", tab_r10.origin)("animationDuration", ctx_r5.animationDuration)("preserveContent", ctx_r5.preserveContent);
    \u0275\u0275attribute("tabindex", ctx_r5.contentTabIndex != null && ctx_r5.selectedIndex === \u0275$index_23_r11 ? ctx_r5.contentTabIndex : null)("aria-labelledby", ctx_r5._getTabLabelId(\u0275$index_23_r11))("aria-hidden", ctx_r5.selectedIndex !== \u0275$index_23_r11);
  }
}
var _c10 = ["mat-tab-nav-bar", ""];
var _c11 = ["mat-tab-link", ""];
var MAT_TAB_CONTENT = new InjectionToken("MatTabContent");
var MatTabContent = class _MatTabContent {
  constructor(template) {
    this.template = template;
  }
  static {
    this.\u0275fac = function MatTabContent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatTabContent)(\u0275\u0275directiveInject(TemplateRef));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatTabContent,
      selectors: [["", "matTabContent", ""]],
      standalone: true,
      features: [\u0275\u0275ProvidersFeature([{
        provide: MAT_TAB_CONTENT,
        useExisting: _MatTabContent
      }])]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTabContent, [{
    type: Directive,
    args: [{
      selector: "[matTabContent]",
      providers: [{
        provide: MAT_TAB_CONTENT,
        useExisting: MatTabContent
      }],
      standalone: true
    }]
  }], () => [{
    type: TemplateRef
  }], null);
})();
var MAT_TAB_LABEL = new InjectionToken("MatTabLabel");
var MAT_TAB = new InjectionToken("MAT_TAB");
var MatTabLabel = class _MatTabLabel extends CdkPortal {
  constructor(templateRef, viewContainerRef, _closestTab) {
    super(templateRef, viewContainerRef);
    this._closestTab = _closestTab;
  }
  static {
    this.\u0275fac = function MatTabLabel_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatTabLabel)(\u0275\u0275directiveInject(TemplateRef), \u0275\u0275directiveInject(ViewContainerRef), \u0275\u0275directiveInject(MAT_TAB, 8));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatTabLabel,
      selectors: [["", "mat-tab-label", ""], ["", "matTabLabel", ""]],
      standalone: true,
      features: [\u0275\u0275ProvidersFeature([{
        provide: MAT_TAB_LABEL,
        useExisting: _MatTabLabel
      }]), \u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTabLabel, [{
    type: Directive,
    args: [{
      selector: "[mat-tab-label], [matTabLabel]",
      providers: [{
        provide: MAT_TAB_LABEL,
        useExisting: MatTabLabel
      }],
      standalone: true
    }]
  }], () => [{
    type: TemplateRef
  }, {
    type: ViewContainerRef
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [MAT_TAB]
    }, {
      type: Optional
    }]
  }], null);
})();
var MAT_TAB_GROUP = new InjectionToken("MAT_TAB_GROUP");
var MatTab = class _MatTab {
  /** Content for the tab label given by `<ng-template mat-tab-label>`. */
  get templateLabel() {
    return this._templateLabel;
  }
  set templateLabel(value) {
    this._setTemplateLabelInput(value);
  }
  /** @docs-private */
  get content() {
    return this._contentPortal;
  }
  constructor(_viewContainerRef, _closestTabGroup) {
    this._viewContainerRef = _viewContainerRef;
    this._closestTabGroup = _closestTabGroup;
    this.disabled = false;
    this._explicitContent = void 0;
    this.textLabel = "";
    this._contentPortal = null;
    this._stateChanges = new Subject();
    this.position = null;
    this.origin = null;
    this.isActive = false;
  }
  ngOnChanges(changes) {
    if (changes.hasOwnProperty("textLabel") || changes.hasOwnProperty("disabled")) {
      this._stateChanges.next();
    }
  }
  ngOnDestroy() {
    this._stateChanges.complete();
  }
  ngOnInit() {
    this._contentPortal = new TemplatePortal(this._explicitContent || this._implicitContent, this._viewContainerRef);
  }
  /**
   * This has been extracted to a util because of TS 4 and VE.
   * View Engine doesn't support property rename inheritance.
   * TS 4.0 doesn't allow properties to override accessors or vice-versa.
   * @docs-private
   */
  _setTemplateLabelInput(value) {
    if (value && value._closestTab === this) {
      this._templateLabel = value;
    }
  }
  static {
    this.\u0275fac = function MatTab_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatTab)(\u0275\u0275directiveInject(ViewContainerRef), \u0275\u0275directiveInject(MAT_TAB_GROUP, 8));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatTab,
      selectors: [["mat-tab"]],
      contentQueries: function MatTab_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuery(dirIndex, MatTabLabel, 5);
          \u0275\u0275contentQuery(dirIndex, MatTabContent, 7, TemplateRef);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.templateLabel = _t.first);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._explicitContent = _t.first);
        }
      },
      viewQuery: function MatTab_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuery(TemplateRef, 7);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._implicitContent = _t.first);
        }
      },
      hostAttrs: ["hidden", ""],
      inputs: {
        disabled: [2, "disabled", "disabled", booleanAttribute],
        textLabel: [0, "label", "textLabel"],
        ariaLabel: [0, "aria-label", "ariaLabel"],
        ariaLabelledby: [0, "aria-labelledby", "ariaLabelledby"],
        labelClass: "labelClass",
        bodyClass: "bodyClass"
      },
      exportAs: ["matTab"],
      standalone: true,
      features: [\u0275\u0275ProvidersFeature([{
        provide: MAT_TAB,
        useExisting: _MatTab
      }]), \u0275\u0275InputTransformsFeature, \u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function MatTab_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef();
          \u0275\u0275template(0, MatTab_ng_template_0_Template, 1, 0, "ng-template");
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTab, [{
    type: Component,
    args: [{
      selector: "mat-tab",
      changeDetection: ChangeDetectionStrategy.Default,
      encapsulation: ViewEncapsulation$1.None,
      exportAs: "matTab",
      providers: [{
        provide: MAT_TAB,
        useExisting: MatTab
      }],
      standalone: true,
      host: {
        // This element will be rendered on the server in order to support hydration.
        // Hide it so it doesn't cause a layout shift when it's removed on the client.
        "hidden": ""
      },
      template: "<!-- Create a template for the content of the <mat-tab> so that we can grab a reference to this\n    TemplateRef and use it in a Portal to render the tab content in the appropriate place in the\n    tab-group. -->\n<ng-template><ng-content></ng-content></ng-template>\n"
    }]
  }], () => [{
    type: ViewContainerRef
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [MAT_TAB_GROUP]
    }, {
      type: Optional
    }]
  }], {
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    templateLabel: [{
      type: ContentChild,
      args: [MatTabLabel]
    }],
    _explicitContent: [{
      type: ContentChild,
      args: [MatTabContent, {
        read: TemplateRef,
        static: true
      }]
    }],
    _implicitContent: [{
      type: ViewChild,
      args: [TemplateRef, {
        static: true
      }]
    }],
    textLabel: [{
      type: Input,
      args: ["label"]
    }],
    ariaLabel: [{
      type: Input,
      args: ["aria-label"]
    }],
    ariaLabelledby: [{
      type: Input,
      args: ["aria-labelledby"]
    }],
    labelClass: [{
      type: Input
    }],
    bodyClass: [{
      type: Input
    }]
  });
})();
var ACTIVE_CLASS = "mdc-tab-indicator--active";
var NO_TRANSITION_CLASS = "mdc-tab-indicator--no-transition";
var MatInkBar = class {
  constructor(_items) {
    this._items = _items;
  }
  /** Hides the ink bar. */
  hide() {
    this._items.forEach((item) => item.deactivateInkBar());
  }
  /** Aligns the ink bar to a DOM node. */
  alignToElement(element) {
    const correspondingItem = this._items.find((item) => item.elementRef.nativeElement === element);
    const currentItem = this._currentItem;
    if (correspondingItem === currentItem) {
      return;
    }
    currentItem?.deactivateInkBar();
    if (correspondingItem) {
      const domRect = currentItem?.elementRef.nativeElement.getBoundingClientRect?.();
      correspondingItem.activateInkBar(domRect);
      this._currentItem = correspondingItem;
    }
  }
};
var InkBarItem = class _InkBarItem {
  constructor() {
    this._elementRef = inject(ElementRef);
    this._fitToContent = false;
  }
  /** Whether the ink bar should fit to the entire tab or just its content. */
  get fitInkBarToContent() {
    return this._fitToContent;
  }
  set fitInkBarToContent(newValue) {
    if (this._fitToContent !== newValue) {
      this._fitToContent = newValue;
      if (this._inkBarElement) {
        this._appendInkBarElement();
      }
    }
  }
  /** Aligns the ink bar to the current item. */
  activateInkBar(previousIndicatorClientRect) {
    const element = this._elementRef.nativeElement;
    if (!previousIndicatorClientRect || !element.getBoundingClientRect || !this._inkBarContentElement) {
      element.classList.add(ACTIVE_CLASS);
      return;
    }
    const currentClientRect = element.getBoundingClientRect();
    const widthDelta = previousIndicatorClientRect.width / currentClientRect.width;
    const xPosition = previousIndicatorClientRect.left - currentClientRect.left;
    element.classList.add(NO_TRANSITION_CLASS);
    this._inkBarContentElement.style.setProperty("transform", `translateX(${xPosition}px) scaleX(${widthDelta})`);
    element.getBoundingClientRect();
    element.classList.remove(NO_TRANSITION_CLASS);
    element.classList.add(ACTIVE_CLASS);
    this._inkBarContentElement.style.setProperty("transform", "");
  }
  /** Removes the ink bar from the current item. */
  deactivateInkBar() {
    this._elementRef.nativeElement.classList.remove(ACTIVE_CLASS);
  }
  /** Initializes the foundation. */
  ngOnInit() {
    this._createInkBarElement();
  }
  /** Destroys the foundation. */
  ngOnDestroy() {
    this._inkBarElement?.remove();
    this._inkBarElement = this._inkBarContentElement = null;
  }
  /** Creates and appends the ink bar element. */
  _createInkBarElement() {
    const documentNode = this._elementRef.nativeElement.ownerDocument || document;
    const inkBarElement = this._inkBarElement = documentNode.createElement("span");
    const inkBarContentElement = this._inkBarContentElement = documentNode.createElement("span");
    inkBarElement.className = "mdc-tab-indicator";
    inkBarContentElement.className = "mdc-tab-indicator__content mdc-tab-indicator__content--underline";
    inkBarElement.appendChild(this._inkBarContentElement);
    this._appendInkBarElement();
  }
  /**
   * Appends the ink bar to the tab host element or content, depending on whether
   * the ink bar should fit to content.
   */
  _appendInkBarElement() {
    if (!this._inkBarElement && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error("Ink bar element has not been created and cannot be appended");
    }
    const parentElement = this._fitToContent ? this._elementRef.nativeElement.querySelector(".mdc-tab__content") : this._elementRef.nativeElement;
    if (!parentElement && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error("Missing element to host the ink bar");
    }
    parentElement.appendChild(this._inkBarElement);
  }
  static {
    this.\u0275fac = function InkBarItem_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _InkBarItem)();
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _InkBarItem,
      inputs: {
        fitInkBarToContent: [2, "fitInkBarToContent", "fitInkBarToContent", booleanAttribute]
      },
      features: [\u0275\u0275InputTransformsFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InkBarItem, [{
    type: Directive
  }], null, {
    fitInkBarToContent: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
function _MAT_INK_BAR_POSITIONER_FACTORY() {
  const method = (element) => ({
    left: element ? (element.offsetLeft || 0) + "px" : "0",
    width: element ? (element.offsetWidth || 0) + "px" : "0"
  });
  return method;
}
var _MAT_INK_BAR_POSITIONER = new InjectionToken("MatInkBarPositioner", {
  providedIn: "root",
  factory: _MAT_INK_BAR_POSITIONER_FACTORY
});
var MatTabLabelWrapper = class _MatTabLabelWrapper extends InkBarItem {
  constructor(elementRef) {
    super();
    this.elementRef = elementRef;
    this.disabled = false;
  }
  /** Sets focus on the wrapper element */
  focus() {
    this.elementRef.nativeElement.focus();
  }
  getOffsetLeft() {
    return this.elementRef.nativeElement.offsetLeft;
  }
  getOffsetWidth() {
    return this.elementRef.nativeElement.offsetWidth;
  }
  static {
    this.\u0275fac = function MatTabLabelWrapper_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatTabLabelWrapper)(\u0275\u0275directiveInject(ElementRef));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatTabLabelWrapper,
      selectors: [["", "matTabLabelWrapper", ""]],
      hostVars: 3,
      hostBindings: function MatTabLabelWrapper_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275attribute("aria-disabled", !!ctx.disabled);
          \u0275\u0275classProp("mat-mdc-tab-disabled", ctx.disabled);
        }
      },
      inputs: {
        disabled: [2, "disabled", "disabled", booleanAttribute]
      },
      standalone: true,
      features: [\u0275\u0275InputTransformsFeature, \u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTabLabelWrapper, [{
    type: Directive,
    args: [{
      selector: "[matTabLabelWrapper]",
      host: {
        "[class.mat-mdc-tab-disabled]": "disabled",
        "[attr.aria-disabled]": "!!disabled"
      },
      standalone: true
    }]
  }], () => [{
    type: ElementRef
  }], {
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var passiveEventListenerOptions = normalizePassiveListenerOptions({
  passive: true
});
var HEADER_SCROLL_DELAY = 650;
var HEADER_SCROLL_INTERVAL = 100;
var MatPaginatedTabHeader = class _MatPaginatedTabHeader {
  /** The index of the active tab. */
  get selectedIndex() {
    return this._selectedIndex;
  }
  set selectedIndex(v) {
    const value = isNaN(v) ? 0 : v;
    if (this._selectedIndex != value) {
      this._selectedIndexChanged = true;
      this._selectedIndex = value;
      if (this._keyManager) {
        this._keyManager.updateActiveItem(value);
      }
    }
  }
  constructor(_elementRef, _changeDetectorRef, _viewportRuler, _dir, _ngZone, _platform, _animationMode) {
    this._elementRef = _elementRef;
    this._changeDetectorRef = _changeDetectorRef;
    this._viewportRuler = _viewportRuler;
    this._dir = _dir;
    this._ngZone = _ngZone;
    this._platform = _platform;
    this._animationMode = _animationMode;
    this._scrollDistance = 0;
    this._selectedIndexChanged = false;
    this._destroyed = new Subject();
    this._showPaginationControls = false;
    this._disableScrollAfter = true;
    this._disableScrollBefore = true;
    this._stopScrolling = new Subject();
    this.disablePagination = false;
    this._selectedIndex = 0;
    this.selectFocusedIndex = new EventEmitter();
    this.indexFocused = new EventEmitter();
    this._sharedResizeObserver = inject(SharedResizeObserver);
    this._injector = inject(Injector);
    _ngZone.runOutsideAngular(() => {
      fromEvent(_elementRef.nativeElement, "mouseleave").pipe(takeUntil(this._destroyed)).subscribe(() => {
        this._stopInterval();
      });
    });
  }
  ngAfterViewInit() {
    fromEvent(this._previousPaginator.nativeElement, "touchstart", passiveEventListenerOptions).pipe(takeUntil(this._destroyed)).subscribe(() => {
      this._handlePaginatorPress("before");
    });
    fromEvent(this._nextPaginator.nativeElement, "touchstart", passiveEventListenerOptions).pipe(takeUntil(this._destroyed)).subscribe(() => {
      this._handlePaginatorPress("after");
    });
  }
  ngAfterContentInit() {
    const dirChange = this._dir ? this._dir.change : of("ltr");
    const resize = this._sharedResizeObserver.observe(this._elementRef.nativeElement).pipe(debounceTime(32), takeUntil(this._destroyed));
    const viewportResize = this._viewportRuler.change(150).pipe(takeUntil(this._destroyed));
    const realign = () => {
      this.updatePagination();
      this._alignInkBarToSelectedTab();
    };
    this._keyManager = new FocusKeyManager(this._items).withHorizontalOrientation(this._getLayoutDirection()).withHomeAndEnd().withWrap().skipPredicate(() => false);
    this._keyManager.updateActiveItem(this._selectedIndex);
    afterNextRender(realign, {
      injector: this._injector
    });
    merge(dirChange, viewportResize, resize, this._items.changes, this._itemsResized()).pipe(takeUntil(this._destroyed)).subscribe(() => {
      this._ngZone.run(() => {
        Promise.resolve().then(() => {
          this._scrollDistance = Math.max(0, Math.min(this._getMaxScrollDistance(), this._scrollDistance));
          realign();
        });
      });
      this._keyManager.withHorizontalOrientation(this._getLayoutDirection());
    });
    this._keyManager.change.subscribe((newFocusIndex) => {
      this.indexFocused.emit(newFocusIndex);
      this._setTabFocus(newFocusIndex);
    });
  }
  /** Sends any changes that could affect the layout of the items. */
  _itemsResized() {
    if (typeof ResizeObserver !== "function") {
      return EMPTY;
    }
    return this._items.changes.pipe(
      startWith(this._items),
      switchMap((tabItems) => new Observable((observer) => this._ngZone.runOutsideAngular(() => {
        const resizeObserver = new ResizeObserver((entries) => observer.next(entries));
        tabItems.forEach((item) => resizeObserver.observe(item.elementRef.nativeElement));
        return () => {
          resizeObserver.disconnect();
        };
      }))),
      // Skip the first emit since the resize observer emits when an item
      // is observed for new items when the tab is already inserted
      skip(1),
      // Skip emissions where all the elements are invisible since we don't want
      // the header to try and re-render with invalid measurements. See #25574.
      filter((entries) => entries.some((e) => e.contentRect.width > 0 && e.contentRect.height > 0))
    );
  }
  ngAfterContentChecked() {
    if (this._tabLabelCount != this._items.length) {
      this.updatePagination();
      this._tabLabelCount = this._items.length;
      this._changeDetectorRef.markForCheck();
    }
    if (this._selectedIndexChanged) {
      this._scrollToLabel(this._selectedIndex);
      this._checkScrollingControls();
      this._alignInkBarToSelectedTab();
      this._selectedIndexChanged = false;
      this._changeDetectorRef.markForCheck();
    }
    if (this._scrollDistanceChanged) {
      this._updateTabScrollPosition();
      this._scrollDistanceChanged = false;
      this._changeDetectorRef.markForCheck();
    }
  }
  ngOnDestroy() {
    this._keyManager?.destroy();
    this._destroyed.next();
    this._destroyed.complete();
    this._stopScrolling.complete();
  }
  /** Handles keyboard events on the header. */
  _handleKeydown(event) {
    if (hasModifierKey(event)) {
      return;
    }
    switch (event.keyCode) {
      case ENTER:
      case SPACE:
        if (this.focusIndex !== this.selectedIndex) {
          const item = this._items.get(this.focusIndex);
          if (item && !item.disabled) {
            this.selectFocusedIndex.emit(this.focusIndex);
            this._itemSelected(event);
          }
        }
        break;
      default:
        this._keyManager.onKeydown(event);
    }
  }
  /**
   * Callback for when the MutationObserver detects that the content has changed.
   */
  _onContentChanges() {
    const textContent = this._elementRef.nativeElement.textContent;
    if (textContent !== this._currentTextContent) {
      this._currentTextContent = textContent || "";
      this._ngZone.run(() => {
        this.updatePagination();
        this._alignInkBarToSelectedTab();
        this._changeDetectorRef.markForCheck();
      });
    }
  }
  /**
   * Updates the view whether pagination should be enabled or not.
   *
   * WARNING: Calling this method can be very costly in terms of performance. It should be called
   * as infrequently as possible from outside of the Tabs component as it causes a reflow of the
   * page.
   */
  updatePagination() {
    this._checkPaginationEnabled();
    this._checkScrollingControls();
    this._updateTabScrollPosition();
  }
  /** Tracks which element has focus; used for keyboard navigation */
  get focusIndex() {
    return this._keyManager ? this._keyManager.activeItemIndex : 0;
  }
  /** When the focus index is set, we must manually send focus to the correct label */
  set focusIndex(value) {
    if (!this._isValidIndex(value) || this.focusIndex === value || !this._keyManager) {
      return;
    }
    this._keyManager.setActiveItem(value);
  }
  /**
   * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
   * providing a valid index and return true.
   */
  _isValidIndex(index) {
    return this._items ? !!this._items.toArray()[index] : true;
  }
  /**
   * Sets focus on the HTML element for the label wrapper and scrolls it into the view if
   * scrolling is enabled.
   */
  _setTabFocus(tabIndex) {
    if (this._showPaginationControls) {
      this._scrollToLabel(tabIndex);
    }
    if (this._items && this._items.length) {
      this._items.toArray()[tabIndex].focus();
      const containerEl = this._tabListContainer.nativeElement;
      const dir = this._getLayoutDirection();
      if (dir == "ltr") {
        containerEl.scrollLeft = 0;
      } else {
        containerEl.scrollLeft = containerEl.scrollWidth - containerEl.offsetWidth;
      }
    }
  }
  /** The layout direction of the containing app. */
  _getLayoutDirection() {
    return this._dir && this._dir.value === "rtl" ? "rtl" : "ltr";
  }
  /** Performs the CSS transformation on the tab list that will cause the list to scroll. */
  _updateTabScrollPosition() {
    if (this.disablePagination) {
      return;
    }
    const scrollDistance = this.scrollDistance;
    const translateX = this._getLayoutDirection() === "ltr" ? -scrollDistance : scrollDistance;
    this._tabList.nativeElement.style.transform = `translateX(${Math.round(translateX)}px)`;
    if (this._platform.TRIDENT || this._platform.EDGE) {
      this._tabListContainer.nativeElement.scrollLeft = 0;
    }
  }
  /** Sets the distance in pixels that the tab header should be transformed in the X-axis. */
  get scrollDistance() {
    return this._scrollDistance;
  }
  set scrollDistance(value) {
    this._scrollTo(value);
  }
  /**
   * Moves the tab list in the 'before' or 'after' direction (towards the beginning of the list or
   * the end of the list, respectively). The distance to scroll is computed to be a third of the
   * length of the tab list view window.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  _scrollHeader(direction) {
    const viewLength = this._tabListContainer.nativeElement.offsetWidth;
    const scrollAmount = (direction == "before" ? -1 : 1) * viewLength / 3;
    return this._scrollTo(this._scrollDistance + scrollAmount);
  }
  /** Handles click events on the pagination arrows. */
  _handlePaginatorClick(direction) {
    this._stopInterval();
    this._scrollHeader(direction);
  }
  /**
   * Moves the tab list such that the desired tab label (marked by index) is moved into view.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  _scrollToLabel(labelIndex) {
    if (this.disablePagination) {
      return;
    }
    const selectedLabel = this._items ? this._items.toArray()[labelIndex] : null;
    if (!selectedLabel) {
      return;
    }
    const viewLength = this._tabListContainer.nativeElement.offsetWidth;
    const {
      offsetLeft,
      offsetWidth
    } = selectedLabel.elementRef.nativeElement;
    let labelBeforePos, labelAfterPos;
    if (this._getLayoutDirection() == "ltr") {
      labelBeforePos = offsetLeft;
      labelAfterPos = labelBeforePos + offsetWidth;
    } else {
      labelAfterPos = this._tabListInner.nativeElement.offsetWidth - offsetLeft;
      labelBeforePos = labelAfterPos - offsetWidth;
    }
    const beforeVisiblePos = this.scrollDistance;
    const afterVisiblePos = this.scrollDistance + viewLength;
    if (labelBeforePos < beforeVisiblePos) {
      this.scrollDistance -= beforeVisiblePos - labelBeforePos;
    } else if (labelAfterPos > afterVisiblePos) {
      this.scrollDistance += Math.min(labelAfterPos - afterVisiblePos, labelBeforePos - beforeVisiblePos);
    }
  }
  /**
   * Evaluate whether the pagination controls should be displayed. If the scroll width of the
   * tab list is wider than the size of the header container, then the pagination controls should
   * be shown.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  _checkPaginationEnabled() {
    if (this.disablePagination) {
      this._showPaginationControls = false;
    } else {
      const scrollWidth = this._tabListInner.nativeElement.scrollWidth;
      const containerWidth = this._elementRef.nativeElement.offsetWidth;
      const isEnabled = scrollWidth - containerWidth >= 5;
      if (!isEnabled) {
        this.scrollDistance = 0;
      }
      if (isEnabled !== this._showPaginationControls) {
        this._showPaginationControls = isEnabled;
        this._changeDetectorRef.markForCheck();
      }
    }
  }
  /**
   * Evaluate whether the before and after controls should be enabled or disabled.
   * If the header is at the beginning of the list (scroll distance is equal to 0) then disable the
   * before button. If the header is at the end of the list (scroll distance is equal to the
   * maximum distance we can scroll), then disable the after button.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  _checkScrollingControls() {
    if (this.disablePagination) {
      this._disableScrollAfter = this._disableScrollBefore = true;
    } else {
      this._disableScrollBefore = this.scrollDistance == 0;
      this._disableScrollAfter = this.scrollDistance == this._getMaxScrollDistance();
      this._changeDetectorRef.markForCheck();
    }
  }
  /**
   * Determines what is the maximum length in pixels that can be set for the scroll distance. This
   * is equal to the difference in width between the tab list container and tab header container.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  _getMaxScrollDistance() {
    const lengthOfTabList = this._tabListInner.nativeElement.scrollWidth;
    const viewLength = this._tabListContainer.nativeElement.offsetWidth;
    return lengthOfTabList - viewLength || 0;
  }
  /** Tells the ink-bar to align itself to the current label wrapper */
  _alignInkBarToSelectedTab() {
    const selectedItem = this._items && this._items.length ? this._items.toArray()[this.selectedIndex] : null;
    const selectedLabelWrapper = selectedItem ? selectedItem.elementRef.nativeElement : null;
    if (selectedLabelWrapper) {
      this._inkBar.alignToElement(selectedLabelWrapper);
    } else {
      this._inkBar.hide();
    }
  }
  /** Stops the currently-running paginator interval.  */
  _stopInterval() {
    this._stopScrolling.next();
  }
  /**
   * Handles the user pressing down on one of the paginators.
   * Starts scrolling the header after a certain amount of time.
   * @param direction In which direction the paginator should be scrolled.
   */
  _handlePaginatorPress(direction, mouseEvent) {
    if (mouseEvent && mouseEvent.button != null && mouseEvent.button !== 0) {
      return;
    }
    this._stopInterval();
    timer(HEADER_SCROLL_DELAY, HEADER_SCROLL_INTERVAL).pipe(takeUntil(merge(this._stopScrolling, this._destroyed))).subscribe(() => {
      const {
        maxScrollDistance,
        distance
      } = this._scrollHeader(direction);
      if (distance === 0 || distance >= maxScrollDistance) {
        this._stopInterval();
      }
    });
  }
  /**
   * Scrolls the header to a given position.
   * @param position Position to which to scroll.
   * @returns Information on the current scroll distance and the maximum.
   */
  _scrollTo(position) {
    if (this.disablePagination) {
      return {
        maxScrollDistance: 0,
        distance: 0
      };
    }
    const maxScrollDistance = this._getMaxScrollDistance();
    this._scrollDistance = Math.max(0, Math.min(maxScrollDistance, position));
    this._scrollDistanceChanged = true;
    this._checkScrollingControls();
    return {
      maxScrollDistance,
      distance: this._scrollDistance
    };
  }
  static {
    this.\u0275fac = function MatPaginatedTabHeader_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatPaginatedTabHeader)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(ViewportRuler), \u0275\u0275directiveInject(Directionality, 8), \u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(Platform), \u0275\u0275directiveInject(ANIMATION_MODULE_TYPE, 8));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatPaginatedTabHeader,
      inputs: {
        disablePagination: [2, "disablePagination", "disablePagination", booleanAttribute],
        selectedIndex: [2, "selectedIndex", "selectedIndex", numberAttribute]
      },
      outputs: {
        selectFocusedIndex: "selectFocusedIndex",
        indexFocused: "indexFocused"
      },
      features: [\u0275\u0275InputTransformsFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatPaginatedTabHeader, [{
    type: Directive
  }], () => [{
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }, {
    type: ViewportRuler
  }, {
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }, {
    type: NgZone
  }, {
    type: Platform
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [ANIMATION_MODULE_TYPE]
    }]
  }], {
    disablePagination: [{
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
    selectFocusedIndex: [{
      type: Output
    }],
    indexFocused: [{
      type: Output
    }]
  });
})();
var MatTabHeader = class _MatTabHeader extends MatPaginatedTabHeader {
  constructor(elementRef, changeDetectorRef, viewportRuler, dir, ngZone, platform, animationMode) {
    super(elementRef, changeDetectorRef, viewportRuler, dir, ngZone, platform, animationMode);
    this.disableRipple = false;
  }
  ngAfterContentInit() {
    this._inkBar = new MatInkBar(this._items);
    super.ngAfterContentInit();
  }
  _itemSelected(event) {
    event.preventDefault();
  }
  static {
    this.\u0275fac = function MatTabHeader_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatTabHeader)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(ViewportRuler), \u0275\u0275directiveInject(Directionality, 8), \u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(Platform), \u0275\u0275directiveInject(ANIMATION_MODULE_TYPE, 8));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatTabHeader,
      selectors: [["mat-tab-header"]],
      contentQueries: function MatTabHeader_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuery(dirIndex, MatTabLabelWrapper, 4);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._items = _t);
        }
      },
      viewQuery: function MatTabHeader_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuery(_c1, 7);
          \u0275\u0275viewQuery(_c2, 7);
          \u0275\u0275viewQuery(_c3, 7);
          \u0275\u0275viewQuery(_c4, 5);
          \u0275\u0275viewQuery(_c5, 5);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._tabListContainer = _t.first);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._tabList = _t.first);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._tabListInner = _t.first);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._nextPaginator = _t.first);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._previousPaginator = _t.first);
        }
      },
      hostAttrs: [1, "mat-mdc-tab-header"],
      hostVars: 4,
      hostBindings: function MatTabHeader_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275classProp("mat-mdc-tab-header-pagination-controls-enabled", ctx._showPaginationControls)("mat-mdc-tab-header-rtl", ctx._getLayoutDirection() == "rtl");
        }
      },
      inputs: {
        ariaLabel: [0, "aria-label", "ariaLabel"],
        ariaLabelledby: [0, "aria-labelledby", "ariaLabelledby"],
        disableRipple: [2, "disableRipple", "disableRipple", booleanAttribute]
      },
      standalone: true,
      features: [\u0275\u0275InputTransformsFeature, \u0275\u0275InheritDefinitionFeature, \u0275\u0275StandaloneFeature],
      ngContentSelectors: _c0,
      decls: 13,
      vars: 10,
      consts: [["previousPaginator", ""], ["tabListContainer", ""], ["tabList", ""], ["tabListInner", ""], ["nextPaginator", ""], ["mat-ripple", "", 1, "mat-mdc-tab-header-pagination", "mat-mdc-tab-header-pagination-before", 3, "click", "mousedown", "touchend", "matRippleDisabled"], [1, "mat-mdc-tab-header-pagination-chevron"], [1, "mat-mdc-tab-label-container", 3, "keydown"], ["role", "tablist", 1, "mat-mdc-tab-list", 3, "cdkObserveContent"], [1, "mat-mdc-tab-labels"], ["mat-ripple", "", 1, "mat-mdc-tab-header-pagination", "mat-mdc-tab-header-pagination-after", 3, "mousedown", "click", "touchend", "matRippleDisabled"]],
      template: function MatTabHeader_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = \u0275\u0275getCurrentView();
          \u0275\u0275projectionDef();
          \u0275\u0275elementStart(0, "div", 5, 0);
          \u0275\u0275listener("click", function MatTabHeader_Template_div_click_0_listener() {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._handlePaginatorClick("before"));
          })("mousedown", function MatTabHeader_Template_div_mousedown_0_listener($event) {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._handlePaginatorPress("before", $event));
          })("touchend", function MatTabHeader_Template_div_touchend_0_listener() {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._stopInterval());
          });
          \u0275\u0275element(2, "div", 6);
          \u0275\u0275elementEnd();
          \u0275\u0275elementStart(3, "div", 7, 1);
          \u0275\u0275listener("keydown", function MatTabHeader_Template_div_keydown_3_listener($event) {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._handleKeydown($event));
          });
          \u0275\u0275elementStart(5, "div", 8, 2);
          \u0275\u0275listener("cdkObserveContent", function MatTabHeader_Template_div_cdkObserveContent_5_listener() {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._onContentChanges());
          });
          \u0275\u0275elementStart(7, "div", 9, 3);
          \u0275\u0275projection(9);
          \u0275\u0275elementEnd()()();
          \u0275\u0275elementStart(10, "div", 10, 4);
          \u0275\u0275listener("mousedown", function MatTabHeader_Template_div_mousedown_10_listener($event) {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._handlePaginatorPress("after", $event));
          })("click", function MatTabHeader_Template_div_click_10_listener() {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._handlePaginatorClick("after"));
          })("touchend", function MatTabHeader_Template_div_touchend_10_listener() {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._stopInterval());
          });
          \u0275\u0275element(12, "div", 6);
          \u0275\u0275elementEnd();
        }
        if (rf & 2) {
          \u0275\u0275classProp("mat-mdc-tab-header-pagination-disabled", ctx._disableScrollBefore);
          \u0275\u0275property("matRippleDisabled", ctx._disableScrollBefore || ctx.disableRipple);
          \u0275\u0275advance(3);
          \u0275\u0275classProp("_mat-animation-noopable", ctx._animationMode === "NoopAnimations");
          \u0275\u0275advance(2);
          \u0275\u0275attribute("aria-label", ctx.ariaLabel || null)("aria-labelledby", ctx.ariaLabelledby || null);
          \u0275\u0275advance(5);
          \u0275\u0275classProp("mat-mdc-tab-header-pagination-disabled", ctx._disableScrollAfter);
          \u0275\u0275property("matRippleDisabled", ctx._disableScrollAfter || ctx.disableRipple);
        }
      },
      dependencies: [MatRipple, CdkObserveContent],
      styles: [".mat-mdc-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mdc-tab-indicator .mdc-tab-indicator__content{transition-duration:var(--mat-tab-animation-duration, 250ms)}.mat-mdc-tab-header-pagination{-webkit-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:none;box-sizing:content-box;outline:0}.mat-mdc-tab-header-pagination::-moz-focus-inner{border:0}.mat-mdc-tab-header-pagination .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-header-inactive-ripple-color, var(--mat-app-on-surface))}.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination{display:flex}.mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after{padding-left:4px}.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-pagination-after{padding-right:4px}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-mdc-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;height:8px;width:8px;border-color:var(--mat-tab-header-pagination-icon-color, var(--mat-app-on-surface))}.mat-mdc-tab-header-pagination-disabled{box-shadow:none;cursor:default;pointer-events:none}.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron{opacity:.4}.mat-mdc-tab-list{flex-grow:1;position:relative;transition:transform 500ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-mdc-tab-list{transition:none}.mat-mdc-tab-label-container{display:flex;flex-grow:1;overflow:hidden;z-index:1;border-bottom-style:solid;border-bottom-width:var(--mat-tab-header-divider-height);border-bottom-color:var(--mat-tab-header-divider-color, var(--mat-app-surface-variant))}.mat-mdc-tab-group-inverted-header .mat-mdc-tab-label-container{border-bottom:none;border-top-style:solid;border-top-width:var(--mat-tab-header-divider-height);border-top-color:var(--mat-tab-header-divider-color, var(--mat-app-surface-variant))}.mat-mdc-tab-labels{display:flex;flex:1 0 auto}[mat-align-tabs=center]>.mat-mdc-tab-header .mat-mdc-tab-labels{justify-content:center}[mat-align-tabs=end]>.mat-mdc-tab-header .mat-mdc-tab-labels{justify-content:flex-end}.cdk-drop-list .mat-mdc-tab-labels,.mat-mdc-tab-labels.cdk-drop-list{min-height:var(--mdc-secondary-navigation-tab-container-height)}.mat-mdc-tab::before{margin:5px}.cdk-high-contrast-active .mat-mdc-tab[aria-disabled=true]{color:GrayText}"],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTabHeader, [{
    type: Component,
    args: [{
      selector: "mat-tab-header",
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.Default,
      host: {
        "class": "mat-mdc-tab-header",
        "[class.mat-mdc-tab-header-pagination-controls-enabled]": "_showPaginationControls",
        "[class.mat-mdc-tab-header-rtl]": "_getLayoutDirection() == 'rtl'"
      },
      standalone: true,
      imports: [MatRipple, CdkObserveContent],
      template: `<!--
 Note that this intentionally uses a \`div\` instead of a \`button\`, because it's not part of
 the regular tabs flow and is only here to support mouse users. It should also not be focusable.
-->
<div class="mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-before"
     #previousPaginator
     mat-ripple
     [matRippleDisabled]="_disableScrollBefore || disableRipple"
     [class.mat-mdc-tab-header-pagination-disabled]="_disableScrollBefore"
     (click)="_handlePaginatorClick('before')"
     (mousedown)="_handlePaginatorPress('before', $event)"
     (touchend)="_stopInterval()">
  <div class="mat-mdc-tab-header-pagination-chevron"></div>
</div>

<div
  class="mat-mdc-tab-label-container"
  #tabListContainer
  (keydown)="_handleKeydown($event)"
  [class._mat-animation-noopable]="_animationMode === 'NoopAnimations'">
  <div
    #tabList
    class="mat-mdc-tab-list"
    role="tablist"
    [attr.aria-label]="ariaLabel || null"
    [attr.aria-labelledby]="ariaLabelledby || null"
    (cdkObserveContent)="_onContentChanges()">
    <div class="mat-mdc-tab-labels" #tabListInner>
      <ng-content></ng-content>
    </div>
  </div>
</div>

<div class="mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-after"
     #nextPaginator
     mat-ripple
     [matRippleDisabled]="_disableScrollAfter || disableRipple"
     [class.mat-mdc-tab-header-pagination-disabled]="_disableScrollAfter"
     (mousedown)="_handlePaginatorPress('after', $event)"
     (click)="_handlePaginatorClick('after')"
     (touchend)="_stopInterval()">
  <div class="mat-mdc-tab-header-pagination-chevron"></div>
</div>
`,
      styles: [".mat-mdc-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mdc-tab-indicator .mdc-tab-indicator__content{transition-duration:var(--mat-tab-animation-duration, 250ms)}.mat-mdc-tab-header-pagination{-webkit-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:none;box-sizing:content-box;outline:0}.mat-mdc-tab-header-pagination::-moz-focus-inner{border:0}.mat-mdc-tab-header-pagination .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-header-inactive-ripple-color, var(--mat-app-on-surface))}.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination{display:flex}.mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after{padding-left:4px}.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-pagination-after{padding-right:4px}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-mdc-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;height:8px;width:8px;border-color:var(--mat-tab-header-pagination-icon-color, var(--mat-app-on-surface))}.mat-mdc-tab-header-pagination-disabled{box-shadow:none;cursor:default;pointer-events:none}.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron{opacity:.4}.mat-mdc-tab-list{flex-grow:1;position:relative;transition:transform 500ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-mdc-tab-list{transition:none}.mat-mdc-tab-label-container{display:flex;flex-grow:1;overflow:hidden;z-index:1;border-bottom-style:solid;border-bottom-width:var(--mat-tab-header-divider-height);border-bottom-color:var(--mat-tab-header-divider-color, var(--mat-app-surface-variant))}.mat-mdc-tab-group-inverted-header .mat-mdc-tab-label-container{border-bottom:none;border-top-style:solid;border-top-width:var(--mat-tab-header-divider-height);border-top-color:var(--mat-tab-header-divider-color, var(--mat-app-surface-variant))}.mat-mdc-tab-labels{display:flex;flex:1 0 auto}[mat-align-tabs=center]>.mat-mdc-tab-header .mat-mdc-tab-labels{justify-content:center}[mat-align-tabs=end]>.mat-mdc-tab-header .mat-mdc-tab-labels{justify-content:flex-end}.cdk-drop-list .mat-mdc-tab-labels,.mat-mdc-tab-labels.cdk-drop-list{min-height:var(--mdc-secondary-navigation-tab-container-height)}.mat-mdc-tab::before{margin:5px}.cdk-high-contrast-active .mat-mdc-tab[aria-disabled=true]{color:GrayText}"]
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }, {
    type: ViewportRuler
  }, {
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }, {
    type: NgZone
  }, {
    type: Platform
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [ANIMATION_MODULE_TYPE]
    }]
  }], {
    _items: [{
      type: ContentChildren,
      args: [MatTabLabelWrapper, {
        descendants: false
      }]
    }],
    _tabListContainer: [{
      type: ViewChild,
      args: ["tabListContainer", {
        static: true
      }]
    }],
    _tabList: [{
      type: ViewChild,
      args: ["tabList", {
        static: true
      }]
    }],
    _tabListInner: [{
      type: ViewChild,
      args: ["tabListInner", {
        static: true
      }]
    }],
    _nextPaginator: [{
      type: ViewChild,
      args: ["nextPaginator"]
    }],
    _previousPaginator: [{
      type: ViewChild,
      args: ["previousPaginator"]
    }],
    ariaLabel: [{
      type: Input,
      args: ["aria-label"]
    }],
    ariaLabelledby: [{
      type: Input,
      args: ["aria-labelledby"]
    }],
    disableRipple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var MAT_TABS_CONFIG = new InjectionToken("MAT_TABS_CONFIG");
var matTabsAnimations = {
  /** Animation translates a tab along the X axis. */
  translateTab: trigger("translateTab", [
    // Transitions to `none` instead of 0, because some browsers might blur the content.
    state("center, void, left-origin-center, right-origin-center", style({
      transform: "none",
      visibility: "visible"
    })),
    // If the tab is either on the left or right, we additionally add a `min-height` of 1px
    // in order to ensure that the element has a height before its state changes. This is
    // necessary because Chrome does seem to skip the transition in RTL mode if the element does
    // not have a static height and is not rendered. See related issue: #9465
    state("left", style({
      transform: "translate3d(-100%, 0, 0)",
      minHeight: "1px",
      // Normally this is redundant since we detach the content from the DOM, but if the user
      // opted into keeping the content in the DOM, we have to hide it so it isn't focusable.
      visibility: "hidden"
    })),
    state("right", style({
      transform: "translate3d(100%, 0, 0)",
      minHeight: "1px",
      visibility: "hidden"
    })),
    transition("* => left, * => right, left => center, right => center", animate("{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)")),
    transition("void => left-origin-center", [style({
      transform: "translate3d(-100%, 0, 0)",
      visibility: "hidden"
    }), animate("{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)")]),
    transition("void => right-origin-center", [style({
      transform: "translate3d(100%, 0, 0)",
      visibility: "hidden"
    }), animate("{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)")])
  ])
};
var MatTabBodyPortal = class _MatTabBodyPortal extends CdkPortalOutlet {
  constructor(componentFactoryResolver, viewContainerRef, _host, _document) {
    super(componentFactoryResolver, viewContainerRef, _document);
    this._host = _host;
    this._centeringSub = Subscription.EMPTY;
    this._leavingSub = Subscription.EMPTY;
  }
  /** Set initial visibility or set up subscription for changing visibility. */
  ngOnInit() {
    super.ngOnInit();
    this._centeringSub = this._host._beforeCentering.pipe(startWith(this._host._isCenterPosition(this._host._position))).subscribe((isCentering) => {
      if (this._host._content && isCentering && !this.hasAttached()) {
        this.attach(this._host._content);
      }
    });
    this._leavingSub = this._host._afterLeavingCenter.subscribe(() => {
      if (!this._host.preserveContent) {
        this.detach();
      }
    });
  }
  /** Clean up centering subscription. */
  ngOnDestroy() {
    super.ngOnDestroy();
    this._centeringSub.unsubscribe();
    this._leavingSub.unsubscribe();
  }
  static {
    this.\u0275fac = function MatTabBodyPortal_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatTabBodyPortal)(\u0275\u0275directiveInject(ComponentFactoryResolver$1), \u0275\u0275directiveInject(ViewContainerRef), \u0275\u0275directiveInject(forwardRef(() => MatTabBody)), \u0275\u0275directiveInject(DOCUMENT));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatTabBodyPortal,
      selectors: [["", "matTabBodyHost", ""]],
      standalone: true,
      features: [\u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTabBodyPortal, [{
    type: Directive,
    args: [{
      selector: "[matTabBodyHost]",
      standalone: true
    }]
  }], () => [{
    type: ComponentFactoryResolver$1
  }, {
    type: ViewContainerRef
  }, {
    type: MatTabBody,
    decorators: [{
      type: Inject,
      args: [forwardRef(() => MatTabBody)]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], null);
})();
var MatTabBody = class _MatTabBody {
  /** The shifted index position of the tab body, where zero represents the active center tab. */
  set position(position) {
    this._positionIndex = position;
    this._computePositionAnimationState();
  }
  constructor(_elementRef, _dir, changeDetectorRef) {
    this._elementRef = _elementRef;
    this._dir = _dir;
    this._dirChangeSubscription = Subscription.EMPTY;
    this._translateTabComplete = new Subject();
    this._onCentering = new EventEmitter();
    this._beforeCentering = new EventEmitter();
    this._afterLeavingCenter = new EventEmitter();
    this._onCentered = new EventEmitter(true);
    this.animationDuration = "500ms";
    this.preserveContent = false;
    if (_dir) {
      this._dirChangeSubscription = _dir.change.subscribe((dir) => {
        this._computePositionAnimationState(dir);
        changeDetectorRef.markForCheck();
      });
    }
    this._translateTabComplete.subscribe((event) => {
      if (this._isCenterPosition(event.toState) && this._isCenterPosition(this._position)) {
        this._onCentered.emit();
      }
      if (this._isCenterPosition(event.fromState) && !this._isCenterPosition(this._position)) {
        this._afterLeavingCenter.emit();
      }
    });
  }
  /**
   * After initialized, check if the content is centered and has an origin. If so, set the
   * special position states that transition the tab from the left or right before centering.
   */
  ngOnInit() {
    if (this._position == "center" && this.origin != null) {
      this._position = this._computePositionFromOrigin(this.origin);
    }
  }
  ngOnDestroy() {
    this._dirChangeSubscription.unsubscribe();
    this._translateTabComplete.complete();
  }
  _onTranslateTabStarted(event) {
    const isCentering = this._isCenterPosition(event.toState);
    this._beforeCentering.emit(isCentering);
    if (isCentering) {
      this._onCentering.emit(this._elementRef.nativeElement.clientHeight);
    }
  }
  /** The text direction of the containing app. */
  _getLayoutDirection() {
    return this._dir && this._dir.value === "rtl" ? "rtl" : "ltr";
  }
  /** Whether the provided position state is considered center, regardless of origin. */
  _isCenterPosition(position) {
    return position == "center" || position == "left-origin-center" || position == "right-origin-center";
  }
  /** Computes the position state that will be used for the tab-body animation trigger. */
  _computePositionAnimationState(dir = this._getLayoutDirection()) {
    if (this._positionIndex < 0) {
      this._position = dir == "ltr" ? "left" : "right";
    } else if (this._positionIndex > 0) {
      this._position = dir == "ltr" ? "right" : "left";
    } else {
      this._position = "center";
    }
  }
  /**
   * Computes the position state based on the specified origin position. This is used if the
   * tab is becoming visible immediately after creation.
   */
  _computePositionFromOrigin(origin) {
    const dir = this._getLayoutDirection();
    if (dir == "ltr" && origin <= 0 || dir == "rtl" && origin > 0) {
      return "left-origin-center";
    }
    return "right-origin-center";
  }
  static {
    this.\u0275fac = function MatTabBody_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatTabBody)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(Directionality, 8), \u0275\u0275directiveInject(ChangeDetectorRef));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatTabBody,
      selectors: [["mat-tab-body"]],
      viewQuery: function MatTabBody_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuery(CdkPortalOutlet, 5);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._portalHost = _t.first);
        }
      },
      hostAttrs: [1, "mat-mdc-tab-body"],
      inputs: {
        _content: [0, "content", "_content"],
        origin: "origin",
        animationDuration: "animationDuration",
        preserveContent: "preserveContent",
        position: "position"
      },
      outputs: {
        _onCentering: "_onCentering",
        _beforeCentering: "_beforeCentering",
        _afterLeavingCenter: "_afterLeavingCenter",
        _onCentered: "_onCentered"
      },
      standalone: true,
      features: [\u0275\u0275StandaloneFeature],
      decls: 3,
      vars: 6,
      consts: [["content", ""], ["cdkScrollable", "", 1, "mat-mdc-tab-body-content"], ["matTabBodyHost", ""]],
      template: function MatTabBody_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = \u0275\u0275getCurrentView();
          \u0275\u0275elementStart(0, "div", 1, 0);
          \u0275\u0275listener("@translateTab.start", function MatTabBody_Template_div_animation_translateTab_start_0_listener($event) {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._onTranslateTabStarted($event));
          })("@translateTab.done", function MatTabBody_Template_div_animation_translateTab_done_0_listener($event) {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._translateTabComplete.next($event));
          });
          \u0275\u0275template(2, MatTabBody_ng_template_2_Template, 0, 0, "ng-template", 2);
          \u0275\u0275elementEnd();
        }
        if (rf & 2) {
          \u0275\u0275property("@translateTab", \u0275\u0275pureFunction2(3, _c7, ctx._position, \u0275\u0275pureFunction1(1, _c6, ctx.animationDuration)));
        }
      },
      dependencies: [MatTabBodyPortal, CdkScrollable],
      styles: ['.mat-mdc-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;outline:0;flex-basis:100%}.mat-mdc-tab-body.mat-mdc-tab-body-active{position:relative;overflow-x:hidden;overflow-y:auto;z-index:1;flex-grow:1}.mat-mdc-tab-group.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body.mat-mdc-tab-body-active{overflow-y:hidden}.mat-mdc-tab-body-content{height:100%;overflow:auto}.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body-content{overflow:hidden}.mat-mdc-tab-body-content[style*="visibility: hidden"]{display:none}'],
      encapsulation: 2,
      data: {
        animation: [matTabsAnimations.translateTab]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTabBody, [{
    type: Component,
    args: [{
      selector: "mat-tab-body",
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.Default,
      animations: [matTabsAnimations.translateTab],
      host: {
        "class": "mat-mdc-tab-body"
      },
      standalone: true,
      imports: [MatTabBodyPortal, CdkScrollable],
      template: '<div class="mat-mdc-tab-body-content" #content\n     [@translateTab]="{\n        value: _position,\n        params: {animationDuration: animationDuration}\n     }"\n     (@translateTab.start)="_onTranslateTabStarted($event)"\n     (@translateTab.done)="_translateTabComplete.next($event)"\n     cdkScrollable>\n  <ng-template matTabBodyHost></ng-template>\n</div>\n',
      styles: ['.mat-mdc-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;outline:0;flex-basis:100%}.mat-mdc-tab-body.mat-mdc-tab-body-active{position:relative;overflow-x:hidden;overflow-y:auto;z-index:1;flex-grow:1}.mat-mdc-tab-group.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body.mat-mdc-tab-body-active{overflow-y:hidden}.mat-mdc-tab-body-content{height:100%;overflow:auto}.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body-content{overflow:hidden}.mat-mdc-tab-body-content[style*="visibility: hidden"]{display:none}']
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }, {
    type: ChangeDetectorRef
  }], {
    _onCentering: [{
      type: Output
    }],
    _beforeCentering: [{
      type: Output
    }],
    _afterLeavingCenter: [{
      type: Output
    }],
    _onCentered: [{
      type: Output
    }],
    _portalHost: [{
      type: ViewChild,
      args: [CdkPortalOutlet]
    }],
    _content: [{
      type: Input,
      args: ["content"]
    }],
    origin: [{
      type: Input
    }],
    animationDuration: [{
      type: Input
    }],
    preserveContent: [{
      type: Input
    }],
    position: [{
      type: Input
    }]
  });
})();
var nextId = 0;
var ENABLE_BACKGROUND_INPUT = true;
var MatTabGroup = class _MatTabGroup {
  /** Whether the ink bar should fit its width to the size of the tab label content. */
  get fitInkBarToContent() {
    return this._fitInkBarToContent;
  }
  set fitInkBarToContent(value) {
    this._fitInkBarToContent = value;
    this._changeDetectorRef.markForCheck();
  }
  /** The index of the active tab. */
  get selectedIndex() {
    return this._selectedIndex;
  }
  set selectedIndex(value) {
    this._indexToSelect = isNaN(value) ? null : value;
  }
  /** Duration for the tab animation. Will be normalized to milliseconds if no units are set. */
  get animationDuration() {
    return this._animationDuration;
  }
  set animationDuration(value) {
    const stringValue = value + "";
    this._animationDuration = /^\d+$/.test(stringValue) ? value + "ms" : stringValue;
  }
  /**
   * `tabindex` to be set on the inner element that wraps the tab content. Can be used for improved
   * accessibility when the tab does not have focusable elements or if it has scrollable content.
   * The `tabindex` will be removed automatically for inactive tabs.
   * Read more at https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/tabs.html
   */
  get contentTabIndex() {
    return this._contentTabIndex;
  }
  set contentTabIndex(value) {
    this._contentTabIndex = isNaN(value) ? null : value;
  }
  /**
   * Theme color of the background of the tab group. This API is supported in M2 themes only, it
   * has no effect in M3 themes.
   *
   * For information on applying color variants in M3, see
   * https://material.angular.io/guide/theming#using-component-color-variants.
   *
   * @deprecated The background color should be customized through Sass theming APIs.
   * @breaking-change 20.0.0 Remove this input
   */
  get backgroundColor() {
    return this._backgroundColor;
  }
  set backgroundColor(value) {
    if (!ENABLE_BACKGROUND_INPUT) {
      throw new Error(`mat-tab-group background color must be set through the Sass theming API`);
    }
    const classList = this._elementRef.nativeElement.classList;
    classList.remove("mat-tabs-with-background", `mat-background-${this.backgroundColor}`);
    if (value) {
      classList.add("mat-tabs-with-background", `mat-background-${value}`);
    }
    this._backgroundColor = value;
  }
  constructor(_elementRef, _changeDetectorRef, defaultConfig, _animationMode) {
    this._elementRef = _elementRef;
    this._changeDetectorRef = _changeDetectorRef;
    this._animationMode = _animationMode;
    this._tabs = new QueryList();
    this._indexToSelect = 0;
    this._lastFocusedTabIndex = null;
    this._tabBodyWrapperHeight = 0;
    this._tabsSubscription = Subscription.EMPTY;
    this._tabLabelSubscription = Subscription.EMPTY;
    this._fitInkBarToContent = false;
    this.stretchTabs = true;
    this.dynamicHeight = false;
    this._selectedIndex = null;
    this.headerPosition = "above";
    this.disablePagination = false;
    this.disableRipple = false;
    this.preserveContent = false;
    this.selectedIndexChange = new EventEmitter();
    this.focusChange = new EventEmitter();
    this.animationDone = new EventEmitter();
    this.selectedTabChange = new EventEmitter(true);
    this._isServer = !inject(Platform).isBrowser;
    this._groupId = nextId++;
    this.animationDuration = defaultConfig && defaultConfig.animationDuration ? defaultConfig.animationDuration : "500ms";
    this.disablePagination = defaultConfig && defaultConfig.disablePagination != null ? defaultConfig.disablePagination : false;
    this.dynamicHeight = defaultConfig && defaultConfig.dynamicHeight != null ? defaultConfig.dynamicHeight : false;
    if (defaultConfig?.contentTabIndex != null) {
      this.contentTabIndex = defaultConfig.contentTabIndex;
    }
    this.preserveContent = !!defaultConfig?.preserveContent;
    this.fitInkBarToContent = defaultConfig && defaultConfig.fitInkBarToContent != null ? defaultConfig.fitInkBarToContent : false;
    this.stretchTabs = defaultConfig && defaultConfig.stretchTabs != null ? defaultConfig.stretchTabs : true;
  }
  /**
   * After the content is checked, this component knows what tabs have been defined
   * and what the selected index should be. This is where we can know exactly what position
   * each tab should be in according to the new selected index, and additionally we know how
   * a new selected tab should transition in (from the left or right).
   */
  ngAfterContentChecked() {
    const indexToSelect = this._indexToSelect = this._clampTabIndex(this._indexToSelect);
    if (this._selectedIndex != indexToSelect) {
      const isFirstRun = this._selectedIndex == null;
      if (!isFirstRun) {
        this.selectedTabChange.emit(this._createChangeEvent(indexToSelect));
        const wrapper = this._tabBodyWrapper.nativeElement;
        wrapper.style.minHeight = wrapper.clientHeight + "px";
      }
      Promise.resolve().then(() => {
        this._tabs.forEach((tab, index) => tab.isActive = index === indexToSelect);
        if (!isFirstRun) {
          this.selectedIndexChange.emit(indexToSelect);
          this._tabBodyWrapper.nativeElement.style.minHeight = "";
        }
      });
    }
    this._tabs.forEach((tab, index) => {
      tab.position = index - indexToSelect;
      if (this._selectedIndex != null && tab.position == 0 && !tab.origin) {
        tab.origin = indexToSelect - this._selectedIndex;
      }
    });
    if (this._selectedIndex !== indexToSelect) {
      this._selectedIndex = indexToSelect;
      this._lastFocusedTabIndex = null;
      this._changeDetectorRef.markForCheck();
    }
  }
  ngAfterContentInit() {
    this._subscribeToAllTabChanges();
    this._subscribeToTabLabels();
    this._tabsSubscription = this._tabs.changes.subscribe(() => {
      const indexToSelect = this._clampTabIndex(this._indexToSelect);
      if (indexToSelect === this._selectedIndex) {
        const tabs = this._tabs.toArray();
        let selectedTab;
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].isActive) {
            this._indexToSelect = this._selectedIndex = i;
            this._lastFocusedTabIndex = null;
            selectedTab = tabs[i];
            break;
          }
        }
        if (!selectedTab && tabs[indexToSelect]) {
          Promise.resolve().then(() => {
            tabs[indexToSelect].isActive = true;
            this.selectedTabChange.emit(this._createChangeEvent(indexToSelect));
          });
        }
      }
      this._changeDetectorRef.markForCheck();
    });
  }
  /** Listens to changes in all of the tabs. */
  _subscribeToAllTabChanges() {
    this._allTabs.changes.pipe(startWith(this._allTabs)).subscribe((tabs) => {
      this._tabs.reset(tabs.filter((tab) => {
        return tab._closestTabGroup === this || !tab._closestTabGroup;
      }));
      this._tabs.notifyOnChanges();
    });
  }
  ngOnDestroy() {
    this._tabs.destroy();
    this._tabsSubscription.unsubscribe();
    this._tabLabelSubscription.unsubscribe();
  }
  /** Re-aligns the ink bar to the selected tab element. */
  realignInkBar() {
    if (this._tabHeader) {
      this._tabHeader._alignInkBarToSelectedTab();
    }
  }
  /**
   * Recalculates the tab group's pagination dimensions.
   *
   * WARNING: Calling this method can be very costly in terms of performance. It should be called
   * as infrequently as possible from outside of the Tabs component as it causes a reflow of the
   * page.
   */
  updatePagination() {
    if (this._tabHeader) {
      this._tabHeader.updatePagination();
    }
  }
  /**
   * Sets focus to a particular tab.
   * @param index Index of the tab to be focused.
   */
  focusTab(index) {
    const header = this._tabHeader;
    if (header) {
      header.focusIndex = index;
    }
  }
  _focusChanged(index) {
    this._lastFocusedTabIndex = index;
    this.focusChange.emit(this._createChangeEvent(index));
  }
  _createChangeEvent(index) {
    const event = new MatTabChangeEvent();
    event.index = index;
    if (this._tabs && this._tabs.length) {
      event.tab = this._tabs.toArray()[index];
    }
    return event;
  }
  /**
   * Subscribes to changes in the tab labels. This is needed, because the @Input for the label is
   * on the MatTab component, whereas the data binding is inside the MatTabGroup. In order for the
   * binding to be updated, we need to subscribe to changes in it and trigger change detection
   * manually.
   */
  _subscribeToTabLabels() {
    if (this._tabLabelSubscription) {
      this._tabLabelSubscription.unsubscribe();
    }
    this._tabLabelSubscription = merge(...this._tabs.map((tab) => tab._stateChanges)).subscribe(() => this._changeDetectorRef.markForCheck());
  }
  /** Clamps the given index to the bounds of 0 and the tabs length. */
  _clampTabIndex(index) {
    return Math.min(this._tabs.length - 1, Math.max(index || 0, 0));
  }
  /** Returns a unique id for each tab label element */
  _getTabLabelId(i) {
    return `mat-tab-label-${this._groupId}-${i}`;
  }
  /** Returns a unique id for each tab content element */
  _getTabContentId(i) {
    return `mat-tab-content-${this._groupId}-${i}`;
  }
  /**
   * Sets the height of the body wrapper to the height of the activating tab if dynamic
   * height property is true.
   */
  _setTabBodyWrapperHeight(tabHeight) {
    if (!this.dynamicHeight || !this._tabBodyWrapperHeight) {
      return;
    }
    const wrapper = this._tabBodyWrapper.nativeElement;
    wrapper.style.height = this._tabBodyWrapperHeight + "px";
    if (this._tabBodyWrapper.nativeElement.offsetHeight) {
      wrapper.style.height = tabHeight + "px";
    }
  }
  /** Removes the height of the tab body wrapper. */
  _removeTabBodyWrapperHeight() {
    const wrapper = this._tabBodyWrapper.nativeElement;
    this._tabBodyWrapperHeight = wrapper.clientHeight;
    wrapper.style.height = "";
    this.animationDone.emit();
  }
  /** Handle click events, setting new selected index if appropriate. */
  _handleClick(tab, tabHeader, index) {
    tabHeader.focusIndex = index;
    if (!tab.disabled) {
      this.selectedIndex = index;
    }
  }
  /** Retrieves the tabindex for the tab. */
  _getTabIndex(index) {
    const targetIndex = this._lastFocusedTabIndex ?? this.selectedIndex;
    return index === targetIndex ? 0 : -1;
  }
  /** Callback for when the focused state of a tab has changed. */
  _tabFocusChanged(focusOrigin, index) {
    if (focusOrigin && focusOrigin !== "mouse" && focusOrigin !== "touch") {
      this._tabHeader.focusIndex = index;
    }
  }
  static {
    this.\u0275fac = function MatTabGroup_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatTabGroup)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(MAT_TABS_CONFIG, 8), \u0275\u0275directiveInject(ANIMATION_MODULE_TYPE, 8));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatTabGroup,
      selectors: [["mat-tab-group"]],
      contentQueries: function MatTabGroup_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuery(dirIndex, MatTab, 5);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._allTabs = _t);
        }
      },
      viewQuery: function MatTabGroup_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuery(_c8, 5);
          \u0275\u0275viewQuery(_c9, 5);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._tabBodyWrapper = _t.first);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._tabHeader = _t.first);
        }
      },
      hostAttrs: [1, "mat-mdc-tab-group"],
      hostVars: 10,
      hostBindings: function MatTabGroup_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275classMap("mat-" + (ctx.color || "primary"));
          \u0275\u0275styleProp("--mat-tab-animation-duration", ctx.animationDuration);
          \u0275\u0275classProp("mat-mdc-tab-group-dynamic-height", ctx.dynamicHeight)("mat-mdc-tab-group-inverted-header", ctx.headerPosition === "below")("mat-mdc-tab-group-stretch-tabs", ctx.stretchTabs);
        }
      },
      inputs: {
        color: "color",
        fitInkBarToContent: [2, "fitInkBarToContent", "fitInkBarToContent", booleanAttribute],
        stretchTabs: [2, "mat-stretch-tabs", "stretchTabs", booleanAttribute],
        dynamicHeight: [2, "dynamicHeight", "dynamicHeight", booleanAttribute],
        selectedIndex: [2, "selectedIndex", "selectedIndex", numberAttribute],
        headerPosition: "headerPosition",
        animationDuration: "animationDuration",
        contentTabIndex: [2, "contentTabIndex", "contentTabIndex", numberAttribute],
        disablePagination: [2, "disablePagination", "disablePagination", booleanAttribute],
        disableRipple: [2, "disableRipple", "disableRipple", booleanAttribute],
        preserveContent: [2, "preserveContent", "preserveContent", booleanAttribute],
        backgroundColor: "backgroundColor",
        ariaLabel: [0, "aria-label", "ariaLabel"],
        ariaLabelledby: [0, "aria-labelledby", "ariaLabelledby"]
      },
      outputs: {
        selectedIndexChange: "selectedIndexChange",
        focusChange: "focusChange",
        animationDone: "animationDone",
        selectedTabChange: "selectedTabChange"
      },
      exportAs: ["matTabGroup"],
      standalone: true,
      features: [\u0275\u0275ProvidersFeature([{
        provide: MAT_TAB_GROUP,
        useExisting: _MatTabGroup
      }]), \u0275\u0275InputTransformsFeature, \u0275\u0275StandaloneFeature],
      ngContentSelectors: _c0,
      decls: 9,
      vars: 8,
      consts: [["tabHeader", ""], ["tabBodyWrapper", ""], ["tabNode", ""], [3, "indexFocused", "selectFocusedIndex", "selectedIndex", "disableRipple", "disablePagination", "aria-label", "aria-labelledby"], ["role", "tab", "matTabLabelWrapper", "", "cdkMonitorElementFocus", "", 1, "mdc-tab", "mat-mdc-tab", "mat-mdc-focus-indicator", 3, "id", "mdc-tab--active", "class", "disabled", "fitInkBarToContent"], [1, "mat-mdc-tab-body-wrapper"], ["role", "tabpanel", 3, "id", "mat-mdc-tab-body-active", "class", "content", "position", "origin", "animationDuration", "preserveContent"], ["role", "tab", "matTabLabelWrapper", "", "cdkMonitorElementFocus", "", 1, "mdc-tab", "mat-mdc-tab", "mat-mdc-focus-indicator", 3, "click", "cdkFocusChange", "id", "disabled", "fitInkBarToContent"], [1, "mdc-tab__ripple"], ["mat-ripple", "", 1, "mat-mdc-tab-ripple", 3, "matRippleTrigger", "matRippleDisabled"], [1, "mdc-tab__content"], [1, "mdc-tab__text-label"], [3, "cdkPortalOutlet"], ["role", "tabpanel", 3, "_onCentered", "_onCentering", "id", "content", "position", "origin", "animationDuration", "preserveContent"]],
      template: function MatTabGroup_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = \u0275\u0275getCurrentView();
          \u0275\u0275projectionDef();
          \u0275\u0275elementStart(0, "mat-tab-header", 3, 0);
          \u0275\u0275listener("indexFocused", function MatTabGroup_Template_mat_tab_header_indexFocused_0_listener($event) {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._focusChanged($event));
          })("selectFocusedIndex", function MatTabGroup_Template_mat_tab_header_selectFocusedIndex_0_listener($event) {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx.selectedIndex = $event);
          });
          \u0275\u0275repeaterCreate(2, MatTabGroup_For_3_Template, 8, 17, "div", 4, \u0275\u0275repeaterTrackByIdentity);
          \u0275\u0275elementEnd();
          \u0275\u0275template(4, MatTabGroup_Conditional_4_Template, 1, 0);
          \u0275\u0275elementStart(5, "div", 5, 1);
          \u0275\u0275repeaterCreate(7, MatTabGroup_For_8_Template, 1, 13, "mat-tab-body", 6, \u0275\u0275repeaterTrackByIdentity);
          \u0275\u0275elementEnd();
        }
        if (rf & 2) {
          \u0275\u0275property("selectedIndex", ctx.selectedIndex || 0)("disableRipple", ctx.disableRipple)("disablePagination", ctx.disablePagination)("aria-label", ctx.ariaLabel)("aria-labelledby", ctx.ariaLabelledby);
          \u0275\u0275advance(2);
          \u0275\u0275repeater(ctx._tabs);
          \u0275\u0275advance(2);
          \u0275\u0275conditional(ctx._isServer ? 4 : -1);
          \u0275\u0275advance();
          \u0275\u0275classProp("_mat-animation-noopable", ctx._animationMode === "NoopAnimations");
          \u0275\u0275advance(2);
          \u0275\u0275repeater(ctx._tabs);
        }
      },
      dependencies: [MatTabHeader, MatTabLabelWrapper, CdkMonitorFocus, MatRipple, CdkPortalOutlet, MatTabBody],
      styles: ['.mdc-tab{min-width:90px;padding:0 24px;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;border:none;outline:none;text-align:center;white-space:nowrap;cursor:pointer;z-index:1}.mdc-tab__content{display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab--active .mdc-tab__text-label{transition-delay:100ms}._mat-animation-noopable .mdc-tab__text-label{transition:none}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator__content{transition:var(--mat-tab-animation-duration, 250ms) transform cubic-bezier(0.4, 0, 0.2, 1);transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}._mat-animation-noopable .mdc-tab-indicator__content,.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mat-mdc-tab-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-mdc-tab{-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-decoration:none;background:none;height:var(--mdc-secondary-navigation-tab-container-height);font-family:var(--mat-tab-header-label-text-font, var(--mat-app-title-small-font));font-size:var(--mat-tab-header-label-text-size, var(--mat-app-title-small-size));letter-spacing:var(--mat-tab-header-label-text-tracking, var(--mat-app-title-small-tracking));line-height:var(--mat-tab-header-label-text-line-height, var(--mat-app-title-small-line-height));font-weight:var(--mat-tab-header-label-text-weight, var(--mat-app-title-small-weight))}.mat-mdc-tab.mdc-tab{flex-grow:0}.mat-mdc-tab .mdc-tab-indicator__content--underline{border-color:var(--mdc-tab-indicator-active-indicator-color, var(--mat-app-primary));border-top-width:var(--mdc-tab-indicator-active-indicator-height);border-radius:var(--mdc-tab-indicator-active-indicator-shape)}.mat-mdc-tab:hover .mdc-tab__text-label{color:var(--mat-tab-header-inactive-hover-label-text-color, var(--mat-app-on-surface))}.mat-mdc-tab:focus .mdc-tab__text-label{color:var(--mat-tab-header-inactive-focus-label-text-color, var(--mat-app-on-surface))}.mat-mdc-tab.mdc-tab--active .mdc-tab__text-label{color:var(--mat-tab-header-active-label-text-color, var(--mat-app-on-surface))}.mat-mdc-tab.mdc-tab--active .mdc-tab__ripple::before,.mat-mdc-tab.mdc-tab--active .mat-ripple-element{background-color:var(--mat-tab-header-active-ripple-color, var(--mat-app-on-surface))}.mat-mdc-tab.mdc-tab--active:hover .mdc-tab__text-label{color:var(--mat-tab-header-active-hover-label-text-color, var(--mat-app-on-surface))}.mat-mdc-tab.mdc-tab--active:hover .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-active-hover-indicator-color, var(--mat-app-primary))}.mat-mdc-tab.mdc-tab--active:focus .mdc-tab__text-label{color:var(--mat-tab-header-active-focus-label-text-color, var(--mat-app-on-surface))}.mat-mdc-tab.mdc-tab--active:focus .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-active-focus-indicator-color, var(--mat-app-primary))}.mat-mdc-tab.mat-mdc-tab-disabled{opacity:.4;pointer-events:none}.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__content{pointer-events:none}.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__ripple::before,.mat-mdc-tab.mat-mdc-tab-disabled .mat-ripple-element{background-color:var(--mat-tab-header-disabled-ripple-color)}.mat-mdc-tab .mdc-tab__ripple::before{content:"";display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;pointer-events:none;background-color:var(--mat-tab-header-inactive-ripple-color, var(--mat-app-on-surface))}.mat-mdc-tab .mdc-tab__text-label{color:var(--mat-tab-header-inactive-label-text-color, var(--mat-app-on-surface));display:inline-flex;align-items:center}.mat-mdc-tab .mdc-tab__content{position:relative;pointer-events:auto}.mat-mdc-tab:hover .mdc-tab__ripple::before{opacity:.04}.mat-mdc-tab.cdk-program-focused .mdc-tab__ripple::before,.mat-mdc-tab.cdk-keyboard-focused .mdc-tab__ripple::before{opacity:.12}.mat-mdc-tab .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-header-inactive-ripple-color, var(--mat-app-on-surface))}.mat-mdc-tab-group.mat-mdc-tab-group-stretch-tabs>.mat-mdc-tab-header .mat-mdc-tab{flex-grow:1}.mat-mdc-tab-group{display:flex;flex-direction:column;max-width:100%}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination{background-color:var(--mat-tab-header-with-background-background-color)}.mat-mdc-tab-group.mat-tabs-with-background.mat-primary>.mat-mdc-tab-header .mat-mdc-tab .mdc-tab__text-label{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background.mat-primary>.mat-mdc-tab-header .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab__text-label{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-mdc-focus-indicator::before,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-focus-indicator::before{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-ripple-element,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mdc-tab__ripple::before,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-ripple-element,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mdc-tab__ripple::before{background-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header{flex-direction:column-reverse}.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header .mdc-tab-indicator__content--underline{align-self:flex-start}.mat-mdc-tab-body-wrapper{position:relative;overflow:hidden;display:flex;transition:height 500ms cubic-bezier(0.35, 0, 0.25, 1)}.mat-mdc-tab-body-wrapper._mat-animation-noopable{transition:none !important;animation:none !important}'],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTabGroup, [{
    type: Component,
    args: [{
      selector: "mat-tab-group",
      exportAs: "matTabGroup",
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.Default,
      providers: [{
        provide: MAT_TAB_GROUP,
        useExisting: MatTabGroup
      }],
      host: {
        "class": "mat-mdc-tab-group",
        "[class]": '"mat-" + (color || "primary")',
        "[class.mat-mdc-tab-group-dynamic-height]": "dynamicHeight",
        "[class.mat-mdc-tab-group-inverted-header]": 'headerPosition === "below"',
        "[class.mat-mdc-tab-group-stretch-tabs]": "stretchTabs",
        "[style.--mat-tab-animation-duration]": "animationDuration"
      },
      standalone: true,
      imports: [MatTabHeader, MatTabLabelWrapper, CdkMonitorFocus, MatRipple, CdkPortalOutlet, MatTabBody],
      template: '<mat-tab-header #tabHeader\n                [selectedIndex]="selectedIndex || 0"\n                [disableRipple]="disableRipple"\n                [disablePagination]="disablePagination"\n                [aria-label]="ariaLabel"\n                [aria-labelledby]="ariaLabelledby"\n                (indexFocused)="_focusChanged($event)"\n                (selectFocusedIndex)="selectedIndex = $event">\n\n  @for (tab of _tabs; track tab; let i = $index) {\n    <div class="mdc-tab mat-mdc-tab mat-mdc-focus-indicator"\n        #tabNode\n        role="tab"\n        matTabLabelWrapper\n        cdkMonitorElementFocus\n        [id]="_getTabLabelId(i)"\n        [attr.tabIndex]="_getTabIndex(i)"\n        [attr.aria-posinset]="i + 1"\n        [attr.aria-setsize]="_tabs.length"\n        [attr.aria-controls]="_getTabContentId(i)"\n        [attr.aria-selected]="selectedIndex === i"\n        [attr.aria-label]="tab.ariaLabel || null"\n        [attr.aria-labelledby]="(!tab.ariaLabel && tab.ariaLabelledby) ? tab.ariaLabelledby : null"\n        [class.mdc-tab--active]="selectedIndex === i"\n        [class]="tab.labelClass"\n        [disabled]="tab.disabled"\n        [fitInkBarToContent]="fitInkBarToContent"\n        (click)="_handleClick(tab, tabHeader, i)"\n        (cdkFocusChange)="_tabFocusChanged($event, i)">\n      <span class="mdc-tab__ripple"></span>\n\n      <!-- Needs to be a separate element, because we can\'t put\n          `overflow: hidden` on tab due to the ink bar. -->\n      <div\n        class="mat-mdc-tab-ripple"\n        mat-ripple\n        [matRippleTrigger]="tabNode"\n        [matRippleDisabled]="tab.disabled || disableRipple"></div>\n\n      <span class="mdc-tab__content">\n        <span class="mdc-tab__text-label">\n          <!--\n            If there is a label template, use it, otherwise fall back to the text label.\n            Note that we don\'t have indentation around the text label, because it adds\n            whitespace around the text which breaks some internal tests.\n          -->\n          @if (tab.templateLabel) {\n            <ng-template [cdkPortalOutlet]="tab.templateLabel"></ng-template>\n          } @else {{{tab.textLabel}}}\n        </span>\n      </span>\n    </div>\n  }\n</mat-tab-header>\n\n<!--\n  We need to project the content somewhere to avoid hydration errors. Some observations:\n  1. This is only necessary on the server.\n  2. We get a hydration error if there aren\'t any nodes after the `ng-content`.\n  3. We get a hydration error if `ng-content` is wrapped in another element.\n-->\n@if (_isServer) {\n  <ng-content/>\n}\n\n<div\n  class="mat-mdc-tab-body-wrapper"\n  [class._mat-animation-noopable]="_animationMode === \'NoopAnimations\'"\n  #tabBodyWrapper>\n  @for (tab of _tabs; track tab; let i = $index) {\n    <mat-tab-body role="tabpanel"\n                 [id]="_getTabContentId(i)"\n                 [attr.tabindex]="(contentTabIndex != null && selectedIndex === i) ? contentTabIndex : null"\n                 [attr.aria-labelledby]="_getTabLabelId(i)"\n                 [attr.aria-hidden]="selectedIndex !== i"\n                 [class.mat-mdc-tab-body-active]="selectedIndex === i"\n                 [class]="tab.bodyClass"\n                 [content]="tab.content!"\n                 [position]="tab.position!"\n                 [origin]="tab.origin"\n                 [animationDuration]="animationDuration"\n                 [preserveContent]="preserveContent"\n                 (_onCentered)="_removeTabBodyWrapperHeight()"\n                 (_onCentering)="_setTabBodyWrapperHeight($event)">\n    </mat-tab-body>\n  }\n</div>\n',
      styles: ['.mdc-tab{min-width:90px;padding:0 24px;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;border:none;outline:none;text-align:center;white-space:nowrap;cursor:pointer;z-index:1}.mdc-tab__content{display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab--active .mdc-tab__text-label{transition-delay:100ms}._mat-animation-noopable .mdc-tab__text-label{transition:none}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator__content{transition:var(--mat-tab-animation-duration, 250ms) transform cubic-bezier(0.4, 0, 0.2, 1);transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}._mat-animation-noopable .mdc-tab-indicator__content,.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mat-mdc-tab-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-mdc-tab{-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-decoration:none;background:none;height:var(--mdc-secondary-navigation-tab-container-height);font-family:var(--mat-tab-header-label-text-font, var(--mat-app-title-small-font));font-size:var(--mat-tab-header-label-text-size, var(--mat-app-title-small-size));letter-spacing:var(--mat-tab-header-label-text-tracking, var(--mat-app-title-small-tracking));line-height:var(--mat-tab-header-label-text-line-height, var(--mat-app-title-small-line-height));font-weight:var(--mat-tab-header-label-text-weight, var(--mat-app-title-small-weight))}.mat-mdc-tab.mdc-tab{flex-grow:0}.mat-mdc-tab .mdc-tab-indicator__content--underline{border-color:var(--mdc-tab-indicator-active-indicator-color, var(--mat-app-primary));border-top-width:var(--mdc-tab-indicator-active-indicator-height);border-radius:var(--mdc-tab-indicator-active-indicator-shape)}.mat-mdc-tab:hover .mdc-tab__text-label{color:var(--mat-tab-header-inactive-hover-label-text-color, var(--mat-app-on-surface))}.mat-mdc-tab:focus .mdc-tab__text-label{color:var(--mat-tab-header-inactive-focus-label-text-color, var(--mat-app-on-surface))}.mat-mdc-tab.mdc-tab--active .mdc-tab__text-label{color:var(--mat-tab-header-active-label-text-color, var(--mat-app-on-surface))}.mat-mdc-tab.mdc-tab--active .mdc-tab__ripple::before,.mat-mdc-tab.mdc-tab--active .mat-ripple-element{background-color:var(--mat-tab-header-active-ripple-color, var(--mat-app-on-surface))}.mat-mdc-tab.mdc-tab--active:hover .mdc-tab__text-label{color:var(--mat-tab-header-active-hover-label-text-color, var(--mat-app-on-surface))}.mat-mdc-tab.mdc-tab--active:hover .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-active-hover-indicator-color, var(--mat-app-primary))}.mat-mdc-tab.mdc-tab--active:focus .mdc-tab__text-label{color:var(--mat-tab-header-active-focus-label-text-color, var(--mat-app-on-surface))}.mat-mdc-tab.mdc-tab--active:focus .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-active-focus-indicator-color, var(--mat-app-primary))}.mat-mdc-tab.mat-mdc-tab-disabled{opacity:.4;pointer-events:none}.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__content{pointer-events:none}.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__ripple::before,.mat-mdc-tab.mat-mdc-tab-disabled .mat-ripple-element{background-color:var(--mat-tab-header-disabled-ripple-color)}.mat-mdc-tab .mdc-tab__ripple::before{content:"";display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;pointer-events:none;background-color:var(--mat-tab-header-inactive-ripple-color, var(--mat-app-on-surface))}.mat-mdc-tab .mdc-tab__text-label{color:var(--mat-tab-header-inactive-label-text-color, var(--mat-app-on-surface));display:inline-flex;align-items:center}.mat-mdc-tab .mdc-tab__content{position:relative;pointer-events:auto}.mat-mdc-tab:hover .mdc-tab__ripple::before{opacity:.04}.mat-mdc-tab.cdk-program-focused .mdc-tab__ripple::before,.mat-mdc-tab.cdk-keyboard-focused .mdc-tab__ripple::before{opacity:.12}.mat-mdc-tab .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-header-inactive-ripple-color, var(--mat-app-on-surface))}.mat-mdc-tab-group.mat-mdc-tab-group-stretch-tabs>.mat-mdc-tab-header .mat-mdc-tab{flex-grow:1}.mat-mdc-tab-group{display:flex;flex-direction:column;max-width:100%}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination{background-color:var(--mat-tab-header-with-background-background-color)}.mat-mdc-tab-group.mat-tabs-with-background.mat-primary>.mat-mdc-tab-header .mat-mdc-tab .mdc-tab__text-label{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background.mat-primary>.mat-mdc-tab-header .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab__text-label{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-mdc-focus-indicator::before,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-focus-indicator::before{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-ripple-element,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mdc-tab__ripple::before,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-ripple-element,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mdc-tab__ripple::before{background-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header{flex-direction:column-reverse}.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header .mdc-tab-indicator__content--underline{align-self:flex-start}.mat-mdc-tab-body-wrapper{position:relative;overflow:hidden;display:flex;transition:height 500ms cubic-bezier(0.35, 0, 0.25, 1)}.mat-mdc-tab-body-wrapper._mat-animation-noopable{transition:none !important;animation:none !important}']
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [MAT_TABS_CONFIG]
    }, {
      type: Optional
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
    _allTabs: [{
      type: ContentChildren,
      args: [MatTab, {
        descendants: true
      }]
    }],
    _tabBodyWrapper: [{
      type: ViewChild,
      args: ["tabBodyWrapper"]
    }],
    _tabHeader: [{
      type: ViewChild,
      args: ["tabHeader"]
    }],
    color: [{
      type: Input
    }],
    fitInkBarToContent: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    stretchTabs: [{
      type: Input,
      args: [{
        alias: "mat-stretch-tabs",
        transform: booleanAttribute
      }]
    }],
    dynamicHeight: [{
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
    headerPosition: [{
      type: Input
    }],
    animationDuration: [{
      type: Input
    }],
    contentTabIndex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    disablePagination: [{
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
    preserveContent: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    backgroundColor: [{
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
    selectedIndexChange: [{
      type: Output
    }],
    focusChange: [{
      type: Output
    }],
    animationDone: [{
      type: Output
    }],
    selectedTabChange: [{
      type: Output
    }]
  });
})();
var MatTabChangeEvent = class {
};
var nextUniqueId = 0;
var MatTabNav = class _MatTabNav extends MatPaginatedTabHeader {
  /** Whether the ink bar should fit its width to the size of the tab label content. */
  get fitInkBarToContent() {
    return this._fitInkBarToContent.value;
  }
  set fitInkBarToContent(value) {
    this._fitInkBarToContent.next(value);
    this._changeDetectorRef.markForCheck();
  }
  get animationDuration() {
    return this._animationDuration;
  }
  set animationDuration(value) {
    const stringValue = value + "";
    this._animationDuration = /^\d+$/.test(stringValue) ? value + "ms" : stringValue;
  }
  /**
   * Theme color of the background of the tab nav. This API is supported in M2 themes only, it
   * has no effect in M3 themes.
   *
   * For information on applying color variants in M3, see
   * https://material.angular.io/guide/theming#using-component-color-variants.
   */
  get backgroundColor() {
    return this._backgroundColor;
  }
  set backgroundColor(value) {
    const classList = this._elementRef.nativeElement.classList;
    classList.remove("mat-tabs-with-background", `mat-background-${this.backgroundColor}`);
    if (value) {
      classList.add("mat-tabs-with-background", `mat-background-${value}`);
    }
    this._backgroundColor = value;
  }
  constructor(elementRef, dir, ngZone, changeDetectorRef, viewportRuler, platform, animationMode, defaultConfig) {
    super(elementRef, changeDetectorRef, viewportRuler, dir, ngZone, platform, animationMode);
    this._fitInkBarToContent = new BehaviorSubject(false);
    this.stretchTabs = true;
    this.disableRipple = false;
    this.color = "primary";
    this.disablePagination = defaultConfig && defaultConfig.disablePagination != null ? defaultConfig.disablePagination : false;
    this.fitInkBarToContent = defaultConfig && defaultConfig.fitInkBarToContent != null ? defaultConfig.fitInkBarToContent : false;
    this.stretchTabs = defaultConfig && defaultConfig.stretchTabs != null ? defaultConfig.stretchTabs : true;
  }
  _itemSelected() {
  }
  ngAfterContentInit() {
    this._inkBar = new MatInkBar(this._items);
    this._items.changes.pipe(startWith(null), takeUntil(this._destroyed)).subscribe(() => {
      this.updateActiveLink();
    });
    super.ngAfterContentInit();
  }
  ngAfterViewInit() {
    if (!this.tabPanel && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw new Error("A mat-tab-nav-panel must be specified via [tabPanel].");
    }
    super.ngAfterViewInit();
  }
  /** Notifies the component that the active link has been changed. */
  updateActiveLink() {
    if (!this._items) {
      return;
    }
    const items = this._items.toArray();
    for (let i = 0; i < items.length; i++) {
      if (items[i].active) {
        this.selectedIndex = i;
        this._changeDetectorRef.markForCheck();
        if (this.tabPanel) {
          this.tabPanel._activeTabId = items[i].id;
        }
        return;
      }
    }
    this.selectedIndex = -1;
    this._inkBar.hide();
  }
  _getRole() {
    return this.tabPanel ? "tablist" : this._elementRef.nativeElement.getAttribute("role");
  }
  static {
    this.\u0275fac = function MatTabNav_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatTabNav)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(Directionality, 8), \u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(ViewportRuler), \u0275\u0275directiveInject(Platform), \u0275\u0275directiveInject(ANIMATION_MODULE_TYPE, 8), \u0275\u0275directiveInject(MAT_TABS_CONFIG, 8));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatTabNav,
      selectors: [["", "mat-tab-nav-bar", ""]],
      contentQueries: function MatTabNav_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuery(dirIndex, MatTabLink, 5);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._items = _t);
        }
      },
      viewQuery: function MatTabNav_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuery(_c1, 7);
          \u0275\u0275viewQuery(_c2, 7);
          \u0275\u0275viewQuery(_c3, 7);
          \u0275\u0275viewQuery(_c4, 5);
          \u0275\u0275viewQuery(_c5, 5);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._tabListContainer = _t.first);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._tabList = _t.first);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._tabListInner = _t.first);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._nextPaginator = _t.first);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._previousPaginator = _t.first);
        }
      },
      hostAttrs: [1, "mat-mdc-tab-nav-bar", "mat-mdc-tab-header"],
      hostVars: 17,
      hostBindings: function MatTabNav_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275attribute("role", ctx._getRole());
          \u0275\u0275styleProp("--mat-tab-animation-duration", ctx.animationDuration);
          \u0275\u0275classProp("mat-mdc-tab-header-pagination-controls-enabled", ctx._showPaginationControls)("mat-mdc-tab-header-rtl", ctx._getLayoutDirection() == "rtl")("mat-mdc-tab-nav-bar-stretch-tabs", ctx.stretchTabs)("mat-primary", ctx.color !== "warn" && ctx.color !== "accent")("mat-accent", ctx.color === "accent")("mat-warn", ctx.color === "warn")("_mat-animation-noopable", ctx._animationMode === "NoopAnimations");
        }
      },
      inputs: {
        fitInkBarToContent: [2, "fitInkBarToContent", "fitInkBarToContent", booleanAttribute],
        stretchTabs: [2, "mat-stretch-tabs", "stretchTabs", booleanAttribute],
        animationDuration: "animationDuration",
        backgroundColor: "backgroundColor",
        disableRipple: [2, "disableRipple", "disableRipple", booleanAttribute],
        color: "color",
        tabPanel: "tabPanel"
      },
      exportAs: ["matTabNavBar", "matTabNav"],
      standalone: true,
      features: [\u0275\u0275InputTransformsFeature, \u0275\u0275InheritDefinitionFeature, \u0275\u0275StandaloneFeature],
      attrs: _c10,
      ngContentSelectors: _c0,
      decls: 13,
      vars: 6,
      consts: [["previousPaginator", ""], ["tabListContainer", ""], ["tabList", ""], ["tabListInner", ""], ["nextPaginator", ""], ["mat-ripple", "", 1, "mat-mdc-tab-header-pagination", "mat-mdc-tab-header-pagination-before", 3, "click", "mousedown", "touchend", "matRippleDisabled"], [1, "mat-mdc-tab-header-pagination-chevron"], [1, "mat-mdc-tab-link-container", 3, "keydown"], [1, "mat-mdc-tab-list", 3, "cdkObserveContent"], [1, "mat-mdc-tab-links"], ["mat-ripple", "", 1, "mat-mdc-tab-header-pagination", "mat-mdc-tab-header-pagination-after", 3, "mousedown", "click", "touchend", "matRippleDisabled"]],
      template: function MatTabNav_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = \u0275\u0275getCurrentView();
          \u0275\u0275projectionDef();
          \u0275\u0275elementStart(0, "div", 5, 0);
          \u0275\u0275listener("click", function MatTabNav_Template_div_click_0_listener() {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._handlePaginatorClick("before"));
          })("mousedown", function MatTabNav_Template_div_mousedown_0_listener($event) {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._handlePaginatorPress("before", $event));
          })("touchend", function MatTabNav_Template_div_touchend_0_listener() {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._stopInterval());
          });
          \u0275\u0275element(2, "div", 6);
          \u0275\u0275elementEnd();
          \u0275\u0275elementStart(3, "div", 7, 1);
          \u0275\u0275listener("keydown", function MatTabNav_Template_div_keydown_3_listener($event) {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._handleKeydown($event));
          });
          \u0275\u0275elementStart(5, "div", 8, 2);
          \u0275\u0275listener("cdkObserveContent", function MatTabNav_Template_div_cdkObserveContent_5_listener() {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._onContentChanges());
          });
          \u0275\u0275elementStart(7, "div", 9, 3);
          \u0275\u0275projection(9);
          \u0275\u0275elementEnd()()();
          \u0275\u0275elementStart(10, "div", 10, 4);
          \u0275\u0275listener("mousedown", function MatTabNav_Template_div_mousedown_10_listener($event) {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._handlePaginatorPress("after", $event));
          })("click", function MatTabNav_Template_div_click_10_listener() {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._handlePaginatorClick("after"));
          })("touchend", function MatTabNav_Template_div_touchend_10_listener() {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._stopInterval());
          });
          \u0275\u0275element(12, "div", 6);
          \u0275\u0275elementEnd();
        }
        if (rf & 2) {
          \u0275\u0275classProp("mat-mdc-tab-header-pagination-disabled", ctx._disableScrollBefore);
          \u0275\u0275property("matRippleDisabled", ctx._disableScrollBefore || ctx.disableRipple);
          \u0275\u0275advance(10);
          \u0275\u0275classProp("mat-mdc-tab-header-pagination-disabled", ctx._disableScrollAfter);
          \u0275\u0275property("matRippleDisabled", ctx._disableScrollAfter || ctx.disableRipple);
        }
      },
      dependencies: [MatRipple, CdkObserveContent],
      styles: [".mdc-tab{min-width:90px;padding:0 24px;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;border:none;outline:none;text-align:center;white-space:nowrap;cursor:pointer;z-index:1}.mdc-tab__content{display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab--active .mdc-tab__text-label{transition-delay:100ms}._mat-animation-noopable .mdc-tab__text-label{transition:none}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator__content{transition:var(--mat-tab-animation-duration, 250ms) transform cubic-bezier(0.4, 0, 0.2, 1);transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}._mat-animation-noopable .mdc-tab-indicator__content,.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mat-mdc-tab-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-mdc-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mdc-tab-indicator .mdc-tab-indicator__content{transition-duration:var(--mat-tab-animation-duration, 250ms)}.mat-mdc-tab-header-pagination{-webkit-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:none;box-sizing:content-box;outline:0}.mat-mdc-tab-header-pagination::-moz-focus-inner{border:0}.mat-mdc-tab-header-pagination .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-header-inactive-ripple-color, var(--mat-app-on-surface))}.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination{display:flex}.mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after{padding-left:4px}.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-pagination-after{padding-right:4px}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-mdc-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;height:8px;width:8px;border-color:var(--mat-tab-header-pagination-icon-color, var(--mat-app-on-surface))}.mat-mdc-tab-header-pagination-disabled{box-shadow:none;cursor:default;pointer-events:none}.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron{opacity:.4}.mat-mdc-tab-list{flex-grow:1;position:relative;transition:transform 500ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-mdc-tab-list{transition:none}.mat-mdc-tab-links{display:flex;flex:1 0 auto}[mat-align-tabs=center]>.mat-mdc-tab-link-container .mat-mdc-tab-links{justify-content:center}[mat-align-tabs=end]>.mat-mdc-tab-link-container .mat-mdc-tab-links{justify-content:flex-end}.cdk-drop-list .mat-mdc-tab-links,.mat-mdc-tab-links.cdk-drop-list{min-height:var(--mdc-secondary-navigation-tab-container-height)}.mat-mdc-tab-link-container{display:flex;flex-grow:1;overflow:hidden;z-index:1;border-bottom-style:solid;border-bottom-width:var(--mat-tab-header-divider-height);border-bottom-color:var(--mat-tab-header-divider-color, var(--mat-app-surface-variant))}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination{background-color:var(--mat-tab-header-with-background-background-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background.mat-primary>.mat-mdc-tab-link-container .mat-mdc-tab-link .mdc-tab__text-label{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background.mat-primary>.mat-mdc-tab-link-container .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-link-container .mat-mdc-tab-link:not(.mdc-tab--active) .mdc-tab__text-label{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-link-container .mat-mdc-tab-link:not(.mdc-tab--active) .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-focus-indicator::before,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-focus-indicator::before{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-ripple-element,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mdc-tab__ripple::before,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-ripple-element,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mdc-tab__ripple::before{background-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron{color:var(--mat-tab-header-with-background-foreground-color)}"],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTabNav, [{
    type: Component,
    args: [{
      selector: "[mat-tab-nav-bar]",
      exportAs: "matTabNavBar, matTabNav",
      host: {
        "[attr.role]": "_getRole()",
        "class": "mat-mdc-tab-nav-bar mat-mdc-tab-header",
        "[class.mat-mdc-tab-header-pagination-controls-enabled]": "_showPaginationControls",
        "[class.mat-mdc-tab-header-rtl]": "_getLayoutDirection() == 'rtl'",
        "[class.mat-mdc-tab-nav-bar-stretch-tabs]": "stretchTabs",
        "[class.mat-primary]": 'color !== "warn" && color !== "accent"',
        "[class.mat-accent]": 'color === "accent"',
        "[class.mat-warn]": 'color === "warn"',
        "[class._mat-animation-noopable]": '_animationMode === "NoopAnimations"',
        "[style.--mat-tab-animation-duration]": "animationDuration"
      },
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.Default,
      standalone: true,
      imports: [MatRipple, CdkObserveContent],
      template: `<!--
 Note that this intentionally uses a \`div\` instead of a \`button\`, because it's not part of
 the regular tabs flow and is only here to support mouse users. It should also not be focusable.
-->
<div class="mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-before"
     #previousPaginator
     mat-ripple
     [matRippleDisabled]="_disableScrollBefore || disableRipple"
     [class.mat-mdc-tab-header-pagination-disabled]="_disableScrollBefore"
     (click)="_handlePaginatorClick('before')"
     (mousedown)="_handlePaginatorPress('before', $event)"
     (touchend)="_stopInterval()">
  <div class="mat-mdc-tab-header-pagination-chevron"></div>
</div>

<div class="mat-mdc-tab-link-container" #tabListContainer (keydown)="_handleKeydown($event)">
  <div class="mat-mdc-tab-list" #tabList (cdkObserveContent)="_onContentChanges()">
    <div class="mat-mdc-tab-links" #tabListInner>
      <ng-content></ng-content>
    </div>
  </div>
</div>

<div class="mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-after"
     #nextPaginator
     mat-ripple
     [matRippleDisabled]="_disableScrollAfter || disableRipple"
     [class.mat-mdc-tab-header-pagination-disabled]="_disableScrollAfter"
     (mousedown)="_handlePaginatorPress('after', $event)"
     (click)="_handlePaginatorClick('after')"
     (touchend)="_stopInterval()">
  <div class="mat-mdc-tab-header-pagination-chevron"></div>
</div>
`,
      styles: [".mdc-tab{min-width:90px;padding:0 24px;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;border:none;outline:none;text-align:center;white-space:nowrap;cursor:pointer;z-index:1}.mdc-tab__content{display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab--active .mdc-tab__text-label{transition-delay:100ms}._mat-animation-noopable .mdc-tab__text-label{transition:none}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator__content{transition:var(--mat-tab-animation-duration, 250ms) transform cubic-bezier(0.4, 0, 0.2, 1);transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}._mat-animation-noopable .mdc-tab-indicator__content,.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mat-mdc-tab-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-mdc-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mdc-tab-indicator .mdc-tab-indicator__content{transition-duration:var(--mat-tab-animation-duration, 250ms)}.mat-mdc-tab-header-pagination{-webkit-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:none;box-sizing:content-box;outline:0}.mat-mdc-tab-header-pagination::-moz-focus-inner{border:0}.mat-mdc-tab-header-pagination .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-header-inactive-ripple-color, var(--mat-app-on-surface))}.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination{display:flex}.mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after{padding-left:4px}.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-pagination-after{padding-right:4px}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-mdc-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;height:8px;width:8px;border-color:var(--mat-tab-header-pagination-icon-color, var(--mat-app-on-surface))}.mat-mdc-tab-header-pagination-disabled{box-shadow:none;cursor:default;pointer-events:none}.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron{opacity:.4}.mat-mdc-tab-list{flex-grow:1;position:relative;transition:transform 500ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-mdc-tab-list{transition:none}.mat-mdc-tab-links{display:flex;flex:1 0 auto}[mat-align-tabs=center]>.mat-mdc-tab-link-container .mat-mdc-tab-links{justify-content:center}[mat-align-tabs=end]>.mat-mdc-tab-link-container .mat-mdc-tab-links{justify-content:flex-end}.cdk-drop-list .mat-mdc-tab-links,.mat-mdc-tab-links.cdk-drop-list{min-height:var(--mdc-secondary-navigation-tab-container-height)}.mat-mdc-tab-link-container{display:flex;flex-grow:1;overflow:hidden;z-index:1;border-bottom-style:solid;border-bottom-width:var(--mat-tab-header-divider-height);border-bottom-color:var(--mat-tab-header-divider-color, var(--mat-app-surface-variant))}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination{background-color:var(--mat-tab-header-with-background-background-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background.mat-primary>.mat-mdc-tab-link-container .mat-mdc-tab-link .mdc-tab__text-label{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background.mat-primary>.mat-mdc-tab-link-container .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-link-container .mat-mdc-tab-link:not(.mdc-tab--active) .mdc-tab__text-label{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-link-container .mat-mdc-tab-link:not(.mdc-tab--active) .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-focus-indicator::before,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-focus-indicator::before{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-ripple-element,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mdc-tab__ripple::before,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-ripple-element,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mdc-tab__ripple::before{background-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron{color:var(--mat-tab-header-with-background-foreground-color)}"]
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }, {
    type: NgZone
  }, {
    type: ChangeDetectorRef
  }, {
    type: ViewportRuler
  }, {
    type: Platform
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
      args: [MAT_TABS_CONFIG]
    }]
  }], {
    fitInkBarToContent: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    stretchTabs: [{
      type: Input,
      args: [{
        alias: "mat-stretch-tabs",
        transform: booleanAttribute
      }]
    }],
    animationDuration: [{
      type: Input
    }],
    _items: [{
      type: ContentChildren,
      args: [forwardRef(() => MatTabLink), {
        descendants: true
      }]
    }],
    backgroundColor: [{
      type: Input
    }],
    disableRipple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    color: [{
      type: Input
    }],
    tabPanel: [{
      type: Input
    }],
    _tabListContainer: [{
      type: ViewChild,
      args: ["tabListContainer", {
        static: true
      }]
    }],
    _tabList: [{
      type: ViewChild,
      args: ["tabList", {
        static: true
      }]
    }],
    _tabListInner: [{
      type: ViewChild,
      args: ["tabListInner", {
        static: true
      }]
    }],
    _nextPaginator: [{
      type: ViewChild,
      args: ["nextPaginator"]
    }],
    _previousPaginator: [{
      type: ViewChild,
      args: ["previousPaginator"]
    }]
  });
})();
var MatTabLink = class _MatTabLink extends InkBarItem {
  /** Whether the link is active. */
  get active() {
    return this._isActive;
  }
  set active(value) {
    if (value !== this._isActive) {
      this._isActive = value;
      this._tabNavBar.updateActiveLink();
    }
  }
  /**
   * Whether ripples are disabled on interaction.
   * @docs-private
   */
  get rippleDisabled() {
    return this.disabled || this.disableRipple || this._tabNavBar.disableRipple || !!this.rippleConfig.disabled;
  }
  constructor(_tabNavBar, elementRef, globalRippleOptions, tabIndex, _focusMonitor, animationMode) {
    super();
    this._tabNavBar = _tabNavBar;
    this.elementRef = elementRef;
    this._focusMonitor = _focusMonitor;
    this._destroyed = new Subject();
    this._isActive = false;
    this.disabled = false;
    this.disableRipple = false;
    this.tabIndex = 0;
    this.id = `mat-tab-link-${nextUniqueId++}`;
    this.rippleConfig = globalRippleOptions || {};
    this.tabIndex = parseInt(tabIndex) || 0;
    if (animationMode === "NoopAnimations") {
      this.rippleConfig.animation = {
        enterDuration: 0,
        exitDuration: 0
      };
    }
    _tabNavBar._fitInkBarToContent.pipe(takeUntil(this._destroyed)).subscribe((fitInkBarToContent) => {
      this.fitInkBarToContent = fitInkBarToContent;
    });
  }
  /** Focuses the tab link. */
  focus() {
    this.elementRef.nativeElement.focus();
  }
  ngAfterViewInit() {
    this._focusMonitor.monitor(this.elementRef);
  }
  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
    super.ngOnDestroy();
    this._focusMonitor.stopMonitoring(this.elementRef);
  }
  _handleFocus() {
    this._tabNavBar.focusIndex = this._tabNavBar._items.toArray().indexOf(this);
  }
  _handleKeydown(event) {
    if (event.keyCode === SPACE || event.keyCode === ENTER) {
      if (this.disabled) {
        event.preventDefault();
      } else if (this._tabNavBar.tabPanel) {
        if (event.keyCode === SPACE) {
          event.preventDefault();
        }
        this.elementRef.nativeElement.click();
      }
    }
  }
  _getAriaControls() {
    return this._tabNavBar.tabPanel ? this._tabNavBar.tabPanel?.id : this.elementRef.nativeElement.getAttribute("aria-controls");
  }
  _getAriaSelected() {
    if (this._tabNavBar.tabPanel) {
      return this.active ? "true" : "false";
    } else {
      return this.elementRef.nativeElement.getAttribute("aria-selected");
    }
  }
  _getAriaCurrent() {
    return this.active && !this._tabNavBar.tabPanel ? "page" : null;
  }
  _getRole() {
    return this._tabNavBar.tabPanel ? "tab" : this.elementRef.nativeElement.getAttribute("role");
  }
  _getTabIndex() {
    if (this._tabNavBar.tabPanel) {
      return this._isActive && !this.disabled ? 0 : -1;
    } else {
      return this.disabled ? -1 : this.tabIndex;
    }
  }
  static {
    this.\u0275fac = function MatTabLink_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatTabLink)(\u0275\u0275directiveInject(MatTabNav), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(MAT_RIPPLE_GLOBAL_OPTIONS, 8), \u0275\u0275injectAttribute("tabindex"), \u0275\u0275directiveInject(FocusMonitor), \u0275\u0275directiveInject(ANIMATION_MODULE_TYPE, 8));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatTabLink,
      selectors: [["", "mat-tab-link", ""], ["", "matTabLink", ""]],
      hostAttrs: [1, "mdc-tab", "mat-mdc-tab-link", "mat-mdc-focus-indicator"],
      hostVars: 11,
      hostBindings: function MatTabLink_HostBindings(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275listener("focus", function MatTabLink_focus_HostBindingHandler() {
            return ctx._handleFocus();
          })("keydown", function MatTabLink_keydown_HostBindingHandler($event) {
            return ctx._handleKeydown($event);
          });
        }
        if (rf & 2) {
          \u0275\u0275attribute("aria-controls", ctx._getAriaControls())("aria-current", ctx._getAriaCurrent())("aria-disabled", ctx.disabled)("aria-selected", ctx._getAriaSelected())("id", ctx.id)("tabIndex", ctx._getTabIndex())("role", ctx._getRole());
          \u0275\u0275classProp("mat-mdc-tab-disabled", ctx.disabled)("mdc-tab--active", ctx.active);
        }
      },
      inputs: {
        active: [2, "active", "active", booleanAttribute],
        disabled: [2, "disabled", "disabled", booleanAttribute],
        disableRipple: [2, "disableRipple", "disableRipple", booleanAttribute],
        tabIndex: [2, "tabIndex", "tabIndex", (value) => value == null ? 0 : numberAttribute(value)],
        id: "id"
      },
      exportAs: ["matTabLink"],
      standalone: true,
      features: [\u0275\u0275InputTransformsFeature, \u0275\u0275InheritDefinitionFeature, \u0275\u0275StandaloneFeature],
      attrs: _c11,
      ngContentSelectors: _c0,
      decls: 5,
      vars: 2,
      consts: [[1, "mdc-tab__ripple"], ["mat-ripple", "", 1, "mat-mdc-tab-ripple", 3, "matRippleTrigger", "matRippleDisabled"], [1, "mdc-tab__content"], [1, "mdc-tab__text-label"]],
      template: function MatTabLink_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef();
          \u0275\u0275element(0, "span", 0)(1, "div", 1);
          \u0275\u0275elementStart(2, "span", 2)(3, "span", 3);
          \u0275\u0275projection(4);
          \u0275\u0275elementEnd()();
        }
        if (rf & 2) {
          \u0275\u0275advance();
          \u0275\u0275property("matRippleTrigger", ctx.elementRef.nativeElement)("matRippleDisabled", ctx.rippleDisabled);
        }
      },
      dependencies: [MatRipple],
      styles: ['.mat-mdc-tab-link{-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-decoration:none;background:none;height:var(--mdc-secondary-navigation-tab-container-height);font-family:var(--mat-tab-header-label-text-font, var(--mat-app-title-small-font));font-size:var(--mat-tab-header-label-text-size, var(--mat-app-title-small-size));letter-spacing:var(--mat-tab-header-label-text-tracking, var(--mat-app-title-small-tracking));line-height:var(--mat-tab-header-label-text-line-height, var(--mat-app-title-small-line-height));font-weight:var(--mat-tab-header-label-text-weight, var(--mat-app-title-small-weight))}.mat-mdc-tab-link.mdc-tab{flex-grow:0}.mat-mdc-tab-link .mdc-tab-indicator__content--underline{border-color:var(--mdc-tab-indicator-active-indicator-color, var(--mat-app-primary));border-top-width:var(--mdc-tab-indicator-active-indicator-height);border-radius:var(--mdc-tab-indicator-active-indicator-shape)}.mat-mdc-tab-link:hover .mdc-tab__text-label{color:var(--mat-tab-header-inactive-hover-label-text-color, var(--mat-app-on-surface))}.mat-mdc-tab-link:focus .mdc-tab__text-label{color:var(--mat-tab-header-inactive-focus-label-text-color, var(--mat-app-on-surface))}.mat-mdc-tab-link.mdc-tab--active .mdc-tab__text-label{color:var(--mat-tab-header-active-label-text-color, var(--mat-app-on-surface))}.mat-mdc-tab-link.mdc-tab--active .mdc-tab__ripple::before,.mat-mdc-tab-link.mdc-tab--active .mat-ripple-element{background-color:var(--mat-tab-header-active-ripple-color, var(--mat-app-on-surface))}.mat-mdc-tab-link.mdc-tab--active:hover .mdc-tab__text-label{color:var(--mat-tab-header-active-hover-label-text-color, var(--mat-app-on-surface))}.mat-mdc-tab-link.mdc-tab--active:hover .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-active-hover-indicator-color, var(--mat-app-primary))}.mat-mdc-tab-link.mdc-tab--active:focus .mdc-tab__text-label{color:var(--mat-tab-header-active-focus-label-text-color, var(--mat-app-on-surface))}.mat-mdc-tab-link.mdc-tab--active:focus .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-active-focus-indicator-color, var(--mat-app-primary))}.mat-mdc-tab-link.mat-mdc-tab-disabled{opacity:.4;pointer-events:none}.mat-mdc-tab-link.mat-mdc-tab-disabled .mdc-tab__content{pointer-events:none}.mat-mdc-tab-link.mat-mdc-tab-disabled .mdc-tab__ripple::before,.mat-mdc-tab-link.mat-mdc-tab-disabled .mat-ripple-element{background-color:var(--mat-tab-header-disabled-ripple-color)}.mat-mdc-tab-link .mdc-tab__ripple::before{content:"";display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;pointer-events:none;background-color:var(--mat-tab-header-inactive-ripple-color, var(--mat-app-on-surface))}.mat-mdc-tab-link .mdc-tab__text-label{color:var(--mat-tab-header-inactive-label-text-color, var(--mat-app-on-surface));display:inline-flex;align-items:center}.mat-mdc-tab-link .mdc-tab__content{position:relative;pointer-events:auto}.mat-mdc-tab-link:hover .mdc-tab__ripple::before{opacity:.04}.mat-mdc-tab-link.cdk-program-focused .mdc-tab__ripple::before,.mat-mdc-tab-link.cdk-keyboard-focused .mdc-tab__ripple::before{opacity:.12}.mat-mdc-tab-link .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-header-inactive-ripple-color, var(--mat-app-on-surface))}.mat-mdc-tab-header.mat-mdc-tab-nav-bar-stretch-tabs .mat-mdc-tab-link{flex-grow:1}.mat-mdc-tab-link::before{margin:5px}@media(max-width: 599px){.mat-mdc-tab-link{min-width:72px}}'],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTabLink, [{
    type: Component,
    args: [{
      selector: "[mat-tab-link], [matTabLink]",
      exportAs: "matTabLink",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      host: {
        "class": "mdc-tab mat-mdc-tab-link mat-mdc-focus-indicator",
        "[attr.aria-controls]": "_getAriaControls()",
        "[attr.aria-current]": "_getAriaCurrent()",
        "[attr.aria-disabled]": "disabled",
        "[attr.aria-selected]": "_getAriaSelected()",
        "[attr.id]": "id",
        "[attr.tabIndex]": "_getTabIndex()",
        "[attr.role]": "_getRole()",
        "[class.mat-mdc-tab-disabled]": "disabled",
        "[class.mdc-tab--active]": "active",
        "(focus)": "_handleFocus()",
        "(keydown)": "_handleKeydown($event)"
      },
      standalone: true,
      imports: [MatRipple],
      template: '<span class="mdc-tab__ripple"></span>\n\n<div\n  class="mat-mdc-tab-ripple"\n  mat-ripple\n  [matRippleTrigger]="elementRef.nativeElement"\n  [matRippleDisabled]="rippleDisabled"></div>\n\n<span class="mdc-tab__content">\n  <span class="mdc-tab__text-label">\n    <ng-content></ng-content>\n  </span>\n</span>\n\n',
      styles: ['.mat-mdc-tab-link{-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-decoration:none;background:none;height:var(--mdc-secondary-navigation-tab-container-height);font-family:var(--mat-tab-header-label-text-font, var(--mat-app-title-small-font));font-size:var(--mat-tab-header-label-text-size, var(--mat-app-title-small-size));letter-spacing:var(--mat-tab-header-label-text-tracking, var(--mat-app-title-small-tracking));line-height:var(--mat-tab-header-label-text-line-height, var(--mat-app-title-small-line-height));font-weight:var(--mat-tab-header-label-text-weight, var(--mat-app-title-small-weight))}.mat-mdc-tab-link.mdc-tab{flex-grow:0}.mat-mdc-tab-link .mdc-tab-indicator__content--underline{border-color:var(--mdc-tab-indicator-active-indicator-color, var(--mat-app-primary));border-top-width:var(--mdc-tab-indicator-active-indicator-height);border-radius:var(--mdc-tab-indicator-active-indicator-shape)}.mat-mdc-tab-link:hover .mdc-tab__text-label{color:var(--mat-tab-header-inactive-hover-label-text-color, var(--mat-app-on-surface))}.mat-mdc-tab-link:focus .mdc-tab__text-label{color:var(--mat-tab-header-inactive-focus-label-text-color, var(--mat-app-on-surface))}.mat-mdc-tab-link.mdc-tab--active .mdc-tab__text-label{color:var(--mat-tab-header-active-label-text-color, var(--mat-app-on-surface))}.mat-mdc-tab-link.mdc-tab--active .mdc-tab__ripple::before,.mat-mdc-tab-link.mdc-tab--active .mat-ripple-element{background-color:var(--mat-tab-header-active-ripple-color, var(--mat-app-on-surface))}.mat-mdc-tab-link.mdc-tab--active:hover .mdc-tab__text-label{color:var(--mat-tab-header-active-hover-label-text-color, var(--mat-app-on-surface))}.mat-mdc-tab-link.mdc-tab--active:hover .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-active-hover-indicator-color, var(--mat-app-primary))}.mat-mdc-tab-link.mdc-tab--active:focus .mdc-tab__text-label{color:var(--mat-tab-header-active-focus-label-text-color, var(--mat-app-on-surface))}.mat-mdc-tab-link.mdc-tab--active:focus .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-active-focus-indicator-color, var(--mat-app-primary))}.mat-mdc-tab-link.mat-mdc-tab-disabled{opacity:.4;pointer-events:none}.mat-mdc-tab-link.mat-mdc-tab-disabled .mdc-tab__content{pointer-events:none}.mat-mdc-tab-link.mat-mdc-tab-disabled .mdc-tab__ripple::before,.mat-mdc-tab-link.mat-mdc-tab-disabled .mat-ripple-element{background-color:var(--mat-tab-header-disabled-ripple-color)}.mat-mdc-tab-link .mdc-tab__ripple::before{content:"";display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;pointer-events:none;background-color:var(--mat-tab-header-inactive-ripple-color, var(--mat-app-on-surface))}.mat-mdc-tab-link .mdc-tab__text-label{color:var(--mat-tab-header-inactive-label-text-color, var(--mat-app-on-surface));display:inline-flex;align-items:center}.mat-mdc-tab-link .mdc-tab__content{position:relative;pointer-events:auto}.mat-mdc-tab-link:hover .mdc-tab__ripple::before{opacity:.04}.mat-mdc-tab-link.cdk-program-focused .mdc-tab__ripple::before,.mat-mdc-tab-link.cdk-keyboard-focused .mdc-tab__ripple::before{opacity:.12}.mat-mdc-tab-link .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-header-inactive-ripple-color, var(--mat-app-on-surface))}.mat-mdc-tab-header.mat-mdc-tab-nav-bar-stretch-tabs .mat-mdc-tab-link{flex-grow:1}.mat-mdc-tab-link::before{margin:5px}@media(max-width: 599px){.mat-mdc-tab-link{min-width:72px}}']
    }]
  }], () => [{
    type: MatTabNav
  }, {
    type: ElementRef
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [MAT_RIPPLE_GLOBAL_OPTIONS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Attribute,
      args: ["tabindex"]
    }]
  }, {
    type: FocusMonitor
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [ANIMATION_MODULE_TYPE]
    }]
  }], {
    active: [{
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
    id: [{
      type: Input
    }]
  });
})();
var MatTabNavPanel = class _MatTabNavPanel {
  constructor() {
    this.id = `mat-tab-nav-panel-${nextUniqueId++}`;
  }
  static {
    this.\u0275fac = function MatTabNavPanel_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatTabNavPanel)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatTabNavPanel,
      selectors: [["mat-tab-nav-panel"]],
      hostAttrs: ["role", "tabpanel", 1, "mat-mdc-tab-nav-panel"],
      hostVars: 2,
      hostBindings: function MatTabNavPanel_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275attribute("aria-labelledby", ctx._activeTabId)("id", ctx.id);
        }
      },
      inputs: {
        id: "id"
      },
      exportAs: ["matTabNavPanel"],
      standalone: true,
      features: [\u0275\u0275StandaloneFeature],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function MatTabNavPanel_Template(rf, ctx) {
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTabNavPanel, [{
    type: Component,
    args: [{
      selector: "mat-tab-nav-panel",
      exportAs: "matTabNavPanel",
      template: "<ng-content></ng-content>",
      host: {
        "[attr.aria-labelledby]": "_activeTabId",
        "[attr.id]": "id",
        "class": "mat-mdc-tab-nav-panel",
        "role": "tabpanel"
      },
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true
    }]
  }], null, {
    id: [{
      type: Input
    }]
  });
})();
var MatTabsModule = class _MatTabsModule {
  static {
    this.\u0275fac = function MatTabsModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatTabsModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _MatTabsModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
      imports: [MatCommonModule, MatCommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTabsModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, MatTabContent, MatTabLabel, MatTab, MatTabGroup, MatTabNav, MatTabNavPanel, MatTabLink],
      exports: [MatCommonModule, MatTabContent, MatTabLabel, MatTab, MatTabGroup, MatTabNav, MatTabNavPanel, MatTabLink]
    }]
  }], null, null);
})();

// src/app/core/services/admin.service.ts
var AdminService = class _AdminService {
  constructor() {
    this.apiUrl = `${environment.apiUrl}/admin`;
    this.http = inject(HttpClient);
  }
  getStats() {
    return this.http.get(`${this.apiUrl}/stats`).pipe(catchError(() => throwError(() => new Error("Impossible de charger les statistiques"))));
  }
  getRevendeurs() {
    return this.http.get(`${this.apiUrl}/revendeurs`);
  }
  toggleActifRevendeur(id) {
    return this.http.patch(`${this.apiUrl}/revendeurs/${id}/toggle-actif`, {});
  }
  setAbonnementRevendeur(id, plan, jours = 30) {
    return this.http.patch(`${this.apiUrl}/revendeurs/${id}/abonnement`, { plan, jours: String(jours) });
  }
  getUtilisateurs() {
    return this.http.get(`${this.apiUrl}/utilisateurs`);
  }
  toggleActifUtilisateur(id) {
    return this.http.patch(`${this.apiUrl}/utilisateurs/${id}/toggle-actif`, {});
  }
  getCommandes() {
    return this.http.get(`${this.apiUrl}/commandes`);
  }
  updateStatutCommande(id, statut) {
    return this.http.patch(`${this.apiUrl}/commandes/${id}/statut`, { statut });
  }
  getTransactions() {
    return this.http.get(`${this.apiUrl}/transactions`);
  }
  getCatalogue() {
    return this.http.get(`${this.apiUrl}/catalogue`);
  }
  // ── Plans d'abonnement ───────────────────────────────────────────────────
  getPlans() {
    return this.http.get(`${this.apiUrl}/plans`);
  }
  createPlan(plan) {
    return this.http.post(`${this.apiUrl}/plans`, plan);
  }
  updatePlan(id, plan) {
    return this.http.put(`${this.apiUrl}/plans/${id}`, plan);
  }
  toggleActifPlan(id) {
    return this.http.patch(`${this.apiUrl}/plans/${id}/toggle-actif`, {});
  }
  // ── Subscriptions ────────────────────────────────────────────────────────
  getSubscriptions() {
    return this.http.get(`${this.apiUrl}/subscriptions`);
  }
  static {
    this.\u0275fac = function AdminService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AdminService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AdminService, factory: _AdminService.\u0275fac, providedIn: "root" });
  }
};

// node_modules/angularx-qrcode/fesm2022/angularx-qrcode.mjs
var import_qrcode = __toESM(require_browser(), 1);
var _c02 = ["qrcElement"];
var QRCodeComponent = class _QRCodeComponent {
  allowEmptyString = false;
  colorDark = "#000000ff";
  colorLight = "#ffffffff";
  cssClass = "qrcode";
  elementType = "canvas";
  errorCorrectionLevel = "M";
  imageSrc;
  imageHeight;
  imageWidth;
  margin = 4;
  qrdata = "";
  scale = 4;
  version;
  width = 10;
  // Accessibility features introduced in 13.0.4+
  alt;
  ariaLabel;
  title;
  qrCodeURL = new EventEmitter();
  qrcElement;
  context = null;
  centerImage;
  renderer = inject(Renderer2);
  sanitizer = inject(DomSanitizer);
  ngOnChanges() {
    return __async(this, null, function* () {
      yield this.createQRCode();
    });
  }
  isValidQrCodeText(data) {
    if (this.allowEmptyString === false) {
      return !(typeof data === "undefined" || data === "" || data === "null" || data === null);
    }
    return !(typeof data === "undefined");
  }
  toDataURL(qrCodeConfig) {
    return new Promise((resolve, reject) => {
      (0, import_qrcode.toDataURL)(this.qrdata, qrCodeConfig, (err, url) => {
        if (err) {
          reject(err);
        } else {
          resolve(url);
        }
      });
    });
  }
  toCanvas(canvas, qrCodeConfig) {
    return new Promise((resolve, reject) => {
      (0, import_qrcode.toCanvas)(canvas, this.qrdata, qrCodeConfig, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve("success");
        }
      });
    });
  }
  toSVG(qrCodeConfig) {
    return new Promise((resolve, reject) => {
      (0, import_qrcode.toString)(this.qrdata, qrCodeConfig, (err, url) => {
        if (err) {
          reject(err);
        } else {
          resolve(url);
        }
      });
    });
  }
  renderElement(element) {
    for (const node of this.qrcElement.nativeElement.childNodes) {
      this.renderer.removeChild(this.qrcElement.nativeElement, node);
    }
    this.renderer.appendChild(this.qrcElement.nativeElement, element);
  }
  createQRCode() {
    return __async(this, null, function* () {
      if (this.version && this.version > 40) {
        console.warn("[angularx-qrcode] max value for `version` is 40");
        this.version = 40;
      } else if (this.version && this.version < 1) {
        console.warn("[angularx-qrcode]`min value for `version` is 1");
        this.version = 1;
      } else if (this.version !== void 0 && isNaN(this.version)) {
        console.warn("[angularx-qrcode] version should be a number, defaulting to auto.");
        this.version = void 0;
      }
      try {
        if (!this.isValidQrCodeText(this.qrdata)) {
          throw new Error("[angularx-qrcode] Field `qrdata` is empty, set 'allowEmptyString=\"true\"' to overwrite this behaviour.");
        }
        if (this.isValidQrCodeText(this.qrdata) && this.qrdata === "") {
          this.qrdata = " ";
        }
        const config = {
          color: {
            dark: this.colorDark,
            light: this.colorLight
          },
          errorCorrectionLevel: this.errorCorrectionLevel,
          margin: this.margin,
          scale: this.scale,
          version: this.version,
          width: this.width
        };
        const centerImageSrc = this.imageSrc;
        const centerImageHeight = this.imageHeight ? +this.imageHeight : 40;
        const centerImageWidth = this.imageWidth ? +this.imageWidth : 40;
        switch (this.elementType) {
          case "canvas": {
            const canvasElement = this.renderer.createElement("canvas");
            this.context = canvasElement.getContext("2d");
            this.toCanvas(canvasElement, config).then(() => {
              if (this.ariaLabel) {
                this.renderer.setAttribute(canvasElement, "aria-label", `${this.ariaLabel}`);
              }
              if (this.title) {
                this.renderer.setAttribute(canvasElement, "title", `${this.title}`);
              }
              if (centerImageSrc && this.context) {
                this.centerImage = new Image(centerImageWidth, centerImageHeight);
                if (centerImageSrc !== this.centerImage.src) {
                  this.centerImage.crossOrigin = "anonymous";
                  this.centerImage.src = centerImageSrc;
                }
                if (centerImageHeight !== this.centerImage.height) {
                  this.centerImage.height = centerImageHeight;
                }
                if (centerImageWidth !== this.centerImage.width) {
                  this.centerImage.width = centerImageWidth;
                }
                const centerImage = this.centerImage;
                if (centerImage) {
                  centerImage.onload = () => {
                    this.context?.drawImage(centerImage, canvasElement.width / 2 - centerImageWidth / 2, canvasElement.height / 2 - centerImageHeight / 2, centerImageWidth, centerImageHeight);
                  };
                }
              }
              this.renderElement(canvasElement);
              this.emitQRCodeURL(canvasElement);
            }).catch((e) => {
              console.error("[angularx-qrcode] canvas error:", e);
            });
            break;
          }
          case "svg": {
            const svgParentElement = this.renderer.createElement("div");
            this.toSVG(config).then((svgString) => {
              this.renderer.setProperty(svgParentElement, "innerHTML", svgString);
              const svgElement = svgParentElement.firstChild;
              this.renderer.setAttribute(svgElement, "height", `${this.width}`);
              this.renderer.setAttribute(svgElement, "width", `${this.width}`);
              this.renderElement(svgElement);
              this.emitQRCodeURL(svgElement);
            }).catch((e) => {
              console.error("[angularx-qrcode] svg error:", e);
            });
            break;
          }
          case "url":
          case "img":
          default: {
            const imgElement = this.renderer.createElement("img");
            this.toDataURL(config).then((dataUrl) => {
              if (this.alt) {
                imgElement.setAttribute("alt", this.alt);
              }
              if (this.ariaLabel) {
                imgElement.setAttribute("aria-label", this.ariaLabel);
              }
              imgElement.setAttribute("src", dataUrl);
              if (this.title) {
                imgElement.setAttribute("title", this.title);
              }
              this.renderElement(imgElement);
              this.emitQRCodeURL(imgElement);
            }).catch((e) => {
              console.error("[angularx-qrcode] img/url error:", e);
            });
          }
        }
      } catch (e) {
        console.error("[angularx-qrcode] Error generating QR Code:", e.message);
      }
    });
  }
  convertBase64ImageUrlToBlob(base64ImageUrl) {
    const parts = base64ImageUrl.split(";base64,");
    const imageType = parts[0].split(":")[1];
    const decodedData = atob(parts[1]);
    const uInt8Array = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    return new Blob([uInt8Array], {
      type: imageType
    });
  }
  emitQRCodeURL(element) {
    const className = element.constructor.name;
    if (className === SVGSVGElement.name) {
      const svgHTML = element.outerHTML;
      const blob = new Blob([svgHTML], {
        type: "image/svg+xml"
      });
      const urlSvg = URL.createObjectURL(blob);
      const urlSanitized2 = this.sanitizer.bypassSecurityTrustUrl(urlSvg);
      this.qrCodeURL.emit(urlSanitized2);
      return;
    }
    let urlImage = "";
    if (className === HTMLCanvasElement.name) {
      urlImage = element.toDataURL("image/png");
    }
    if (className === HTMLImageElement.name) {
      urlImage = element.src;
    }
    const blobData = this.convertBase64ImageUrlToBlob(urlImage);
    const urlBlob = URL.createObjectURL(blobData);
    const urlSanitized = this.sanitizer.bypassSecurityTrustUrl(urlBlob);
    this.qrCodeURL.emit(urlSanitized);
  }
  static \u0275fac = function QRCodeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _QRCodeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _QRCodeComponent,
    selectors: [["qrcode"]],
    viewQuery: function QRCodeComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c02, 7);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.qrcElement = _t.first);
      }
    },
    inputs: {
      allowEmptyString: "allowEmptyString",
      colorDark: "colorDark",
      colorLight: "colorLight",
      cssClass: "cssClass",
      elementType: "elementType",
      errorCorrectionLevel: "errorCorrectionLevel",
      imageSrc: "imageSrc",
      imageHeight: "imageHeight",
      imageWidth: "imageWidth",
      margin: "margin",
      qrdata: "qrdata",
      scale: "scale",
      version: "version",
      width: "width",
      alt: "alt",
      ariaLabel: "ariaLabel",
      title: "title"
    },
    outputs: {
      qrCodeURL: "qrCodeURL"
    },
    standalone: true,
    features: [\u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature],
    decls: 2,
    vars: 2,
    consts: [["qrcElement", ""]],
    template: function QRCodeComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "div", null, 0);
      }
      if (rf & 2) {
        \u0275\u0275classMap(ctx.cssClass);
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QRCodeComponent, [{
    type: Component,
    args: [{
      // eslint-disable-next-line @angular-eslint/component-selector
      selector: "qrcode",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `<div #qrcElement [class]="cssClass"></div>`
    }]
  }], null, {
    allowEmptyString: [{
      type: Input
    }],
    colorDark: [{
      type: Input
    }],
    colorLight: [{
      type: Input
    }],
    cssClass: [{
      type: Input
    }],
    elementType: [{
      type: Input
    }],
    errorCorrectionLevel: [{
      type: Input
    }],
    imageSrc: [{
      type: Input
    }],
    imageHeight: [{
      type: Input
    }],
    imageWidth: [{
      type: Input
    }],
    margin: [{
      type: Input
    }],
    qrdata: [{
      type: Input
    }],
    scale: [{
      type: Input
    }],
    version: [{
      type: Input
    }],
    width: [{
      type: Input
    }],
    alt: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input
    }],
    title: [{
      type: Input
    }],
    qrCodeURL: [{
      type: Output
    }],
    qrcElement: [{
      type: ViewChild,
      args: ["qrcElement", {
        static: true
      }]
    }]
  });
})();

// src/app/features/admin/admin-dashboard/admin-dashboard.component.ts
var _forTrack0 = ($index, $item) => $item[0];
function AdminDashboardComponent_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "bar_chart");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, "\xA0Statistiques ");
  }
}
function AdminDashboardComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "mat-spinner", 16);
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_16_For_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "span");
    \u0275\u0275element(2, "span", 36);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 37);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 38);
    \u0275\u0275element(7, "div", 39);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(e_r1[0].toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.libelleStock(e_r1[0]));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r1[1]);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(e_r1[0].toLowerCase());
    \u0275\u0275styleProp("width", ctx_r1.pourcentage(e_r1[1], ctx_r1.stats().revendeursActifs), "%");
  }
}
function AdminDashboardComponent_Conditional_16_For_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "span", 40);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 37);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 38);
    \u0275\u0275element(6, "div", 41);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classMap("abo-" + e_r3[0].toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.libelleAbonnement(e_r3[0]));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r3[1]);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r1.pourcentage(e_r3[1], ctx_r1.stats().totalRevendeurs), "%");
  }
}
function AdminDashboardComponent_Conditional_16_For_77_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 37);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const e_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.libelleStatut(e_r4[0]));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r4[1]);
  }
}
function AdminDashboardComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 18)(2, "mat-icon");
    \u0275\u0275text(3, "store");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "span", 19);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 20);
    \u0275\u0275text(8, "Revendeurs inscrits");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 21)(10, "mat-icon");
    \u0275\u0275text(11, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div")(13, "span", 19);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 20);
    \u0275\u0275text(16, "Revendeurs actifs");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 22)(18, "mat-icon");
    \u0275\u0275text(19, "shopping_cart");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div")(21, "span", 19);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 20);
    \u0275\u0275text(24, "Commandes totales");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 23)(26, "mat-icon");
    \u0275\u0275text(27, "people");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div")(29, "span", 19);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "span", 20);
    \u0275\u0275text(32, "Utilisateurs inscrits");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(33, "div", 24)(34, "mat-icon");
    \u0275\u0275text(35, "payments");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div")(37, "span", 19);
    \u0275\u0275text(38);
    \u0275\u0275pipe(39, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "span", 20);
    \u0275\u0275text(41, "CA ce mois (FCFA)");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(42, "div", 25)(43, "mat-icon");
    \u0275\u0275text(44, "star");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "div")(46, "span", 19);
    \u0275\u0275text(47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "span", 20);
    \u0275\u0275text(49, "Note moyenne globale");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(50, "div", 26)(51, "mat-card", 27)(52, "mat-card-header")(53, "mat-card-title")(54, "mat-icon");
    \u0275\u0275text(55, "inventory_2");
    \u0275\u0275elementEnd();
    \u0275\u0275text(56, " \xC9tat des stocks");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(57, "mat-card-content");
    \u0275\u0275repeaterCreate(58, AdminDashboardComponent_Conditional_16_For_59_Template, 8, 8, null, null, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(60, "mat-card", 27)(61, "mat-card-header")(62, "mat-card-title")(63, "mat-icon");
    \u0275\u0275text(64, "workspace_premium");
    \u0275\u0275elementEnd();
    \u0275\u0275text(65, " Abonnements");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(66, "mat-card-content");
    \u0275\u0275repeaterCreate(67, AdminDashboardComponent_Conditional_16_For_68_Template, 7, 6, null, null, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(69, "mat-card", 27)(70, "mat-card-header")(71, "mat-card-title")(72, "mat-icon");
    \u0275\u0275text(73, "receipt_long");
    \u0275\u0275elementEnd();
    \u0275\u0275text(74, " Commandes par statut");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(75, "mat-card-content");
    \u0275\u0275repeaterCreate(76, AdminDashboardComponent_Conditional_16_For_77_Template, 5, 2, "div", 28, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(78, "mat-card", 29)(79, "mat-card-content")(80, "p", 30);
    \u0275\u0275text(81, "Chiffre d'affaires total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "p", 31);
    \u0275\u0275text(83);
    \u0275\u0275pipe(84, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(85, "div", 32)(86, "div", 33)(87, "span", 34);
    \u0275\u0275text(88);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(89, "span", 35);
    \u0275\u0275text(90, "avis publi\xE9s");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(91, "div", 33)(92, "span", 34);
    \u0275\u0275text(93);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(94, "span", 35);
    \u0275\u0275text(95, "clients");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(96, "div", 33)(97, "span", 34);
    \u0275\u0275text(98);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(99, "span", 35);
    \u0275\u0275text(100, "revendeurs");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.stats().totalRevendeurs);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.stats().revendeursActifs);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.stats().totalCommandes);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.stats().totalUtilisateurs);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(39, 10, ctx_r1.stats().chiffreAffaireMois, "1.0-0"));
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1("", ctx_r1.stats().noteMoyenneGlobale, "/5");
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r1.objectEntries(ctx_r1.stats().revendeurParStock));
    \u0275\u0275advance(9);
    \u0275\u0275repeater(ctx_r1.objectEntries(ctx_r1.stats().revendeurParAbonnement));
    \u0275\u0275advance(9);
    \u0275\u0275repeater(ctx_r1.objectEntries(ctx_r1.stats().commandesParStatut));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(84, 13, ctx_r1.stats().chiffreAffaireTotal, "1.0-0"), " FCFA");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.stats().totalAvis);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.stats().totalClients);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.stats().totalRevendeursInscrits);
  }
}
function AdminDashboardComponent_ng_template_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "store");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, "\xA0Revendeurs ");
  }
}
function AdminDashboardComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "mat-spinner", 42);
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_20_th_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Nom / Quartier");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_20_td_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 55);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r5.nom);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r5.quartier);
  }
}
function AdminDashboardComponent_Conditional_20_th_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "T\xE9l\xE9phone");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_20_td_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r6.telephone);
  }
}
function AdminDashboardComponent_Conditional_20_th_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Abonnement");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_20_td_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 54)(1, "mat-select", 56);
    \u0275\u0275twoWayListener("ngModelChange", function AdminDashboardComponent_Conditional_20_td_10_Template_mat_select_ngModelChange_1_listener($event) {
      const r_r8 = \u0275\u0275restoreView(_r7).$implicit;
      \u0275\u0275twoWayBindingSet(r_r8.abonnement, $event) || (r_r8.abonnement = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function AdminDashboardComponent_Conditional_20_td_10_Template_mat_select_ngModelChange_1_listener($event) {
      const r_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.changerAbonnement(r_r8, $event));
    });
    \u0275\u0275elementStart(2, "mat-option", 57);
    \u0275\u0275text(3, "Gratuit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-option", 58);
    \u0275\u0275text(5, "Test");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-option", 59);
    \u0275\u0275text(7, "Mensuel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "mat-option", 60);
    \u0275\u0275text(9, "Trimestriel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "mat-option", 61);
    \u0275\u0275text(11, "Semestriel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "mat-option", 62);
    \u0275\u0275text(13, "Annuel");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const r_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", r_r8.abonnement);
  }
}
function AdminDashboardComponent_Conditional_20_th_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Stock");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_20_td_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54)(1, "span", 63);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classMap("stock-" + r_r9.stockStatus.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.libelleStock(r_r9.stockStatus), " ");
  }
}
function AdminDashboardComponent_Conditional_20_th_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Statut");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_20_td_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 54)(1, "button", 64);
    \u0275\u0275listener("click", function AdminDashboardComponent_Conditional_20_td_16_Template_button_click_1_listener() {
      const r_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleRevendeur(r_r11));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r11 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classMap(r_r11.actif ? "btn-actif" : "btn-inactif");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r11.actif ? "visibility" : "visibility_off");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", r_r11.actif ? "Actif" : "Inactif", " ");
  }
}
function AdminDashboardComponent_Conditional_20_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 65);
  }
}
function AdminDashboardComponent_Conditional_20_tr_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 66);
  }
}
function AdminDashboardComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "table", 43);
    \u0275\u0275elementContainerStart(2, 44);
    \u0275\u0275template(3, AdminDashboardComponent_Conditional_20_th_3_Template, 2, 0, "th", 45)(4, AdminDashboardComponent_Conditional_20_td_4_Template, 5, 2, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(5, 47);
    \u0275\u0275template(6, AdminDashboardComponent_Conditional_20_th_6_Template, 2, 0, "th", 45)(7, AdminDashboardComponent_Conditional_20_td_7_Template, 2, 1, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(8, 48);
    \u0275\u0275template(9, AdminDashboardComponent_Conditional_20_th_9_Template, 2, 0, "th", 45)(10, AdminDashboardComponent_Conditional_20_td_10_Template, 14, 1, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(11, 49);
    \u0275\u0275template(12, AdminDashboardComponent_Conditional_20_th_12_Template, 2, 0, "th", 45)(13, AdminDashboardComponent_Conditional_20_td_13_Template, 3, 3, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(14, 50);
    \u0275\u0275template(15, AdminDashboardComponent_Conditional_20_th_15_Template, 2, 0, "th", 45)(16, AdminDashboardComponent_Conditional_20_td_16_Template, 5, 4, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(17, AdminDashboardComponent_Conditional_20_tr_17_Template, 1, 0, "tr", 51)(18, AdminDashboardComponent_Conditional_20_tr_18_Template, 1, 0, "tr", 52);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("dataSource", ctx_r1.revendeurs());
    \u0275\u0275advance(16);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.colonnesRevendeurs);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.colonnesRevendeurs);
  }
}
function AdminDashboardComponent_ng_template_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "inventory_2");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, "\xA0Catalogue ");
  }
}
function AdminDashboardComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "mat-spinner", 42);
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_24_th_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Revendeur");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_24_td_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 55);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r12 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r12.revendeurNom);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", item_r12.quartier || "\u2014", " \xB7 ", item_r12.revendeurTelephone || "\u2014", "");
  }
}
function AdminDashboardComponent_Conditional_24_th_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Produit");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_24_td_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 55);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r13 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r13.marqueLibelle);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r13.formatLibelle);
  }
}
function AdminDashboardComponent_Conditional_24_th_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Prix");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_24_td_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r14 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(2, 1, item_r14.prixUnitaire, "1.0-0"), " FCFA");
  }
}
function AdminDashboardComponent_Conditional_24_th_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Disponibilit\xE9");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_24_td_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 55);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r15 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r15.quantiteDisponible);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r15.disponible ? "Disponible" : "Masqu\xE9");
  }
}
function AdminDashboardComponent_Conditional_24_th_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Derni\xE8re mise \xE0 jour");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_24_td_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r16 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r16.updatedAt, "dd/MM/yy HH:mm"));
  }
}
function AdminDashboardComponent_Conditional_24_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 65);
  }
}
function AdminDashboardComponent_Conditional_24_tr_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 66);
  }
}
function AdminDashboardComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "table", 43);
    \u0275\u0275elementContainerStart(2, 67);
    \u0275\u0275template(3, AdminDashboardComponent_Conditional_24_th_3_Template, 2, 0, "th", 45)(4, AdminDashboardComponent_Conditional_24_td_4_Template, 5, 3, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(5, 68);
    \u0275\u0275template(6, AdminDashboardComponent_Conditional_24_th_6_Template, 2, 0, "th", 45)(7, AdminDashboardComponent_Conditional_24_td_7_Template, 5, 2, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(8, 69);
    \u0275\u0275template(9, AdminDashboardComponent_Conditional_24_th_9_Template, 2, 0, "th", 45)(10, AdminDashboardComponent_Conditional_24_td_10_Template, 3, 4, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(11, 49);
    \u0275\u0275template(12, AdminDashboardComponent_Conditional_24_th_12_Template, 2, 0, "th", 45)(13, AdminDashboardComponent_Conditional_24_td_13_Template, 5, 2, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(14, 70);
    \u0275\u0275template(15, AdminDashboardComponent_Conditional_24_th_15_Template, 2, 0, "th", 45)(16, AdminDashboardComponent_Conditional_24_td_16_Template, 3, 4, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(17, AdminDashboardComponent_Conditional_24_tr_17_Template, 1, 0, "tr", 51)(18, AdminDashboardComponent_Conditional_24_tr_18_Template, 1, 0, "tr", 52);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("dataSource", ctx_r1.catalogue());
    \u0275\u0275advance(16);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.colonnesCatalogue);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.colonnesCatalogue);
  }
}
function AdminDashboardComponent_ng_template_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "people");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, "\xA0Utilisateurs ");
  }
}
function AdminDashboardComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "mat-spinner", 42);
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_28_th_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Nom");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_28_td_4_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 73);
    \u0275\u0275text(1, "language");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_28_td_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, AdminDashboardComponent_Conditional_28_td_4_Conditional_3_Template, 2, 0, "mat-icon", 73);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const u_r17 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(u_r17.nom);
    \u0275\u0275advance();
    \u0275\u0275conditional(u_r17.googleId ? 3 : -1);
  }
}
function AdminDashboardComponent_Conditional_28_th_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "T\xE9l\xE9phone");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_28_td_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 74);
    \u0275\u0275text(1, "verified");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_28_td_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54);
    \u0275\u0275text(1);
    \u0275\u0275template(2, AdminDashboardComponent_Conditional_28_td_7_Conditional_2_Template, 2, 0, "mat-icon", 74);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const u_r18 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", u_r18.telephone, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(u_r18.telephoneVerifie ? 2 : -1);
  }
}
function AdminDashboardComponent_Conditional_28_th_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "R\xF4les");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_28_td_10_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 76);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r19 = ctx.$implicit;
    \u0275\u0275classMap("role-" + role_r19.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(role_r19);
  }
}
function AdminDashboardComponent_Conditional_28_td_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54);
    \u0275\u0275repeaterCreate(1, AdminDashboardComponent_Conditional_28_td_10_For_2_Template, 2, 3, "span", 75, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const u_r20 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(u_r20.roles);
  }
}
function AdminDashboardComponent_Conditional_28_th_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Inscription");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_28_td_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const u_r21 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, u_r21.createdAt, "dd/MM/yyyy"));
  }
}
function AdminDashboardComponent_Conditional_28_th_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Statut");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_28_td_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 54)(1, "button", 77);
    \u0275\u0275listener("click", function AdminDashboardComponent_Conditional_28_td_16_Template_button_click_1_listener() {
      const u_r23 = \u0275\u0275restoreView(_r22).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleUser(u_r23));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const u_r23 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("matTooltip", u_r23.actif ? "D\xE9sactiver" : "R\xE9activer");
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", u_r23.actif ? "var(--color-success)" : "var(--color-danger)");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", u_r23.actif ? "check_circle" : "cancel", " ");
  }
}
function AdminDashboardComponent_Conditional_28_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 65);
  }
}
function AdminDashboardComponent_Conditional_28_tr_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 66);
  }
}
function AdminDashboardComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "table", 43);
    \u0275\u0275elementContainerStart(2, 44);
    \u0275\u0275template(3, AdminDashboardComponent_Conditional_28_th_3_Template, 2, 0, "th", 45)(4, AdminDashboardComponent_Conditional_28_td_4_Template, 4, 2, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(5, 47);
    \u0275\u0275template(6, AdminDashboardComponent_Conditional_28_th_6_Template, 2, 0, "th", 45)(7, AdminDashboardComponent_Conditional_28_td_7_Template, 3, 2, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(8, 71);
    \u0275\u0275template(9, AdminDashboardComponent_Conditional_28_th_9_Template, 2, 0, "th", 45)(10, AdminDashboardComponent_Conditional_28_td_10_Template, 3, 0, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(11, 72);
    \u0275\u0275template(12, AdminDashboardComponent_Conditional_28_th_12_Template, 2, 0, "th", 45)(13, AdminDashboardComponent_Conditional_28_td_13_Template, 3, 4, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(14, 50);
    \u0275\u0275template(15, AdminDashboardComponent_Conditional_28_th_15_Template, 2, 0, "th", 45)(16, AdminDashboardComponent_Conditional_28_td_16_Template, 4, 4, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(17, AdminDashboardComponent_Conditional_28_tr_17_Template, 1, 0, "tr", 51)(18, AdminDashboardComponent_Conditional_28_tr_18_Template, 1, 0, "tr", 52);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("dataSource", ctx_r1.utilisateurs());
    \u0275\u0275advance(16);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.colonnesUsers);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.colonnesUsers);
  }
}
function AdminDashboardComponent_ng_template_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "receipt_long");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, "\xA0Commandes ");
  }
}
function AdminDashboardComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "mat-spinner", 42);
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_32_th_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Date");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_32_td_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r24 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, c_r24.createdAt, "dd/MM/yy HH:mm"));
  }
}
function AdminDashboardComponent_Conditional_32_th_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Client");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_32_td_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r25 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r25.clientTelephone);
  }
}
function AdminDashboardComponent_Conditional_32_th_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Revendeur");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_32_td_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r26 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r26.revendeurNom);
  }
}
function AdminDashboardComponent_Conditional_32_th_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Total");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_32_td_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r27 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(2, 1, c_r27.total, "1.0-0"), " FCFA");
  }
}
function AdminDashboardComponent_Conditional_32_th_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Paiement");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_32_td_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54)(1, "span", 83);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const c_r28 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classMap("pay-" + c_r28.statutPaiement.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", c_r28.statutPaiement, " ");
  }
}
function AdminDashboardComponent_Conditional_32_th_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Statut commande");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_32_td_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 54)(1, "mat-select", 84);
    \u0275\u0275twoWayListener("ngModelChange", function AdminDashboardComponent_Conditional_32_td_19_Template_mat_select_ngModelChange_1_listener($event) {
      const c_r30 = \u0275\u0275restoreView(_r29).$implicit;
      \u0275\u0275twoWayBindingSet(c_r30.statutCommande, $event) || (c_r30.statutCommande = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function AdminDashboardComponent_Conditional_32_td_19_Template_mat_select_ngModelChange_1_listener($event) {
      const c_r30 = \u0275\u0275restoreView(_r29).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.changerStatutCommande(c_r30, $event));
    });
    \u0275\u0275elementStart(2, "mat-option", 85);
    \u0275\u0275text(3, "En attente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-option", 86);
    \u0275\u0275text(5, "Confirm\xE9e");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-option", 87);
    \u0275\u0275text(7, "En livraison");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "mat-option", 88);
    \u0275\u0275text(9, "Livr\xE9e");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "mat-option", 89);
    \u0275\u0275text(11, "Annul\xE9e");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const c_r30 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", c_r30.statutCommande);
  }
}
function AdminDashboardComponent_Conditional_32_tr_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 65);
  }
}
function AdminDashboardComponent_Conditional_32_tr_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 66);
  }
}
function AdminDashboardComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "table", 43);
    \u0275\u0275elementContainerStart(2, 78);
    \u0275\u0275template(3, AdminDashboardComponent_Conditional_32_th_3_Template, 2, 0, "th", 45)(4, AdminDashboardComponent_Conditional_32_td_4_Template, 3, 4, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(5, 79);
    \u0275\u0275template(6, AdminDashboardComponent_Conditional_32_th_6_Template, 2, 0, "th", 45)(7, AdminDashboardComponent_Conditional_32_td_7_Template, 2, 1, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(8, 67);
    \u0275\u0275template(9, AdminDashboardComponent_Conditional_32_th_9_Template, 2, 0, "th", 45)(10, AdminDashboardComponent_Conditional_32_td_10_Template, 2, 1, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(11, 80);
    \u0275\u0275template(12, AdminDashboardComponent_Conditional_32_th_12_Template, 2, 0, "th", 45)(13, AdminDashboardComponent_Conditional_32_td_13_Template, 3, 4, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(14, 81);
    \u0275\u0275template(15, AdminDashboardComponent_Conditional_32_th_15_Template, 2, 0, "th", 45)(16, AdminDashboardComponent_Conditional_32_td_16_Template, 3, 3, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(17, 82);
    \u0275\u0275template(18, AdminDashboardComponent_Conditional_32_th_18_Template, 2, 0, "th", 45)(19, AdminDashboardComponent_Conditional_32_td_19_Template, 12, 1, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(20, AdminDashboardComponent_Conditional_32_tr_20_Template, 1, 0, "tr", 51)(21, AdminDashboardComponent_Conditional_32_tr_21_Template, 1, 0, "tr", 52);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("dataSource", ctx_r1.commandes());
    \u0275\u0275advance(19);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.colonnesCommandes);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.colonnesCommandes);
  }
}
function AdminDashboardComponent_ng_template_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "payment");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, "\xA0Transactions ");
  }
}
function AdminDashboardComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "mat-spinner", 42);
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_36_th_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Date");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_36_td_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r31 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, t_r31.createdAt, "dd/MM/yy HH:mm"));
  }
}
function AdminDashboardComponent_Conditional_36_th_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "R\xE9f\xE9rence");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_36_td_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54)(1, "code");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r32 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r32.reference);
  }
}
function AdminDashboardComponent_Conditional_36_th_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Type");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_36_td_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54)(1, "span", 93);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r33 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classMap("type-" + t_r33.type.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r33.type);
  }
}
function AdminDashboardComponent_Conditional_36_th_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Montant");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_36_td_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r34 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(2, 1, t_r34.montant, "1.0-0"), " FCFA");
  }
}
function AdminDashboardComponent_Conditional_36_th_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Client");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_36_td_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r35 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r35.clientTelephone);
  }
}
function AdminDashboardComponent_Conditional_36_th_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Statut");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_36_td_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54)(1, "span", 94);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r36 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classMap("feda-" + t_r36.statut.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.libelleStatutFeda(t_r36.statut), " ");
  }
}
function AdminDashboardComponent_Conditional_36_tr_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 65);
  }
}
function AdminDashboardComponent_Conditional_36_tr_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 66);
  }
}
function AdminDashboardComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "table", 43);
    \u0275\u0275elementContainerStart(2, 78);
    \u0275\u0275template(3, AdminDashboardComponent_Conditional_36_th_3_Template, 2, 0, "th", 45)(4, AdminDashboardComponent_Conditional_36_td_4_Template, 3, 4, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(5, 90);
    \u0275\u0275template(6, AdminDashboardComponent_Conditional_36_th_6_Template, 2, 0, "th", 45)(7, AdminDashboardComponent_Conditional_36_td_7_Template, 3, 1, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(8, 91);
    \u0275\u0275template(9, AdminDashboardComponent_Conditional_36_th_9_Template, 2, 0, "th", 45)(10, AdminDashboardComponent_Conditional_36_td_10_Template, 3, 3, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(11, 92);
    \u0275\u0275template(12, AdminDashboardComponent_Conditional_36_th_12_Template, 2, 0, "th", 45)(13, AdminDashboardComponent_Conditional_36_td_13_Template, 3, 4, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(14, 79);
    \u0275\u0275template(15, AdminDashboardComponent_Conditional_36_th_15_Template, 2, 0, "th", 45)(16, AdminDashboardComponent_Conditional_36_td_16_Template, 2, 1, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(17, 82);
    \u0275\u0275template(18, AdminDashboardComponent_Conditional_36_th_18_Template, 2, 0, "th", 45)(19, AdminDashboardComponent_Conditional_36_td_19_Template, 3, 3, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(20, AdminDashboardComponent_Conditional_36_tr_20_Template, 1, 0, "tr", 51)(21, AdminDashboardComponent_Conditional_36_tr_21_Template, 1, 0, "tr", 52);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("dataSource", ctx_r1.transactions());
    \u0275\u0275advance(19);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.colonnesTransactions);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.colonnesTransactions);
  }
}
function AdminDashboardComponent_ng_template_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "workspace_premium");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, "\xA0Plans ");
  }
}
function AdminDashboardComponent_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "mat-spinner", 42);
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_40_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 119);
    \u0275\u0275listener("click", function AdminDashboardComponent_Conditional_40_Conditional_56_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r38);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.annulerEditionPlan());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "close");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Annuler ");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_40_th_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Type");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_40_td_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54)(1, "span", 120);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r39 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classMap("plan-" + p_r39.type.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.libellePlanType(p_r39.type), " ");
  }
}
function AdminDashboardComponent_Conditional_40_th_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Nom / Code");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_40_td_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 55)(4, "code");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const p_r40 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r40.nom);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r40.code);
  }
}
function AdminDashboardComponent_Conditional_40_th_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Prix");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_40_td_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r41 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(2, 1, p_r41.prix, "1.0-0"), " FCFA");
  }
}
function AdminDashboardComponent_Conditional_40_th_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Dur\xE9e");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_40_td_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r42 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", p_r42.dureeJours, " jours");
  }
}
function AdminDashboardComponent_Conditional_40_th_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Quota");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_40_td_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r43 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r43.quota || "\u2014");
  }
}
function AdminDashboardComponent_Conditional_40_th_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Statut");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_40_td_76_Template(rf, ctx) {
  if (rf & 1) {
    const _r44 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 54)(1, "button", 64);
    \u0275\u0275listener("click", function AdminDashboardComponent_Conditional_40_td_76_Template_button_click_1_listener() {
      const p_r45 = \u0275\u0275restoreView(_r44).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.togglePlan(p_r45));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r45 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classMap(p_r45.actif ? "btn-actif" : "btn-inactif");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r45.actif ? "visibility" : "visibility_off");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r45.actif ? "Actif" : "Inactif", " ");
  }
}
function AdminDashboardComponent_Conditional_40_th_78_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "th", 53);
  }
}
function AdminDashboardComponent_Conditional_40_td_79_Template(rf, ctx) {
  if (rf & 1) {
    const _r46 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 54)(1, "button", 121);
    \u0275\u0275listener("click", function AdminDashboardComponent_Conditional_40_td_79_Template_button_click_1_listener() {
      const p_r47 = \u0275\u0275restoreView(_r46).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.editerPlan(p_r47));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()()();
  }
}
function AdminDashboardComponent_Conditional_40_tr_80_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 65);
  }
}
function AdminDashboardComponent_Conditional_40_tr_81_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 66);
  }
  if (rf & 2) {
    const row_r48 = ctx.$implicit;
    \u0275\u0275classProp("row-inactif", !row_r48.actif);
  }
}
function AdminDashboardComponent_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 95)(1, "mat-card-header")(2, "mat-card-title")(3, "mat-icon");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "mat-card-content")(7, "form", 96);
    \u0275\u0275listener("ngSubmit", function AdminDashboardComponent_Conditional_40_Template_form_ngSubmit_7_listener() {
      \u0275\u0275restoreView(_r37);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.soumettreFormPlan());
    });
    \u0275\u0275elementStart(8, "div", 97)(9, "mat-form-field", 98)(10, "mat-label");
    \u0275\u0275text(11, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "mat-select", 99)(13, "mat-option", 100);
    \u0275\u0275text(14, "Revendeur");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "mat-option", 101);
    \u0275\u0275text(16, "Client Consultation");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "mat-option", 102);
    \u0275\u0275text(18, "Client Livraison");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "mat-form-field", 98)(20, "mat-label");
    \u0275\u0275text(21, "Nom");
    \u0275\u0275elementEnd();
    \u0275\u0275element(22, "input", 103);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "mat-form-field", 98)(24, "mat-label");
    \u0275\u0275text(25, "Code unique");
    \u0275\u0275elementEnd();
    \u0275\u0275element(26, "input", 104);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "mat-form-field", 98)(28, "mat-label");
    \u0275\u0275text(29, "Prix (FCFA)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(30, "input", 105);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "mat-form-field", 98)(32, "mat-label");
    \u0275\u0275text(33, "Dur\xE9e (jours)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(34, "input", 106);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "mat-form-field", 98)(36, "mat-label");
    \u0275\u0275text(37, "Quota");
    \u0275\u0275elementEnd();
    \u0275\u0275element(38, "input", 107);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "mat-form-field", 98)(40, "mat-label");
    \u0275\u0275text(41, "Ordre d'affichage");
    \u0275\u0275elementEnd();
    \u0275\u0275element(42, "input", 108);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "mat-form-field", 109)(44, "mat-label");
    \u0275\u0275text(45, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275element(46, "input", 110);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "mat-form-field", 109)(48, "mat-label");
    \u0275\u0275text(49, "Features (s\xE9par\xE9es par des virgules)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(50, "input", 111);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "div", 112)(52, "button", 113)(53, "mat-icon");
    \u0275\u0275text(54);
    \u0275\u0275elementEnd();
    \u0275\u0275text(55);
    \u0275\u0275elementEnd();
    \u0275\u0275template(56, AdminDashboardComponent_Conditional_40_Conditional_56_Template, 4, 0, "button", 114);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(57, "div", 8)(58, "table", 43);
    \u0275\u0275elementContainerStart(59, 91);
    \u0275\u0275template(60, AdminDashboardComponent_Conditional_40_th_60_Template, 2, 0, "th", 45)(61, AdminDashboardComponent_Conditional_40_td_61_Template, 3, 3, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(62, 44);
    \u0275\u0275template(63, AdminDashboardComponent_Conditional_40_th_63_Template, 2, 0, "th", 45)(64, AdminDashboardComponent_Conditional_40_td_64_Template, 6, 2, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(65, 69);
    \u0275\u0275template(66, AdminDashboardComponent_Conditional_40_th_66_Template, 2, 0, "th", 45)(67, AdminDashboardComponent_Conditional_40_td_67_Template, 3, 4, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(68, 115);
    \u0275\u0275template(69, AdminDashboardComponent_Conditional_40_th_69_Template, 2, 0, "th", 45)(70, AdminDashboardComponent_Conditional_40_td_70_Template, 2, 1, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(71, 116);
    \u0275\u0275template(72, AdminDashboardComponent_Conditional_40_th_72_Template, 2, 0, "th", 45)(73, AdminDashboardComponent_Conditional_40_td_73_Template, 2, 1, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(74, 50);
    \u0275\u0275template(75, AdminDashboardComponent_Conditional_40_th_75_Template, 2, 0, "th", 45)(76, AdminDashboardComponent_Conditional_40_td_76_Template, 5, 4, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(77, 117);
    \u0275\u0275template(78, AdminDashboardComponent_Conditional_40_th_78_Template, 1, 0, "th", 45)(79, AdminDashboardComponent_Conditional_40_td_79_Template, 4, 0, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(80, AdminDashboardComponent_Conditional_40_tr_80_Template, 1, 0, "tr", 51)(81, AdminDashboardComponent_Conditional_40_tr_81_Template, 1, 2, "tr", 118);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.planEnEdition() ? "edit" : "add_circle");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.planEnEdition() ? "Modifier le plan" : "Cr\xE9er un plan", " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("formGroup", ctx_r1.formulairePlan);
    \u0275\u0275advance(45);
    \u0275\u0275property("disabled", ctx_r1.formulairePlan.invalid);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.planEnEdition() ? "save" : "add");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.planEnEdition() ? "Enregistrer" : "Cr\xE9er le plan", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.planEnEdition() ? 56 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("dataSource", ctx_r1.plans());
    \u0275\u0275advance(22);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.colonnesPlans);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.colonnesPlans);
  }
}
function AdminDashboardComponent_ng_template_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "card_membership");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, "\xA0Abonnements ");
  }
}
function AdminDashboardComponent_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "mat-spinner", 42);
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_44_th_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Abonn\xE9");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_44_td_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 55);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r49 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r49.userNom);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r49.userTelephone || "\u2014");
  }
}
function AdminDashboardComponent_Conditional_44_th_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Plan");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_44_td_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 55);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r50 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r50.planCode);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r50.planType);
  }
}
function AdminDashboardComponent_Conditional_44_th_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Souscrit le");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_44_td_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r51 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, s_r51.createdAt, "dd/MM/yy HH:mm"));
  }
}
function AdminDashboardComponent_Conditional_44_th_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Activ\xE9 le");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_44_td_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r52 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, s_r52.dateDebut, "dd/MM/yy HH:mm"));
  }
}
function AdminDashboardComponent_Conditional_44_th_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Expire le");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_44_td_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r53 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, s_r53.dateFin, "dd/MM/yy HH:mm"));
  }
}
function AdminDashboardComponent_Conditional_44_th_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Quota restant");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_44_td_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r54 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r54.quotaRestant);
  }
}
function AdminDashboardComponent_Conditional_44_th_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Statut");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_44_td_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54)(1, "span", 127);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r55 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classMap("sub-" + s_r55.statut.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.libelleStatutSub(s_r55.statut), " ");
  }
}
function AdminDashboardComponent_Conditional_44_tr_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 65);
  }
}
function AdminDashboardComponent_Conditional_44_tr_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 66);
  }
}
function AdminDashboardComponent_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "table", 43);
    \u0275\u0275elementContainerStart(2, 122);
    \u0275\u0275template(3, AdminDashboardComponent_Conditional_44_th_3_Template, 2, 0, "th", 45)(4, AdminDashboardComponent_Conditional_44_td_4_Template, 5, 2, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(5, 123);
    \u0275\u0275template(6, AdminDashboardComponent_Conditional_44_th_6_Template, 2, 0, "th", 45)(7, AdminDashboardComponent_Conditional_44_td_7_Template, 5, 2, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(8, 124);
    \u0275\u0275template(9, AdminDashboardComponent_Conditional_44_th_9_Template, 2, 0, "th", 45)(10, AdminDashboardComponent_Conditional_44_td_10_Template, 3, 4, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(11, 125);
    \u0275\u0275template(12, AdminDashboardComponent_Conditional_44_th_12_Template, 2, 0, "th", 45)(13, AdminDashboardComponent_Conditional_44_td_13_Template, 3, 4, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(14, 126);
    \u0275\u0275template(15, AdminDashboardComponent_Conditional_44_th_15_Template, 2, 0, "th", 45)(16, AdminDashboardComponent_Conditional_44_td_16_Template, 3, 4, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(17, 116);
    \u0275\u0275template(18, AdminDashboardComponent_Conditional_44_th_18_Template, 2, 0, "th", 45)(19, AdminDashboardComponent_Conditional_44_td_19_Template, 2, 1, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(20, 82);
    \u0275\u0275template(21, AdminDashboardComponent_Conditional_44_th_21_Template, 2, 0, "th", 45)(22, AdminDashboardComponent_Conditional_44_td_22_Template, 3, 3, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(23, AdminDashboardComponent_Conditional_44_tr_23_Template, 1, 0, "tr", 51)(24, AdminDashboardComponent_Conditional_44_tr_24_Template, 1, 0, "tr", 52);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("dataSource", ctx_r1.subscriptions());
    \u0275\u0275advance(22);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.colonnesSubscriptions);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.colonnesSubscriptions);
  }
}
function AdminDashboardComponent_ng_template_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "security");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, "\xA0S\xE9curit\xE9 ");
  }
}
function AdminDashboardComponent_Conditional_59_Conditional_5_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 131);
  }
}
function AdminDashboardComponent_Conditional_59_Conditional_5_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "add_moderator");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_59_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r56 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 129);
    \u0275\u0275text(1, "Cliquez pour g\xE9n\xE9rer vos codes de configuration Google Authenticator.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 130);
    \u0275\u0275listener("click", function AdminDashboardComponent_Conditional_59_Conditional_5_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r56);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.lancerSetupTotp());
    });
    \u0275\u0275template(3, AdminDashboardComponent_Conditional_59_Conditional_5_Conditional_3_Template, 1, 0, "mat-spinner", 131)(4, AdminDashboardComponent_Conditional_59_Conditional_5_Conditional_4_Template, 2, 0, "mat-icon");
    \u0275\u0275text(5, " Activer le 2FA ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.totpEnvoi());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.totpEnvoi() ? 3 : 4);
  }
}
function AdminDashboardComponent_Conditional_59_Conditional_6_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 143)(1, "mat-icon");
    \u0275\u0275text(2, "error_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.totpErreur(), " ");
  }
}
function AdminDashboardComponent_Conditional_59_Conditional_6_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 131);
  }
}
function AdminDashboardComponent_Conditional_59_Conditional_6_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_59_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r57 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 128)(1, "div", 132)(2, "span", 133);
    \u0275\u0275text(3, "1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "strong");
    \u0275\u0275text(6, "Scannez ce QR code");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " avec Google Authenticator, Authy ou toute autre application TOTP. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 134);
    \u0275\u0275element(9, "qrcode", 135);
    \u0275\u0275elementStart(10, "p", 136);
    \u0275\u0275text(11, "Impossible de scanner ?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 137)(13, "label");
    \u0275\u0275text(14, "Cl\xE9 secr\xE8te (saisie manuelle)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 138)(16, "code");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 139);
    \u0275\u0275listener("click", function AdminDashboardComponent_Conditional_59_Conditional_6_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r57);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.copierSecret());
    });
    \u0275\u0275elementStart(19, "mat-icon");
    \u0275\u0275text(20, "content_copy");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(21, "div", 132)(22, "span", 133);
    \u0275\u0275text(23, "2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div")(25, "strong");
    \u0275\u0275text(26, "Entrez le code \xE0 6 chiffres");
    \u0275\u0275elementEnd();
    \u0275\u0275text(27, " affich\xE9 par l'application pour confirmer la configuration. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "mat-form-field", 140)(29, "mat-label");
    \u0275\u0275text(30, "Code de confirmation");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "input", 141);
    \u0275\u0275twoWayListener("ngModelChange", function AdminDashboardComponent_Conditional_59_Conditional_6_Template_input_ngModelChange_31_listener($event) {
      \u0275\u0275restoreView(_r57);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.totpCodeConfirm, $event) || (ctx_r1.totpCodeConfirm = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "mat-icon", 142);
    \u0275\u0275text(33, "pin");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(34, AdminDashboardComponent_Conditional_59_Conditional_6_Conditional_34_Template, 4, 1, "div", 143);
    \u0275\u0275elementStart(35, "div", 144)(36, "button", 130);
    \u0275\u0275listener("click", function AdminDashboardComponent_Conditional_59_Conditional_6_Template_button_click_36_listener() {
      \u0275\u0275restoreView(_r57);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.confirmerSetupTotp());
    });
    \u0275\u0275template(37, AdminDashboardComponent_Conditional_59_Conditional_6_Conditional_37_Template, 1, 0, "mat-spinner", 131)(38, AdminDashboardComponent_Conditional_59_Conditional_6_Conditional_38_Template, 2, 0, "mat-icon");
    \u0275\u0275text(39, " Confirmer et activer ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "button", 64);
    \u0275\u0275listener("click", function AdminDashboardComponent_Conditional_59_Conditional_6_Template_button_click_40_listener() {
      \u0275\u0275restoreView(_r57);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.annulerSetup());
    });
    \u0275\u0275text(41, "Annuler");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(9);
    \u0275\u0275property("qrdata", ctx_r1.totpUri())("width", 200)("errorCorrectionLevel", "M")("colorDark", "#1a1a2e")("colorLight", "#ffffff");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.totpSecret());
    \u0275\u0275advance(14);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.totpCodeConfirm);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.totpErreur() ? 34 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.totpCodeConfirm.length !== 6 || ctx_r1.totpEnvoi());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.totpEnvoi() ? 37 : 38);
  }
}
function AdminDashboardComponent_Conditional_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "h4")(2, "mat-icon");
    \u0275\u0275text(3, "qr_code_2");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Configurer le 2FA");
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, AdminDashboardComponent_Conditional_59_Conditional_5_Template, 6, 2)(6, AdminDashboardComponent_Conditional_59_Conditional_6_Template, 42, 10, "div", 128);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275conditional(!ctx_r1.totpUri() ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.totpUri() ? 6 : -1);
  }
}
function AdminDashboardComponent_Conditional_60_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 143)(1, "mat-icon");
    \u0275\u0275text(2, "error_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.totpErreur(), " ");
  }
}
function AdminDashboardComponent_Conditional_60_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 131);
  }
}
function AdminDashboardComponent_Conditional_60_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "lock_open");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    const _r58 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "h4")(2, "mat-icon");
    \u0275\u0275text(3, "no_encryption");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " D\xE9sactiver le 2FA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 129);
    \u0275\u0275text(6, "Entrez votre code TOTP actuel pour confirmer la d\xE9sactivation.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "mat-form-field", 140)(8, "mat-label");
    \u0275\u0275text(9, "Code TOTP actuel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 145);
    \u0275\u0275twoWayListener("ngModelChange", function AdminDashboardComponent_Conditional_60_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r58);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.totpCodeDesactiver, $event) || (ctx_r1.totpCodeDesactiver = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "mat-icon", 142);
    \u0275\u0275text(12, "pin");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(13, AdminDashboardComponent_Conditional_60_Conditional_13_Template, 4, 1, "div", 143);
    \u0275\u0275elementStart(14, "button", 146);
    \u0275\u0275listener("click", function AdminDashboardComponent_Conditional_60_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r58);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.desactiverTotp());
    });
    \u0275\u0275template(15, AdminDashboardComponent_Conditional_60_Conditional_15_Template, 1, 0, "mat-spinner", 131)(16, AdminDashboardComponent_Conditional_60_Conditional_16_Template, 2, 0, "mat-icon");
    \u0275\u0275text(17, " D\xE9sactiver le 2FA ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.totpCodeDesactiver);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.totpErreur() ? 13 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.totpCodeDesactiver.length !== 6 || ctx_r1.totpEnvoi());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.totpEnvoi() ? 15 : 16);
  }
}
var AdminDashboardComponent = class _AdminDashboardComponent {
  constructor() {
    this.adminService = inject(AdminService);
    this.authService = inject(AuthService);
    this.snackBar = inject(MatSnackBar);
    this.fb = inject(FormBuilder);
    this.stats = signal(null);
    this.revendeurs = signal([]);
    this.catalogue = signal([]);
    this.utilisateurs = signal([]);
    this.commandes = signal([]);
    this.transactions = signal([]);
    this.plans = signal([]);
    this.subscriptions = signal([]);
    this.chargementStats = signal(false);
    this.chargementRevendeurs = signal(false);
    this.chargementCatalogue = signal(false);
    this.chargementUsers = signal(false);
    this.chargementCommandes = signal(false);
    this.chargementTransactions = signal(false);
    this.chargementPlans = signal(false);
    this.chargementSubscriptions = signal(false);
    this.planEnEdition = signal(null);
    this.totp2faActif = signal(false);
    this.totpUri = signal(null);
    this.totpSecret = signal(null);
    this.totpEnvoi = signal(false);
    this.totpErreur = signal(null);
    this.totpCodeConfirm = "";
    this.totpCodeDesactiver = "";
    this.colonnesRevendeurs = ["nom", "telephone", "abonnement", "stock", "actif"];
    this.colonnesCatalogue = ["revendeur", "produit", "prix", "stock", "maj"];
    this.colonnesUsers = ["nom", "telephone", "roles", "inscription", "actif"];
    this.colonnesCommandes = ["date", "client", "revendeur", "total", "paiement", "statut"];
    this.colonnesTransactions = ["date", "reference", "type", "montant", "client", "statut"];
    this.colonnesPlans = ["type", "nom", "prix", "duree", "quota", "actif", "actions"];
    this.colonnesSubscriptions = ["abonne", "planCode", "createdAt", "dateDebut", "dateFin", "quota", "statut"];
    this.objectEntries = Object.entries;
    this.formulairePlan = this.fb.group({
      type: ["REVENDEUR", Validators.required],
      nom: ["", Validators.required],
      code: ["", Validators.required],
      prix: [0, [Validators.required, Validators.min(0)]],
      dureeJours: [30, [Validators.required, Validators.min(1)]],
      quota: [0, Validators.min(0)],
      description: [""],
      featuresStr: [""],
      ordre: [0]
    });
  }
  ngOnInit() {
    this.chargerTout();
  }
  chargerTout() {
    this.chargerStats();
    this.chargerRevendeurs();
    this.chargerCatalogue();
    this.chargerUsers();
    this.chargerCommandes();
    this.chargerTransactions();
    this.chargerPlans();
    this.chargerSubscriptions();
  }
  chargerStats() {
    this.chargementStats.set(true);
    this.adminService.getStats().subscribe({
      next: (s) => {
        this.stats.set(s);
        this.chargementStats.set(false);
      },
      error: () => this.chargementStats.set(false)
    });
  }
  chargerRevendeurs() {
    this.chargementRevendeurs.set(true);
    this.adminService.getRevendeurs().subscribe({
      next: (r) => {
        this.revendeurs.set(r);
        this.chargementRevendeurs.set(false);
      },
      error: () => this.chargementRevendeurs.set(false)
    });
  }
  chargerCatalogue() {
    this.chargementCatalogue.set(true);
    this.adminService.getCatalogue().subscribe({
      next: (items) => {
        this.catalogue.set(items);
        this.chargementCatalogue.set(false);
      },
      error: () => this.chargementCatalogue.set(false)
    });
  }
  chargerUsers() {
    this.chargementUsers.set(true);
    this.adminService.getUtilisateurs().subscribe({
      next: (u) => {
        this.utilisateurs.set(u);
        this.chargementUsers.set(false);
      },
      error: () => this.chargementUsers.set(false)
    });
  }
  chargerCommandes() {
    this.chargementCommandes.set(true);
    this.adminService.getCommandes().subscribe({
      next: (c) => {
        this.commandes.set(c);
        this.chargementCommandes.set(false);
      },
      error: () => this.chargementCommandes.set(false)
    });
  }
  chargerTransactions() {
    this.chargementTransactions.set(true);
    this.adminService.getTransactions().subscribe({
      next: (t) => {
        this.transactions.set(t);
        this.chargementTransactions.set(false);
      },
      error: () => this.chargementTransactions.set(false)
    });
  }
  toggleRevendeur(r) {
    this.adminService.toggleActifRevendeur(r.id).subscribe({
      next: (updated) => {
        this.revendeurs.update((list) => list.map((x) => x.id === r.id ? updated : x));
        this.snackBar.open(`${updated.nom} : ${updated.actif ? "activ\xE9" : "d\xE9sactiv\xE9"}`, "OK", { duration: 3e3 });
      }
    });
  }
  changerAbonnement(r, plan) {
    this.adminService.setAbonnementRevendeur(r.id, plan).subscribe({
      next: (updated) => {
        this.revendeurs.update((list) => list.map((x) => x.id === r.id ? updated : x));
        this.snackBar.open(`${r.nom} \u2192 plan ${plan}`, "OK", { duration: 3e3 });
      }
    });
  }
  toggleUser(u) {
    this.adminService.toggleActifUtilisateur(u.id).subscribe({
      next: (res) => {
        u.actif = res.actif;
        this.snackBar.open(`${u.nom} : ${res.actif ? "r\xE9activ\xE9" : "d\xE9sactiv\xE9"}`, "OK", { duration: 3e3 });
      }
    });
  }
  changerStatutCommande(c, statut) {
    this.adminService.updateStatutCommande(c.id, statut).subscribe({
      next: (updated) => {
        this.commandes.update((list) => list.map((x) => x.id === c.id ? updated : x));
        this.snackBar.open(`Commande mise \xE0 jour : ${statut}`, "OK", { duration: 3e3 });
      }
    });
  }
  pourcentage(v, total) {
    return total > 0 ? v / total * 100 : 0;
  }
  libelleStock(s) {
    return { EN_STOCK: "En stock", STOCK_FAIBLE: "Stock faible", EPUISE: "\xC9puis\xE9" }[s] ?? s;
  }
  libelleStatut(s) {
    return { EN_ATTENTE: "En attente", CONFIRMEE: "Confirm\xE9e", EN_LIVRAISON: "En livraison", LIVREE: "Livr\xE9e", ANNULEE: "Annul\xE9e" }[s] ?? s;
  }
  libelleStatutFeda(s) {
    return { PENDING: "En attente", APPROVED: "Approuv\xE9", DECLINED: "Refus\xE9", CANCELLED: "Annul\xE9", REFUNDED: "Rembours\xE9", TRANSFERRED: "Transf\xE9r\xE9" }[s] ?? s;
  }
  libelleAbonnement(a) {
    return {
      GRATUIT: "Gratuit",
      TEST: "Test",
      MENSUEL: "Mensuel",
      TRIMESTRIEL: "Trimestriel",
      SEMESTRIEL: "Semestriel",
      ANNUEL: "Annuel"
    }[a] ?? a;
  }
  // ── Plans d'abonnement ───────────────────────────────────────────────────
  chargerPlans() {
    this.chargementPlans.set(true);
    this.adminService.getPlans().subscribe({
      next: (p) => {
        this.plans.set(p);
        this.chargementPlans.set(false);
      },
      error: () => this.chargementPlans.set(false)
    });
  }
  togglePlan(p) {
    this.adminService.toggleActifPlan(p.id).subscribe({
      next: (updated) => {
        this.plans.update((list) => list.map((x) => x.id === p.id ? updated : x));
        this.snackBar.open(`${p.nom} : ${updated.actif ? "activ\xE9" : "d\xE9sactiv\xE9"}`, "OK", { duration: 3e3 });
      }
    });
  }
  editerPlan(p) {
    this.planEnEdition.set(p);
    this.formulairePlan.patchValue({
      type: p.type,
      nom: p.nom,
      code: p.code,
      prix: p.prix,
      dureeJours: p.dureeJours,
      quota: p.quota,
      description: p.description || "",
      featuresStr: p.features?.join(", ") || "",
      ordre: p.ordre
    });
  }
  annulerEditionPlan() {
    this.planEnEdition.set(null);
    this.formulairePlan.reset({ type: "REVENDEUR", prix: 0, dureeJours: 30, quota: 0, ordre: 0 });
  }
  soumettreFormPlan() {
    if (this.formulairePlan.invalid)
      return;
    const v = this.formulairePlan.value;
    const request = {
      type: v.type,
      nom: v.nom,
      code: v.code,
      prix: v.prix,
      dureeJours: v.dureeJours,
      quota: v.quota || 0,
      description: v.description || "",
      features: v.featuresStr ? v.featuresStr.split(",").map((f) => f.trim()).filter((f) => f) : [],
      ordre: v.ordre || 0
    };
    const edition = this.planEnEdition();
    if (edition) {
      this.adminService.updatePlan(edition.id, request).subscribe({
        next: (updated) => {
          this.plans.update((list) => list.map((x) => x.id === edition.id ? updated : x));
          this.annulerEditionPlan();
          this.snackBar.open(`Plan "${updated.nom}" mis \xE0 jour`, "OK", { duration: 3e3 });
        },
        error: (err) => this.snackBar.open(err.error?.message || "Erreur", "OK", { duration: 5e3 })
      });
    } else {
      this.adminService.createPlan(request).subscribe({
        next: (created) => {
          this.plans.update((list) => [...list, created]);
          this.annulerEditionPlan();
          this.snackBar.open(`Plan "${created.nom}" cr\xE9\xE9`, "OK", { duration: 3e3 });
        },
        error: (err) => this.snackBar.open(err.error?.message || "Erreur", "OK", { duration: 5e3 })
      });
    }
  }
  libellePlanType(t) {
    return { REVENDEUR: "Revendeur", CLIENT_CONSULT: "Consultation", CLIENT_LIVRAISON: "Livraison" }[t] ?? t;
  }
  // ── Subscriptions ────────────────────────────────────────────────────────
  chargerSubscriptions() {
    this.chargementSubscriptions.set(true);
    this.adminService.getSubscriptions().subscribe({
      next: (s) => {
        this.subscriptions.set(s);
        this.chargementSubscriptions.set(false);
      },
      error: () => this.chargementSubscriptions.set(false)
    });
  }
  libelleStatutSub(s) {
    return { ACTIVE: "Actif", PENDING: "En attente", EXPIRED: "Expir\xE9" }[s] ?? s;
  }
  // ── TOTP 2FA ──────────────────────────────────────────────────────────────
  lancerSetupTotp() {
    this.totpEnvoi.set(true);
    this.totpErreur.set(null);
    this.authService.totpSetup().subscribe({
      next: (res) => {
        this.totpUri.set(res.otpauthUri);
        this.totpSecret.set(res.secret);
        this.totpEnvoi.set(false);
      },
      error: (err) => {
        this.totpErreur.set(err.message);
        this.totpEnvoi.set(false);
      }
    });
  }
  confirmerSetupTotp() {
    this.totpEnvoi.set(true);
    this.totpErreur.set(null);
    this.authService.totpConfirm(this.totpCodeConfirm).subscribe({
      next: () => {
        this.totp2faActif.set(true);
        this.totpUri.set(null);
        this.totpSecret.set(null);
        this.totpCodeConfirm = "";
        this.totpEnvoi.set(false);
        this.snackBar.open("2FA activ\xE9 avec succ\xE8s \u2713", "OK", { duration: 4e3 });
      },
      error: (err) => {
        this.totpErreur.set(err.message || "Code invalide");
        this.totpCodeConfirm = "";
        this.totpEnvoi.set(false);
      }
    });
  }
  desactiverTotp() {
    this.totpEnvoi.set(true);
    this.totpErreur.set(null);
    this.authService.totpDisable(this.totpCodeDesactiver).subscribe({
      next: () => {
        this.totp2faActif.set(false);
        this.totpCodeDesactiver = "";
        this.totpEnvoi.set(false);
        this.snackBar.open("2FA d\xE9sactiv\xE9", "OK", { duration: 3e3 });
      },
      error: (err) => {
        this.totpErreur.set(err.message || "Code invalide");
        this.totpCodeDesactiver = "";
        this.totpEnvoi.set(false);
      }
    });
  }
  annulerSetup() {
    this.totpUri.set(null);
    this.totpSecret.set(null);
    this.totpCodeConfirm = "";
    this.totpErreur.set(null);
  }
  copierSecret() {
    if (this.totpSecret()) {
      navigator.clipboard.writeText(this.totpSecret()).then(() => this.snackBar.open("Cl\xE9 copi\xE9e", "", { duration: 2e3 }));
    }
  }
  static {
    this.\u0275fac = function AdminDashboardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AdminDashboardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminDashboardComponent, selectors: [["app-admin-dashboard"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 61, vars: 16, consts: [[1, "dashboard-page"], [1, "container"], [1, "dashboard-entete"], [1, "sous-titre"], ["mat-stroked-button", "", 1, "btn-refresh", 3, "click"], ["animationDuration", "150ms", 1, "tabs-admin"], ["mat-tab-label", ""], [1, "chargement-centre"], [1, "table-wrapper"], [1, "section-securite"], [1, "carte-statut-2fa"], [1, "statut-icone"], [1, "statut-texte"], [1, "badge-statut"], [1, "carte-action"], [1, "carte-action", "carte-danger"], ["diameter", "48"], [1, "kpi-grille"], [1, "kpi-carte", "couleur-primary"], [1, "kpi-valeur"], [1, "kpi-label"], [1, "kpi-carte", "couleur-success"], [1, "kpi-carte", "couleur-bleu"], [1, "kpi-carte", "couleur-violet"], [1, "kpi-carte", "couleur-accent"], [1, "kpi-carte", "couleur-gris"], [1, "section-grille"], [1, "section-carte"], [1, "stat-ligne"], [1, "section-carte", "carte-ca"], [1, "ca-label"], [1, "ca-valeur"], [1, "ca-stats"], [1, "ca-stat"], [1, "ca-nb"], [1, "ca-desc"], [1, "dot"], [1, "stat-val"], [1, "barre-bg"], [1, "barre-fill"], [1, "abo-badge"], [1, "barre-fill", "couleur-primary"], ["diameter", "40"], ["mat-table", "", 1, "table-admin", 3, "dataSource"], ["matColumnDef", "nom"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "telephone"], ["matColumnDef", "abonnement"], ["matColumnDef", "stock"], ["matColumnDef", "actif"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], [1, "sous-ligne"], [1, "select-abo", 3, "ngModelChange", "ngModel"], ["value", "GRATUIT"], ["value", "TEST"], ["value", "MENSUEL"], ["value", "TRIMESTRIEL"], ["value", "SEMESTRIEL"], ["value", "ANNUEL"], [1, "badge-stock"], ["mat-stroked-button", "", 3, "click"], ["mat-header-row", ""], ["mat-row", ""], ["matColumnDef", "revendeur"], ["matColumnDef", "produit"], ["matColumnDef", "prix"], ["matColumnDef", "maj"], ["matColumnDef", "roles"], ["matColumnDef", "inscription"], ["matTooltip", "Compte Google", 1, "icone-google"], ["matTooltip", "V\xE9rifi\xE9", 1, "icone-verifie"], [1, "badge-role", 3, "class"], [1, "badge-role"], ["mat-icon-button", "", 3, "click", "matTooltip"], ["matColumnDef", "date"], ["matColumnDef", "client"], ["matColumnDef", "total"], ["matColumnDef", "paiement"], ["matColumnDef", "statut"], [1, "badge-paiement"], [1, "select-statut", 3, "ngModelChange", "ngModel"], ["value", "EN_ATTENTE"], ["value", "CONFIRMEE"], ["value", "EN_LIVRAISON"], ["value", "LIVREE"], ["value", "ANNULEE"], ["matColumnDef", "reference"], ["matColumnDef", "type"], ["matColumnDef", "montant"], [1, "badge-type"], [1, "badge-fedapay"], [1, "form-plan-carte"], [1, "form-plan", 3, "ngSubmit", "formGroup"], [1, "form-plan-grille"], ["appearance", "outline"], ["formControlName", "type"], ["value", "REVENDEUR"], ["value", "CLIENT_CONSULT"], ["value", "CLIENT_LIVRAISON"], ["matInput", "", "formControlName", "nom", "placeholder", "Ex: Standard"], ["matInput", "", "formControlName", "code", "placeholder", "Ex: STANDARD"], ["matInput", "", "type", "number", "formControlName", "prix"], ["matInput", "", "type", "number", "formControlName", "dureeJours"], ["matInput", "", "type", "number", "formControlName", "quota"], ["matInput", "", "type", "number", "formControlName", "ordre"], ["appearance", "outline", 1, "champ-large"], ["matInput", "", "formControlName", "description", "placeholder", "Description courte"], ["matInput", "", "formControlName", "featuresStr", "placeholder", "Ex: Visibilit\xE9, Catalogue illimit\xE9"], [1, "form-plan-actions"], ["mat-raised-button", "", "type", "submit", 1, "btn-plan-submit", 3, "disabled"], ["mat-stroked-button", "", "type", "button"], ["matColumnDef", "duree"], ["matColumnDef", "quota"], ["matColumnDef", "actions"], ["mat-row", "", 3, "row-inactif", 4, "matRowDef", "matRowDefColumns"], ["mat-stroked-button", "", "type", "button", 3, "click"], [1, "badge-plan-type"], ["mat-icon-button", "", "matTooltip", "Modifier", 3, "click"], ["matColumnDef", "abonne"], ["matColumnDef", "planCode"], ["matColumnDef", "createdAt"], ["matColumnDef", "dateDebut"], ["matColumnDef", "dateFin"], [1, "badge-sub-statut"], [1, "setup-totp"], [1, "aide"], ["mat-raised-button", "", 1, "btn-activer", 3, "click", "disabled"], ["diameter", "18"], [1, "etape"], [1, "numero-etape"], [1, "qr-bloc"], [3, "qrdata", "width", "errorCorrectionLevel", "colorDark", "colorLight"], [1, "qr-note"], [1, "secret-block"], [1, "secret-row"], ["mat-icon-button", "", "matTooltip", "Copier la cl\xE9", 3, "click"], ["appearance", "outline", 1, "champ-code"], ["matInput", "", "placeholder", "123456", "type", "text", "inputmode", "numeric", "maxlength", "6", "autocomplete", "one-time-code", 3, "ngModelChange", "ngModel"], ["matPrefix", ""], [1, "erreur-totp"], [1, "actions-setup"], ["matInput", "", "placeholder", "123456", "type", "text", "inputmode", "numeric", "maxlength", "6", 3, "ngModelChange", "ngModel"], ["mat-raised-button", "", 1, "btn-desactiver", 3, "click", "disabled"]], template: function AdminDashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div")(4, "h1");
        \u0275\u0275text(5, "Tableau de bord Admin");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p", 3);
        \u0275\u0275text(7, "Vue d'ensemble et gestion de la plateforme GazFacile");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "button", 4);
        \u0275\u0275listener("click", function AdminDashboardComponent_Template_button_click_8_listener() {
          return ctx.chargerTout();
        });
        \u0275\u0275elementStart(9, "mat-icon");
        \u0275\u0275text(10, "refresh");
        \u0275\u0275elementEnd();
        \u0275\u0275text(11, " Actualiser ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(12, "mat-tab-group", 5)(13, "mat-tab");
        \u0275\u0275template(14, AdminDashboardComponent_ng_template_14_Template, 3, 0, "ng-template", 6)(15, AdminDashboardComponent_Conditional_15_Template, 2, 0, "div", 7)(16, AdminDashboardComponent_Conditional_16_Template, 101, 16);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "mat-tab");
        \u0275\u0275template(18, AdminDashboardComponent_ng_template_18_Template, 3, 0, "ng-template", 6)(19, AdminDashboardComponent_Conditional_19_Template, 2, 0, "div", 7)(20, AdminDashboardComponent_Conditional_20_Template, 19, 3, "div", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "mat-tab");
        \u0275\u0275template(22, AdminDashboardComponent_ng_template_22_Template, 3, 0, "ng-template", 6)(23, AdminDashboardComponent_Conditional_23_Template, 2, 0, "div", 7)(24, AdminDashboardComponent_Conditional_24_Template, 19, 3, "div", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "mat-tab");
        \u0275\u0275template(26, AdminDashboardComponent_ng_template_26_Template, 3, 0, "ng-template", 6)(27, AdminDashboardComponent_Conditional_27_Template, 2, 0, "div", 7)(28, AdminDashboardComponent_Conditional_28_Template, 19, 3, "div", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "mat-tab");
        \u0275\u0275template(30, AdminDashboardComponent_ng_template_30_Template, 3, 0, "ng-template", 6)(31, AdminDashboardComponent_Conditional_31_Template, 2, 0, "div", 7)(32, AdminDashboardComponent_Conditional_32_Template, 22, 3, "div", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "mat-tab");
        \u0275\u0275template(34, AdminDashboardComponent_ng_template_34_Template, 3, 0, "ng-template", 6)(35, AdminDashboardComponent_Conditional_35_Template, 2, 0, "div", 7)(36, AdminDashboardComponent_Conditional_36_Template, 22, 3, "div", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "mat-tab");
        \u0275\u0275template(38, AdminDashboardComponent_ng_template_38_Template, 3, 0, "ng-template", 6)(39, AdminDashboardComponent_Conditional_39_Template, 2, 0, "div", 7)(40, AdminDashboardComponent_Conditional_40_Template, 82, 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "mat-tab");
        \u0275\u0275template(42, AdminDashboardComponent_ng_template_42_Template, 3, 0, "ng-template", 6)(43, AdminDashboardComponent_Conditional_43_Template, 2, 0, "div", 7)(44, AdminDashboardComponent_Conditional_44_Template, 25, 3, "div", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "mat-tab");
        \u0275\u0275template(46, AdminDashboardComponent_ng_template_46_Template, 3, 0, "ng-template", 6);
        \u0275\u0275elementStart(47, "div", 9)(48, "div", 10)(49, "div", 11)(50, "mat-icon");
        \u0275\u0275text(51);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(52, "div", 12)(53, "h3");
        \u0275\u0275text(54, "Authentification \xE0 deux facteurs (2FA)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(55, "p");
        \u0275\u0275text(56, "{{ totp2faActif() ? 'Le 2FA est actif. Votre compte est prot\xE9g\xE9 par Google Authenticator.' : 'Le 2FA n'est pas activ\xE9. Activez-le pour s\xE9curiser votre compte admin.' }} ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(57, "span", 13);
        \u0275\u0275text(58);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(59, AdminDashboardComponent_Conditional_59_Template, 7, 2, "div", 14)(60, AdminDashboardComponent_Conditional_60_Template, 18, 4, "div", 15);
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(15);
        \u0275\u0275conditional(ctx.chargementStats() ? 15 : ctx.stats() ? 16 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275conditional(ctx.chargementRevendeurs() ? 19 : 20);
        \u0275\u0275advance(4);
        \u0275\u0275conditional(ctx.chargementCatalogue() ? 23 : 24);
        \u0275\u0275advance(4);
        \u0275\u0275conditional(ctx.chargementUsers() ? 27 : 28);
        \u0275\u0275advance(4);
        \u0275\u0275conditional(ctx.chargementCommandes() ? 31 : 32);
        \u0275\u0275advance(4);
        \u0275\u0275conditional(ctx.chargementTransactions() ? 35 : 36);
        \u0275\u0275advance(4);
        \u0275\u0275conditional(ctx.chargementPlans() ? 39 : 40);
        \u0275\u0275advance(4);
        \u0275\u0275conditional(ctx.chargementSubscriptions() ? 43 : 44);
        \u0275\u0275advance(5);
        \u0275\u0275classProp("actif", ctx.totp2faActif());
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.totp2faActif() ? "verified_user" : "gpp_maybe");
        \u0275\u0275advance(6);
        \u0275\u0275classProp("badge-actif", ctx.totp2faActif());
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.totp2faActif() ? "Actif" : "Inactif", " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.totp2faActif() ? 59 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.totp2faActif() ? 60 : -1);
      }
    }, dependencies: [
      CommonModule,
      DecimalPipe,
      DatePipe,
      FormsModule,
      \u0275NgNoValidate,
      DefaultValueAccessor,
      NumberValueAccessor,
      NgControlStatus,
      NgControlStatusGroup,
      MaxLengthValidator,
      NgModel,
      ReactiveFormsModule,
      FormGroupDirective,
      FormControlName,
      MatCardModule,
      MatCard,
      MatCardContent,
      MatCardHeader,
      MatCardTitle,
      MatIconModule,
      MatIcon,
      MatProgressSpinnerModule,
      MatProgressSpinner,
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
      MatButton,
      MatIconButton,
      MatTabsModule,
      MatTabLabel,
      MatTab,
      MatTabGroup,
      MatChipsModule,
      MatSelectModule,
      MatFormField,
      MatLabel,
      MatPrefix,
      MatSelect,
      MatOption,
      MatTooltipModule,
      MatTooltip,
      MatSnackBarModule,
      MatFormFieldModule,
      MatInputModule,
      MatInput,
      QRCodeComponent
    ], styles: ['\n\n.dashboard-page[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 64px);\n  background: var(--color-bg);\n  padding: 28px 16px;\n}\n.container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.dashboard-entete[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 20px;\n  h1 {\n    font-family: "Montserrat", sans-serif;\n    font-size: 1.6rem;\n    color: var(--color-primary);\n    margin-bottom: 4px;\n  }\n  .sous-titre {\n    color: var(--color-text-muted);\n    font-size: 0.88rem;\n  }\n}\n.btn-refresh[_ngcontent-%COMP%] {\n  color: var(--color-text-muted) !important;\n}\n.chargement-centre[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 60px;\n}\n.tabs-admin[_ngcontent-%COMP%] {\n  ::ng-deep .mat-mdc-tab-header {\n    background: var(--color-surface);\n    border-bottom: 1px solid var(--color-border);\n  }\n  ::ng-deep .mat-mdc-tab-body-content {\n    padding: 24px 0;\n  }\n  ::ng-deep .mat-mdc-tab .mdc-tab__text-label {\n    display: flex;\n    align-items: center;\n    gap: 4px;\n  }\n}\n.kpi-grille[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));\n  gap: 14px;\n  margin-bottom: 20px;\n}\n.kpi-carte[_ngcontent-%COMP%] {\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  padding: 18px;\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  transition: transform 0.15s;\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);\n  }\n  mat-icon {\n    font-size: 1.8rem;\n    height: 1.8rem;\n    width: 1.8rem;\n    flex-shrink: 0;\n  }\n  &.couleur-primary mat-icon {\n    color: var(--color-primary);\n  }\n  &.couleur-success mat-icon {\n    color: var(--color-success, #2e7d32);\n  }\n  &.couleur-bleu mat-icon {\n    color: #3B82F6;\n  }\n  &.couleur-violet mat-icon {\n    color: #8B5CF6;\n  }\n  &.couleur-accent mat-icon {\n    color: var(--color-accent);\n  }\n  &.couleur-gris mat-icon {\n    color: var(--color-text-muted);\n  }\n}\n.kpi-valeur[_ngcontent-%COMP%] {\n  display: block;\n  font-family: "Montserrat", sans-serif;\n  font-size: 1.5rem;\n  color: var(--color-text);\n  line-height: 1.1;\n}\n.kpi-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.75rem;\n  color: var(--color-text-muted);\n  margin-top: 2px;\n}\n.section-grille[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 16px;\n}\n.section-carte[_ngcontent-%COMP%] {\n  background: var(--color-surface) !important;\n  border: 1px solid var(--color-border) !important;\n  border-radius: var(--radius-md) !important;\n  ::ng-deep mat-card-title {\n    display: flex;\n    align-items: center;\n    gap: 6px;\n    font-family: "Montserrat", sans-serif;\n    font-size: 0.88rem !important;\n    color: var(--color-text) !important;\n    font-weight: 400 !important;\n    mat-icon {\n      color: var(--color-primary);\n      font-size: 1rem;\n      height: 1rem;\n      width: 1rem;\n    }\n  }\n}\n.stat-ligne[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-size: 0.82rem;\n  color: var(--color-text-muted);\n  margin-bottom: 4px;\n  align-items: center;\n}\n.stat-val[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--color-text);\n}\n.dot[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  margin-right: 6px;\n  &.en_stock {\n    background: var(--color-success, #2e7d32);\n  }\n  &.stock_faible {\n    background: var(--color-warning, #f59e0b);\n  }\n  &.epuise {\n    background: var(--color-danger);\n  }\n}\n.barre-bg[_ngcontent-%COMP%] {\n  height: 5px;\n  background: var(--color-surface-2);\n  border-radius: 3px;\n  margin-bottom: 8px;\n  overflow: hidden;\n}\n.barre-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: 3px;\n  transition: width 0.4s ease;\n  &.en_stock {\n    background: var(--color-success, #2e7d32);\n  }\n  &.stock_faible {\n    background: var(--color-warning, #f59e0b);\n  }\n  &.epuise {\n    background: var(--color-danger);\n  }\n  &.couleur-primary {\n    background: var(--color-primary);\n  }\n}\n.abo-badge[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 700;\n  padding: 2px 8px;\n  border-radius: 12px;\n  &.abo-gratuit {\n    background: var(--color-surface-2);\n    color: var(--color-text-muted);\n  }\n  &.abo-test {\n    background: rgba(245, 158, 11, 0.15);\n    color: #92400e;\n  }\n  &.abo-mensuel {\n    background: rgba(59, 130, 246, 0.15);\n    color: #3B82F6;\n  }\n  &.abo-trimestriel {\n    background: rgba(16, 185, 129, 0.15);\n    color: #047857;\n  }\n  &.abo-semestriel {\n    background: rgba(139, 92, 246, 0.15);\n    color: #7c3aed;\n  }\n  &.abo-annuel {\n    background: color-mix(in srgb, var(--color-accent) 20%, transparent);\n    color: #8a6200;\n  }\n}\n.carte-ca[_ngcontent-%COMP%] {\n  background: color-mix(in srgb, var(--color-primary) 5%, var(--color-surface)) !important;\n  border-color: var(--color-primary) !important;\n  .ca-label {\n    font-size: 0.82rem;\n    color: var(--color-text-muted);\n    margin-bottom: 4px;\n  }\n  .ca-valeur {\n    font-family: "Montserrat", sans-serif;\n    font-size: 1.8rem;\n    color: var(--color-primary);\n    margin-bottom: 12px;\n  }\n  .ca-stats {\n    display: flex;\n    gap: 20px;\n  }\n  .ca-stat {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n  }\n  .ca-nb {\n    font-family: "Montserrat", sans-serif;\n    font-size: 1.2rem;\n    color: var(--color-text);\n  }\n  .ca-desc {\n    font-size: 0.72rem;\n    color: var(--color-text-muted);\n  }\n}\n.table-wrapper[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.table-admin[_ngcontent-%COMP%] {\n  width: 100%;\n  background: var(--color-surface) !important;\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  ::ng-deep th {\n    background: var(--color-surface-2) !important;\n    font-weight: 700;\n    font-size: 0.8rem;\n    color: var(--color-text-muted);\n  }\n  ::ng-deep td,\n  ::ng-deep th {\n    padding: 10px 16px !important;\n  }\n  ::ng-deep tr:hover td {\n    background: var(--color-surface-2);\n  }\n}\n.sous-ligne[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.75rem;\n  color: var(--color-text-muted);\n}\n.select-abo[_ngcontent-%COMP%], \n.select-statut[_ngcontent-%COMP%] {\n  font-size: 0.82rem !important;\n  ::ng-deep .mat-mdc-select-trigger {\n    min-height: 28px;\n  }\n}\n.badge-stock[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 700;\n  padding: 2px 8px;\n  border-radius: 12px;\n  &.stock-en_stock {\n    background: rgba(46, 125, 50, 0.12);\n    color: #2e7d32;\n  }\n  &.stock-stock_faible {\n    background: rgba(245, 158, 11, 0.15);\n    color: #92400e;\n  }\n  &.stock-epuise {\n    background: color-mix(in srgb, var(--color-danger) 12%, transparent);\n    color: var(--color-danger);\n  }\n}\n.badge-role[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n  font-weight: 700;\n  padding: 2px 7px;\n  border-radius: 10px;\n  margin-right: 4px;\n  &.role-client {\n    background: rgba(59, 130, 246, 0.12);\n    color: #3B82F6;\n  }\n  &.role-revendeur {\n    background: color-mix(in srgb, var(--color-primary) 12%, transparent);\n    color: var(--color-primary);\n  }\n  &.role-admin {\n    background: color-mix(in srgb, var(--color-danger) 12%, transparent);\n    color: var(--color-danger);\n  }\n}\n.badge-paiement[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 700;\n  padding: 2px 7px;\n  border-radius: 10px;\n  &.pay-paye {\n    background: rgba(46, 125, 50, 0.12);\n    color: #2e7d32;\n  }\n  &.pay-en_attente {\n    background: rgba(245, 158, 11, 0.12);\n    color: #92400e;\n  }\n  &.pay-echoue {\n    background: color-mix(in srgb, var(--color-danger) 12%, transparent);\n    color: var(--color-danger);\n  }\n  &.pay-rembourse {\n    background: rgba(139, 92, 246, 0.12);\n    color: #7c3aed;\n  }\n}\n.badge-type[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 700;\n  padding: 2px 7px;\n  border-radius: 10px;\n  &.type-commande {\n    background: rgba(59, 130, 246, 0.12);\n    color: #3B82F6;\n  }\n  &.type-abonnement {\n    background: color-mix(in srgb, var(--color-accent) 15%, transparent);\n    color: #8a6200;\n  }\n}\n.badge-fedapay[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 700;\n  padding: 2px 7px;\n  border-radius: 10px;\n  &.feda-approved {\n    background: rgba(46, 125, 50, 0.12);\n    color: #2e7d32;\n  }\n  &.feda-pending {\n    background: rgba(245, 158, 11, 0.12);\n    color: #92400e;\n  }\n  &.feda-declined {\n    background: color-mix(in srgb, var(--color-danger) 12%, transparent);\n    color: var(--color-danger);\n  }\n  &.feda-cancelled {\n    background: var(--color-surface-2);\n    color: var(--color-text-muted);\n  }\n  &.feda-refunded {\n    background: rgba(139, 92, 246, 0.12);\n    color: #7c3aed;\n  }\n  &.feda-transferred {\n    background: rgba(46, 125, 50, 0.12);\n    color: #2e7d32;\n  }\n}\n.icone-google[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  height: 0.9rem;\n  width: 0.9rem;\n  color: #4285F4;\n  margin-left: 4px;\n  vertical-align: middle;\n}\n.icone-verifie[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  height: 0.9rem;\n  width: 0.9rem;\n  color: var(--color-success, #2e7d32);\n  margin-left: 4px;\n  vertical-align: middle;\n}\n.btn-actif[_ngcontent-%COMP%] {\n  color: var(--color-success, #2e7d32) !important;\n  border-color: var(--color-success, #2e7d32) !important;\n  font-size: 0.78rem !important;\n}\n.btn-inactif[_ngcontent-%COMP%] {\n  color: var(--color-danger) !important;\n  border-color: var(--color-danger) !important;\n  font-size: 0.78rem !important;\n}\ncode[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  background: var(--color-surface-2);\n  padding: 2px 5px;\n  border-radius: 3px;\n}\n.form-plan-carte[_ngcontent-%COMP%] {\n  background: var(--color-surface) !important;\n  border: 1px solid var(--color-border) !important;\n  border-radius: var(--radius-md) !important;\n  margin-bottom: 20px;\n  ::ng-deep mat-card-title {\n    display: flex;\n    align-items: center;\n    gap: 6px;\n    font-family: "Montserrat", sans-serif;\n    font-size: 0.92rem !important;\n    color: var(--color-primary) !important;\n    font-weight: 600 !important;\n    mat-icon {\n      font-size: 1.1rem;\n      height: 1.1rem;\n      width: 1.1rem;\n    }\n  }\n}\n.form-plan-grille[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 8px 16px;\n  .champ-large {\n    grid-column: span 2;\n  }\n}\n.form-plan-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-top: 8px;\n}\n.btn-plan-submit[_ngcontent-%COMP%] {\n  background-color: var(--color-primary) !important;\n  color: white !important;\n}\n.badge-plan-type[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 700;\n  padding: 2px 8px;\n  border-radius: 12px;\n  &.plan-revendeur {\n    background: color-mix(in srgb, var(--color-primary) 12%, transparent);\n    color: var(--color-primary);\n  }\n  &.plan-client_consult {\n    background: rgba(59, 130, 246, 0.12);\n    color: #3B82F6;\n  }\n  &.plan-client_livraison {\n    background: rgba(139, 92, 246, 0.12);\n    color: #7c3aed;\n  }\n}\n.row-inactif[_ngcontent-%COMP%] {\n  opacity: 0.5;\n}\n.badge-sub-statut[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 700;\n  padding: 2px 8px;\n  border-radius: 12px;\n  &.sub-active {\n    background: rgba(46, 125, 50, 0.12);\n    color: #2e7d32;\n  }\n  &.sub-pending {\n    background: rgba(245, 158, 11, 0.12);\n    color: #92400e;\n  }\n  &.sub-expired {\n    background: var(--color-surface-2);\n    color: var(--color-text-muted);\n  }\n}\n@media (max-width: 600px) {\n  .kpi-grille[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .form-plan-grille[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    .champ-large {\n      grid-column: span 1;\n    }\n  }\n}\n.section-securite[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  max-width: 700px;\n}\n.carte-statut-2fa[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 20px 24px;\n  background: #fff8e1;\n  border-radius: 12px;\n  border: 2px solid #f9a825;\n  &.actif {\n    background: #e8f5e9;\n    border-color: #43a047;\n  }\n  .statut-icone mat-icon {\n    font-size: 36px;\n    width: 36px;\n    height: 36px;\n    color: #f9a825;\n  }\n  &.actif .statut-icone mat-icon {\n    color: #43a047;\n  }\n  .statut-texte {\n    flex: 1;\n    h3 {\n      margin: 0 0 4px;\n      font-size: 1rem;\n      font-weight: 700;\n      color: #1a1a2e;\n    }\n    p {\n      margin: 0;\n      font-size: 0.85rem;\n      color: #555;\n    }\n  }\n  .badge-statut {\n    padding: 4px 12px;\n    border-radius: 20px;\n    font-size: 0.78rem;\n    font-weight: 700;\n    background: #f9a825;\n    color: white;\n    &.badge-actif {\n      background: #43a047;\n    }\n  }\n}\n.carte-action[_ngcontent-%COMP%] {\n  padding: 24px;\n  background: var(--color-surface);\n  border-radius: 12px;\n  border: 1px solid var(--color-border);\n  h4 {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    margin: 0 0 12px;\n    font-size: 1rem;\n    color: var(--color-primary);\n    mat-icon {\n      font-size: 20px;\n      width: 20px;\n      height: 20px;\n    }\n  }\n  .aide {\n    margin: 0 0 16px;\n    font-size: 0.88rem;\n    color: var(--color-text-muted);\n  }\n  &.carte-danger {\n    border-color: #ef9a9a;\n    h4 {\n      color: #c62828;\n    }\n  }\n}\n.setup-totp[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  .etape {\n    display: flex;\n    gap: 12px;\n    align-items: flex-start;\n    font-size: 0.9rem;\n    color: var(--color-text);\n    .numero-etape {\n      flex-shrink: 0;\n      width: 26px;\n      height: 26px;\n      background: var(--color-primary);\n      color: white;\n      border-radius: 50%;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-weight: 700;\n      font-size: 0.82rem;\n    }\n  }\n}\n.qr-bloc[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  padding: 20px;\n  background: #fafafa;\n  border: 2px dashed var(--color-border);\n  border-radius: 12px;\n  qrcode {\n    display: block;\n  }\n  .qr-note {\n    margin: 0;\n    font-size: 0.78rem;\n    color: var(--color-text-muted);\n  }\n}\n.secret-block[_ngcontent-%COMP%] {\n  padding: 16px;\n  background: #f5f5f5;\n  border-radius: 8px;\n  width: 100%;\n  label {\n    font-size: 0.78rem;\n    color: #666;\n    display: block;\n    margin-bottom: 8px;\n  }\n  .secret-row {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    code {\n      flex: 1;\n      font-family: "Courier New", monospace;\n      font-size: 1.1rem;\n      font-weight: 700;\n      color: #1a1a2e;\n      letter-spacing: 0.15em;\n      word-break: break-all;\n    }\n  }\n}\n.champ-code[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 220px;\n}\n.erreur-totp[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 14px;\n  background: #fff0f0;\n  border-left: 3px solid #d32f2f;\n  color: #d32f2f;\n  font-size: 0.85rem;\n  border-radius: 4px;\n  mat-icon {\n    font-size: 16px;\n    width: 16px;\n    height: 16px;\n  }\n}\n.actions-setup[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.btn-activer[_ngcontent-%COMP%] {\n  background: var(--color-primary) !important;\n  color: white !important;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n}\n.btn-desactiver[_ngcontent-%COMP%] {\n  background: #c62828 !important;\n  color: white !important;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n}\n/*# sourceMappingURL=admin-dashboard.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminDashboardComponent, { className: "AdminDashboardComponent", filePath: "src/app/features/admin/admin-dashboard/admin-dashboard.component.ts", lineNumber: 1280 });
})();
export {
  AdminDashboardComponent
};
//# sourceMappingURL=chunk-J7EZ5Q6X.js.map
