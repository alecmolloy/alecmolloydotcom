import { collaborator, heroVideo, project } from '@/app/content-types'
import acroyogaTransitionsPoster from '@/public/portfolio/acroyoga-transitions/acroyoga-transitions-poster.png'

export const acroyogaTransitions = project(
  'acroyoga-transitions',
  'AcroYoga Transitions',
  'Acro game and training tool',
  heroVideo(
    '/portfolio/acroyoga-transitions/acroyoga-transitions.mp4',
    acroyogaTransitionsPoster,
    'Acroyoga Transitions',
  ),
  '2018-20',
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
  [collaborator('Jason Nemer', 'https://www.instagram.com/jasonnemer/')],
)
