import { heroVideo, link, project } from '@/app/content-types'
import utopiaHero from '@/public/portfolio/utopia/utopia-02.png'

export const utopia = project({
  slug: 'utopia',
  title: 'Utopia.app',
  subtitle:
    'React Design Tool. Canvas and code update each other in real time.',
  hero: heroVideo('/portfolio/utopia/utopia-01.mp4', utopiaHero, 'Utopia'),
  date: '2017–2020',
  tools: ['React', 'TypeScript'],
  content: (
    <>
      <p>
        Utopia.app is a design and coding environment for React projects that
        runs entirely in the browser. It combines a code editor and design tool,
        with full two-way synchronization between design and code.
      </p>
      <p>
        I worked as a Creative Technologist, focusing on UI design and
        React/TypeScript development. Utopia was acquired by Shopify and .
      </p>
      <iframe
        src='https://www.youtube.com/embed/aoxnciKRZGU'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        style={{ width: '100%' }}
      />
    </>
  ),
  deliverables: 'Design and coding IDE',
  role: 'Creative Technologist',
  collaborators: undefined,
  links: [
    link('Website', 'https://utopia.app'),
    link('GitHub', 'https://github.com/concrete-utopia/utopia'),
  ],
  acquisition: 'Shopify',
})
