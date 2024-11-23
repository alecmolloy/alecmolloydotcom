import { Void } from '@/app/Void'
import { Environment, Preload } from '@react-three/drei'
import React from 'react'

export const NavigationScene: React.FunctionComponent = () => {
  return (
    <>
      <Void
        position={[0, 0, 0]}
        radius={24}
        wobbleAmplitude={0.05}
        wobbleFrequency={0.4}
        affectedByMouse={false}
      />
      <Preload all />
      <Environment files='/void/studio027small.exr' />
    </>
  )
}
