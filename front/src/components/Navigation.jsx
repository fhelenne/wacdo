import { Link, useLocation, useNavigate } from 'react-router-dom';
import {memo} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useAuth} from "../contexts/AuthContext.jsx";
import '../styles/components/Navigation.css';
import { 
  faHouse,
  faUsers, 
  faClipboardList,
  faBriefcase, 
  faHamburger, 
  faUser, 
  faSignOutAlt 
} from '../utils/icons.js';

function Navigation() {
  const Auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  // Don't show navigation on login page
  if (location.pathname === '/login' || !Auth.isAuthenticated) {
    return null;
  }

  const allNavItems = [
    { path: '/assignments', name: 'Affectations', icon: faClipboardList },
    { path: '/restaurants', name: 'Restaurants', icon: faHouse },
    { path: '/users', name: 'Collaborateurs', icon: faUsers },
    { path: '/job-titles', name: 'Postes', icon: faBriefcase },
  ];

  const navItems = Auth.isEmployee
    ? allNavItems.filter(() => false)
    : allNavItems;

  const handleLogout = (e) => {
    e.preventDefault();
    Auth.logout();
    navigate('/login');
  };

  return (
    <nav role="navigation">
      <Link
        base={import.meta.env.BASE_URL}
        to={Auth.isEmployee ? '/users/detail/'+Auth.userId : '/assignments'}
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
        <FontAwesomeIcon icon={faUser} /> {Auth.isAdmin ? 'Admin' : 'Employé'}
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