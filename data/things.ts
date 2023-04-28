import { StaticImageData } from 'next/image'
import captioningMyself from '../public/images/things/captioning-myself.jpg'
import elements3d from '../public/images/things/elements-3d.jpg'
import floater from '../public/images/things/floater.png'
import makeArt from '../public/images/things/make-art.png'
import perlinNoise from '../public/images/things/perlin-noise.png'
import sleepSound from '../public/images/things/sleep-sound.png'
import utopia from '../public/images/things/utopia.png'
import y2k from '../public/images/things/y2k.png'

export interface ThingsItem {
  title: string
  name: string
  description: string
  date: string
  URL: string
  img: StaticImageData
  ongoingIndex?: number
  orderDate: Date
}

export const ThingsItems: Array<ThingsItem> = [
  {
    name: 'utopia',
    title: 'Utopia',
    description:
      'Creative technology @ Utopia: A next-generation design tool for building React UIs',
    date: '2017–2020',
    URL: 'https://utopia.app',
    img: utopia,
    orderDate: new Date(946684800000),
    ongoingIndex: 4,
  },
  {
    name: 'elements-3d',
    title: 'Elements 3D',
    description: 'Sketchpad for generative 3D creations',
    date: '2015',
    URL: '/things/elements-3d',
    img: elements3d,
    orderDate: new Date(1569884400000),
    ongoingIndex: 3,
  },
  {
    name: 'make-art-creations',
    title: 'Make Art Creations',
    description: "Kano's online canvas for drawing with code",
    date: '2014–present',
    URL: '/things/make-art',
    img: makeArt,
    orderDate: new Date(946684800000),
    ongoingIndex: 1,
  },
  {
    name: 'waveymaus',
    title: 'waveymaus',
    description: 'The many faces and places of Alec Molloy :)',
    date: '2014–present',
    URL: 'https://instagram.com/waveymaus/',
    img: captioningMyself,
    orderDate: new Date(946684800000),
    ongoingIndex: 0,
  },
  {
    name: 'sleep-sound',
    title: 'Sleep Sound in CSS',
    description: "Jamie xx's Sleep Sound music video in pure CSS",
    date: 'May 2015',
    URL: '/things/sleep-sound/index.html',
    img: sleepSound,
    orderDate: new Date(1430438400000),
  },
  {
    name: 'perlin-js',
    title: 'Perlin.js',
    description: 'Perlin noise implementation in Canvas 2D',
    date: 'July 2015',
    URL: '/things/perlin-js/index.html',
    img: perlinNoise,
    orderDate: new Date(1435708800000),
  },
  {
    name: 'now-thats-what-i-call-y2k',
    title: 'Now Thats What I Call Y2K',
    description: 'Projector installation and music visualiser',
    date: 'April 2015',
    URL: '/things/y2k/index.html',
    img: y2k,
    orderDate: new Date(1427929200000),
  },
  {
    name: 'floater',
    title: 'Floater',
    description: '3D Music Visualiser',
    date: '2015',
    URL: '/things/floater/index.html',
    img: floater,
    orderDate: new Date(1435791600000),
  },
]
