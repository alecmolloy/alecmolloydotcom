import { heroVideo, link, project } from '@/app/content-types'
import utopiaHero from '@/public/portfolio/utopia/utopia-02.png'

export const utopia = project(
  'utopia',
  'Utopia.app',
  'React Design Tool. Canvas and code update each other in real time.',
  heroVideo('/portfolio/utopia/utopia-01.mp4', utopiaHero, 'Utopia'),
  '2017–2020',
  ['React', 'TypeScript'],
  <>
    <p>
      Utopia.app is a design and coding environment for React projects that runs
      entirely in the browser. It combines a code editor and design tool, with
      full two-way synchronization between design and code.
    </p>
    <p>
      I worked as a Creative Technologist, focusing on UI design and
      React/TypeScript development. Utopia was later acquired by Shopify and
      continues to be developed.
    </p>
  </>,
  'Design and coding IDE',
  'Creative Technologist',
  undefined,
  [
    link('Website', 'https://utopia.app'),
    link('GitHub', 'https://github.com/concrete-utopia/utopia'),
  ],
  'Shopify',
)
