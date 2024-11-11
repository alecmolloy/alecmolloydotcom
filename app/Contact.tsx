import { Box, Container, Flex, Heading, Text as Txt } from '@radix-ui/themes'
import React from 'react'
import { Footer } from './Footer'
import { Section } from './Navigation'
import { defaultContainerProps } from './theme'
import { CTA } from '@/components/CTA'

export const Contact: React.FunctionComponent<{ id: Section }> = ({ id }) => (
  <Box id={id}>
    <Container pt='9' {...defaultContainerProps} minHeight='60vh'>
      <Flex
        direction='column'
        gap='4'
        style={{
          textAlign: 'center',
          alignContent: 'center',
          marginTop: '15vh',
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
