import { CTA } from '@/components/CTA'
import alecDithered from '@/public/alec-dithered.png'
import {
  Box,
  Container,
  Flex,
  Grid,
  Strong,
  Text as Txt,
} from '@radix-ui/themes'
import React from 'react'
import { projectURLPath } from './content-types'
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
      <Container size='4' pb='4' pt='9' mt='9' {...defaultContainerProps}>
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
              noScript={alecDithered}
            />
          </Flex>
          <Box
            gridColumn={{ initial: '1 / span 12', xs: 'span 8', md: 'span 6' }}
          >
            <P>
              I’m a creative technologist, and React, React Native, and Next.js
              specialist. I work in the pursuit of presence, beauty, and the
              expansion of consciousness through intentional design. And I’m
              looking for new projects. ʕ&nbsp;•ᴥ•ʔ
            </P>
            <P>
              I’m currently building{' '}
              <a href='https://tantra112.app'>TANTRA 112</a> with bestselling
              author and sanskritist Dr. Hareesh Wallis, bringing the revered
              9th-century yogic practice guide, the{' '}
              <i>Vijñana-bhairava-tantra</i>, into a guided meditation app.
            </P>
            <P>
              I’ve developed creative tools and educational software at{' '}
              <a href='http://adobe.com'>Adobe</a>,{' '}
              <a href='http://kano.me'>Kano Computing</a>, and{' '}
              <a href='https://utopia.app'>Utopia</a>, and led mobile healthcare
              at <a href='http://mindoktor.se'>Min Doktor</a>.
            </P>
            <P>
              Over the last decade plus, I have been obsessed with building
              tools for{' '}
              <a href='https://worrydream.com/MediaForThinkingTheUnthinkable/'>
                thinking unthinkable thoughts
              </a>
              . Opinionated creative tools that abstract away complexity for
              higher-level thinking, or integrate modes of thinking (component
              UI design, state, and logic) into a single environment. Or tools
              that can help us go to where thoughts cannot.
            </P>
            <P>
              My latest projects, including the upcoming{' '}
              <a
                href={projectURLPath('tantra-112')}
                target='_blank'
                rel='noopener noreferrer'
              >
                VBT app
              </a>{' '}
              and{' '}
              <a
                href={projectURLPath('retreat-technology')}
                target='_blank'
                rel='noopener noreferrer'
              >
                Retreat.Technology
              </a>
              , embody these themes. But family is just as important to me,
              which is where{' '}
              <a
                href={projectURLPath('nuclear-connections')}
                target='_blank'
                rel='noopener noreferrer'
              >
                Nuclear Connections
              </a>{' '}
              came from.
            </P>
            <P>
              Away from my keyboard, I study nondual philosophy and meditation,
              and practice handbalancing, partner acrobatics, and freediving.
            </P>
            <P>
              I’m actively seeking new <Strong>fully-remote</Strong>{' '}
              opportunities. If you think you’ve got one for me, let’s talk.
              &#x263A;
            </P>
            <CTA />
          </Box>
        </Grid>
      </Container>
    </Box>
  )
}
