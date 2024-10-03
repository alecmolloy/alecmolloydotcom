'use client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import fragmentShader from './shaders/simplex-noise.frag'
import vertexShader from './shaders/simplex-noise.vert'

/**
 * SimplexNoiseCanvas component renders a 2D simplex noise texture
 * using react-three-fiber and a custom shader material.
 *
 * - It creates a canvas that fills its parent container using WebGL.
 * - A plane is rendered, which is assigned a custom ShaderMaterial
 *   using imported GLSL vertex and fragment shaders.
 * - The fragment shader generates simplex noise, which is used
 *   to color the plane, producing a grayscale noise texture.
 *
 * ### Features:
 * - The simplices in the noise grid are spaced based on the cellSize prop.
 * - The noise values are mapped from the range [-1, 1] to [0, 1] for
 *   proper display as grayscale values.
 * - The component is responsive and updates on window resize.
 * - Continuous animation is achieved using the useFrame hook.
 */
interface SimplexNoiseCanvasProps {
  /** The size of each cell in the simplex noise grid. */
  cellSize: number
}

const SimplexNoiseCanvas: React.FC<SimplexNoiseCanvasProps> = ({
  cellSize,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [canvasSize, setCanvasSize] = React.useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setCanvasSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        })
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <Canvas
        style={{ width: canvasSize.width, height: canvasSize.height }}
        orthographic
        camera={{ zoom: 1, position: [0, 0, 100] }}
      >
        <SimplexNoiseMesh cellSize={cellSize} />
      </Canvas>
    </div>
  )
}

interface SimplexNoiseMeshProps {
  cellSize: number
}

const SimplexNoiseMesh: React.FC<SimplexNoiseMeshProps> = ({ cellSize }) => {
  const mesh = React.useRef<THREE.Mesh>(null)
  const { size } = useThree()
  const materialRef = React.useRef<THREE.ShaderMaterial | null>(null)

  React.useEffect(() => {
    if (mesh.current != null) {
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          resolution: { value: new THREE.Vector2(size.width, size.height) },
          cellSize: { value: cellSize },
        },
        vertexShader,
        fragmentShader,
      })

      mesh.current.material = material
      materialRef.current = material

      mesh.current.scale.set(size.width, size.height, 1)
    }
  }, [size, cellSize])

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
        mesh.current.scale.set(size.width, size.height, 1)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [size])

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  )
}

export default SimplexNoiseCanvas
