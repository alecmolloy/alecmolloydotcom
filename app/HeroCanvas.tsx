'use client'
import { Container, Flex, Text as Txt } from '@radix-ui/themes'
import { Canvas } from '@react-three/fiber'
import { instrumentSerif, workSans } from './fonts'
import { CameraStartY, Scene } from './Scene'

export const HeroCanvas = () => {
  return (
    <Container
      height={{
        initial: 'calc(100vh - 96px)',
        md: 'calc(100vh - 32px)',
      }}
      position='relative'
    >
      <Flex px='4' pb='8' direction='column' height='100%'>
        <Flex
          direction='row'
          justify='center'
          align='center'
          style={{ position: 'relative' }}
        >
          <Flex
            direction='row'
            align='center'
            gap='2'
            position='absolute'
            left='0'
          >
            <Txt
              size='5'
              weight='medium'
              style={{
                color: '#000',
                borderRadius: '8px',
                cursor: 'default',
              }}
            >
              NYC / Lisbon
            </Txt>
          </Flex>
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
          <a
            className={['header-button', workSans.className].join(' ')}
            href='mailto:workwith@alecmolloy.com'
            style={{
              textDecoration: 'none',
              textDecorationThickness: 1.5,
              textDecorationStyle: 'wavy',
              textDecorationColor: '#000',
              textUnderlineOffset: 4,
              position: 'absolute',
              right: 0,
            }}
          >
            <Txt
              size='5'
              weight='medium'
              style={{
                color: '#000',
                // borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Contact
            </Txt>
          </a>
        </Flex>
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
