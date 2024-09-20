'use client'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { Flex, Text as Txt } from '@radix-ui/themes'
import React from 'react'
import { workSans } from './fonts'
import './navigation.css'
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
        <NavigationMenu.Root
          id='navigation-root'
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '16px',
          }}
        >
          <NavigationMenu.List
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '4px',
              listStyle: 'none',
              margin: 0,
            }}
          >
            <NavigationVoid showNavigation={activeSection !== 'hero'} />
            {sections.slice(1).map((section) => (
              <NavigationMenu.Item
                key={section}
                className={[
                  'nav-link',
                  activeSection === section ? 'current-selection' : undefined,
                ].join(' ')}
                style={{
                  userSelect: 'none',
                  borderRadius: 1000,
                }}
              >
                <NavigationMenu.Link
                  href={`#${section}`}
                  style={{
                    all: 'unset',
                    display: 'flex',
                    padding: '0 12px',
                    alignItems: 'center',
                    color: '#000',
                    height: 52,
                  }}
                >
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
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </Flex>
    </Flex>
  )
}
