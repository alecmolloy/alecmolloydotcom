import { Project, ProjectSlug } from '@/app/content-types'
import { acroyogaTransitions } from './acroyoga-transitions'
import { adobe } from './adobe'
import { elements3D } from './elements-3d'
import { gameOfLife } from './game-of-life'
import { instantReplay } from './instant-replay'
import { isItAvocadosOrNot } from './is-it-avocados-or-not-dot-com'
import { kano } from './kano'
import { localWelcome } from './local-welcome'
import { makeArt } from './make-art'
import { minDoktor } from './min-doktor'
import { nuclearConnections } from './nuclear-connections'
import { portraitOfFiveCubes } from './portrait-of-five-cubes'
import { retreatTechnology } from './retreat-technology'
import { tantra112 } from './tantra-112'
import { utopia } from './utopia'

export const projects: Record<ProjectSlug, Project> = {
  'acroyoga-transitions': acroyogaTransitions,
  adobe,
  'elements-3d': elements3D,
  'game-of-life': gameOfLife,
  'instant-replay': instantReplay,
  isitavocadosornotdotcom: isItAvocadosOrNot,
  kano,
  'local-welcome': localWelcome,
  'make-art': makeArt,
  'min-doktor': minDoktor,
  'nuclear-connections': nuclearConnections,
  'portrait-of-five-cubes': portraitOfFiveCubes,
  'retreat-technology': retreatTechnology,
  utopia,
  'tantra-112': tantra112,
}
