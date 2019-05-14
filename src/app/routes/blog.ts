import * as express from 'express'
import { PortfolioModel } from '../../schemas/portfolio-items'
import template from '../../template'
import { renderToString } from 'react-dom/server'
import Portfolio from '../views/portfolio'
import blogPost from '../views/blogPost'

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

	.get('/:slug', (req, res) => {
		let slug = req.params.slug as string
		PortfolioModel.find({slug})
			.then((value) => {
				res.send(template({
					body: renderToString(blogPost(value)),
				}))
			})
	})
