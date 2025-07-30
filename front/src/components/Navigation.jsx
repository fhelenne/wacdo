import { Link, useLocation, useNavigate } from 'react-router-dom';
import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/components/Navigation.css';
import { 
  faChartBar, 
  faUsers, 
  faClipboardList,
  faBriefcase, 
  faHamburger, 
  faUser, 
  faSignOutAlt 
} from '../utils/icons.js';

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Don't show navigation on login page
  if (location.pathname === '/login') {
    return null;
  }

  const navItems = [
    { path: '/restaurants', name: 'Tableau de bord', icon: faChartBar },
    { path: '/users', name: 'Collaborateurs', icon: faUsers },
    { path: '/assignments', name: 'Affectations', icon: faClipboardList },
    { path: '/job-titles', name: 'Postes', icon: faBriefcase },
  ];

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('jwt');
    navigate('./login');
  };

  return (
    <nav role="navigation">
      <Link
        base={import.meta.env.BASE_URL}
        to="/dashboard"
        role="link"
      >
        <FontAwesomeIcon icon={faHamburger} /> Wacdo Admin
      </Link>
      <ul role="menubar">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li role="none" key={item.path}>
              <Link
                base={import.meta.env.BASE_URL}
                to={item.path}
                role="menuitem"
                aria-current={isActive ? "page" : undefined}
              >
                <FontAwesomeIcon icon={item.icon} />
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div role="status">
        <FontAwesomeIcon icon={faUser} /> Admin
      </div>
      <button
        type="button"
        role="button"
        onClick={handleLogout}
        aria-label="Déconnexion"
      >
        <FontAwesomeIcon icon={faSignOutAlt} /> Déconnexion
      </button>
    </nav>
  );
}

export default memo(Navigation);