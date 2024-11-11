import { Flex, Text as Txt } from '@radix-ui/themes'
import React from 'react'

interface PortfolioCaptionProps {
  caption: React.ReactNode
}

export const PortfolioCaption: React.FC<PortfolioCaptionProps> = ({
  caption,
}) => {
  return (
    <Flex direction='column' mt='2'>
      <Txt size='1' weight='medium' style={{ color: '#aaa' }}>
        {caption}
      </Txt>
    </Flex>
  )
}
