import { heroImage, project } from '@/app/content-types'
import minDoktorHero from '@/public/portfolio/min-doktor/min-doktor-01.png'

export const minDoktor = project(
  'Min Doktor',
  'Telehealth platform for remote doctor consultations',
  heroImage(minDoktorHero, 'Min Doktor Telehealth Platform'),
  '2017',
  ['React Native'],
  'Patient consultation app',
  <>
    <p>
      Min Doktor is Europe’s largest telehealth provider, offering full doctor’s
      visits via smartphone. I managed the React Native Patient App, overseeing
      tools that connected thousands of patients with doctors daily.
    </p>
    <p>
      I managed the expansion into new types of visits, patient conversion
      improvements, and regulatory compliance for Swedish and EU markets.
    </p>
  </>,
  'Product Manager',
  [],
)
