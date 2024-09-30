'use client'
import { Box, Flex, Text as Txt } from '@radix-ui/themes'
import React, { useRef, useState, useEffect, useCallback } from 'react'
import { workSans } from './fonts'

const locations = new Map([
  ['Putney', { country: 'GB' }],
  ['Wandsworth', { country: 'GB' }],
  ['Scarsdale', { country: 'US' }],
  ['New Canaan', { country: 'US' }],
  ['Santa Clara', { country: 'US' }],
  ['San Jose', { country: 'US' }],
  ['Upper Haight', { country: 'US' }],
  ['Dalston', { country: 'GB' }],
  ['Highbury', { country: 'GB' }],
  ['Malmö', { country: 'SE' }],
  ['Frederiksberg', { country: 'DK' }],
  ['Stoke Newington', { country: 'GB' }],
  ['Pacific Palisades', { country: 'US' }],
  ['Portland', { country: 'US' }],
  ['Alfama', { country: 'PT' }],
  ['Costa da Caparica', { country: 'PT' }],
  ['Figueiró dos Vinhos', { country: 'PT' }],
  ['Oliveri', { country: 'IT' }],
  ['Olhos de Água', { country: 'PT' }],
  ['Assagao', { country: 'IN' }],
  ['Campo de Ourique', { country: 'PT' }],
  ['Tavira', { country: 'PT' }],
  ['Sainte-Agathe-des-Monts', { country: 'CA' }],
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
        const newPosition = prevPosition + 0.5
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

  return (
    <Flex
      my='2'
      ref={containerRef}
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
          <Flex key={i} direction='row'>
            {Array.from(locations.entries()).map(([city, { country }]) => (
              <Txt
                size='4'
                className={workSans.className}
                key={city}
                title={countryToEmoji(country)}
                style={{
                  cursor: 'default',
                  position: 'relative',
                  fontWeight: '500',
                }}
              >
                {city}&nbsp;&nbsp;·&nbsp;&nbsp;
              </Txt>
            ))}
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}
