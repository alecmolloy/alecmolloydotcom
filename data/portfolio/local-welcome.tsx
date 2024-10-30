import { heroImage, project } from '@/app/content-types'
import localWelcomeHero from '@/public/portfolio/local-welcome/local-welcome-01.jpg'

export const localWelcome = project({
  slug: 'local-welcome',
  title: 'Local Welcome',
  subtitle: 'Building community with meals for refugees and vulnerable people.',
  hero: heroImage(localWelcomeHero, 'Local Welcome Community App'),
  date: '2021–23',
  tools: ['Next.js', 'React', 'Zapier', 'Google Apps Script'],
  content: (
    <>
      <p>
        Local Welcome is a UK charity dedicated to helping refugees integrate
        with their local communities. I developed data dashboards and
        infrastructure to manage the charity’s expansion into 30 UK cities, and
        created full-stack meal ticketing and attendance systems.
      </p>
    </>
  ),
  deliverables: 'Full-stack data infrastructure',
  role: 'Software Developer',
})
