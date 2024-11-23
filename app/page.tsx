import { PortfolioId } from '@/utils/utils'
import { Box } from '@radix-ui/themes'
import { Metadata } from 'next'
import React from 'react'
import { About } from './About'
import { Contact } from './Contact'
import { Footer } from './Footer'
import { HeroCanvas } from './HeroCanvas'
import { Navigation } from './Navigation'
import { Portfolio } from './Portfolio'
import { TurtleMeander } from './TurtleMeander'

export const metadata: Metadata = {
  metadataBase: new URL('https://alecmolloy.com'),
  title: 'Alec Molloy',
  description: 'The Official Web Presence of Alec Molloy™',
  openGraph: {
    images: ['/opengraph-image.jpg'],
  },
}

const Index: React.FunctionComponent = () => {
  return (
    <>
      {[
        '/void/turtle-corner-vertical-square.png',
        '/void/turtle-corner-horizontal-square.png',
        '/void/ajnanam-bandhah.png',
        '/void/xp29_y4gg0s4x63x36x4s0ggzy0okkjgf811xgy1gx118fgjkkozw6226w1y2111x111y21w6226z462y227yd72y2264z264y24eyde4y2462zw64kmggoy28o8x8o8y2oggmk46zy0122cgv1o8y98o1vgc221zy732x6cxc6x23.png',
        '/bayer-16.png',
        '/alec.jpg',
        '/alec-mask.png',
      ].map((src) => (
        <link rel='preload' href={src} as='image' type='image/png' />
      ))}
      <Box
        id='hero'
        style={{
          backgroundColor: 'var(--international-orange)',
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
      >
        <HeroCanvas />
      </Box>
      <Box position='relative'>
        <Navigation />
        <About id='about' />
        <Portfolio id={PortfolioId} />
      </Box>
      <Contact id='contact' />
      <Footer />
      <TurtleMeander height={8} />
    </>
  )
}
export default Index
