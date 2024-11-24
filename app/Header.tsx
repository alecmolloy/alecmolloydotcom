'use client'

import { CTA, CTAVariant } from '@/components/CTA'
import { Flex, Link, Text as Txt } from '@radix-ui/themes'
import { defaultContainerProps } from './theme'
import { animated, useTransition } from '@react-spring/web'
import { AlecMolloyDotCom } from './AlecMolloyDotCom'
export const Header = ({
  ctaVariant,
  portfolioPage = false,
}: {
  ctaVariant: CTAVariant
  portfolioPage?: boolean
}) => {
  const transition = useTransition(portfolioPage, {
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
      id='header'
      direction='column'
      justify='center'
      align='center'
      style={{ position: 'relative' }}
      position='relative'
      {...(portfolioPage ? defaultContainerProps : {})}
    >
      <AlecMolloyDotCom portfolioPage={portfolioPage} />
      <AnimatedFlex
        direction='row'
        align='center'
        justify='between'
        width='100%'
        position={{ xs: 'absolute' }}
        my={{ initial: '2', sm: 'auto' }}
        height='100%'
        style={{ opacity }}
      >
        <Txt
          size='5'
          weight='medium'
          style={{
            color: '#000',
            borderRadius: '8px',
            cursor: 'default',
          }}
        >
          {portfolioPage ? (
            <Link href='/' style={{ textDecoration: 'none', color: '#000' }}>
              ← Home
            </Link>
          ) : (
            'For Hire'
          )}
        </Txt>
        <CTA variant={ctaVariant} />
      </AnimatedFlex>
    </Flex>
  ))
}

const AnimatedFlex = animated(Flex)
