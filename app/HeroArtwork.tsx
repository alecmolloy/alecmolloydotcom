'use client'
import { Flex } from '@radix-ui/themes'
import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { HeaderHeight } from './Header'
import { TurtlePlane } from './TurtlePlane'
import { Void } from './Void'

export const HeroArtwork = () => {
  return (
    // <Container mb='8' size='4'>
    <Flex
      id='hero'
      justify='center'
      align='center'
      height='72vh'
      style={{
        backgroundColor: 'var(--international-orange-9)',
        height: `calc(95vh - ${HeaderHeight}px)`,
      }}
    >
      <Canvas
        camera={{
          position: [0, 360, 640],
          fov: 75,
          far: 5000,
        }}
      >
        <Void />
        <TurtlePlane />
        <OrbitControls target={[0, 60, 0]} enableZoom={false} />
        <Environment files='/studio027.exr' />
      </Canvas>
    </Flex>
    // </Container>
  )
}
