import React, { useState } from 'react'
import Square from './Square'
import './Board.css'
import { sleep } from '../utils/sleep'

// TODO: win condition? (use useEffect)
// TODO: prevent element that has been clicked from being ovewritten
// TODO: Bot as player 2?

const Board = () => {
  const [playerTurn, setPlayerTurn] = useState('X')
  const [prevPlayerTurn, setPrevPlayerTurn] = useState('O')
  const [gameHistory, setGameHistory] = useState<string[]>([])
  console.log(`Global Game History: [${gameHistory}]`)

  const handlePlayerMove = (e: any, squareClicked: number) => {
    // Update Players Turn
    playerTurn === 'X'
      ? setPlayerTurn((prevTurn: string) => (prevTurn = 'O'))
      : setPlayerTurn((prevTurn: string) => (prevTurn = 'X'))

    // Update Previous Player Turn
    prevPlayerTurn === 'O'
      ? setPrevPlayerTurn((prevTurn: string) => (prevTurn = 'X'))
      : setPrevPlayerTurn((prevTurn: string) => (prevTurn = 'O'))

    // Update Game History & Draw on Board
    setGameHistory((prevArr) => [...prevArr, playerTurn])
    e.target.innerHTML = playerTurn
    console.log(`Player clicked square: ${squareClicked}`)
  }

  const resetGame = () => {
    // Reset Player and Game History States
    setPlayerTurn((prevTurn) => (prevTurn = 'X'))
    setPrevPlayerTurn((prevTurn) => (prevTurn = 'O'))
    setGameHistory((prevArr) => (prevArr = []))

    // Clear X's and O's rendered on DOM
    const boardMarks = document.querySelectorAll('#player-mark')
    boardMarks.forEach((element) => (element.innerHTML = ''))
    console.warn(`** Board history cleared **`)
  }

  const undoMove = () => {
    if (gameHistory.length >= 1) {
      // Undo Player Turn
      playerTurn === 'X'
        ? setPlayerTurn((prevTurn: string) => (prevTurn = 'O'))
        : setPlayerTurn((prevTurn: string) => (prevTurn = 'X'))

      // Undo Prev Player Turn
      prevPlayerTurn === 'O'
        ? setPrevPlayerTurn((prevTurn: string) => (prevTurn = 'X'))
        : setPrevPlayerTurn((prevTurn: string) => (prevTurn = 'O'))

      // TODO: REMOVE DOM FROM BOARD
      // Update Game History by filtering last move from array
      setGameHistory((prevArr) =>
        prevArr.filter((move, index) => index !== prevArr.length - 1)
      )
    } else console.warn('A player needs to make a move to undo!')
  }

  return (
    <>
      <section className="game_header">
        <span className="current_move_message">Current Move: {playerTurn}</span>
        <button type="reset" className="game_header_button" onClick={resetGame}>
          Reset Game
        </button>
        <button className="game_header_button" onClick={undoMove}>
          Undo Move
        </button>
      </section>

      <section className="game_board">
        <div className="column_left">
          <Square
            onClick={(e: any) => handlePlayerMove(e, 0)}
            className="left_column_top"
          />
          <Square
            onClick={(e: any) => handlePlayerMove(e, 1)}
            className="left_column_middle"
          />
          <Square
            onClick={(e: any) => handlePlayerMove(e, 2)}
            className="left_column_bottom"
          />
        </div>

        <div className="column_center">
          <Square
            onClick={(e: any) => handlePlayerMove(e, 3)}
            className="center_column_top"
          />
          <Square
            onClick={(e: any) => handlePlayerMove(e, 4)}
            className="center_column_middle"
          />
          <Square
            onClick={(e: any) => handlePlayerMove(e, 5)}
            className="center_column_bottom"
          />
        </div>

        <div className="column_right">
          <Square
            onClick={(e: any) => handlePlayerMove(e, 6)}
            className="right_column_top"
          />
          <Square
            onClick={(e: any) => handlePlayerMove(e, 7)}
            className="right_column_middle"
          />
          <Square
            onClick={(e: any) => handlePlayerMove(e, 8)}
            className="right_column_bottom"
          />
        </div>
      </section>
    </>
  )
}

export default Board
