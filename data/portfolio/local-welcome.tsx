import { heroImage, project } from '@/app/content-types'
import localWelcomeHero from '@/public/portfolio/local-welcome/local-welcome-01.jpg'

export const localWelcome = project(
  'Local Welcome',
  'Community-building app for refugees',
  heroImage(localWelcomeHero, 'Local Welcome Community App'),
  '2023',
  ['Next.js', 'React', 'Zapier', 'Google Apps Script'],
  'Full-stack data infrastructure',
  <>
    <p>
      Local Welcome is a UK charity dedicated to helping refugees integrate with
      their local communities. I developed data dashboards and infrastructure to
      manage the charity’s expansion into 30 UK cities, and created full-stack
      meal ticketing and attendance systems.
    </p>
  </>,
  'Software Developer',
  [],
)
