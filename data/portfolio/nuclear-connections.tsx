import { collaborator, heroImage, link, project } from '@/app/content-types'
import { PortfolioImage } from '@/components/PortfolioImage'
import nuclearHero from '@/public/portfolio/nuclear-connections/nuclear-connections-01.jpg'
import nuclearConnectionsLogoMatte from '@/public/portfolio/nuclear-connections/nuclear-connections-logo-matte.png'
import nuclearConnectionsSiblings from '@/public/portfolio/nuclear-connections/nuclear-connections-siblings.png'
import { Flex } from '@radix-ui/themes'

export const nuclearConnections = project({
  slug: 'nuclear-connections',
  title: 'Nuclear Connections',
  subtitle: 'Social word game',
  hero: heroImage(nuclearHero, 'Nuclear Connections Game'),
  date: 'January 2024',
  tools: ['React', 'TypeScript', 'Next.js', 'Vercel', 'React Spring', 'Figma'],
  content: (
    <>
      <p>
        Nuclear Connections is a multiplayer social word game inspired by the
        New York Times game “Connections”. Each player submits four tiles for
        the game’s category (e.g. favorite books), and then try and guess who
        the other tiles belong to.
      </p>
      <p>
        Developed by my dad as a paper-and-pencil game for Christmas one year,
        we teamed up to make it easier for our globally-distributed family to
        play every weekend, over the breakfast table, and over Zoom. The game
        has already seen organic growth outside our family, with over 100
        players joining in.
      </p>
      <Flex direction='row' gap='4'>
        <PortfolioImage
          radius={0}
          src={nuclearConnectionsLogoMatte}
          alt='Nuclear Connections Logo'
          caption='The logo I designed for the game.'
        />
        <PortfolioImage
          src={nuclearConnectionsSiblings}
          alt='Nuclear Connections Logo Siblings'
          caption='And some of his weird siblings.'
        />
      </Flex>
      <p>
        Built using Next.js, TypeScript, and React, the backend runs entirely
        serverless on Vercel Functions.
      </p>
    </>
  ),
  deliverables: undefined,
  role: 'Co-Developer',
  collaborators: [collaborator('David Molloy')],
  links: [link('Website', 'https://nuclearconnections.com')],
})
