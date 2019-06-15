import * as React from 'react'
import { BlogPost } from '../../schemas/blogpost'
import Header from './header'

const breadcrumbs = ['blog']

export const blogPostPreview = (post: BlogPost) => (
  <li key={post.slug} className='blogPosts-post'>
    <a className='blogPosts-post-link' href={`/post/${post.slug}`}>
      <img
        className='blogPosts-post-hero'
        src={`/blog/${post.heroImageURL}`}
        alt={post.heroImageAlt}
      />
      <h2 className='blogPosts-post-title'>{post.title}</h2>
      <div className='blogPosts-post-text'>{post.contentPreview}</div>
    </a>
  </li>
)

export const BlogTemplate = (props: Array<BlogPost>) => {
  return (
    <>
      {Header(breadcrumbs)}
      {props.map((blogPost) => blogPostPreview(blogPost))}
    </>
  )
}
