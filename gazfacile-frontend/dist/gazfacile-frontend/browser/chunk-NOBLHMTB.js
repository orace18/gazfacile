// src/app/core/models/revendeur.model.ts
var Abonnement;
(function(Abonnement2) {
  Abonnement2["GRATUIT"] = "GRATUIT";
  Abonnement2["TEST"] = "TEST";
  Abonnement2["MENSUEL"] = "MENSUEL";
  Abonnement2["TRIMESTRIEL"] = "TRIMESTRIEL";
  Abonnement2["SEMESTRIEL"] = "SEMESTRIEL";
  Abonnement2["ANNUEL"] = "ANNUEL";
})(Abonnement || (Abonnement = {}));
var Role;
(function(Role2) {
  Role2["CLIENT"] = "CLIENT";
  Role2["REVENDEUR"] = "REVENDEUR";
  Role2["ADMIN"] = "ADMIN";
})(Role || (Role = {}));
var ClientNeed;
(function(ClientNeed2) {
  ClientNeed2["CONSULT"] = "CONSULT";
  ClientNeed2["LIVRAISON"] = "LIVRAISON";
})(ClientNeed || (ClientNeed = {}));
var PlanType;
(function(PlanType2) {
  PlanType2["REVENDEUR"] = "REVENDEUR";
  PlanType2["CLIENT_CONSULT"] = "CLIENT_CONSULT";
  PlanType2["CLIENT_LIVRAISON"] = "CLIENT_LIVRAISON";
})(PlanType || (PlanType = {}));
var TypeTransaction;
(function(TypeTransaction2) {
  TypeTransaction2["COMMANDE"] = "COMMANDE";
  TypeTransaction2["ABONNEMENT"] = "ABONNEMENT";
})(TypeTransaction || (TypeTransaction = {}));
var StatutFedaPay;
(function(StatutFedaPay2) {
  StatutFedaPay2["PENDING"] = "PENDING";
  StatutFedaPay2["APPROVED"] = "APPROVED";
  StatutFedaPay2["DECLINED"] = "DECLINED";
  StatutFedaPay2["CANCELLED"] = "CANCELLED";
  StatutFedaPay2["REFUNDED"] = "REFUNDED";
  StatutFedaPay2["TRANSFERRED"] = "TRANSFERRED";
})(StatutFedaPay || (StatutFedaPay = {}));
var MarqueGaz;
(function(MarqueGaz2) {
  MarqueGaz2["BENIN_PETRO"] = "BENIN_PETRO";
  MarqueGaz2["ORYX"] = "ORYX";
  MarqueGaz2["PROGAZ"] = "PROGAZ";
  MarqueGaz2["JNP"] = "JNP";
  MarqueGaz2["AUTRE"] = "AUTRE";
})(MarqueGaz || (MarqueGaz = {}));
var FormatBouteille;
(function(FormatBouteille2) {
  FormatBouteille2["KG_3"] = "KG_3";
  FormatBouteille2["KG_6"] = "KG_6";
  FormatBouteille2["KG_12"] = "KG_12";
  FormatBouteille2["KG_25"] = "KG_25";
  FormatBouteille2["KG_38"] = "KG_38";
})(FormatBouteille || (FormatBouteille = {}));
var MARQUES_LABELS = {
  [MarqueGaz.BENIN_PETRO]: "B\xE9nin Petro",
  [MarqueGaz.ORYX]: "Oryx",
  [MarqueGaz.PROGAZ]: "ProGaz",
  [MarqueGaz.JNP]: "JNP",
  [MarqueGaz.AUTRE]: "Autre"
};
var FORMATS_LABELS = {
  [FormatBouteille.KG_3]: "3 kg",
  [FormatBouteille.KG_6]: "6 kg",
  [FormatBouteille.KG_12]: "12 kg",
  [FormatBouteille.KG_25]: "25 kg",
  [FormatBouteille.KG_38]: "38 kg"
};
var StockStatus;
(function(StockStatus2) {
  StockStatus2["EN_STOCK"] = "EN_STOCK";
  StockStatus2["STOCK_FAIBLE"] = "STOCK_FAIBLE";
  StockStatus2["EPUISE"] = "EPUISE";
})(StockStatus || (StockStatus = {}));
var ModePaiement;
(function(ModePaiement2) {
  ModePaiement2["MOMO_MTN"] = "MOMO_MTN";
  ModePaiement2["MOMO_MOOV"] = "MOMO_MOOV";
  ModePaiement2["CELTIIS_CASH"] = "CELTIIS_CASH";
  ModePaiement2["ESPECES"] = "ESPECES";
})(ModePaiement || (ModePaiement = {}));
var StatutCommande;
(function(StatutCommande2) {
  StatutCommande2["EN_ATTENTE"] = "EN_ATTENTE";
  StatutCommande2["CONFIRMEE"] = "CONFIRMEE";
  StatutCommande2["EN_LIVRAISON"] = "EN_LIVRAISON";
  StatutCommande2["LIVREE"] = "LIVREE";
  StatutCommande2["ANNULEE"] = "ANNULEE";
})(StatutCommande || (StatutCommande = {}));
var StatutPaiement;
(function(StatutPaiement2) {
  StatutPaiement2["EN_ATTENTE"] = "EN_ATTENTE";
  StatutPaiement2["PAYE"] = "PAYE";
  StatutPaiement2["ECHOUE"] = "ECHOUE";
  StatutPaiement2["REMBOURSE"] = "REMBOURSE";
})(StatutPaiement || (StatutPaiement = {}));

export {
  Role,
  ClientNeed,
  TypeTransaction,
  StatutFedaPay,
  MarqueGaz,
  FormatBouteille,
  MARQUES_LABELS,
  FORMATS_LABELS,
  StockStatus,
  ModePaiement
};
//# sourceMappingURL=chunk-NOBLHMTB.js.map
