import { collaborator, heroImage, project } from '@/app/content-types'
import kanoHero from '@/public/portfolio/kano/kano-01.jpg'

export const kano = project(
  'Kano',
  'Educational technology kits and tools',
  heroImage(kanoHero, 'Kano Educational Tools'),
  '2016',
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
