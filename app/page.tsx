import { Link } from '@/components/Link'
import Head from 'next/head'
import React from 'react'
import { Header } from './Header'

const Index: React.FunctionComponent = () => {
  return (
    <>
      <Head>
        <title>alec molloy dot com</title>
        <meta
          name='description'
          content='the official web presence of alec molloy™'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' type='img=png' href='/favicon.png' />
        <meta name='og:image' content='http://alecmolloy.com/favicon.png' />
      </Head>
      <Header breadcrumbs={[]} />
      <main className='wrapper'>
        <p>
          I am a web master, artist, yoga and acroyoga teacher. I’ve built tools
          and taught creativity at <Link href='http://adobe.com'>Adobe</Link>,{' '}
          <Link href='http://kano.me'>Kano Computing</Link>, and{' '}
          <Link href='https://utopia.app'>Utopia</Link>; and managed mobile
          healthcare at <Link href='http://mindoktor.se'>Min Doktor</Link>.
        </p>
        <p>
          Currently I am living in London, and building low-code tech
          infrastructure for{' '}
          <Link href='https://localwelcome.org'>Local Welcome</Link>.
        </p>
      </main>
    </>
  )
}
export default Index
