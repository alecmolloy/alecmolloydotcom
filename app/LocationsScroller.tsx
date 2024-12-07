'use client'
import { Flex, Text as Txt } from '@radix-ui/themes'
import React, { useCallback, useEffect, useRef, useState } from 'react'

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
  const animationRef = useRef<number>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

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
      if (animationRef.current != null) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate])

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
                size='2'
                key={city}
                title={countryToEmoji(country)}
                style={{
                  color: 'var(--slate-11)',
                  cursor: 'default',
                  position: 'relative',
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
