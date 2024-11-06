import { MakeArtItem } from '@/data/make-art'
import { Link } from '@radix-ui/themes'
import React from 'react'
import Img from 'next/image'
import { Text as Txt } from '@radix-ui/themes'

export const MakeArtCard: React.FunctionComponent<{ item: MakeArtItem }> = ({
  item,
}) => {
  return (
    <Link
      id={item.title}
      href={item.thumbnail.src}
      style={{ textDecoration: 'none', color: 'initial' }}
      target='_blank'
    >
      <Img
        alt={item.title}
        src={item.thumbnail}
        style={{
          width: '100%',
          height: 'auto',
          backgroundColor: 'white',
        }}
      />
      <Txt
        style={{
          fontSize: '.75em',
          lineHeight: '1.33em',
        }}
      >
        <div>
          <span style={{ fontStyle: 'italic' }}>{item.title}</span>{' '}
          <span style={{ color: '#888' }}>({item.date.getFullYear()})</span>{' '}
          <Link href={`/portfolio/make-art/${item.code}`}>[Code]</Link>
        </div>
        {item.description}
      </Txt>
    </Link>
  )
}
