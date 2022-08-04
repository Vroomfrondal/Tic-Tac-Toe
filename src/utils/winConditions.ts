import React from 'react'

const winConditions: number[][] = [
  [0, 3, 6], // Top row
  [0, 1, 2], // Left column
  [0, 4, 8], // Diagonal starting top left
  [2, 4, 6], // Diagonal starting bottom left
  [1, 4, 7], // Center row
  [3, 4, 5], // Center column
  [6, 7, 8], // Right column
  [2, 5, 8], // Bottom row
]

export default winConditions
