import { Flex } from '@radix-ui/themes'
import React from 'react'
import { Navigation } from './Navigation'
import { NavigationVoid } from './NavigationVoid'

export const Header: React.FunctionComponent = () => (
  <Flex position='sticky' top='3' m='3' justify='start' style={{ zIndex: 1 }}>
    <Flex
      id='header'
      direction='row'
      align='center'
      p='3'
      style={{
        backgroundColor: '#FFFC',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: 1000,
      }}
    >
      <NavigationVoid />
      <Navigation />
    </Flex>
  </Flex>
)
