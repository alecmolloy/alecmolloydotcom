'use client'
import { Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Link from 'next/link'
import React from 'react'
import { Void } from './Void'

export const NavigationVoid = () => {
  const [showNavigation, setShowNavigation] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight
      setShowNavigation(window.scrollY >= scrollThreshold)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Link
      onClick={() => window.scrollTo({ top: 0 })}
      href='#'
      style={{
        opacity: showNavigation ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
      }}
    >
      <Canvas
        style={{ width: 90, height: 90 }}
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
          radius={43}
          wobbleAmplitude={0.8}
          wobbleFrequency={0.1}
        />
      </Canvas>
    </Link>
  )
}
