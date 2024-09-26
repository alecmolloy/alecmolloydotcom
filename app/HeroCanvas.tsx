'use client'
import { Container, Flex, Text as Txt } from '@radix-ui/themes'
import { Canvas } from '@react-three/fiber'
import { instrumentSerif } from './fonts'
import { CameraStartY, Scene } from './Scene'

export const HeroCanvas = () => {
  return (
    <Container
      height={{
        initial: 'calc(100vh - 96px)',
        md: 'calc(100vh - 32px)',
      }}
    >
      <Flex px='4' pb='8' direction='column' height='100%'>
        <Txt
          style={{
            whiteSpace: 'pre-wrap',
          }}
          my={{ initial: '4', sm: '4' }}
          size='9'
          align='center'
          className={instrumentSerif.className}
        >
          Alec&nbsp;Molloy Dot&nbsp;Com
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
