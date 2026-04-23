import {
  StockStatus
} from "./chunk-NOBLHMTB.js";
import {
  CommonModule,
  NgClass,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-XDS62WGT.js";

// src/app/shared/components/stock-badge/stock-badge.component.ts
var StockBadgeComponent = class _StockBadgeComponent {
  get classBadge() {
    const classes = {
      [StockStatus.EN_STOCK]: "en-stock",
      [StockStatus.STOCK_FAIBLE]: "stock-faible",
      [StockStatus.EPUISE]: "epuise"
    };
    return classes[this.stockStatus] ?? "";
  }
  get libelle() {
    const libelles = {
      [StockStatus.EN_STOCK]: "En stock",
      [StockStatus.STOCK_FAIBLE]: "Stock faible",
      [StockStatus.EPUISE]: "\xC9puis\xE9"
    };
    return libelles[this.stockStatus] ?? "";
  }
  static {
    this.\u0275fac = function StockBadgeComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _StockBadgeComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StockBadgeComponent, selectors: [["app-stock-badge"]], inputs: { stockStatus: "stockStatus" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 3, vars: 2, consts: [[1, "badge-stock", 3, "ngClass"], [1, "indicateur"]], template: function StockBadgeComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "span", 0);
        \u0275\u0275element(1, "span", 1);
        \u0275\u0275text(2);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275property("ngClass", ctx.classBadge);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1(" ", ctx.libelle, " ");
      }
    }, dependencies: [CommonModule, NgClass], styles: ["\n\n.badge-stock[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 3px 10px;\n  border-radius: 20px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n.indicateur[_ngcontent-%COMP%] {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: currentColor;\n  flex-shrink: 0;\n}\n.en-stock[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.12);\n  color: #22C55E;\n  border: 1px solid rgba(34, 197, 94, 0.25);\n}\n.stock-faible[_ngcontent-%COMP%] {\n  background: rgba(234, 179, 8, 0.12);\n  color: #EAB308;\n  border: 1px solid rgba(234, 179, 8, 0.25);\n}\n.epuise[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.12);\n  color: #EF4444;\n  border: 1px solid rgba(239, 68, 68, 0.25);\n}\n/*# sourceMappingURL=stock-badge.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StockBadgeComponent, { className: "StockBadgeComponent", filePath: "src/app/shared/components/stock-badge/stock-badge.component.ts", lineNumber: 59 });
})();

export {
  StockBadgeComponent
};
//# sourceMappingURL=chunk-HLPEEPAR.js.map
