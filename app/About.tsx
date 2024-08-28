import { Container, Text as Txt } from '@radix-ui/themes'
import React from 'react'
import { workSans } from './fonts'

const P: React.FC<React.ComponentProps<typeof Txt>> = (props) => (
  <Txt as='p' size='6' {...props} className={workSans.className} />
)

export const About = () => (
  <Container
    size='2'
    id='about'
    m='9'
    // style={{
    //   maxWidth: '30em',
    //   margin: '0 auto',
    //   minHeight: '100vh',
    //   color: '#7B6667',
    // }}
  >
    <P>
      I am a creative technologist: designing and building tools for the
      expansion of human consciousness. I’ve built creative tools and
      educational software at <a href='http://adobe.com'>Adobe</a>,{' '}
      <a href='http://kano.me'>Kano Computing</a>, and{' '}
      <a href='https://utopia.app'>Utopia</a>, and managed mobile healthcare at{' '}
      <a href='http://mindoktor.se'>Min Doktor</a>.
    </P>
    <P>
      When I was ten I played Neopets and wanted a store, so I started to learn
      web languages. But in the last decade I moved deep into the Typescript and
      React mines. I’ve built React Native apps, and an integrated
      design/development environment at Utopia. I presently work with
      React/Next.js and have started building native iOS apps with SwiftUI.
    </P>
    <P>
      My first job though, was as an editorial designer—starting at Adobe,
      helping publishing dinosaurs transition to digital. While there I built
      learning games for Photoshop and Illustrator, and got hooked on creating
      tools for{' '}
      <a href='https://worrydream.com/MediaForThinkingTheUnthinkable/'>
        thinking unthinkable thoughts
      </a>
      .
    </P>
    <P>
      I’m living on the road, studying nondual philosophy and meditation, and
      building my own software development studio. I’m currently building{' '}
      <a href='https://retreat.technology'>retreat.technology</a>, and a
      meditation app with Hareesh Wallace for his translation of the
      1100-year-old <i>Vijñana-bhairava-tantra</i>.
    </P>
    <P>
      I’m actively seeking new clients and projects that are purpose-driven. If
      you think that’s you, please get in contact: workwith@alecmolloy.com
    </P>
  </Container>
)
