---
cssclasses:
---
Wacdo : Spécifications fonctionnelles et techniques
=======================================================

## Besoins du client

Permettre de gérer les affectations collaborateur/restaurant via une interface sécurisée. Deux profils utilisateurs :  
* administrateur : gérer les utilisateurs/restaurants/intitulés de postes et affectations
* collaborateur : consulter mes affectations

## Spécifications fonctionnelles

* Accès sécurisé, 2 profils disponibles : administrateur et collaborateur
* l'administrateur peut 
	* ajouter/modifier/supprimer un utilisateur
	* ajouter/modifier/supprimer un restaurant
	* ajouter/modifier/supprimer un poste
	* ajouter/modifier/supprimer une affectation
* le collaborateur peut 
	* consulter ses affectations
	* consulter ses informations personnelles

## Spécifications Techniques

* back : API REST Symfony
* Base SQL avec ORM (Doctrine).
* front : React.js consomme l'API du back (Authentification JWT)
* Sécurité : CSRF, XSS, accès par rôle.

```mermaid
graph TD

subgraph "Frontend"

FE1["React.js"]

end

  

subgraph "Backend"

BE1["Symfony API REST"]

BE2["Authentification JWT"]

BE3["Contrôle d'accès (Admin / Collaborateur)"]

end

  

subgraph "Base de données"

DB1["Users"]

DB2["Restaurants"]

DB3["Postes"]

DB4["Affectations"]

end

  

FE1 -->|"Appels API sécurisés"| BE1

BE1 -->|"JWT"| BE2

BE1 -->|"Contrôle des rôles"| BE3

BE1 --> DB1

BE1 --> DB2

BE1 --> DB3

BE1 --> DB4
```


## Diagramme de classes


```mermaid
classDiagram

class User {

+String name

+String first_name

+String email

+String password

+Date first_hired_at

}

  

class Role {

+String code

+String name

}

  

class JobTitle {

+String name

}

  

class Restaurant {

+String name

+String address

+String zip_code

+String city

}

  

class Assignment {

+Date start_at

+Date end_at

}

  

%% Relations

Role "1" --> "0..*" User : has

User "1" --> "0..*" Assignment : has

Restaurant "1" --> "0..*" Assignment : hosts

JobTitle "1" --> "0..*" Assignment : used in

Assignment "1" --> "1" User : for

Assignment "1" --> "1" Restaurant : at

Assignment "1" --> "1" JobTitle : as

```


## Modèle de données

```mermaid

TODO

```