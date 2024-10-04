'use client'

import { Project } from '@/app/content-types'
import { Flex } from '@radix-ui/themes'
import Image from 'next/image'
import React from 'react'

interface PortfolioCardProps {
  project: Project
  gridColumn?: string
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  project,
  gridColumn,
}) => {
  const [isPlaying, setIsPlaying] = React.useState(false)

  const videoRef = React.useRef<HTMLVideoElement>(null)

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
      flexShrink='0'
      position='relative'
      style={{
        boxShadow: '0 0 0 1px #0001',
        borderRadius: '10px',
        overflow: 'hidden',
        width: '100%',
        height: 'auto',
        aspectRatio: '4/3',
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
    </Flex>
  )
}
