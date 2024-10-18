import { collaborator, heroVideo, project } from '@/app/content-types'
import kanoHero from '@/public/portfolio/kano/kano-01.webp'

export const kano = project(
  'kano',
  'Kano Computing',
  'Educational technology kits, software, and community',
  heroVideo('/portfolio/kano/kano.mp4', kanoHero, 'Kano Educational Tools'),
  '2014–16',
  ['Python', 'JavaScript', 'Sketch'],
  <>
    <p>
      Kano creates technology kits and educational tools designed to help people
      of all ages learn to code, create, and understand technology. I joined as
      the first product manager to launch the record-breaking Kickstarter-backed
      Kano Computer Kit.
    </p>
    <p>
      I built user research into the company culture with regular visits to
      customer houses, schools, and coding spaces. I transformed a product with
      a great 2-hour unboxing experience, but poor longevity, into a
      retention-oriented creative content system that brought kids back daily.
    </p>
    <p>
      Eventually, I managed the web, creative tools, and Kano World community. I
      developed a remix-oriented learning content model that spurred significant
      platform growth. Later, I transitioned into a creative technologist role,
      working on new hardware products and digital creative tools like Make
      Light, LightBoard, Pixel Kit, Screen Kit, Camera Kit, and Speaker Kit.
    </p>
  </>,
  'Creative content system and community platform',
  'Product Manager, Creative Technologist',
  [
    collaborator(
      'Brandon Jackson',
      'https://www.instagram.com/brandonscottjackson/',
    ),
    collaborator('Mathew Keegan', 'https://x.com/_welshwizard'),
    collaborator('James Hicks', 'https://neuemodern.com'),
    collaborator('Tommy Säl', 'https://sal.design'),
    collaborator('Sherif Maktabi', 'https://www.linkedin.com/in/sherifmak/'),
  ],
)
