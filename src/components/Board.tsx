import React, { useState, useEffect, SyntheticEvent } from 'react'
import Square from './Square'
import './Board.css'
import { sleep } from '../utils/sleep'

// TODO: Modal popup when gameOver state === true

// TODO: Fancy effects: show playerTurn X or O when hovering square
// TODO: Display Game History
// TODO: Bot as player 2?
// TODO: <section> element for players to see live-status of game like in browser console

const Board = () => {
  const [playerTurn, setPlayerTurn] = useState('X')
  const [prevPlayerTurn, setPrevPlayerTurn] = useState('O')
  const [gameHistory, setGameHistory] = useState<string[]>([])
  const [falseInput, setFalseInput] = useState(false)
  const [gameOver, setGameOver] = useState(false) // ! MODAL POPup

  // Win Condition
  useEffect(() => {
    // Return true and set gameOver state if any board marks combo matches possible winCondition combo
    const boardMarks = document.querySelectorAll('#player-mark')
    const xWins = winConditions.some((condition) => {
      return condition.every((index) => {
        return boardMarks[index].innerHTML === 'X'
      })
    })
    const oWins = winConditions.some((condition) => {
      return condition.every((index) => {
        return boardMarks[index].innerHTML === 'O'
      })
    })

    if (xWins || oWins) {
      console.warn('A player won')
      setGameOver((oldStatus) => (oldStatus = true))
    }
  }, [gameHistory])

  // Shake Screen on False input (CSS)
  useEffect(() => {
    setTimeout(() => {
      setFalseInput(false)
    }, 1000)
  }, [falseInput])

  const winConditions = [
    [0, 3, 6], // Top row
    [0, 1, 2], // Left column
    [0, 4, 8], // Diagonal starting top left
    [2, 4, 6], // Diagonal starting bottom left
    [1, 4, 7], // Center row
    [3, 4, 5], // Center column
    [6, 7, 8], // Right column
    [2, 5, 8], // Bottom row
  ]

  const handlePlayerMove = (e: any) => {
    // Click Validation
    if (
      e.target.innerHTML !== 'X' &&
      e.target.innerHTML !== 'O' &&
      gameHistory.length < 9
    ) {
      // Turn off shake screen class since we have valid input
      setFalseInput((oldStatus) => (oldStatus = false))

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

      // console.log(`Square Clicked: ${squareClicked}`)
    } else {
      // Enable shake scren class if user clicks occupied <Square>
      const board = document.querySelector('.game_board')
      if (board) setFalseInput(true)
    }
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

      <section
        className={falseInput ? 'game_board_when_input_error' : 'game_board'}
      >
        <div className="column_left">
          <Square
            onClick={(e: SyntheticEvent) => handlePlayerMove(e)}
            className="left_column_top"
          />
          <Square
            onClick={(e: SyntheticEvent) => handlePlayerMove(e)}
            className="left_column_middle"
          />
          <Square
            onClick={(e: SyntheticEvent) => handlePlayerMove(e)}
            className="left_column_bottom"
          />
        </div>

        <div className="column_center">
          <Square
            onClick={(e: SyntheticEvent) => handlePlayerMove(e)}
            className="center_column_top"
          />
          <Square
            onClick={(e: SyntheticEvent) => handlePlayerMove(e)}
            className="center_column_middle"
          />
          <Square
            onClick={(e: SyntheticEvent) => handlePlayerMove(e)}
            className="center_column_bottom"
          />
        </div>

        <div className="column_right">
          <Square
            onClick={(e: SyntheticEvent) => handlePlayerMove(e)}
            className="right_column_top"
          />
          <Square
            onClick={(e: SyntheticEvent) => handlePlayerMove(e)}
            className="right_column_middle"
          />
          <Square
            onClick={(e: SyntheticEvent) => handlePlayerMove(e)}
            className="right_column_bottom"
          />
        </div>
      </section>
    </>
  )
}

export default Board
