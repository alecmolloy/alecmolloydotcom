var express = require("express"),
	fs = require("fs"),
	https = require("https"),
	http = require("http"),
	compression = require("compression"),
	pug = require("pug"),
	logger = require("morgan");

var credentials = {
	key: fs.readFileSync("/etc/ssl/private/alecmolloy.key"),
	cert: fs.readFileSync("/etc/ssl/certs/alecmolloy.crt"),
	ca: fs.readFileSync("/etc/ssl/certs/intermediate.pem")
};

var mongo = require("mongodb");
var monk = require("monk");
var db = monk("localhost:27017/alecmolloy");

var app = express(),
	httpPort = process.env.NODE_ENV === "production" ? 80 : 3000,
	httpsPort = process.env.NODE_ENV === "production" ? 443 : 3001;


app.use(compression());
app.use(function (req, res, next) {
	req.db = db;
	next();
});

app.set("views", __dirname + "/views");
app.set("view engine", "pug");
app.locals.basedir = __dirname;
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.static("public/projects"));

var router = express.Router();

app.use("/", require("./routes/"));
app.use("/post", require("./routes/blog"));

app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

http.createServer(app).listen(httpPort);
https.createServer(credentials, app).listen(httpsPort);

console.log("\nListening on http port " + httpPort + "\n")
console.log("\nListening on https port " + httpsPort + "\n")
