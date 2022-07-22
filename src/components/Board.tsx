import React, { useState } from 'react'
import Square from './Square'
import './Board.css'
import { sleep } from '../utils/sleep'

// ? Board moves as object?

const Board = () => {
  const [playerTurn, setPlayerTurn] = useState('X')
  const [prevPlayerTurn, setPrevPlayerTurn] = useState('O')
  const [boardMoves, setBoardMoves] = useState<string[]>(['X'])

  const handlePlayerClick = () => {
    // Update Players Turn
    if (playerTurn === 'X' && boardMoves.length < 9)
      setPlayerTurn((prevTurn: string) => (prevTurn = 'O'))
    else setPlayerTurn((prevTurn: string) => (prevTurn = 'X'))

    // Update Previous Player Turn
    if (prevPlayerTurn === 'O' && boardMoves.length < 9)
      setPrevPlayerTurn((prevTurn: string) => (prevTurn = 'X'))
    else setPrevPlayerTurn((prevTurn: string) => (prevTurn = 'O'))

    // Update Game History
    if (boardMoves.length <= 9) {
      setBoardMoves((prevMovesArr) => [...prevMovesArr, prevPlayerTurn])
      console.log(`Board Moves: [${boardMoves}]`)
    } else alert('Game Over. Click restart button.')
  }

  const resetGame = () => {
    setPlayerTurn((prevTurn) => (prevTurn = 'X'))
    setPrevPlayerTurn((prevTurn) => (prevTurn = 'O'))
    setBoardMoves((prevMovesArr) => (prevMovesArr = ['X']))
    console.warn(`** Board history cleared **`)
  }

  // Live Game Info for Debugging
  // console.log(
  //   `Current Turn: "${playerTurn}"`,
  //   ',',
  //   `Previous Turn: "${prevPlayerTurn}"`
  // )

  return (
    <>
      <section className="game_header">
        <span className="current_move_message">Current Move: {playerTurn}</span>
        <button type="reset" className="game_reset_button" onClick={resetGame}>
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
