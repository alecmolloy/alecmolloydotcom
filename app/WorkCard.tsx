import { Link } from '@/components/Link'
import { WorkItem } from '@/data/work'
import { Flex } from '@radix-ui/themes'
import * as React from 'react'

export const WorkCard: React.FunctionComponent<{
  item: WorkItem
}> = ({ item }) => {
  return (
    <Flex
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
    </Flex>
  )
}
