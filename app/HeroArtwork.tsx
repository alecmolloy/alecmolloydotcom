'use client'
import { Flex } from '@radix-ui/themes'
import { Canvas } from '@react-three/fiber'
import { PerlinPlane } from './PerlinPlane'
import { Torus } from './Torus'

export const HeroArtwork = () => {
  return (
    <Flex
      id='hero'
      justify='center'
      align='center'
      height='100vh'
      width='100vw'
    >
      <Canvas
        orthographic
        camera={{ zoom: 1, position: [0, 0, 2048], near: 0.1, far: 2048 * 2 }}
      >
        <PerlinPlane />
        <Torus />
        {/* <OrbitControls /> */}
      </Canvas>
    </Flex>
  )
}
