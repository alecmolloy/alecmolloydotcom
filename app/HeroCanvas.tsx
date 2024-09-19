'use client'
import { Container, Flex, Text as Txt } from '@radix-ui/themes'
import { Canvas } from '@react-three/fiber'
import { instrumentSerif } from './fonts'
import { CameraStartY, Scene } from './Scene'

export const HeroCanvas = () => {
  return (
    <Container id='hero' height='calc(100vh - 45px)'>
      <Flex px='4' pb='4' direction='column' gap='6' height='100%'>
        <Txt
          style={{
            fontSize: 64,
            color: '#CDFF14',
            lineHeight: '.58em',
            marginTop: 40,
            whiteSpace: 'nowrap',
          }}
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
