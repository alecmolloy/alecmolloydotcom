import { Container, Flex, Grid, Text as Txt } from '@radix-ui/themes'
import Img from 'next/image'
import Netscape from '../public/ns-best-1.gif'
import { workSans } from './fonts'
import styled from 'styled-components'
import { TurtleMeander } from './TurtleMeander'
import { LocationsScroller } from './LocationsScroller'

const SocialLinkProps = {
  className: workSans.className,
  style: { color: '#0008', textDecoration: 'none' },
}

export const Footer = () => {
  return (
    <>
      <Container py='8' px='4'>
        <Grid columns='12' gap='4'>
          <Flex
            gridColumn='span 9'
            gapY='4'
            direction='column'
            align='start'
            justify='end'
          >
            <a
              href='https://x.com/alecmolloy'
              target='_blank'
              {...SocialLinkProps}
            >
              Twitter
            </a>
            <a
              href='https://waveymaus.tumblr.com'
              target='_blank'
              {...SocialLinkProps}
            >
              Tumblr
            </a>

            <Img
              src={Netscape}
              alt='This page is best viewed in Netscape Navigator 3.0'
              width={88}
              height={31}
            />
            <a
              href={`http://jigsaw.w3.org/css-validator/check/referer?uri=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
              title='Absolutely not valid CSS, lol I wish.'
            >
              <img
                style={{ border: 0, width: 88, height: 31 }}
                src='http://jigsaw.w3.org/css-validator/images/vcss'
                alt='Valid CSS!'
              />
            </a>
            <Txt size='2' style={{ color: 'var(--slate-11)' }}>
              “Turtle” Optical Illusion Pattern based on the work of{' '}
              <a href='https://www.ritsumei.ac.jp/~akitaoka/kame-e.html'>
                Akiyoshi Kitaoka
              </a>
              .
            </Txt>
            <Txt size='2' style={{ color: 'var(--slate-11)' }}>
              © {new Date().getFullYear()} Alec Molloy. All rights reserved.
            </Txt>
          </Flex>
          <Flex
            gridColumn='10 / span 3'
            direction='column'
            align='end'
            gapY='4'
          >
            <img
              src='/im-confused-too.svg'
              alt='Made in UK, But Raised in US, And also Irish. ¯\_(ツ)_/¯ '
              title='But I am authorized to work in the USA, EU, UK without a visa :)'
              width={200}
              height={200}
            />
          </Flex>
        </Grid>
      </Container>
      <LocationsScroller />
      <TurtleMeander height={12} />
    </>
  )
}
