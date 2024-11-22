import { collaborator, heroVideo, link, project } from '@/app/content-types'
import acroyogaTransitionsPoster from '@/public/portfolio/acroyoga-transitions/acroyoga-transitions-poster.png'

export const acroyogaTransitions = project(
  project({
    slug: 'acroyoga-transitions',
    title: 'AcroYoga Transitions',
    subtitle: 'Acro game and training tool',
    hero: heroVideo(
      '/portfolio/acroyoga-transitions/acroyoga-transitions.mp4',
      '/portfolio/acroyoga-transitions/acroyoga-transitions.mp4',
      acroyogaTransitionsPoster,
      'Acroyoga Transitions',
    ),
    date: '2018-20',
    tools: ['React'],
    content: (
      <>
        <p>
          Acroyoga is a partner sport that combines elements of yoga, dance, and
          martial arts. I taught acroyoga to beginners and coached advanced
          students to help them advance in their skills.
        </p>
      </>
    ),
    deliverables: 'Web-based game',
    role: undefined,
    collaborators: [
      collaborator('Jason Nemer', 'https://www.instagram.com/jasonnemer/'),
    ],
    links: [link('Website', 'https://lw8bg.csb.app')],
  }),
)
