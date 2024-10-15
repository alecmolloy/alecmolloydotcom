import { collaborator, heroImage, project } from '@/app/content-types'
import nuclearHero from '@/public/portfolio/nuclear-connections/nuclear-connections-01.jpg'
import { Text as Txt } from '@radix-ui/themes'

export const nuclearConnections = project(
  'nuclear-connections',
  'Nuclear Connections',
  'Social word game',
  heroImage(nuclearHero, 'Nuclear Connections Game'),
  '2024',
  ['React Native', 'TypeScript'],
  'Next.js Site',
  <>
    <Txt>
      Nuclear Connections is a social word game inspired by the New York Times
      game "Connections," where players create a list of four words about
      themselves to see how well they know each other.
    </Txt>
    <Txt>
      Developed by my dad as a paper-and-pencil game for the Christmas holidays,
      we teamed up to make it easier for our globally-distributed family to
      play. The game has already seen organic growth, with over 150 boards
      played.
    </Txt>
    <Txt>
      Built using Next.js, TypeScript, and React, the backend runs entirely
      serverless on Vercel Functions.
    </Txt>
  </>,
  'Co-Developer',
  [collaborator('David Molloy')],
)
