import { a, useSpring } from '@react-spring/three'
import { MeshTransmissionMaterial, useTexture } from '@react-three/drei'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { useGesture } from '@use-gesture/react'
import React from 'react'
import { createNoise4D } from 'simplex-noise'
import * as THREE from 'three'
import fragmentShader from './shaders/void.frag'
import vertexShader from './shaders/void.vert'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

type InteractionState = null | 'hovered' | 'grabbing'

interface VoidProps {
  position: [number, number, number]
  radius: number
  affectedByMouse: boolean
  wobbleAmplitude?: number
  wobbleFrequency?: number
  rotationXOffset?: number
}

export const Void: React.FunctionComponent<VoidProps> = ({
  radius,
  position,
  affectedByMouse,
  wobbleAmplitude = 0.05,
  wobbleFrequency = 0.5,
  rotationXOffset = Math.PI,
}) => {
  const [styles, api] = useSpring(() => ({
    rotation: [0, 0, 0] as [x: number, y: number, z: number],
    config: { mass: 1, tension: 170, friction: 26 },
  }))

  const [interactionState, setInteractionState] =
    React.useState<InteractionState>(null)

  const bind = useGesture(
    {
      onDrag: ({ delta: [dx, dy] }) => {
        setInteractionState('grabbing')
        api.set({
          rotation: [
            styles.rotation.get()[0] + dy / 300,
            styles.rotation.get()[1],
            styles.rotation.get()[2] - dx / 300,
          ] as [x: number, y: number, z: number],
        })
      },
      onDragEnd: () => {
        setInteractionState('hovered')
        api.start({
          rotation: [0, 0, 0] as [x: number, y: number, z: number],
        })
      },
    },
    {
      drag: {
        preventScroll: 0,
      },
    },
  )

  React.useEffect(() => {
    switch (interactionState) {
      case 'grabbing': {
        document.body.style.cursor = 'grabbing'
        break
      }
      case 'hovered': {
        document.body.style.cursor = 'grab'
        break
      }
      case null: {
        document.body.style.cursor = 'auto'
        break
      }
      default: {
        throw new Error(`Unhandled interaction state: ${interactionState}`)
      }
    }
  }, [interactionState])

  const frontTexture = useTexture(
    '/void/xp29_y4gg0s4x63x36x4s0ggzy0okkjgf811xgy1gx118fgjkkozw6226w1y2111x111y21w6226z462y227yd72y2264z264y24eyde4y2462zw64kmggoy28o8x8o8y2oggmk46zy0122cgv1o8y98o1vgc221zy732x6cxc6x23.png',
    (texture) => {
      texture.minFilter = THREE.NearestFilter
      texture.magFilter = THREE.NearestFilter
    },
  )

  const backTexture = useTexture('/void/ajnanam-bandhah.png', (texture) => {
    texture.minFilter = THREE.NearestFilter
    texture.magFilter = THREE.NearestFilter
  })

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
        frontTexture: { value: frontTexture },
        backTexture: { value: backTexture },
        time: { value: 0 },
      },
      vertexShader,
      fragmentShader,
    })
  }, [frontTexture, backTexture])

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
    const geometry = new THREE.IcosahedronGeometry(1, 4)
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
  }, [])

  // Calculate scale based on radius
  const scale = React.useMemo(() => {
    return [radius, radius, 0.125 * radius] as [number, number, number]
  }, [radius])

  const { size, gl } = useThree()
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })

  React.useEffect(() => {
    if (affectedByMouse === true) {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({
          x: (e.clientX / size.width) * 2 - 1,
          y: -(e.clientY / size.height) * 2 + 1,
        })
      }

      window.addEventListener('mousemove', handleMouseMove)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [affectedByMouse])

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

        const noiseX = noise4D(x, y, z, time * 0.1) * 0.03
        const noiseY = noise4D(y, z, x, time * 0.1) * 0.03
        const noiseZ = noise4D(z, x, y, time * 0.1) * 0.03

        positions.setXYZ(i, x + noiseX, y + noiseY, z + noiseZ)
      }

      positions.needsUpdate = true

      // Add gentle wobble rotation effect
      if (meshRef.current) {
        meshRef.current.rotation.x =
          Math.sin(clock.elapsedTime * wobbleFrequency) * wobbleAmplitude +
          rotationXOffset -
          Math.PI / 2
        meshRef.current.rotation.y =
          Math.cos(clock.elapsedTime * wobbleFrequency * 1.3) * wobbleAmplitude
        meshRef.current.rotation.z =
          Math.sin(clock.elapsedTime * wobbleFrequency * 0.7) *
            wobbleAmplitude -
          Math.PI
      }

      // Add mouse-following rotation
      const maxRotation = (5 * Math.PI) / 180 // 5 degrees in radians
      meshRef.current.rotation.x +=
        -mousePosition.y * maxRotation + rotationXOffset
      meshRef.current.rotation.y +=
        mousePosition.x * maxRotation +
        Math.cos(clock.elapsedTime * wobbleFrequency * 1.3) * wobbleAmplitude -
        Math.PI
      meshRef.current.rotation.z +=
        Math.sin(clock.elapsedTime * wobbleFrequency * 0.7) * wobbleAmplitude -
        Math.PI

      // Update bump material time uniform
      bumpMaterial.uniforms.time.value = clock.elapsedTime

      // Render the bump map to the render target
      gl.setRenderTarget(bumpRenderTarget)
      gl.render(bumpScene, bumpCamera)
      gl.setRenderTarget(null)
    }
  })

  return (
    // @ts-ignore
    <a.group
      position={position}
      {...styles}
      {...(affectedByMouse ? bind() : {})}
    >
      <mesh
        ref={meshRef}
        scale={scale}
        geometry={modifiedGeometry}
        onPointerOver={() => setInteractionState('hovered')}
        onPointerOut={() => setInteractionState(null)}
      >
        <MeshTransmissionMaterial
          backside={false}
          samples={16}
          resolution={2048}
          transmission={1}
          roughness={0.15}
          thickness={0.5}
          ior={1.5}
          chromaticAberration={0.5}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.3}
          temporalDistortion={0.1}
          clearcoat={1}
          attenuationDistance={0.15}
          attenuationColor='#ffffff'
          color='#444'
          bumpMap={bumpRenderTarget.texture}
          bumpScale={0.05 * radius}
        />
      </mesh>
      {/* @ts-ignore */}
    </a.group>
  )
}

useTexture.preload(
  '/void/xp29_y4gg0s4x63x36x4s0ggzy0okkjgf811xgy1gx118fgjkkozw6226w1y2111x111y21w6226z462y227yd72y2264z264y24eyde4y2462zw64kmggoy28o8x8o8y2oggmk46zy0122cgv1o8y98o1vgc221zy732x6cxc6x23.png',
)
useTexture.preload('/void/ajnanam-bandhah.png')
