import React from 'react'
import './Square.css'

type SquareTypes = {
  className: string
  onClick: any
  children?: string
}

const Square = ({ className, onClick, children }: SquareTypes) => {
  return (
    <div id="player-mark" onClick={onClick} className={className}>
      <span>{children}</span>
    </div>
  )
}

export default Square
