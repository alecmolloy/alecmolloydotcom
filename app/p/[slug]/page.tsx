import { isHeroVideo, isProjectSlug, projectURLPath } from '@/app/content-types'
import { Header } from '@/app/Header'
import { PortfolioPage } from '@/components/PortfolioPage'
import { projects } from '@/data/portfolio'
import { Container } from '@radix-ui/themes'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> => {
  const { slug } = await params

  if (!isProjectSlug(slug)) {
    return {}
  }

  const project = projects[slug]
  const hero = project.hero

  return {
    metadataBase: new URL('https://alecmolloy.com' + projectURLPath(slug)),
    title: 'Alec Molloy | ' + project.title,
    description: project.subtitle,
    openGraph: {
      images: [isHeroVideo(hero) ? hero.poster.src : hero.data.src],
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!isProjectSlug(slug)) {
    return notFound()
  }
  return (
    <>
      <Container size='3'>
        <Header ctaVariant='primary' portfolioPage />
        <PortfolioPage slug={slug} />
      </Container>
    </>
  )
}
