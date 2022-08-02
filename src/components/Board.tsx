import React, { useState, useEffect } from 'react'
import winConditions from '../utils/winConditions'
import Square from './Square'
import Modal from './Modal'
import './Board.css'

const Board = () => {
  const [playerTurn, setPlayerTurn] = useState('X')
  const [winner, setWinner] = useState('Draw')
  const [gameHistory, setGameHistory] = useState<string[]>([])
  const [boardState, setBoardState] = useState(Array(9).fill(null))
  const [falseInput, setFalseInput] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [modalOpenStatus, setModalOpenStatus] = useState(false)

  // Win/Lose/Draw Condition
  useEffect(() => {
    // Return true if any marks on the board match possible winCondition combos on board
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
      setWinner((winner) => (winner = xWins ? 'X' : 'O'))
    }

    // Draw
    if (gameHistory.length === 9 && !xWins && !oWins) {
      setGameOver((status) => (status = true))
      setModalOpenStatus((status) => (status = true))
      setWinner((winner) => (winner = 'Draw'))
    }
  }, [gameHistory])

  // Game-over Modal
  useEffect(() => {
    if (gameOver === true) setModalOpenStatus((status) => (status = true))
  }, [gameOver])

  // Shake Board on false Square input
  useEffect(() => {
    setTimeout(() => {
      setFalseInput(false)
    }, 1000)
  }, [falseInput])

  const resetGame = () => {
    setPlayerTurn((prevTurn) => (prevTurn = 'X'))
    setWinner((winner) => (winner = 'Draw'))
    setGameHistory((prevArr) => (prevArr = []))
    setBoardState(() => Array(9).fill(null))
    setFalseInput((status) => (status = false))
    setGameOver((status) => (status = false))
    setModalOpenStatus((status) => (status = false))

    console.warn(`** Board history cleared **`)
  }

  const undoMove = () => {
    if (gameHistory.length < 9) {
      // Undo Player Turn
      playerTurn === 'X'
        ? setPlayerTurn((prevTurn: string) => (prevTurn = 'O'))
        : setPlayerTurn((prevTurn: string) => (prevTurn = 'X'))

      // Update Game History
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

  const playGame = (index: number) => {
    if (boardState[index] !== null && gameHistory.length < 9) {
      const board = document.querySelector('.game_board')
      if (board) setFalseInput((status) => (status = true))
    } else {
      boardState[index] = playerTurn
      setBoardState(() => [...boardState])
      setFalseInput((status) => (status = false))
      setGameHistory((prevArr) => [...prevArr, playerTurn])

      playerTurn === 'X'
        ? setPlayerTurn((prevTurn: string) => (prevTurn = 'O'))
        : setPlayerTurn((prevTurn: string) => (prevTurn = 'X'))
    }
  }

  const renderSquare = (index: number, className: string) => {
    return (
      <Square
        className={className}
        playerValue={boardState[index]}
        onClick={() => playGame(index)}
      />
    )
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
        <div>
          {renderSquare(0, 'square left_top')}
          {renderSquare(1, 'square left_middle')}
          {renderSquare(2, 'square left_bottom')}
        </div>

        <div>
          {renderSquare(3, 'square center_top')}
          {renderSquare(4, 'square center_middle')}
          {renderSquare(5, 'square center_bottom')}
        </div>

        <div>
          {renderSquare(6, 'square right_top')}
          {renderSquare(7, 'square right_middle')}
          {renderSquare(8, 'square right_bottom')}
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
