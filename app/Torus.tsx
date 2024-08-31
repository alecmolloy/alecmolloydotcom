import React from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

export const Torus: React.FC = () => {
  const torusRef = React.useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = clock.getElapsedTime() * 0.05
      torusRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })

  return (
    <mesh ref={torusRef} position={[0, 0, 0]}>
      <torusKnotGeometry args={[300, 10, 512, 24, 8, 12]} />
      <meshStandardMaterial color={'black'} />
    </mesh>
  )
}
