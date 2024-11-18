'use client'
import { useTexture } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Squircle } from '@squircle-js/react'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Img from 'next/image'
import React from 'react'
import * as THREE from 'three'
import fragmentShader from './shaders/dithered.frag'
import vertexShader from './shaders/dithered.vert'

interface DitheredMeshProps {
  /** The URL of the image to be dithered. */
  imageUrl: string
  /** The URL of the mask image to be used as the alpha channel. */
  maskUrl: string
  /** The color used for dark pixels in the dithered image. */
  darkColor: string
  /** The color used for light pixels in the dithered image. */
  lightColor: string
  /** The size of each pixel in the dithered output. */
  pixelSize: number
  /** The gamma correction factor to apply to the image. */
  gammaCorrection: number
  /** The lower bound for tone mapping, should be in the range [0, 1]. */
  toneMapLow: number
  /** The upper bound for tone mapping, should be in the range [0, 1]. */
  toneMapHigh: number
  /** The URL of the dithered image to use if noScript is true. */
  noScript?: StaticImport
}

interface DitheredImageProps extends DitheredMeshProps {
  /** The maximum width of the dithered image container. */
  maxWidth: number
}

const DitheredImage: React.FC<DitheredImageProps> = ({
  imageUrl,
  maskUrl,
  darkColor,
  lightColor,
  maxWidth,
  pixelSize,
  gammaCorrection,
  toneMapLow,
  toneMapHigh,
  noScript,
}) => {
  const [canvasSize, setCanvasSize] = React.useState({ width: 0, height: 0 })
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth
        const width = Math.min(containerWidth, maxWidth)
        const img = new Image()
        img.onload = () => {
          const aspectRatio = img.height / img.width
          const height = width * aspectRatio
          setCanvasSize({
            width: Math.round(width),
            height: Math.round(height),
          })
        }
        img.src = imageUrl
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [maxWidth, imageUrl])

  return (
    <div
      ref={containerRef}
      style={{
        maxWidth,
        width: '100%',
        position: 'sticky',
        top: 128,
      }}
    >
      <Squircle
        cornerRadius={32}
        // @ts-ignore
        height='100%'
        style={{ overflow: 'hidden' }}
      >
        {noScript != null && (
          <noscript>
            <Img
              src={noScript}
              alt='Alec'
              style={{ width: '100%', height: '100%' }}
            />
          </noscript>
        )}
        <Canvas
          id='dithered-image-canvas'
          style={{ width: canvasSize.width, height: canvasSize.height }}
          orthographic
          camera={{ zoom: 1, position: [0, 0, 100] }}
        >
          <DitheredMesh
            imageUrl={imageUrl}
            maskUrl={maskUrl}
            darkColor={darkColor}
            lightColor={lightColor}
            pixelSize={pixelSize}
            gammaCorrection={gammaCorrection}
            toneMapLow={toneMapLow}
            toneMapHigh={toneMapHigh}
          />
        </Canvas>
      </Squircle>
    </div>
  )
}

const DitheredMesh: React.FC<DitheredMeshProps> = ({
  imageUrl,
  maskUrl,
  darkColor,
  lightColor,
  pixelSize,
  gammaCorrection,
  toneMapLow,
  toneMapHigh,
}) => {
  const mesh = React.useRef<THREE.Mesh>(null)
  const { size } = useThree()
  const image = useTexture(imageUrl)
  const bayerTexture = useTexture('/bayer-16.png')
  const maskTexture = useTexture(maskUrl)
  const materialRef = React.useRef<THREE.ShaderMaterial | null>(null)

  React.useEffect(() => {
    if (mesh.current != null) {
      const material = new THREE.ShaderMaterial({
        uniforms: {
          tImage: { value: image },
          tMask: { value: maskTexture },
          tBayer: { value: bayerTexture },
          darkColor: {
            value: new THREE.Color(darkColor).convertLinearToSRGB(),
          },
          lightColor: {
            value: new THREE.Color(lightColor).convertLinearToSRGB(),
          },
          resolution: { value: new THREE.Vector2(size.width, size.height) },
          pixelSize: { value: pixelSize },
          textureSize: {
            value: new THREE.Vector2(image.image.width, image.image.height),
          },
          gammaCorrection: { value: gammaCorrection },
          toneMapLow: { value: THREE.MathUtils.clamp(toneMapLow, 0.0, 1.0) },
          toneMapHigh: { value: THREE.MathUtils.clamp(toneMapHigh, 0.0, 1.0) },
          time: { value: 0 },
        },
        vertexShader,
        fragmentShader,
      })

      bayerTexture.minFilter = THREE.NearestFilter
      bayerTexture.magFilter = THREE.NearestFilter

      mesh.current.material = material
      materialRef.current = material

      const aspectRatio = image.image.height / image.image.width
      mesh.current.scale.set(size.width, size.width * aspectRatio, 1)
    }
  }, [
    image,
    maskTexture,
    bayerTexture,
    darkColor,
    lightColor,
    size,
    pixelSize,
    toneMapLow,
    toneMapHigh,
    gammaCorrection,
  ])

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime()
    }
  })

  React.useEffect(() => {
    const handleResize = () => {
      if (
        mesh.current &&
        mesh.current.material instanceof THREE.ShaderMaterial
      ) {
        mesh.current.material.uniforms.resolution.value.set(
          size.width,
          size.height,
        )

        const aspectRatio = image.image.height / image.image.width
        mesh.current.scale.set(size.width, size.width * aspectRatio, 1)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [size, image])

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  )
}

export default DitheredImage

useTexture.preload('/bayer-16.png')
useTexture.preload('/alec.jpg')
useTexture.preload('/alec-mask.png')
