'use client'
import { Project } from '@/app/content-types'
import { Flex, Heading, Text as Txt } from '@radix-ui/themes'
import { Responsive } from '@radix-ui/themes/dist/cjs/props/prop-def'
import { useWindowWidth } from '@react-hook/window-size'
import { animated, useSpring, useSpringValue } from '@react-spring/web'
import { useGesture } from '@use-gesture/react'
import Image from 'next/image'
import React from 'react'
import { instrumentSerif } from './fonts'

interface PortfolioCardProps {
  project: Project
  titleMode?: 'light' | 'dark'
  size?: Size
  gridColumn?: Responsive<string>
}

const AnimatedFlex = animated(Flex)

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  project,
  size = 'md',
  titleMode = 'dark',
  gridColumn,
}) => {
  const windowWidth = useWindowWidth()

  const [isPlaying, setIsPlaying] = React.useState(false)
  const videoRef = React.useRef<HTMLVideoElement>(null)

  const [{ bottom, scale }, titleApi] = useSpring(
    () => ({
      from: { bottom: -5, scale: 1 },
      ...(windowWidth > 768 && { to: { bottom: -5 } }),
    }),
    [windowWidth],
  )

  const bind = useGesture({
    onHover: ({ hovering }) => {
      if (windowWidth > 768) {
        titleApi.start(
          hovering
            ? {
                scale: 1.01,
                bottom: -5,
                config: { tension: 170 * 3 },
              }
            : {
                scale: 1,
                bottom: -5,
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
    <AnimatedFlex
      gridColumn={gridColumn}
      direction='column'
      {...bind()}
      style={{
        flexShrink: '0',
        position: 'relative',
      }}
    >
      <AnimatedFlex
        style={{
          boxShadow: '0 0 0 1px #0003',
          borderRadius: '10px',
          overflow: 'hidden',
          width: '100%',
          height: 'auto',
          aspectRatio: '4/3',
          cursor: 'pointer',
          scale,
        }}
      >
        {project.hero.type === 'image' ? (
          <Image
            width={1024}
            src={project.hero.data}
            alt={project.hero.alt}
            style={{
              width: '100%',
              height: 'auto',
            }}
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
                  cursor: 'pointer',
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
      <AnimatedFlex
        direction='column'
        pt='8px'
        width='100%'
        style={{
          color: '#000',
        }}
      >
        <Heading
          size={{
            initial: sml(size, '1', '2', '3'),
            sm: sml(size, '2', '3', '3'),
          }}
          weight='bold'
          align='left'
        >
          {project.title} ({project.releaseDate})
        </Heading>
        <Txt
          size={{
            initial: sml(size, '1', '2', '3'),
            sm: sml(size, '2', '3', '3'),
          }}
          align='left'
        >
          {project.subtitle}
        </Txt>
      </AnimatedFlex>
    </AnimatedFlex>
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
