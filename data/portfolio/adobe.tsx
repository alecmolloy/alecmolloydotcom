import { collaborator, heroImage, link, project } from '@/app/content-types'
import { PortfolioImage } from '@/components/PortfolioImage'
import adobeHero from '@/public/portfolio/adobe/adobe-01.png'
import nimbusTeam from '@/public/portfolio/adobe/nimbus-team.jpg'

export const adobe = project({
  slug: 'adobe',
  title: 'Adobe',
  subtitle:
    'Designer and Product Manager for Learning Games in Illustrator and Photoshop CC. Digital Media Internship, Community Help and Learning.',
  hero: heroImage(
    adobeHero,
    'Adobe Digital Media Internship and Learning Games',
  ),
  date: '2012–2014',
  tools: ['Photoshop', 'InDesign'],
  content: (
    <>
      <p>
        I joined Adobe as a Digital Media Intern in the summer of 2012, and was
        later a Product Manager for Learning Games. I wrote, edited, designed,
        and managed learning content for Creative Cloud apps.
      </p>
      <PortfolioImage
        src={nimbusTeam}
        alt='Project Nimbus team'
        caption='The Project Nimbus learning games team'
      />
      <p>
        I joined Adobe’s intrapreneurship program and led a team responsible for
        building experimental learning games for Photoshop and Illustrator. I
        managed, researched, developed, marketed, and launched learning games
        that headlined the Creative Cloud app welcome splash screens for a
        number of years, shown to millions of users.
      </p>
      <blockquote className='twitter-tweet'>
        <p lang='en' dir='ltr'>
          <a href='https://twitter.com/Illustrator?ref_src=twsrc%5Etfw'>
            @Illustrator
          </a>{' '}
          If those cool tutorials didn’t pop up in the new CC, I would never
          have used Shape Builder.{' '}
          <a href='https://twitter.com/hashtag/thankyou?src=hash&amp;ref_src=twsrc%5Etfw'>
            #thankyou
          </a>
        </p>
        &mdash; andy rolfes (@AndrewRolfes){' '}
        <a href='https://twitter.com/AndrewRolfes/status/488714861530992641?ref_src=twsrc%5Etfw'>
          July 14, 2014
        </a>
      </blockquote>{' '}
      <script
        async
        src='https://platform.twitter.com/widgets.js'
        charSet='utf-8'
      ></script>
      <p>
        By validating early MVPs with customers, I proved the trial conversion
        impact of learning games, and secured funding for further development. I
        conducted research sessions with customers and articulated a product
        vision informed by user research and input from UX and Engineering
        teams.
      </p>
      <p>
        You can still play the first game we built, the pen tool game on{' '}
        <a href='https://helpx.adobe.com/illustrator/games/pen-tool-game/'>
          Adobe.com
        </a>
        .
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
  links: [
    link(
      'Pen Tool Game',
      'https://helpx.adobe.com/illustrator/games/pen-tool-game/',
    ),
  ],
})
