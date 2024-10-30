import { collaborator, heroImage, project } from '@/app/content-types'
import adobeHero from '@/public/portfolio/adobe/adobe-01.png'

export const adobe = project({
  slug: 'adobe',
  title: 'Adobe',
  subtitle: 'Designer and Product Manager for Learning Games',
  hero: heroImage(
    adobeHero,
    'Adobe Digital Media Internship and Learning Games',
  ),
  date: '2014',
  tools: ['Photoshop', 'InDesign'],
  content: (
    <>
      <p>
        I joined Adobe as a Digital Media Intern in the summer of 2012. I wrote,
        edited, designed, and managed learning content for Photoshop, Lightroom,
        InDesign, and Acrobat. I performed analytics for the editorial team,
        researched user experiences for data-driven design projects, and
        represented Adobe as a product expert in online communities. After the
        summer, my contract was extended to continue working full-time through
        my senior year at Santa Clara, just down the road from the headquarters.
      </p>
      <p>
        After graduation, I served as a Product Manager for Learning Games. I
        joined an intrapreneurship program and led a team responsible for
        building experimental learning games for Photoshop and Illustrator. I
        managed, researched, developed, QA’d, and launched learning games that
        were given placement on the Creative Cloud app welcome splash screens,
        shown to 5+ million users, and contributed to a $10M ARR bump in trial
        conversions. By validating early MVPs with customers, I proved the
        profitability of games as a learning solution and secured funding for
        further development. I conducted in-person and remote research sessions
        with customers and articulated a product vision informed by user
        research and input from UX and Engineering teams.
      </p>
      <p>
        I conducted in-person and remote research sessions, articulating a
        product vision informed by user research and collaboration with UX and
        engineering teams.
      </p>
    </>
  ),
  deliverables: 'Learning content and experimental learning games',
  role: 'Digital Media Intern, Product Manager for Learning Games',
  collaborators: [
    collaborator('Luanne Seymour', 'https://www.luanneseymour.com/'),
    collaborator('Michael Jarrott', 'https://www.behance.net/mtjarrott/'),
    collaborator('E Larson', 'https://www.behance.net/erica-larson/'),
    collaborator('Kendall Plant', 'https://www.behance.net/kendallplant/'),
    collaborator('Julia Grummel', 'https://www.juliagrummel.com/'),
    collaborator(
      'Swapnil Shrivastava',
      'https://www.linkedin.com/in/swapnil-shrivastava-2b493637/',
    ),
  ],
})
