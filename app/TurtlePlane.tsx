import { Size, useThree } from '@react-three/fiber'
import React from 'react'
import * as THREE from 'three'

const PixelScale = 24
const TurtleSquareSize = 12
const TurtleSquareHalf = TurtleSquareSize / 2

function getCanvasCellularDimensions(size: Size) {
  return {
    canvasCellWidth: Math.floor(size.width / PixelScale),
    canvasCellHeight: Math.floor(size.height / PixelScale),
  }
}

export const TurtlePlane: React.FunctionComponent = () => {
  const { size } = useThree()

  const mousePosition = React.useRef<null | { x: number; y: number }>(null)
  const { canvasCellWidth, canvasCellHeight } = React.useMemo(
    () => getCanvasCellularDimensions(size),
    [size],
  )

  const [turtleHorizontalImg, setTurtleHorizontalImg] =
    React.useState<HTMLImageElement | null>(null)
  const [turtleVerticalImg, setTurtleVerticalImg] =
    React.useState<HTMLImageElement | null>(null)

  const [canvas, setCanvas] = React.useState<HTMLCanvasElement | null>(null)
  const [canvasTexture, setCanvasTexture] =
    React.useState<THREE.CanvasTexture | null>(null)

  React.useEffect(() => {
    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = src
      })
    }

    Promise.all([
      loadImage('/images/turtle-corner-horizontal-square.png'),
      loadImage('/images/turtle-corner-vertical-square.png'),
    ])
      .then(([horizontalImg, verticalImg]) => {
        setTurtleHorizontalImg(horizontalImg)
        setTurtleVerticalImg(verticalImg)
      })
      .catch((error) => console.error('Error loading images:', error))
  }, [])

  React.useEffect(() => {
    if (canvasTexture) {
      canvasTexture.dispose()
    }
    const newCanvas = document.createElement('canvas')
    newCanvas.width = canvasCellWidth * PixelScale
    newCanvas.height = canvasCellHeight * PixelScale
    const ctx = newCanvas.getContext('2d')
    if (ctx) {
      ctx.imageSmoothingEnabled = false
    }
    const newTexture = new THREE.CanvasTexture(
      newCanvas,
      undefined,
      undefined,
      undefined,
      THREE.NearestFilter,
    )
    setCanvas(newCanvas)
    setCanvasTexture(newTexture)

    return () => {
      newTexture.dispose()
    }
  }, [canvasCellWidth, canvasCellHeight])

  React.useEffect(() => {
    if (canvas && turtleHorizontalImg && turtleVerticalImg && canvasTexture) {
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const canvasPixelWidth = canvasCellWidth * PixelScale
      const canvasPixelHeight = canvasCellHeight * PixelScale

      ctx.clearRect(0, 0, canvasPixelWidth, canvasPixelHeight)
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvasPixelWidth, canvasPixelHeight)

      ctx.fillStyle = 'black'

      for (let x = 0; x < canvasCellWidth; x += 1) {
        for (let y = 0; y < canvasCellHeight; y += 1) {
          if ((x + y) % 2 === 0) {
            ctx.fillRect(x * PixelScale, y * PixelScale, PixelScale, PixelScale)
          }
          if (x >= 1 && y >= 1) {
            const standingWaveDirection = (x + y) % 3 === 0
            ctx.drawImage(
              standingWaveDirection ? turtleHorizontalImg : turtleVerticalImg,
              x * PixelScale - TurtleSquareHalf,
              y * PixelScale - TurtleSquareHalf,
              TurtleSquareSize,
              TurtleSquareSize,
            )
          }
        }
      }
      canvasTexture.needsUpdate = true
    }
  }, [
    canvas,
    canvasTexture,
    canvasCellWidth,
    canvasCellHeight,
    turtleHorizontalImg,
    turtleVerticalImg,
  ])

  return (
    turtleHorizontalImg &&
    turtleVerticalImg &&
    canvasTexture && (
      <mesh
        key={`${canvasCellWidth}-${canvasCellHeight}`}
        onPointerMove={(e) => {
          if (e.uv != null) {
            mousePosition.current = {
              x: e.uv.x,
              y: e.uv.y,
            }
          }
        }}
        onPointerLeave={() => {
          mousePosition.current = null
        }}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry
          args={[canvasCellWidth * PixelScale, canvasCellHeight * PixelScale]}
        />
        <meshBasicMaterial map={canvasTexture} side={THREE.DoubleSide} />
      </mesh>
    )
  )
}
