import { heroImage, heroVideo, project } from '@/app/content-types'
import acroyogaTransitionsPoster from '@/public/portfolio/acroyoga-transitions/acroyoga-transitions-poster.png'

export const acroyogaTransitions = project(
  'acroyoga-transitions',
  'Acroyoga Transitions',
  'Acroyoga Coach and Instructor',
  heroVideo(
    '/portfolio/acroyoga-transitions/acroyoga-transitions.mp4',
    acroyogaTransitionsPoster,
    'Acroyoga Transitions',
  ),
  '2018-2020',
  ['React'],
  'Acroyoga is a partner sport that combines elements of yoga, dance, and martial arts. I taught acroyoga to beginners and coached advanced students to help them advance in their skills.',
  <>
    <p>
      Acroyoga is a partner sport that combines elements of yoga, dance, and
      martial arts. I taught acroyoga to beginners and coached advanced students
      to help them advance in their skills.
    </p>
  </>,
  undefined,
  [{ name: 'Jason Nemer', url: 'https://acroyoga.org/' }],
)
