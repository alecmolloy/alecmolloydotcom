'use client'
import { Flex, FlexProps } from '@radix-ui/themes'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import React, { CSSProperties } from 'react'
import * as THREE from 'three'
import fragmentShader from './shaders/dithered-sdf-waves.frag'
import vertexShader from './shaders/dithered-sdf-waves.vert'

interface DitheredSDFWavesCanvasProps {
  darkColor: string
  lightColor: string
  pixelSize: number
  aspectRatio: CSSProperties['aspectRatio']
  smoothstepWidth: number
  bandWidth: number
  numBands: number
  waveSize: number
  speed: number
}

const DitheredSDFWavesCanvas: React.FC<
  DitheredSDFWavesCanvasProps & FlexProps
> = ({
  darkColor,
  lightColor,
  pixelSize,
  aspectRatio,
  smoothstepWidth,
  bandWidth,
  numBands,
  waveSize,
  speed,
  style,
  ...props
}) => {
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
          smoothstepWidth={smoothstepWidth}
          bandWidth={bandWidth}
          numBands={numBands}
          waveSize={waveSize}
          speed={speed}
        />
      </Canvas>
    </Flex>
  )
}

interface SimplexNoiseMeshProps {
  darkColor: string
  lightColor: string
  pixelSize: number
  smoothstepWidth: number
  bandWidth: number
  numBands: number
  waveSize: number
  speed: number
}

const SimplexNoiseMesh: React.FC<SimplexNoiseMeshProps> = ({
  darkColor,
  lightColor,
  pixelSize,
  smoothstepWidth,
  bandWidth,
  numBands,
  waveSize,
  speed,
}) => {
  const mesh = React.useRef<THREE.Mesh>(null)
  const { size } = useThree()
  const materialRef = React.useRef<THREE.ShaderMaterial | null>(null)
  const noiseTexture = useLoader(
    THREE.TextureLoader,
    '/blue-noise-512.png',
  ) as THREE.Texture

  const seed = React.useRef(Math.random())

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
          tNoise: { value: noiseTexture },
          noiseTextureSize: { value: 512 },
          darkColor: { value: new THREE.Color(darkColor) },
          lightColor: { value: new THREE.Color(lightColor) },
          pixelSize: { value: pixelSize },
          smoothstepWidth: { value: smoothstepWidth },
          bandWidth: { value: bandWidth },
          numBands: { value: numBands },
          waveSize: { value: waveSize },
          speed: { value: speed },
          seed: { value: seed.current * 10000 },
        },
        vertexShader,
        fragmentShader,
      })

      noiseTexture.minFilter = THREE.NearestFilter
      noiseTexture.magFilter = THREE.NearestFilter

      mesh.current.material = material
      materialRef.current = material

      mesh.current.scale.set(size.width, size.height, 1)
    }
  }, [
    size,
    darkColor,
    lightColor,
    pixelSize,
    noiseTexture,
    smoothstepWidth,
    bandWidth,
    numBands,
    waveSize,
    speed,
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
