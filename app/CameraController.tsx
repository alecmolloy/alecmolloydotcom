import { useFrame } from '@react-three/fiber'
import { useState } from 'react'
import * as THREE from 'three'

type CameraControllerProps = {
  viewportScrollY: number
}

const CameraStartY = 1024

const CameraController = ({ viewportScrollY }: CameraControllerProps) => {
  const [cameraPosition, setCameraPosition] = useState({
    y: CameraStartY,
    z: 0,
  })
  const [zoom, setZoom] = useState(1)

  useFrame(({ camera }) => {
    const normalizedScrollY = Math.max(
      0,
      Math.min(1, viewportScrollY / window.innerHeight),
    )
    const lerpFactor = normalizedScrollY

    const targetY = THREE.MathUtils.lerp(CameraStartY, 0, lerpFactor)
    const targetZ = THREE.MathUtils.lerp(0, 1024, lerpFactor)
    const targetZoom = THREE.MathUtils.lerp(1, 2, lerpFactor)

    setCameraPosition((prevPosition) => ({
      y: THREE.MathUtils.lerp(prevPosition.y, targetY, 0.1),
      z: THREE.MathUtils.lerp(prevPosition.z, targetZ, 0.1),
    }))

    setZoom((prevZoom) => THREE.MathUtils.lerp(prevZoom, targetZoom, 0.1))

    camera.position.y = cameraPosition.y
    camera.position.z = cameraPosition.z
    camera.zoom = zoom
    camera.updateProjectionMatrix()
  })

  return null
}

export default CameraController
