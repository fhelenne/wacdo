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
    navigate('/login');
  };

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
            <button
              type="button"
              role="button"
              onClick={handleLogout}
              style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: 0 }}
              aria-label="Déconnexion"
            >
              <FontAwesomeIcon icon={faSignOutAlt} /> Déconnexion
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default memo(Navigation);