import { MakeArtItem } from '@/data/make-art'
import { Flex, Link, Text as Txt } from '@radix-ui/themes'
import { Squircle } from '@squircle-js/react'
import Img from 'next/image'
import React from 'react'

export const MakeArtCard: React.FunctionComponent<{ item: MakeArtItem }> = ({
  item,
}) => {
  return (
    <Flex
      direction='column'
      id={item.title}
      className='make-art-item'
      style={{ cursor: 'pointer' }}
      onClick={() => {
        window.open(item.thumbnail.src, '_blank')
      }}
    >
      <Squircle cornerRadius={8}>
        <Img
          alt={item.title}
          src={item.thumbnail}
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            backgroundColor: 'white',
          }}
        />
      </Squircle>
      <Txt size='2'>
        <em>{item.title} </em>
        <Txt style={{ color: '#888' }}>
          ({item.date.getFullYear()}){' '}
          <Link
            className='make-art-code-link'
            href={`/portfolio/make-art/${item.code}`}
            onClick={(e) => {
              e.stopPropagation()
            }}
            target='_blank'
            style={{ color: 'inherit', opacity: 0 }}
          >
            Code&nbsp;→
          </Link>
        </Txt>
      </Txt>
    </Flex>
  )
}
