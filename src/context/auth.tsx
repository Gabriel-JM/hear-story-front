import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState
} from 'react'
import jwt from 'jsonwebtoken'

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
    function checkAuth() {
      if(localStorage.getItem('hear-story@token')) {
        const payload = jwt.decode(
          localStorage.getItem('hear-story@token') as string,
          { complete: true }
        )

        console.log(payload)
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
