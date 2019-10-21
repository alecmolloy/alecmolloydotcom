import * as React from 'react'
import { Portfolio } from '../../schemas/portfolio-items-schema'
import Header from './header'

const breadcrumbs = ['things']

export const PortfolioCard: React.FunctionComponent<{ item: Portfolio }> = ({ item }) => {
  return (
    <li
      key={item.name}
      id={item.name}
      className='portfolio-card'
      style={{
        flex: '1 0',
        maxWidth: '400px',
      }}
    >
      <a href={item.URL} target='_new'>
        <img className='portfolio-card-img' src={`/images/things/${item.imgURL}`} />
        <div
          className='portfolio-card-title'
          style={{
            marginTop: '0.5em',
            fontSize: '0.66em',
            lineHeight: '1.5em',
            fontStyle: 'italic',
          }}
        >
          {item.title} <span style={{ fontStyle: 'normal', color: '#888' }}>({item.date})</span>
        </div>
        <div
          className='portfolio-card-description'
          style={{
            fontSize: '0.66em',
            lineHeight: '1.5em',
            color: '#888',
          }}
        >
          {item.description}
        </div>
      </a>
    </li>
  )
}

export interface PortfolioProps {
  items: Array<Portfolio>
}

export const PortfolioItems = ({ items }: PortfolioProps) => {
  items.sort((a, b) => {
    if (a.ongoingIndex != null || b.ongoingIndex != null) {
      const aIndex: number = a.ongoingIndex != null ? a.ongoingIndex : -1
      const bIndex: number = b.ongoingIndex != null ? b.ongoingIndex : -1
      return aIndex < bIndex ? 1 : aIndex > bIndex ? -1 : 0
    } else {
      return 0
    }
  })
  return (
    <>
      {Header(breadcrumbs)}
      <ol className='portfolio-wrapper wrapper'>
        {items.map((item) => (
          <PortfolioCard item={item} />
        ))}
      </ol>
    </>
  )
}
