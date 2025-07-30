// Utilitaire pour effectuer des requêtes fetch avec JWT automatiquement dans le header Authorization
// Respecte les principes SOLID et les guidelines d'accessibilité du projet

export default async function fetchWithJWT(url, options = {}) {
  const token = localStorage.getItem('jwt');
  const headers = {
    ...(options.headers || {}),
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    'Content-Type': 'application/json',
  };
  return fetch(url, {
    ...options,
    headers,
  });
} 