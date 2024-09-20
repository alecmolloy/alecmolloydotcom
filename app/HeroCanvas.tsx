'use client'
// possibly remove^^
import { Container, Flex, Text as Txt } from '@radix-ui/themes'
import { Canvas } from '@react-three/fiber'
import { instrumentSerif } from './fonts'
import { CameraStartY, Scene } from './Scene'

export const HeaderHeight = 45

export const HeroCanvas = () => {
  return (
    <Container height={`calc(100vh - ${HeaderHeight}px)`}>
      <Flex p='4' direction='column' gap='4' height='100%'>
        <Txt
          style={{
            whiteSpace: 'nowrap',
          }}
          size='9'
          align='center'
          className={instrumentSerif.className}
        >
          Alec Molloy
        </Txt>
        <Canvas
          orthographic
          camera={{
            position: [0, CameraStartY, 0],
            near: 0,
            far: 5000,
          }}
        >
          <Scene />
        </Canvas>
      </Flex>
    </Container>
  )
}
