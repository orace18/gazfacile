// Script d'initialisation MongoDB — exécuté au premier démarrage
db = db.getSiblingDB('gazfacile');

// Créer les index géospatiaux sur la collection revendeurs
db.revendeurs.createIndex({ location: "2dsphere" });

// Index pour les performances
db.revendeurs.createIndex({ actif: 1 });
db.revendeurs.createIndex({ stockStatus: 1 });
db.revendeurs.createIndex({ userId: 1 });
db.commandes.createIndex({ revendeurId: 1, createdAt: -1 });
db.commandes.createIndex({ clientTelephone: 1 });
db.users.createIndex({ telephone: 1 }, { unique: true });
db.avis.createIndex({ revendeurId: 1, createdAt: -1 });
db.avis.createIndex({ revendeurId: 1, auteurTelephone: 1 }, { unique: true });
db.notifications.createIndex({ destinataireId: 1, createdAt: -1 });
db.notifications.createIndex({ destinataireId: 1, lue: 1 });

print("GazFacile — Index MongoDB créés avec succès");
