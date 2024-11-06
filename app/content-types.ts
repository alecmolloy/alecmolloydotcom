import { projects } from '@/data/portfolio'
import { StaticImageData } from 'next/image'
import * as React from 'react'

export type ProjectSlug =
  | 'game-of-life'
  | 'acroyoga-transitions'
  | 'adobe'
  | 'elements-3d'
  | 'instant-replay'
  | 'kano'
  | 'local-welcome'
  | 'min-doktor'
  | 'nuclear-connections'
  | 'retreat-technology'
  | 'utopia'
  | 'vbt'
  | 'make-art'
  | 'isitavocadosornotdotcom'

export function isProjectSlug(slug: string): slug is ProjectSlug {
  return slug in projects
}

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

type Tools =
  | 'React'
  | 'React Native'
  | 'TypeScript'
  | 'Figma'
  | 'Sketch'
  | 'Photoshop'
  | 'Illustrator'
  | 'Midjourney'
  | 'Next.js'
  | 'JavaScript'
  | 'Python'
  | 'TensorFlow.js'
  | 'Google Apps Script'
  | 'Zapier'
  | 'InDesign'
  | 'WebGL'
  | 'CoffeeScript'
  | 'JQuery'

interface Collaborator {
  name: string
  url?: string
}

export function collaborator(
  collaboratorName: string,
  url?: string,
): Collaborator {
  return { name: collaboratorName, url }
}

interface Link {
  title: string
  url: string
}

export function link(title: string, url: string): Link {
  return { title, url }
}

interface Recognition {
  title: string
  description: string
  url?: string
}

export function recognition(
  title: string,
  description: string,
  url?: string,
): Recognition {
  return { title, description, url }
}

export interface Project {
  slug: ProjectSlug
  title: string
  subtitle?: string
  hero: Hero
  date: string
  tools?: Tools[]
  content: React.ReactNode
  deliverables?: string
  role?: string
  collaborators?: Collaborator[]
  links?: Link[]
  acquisition?: string
  recognition?: Recognition[]
}

export function project({
  slug,
  title,
  subtitle,
  hero,
  date,
  tools,
  content,
  deliverables,
  role,
  collaborators,
  links,
  acquisition,
  recognition,
}: Project): Project {
  return {
    slug,
    title,
    subtitle,
    hero,
    date,
    tools,
    content,
    deliverables,
    role,
    collaborators,
    links,
    acquisition,
    recognition,
  }
}
