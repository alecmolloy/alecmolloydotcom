import { heroImage, link, project } from '@/app/content-types'
import { PortfolioImage } from '@/components/PortfolioImage'
import portraitOfFiveCubesHero from '@/public/portfolio/portrait-of-five-cubes/portrait-of-five-cubes-hero.png'
import portraitOfFiveCubesInSitu from '@/public/portfolio/portrait-of-five-cubes/portrait-of-five-cubes-in-situ.jpg'

export const portraitOfFiveCubes = project({
  slug: 'portrait-of-five-cubes',
  title: 'Portrait of Five Cubes',
  subtitle: 'After Dale Seymour',
  hero: heroImage(portraitOfFiveCubesHero, 'Portrait of Five Cubes'),
  date: '2013',
  content: (
    <>
      <p>The first nice-looking thing I made with Three.js.</p>
      <p>
        Luanne Seymour was my boss and mentor at Adobe, and her father was Dale
        Seymour, a mathematician and sculptor. I saw the original in his
        sculpture garden at his home, and wanted to make it myself in my new
        favorite (and still favorite) library.
      </p>
      <PortfolioImage
        src={portraitOfFiveCubesInSitu}
        alt='Portrait of Five Cubes'
      />
    </>
  ),
  links: [
    link(
      'Portrait of Five Cubes',
      'https://portraitoffivecubes.alecmolloy.com',
    ),
  ],
})
