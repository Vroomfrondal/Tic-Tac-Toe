import React, { useState } from 'react'
import './Square.css'

const Square = ({ num = 0, className = 'square', children, onClick }: any) => {
  return (
    <div className={className} onClick={onClick}>
      <span className="XO_playermove">{children}</span>
    </div>
  )
}

export default Square
