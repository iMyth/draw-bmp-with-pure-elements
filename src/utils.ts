interface Blob {
  readonly size: number
  readonly type: string
  arrayBuffer(): Promise<ArrayBuffer>
  slice(start?: number, end?: number, contentType?: string): Blob
  stream(): ReadableStream<Uint8Array>
  text(): Promise<string>
}

const testUrl: string = 'test.bmp'

export const grabBmp = (url: string = testUrl) => {
  if (url.length === 0) {
    url = testUrl
  }
  return fetch(url).then(response => {
    return response.blob()
  }).then((blob) => {
    return (blob as Blob).stream().getReader().read()
  })
}

export const convertUint8ArrayToRGBColorTable = <T extends {
  length: number,
  slice: (index: number, end?: number) => T
}> (array: T, length: number): T[] => {
  if (length === 0) {
    throw new Error('Unexpected length')
  }
  let result = []
  for (var i = 0, l = array.length; i < l; i += length) {
    result.push(array.slice(i, i + length))
  }
  return result
}

export const getImgWidth = (bmpData: Uint8Array): number => {
  const widthArray = bmpData.slice(18, 21)
  return widthArray[0] | (widthArray[1] << 8) | (widthArray[2] << 16) | (widthArray[3] << 24)
}

export const getColorTableFromBMPBlob = (bmpData: Uint8Array) => {
  const headerSize = (bmpData[14] & 0xff) | ((bmpData[15] & 0xff) << 8) | ((bmpData[16] & 0xff) << 16) | ((bmpData[17] & 0xff) << 24)
  const width = getImgWidth(bmpData)
  return convertUint8ArrayToRGBColorTable(convertUint8ArrayToRGBColorTable(bmpData.slice(14 + headerSize), 3), width)
}
