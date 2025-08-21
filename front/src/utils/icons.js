// Optimized icon imports - only import what we need
import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faHouse,
    faChartBar,
    faUsers,
    faClipboardList,
    faBriefcase,
    faHamburger,
    faMagnifyingGlass,
    faUser,
    faSignOutAlt,
    faPlus, // Ajouté pour bouton d'ajout
    faEdit, // Ajouté pour bouton de modification
    faTrash // Ajouté pour bouton de suppression
} from '@fortawesome/free-solid-svg-icons';

// Add only the icons we use to the library
library.add(
    faHouse,
    faChartBar,
    faUsers,
    faClipboardList,
    faMagnifyingGlass,
    faBriefcase,
    faHamburger,
    faUser,
    faSignOutAlt,
    faPlus, // Ajouté
    faEdit, // Ajouté
    faTrash // Ajouté
);

// Export icons for use in components
export {
    faHouse,
    faChartBar,
    faUsers,
    faClipboardList,
    faMagnifyingGlass,
    faBriefcase,
    faHamburger,
    faUser,
    faSignOutAlt,
    faPlus, // Ajouté
    faEdit, // Ajouté
    faTrash // Ajouté
};