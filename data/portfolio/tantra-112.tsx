import { collaborator, heroImage, link, project } from '@/app/content-types'
import { PortfolioImage } from '@/components/PortfolioImage'
import screenshot01 from '@/public/portfolio/tantra-112/screenshot-1.webp'
import screenshot02 from '@/public/portfolio/tantra-112/screenshot-2.webp'
import screenshot03 from '@/public/portfolio/tantra-112/screenshot-3.webp'
import screenshot05 from '@/public/portfolio/tantra-112/screenshot-5.webp'
import screenshot06 from '@/public/portfolio/tantra-112/screenshot-6.webp'
import screenshot07 from '@/public/portfolio/tantra-112/screenshot-7.webp'
import vbt01 from '@/public/portfolio/tantra-112/tantra-112-01.jpg'
import { Grid } from '@radix-ui/themes'

export const tantra112 = project({
  slug: 'tantra-112',
  title: 'TANTRA 112',
  subtitle: 'Meditation App — Design, Illustration, React Native App',
  hero: heroImage(vbt01, 'Vijñāna Bhairava Tantra'),
  date: 'Coming August 2025',
  tools: ['React Native', 'Expo', 'TypeScript', 'Figma', 'Midjourney'],
  content: (
    <>
      <p>
        Bestselling author and sanskritist Dr. Hareesh Wallis had finished his
        translation of the revered 9th-century yogic practice guide, the{' '}
        <i>Vijñana-bhairava-tantra</i>, and wanted to build an app to bring the
        text to life. It is an influential catalogue of 112 practices, radical
        at the time, and still today. Many of the practices guide you to inner
        stillness on your meditation cushion, but just as many invite you to
        find that stillness out in the world—eating a meal, watching dappled
        light, or wandering until you collapse, all with intensified presence.
      </p>
      <Grid columns='3' gapX='4' gapY='4'>
        <PortfolioImage src={screenshot01} alt='Tantra 112' my='0' />
        <PortfolioImage src={screenshot02} alt='Tantra 112' my='0' />
        <PortfolioImage src={screenshot03} alt='Tantra 112' my='0' />
      </Grid>
      <p>
        We designed a new learning path through all of the 112 practices,
        designed to support a consistent daily routine. Each of the practices
        were categorized by where and how they should be done—many can just be
        done seated in silence, but the transgressive nature of the text means a
        large amount break that pattern, and setting expectations for so many
        varied formats for an audience maybe more used to a predicable and
        controlled Duolingo-like experience was challenging, but has been well
        received by long-term practitioners and newbies alike.
      </p>
      <p>
        I built the app with Expo and React Native for iOS and Android. I
        designed the interface, did mockups, and prototyped with Figma, and
        illustrated each of the 112 practices with Midjourney. Additionally, I
        conducted user testing, and iterated on the design based on feedback.
      </p>
      <Grid columns='3' gapX='4' gapY='4'>
        <PortfolioImage src={screenshot05} alt='Tantra 112' my='0' />
        <PortfolioImage src={screenshot06} alt='Tantra 112' my='0' />
        <PortfolioImage src={screenshot07} alt='Tantra 112' my='0' />
      </Grid>
      <p>
        The app is currently in a closed alpha testing, and will be avaible in
        beta this August, with a launch to the public in Fall 2025. Sign up for
        pre-release access <a href='https://tantra112.app'>here</a>.
      </p>
    </>
  ),
  deliverables: 'iOS / Android App, Landing page, Illustrations',
  role: 'Cofounder, Designer, Developer',
  collaborators: [
    collaborator(
      'Dr. Christopher Wallace',
      'https://www.tantrailluminated.org/christopher-hareesh-wallis',
    ),
    collaborator('Antoine Sakho', 'https://sakho.me'),
  ],
  links: [link('Tantra 112', 'https://tantra112.app')],
})
