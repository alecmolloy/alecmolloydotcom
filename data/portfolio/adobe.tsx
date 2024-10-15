import { heroImage, project } from '@/app/content-types'
import adobeHero from '@/public/portfolio/adobe/adobe-01.png'
import { Text as Txt } from '@radix-ui/themes'

export const adobe = project(
  'adobe',
  'Adobe',
  'Designer and Product Manager for Learning Games',
  heroImage(adobeHero, 'Adobe Digital Media Internship and Learning Games'),
  '2014',
  ['Photoshop', 'InDesign'],
  'Learning content and experimental learning games',
  <>
    <Txt>
      I joined Adobe as a Digital Media Intern in the summer of 2012. I wrote,
      edited, designed, and managed learning content for Photoshop, Lightroom,
      InDesign, and Acrobat. I performed analytics for the editorial team,
      researched user experiences for data-driven design projects, and
      represented Adobe as a product expert in online communities. After the
      summer, my contract was extended to continue working full-time through my
      senior year at Santa Clara, just down the road from the headquarters.
    </Txt>
    <Txt>
      After graduation, I served as a Product Manager for Learning Games. I
      joined an intrapreneurship program and led a team responsible for building
      experimental learning games for Photoshop and Illustrator. I managed,
      researched, developed, QA’d, and launched learning games that were given
      placement on the Creative Cloud app welcome splash screens, shown to 5+
      million users, and contributed to a $10M ARR bump in trial conversions. By
      validating early MVPs with customers, I proved the profitability of games
      as a learning solution and secured funding for further development. I
      conducted in-person and remote research sessions with customers and
      articulated a product vision informed by user research and input from UX
      and Engineering teams.
    </Txt>
    <Txt>
      I conducted in-person and remote research sessions, articulating a product
      vision informed by user research and collaboration with UX and engineering
      teams.
    </Txt>
  </>,
  'Digital Media Intern, Product Manager for Learning Games',
  [],
)
