import { useThree } from '@react-three/fiber'
import React from 'react'
import * as THREE from 'three'

const PixelScale = 20

export const TurtlePlane = () => {
  const { size } = useThree()

  const turtleCtxRef = React.useRef<CanvasRenderingContext2D | null>(null)
  const canvasTextureRef = React.useRef<THREE.CanvasTexture | null>(null)
  const mousePosition = React.useRef<null | { x: number; y: number }>(null)

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
    if (
      turtleCtxRef.current != null &&
      canvasTextureRef.current != null &&
      turtleHorizontalImg &&
      turtleVerticalImg
    ) {
      const canvasCellWidth = Math.floor(size.width / PixelScale)
      const canvasCellHeight = Math.floor(size.height / PixelScale)
      const canvasPixelWidth = canvasCellWidth * PixelScale
      const canvasPixelHeight = canvasCellHeight * PixelScale

      const ctx = turtleCtxRef.current
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvasPixelWidth, canvasPixelHeight)

      ctx.fillStyle = 'black'
      if (turtleHorizontalImg != null && turtleVerticalImg != null) {
        for (let x = 0; x < canvasCellWidth; x += 1) {
          for (let y = 0; y < canvasCellHeight; y += 1) {
            if ((x + y) % 2 === 0) {
              ctx.fillRect(
                x * PixelScale,
                y * PixelScale,
                PixelScale,
                PixelScale,
              )
            }
            if (x >= 1 && y >= 1) {
              const standingWaveDirection = (x + y) % 3 === 0
              const finalValue = standingWaveDirection
              ctx.drawImage(
                finalValue ? turtleHorizontalImg : turtleVerticalImg,
                x * PixelScale - 6,
                y * PixelScale - 6,
                12,
                12,
              )
            }
          }
        }
      }
      canvasTextureRef.current.needsUpdate = true
    }
  }, [size, turtleHorizontalImg, turtleVerticalImg])

  return (
    turtleHorizontalImg &&
    turtleVerticalImg && (
      <>
        {/* <mesh ref={meshRef} position={[0, 0, -10]}>
        <planeGeometry args={[TextureSize, TextureSize]} />
        <perlinNoiseMaterial ref={materialRef} side={THREE.DoubleSide} />
      </mesh> */}
        <mesh
          position={[0, 0, 0]}
          scale={2}
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
        >
          <planeGeometry args={[16 * PixelScale, 16 * PixelScale]} />
          <meshBasicMaterial
            map={canvasTextureRef.current}
            side={THREE.DoubleSide}
          />
        </mesh>
      </>
    )
  )
}
