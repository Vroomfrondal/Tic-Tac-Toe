import React from 'react'

const sleep = (ms: number) => {
  const date = Date.now()
  let currDate = null
  do {
    currDate = Date.now()
  } while (currDate - date < ms)
  console.log(`Slept for ${ms / 1000} seconds.`)
}

export { sleep }
