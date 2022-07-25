import React, { useState, useRef, SyntheticEvent } from 'react'
import Square from './Square'
import './Board.css'
import { sleep } from '../utils/sleep'

// TODO: win condition? (use useEffect)
// TODO: useRef for game board
// TODO: Bot as player 2?

const Board = () => {
  const [playerTurn, setPlayerTurn] = useState('X')
  const [prevPlayerTurn, setPrevPlayerTurn] = useState('O')
  const [gameHistory, setGameHistory] = useState<string[]>([])
  console.log(`Game History: [${gameHistory}]`)

  const handlePlayerMove = (e: any, squareClicked: number) => {
    // Has Square been previously clicked?
    if (
      e.target.innerHTML !== 'X' &&
      e.target.innerHTML !== 'O' &&
      gameHistory.length < 9
    ) {
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
      e.target.setAttribute('moveID', gameHistory.length)

      console.log(e)
    } else
      console.warn(
        'Square Taken or max moves hit. Use Effect will listen for win condition'
      )
  }

  const resetGame = () => {
    // Reset Player and Game History States
    setPlayerTurn((prevTurn) => (prevTurn = 'X'))
    setPrevPlayerTurn((prevTurn) => (prevTurn = 'O'))
    setGameHistory((prevArr) => (prevArr = []))

    // Clear X's and O's rendered on DOM
    const boardMarks = document.querySelectorAll('#player-mark')
    boardMarks.forEach((element) => {
      element.innerHTML = ''
      element.removeAttribute('moveID')
    })
    console.warn(`** Board history cleared **`)
  }

  const undoMove = () => {
    if (gameHistory.length > 0) {
      // Undo Player Turn
      playerTurn === 'X'
        ? setPlayerTurn((prevTurn: string) => (prevTurn = 'O'))
        : setPlayerTurn((prevTurn: string) => (prevTurn = 'X'))

      // Undo Prev Player Turn
      prevPlayerTurn === 'O'
        ? setPrevPlayerTurn((prevTurn: string) => (prevTurn = 'X'))
        : setPrevPlayerTurn((prevTurn: string) => (prevTurn = 'O'))

      // Update Game History by filtering last move from array
      setGameHistory((prevArr) =>
        prevArr.filter((move, index) => index !== prevArr.length - 1)
      )

      // Find most recently updated DOM Element moveID attribute and remove X or O from board
      const lastMoveID = gameHistory.length - 1
      const lastDomMarkOnBoard = Array.from(
        document.querySelectorAll(`[moveID = "${lastMoveID}"]`)
      )

      lastDomMarkOnBoard[0].innerHTML = ''
      lastDomMarkOnBoard[0].removeAttribute('moveID')
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
            onClick={(e: SyntheticEvent) => handlePlayerMove(e, 0)}
            className="left_column_top"
          />
          <Square
            onClick={(e: SyntheticEvent) => handlePlayerMove(e, 1)}
            className="left_column_middle"
          />
          <Square
            onClick={(e: SyntheticEvent) => handlePlayerMove(e, 2)}
            className="left_column_bottom"
          />
        </div>

        <div className="column_center">
          <Square
            onClick={(e: SyntheticEvent) => handlePlayerMove(e, 3)}
            className="center_column_top"
          />
          <Square
            onClick={(e: SyntheticEvent) => handlePlayerMove(e, 4)}
            className="center_column_middle"
          />
          <Square
            onClick={(e: SyntheticEvent) => handlePlayerMove(e, 5)}
            className="center_column_bottom"
          />
        </div>

        <div className="column_right">
          <Square
            onClick={(e: SyntheticEvent) => handlePlayerMove(e, 6)}
            className="right_column_top"
          />
          <Square
            onClick={(e: SyntheticEvent) => handlePlayerMove(e, 7)}
            className="right_column_middle"
          />
          <Square
            onClick={(e: SyntheticEvent) => handlePlayerMove(e, 8)}
            className="right_column_bottom"
          />
        </div>
      </section>
    </>
  )
}

export default Board
