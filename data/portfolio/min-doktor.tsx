import { heroImage, project } from '@/app/content-types'
import minDoktorHero from '@/public/portfolio/min-doktor/min-doktor-01.png'
export const minDoktor = project({
  slug: 'min-doktor',
  title: 'Min Doktor',
  subtitle: 'Product Manager, patient app',
  hero: heroImage(minDoktorHero, 'Min Doktor Telehealth Platform'),
  date: '2016–17',
  tools: ['React Native'],
  content: (
    <>
      <p>
        Min Doktor is Europe’s largest telehealth provider, offering full
        doctor’s visits via smartphone. I managed the React Native Patient App,
        overseeing tools that connected thousands of patients with doctors
        daily.
      </p>
      <p>
        I managed the expansion into new types of visits, patient conversion
        improvements, and regulatory compliance for Swedish and EU markets.
      </p>
    </>
  ),
  deliverables: 'Patient consultation app',
  role: 'Product Manager',
})
