import { Box } from '@radix-ui/themes'
import { Metadata } from 'next'
import React from 'react'
import { About } from './About'
import { Contact } from './Contact'
import { Header } from './Header'
import { HeroArtwork } from './HeroArtwork'
import { Portfolio } from './Portfolio'

export const metadata: Metadata = {
  title: 'Alec Molloy‘s Official Home on the Web',
  description: 'The Official Web Presence of Alec Molloy™',
  openGraph: {
    images: ['/favicon.png'],
  },
}

const Index: React.FunctionComponent = () => {
  return (
    <>
      <Box style={{ backgroundColor: 'var(--international-orange-9)' }}>
        <Header />
        <HeroArtwork />
      </Box>
      <About />
      <Portfolio />
      <Contact />
    </>
  )
}
export default Index
