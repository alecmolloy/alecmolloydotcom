import * as React from 'react'
import Header from './header'

export interface BlogPostPreview {
  title: string
  slug: string
  deck: string
  byline: string
  contentPreview: string
  heroImageURL: string
  heroImageAlt: string
  created: number
}

export interface BlogProps {
  blogposts: Array<BlogPostPreview>  
}

const breadcrumbs = ['blog']

export const blogPostPreview = (post: BlogPostPreview) => {
  <li className='blogposts-post'>
    <a className='blogposts-post-link' href={`/post/${post.slug}`}>
      <img className='blogposts-post-hero' src={`/blog/${post.heroImageURL}`} alt={post.heroImageAlt} />
      <h2 className='blogposts-post-title'>{post.title}</h2>
      <div className='blogposts-post-text'>{post.contentPreview}</div>
    </a>
  </li>
}

export default React.memo(function (props: BlogProps) {
  return (
    <>
      {Header(breadcrumbs)}
      {props.blogposts.map(blogpost => blogPostPreview(blogpost))}
    </>
  )
})
