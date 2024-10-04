import { StaticImageData } from 'next/image'

interface HeroImage {
  type: 'image'
  data: StaticImageData
  alt: string
}
export function heroImage(data: StaticImageData, alt: string): HeroImage {
  return { type: 'image', data, alt }
}

interface HeroVideo {
  type: 'video'
  url: string
  poster: StaticImageData
  posterAlt: string
}
export function heroVideo(
  url: string,
  poster: StaticImageData,
  posterAlt: string,
): HeroVideo {
  return { type: 'video', url, poster, posterAlt }
}

type Hero = HeroImage | HeroVideo

type Technology =
  | 'React Native'
  | 'TypeScript'
  | 'Figma'
  | 'Photoshop'
  | 'Midjourney'
  | 'Next.js'
  | 'React'
  | 'JavaScript'
  | 'TensorFlow.js'
  | 'Google Apps Script'
  | 'Zapier'
  | 'InDesign'

interface Collaborator {
  name: string
  url?: string
}

export function collaborator(name: string, url?: string): Collaborator {
  return { name, url }
}

interface Link {
  title: string
  url: string
}

export function link(title: string, url: string): Link {
  return { title, url }
}

export interface Project {
  title: string
  shortDescription: string
  hero: Hero
  releaseDate: string
  technologies: Technology[]
  deliverables: string
  content: React.ReactNode
  role?: string
  collaborators?: Collaborator[]
  links?: Link[]
  acquisition?: string
}

export function project(
  title: string,
  shortDescription: string,
  hero: Hero,
  releaseDate: string,
  technologies: Technology[],
  deliverables: string,
  content: React.ReactNode,
  role?: string,
  collaborators?: Collaborator[],
  links?: Link[],
  acquisition?: string,
): Project {
  return {
    title,
    shortDescription,
    hero,
    technologies,
    role,
    releaseDate,
    collaborators,
    deliverables,
    content,
    links,
    acquisition,
  }
}
