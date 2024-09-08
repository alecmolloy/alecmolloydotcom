'use client'
import { Container, Flex } from '@radix-ui/themes'
import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { TurtlePlane } from './TurtlePlane'
import { Void } from './Void'

export const HeroArtwork = () => {
  return (
    <Container pb='8'>
      <Flex
        id='hero'
        justify='center'
        align='center'
        height='72vh'
        style={{ backgroundColor: 'var(--international-orange-9)' }}
      >
        <Canvas
          camera={{
            position: [0, 0, 300],
            fov: 75,
          }}
        >
          <Void />
          <TurtlePlane />
          <OrbitControls />
          <Environment files='/studio027.exr' background />
        </Canvas>
      </Flex>
    </Container>
  )
}
