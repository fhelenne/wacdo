# Guidelines IA pour le projet

## 1. Principes SOLID
- Respecter les principes SOLID dans toute la logique métier et la structuration du code.
- Favoriser la séparation des responsabilités, l’extensibilité et la maintenabilité.

## 2. Utilisation des attributs `role` et `class`
- **Ne pas utiliser l’attribut `className` pour le stylage ou la sélection d’éléments.**
- Utiliser l’attribut `role` pour identifier les éléments dans le DOM.
- Si le rôle souhaité ne correspond pas à un rôle WAI-ARIA standard, utiliser l’attribut `class` à la place.
- Toujours privilégier les rôles WAI-ARIA officiels : [Liste des rôles WAI-ARIA](https://www.w3.org/TR/wai-aria-1.1/#role_definitions)

## 3. Sélecteurs CSS
- Les sélecteurs CSS doivent cibler en priorité les attributs `role`.
- Si un rôle personnalisé est utilisé (non WAI-ARIA), cibler l’attribut `class` correspondant.
- Exemple :
  - `[role="button"] { /* styles */ }`
  - `.custom-role { /* styles */ }`

## 4. Interdiction d’utiliser des classes natives du framework CSS
- Aucune classe ne doit contenir ou réutiliser des classes natives du framework CSS utilisé (ex : Bootstrap, Tailwind, etc.).
- Les classes doivent être propres au projet et ne pas entrer en conflit avec le framework.

## 5. Accessibilité
- Toujours vérifier que l’utilisation des rôles respecte les bonnes pratiques d’accessibilité.
- Documenter tout rôle personnalisé utilisé.

---

*Document à respecter pour toute contribution IA ou automatisée au projet.* 