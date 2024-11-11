import { Flex, Text as Txt } from '@radix-ui/themes'
import React from 'react'

export const InfoBlock: React.FC<{
  header: string
  innerText: React.ReactNode
}> = ({ header, innerText }) => (
  <Flex gridColumn='span 1' direction='column' pb='3' className='info-block'>
    <Txt
      size='1'
      weight='bold'
      style={{ color: '#0004' }}
      align={{ initial: 'left', xs: 'right' }}
    >
      {header}
    </Txt>
    <Txt size='1' align={{ initial: 'left', xs: 'right' }}>
      {innerText}
    </Txt>
  </Flex>
)
