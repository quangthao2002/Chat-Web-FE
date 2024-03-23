interface Layout {
  area: number
  cols: number
  rows: number
  width: number
  height: number
}

interface FullscreenElement extends HTMLElement {
  msRequestFullscreen?: () => void
  mozRequestFullScreen?: () => void
  webkitRequestFullscreen?: () => void
}

export function calculateLayout(
  containerWidth: number,
  containerHeight: number,
  videoCount: number,
  aspectRatio: number,
): Layout {
  let bestLayout: Layout = {
    area: 0,
    cols: 0,
    rows: 0,
    width: 0,
    height: 0,
  }

  for (let cols = 1; cols <= videoCount; cols++) {
    const rows = Math.ceil(videoCount / cols)
    const hScale = containerWidth / (cols * aspectRatio)
    const vScale = containerHeight / rows
    let width: number, height: number

    if (hScale <= vScale) {
      width = Math.floor(containerWidth / cols)
      height = Math.floor(width / aspectRatio)
    } else {
      height = Math.floor(containerHeight / rows)
      width = Math.floor(height * aspectRatio)
    }

    const area = width * height
    if (area > bestLayout.area) {
      bestLayout = { area, width, height, rows, cols }
    }
  }

  return bestLayout
}

export function toggleFullscreen(fullscreen: boolean, element: FullscreenElement): void {
  if (fullscreen) {
    switch (true) {
      case "requestFullscreen" in element:
        ;(element as FullscreenElement).requestFullscreen?.()
        break
      case "msRequestFullscreen" in element:
        ;(element as FullscreenElement).msRequestFullscreen?.()
        break
      case "mozRequestFullScreen" in element:
        ;(element as FullscreenElement).mozRequestFullScreen?.()
        break
      case "webkitRequestFullscreen" in element:
        ;(element as FullscreenElement).webkitRequestFullscreen?.()
        break
    }
  } else {
    switch (true) {
      case "exitFullscreen" in document:
        ;(document as Document & { exitFullscreen?: () => void }).exitFullscreen?.()
        break
      case "mozCancelFullScreen" in document:
        ;(document as Document & { mozCancelFullScreen?: () => void }).mozCancelFullScreen?.()
        break
      case "webkitExitFullscreen" in document:
        ;(document as Document & { webkitExitFullscreen?: () => void }).webkitExitFullscreen?.()
        break
      case "msExitFullscreen" in document:
        ;(document as Document & { msExitFullscreen?: () => void }).msExitFullscreen?.()
        break
    }
  }
}
