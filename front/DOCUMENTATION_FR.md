make# Documentation Frontend - Application Wacdo

## Table des matières
1. [Présentation](#présentation)
2. [Installation et configuration](#installation-et-configuration)
3. [Architecture de l'application](#architecture-de-lapplication)
4. [Pages et fonctionnalités](#pages-et-fonctionnalités)
5. [Composants réutilisables](#composants-réutilisables)
6. [Scripts disponibles](#scripts-disponibles)
7. [Technologies utilisées](#technologies-utilisées)

## Présentation

L'application frontend Wacdo est une interface de gestion pour le réseau de restaurants Wacdo. Elle permet aux administrateurs de gérer les utilisateurs, les restaurants, les affectations de personnel et les postes de travail à travers une interface web moderne et intuitive.

### Fonctionnalités principales
- **Authentification** : Système de connexion sécurisé
- **Tableau de bord** : Vue d'ensemble avec statistiques et activités récentes
- **Gestion des utilisateurs** : CRUD complet pour les employés
- **Gestion des restaurants** : Administration des établissements du réseau
- **Gestion des affectations** : Attribution du personnel aux différents postes
- **Gestion des postes** : Administration des différents rôles et responsabilités

## Installation et configuration

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation
```bash
# Cloner le projet
cd /chemin/vers/wacdo/www/front

# Installer les dépendances
npm install

# Lancer l'application en mode développement
npm run dev
```

### Configuration
L'application utilise Vite comme bundler et serveur de développement. La configuration se trouve dans `vite.config.js`.

## Architecture de l'application

### Structure des dossiers
```
src/
├── components/          # Composants réutilisables
│   ├── Navigation.jsx   # Barre de navigation principale
│   ├── PageHeader.jsx   # En-tête de page
│   ├── FormField.jsx    # Champ de formulaire
│   ├── Button.jsx       # Bouton personnalisé
│   ├── StatCard.jsx     # Carte de statistique
│   ├── DataTable.jsx    # Tableau de données
│   ├── Pagination.jsx   # Composant de pagination
│   ├── SearchBar.jsx    # Barre de recherche
│   ├── Loading.jsx      # Indicateur de chargement
│   └── ErrorBoundary.jsx # Gestion des erreurs
├── pages/               # Pages de l'application
│   ├── Login.jsx        # Page de connexion
│   ├── Dashboard.jsx    # Tableau de bord
│   ├── User.jsx         # Gestion des utilisateurs
│   ├── Restaurant.jsx   # Gestion des restaurants
│   ├── Assignment.jsx   # Gestion des affectations
│   └── JobTitle.jsx     # Gestion des postes
├── styles/              # Feuilles de style
│   └── components.css   # Styles des composants
├── utils/               # Utilitaires
├── App.jsx              # Composant racine
└── main.jsx             # Point d'entrée
```

### Routing
L'application utilise React Router pour la navigation :
- `/login` - Page de connexion
- `/dashboard` - Tableau de bord principal
- `/users` - Gestion des utilisateurs
- `/restaurants` - Gestion des restaurants
- `/assignments` - Gestion des affectations
- `/job-titles` - Gestion des postes

## Pages et fonctionnalités

### 1. Page de connexion (`/login`)
- **Objectif** : Authentification des utilisateurs
- **Fonctionnalités** :
  - Formulaire de connexion (email/mot de passe)
  - Option "Se souvenir de moi"
  - Lien "Mot de passe oublié"
- **Composants utilisés** : PageHeader, FormField, Button

### 2. Tableau de bord (`/dashboard`)
- **Objectif** : Vue d'ensemble de l'activité du réseau
- **Fonctionnalités** :
  - Statistiques en temps réel (utilisateurs, restaurants, affectations, postes)
  - Flux d'activités récentes
  - Navigation rapide vers les autres sections
- **Composants utilisés** : StatCard, ActivityItem, Button

### 3. Gestion des restaurants (`/restaurants`)
- **Objectif** : Administration des établissements Wacdo
- **Fonctionnalités** :
  - Liste complète des restaurants avec adresses
  - Recherche et filtrage
  - Actions CRUD (Créer, Lire, Modifier, Supprimer)
  - Pagination des résultats
- **Composants utilisés** : SearchBar, DataTable, Pagination, StatCard

### 4. Gestion des utilisateurs (`/users`)
- **Objectif** : Administration du personnel
- **Fonctionnalités** : Interface de gestion des employés du réseau

### 5. Gestion des affectations (`/assignments`)
- **Objectif** : Attribution du personnel aux postes
- **Fonctionnalités** : Système d'affectation des employés aux différents restaurants et postes

### 6. Gestion des postes (`/job-titles`)
- **Objectif** : Administration des rôles et responsabilités
- **Fonctionnalités** : Définition et gestion des différents postes de travail

## Composants réutilisables

### Navigation
Barre de navigation principale avec liens vers toutes les sections de l'application.

### PageHeader
En-tête standardisé pour toutes les pages avec titre, description optionnelle et bouton d'action.

### FormField
Champ de formulaire réutilisable avec label, validation et gestion d'état.

### Button
Bouton personnalisé avec styles cohérents dans toute l'application.

### StatCard
Carte d'affichage de statistiques avec titre, valeur et sous-titre optionnel.

### DataTable
Tableau de données avec colonnes configurables et actions personnalisables.

### SearchBar
Barre de recherche avec placeholder personnalisable.

### Pagination
Composant de pagination avec comptage d'éléments et navigation.

### Loading
Indicateur de chargement pour les opérations asynchrones.

### ErrorBoundary
Composant de gestion d'erreurs pour capturer et afficher les erreurs React.

## Scripts disponibles

```bash
# Développement
npm run dev          # Lance le serveur de développement

# Production
npm run build        # Compile l'application pour la production
npm run preview      # Prévisualise la version de production

# Qualité de code
npm run lint         # Vérifie la qualité du code avec ESLint
```

## Technologies utilisées

### Frameworks et bibliothèques
- **React 19.1.0** : Bibliothèque JavaScript pour l'interface utilisateur
- **React Router DOM 7.7.1** : Gestion du routing côté client
- **Vite 6.3.5** : Bundler et serveur de développement rapide

### Icônes et UI
- **FontAwesome** : Bibliothèque d'icônes
  - @fortawesome/fontawesome-svg-core
  - @fortawesome/free-solid-svg-icons
  - @fortawesome/react-fontawesome

### Outils de développement
- **ESLint** : Linter JavaScript avec configuration React
- **Prettier** : Formateur de code
- **TypeScript types** : Types pour React et React DOM

### Fonctionnalités avancées
- **Lazy Loading** : Chargement différé des pages pour optimiser les performances
- **Error Boundaries** : Gestion robuste des erreurs
- **Responsive Design** : Interface adaptative pour tous les écrans

## Bonnes pratiques

### Performance
- Utilisation du lazy loading pour les pages
- Composants optimisés avec React 19
- Bundling optimisé avec Vite

### Accessibilité
- Utilisation des attributs `role` et `aria-label`
- Structure sémantique HTML
- Navigation au clavier supportée

### Maintenabilité
- Architecture modulaire avec composants réutilisables
- Séparation claire entre logique et présentation
- Styles organisés et cohérents

### Sécurité
- Validation côté client des formulaires
- Gestion sécurisée des états d'authentification
- Protection contre les erreurs avec ErrorBoundary

---

*Cette documentation couvre la version actuelle de l'application frontend Wacdo. Pour toute question ou suggestion d'amélioration, veuillez contacter l'équipe de développement.*