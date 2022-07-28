import React from 'react'
import './Modal.css'

function Modal({ open, onClose, winner }: any) {
  if (!open) return null

  let winMessage: string
  if (winner === 'X' || winner === 'O') winMessage = `${winner} Wins!`
  else winMessage = 'Draw!'

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
