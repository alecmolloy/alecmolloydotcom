import * as express from 'express'
import { PortfolioModel } from '../../schemas/portfolio-items'
import template from '../../template'
import { renderToString } from 'react-dom/server'
import Portfolio from '../views/portfolio'

export default express.Router()
	.get('/', (req, res) => {
		PortfolioModel.find({})
			.then((items) => {
				res.send(template({
					body: renderToString(Portfolio({portfolio: items})),
				}))
			})
			.catch(console.log)
	})
