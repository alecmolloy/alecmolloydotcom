'use client'

import { Box, Flex, Link, Text as Txt } from '@radix-ui/themes'
import { animated, useTransition } from '@react-spring/web'
import { instrumentSerif } from './fonts'

export const AlecMolloyDotCom = ({
  portfolioPage,
}: {
  portfolioPage: boolean
}) => {
  const transition = useTransition(portfolioPage, {
    from: {
      y: portfolioPage ? 0 : '27vh',
    },
    enter: {
      y: '0%',
    },
    delay: 1500,
  })

  return (
    <Flex
      width={{
        initial: '20em',
        sm: 'auto',
      }}
      justify='center'
      align='center'
      style={{ zIndex: 1 }}
    >
      <Txt
        style={{
          whiteSpace: 'pre-wrap',
        }}
        my={{ initial: '3', sm: '4' }}
        mb={{ initial: '0', sm: '4' }}
        size='9'
        align='center'
        className={instrumentSerif.className}
      >
        {portfolioPage ? (
          <Link href='/' style={AlecMolloyDotComWrapperStyle}>
            Alec&nbsp;Molloy Dot&nbsp;Com
          </Link>
        ) : (
          transition(({ y }) => (
            <AnimatedBox
              className={'title-loading-animation'}
              style={{
                y,
                ...AlecMolloyDotComWrapperStyle,
              }}
            >
              Alec&nbsp;Molloy Dot&nbsp;Com
            </AnimatedBox>
          ))
        )}
      </Txt>
    </Flex>
  )
}

const AnimatedBox = animated(Box)

const AlecMolloyDotComWrapperStyle = {
  display: 'block',
  color: '#000',
  textDecoration: 'none',
}
