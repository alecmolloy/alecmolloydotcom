'use client'
import { Box, Text as Txt } from '@radix-ui/themes'
import React, { useRef, useState, useEffect, useCallback } from 'react'
import { workSans } from './fonts'

const locations = new Map([
  ['Putney', 'GB'],
  ['Wandsworth', 'GB'],
  ['Scarsdale', 'US'],
  ['New Canaan', 'US'],
  ['Santa Clara', 'US'],
  ['San Jose', 'US'],
  ['Upper Haight', 'US'],
  ['Dalston', 'GB'],
  ['Highbury', 'GB'],
  ['Malmö', 'SE'],
  ['Frederiksberg', 'DK'],
  ['Stoke Newington', 'GB'],
  ['Pacific Palisades', 'US'],
  ['Portland', 'US'],
  ['Playa del Carmen', 'MX'],
  ['Alfama', 'PT'],
  ['Costa da Caparica', 'PT'],
  ['Figueiró dos Vinhos', 'PT'],
  ['Oliveri', 'IT'],
  ['Olhos de Água', 'PT'],
  ['Assagao', 'IN'],
  ['Campo de Ourique', 'PT'],
  ['Tavira', 'PT'],
  ['Sainte-Agathe-des-Monts', 'CA'],
])

const countryToEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

export const LocationsScroller: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const [scrollPosition, setScrollPosition] = useState(0)
  const [globalMouseX, setGlobalMouseX] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [containerWidth, setContainerWidth] = useState(1024)

  const normalize = (value: number, min: number, max: number): number => {
    return (value - min) / (max - min)
  }

  const animate = useCallback(() => {
    if (!isHovering && containerRef.current) {
      setScrollPosition((prevPosition) => {
        const newPosition = prevPosition + 1
        return newPosition >= containerRef.current!.scrollWidth / 2
          ? 0
          : newPosition
      })
    }
    animationRef.current = requestAnimationFrame(animate)
  }, [isHovering])

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setGlobalMouseX(e.clientX)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    if (containerRef.current != null) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setContainerWidth(entry.contentRect.width)
        }
      })

      resizeObserver.observe(containerRef.current)

      return () => {
        resizeObserver.disconnect()
      }
    }
  }, [])

  const locationText = Array.from(locations.entries()).map(
    ([city, country]) => (
      <span
        key={city}
        title={countryToEmoji(country)}
        style={{ cursor: 'default' }}
      >
        {city}&nbsp;&nbsp;·&nbsp;&nbsp;
      </span>
    ),
  )

  const calculateFontWeight = useCallback(
    (x: number): number => {
      if (containerWidth === 0) {
        return 400
      }
      const normalizedX = normalize(x, 0, containerWidth)
      return Math.floor(normalizedX * 500 + 400) // 400 to 900
    },
    [containerWidth],
  )

  return (
    <Box
      ref={containerRef}
      style={{
        width: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Box
        style={{
          display: 'inline-block',
          transform: `translateX(-${scrollPosition}px)`,
        }}
      >
        <Txt
          size='8'
          className={workSans.className}
          style={{
            display: 'inline-block',
            fontWeight: calculateFontWeight(globalMouseX),
          }}
        >
          {locationText}
        </Txt>
        <Txt
          size='8'
          className={workSans.className}
          style={{
            display: 'inline-block',
            fontWeight: calculateFontWeight(globalMouseX),
          }}
        >
          {locationText}
        </Txt>
      </Box>
    </Box>
  )
}
