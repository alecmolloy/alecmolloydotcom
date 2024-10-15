'use client'

import ClientOnlyPortal from '@/components/ClientOnlyPortal'
import { projects } from '@/data/portfolio'
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
import { NO_OP } from '@/utils/utils'
import { Container, Flex, Grid, Text as Txt } from '@radix-ui/themes'
import {
  animated,
  SpringConfig,
  useSpring,
  useTransition,
} from '@react-spring/web'
import React from 'react'
import { isProjectSlug, ProjectSlug } from './content-types'
import { Section } from './Navigation'
import { CardScaleOnHover, cardStyle, PortfolioCard } from './PortfolioCard'
import SimplexNoiseCanvas from './SimplexNoiseCanvas'
import { defaultGridProps } from './theme'

const AnimatedFlex = animated(Flex)

const simplexNoiseProps = {
  cellSize: 250,
  darkColor: '#fafafa',
  lightColor: '#ffffff',
  pixelSize: 10,
}

export const Portfolio: React.FunctionComponent<{ id: Section }> = ({ id }) => {
  const [openModalSlug, setOpenModalSlug] = React.useState<ProjectSlug | null>(
    null,
  )

  React.useEffect(() => {
    const navigationElement = document.getElementById('navigation')
    if (navigationElement != null) {
      navigationElement.style.opacity = openModalSlug != null ? '0' : '1'
    }
  }, [openModalSlug])

  const [modalTransitions] = useTransition(openModalSlug, () => {
    if (openModalSlug != null) {
      return {
        enter: (item: ProjectSlug) => {
          console.log('enter', item)
          const bentoCard = document.getElementById(openModalSlug)
          if (bentoCard == null) {
            throw new Error(`Card with id ${openModalSlug} not found`)
          }
          const {
            top: t,
            left,
            width,
            height,
          } = bentoCard.getBoundingClientRect()
          return {
            left,
            top: t,
            width,
            height,
            x: 0,
            y: 0,
            scale: CardScaleOnHover,
            config: DefaultSpringConfig,
            onStart: () => {
              modalImageApi.start({
                from: { scale: CardScaleOnHover },
                to: { scale: 1 },
              })
              modalOverlayApi.start({ opacity: 1 })
            },
          }
        },
        from: () => {
          const modalWidth = Math.min(760, window.innerWidth * 0.8)
          const modalHeight = window.innerHeight - 32
          const modalX = -modalWidth / 2
          const modalY = -modalHeight / 2
          return {
            left: window.innerWidth / 2,
            top: window.innerHeight / 2,
            width: modalWidth,
            height: modalHeight,
            x: modalX,
            y: modalY,
            scale: 1,
            config: DefaultSpringConfig,
          }
        },
        leave: () => {
          const bentoCard = document.getElementById(openModalSlug)
          if (bentoCard == null) {
            throw new Error(`Card with id ${openModalSlug} not found`)
          }
          const {
            top: t,
            left,
            width,
            height,
          } = bentoCard.getBoundingClientRect()
          return {
            left,
            top: t,
            width,
            height,
            x: 0,
            y: 0,
            scale: CardScaleOnHover,
            onStart: () => {
              modalImageApi.start({
                from: { scale: 1 },
                to: { scale: CardScaleOnHover },
              })
              modalOverlayApi.start({ opacity: 0 })
            },
            onRest: () => {
              setOpenModalSlug(null)
            },
            config: AggressiveSpringConfig,
          }
        },
      }
    } else {
      return {}
    }
  }, [openModalSlug])

  const [modalOverlaySpring, modalOverlayApi] = useSpring<{
    opacity: number
  }>(NO_OP)

  const [modalImageSpring, modalImageApi] = useSpring<{
    scale: number
  }>(NO_OP)

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const projectSlug = urlParams.get(ProjectSlugParam)
    if (projectSlug && isProjectSlug(projectSlug)) {
      setOpenModalSlug(projectSlug)
    }
  }, [])

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
          size='sm'
          setOpenModal={setOpenModalSlug}
          modalOpen={openModalSlug === nuclearConnections.slug}
        />
        <PortfolioCard
          project={retreatTechnology}
          gridColumn={{ initial: '1 / -1', xs: 'span 6' }}
          size='sm'
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
          size='lg'
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
      {modalTransitions((style, slug) => {
        const project = slug != null ? projects[slug] : null
        return (
          <ClientOnlyPortal selector='#theme-root'>
            {project != null && (
              <>
                <AnimatedFlex
                  position='fixed'
                  top='0'
                  left='0'
                  right='0'
                  bottom='0'
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.15)',
                    ...modalOverlaySpring,
                  }}
                  align='center'
                  justify='center'
                  onClick={handleCloseModal}
                />
                <AnimatedFlex
                  direction='column'
                  justify='start'
                  overflowY='scroll'
                  style={{
                    position: 'fixed',
                    backgroundColor: 'white',
                    overflow: 'hidden',
                    borderRadius: cardStyle.borderRadius,
                    zIndex: 2,
                    boxShadow: [
                      '0 24px 36px #0001',
                      '0 24px 46px #0002',
                      cardStyle.boxShadow,
                    ].join(', '),
                    ...style,
                  }}
                  p='2'
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                  <animated.img
                    src={
                      project.hero.type === 'video'
                        ? project.hero.poster.src
                        : project.hero.data.src
                    }
                    alt={project.title}
                    style={{
                      ...modalImageSpring,
                      display: 'block',
                      width: '100%',
                      aspectRatio: '4 / 3',
                      overflow: 'hidden',
                      borderRadius: 6,
                      flexShrink: 0,
                    }}
                  />
                  <Txt>{project.title}</Txt>
                  <Flex direction='column' flexShrink='0'>
                    {project.content}
                  </Flex>
                </AnimatedFlex>
              </>
            )}
          </ClientOnlyPortal>
        )
      })}
    </Container>
  )
}

const ProjectSlugParam = 'project'

const AggressiveSpringConfig: SpringConfig = {
  tension: 309,
  friction: 20,
  clamp: true,
  velocity: 0.03,
}

const DefaultSpringConfig: SpringConfig = {
  tension: 170,
  friction: 26,
  clamp: false,
  velocity: 0,
}
