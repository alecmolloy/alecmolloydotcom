import { Project, ProjectSlug } from '@/app/content-types'
import ClientOnlyPortal from '@/components/ClientOnlyPortal'
import { Flex, Text as Txt } from '@radix-ui/themes'
import { Responsive } from '@radix-ui/themes/dist/cjs/props/prop-def'
import { useWindowWidth } from '@react-hook/window-size'
import { animated, useSpring } from '@react-spring/web'
import { useGesture } from '@use-gesture/react'
import Image from 'next/image'
import React from 'react'

interface PortfolioCardProps {
  project: Project
  size?: Size
  gridColumn?: Responsive<string>
  onOpenModal: (
    id: ProjectSlug,
    x: number,
    y: number,
    width: number,
    height: number,
  ) => void
}

export const cardStyle = {
  boxShadow: '0 0 0 1px #0003',
  borderRadius: 10,
}

const AnimatedFlex = animated(Flex)

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  project,
  size = 'md',
  gridColumn,
  onOpenModal,
}) => {
  const windowWidth = useWindowWidth()

  const ref = React.useRef<HTMLDivElement>(null)
  const videoRef = React.useRef<HTMLVideoElement>(null)

  const [isPlaying, setIsPlaying] = React.useState(false)

  const [{ scale }, titleApi] = useSpring(
    () => ({
      from: { scale: 1 },
      ...(windowWidth > 768 && { to: { scale: 1.02 } }),
    }),
    [windowWidth],
  )

  const bind = useGesture({
    onHover: ({ hovering }) => {
      if (windowWidth > 768) {
        titleApi.start(
          hovering
            ? {
                scale: 1.02,
                config: { tension: 170 * 3 },
              }
            : {
                scale: 1,
              },
        )
      }
    },
  })

  React.useEffect(() => {
    const setPlay = () => {
      setIsPlaying(true)
    }
    const setPause = () => {
      setIsPlaying(false)
    }
    if (videoRef.current) {
      setIsPlaying(!videoRef.current.paused)
      videoRef.current.addEventListener('play', setPlay)
      videoRef.current.addEventListener('pause', setPause)
    }
    return () => {
      videoRef.current?.removeEventListener('play', setPlay)
      videoRef.current?.removeEventListener('pause', setPause)
    }
  }, [videoRef.current])

  return (
    <Flex
      gridColumn={gridColumn}
      direction='column'
      {...bind()}
      style={{
        cursor: 'pointer',
        flexShrink: '0',
        position: 'relative',
      }}
      ref={ref}
      onClick={(e) => {
        const boundingBox = e.currentTarget.getBoundingClientRect()
        onOpenModal(
          project.slug,
          boundingBox.top,
          boundingBox.left,
          boundingBox.width,
          boundingBox.height,
        )
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
          scale,
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
          <Image
            width={1024}
            src={project.hero.data}
            alt={project.hero.alt}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <>
            {!isPlaying && (
              <img
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
              controls={false}
              src={project.hero.url}
              poster={project.hero.poster.src}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </>
        )}
      </AnimatedFlex>
      <Flex
        direction='column'
        pt='8px'
        width='100%'
        style={{
          color: '#000',
        }}
      >
        <Txt
          size={{
            initial: sml(size, '1', '2', '3'),
            sm: sml(size, '2', '3', '3'),
          }}
          align='left'
        >
          <Txt weight='bold'>
            {project.title} ({project.releaseDate})
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
    case 'sm':
      return sm
    case 'md':
      return md
    case 'lg':
      return lg
  }
}
