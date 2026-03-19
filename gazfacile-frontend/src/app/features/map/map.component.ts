import {
  Component,
  AfterViewInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  effect,
  inject,
  Signal
} from '@angular/core';
import * as L from 'leaflet';
import { Revendeur, StockStatus } from '../../core/models/revendeur.model';

/**
 * Composant Leaflet affichant la carte interactive des revendeurs.
 * Les marqueurs sont colorés selon le niveau de stock et se mettent
 * à jour en temps réel grâce aux signaux Angular.
 */
@Component({
  selector: 'app-map',
  standalone: true,
  template: `<div id="carte-gazfacile" class="carte"></div>`,
  styles: [`
    .carte {
      height: 100%;
      width: 100%;
      min-height: 400px;
      border-radius: var(--radius-md);
      overflow: hidden;
    }
  `]
})
export class MapComponent implements AfterViewInit, OnDestroy {
  /** Signal réactif de la liste des revendeurs depuis le service. */
  @Input({ required: true }) revendeursSignal!: Signal<Revendeur[]>;

  /** Émis quand l'utilisateur clique sur "Commander" dans le popup. */
  @Output() commanderClique = new EventEmitter<Revendeur>();

  private carte!: L.Map;
  private readonly marqueurs = new Map<string, L.Marker>();
  private marqueurUtilisateur: L.Marker | null = null;
  private revendeursSnapshot: Revendeur[] = [];

  constructor() {
    // Réagir aux changements de la liste des revendeurs via effect()
    effect(() => {
      const revendeurs = this.revendeursSignal();
      this.revendeursSnapshot = revendeurs;
      if (this.carte) {
        this.mettreAJourMarqueurs(revendeurs);
      }
    });
  }

  ngAfterViewInit(): void {
    this.initialiserCarte();
    // Charger les marqueurs initiaux
    if (this.revendeursSnapshot.length > 0) {
      this.mettreAJourMarqueurs(this.revendeursSnapshot);
    }
  }

  /** Initialise la carte Leaflet centrée sur Cotonou. */
  private initialiserCarte(): void {
    this.carte = L.map('carte-gazfacile', {
      center: [6.3703, 2.3912], // Cotonou, Bénin
      zoom: 13,
      zoomControl: true
    });

    // Tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(this.carte);
  }

  /**
   * Met à jour les marqueurs sans recréer la carte.
   * Ajoute les nouveaux revendeurs, met à jour les existants,
   * supprime ceux qui ne sont plus dans la liste.
   */
  private mettreAJourMarqueurs(revendeurs: Revendeur[]): void {
    const idsActuels = new Set(revendeurs.map(r => r.id));

    // Supprimer les marqueurs des revendeurs supprimés
    this.marqueurs.forEach((marqueur, id) => {
      if (!idsActuels.has(id)) {
        marqueur.remove();
        this.marqueurs.delete(id);
      }
    });

    // Créer ou mettre à jour les marqueurs
    revendeurs.forEach(revendeur => {
      if (!revendeur.location || revendeur.location.length < 2) return;

      const [lng, lat] = revendeur.location;

      if (this.marqueurs.has(revendeur.id)) {
        // Mettre à jour l'icône si le stock a changé
        const marqueur = this.marqueurs.get(revendeur.id)!;
        marqueur.setIcon(this.creerIcone(revendeur.stockStatus));
        marqueur.setPopupContent(this.creerContenuPopup(revendeur));
      } else {
        // Créer un nouveau marqueur
        const marqueur = L.marker([lat, lng], {
          icon: this.creerIcone(revendeur.stockStatus)
        });

        const popupContent = this.creerContenuPopup(revendeur);
        marqueur.bindPopup(popupContent, { maxWidth: 260 });

        // Gérer le clic sur "Commander" dans le popup
        marqueur.on('popupopen', () => {
          const btn = document.getElementById(`btn-commander-${revendeur.id}`);
          if (btn) {
            btn.addEventListener('click', () => {
              this.commanderClique.emit(revendeur);
            });
          }
        });

        marqueur.addTo(this.carte);
        this.marqueurs.set(revendeur.id, marqueur);
      }
    });
  }

  /**
   * Crée une icône DivIcon colorée selon le statut de stock.
   * Vert = EN_STOCK | Orange = STOCK_FAIBLE | Rouge = EPUISE
   */
  private creerIcone(stockStatus: StockStatus): L.DivIcon {
    const couleurs: Record<StockStatus, string> = {
      [StockStatus.EN_STOCK]: '#22C55E',
      [StockStatus.STOCK_FAIBLE]: '#EAB308',
      [StockStatus.EPUISE]: '#EF4444'
    };

    const couleur = couleurs[stockStatus] ?? '#A8A29E';

    return L.divIcon({
      html: `
        <div style="
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: ${couleur};
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.5);
          cursor: pointer;
          transition: transform 0.2s;
        "></div>
      `,
      className: '',
      iconSize: [22, 22],
      iconAnchor: [11, 11],
      popupAnchor: [0, -14]
    });
  }

  /** Génère le contenu HTML d'un popup de revendeur. */
  private creerContenuPopup(revendeur: Revendeur): string {
    const libelleSock: Record<StockStatus, string> = {
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
      <div style="font-family: 'DM Sans', sans-serif; min-width: 200px;">
        <h4 style="
          font-family: 'Syne', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          margin-bottom: 4px;
          color: #F5F5F4;
        ">${revendeur.nom}</h4>
        <p style="font-size: 0.8rem; color: #A8A29E; margin: 2px 0;">
          📍 ${revendeur.quartier}${revendeur.adresse ? ' — ' + revendeur.adresse : ''}
        </p>
        <p style="font-size: 0.8rem; color: #A8A29E; margin: 2px 0;">
          📞 ${revendeur.telephone}
        </p>
        <p style="font-size: 0.8rem; margin: 4px 0;">
          🛢️ ${marquesList}
        </p>
        <p style="font-size: 0.8rem; margin: 2px 0;">
          ${libelleSock[revendeur.stockStatus]}
        </p>
        <p style="font-size: 0.8rem; margin: 2px 0;">
          ${livraisonTexte}
        </p>
        <button
          id="btn-commander-${revendeur.id}"
          ${btnDisabled}
          style="
            margin-top: 10px;
            width: 100%;
            padding: 8px;
            background: ${revendeur.stockStatus === StockStatus.EPUISE ? '#3C3835' : '#F97316'};
            color: ${revendeur.stockStatus === StockStatus.EPUISE ? '#A8A29E' : 'white'};
            border: none;
            border-radius: 6px;
            font-family: 'DM Sans', sans-serif;
            font-weight: 600;
            font-size: 0.85rem;
            cursor: ${revendeur.stockStatus === StockStatus.EPUISE ? 'not-allowed' : 'pointer'};
          "
        >
          🛒 Commander
        </button>
      </div>
    `;
  }

  /**
   * Centre la carte sur un revendeur spécifique et ouvre son popup.
   * Appelé depuis le composant parent quand on clique sur une carte.
   */
  focusRevendeur(id: string): void {
    const revendeur = this.revendeursSnapshot.find(r => r.id === id);
    if (!revendeur || !revendeur.location) return;

    const [lng, lat] = revendeur.location;
    this.carte.flyTo([lat, lng], 16, { duration: 0.8 });

    const marqueur = this.marqueurs.get(id);
    if (marqueur) {
      setTimeout(() => marqueur.openPopup(), 900);
    }
  }

  /**
   * Place un marqueur bleu sur la position de l'utilisateur.
   *
   * @param lat latitude
   * @param lng longitude
   */
  setUserLocation(lat: number, lng: number): void {
    if (this.marqueurUtilisateur) {
      this.marqueurUtilisateur.setLatLng([lat, lng]);
    } else {
      const iconeUtilisateur = L.divIcon({
        html: `
          <div style="
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: #3B82F6;
            border: 3px solid white;
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3), 0 2px 8px rgba(0,0,0,0.4);
          "></div>
        `,
        className: '',
        iconSize: [18, 18],
        iconAnchor: [9, 9]
      });

      this.marqueurUtilisateur = L.marker([lat, lng], { icon: iconeUtilisateur })
        .bindPopup('Votre position')
        .addTo(this.carte);
    }

    this.carte.flyTo([lat, lng], 14, { duration: 1 });
  }

  ngOnDestroy(): void {
    if (this.carte) {
      this.carte.remove();
    }
  }
}
