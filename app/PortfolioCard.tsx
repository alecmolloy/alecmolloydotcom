import React from 'react'
import { Flex } from '@radix-ui/themes'
import Image from 'next/image'
import { Project } from '@/app/content-types'

interface PortfolioCardProps {
  project: Project
  gridColumn?: string
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  project,
  gridColumn,
}) => {
  return (
    <Flex
      gridColumn={gridColumn}
      flexShrink='0'
      style={{
        boxShadow: '0 0 0 1px #0001',
        borderRadius: '10px',
        overflow: 'hidden',
        width: '100%', // Ensure it fills the width
        height: 'auto', // Set height to auto
        aspectRatio: '4/3', // Maintain aspect ratio
      }}
    >
      {project.hero.type === 'image' ? (
        <Image
          width={1024}
          src={project.hero.data}
          alt={project.hero.alt}
          style={{ width: '100%', height: 'auto' }}
        />
      ) : (
        <video
          autoPlay
          loop
          src={project.hero.url}
          poster={project.hero.poster.src}
          style={{ width: '100%' }}
        />
      )}
    </Flex>
  )
}
