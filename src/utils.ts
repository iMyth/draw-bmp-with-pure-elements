declare global {
  interface Blob {
    readonly size: number
    readonly type: string
    arrayBuffer(): Promise<ArrayBuffer>
    slice(start?: number, end?: number, contentType?: string): Blob
    stream(): ReadableStream<Uint8Array>
    text(): Promise<string>
  }
}

const testUrl: string = 'test.bmp'

export const grabBmp = (url: string = testUrl) => {
  if (url.length === 0) {
    url = testUrl
  }
  return fetch(url).then(response => {
    return response.blob()
  }).then((blob) => {
    return blob.stream().getReader().read()
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

export const combineNumbersFromUint8Array = (array: Uint8Array): number => {
  let result = 0
  array.forEach((item, index) => {
    result |= item << (index << 3)
  })
  return result
}

const IMG_WIDTH_INFO_START = 18
const IMG_WIDTH_INFO_END = 22

export const getImgWidth = (bmpData: Uint8Array): number => {
  return combineNumbersFromUint8Array(bmpData.slice(IMG_WIDTH_INFO_START, IMG_WIDTH_INFO_END))
}

const IMG_HEADER_SIZE_START = 14
const IMG_HEADER_SIZE_END = 18

export const getColorTableFromBMPBlob = (bmpData: Uint8Array) => {
  const headerSize = combineNumbersFromUint8Array(bmpData.slice(IMG_HEADER_SIZE_START, IMG_HEADER_SIZE_END))
  const width = getImgWidth(bmpData)
  return convertUint8ArrayToRGBColorTable(convertUint8ArrayToRGBColorTable(bmpData.slice(14 + headerSize), 3), width)
}
