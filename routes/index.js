module.exports = function(app, passport) {
	var express = require("express"),
		router = express.Router()

	router.get(["/", "/index.html"], function (req, res) {
		var db = req.db;
		var blog = db.get("blog");
		var portfolio = db.get("portfolio");
		blog.find({}, {}, function (e, blogDocs) {
			portfolio.find({}, {sort : { _id: 1 }}, function (e, portfolioDocs) {
				res.render("index", {
					content: {
						posts: blogDocs,
						portfolio: portfolioDocs
					}
				});
			});
		});
	});

	router.get("/about", function (req, res) {
		res.render("about", {
			content: {
				title: "about",
				description: "about the acclaimed web-man alec molloy",
				location: [{
					name: "about",
					address: "/about"
				}]
			}
		});
	});

	router.get("/blog", function (req, res) {
		var db = req.db;
		var blog = db.get("blog");
		blog.find({}, {sort : { _id: 1 }}, function (e, docs) {
			res.render("blog", {
				content: {
					posts: docs,
					description: "the internet blog of alec molloy",
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
		var portfolio = db.get("portfolio");
		portfolio.find({}, {sort : { _id: 1 }}, function (e, docs) {
			res.render("portfolio", {
				content: {
					docs: docs,
					title: "portfolio",
					description: "the e-portfolio of alec molloy",
					location: [{
						name: "portfolio",
						address: "/portfolio"
					}]
				}
			});
		});
	});

	router.get("/login", function(req, res) {
	    // render the page and pass in any flash data if it exists
	    res.render("login", { message: req.flash("loginMessage") }); 
	});

	router.get("/control-panel", isLoggedIn, function(req, res) {
	    res.render("control-panel", {
	        user : req.user // get the user out of session and pass to template
	    });
	});

	router.get("/logout", function(req, res) {
	    req.logout();
	    res.redirect("/");
	});

	return router;
}

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}