'use client'
import { Flex } from '@radix-ui/themes'
import { Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Link from 'next/link'
import { Void } from './Void'

export const NavigationVoid = ({
  showNavigation,
}: {
  showNavigation: boolean
}) => {
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
          borderRadius: '100%',
          backgroundImage:
            'radial-gradient(circle, color-mix(in lch, var(--international-orange) 30%, transparent), transparent)',
          width: 48 + 4,
          height: 48 + 4,
          opacity: showNavigation ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />
      <Canvas
        style={{
          width: 48 + 4,
          height: 48 + 4,
          opacity: showNavigation ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
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
