import { Flex, Text as Txt } from '@radix-ui/themes'
import React from 'react'
import { Link } from '../components/Link'
import { instrumentSerif } from './fonts'
import { Navigation } from './Navigation'

interface Props {}

export const Header: React.FunctionComponent<Props> = () => {
  return (
    <Flex
      id='header'
      position='absolute'
      top='0'
      direction='column'
      width='100vw'
      pt='6'
    >
      <Link key='/' href='/' style={{ color: '#444', textDecoration: 'none' }}>
        <Txt size='9' className={instrumentSerif.className} align='center'>
          Alec Molloy
        </Txt>
      </Link>
      <Navigation />
    </Flex>
  )
}
