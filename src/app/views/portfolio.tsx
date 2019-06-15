import * as React from 'react'
import { Portfolio } from '../../schemas/portfolio-items'
import Header from './header'

const breadcrumbs = ['portfolio']

export const portfolioCard = (item: Portfolio) => {
  return (
    <li
      key={item.name}
      id={item.name}
      className='portfolio-card'
      style={{
        flex: '1 0',
        maxWidth: '7.5em',
      }}
    >
      <a href={item.URL}>
        <img className='portfolio-card-img' src={`portfolio/${item.imgURL}`} />
        <div className='portfolio-card-title'>{item.title}</div>
        <div className='portfolio-card-description'>
          {item.description}, ({item.date})
        </div>
      </a>
    </li>
  )
}

export interface PortfolioProps {
  portfolio: Array<Portfolio>
}

export default function(props: PortfolioProps) {
  return (
    <>
      {Header(breadcrumbs)}
      <ol
        className='portfolio-wrapper wrapper'
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {props.portfolio.map((item) => portfolioCard(item))}
      </ol>
    </>
  )
}
