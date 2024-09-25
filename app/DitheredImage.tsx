'use client'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import fragmentShader from './shaders/dithered.frag'
import vertexShader from './shaders/dithered.vert'

interface DitheredImageProps {
  imageUrl: string
  darkColor: string
  lightColor: string
  maxWidth: number
  pixelSize: number // Add this line
}

interface DitheredMeshProps {
  imageUrl: string
  darkColor: string
  lightColor: string
  pixelSize: number // Add this line
}

const DitheredImage: React.FC<DitheredImageProps> = ({
  imageUrl,
  darkColor,
  lightColor,
  maxWidth,
  pixelSize, // Add this line
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
          pixelSize={pixelSize} // Add this line
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
}) => {
  const mesh = useRef<THREE.Mesh>(null)
  const { size, gl, scene } = useThree()
  const texture = useLoader(THREE.TextureLoader, imageUrl) as THREE.Texture

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
        },
        vertexShader,
        fragmentShader,
      })

      mesh.current.material = material

      // Adjust mesh scale to fit the canvas
      const aspectRatio = texture.image.height / texture.image.width
      mesh.current.scale.set(size.width, size.width * aspectRatio, 1)
    }
  }, [texture, darkColor, lightColor, size, pixelSize])

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
