import React, { useState } from 'react'
import './Square.css'

const Square = ({ num }: any) => {
  const handlePlayerClick = (num: any) => {
    alert(num)
  }

  return (
    <div
      className="square"
      onClick={() => {
        handlePlayerClick(num)
      }}
    ></div>
  )
}

export default Square
