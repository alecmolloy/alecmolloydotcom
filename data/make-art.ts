import appleWatch from '@/public/portfolio/make-art/apple-watch.png'
import emojiTree from '@/public/portfolio/make-art/emoji-tree.png'
import fineWindClearMorning from '@/public/portfolio/make-art/fine-wind-clear-morning.png'
import freeYourMind from '@/public/portfolio/make-art/free-your-mind.png'
import josefMullerBrockmannBeethoven from '@/public/portfolio/make-art/josef-mueller-brockmann-beethoven.png'
import ouroboros from '@/public/portfolio/make-art/ouroboros.png'
import perlinNoise from '@/public/portfolio/make-art/perlin-noise.png'
import resonances from '@/public/portfolio/make-art/resonances.png'
import suddenRainAtAtake from '@/public/portfolio/make-art/sudden-rain-at-atake.png'
import villaDeiPapiriIn4D from '@/public/portfolio/make-art/villa-dei-papiri-in-4d.png'
import villaDeiPapiri from '@/public/portfolio/make-art/villa-dei-papiri.png'
import voronoi from '@/public/portfolio/make-art/voronoi.png'
import windows95 from '@/public/portfolio/make-art/windows-95.png'
import { StaticImageData } from 'next/image'

export interface MakeArtItem {
  title: string
  date: Date
  description?: string
  thumbnail: StaticImageData
  code: string
}

export const MakeArtItems: Array<MakeArtItem> = [
  {
    title: 'Plan view of an open-air loggia, Villa dei Papiri, Ercolano',
    thumbnail: villaDeiPapiri,
    code: 'villa-dei-papiri.art',
    date: new Date(1563530884265),
  },
  {
    title: 'Emoji Tree',
    description:
      'Kanye West is said to have liked this very much when he saw it. Long story.',
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
    thumbnail: villaDeiPapiriIn4D,
    code: 'villa-dei-papiri-in-4d.art',
    date: new Date(1563059193414),
  },
  {
    title: 'Voronoi',
    thumbnail: voronoi,
    code: 'voronoi.art',
    date: new Date(1492108470608),
  },
  {
    title: 'Windows 95',
    thumbnail: windows95,
    code: 'windows-95.art',
    date: new Date(1446824331778),
  },
  {
    title: 'Free Your Mind',
    thumbnail: freeYourMind,
    code: 'free-your-mind.art',
    date: new Date(1563537514497),
  },
  {
    title: 'Josef Müller-Brockmann: Beethoven 1955',
    thumbnail: josefMullerBrockmannBeethoven,
    code: 'josef-mueller-brockmann-beethoven.art',
    date: new Date(1444687698174),
  },
  {
    title: 'Perlin Noise',
    thumbnail: perlinNoise,
    code: 'perlin-noise.art',
    date: new Date(1444383669515),
  },
  {
    title: 'Ouroboros',
    thumbnail: ouroboros,
    code: 'ouroboros.art',
    date: new Date(1441562595546),
  },
  {
    title: 'Sudden Rain at Atake',
    thumbnail: suddenRainAtAtake,
    code: 'sudden-rain-at-atake.art',
    date: new Date(1439321267035),
  },
  {
    title: 'Hokusai: Fine Wind, Clear Morning',
    thumbnail: fineWindClearMorning,
    code: 'fine-wind-clear-morning.art',
    date: new Date(1437565007593),
  },
  {
    title: 'Resonances',
    thumbnail: resonances,
    code: 'resonances.art',
    date: new Date(1446834285109),
  },
]
