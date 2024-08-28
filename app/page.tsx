import Head from 'next/head'
import React from 'react'
import { About } from './About'
import { Header } from './Header'
import { HeroArtwork } from './HeroArtwork'
import { Portfolio } from './Portfolio'
import { Contact } from './Contact'

const Index: React.FunctionComponent = () => {
  return (
    <>
      <Head>
        <title>Alec Molloy‘s Official Home on the Web</title>
        <meta
          name='description'
          content='The Official Web Presence of Alec Molloy™'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' type='img=png' href='/favicon.png' />
        <meta name='og:image' content='http://alecmolloy.com/favicon.png' />
      </Head>
      <Header />
      <HeroArtwork />
      <About />
      <Portfolio />
      <Contact />
    </>
  )
}
export default Index
