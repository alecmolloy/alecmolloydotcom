import { collaborator, heroVideo, project } from '@/app/content-types'
import elementsPoster from '@/public/portfolio/elements-3d/elements-3d-poster.png'

export const elements3D = project(
  'Elements 3D',
  'Art + coding IDE and library',
  heroVideo(
    '/portfolio/elements-3d/elements-3d.mp4',
    elementsPoster,
    'Elements 3D IDE',
  ),
  '2015',
  ['TypeScript'],
  'Code editor and live 3D scene, Imperative API',
  <>
    <p>
      Elements 3D is a simple 3D art coding IDE and library that allows users to
      create 3D creations with simple commands. It was forked from a 2D-drawing
      tool by a colleague from Kano Computing.
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
  </>,
  'Creative Technologist',
  [collaborator('Tancredi Trugenburger')],
)