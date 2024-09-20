'use client'
// possibly remove^^
import { Container, Flex, Text as Txt } from '@radix-ui/themes'
import { Canvas } from '@react-three/fiber'
import { instrumentSerif } from './fonts'
import { CameraStartY, Scene } from './Scene'

export const HeroCanvas = () => {
  return (
    <Container height={`calc(100vh - 32px)`}>
      <Flex p='4' pb='8' direction='column' gap='4' height='100%'>
        <Txt
          style={{
            whiteSpace: 'pre-wrap',
          }}
          mt='4'
          mb='0'
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
