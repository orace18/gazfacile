# ── Étape 1 : Build Angular ──────────────────────────────────────────────────
FROM node:20-alpine AS build
WORKDIR /app

# Copier package.json d'abord pour le cache des dépendances
COPY package*.json ./
RUN npm ci --silent

# Copier les sources et builder
COPY . .
RUN npm run build -- --configuration production

# ── Étape 2 : Serveur Nginx pour SPA ─────────────────────────────────────────
FROM nginx:1.27-alpine AS runtime

# Supprimer la config Nginx par défaut
RUN rm /etc/nginx/conf.d/default.conf

# Copier notre configuration Nginx optimisée pour Angular SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers buildés
COPY --from=build /app/dist/gazfacile-frontend/browser /usr/share/nginx/html

# Port exposé
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
