import { Header } from '@/app/Header'
import { MakeArtItem, MakeArtItems } from '@/data/make-art'
import Moment from 'moment'
import Img from 'next/image'
import Link from 'next/link'
import * as React from 'react'

const MakeArtCard: React.FunctionComponent<{ item: MakeArtItem }> = ({
  item,
}) => {
  return (
    <li key={item.title} id={item.title}>
      <Link
        href={`/things/make-art/${item.code}`}
        style={{ textDecoration: 'none', color: 'initial' }}
      >
        <div>
          <Img
            alt={item.title}
            src={item.thumbnail}
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
      <Header breadcrumbs={['things', 'make-art']} />
      <div
        className='wrapper'
        style={{
          margin: '2em auto',
        }}
      >
        <p>
          My favorite creative coding tool is Make Art: a tool built by Tancredi
          Trugenberger for Kano. I worked there from 2014 until 2016, where I
          used this tool to make sketches of ideas, and see if I could get them
          to render without crashing my browser. I wrote most of the
          tool&lsquo;s learning challenges, which taught programming and
          graphics concepts to beginner coders. The creations below are a sample
          of my favorite work with the tool, some with countless remixes by
          other Kano World creators.
        </p>
        <p>
          The tool still is available at{' '}
          <a href='http://art.kano.me'>art.kano.me</a>, and my creations on{' '}
          <a href='https://world.kano.me/users/alec'>world.kano.me</a> but sadly
          both are poorly maintained, so I’ve archived them here.
        </p>
      </div>
      <ol
        className='wrapper'
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
