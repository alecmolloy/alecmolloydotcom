import { Container, Flex } from '@radix-ui/themes'
import React from 'react'
import { Navigation } from './Navigation'
import { NavigationVoid } from './NavigationVoid'

export const Header: React.FunctionComponent = () => (
  <Container
    size='4'
    top='0'
    position='sticky'
    style={{
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)', // For Safari support
    }}
  >
    <Flex id='header' direction='row' align='center' justify='between'>
      <NavigationVoid />
      <Navigation />
    </Flex>
  </Container>
)
