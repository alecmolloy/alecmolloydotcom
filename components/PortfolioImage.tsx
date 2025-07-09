import { Flex, type FlexProps } from '@radix-ui/themes'
import { Squircle } from '@squircle-js/react'
import Img, { StaticImageData } from 'next/image'
import React from 'react'
import { PortfolioCaption } from './PortfolioCaption'

interface PortfolioImageProps {
  src: StaticImageData
  alt: string
  caption?: React.ReactNode
  radius?: number
}

export function PortfolioImage({
  src,
  alt,
  caption,
  radius = 24,
  ...props
}: PortfolioImageProps & FlexProps) {
  return (
    <Flex direction='column' my='4' {...props}>
      <Squircle cornerRadius={radius}>
        <Img
          src={src}
          alt={alt}
          style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
        />
      </Squircle>
      {caption && <PortfolioCaption caption={caption} />}
    </Flex>
  )
}
