'use client'
import { Canvas, useLoader, useThree, useFrame } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import fragmentShader from './shaders/dithered.frag'
import vertexShader from './shaders/dithered.vert'

interface DitheredMeshProps {
  /** The URL of the image to be dithered. */
  imageUrl: string
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
}

interface DitheredImageProps extends DitheredMeshProps {
  /** The maximum width of the dithered image container. */
  maxWidth: number
}

const DitheredImage: React.FC<DitheredImageProps> = ({
  imageUrl,
  darkColor,
  lightColor,
  maxWidth,
  pixelSize,
  gammaCorrection,
  toneMapLow,
  toneMapHigh,
}) => {
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth
        const width = Math.min(containerWidth, maxWidth)
        const img = new Image()
        img.onload = () => {
          const aspectRatio = img.height / img.width
          const height = width * aspectRatio
          console.log(width, height)
          setCanvasSize({ width, height })
        }
        img.src = imageUrl
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [maxWidth, imageUrl])

  return (
    <div ref={containerRef} style={{ maxWidth, width: '100%' }}>
      <Canvas
        style={{ width: canvasSize.width, height: canvasSize.height }}
        orthographic
        camera={{ zoom: 1, position: [0, 0, 100] }}
      >
        <DitheredMesh
          imageUrl={imageUrl}
          darkColor={darkColor}
          lightColor={lightColor}
          pixelSize={pixelSize}
          gammaCorrection={gammaCorrection}
          toneMapLow={toneMapLow}
          toneMapHigh={toneMapHigh}
        />
      </Canvas>
    </div>
  )
}

const DitheredMesh: React.FC<DitheredMeshProps> = ({
  imageUrl,
  darkColor,
  lightColor,
  pixelSize,
  gammaCorrection,
  toneMapLow,
  toneMapHigh,
}) => {
  const mesh = useRef<THREE.Mesh>(null)
  const { size, gl, scene } = useThree()
  const texture = useLoader(THREE.TextureLoader, imageUrl) as THREE.Texture
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)

  useEffect(() => {
    if (mesh.current) {
      const material = new THREE.ShaderMaterial({
        uniforms: {
          tDiffuse: { value: texture },
          darkColor: {
            value: new THREE.Color(darkColor).convertLinearToSRGB(),
          },
          lightColor: {
            value: new THREE.Color(lightColor).convertLinearToSRGB(),
          },
          resolution: { value: new THREE.Vector2(size.width, size.height) },
          pixelSize: { value: pixelSize },
          textureSize: {
            value: new THREE.Vector2(texture.image.width, texture.image.height),
          },
          gammaCorrection: { value: gammaCorrection },
          toneMapLow: { value: THREE.MathUtils.clamp(toneMapLow, 0.0, 1.0) },
          toneMapHigh: { value: THREE.MathUtils.clamp(toneMapHigh, 0.0, 1.0) },
          time: { value: 0 }, // Initialize time uniform
        },
        vertexShader,
        fragmentShader,
      })

      mesh.current.material = material
      materialRef.current = material // Store the material reference

      // Adjust mesh scale to fit the canvas
      const aspectRatio = texture.image.height / texture.image.width
      mesh.current.scale.set(size.width, size.width * aspectRatio, 1)
    }
  }, [texture, darkColor, lightColor, size, pixelSize, toneMapLow, toneMapHigh])

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime() // Update time uniform
    }
  })

  useEffect(() => {
    const handleResize = () => {
      if (
        mesh.current &&
        mesh.current.material instanceof THREE.ShaderMaterial
      ) {
        mesh.current.material.uniforms.resolution.value.set(
          size.width,
          size.height,
        )

        // Update mesh scale on resize
        const aspectRatio = texture.image.height / texture.image.width
        mesh.current.scale.set(size.width, size.width * aspectRatio, 1)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [size, texture])

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  )
}

export default DitheredImage
