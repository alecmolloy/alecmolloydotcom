'use client'
import { Flex, Grid, Text as Txt } from '@radix-ui/themes'
import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { TurtlePlane } from './TurtlePlane'
import { Void } from './Void'
import { instrumentSerif, workSans } from './fonts'

const CameraController = () => {
  const [viewportScrollY, setViewportScrollY] = useState(0)
  const cameraRef = useRef(new THREE.Vector3())

  useEffect(() => {
    const handleScroll = () => setViewportScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame(({ camera }) => {
    const targetY = 512 + (viewportScrollY / window.innerHeight) * 128
    const targetZ = 980 - ((viewportScrollY / window.innerHeight) * 980) / 2
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.1)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.1)
    cameraRef.current.copy(camera.position)
  })

  return null
}

export const HeroArtwork = () => {
  return (
    <Grid
      id='hero'
      height='calc(100vh - 60px)'
      columns='12'
      gap='4'
      pl='4'
      style={{ position: 'relative' }}
      mb='6'
    >
      <Flex
        px='4'
        direction='column'
        gap='6'
        style={{
          gridColumn: '1 / span 6',
          gridRow: '1',
          zIndex: 2,
        }}
      >
        <Txt
          style={{
            fontSize: 128,
            color: '#fff',
            lineHeight: '.58em',
            marginTop: 40,
            whiteSpace: 'nowrap',
          }}
          className={instrumentSerif.className}
        >
          Alec Molloy
        </Txt>
        <Txt className={workSans.className} size='8' style={{ color: 'white' }}>
          wants to make nice things for you
        </Txt>
      </Flex>
      <Flex
        style={{
          gridColumn: '3 / span 10',
          gridRow: '1',
          zIndex: 1,
        }}
      >
        <Canvas
          camera={{
            position: [0, 512, 640],
            fov: 75,
            far: 5000,
          }}
        >
          <CameraController />
          <Void position={[0, 256, 0]} radius={360} />
          <TurtlePlane />
          <OrbitControls target={[0, 60, 0]} enableZoom={false} />
          <Environment files='/studio027.exr' />
        </Canvas>
      </Flex>
    </Grid>
  )
}
