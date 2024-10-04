import { elements3D } from '@/data/portfolio/elements-3d'
import { kano } from '@/data/portfolio/kano'
import { localWelcome } from '@/data/portfolio/local-welcome'
import { minDoktor } from '@/data/portfolio/min-doktor'
import { nuclearConnections } from '@/data/portfolio/nuclear-connections'
import { retreatTechnology } from '@/data/portfolio/retreat'
import { utopia } from '@/data/portfolio/utopia'
import { vbt } from '@/data/portfolio/vbt'
import { Container, Flex, Grid } from '@radix-ui/themes'
import React from 'react'
import { Section } from './Navigation'
import { PortfolioCard } from './PortfolioCard'
import SimplexNoiseCanvas from './SimplexNoiseCanvas'
import { defaultGridProps } from './theme'

export const Portfolio: React.FunctionComponent<{ id: Section }> = ({ id }) => (
  <Container
    size='4'
    id={id}
    style={{
      minHeight: '100vh',
    }}
    my='9'
    mx='4'
    py='9'
  >
    <Grid {...defaultGridProps} className='wrapper work-wrapper'>
      <PortfolioCard project={vbt} gridColumn='span 6' large />
      <Flex
        gridColumn={{ initial: '1 / -1', sm: '7 / span 3' }}
        direction='column'
        gap='4'
      >
        <PortfolioCard project={retreatTechnology} />
        <SimplexNoiseCanvas
          display={{ initial: 'none', sm: 'flex' }}
          cellSize={500}
          darkColor='#fafafa'
          lightColor='#ffffff'
          pixelSize={10}
        />
      </Flex>

      <SimplexNoiseCanvas
        gridColumn='1 / 1'
        cellSize={500}
        darkColor='#fafafa'
        lightColor='#ffffff'
        pixelSize={10}
      />
      <PortfolioCard
        project={utopia}
        gridColumn={{ initial: '2 / -1', sm: 'span 4' }}
      />
      <PortfolioCard
        project={nuclearConnections}
        gridColumn={{ initial: '1 / span 5', sm: 'span 4' }}
      />
      <SimplexNoiseCanvas
        display={{ initial: 'flex', sm: 'none' }}
        gridColumn='6 / 1'
        cellSize={500}
        darkColor='#fafafa'
        lightColor='#ffffff'
        pixelSize={10}
      />

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
      <PortfolioCard project={kano} gridColumn='span 6' />
    </Grid>
  </Container>
)
