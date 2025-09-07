// Utilitaire pour effectuer des requêtes fetch avec JWT automatiquement dans le header Authorization
// Respecte les principes SOLID et les guidelines d'accessibilité du projet
import { notify } from './notify.js';
import React from 'react';

// Fonction pour extraire le message d'erreur des réponses API Platform
function extractApiPlatformError(errorData) {
  // Cas 1: Erreur avec hydra:description (erreurs générales)
  if (errorData['hydra:description']) {
    return errorData['hydra:description'];
  }

  // Cas 2: Erreur avec detail (erreurs HTTP standards)
  if (errorData.detail) {
    return errorData.detail;
  }

  // Cas 3: Erreurs de validation (violations)
  if (errorData.violations && Array.isArray(errorData.violations)) {
    const violationMessages = errorData.violations
      .map(violation => `${violation.propertyPath}: ${violation.message}`)
      .join(', ');
    return `Erreurs de validation: ${violationMessages}`;
  }

  // Cas 4: Message simple
  if (errorData.message) {
    return errorData.message;
  }

  // Cas 5: Titre de l'erreur
  if (errorData.title) {
    return errorData.title;
  }

  return 'Une erreur inconnue s\'est produite';
}

// Dictionnaire de traduction des noms de champs
const fieldTranslations = {
  'email': 'Email',
  'password': 'Mot de passe',
  'firstName': 'Prénom',
  'lastName': 'Nom de famille',
  'name': 'Nom',
  'title': 'Titre',
  'startAt': 'Date de début',
  'endAt': 'Date de fin',
  'createdAt': 'Date de création',
  'updatedAt': 'Date de modification',
  'jobTitle': 'Poste',
  'restaurant': 'Restaurant',
  'employee': 'Collaborateur',
  'assignment': 'Affectation',
  'roles': 'Rôles',
  'phone': 'Téléphone',
  'address': 'Adresse',
  'city': 'Ville',
  'postalCode': 'Code postal',
  'country': 'Pays',
  'birthDate': 'Date de naissance',
  'hireDate': 'Date d\'embauche',
  'startDate': 'Date de début',
  'endDate': 'Date de fin',
  'user': 'Utilisateur',
  'username': 'Nom d\'utilisateur',
  'confirmPassword': 'Confirmation du mot de passe'
};


// Fonction pour améliorer les messages d'erreur d'assignment
function improveAssignmentErrorMessage(message, url) {
  // Vérifier si c'est une opération sur les assignments
  if (url.includes('/assignments') || url.includes('assignment')) {

    // Améliorer les messages génériques pour les assignments
    if (message.includes('This value is already used')) {
      return message.replace('This value is already used', 'Un conflit d\'affectation a été détecté. Cet employé est peut-être déjà affecté pendant cette période.');
    }

    if (message.includes('This value should not be blank') || message.includes('This value should not be null')) {
      return message.replace(/This value should not be (blank|null)/, 'Ce champ est obligatoire pour créer une affectation');
    }

    if (message.includes('Invalid') && !message.includes(':')) {
      return 'Les données d\'affectation ne sont pas valides. Veuillez vérifier les dates et la sélection.';
    }
  }

  return message;
}

// Fonction pour améliorer les messages d'erreur d'employés/collaborateurs
function improveEmployeeErrorMessage(message, url) {
  // Vérifier si c'est une opération sur les employés/users
  if (url.includes('/users') || url.includes('/employees') || url.includes('user') || url.includes('employee')) {

    // Messages spécifiques aux contraintes de validation de l'entité User

    // Contrainte UniqueEntity sur email
    if (message.includes('This value is already used') || message.includes('Cette valeur est déjà utilisée')) {
      if (message.toLowerCase().includes('email')) {
        return message.replace(/This value is already used|Cette valeur est déjà utilisée/, 'Cette adresse email est déjà utilisée par un autre collaborateur');
      }
      return message.replace(/This value is already used|Cette valeur est déjà utilisée/, 'Cette information est déjà utilisée par un autre collaborateur');
    }

    // Contraintes NotBlank pour email, firstName, lastName, plainPassword
    if (message.includes('This value should not be blank')) {
      if (message.toLowerCase().includes('email')) {
        return message.replace('This value should not be blank', 'L\'adresse email est obligatoire');
      }
      if (message.toLowerCase().includes('firstname')) {
        return message.replace('This value should not be blank', 'Le prénom est obligatoire');
      }
      if (message.toLowerCase().includes('lastname')) {
        return message.replace('This value should not be blank', 'Le nom de famille est obligatoire');
      }
      if (message.toLowerCase().includes('plainpassword') || message.toLowerCase().includes('password')) {
        return message.replace('This value should not be blank', 'Le mot de passe est obligatoire');
      }
      return message.replace('This value should not be blank', 'Ce champ est obligatoire pour créer un collaborateur');
    }

    if (message.includes('This value should not be null')) {
      return message.replace('This value should not be null', 'Ce champ est obligatoire pour créer un collaborateur');
    }

    // Contrainte Email
    if (message.includes('This value is not a valid email address')) {
      return message.replace('This value is not a valid email address', 'Le format de l\'adresse email n\'est pas valide. Exemple : nom@domaine.com');
    }

    // Messages génériques pour la validation
    if (message.includes('Invalid') && !message.includes(':') && !message.includes('format')) {
      return 'Les informations du collaborateur ne sont pas valides. Veuillez vérifier tous les champs obligatoires.';
    }

    // Message pour les erreurs de groupes de validation
    if (message.includes('validation failed') || message.includes('constraint violation')) {
      return 'Erreur lors de la validation des données du collaborateur. Vérifiez que tous les champs obligatoires sont remplis correctement.';
    }
  }

  return message;
}

// Fonction pour traduire les noms de champs dans un message
function translateFieldNames(message) {
  let translatedMessage = message;

  // Chercher les patterns "fieldName:" ou "fieldName :" dans le message
  Object.keys(fieldTranslations).forEach(fieldName => {
    const regex = new RegExp(`\\b${fieldName}\\s*:`, 'gi');
    translatedMessage = translatedMessage.replace(regex, `${fieldTranslations[fieldName]} :`);
  });

  return translatedMessage;
}

// Fonction pour traiter les retours à la ligne dans les messages d'erreur
function formatErrorMessage(message, url = '') {
  // D'abord, améliorer les messages d'assignment si nécessaire
  let improvedMessage = improveAssignmentErrorMessage(message, url);

  // Ensuite, améliorer les messages d'employés si nécessaire
  improvedMessage = improveEmployeeErrorMessage(improvedMessage, url);

  // Enfin, traduire les noms de champs
  let translatedMessage = translateFieldNames(improvedMessage);

  // Vérifier si le message contient des retours à la ligne
  if (translatedMessage.includes('\\n') || translatedMessage.includes('\n')) {
    // Nettoyer et convertir les retours à la ligne
    let cleanMessage = translatedMessage.replace(/\\n/g, '\n'); // Convertir \\n en \n

    // Convertir les \n en <br/> pour l'affichage HTML
    const htmlMessage = cleanMessage.replace(/\n/g, '<br/>');

    // Retourner un composant React avec dangerouslySetInnerHTML
    return React.createElement('div', {
      dangerouslySetInnerHTML: { __html: htmlMessage },
      style: { 
        whiteSpace: 'normal', 
        lineHeight: '1.4',
        textAlign: 'left'
      }
    });
  }

  // Message simple sans retours à la ligne mais avec traduction des champs
  return translatedMessage;
}

export default async function fetchWithJWT(url, options = {}) {
  const token = localStorage.getItem('jwt');
  let ContentType = 'application/json';
  if(options.method === 'PATCH'){
      ContentType = 'application/merge-patch+json';
  }
  const headers = {
    ...(options.headers || {}),
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    'Content-Type': ContentType
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Si la réponse n'est pas ok, essayer d'extraire le message d'erreur
  if (!response.ok) {
    let errorMessage = `Erreur HTTP ${response.status}`;

    try {
      const errorData = await response.clone().json();
      errorMessage = extractApiPlatformError(errorData);
    } catch {
      // Si on ne peut pas parser la réponse JSON, utiliser le status text
      errorMessage = response.statusText || errorMessage;
    }

    // Traiter le message d'erreur pour gérer les retours à la ligne
    const formattedMessage = formatErrorMessage(errorMessage, url);

    // Afficher l'erreur dans un toaster
    notify.error(formattedMessage, {
      autoClose: 8000, // Plus long pour lire les erreurs multiples
    });

    // Toujours relancer l'erreur pour permettre à l'appelant de la gérer si nécessaire
    const error = new Error(typeof errorMessage === 'string' ? errorMessage : 'Erreur de validation');
    error.status = response.status;
    error.response = response;
    throw error;
  }

  return response;
} 