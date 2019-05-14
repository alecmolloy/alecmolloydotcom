import * as React from 'react'
import Header from './header'
import { Portfolio } from '../../schemas/portfolio-items'
import { portfolioCard } from './portfolio';
import { BlogPostPreview, blogPostPreview } from './blog'

export interface IndexProps {
  portfolio: Array<Portfolio>
  blogposts: Array<BlogPostPreview>  
}

export default React.memo(function (props: IndexProps) {
    return (
      <>
        {Header()}
        <ol className='work wrapper'>
          {props.portfolio.map(item => portfolioCard(item))}
        </ol>
        <ol className='blogposts wrapper'>
          {props.blogposts.map(blogpost => blogPostPreview(blogpost))}
        </ol>
      </>
    )
  }
)
