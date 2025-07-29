import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
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



function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div>
          <Navigation />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<User />} />
              <Route path="/assignments" element={<Assignment />} />
              <Route path="/restaurants" element={<Restaurant />} />
              <Route path="/job-titles" element={<JobTitle />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </ErrorBoundary>
  )
}

export default App
