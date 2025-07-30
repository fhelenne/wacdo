import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy, useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Loading from './components/Loading'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'

// Lazy load page components for better performance
const Login = lazy(() => import('./pages/Login'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const User = lazy(() => import('./pages/User'))
const Assignment = lazy(() => import('./pages/Assignment'))
const Restaurant = lazy(() => import('./pages/Restaurant'))
const JobTitle = lazy(() => import('./pages/JobTitle'))

// Protected Route Component
function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading message="Vérification de l'authentification..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div>
          <Navigation />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/users" element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              } />
              <Route path="/assignments" element={
                <ProtectedRoute>
                  <Assignment />
                </ProtectedRoute>
              } />
              <Route path="/restaurants" element={
                <ProtectedRoute>
                  <Restaurant />
                </ProtectedRoute>
              } />
              <Route path="/job-titles" element={
                <ProtectedRoute>
                  <JobTitle />
                </ProtectedRoute>
              } />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </ErrorBoundary>
  )
}

export default App
