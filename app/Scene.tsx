'use client'
import { Environment, OrbitControls } from '@react-three/drei'
import { useEffect, useState } from 'react'
import * as THREE from 'three'
import { TurtlePlane } from './TurtlePlane'
import { Void } from './Void'
import { useThree } from '@react-three/fiber'

export const CameraStartY = 1024

export const Scene = () => {
  const { size } = useThree()
  const canvasWidth = size.width

  const [viewportScrollY, setViewportScrollY] = useState(0)
  const [environmentRotation, setEnvironmentRotation] = useState<THREE.Euler>(
    new THREE.Euler(0, 0, 0),
  )

  useEffect(() => {
    const handleScroll = () => setViewportScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const normalizedScrollY = Math.max(
      0,
      Math.min(1, viewportScrollY / window.innerHeight),
    )
    const rotationY = normalizedScrollY * Math.PI * 2 // Rotate up to 360 degrees
    setEnvironmentRotation(new THREE.Euler(-rotationY, +rotationY / 8, 0))
  }, [viewportScrollY])

  return (
    <>
      <Void position={[0, 128, 0]} radius={canvasWidth / (1104 / 240)} />
      <TurtlePlane />
      <OrbitControls target={[0, 128, 0]} enableZoom={false} />
      <Environment
        files='/studio027.exr'
        environmentRotation={environmentRotation}
      />
    </>
  )
}
