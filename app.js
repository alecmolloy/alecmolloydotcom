var compression = require("compression"),
	bodyParser = require("body-parser"),
	cookieParser = require("cookie-parser"),
	express = require("express"),
	flash = require("connect-flash"),
	fs = require("fs"),
	http = require("http"),
	https = require("https"),
	logger = require("morgan");
	session = require("express-session"),
	passport = require("passport"),
	pug = require("pug");

var httpApp = express(),
	httpsApp = express();

var httpPort = process.env.NODE_ENV === "production" ? 80 : 3000,
	httpsPort = process.env.NODE_ENV === "production" ? 443 : 3001;

var credentials = {
	cert: fs.readFileSync("./sslcert/fullchain.pem"),
	key: fs.readFileSync("./sslcert/privkey.pem")
};

httpApp.set("port", httpPort);
httpApp.get("/.well-known/", express.static('static/.well-known'));
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
httpsApp.use(cookieParser()); // read cookies (for auth)
httpsApp.use(bodyParser()); // get information from html forms
httpsApp.use(express.static("img"));
httpsApp.use(express.static("public"));
httpsApp.use(express.static("public/projects"));

// require('./config/passport')(passport); // pass passport for configuration
httpsApp.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
httpsApp.use(passport.initialize());
httpsApp.use(passport.session()); // persistent login sessions
httpsApp.use(flash()); // use connect-flash for flash messages stored in session

httpsApp.use("/", require("./routes/")(httpsApp, passport)); // load our routes and pass in our app and fully configured passport
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

https.createServer(credentials, httpsApp).listen(httpsApp.get('port'), function () {
	console.log("\nListening on https port " + httpsApp.get('port') + "\n")
});
