import React, { useState } from 'react'
import Cell from './Cell'

const Board = () => {
  const [playerTurn, setPlayerTurn] = useState('x')

  const determineTurn = () => {
    if (playerTurn === 'x') setPlayerTurn((prevTurn: any) => (prevTurn = 'o'))
    else setPlayerTurn((prevTurn: any) => (prevTurn = 'x'))
  }

  return (
    <div className="container">
      <table>
        Current Move: {playerTurn}
        <tbody>
          <tr>
            <Cell num={1} />
            <Cell num={2} />
            <Cell num={3} />
          </tr>
          <tr>
            <Cell num={4} />
            <Cell num={5} />
            <Cell num={6} />
          </tr>
          <tr>
            <Cell num={7} />
            <Cell num={8} />
            <Cell num={9} />
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Board
