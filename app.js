var express = require("express"),
	fs = require("fs"),
	http = require("http"),
	https = require("https"),
	compression = require("compression"),
	pug = require("pug"),
	logger = require("morgan");

var httpApp = express(),
	httpsApp = express();

var httpPort = process.env.NODE_ENV === "production" ? 80 : 3000,
	httpsPort = process.env.NODE_ENV === "production" ? 443 : 3001;

var credentials = {
	key: fs.readFileSync("/etc/ssl/private/alecmolloy.key"),
	cert: fs.readFileSync("/etc/ssl/certs/alecmolloy.crt"),
	ca: fs.readFileSync("/etc/ssl/certs/intermediate.pem")
};

httpApp.set("port", httpPort);
httpApp.get("*", function (req, res, next) {
	res.redirect("https://" + req.headers.host + req.path);
});

var mongo = require("mongodb");
var monk = require("monk");
var db = monk("localhost:27017/alecmolloy");

httpsApp.use(function (req, res, next) {
	req.db = db;
	next();
});
httpsApp.set("port", httpsPort);
httpsApp.set("views", __dirname + "/views");
httpsApp.set("view engine", "pug");
httpsApp.use(compression());
httpsApp.use(logger("dev"));
httpsApp.use(express.static("public"));
httpsApp.use(express.static("public/projects"));
httpsApp.use("/", require("./routes/"));
httpsApp.use("/post", require("./routes/blog"));
httpsApp.use(function (req, res, next) {
	res.status(404).render("404", {
		content: {
			title: ":(",
			description: ":( :( :(",
			location: [{
				name: ":(",
				address: "/404"
			}]
		}
	});
});

httpsApp.locals.basedir = __dirname;

http.createServer(httpApp).listen(httpApp.get('port'), function () {
	console.log("\nListening on http port " + httpApp.get('port') + "\n")
});

console.log(httpsPort);

https.createServer(credentials, httpsApp).listen(httpsApp.get('port'), function () {
	console.log("\nListening on https port " + httpsApp.get('port') + "\n")
});
