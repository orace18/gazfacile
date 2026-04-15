import {
  Component,
  AfterViewInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  effect,
  Signal,
  NgZone,
  ViewChild
} from '@angular/core';
import { GoogleMap, MapMarker, MapInfoWindow } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { Revendeur, StockStatus } from '../../core/models/revendeur.model';

/**
 * Composant Google Maps affichant la carte interactive des revendeurs.
 * Les marqueurs sont colorés selon le niveau de stock et se mettent
 * à jour en temps réel grâce aux signaux Angular.
 */
@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, GoogleMap, MapMarker, MapInfoWindow],
  template: `
    <google-map
      class="carte"
      width="100%"
      height="100%"
      [center]="centre"
      [zoom]="zoom"
      [options]="optionsCarte"
    >
      @for (marqueur of marqueurs; track marqueur.revendeurId) {
        <map-marker
          [position]="marqueur.position"
          [options]="marqueur.options"
          (mapClick)="ouvrirInfo(marqueur)"
        ></map-marker>
      }

      @if (positionUtilisateur) {
        <map-marker
          [position]="positionUtilisateur"
          [options]="optionsMarqueurUtilisateur"
        ></map-marker>
      }

      <map-info-window [options]="infoWindowOptions">
        <div [innerHTML]="contenuInfo"></div>
      </map-info-window>
    </google-map>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
      width: 100%;
      min-height: 400px;
      border-radius: var(--radius-md);
      overflow: hidden;
    }
    google-map {
      display: block;
      height: 100%;
      border-radius: var(--radius-md);
      overflow: hidden;
    }
  `]
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) revendeursSignal!: Signal<Revendeur[]>;
  @Output() commanderClique = new EventEmitter<Revendeur>();

  readonly centre: google.maps.LatLngLiteral = { lat: 6.3703, lng: 2.3912 };
  readonly zoom = 13;

  readonly optionsCarte: google.maps.MapOptions = {
    mapId: 'gazfacile-map',
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    styles: [
      { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
      { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] },
      { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212a37' }] },
      { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca5b3' }] },
      { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#746855' }] },
      { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#f3d19c' }] },
      { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] },
      { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#515c6d' }] },
      { featureType: 'poi', stylers: [{ visibility: 'off' }] },
      { featureType: 'transit', stylers: [{ visibility: 'off' }] },
    ]
  };

  get optionsMarqueurUtilisateur(): google.maps.MarkerOptions {
    return {
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 9,
        fillColor: '#3B82F6',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 3,
      },
      title: 'Votre position',
      zIndex: 999
    };
  }

  @ViewChild(GoogleMap) private googleMapRef!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  marqueurs: { revendeurId: string; position: google.maps.LatLngLiteral; options: google.maps.MarkerOptions; revendeur: Revendeur }[] = [];
  positionUtilisateur: google.maps.LatLngLiteral | null = null;
  contenuInfo = '';
  infoWindowOptions: google.maps.InfoWindowOptions = {};

  private revendeursSnapshot: Revendeur[] = [];

  constructor(private ngZone: NgZone) {
    effect(() => {
      const revendeurs = this.revendeursSignal();
      this.revendeursSnapshot = revendeurs;
      this.mettreAJourMarqueurs(revendeurs);
    });
  }

  ngAfterViewInit(): void {}

  private mettreAJourMarqueurs(revendeurs: Revendeur[]): void {
    this.marqueurs = revendeurs
      .filter(r => r.location && r.location.length >= 2)
      .map(r => {
        const [lng, lat] = r.location!;
        return {
          revendeurId: r.id,
          position: { lat, lng },
          options: this.creerOptionsMarqueur(r.stockStatus),
          revendeur: r
        };
      });
  }

  private creerOptionsMarqueur(stockStatus: StockStatus): google.maps.MarkerOptions {
    const couleurs: Record<StockStatus, string> = {
      [StockStatus.EN_STOCK]: '#22C55E',
      [StockStatus.STOCK_FAIBLE]: '#EAB308',
      [StockStatus.EPUISE]: '#EF4444'
    };
    const couleur = couleurs[stockStatus] ?? '#A8A29E';
    const svg = this.creerSvgBouteille(couleur);

    return {
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
        scaledSize: new google.maps.Size(32, 44),
        anchor: new google.maps.Point(16, 44),
      }
    };
  }

  private creerSvgBouteille(couleur: string): string {
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

  ouvrirInfo(marqueurData: typeof this.marqueurs[0]): void {
    this.contenuInfo = this.creerContenuPopup(marqueurData.revendeur);
    this.infoWindowOptions = { position: marqueurData.position };
    this.infoWindow.open();

    // Écouter le clic "Commander" après ouverture de l'info window
    setTimeout(() => {
      const btn = document.getElementById(`btn-commander-${marqueurData.revendeur.id}`);
      if (btn) {
        btn.addEventListener('click', () => {
          this.ngZone.run(() => this.commanderClique.emit(marqueurData.revendeur));
        });
      }
    }, 100);
  }

  private creerContenuPopup(revendeur: Revendeur): string {
    const libelleStock: Record<StockStatus, string> = {
      [StockStatus.EN_STOCK]: '<span style="color:#22C55E">● En stock</span>',
      [StockStatus.STOCK_FAIBLE]: '<span style="color:#EAB308">● Stock faible</span>',
      [StockStatus.EPUISE]: '<span style="color:#EF4444">● Épuisé</span>'
    };

    const marquesList = revendeur.marques?.length
      ? revendeur.marques.slice(0, 3).join(', ')
      : 'Non spécifié';

    const livraisonTexte = revendeur.livraison
      ? '<span style="color:#22C55E">✓ Livraison disponible</span>'
      : '<span style="color:#A8A29E">✗ Pas de livraison</span>';

    const btnDisabled = revendeur.stockStatus === StockStatus.EPUISE ? 'disabled' : '';

    return `
      <div style="font-family:'DM Sans',sans-serif;min-width:210px;padding:14px 16px;color:#F5F5F4;background:#292524;border-radius:10px;">
        <h4 style="font-family:'Syne',sans-serif;font-size:1rem;font-weight:700;margin:0 0 8px;color:#F5F5F4;">
          ${revendeur.nom}
        </h4>
        <p style="font-size:0.8rem;color:#A8A29E;margin:3px 0;">
          📍 ${revendeur.quartier}${revendeur.adresse ? ' — ' + revendeur.adresse : ''}
        </p>
        <p style="font-size:0.8rem;color:#A8A29E;margin:3px 0;">
          📞 ${revendeur.telephone}
        </p>
        <p style="font-size:0.8rem;color:#D4CFC9;margin:5px 0;">🛢️ ${marquesList}</p>
        <p style="font-size:0.8rem;margin:3px 0;">${libelleStock[revendeur.stockStatus]}</p>
        <p style="font-size:0.8rem;margin:3px 0;">${livraisonTexte}</p>
        <button
          id="btn-commander-${revendeur.id}"
          ${btnDisabled}
          style="
            margin-top:12px;width:100%;padding:9px;
            background:${revendeur.stockStatus === StockStatus.EPUISE ? '#3C3835' : '#F97316'};
            color:${revendeur.stockStatus === StockStatus.EPUISE ? '#57534E' : 'white'};
            border:none;border-radius:6px;
            font-family:'DM Sans',sans-serif;font-weight:600;font-size:0.85rem;
            cursor:${revendeur.stockStatus === StockStatus.EPUISE ? 'not-allowed' : 'pointer'};
            transition:background 0.2s;
          ">
          🛒 Commander
        </button>
      </div>
    `;
  }

  focusRevendeur(id: string): void {
    const marqueur = this.marqueurs.find(m => m.revendeurId === id);
    const map = this.googleMapRef?.googleMap;
    if (marqueur && map) {
      map.panTo(marqueur.position);
      map.setZoom(16);
    }
  }

  setUserLocation(lat: number, lng: number): void {
    this.positionUtilisateur = { lat, lng };
    const map = this.googleMapRef?.googleMap;
    if (map) {
      map.panTo({ lat, lng });
      map.setZoom(14);
    }
  }

  ngOnDestroy(): void {}
}
