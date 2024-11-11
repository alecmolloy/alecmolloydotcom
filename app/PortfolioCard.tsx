import { Project, ProjectSlug } from '@/app/content-types'
import { Flex, Text as Txt } from '@radix-ui/themes'
import { Responsive } from '@radix-ui/themes/dist/cjs/props/prop-def'
import { animated, useSpring } from '@react-spring/web'
import { useGesture } from '@use-gesture/react'
import Img from 'next/image'
import React from 'react'

interface PortfolioCardProps {
  project: Project
  size: { initial: Size; sm: Size }
  gridColumn?: Responsive<string>
  gridRow?: Responsive<string>
  modalOpen: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<ProjectSlug | null>>
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  project,
  size,
  gridColumn,
  gridRow,
  modalOpen,
  setOpenModal,
}) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const videoRef = React.useRef<HTMLVideoElement>(null)

  const [isPlaying, setIsPlaying] = React.useState(false)

  const [{ scale }, cardApi] = useSpring(
    () => ({
      scale: 1,
    }),
    [],
  )

  const bind = useGesture({
    onHover: ({ hovering }) => {
      cardApi.start({
        scale: hovering && !modalOpen ? CardScaleOnHover : 1,
        config: SpringConfig,
      })
    },
  })

  React.useEffect(() => {
    const video = videoRef.current
    const setPlay = () => setIsPlaying(true)
    const setPause = () => setIsPlaying(false)

    if (video != null) {
      setIsPlaying(!video.paused)
      video.addEventListener('play', setPlay)
      video.addEventListener('pause', setPause)
    }
    return () => {
      video?.removeEventListener('play', setPlay)
      video?.removeEventListener('pause', setPause)
    }
  }, [])

  React.useEffect(() => {
    if (modalOpen) {
      cardApi.start({
        scale: 1,
        config: SpringConfig,
      })
    }
  }, [modalOpen, cardApi])

  return (
    <Flex
      id={project.slug}
      gridColumn={gridColumn}
      gridRow={gridRow}
      direction='column'
      {...bind()}
      style={{
        cursor: 'pointer',
        flexShrink: '0',
        position: 'relative',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
      ref={ref}
      onClick={() => {
        setOpenModal(project.slug)
        cardApi.start({
          scale: 1,
          config: SpringConfig,
        })
      }}
    >
      <AnimatedFlex
        style={{
          ...cardStyle,
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          height: 'auto',
          aspectRatio: '4/3',
          backgroundColor: '#00000008',
          scale,
        }}
      >
        <Flex
          className={PortfolioArtworkClassName}
          style={{
            opacity: modalOpen ? 0 : 1,
            width: '100%',
            height: '100%',
          }}
        >
          {project.acquisition && (
            <Flex
              position='absolute'
              top='2'
              right='2'
              py='1'
              px='2'
              style={{
                opacity: 0.9,
                backgroundColor: 'var(--ultramarine)',
                color: 'white',
                borderRadius: 4,
              }}
            >
              <Txt weight='medium' style={{ fontSize: 10 }}>
                Acquired by <Txt weight='bold'>{project.acquisition}</Txt>
              </Txt>
            </Flex>
          )}

          {project.hero.type === 'image' ? (
            <Img
              width={1024}
              src={project.hero.data}
              alt={project.hero.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <>
              {!isPlaying && (
                <img
                  alt='Play'
                  src='/icons/play-button.svg'
                  style={{
                    width: 64,
                    height: 64,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                  onClick={() => {
                    if (videoRef.current?.paused === true) {
                      videoRef.current?.play()
                    }
                  }}
                />
              )}
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                src={project.hero.url}
                poster={project.hero.poster.src}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </>
          )}
        </Flex>
      </AnimatedFlex>
      <Flex direction='column' pt='2' width='100%'>
        <Txt
          size={{
            initial: sml(size.initial, '1', '2', '3'),
            xs: sml(size.initial, '2', '2', '3'),
            sm: sml(size.sm, '3', '4', '4'),
          }}
          align='left'
        >
          <Txt weight='bold'>
            {project.title} ({project.date})
            {project.subtitle != null ? ': ' : null}
          </Txt>
          {project.subtitle}
        </Txt>
      </Flex>
    </Flex>
  )
}

type Size = 'sm' | 'md' | 'lg'

function sml<T>(size: Size, sm: T, md: T, lg: T): T {
  switch (size) {
    case 'sm': {
      return sm
    }
    case 'md': {
      return md
    }
    case 'lg': {
      return lg
    }
  }
}

export const cardStyle = {
  boxShadow: '0 0 0 1px #0002',
  borderRadius: 10,
}

export const CardScaleOnHover = 1.02

const AnimatedFlex = animated(Flex)

const SpringConfig = {
  tension: 510,
}

export const PortfolioArtworkClassName = 'portfolio-artwork'
