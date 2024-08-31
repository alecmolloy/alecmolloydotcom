'use client'
import { Container, Flex } from '@radix-ui/themes'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { PerlinPlane } from './PerlinPlane'

export const HeroArtwork = () => {
  return (
    <Container pb='8'>
      <Flex
        id='hero'
        justify='center'
        align='center'
        height='80vh'
        style={{ backgroundColor: 'var(--international-orange-9)' }}
      >
        <Canvas
          orthographic
          camera={{
            zoom: 4,
            position: [0, 0, 100],
            near: -2048 * 2,
            far: 2048 * 2,
          }}
        >
          <PerlinPlane />
          <OrbitControls />
        </Canvas>
      </Flex>
    </Container>
  )
}
