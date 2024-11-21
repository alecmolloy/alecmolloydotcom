import { heroVideo, link, project } from '@/app/content-types'
import { PortfolioCaption } from '@/components/PortfolioCaption'
import utopiaPoster from '@/public/portfolio/utopia/utopia-poster.jpg'
import utopiaLogo from '@/public/portfolio/utopia/utopia-02.png'
import { Squircle } from '@squircle-js/react'
import { PortfolioImage } from '@/components/PortfolioImage'

export const utopia = project({
  slug: 'utopia',
  title: 'Utopia.app',
  subtitle:
    'React Design Tool. Canvas and code update each other in real time.',
  hero: heroVideo(
    '/portfolio/utopia/utopia-large.mp4',
    '/portfolio/utopia/utopia-small.mp4',
    utopiaPoster,
    'Utopia',
  ),
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
        I worked as a Creative Technologist, designing the UI and writing the
        React/TypeScript/CSS interpreters they were coupled to. I set goalposts
        by designing the kinds of beautiful, physically-based interactions we
        wanted to make easy in the app, and built roadmaps to achieve them.
      </p>
      <Squircle cornerRadius={16}>
        <iframe
          src='https://www.youtube.com/embed/aoxnciKRZGU'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          style={{ width: '100%', aspectRatio: '16 / 9', display: 'block' }}
        />
      </Squircle>
      <PortfolioCaption
        caption={
          'Founder Malte Nuhn showing off how Utopia has evolved inside Shopify. (I left before the acquisition, but the core has remained the same.)'
        }
      />
      <p>
        Utopia was acquired by Shopify and is currently being integrated into
        their Hydrogen shop-building platform.
      </p>
      <PortfolioImage
        src={utopiaLogo}
        caption='The Utopia logo I designed, affectionately referred to as the "Smiangle". The first of many smiley face logos.'
        alt='Utopia logo'
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
