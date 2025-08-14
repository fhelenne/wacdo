import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext({
  isAuthenticated: false,
  roles: [],
  isAdmin: false,
  isEmployee: false,
  login: () => {},
  logout: () => {},
  refreshFromStorage: () => {}
})

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('jwt'))
  const [roles, setRoles] = useState([])

  function decodeRoles(jwt) {
    if (!jwt) return []
    try {
      const info = jwtDecode(jwt)
      return Array.isArray(info?.roles) ? info.roles : []
    } catch (_) {
      return []
    }
  }

  useEffect(() => {
    setRoles(decodeRoles(token))
  }, [token])

  function login(newToken) {
    localStorage.setItem('jwt', newToken)
    setToken(newToken)
  }

  function logout() {
    localStorage.removeItem('jwt')
    setToken(null)
  }

  function refreshFromStorage() {
    setToken(localStorage.getItem('jwt'))
  }

  const value = useMemo(() => {
    const isAuthenticated = !!token
    const isAdmin = roles.includes('ROLE_ADMIN')
    const isEmployee = roles.includes('ROLE_EMPLOYEE') && !isAdmin
    return { isAuthenticated, roles, isAdmin, isEmployee, login, logout, refreshFromStorage }
  }, [token, roles])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}