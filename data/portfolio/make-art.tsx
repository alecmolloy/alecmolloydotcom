import { heroImage, project } from '@/app/content-types'
import makeArtHero from '@/public/portfolio/make-art/make-art-hero.png'
import { MakeArtItems } from '@/data/make-art'
import { MakeArtCard } from '@/components/portfolio/MakeArtCard'
import { Grid } from '@radix-ui/themes'

export const makeArt = project({
  slug: 'make-art',
  title: 'Make Art',
  subtitle: 'My images from the Kano World creative coding platform',
  hero: heroImage(makeArtHero, 'Make Art Creative Coding Platform'),
  date: '2014–16',
  tools: ['CoffeeScript', 'JavaScript'],
  content: (
    <>
      <p>
        Make Art was built by Tancredi Trugenberger for the Kano Computer Kit,
        as a creative coding tool for kids, but its simple design and imperative
        API made for a great sketchpad for generative art. I wrote most of the
        tool’s interactive coding tutorials, which taught programming and
        graphics concepts to beginner coders. The creations below are a sample
        of my favorite things I made with the tool, some with hundreds of
        remixes by young Kano World creators.
      </p>
      <p>
        The tool still is available at{' '}
        <a href='http://art.kano.me'>art.kano.me</a>, and my creations on{' '}
        <a href='https://world.kano.me/users/alec'>world.kano.me</a> but sadly
        both are poorly maintained, so I’ve archived them here.
      </p>
      <Grid columns='2' gapX='4' gapY='6' my='4'>
        {MakeArtItems.map((item, i) => (
          <MakeArtCard key={i} item={item} />
        ))}
      </Grid>
    </>
  ),
  deliverables: 'Creative coding examples and learning challenges',
  role: 'Learning Content Developer',
})
