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
  { time: 0, aspect: 1.0 },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Updated Fragment shader with dithering
  `
    uniform float time;
    uniform float aspect;
    varying vec2 vUv;

    vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

    float noise(vec2 P) {
      vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
      vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
      Pi = mod(Pi, 289.0);
      vec4 ix = Pi.xzxz;
      vec4 iy = Pi.yyww;
      vec4 fx = Pf.xzxz;
      vec4 fy = Pf.yyww;
      vec4 i = permute(permute(ix) + iy);
      vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0;
      vec4 gy = abs(gx) - 0.5;
      vec4 tx = floor(gx + 0.5);
      gx = gx - tx;
      vec2 g00 = vec2(gx.x,gy.x);
      vec2 g10 = vec2(gx.y,gy.y);
      vec2 g01 = vec2(gx.z,gy.z);
      vec2 g11 = vec2(gx.w,gy.w);
      vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
      g00 *= norm.x;
      g01 *= norm.y;
      g10 *= norm.z;
      g11 *= norm.w;
      float n00 = dot(g00, vec2(fx.x, fy.x));
      float n10 = dot(g10, vec2(fx.y, fy.y));
      float n01 = dot(g01, vec2(fx.z, fy.z));
      float n11 = dot(g11, vec2(fx.w, fy.w));
      vec2 fade_xy = fade(Pf.xy);
      vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
      float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
      return 2.3 * n_xy;
    }

    // Dithering function
    float dither(vec2 uv, float value) {
      float size = 2.0;
      vec2 ditherCoord = uv * vec2(aspect, 1.0) * size;
      vec2 ditherPos = fract(ditherCoord);
      vec2 ditherGrid = floor(ditherCoord);
      float ditherValue = fract(sin(dot(ditherGrid, vec2(12.9898, 78.233))) * 43758.5453);
      return step(ditherValue, value);
    }

    void main() {
      vec2 uv = vUv - 0.5;  // Center UVs
      uv.x *= aspect;       // Apply aspect ratio
      uv = uv * 0.5 + 0.5;  // Rescale UVs back to 0-1 range
      float n = noise(uv * 5.0 + time * 0.1);
      float ditheredValue = dither(gl_FragCoord.xy, n * 0.5 + 0.5);
      gl_FragColor = vec4(vec3(ditheredValue), 1.0);
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
