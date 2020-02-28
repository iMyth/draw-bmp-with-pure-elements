import React from 'react'

let uslStr = ''

const onUrlChange = (e: React.ChangeEvent) => {
  uslStr = (e.currentTarget as HTMLInputElement).value
}

const GenContainer = ({ grabBmp } : { grabBmp: (p: string) => void }) => {
  return (
    <div className="grab-image">
      <input placeholder="test.bmp, test2.bmp, ..." type="url" onChange={ onUrlChange } />
      <button onClick={ () => grabBmp(uslStr) }>Grab</button>
    </div>
  )
}

export default GenContainer
