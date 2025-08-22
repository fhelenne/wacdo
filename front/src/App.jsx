import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Navigation from './components/Navigation'
import Loading from './components/Loading'
import ErrorBoundary from './components/ErrorBoundary'
import './styles/forms.css'
import './App.css'
import { useAuth } from './contexts/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

import Login from './pages/Login'
const Dashboard = lazy(() => import('./pages/Dashboard'))
const User = lazy(() => import('./pages/User'))
const CreateUser = lazy(() => import('./pages/CreateUser'))
const EditUser = lazy(() => import('./pages/EditUser'))
const Assignment = lazy(() => import('./pages/Assignment'))
const CreateAssignment = lazy(() => import('./pages/CreateAssignment'))
const EditAssignment = lazy(() => import('./pages/EditAssignment'))
const Restaurant = lazy(() => import('./pages/Restaurant'))
const CreateRestaurant = lazy(() => import('./pages/CreateRestaurant'))
const EditRestaurant = lazy(() => import('./pages/EditRestaurant'))
const JobTitle = lazy(() => import('./pages/JobTitle'))
const CreateJobTitle = lazy(() => import('./pages/CreateJobTitle'))
const EditJobTitle = lazy(() => import('./pages/EditJobTitle'))

function RoleBasedHomeRedirect() {
  const { isAuthenticated, isAdmin } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <Navigate to={isAdmin ? '/dashboard' : '/users'} replace />
}

function AppShell({ children }) {
  const { isAuthenticated } = useAuth()
  return (
    <>
      {isAuthenticated && <Navigation />}
      {children}
    </>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <Router basename={import.meta.env.BASE_URL}>
        <Suspense fallback={<Loading />}>
          <AppShell>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<RoleBasedHomeRedirect />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/users" element={<ProtectedRoute><User /></ProtectedRoute>} />
              <Route path="/users/add" element={<ProtectedRoute><CreateUser /></ProtectedRoute>} />
              <Route path="/users/edit/:id" element={<ProtectedRoute><EditUser /></ProtectedRoute>} />
              <Route path="/assignments" element={<ProtectedRoute><Assignment /></ProtectedRoute>} />
              <Route path="/assignments/add" element={<ProtectedRoute><CreateAssignment /></ProtectedRoute>} />
              <Route path="/assignments/edit/:id" element={<ProtectedRoute><EditAssignment /></ProtectedRoute>} />
              <Route path="/restaurants" element={<ProtectedRoute><Restaurant /></ProtectedRoute>} />
              <Route path="/restaurants/add" element={<ProtectedRoute><CreateRestaurant /></ProtectedRoute>} />
              <Route path="/restaurants/edit/:id" element={<ProtectedRoute><EditRestaurant /></ProtectedRoute>} />
              <Route path="/job-titles" element={<ProtectedRoute><JobTitle /></ProtectedRoute>} />
              <Route path="/job-titles/add" element={<ProtectedRoute><CreateJobTitle /></ProtectedRoute>} />
              <Route path="/job-titles/edit/:id" element={<ProtectedRoute><EditJobTitle /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppShell>
        </Suspense>
      </Router>
    </ErrorBoundary>
  )
}

export default App