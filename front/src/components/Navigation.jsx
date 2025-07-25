import { Link, useLocation } from 'react-router-dom';
import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartBar, 
  faUsers, 
  faClipboardList, 
  faStore, 
  faBriefcase, 
  faHamburger, 
  faUser, 
  faSignOutAlt 
} from '../utils/icons.js';

function Navigation() {
  const location = useLocation();
  
  // Don't show navigation on login page
  if (location.pathname === '/login') {
    return null;
  }

  const navItems = [
    { path: '/dashboard', name: 'Tableau de bord', icon: faChartBar },
    { path: '/users', name: 'Utilisateurs', icon: faUsers },
    { path: '/assignments', name: 'Affectations', icon: faClipboardList },
    { path: '/restaurants', name: 'Restaurants', icon: faStore },
    { path: '/job-titles', name: 'Postes', icon: faBriefcase },
  ];

  return (
    <nav role="navigation">
      <div>
        <div>
          <div>
            <div>
              <Link 
                to="/dashboard" 
                role="link"
              >
<FontAwesomeIcon icon={faHamburger} /> Wacdo Admin
              </Link>
            </div>
            <div>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    role="link"
                    aria-current={isActive ? "page" : undefined}
                  >
                    <FontAwesomeIcon icon={item.icon} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
          <div>
            <div role="status">
              <FontAwesomeIcon icon={faUser} /> Admin
            </div>
            <Link
              to="/login"
              role="button"
            >
<FontAwesomeIcon icon={faSignOutAlt} /> Déconnexion
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default memo(Navigation);