import { Box, Container } from '@radix-ui/themes'
import React from 'react'
import { Footer } from './Footer'
import { Section } from './Navigation'

export const Contact: React.FunctionComponent<{ id: Section }> = ({ id }) => (
  <Box pt='8' id={id}>
    <Container size='2' m='9' minHeight='100vh'>
      <h1>Want to get in touch?</h1>
      <p>Drop me a line at workwith@alecmolloy.com.</p>
    </Container>
    <Footer />
  </Box>
)
