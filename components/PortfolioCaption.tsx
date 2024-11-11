import { Text as Txt } from '@radix-ui/themes'
import React from 'react'

interface PortfolioCaptionProps {
  caption: React.ReactNode
}

export const PortfolioCaption: React.FC<PortfolioCaptionProps> = ({
  caption,
}) => {
  return (
    <Txt as='p' size='1' mt='2' weight='medium' style={{ color: '#aaa' }}>
      {caption}
    </Txt>
  )
}
