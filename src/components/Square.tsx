import React, { SyntheticEvent } from 'react'
import './Square.css'

type SquareTypes = {
  className: string
  children?: string
  onClick: (e: SyntheticEvent<Element, Event>) => void
}

const Square = ({ className, onClick, children }: SquareTypes) => {
  return (
    <div id="player-mark" onClick={onClick} className={className}>
      <span>{children}</span>
    </div>
  )
}

export default Square
