# Application Frontend Wacdo

Interface de gestion pour le réseau de restaurants Wacdo permettant l'administration des utilisateurs, restaurants, affectations et postes de travail.

## 🚀 Démarrage rapide

```bash
# Installation des dépendances
npm install

# Lancement en mode développement
npm run dev

# Construction pour la production
npm run build
```

## 📋 Fonctionnalités

- **Authentification** : Système de connexion sécurisé
- **Tableau de bord** : Vue d'ensemble avec statistiques et activités
- **Gestion des restaurants** : CRUD complet des établissements
- **Gestion des utilisateurs** : Administration du personnel
- **Gestion des affectations** : Attribution du personnel aux postes
- **Gestion des postes** : Administration des rôles et responsabilités

## 🛠️ Technologies

- React 19.1.0 avec hooks modernes
- React Router DOM pour la navigation
- Vite pour le bundling et le développement
- FontAwesome pour les icônes
- ESLint et Prettier pour la qualité du code

## 📖 Documentation complète

Pour une documentation détaillée, consultez le fichier [DOCUMENTATION_FR.md](./DOCUMENTATION_FR.md) qui contient :
- Guide d'installation et configuration
- Architecture de l'application
- Description détaillée des composants
- Bonnes pratiques et conventions

## 🏗️ Architecture

```
src/
├── components/     # Composants réutilisables
├── pages/         # Pages de l'application
├── styles/        # Feuilles de style
├── utils/         # Utilitaires
├── App.jsx        # Composant racine
└── main.jsx       # Point d'entrée
```

## 📱 Pages disponibles

- `/login` - Connexion
- `/users` - Gestion des utilisateurs
- `/restaurants` - Gestion des restaurants
- `/assignments` - Gestion des affectations
- `/job-titles` - Gestion des postes

---

*Application développée pour la gestion du réseau Wacdo*
