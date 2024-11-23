'use client'
import React, { useEffect, useRef, useState } from 'react'

interface TurtleCanvasProps {
  cellWidth: number
  cellHeight: number
  style: React.CSSProperties
}

export const TurtleSize = 20

export const TurtleCanvas: React.FC<TurtleCanvasProps> = ({
  cellWidth,
  cellHeight,
  style,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [turtleHorizontalImg, setTurtleHorizontalImg] =
    useState<HTMLImageElement | null>(null)
  const [turtleVerticalImg, setTurtleVerticalImg] =
    useState<HTMLImageElement | null>(null)

  useEffect(() => {
    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = src
      })
    }

    Promise.all([
      loadImage('/void/turtle-corner-horizontal-square.png'),
      loadImage('/void/turtle-corner-vertical-square.png'),
    ])
      .then(([horizontalImg, verticalImg]) => {
        setTurtleHorizontalImg(horizontalImg)
        setTurtleVerticalImg(verticalImg)
      })
      .catch((error) => console.error('Error loading images:', error))
  }, [])

  useEffect(() => {
    if (canvasRef.current && turtleHorizontalImg && turtleVerticalImg) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        const canvasPixelWidth = cellWidth * TurtleSize
        const canvasPixelHeight = cellHeight * TurtleSize

        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvasPixelWidth, canvasPixelHeight)

        ctx.fillStyle = 'black'

        for (let x = 0; x < cellWidth; x += 1) {
          for (let y = 0; y < cellHeight; y += 1) {
            if ((x + y) % 2 === 0) {
              ctx.fillRect(
                x * TurtleSize,
                y * TurtleSize,
                TurtleSize,
                TurtleSize,
              )
            }
            if (x >= 1 && y >= 1) {
              const standingWaveDirection = (x + y) % 3 === 0
              ctx.drawImage(
                standingWaveDirection ? turtleHorizontalImg : turtleVerticalImg,
                x * TurtleSize - 6,
                y * TurtleSize - 6,
                12,
                12,
              )
            }
          }
        }
      }
    }
  }, [cellWidth, cellHeight, turtleHorizontalImg, turtleVerticalImg])

  return (
    <canvas
      ref={canvasRef}
      width={cellWidth * TurtleSize}
      height={cellHeight * TurtleSize}
      style={{ imageRendering: 'pixelated', ...style }}
    />
  )
}
