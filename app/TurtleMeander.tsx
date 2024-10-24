'use client'

import { Box } from '@radix-ui/themes'
import React from 'react'
import { TurtleCanvas, TurtleSize } from './TurtleCanvas'

interface TurtleMeanderProps {
  height: number
}

export const TurtleMeander: React.FunctionComponent<TurtleMeanderProps> = ({
  height,
}) => {
  const [width, setWidth] = React.useState(0)

  React.useEffect(() => {
    const updateDimensions = () => {
      const newWidth = Math.ceil(window.innerWidth / TurtleSize) + 2
      setWidth(newWidth)
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  return (
    <Box
      style={{
        position: 'relative',
        height: height * TurtleSize,
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <TurtleCanvas
        cellWidth={width}
        cellHeight={height}
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
    </Box>
  )
}
