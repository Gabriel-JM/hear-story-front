import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState
} from 'react'
import { api } from '../service/api'

interface User {
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

  useEffect(() => {
    async function checkAuth() {
      try {
        if(localStorage.getItem('hear-story@token')) {
          const token = localStorage.getItem('hear-story@token')
          const response = await api.post('/login/refresh', { token })
  
          if(response.data.id) {
            setIsAuth(true)
            setUser(response.data)
          } else {
            setIsAuth(false)
            setUser({} as User)
          }
        }
      } catch(catchedError) {
        setIsAuth(false)
        setUser({} as User)
        console.warn(catchedError)
      }
    }

    checkAuth()
  }, [])

  function signIn(user: User) {
    localStorage.setItem('hear-story@token', user.token)
    setIsAuth(true)
    setUser(user)
  }

  function signOut() {
    localStorage.removeItem('hear-story@token')
    setIsAuth(false)
    setUser({} as User)
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
