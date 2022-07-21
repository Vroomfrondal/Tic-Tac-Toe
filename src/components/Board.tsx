import React, { useState } from 'react'
import Square from './Square'
import './Board.css'

const Board = () => {
  const [playerTurn, setPlayerTurn] = useState('X')

  const determineTurn = () => {
    if (playerTurn === 'X') setPlayerTurn((prevTurn: any) => (prevTurn = 'O'))
    else setPlayerTurn((prevTurn: any) => (prevTurn = 'X'))
  }

  return (
    <>
      <section className="game-header">
        <span className="current-move-message">Current Move: {playerTurn}</span>
        <button className="game-reset-button" id="game_reset_button">
          Reset Game
        </button>
      </section>

      <section className="game-board">
        <div className="column">
          <Square num={1} />
          <Square num={2} />
          <Square num={3} />
        </div>
        <div className="column">
          <Square num={4} />
          <Square num={5} />
          <Square num={6} />
        </div>
        <div className="column">
          <Square num={7} />
          <Square num={8} />
          <Square num={9} />
        </div>
      </section>
    </>
  )
}

export default Board
