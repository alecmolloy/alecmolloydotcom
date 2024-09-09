import { Container, Flex, Text as Txt } from '@radix-ui/themes'
import React from 'react'
import { Link } from '../components/Link'
import { instrumentSerif } from './fonts'
import { Navigation } from './Navigation'

interface Props {}

export const HeaderHeight = 152

export const Header: React.FunctionComponent<Props> = () => {
  return (
    <Container
      size='4'
      position='sticky'
      top='0'
      style={{ height: HeaderHeight }}
    >
      <Flex id='header' pt='6' pb='2' direction='column'>
        <Link key='/' href='/' style={{ textDecoration: 'none' }}>
          <Txt
            size='9'
            className={instrumentSerif.className}
            align='center'
            style={{ color: '#000' }}
          >
            Alec Molloy
          </Txt>
        </Link>
        <Navigation />
      </Flex>
    </Container>
  )
}
