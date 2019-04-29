import * as React from 'react'
import * as Express from 'express'
import { renderToString } from 'react-dom/server'
import App from '../index'
import template from '../../template'
import About from '../views/about'

export default Express.Router()

.get(['/', '/about'], (req, res) => {
	res.send(template({
    body: renderToString(<About />),
  }))
})

.get('/blog', (req, res) => {
	// var db = req.db;
	// var blog = db.get('blog');
	// blog.find({}, {sort : { _id: 1 }}, function (e, docs) {
	// 	res.render('blog', {
	// 		content: {
	// 			posts: docs,
	// 			description: 'the internet blog of alec molloy',
	// 			title: 'blog',
	// 			location: [{
	// 				name: 'blog',
	// 				address: '/blog'
	// 			}]
	// 		}
	// 	});
	// });
})

.get('/portfolio', (req, res) => {
	// var db = req.db;
	// var portfolio = db.get('portfolio');
	// portfolio.find({}, {sort : { _id: 1 }}, function (e, docs) {
	// 	res.render('portfolio', {
	// 		content: {
	// 			docs: docs,
	// 			title: 'portfolio',
	// 			description: 'the e-portfolio of alec molloy',
	// 			location: [{
	// 				name: 'portfolio',
	// 				address: '/portfolio'
	// 			}]
	// 		}
	// 	});
	// });
})
