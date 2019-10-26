import * as Express from 'express'
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import template from '../../template'
import { AboutTemplate } from '../views/about'
import { PortfolioRoutes } from './portfolio-routes'
import { UnderConstruction } from '../views/under-construction'

export default Express.Router()
  .get(['/', '/about'], (req, res) => {
    res.send(
      template({
        body: renderToString(<AboutTemplate />),
      }),
    )
  })

  .get('/things/elements-3d', (req, res) => {
    res.send(
      template({
        body: renderToString(
          <UnderConstruction>
            <p>Elements 3D needs a bit of doing up before it is brought out into the world.</p>
            <p>
              <a href='twitter.com/alecmolloy'>Tweet the webmaster</a> if you want a private
              showing.
            </p>
          </UnderConstruction>,
        ),
      }),
    )
  })

  .use('/things', PortfolioRoutes)
