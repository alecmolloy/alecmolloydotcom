import * as React from 'react'
import { Portfolio } from '../../schemas/portfolio-items'
import Header from './header'

const breadcrumbs = [ 'portfolio' ]

export default function (PortfolioModel: Array<Portfolio>) {
  console.log(PortfolioModel)
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
        {PortfolioModel.map(element => {
          return (
            <li
              id={element.name}
              className='portfolio-card'
              style={{
                flex: '1 0',
                maxWidth: '7.5em',
              }}
            >
              <a
                href={element.URL}
              >
                <img
                  className='portfolio-card-img'
                  src={`portfolio/${element.imgURL}`}
                />
                <div
                  className='portfolio-card-title'
                >
                  {element.title}
                </div>
                <div
                  className='portfolio-card-description'
                >
                  {element.description}, ({element.date})
                </div>
              </a>
            </li>
          )
        })}
      </ol>
    </>
  )
}
