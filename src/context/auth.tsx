import React, {
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { useHistory } from 'react-router-dom'
import { api } from '../service/api'

interface User {
  id?: number
  name: string
  username: string
  token: string
}

interface AuthProviderProps {
  children: ReactElement
}

interface AuthContextActions {
  isAuth: boolean
  user: User
  signIn: (user: User) => void
  signOut: () => void
}

const AuthContext = createContext({} as AuthContextActions)

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [user, setUser] = useState({} as User)
  const history = useHistory()

  const withdrawUser = useCallback(() => {
    setIsAuth(false)
    setUser({} as User)
    history.push('/')
  }, [history])

  useEffect(() => {
    async function checkAuth() {
      try {
        if(localStorage.getItem('hear-story@token')) {
          const token = localStorage.getItem('hear-story@token')
          const response = await api.post('/login/refresh', { token })
  
          if(response.data.id) {
            setIsAuth(true)
            setUser(response.data)
            
            if(window.location.pathname === '/') {
              history.push('/dashboard')
            }
          } else {
            withdrawUser()
          }
        }
      } catch(catchedError) {
        withdrawUser()
        console.warn(catchedError)
      }
    }

    checkAuth()
  }, [history, withdrawUser])

  function signIn(user: User) {
    localStorage.setItem('hear-story@token', user.token)
    setIsAuth(true)
    setUser(user)
  }

  function signOut() {
    localStorage.removeItem('hear-story@token')
    withdrawUser()
  }

  const auth = {
    isAuth,
    user,
    signIn,
    signOut
  }

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}
