'use client'
import { Flex, FlexProps } from '@radix-ui/themes'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import React, { CSSProperties } from 'react'
import * as THREE from 'three'
import fragmentShader from './shaders/dithered-sdf-waves.frag'
import vertexShader from './shaders/dithered-sdf-waves.vert'

/**
 * DitheredSDFWavesCanvas component renders a 2D dithered SDF waves texture
 * using react-three-fiber and a custom shader material.
 *
 * - It creates a canvas that fills its parent container using WebGL.
 * - A plane is rendered, which is assigned a custom ShaderMaterial
 *   using imported GLSL vertex and fragment shaders.
 * - The fragment shader generates dithered SDF waves, which is used
 *   to color the plane, producing a dithered SDF waves texture.
 */

interface DitheredSDFWavesCanvasProps {
  /** The size of each cell in the simplex noise grid. */
  darkColor: string
  lightColor: string
  pixelSize: number
  aspectRatio: CSSProperties['aspectRatio']
}

const DitheredSDFWavesCanvas: React.FC<
  DitheredSDFWavesCanvasProps & FlexProps
> = ({ darkColor, lightColor, pixelSize, aspectRatio, style, ...props }) => {
  return (
    <Flex
      width='100%'
      flexGrow='1'
      style={{ aspectRatio, minWidth: 0, minHeight: 0, ...style }}
      {...props}
    >
      <Canvas orthographic camera={{ zoom: 1, position: [0, 0, 100] }}>
        <SimplexNoiseMesh
          darkColor={darkColor}
          lightColor={lightColor}
          pixelSize={pixelSize}
        />
      </Canvas>
    </Flex>
  )
}

interface SimplexNoiseMeshProps {
  darkColor: string
  lightColor: string
  pixelSize: number
}

const SimplexNoiseMesh: React.FC<SimplexNoiseMeshProps> = ({
  darkColor,
  lightColor,
  pixelSize,
}) => {
  const mesh = React.useRef<THREE.Mesh>(null)
  const { size } = useThree()
  const materialRef = React.useRef<THREE.ShaderMaterial | null>(null)
  const bayerTexture = useLoader(
    THREE.TextureLoader,
    '/bayer16.png',
  ) as THREE.Texture

  React.useEffect(() => {
    if (mesh.current != null) {
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          resolution: {
            value: new THREE.Vector2(
              Math.floor(size.width),
              Math.floor(size.height),
            ),
          },
          tBayer: { value: bayerTexture },
          darkColor: { value: new THREE.Color(darkColor) },
          lightColor: { value: new THREE.Color(lightColor) },
          pixelSize: { value: pixelSize },
        },
        vertexShader,
        fragmentShader,
      })

      bayerTexture.minFilter = THREE.NearestFilter
      bayerTexture.magFilter = THREE.NearestFilter

      mesh.current.material = material
      materialRef.current = material

      mesh.current.scale.set(size.width, size.height, 1)
    }
  }, [size, darkColor, lightColor, pixelSize, bayerTexture])

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
export default DitheredSDFWavesCanvas
