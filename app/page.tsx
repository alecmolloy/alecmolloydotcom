import { Box } from '@radix-ui/themes'
import { Metadata } from 'next'
import React from 'react'
import { About } from './About'
import { Contact } from './Contact'
import { Header } from './Header'
import { HeroCanvas } from './HeroCanvas'
import { Portfolio } from './Portfolio'

export const metadata: Metadata = {
  title: 'Alec Molloy’s Official Home on the Web',
  description: 'The Official Web Presence of Alec Molloy™',
  openGraph: {
    images: ['/favicon.png'],
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
        <Header />
        <About id='about' />
        <Portfolio id='portfolio' />
        <Contact id='contact' />
      </Box>
    </>
  )
}
export default Index
