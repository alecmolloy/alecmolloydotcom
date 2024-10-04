import { Link } from '@/components/Link'
import { WorkItem } from '@/data/work'
import { Flex } from '@radix-ui/themes'
import Image from 'next/image'
import * as React from 'react'
import { Text as Txt } from '@radix-ui/themes'
import { instrumentSans } from './fonts'

export const WorkCard: React.FunctionComponent<{
  item: WorkItem
}> = ({ item }) => {
  return (
    <Flex
      key={item.name}
      id={item.name}
      gridColumn={{
        initial: 'span 1',
        xs: 'span 3',
      }}
      style={{
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      <Link
        href={item.URL}
        target='_new'
        style={{
          textDecoration: 'none',
          color: '#444',
          width: '100%',
        }}
      >
        <Flex position='relative'>
          <Image
            alt={item.title}
            src={item.img}
            style={{
              aspectRatio: '4/3',
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
          <Flex
            position='absolute'
            bottom='0'
            pt='6'
            px='4'
            pb='4'
            width='100%'
            height='50%'
            style={{
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              mask: `linear-gradient(
                to bottom,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, 1) 100%
              )`,
            }}
          >
            <Txt size='1' className={instrumentSans.className}>
              {item.title}{' '}
              <span style={{ fontStyle: 'normal', color: '#888' }}>
                ({item.date})
              </span>
              <Txt style={{ color: '#888' }}>{item.description}</Txt>
            </Txt>
          </Flex>
        </Flex>
      </Link>
    </Flex>
  )
}
