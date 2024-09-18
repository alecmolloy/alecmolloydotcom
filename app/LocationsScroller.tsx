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
  const scrollerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const [scrollPosition, setScrollPosition] = useState(0)
  const [globalMouseX, setGlobalMouseX] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  // Helper function to normalize a value between 0 and 1
  const normalize = (value: number, min: number, max: number): number => {
    return (value - min) / (max - min)
  }

  const animate = useCallback(() => {
    if (!isHovering && scrollerRef.current) {
      setScrollPosition((prevPosition) => {
        const newPosition = prevPosition + 1
        return newPosition >= scrollerRef.current!.scrollWidth / 2
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

  // Update function to calculate font weight based on normalized Y position
  const calculateFontWeight = (x: number): number => {
    const normalizedX = normalize(x, 0, window.innerWidth)
    return Math.floor(normalizedX * 500 + 400) // 400 to 900
  }

  return (
    <Box
      ref={scrollerRef}
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
