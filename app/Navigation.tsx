'use client'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import styles from './Navigation.module.css'

export const Navigation = () => (
  <NavigationMenu.Root className={styles.Root}>
    <NavigationMenu.List className={styles.MenuList}>
      <NavigationMenu.Item onClick={() => window.scrollTo({ top: 0 })}>
        <NavigationMenu.Link className={styles.Link} href='#'>
          :) :) :)
        </NavigationMenu.Link>
      </NavigationMenu.Item>

      <NavigationMenu.Item>
        <NavigationMenu.Link className={styles.Link} href='#about'>
          about
        </NavigationMenu.Link>
      </NavigationMenu.Item>

      <NavigationMenu.Item>
        <NavigationMenu.Link className={styles.Link} href='#work'>
          work
        </NavigationMenu.Link>
      </NavigationMenu.Item>

      <NavigationMenu.Item>
        <NavigationMenu.Link className={styles.Link} href='#contact'>
          contact
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  </NavigationMenu.Root>
)
