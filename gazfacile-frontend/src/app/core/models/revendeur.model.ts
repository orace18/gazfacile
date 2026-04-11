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

export const REVENDEUR_PLANS: PlanInscription[] = [
  {
    id: 'STANDARD', nom: 'Standard', type: PlanType.REVENDEUR,
    prix: 1000, duree: '1 mois', quota: 0, quotaLabel: '',
    features: ['Visibilité complète', 'Profil vérifié', 'Catalogue illimité']
  },
  {
    id: 'GOLD', nom: 'Gold', type: PlanType.REVENDEUR,
    prix: 2500, duree: '3 mois', quota: 0, quotaLabel: '',
    features: ['Visibilité complète', 'Profil vérifié', 'Catalogue illimité', 'Économisez 17%']
  },
  {
    id: 'DIAMOND', nom: 'Diamond', type: PlanType.REVENDEUR,
    prix: 5000, duree: '6 mois', quota: 0, quotaLabel: '',
    features: ['Visibilité complète', 'Profil vérifié', 'Catalogue illimité', 'Économisez 17%'],
    recommande: true
  },
  {
    id: 'PRO', nom: 'Pro', type: PlanType.REVENDEUR,
    prix: 7500, duree: '9 mois', quota: 0, quotaLabel: '',
    features: ['Visibilité complète', 'Profil vérifié', 'Catalogue illimité', 'Économisez 17%']
  },
  {
    id: 'MAX', nom: 'Max', type: PlanType.REVENDEUR,
    prix: 10000, duree: '12 mois', quota: 0, quotaLabel: '',
    features: ['Visibilité complète', 'Profil vérifié', 'Catalogue illimité', 'Meilleur rapport qualité/prix']
  }
];

export const CLIENT_CONSULT_PLANS: PlanInscription[] = [
  {
    id: 'STD_CONSULT', nom: 'Standard', type: PlanType.CLIENT_CONSULT,
    prix: 100, duree: '1 mois', quota: 3, quotaLabel: '3 consultations/mois',
    features: ['Voir les revendeurs proches', 'Comparer les prix', '3 consultations par mois']
  },
  {
    id: 'GOLD_CONSULT', nom: 'Gold', type: PlanType.CLIENT_CONSULT,
    prix: 500, duree: '1 mois', quota: 10, quotaLabel: '10 consultations/mois',
    features: ['Voir les revendeurs proches', 'Comparer les prix', '10 consultations par mois'],
    recommande: true
  },
  {
    id: 'DIAMOND_CONSULT', nom: 'Diamond', type: PlanType.CLIENT_CONSULT,
    prix: 1000, duree: '1 mois', quota: 50, quotaLabel: '50 consultations/mois',
    features: ['Voir les revendeurs proches', 'Comparer les prix', '50 consultations par mois', 'Accès prioritaire']
  }
];

export const CLIENT_LIVRAISON_PLANS: PlanInscription[] = [
  {
    id: 'STD_LIVRAISON', nom: 'Standard', type: PlanType.CLIENT_LIVRAISON,
    prix: 2000, duree: '1 mois', quota: 2, quotaLabel: '2 livraisons/mois',
    features: ['Livraison dans un rayon de 5km', '2 livraisons par mois', 'Suivi de commande']
  },
  {
    id: 'GOLD_LIVRAISON', nom: 'Gold', type: PlanType.CLIENT_LIVRAISON,
    prix: 4500, duree: '1 mois', quota: 5, quotaLabel: '5 livraisons/mois',
    features: ['Livraison dans un rayon de 5km', '5 livraisons par mois', 'Suivi de commande'],
    recommande: true
  },
  {
    id: 'DIAMOND_LIVRAISON', nom: 'Diamond', type: PlanType.CLIENT_LIVRAISON,
    prix: 8000, duree: '1 mois', quota: 10, quotaLabel: '10 livraisons/mois',
    features: ['Livraison dans un rayon de 5km', '10 livraisons par mois', 'Suivi de commande', 'Priorité de livraison']
  }
];

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
  prix: number;
  description: string;
  actif: boolean;
  expire: boolean;
  expiry: string | null;
  maxProduits: number;
}

export const ABONNEMENT_PLANS: { plan: Abonnement; libelle: string; prix: number; duree: string; description: string; features: string[]; recommande?: boolean }[] = [
  {
    plan: Abonnement.GRATUIT,
    libelle: 'Gratuit',
    prix: 0,
    duree: '',
    description: 'Pour démarrer',
    features: ['Profil basique visible', 'Max 3 produits au catalogue', 'Visibilité limitée']
  },
  {
    plan: Abonnement.TEST,
    libelle: 'Test',
    prix: 100,
    duree: '1 jour',
    description: 'Pour tester le paiement',
    features: ['Catalogue illimité', 'Visibilité complète', '1 jour d\'accès']
  },
  {
    plan: Abonnement.MENSUEL,
    libelle: 'Mensuel',
    prix: 1000,
    duree: '1 mois',
    description: 'Sans engagement',
    features: ['Catalogue illimité', 'Visibilité complète', 'Profil vérifié']
  },
  {
    plan: Abonnement.TRIMESTRIEL,
    libelle: 'Trimestriel',
    prix: 2500,
    duree: '3 mois',
    description: 'Économisez 17%',
    features: ['Catalogue illimité', 'Visibilité complète', 'Profil vérifié', '3 mois d\'accès']
  },
  {
    plan: Abonnement.SEMESTRIEL,
    libelle: 'Semestriel',
    prix: 5000,
    duree: '6 mois',
    description: 'Économisez 17%',
    recommande: true,
    features: ['Catalogue illimité', 'Visibilité complète', 'Profil vérifié', '6 mois d\'accès']
  },
  {
    plan: Abonnement.ANNUEL,
    libelle: 'Annuel',
    prix: 10000,
    duree: '12 mois',
    description: 'Meilleur rapport qualité/prix',
    features: ['Catalogue illimité', 'Visibilité complète', 'Profil vérifié', '12 mois d\'accès']
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
  accountType?: string;
  clientNeed?: string;
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
