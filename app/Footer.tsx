import { Container, Flex, Grid, Text as Txt } from '@radix-ui/themes'
import Img from 'next/image'
import Netscape from '../public/ns-best-1.gif'

export const Footer = () => {
  return (
    <Container py='8'>
      <Grid columns='12' gap='4'>
        <Flex
          gridColumn='span 9'
          gapY='4'
          direction='column'
          align='start'
          justify='end'
        >
          <Img
            src={Netscape}
            alt='This page is best viewed in Netscape Navigator 3.0'
            width={88}
            height={31}
          />
          <Txt size='2' style={{ color: 'var(--slate-11)' }}>
            © {new Date().getFullYear()} Alec Molloy. All rights reserved.
          </Txt>
        </Flex>
        <Flex gridColumn='10 / span 3' direction='column' align='end' gapY='4'>
          <img
            src='/im-confused-too.svg'
            alt='Made in UK, But Raised in US, And also Irish. ¯\_(ツ)_/¯ '
            title='Authorized to work in the USA, EU, UK without a visa.'
            width={200}
            height={200}
          />
        </Flex>
      </Grid>
    </Container>
  )
}