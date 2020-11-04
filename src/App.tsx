import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router'
import { AuthProvider } from './context/auth'

import './assets/css/buttons.css'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
