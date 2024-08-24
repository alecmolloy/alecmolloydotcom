import { WorkItems } from '@/data/work'
import Head from 'next/head'
import React from 'react'
import { workSans } from './fonts'
import { Header } from './Header'
import { WorkCard } from './work/page'

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
      <Header breadcrumbs={[]} />
      <main className={['wrapper', workSans.className].join(' ')}>
        <section
          id='hero'
          style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p>Hero Artwork</p>
        </section>
        <section
          id='about'
          style={{
            maxWidth: '30em',
            margin: '0 auto',
            minHeight: '100vh',
          }}
        >
          <p>
            I am a creative technologist: designing and building tools for the
            expansion of human consciousness. I’ve built creative tools and
            educational software at <a href='http://adobe.com'>Adobe</a>,{' '}
            <a href='http://kano.me'>Kano Computing</a>, and{' '}
            <a href='https://utopia.app'>Utopia</a>, and managed mobile
            healthcare at <a href='http://mindoktor.se'>Min Doktor</a>.
          </p>
          <p>
            When I was ten I played Neopets and wanted a store, so I started to
            learn web languages. But in the last decade I moved deep into the
            Typescript and React mines. I’ve built React Native apps, and an
            integrated design/development environment at Utopia. I presently
            work with React/Next.js and have started building native iOS apps
            with SwiftUI.
          </p>
          <p>
            My first job though, was as an editorial designer—starting at Adobe,
            helping publishing dinosaurs transition to digital. While there I
            built learning games for Photoshop and Illustrator, and got hooked
            on creating tools for{' '}
            <a href='https://worrydream.com/MediaForThinkingTheUnthinkable/'>
              thinking unthinkable thoughts
            </a>
            .
          </p>
          <p>
            I’m living on the road, studying nondual philosophy and meditation,
            and building my own software development studio. I’m currently
            building <a href='https://retreat.technology'>retreat.technology</a>
            , and a meditation app with Hareesh Wallace for his translation of
            the 1100-year-old <i>Vijñana-bhairava-tantra</i>.
          </p>
          <p>
            I’m actively seeking new clients and projects that are
            purpose-driven. If you think that’s you, please get in contact:
            workwith@alecmolloy.com
          </p>
        </section>
        <section
          id='portfolio'
          style={{
            minHeight: '100vh',
          }}
        >
          <ol
            className='wrapper work-wrapper'
            style={{
              display: 'grid',
              listStyle: 'none',
              overflowY: 'hidden',
              padding: '0 0.5rem 1em',
              gridColumnGap: '1rem',
              gridRowGap: '1rem',
              margin: '1rem auto',
            }}
          >
            {WorkItems.map((item, i) => (
              <WorkCard key={i} item={item} />
            ))}
          </ol>
        </section>
        <section>
          <h1>Want to get in touch?</h1>
          <p>Drop me a line at workwith@alecmolloy.com.</p>
        </section>
      </main>
    </>
  )
}
export default Index
