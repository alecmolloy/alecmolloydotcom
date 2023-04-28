import { ThingsItem, ThingsItems } from '@/data/things'
import Img from 'next/image'
import * as React from 'react'
import Link from 'next/link'
import { Header } from '../Header'

const ThingsCard: React.FunctionComponent<{
  item: ThingsItem
}> = ({ item }) => {
  return (
    <li
      key={item.name}
      id={item.name}
      style={{
        gridColumn: 'span 1',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <Link
        href={item.URL}
        target='_new'
        style={{
          textDecoration: 'none',
          color: '#444',
        }}
      >
        <img
          alt={item.title}
          src={item.img.src}
          width={400}
          height={300}
          style={{
            maxWidth: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
        <div
          style={{
            marginTop: '0.5em',
            fontSize: '0.66em',
            lineHeight: '1.5em',
            fontStyle: 'italic',
          }}
        >
          {item.title}{' '}
          <span style={{ fontStyle: 'normal', color: '#888' }}>
            ({item.date})
          </span>
        </div>
        <div
          style={{
            fontSize: '0.66em',
            lineHeight: '1.5em',
            color: '#888',
          }}
        >
          {item.description}
        </div>
      </Link>
    </li>
  )
}

const Things = () => {
  return (
    <>
      <Header breadcrumbs={['things']} />
      <ol
        className='wrapper things-wrapper'
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
        {ThingsItems.map((item, i) => (
          <ThingsCard key={i} item={item} />
        ))}
      </ol>
    </>
  )
}

export default Things
