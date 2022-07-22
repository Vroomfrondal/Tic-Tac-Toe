import React, { useState } from 'react'
import Square from './Square'
import './Board.css'
import { sleep } from '../utils/sleep'

const Board = () => {
  const [playerTurn, setPlayerTurn] = useState('X')
  const [prevPlayerTurn, setPrevPlayerTurn] = useState('O')
  const [boardMoves, setBoardMoves] = useState<string[]>(['X'])

  const handlePlayerClick = () => {
    // Update Players Turn
    if (playerTurn === 'X')
      setPlayerTurn((prevTurn: string) => (prevTurn = 'O'))
    else setPlayerTurn((prevTurn: string) => (prevTurn = 'X'))

    // Update Previous Player Turn
    if (prevPlayerTurn === 'X')
      setPrevPlayerTurn((prevTurn: string) => (prevTurn = 'O'))
    else setPrevPlayerTurn((prevTurn: string) => (prevTurn = 'X'))

    // Add to game history
    if (boardMoves.length <= 9) {
      setBoardMoves((prevArr) => [...prevArr, prevPlayerTurn])
      console.log(`Board Moves: [${boardMoves}]`)
    } else alert('Game Over. Click restart button')
  }

  const resetGame = () => {
    setBoardMoves(['X'])
    setPlayerTurn('X')
  }

  return (
    <>
      <section className="game_header">
        <span className="current_move_message">Current Move: {playerTurn}</span>
        <button className="game_reset_button" onClick={resetGame}>
          Reset Game
        </button>
      </section>

      <section className="game_board" onClick={handlePlayerClick}>
        <div className="column_left">
          <Square className="left_column_top" onClick={null} num={1} />
          <Square className="left_column_middle" onClick={null} num={2} />
          <Square className="left_column_bottom" onClick={null} num={3} />
        </div>
        <div className="column_center">
          <Square className="center_column_top" onClick={null} num={4} />
          <Square className="center_column_middle" onClick={null} num={5} />
          <Square className="center_column_bottom" onClick={null} num={6} />
        </div>
        <div className="column_right">
          <Square className="right_column_top" onClick={null} num={7} />
          <Square className="right_column_middle" onClick={null} num={8} />
          <Square className="right_column_bottom" onClick={null} num={9} />
        </div>
      </section>
    </>
  )
}

export default Board
