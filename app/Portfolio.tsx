import { elements3D } from '@/data/portfolio/elements-3d'
import { localWelcome } from '@/data/portfolio/local-welcome'
import { minDoktor } from '@/data/portfolio/min-doktor'
import { nuclearConnections } from '@/data/portfolio/nuclear-connections'
import { retreatTechnology } from '@/data/portfolio/retreat'
import { utopia } from '@/data/portfolio/utopia'
import { vbt } from '@/data/portfolio/vbt'
import { WorkItems } from '@/data/work'
import { Container, Flex, Grid } from '@radix-ui/themes'
import React from 'react'
import { Section } from './Navigation'
import { PortfolioCard } from './PortfolioCard'
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
    px='4'
    py='9'
  >
    <Grid {...defaultGridProps} className='wrapper work-wrapper'>
      <PortfolioCard project={vbt} gridColumn='span 6' />
      <Flex gridColumn='7 / span 3' direction='column' gap='4'>
        <PortfolioCard project={retreatTechnology} />
        <SimplexNoiseCanvas
          cellSize={500}
          darkColor='#fafafa'
          lightColor='#ffffff'
          pixelSize={10}
        />
      </Flex>
      <Flex gridColumn='span 1'>
        <SimplexNoiseCanvas
          cellSize={500}
          darkColor='#fafafa'
          lightColor='#ffffff'
          pixelSize={10}
        />
      </Flex>
      <PortfolioCard project={utopia} gridColumn='span 4' />
      <PortfolioCard project={nuclearConnections} gridColumn='span 4' />
      <PortfolioCard project={localWelcome} gridColumn='span 3' />
      <Flex gridColumn='span 3'>
        <SimplexNoiseCanvas
          cellSize={500}
          darkColor='#fafafa'
          lightColor='#ffffff'
          pixelSize={10}
        />
      </Flex>
      <PortfolioCard project={minDoktor} gridColumn='span 3' />
      <PortfolioCard project={elements3D} gridColumn='span 3' />
      {WorkItems.map((item, i) => (
        <WorkCard key={i} item={item} />
      ))}
    </Grid>
  </Container>
)
