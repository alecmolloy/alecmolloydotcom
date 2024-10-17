import ClientOnlyPortal from '@/components/ClientOnlyPortal'
import { projects } from '@/data/portfolio'
import { Flex, Text as Txt } from '@radix-ui/themes'
import { SpringConfig, animated, useTransition } from '@react-spring/web'
import React from 'react'
import { ProjectSlug, isProjectSlug } from '../app/content-types'
import { CardScaleOnHover, cardStyle } from '../app/PortfolioCard'

interface PortfolioModalProps {
  openModalSlug: ProjectSlug | null
  setOpenModalSlug: React.Dispatch<React.SetStateAction<ProjectSlug | null>>
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
  openModalSlug,
  setOpenModalSlug,
}) => {
  const [allowVideoControls, setAllowVideoControls] = React.useState(true)

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

  const modalTransitions = useTransition<
    ProjectSlug | null,
    {
      left: number
      top: number
      width: number
      height: number
      x: number
      y: number
      scale: number
      overlayOpacity: number
      allowVideoControls: boolean
    }
  >(openModalSlug, {
    from: (slug) => {
      if (slug == null) {
        return {}
      }
      const bentoCard = document.getElementById(slug)
      if (bentoCard == null) {
        throw new Error(`Card with id ${openModalSlug} not found`)
      }
      const { top: t, left, width, height } = bentoCard.getBoundingClientRect()
      return {
        left,
        top: t,
        width,
        height,
        x: 0,
        y: 0,
        scale: CardScaleOnHover,
        overlayOpacity: 0,
        allowVideoControls: false,

        config: DefaultSpringConfig,
      }
    },
    enter: () => {
      if (typeof window === 'undefined') {
        return {}
      }
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
        overlayOpacity: 1,
        allowVideoControls: true,
        onRest: () => {
          setAllowVideoControls(true)
        },
        config: DefaultSpringConfig,
      }
    },
    leave: (slug) => {
      if (slug == null) {
        return {}
      }
      const bentoCard = document.getElementById(slug)
      if (bentoCard == null) {
        throw new Error(`Card with id ${openModalSlug} not found`)
      }
      const { top: t, left, width, height } = bentoCard.getBoundingClientRect()
      return {
        left,
        top: t,
        width,
        height,
        x: 0,
        y: 0,
        scale: CardScaleOnHover,
        overlayOpacity: 0,
        onStart: () => {
          setAllowVideoControls(false)
        },
        onRest: () => {
          setOpenModalSlug(null)
        },
        config: AggressiveSpringConfig,
      }
    },
  })

  return (
    <>
      {modalTransitions(({ overlayOpacity, ...style }, slug) => {
        const project = slug != null ? projects[slug] : null
        return (
          project != null && (
            <ClientOnlyPortal selector='#theme-root'>
              <AnimatedFlex
                position='fixed'
                top='0'
                left='0'
                right='0'
                bottom='0'
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.15)',
                  opacity: overlayOpacity,
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
                {project.hero.type === 'video' ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls={allowVideoControls}
                    src={project.hero.url}
                    poster={project.hero.poster.src}
                    style={{
                      display: 'block',
                      width: '100%',
                      aspectRatio: '4 / 3',
                      overflow: 'hidden',
                      borderRadius: 6,
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <img
                    src={project.hero.data.src}
                    alt={project.title}
                    style={{
                      display: 'block',
                      width: '100%',
                      aspectRatio: '4 / 3',
                      overflow: 'hidden',
                      borderRadius: 6,
                      flexShrink: 0,
                    }}
                  />
                )}
                <Txt>{project.title}</Txt>
                <Flex direction='column' flexShrink='0'>
                  {project.content}
                </Flex>
              </AnimatedFlex>
            </ClientOnlyPortal>
          )
        )
      })}
    </>
  )
}

export const usePortfolioModal = () => {
  const [openModalSlug, setOpenModalSlug] = React.useState<ProjectSlug | null>(
    null,
  )

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const projectSlug = urlParams.get(ProjectSlugParam)
    if (projectSlug && isProjectSlug(projectSlug)) {
      setOpenModalSlug(projectSlug)
    }
  }, [])

  React.useEffect(() => {
    const navigationElement = document.getElementById('navigation')
    if (navigationElement != null) {
      navigationElement.style.opacity = openModalSlug != null ? '0' : '1'
    }
  }, [openModalSlug])

  return { openModalSlug, setOpenModalSlug }
}

const AnimatedFlex = animated(Flex)

const AggressiveSpringConfig: SpringConfig = {
  tension: 250,
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

export const ProjectSlugParam = 'project'
