import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Navigation from './components/Navigation'
import Loading from './components/Loading'
import ErrorBoundary from './components/ErrorBoundary'
import './styles/forms.css'
import './App.css'
import { useAuth } from './contexts/AuthContext.jsx'


// Lazy load page components for better performance
import Login from './pages/Login'
const Dashboard = lazy(() => import('./pages/Dashboard'))
const User = lazy(() => import('./pages/User'))
const Assignment = lazy(() => import('./pages/Assignment'))
const Restaurant = lazy(() => import('./pages/Restaurant'))
const JobTitle = lazy(() => import('./pages/JobTitle'))
const CreateJobTitle = lazy(() => import('./pages/CreateJobTitle'))

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, isEmployee } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (isEmployee) {
    const allowedPaths = ['/users']
    if (!allowedPaths.includes(location.pathname)) {
      return <Navigate to="/users" replace />
    }
  }

  return children
}

function RoleBasedHomeRedirect() {
  const { isAuthenticated, isAdmin } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <Navigate to={isAdmin ? '/dashboard' : '/users'} replace />
}

function App() {
  return (
    <ErrorBoundary>
      <Router basename={import.meta.env.BASE_URL}>
        <div>
          <Suspense fallback={<Loading />}>
            {/* Navigation is now inside Suspense to avoid flicker */}
            <Navigation />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<RoleBasedHomeRedirect />} />
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
