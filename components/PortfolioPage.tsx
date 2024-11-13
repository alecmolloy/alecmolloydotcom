'use client'

import { instrumentSerif } from '@/app/fonts'
import { projects } from '@/data/portfolio'
import { Box, Flex, Grid, Heading, Strong, Text as Txt } from '@radix-ui/themes'
import { isHeroVideo, ProjectSlug } from '../app/content-types'
import { InfoBlock } from './InfoBlock'

export const PortfolioPage = ({ slug }: { slug: ProjectSlug }) => {
  const project = projects[slug]
  const hero = project.hero

  return (
    <>
      <Flex
        mb='4'
        style={{
          borderRadius: 6,
          overflow: 'hidden',
          flexShrink: 0,
          aspectRatio: '4 / 3',
        }}
      >
        {isHeroVideo(hero) ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            src={hero.url}
            poster={undefined}
            onError={(e) => {
              const video = e.currentTarget
              video.poster = hero.type
            }}
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <img
            src={hero.data.src}
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
      <Grid columns='4' gap={{ initial: '4', xs: '5' }} px='4'>
        <Box
          gridColumn={{ initial: '1 / span 4', xs: '2 / span 3' }}
          gridRow='1'
        >
          <Heading size='8' style={{ ...instrumentSerif.style }}>
            {project.title}
          </Heading>
          {(project.subtitle != null || project.date != null) && (
            <Txt size='1' style={{ color: '#0008' }}>
              <Txt weight='bold'>{project.date != null && project.date}</Txt>
              {project.subtitle != null && project.date != null && ' — '}
              {project.subtitle != null && project.subtitle}
            </Txt>
          )}
        </Box>
        <Box
          gridColumn={{ initial: '1 / span 4', xs: '2 / span 3' }}
          gridRow='2'
        >
          <Txt size='4' id='project-modal-content'>
            {project.content}
          </Txt>
        </Box>
        <Flex
          gridColumn={{ initial: 'span 4', xs: 'span 1' }}
          gridRow={{ initial: '3', xs: '2' }}
          justify={{ initial: 'start', xs: 'end' }}
        >
          <Grid
            columns={{ initial: '2', xs: '1' }}
            rows={{
              initial: 'repeat(2, 1fr)',
              xs: 'repeat(6, min-content)',
            }}
            gap='4'
            flexGrow='1'
          >
            {project.role && (
              <InfoBlock header='Role' innerText={project.role} />
            )}
            {project.recognition && (
              <InfoBlock
                header='Recognition'
                innerText={
                  <Flex direction='column' gap='2'>
                    {project.recognition.map((recognition) => (
                      <Box key={recognition.title}>
                        <Strong>{recognition.title}</Strong>
                        <br />
                        {recognition.description}
                      </Box>
                    ))}
                  </Flex>
                }
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
                        {link.title}&nbsp;→
                      </a>
                    ))}
                  </Flex>
                }
              />
            )}
            {project.tools && (
              <InfoBlock header='Tools' innerText={project.tools.join(', ')} />
            )}
            {project.deliverables && (
              <InfoBlock
                header='Deliverables'
                innerText={project.deliverables}
              />
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
                        {collaborator.name}&nbsp;→
                      </a>
                    ) : (
                      collaborator.name
                    )}
                  </Box>
                ))}
              />
            )}
          </Grid>
        </Flex>
      </Grid>
    </>
  )
}
