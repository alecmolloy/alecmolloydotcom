import { adobe } from '@/data/portfolio/adobe'
import { elements3D } from '@/data/portfolio/elements-3d'
import { kano } from '@/data/portfolio/kano'
import { localWelcome } from '@/data/portfolio/local-welcome'
import { minDoktor } from '@/data/portfolio/min-doktor'
import { nuclearConnections } from '@/data/portfolio/nuclear-connections'
import { retreatTechnology } from '@/data/portfolio/retreat'
import { utopia } from '@/data/portfolio/utopia'
import { vbt } from '@/data/portfolio/vbt'
import { Container, Flex, Grid, Text as Txt } from '@radix-ui/themes'
import React from 'react'
import { Section } from './Navigation'
import { PortfolioCard } from './PortfolioCard'
import SimplexNoiseCanvas from './SimplexNoiseCanvas'
import { defaultGridProps } from './theme'
import { instantReplay } from '@/data/portfolio/instant-replay'
import { gameOfLife } from '@/data/portfolio/gameOfLife'

const simplexNoiseProps = {
  cellSize: 250,
  darkColor: '#fafafa',
  lightColor: '#ffffff',
  pixelSize: 10,
}

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
      <PortfolioCard
        project={vbt}
        gridColumn='span 6'
        size='lg'
        titleMode='light'
      />
      <Flex
        gridColumn={{ initial: '1 / -1', xs: '7 / span 3' }}
        direction='column'
        gap='4'
      >
        <PortfolioCard project={utopia} size='md' />
        <SimplexNoiseCanvas
          {...simplexNoiseProps}
          display={{ initial: 'none', xs: 'flex' }}
          gridColumn='1 / 1'
        />
      </Flex>
      <PortfolioCard
        project={nuclearConnections}
        titleMode='dark'
        gridColumn={{ initial: '1 / -1', xs: 'span 2' }}
        size='sm'
      />
      <PortfolioCard
        project={retreatTechnology}
        titleMode='dark'
        gridColumn={{ initial: '1 / -1', xs: 'span 2' }}
        size='sm'
      />
      <Flex
        justify='center'
        pt='9'
        gridColumn={{ initial: '1 / -1', xs: 'span 1' }}
      >
        <Txt size='8' style={{ color: '#0003', cursor: 'default' }}>
          {'\u263A'}
        </Txt>
      </Flex>
      <PortfolioCard
        project={gameOfLife}
        titleMode='dark'
        gridColumn={{ initial: '1 / -1', xs: 'span 2' }}
        size='sm'
      />
      <PortfolioCard
        project={instantReplay}
        titleMode='dark'
        gridColumn={{ initial: '1 / -1', xs: 'span 2' }}
        size='sm'
      />

      <SimplexNoiseCanvas {...simplexNoiseProps} gridColumn='1 / 1' />
      <PortfolioCard
        project={utopia}
        titleMode='dark'
        gridColumn={{ initial: '2 / -1', xs: 'span 4' }}
        size='lg'
      />
      <PortfolioCard
        project={nuclearConnections}
        gridColumn={{ initial: '1 / span 5', xs: 'span 4' }}
        size='sm'
      />
      <SimplexNoiseCanvas
        {...simplexNoiseProps}
        display={{ initial: 'flex', xs: 'none' }}
        gridColumn='6 / 1'
      />

      <PortfolioCard
        project={localWelcome}
        gridColumn='span 3'
        titleMode='light'
      />
      <Flex gridColumn='span 2'>
        <SimplexNoiseCanvas
          cellSize={500}
          darkColor='#fafafa'
          lightColor='#ffffff'
          pixelSize={10}
        />
      </Flex>
      <PortfolioCard
        project={minDoktor}
        gridColumn='span 4'
        titleMode='light'
      />
      <PortfolioCard
        project={kano}
        gridColumn='span 6'
        size='lg'
        titleMode='dark'
      />
      <PortfolioCard
        project={elements3D}
        gridColumn='span 3'
        titleMode='light'
      />
      <PortfolioCard
        project={adobe}
        gridColumn='span 6'
        size='lg'
        titleMode='light'
      />
    </Grid>
  </Container>
)
