'use client'
import { Box, Flex } from '@radix-ui/themes'
import { shaderMaterial } from '@react-three/drei'
import {
  Canvas,
  extend,
  ReactThreeFiber,
  useFrame,
  useThree,
} from '@react-three/fiber'
import React from 'react'
import * as THREE from 'three'
import { Mesh } from 'three'

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace JSX {
    // eslint-disable-next-line no-unused-vars
    interface IntrinsicElements {
      perlinNoiseMaterial: ReactThreeFiber.Node<
        typeof THREE.ShaderMaterial & JSX.IntrinsicElements['shaderMaterial'],
        typeof THREE.ShaderMaterial
      >
    }
  }
}

const PerlinNoiseMaterial = shaderMaterial(
  { time: 0, aspect: 1.0, resolution: [512, 512] },
  // Vertex shader remains unchanged
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Updated Fragment shader
  `
    uniform float time;
    uniform float aspect;
    uniform vec2 resolution;
    varying vec2 vUv;

    // Improved noise function
    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = fract(sin(dot(i, vec2(12.9898, 78.233))) * 43758.5453);
      float b = fract(sin(dot(i + vec2(1.0, 0.0), vec2(12.9898, 78.233))) * 43758.5453);
      float c = fract(sin(dot(i + vec2(0.0, 1.0), vec2(12.9898, 78.233))) * 43758.5453);
      float d = fract(sin(dot(i + vec2(1.0, 1.0), vec2(12.9898, 78.233))) * 43758.5453);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    // 8x8 Bayer matrix as a single array of integers
    const int bayerMatrix[64] = int[64](
      0, 32, 8, 40, 2, 34, 10, 42,
      48, 16, 56, 24, 50, 18, 58, 26,
      12, 44, 4, 36, 14, 46, 6, 38,
      60, 28, 52, 20, 62, 30, 54, 22,
      3, 35, 11, 43, 1, 33, 9, 41,
      51, 19, 59, 27, 49, 17, 57, 25,
      15, 47, 7, 39, 13, 45, 5, 37,
      63, 31, 55, 23, 61, 29, 53, 21
    );
    float dither8x8(vec2 position, float brightness) {
      int x = int(mod(position.x, 8.0));
      int y = int(mod(position.y, 8.0));
      int index = y * 8 + x;  // Fix: Correct index calculation
      float threshold = float(bayerMatrix[index]) / 64.0;
      return brightness < threshold ? 0.0 : 1.0;
    }

    void main() {
      // Generate noise at full resolution
      vec2 noiseUV = vUv * 5.0 + time * 0.1;  // Adjust scale for more visible noise
      float n = noise(noiseUV);
      
      // Apply dithering
      vec2 ditherCoord = gl_FragCoord.xy;
      float ditheredValue = dither8x8(ditherCoord, n);
      
      vec3 lightGray = vec3(0.8);
      vec3 darkGray = vec3(0.2);  // Add a darker color for contrast
      vec3 color = mix(darkGray, lightGray, ditheredValue);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `,
)

extend({ PerlinNoiseMaterial })

function PerlinPlane() {
  const meshRef = React.useRef<Mesh>(null)
  const materialRef = React.useRef<any>(null)
  const { size } = useThree()

  const [planeSize, setPlaneSize] = React.useState({ width: 2, height: 2 })
  const [aspect, setAspect] = React.useState(1)

  const updatePlaneSize = React.useCallback(() => {
    const aspect = size.width / size.height
    setPlaneSize({ width: size.width, height: size.height })
    setAspect(aspect)
  }, [size])

  React.useEffect(() => {
    updatePlaneSize()
  }, [size, updatePlaneSize])

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.time = clock.getElapsedTime()
      materialRef.current.aspect = aspect
      materialRef.current.resolution = [256, 256]
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[planeSize.width, planeSize.height]} />
      <perlinNoiseMaterial ref={materialRef} />
    </mesh>
  )
}

export const HeroArtwork = () => (
  <Flex id='hero' justify='center' align='stretch' height='100vh' width='100vw'>
    <Canvas orthographic camera={{ zoom: 1, position: [0, 0, 100] }}>
      <PerlinPlane />
    </Canvas>
  </Flex>
)
