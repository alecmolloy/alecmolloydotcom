import { Text as Txt } from '@radix-ui/themes'
import { Squircle } from '@squircle-js/react'
import React from 'react'
import styles from './BobbingText.module.css'

interface BobbingTextProps {
  children: string
}

export const BobbingText: React.FC<BobbingTextProps> = ({ children }) => {
  return (
    <Squircle
      cornerRadius={100}
      style={{
        display: 'inline-block',
        padding: '4px 12px',
        backgroundColor: '#fffd',
        borderRadius: 100,
      }}
    >
      {Array.from(children).map((char, index) => (
        <Txt
          key={index}
          weight='bold'
          style={{
            display: 'inline-block',
            animation: `${styles.bob} 2s ease-in-out infinite`,
            animationDelay: `${-children.length + index * 0.5}s`,
            color: 'black',
          }}
        >
          {char === ' ' ? <>&nbsp;</> : char}
        </Txt>
      ))}
    </Squircle>
  )
}
