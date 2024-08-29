import { shaderMaterial } from '@react-three/drei'
import { extend, ReactThreeFiber, useFrame, useThree } from '@react-three/fiber'
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

export const TextureSize = 128

const PerlinNoiseMaterial = shaderMaterial(
  { time: 0, aspect: 1.0, resolution: [1024, 1024] },
  ` varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // prettier-ignore
  ` #define PI 3.1415926535
    uniform float time;
    uniform float aspect;
    uniform vec2 resolution;
    varying vec2 vUv;

    float noise3(vec3 x) {
      vec3 p = floor(x), f = fract(x);
      f = f * f * (3.0 - 2.0 * f);
      float n = p.x + p.y * 57.0 + 113.0 * p.z;
      return mix(
        mix(
          mix(fract(sin(n +  0.0) * 43758.5453), fract(sin(n +  1.0) * 43758.5453), f.x),
          mix(fract(sin(n + 57.0) * 43758.5453), fract(sin(n + 58.0) * 43758.5453), f.x),
          f.y
        ),
        mix(
          mix(fract(sin(n + 113.0) * 43758.5453), fract(sin(n + 114.0) * 43758.5453), f.x),
          mix(fract(sin(n + 170.0) * 43758.5453), fract(sin(n + 171.0) * 43758.5453), f.x),
          f.y
        ),
        f.z
      );
    }

    float noise(vec3 x) {
      return (noise3(x) + noise3(x + 11.5)) / 2.0;
    }

    const float bayerMatrix[64] = float[64](
      ${[
        0,  32, 8,  40, 2,  34, 10, 42,
        48, 16, 56, 24, 50, 18, 58, 26,
        12, 44, 4,  36, 14, 46, 6,  38,
        60, 28, 52, 20, 62, 30, 54, 22,
        3,  35, 11, 43, 1,  33, 9,  41,
        51, 19, 59, 27, 49, 17, 57, 25,
        15, 47, 7,  39, 13, 45, 5,  37,
        63, 31, 55, 23, 61, 29, 53, 21].map(v => (v / 64.0).toPrecision(6)).join(', ')}
    );
    float dither8x8(vec2 position, float brightness) {
      int x = int(mod(position.x, 8.0));
      int y = int(mod(position.y, 8.0));
      int index = y * 8 + x;
      float threshold = bayerMatrix[index];
      return brightness < threshold ? 0.0 : 1.0;
    }

    void main() {
      vec3 noiseCoord = vec3(floor(vUv * ${TextureSize}.0) / ${TextureSize}.0 * 10.0, time * 0.25);
      float n = noise(noiseCoord);

      // n = (-pow(cos(PI * (n / 2.0)), 1.5)) + 1.0;
      float clipFloor = 0.2;
      if (n <= clipFloor) {
        n = 0.0;
      } else {
        n = 1.0 - pow(max(0.0, abs((n - clipFloor) * 2.0 - 1.0)), 3.0);
      }
      vec2 ditherCoord = floor(vUv * ${TextureSize}.0);
      float ditheredValue = dither8x8(ditherCoord, n);
      
      vec3 light = vec3(1.0);
      vec3 dark = vec3(0.0);
      vec3 color = mix(dark, light, ditheredValue);
      
      gl_FragColor = vec4(color, 1.0);
      //gl_FragColor = vec4(n, n, n, 1.0);
    }
  `,
)

extend({ PerlinNoiseMaterial })

export const PerlinPlane = () => {
  const meshRef = React.useRef<Mesh>(null)
  const materialRef = React.useRef<any>(null)
  const { size } = useThree()

  const [planeSize, setPlaneSize] = React.useState(2)
  const [aspect, setAspect] = React.useState(1)
  const updatePlaneSize = React.useCallback(() => {
    const newAspect = size.width / size.height
    const squareSize = Math.max(size.width, size.height)
    setPlaneSize(squareSize)
    setAspect(newAspect)
  }, [size])

  React.useEffect(() => {
    updatePlaneSize()
  }, [size, updatePlaneSize])

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.time = clock.getElapsedTime()
      materialRef.current.aspect = aspect
      materialRef.current.resolution = [TextureSize, TextureSize]
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[planeSize, planeSize]} />
      <perlinNoiseMaterial ref={materialRef} />
    </mesh>
  )
}
