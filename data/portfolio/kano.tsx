import { heroVideo, project } from '@/app/content-types'
import kanoHero from '@/public/portfolio/kano/kano-01.webp'

export const kano = project(
  'Kano',
  'Product manager, Creative Technologist. Educational technology kits and tools',
  heroVideo('/portfolio/kano/kano.mp4', kanoHero, 'Kano Educational Tools'),
  '2014–16',
  ['TypeScript', 'JavaScript'],
  'Creative content system and community platform',
  <>
    <p>
      Kano creates educational technology kits designed to teach coding and
      creativity. I managed the web platform and creative tools that supported
      the Kano World community, driving significant platform growth.
    </p>
    <p>
      I also worked on new hardware products and digital creative tools like
      Make Light and Pixel Kit.
    </p>
  </>,
  'Product Manager',
  [],
)
