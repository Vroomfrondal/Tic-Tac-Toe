import React, { useState } from 'react'
import './Square.css'

const Square = ({ num = 0, className = '' }) => {
  return (
    <div
      className={className}
      onClick={() => {
        alert(num)
      }}
    >
      <span className="XO_playermove">X</span>
    </div>
  )
}

export default Square
