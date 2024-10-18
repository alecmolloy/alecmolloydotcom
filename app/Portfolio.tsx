'use client'
import { PortfolioModal, usePortfolioModal } from '@/components/PortfolioModal'
import { acroyogaTransitions } from '@/data/portfolio/acroyoga-transitions'
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
import { Container, Flex, Grid } from '@radix-ui/themes'
import React from 'react'
import { Section } from './Navigation'
import { PortfolioCard } from './PortfolioCard'
import SimplexNoiseCanvas from './SimplexNoiseCanvas'
import { defaultGridProps } from './theme'

const simplexNoiseProps = {
  cellSize: 250,
  darkColor: '#fafafa',
  lightColor: '#ffffff',
  pixelSize: 10,
}

export const Portfolio: React.FunctionComponent<{ id: Section }> = ({ id }) => {
  const { openModalSlug, setOpenModalSlug } = usePortfolioModal()

  React.useEffect(() => {
    if (openModalSlug) {
      const url = new URL(window.location.href)
      url.searchParams.set(ProjectSlugParam, openModalSlug)
      url.hash = 'portfolio'
      window.history.pushState({}, '', url.toString())
    } else {
      const url = new URL(window.location.href)
      url.searchParams.delete(ProjectSlugParam)
      url.hash = '#portfolio'
      window.history.pushState({}, '', url.toString())
    }
  }, [openModalSlug])

  const handleCloseModal = React.useCallback(() => {
    setOpenModalSlug(null)
  }, [setOpenModalSlug])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
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
      <Grid {...defaultGridProps}>
        <PortfolioCard
          project={vbt}
          gridColumn='span 7'
          size='lg'
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === vbt.slug}
        />
        <Flex
          gridColumn={{ initial: '1 / -1', xs: '8 / span 5' }}
          direction='column'
          gap={defaultGridProps.gap}
        >
          <PortfolioCard
            project={utopia}
            size='md'
            setOpenModal={setOpenModalSlug}
            modalOpen={openModalSlug === utopia.slug}
          />
          <SimplexNoiseCanvas
            {...simplexNoiseProps}
            display={{ initial: 'none', xs: 'flex' }}
            gridColumn='1 / 1'
          />
        </Flex>
        <PortfolioCard
          project={nuclearConnections}
          gridColumn={{ initial: '1 / -1', xs: 'span 6' }}
          size='lg'
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === nuclearConnections.slug}
        />
        <PortfolioCard
          project={retreatTechnology}
          gridColumn={{ initial: '1 / -1', xs: 'span 6' }}
          size='lg'
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === retreatTechnology.slug}
        />
        <PortfolioCard
          project={gameOfLife}
          gridColumn={{ initial: '1 / -1', xs: 'span 3' }}
          size='sm'
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === gameOfLife.slug}
        />
        <PortfolioCard
          project={instantReplay}
          gridColumn={{ initial: '1 / -1', xs: 'span 3' }}
          size='sm'
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === instantReplay.slug}
        />
        <PortfolioCard
          project={acroyogaTransitions}
          gridColumn={{ initial: '1 / -1', xs: 'span 3' }}
          size='sm'
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === acroyogaTransitions.slug}
        />
        <SimplexNoiseCanvas
          {...simplexNoiseProps}
          display={{ initial: 'flex', xs: 'none' }}
          gridColumn='8 / 1'
        />
        <PortfolioCard
          project={localWelcome}
          gridColumn='span 6'
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === localWelcome.slug}
        />
        <PortfolioCard
          project={minDoktor}
          gridColumn='span 6'
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === minDoktor.slug}
        />
        <PortfolioCard
          project={kano}
          gridColumn='span 9'
          size='lg'
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === kano.slug}
        />
        <PortfolioCard
          project={elements3D}
          gridColumn='span 3'
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === elements3D.slug}
        />
        <PortfolioCard
          project={adobe}
          gridColumn='span 8'
          size='lg'
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === adobe.slug}
        />
      </Grid>
      <PortfolioModal
        openModalSlug={openModalSlug}
        setOpenModalSlug={setOpenModalSlug}
      />
    </Container>
  )
}

const ProjectSlugParam = 'project'
