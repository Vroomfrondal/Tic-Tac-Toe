import React, { useState, useEffect } from 'react'
import winConditions from '../utils/winConditions'
import Square from './Square'
import Modal from './Modal'
import './Board.css'

const Board = () => {
  const [playerTurn, setPlayerTurn] = useState('X')
  const [winner, setWinner] = useState('Draw')
  const [moveHistory, setMoveHistory] = useState<string[]>([])
  const [boardState, setBoardState] = useState(Array(9).fill(null))
  const [falseInput, setFalseInput] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [modalOpenStatus, setModalOpenStatus] = useState(false)
  const [undoPicture, setUndoPicture] = useState<string[][]>([
    Array(9).fill(null),
  ])

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
      setGameOver(true)
      setModalOpenStatus(true)
      setWinner(xWins ? 'X' : 'O')
    }

    // Draw
    if (moveHistory.length === 9 && !xWins && !oWins) {
      setGameOver(true)
      setModalOpenStatus(true)
      setWinner('draw')
    }
  }, [moveHistory])

  // Game-over Modal
  useEffect(() => {
    if (gameOver === true) setModalOpenStatus(true)
  }, [gameOver])

  // Shake Board on bad input
  useEffect(() => {
    setTimeout(() => {
      setFalseInput(false)
    }, 1000)
  }, [falseInput])

  // set undoPicture to default when board cleared by undo button
  useEffect(() => {
    if (undoPicture.length === 1)
      setUndoPicture((arr) => (arr = [Array(9).fill(null)]))
  }, [boardState])

  const resetGame = () => {
    setPlayerTurn('X')
    setWinner('Draw')
    setMoveHistory([])
    setBoardState(Array(9).fill(null))
    setFalseInput(false)
    setGameOver(false)
    setModalOpenStatus(false)
    setUndoPicture([Array(9).fill(null)])

    console.warn(`** Board history cleared **`)
  }

  const undoMove = () => {
    if (moveHistory.length > 0) {
      // Update board state with history array equal to last move
      for (let i = 0; i < undoPicture.length; i++) {
        const moveToUndo = moveHistory.length - 1
        const targetItteration = i === moveToUndo

        // Remove last state change from undoPicture
        if (targetItteration === true) {
          setBoardState((arr) => (arr = undoPicture[i]))
          setUndoPicture((arr) => arr.filter((item) => item !== undoPicture[i]))

          playerTurn === 'X' ? setPlayerTurn('O') : setPlayerTurn('X')

          setMoveHistory((arr) =>
            arr.filter((move, index) => index !== arr.length - 1)
          )
        }
      }
    } else console.warn('A player needs to make a move to undo!')
  }

  const playGame = (index: number) => {
    if (boardState[index] !== null && moveHistory.length < 9) {
      const board = document.querySelector('.game_board')
      if (board) setFalseInput(true)
    } else {
      // Update Board States with index of square clicked
      boardState[index] = playerTurn
      setBoardState(() => [...boardState])
      setFalseInput(false)
      setMoveHistory((arr) => [...arr, playerTurn])
      setUndoPicture((arr) => [...arr, [...boardState]])

      playerTurn === 'X' ? setPlayerTurn('O') : setPlayerTurn('X')
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
