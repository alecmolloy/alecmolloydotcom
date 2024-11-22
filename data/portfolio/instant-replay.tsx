import { heroVideo, project } from '@/app/content-types'
import instantReplayPoster from '@/public/portfolio/instant-replay/instant-replay-01-poster.jpg'

export const instantReplay = project({
  slug: 'instant-replay',
  title: 'Instant Replay',
  subtitle: 'Training software for handstand practice',
  hero: heroVideo(
    '/portfolio/instant-replay/instant-replay-01.mp4',
    '/portfolio/instant-replay/instant-replay-01.mp4',
    instantReplayPoster,
    'Instant Replay Handstand Training',
  ),
  date: '2023',
  tools: ['TensorFlow.js', 'React', 'TypeScript'],
  content: (
    <>
      <p>
        Instant Replay is training software designed to assist with handstand
        training by providing instant auto-replays. It watches your training
        live through a webcam and keeps a record of your handstands in a
        session.
      </p>
      <p>
        Developed with TensorFlow.js for full-body pose detection, the software
        helps analyze movements to detect the start and finish of handstands.
      </p>
      <p>
        Development is on hold due to a concussion but will resume in the
        future.
      </p>
    </>
  ),
  deliverables: 'Webcam-based handstand analysis tool',
  role: 'Developer',
})
