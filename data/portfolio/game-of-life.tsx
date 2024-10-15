import { heroImage, project } from '@/app/content-types'
import gameOfLifeHero from '@/public/portfolio/game-of-life/game-of-life-hero.png'
import { Text as Txt } from '@radix-ui/themes'

export const gameOfLife = project(
  'game-of-life',
  'Game of Life Editor',
  undefined,
  heroImage(gameOfLifeHero, 'Game of Life Editor'),
  '2023',
  ['TypeScript', 'WebGL', 'React'],
  "A web-based interactive editor for creating and simulating patterns in Conway's Game of Life",
  <>
    <Txt>
      The Game of Life Editor is an interactive web application that allows
      users to create, edit, and simulate patterns in Conway's Game of Life.
      Users can draw patterns on a grid, set initial states, and watch the
      evolution of the patterns based on the rules of the Game of Life.
    </Txt>
    <Txt>
      Developed using JavaScript and React, the editor provides a user-friendly
      interface with features such as grid resizing, pattern saving, and
      step-by-step simulation control. The project aims to provide an
      educational tool for understanding cellular automata and the principles
      behind Conway's Game of Life.
    </Txt>
  </>,
  'Developer',
  [],
)
