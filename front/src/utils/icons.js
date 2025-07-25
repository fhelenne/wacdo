// Optimized icon imports - only import what we need
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faChartBar, 
  faUsers, 
  faClipboardList, 
  faStore, 
  faBriefcase, 
  faHamburger, 
  faUser, 
  faSignOutAlt 
} from '@fortawesome/free-solid-svg-icons';

// Add only the icons we use to the library
library.add(
  faChartBar,
  faUsers,
  faClipboardList,
  faStore,
  faBriefcase,
  faHamburger,
  faUser,
  faSignOutAlt
);

// Export icons for use in components
export {
  faChartBar,
  faUsers,
  faClipboardList,
  faStore,
  faBriefcase,
  faHamburger,
  faUser,
  faSignOutAlt
};