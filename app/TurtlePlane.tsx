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

export const TurtlePlane: React.FunctionComponent<{ voidRadius: number }> = ({
  voidRadius,
}) => {
  const { size } = useThree()

  const turtleCanvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const turtleCtxRef = React.useRef<CanvasRenderingContext2D | null>(null)
  const canvasTextureRef = React.useRef<THREE.CanvasTexture | null>(null)
  const mousePosition = React.useRef<null | { x: number; y: number }>(null)
  const { canvasCellWidth, canvasCellHeight } = React.useMemo(
    () => getCanvasCellularDimensions(size),
    [size],
  )

  const [turtleHorizontalImg, setTurtleHorizontalImg] =
    React.useState<HTMLImageElement | null>(null)
  const [turtleVerticalImg, setTurtleVerticalImg] =
    React.useState<HTMLImageElement | null>(null)

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
    const canvas = document.createElement('canvas')
    canvas.width = canvasCellWidth * PixelScale
    canvas.height = canvasCellHeight * PixelScale
    turtleCanvasRef.current = canvas
    turtleCtxRef.current = canvas.getContext('2d')
    canvasTextureRef.current = new THREE.CanvasTexture(
      canvas,
      undefined,
      undefined,
      undefined,
      THREE.NearestFilter,
    )
  }, [canvasCellWidth, canvasCellHeight])

  React.useEffect(() => {
    if (
      turtleCtxRef.current != null &&
      turtleCanvasRef.current != null &&
      turtleHorizontalImg &&
      turtleVerticalImg
    ) {
      // this is the width and height, if there was an issue, it would be here
      const canvasPixelWidth = canvasCellWidth * PixelScale
      const canvasPixelHeight = canvasCellHeight * PixelScale
      const centerX = Math.floor(canvasCellWidth / 2)
      const centerY = Math.floor(canvasCellHeight / 2)
      const voidRadiusCells = Math.floor(voidRadius / PixelScale + 2)

      const ctx = turtleCtxRef.current
      ctx.imageSmoothingEnabled = false
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
      if (canvasTextureRef.current) {
        canvasTextureRef.current.needsUpdate = true
      }
    }
  }, [
    canvasCellHeight,
    canvasCellWidth,
    turtleHorizontalImg,
    turtleVerticalImg,
    voidRadius,
  ])

  return (
    turtleHorizontalImg &&
    turtleVerticalImg && (
      <mesh
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
        <meshBasicMaterial
          map={canvasTextureRef.current}
          side={THREE.DoubleSide}
        />
      </mesh>
    )
  )
}
