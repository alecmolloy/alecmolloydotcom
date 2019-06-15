import * as express from 'express'
import { renderToString } from 'react-dom/server'
import { PortfolioModel } from '../../schemas/portfolio-items'
import template from '../../template'
import Portfolio from '../views/portfolio'

export const PortfolioRoutes = express.Router().get('/', (req, res) => {
  PortfolioModel.find({})
    .then((items) => {
      res.send(
        template({
          body: renderToString(Portfolio({ portfolio: items })),
        }),
      )
    })
    .catch(console.log)
})
