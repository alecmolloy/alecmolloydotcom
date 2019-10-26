import * as express from 'express'
import { renderToString } from 'react-dom/server'
import template from '../../template'
import { PortfolioItems } from '../views/portfolio'
import { MakeArtCreations } from '../views/portfolio/make-art-creations'

export const PortfolioRoutes = express
  .Router()
  .get('/', async (req, res) => {
    res.send(
      template({
        body: renderToString(await PortfolioItems()),
      }),
    )
  })

  .get('/make-art', async (req, res) => {
    res.send(
      template({
        body: renderToString(await MakeArtCreations()),
      }),
    )
  })
