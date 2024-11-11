import { StaticImageData } from 'next/image'
import * as React from 'react'
import captioningMyself from '../public/images/work/captioning-myself.jpg'
import elements3d from '../public/images/work/elements-3d.jpg'
import floater from '../public/images/work/floater.png'
import makeArt from '../public/images/work/make-art.png'
import perlinNoise from '../public/images/work/perlin-noise.png'
import sleepSound from '../public/images/work/sleep-sound.png'
import utopia from '../public/images/work/utopia.png'
import y2k from '../public/images/work/y2k.png'
import portaitOfFiveCubes from '../public/images/work/portrait-of-five-cubes.png'

export interface WorkItem {
  title: string
  name: string
  description: React.ReactNode
  date: string
  URL: string
  img: StaticImageData
  ongoingIndex?: number
  orderDate: Date
}

export const WorkItems: Array<WorkItem> = [
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
    URL: '/work/elements-3d',
    img: elements3d,
    orderDate: new Date(1569884400000),
    ongoingIndex: 3,
  },
  {
    name: 'make-art-creations',
    title: 'Make Art Creations',
    description: "Kano's online canvas for drawing with code",
    date: '2014–present',
    URL: '/work/make-art',
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
    URL: '/work/sleep-sound/index.html',
    img: sleepSound,
    orderDate: new Date(1430438400000),
  },
  {
    name: 'perlin-js',
    title: 'Perlin.js',
    description: 'Perlin noise implementation in Canvas 2D',
    date: 'July 2015',
    URL: '/work/perlin-js/index.html',
    img: perlinNoise,
    orderDate: new Date(1435708800000),
  },
  {
    name: 'now-thats-what-i-call-y2k',
    title: 'Now Thats What I Call Y2K',
    description: 'Projector installation and music visualiser',
    date: 'April 2015',
    URL: '/work/y2k/index.html',
    img: y2k,
    orderDate: new Date(1427929200000),
  },
  {
    name: 'floater',
    title: 'Floater',
    description: '3D Music Visualiser',
    date: '2015',
    URL: '/work/floater/index.html',
    img: floater,
    orderDate: new Date(1435791600000),
  },
  {
    name: 'portrait-of-five-cubes',
    title: 'Portrait of Five Cubes',
    description: `After Dale Seymour’s “Portrait of Five Cubes”`,
    date: '2014',
    URL: '/work/portrait-of-five-cubes/index.html',
    img: portaitOfFiveCubes,
    orderDate: new Date(1414687470209),
  },
]
