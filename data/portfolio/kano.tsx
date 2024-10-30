import {
  collaborator,
  heroVideo,
  project,
  recognition,
} from '@/app/content-types'
import { PortfolioImage } from '@/components/PortfolioImage'
import kanoKit3dRender from '@/public/portfolio/kano/kano-kit-3d-render.webp'
import remixPresentation from '@/public/portfolio/kano/remix-presentation.jpg'

export const kano = project({
  slug: 'kano',
  title: 'Kano Computing',
  subtitle: 'Educational technology kits, software, and community',
  hero: heroVideo(
    '/portfolio/kano/kano.mp4',
    kanoKit3dRender,
    'Kano Educational Tools',
  ),
  date: '2014–16',
  tools: ['Python', 'JavaScript', 'Sketch'],
  content: (
    <>
      <p>
        Kano creates technology kits and educational tools designed to help
        people of all ages learn to code, create, and understand technology. I
        joined as the first product manager to launch the record-breaking
        Kickstarter-backed Kano Computer Kit.
      </p>
      <PortfolioImage
        src={kanoKit3dRender}
        alt='Kano Computer Kit'
        caption='Hello'
      />
      <p>
        I built user research into the company culture with regular visits to
        customer houses, schools, and coding spaces. I transformed a product
        with a great 2-hour unboxing experience, but poor longevity, into a
        retention-oriented creative content system that brought kids back daily.
      </p>
      <PortfolioImage
        src={remixPresentation}
        alt='Remix Presentation'
        caption='Remixing is how creativity works, and it is how we should teach it. Building our learning content strategy around remixing, our online community became a thriving hub for creative exchange.'
      />
      <p>
        Eventually, I managed the web, creative tools, and Kano World community.
        I developed a remix-oriented learning content model that spurred
        significant platform growth. Later, I transitioned into a creative
        technologist role, working on new hardware products and digital creative
        tools like Make Light, LightBoard, Pixel Kit, Screen Kit, Camera Kit,
        and Speaker Kit.
      </p>
    </>
  ),
  deliverables: 'Creative content system and community platform',
  role: 'Product Manager, Creative Technologist',
  collaborators: [
    collaborator(
      'Brandon Jackson',
      'https://www.instagram.com/brandonscottjackson/',
    ),
    collaborator('Mathew Keegan', 'https://x.com/_welshwizard'),
    collaborator('James Hicks', 'https://neuemodern.com'),
    collaborator('Tommy Säl', 'https://sal.design'),
    collaborator('Sherif Maktabi', 'https://www.linkedin.com/in/sherifmak/'),
  ],
  recognition: [
    recognition(
      'Cannes Lions',
      '2014',
      'Product Design Gold',
      'https://www.theinspiration.com/2014/06/cannes2014-product-design-gold-lions-canneslions/',
    ),
    recognition(
      '$15M Series A',
      '2015',
      'Led by Breyer Capital',
      'https://techcrunch.com/2015/05/04/kano-series-a',
    ),
    recognition(
      'Red Dot Design Award',
      '2015',
      'Awarded for outstanding product design',
      'https://www.red-dot.org/project/kano-33536',
    ),
    recognition(
      'Webby Award',
      '2015',
      'Apps & Software',
      'https://winners.webbyawards.com/2015/apps-and-software/mobile-ott-app-features/connected-products-wearables/158738/kano-a-computer-anyone-can-make',
    ),
  ],
})
