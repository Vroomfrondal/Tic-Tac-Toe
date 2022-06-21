import React, { useState } from 'react'

const Cell = ({ num }: { num: any }) => {
  const handlePlayerClick = (num: any) => {
    alert(num)
  }

  return (
    <td
      onClick={() => {
        handlePlayerClick(num)
      }}
    >
      -
    </td>
  )
}

export default Cell
