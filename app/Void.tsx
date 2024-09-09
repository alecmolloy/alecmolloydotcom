import { MeshTransmissionMaterial, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { createNoise4D } from 'simplex-noise'
import * as THREE from 'three'

export function Void() {
  const bumpTexture = useTexture(
    '/xp29_y4gg0s4x63x36x4s0ggzy0okkjgf811xgy1gx118fgjkkozw6226w1y2111x111y21w6226z462y227yd72y2264z264y24eyde4y2462zw64kmggoy28o8x8o8y2oggmk46zy0122cgv1o8y98o1vgc221zy732x6cxc6x23.png',
    (texture) => {
      texture.minFilter = THREE.NearestFilter
      texture.magFilter = THREE.NearestFilter
    },
  )

  const meshRef = useRef<THREE.Mesh>(null)
  const noise4D = useMemo(() => createNoise4D(), [])
  const originalPositions = useRef<Float32Array>()

  // Create a render target for the custom bump map
  const bumpRenderTarget = useMemo(() => {
    return new THREE.WebGLRenderTarget(2048, 1024)
  }, [])

  // Create custom shader material for bump map generation
  const bumpMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        bumpTexture: { value: bumpTexture },
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D bumpTexture;
        uniform float time;
        varying vec2 vUv;

        float random (vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        } 

        void main() {
          float totalFrames = 66.0;
          float initialLoop = 37.0;
          float loopLength = totalFrames - initialLoop;
          float currentTime = time * 2.0;
          float currentFrame;
          
          if (currentTime < totalFrames) {
            currentFrame = floor(mod(currentTime, totalFrames));
          } else {
            float timeAfterFirstLoop = currentTime - totalFrames;
            currentFrame = floor(initialLoop + mod(timeAfterFirstLoop, loopLength));
          }

          float column = mod(currentFrame, 6.0);
          float row = floor(currentFrame / 6.0);

          vec2 frameSize = vec2(1.0 / 6.0, 1.0 / 11.0);
          
          vec2 offset = vec2(column * frameSize.x, (10.0 - row) * frameSize.y); // Flip rows

          vec2 targetSize = vec2(${57 * 13}.0 / 2048.0, ${57 * 13}.0 / 1024.0);
          vec2 targetCenter = vec2(0.5, 0.5);
          vec2 targetStart = targetCenter - targetSize * 0.5;
          vec2 targetEnd = targetCenter + targetSize * 0.5;

          if (vUv.x >= targetStart.x && vUv.x <= targetEnd.x && vUv.y >= targetStart.y && vUv.y <= targetEnd.y) {
            vec2 remappedUV = (vUv - targetStart) / targetSize;
            
            vec2 frameUV = fract(remappedUV) * frameSize + offset;
            
            vec4 texColor = texture2D(bumpTexture, frameUV);
            
            gl_FragColor = texColor * (0.8 + 0.2 * random(remappedUV));
          } else {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
          }
        }
      `,
    })
  }, [bumpTexture])

  // Create a scene and camera for rendering the bump map
  const bumpScene = useMemo(() => new THREE.Scene(), [])
  const bumpCamera = useMemo(
    () => new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1),
    [],
  )
  const bumpQuad = useMemo(
    () => new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bumpMaterial),
    [bumpMaterial],
  )
  bumpScene.add(bumpQuad)

  // Create a modified geometry with custom UV mapping
  const modifiedGeometry = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(200, 4)
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
        const noise = noise4D(x * 0.1, y * 0.1, z * 0.1, time * 0.1)

        positions.setXYZ(i, x + noise * 4, y + noise * 4, z + noise * 4)
      }

      // Add gentle wobble rotation effect
      if (meshRef.current) {
        const wobbleAmplitude = 0.025 // Adjust this value to control the intensity of the wobble
        const wobbleFrequency = 0.75 // Adjust this value to control the speed of the wobble

        meshRef.current.rotation.x =
          Math.sin(clock.elapsedTime * wobbleFrequency) * wobbleAmplitude
        meshRef.current.rotation.y =
          Math.cos(clock.elapsedTime * wobbleFrequency * 1.3) * wobbleAmplitude
        meshRef.current.rotation.z =
          Math.sin(clock.elapsedTime * wobbleFrequency * 0.7) *
            wobbleAmplitude -
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
      position={[0, 12, 0]}
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
