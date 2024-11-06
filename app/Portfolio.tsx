'use client'
import { PortfolioModal, usePortfolioModal } from '@/components/PortfolioModal'
import { projects } from '@/data/portfolio'
import { Container, Grid } from '@radix-ui/themes'
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
          project={projects.vbt}
          gridColumn='span 8'
          gridRow='span 2'
          size='lg'
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === projects.vbt.slug}
        />
        <PortfolioCard
          gridColumn={{ initial: '1 / -1', xs: '9 / span 4' }}
          project={projects['nuclear-connections']}
          size='md'
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === projects['nuclear-connections'].slug}
        />
        <SimplexNoiseCanvas
          {...simplexNoiseProps}
          gridColumn={'9 / span 4'}
          display={{ initial: 'none', xs: 'flex' }}
        />
        <PortfolioCard
          project={projects.utopia}
          gridColumn={{ initial: '1 / -1', xs: 'span 6' }}
          size='lg'
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === projects.utopia.slug}
        />
        <PortfolioCard
          project={projects['retreat-technology']}
          gridColumn={{ initial: '1 / -1', xs: 'span 6' }}
          size='lg'
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === projects['retreat-technology'].slug}
        />
        <PortfolioCard
          project={projects['game-of-life']}
          gridColumn={{ initial: '1 / -1', xs: 'span 4' }}
          size='sm'
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === projects['game-of-life'].slug}
        />
        <PortfolioCard
          project={projects['instant-replay']}
          gridColumn={{ initial: '1 / -1', xs: 'span 4' }}
          size='sm'
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === projects['instant-replay'].slug}
        />
        <PortfolioCard
          project={projects['acroyoga-transitions']}
          gridColumn={{ initial: '1 / -1', xs: 'span 4' }}
          size='sm'
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === projects['acroyoga-transitions'].slug}
        />
        <SimplexNoiseCanvas
          {...simplexNoiseProps}
          display={{ initial: 'flex', xs: 'none' }}
          gridColumn='8 / 1'
        />
        <PortfolioCard
          project={projects['local-welcome']}
          gridColumn='span 6'
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === projects['local-welcome'].slug}
        />
        <PortfolioCard
          project={projects['min-doktor']}
          gridColumn='span 6'
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === projects['min-doktor'].slug}
        />
        <PortfolioCard
          project={projects.kano}
          gridColumn='span 9'
          gridRow='span 3'
          size='lg'
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === projects.kano.slug}
        />
        <PortfolioCard
          project={projects['elements-3d']}
          gridColumn='span 3'
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === projects['elements-3d'].slug}
        />
        <PortfolioCard
          project={projects['make-art']}
          gridColumn='span 3'
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === projects['make-art'].slug}
        />
        <PortfolioCard
          project={projects['isitavocadosornotdotcom']}
          gridColumn='1 / span 3'
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === projects['isitavocadosornotdotcom'].slug}
        />

        <PortfolioCard
          project={projects.adobe}
          gridColumn='4 / span 9'
          size='lg'
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === projects.adobe.slug}
        />
      </Grid>
      <PortfolioModal
        openModalSlug={openModalSlug}
        setOpenModalSlug={setOpenModalSlug}
      />
    </Container>
  )
}
