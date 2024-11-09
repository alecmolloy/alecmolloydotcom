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
        Min Doktor was Europe’s largest telehealth provider, when I joined as
        Product Manager for their React Native Patient App. They offered full
        doctor’s visits via smartphone, connecting thousands of patients with
        doctors daily, especially those in Sweden’s sparsely populated
        countryside.
      </p>
      <p>
        I managed the expansion into new types of visits, including mental
        health, conversion improvements, and regulatory compliance for Swedish
        and other future EU markets.
      </p>
    </>
  ),
  deliverables: 'Patient consultation app',
  role: 'Product Manager',
})
