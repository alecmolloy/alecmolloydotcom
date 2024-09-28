import { WorkItems } from '@/data/work'
import { Container, Grid } from '@radix-ui/themes'
import React from 'react'
import { Section } from './Navigation'
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
      {WorkItems.map((item, i) => (
        <WorkCard key={i} item={item} />
      ))}
    </Grid>
  </Container>
)
