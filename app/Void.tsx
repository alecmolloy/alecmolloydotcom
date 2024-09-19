import { MeshTransmissionMaterial, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React from 'react'
import { createNoise4D } from 'simplex-noise'
import * as THREE from 'three'
import fragmentShader from './void.frag'
import vertexShader from './void.vert'

interface VoidProps {
  position: [number, number, number]
  radius: number
  wobbleAmplitude?: number
  wobbleFrequency?: number
  rotationXOffset?: number
}

export const Void: React.FunctionComponent<VoidProps> = ({
  radius,
  position,
  wobbleAmplitude = 0.025,
  wobbleFrequency = 0.75,
  rotationXOffset = Math.PI,
}) => {
  const bumpTexture = useTexture(
    '/xp29_y4gg0s4x63x36x4s0ggzy0okkjgf811xgy1gx118fgjkkozw6226w1y2111x111y21w6226z462y227yd72y2264z264y24eyde4y2462zw64kmggoy28o8x8o8y2oggmk46zy0122cgv1o8y98o1vgc221zy732x6cxc6x23.png',
    (texture) => {
      texture.minFilter = THREE.NearestFilter
      texture.magFilter = THREE.NearestFilter
    },
  )

  const meshRef = React.useRef<THREE.Mesh>(null)
  const noise4D = React.useMemo(() => createNoise4D(), [])
  const originalPositions = React.useRef<Float32Array>()

  // Create a render target for the custom bump map
  const bumpRenderTarget = React.useMemo(() => {
    return new THREE.WebGLRenderTarget(2048, 1024)
  }, [])

  // Create custom shader material for bump map generation
  const bumpMaterial = React.useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        bumpTexture: { value: bumpTexture },
        time: { value: 0 },
      },
      vertexShader,
      fragmentShader,
    })
  }, [bumpTexture])

  // Create a scene and camera for rendering the bump map
  const bumpScene = React.useMemo(() => new THREE.Scene(), [])
  const bumpCamera = React.useMemo(
    () => new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1),
    [],
  )
  const bumpQuad = React.useMemo(
    () => new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bumpMaterial),
    [bumpMaterial],
  )
  bumpScene.add(bumpQuad)

  // Create a modified geometry with custom UV mapping
  const modifiedGeometry = React.useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(radius, 4)
    const uvAttribute = geometry.attributes.uv
    const newUVs = new Float32Array(uvAttribute.count * 2)

    for (let i = 0; i < uvAttribute.count; i++) {
      const u = uvAttribute.getX(i)
      const v = uvAttribute.getY(i)

      // Map UVs to the full 0-1 range
      newUVs[i * 2] = u
      newUVs[i * 2 + 1] = v
    }

    geometry.setAttribute('uv', new THREE.BufferAttribute(newUVs, 2))
    return geometry
  }, [radius])

  useFrame(({ gl, clock }) => {
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

        // Original size was 200
        const scaleFactor = radius / 200

        const noise = noise4D(x * 0.1, y * 0.1, z * 0.1, time * 0.1)

        positions.setXYZ(
          i,
          x + noise * (4 * scaleFactor),
          y + noise * (4 * scaleFactor),
          z + noise * (4 * scaleFactor),
        )
      }

      // Add gentle wobble rotation effect
      if (meshRef.current) {
        meshRef.current.rotation.x =
          Math.sin(clock.elapsedTime * wobbleFrequency) * wobbleAmplitude +
          rotationXOffset +
          0.25
        meshRef.current.rotation.y =
          Math.cos(clock.elapsedTime * wobbleFrequency * 1.3) * wobbleAmplitude
        meshRef.current.rotation.z =
          Math.sin(clock.elapsedTime * wobbleFrequency * 0.7) *
            wobbleAmplitude +
          Math.PI / 2
      }

      positions.needsUpdate = true

      // Update bump material time uniform
      bumpMaterial.uniforms.time.value = clock.elapsedTime

      // Render the bump map to the render target
      gl.setRenderTarget(bumpRenderTarget)
      gl.render(bumpScene, bumpCamera)
      gl.setRenderTarget(null)
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={[0.05, 1, 1]}
      geometry={modifiedGeometry}
    >
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
        color='#444'
        bumpMap={bumpRenderTarget.texture}
        bumpScale={6}
      />
    </mesh>
  )
}
