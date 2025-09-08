import {createContext, useContext, useEffect, useMemo, useState} from 'react'
import {jwtDecode} from 'jwt-decode'

const AuthContext = createContext({
    isAuthenticated: false,
    userId: false,
    roles: [],
    isAdmin: false,
    isEmployee: false,
    login: () => {
    },
    logout: () => {
    }
})

export function AuthProvider({children}) {
    // Initialisation sécurisée du token
    const [token, setToken] = useState(() => {
        try {
            return localStorage.getItem('jwt');
        } catch (error) {
            console.error('Erreur lors de la lecture du token:', error)
            localStorage.removeItem('jwt')
            return null
        }
    })
    const [roles, setRoles] = useState([])
    const [userId, setUserId] = useState([])
    // Vérifier l'expiration du token après l'initialisation
    useEffect(() => {
        const checkTokenValidity = () => {
            try {
                // const tokenString = localStorage.getItem('jwt')
                if (!token) return

                // Utiliser l'expiry du token décodé au lieu du localStorage
                const decodedToken = jwtDecode(token)
                const now = Math.floor(Date.now() / 1000) // exp est en secondes
                setUserId(decodedToken.user_id);
                if (decodedToken.exp && now > decodedToken.exp) {
                    console.log('Token expiré, suppression...')
                    localStorage.removeItem('jwt')
                    setToken(null)
                }
            } catch (error) {
                console.error('Erreur lors de la vérification du token:', error)
                localStorage.removeItem('jwt')
                setToken(null)
            }
        }

        // Vérifier immédiatement au montage
        checkTokenValidity()
    }, []) // Se lance une seule fois au montage

    function decodeRoles(jwt) {
        if (!jwt) return []
        try {
            const info = jwtDecode(jwt)
            return Array.isArray(info?.roles) ? info.roles : []
        } catch (e) {
            console.error('Erreur lors du décodage des rôles:', e)
            return []
        }
    }

    useEffect(() => {
        setRoles(decodeRoles(token))
    }, [token])

    function login(newToken) {
        // Stocker directement le token sans wrapper
        localStorage.setItem('jwt', newToken)
        setToken(newToken)
    }

    function logout() {
        localStorage.removeItem('jwt')
        setToken(null)
        setRoles([])
    }

    const value = useMemo(() => {
        const isAuthenticated = !!token
        const isAdmin = roles.includes('ROLE_ADMIN')
        const isEmployee = roles.includes('ROLE_EMPLOYEE') && !isAdmin
        return {isAuthenticated, userId, roles, isAdmin, isEmployee, login, logout}
    }, [token, roles])
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)