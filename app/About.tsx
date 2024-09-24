import { Box, Container, Flex, Grid, Text as Txt } from '@radix-ui/themes'
import Image from 'next/image'
import React from 'react'
import { workSans } from './fonts'
import { LocationsScroller } from './LocationsScroller'
import { Section } from './Navigation'
import { TurtleMeander } from './TurtleMeander'

const P: React.FC<React.ComponentProps<typeof Txt>> = (props) => (
  <Txt
    as='p'
    size='6'
    {...props}
    style={{ ...props.style, marginBottom: '1em' }}
    className={workSans.className}
  />
)

export const About: React.FunctionComponent<{ id: Section }> = ({ id }) => (
  <Box id={id}>
    <Container
      size='4'
      p='4'
      px={{ initial: '4', xs: '0' }}
      style={{ paddingTop: 128 }}
    >
      <Grid columns={{ initial: '1', xs: '7' }} gap={{ initial: '4', md: '7' }}>
        <Flex
          gridColumn={{ initial: '1', xs: '2 / span 2' }}
          justify={{ initial: 'center', xs: 'end' }}
          align='start'
        >
          <img
            src='/alec-glass.png'
            alt='Alec Molloy'
            height='auto'
            style={{
              width: '100%',
              maxWidth: 256,
              imageRendering: 'pixelated',
            }}
          />
        </Flex>
        <Box gridColumn={{ initial: '1', xs: '4 / span 4' }}>
          <P>
            I am a creative technologist, designing and building tools for the
            expansion of consciousness.
          </P>
          <P>
            I’ve built creative tools and educational software at{' '}
            <a href='http://adobe.com'>Adobe</a>,{' '}
            <a href='http://kano.me'>Kano Computing</a>, and{' '}
            <a href='https://utopia.app'>Utopia</a>, and managed mobile
            healthcare at <a href='http://mindoktor.se'>Min Doktor</a>.
          </P>
          <P>
            When I was ten I played Neopets and wanted a store, so I started to
            learn web languages. But in the last decade I moved deep into the
            Typescript and React mines. I’ve built React Native apps, and an
            integrated design/development environment at Utopia. I presently
            work with React/Next.js and have started building native iOS apps
            with SwiftUI.
          </P>
          <P>
            My first job though, was as an editorial designer—starting at Adobe,
            helping publishing dinosaurs transition to digital. While there I
            built learning games for Photoshop and Illustrator, and got hooked
            on creating tools for{' '}
            <a href='https://worrydream.com/MediaForThinkingTheUnthinkable/'>
              thinking unthinkable thoughts
            </a>
            .
          </P>
          <P>
            I’m living on the road, studying nondual philosophy and meditation,
            and building my own software development studio. I’m currently
            building <a href='https://retreat.technology'>retreat.technology</a>
            , and a meditation app with Hareesh Wallace for his translation of
            the 1100-year-old <i>Vijñana-bhairava-tantra</i>.
          </P>
          <P>
            I’m actively seeking new clients and projects that are
            purpose-driven. If you think that's you, please get in contact:
            workwith@alecmolloy.com
          </P>
        </Box>
      </Grid>
    </Container>

    <TurtleMeander height={4} />
    <LocationsScroller />
    <TurtleMeander height={4} />
  </Box>
)
