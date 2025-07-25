import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import User from './pages/User'
import Assignment from './pages/Assignment'
import Restaurant from './pages/Restaurant'
import JobTitle from './pages/JobTitle'
import './App.css'

function Navigation() {
  const location = useLocation();
  
  // Don't show navigation on login page
  if (location.pathname === '/login') {
    return null;
  }

  const navItems = [
    { path: '/dashboard', name: 'Tableau de bord', icon: '📊' },
    { path: '/users', name: 'Utilisateurs', icon: '👥' },
    { path: '/assignments', name: 'Affectations', icon: '📋' },
    { path: '/restaurants', name: 'Restaurants', icon: '🏪' },
    { path: '/job-titles', name: 'Postes', icon: '💼' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/dashboard" className="text-xl font-bold text-indigo-600">
                Wacdo Admin
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    location.pathname === item.path
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <Link
              to="/login"
              className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Déconnexion
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<User />} />
          <Route path="/assignments" element={<Assignment />} />
          <Route path="/restaurants" element={<Restaurant />} />
          <Route path="/job-titles" element={<JobTitle />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
