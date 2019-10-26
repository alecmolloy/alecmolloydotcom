import * as React from 'react'
import {
  MakeArtItem,
  MakeArtItemSchema,
  MakeArtItemModel,
} from '../../../schemas/make-art-items-schema'
import Header from './../header'
import * as Moment from 'moment'

const breadcrumbs = ['things', 'make-art']

export const MakeArtCard: React.FunctionComponent<{ item: MakeArtItem }> = ({ item }) => {
  return (
    <li key={item.title} id={item.title} style={{}}>
      <div
        style={{
          flex: '1 0 250px',
        }}
      >
        <img
          className='makeArtItem-card-img'
          src={`/things/make-art/${item.thumbnail}`}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
          }}
        />
      </div>
      <div
        className='makeArtItem-card-info'
        style={{
          flex: '1 0',
        }}
      >
        <div className='makeArtItem-card-title'>
          <span style={{ fontStyle: 'italic' }}>{item.title}</span>{' '}
          <span style={{ color: '#888' }}>({Moment(item.date).fromNow()})</span>
        </div>
        {item.description != '' ? (
          <div className='makeArtItem-card-description'>{item.description}</div>
        ) : null}
      </div>
    </li>
  )
}

export const MakeArtCreations = async () => {
  const items = await MakeArtItemModel.find({}, null, {
    limit: undefined,
    sort: '+orderDate',
  })

  return (
    <>
      {Header(breadcrumbs)}
      <div
        className='wrapper'
        style={{
          margin: '4em auto',
        }}
      >
        <p>
          My favorite creative tool is Make Art: a tool built by Tancredi Trugenberger for Kano. I
          worked at Kano from 2014 until 2016, where I used this tool to make sketches of ideas, and
          see if I could get them to render without crashing my browser. I wrote most of the tool's
          learning challenges, which taught programming and graphics concepts to beginner coders.
          The creations below are a sample of my best work in the tool, many of which been remixed
          hundreds of times by Kano World users.
        </p>
        <p>
          The tool still is available at <a href='http://art.kano.me'>art.kano.me</a>, and my
          creations on <a href='https://world.kano.me/users/alec'>world.kano.me</a> but both are
          poorly maintained, so I’ve archived them here.
        </p>
      </div>
      <ol
        className='portfolio-wrapper wrapper'
        style={{
          padding: '0 0.5rem 1em',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, calc(33.3333% - 0.5rem))',
          gridColumnGap: '1rem',
          gridRowGap: '1.5rem',
          margin: '1rem auto',
          listStyle: 'none',
        }}
      >
        {items.map((item, index) => (
          <MakeArtCard item={item} />
        ))}
      </ol>
    </>
  )
}
