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
        <Portfolio id='portfolio' />
      </Box>
      <Contact id='contact' />
      <Footer />
      <TurtleMeander height={8} />
    </>
  )
}
export default Index
