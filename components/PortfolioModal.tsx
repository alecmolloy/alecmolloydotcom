import { instrumentSerif } from '@/app/fonts'
import ClientOnlyPortal from '@/components/ClientOnlyPortal'
import { projects } from '@/data/portfolio'
import { Box, Flex, Grid, Heading, Text as Txt } from '@radix-ui/themes'
import { SpringConfig, animated, useTransition } from '@react-spring/web'
import React from 'react'
import { ProjectSlug, isProjectSlug } from '../app/content-types'
import { cardStyle, PortfolioArtworkClassName } from '../app/PortfolioCard'

interface PortfolioModalProps {
  openModalSlug: ProjectSlug | null
  setOpenModalSlug: React.Dispatch<React.SetStateAction<ProjectSlug | null>>
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
  openModalSlug,
  setOpenModalSlug,
}) => {
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
      boxShadow: string
    }
  >(openModalSlug, {
    from: (slug) => {
      if (slug == null) {
        return {}
      }
      const { cardTop, cardLeft, cardWidth, cardHeight } =
        getArtworkDimensions(slug)
      const modalWidth = Math.min(ModalWidth, window.innerWidth - 128)
      const scale = cardWidth / modalWidth

      return {
        left: cardLeft,
        top: cardTop,
        width: modalWidth,
        height: cardHeight / scale,
        x: 0,
        y: 0,
        scale,
        overlayOpacity: 0,
        boxShadow: [
          '0 24px 36px #0000',
          '0 24px 46px #0000',
          cardStyle.boxShadow,
        ].join(', '),

        config: DefaultSpringConfig,
      }
    },
    enter: () => {
      if (typeof window === 'undefined') {
        return {}
      }
      const modalWidth = Math.min(ModalWidth, window.innerWidth - 128)
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
        boxShadow: [
          '0 24px 36px #0001',
          '0 24px 46px #0002',
          cardStyle.boxShadow,
        ].join(', '),

        config: DefaultSpringConfig,
      }
    },
    leave: (slug) => {
      if (slug == null) {
        return {}
      }
      const { cardTop, cardLeft, cardWidth, cardHeight } =
        getArtworkDimensions(slug)
      const modalWidth = Math.min(ModalWidth, window.innerWidth - 128)
      const scale = cardWidth / modalWidth
      return {
        left: cardLeft,
        top: cardTop,
        width: modalWidth,
        height: cardHeight / scale,
        x: 0,
        y: 0,
        scale,
        overlayOpacity: 0,
        boxShadow: [
          '0 24px 36px #0000',
          '0 24px 46px #0000',
          cardStyle.boxShadow,
        ].join(', '),

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
                position='fixed'
                style={{
                  borderRadius: cardStyle.borderRadius,
                  backgroundColor: 'white',
                  zIndex: 2,
                  transformOrigin: 'top left',
                  ...style,
                }}
                p='2'
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <Flex
                  mb='4'
                  style={{
                    borderRadius: 6,
                    overflow: 'hidden',
                    flexShrink: 0,
                    aspectRatio: '4 / 3',
                  }}
                >
                  {project.hero.type === 'video' ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls={false}
                      src={project.hero.url}
                      poster={project.hero.poster.src}
                      style={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <img
                      src={project.hero.data.src}
                      alt={project.title}
                      style={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  )}
                </Flex>
                <Grid columns='12' gap='4' px='4'>
                  {project.role && (
                    <InfoBlock header='Role' innerText={project.role} />
                  )}
                  {project.collaborators && (
                    <InfoBlock
                      header='Collaborators'
                      innerText={project.collaborators.map((collaborator) => (
                        <Box key={collaborator.name}>
                          {collaborator.url != null ? (
                            <a
                              href={collaborator.url}
                              target='_blank'
                              rel='noreferrer'
                            >
                              {collaborator.name} →
                            </a>
                          ) : (
                            collaborator.name
                          )}
                        </Box>
                      ))}
                    />
                  )}
                  {project.tools && (
                    <InfoBlock
                      header='Tools'
                      innerText={project.tools.join(', ')}
                    />
                  )}
                  {project.deliverables && (
                    <InfoBlock
                      header='Deliverables'
                      innerText={project.deliverables}
                    />
                  )}
                  {project.links && (
                    <InfoBlock
                      header='Links'
                      innerText={
                        <Flex direction='column'>
                          {project.links.map((link) => (
                            <a
                              key={link.url}
                              href={link.url}
                              target='_blank'
                              rel='noreferrer'
                            >
                              {link.title} →
                            </a>
                          ))}
                        </Flex>
                      }
                    />
                  )}
                  <Box gridColumn='5 / span 8'>
                    <Heading size='8' style={{ ...instrumentSerif.style }}>
                      {project.title}
                    </Heading>
                    {(project.subtitle != null || project.date != null) && (
                      <Txt size='1' style={{ color: '#0008' }}>
                        <Txt weight='bold'>
                          {project.date != null && project.date}
                        </Txt>
                        {project.subtitle != null &&
                          project.date != null &&
                          ' — '}
                        {project.subtitle != null && project.subtitle}
                      </Txt>
                    )}

                    <Txt size='4'>{project.content}</Txt>
                  </Box>
                </Grid>
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
  tension: 230,
  clamp: true,
}

const DefaultSpringConfig: SpringConfig = {
  tension: 170,
  friction: 26,
  clamp: false,
  velocity: 0,
}

export const ProjectSlugParam = 'project'

const ModalWidth = 768

const InfoBlock: React.FC<{ header: string; innerText: React.ReactNode }> = ({
  header,
  innerText,
}) => (
  <Flex gridColumn='span 3' direction='column' py='2' className='info-block'>
    <Txt size='1' weight='bold' style={{ color: '#0004' }}>
      {header}
    </Txt>
    <Txt size='1'>{innerText}</Txt>
  </Flex>
)

function getArtworkDimensions(slug: ProjectSlug) {
  const bentoCard = document.querySelector(
    `#${slug} .${PortfolioArtworkClassName}`,
  )
  if (bentoCard == null) {
    throw new Error(`Card with id ${slug} not found`)
  }
  const {
    top: cardTop,
    left: cardLeft,
    width: cardWidth,
    height: cardHeight,
  } = bentoCard.getBoundingClientRect()
  return {
    cardTop,
    cardLeft,
    cardWidth,
    cardHeight,
  }
}
