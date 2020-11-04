import React from 'react'
import { useAuth } from '../../context/auth'

function Dashboard() {
  const authValue = useAuth()

  return (
    <p>Bem vindo, {authValue.user.name}!</p>
  )
}

export default Dashboard
