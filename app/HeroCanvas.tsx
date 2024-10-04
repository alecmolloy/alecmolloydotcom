'use client'
import { Container, Flex, Text as Txt } from '@radix-ui/themes'
import { Canvas } from '@react-three/fiber'
import { instrumentSerif, instrumentSans } from './fonts'
import { CameraStartY, Scene } from './Scene'

export const HeroCanvas = () => {
  return (
    <Container
      height={{
        initial: 'calc(100vh - 96px)',
        md: 'calc(100vh - 32px)',
      }}
      minHeight='600px'
      position='relative'
    >
      <Flex px='4' pb='8' direction='column' height='100%'>
        <Flex
          id='header'
          direction='column'
          justify='center'
          align='center'
          style={{ position: 'relative' }}
          position='relative'
        >
          <Flex
            width={{
              initial: '20em',
              sm: 'auto',
            }}
            justify='center'
          >
            <Txt
              style={{
                whiteSpace: 'pre-wrap',
              }}
              my={{ initial: '3', sm: '4' }}
              mb={{ initial: '0', sm: '4' }}
              size='9'
              align='center'
              className={instrumentSerif.className}
            >
              Alec&nbsp;Molloy Dot&nbsp;Com
            </Txt>
          </Flex>
          <Flex
            direction='row'
            align='center'
            justify='between'
            width='100%'
            position={{ xs: 'absolute' }}
            my={{ initial: '2', sm: 'auto' }}
            height='100%'
          >
            <Txt
              className={instrumentSans.className}
              size='5'
              weight='medium'
              style={{
                color: '#000',
                borderRadius: '8px',
                cursor: 'default',
              }}
            >
              N.Y.C. / Lisbon
            </Txt>
            <a
              className={['header-button', instrumentSans.className].join(' ')}
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
                  cursor: 'pointer',
                }}
              >
                Contact
              </Txt>
            </a>
          </Flex>
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
