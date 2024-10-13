import { heroImage, project } from '@/app/content-types'
import adobeHero from '@/public/portfolio/adobe/adobe-01.png'

export const adobe = project(
  'adobe',
  'Adobe',
  'Designer and Product Manager for Learning Games',
  heroImage(adobeHero, 'Adobe Digital Media Internship and Learning Games'),
  '2014',
  ['Photoshop', 'InDesign'],
  'Learning content and experimental learning games',
  <>
    <p>
      I joined Adobe as a Digital Media Intern in 2012, writing, editing,
      designing, and managing learning content for Photoshop, Lightroom,
      InDesign, and Acrobat. I also performed analytics for the editorial team
      and researched user experiences for data-driven design projects.
    </p>
    <p>
      After graduation, I served as a Product Manager for Learning Games, part
      of an intrapreneurship program. I led a team to build experimental games
      for Photoshop and Illustrator, which were shown to 5+ million Creative
      Cloud users. These games contributed to a significant bump in trial
      conversions, proving the profitability of games as a learning solution.
    </p>
    <p>
      I conducted in-person and remote research sessions, articulating a product
      vision informed by user research and collaboration with UX and engineering
      teams.
    </p>
  </>,
  'Digital Media Intern, Product Manager for Learning Games',
  [],
)
