import React from 'react'
import { useAuth } from '../../context/auth'

import './authedTitle.css'

function AuthedTitle() {
  const authValue = useAuth()

  return (
    <div className="title">
      <h1>Hear Story</h1>
      <p onClick={() => authValue.signOut()}>
        Bem vindo, {authValue.user.name}
      </p>
    </div>
  )
}

export default AuthedTitle
