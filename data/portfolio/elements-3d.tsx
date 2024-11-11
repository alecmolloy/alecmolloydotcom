import { collaborator, heroVideo, project } from '@/app/content-types'
import { PortfolioImage } from '@/components/PortfolioImage'
import elementsPoster from '@/public/portfolio/elements-3d/elements-3d-poster.png'
import capacativeTouchScreen from '@/public/portfolio/elements-3d/interactive-capacitive-touch-screen.png'
import elementsTree from '@/public/portfolio/elements-3d/elements-tree.png'
import snowflake from '@/public/portfolio/elements-3d/snowflake.png'
import { Text as Txt } from '@radix-ui/themes'
import { PortfolioCaption } from '@/components/PortfolioCaption'

export const elements3D = project({
  slug: 'elements-3d',
  title: 'Elements 3D',
  subtitle: 'Art + coding IDE and library',
  hero: heroVideo(
    '/portfolio/elements-3d/elements-3d.mp4',
    elementsPoster,
    'Elements 3D IDE',
  ),
  date: '2015',
  tools: ['TypeScript'],
  content: (
    <>
      <PortfolioImage src={snowflake} alt='Snowflake' mt='0' />
      <p>
        Elements 3D is a simple 3D art coding IDE and library that allows users
        to create 3D creations with simple commands. It was forked from a
        2D-drawing tool by a colleague from Kano Computing.
      </p>
      <p>
        The editor was built with Ace.js, and scenes could be constructed with
        CoffeScript, using the library which was a simplified, more declarative
        interface to THREE.js, with imperative escape hatches.
      </p>
      <p>
        Additionally, it includes a built-in Lindenmayer-system toolset for
        generative and fractal artwork.
      </p>
      <div
        style={{
          padding: '62.5% 0 0 0',
          position: 'relative',
        }}
      >
        <iframe
          src='https://player.vimeo.com/video/149784930?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
          frameBorder='0'
          allow='autoplay; fullscreen; picture-in-picture; clipboard-write'
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          title='Hello Turtle'
        />
      </div>
      <script src='https://player.vimeo.com/api/player.js'></script>
      <PortfolioCaption
        caption={
          'Early work integrating the L-System interpreter into the editor. Language features could first be programmed inside the editor before moving into the official API.'
        }
      />
      <PortfolioImage
        src={capacativeTouchScreen}
        alt='Capacitive touch screen'
        caption='Prototyping an interactive explainer for the Kano Screen kit.'
      />
      <PortfolioImage
        src={elementsTree}
        alt='L-System tree'
        caption='A lil tree I made. :)'
      />
    </>
  ),
  deliverables: 'Code editor and live 3D scene, Imperative API',
  role: 'Creative Technologist',
  collaborators: [collaborator('Tancredi Trugenburger')],
})
