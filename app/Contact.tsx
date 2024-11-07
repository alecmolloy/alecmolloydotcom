import { Box, Container, Heading, Text as Txt } from '@radix-ui/themes'
import React from 'react'
import { Footer } from './Footer'
import { Section } from './Navigation'
import { defaultContainerProps } from './theme'

export const Contact: React.FunctionComponent<{ id: Section }> = ({ id }) => (
  <Box id={id}>
    <Container pt='8' {...defaultContainerProps} minHeight='50vh'>
      <Heading>Want to get in touch?</Heading>
      <Txt>Drop me a line at workwith@alecmolloy.com.</Txt>
    </Container>
    <Footer />
  </Box>
)
