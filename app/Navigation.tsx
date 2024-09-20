'use client'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { Text as Txt } from '@radix-ui/themes'
import { workSans } from './fonts'
import { Section, sections } from './Header'
import './navigation.css'

export const Navigation = ({
  activeSection,
}: {
  activeSection: Section | null
}) => {
  return (
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
                display: 'flex',
                padding: '0 12px',
                alignItems: 'center',
                all: 'unset',
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
  )
}
