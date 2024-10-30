import { heroImage, project } from '@/app/content-types'
import gameOfLifeHero from '@/public/portfolio/game-of-life/game-of-life-hero.png'

export const gameOfLife = project(
  project({
    slug: 'game-of-life',
    title: 'Game of Life Editor',
    subtitle: undefined,
    hero: heroImage(gameOfLifeHero, 'Game of Life Editor'),
    date: '2023',
    tools: ['TypeScript', 'WebGL', 'React'],
    content: (
      <>
        <p>
          The Game of Life Editor is an interactive web application that allows
          users to create, edit, and simulate patterns in Conway’s Game of Life.
          Users can draw patterns on a grid, set initial states, and watch the
          evolution of the patterns based on the rules of the Game of Life.
        </p>
        <p>
          Developed using JavaScript and React, the editor provides a
          user-friendly interface with features such as grid resizing, pattern
          saving, and step-by-step simulation control. The project aims to
          provide an educational tool for understanding cellular automata and
          the principles behind Conway’s Game of Life.
        </p>
      </>
    ),
    deliverables:
      'A web-based interactive editor for creating and simulating patterns in Conway’s Game of Life',
    role: 'Developer',
    collaborators: [],
  }),
)
