'use client'
import { PortfolioModal, usePortfolioModal } from '@/components/PortfolioModal'
import { projects } from '@/data/portfolio'
import { Container, Grid } from '@radix-ui/themes'
import React from 'react'
import { Section } from './Navigation'
import { PortfolioCard } from './PortfolioCard'
import DitheredSDFWavesCanvas from './DitheredSDFWavesCanvas'
import { defaultContainerProps, defaultGridProps } from './theme'

const simplexNoiseProps = {
  darkColor: '#faf2f2',
  lightColor: '#fff',
  pixelSize: 3,
  smoothstepWidth: 0.15,
  bandWidth: 0.25,
  numBands: 6,
  waveSize: 1,
  speed: 0.0125 / 1,
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
      py='9'
      {...defaultContainerProps}
    >
      <Grid {...defaultGridProps}>
        <PortfolioCard
          project={projects.vbt}
          gridColumn={{ initial: 'span 12', sm: 'span 8' }}
          gridRow='span 2'
          size={{ initial: 'lg', sm: 'lg' }}
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === projects.vbt.slug}
        />
        <DitheredSDFWavesCanvas
          {...simplexNoiseProps}
          gridColumn={'9 / span 4'}
          display={{ initial: 'none', sm: 'flex' }}
          aspectRatio='4 / 2.925'
        />
        <PortfolioCard
          gridColumn={{ initial: '1 / -1', sm: '9 / span 4' }}
          project={projects['nuclear-connections']}
          size={{ initial: 'lg', sm: 'md' }}
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === projects['nuclear-connections'].slug}
        />
        <PortfolioCard
          project={projects['retreat-technology']}
          gridColumn={{ initial: '1 / -1', sm: 'span 6' }}
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === projects['retreat-technology'].slug}
          size={{ initial: 'lg', sm: 'md' }}
        />
        <PortfolioCard
          project={projects.utopia}
          gridColumn={{ initial: '1 / -1', sm: 'span 6' }}
          size={{ initial: 'lg', sm: 'md' }}
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === projects.utopia.slug}
        />
        {/* <PortfolioCard
          project={projects['game-of-life']}
          gridColumn={{ initial: 'span 6', sm: 'span 4' }}
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === projects['game-of-life'].slug}
          size={{ initial: 'sm', sm: 'sm' }}
        />
        <PortfolioCard
          project={projects['instant-replay']}
          gridColumn={{ initial: 'span 6', sm: 'span 4' }}
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === projects['instant-replay'].slug}
          size={{ initial: 'sm', sm: 'sm' }}
        />
        <PortfolioCard
          project={projects['acroyoga-transitions']}
          gridColumn={{ initial: 'span 6', sm: 'span 4' }}
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === projects['acroyoga-transitions'].slug}
          size={{ initial: 'sm', sm: 'sm' }}
        />
        <DitheredSDFWavesCanvas
          {...simplexNoiseProps}
          gridColumn='span 6'
          display={{ initial: 'flex', sm: 'none' }}
          aspectRatio='4 / 2.95'
        /> */}
        <PortfolioCard
          project={projects['local-welcome']}
          gridColumn={{ initial: 'span 12', sm: 'span 6' }}
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === projects['local-welcome'].slug}
          size={{ initial: 'lg', sm: 'md' }}
        />
        <PortfolioCard
          project={projects['min-doktor']}
          gridColumn={{ initial: 'span 12', sm: 'span 6' }}
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === projects['min-doktor'].slug}
          size={{ initial: 'lg', sm: 'md' }}
        />
        <PortfolioCard
          project={projects.kano}
          gridColumn={{ initial: 'span 12', sm: 'span 9' }}
          gridRow='span 3'
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === projects.kano.slug}
          size={{ initial: 'lg', sm: 'lg' }}
        />
        <DitheredSDFWavesCanvas
          {...simplexNoiseProps}
          waveSize={2}
          numBands={3}
          gridColumn={{ initial: 'span 6', sm: 'span 3' }}
          display={{ initial: 'none', sm: 'flex' }}
          aspectRatio='4 / 1.9'
        />
        <PortfolioCard
          project={projects['elements-3d']}
          gridColumn={{ initial: 'span 6', sm: 'span 3' }}
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === projects['elements-3d'].slug}
          size={{ initial: 'sm', sm: 'sm' }}
        />
        <PortfolioCard
          project={projects['make-art']}
          gridColumn={{ initial: 'span 6', sm: 'span 3' }}
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === projects['make-art'].slug}
          size={{ initial: 'sm', sm: 'sm' }}
        />
        <PortfolioCard
          project={projects['isitavocadosornotdotcom']}
          gridColumn={{ initial: 'span 6', sm: '1 / span 3' }}
          gridRow={{ initial: '13', sm: '8' }}
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === projects['isitavocadosornotdotcom'].slug}
          size={{ initial: 'sm', sm: 'sm' }}
        />
        <PortfolioCard
          project={projects['portrait-of-five-cubes']}
          gridColumn={{ initial: 'span 6', sm: '1 / span 3' }}
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === projects['portrait-of-five-cubes'].slug}
          size={{ initial: 'sm', sm: 'sm' }}
        />
        <DitheredSDFWavesCanvas
          {...simplexNoiseProps}
          waveSize={2}
          numBands={3}
          gridColumn={{ initial: 'span 0', sm: '1 / span 3' }}
          display={{ initial: 'none', sm: 'flex' }}
          aspectRatio='4 / 1.9'
        />
        <PortfolioCard
          project={projects.adobe}
          gridColumn={{ initial: 'span 12', sm: '4 / span 9' }}
          gridRow={{ initial: '12', sm: '8 / span 3' }}
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === projects.adobe.slug}
          size={{ initial: 'lg', sm: 'lg' }}
        />
      </Grid>
      <PortfolioModal
        openModalSlug={openModalSlug}
        setOpenModalSlug={setOpenModalSlug}
      />
    </Container>
  )
}
