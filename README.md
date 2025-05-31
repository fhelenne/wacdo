# wacdo

Projet formation FH.

## installation

1. copier .env.sample -> .env et renseigner les paramètres

## Lancer l'application

Pour plus de simplicité, on utilise docker pour avoir un environnement complet :

1. lancer l'environnement

```bash
docker compose -f .docker/docker-compose.yml up
```

initialiser/purger les données en base :

```bash
docker exec -it back php back/bin/console doctrine:fixtures:load --no-interaction 
```
