import React from 'react'
import { SquareTypes } from '../typings'
import './Square.css'

const Square = ({ className, onClick, playerValue }: SquareTypes) => {
  return (
    <div className={className} onClick={onClick} id="player-mark">
      {playerValue}
    </div>
  )
}

export default Square
