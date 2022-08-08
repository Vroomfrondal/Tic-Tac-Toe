import React from 'react'

const playClickSound = (tone: string) => {
  const audio = new Audio(tone)
  audio.play()
}

export default playClickSound
