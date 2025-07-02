# wacdo

Projet formation FH.

Une application symfony pour le back

Une application react pour le front

## installation

1. copier .env.sample -> .env et renseigner les paramètres

## Lancement

Pour plus de simplicité, on utilise docker pour avoir un environnement complet :

1. lancer l'environnement

```bash
docker compose -f .docker/docker-compose.yml up
```


## Back [![SymfonyInsight](https://insight.symfony.com/projects/76c18180-f463-4022-867c-7f147e05f186/mini.svg)](https://insight.symfony.com/projects/76c18180-f463-4022-867c-7f147e05f186)

### Collections postman/bruno

Disponibles dans back/.collections

### Initialiser/purger les données en base :

```bash
docker exec -it back php back/bin/console doctrine:fixtures:load --no-interaction 
```


## Front

TODO
