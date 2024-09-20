'use client'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { Flex, Text as Txt } from '@radix-ui/themes'
import { animated, useSpring } from '@react-spring/web'
import { Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import { workSans } from './fonts'
import { Void } from './Void'

export const sections = ['hero', 'about', 'portfolio', 'contact'] as const
export type Section = (typeof sections)[number]

const navLinkHeight = 60

export const Navigation: React.FunctionComponent = () => {
  const [activeSection, setActiveSection] = React.useState<Section | null>(null)
  const [hoveredSection, setHoveredSection] = useState<Section | null>(null)
  const [isAutoScrolling, setIsAutoScrolling] = useState(false)
  const navRefs = useRef<{ [key: string]: HTMLElement | null }>({})
  const navMenuRef = useRef<HTMLElement | null>(null)
  const autoScrollTimeoutRef = useRef<number | null>(null)

  const [indicatorProps, api] = useSpring(() => ({
    width: navLinkHeight,
    x: 0,
    config: { tension: 300, friction: 30 },
  }))

  const getActiveSectionIndicatorPosition = React.useCallback(
    (currentSection: Section | null) => {
      if (
        currentSection &&
        navRefs.current[currentSection] &&
        navMenuRef.current
      ) {
        const element = navRefs.current[currentSection]
        const navMenuRect = navMenuRef.current.getBoundingClientRect()
        const rect = element?.getBoundingClientRect()
        return {
          width: rect?.width ?? 0,
          x: (rect?.left ?? 0) - navMenuRect.left,
        }
      } else {
        return {}
      }
    },
    [],
  )

  useEffect(() => {
    api.start(
      getActiveSectionIndicatorPosition(hoveredSection ?? activeSection),
    )
  }, [api, getActiveSectionIndicatorPosition, activeSection, hoveredSection])

  React.useEffect(() => {
    const handleScroll = () => {
      if (!isAutoScrolling) {
        const currentSection = sections.find((section) => {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            return rect.top <= 100 && rect.bottom >= 100
          }
          return false
        })
        setActiveSection(currentSection ?? null)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isAutoScrolling])

  // Add this new effect
  React.useEffect(() => {
    const determineInitialActiveSection = () => {
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            api.set(getActiveSectionIndicatorPosition(section))
            return
          }
        }
      }
      setActiveSection(sections[0])
    }

    determineInitialActiveSection()
  }, [api, getActiveSectionIndicatorPosition])

  return (
    <Flex
      position='sticky'
      top='0'
      justify={{ initial: 'center', xl: 'start' }}
      style={{ zIndex: 1, height: 0 }}
    >
      <Flex
        direction='row'
        align='center'
        m='4'
        p='3'
        style={{
          position: 'relative',
          height: 84,
          backgroundColor: '#FFFC',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: 1000,
          boxShadow: '0 0 0 1px #0001 inset',
        }}
      >
        <NavigationMenu.Root
          id='navigation-root'
          ref={navMenuRef}
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            fontSize: 16,
          }}
        >
          <NavigationMenu.List
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {sections.map((section) => (
              <NavigationMenu.Item
                key={section}
                style={{
                  userSelect: 'none',
                  borderRadius: 1000,
                }}
                onMouseOver={() => setHoveredSection(section)}
                onMouseOut={() => setHoveredSection(null)}
                onTouchEnd={() =>
                  setTimeout(() => setHoveredSection(null), 100)
                }
                ref={(el) => {
                  if (el != null) {
                    navRefs.current[section] = el
                  }
                }}
              >
                <NavigationMenu.Link
                  href={section === 'hero' ? '#' : `#${section}`}
                  style={{
                    all: 'unset',
                    display: 'flex',
                    padding: section === 'hero' ? 0 : '0 12px',
                    alignItems: 'center',
                    color: '#000',
                    height: navLinkHeight,
                    WebkitTapHighlightColor: 'transparent',
                    outline: 'none',
                  }}
                  onClick={(e) => {
                    e.preventDefault()
                    const targetElement = document.getElementById(section)
                    if (targetElement) {
                      setIsAutoScrolling(true)
                      setActiveSection(section)
                      api.start(
                        getActiveSectionIndicatorPosition(
                          hoveredSection ?? activeSection,
                        ),
                      )
                      if (autoScrollTimeoutRef.current) {
                        clearTimeout(autoScrollTimeoutRef.current)
                      }
                      autoScrollTimeoutRef.current = window.setTimeout(() => {
                        setIsAutoScrolling(false)
                        autoScrollTimeoutRef.current = null
                      }, 500)
                      targetElement.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                >
                  {section === 'hero' ? (
                    <Canvas
                      style={{
                        width: navLinkHeight,
                        height: navLinkHeight,
                        opacity: activeSection !== 'hero' ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out',
                      }}
                      orthographic
                      camera={{
                        position: [0, 150, 150],
                        near: 0,
                        far: 5000,
                      }}
                    >
                      <Environment files='/studio027.exr' />
                      <Void
                        position={[0, 0, 0]}
                        radius={24}
                        wobbleAmplitude={0.4}
                        wobbleFrequency={0.1}
                      />
                    </Canvas>
                  ) : (
                    <Txt
                      className={workSans.className}
                      size='5'
                      weight='medium'
                      style={{
                        textDecoration: 'none',
                      }}
                    >
                      {section}
                    </Txt>
                  )}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
          <animated.div
            style={{
              position: 'absolute',
              left: 0,
              height: navLinkHeight,
              borderRadius: 1000,
              pointerEvents: 'none',
              backgroundImage: `radial-gradient(
                                  ellipse,
                                  color-mix(in lch, var(--international-orange) 50%, transparent),
                                  transparent
                                )`,
              ...indicatorProps,
            }}
          />
        </NavigationMenu.Root>
      </Flex>
    </Flex>
  )
}
