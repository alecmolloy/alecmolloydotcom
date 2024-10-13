'use client'

import ClientOnlyPortal from '@/components/ClientOnlyPortal'
import { projects } from '@/data/portfolio'
import { adobe } from '@/data/portfolio/adobe'
import { elements3D } from '@/data/portfolio/elements-3d'
import { gameOfLife } from '@/data/portfolio/game-of-life'
import { instantReplay } from '@/data/portfolio/instant-replay'
import { kano } from '@/data/portfolio/kano'
import { localWelcome } from '@/data/portfolio/local-welcome'
import { minDoktor } from '@/data/portfolio/min-doktor'
import { nuclearConnections } from '@/data/portfolio/nuclear-connections'
import { retreatTechnology } from '@/data/portfolio/retreat-technology'
import { utopia } from '@/data/portfolio/utopia'
import { vbt } from '@/data/portfolio/vbt'
import { Container, Flex, Grid, Text as Txt } from '@radix-ui/themes'
import { animated, useSpring } from '@react-spring/web'
import React from 'react'
import { isProjectSlug, ProjectSlug } from './content-types'
import { Section } from './Navigation'
import { cardStyle, PortfolioCard } from './PortfolioCard'
import SimplexNoiseCanvas from './SimplexNoiseCanvas'
import { defaultGridProps } from './theme'
import { acroyogaTransitions } from '@/data/portfolio/acroyoga-transitions'

const AnimatedFlex = animated(Flex)

const simplexNoiseProps = {
  cellSize: 250,
  darkColor: '#fafafa',
  lightColor: '#ffffff',
  pixelSize: 10,
}

export const Portfolio: React.FunctionComponent<{ id: Section }> = ({ id }) => {
  const [openModalId, setOpenModalId] = React.useState<ProjectSlug | null>(null)

  const [spring, api] = useSpring<{
    top: number
    left: number
    width: number
    height: number
    x: number
    y: number
    scale: number
  }>(() => ({}))

  const onOpenModal = React.useCallback(
    (
      id: ProjectSlug,
      originTop: number,
      originLeft: number,
      originWidth: number,
      originHeight: number,
    ) => {
      setOpenModalId(id)
      const width = Math.min(760, window.innerWidth * 0.8)
      const height = Math.min(500, window.innerHeight * 0.8)
      const x = -width / 2
      const y = -height / 2
      api.start({
        from: {
          left: originLeft,
          top: originTop,
          width: originWidth,
          height: originHeight,
          x: 0,
          y: 0,
          scale: 1.02,
        },
        to: {
          left: window.innerWidth / 2,
          top: window.innerHeight / 2,
          width,
          height,
          x,
          y,
          scale: 1,
        },
      })
    },
    [],
  )

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    if (id && isProjectSlug(id)) {
      setOpenModalId(id)
    }
  }, [])

  React.useEffect(() => {
    if (openModalId) {
      const url = new URL(window.location.href)
      url.searchParams.set('id', openModalId)
      url.hash = 'portfolio'
      window.history.pushState({}, '', url.toString())
    } else {
      const url = new URL(window.location.href)
      url.searchParams.delete('id')
      url.hash = '#portfolio'
      window.history.pushState({}, '', url.toString())
    }
  }, [openModalId])

  const handleCloseModal = React.useCallback(() => {
    setOpenModalId(null)
  }, [])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleCloseModal])

  return (
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
          gridColumn='span 7'
          size='lg'
          onOpenModal={onOpenModal}
        />
        <Flex
          gridColumn={{ initial: '1 / -1', xs: '8 / span 5' }}
          direction='column'
          gap={defaultGridProps.gap}
        >
          <PortfolioCard project={utopia} size='md' onOpenModal={onOpenModal} />
          <SimplexNoiseCanvas
            {...simplexNoiseProps}
            display={{ initial: 'none', xs: 'flex' }}
            gridColumn='1 / 1'
          />
        </Flex>
        <PortfolioCard
          project={nuclearConnections}
          gridColumn={{ initial: '1 / -1', xs: 'span 6' }}
          size='sm'
          onOpenModal={onOpenModal}
        />
        <PortfolioCard
          project={retreatTechnology}
          gridColumn={{ initial: '1 / -1', xs: 'span 6' }}
          size='sm'
          onOpenModal={onOpenModal}
        />
        <PortfolioCard
          project={gameOfLife}
          gridColumn={{ initial: '1 / -1', xs: 'span 3' }}
          size='sm'
          onOpenModal={onOpenModal}
        />{' '}
        {/* <Flex
          justify='center'
            pt='9'
            gridColumn={{ initial: '1 / -1', xs: 'span 1' }}
          >
            <Txt size='8' style={{ color: '#0003', cursor: 'default' }}>
              {'\u263A'}
            </Txt>
          </Flex> */}
        <PortfolioCard
          project={instantReplay}
          gridColumn={{ initial: '1 / -1', xs: 'span 3' }}
          size='sm'
          onOpenModal={onOpenModal}
        />
        <PortfolioCard
          project={acroyogaTransitions}
          gridColumn={{ initial: '1 / -1', xs: 'span 3' }}
          size='lg'
          onOpenModal={onOpenModal}
        />
        <SimplexNoiseCanvas
          {...simplexNoiseProps}
          display={{ initial: 'flex', xs: 'none' }}
          gridColumn='8 / 1'
        />
        <PortfolioCard
          project={localWelcome}
          gridColumn='span 6'
          onOpenModal={onOpenModal}
        />
        <PortfolioCard
          project={minDoktor}
          gridColumn='span 6'
          onOpenModal={onOpenModal}
        />
        <PortfolioCard
          project={kano}
          gridColumn='span 9'
          size='lg'
          onOpenModal={onOpenModal}
        />
        <PortfolioCard
          project={elements3D}
          gridColumn='span 3'
          onOpenModal={onOpenModal}
        />
        <PortfolioCard
          project={adobe}
          gridColumn='span 8'
          size='lg'
          onOpenModal={onOpenModal}
        />
      </Grid>
      {openModalId != null && (
        <ClientOnlyPortal selector='body'>
          <Flex
            position='fixed'
            top='0'
            left='0'
            right='0'
            bottom='0'
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
            align='center'
            justify='center'
            onClick={handleCloseModal}
          />
          <AnimatedFlex
            style={{
              position: 'fixed',
              backgroundColor: 'white',
              zIndex: 1,
              ...cardStyle,
              ...spring,
            }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <Txt>{projects[openModalId].title}</Txt>
          </AnimatedFlex>
        </ClientOnlyPortal>
      )}
    </Container>
  )
}
