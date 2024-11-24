import { CameraStartY, Scene } from '@/app/Scene'
import { Canvas } from '@react-three/fiber'

export default function HeroCanvas() {
  return (
    <Canvas
      style={{ flexGrow: 1 }}
      id='hero-canvas'
      orthographic
      camera={{
        position: [0, CameraStartY, 0],
        near: 0,
        far: 5000,
      }}
    >
      <Scene />
    </Canvas>
  )
}
