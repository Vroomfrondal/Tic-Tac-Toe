import React, { useState } from 'react'
import Square from './Square'
import './Board.css'
import { sleep } from '../utils/sleep'

const Board = () => {
  const [playerTurn, setPlayerTurn] = useState('X')
  const [prevPlayerTurn, setPrevPlayerTurn] = useState('O')
  const [boardMoves, setBoardMoves] = useState<string[]>([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ])

  const handlePlayerClick = (e: any, squareIndex: any) => {
    // Update Players Turn
    playerTurn === 'X'
      ? setPlayerTurn((prevTurn: string) => (prevTurn = 'O'))
      : setPlayerTurn((prevTurn: string) => (prevTurn = 'X'))

    // Update Previous Player Turn
    prevPlayerTurn === 'O'
      ? setPrevPlayerTurn((prevTurn: string) => (prevTurn = 'X'))
      : setPrevPlayerTurn((prevTurn: string) => (prevTurn = 'O'))

    // Update Game History
    // if (boardMoves.length <= 9) {
    //   setBoardMoves((prevMovesArr) => [...prevMovesArr, prevPlayerTurn])
    //   console.log(`Board Moves: [${boardMoves}]`)
    // } else alert('Game Over. Click restart button.')

    // Draw Player move on board
    console.log(`Square clicked: ${squareIndex}`)
    e.target.innerText = playerTurn
  }

  const resetGame = () => {
    setPlayerTurn((prevTurn) => (prevTurn = 'X'))
    setPrevPlayerTurn((prevTurn) => (prevTurn = 'O'))
    // setBoardMoves((prevMovesArr) => (prevMovesArr = ['X']))
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

      <section className="game_board">
        <div className="column_left">
          <Square
            onClick={(e: any) => handlePlayerClick(e, 0)}
            className="left_column_top"
          />
          <Square
            onClick={(e: any) => handlePlayerClick(e, 1)}
            className="left_column_middle"
          />
          <Square
            onClick={(e: any) => handlePlayerClick(e, 2)}
            className="left_column_bottom"
          />
        </div>
        <div className="column_center">
          <Square
            onClick={(e: any) => handlePlayerClick(e, 3)}
            className="center_column_top"
          />
          <Square
            onClick={(e: any) => handlePlayerClick(e, 4)}
            className="center_column_middle"
          />
          <Square
            onClick={(e: any) => handlePlayerClick(e, 5)}
            className="center_column_bottom"
          />
        </div>
        <div className="column_right">
          <Square
            onClick={(e: any) => handlePlayerClick(e, 6)}
            className="right_column_top"
          />
          <Square
            onClick={(e: any) => handlePlayerClick(e, 7)}
            className="right_column_middle"
          />
          <Square
            onClick={(e: any) => handlePlayerClick(e, 8)}
            className="right_column_bottom"
          />
        </div>
      </section>
    </>
  )
}

export default Board
