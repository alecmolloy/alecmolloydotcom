'use client'
import { Project } from '@/app/content-types'
import { Flex, Text as Txt } from '@radix-ui/themes'
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
      {...bind()}
      style={{
        flexShrink: '0',
        position: 'relative',
        boxShadow: '0 0 0 1px #0001',
        borderRadius: '10px',
        overflow: 'hidden',
        width: '100%',
        height: 'auto',
        aspectRatio: '4/3',
        cursor: 'pointer',
        scale,
      }}
    >
      <animated.div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
          backgroundColor: titleMode === 'dark' ? '#fff4' : '#0004',
          paddingTop: '15%',
          paddingBottom: '5%',
          width: '125%',
          textAlign: 'center',
          mask: `radial-gradient(
            ellipse at bottom center,
            rgba(0, 0, 0, 1) 33%,
            rgba(0, 0, 0, 0) ${(1 / Math.sqrt(2)) * 100}%
          )
          `,
          ...(windowWidth > 768
            ? {
                bottom,
              }
            : {
                bottom: -5,
              }),
        }}
      >
        <Txt
          className={instrumentSerif.className}
          size={{
            initial: sml(size, '5', '6', '7'),
            sm: sml(size, '6', '7', '8'),
          }}
          style={{
            color: titleMode === 'dark' ? '#000' : '#fff',
            textShadow:
              titleMode === 'dark' ? '0 0 16px #fff4' : '0 0 8px #0008',
          }}
          align='center'
        >
          {project.title} ({project.releaseDate})
        </Txt>
      </animated.div>
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
