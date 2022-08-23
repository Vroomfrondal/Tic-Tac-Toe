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
  const [undoPicture, setUndoPicture] = useState<string[][]>([Array(9).fill(null)])
  const [moveHistoryPicture, setMoveHistoryPicture] = useState<string[][]>([])

  // Win/Lose/Draw Condition
  useEffect(() => {
    // Return true if any marks on the board match a possible winCondition combo
    const boardMarks = document.querySelectorAll('#player-mark')
    const xWins = winConditions.some((condition) =>
      condition.every((index) => boardMarks[index].innerHTML === 'X')
    )
    const oWins = winConditions.some((condition) =>
      condition.every((index) => boardMarks[index].innerHTML === 'O')
    )

    if (xWins || oWins) {
      setGameOver(true)
      setModalOpenStatus(true)
      setWinner(xWins ? 'X' : 'O')
    } else if (moveHistory.length === 9 && !xWins && !oWins) {
      setGameOver(true)
      setModalOpenStatus(true)
      setWinner('draw')
    }
  }, [moveHistory])

  // Game-over Modal
  useEffect(() => {
    if (gameOver === true) setModalOpenStatus(true)
  }, [gameOver])

  // CSS Shake Board on bad input
  useEffect(() => {
    setTimeout(() => {
      setFalseInput(false)
    }, 1000)
  }, [falseInput])

  // set undo states to default when board cleared by undo functionality
  useEffect(() => {
    if (undoPicture.length === 1) {
      setUndoPicture([Array(9).fill(null)])
      setMoveHistoryPicture([[]])
    }
  }, [boardState])

  // update move-undo state each time a move happens
  useEffect(() => {
    setMoveHistoryPicture((arr) => arr.filter((items) => items.length <= moveHistory.length))
  }, [moveHistory])

  // Player X gets first move by default
  useEffect(() => {
    if (moveHistoryPicture.length === 1) setPlayerTurn('X')
  }, [moveHistoryPicture])

  const resetGame = () => {
    setPlayerTurn('X')
    setWinner('Draw')
    setMoveHistory([])
    setMoveHistoryPicture([])
    setBoardState(Array(9).fill(null))
    setFalseInput(false)
    setGameOver(false)
    setModalOpenStatus(false)
    setUndoPicture([Array(9).fill(null)])
    console.warn(`** Board history cleared **`)
  }

  const undoLastMove = () => {
    if (moveHistory.length > 0) {
      // Find most recently added move in undoPicture array and pop value
      undoPicture.forEach((_, index) => {
        const moveToUndo = moveHistory.length - 1

        if (index === moveToUndo) {
          setBoardState([...undoPicture[index]])
          setUndoPicture((arr) =>
            arr.filter((item) => item !== undoPicture[undoPicture.length - 1])
          )

          // Filtering out all moves after the undo move
          setMoveHistory((arr) => arr.filter((_, index) => index !== arr.length - 1))
          setMoveHistoryPicture((arr) =>
            arr.filter((item) => item !== moveHistoryPicture[moveHistoryPicture.length - 1])
          )

          playerTurn === 'X' ? setPlayerTurn('O') : setPlayerTurn('X')
        }
      })
    }
  }

  const playGame = (index: number) => {
    if (boardState[index] !== null && moveHistory.length < 9) {
      const board = document.querySelector('.game_board')
      if (board) setFalseInput(true)
    } else {
      // Update the boardState with the index of the square the user clicked
      boardState[index] = playerTurn
      setBoardState([...boardState])
      setFalseInput(false)

      // Add current move to the undo states
      setMoveHistoryPicture((arr) => [...arr, [...moveHistory]])
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

  const undoToSpecificHistory = (target: number) => {
    if (moveHistory.length > 0) {
      undoPicture.forEach((_, index) => {
        if (index === target) {
          // Filter out all moves clicked after the move the user wants to undo to
          setBoardState([...undoPicture[target]])
          setUndoPicture((arr) => arr.filter((items) => items <= undoPicture[target]))
          setMoveHistory(moveHistoryPicture[index + 1])

          // Dynamically update the players position for undo
          if (index === moveHistory.length - 1)
            setPlayerTurn(() => ((moveHistory.length - 1) % 2 === 0 ? 'X' : 'O'))
        }
      })
    }
  }

  const UndoHistoryButton = ({ index }: any) => {
    return (
      <>
        <span
          className="pick_undo_button"
          onClick={() => {
            undoToSpecificHistory(index)
          }}
        >
          {index}
        </span>
      </>
    )
  }

  return (
    <>
      <section className="game_header">
        <span className="current_move_message">Current Move: {playerTurn}</span>
        <button type="reset" className="game_header_button" onClick={resetGame}>
          Reset Game
        </button>
        <button className="game_header_button" onClick={undoLastMove}>
          Undo Move
        </button>
      </section>

      <section>
        <div className="undoHistory_dom_container">
          <div>Return to move:</div>
          {undoPicture.map((_, index) => (
            <UndoHistoryButton key={index} index={index} />
          ))}
        </div>
      </section>

      <section className={falseInput ? 'game_board_when_input_error' : 'game_board'}>
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
