import React, { useState } from 'react'

interface Handler {
  callback: (p: Uint8Array[][]) => void
}

const GenContainer = ({ handler } : {
  handler: Handler
}) => {
  const [ bmpArray, setColorTable ] = useState([] as Uint8Array[][])
  handler.callback = setColorTable
  return (
    <div className="img-container">
      {
        bmpArray.map((p, i) => <div key={i} className="pixel-line">
          {
            p.map((q, j) => <span key={`${i}${j}`} style={{ backgroundColor: `rgb(${q[2]},${q[1]},${q[0]})` }} />)
          }
        </div>)
      }
    </div>
  )
}

export default GenContainer
