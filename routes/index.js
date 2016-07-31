var express = require('express'),
	router = express.Router()

router.get(["/", "/index.html"], function (req, res) {
	var db = req.db;
	var blog = db.get('blog');
	var portfolio = db.get('portfolio');
	blog.find({}, {}, function (e, blogDocs) {
		portfolio.find({}, {}, function (e, portfolioDocs) {
			res.render("index", {
				content: {
					posts: blogDocs,
					portfolio: portfolioDocs,
				}
			});
		});
	});
});

router.get("/about", function (req, res) {
	res.render("about", {
		content: {
			title: "about",
			location: [{
				name: "about",
				address: "/about"
			}]
		}
	});
});

router.get("/blog", function (req, res) {
	var db = req.db;
	var blog = db.get('blog');
	blog.find({}, {}, function (e, docs) {
		res.render("blog", {
			content: {
				posts: docs,
				title: "blog",
				location: [{
					name: "blog",
					address: "/blog"
				}]
			}
		});
	});
});

router.get("/portfolio", function (req, res) {
	var db = req.db;
	var portfolio = db.get('portfolio');
	portfolio.find({}, {}, function (e, docs) {
		res.render("portfolio", {
			content: {
				docs: docs,
				title: "portfolio",
				location: [{
					name: "portfolio",
					address: "/portfolio"
				}]
			}
		});
	});
});

module.exports = router;
