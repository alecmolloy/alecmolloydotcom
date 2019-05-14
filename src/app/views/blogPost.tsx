import * as React from 'react'
import Header from './header'

export interface BlogPostProps {
  title: string
  slug: string
  deck: string
  byline: string
  content: string
  heroImageURL: string
  heroImageAlt: string
}

export default React.memo(function (props: BlogPostProps) {
  const breadcrumbs = ['blog', props.slug]

  return (
    <>
      {Header(breadcrumbs)}
      <article className='blogpost wrapper'>
        <div className='blogpost-hero'>
          <img id='blogpost-hero-image' src={`/blog/${props.heroImageURL}`} alt={props.heroImageAlt} />
        </div>
        <div className='blogpost-header'>
          <h2 className='blogpost-header-title'>{props.title}</h2>
          <div className='blogpost-header-deck'>{props.deck}</div>
          <div className='blogpost-header-byline'>{props.byline}</div>
        </div>
        <div className='blogpost-content'>
          {props.content}
        </div>
      </article>
    </>
  )
})
