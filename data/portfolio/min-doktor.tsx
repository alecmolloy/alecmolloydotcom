import { heroImage, project } from '@/app/content-types'
import minDoktorHero from '@/public/portfolio/min-doktor/min-doktor-01.png'
import { Text as Txt } from '@radix-ui/themes'
export const minDoktor = project(
  'min-doktor',
  'Min Doktor',
  'Product Management, patient app',
  heroImage(minDoktorHero, 'Min Doktor Telehealth Platform'),
  '2016–17',
  ['React Native'],
  'Patient consultation app',
  <>
    <Txt>
      Min Doktor is Europe’s largest telehealth provider, offering full doctor’s
      visits via smartphone. I managed the React Native Patient App, overseeing
      tools that connected thousands of patients with doctors daily.
    </Txt>
    <Txt>
      I managed the expansion into new types of visits, patient conversion
      improvements, and regulatory compliance for Swedish and EU markets.
    </Txt>
  </>,
  'Product Manager',
  [],
)
