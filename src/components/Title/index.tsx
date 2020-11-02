import React from 'react'
import './title.css'
import BirdImage from '../../assets/img/bird.png'

function Title() {
  return (
    <header className="header">
      <div className="header-container">
        <h1>Hear Story</h1>
        <img src={BirdImage} alt="Singing Bird" />
      </div>
    </header>
  )
}

export default Title 
