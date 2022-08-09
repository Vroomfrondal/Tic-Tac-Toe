import React from 'react'
import { ModalTypes } from '../typings'
import './Modal.css'

function Modal({ open, onClose, winner }: ModalTypes) {
  if (!open) return null

  let winMessage: string
  winner === 'X' || winner === 'O'
    ? (winMessage = `${winner} Wins!`)
    : (winMessage = 'Draw!')

  return (
    <>
      <div
        onClick={onClose}
        className="blackout_background_modal_container"
      ></div>

      <div className="modal">
        <section className="modal_content">
          <button className="modal_reset_button" onClick={onClose}>
            Reset Game
          </button>
          <span className="winner_text">{winMessage}</span>
        </section>
      </div>
    </>
  )
}

export default Modal
