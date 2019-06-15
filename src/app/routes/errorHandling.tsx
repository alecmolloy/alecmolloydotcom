import * as Express from 'express'
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import template from '../../template'
import { FourOhFourTemplate } from '../views/404'

export default Express.Router().use((req, res) => {
  res.status(404).send(
    template({
      body: renderToString(<FourOhFourTemplate />),
    }),
  )
})
