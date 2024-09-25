import { WorkItems } from '@/data/work'
import { Container, Grid } from '@radix-ui/themes'
import React from 'react'
import { Section } from './Navigation'
import { WorkCard } from './WorkCard'

export const Portfolio: React.FunctionComponent<{ id: Section }> = ({ id }) => (
  <Container
    size='4'
    id={id}
    style={{
      minHeight: '100vh',
    }}
  >
    <Grid
      className='wrapper work-wrapper'
      gap={{ initial: '4', md: '7' }}
      columns={{
        initial: '1',
        xs: '9',
      }}
      style={{
        overflowY: 'hidden',
        padding: '0 0.5rem 1em',
        margin: '1rem auto',
      }}
    >
      {WorkItems.map((item, i) => (
        <WorkCard key={i} item={item} />
      ))}
    </Grid>
  </Container>
)
