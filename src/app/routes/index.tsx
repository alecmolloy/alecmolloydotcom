import * as Express from 'express'
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import template from '../../template'
import { AboutTemplate } from '../views/about'
import { BlogRoutes } from './blog'
import { PortfolioRoutes } from './portfolio'

export default Express.Router()

  .get(['/', '/about'], (req, res) => {
    res.send(
      template({
        body: renderToString(<AboutTemplate />),
      }),
    )
  })

  .use('/portfolio', PortfolioRoutes)

  .use('/blog', BlogRoutes)
