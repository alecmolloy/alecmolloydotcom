import * as React from 'react'
import { BlogPost } from '../../schemas/blogpost'
import { Portfolio } from '../../schemas/portfolio-items'
import { blogPostPreview } from './blog'
import Header from './header'
import { portfolioCard } from './portfolio'

export interface IndexProps {
  portfolio: Array<Portfolio>
  blogposts: Array<BlogPost>
}

export const IndexTemplate = (props: IndexProps) => {
  return (
    <>
      {Header()}
      <ol className='work wrapper'>{props.portfolio.map((item) => portfolioCard(item))}</ol>
      <ol className='blogposts wrapper'>
        {props.blogposts.map((blogpost) => blogPostPreview(blogpost))}
      </ol>
    </>
  )
}
