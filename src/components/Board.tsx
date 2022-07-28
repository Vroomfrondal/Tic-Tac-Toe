import React, { useState, useEffect, SyntheticEvent } from 'react'
import Square from './Square'
import Modal from './Modal'
import './Board.css'
import { sleep } from '../utils/sleep'

// TODO: Bot as player 2?

const Board = () => {
  const [playerTurn, setPlayerTurn] = useState('X')
  const [prevPlayerTurn, setPrevPlayerTurn] = useState('O')
  const [gameHistory, setGameHistory] = useState<string[]>([])
  const [falseInput, setFalseInput] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState('Draw')
  const [modalOpenStatus, setModalOpenStatus] = useState(false)

  // Win Condition
  useEffect(() => {
    // Return true and update state if any marks on the board match possible winCondition combos
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
      setGameOver((status) => (status = true))
      setModalOpenStatus((status) => (status = true))
      setWinner((winner) => (winner = prevPlayerTurn))
    }

    // Draw
    if (gameHistory.length === 9 && !xWins && !oWins) {
      setGameOver((status) => (status = true))
      setModalOpenStatus((status) => (status = true))
      setWinner((winner) => (winner = 'Draw'))
    }
  }, [gameHistory])

  // Game-over
  useEffect(() => {
    if (gameOver === true) setModalOpenStatus((status) => (status = true))
  }, [gameOver])

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
      setFalseInput((status) => (status = false))

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
    } else {
      // Enable shake scren class if user clicks occupied <Square>
      const board = document.querySelector('.game_board')
      if (board) setFalseInput((status) => (status = true))
    }
  }

  const resetGame = () => {
    // Reset Player and Game History States
    setPlayerTurn((prevTurn) => (prevTurn = 'X'))
    setPrevPlayerTurn((prevTurn) => (prevTurn = 'O'))
    setGameHistory((prevArr) => (prevArr = []))
    setFalseInput((status) => (status = false))
    setGameOver((status) => (status = false))
    setModalOpenStatus((status) => (status = false))
    setWinner((winner) => (winner = 'Draw'))

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
      setGameOver((status) => (status = false))

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
            className="square left_top"
          />
          <Square
            onClick={(e: SyntheticEvent) => handlePlayerMove(e)}
            className="square left_middle"
          />
          <Square
            onClick={(e: SyntheticEvent) => handlePlayerMove(e)}
            className="square left_bottom"
          />
        </div>

        <div className="column_center">
          <Square
            onClick={(e: SyntheticEvent) => handlePlayerMove(e)}
            className="square center_top"
          />
          <Square
            onClick={(e: SyntheticEvent) => handlePlayerMove(e)}
            className="square center_middle"
          />
          <Square
            onClick={(e: SyntheticEvent) => handlePlayerMove(e)}
            className="square center_bottom"
          />
        </div>

        <div className="column_right">
          <Square
            onClick={(e: SyntheticEvent) => handlePlayerMove(e)}
            className="square right_top"
          />
          <Square
            onClick={(e: SyntheticEvent) => handlePlayerMove(e)}
            className="square right_middle"
          />
          <Square
            onClick={(e: SyntheticEvent) => handlePlayerMove(e)}
            className="square right_bottom"
          />
        </div>
      </section>

      <section>
        <Modal
          open={modalOpenStatus}
          onClose={() => {
            setModalOpenStatus(false)
            resetGame()
          }}
          winner={winner}
        ></Modal>
      </section>
    </>
  )
}

export default Board
