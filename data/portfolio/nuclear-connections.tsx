import { collaborator, heroImage, link, project } from '@/app/content-types'
import nuclearHero from '@/public/portfolio/nuclear-connections/nuclear-connections-01.jpg'

export const nuclearConnections = project({
  slug: 'nuclear-connections',
  title: 'Nuclear Connections',
  subtitle: 'Social word game',
  hero: heroImage(nuclearHero, 'Nuclear Connections Game'),
  date: 'January 2024',
  tools: ['React', 'TypeScript', 'Next.js'],
  content: (
    <>
      <p>
        Nuclear Connections is a social word game inspired by the New York Times
        game “Connections,” where players create a list of four words about
        themselves to see how well they know each other.
      </p>
      <p>
        Developed by my dad as a paper-and-pencil game for the Christmas
        holidays, we teamed up to make it easier for our globally-distributed
        family to play. The game has already seen organic growth, with over 150
        boards played.
      </p>
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
