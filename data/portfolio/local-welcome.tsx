import { heroImage, link, project } from '@/app/content-types'
import localWelcomeHero from '@/public/portfolio/local-welcome/local-welcome-01.jpg'

export const localWelcome = project({
  slug: 'local-welcome',
  title: 'Local Welcome',
  subtitle: 'Building community with meals for refugees and vulnerable people.',
  hero: heroImage(localWelcomeHero, 'Local Welcome Community'),
  date: '2021–23',
  tools: ['Next.js', 'React', 'Zapier', 'Google Apps Script'],
  content: (
    <>
      <p>
        Local Welcome is a UK charity dedicated to helping refugees integrate by
        coooking and eating meals with members from their local community. I
        developed data dashboards and infrastructure to manage the charity’s
        expansion into 30 UK cities, and created full-stack meal ticketing and
        attendance systems.
      </p>
      <p>
        I used Vercel Serverless Functions, Next.js, and Tito for ticketing, and
        built Google Apps Scripts for data dashboards that kept their small team
        on top of all the many simultaneous weekly meals, and the many
        volunteers making them happen.
      </p>
    </>
  ),
  role: 'Software Engineer',
  links: [link('Local Welcome', 'https://localwelcome.org')],
})
