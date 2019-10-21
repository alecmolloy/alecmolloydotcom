import * as React from 'react'
import { BlogPost } from '../../schemas/blogpost-schema'
import Header from './header'

export const BlogPostTemplate = (props: BlogPost) => {
  const breadcrumbs = ['blog', props.slug]

  return (
    <>
      {Header(breadcrumbs)}
      <article className='blogpost wrapper'>
        <div className='blogpost-hero'>
          <img
            id='blogpost-hero-image'
            src={`/blog/${props.heroImageURL}`}
            alt={props.heroImageAlt}
          />
        </div>
        <div className='blogpost-header'>
          <h2 className='blogpost-header-title'>{props.title}</h2>
          <div className='blogpost-header-deck'>{props.deck}</div>
          <div className='blogpost-header-byline'>{props.byline}</div>
        </div>
        <div className='blogpost-content'>{props.content}</div>
      </article>
    </>
  )
}
