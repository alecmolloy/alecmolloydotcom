import { vbt } from '@/data/portfolio/vbt'
import { WorkItems } from '@/data/work'
import { Container, Flex, Grid } from '@radix-ui/themes'
import Image from 'next/image'
import React from 'react'
import { Section } from './Navigation'
import SimplexNoiseCanvas from './SimplexNoiseCanvas'
import { WorkCard } from './WorkCard'
import { defaultGridProps } from './theme'

export const Portfolio: React.FunctionComponent<{ id: Section }> = ({ id }) => (
  <Container
    size='4'
    id={id}
    style={{
      minHeight: '100vh',
    }}
    my='9'
    py='9'
  >
    <Grid {...defaultGridProps} className='wrapper work-wrapper'>
      <Flex gridColumn='span 5'>
        {vbt.hero.type === 'image' ? (
          <Image
            width='800'
            style={{ width: '100%', height: 'auto' }}
            src={vbt.hero.data}
            alt=''
          />
        ) : (
          <video src={vbt.hero.url} poster={vbt.hero.poster.src} />
        )}
      </Flex>
      <Flex gridColumn='span 5'>
        <SimplexNoiseCanvas cellSize={25} />
      </Flex>
      {WorkItems.map((item, i) => (
        <WorkCard key={i} item={item} />
      ))}
    </Grid>
  </Container>
)
