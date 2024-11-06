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
import { retreatTechnology } from './retreat-technology'
import { utopia } from './utopia'
import { vbt } from './vbt'

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
  'retreat-technology': retreatTechnology,
  utopia,
  vbt,
}
