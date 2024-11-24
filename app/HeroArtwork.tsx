'use client'
import HeroCanvas from '@/components/HeroCanvas'
import heroNoscript from '@/public/hero-noscript.png'
import { Flex } from '@radix-ui/themes'
import Img from 'next/image'
import { Header } from './Header'
import { defaultContainerProps } from './theme'
import { animated, useTransition } from '@react-spring/web'

export const HeroArtwork = () => {
  const transition = useTransition(true, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    delay: 2000,
  })
  return transition(({ opacity }) => (
    <Flex
      direction='column'
      pb='8'
      height={{
        initial: 'calc(100vh - 96px)',
        sm: 'calc(100vh - 32px)',
      }}
      maxWidth='1136px'
      maxHeight='1500px'
      mx='auto'
      {...defaultContainerProps}
    >
      <Header ctaVariant='white' />
      <AnimatedFlex
        style={{ height: '100%', opacity }}
        minHeight={{ initial: '300px', sm: '600px' }}
      >
        <noscript
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Img
            src={heroNoscript}
            alt='hero'
            style={{
              width: 'auto',
              height: 'auto',
              maxWidth: '100%',
              maxHeight: '100%',
              display: 'block',
            }}
          />
        </noscript>
        <HeroCanvas />
      </AnimatedFlex>
    </Flex>
  ))
}

const AnimatedFlex = animated(Flex)
