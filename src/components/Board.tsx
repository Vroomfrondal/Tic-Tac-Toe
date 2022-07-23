import React, { useState, useRef, useEffect } from 'react'
import Square from './Square'
import './Board.css'
import { sleep } from '../utils/sleep'

const Board = () => {
  const [playerTurn, setPlayerTurn] = useState('X')
  const [prevPlayerTurn, setPrevPlayerTurn] = useState('O')
  const [gameHistory, setGameHistory] = useState<string[]>([
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

  const handlePlayerClick = (e: any, squareIndex: number) => {
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
    e.target.innerHTML = playerTurn
  }

  const resetGame = () => {
    // Reset Player and Game History States
    setPlayerTurn((prevTurn) => (prevTurn = 'X'))
    setPrevPlayerTurn((prevTurn) => (prevTurn = 'O'))
    setGameHistory(
      (prevMovesArr) => (prevMovesArr = ['', '', '', '', '', '', '', '', ''])
    )

    // Clear X's and O's rendered on DOM
    const boardMarks = document.querySelectorAll('#player-mark')
    boardMarks.forEach((element) => (element.innerHTML = ''))

    console.warn(`** Board history cleared **`)
  }

  const undoPreviousMove = () => {}

  // TODO: useEffect will need to listen for win condition
  // TODO: win condition
  // TODO: prevent element that has been clicked from being reclicked

  return (
    <>
      <section className="game_header">
        <span className="current_move_message">Current Move: {playerTurn}</span>
        <button type="reset" className="game_header_button" onClick={resetGame}>
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
