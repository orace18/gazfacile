export enum TypeNotification {
  NOUVELLE_COMMANDE    = 'NOUVELLE_COMMANDE',
  COMMANDE_CONFIRMEE   = 'COMMANDE_CONFIRMEE',
  COMMANDE_EN_LIVRAISON = 'COMMANDE_EN_LIVRAISON',
  COMMANDE_LIVREE      = 'COMMANDE_LIVREE',
  COMMANDE_ANNULEE     = 'COMMANDE_ANNULEE',
  STOCK_FAIBLE         = 'STOCK_FAIBLE',
  STOCK_EPUISE         = 'STOCK_EPUISE',
  NOUVEL_AVIS          = 'NOUVEL_AVIS',
  ABONNEMENT_EXPIRE    = 'ABONNEMENT_EXPIRE',
  INFO_SYSTEME         = 'INFO_SYSTEME'
}

export interface Notification {
  id: string;
  destinataireId: string;
  type: TypeNotification;
  titre: string;
  message: string;
  referenceId?: string;
  lue: boolean;
  createdAt: string;
}

export interface Avis {
  id: string;
  revendeurId: string;
  auteurNom: string;
  auteurTelephone: string;
  note: number;
  commentaire?: string;
  createdAt: string;
}

export interface AvisDTO {
  revendeurId: string;
  auteurNom: string;
  auteurTelephone?: string;
  note: number;
  commentaire?: string;
}

export interface DashboardStats {
  totalRevendeurs: number;
  revendeursActifs: number;
  revendeursInactifs: number;
  revendeurParAbonnement: Record<string, number>;
  revendeurParStock: Record<string, number>;
  totalCommandes: number;
  commandesParStatut: Record<string, number>;
  commandesParPaiement: Record<string, number>;
  chiffreAffaireTotal: number;
  chiffreAffaireMois: number;
  totalUtilisateurs: number;
  totalClients: number;
  totalRevendeursInscrits: number;
  totalAvis: number;
  noteMoyenneGlobale: number;
}
