import { collaborator, heroVideo, project } from '@/app/content-types'
import elementsPoster from '@/public/portfolio/elements-3d/elements-3d-poster.png'

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
      <p>
        Elements 3D is a simple 3D art coding IDE and library that allows users
        to create 3D creations with simple commands. It was forked from a
        2D-drawing tool by a colleague from Kano Computing.
      </p>
      <p>
        It was built using Vanilla JavaScript, CoffeeScript, Ace.js for text
        editing, and THREE.js for rendering. The library preloads a simplified
        declarative interface for 3D creation, allowing easy manipulation of 3D
        objects.
      </p>
      <p>
        Additionally, it includes a built-in Lindenmayer-system toolset for
        generative and fractal artwork.
      </p>
    </>
  ),
  deliverables: 'Code editor and live 3D scene, Imperative API',
  role: 'Creative Technologist',
  collaborators: [collaborator('Tancredi Trugenburger')],
})
