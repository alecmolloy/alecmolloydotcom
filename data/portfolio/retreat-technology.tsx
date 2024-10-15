import { collaborator, heroImage, project } from '@/app/content-types'
import retreatHero from '@/public/portfolio/retreat/retreat-01.jpg'
import { Text as Txt } from '@radix-ui/themes'

export const retreatTechnology = project(
  'retreat-technology',
  'Retreat.technology',
  'Lock yourself out of social media',
  heroImage(retreatHero, 'Retreat.technology App'),
  '2024',
  ['React Native', 'TypeScript', 'Next.js', 'Figma'],
  'Next.js Site, Secure Password Storage',
  <>
    <Txt>
      Retreat.technology locks you out of Instagram, Facebook, Twitter, or
      whatever you need a break from. It acts as a timed safe, securely locking
      away your passwords for a set period, encouraging users to disconnect and
      spend time away from their screens.
    </Txt>
    <Txt>
      The tool stores the keys to peoples' social media accounts, so a
      highly-secure solution was needed. Despite password managers being
      available everywhere, people are bad at remembering passwords—so a simple
      solution was needed too.
    </Txt>
    <Txt>
      Retreat elegantly uses one password for both storing and accessing vaults,
      ensuring that no passwords are stored in plain text. It was built with
      TypeScript, React, and Next.js, running entirely serverless on Vercel
      Functions.
    </Txt>
    <Txt>
      I launched this on January 1st, 2024, with over 200 users in the first
      month, receiving positive feedback and feature requests for browser
      plugins, timed access, and Passkey support.
    </Txt>
  </>,
  'Full-Stack Developer',
  [collaborator('Antoine Sakho')],
)
