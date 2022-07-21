import React, { useState } from 'react'
import Square from './Square'
import './Board.css'

const Board = () => {
  const [playerTurn, setPlayerTurn] = useState('X')

  const handlePlayerClick = () => {
    if (playerTurn === 'X') {
      setPlayerTurn((prevTurn: any) => (prevTurn = 'O'))
      console.log(playerTurn)
    } else {
      setPlayerTurn((prevTurn: any) => (prevTurn = 'X'))
      console.log(playerTurn)
    }
  }

  return (
    <>
      <section className="game_header">
        <span className="current_move_message">Current Move: {playerTurn}</span>
        <button className="game_reset_button" id="game_reset_button">
          Reset Game
        </button>
      </section>

      <section className="game_board" onClick={handlePlayerClick}>
        <div className="column_left">
          <Square className="left_column_top" num={1} />
          <Square className="left_column_middle" num={2} />
          <Square className="left_column_bottom" num={3} />
        </div>
        <div className="column_center">
          <Square className="center_column_top" num={4} />
          <Square className="center_column_middle" num={5} />
          <Square className="center_column_bottom" num={6} />
        </div>
        <div className="column_right">
          <Square className="right_column_top" num={7} />
          <Square className="right_column_middle" num={8} />
          <Square className="right_column_bottom" num={9} />
        </div>
      </section>
    </>
  )
}

export default Board
