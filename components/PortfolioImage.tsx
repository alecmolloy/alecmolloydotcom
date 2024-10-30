import { Flex, Text as Txt } from '@radix-ui/themes'
import { Squircle } from '@squircle-js/react'
import Img, { StaticImageData } from 'next/image'
import React from 'react'

interface PortfolioImageProps {
  src: StaticImageData
  alt: string
  caption?: React.ReactNode
}

export function PortfolioImage({ src, alt, caption }: PortfolioImageProps) {
  return (
    <Flex direction='column' gap='2'>
      <Squircle cornerRadius={8}>
        <Img
          src={src}
          alt={alt}
          style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
        />
      </Squircle>
      {caption && (
        <Txt weight='medium' size='1' style={{ color: '#aaa' }}>
          {caption}
        </Txt>
      )}
    </Flex>
  )
}
