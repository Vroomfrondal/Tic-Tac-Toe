import React, { useState } from 'react'
import './Square.css'

const Square = ({ className = '', children, onClick }: any) => {
  return (
    <div onClick={onClick} className={className}>
      <span className="XO_playermove">{children}</span>
    </div>
  )
}

export default Square
