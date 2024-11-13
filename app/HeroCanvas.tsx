'use client'
import heroNoscript from '@/public/hero-noscript.png'
import { Container, Flex } from '@radix-ui/themes'
import { Canvas } from '@react-three/fiber'
import Img from 'next/image'
import { Header } from './Header'
import { CameraStartY, Scene } from './Scene'
import { defaultContainerProps } from './theme'

export const HeroCanvas = () => {
  return (
    <Flex
      direction='column'
      pb='8'
      height={{
        initial: 'calc(100vh - 96px)',
        sm: 'calc(100vh - 32px)',
      }}
      maxWidth='1136px'
      mx='auto'
      {...defaultContainerProps}
    >
      <Header ctaVariant='white' />
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
        style={{ flexGrow: 1 }}
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
  )
}
