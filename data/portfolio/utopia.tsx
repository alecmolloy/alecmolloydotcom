import { heroVideo, project } from '@/app/content-types'
import utopiaHero from '@/public/portfolio/utopia/utopia-02.png'

export const utopia = project(
  'Utopia.app',
  'WYSIWYG for React. Design and code update each other, in real time.',
  heroVideo('/portfolio/utopia/utopia-01.mp4', utopiaHero, 'Utopia'),
  '2017–20',
  ['React', 'TypeScript'],
  'Design and coding IDE',
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
  'Creative Technologist',
  undefined,
  undefined,
  'Shopify',
)
