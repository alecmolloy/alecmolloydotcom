import { heroVideo, project } from '@/app/content-types'
import instantReplayPoster from '@/public/portfolio/instant-replay/instant-replay-01-poster.jpg'

export const instantReplay = project(
  'Instant Replay',
  'Training software for handstand practice',
  heroVideo(
    '/portfolio/instant-replay/instant-replay-01.mp4',
    instantReplayPoster,
    'Instant Replay Handstand Training',
  ),
  '2023',
  ['TensorFlow.js', 'React', 'TypeScript'],
  'Webcam-based handstand analysis tool',
  <>
    <p>
      Instant Replay is training software designed to assist with handstand
      training by providing instant auto-replays. It watches your training live
      through a webcam and keeps a record of your handstands in a session.
    </p>
    <p>
      Developed with TensorFlow.js for full-body pose detection, the software
      helps analyze movements to detect the start and finish of handstands.
    </p>
    <p>
      Development is on hold due to a concussion but will resume in the future.
    </p>
  </>,
  'Developer',
  [],
)
