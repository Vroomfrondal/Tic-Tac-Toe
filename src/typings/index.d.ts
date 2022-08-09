import React, { SyntheticEvent, MouseEventHandler } from 'react'

type SquareTypes = {
  className: string
  onClick: (e: SyntheticEvent<Element, Event>) => void
  playerValue: string
}

type ModalTypes = {
  open: boolean
  winner: string
  onClose: MouseEventHandler<HTMLElement>
}
