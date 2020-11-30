import React from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { useAuth } from '../context/auth'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import Categories from '../pages/Categories'

const allowedPaths = ['/', '/register']

function AppRouter() {
  const auther = useAuth()
  const history = useHistory()
  const isAllowedPath = allowedPaths.includes(window.location.pathname) 

  if(!auther.isAuth && !isAllowedPath) {
    history.push('/')
  }

  return (
    <Switch>
      <Route path='/' exact component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/categorias' component={Categories} />
    </Switch>
  )
}

export default AppRouter
