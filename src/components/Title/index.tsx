import React from 'react'
import './title.css'
import BirdImage from '../../assets/img/bird.png'

interface TitleProps {
  showImg?: boolean
}

function Title({ showImg = true }: TitleProps) {
  return (
    <header className="header">
      <div className="header-container">
        <h1>Hear Story</h1>
        {showImg && <img src={BirdImage} alt="Singing Bird" />}
      </div>
    </header>
  )
}

export default Title 
