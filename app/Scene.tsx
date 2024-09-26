'use client'
import { Environment } from '@react-three/drei'
import { useLoader, useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import * as THREE from 'three'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader'
import { TurtlePlane } from './TurtlePlane'
import { Void } from './Void'

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
    const rotationY = normalizedScrollY * Math.PI * 2
    setEnvironmentRotation(new THREE.Euler(-rotationY, +rotationY / 8, 0))
  }, [viewportScrollY])

  // Preload the environment map
  const envMap = useLoader(EXRLoader, '/studio027-small.exr')

  return (
    <>
      <Void
        radius={Math.min(240, canvasWidth / 2.75, size.height / 3)}
        position={[0, 256, 0]}
      />
      <TurtlePlane />
      <Environment map={envMap} environmentRotation={environmentRotation} />
    </>
  )
}
