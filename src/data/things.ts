export interface PortfolioItem {
  title: string
  name: string
  description: string
  date: string
  URL: string
  imgURL: string
  ongoingIndex?: number
  orderDate: Date
}

export const Things: Array<PortfolioItem> = [
  {
    name: 'utopia',
    title: 'Utopia',
    description:
      'Creative technology @ Utopia: A next-generation design tool for building production-ready React UIs',
    date: '2017–2020',
    URL: 'https://utopia.app',
    imgURL: 'utopia.png',
    orderDate: new Date(946684800000),
    ongoingIndex: 4,
  },
  {
    name: 'elements-3d',
    title: 'Elements 3D',
    description: 'Sketchpad for generative 3D creations',
    date: '2015–present',
    URL: '/things/elements-3d',
    imgURL: 'elements-3d.jpg',
    orderDate: new Date(1569884400000),
    ongoingIndex: 3,
  },
  {
    name: 'make-art-creations',
    title: 'Make Art Creations',
    description: "Kano's online canvas for drawing with code",
    date: '2014–present',
    URL: '/things/make-art',
    imgURL: 'make-art.png',
    orderDate: new Date(946684800000),
    ongoingIndex: 1,
  },
  {
    name: 'waveymaus',
    title: 'waveymaus',
    description: 'The many faces and places of Alec Molloy :)',
    date: '2014–present',
    URL: 'https://instagram.com/waveymaus/',
    imgURL: 'captioning-myself.jpg',
    orderDate: new Date(946684800000),
    ongoingIndex: 0,
  },
  {
    name: 'the-sad-times',
    title: 'The Quiet Times',
    description:
      "From 2015 to not that long ago I didn't do too many creative things outside of work",
    date: 'Mid 2015–recently',
    URL: '///darkness/',
    imgURL: 'the-sad-times.png',
    orderDate: new Date(1514764800000),
  },
  {
    name: 'sleep-sound',
    title: 'Sleep Sound in CSS',
    description: "Jamie xx's Sleep Sound music video in pure CSS",
    date: 'May 2015',
    URL: '/sleep-sound',
    imgURL: 'sleep-sound.png',
    orderDate: new Date(1430438400000),
  },
  {
    name: 'perlin-js',
    title: 'Perlin.js',
    description: 'Perlin noise implementation in Canvas 2D',
    date: 'July 2015',
    URL: '/perlin-js',
    imgURL: 'perlin-noise.png',
    orderDate: new Date(1435708800000),
  },
  {
    name: 'now-thats-what-i-call-y2k',
    title: 'Now Thats What I Call Y2K',
    description: 'Projector installation and music visualiser',
    date: 'April 2015',
    URL: '/y2k',
    imgURL: 'y2k.png',
    orderDate: new Date(1427929200000),
  },
  {
    name: 'floater',
    title: 'Floater',
    description: '3D Music Visualiser',
    date: '2015',
    URL: '/floater',
    imgURL: 'floater.png',
    orderDate: new Date(1435791600000),
  },
]
