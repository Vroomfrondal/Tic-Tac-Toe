import React from 'react'
import './Square.css'

const Square = ({ className = '', children, onClick }: any) => {
  return (
    <div id="player-mark" onClick={onClick} className={className}>
      <span>{children}</span>
    </div>
  )
}

export default Square
