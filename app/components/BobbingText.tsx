import { Text as Txt } from '@radix-ui/themes'
import { Squircle } from '@squircle-js/react'
import React from 'react'
import styles from './BobbingText.module.css'

interface BobbingTextProps {
  children: string
}

export const BobbingText: React.FC<BobbingTextProps> = ({ children }) => {
  return Array.from(children).map((char, index) => (
    <Txt
      key={index}
      weight='bold'
      style={{
        display: 'inline-block',
        animation: `${styles.bob} 2s ease-in-out infinite`,
        animationDelay: `${-children.length + index * 0.5}s`,
      }}
    >
      {char === ' ' ? <>&nbsp;</> : char}
    </Txt>
  ))
}
