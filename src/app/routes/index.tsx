import * as React from 'react'
import * as Express from 'express'
import { renderToString } from 'react-dom/server'
import template from '../../template'
import About from '../views/about'
import Portfolio from './portfolio'

export default Express.Router()

.get(['/', '/about'], (req, res) => {
	res.send(template({
		body: renderToString(<About />),
  }))
})

.use('/portfolio', Portfolio)

.get('/blog', (req, res) => {
})

.use('/portfolio', Portfolio)
