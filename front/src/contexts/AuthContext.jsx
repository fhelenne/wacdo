import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext({
  isAuthenticated: false,
  roles: [],
  isAdmin: false,
  isEmployee: false,
  login: () => {},
  logout: () => {}
})

export function AuthProvider({ children }) {
    const tokenData = JSON.parse(localStorage.getItem('jwt'))
    if(localStorage.getItem('jwt')){
        const now = new Date()
        console.log(now.getTime());
        console.log(tokenData.expiry);
        if (now.getTime() > tokenData.expiry) {
            localStorage.removeItem('jwt')
        }
    }
  const [token, setToken] = useState(() => tokenData?.token)
  const [roles, setRoles] = useState([])

  function decodeRoles(jwt) {
    if (!jwt) return []
    try {
      const info = jwtDecode(jwt)
      return Array.isArray(info?.roles) ? info.roles : []
    } catch (e) {
      return [e]
    }
  }

  useEffect(() => {
    setRoles(decodeRoles(token))
  }, [token])

  function login(newToken) {

	const now = new Date()

	// `item` is an object which contains the original value
	// as well as the time when it's supposed to expire
	const item = {
		value: newToken,
		expiry: Number(import.meta.env.VITE_WACDO_TOKEN_TTL) + now.getTime(),
	}
	localStorage.setItem('jwt', JSON.stringify(item))
    setToken(newToken)
  }

  function logout() {
    localStorage.removeItem('jwt')
    setToken(null)
  }


  const value = useMemo(() => {
    const isAuthenticated = !!token
    const isAdmin = roles.includes('ROLE_ADMIN')
    const isEmployee = roles.includes('ROLE_EMPLOYEE') && !isAdmin
    return { isAuthenticated, roles, isAdmin, isEmployee, login, logout }
  }, [token, roles])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);