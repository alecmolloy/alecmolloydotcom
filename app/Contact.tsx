import { CTA } from '@/components/CTA'
import { Flex, Heading, Text as Txt } from '@radix-ui/themes'
import React from 'react'
import { Section } from './Navigation'
import { defaultContainerProps, NavLinkHeight, NavLinkMargin } from './theme'

export const Contact: React.FunctionComponent<{ id: Section }> = ({ id }) => (
  <Flex
    {...defaultContainerProps}
    minHeight='70vh'
    id={id}
    mt={`${NavLinkHeight + NavLinkMargin * 2}px`}
    direction='column'
    justify='center'
    align='center'
    gap='4'
  >
    <Heading
      align='center'
      style={{
        textWrap: 'balance',
      }}
    >
      Want to build something beautiful together?
    </Heading>
    <Txt align='center'>Available for new projects.</Txt>
    <CTA />
  </Flex>
)
