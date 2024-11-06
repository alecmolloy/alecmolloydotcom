import { heroImage, link, project } from '@/app/content-types'
import isItAvocadosOrNotHero from '@/public/portfolio/is-it-avocados-or-not/is-it-avocados-or-not.png'

export const isItAvocadosOrNot = project({
  slug: 'isitavocadosornotdotcom',
  title: 'isitavocadosornot.com',
  subtitle: 'a silly web game made with friends',
  hero: heroImage(isItAvocadosOrNotHero, 'Is It Avocados or Not'),
  date: '2013',
  content: (
    <>
      <p>
        isitavocadosornot.com was a web game I built with my friends. Part
        captcha game / part AI-training-data parody. See for yourself if you can
        tell whether it is an avocodo or not.
      </p>
      <p>
        Sadly I can no longer afford the $10/year to keep the domain running,
        but it lives on at GitHub pages.
      </p>
    </>
  ),
  links: [
    link('isitavocadosornot.com', 'https://isitavocadosornot.alecmolloy.com'),
  ],
})
