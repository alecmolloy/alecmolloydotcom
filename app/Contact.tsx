import { Box, Container, Flex, Heading, Text as Txt } from '@radix-ui/themes'
import React from 'react'
import { Footer } from './Footer'
import { NavLinkHeight, NavLinkMargin, Section } from './Navigation'
import { defaultContainerProps } from './theme'
import { CTA } from '@/components/CTA'

export const Contact: React.FunctionComponent<{ id: Section }> = ({ id }) => (
  <Box id={id}>
    <Container {...defaultContainerProps} minHeight='60vh'>
      <Flex
        direction='column'
        gap='4'
        style={{
          textAlign: 'center',
          alignContent: 'center',
          marginTop: '30vh',
        }}
      >
        <Heading>Want to build something beautiful together?</Heading>
        <Txt>Available for new projects.</Txt>
        <CTA />
      </Flex>
    </Container>
    <Footer />
  </Box>
)
