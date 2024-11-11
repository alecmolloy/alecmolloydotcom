import { Container, Flex, Text as Txt } from '@radix-ui/themes'
import { LocationsScroller } from './LocationsScroller'
import { defaultContainerProps } from './theme'

const socialLinks = [
  { href: 'https://github.com/alecmolloy', label: 'GitHub' },
  { href: 'https://instagram.com/waveywaveywavey', label: 'Instagram' },
  { href: 'https://waveymaus.tumblr.com', label: 'Tumblr' },
  { href: 'https://x.com/alecmolloy', label: 'Twitter' },
]

export const Footer = () => {
  return (
    <>
      <Container py='2' {...defaultContainerProps}>
        <Flex direction={{ initial: 'column-reverse', sm: 'row' }} gap='4'>
          <Flex
            flexGrow='1'
            gapY='4'
            direction={{ initial: 'column' }}
            justify='end'
          >
            <Flex
              direction='row'
              gapX='4'
              align={{ initial: 'center', sm: 'start' }}
            >
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{
                    color: '#0008',
                    textDecoration: 'none',
                  }}
                >
                  <Txt size='2' style={{ color: 'var(--slate-11)' }}>
                    {link.label}
                  </Txt>
                </a>
              ))}
            </Flex>
            <Txt
              size='2'
              style={{ color: 'var(--slate-11)' }}
              align={{ initial: 'center', sm: 'left' }}
            >
              “Turtle” Optical Illusion Pattern based on the work of{' '}
              <a href='https://www.ritsumei.ac.jp/~akitaoka/kame-e.html'>
                Akiyoshi Kitaoka
              </a>
              .
            </Txt>
            <Txt
              size='2'
              style={{ color: 'var(--slate-11)' }}
              align={{ initial: 'center', sm: 'left' }}
            >
              © {new Date().getFullYear()} Alec Molloy. All rights reserved.
            </Txt>
          </Flex>
          <Flex direction='row' align='end' gapY='4'>
            <img
              src='/im-confused-too.svg'
              alt='Made in UK, But Raised in US, And also Irish. ¯\_(ツ)_/¯ '
              title='But I can work with you in the USA, EU, and UK visa-free :)'
              width={100}
              height={100}
            />
          </Flex>
        </Flex>
      </Container>
      <LocationsScroller />
    </>
  )
}
