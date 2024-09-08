import { MeshTransmissionMaterial } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { createNoise4D } from 'simplex-noise'
import * as THREE from 'three'

export function Void() {
  // const bumpTexture = useMemo(() => {
  //   const canvas = document.createElement('canvas')
  //   canvas.width = 2048
  //   canvas.height = 512
  //   const ctx = canvas.getContext('2d')
  //   if (ctx) {
  //     ctx.fillStyle = 'black'
  //     ctx.fillRect(0, 0, canvas.width, canvas.height)
  //     ctx.font = `60px ${instrumentSerif.style.fontFamily}`
  //     ctx.fillStyle = 'white'
  //     ctx.textAlign = 'center'
  //     ctx.textBaseline = 'middle'
  //     ctx.fillText('Alec Molloy', canvas.width / 2, canvas.height / 2)
  //   }
  //   return new THREE.CanvasTexture(canvas)
  // }, [])

  const bumpTexture = useMemo(() => {
    return new THREE.TextureLoader().load('/void-texture.png')
  }, [])

  useEffect(() => {
    return () => {
      bumpTexture.dispose()
    }
  }, [bumpTexture])

  const meshRef = useRef<THREE.Mesh>(null)
  const noise4D = useMemo(() => createNoise4D(), [])
  const originalPositions = useRef<Float32Array>()

  useFrame(({ clock }) => {
    if (meshRef.current && meshRef.current.geometry) {
      const geometry = meshRef.current.geometry
      const positions = geometry.attributes.position

      if (!originalPositions.current) {
        originalPositions.current = positions.array.slice() as Float32Array
      }

      for (let i = 0; i < positions.count; i++) {
        const x = originalPositions.current[i * 3]
        const y = originalPositions.current[i * 3 + 1]
        const z = originalPositions.current[i * 3 + 2]

        const time = clock.elapsedTime
        const noise = noise4D(x * 0.1, y * 0.1, z * 0.1, time * 0.1)

        positions.setXYZ(i, x + noise * 2, y + noise * 2, z + noise * 2)
      }

      // Add gentle wobble rotation effect
      if (meshRef.current) {
        const wobbleAmplitude = 0.15 // Adjust this value to control the intensity of the wobble
        const wobbleFrequency = 0.5 // Adjust this value to control the speed of the wobble

        meshRef.current.rotation.x =
          Math.sin(clock.elapsedTime * wobbleFrequency) * wobbleAmplitude
        meshRef.current.rotation.y =
          Math.cos(clock.elapsedTime * wobbleFrequency * 1.3) *
            wobbleAmplitude +
          Math.PI / 2
        meshRef.current.rotation.z =
          Math.sin(clock.elapsedTime * wobbleFrequency * 0.7) * wobbleAmplitude
      }

      positions.needsUpdate = true
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 200]} scale={[0.05, 1, 1]}>
      <icosahedronGeometry args={[200, 4]} />
      <MeshTransmissionMaterial
        transmissionSampler={false}
        backside={false}
        samples={16}
        resolution={2048}
        transmission={1}
        roughness={0.15}
        thickness={20}
        ior={1.5}
        chromaticAberration={0.5}
        anisotropy={0.1}
        distortion={0.1}
        clearcoat={1}
        attenuationDistance={0.5}
        attenuationColor='#ffffff'
        color='#fff'
        bumpMap={bumpTexture}
        bumpScale={6}
      />
      <meshStandardMaterial />
    </mesh>
  )
}
