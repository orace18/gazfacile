// Modèles de données de l'application GazFacile

// ── Enums de base (déclarés en premier pour éviter les références en avant) ──

export enum Abonnement {
  GRATUIT = 'GRATUIT',
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM'
}

export enum Role {
  CLIENT = 'CLIENT',
  REVENDEUR = 'REVENDEUR',
  ADMIN = 'ADMIN'
}

// ── Paiement FedaPay ────────────────────────────────────────────────────────

export enum TypeTransaction {
  COMMANDE = 'COMMANDE',
  ABONNEMENT = 'ABONNEMENT'
}

export enum StatutFedaPay {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
  TRANSFERRED = 'TRANSFERRED'
}

export interface Transaction {
  id: string;
  fedaPayId: number;
  reference: string;
  montant: number;
  description: string;
  clientTelephone: string;
  clientEmail?: string;
  clientNom?: string;
  type: TypeTransaction;
  statut: StatutFedaPay;
  commandeId?: string;
  revendeurId?: string;
  checkoutUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaiementInitDTO {
  type: TypeTransaction;
  montant: number;
  description: string;
  clientTelephone: string;
  clientEmail?: string;
  clientNom?: string;
  commandeId?: string;
  revendeurId?: string;
}

export interface PaiementResponseDTO {
  transactionId: string;
  reference: string;
  montant: number;
  type: TypeTransaction;
  statut: StatutFedaPay;
  checkoutUrl: string;
}

// ── Freemium consultations ───────────────────────────────────────────────────

export interface ConsultationStatut {
  autorise: boolean;
  consultationsRestantes: number;
  limite: number;
}

// ── Abonnements ─────────────────────────────────────────────────────────────

export interface AbonnementStatut {
  plan: Abonnement;
  planLibelle: string;
  prixMensuel: number;
  description: string;
  actif: boolean;
  expire: boolean;
  expiry: string | null;
  maxProduits: number;
  prioriteClassement: boolean;
  badgePremium: boolean;
}

export const ABONNEMENT_PLANS: { plan: Abonnement; libelle: string; prix: number; description: string; features: string[] }[] = [
  {
    plan: Abonnement.GRATUIT,
    libelle: 'Gratuit',
    prix: 0,
    description: 'Pour démarrer',
    features: ['Profil basique', 'Max 3 produits au catalogue', 'Visibilité limitée']
  },
  {
    plan: Abonnement.STANDARD,
    libelle: 'Standard',
    prix: 2000,
    description: 'Pour les revendeurs actifs',
    features: ['Catalogue illimité', 'Badge vérifié', 'Visibilité normale dans les résultats']
  },
  {
    plan: Abonnement.PREMIUM,
    libelle: 'Premium',
    prix: 5000,
    description: 'Pour maximiser vos ventes',
    features: ['Tout le Standard', 'Priorité dans les résultats', 'Badge Premium', 'Analytics de vues']
  }
];

// ── Catalogue produits ──────────────────────────────────────────────────────

export enum MarqueGaz {
  BENIN_PETRO = 'BENIN_PETRO',
  ORYX = 'ORYX',
  PROGAZ = 'PROGAZ',
  JNP = 'JNP',
  AUTRE = 'AUTRE'
}

export enum FormatBouteille {
  KG_3 = 'KG_3',
  KG_6 = 'KG_6',
  KG_12 = 'KG_12',
  KG_25 = 'KG_25',
  KG_38 = 'KG_38'
}

export const MARQUES_LABELS: Record<MarqueGaz, string> = {
  [MarqueGaz.BENIN_PETRO]: 'Bénin Petro',
  [MarqueGaz.ORYX]: 'Oryx',
  [MarqueGaz.PROGAZ]: 'ProGaz',
  [MarqueGaz.JNP]: 'JNP',
  [MarqueGaz.AUTRE]: 'Autre'
};

export const FORMATS_LABELS: Record<FormatBouteille, string> = {
  [FormatBouteille.KG_3]: '3 kg',
  [FormatBouteille.KG_6]: '6 kg',
  [FormatBouteille.KG_12]: '12 kg',
  [FormatBouteille.KG_25]: '25 kg',
  [FormatBouteille.KG_38]: '38 kg'
};

/** Produit du catalogue d'un revendeur. */
export interface ProduitRevendeur {
  id: string;
  revendeurId: string;
  marque: MarqueGaz;
  marqueLibelle: string;
  format: FormatBouteille;
  formatLibelle: string;
  prixUnitaire: number;
  quantiteDisponible: number;
  disponible: boolean;
  updatedAt: string;
}

/** DTO pour créer/modifier un produit. */
export interface ProduitRevendeurDTO {
  marque: MarqueGaz;
  format: FormatBouteille;
  prixUnitaire: number;
  quantiteDisponible: number;
  disponible: boolean;
}

export enum StockStatus {
  EN_STOCK = 'EN_STOCK',
  STOCK_FAIBLE = 'STOCK_FAIBLE',
  EPUISE = 'EPUISE'
}

export enum ModePaiement {
  /** MTN Mobile Money */
  MOMO_MTN = 'MOMO_MTN',
  /** Moov Money (Flooz) — Moov Africa Bénin */
  MOMO_MOOV = 'MOMO_MOOV',
  /** Celtiis Cash — Celtiis Bénin */
  CELTIIS_CASH = 'CELTIIS_CASH',
  /** Paiement en espèces à la livraison */
  ESPECES = 'ESPECES'
}

export enum StatutCommande {
  EN_ATTENTE = 'EN_ATTENTE',
  CONFIRMEE = 'CONFIRMEE',
  EN_LIVRAISON = 'EN_LIVRAISON',
  LIVREE = 'LIVREE',
  ANNULEE = 'ANNULEE'
}

export enum StatutPaiement {
  EN_ATTENTE = 'EN_ATTENTE',
  PAYE = 'PAYE',
  ECHOUE = 'ECHOUE',
  REMBOURSE = 'REMBOURSE'
}

/** Revendeur de gaz domestique au Bénin. */
export interface Revendeur {
  id: string;
  nom: string;
  quartier: string;
  adresse: string;
  telephone: string;
  email?: string;
  /** Coordonnées [longitude, latitude] au format GeoJSON. */
  location: [number, number];
  marques: string[];
  stockStatus: StockStatus;
  livraison: boolean;
  actif: boolean;
  userId?: string;
  noteMoyenne: number;
  nombreAvis: number;
  abonnement: Abonnement;
  abonnementExpiry?: string;
  createdAt: string;
  updatedAt: string;
  /** Distance calculée côté client en mètres. */
  distance?: number;
}

/** Commande de gaz passée par un client. */
export interface Commande {
  id: string;
  revendeurId: string;
  revendeurNom: string;
  clientTelephone: string;
  clientAdresseLivraison: string;
  clientLocation?: [number, number];
  marque: string;
  taille: '6kg' | '12kg';
  quantite: number;
  prixUnitaire: number;
  total: number;
  modePaiement: ModePaiement;
  statutPaiement: StatutPaiement;
  statutCommande: StatutCommande;
  referenceTransaction?: string;
  createdAt: string;
  livraisonAt?: string;
}

/** DTO pour créer une commande. */
export interface CommandeDTO {
  revendeurId: string;
  clientTelephone: string;
  clientAdresseLivraison: string;
  clientLocation?: [number, number];
  marque: string;
  taille: '6kg' | '12kg';
  quantite: number;
  modePaiement: ModePaiement;
}

/** DTO pour inscrire un revendeur. */
export interface RevendeurDTO {
  nom: string;
  quartier: string;
  adresse: string;
  telephone: string;
  email?: string;
  location: [number, number];
  marques: string[];
  livraison: boolean;
}

/** DTO pour mettre à jour le stock. */
export interface StockUpdateDTO {
  stockStatus: StockStatus;
}

/** DTO pour la connexion. */
export interface LoginDTO {
  telephone: string;
  password: string;
}

/** DTO pour l'inscription. */
export interface RegisterDTO {
  telephone: string;
  email?: string;
  password: string;
  nom: string;
  role?: Role;
}

/** Réponse après authentification. */
export interface AuthResponse {
  token: string;
  refreshToken: string;
  telephone: string;
  nom: string;
  email?: string;
  roles: Role[];
}

/** Message WebSocket diffusé lors d'une mise à jour de stock. */
export interface StockBroadcast {
  id: string;
  stockStatus: StockStatus;
}
