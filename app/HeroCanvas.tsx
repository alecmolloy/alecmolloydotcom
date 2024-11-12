'use client'
import { CTA } from '@/components/CTA'
import { Container, Flex, Text as Txt } from '@radix-ui/themes'
import { Canvas } from '@react-three/fiber'
import { instrumentSerif } from './fonts'
import { CameraStartY, Scene } from './Scene'
import { defaultContainerProps } from './theme'
import Img from 'next/image'
import heroNoscript from '@/public/hero-noscript.png'

export const HeroCanvas = () => {
  return (
    <Container
      height={{
        initial: 'calc(100vh - 96px)',
        xs: 'calc(100vh - 32px)',
      }}
      minHeight='600px'
      maxHeight='1200px'
      position='relative'
      {...defaultContainerProps}
    >
      <Flex pb='8' direction='column' height='100%'>
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
            align='center'
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
              size='5'
              weight='medium'
              style={{
                color: '#000',
                borderRadius: '8px',
                cursor: 'default',
              }}
            >
              For Hire
            </Txt>
            <CTA variant='white' />
          </Flex>
        </Flex>
        <noscript
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Img
            src={heroNoscript}
            alt='hero'
            style={{
              width: 'auto',
              height: 'auto',
              maxWidth: '100%',
              maxHeight: '100%',
              display: 'block',
            }}
          />
        </noscript>
        <Canvas
          id='hero-canvas'
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
