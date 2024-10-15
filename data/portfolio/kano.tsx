import { heroVideo, project } from '@/app/content-types'
import kanoHero from '@/public/portfolio/kano/kano-01.webp'
import { Text as Txt } from '@radix-ui/themes'

export const kano = project(
  'kano',
  'Kano',
  'Product manager, Creative Technologist. Educational technology kits and tools',
  heroVideo('/portfolio/kano/kano.mp4', kanoHero, 'Kano Educational Tools'),
  '2014–16',
  ['TypeScript', 'JavaScript'],
  'Creative content system and community platform',
  <>
    <Txt>
      Kano creates technology kits and educational tools designed to help people
      of all ages learn to code, create, and understand technology. I joined as
      the first product manager to launch the record-breaking Kickstarter-backed
      Kano Computer Kit.
    </Txt>
    <Txt>
      I built user research into the company culture with regular visits to
      customer houses, schools, and coding spaces. I transformed a product with
      a great 2-hour unboxing experience, but poor longevity, into a
      retention-oriented creative content system that brought kids back daily.
    </Txt>
    <Txt>
      Eventually, I managed the web, creative tools, and Kano World community. I
      developed a remix-oriented learning content model that spurred significant
      platform growth. Later, I transitioned into a creative technologist role,
      working on new hardware products and digital creative tools like Make
      Light, LightBoard, Pixel Kit, Screen Kit, Camera Kit, and Speaker Kit.
    </Txt>
  </>,
  'Product Manager',
  [],
)
