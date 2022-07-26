import React from 'react'
import './Modal.css'

function Modal({ open, onClose, winner }: any) {
  if (!open) return null

  return (
    <>
      <div className="blackout_background_modal_container"></div>
      <div className="modal">
        <section className="modal_content">
          <button onClick={onClose}>Reset Game</button>
          <div>{winner} Won</div>
        </section>
      </div>
    </>
  )
}

export default Modal
