import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  
  // Don't show navigation on login page
  if (location.pathname === '/login') {
    return null;
  }

  const navItems = [
    { path: '/dashboard', name: 'Tableau de bord' },
    { path: '/users', name: 'Utilisateurs' },
    { path: '/assignments', name: 'Affectations' },
    { path: '/restaurants', name: 'Restaurants' },
    { path: '/job-titles', name: 'Postes' },
  ];

  return (
    <nav role="nav">
      <section>
        <header>
          <Link to="/dashboard" role="logo">
            Wacdo Admin
          </Link>
          <div role="menu">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                role="item"
                data-active={location.pathname === item.path}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </header>
        <div>
          <div role="user">
            Admin
          </div>
          <Link
            to="/login"
            role="logout"
          >
            Déconnexion
          </Link>
        </div>
      </section>
    </nav>
  );
}

export default Navigation;