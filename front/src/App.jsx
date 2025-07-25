import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import User from './pages/User'
import Assignment from './pages/Assignment'
import Restaurant from './pages/Restaurant'
import JobTitle from './pages/JobTitle'
import './App.css'

function App() {
  return (
    <Router>
      <div>
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