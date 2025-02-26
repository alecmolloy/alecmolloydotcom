import ClientOnlyPortal from '@/components/ClientOnlyPortal'
import { projects } from '@/data/portfolio'
import closeButton from '@/public/icons/close.svg'
import { Flex } from '@radix-ui/themes'
import { SpringConfig, animated, useTransition } from '@react-spring/web'
import Img from 'next/image'
import React from 'react'
import { ProjectSlug, isProjectSlug } from '../app/content-types'
import { PortfolioArtworkClassName, cardStyle } from '../app/PortfolioCard'
import { PortfolioPage } from './PortfolioPage'

interface PortfolioModalProps {
  openModalSlug: ProjectSlug | null
  setOpenModalSlug: React.Dispatch<React.SetStateAction<ProjectSlug | null>>
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
  openModalSlug,
  setOpenModalSlug,
}) => {
  const [isMobile, setIsMobile] = React.useState(getIsMobile())
  React.useLayoutEffect(() => {
    const handleResize = () => {
      setIsMobile(getIsMobile())
    }
    window.addEventListener('resize', handleResize)
    setIsMobile(getIsMobile())
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const [settled, setSettled] = React.useState(false)

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

  const modalTransition = useTransition<
    ProjectSlug | null,
    ModalTransitionProps
  >(openModalSlug, {
    from: (slug) => {
      if (slug == null || typeof window === 'undefined') {
        return {}
      }
      const { cardTop, cardLeft, modalWidth, cardHeight, scale } =
        getModalDimensions(slug)

      return {
        left: cardLeft,
        top: cardTop,
        width: modalWidth,
        height: cardHeight / scale,
        x: 0,
        y: 0,
        scale: scale,
        borderRadius: cardStyle.borderRadius,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        boxShadow: [
          '0 24px 36px #0000',
          '0 24px 46px #0000',
          cardStyle.boxShadow,
        ].join(', '),
        closeButtonOpacity: 0,
        config: DefaultSpringConfig,
      }
    },
    enter: (slug) => {
      if (slug == null || typeof window === 'undefined') {
        return {}
      }

      const {
        modalWidth,
        modalHeight,
        modalX,
        modalY,
        borderRadius: modalBorderRadius,
      } = getModalDimensions(slug)

      return {
        left: window.innerWidth / 2,
        top: window.innerHeight / 2,
        width: modalWidth,
        height: modalHeight,
        x: modalX,
        y: modalY,
        scale: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        boxShadow: [
          '0 24px 36px #0001',
          '0 24px 46px #0002',
          cardStyle.boxShadow,
        ].join(', '),
        closeButtonOpacity: 1,
        borderRadius: modalBorderRadius,

        config: DefaultSpringConfig,
        onRest: () => {
          setSettled(true)
        },
      }
    },
    leave: (slug) => {
      if (slug == null || typeof window === 'undefined') {
        return {}
      }
      const { cardTop, cardLeft, cardHeight, scale, modalWidth } =
        getModalDimensions(slug)
      return {
        left: cardLeft,
        top: cardTop,
        width: modalWidth,
        height: cardHeight / scale,
        x: 0,
        y: 0,
        scale: scale,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        boxShadow: [
          '0 24px 36px #0000',
          '0 24px 46px #0000',
          cardStyle.boxShadow,
        ].join(', '),
        closeButtonOpacity: 0,
        borderRadius: cardStyle.borderRadius,

        config: AggressiveSpringConfig,
        onStart: () => {
          setSettled(false)
        },
      }
    },
  })

  return (
    <>
      {modalTransition(
        (
          { backgroundColor, boxShadow, closeButtonOpacity, ...style },
          slug,
        ) => {
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
                    backgroundColor,
                    zIndex: 1,
                  }}
                  align='center'
                  justify='center'
                  onClick={handleCloseModal}
                >
                  <AnimatedFlex
                    position='fixed'
                    direction='column'
                    justify='start'
                    overflowY='scroll'
                    style={{
                      overscrollBehaviorY: 'contain',
                      backgroundColor: 'white',
                      zIndex: 2,
                      transformOrigin: 'top left',
                      boxShadow,
                      maxWidth: isMobile ? '100vw' : ModalMaxWidth,
                      maxHeight: isMobile
                        ? '100vh'
                        : `calc(100vh - ${ModalMinPaddingY * 2}px)`,
                      height: '100%',
                      borderRadius: isMobile ? 0 : style.borderRadius,
                      ...(!settled && style),
                      padding: 8,
                    }}
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                  >
                    <AnimatedFlex
                      position='absolute'
                      top='3'
                      left='3'
                      m='2'
                      style={{
                        zIndex: 1,
                        userSelect: 'none',
                        cursor: 'pointer',
                        opacity: closeButtonOpacity,
                        backgroundColor: '#333a',
                        boxShadow: '0 0 5px #0005',
                        borderRadius: 10000,
                      }}
                    >
                      <Flex
                        onClick={handleCloseModal}
                        align='center'
                        justify='center'
                        width='30px'
                        height='30px'
                      >
                        <Img
                          src={closeButton}
                          alt='close modal'
                          width={12}
                          height={12}
                        />
                      </Flex>
                    </AnimatedFlex>
                    <PortfolioPage slug={project.slug} />
                  </AnimatedFlex>
                </AnimatedFlex>
              </ClientOnlyPortal>
            )
          )
        },
      )}
    </>
  )
}

export const usePortfolioModal = () => {
  const [openModalSlug, setOpenModalSlug] = React.useState<ProjectSlug | null>(
    null,
  )

  React.useEffect(() => {
    const pathSegments = window.location.pathname.split('/')
    const slug = pathSegments[pathSegments.length - 1] as ProjectSlug
    if (slug && isProjectSlug(slug)) {
      setOpenModalSlug(slug)
      const element = document.getElementById(slug)
      if (element) {
        element.scrollIntoView({ behavior: 'instant' })
      }
    }
  }, [])

  React.useEffect(() => {
    const navigationElement = document.getElementById('navigation')
    if (navigationElement != null) {
      navigationElement.style.opacity = openModalSlug != null ? '0' : '1'
    }
  }, [openModalSlug])

  React.useEffect(() => {
    if (openModalSlug != null) {
      window.history.pushState(null, '', `/p/${openModalSlug}`)
      document.title = `Alec Molloy | ${projects[openModalSlug].title}`
    } else {
      window.history.pushState(null, '', '/')
      document.title = 'Alec Molloy'
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

const ModalMaxWidth = 768
const ModalMinPaddingX = 64
const ModalMinPaddingY = 16

function getIsMobile() {
  return typeof window !== 'undefined'
    ? window.innerWidth < ModalMaxWidth + ModalMinPaddingX * 2
    : false
}

function getModalDimensions(slug: ProjectSlug) {
  const isMobile = getIsMobile()
  const { cardTop, cardLeft, cardWidth, cardHeight } =
    getArtworkDimensions(slug)

  const modalWidth = isMobile
    ? window.innerWidth
    : Math.min(ModalMaxWidth, window.innerWidth - ModalMinPaddingX * 2)
  const modalHeight = isMobile
    ? window.innerHeight
    : window.innerHeight - ModalMinPaddingY * 2
  const scale = cardWidth / modalWidth

  const modalX = -modalWidth / 2
  const modalY = -modalHeight / 2

  return {
    cardTop,
    cardLeft,
    cardHeight,
    scale,
    modalWidth,
    modalHeight,
    modalX,
    modalY,
    borderRadius: isMobile ? 0 : cardStyle.borderRadius,
  }
}

type ModalTransitionProps = {
  left: number
  top: number
  width: number
  height: number
  x: number
  y: number
  scale: number
  backgroundColor: string
  boxShadow: string
  closeButtonOpacity: number
  borderRadius: number
}
