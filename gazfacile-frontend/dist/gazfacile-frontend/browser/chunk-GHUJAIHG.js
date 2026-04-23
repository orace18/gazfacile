import {
  Observable,
  ɵɵdefineInjectable
} from "./chunk-XDS62WGT.js";

// src/app/core/services/geolocation.service.ts
var GeolocationService = class _GeolocationService {
  /**
   * Obtient la position géographique courante de l'utilisateur.
   * @returns Observable<GeolocationPosition> qui émet une fois puis se complète.
   */
  getCurrentPosition() {
    return new Observable((observer) => {
      if (!navigator.geolocation) {
        observer.error("La g\xE9olocalisation n'est pas support\xE9e par ce navigateur");
        return;
      }
      navigator.geolocation.getCurrentPosition((position) => {
        observer.next(position);
        observer.complete();
      }, (error) => {
        let message;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = "Acc\xE8s \xE0 la g\xE9olocalisation refus\xE9. Veuillez autoriser l'acc\xE8s dans les param\xE8tres de votre navigateur.";
            break;
          case error.POSITION_UNAVAILABLE:
            message = "Votre position g\xE9ographique est indisponible.";
            break;
          case error.TIMEOUT:
            message = "D\xE9lai de g\xE9olocalisation d\xE9pass\xE9. Veuillez r\xE9essayer.";
            break;
          default:
            message = "Impossible d'obtenir votre position g\xE9ographique.";
        }
        observer.error(message);
      }, {
        enableHighAccuracy: true,
        timeout: 15e3,
        maximumAge: 0
      });
    });
  }
  static {
    this.\u0275fac = function GeolocationService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _GeolocationService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _GeolocationService, factory: _GeolocationService.\u0275fac, providedIn: "root" });
  }
};

export {
  GeolocationService
};
//# sourceMappingURL=chunk-GHUJAIHG.js.map
