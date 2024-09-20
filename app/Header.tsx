'use client'
import { Flex } from '@radix-ui/themes'
import React from 'react'
import { Navigation } from './Navigation'
import { NavigationVoid } from './NavigationVoid'

export const sections = ['hero', 'about', 'work', 'contact'] as const
export type Section = (typeof sections)[number]

export const Header: React.FunctionComponent = () => {
  const [activeSection, setActiveSection] = React.useState<Section | null>(null)

  React.useEffect(() => {
    const handleScroll = () => {
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
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Flex
      position='sticky'
      top='3'
      justify={{ initial: 'center', xl: 'start' }}
      style={{ zIndex: 1, height: 0 }}
    >
      <Flex
        id='header'
        direction='row'
        align='center'
        m='3'
        p='3'
        style={{
          height: 84,
          backgroundColor: '#FFFC',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: 1000,
          boxShadow: '0 0 0 1px #0001 inset',
        }}
      >
        <NavigationVoid showNavigation={activeSection !== 'hero'} />
        <Navigation activeSection={activeSection} />
      </Flex>
    </Flex>
  )
}
