import { StaticImageData } from 'next/image'
import villaDeiPapiri from '../public/things/make-art/villa-dei-papiri.png'
import emojiTree from '../public/things/make-art/emoji-tree.png'
import appleWatch from '../public/things/make-art/apple-watch.png'
import villaDeiPapiriIn4D from '../public/things/make-art/villa-dei-papiri-in-4d.png'
import voronoi from '../public/things/make-art/voronoi.png'
import windows95 from '../public/things/make-art/windows-95.png'
import freeYourMind from '../public/things/make-art/free-your-mind.png'
import josefMullerBrockmannBeethoven from '../public/things/make-art/josef-mueller-brockmann-beethoven.png'
import perlinNoise from '../public/things/make-art/perlin-noise.png'
import ouroboros from '../public/things/make-art/ouroboros.png'
import suddenRainAtAtake from '../public/things/make-art/sudden-rain-at-atake.png'
import fineWindClearMorning from '../public/things/make-art/fine-wind-clear-morning.png'
import resonances from '../public/things/make-art/resonances.png'

export interface MakeArtItem {
  title: string
  date: Date
  description: string
  thumbnail: StaticImageData
  code: string
}

export const MakeArtItems: Array<MakeArtItem> = [
  {
    title: 'Plan view of an open-air loggia, Villa dei Papiri, Ercolano',
    description: '',
    thumbnail: villaDeiPapiri,
    code: 'villa-dei-papiri.art',
    date: new Date(1563530884265),
  },
  {
    title: 'Emoji Tree',
    description: '',
    thumbnail: emojiTree,
    code: 'emoji-tree.art',
    date: new Date(1455633485300),
  },
  {
    title: 'Apple Watch',
    description: 'A working replica of an Apple Watch face',
    thumbnail: appleWatch,
    code: 'apple-watch.art',
    date: new Date(1432398051257),
  },
  {
    title: 'Villa dei Papiri in 4D',
    description: '',
    thumbnail: villaDeiPapiriIn4D,
    code: 'villa-dei-papiri-in-4d.art',
    date: new Date(1563059193414),
  },
  {
    title: 'Voronoi',
    description: '',
    thumbnail: voronoi,
    code: 'voronoi.art',
    date: new Date(1492108470608),
  },
  {
    title: 'Windows 95',
    description: '',
    thumbnail: windows95,
    code: 'windows-95.art',
    date: new Date(1446824331778),
  },
  {
    title: 'Free Your Mind',
    description: '',
    thumbnail: freeYourMind,
    code: 'free-your-mind.art',
    date: new Date(1563537514497),
  },
  {
    title: 'Josef Müller-Brockmann: Beethoven 1955',
    description: '',
    thumbnail: josefMullerBrockmannBeethoven,
    code: 'josef-mueller-brockmann-beethoven.art',
    date: new Date(1444687698174),
  },
  {
    title: 'Perlin Noise',
    description: '',
    thumbnail: perlinNoise,
    code: 'perlin-noise.art',
    date: new Date(1444383669515),
  },
  {
    title: 'Ouroboros',
    description: '',
    thumbnail: ouroboros,
    code: 'ouroboros.art',
    date: new Date(1441562595546),
  },
  {
    title: 'Sudden Rain at Atake',
    description: '',
    thumbnail: suddenRainAtAtake,
    code: 'sudden-rain-at-atake.art',
    date: new Date(1439321267035),
  },
  {
    title: 'Hokusai: Fine Wind, Clear Morning',
    description: '',
    thumbnail: fineWindClearMorning,
    code: 'fine-wind-clear-morning.art',
    date: new Date(1437565007593),
  },
  {
    title: 'Resonances',
    description: '',
    thumbnail: resonances,
    code: 'resonances.art',
    date: new Date(1446834285109),
  },
]
