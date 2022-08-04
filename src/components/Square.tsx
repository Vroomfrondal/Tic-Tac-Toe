import React, { SyntheticEvent } from 'react'
import './Square.css'

type SquareTypes = {
  className: string
  onClick: (e: SyntheticEvent<Element, Event>) => void
  playerValue: string
}

const Square = ({ className, onClick, playerValue }: SquareTypes) => {
  return (
    <div className={className} onClick={onClick} id="player-mark">
      {playerValue}
    </div>
  )
}

export default Square
