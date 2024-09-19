'use client'
import { Flex } from '@radix-ui/themes'
import { Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Link from 'next/link'
import React from 'react'
import { HeaderHeight } from './HeroCanvas'
import { Void } from './Void'

export const NavigationVoid = () => {
  const [showNavigation, setShowNavigation] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight - HeaderHeight
      setShowNavigation(window.scrollY >= scrollThreshold)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Link
      onClick={() => window.scrollTo({ top: 0 })}
      onDrag={(e) => e.preventDefault()}
      href='#'
      style={{ position: 'relative' }}
    >
      <Flex
        position='absolute'
        top='0'
        left='0'
        style={{
          borderRadius: 1000,
          backgroundImage: 'radial-gradient(circle, #0003, #0000)',
          width: 48 + 4,
          height: 48 + 4,
          opacity: showNavigation ? 0 : 1,
          transition: 'opacity 1s ease-in-out',
        }}
      />
      <Canvas
        style={{
          width: 48 + 4,
          height: 48 + 4,
          opacity: showNavigation ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
        }}
        orthographic
        camera={{
          position: [0, 150, 150],
          near: 0,
          far: 5000,
        }}
      >
        <Environment files='/studio027.exr' />
        <Void
          position={[0, 0, 0]}
          radius={24}
          wobbleAmplitude={0.4}
          wobbleFrequency={0.1}
        />
      </Canvas>
    </Link>
  )
}
