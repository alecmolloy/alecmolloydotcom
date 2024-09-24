import { Canvas, useLoader, useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { Color, Mesh, ShaderMaterial, Texture, TextureLoader } from 'three'
import fragmentShader from './shaders/dithered.frag'
import vertexShader from './shaders/dithered.vert'

interface DitheredImageProps {
  imageUrl: string
  darkColor: string
  lightColor: string
  width: number
  height: number
}

interface DitheredMeshProps {
  imageUrl: string
  darkColor: string
  lightColor: string
}

const DitheredImage: React.FC<DitheredImageProps> = ({
  imageUrl,
  darkColor,
  lightColor,
  width,
  height,
}) => {
  return (
    <Canvas style={{ width, height }}>
      <DitheredMesh
        imageUrl={imageUrl}
        darkColor={darkColor}
        lightColor={lightColor}
      />
    </Canvas>
  )
}

const DitheredMesh: React.FC<DitheredMeshProps> = ({
  imageUrl,
  darkColor,
  lightColor,
}) => {
  const mesh = useRef<Mesh>(null)
  const { gl } = useThree()
  const texture = useLoader(TextureLoader, imageUrl) as Texture

  useEffect(() => {
    if (mesh.current) {
      const material = new ShaderMaterial({
        uniforms: {
          tDiffuse: { value: texture },
          darkColor: { value: new Color(darkColor) },
          lightColor: { value: new Color(lightColor) },
        },
        vertexShader,
        fragmentShader,
      })

      mesh.current.material = material
    }
  }, [texture, darkColor, lightColor])

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  )
}

export default DitheredImage
