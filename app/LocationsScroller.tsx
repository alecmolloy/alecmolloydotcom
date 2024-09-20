'use client'
import { Box, Flex, Text as Txt } from '@radix-ui/themes'
import React, { useRef, useState, useEffect, useCallback } from 'react'
import { workSans } from './fonts'

const Violator = ({
  color,
  children,
}: {
  color: string
  children: React.ReactNode
}) => (
  <Box
    position='absolute'
    top='-25px'
    left='-25px'
    style={{ transform: 'rotate(-15deg)' }}
  >
    <Txt
      size='2'
      weight='bold'
      style={{
        borderRadius: '4px',
        backgroundColor: color,
        color: 'white',
        padding: '2px',
      }}
    >
      {children}
    </Txt>
  </Box>
)
const locations = new Map([
  ['Putney', { country: 'GB', violator: null }],
  ['Wandsworth', { country: 'GB', violator: null }],
  ['Scarsdale', { country: 'US', violator: null }],
  [
    'New Canaan',
    {
      country: 'US',
      violator: (
        <Violator color='var(--international-orange)'>Currently!</Violator>
      ),
    },
  ],
  ['Santa Clara', { country: 'US', violator: null }],
  ['San Jose', { country: 'US', violator: null }],
  ['Upper Haight', { country: 'US', violator: null }],
  ['Dalston', { country: 'GB', violator: null }],
  ['Highbury', { country: 'GB', violator: null }],
  ['Malmö', { country: 'SE', violator: null }],
  ['Frederiksberg', { country: 'DK', violator: null }],
  ['Stoke Newington', { country: 'GB', violator: null }],
  ['Pacific Palisades', { country: 'US', violator: null }],
  ['Portland', { country: 'US', violator: null }],
  ['Alfama', { country: 'PT', violator: null }],
  ['Costa da Caparica', { country: 'PT', violator: null }],
  ['Figueiró dos Vinhos', { country: 'PT', violator: null }],
  ['Oliveri', { country: 'IT', violator: null }],
  ['Olhos de Água', { country: 'PT', violator: null }],
  ['Assagao', { country: 'IN', violator: null }],
  ['Campo de Ourique', { country: 'PT', violator: null }],
  ['Tavira', { country: 'PT', violator: null }],
  [
    'Sainte-Agathe-des-Monts',
    {
      country: 'CA',
      violator: <Violator color='var(--ultramarine)'>Soon…</Violator>,
    },
  ],
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
        return newPosition >= containerRef.current!.children[0].clientWidth / 2
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
    <Flex
      ref={containerRef}
      height='128px'
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
      direction='row'
      align='center'
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Flex
        style={{
          transform: `translateX(-${scrollPosition}px)`,
        }}
      >
        {[0, 1].map((i) => (
          <Flex
            key={i}
            direction='row'
            style={{
              fontWeight: calculateFontWeight(globalMouseX),
            }}
          >
            {Array.from(locations.entries()).map(
              ([city, { country, violator }]) => (
                <Txt
                  size='8'
                  className={workSans.className}
                  key={city}
                  title={countryToEmoji(country)}
                  style={{ cursor: 'default', position: 'relative' }}
                >
                  {violator}
                  {city}&nbsp;&nbsp;·&nbsp;&nbsp;
                </Txt>
              ),
            )}
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}
