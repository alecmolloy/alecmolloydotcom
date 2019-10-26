import * as express from 'express'
import { renderToString } from 'react-dom/server'
import { PortfolioModel } from '../../schemas/portfolio-items-schema'
import template from '../../template'
import { PortfolioItems } from '../views/portfolio'
import { MakeArtCreations } from '../views/portfolio/make-art-creations'
import { MakeArtItemModel } from '../../schemas/make-art-items-schema'

export const PortfolioRoutes = express
  .Router()
  .get('/', async (req, res) => {
    res.send(
      template({
        body: renderToString(await PortfolioItems({})),
      }),
    )
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
