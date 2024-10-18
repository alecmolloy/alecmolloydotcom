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
  | 'WebGL'

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

export interface Project {
  slug: ProjectSlug
  title: string
  subtitle?: string
  hero: Hero
  date: string
  technologies: Technology[]
  deliverables: string
  content: React.ReactNode
  role?: string
  collaborators?: Collaborator[]
  links?: Link[]
  acquisition?: string
}

export function project(
  slug: ProjectSlug,
  title: string,
  subtitle: string | undefined,
  hero: Hero,
  date: string,
  technologies: Technology[],
  deliverables: string,
  content: React.ReactNode,
  role?: string,
  collaborators?: Collaborator[],
  links?: Link[],
  acquisition?: string,
): Project {
  return {
    slug,
    title,
    subtitle,
    hero,
    technologies,
    role,
    date,
    collaborators,
    deliverables,
    content,
    links,
    acquisition,
  }
}
