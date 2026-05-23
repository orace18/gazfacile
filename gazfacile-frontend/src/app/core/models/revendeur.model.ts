// Modèles de données de l'application GazFacile

// ── Enums de base (déclarés en premier pour éviter les références en avant) ──

export enum Abonnement {
  GRATUIT = 'GRATUIT',
  TEST = 'TEST',
  MENSUEL = 'MENSUEL',
  TRIMESTRIEL = 'TRIMESTRIEL',
  SEMESTRIEL = 'SEMESTRIEL',
  ANNUEL = 'ANNUEL'
}

export enum Role {
  CLIENT = 'CLIENT',
  REVENDEUR = 'REVENDEUR',
  ADMIN = 'ADMIN'
}

export enum ClientNeed {
  CONSULT = 'CONSULT',
  LIVRAISON = 'LIVRAISON'
}

export enum PlanType {
  REVENDEUR = 'REVENDEUR',
  CLIENT_CONSULT = 'CLIENT_CONSULT',
  CLIENT_LIVRAISON = 'CLIENT_LIVRAISON'
}

export interface PlanInscription {
  id: string;
  nom: string;
  type: PlanType;
  prix: number;
  duree: string;
  quota: number;
  quotaLabel: string;
  features: string[];
  recommande?: boolean;
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

export interface PaiementStatutDTO {
  reference: string;
  montant: number;
  type: TypeTransaction;
  statut: StatutFedaPay;
}

// ── Freemium consultations ───────────────────────────────────────────────────

export interface ConsultationStatut {
  autorise: boolean;
  consultationsRestantes: number;
  limite: number;
  dateExpiration?: string;
}

// ── Abonnements ─────────────────────────────────────────────────────────────

export interface AbonnementStatut {
  plan: Abonnement;
  planLibelle: string;
  prix: number;
  description: string;
  actif: boolean;
  expire: boolean;
  expiry: string | null;
  maxProduits: number;
}


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
  taille: string;
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
  taille: string;
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

/** DTO pour l'inscription simplifiée (fallback). */
export interface RegisterDTO {
  telephone: string;
  nom: string;
  role?: Role;
}

/** DTO pour démarrer l'inscription WebAuthn. */
export interface WebAuthnRegisterStartDTO {
  telephone: string;
  nom: string;
  role?: Role;
}

/** DTO pour finaliser l'inscription WebAuthn. */
export interface WebAuthnRegisterFinishDTO {
  telephone: string;
  credential: any; // RegistrationResponseJSON de @simplewebauthn/browser
}

/** DTO pour démarrer la connexion WebAuthn. */
export interface WebAuthnLoginStartDTO {
  telephone: string;
}

/** DTO pour finaliser la connexion WebAuthn. */
export interface WebAuthnLoginFinishDTO {
  telephone: string;
  assertion: any; // AuthenticationResponseJSON de @simplewebauthn/browser
}

/** DTO pour la connexion par PIN. */
export interface PinLoginDTO {
  telephone: string;
  pin: string;
}

/** DTO pour configurer un PIN (utilisateur authentifié). */
export interface PinSetupDTO {
  pin: string;
}

/** DTO plan d'abonnement (depuis le backend). */
export interface SubscriptionPlanDTO {
  id: string;
  type: string;
  nom: string;
  code: string;
  prix: number;
  dureeJours: number;
  quota: number;
  description: string;
  features: string[];
  recommande: boolean;
}

/** DTO subscription active (depuis le backend). */
export interface SubscriptionDTO {
  id: string;
  planCode: string;
  planType: string;
  dateDebut: string;
  dateFin: string;
  quotaRestant: number;
  statut: string;
}

/** Réponse après authentification. Le refresh token est dans un cookie HttpOnly. */
export interface AuthResponse {
  token: string;
  telephone: string;
  nom: string;
  email?: string;
  roles: Role[];
  /** Vrai si un code TOTP est requis avant d'obtenir le JWT complet. */
  pending2fa?: boolean;
}

/** Message WebSocket diffusé lors d'une mise à jour de stock. */
export interface StockBroadcast {
  id: string;
  stockStatus: StockStatus;
}
