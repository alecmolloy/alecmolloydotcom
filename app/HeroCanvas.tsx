'use client'
import heroNoscript from '@/public/hero-noscript.png'
import { Flex } from '@radix-ui/themes'
import { Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Img from 'next/image'
import { Suspense } from 'react'
import { Header } from './Header'
import { CameraStartY, Scene } from './Scene'
import { defaultContainerProps } from './theme'
import { TurtleMeander } from './TurtleMeander'

export const HeroCanvas = () => {
  return (
    <Flex
      direction='column'
      pb='8'
      height={{
        initial: 'calc(100vh - 96px)',
        sm: 'calc(100vh - 32px)',
      }}
      minHeight={{ initial: '300px', sm: '600px' }}
      maxWidth='1136px'
      maxHeight='1500px'
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
      <Suspense fallback={<TurtleMeander height={20} />}>
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
      </Suspense>
    </Flex>
  )
}
