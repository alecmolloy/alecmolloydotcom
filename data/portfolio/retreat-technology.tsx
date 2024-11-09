import { heroImage, link, project } from '@/app/content-types'
import retreatHero from '@/public/portfolio/retreat/retreat-01.jpg'

export const retreatTechnology = project({
  slug: 'retreat-technology',
  title: 'Retreat.technology',
  subtitle: 'Lock yourself out of social media',
  hero: heroImage(retreatHero, 'Retreat.technology App'),
  date: '2024',
  tools: ['React Native', 'TypeScript', 'Next.js', 'Figma', 'Vercel'],
  content: (
    <>
      <p>
        Retreat.technology locks you out of Instagram, Facebook, Twitter, or
        whatever you need a break from. It acts as a timed safe, securely
        locking your passwords away for a set period of time, encouraging users
        to reconnect to themselves, and spend time away from their screens.
      </p>
      <p>
        The tool stores passwords to people’s public identities, so a
        highly-secure solution was needed, and despite password managers being
        available everywhere, people don’t use them or understand them, so a
        simple solution was needed too.
      </p>
      <p>
        Retreat uses one Argon2id-hashed password for both account access and
        vault encryption. The user password is hashed twice using this
        algorithm, using the first hash to derive the Data Encryption Key for
        the vault. The double hash is stored to authenticate when logging in and
        locking vaults. This ensures that no passwords are stored in plain text.
        It was built with TypeScript, React, and Next.js, running entirely
        serverless on Vercel Functions.
      </p>
      <p>
        I launched this on January 1st, 2024, with over 200 users in the first
        month, receiving positive feedback and feature requests for browser
        plugins, timed access, and Passkey support. A SwiftUI iOS app is in
        development for release in 2025.
      </p>
    </>
  ),
  links: [
    link('Website', 'https://retreat.technology'),
    link('GitHub', 'https://github.com/alec-molloy/retreat-technology'),
  ],
})
