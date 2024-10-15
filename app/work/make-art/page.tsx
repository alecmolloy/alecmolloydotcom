import { Navigation } from '@/app/Navigation'
import { Link } from '@/components/Link'
import { MakeArtItem, MakeArtItems } from '@/data/make-art'
import { Text as Txt } from '@radix-ui/themes'
import Moment from 'moment'
import * as React from 'react'

const MakeArtCard: React.FunctionComponent<{ item: MakeArtItem }> = ({
  item,
}) => {
  return (
    <li key={item.title} id={item.title}>
      <Link
        href={`/work/make-art/${item.code}`}
        style={{ textDecoration: 'none', color: 'initial' }}
      >
        <div>
          <img
            alt={item.title}
            src={item.thumbnail.src}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'white',
            }}
          />
        </div>
        <div
          style={{
            fontSize: '.75em',
            lineHeight: '1.33em',
          }}
        >
          <div>
            <span style={{ fontStyle: 'italic' }}>{item.title}</span>{' '}
            <span style={{ color: '#888' }}>
              ({Moment(item.date).fromNow()})
            </span>
          </div>
          {item.description != '' ? <div>{item.description}</div> : null}
        </div>
      </Link>
    </li>
  )
}

const MakeArtCreations = async () => {
  return (
    <>
      <Navigation />
      <div
        style={{
          margin: '2em auto',
        }}
      >
        <Txt>
          My favorite creative coding tool is Make Art: a tool built by Tancredi
          Trugenberger for Kano. I worked there from 2014 until 2016, where I
          used this tool to make sketches of ideas, and see if I could get them
          to render without crashing my browser. I wrote most of the
          tool&lsquo;s learning challenges, which taught programming and
          graphics concepts to beginner coders. The creations below are a sample
          of my favorite work with the tool, some with countless remixes by
          other Kano World creators.
        </Txt>
        <Txt>
          The tool still is available at{' '}
          <Link href='http://art.kano.me'>art.kano.me</Link>, and my creations
          on <Link href='https://world.kano.me/users/alec'>world.kano.me</Link>{' '}
          but sadly both are poorly maintained, so I’ve archived them here.
        </Txt>
      </div>
      <ol
        style={{
          padding: '0 0.5rem 1em',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, calc(33.3333% - 0.5rem))',
          gridColumnGap: '1em',
          gridRowGap: '2em',
          margin: '1rem auto',
          listStyle: 'none',
        }}
      >
        {MakeArtItems.map((item, i) => (
          <MakeArtCard key={i} item={item} />
        ))}
      </ol>
    </>
  )
}

export default MakeArtCreations
