import * as express from 'express'
// import PortfolioItem from '../../schemas/portfolio-items'

export default express.Router()
.get('/', (req, res) => {
	// PortfolioItem.find((err, items) => {
	// 	if (err) {
	// 		console.log(err)
	// 	} else {
	// 		res.json(items)
	// 	}
	// })
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

.get('/:id', (req, res) => {
  let id = req.params.id
  // PortfolioItem.findById(id, function(err, todo) {
  //   res.json(todo)
  // })
})