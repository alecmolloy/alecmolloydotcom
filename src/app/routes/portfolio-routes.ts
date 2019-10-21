import * as express from 'express'
import { renderToString } from 'react-dom/server'
import { PortfolioModel } from '../../schemas/portfolio-items-schema'
import template from '../../template'
import { PortfolioItems } from '../views/portfolio'
import { MakeArtCreations } from '../views/portfolio/make-art-creations'
import { MakeArtItemModel } from '../../schemas/make-art-items-schema'

export const PortfolioRoutes = express
  .Router()
  .get('/', (req, res) => {
    PortfolioModel.find({})
      .sort('-orderDate')
      .then((items) => {
        res.send(
          template({
            body: renderToString(PortfolioItems({ items })),
          }),
        )
      })
      .catch(console.error)
  })

  .get(['/make-art'], (req, res) => {
    MakeArtItemModel.find({})
      .then((items) => {
        res.send(
          template({
            body: renderToString(MakeArtCreations({ items })),
          }),
        )
      })
      .catch(console.error)
  })
