// Modèles de données de l'application GazFacile

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
