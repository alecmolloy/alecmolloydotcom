import { Box, Text as Txt } from '@radix-ui/themes'
import React from 'react'
import styles from './BobbingText.module.css'

interface BobbingTextProps {
  children: string
}

export const BobbingText: React.FC<BobbingTextProps> = ({ children }) => {
  return (
    <Box
      display='inline-block'
      px={{
        initial: '3',
        md: '4',
      }}
      py='1'
      style={{
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
    </Box>
  )
}
