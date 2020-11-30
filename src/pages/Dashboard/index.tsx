import React from 'react'
import { Link } from 'react-router-dom'
import AuthedTitle from '../../components/AuthedTitle'

import './dashboard.css'

function Dashboard() {
  return (
    <section className="dashboard-container">
      <AuthedTitle />

      <div className="dashboard-content">
        <Link to="/categorias">
          <button className="btn secondary">Categorias</button>
        </Link>
      </div>
    </section>
  )
}

export default Dashboard
