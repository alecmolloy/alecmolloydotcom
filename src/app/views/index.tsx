import * as React from 'react'
import { BlogPost } from '../../schemas/blogpost-schema'
import { PortfolioItem } from '../../schemas/portfolio-items-schema'
import { blogPostPreview } from './blog'
import Header from './header'
import { PortfolioCard } from './portfolio'

export interface IndexProps {
  portfolio: Array<PortfolioItem>
  blogposts: Array<BlogPost>
}

export const IndexTemplate = (props: IndexProps) => {
  return (
    <>
      {Header()}
      <ol className='work wrapper'>
        {props.portfolio.map((item) => (
          <PortfolioCard item={item} />
        ))}
      </ol>
      <ol className='blogposts wrapper'>
        {props.blogposts.map((blogpost) => blogPostPreview(blogpost))}
      </ol>
    </>
  )
}
