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

DB1["User"]

DB2["Restaurant"]

DB3["JobTitle"]

DB4["Assignment"]

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

+Enum role

+Date first_hired_at

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

User "1" --> "0..*" Assignment : has

Restaurant "1" --> "0..*" Assignment : hosts

JobTitle "1" --> "0..*" Assignment : used in

Assignment "1" --> "1" User : for

Assignment "1" --> "1" Restaurant : at

Assignment "1" --> "1" JobTitle : as

```


## Modèle de données

```mermaid

erDiagram

  USER {
    int id PK
    string name
    string first_name
    string email
    string password
    date first_hired_at
    enum role
    datetime created_at
    datetime updated_at
    int created_by FK
    int updated_by FK
  }

  RESTAURANT {
    int id PK
    string name
    string address
    string zip_code
    string city
    datetime created_at
    datetime updated_at
    int created_by FK
    int updated_by FK
  }

  JOB_TITLE {
    int id PK
    string name
    datetime created_at
    datetime updated_at
    int created_by FK
    int updated_by FK
  }

  ASSIGNMENT {
    int id PK
    int user_id FK
    int restaurant_id FK
    int job_title_id FK
    date start_at
    date end_at
    datetime created_at
    datetime updated_at
    int created_by FK
    int updated_by FK
  }

  %% Relations
  USER ||--o{ ASSIGNMENT : has
  RESTAURANT ||--o{ ASSIGNMENT : hosts
  JOB_TITLE ||--o{ ASSIGNMENT : includes

  USER ||--o{ USER : created_by
  USER ||--o{ USER : updated_by


```
