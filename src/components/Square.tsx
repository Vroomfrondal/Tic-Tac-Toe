import React, { SyntheticEvent } from 'react'
import './Square.css'

type SquareTypes = {
  className: string
  children?: JSX.Element | JSX.Element[]
  onClick: (e: SyntheticEvent<Element, Event>) => void
}

const Square = ({ className, children, onClick }: SquareTypes) => {
  return (
    <div className={className} onClick={onClick} id="player-mark">
      <span>{children}</span>
    </div>
  )
}

export default Square
