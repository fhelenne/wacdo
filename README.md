
# WACDO - Gestion des Affectations Collaborateurs/Restaurants

WACDO est une application web permettant de gérer les affectations des collaborateurs dans différents restaurants. Elle offre une interface sécurisée avec deux profils utilisateurs : administrateur et collaborateur.

[![SymfonyInsight](https://insight.symfony.com/projects/76c18180-f463-4022-867c-7f147e05f186/mini.svg)](https://insight.symfony.com/projects/76c18180-f463-4022-867c-7f147e05f186)

## Fonctionnalités

### Administrateur
- Gestion des utilisateurs (ajout, modification, suppression)
- Gestion des restaurants (ajout, modification, suppression)
- Gestion des postes (ajout, modification, suppression)
- Gestion des affectations (ajout, modification, suppression)

### Collaborateur
- Consultation de ses affectations

## Technologies utilisées

### Backend
- Symfony (API REST)
- Doctrine ORM
- JWT pour l'authentification
- MySQL

### Frontend
- React.js
- Vite

### Infrastructure
- Docker
- Caddy (serveur web)

## Prérequis

- Docker et Docker Compose
- Git

## Structure du projet

```
www/
├── .docker/            # Configuration Docker
├── back/               # Application Symfony (API)
│   ├── .collections/   # Collections Postman/Bruno
│   ├── src/            # Code source PHP
│   ├── config/         # Configuration Symfony
│   ├── migrations/     # Migrations de base de données
│   └── ...
├── front/              # Application React
│   ├── src/            # Code source JavaScript/React
│   └── ...
├── doc/                # Documentation du projet
└── ...
```

## Installation

1. Cloner le dépôt
   ```bash
   git clone [URL_DU_REPO]
   cd wacdo/www
   ```

2. Copier le fichier d'environnement et configurer les variables
   ```bash
   cp .env.sample .env
   ```
   
   Éditer le fichier `.env` avec les paramètres appropriés :
   ```
   MYSQL_HOST="db"
   MYSQL_ROOT_PASSWORD="votre_mot_de_passe"
   MYSQL_DATABASE="wacdo"
   MYSQL_USER="votre_utilisateur"
   MYSQL_PASSWORD="votre_mot_de_passe"
   MYSQL_SERVER_VERSION="9.3.0"
   ```

## Lancement de l'environnement de développement

1. Démarrer les conteneurs Docker
   ```bash
   docker compose -f .docker/docker-compose.yml up -d
   ```

2. Accéder aux applications
   - Backend API: http://localhost/api
   - Frontend: http://localhost

## Configuration du Backend

### Installation des dépendances
```bash
docker exec -it back composer install
```

### Création de la base de données
```bash
docker exec -it back php back/bin/console doctrine:database:create
docker exec -it back php back/bin/console doctrine:migrations:migrate
```

### Chargement des données de test
```bash
docker exec -it back php back/bin/console doctrine:fixtures:load --no-interaction
```

## Documentation API

Les collections Postman/Bruno sont disponibles dans le dossier `back/.collections` pour tester et explorer l'API.

Pour générer la documentation API :
```bash
docker exec -it back php back/bin/console api:doc:dump
```

## Tests

### Exécution des tests backend
```bash
docker exec -it back php back/bin/phpunit
```

### Exécution des tests frontend
```bash
docker exec -it front npm test
```

## Déploiement

Le script `deploy.sh` à la racine du projet permet de déployer l'application en production.

```bash
./deploy.sh
```

## Sécurité

L'application implémente plusieurs mesures de sécurité :
- Protection CSRF
- Protection contre les attaques XSS
- Authentification JWT
- Contrôle d'accès basé sur les rôles

## Contribution

1. Forker le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Commiter vos changements (`git commit -m 'Add some amazing feature'`)
4. Pousser vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence [à spécifier] - voir le fichier LICENSE pour plus de détails.

## Contact

Pour toute question ou suggestion, veuillez contacter [à spécifier].