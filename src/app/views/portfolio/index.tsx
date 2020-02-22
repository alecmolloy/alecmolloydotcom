import * as React from 'react'
import Header from '../header'
import { Things, PortfolioItem } from '../../../data/things'

const breadcrumbs = ['things']

export const PortfolioCard: React.FunctionComponent<{ item: PortfolioItem }> = ({ item }) => {
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

export const PortfolioItems = () => {
  return (
    <>
      {Header(breadcrumbs)}
      <ol className='portfolio-wrapper wrapper'>
        {Things.map((item, i) => (
          <PortfolioCard key={i} item={item} />
        ))}
      </ol>
    </>
  )
}
