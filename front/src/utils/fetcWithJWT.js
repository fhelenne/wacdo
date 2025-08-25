// Utilitaire pour effectuer des requêtes fetch avec JWT automatiquement dans le header Authorization
// Respecte les principes SOLID et les guidelines d'accessibilité du projet

export default async function fetchWithJWT(url, options = {}) {
  const token = JSON.parse(localStorage.getItem('jwt'));
  let ContentType = 'application/json';
  if(options.method === 'PATCH'){
      ContentType = 'application/merge-patch+json';
  }
  const headers = {
    ...(options.headers || {}),
    ...(token ? { 'Authorization': `Bearer ${token.value}` } : {}),
    'Content-Type': ContentType
  };
  
  return fetch(url, {
    ...options,
    headers,
  });
} 