import * as Express from 'express'
const router = Express.Router()

router.get("/:slug", function (req, res) {
	// var db = req.db;
	// var blog = db.get('blog');
	// blog.findOne({slug : req.params.slug}, {}, function (e, postContent) {
	// 	res.render("blogpost", {
	// 		content: {
	// 			title: postContent.title,
	// 			location: [{
	// 				name: "blog",
	// 				address: "/blog"
	// 			}],
	// 			postContent: postContent
	// 		}
	// 	});
	// });
});

module.exports = router;
