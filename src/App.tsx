import React from 'react'
import ImgGenerator from './components/ImgGenerator'
import GrabImage from './components/GrabImage'
import { grabBmp, getColorTableFromBMPBlob } from './utils'

const onGrab = async (url: string) => {
  const streamResult = await grabBmp(url)
  const colorTable = getColorTableFromBMPBlob(streamResult.value)
  return handler.callback(colorTable)
}

const handler = {
  callback: (p: Uint8Array[][]) => {}
}

function App() {
  return (
    <div className="App">
      <GrabImage grabBmp={ onGrab } />
      <ImgGenerator handler={ handler } />
    </div>
  )
}

export default App
