import { shaderMaterial, Texture, useTexture } from '@react-three/drei'
import { extend, ReactThreeFiber, useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import fragmentShader from './shaders/perlinNoise.frag'
import vertexShader from './shaders/perlinNoise.vert'

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace JSX {
    // eslint-disable-next-line no-unused-vars
    interface IntrinsicElements {
      perlinNoiseMaterial: ReactThreeFiber.Node<
        typeof THREE.ShaderMaterial & JSX.IntrinsicElements['shaderMaterial'],
        typeof THREE.ShaderMaterial
      >
    }
  }
}

const TextureSize = 16
const PixelScale = 24

const camera = new THREE.OrthographicCamera(
  -TextureSize / 2,
  TextureSize / 2,
  TextureSize / 2,
  -TextureSize / 2,
  -1,
  1,
)

const pixelBuffer = new Uint8Array(TextureSize * TextureSize)
// Create a render target
const renderTarget = new THREE.WebGLRenderTarget(TextureSize, TextureSize, {
  format: THREE.RedFormat,
})

const PerlinNoiseMaterial = shaderMaterial(
  {
    time: 0,
    aspect: 1.0,
    resolution: [TextureSize, TextureSize],
    renderToTexture: false,
  },
  vertexShader,
  fragmentShader,
)

extend({ PerlinNoiseMaterial })

export const PerlinPlane = () => {
  const meshRef = React.useRef<THREE.Mesh>(null)
  const materialRef = React.useRef<any>(null)
  const { size, viewport, gl } = useThree()

  const [planeSize, setPlaneSize] = React.useState(2)
  const [aspect, setAspect] = React.useState(1)

  React.useEffect(() => {
    const newAspect = size.width / size.height
    setPlaneSize(viewport.width)
    setAspect(newAspect)

    if (materialRef.current) {
      materialRef.current.resolution = [TextureSize, TextureSize]
    }
  }, [size, viewport.width])

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const canvasTextureRef = useRef<THREE.CanvasTexture | null>(null)
  const mousePosition = useRef<null | { x: number; y: number }>(null)

  const turtleHorizontalTexture = useTexture(
    '/images/turtle-corner-horizontal.png',
  )
  const turtleVerticalTexture = useTexture('/images/turtle-corner-vertical.png')
  const turtleHorizontalImageRef = useRef<HTMLImageElement | null>(null)
  const turtleVerticalImageRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    if (turtleHorizontalTexture.image) {
      turtleHorizontalImageRef.current = turtleHorizontalTexture.image
    }
    if (turtleVerticalTexture.image) {
      turtleVerticalImageRef.current = turtleVerticalTexture.image
    }
  }, [turtleHorizontalTexture, turtleVerticalTexture])

  // Create offscreen canvas and CanvasTexture
  useEffect(() => {
    canvasRef.current = document.createElement('canvas')
    canvasRef.current.width = TextureSize * PixelScale
    canvasRef.current.height = TextureSize * PixelScale
    ctxRef.current = canvasRef.current.getContext('2d', {
      colorSpace: 'display-p3',
    })
    canvasTextureRef.current = new THREE.CanvasTexture(
      canvasRef.current,
      undefined,
      undefined,
      undefined,
      THREE.NearestFilter,
    )
  }, [])

  useFrame(({ clock }) => {
    if (materialRef.current && meshRef.current) {
      materialRef.current.time = clock.getElapsedTime()
      materialRef.current.aspect = aspect

      // Render to texture
      materialRef.current.renderToTexture = true
      gl.setRenderTarget(renderTarget)
      gl.render(meshRef.current, camera)
      // Read render target pixels
      gl.readRenderTargetPixels(
        renderTarget,
        0,
        0,
        TextureSize,
        TextureSize,
        pixelBuffer,
      )
      gl.setRenderTarget(null)
      materialRef.current.renderToTexture = false
    }

    if (ctxRef.current != null && canvasTextureRef.current != null) {
      const ctx = ctxRef.current
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, TextureSize * PixelScale, TextureSize * PixelScale)
      // Draw the turtle image
      ctx.fillStyle = 'black'
      if (turtleHorizontalImageRef.current && turtleVerticalImageRef.current) {
        const mouseX = Math.ceil(
          (mousePosition.current?.x ?? Infinity) * TextureSize,
        )
        console.log(mousePosition.current?.x)
        const mouseY = Math.ceil(
          (1 - (mousePosition.current?.y ?? Infinity)) * TextureSize,
        )
        for (let x = 0; x < TextureSize; x += 1) {
          for (let y = 0; y < TextureSize; y += 1) {
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
              // const shouldTheValueBeFlipped =
              //   pixelBuffer[x + y * TextureSize] > 255 * 0.75
              const withinMouse =
                Math.abs(x - mouseX) <= 2 && Math.abs(y - mouseY) <= 2
              const finalValue = standingWaveDirection
              if (!withinMouse) {
                ctx.drawImage(
                  finalValue
                    ? turtleHorizontalImageRef.current
                    : turtleVerticalImageRef.current,
                  x * PixelScale - 6,
                  y * PixelScale - 5,
                  12,
                  11,
                )
              }
            }
          }
        }
      }
      canvasTextureRef.current.needsUpdate = true
    }
  })

  return (
    <>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <planeGeometry args={[TextureSize, TextureSize]} />
        <perlinNoiseMaterial ref={materialRef} side={THREE.DoubleSide} />
      </mesh>
      <mesh
        position={[0, 0, 0]}
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
        <planeGeometry
          args={[TextureSize * PixelScale, TextureSize * PixelScale]}
        />
        <meshBasicMaterial
          map={canvasTextureRef.current}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  )
}
