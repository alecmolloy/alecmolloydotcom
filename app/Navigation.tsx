'use client'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { Text as Txt } from '@radix-ui/themes'
import React from 'react'
import { workSans } from './fonts'
import styles from './Navigation.module.css'

const NavText = ({
  children,
  style,
  ...props
}: React.ComponentProps<typeof Txt>) => (
  <Txt
    className={workSans.className}
    size='5'
    weight='medium'
    style={{
      textDecoration: 'none',
      ...style,
    }}
    {...props}
  >
    {children}
  </Txt>
)

export const Navigation = () => (
  <NavigationMenu.Root className={styles.Root}>
    <NavigationMenu.List className={styles.MenuList}>
      <NavigationMenu.Item onClick={() => window.scrollTo({ top: 0 })}>
        <NavigationMenu.Link className={styles.Link} href='#'>
          <NavText>index</NavText>
        </NavigationMenu.Link>
      </NavigationMenu.Item>

      <NavigationMenu.Item>
        <NavigationMenu.Link className={styles.Link} href='#about'>
          <NavText>about</NavText>
        </NavigationMenu.Link>
      </NavigationMenu.Item>

      <NavigationMenu.Item>
        <NavigationMenu.Link className={styles.Link} href='#work'>
          <NavText>work</NavText>
        </NavigationMenu.Link>
      </NavigationMenu.Item>

      <NavigationMenu.Item>
        <NavigationMenu.Link className={styles.Link} href='#contact'>
          <NavText>contact</NavText>
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  </NavigationMenu.Root>
)
