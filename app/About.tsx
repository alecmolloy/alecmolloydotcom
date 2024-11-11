import { CTA } from '@/components/CTA'
import { Box, Container, Flex, Grid, Text as Txt } from '@radix-ui/themes'
import React from 'react'
import DitheredImage from './DitheredImage'
import { Section } from './Navigation'
import { defaultContainerProps, defaultGridProps } from './theme'

const P: React.FC<React.ComponentProps<typeof Txt>> = (props) => (
  <Txt
    as='p'
    size='6'
    {...props}
    style={{ ...props.style, marginBottom: '1em', lineHeight: '1.5' }}
  />
)

export const About: React.FunctionComponent<{ id: Section }> = ({ id }) => {
  return (
    <Box id={id}>
      <Container
        size='4'
        py='4'
        style={{ paddingTop: 128 }}
        {...defaultContainerProps}
      >
        <Grid {...defaultGridProps}>
          <Flex
            gridColumn={{
              initial: '3 / span 8',
              xs: '1 / span 4',
              md: '2 / span 4',
            }}
            pb={{ initial: '6', xs: '0' }}
            justify={{ initial: 'start', xs: 'start' }}
            align={{ initial: 'center', xs: 'end' }}
            direction='column'
          >
            <DitheredImage
              imageUrl='/alec.jpg'
              maskUrl='/alec-mask.png'
              darkColor='#285EF6'
              lightColor='#F2EBE2'
              maxWidth={352}
              pixelSize={1}
              gammaCorrection={0.925}
              toneMapLow={0.075}
              toneMapHigh={0.75}
            />
          </Flex>
          <Box
            gridColumn={{ initial: '1 / span 12', xs: 'span 8', md: 'span 6' }}
          >
            <P>
              I am a creative technologist, building tools for human connection
              and the expansion of consciousness.
            </P>
            <P>
              I’ve built creative tools and educational software at{' '}
              <a href='http://adobe.com'>Adobe</a>,{' '}
              <a href='http://kano.me'>Kano Computing</a>, and{' '}
              <a href='https://utopia.app'>Utopia</a>, and managed mobile
              healthcare at <a href='http://mindoktor.se'>Min Doktor</a>. I
              presently work freelance, building with React, Next.js, and React
              Native apps.
            </P>
            <P>
              Over the last decade I have been obsessed with building tools for{' '}
              <a href='https://worrydream.com/MediaForThinkingTheUnthinkable/'>
                thinking unthinkable thoughts
              </a>
              . Opinionated creative tools that abstract away complexity for
              higher-level thinking, or integrate modes of thinking (component
              UI design, state, and logic) into a single environment. Or tools
              that can help us go to where thoughts cannot.
            </P>
            <P>
              My current projects mostly explore these themes, the forthcoming{' '}
              VBT app, and Retreat.Technology. And I also just like to have fun
              with family and friends, so I’m building Nuclear Connections .
            </P>
            <P>
              Away from my keyboard, I study nondual philosophy and meditation,
              and am practicing handbalancing, partner acrobatics, and
              freediving. For 2025 you can mostly find me in Bali and the GMT+8
              timezone.
            </P>
            <P>
              I’m actively seeking new projects and clients. If you think that’s
              you, let’s talk. :)
            </P>
            <CTA />
          </Box>
        </Grid>
      </Container>
    </Box>
  )
}
